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
    const iso = todayISO(d) // todayISO respecta el fus; toISOString() se n'aniria al dia anterior
    if (!days.has(iso)) break
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}

// Millor ratxa històrica: la tira més llarga de dies consecutius amb almenys un repàs.
function millorRatxa(sessions) {
  const dies = [...new Set(sessions.filter((s) => s.reviewed > 0).map((s) => s.date))].sort()
  let millor = 0, actual = 0, previ = null
  for (const d of dies) {
    if (previ) {
      const ahir = new Date(d + 'T00:00:00')
      ahir.setDate(ahir.getDate() - 1)
      actual = todayISO(ahir) === previ ? actual + 1 : 1
    } else actual = 1
    if (actual > millor) millor = actual
    previ = d
  }
  return millor
}

// Els últims 30 dies, dia a dia, hi hagi hagut activitat o no.
function ultims30(sessions) {
  const avui = new Date(todayISO() + 'T00:00:00')
  const serie = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(avui)
    d.setDate(d.getDate() - i)
    const iso = todayISO(d)
    const s = sessions.find((x) => x.date === iso)
    serie.push({
      iso,
      repassades: s?.reviewed || 0,
      exercicis: s?.exercicis || 0,
      total: (s?.reviewed || 0) + (s?.exercicis || 0)
    })
  }
  return serie
}

function Evolucio({ sessions }) {
  const serie = ultims30(sessions)
  const max = Math.max(1, ...serie.map((d) => d.total))
  const totalRepassades = sessions.reduce((a, s) => a + s.reviewed, 0)
  const totalExercicis = sessions.reduce((a, s) => a + (s.exercicis || 0), 0)
  const totalEncertades = sessions.reduce((a, s) => a + s.correct + (s.exercicisOk || 0), 0)
  const diesEstudiats = sessions.filter((s) => s.reviewed > 0 || (s.exercicis || 0) > 0).length
  const fets = totalRepassades + totalExercicis
  const encert = fets ? Math.round((totalEncertades / fets) * 100) : 0

  if (!diesEstudiats) {
    return <p className="hint">Quan comencis a repassar, aquí hi veuràs l’evolució dia a dia.</p>
  }

  return (
    <>
      <div className="sparkbars" role="img" aria-label={`Repassos dels últims 30 dies, màxim ${max} en un dia`}>
        {serie.map((d) => (
          <div key={d.iso} className="sb" title={`${d.iso}: ${d.repassades} targetes · ${d.exercicis} exercicis`}>
            {d.total === 0 && <div className="sb-fill buit" style={{ height: '2%' }} />}
            {d.exercicis > 0 && (
              <div className="sb-fill ex" style={{ height: `${Math.max(4, (d.exercicis / max) * 100)}%` }} />
            )}
            {d.repassades > 0 && (
              <div className="sb-fill" style={{ height: `${Math.max(4, (d.repassades / max) * 100)}%` }} />
            )}
          </div>
        ))}
      </div>
      <div className="spark-eixos"><span>fa 30 dies</span><span>avui</span></div>

      <div className="spark-llegenda">
        <span><i className="mostra targ" /> targetes</span>
        <span><i className="mostra exer" /> exercicis</span>
      </div>

      <div className="stat-row">
        <div className="stat-cell"><b>{diesEstudiats}</b><span>dies estudiats</span></div>
        <div className="stat-cell"><b>{totalRepassades}</b><span>targetes</span></div>
        <div className="stat-cell"><b>{totalExercicis}</b><span>exercicis</span></div>
        <div className="stat-cell ok"><b>{encert}%</b><span>d’encert</span></div>
      </div>
    </>
  )
}

export default function Dashboard({ vocab = [], srs, quiz, sessions, onStart, onGoTo }) {
  const s = stats(vocab, srs)
  const pendents = s.nous + s.arepassar
  const pct = s.total ? Math.round((s.apresos / s.total) * 100) : 0
  const totalEx = GRAMMAR.reduce((a, g) => a + g.exercises.length, 0)
  const exOk = Object.values(quiz).filter((q) => q.ok).length
  const pctGram = totalEx ? Math.round((exOk / totalEx) * 100) : 0
  const ratxa = streak(sessions)
  const avui = sessions.find((x) => x.date === todayISO())

  return (
    <div className="dash">
      <div className="hero">
        <div className="anells">
          <div className="anell-bloc">
            <div className="ring" style={{ '--p': `${pct * 3.6}deg` }}>
              <div className="ring-num">{pct}%</div>
            </div>
            <b>Vocabulari</b>
            <span>{s.apresos} de {s.total} paraules</span>
          </div>
          <div className="anell-bloc">
            <div className="ring gram" style={{ '--p': `${pctGram * 3.6}deg` }}>
              <div className="ring-num">{pctGram}%</div>
            </div>
            <b>Gramàtica entesa</b>
            <span>{exOk} de {totalEx} exercicis</span>
          </div>
        </div>
        {ratxa > 0 && (
          <div className="streak">
            🔥 {ratxa} {ratxa === 1 ? 'dia' : 'dies'} seguits
            {millorRatxa(sessions) > ratxa && <em> · rècord {millorRatxa(sessions)}</em>}
          </div>
        )}
      </div>

      <button className="cta" onClick={onStart} disabled={pendents === 0}>
        {pendents > 0 ? `Repassar ${pendents} targetes` : 'Res per repassar avui 🎉'}
      </button>
      {pendents === 0 && (
        <p className="hint center">Torna demà, o entra a Repàs i força una sessió lliure.</p>
      )}
      {avui && (
        <p className="hint center">
          Avui: {avui.reviewed} {avui.reviewed === 1 ? 'targeta' : 'targetes'}
          {' · '}{avui.exercicis || 0} {avui.exercicis === 1 ? 'exercici' : 'exercicis'} de gramàtica
        </p>
      )}

      <h2>La teva evolució</h2>
      <Evolucio sessions={sessions} />

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
          <span>{GRAMMAR.length} temes · en queden {totalEx - exOk} per encertar</span>
        </button>
        <button className="link-card" onClick={() => onGoTo('frases')}>
          <b>💬 Frases i diàlegs</b>
          <span>{PHRASES.length} frases · {DIALOGS.length} diàlegs</span>
        </button>
      </div>
    </div>
  )
}
