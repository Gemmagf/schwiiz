import { TOPICS } from '../data/vocab.js'
import { GRAMMAR } from '../data/grammar.js'
import { PHRASES, DIALOGS } from '../data/phrases.js'
import { stats, todayISO } from '../lib/srs.js'

// Ratxa: dies consecutius amb almenys un repàs, comptant enrere des d'avui (o ahir).
function streak(sessions) {
  const days = new Set(sessions.filter((s) => s.reviewed > 0).map((s) => s.date))
  if (!days.size) return 0
  let n = 0
  const d = new Date(todayISO() + 'T00:00:00')
  if (!days.has(todayISO())) d.setDate(d.getDate() - 1) // ahir també val, avui encara hi ets a temps
  for (;;) {
    const iso = d.toISOString().slice(0, 10)
    if (!days.has(iso)) break
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}

export default function Dashboard({ vocab, srs, quiz, sessions, onStart, onGoTo }) {
  const s = stats(vocab, srs)
  const pendents = s.nous + s.arepassar
  const pct = s.total ? Math.round((s.apresos / s.total) * 100) : 0
  const totalEx = GRAMMAR.reduce((a, g) => a + g.exercises.length, 0)
  const exOk = Object.values(quiz).filter((q) => q.ok).length
  const ratxa = streak(sessions)
  const avui = sessions.find((x) => x.date === todayISO())

  return (
    <div className="dash">
      <div className="hero">
        <div className="ring" style={{ '--p': `${pct * 3.6}deg` }}>
          <div className="ring-num">{pct}%</div>
        </div>
        <p className="count">{s.apresos} de {s.total} paraules assentades</p>
        {ratxa > 0 && <div className="streak">🔥 {ratxa} {ratxa === 1 ? 'dia' : 'dies'} seguits</div>}
      </div>

      <button className="cta" onClick={onStart} disabled={pendents === 0}>
        {pendents > 0 ? `Repassar ${pendents} targetes` : 'Res per repassar avui 🎉'}
      </button>
      {pendents === 0 && (
        <p className="hint center">Torna demà, o entra a Repàs i força una sessió lliure.</p>
      )}
      {avui && <p className="hint center">Avui: {avui.reviewed} repassades · {avui.correct} encertades</p>}

      <h2>Com estàs</h2>
      <div className="stat-row">
        <div className="stat-cell new"><b>{s.nous}</b><span>noves</span></div>
        <div className="stat-cell due"><b>{s.arepassar}</b><span>a repassar</span></div>
        <div className="stat-cell ok"><b>{s.apresos}</b><span>assentades</span></div>
      </div>

      <h2>Per tema</h2>
      <div className="topic-grid">
        {TOPICS.map((t) => {
          const items = vocab.filter((v) => v.topic === t.id)
          if (!items.length) return null
          const ts = stats(items, srs)
          const p = ts.total ? Math.round((ts.apresos / ts.total) * 100) : 0
          return (
            <button key={t.id} className="topic-card" onClick={() => onGoTo('cards', t.id)}>
              <div className="topic-head"><span>{t.emoji}</span> {t.label}</div>
              <div className="bar"><div className="fill" style={{ width: `${p}%` }} /></div>
              <div className="topic-count">{ts.apresos}/{ts.total}</div>
            </button>
          )
        })}
      </div>

      <h2>La resta</h2>
      <div className="link-cards">
        <button className="link-card" onClick={() => onGoTo('gram')}>
          <b>📐 Gramàtica</b>
          <span>{GRAMMAR.length} temes · {exOk}/{totalEx} exercicis encertats</span>
        </button>
        <button className="link-card" onClick={() => onGoTo('frases')}>
          <b>💬 Frases i diàlegs</b>
          <span>{PHRASES.length} frases · {DIALOGS.length} diàlegs</span>
        </button>
      </div>
    </div>
  )
}
