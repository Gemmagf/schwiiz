import { useState } from 'react'
import { GRAMMAR } from '../data/grammar.js'

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

function Exercise({ ex, saved, onAnswer }) {
  const [tria, setTria] = useState(null)
  const [text, setText] = useState('')
  const [resultat, setResultat] = useState(null) // null | true | false

  function comprovaTria(i) {
    if (resultat !== null) return
    setTria(i)
    const ok = i === ex.a
    setResultat(ok)
    onAnswer(ex.id, ok)
  }

  function comprovaText(e) {
    e.preventDefault()
    if (resultat !== null || !text.trim()) return
    const ok = ex.a.some((r) => normalitza(r) === normalitza(text))
    setResultat(ok)
    onAnswer(ex.id, ok)
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

export default function Grammar({ quiz, onAnswer }) {
  const [obert, setObert] = useState(GRAMMAR[0].id)

  return (
    <div className="grammar">
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
    </div>
  )
}
