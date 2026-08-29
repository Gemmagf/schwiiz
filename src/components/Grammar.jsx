import { useMemo, useState } from 'react'
import { GRAMMAR } from '../data/grammar.js'
import { barreja } from '../lib/srs.js'

// Els punts admeten **negreta** — el suficient per destacar terminacions sense muntar un parser.
function Rich({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : <span key={i}>{p}</span>
      )}
    </>
  )
}

// Comparació tolerant: minúscules, sense accents ni signes, espais normalitzats.
function normalitza(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?¿¡;:]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
}

function Exercise({ ex, saved, onAnswer, onResolt }) {
  const [tria, setTria] = useState(null)
  const [text, setText] = useState('')
  const [resultat, setResultat] = useState(null) // null | true | false

  function comprovaTria(i) {
    if (resultat !== null) return
    setTria(i)
    const ok = i === ex.a
    setResultat(ok)
    onAnswer(ex.id, ok)
    onResolt?.(ok)
  }

  function comprovaText(e) {
    e.preventDefault()
    if (resultat !== null || !text.trim()) return
    const ok = ex.a.some((r) => normalitza(r) === normalitza(text))
    setResultat(ok)
    onAnswer(ex.id, ok)
    onResolt?.(ok)
  }

  function altraVegada() {
    setTria(null); setText(''); setResultat(null)
  }

  return (
    <li className="quiz-q">
      <p className="q-text"><Rich text={ex.q} /></p>

      {ex.type === 'choice' ? (
        <div className="q-options">
          {ex.options.map((o, i) => {
            let cls = 'q-opt'
            if (resultat !== null) {
              if (i === ex.a) cls += ' correct'
              else if (i === tria) cls += ' wrong'
              else cls += ' dim'
            }
            return (
              <button key={i} className={cls} disabled={resultat !== null} onClick={() => comprovaTria(i)}>
                {o}
              </button>
            )
          })}
        </div>
      ) : (
        <form className="q-gap" onSubmit={comprovaText}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="escriu la resposta"
            disabled={resultat !== null}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {resultat === null && <button type="submit">Comprovar</button>}
        </form>
      )}

      {resultat !== null && (
        <>
          <div className={`q-verdict ${resultat ? 'ok' : 'ko'}`}>
            {resultat ? '✓ Correcte' : `✗ La resposta és: ${ex.type === 'choice' ? ex.options[ex.a] : ex.a[0]}`}
          </div>
          <div className="q-explain">{ex.why}</div>
          <button className="retry" onClick={altraVegada}>Provar-ho un altre cop</button>
        </>
      )}

      {resultat === null && saved && (
        <div className="q-prev">{saved.ok ? 'L’havies encertada' : 'L’havies fallada'} · {saved.tries} intents</div>
      )}
    </li>
  )
}

// Tots els exercicis, amb el tema d'on surten, per poder-los barrejar.
const TOTS = GRAMMAR.flatMap((g) =>
  g.exercises.map((ex) => ({ ex, tema: g.title, emoji: g.emoji, unit: g.unit, book: g.book, lesson: g.lesson }))
)

// Tria N exercicis. No és del tot a l'atzar: primer els que no has fet mai,
// després els que vas fallar, i s'omple amb la resta. Al final, barrejat.
function triaExercicis(quiz, n, lliso) {
  const mai = [], fallats = [], encertats = []
  const font = lliso ? TOTS.filter((t) => t.lesson === lliso) : TOTS
  for (const t of font) {
    const q = quiz[t.ex.id]
    if (!q) mai.push(t)
    else if (!q.ok) fallats.push(t)
    else encertats.push(t)
  }
  return barreja([...barreja(fallats), ...barreja(mai), ...barreja(encertats)].slice(0, n))
}

function Practica({ quiz, onAnswer, lliso, titolLliso }) {
  const [mida, setMida] = useState(20)
  const [tanda, setTanda] = useState(null)
  const [i, setI] = useState(0)
  const [resolt, setResolt] = useState(false)
  const [encerts, setEncerts] = useState(0)

  const font = useMemo(() => (lliso ? TOTS.filter((t) => t.lesson === lliso) : TOTS), [lliso])
  const pendents = useMemo(
    () => font.filter((t) => !quiz[t.ex.id] || !quiz[t.ex.id].ok).length,
    [quiz, font]
  )

  function comenca() {
    setTanda(triaExercicis(quiz, mida, lliso))
    setI(0); setResolt(false); setEncerts(0)
  }

  if (!tanda) {
    return (
      <div className="practica">
        <p className="hint">
          {lliso
            ? `Només els exercicis de ${titolLliso}. Entren primer els que has fallat i els que no has fet mai.`
            : 'Una tanda d’exercicis barrejats de tots els temes. Entren primer els que has fallat i els que no has fet mai; la resta s’omple amb els que ja tens fets.'}
        </p>
        <div className="avui-box"><b>{pendents}</b><span>exercicis per encertar</span></div>
        <h2>Quants</h2>
        <div className="filters">
          {[10, 20, 30, 50].map((n) => (
            <button key={n} className={`chip ${mida === n ? 'active' : ''}`} onClick={() => setMida(n)}>{n}</button>
          ))}
        </div>
        <button className="cta" onClick={comenca}>Començar {Math.min(mida, font.length)} exercicis</button>
      </div>
    )
  }

  if (i >= tanda.length) {
    const pct = Math.round((encerts / tanda.length) * 100)
    return (
      <div className="practica">
        <div className="done-box">
          <b>{encerts} de {tanda.length} encertats ({pct}%)</b>
          <span>{pct >= 80 ? 'Molt bé 🎉' : pct >= 50 ? 'Va bé, insisteix-hi' : 'Toca repassar la teoria'}</span>
        </div>
        <button className="cta" onClick={comenca}>Una altra tanda</button>
        <button className="cta ghost" onClick={() => setTanda(null)}>Canviar la mida</button>
      </div>
    )
  }

  const actual = tanda[i]
  return (
    <div className="practica">
      <div className="card-progress">
        <div className="bar"><div className="fill" style={{ width: `${(i / tanda.length) * 100}%` }} /></div>
        <span>{i + 1} / {tanda.length}</span>
      </div>
      <div className="practica-tema">
        {actual.emoji} {actual.tema}
        {actual.unit && <em className="unit"> · {actual.book === 'schorn' ? `Schorn ${actual.unit}` : `Holle cap. ${actual.unit}`}</em>}
      </div>
      <ul className="quiz">
        <Exercise
          key={actual.ex.id}
          ex={actual.ex}
          saved={quiz[actual.ex.id]}
          onAnswer={onAnswer}
          onResolt={(ok) => { setResolt(true); if (ok) setEncerts((e) => e + 1) }}
        />
      </ul>
      {resolt && (
        <button className="cta" onClick={() => { setI(i + 1); setResolt(false) }}>
          {i + 1 < tanda.length ? 'Següent' : 'Veure el resultat'}
        </button>
      )}
      <button className="quit" onClick={() => setTanda(null)}>Deixar-ho aquí</button>
    </div>
  )
}

export default function Grammar({ quiz, onAnswer, practicaLliso, titolLliso, modeInicial }) {
  const [obert, setObert] = useState(GRAMMAR[0].id)
  const [mode, setMode] = useState(modeInicial || 'temes')

  return (
    <div className="grammar">
      <div className="subtabs">
        <button className={mode === 'temes' ? 'active' : ''} onClick={() => setMode('temes')}>📚 Per temes</button>
        <button className={mode === 'practica' ? 'active' : ''} onClick={() => setMode('practica')}>🎲 Practicar</button>
      </div>

      {mode === 'practica' && <Practica quiz={quiz} onAnswer={onAnswer} lliso={practicaLliso} titolLliso={titolLliso} />}

      {mode === 'temes' && (<>
      <p className="hint">
        Els temes segueixen l’ordre dels capítols de <b>Schweizerdeutsch verstehen</b> (Holle).
        Els que porten <b>Schorn</b> vénen del curs de classe i s’han col·locat al costat del
        capítol equivalent. Cada tema té l’explicació i després exercicis que es corregeixen sols.
      </p>

      {GRAMMAR.map((g) => {
        const isOpen = obert === g.id
        const fets = g.exercises.filter((e) => quiz[e.id]).length
        const ok = g.exercises.filter((e) => quiz[e.id]?.ok).length
        return (
          <section key={g.id} className="study-sec">
            <button className="study-head" onClick={() => setObert(isOpen ? null : g.id)}>
              <span className="sh-title">
                <span>{g.emoji} {g.title}</span>
                {g.unit && (
                  <em className="unit">
                    {g.book === 'schorn' ? `Schorn · ${g.unit}` : `Holle · cap. ${g.unit}`}
                  </em>
                )}
              </span>
              <span className="exam-count">{fets ? `${ok}/${g.exercises.length}` : `${g.exercises.length} ex.`} {isOpen ? '▾' : '▸'}</span>
            </button>

            {isOpen && (
              <>
                <p className="g-summary">{g.summary}</p>
                <ul className="study-points">
                  {g.points.map((p, i) => <li key={i}><Rich text={p} /></li>)}
                </ul>

                {g.table && (
                  <div className="g-table-wrap">
                    <table className="g-table">
                      <thead><tr>{g.table.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
                      <tbody>
                        {g.table.rows.map((r, i) => (
                          <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <h3 className="g-ex-title">Exercicis</h3>
                <ul className="quiz">
                  {g.exercises.map((ex) => (
                    <Exercise key={ex.id} ex={ex} saved={quiz[ex.id]} onAnswer={onAnswer} />
                  ))}
                </ul>
              </>
            )}
          </section>
        )
      })}
      </>)}
    </div>
  )
}
