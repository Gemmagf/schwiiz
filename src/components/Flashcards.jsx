import { useEffect, useMemo, useState } from 'react'
import { TOPICS } from '../data/vocab.js'
import { LESSONS } from '../data/lessons.js'
import { GRADES, dueCards, grade as gradeCard, newCard, todayISO } from '../lib/srs.js'
import { speak, ttsAvailable } from '../lib/tts.js'

const DIRECTIONS = [
  { id: 'ca2ch', label: 'Català → Dialecte', front: 'ca', hint: 'et fa produir, és el que costa' },
  { id: 'ch2ca', label: 'Dialecte → Català', front: 'ch', hint: 'reconèixer, més fàcil' },
  { id: 'de2ch', label: 'Hochdeutsch → Dialecte', front: 'de', hint: 'per fixar els canvis de so' }
]

export default function Flashcards({ vocab = [], srs, onGrade, topicFilter, setTopicFilter, lessonFilter, setLessonFilter, dir, setDir, voiceURI }) {
  const [queue, setQueue] = useState(null) // null = encara no s'ha començat
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState(false)
  const [done, setDone] = useState(0)
  const [lliure, setLliure] = useState(false)

  // Es filtra primer per lliçó (d'on ve la paraula) i després per tema.
  const pool = useMemo(() => {
    let p = vocab
    if (lessonFilter !== 'tots') p = p.filter((v) => (v.lesson || 'base') === lessonFilter)
    if (topicFilter !== 'tots') p = p.filter((v) => v.topic === topicFilter)
    return p
  }, [topicFilter, lessonFilter, vocab])
  const pendents = useMemo(() => dueCards(pool, srs), [pool, srs])

  // Si canvia el filtre, es tanca la sessió en curs perquè no barregi temes.
  useEffect(() => { setQueue(null); setIdx(0); setShown(false); setDone(0) }, [topicFilter, lessonFilter, dir])

  function start(forcarTot = false) {
    const base = forcarTot ? pool : pendents
    if (!base.length) return
    const barrejat = [...base].sort(() => Math.random() - 0.5).slice(0, 40)
    setQueue(barrejat)
    setIdx(0)
    setShown(false)
    setDone(0)
    setLliure(forcarTot)
  }

  function answer(g) {
    const item = queue[idx]
    const estat = srs[item.id] || newCard(item.id)
    const nou = gradeCard(estat, g)
    onGrade(nou, g >= 2)

    // Nota "un altre cop": torna al final de la cua d'aquesta sessió.
    let q = queue
    if (g === 0) q = [...queue, item]
    setQueue(q)
    setDone((d) => d + 1)
    setIdx(idx + 1)
    setShown(false)
  }

  const direccio = DIRECTIONS.find((d) => d.id === dir) || DIRECTIONS[0]

  // ---- Pantalla d'inici de sessió ----
  if (!queue || idx >= queue.length) {
    const acabada = queue && idx >= queue.length
    return (
      <div className="cards-intro">
        {acabada && (
          <div className="done-box">
            <b>Sessió acabada 🎉</b>
            <span>{done} targetes repassades{lliure ? ' (sessió lliure, no compta per al calendari)' : ''}</span>
          </div>
        )}

        <h2>Direcció</h2>
        <div className="dir-list">
          {DIRECTIONS.map((d) => (
            <button key={d.id} className={`dir-btn ${dir === d.id ? 'active' : ''}`} onClick={() => setDir(d.id)}>
              <b>{d.label}</b><span>{d.hint}</span>
            </button>
          ))}
        </div>

        <h2>D’on ve</h2>
        <div className="filters">
          <button className={`chip ${lessonFilter === 'tots' ? 'active' : ''}`} onClick={() => setLessonFilter('tots')}>
            Tot ({vocab.length})
          </button>
          {LESSONS.map((l) => {
            const n = vocab.filter((v) => (v.lesson || 'base') === l.id).length
            if (!n) return null
            return (
              <button key={l.id} className={`chip ${lessonFilter === l.id ? 'active' : ''}`} onClick={() => setLessonFilter(l.id)}>
                {l.date ? `📘 ${l.title.split('—')[0].trim()}` : '📗 Fonaments'} ({n})
              </button>
            )
          })}
          {vocab.some((v) => v.topic === 'lectura') && (
            <button className={`chip ${lessonFilter === 'lectura' ? 'active' : ''}`} onClick={() => setLessonFilter('lectura')}>
              📖 Les meves ({vocab.filter((v) => v.topic === 'lectura').length})
            </button>
          )}
        </div>

        <h2>Tema</h2>
        <div className="filters">
          <button className={`chip ${topicFilter === 'tots' ? 'active' : ''}`} onClick={() => setTopicFilter('tots')}>
            Tots ({pool.length})
          </button>
          {TOPICS.map((t) => {
            const base = lessonFilter === 'tots' ? vocab : vocab.filter((v) => (v.lesson || 'base') === lessonFilter)
            const n = base.filter((v) => v.topic === t.id).length
            if (!n) return null
            return (
              <button key={t.id} className={`chip ${topicFilter === t.id ? 'active' : ''}`} onClick={() => setTopicFilter(t.id)}>
                {t.emoji} {t.label} ({n})
              </button>
            )
          })}
        </div>

        <button className="cta" onClick={() => start(false)} disabled={!pendents.length}>
          {pendents.length ? `Repassar ${pendents.length} pendents` : 'Cap pendent en aquest tema'}
        </button>
        <button className="cta ghost" onClick={() => start(true)} disabled={!pool.length}>
          Sessió lliure ({pool.length} targetes)
        </button>
        <p className="hint">
          La sessió lliure et deixa repassar el que vulguis sense esperar el calendari. Les notes que
          hi posis també compten per al repàs espaiat.
        </p>
      </div>
    )
  }

  // ---- Targeta ----
  const item = queue[idx]
  const front = item[direccio.front]
  const estat = srs[item.id]
  const topic = TOPICS.find((t) => t.id === item.topic)

  return (
    <div className="card-view">
      <div className="card-progress">
        <div className="bar"><div className="fill" style={{ width: `${(idx / queue.length) * 100}%` }} /></div>
        <span>{idx + 1} / {queue.length}</span>
      </div>

      <div className="flash">
        <div className="flash-topic">{topic?.emoji} {topic?.label}{estat?.reps ? ` · vista ${estat.reps}×` : ' · nova'}</div>
        <div className="flash-front">{front}</div>

        {shown ? (
          <div className="flash-back">
            <div className="fb-row"><span className="fb-lbl">Dialecte</span><b className="ch">{item.ch}</b>
              {ttsAvailable() && (
                <button className="speak" onClick={() => speak(item.ch, { voiceURI })} aria-label="Escoltar">🔊</button>
              )}
            </div>
            <div className="fb-row"><span className="fb-lbl">Hochdeutsch</span><span>{item.de}</span></div>
            <div className="fb-row"><span className="fb-lbl">Català</span><span>{item.ca}</span></div>
            {item.note && <p className="flash-note">{item.note}</p>}
          </div>
        ) : (
          <button className="reveal" onClick={() => setShown(true)}>Mostrar</button>
        )}
      </div>

      {shown && (
        <div className="grades">
          {GRADES.map((g) => (
            <button key={g.g} className={`grade ${g.cls}`} onClick={() => answer(g.g)}>
              <b>{g.label}</b><span>{g.hint}</span>
            </button>
          ))}
        </div>
      )}

      <button className="quit" onClick={() => { setQueue(null); setIdx(0) }}>Deixar-ho aquí</button>
    </div>
  )
}
