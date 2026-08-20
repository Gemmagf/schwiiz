import { useEffect, useMemo, useRef, useState } from 'react'
import {
  getAllSrs, putSrs, getAllQuiz, putQuiz, bumpSession, getSessions, getConfig, setConfig, importAll,
  getCards, putCard, deleteCard, getTexts, putText, deleteText
} from './lib/db.js'
import { VOCAB } from './data/vocab.js'
import { syncIfDirty, isConfigured, pullFromGit } from './lib/sync.js'
import { todayISO } from './lib/srs.js'
import Dashboard from './components/Dashboard.jsx'
import Flashcards from './components/Flashcards.jsx'
import Grammar from './components/Grammar.jsx'
import Phrases from './components/Phrases.jsx'
import Settings from './components/Settings.jsx'

const TABS = [
  { id: 'dash', label: 'Tauler', emoji: '🏠' },
  { id: 'cards', label: 'Repàs', emoji: '🃏' },
  { id: 'gram', label: 'Gramàtica', emoji: '📐' },
  { id: 'frases', label: 'Llegir', emoji: '📖' },
  { id: 'set', label: 'Ajustos', emoji: '⚙️' }
]

export default function App() {
  const [tab, setTab] = useState('dash')
  const [srs, setSrs] = useState({})
  const [quiz, setQuiz] = useState({})
  const [sessions, setSessions] = useState([])
  const [online, setOnline] = useState(navigator.onLine)
  const [toast, setToast] = useState('')
  const [topicFilter, setTopicFilter] = useState('tots')
  const [dir, setDir] = useState('ca2ch')
  const [voiceURI, setVoiceURIState] = useState('')
  const [cards, setCards] = useState([])       // targetes que has fet tu llegint
  const [texts, setTexts] = useState([])       // capítols que has enganxat tu
  const [dirty, setDirty] = useState(false)     // hi ha progrés sense pujar al repo
  const [syncOn, setSyncOn] = useState(false)   // el sync amb git està configurat

  async function refresh() {
    const [s, q, se, c, t, d, cfg] = await Promise.all([
      getAllSrs(), getAllQuiz(), getSessions(), getCards(), getTexts(), getConfig('dirty'), isConfigured()
    ])
    setSrs(s); setQuiz(q); setSessions(se); setCards(c); setTexts(t)
    setDirty(Boolean(d)); setSyncOn(cfg)
  }

  // Les targetes que has afegit llegint entren al repàs com qualsevol altra.
  const vocab = useMemo(() => [...VOCAB, ...cards], [cards])

  useEffect(() => {
    refresh()
    ;(async () => {
      setVoiceURIState((await getConfig('voiceURI')) || '')
      setDir((await getConfig('dir')) || 'ca2ch')
    })()
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  // En obrir l'app: si el sync està configurat i no hi ha canvis locals pendents,
  // baixa l'últim progrés del repo (útil quan canvies de dispositiu).
  useEffect(() => {
    (async () => {
      if (!navigator.onLine || !(await isConfigured())) return
      if (await getConfig('dirty')) return
      try {
        const remot = await pullFromGit()
        if (remot) { await importAll(remot); await refresh(); setToast('Progrés actualitzat ✓') }
      } catch { /* offline o sense accés: seguim amb el que hi ha al mòbil */ }
    })()
  }, [])

  useEffect(() => {
    if (online) syncIfDirty().then((r) => { if (r.ok) { setToast('Sincronitzat ✓'); setDirty(false) } })
  }, [online])

  // Agrupa les pujades: espera 8 s sense canvis per fer UN sol commit.
  const syncTimer = useRef(null)
  function scheduleSync() {
    if (syncTimer.current) clearTimeout(syncTimer.current)
    syncTimer.current = setTimeout(async () => {
      if (!navigator.onLine || !(await isConfigured())) return
      const r = await syncIfDirty()
      if (r.ok) { setToast('Sincronitzat ✓'); setDirty(false) }
    }, 8000)
  }

  async function onGrade(card, encertada) {
    await putSrs(card)
    await bumpSession(todayISO(), encertada)
    await refresh()
    scheduleSync()
  }

  async function onQuizAnswer(id, ok) {
    await putQuiz(id, ok)
    await refresh()
    scheduleSync()
  }

  async function addCard(dades) {
    await putCard({ id: 'u' + Date.now().toString(36), ...dades })
    await refresh()
    scheduleSync()
  }

  async function updateCard(card) {
    await putCard(card)
    await refresh()
    scheduleSync()
  }

  async function removeCard(id) {
    await deleteCard(id)
    await refresh()
    scheduleSync()
  }

  async function addText(text) {
    await putText(text)
    await refresh()
    scheduleSync()
  }

  async function removeText(id) {
    await deleteText(id)
    await refresh()
    scheduleSync()
  }

  async function saveVoice(uri) {
    setVoiceURIState(uri)
    await setConfig('voiceURI', uri)
  }

  async function saveDir(d) {
    setDir(d)
    await setConfig('dir', d)
  }

  function goTo(destí, tema) {
    if (tema) setTopicFilter(tema)
    setTab(destí)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">🇨🇭 <span>Schwiiz</span></div>
        {(!online || (syncOn && dirty)) && (
          <button className={`net ${online ? 'pend' : 'off'}`} onClick={() => setTab('set')}>
            {online ? '↑ sense pujar' : 'offline'}
          </button>
        )}
      </header>

      <main className="content">
        {tab === 'dash' && (
          <Dashboard
            vocab={vocab} srs={srs} quiz={quiz} sessions={sessions}
            onStart={() => setTab('cards')}
            onGoTo={goTo}
          />
        )}
        {tab === 'cards' && (
          <Flashcards
            vocab={vocab} srs={srs} onGrade={onGrade}
            topicFilter={topicFilter} setTopicFilter={setTopicFilter}
            dir={dir} setDir={saveDir}
            voiceURI={voiceURI}
          />
        )}
        {tab === 'gram' && <Grammar quiz={quiz} onAnswer={onQuizAnswer} />}
        {tab === 'frases' && (
          <Phrases
            voiceURI={voiceURI}
            reader={{
              userCards: cards, texts,
              onAddCard: addCard, onUpdateCard: updateCard, onDeleteCard: removeCard,
              onAddText: addText, onDeleteText: removeText
            }}
          />
        )}
        {tab === 'set' && (
          <Settings
            getConfig={getConfig} setConfig={setConfig}
            setToast={setToast} onReload={refresh}
            dirty={dirty} syncOn={syncOn}
            voiceURI={voiceURI} setVoiceURI={saveVoice}
          />
        )}
      </main>

      {toast && <div className="toast" onAnimationEnd={() => setToast('')}>{toast}</div>}

      <nav className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}>
            <span className="emoji">{t.emoji}</span>
            <span className="lbl">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
