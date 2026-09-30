import { useMemo, useState } from 'react'
import { GRAMMAR } from '../data/grammar.js'
import { barreja } from '../lib/srs.js'
import { LESSONS } from '../data/lessons.js'
import { useT } from '../i18n/index.jsx'

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
  const t = useT()
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
            placeholder={t('gram_answer_ph')}
            disabled={resultat !== null}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {resultat === null && <button type="submit">{t('gram_check')}</button>}
        </form>
      )}

      {resultat !== null && (
        <>
          <div className={`q-verdict ${resultat ? 'ok' : 'ko'}`}>
            {resultat ? t('gram_correct') : t('gram_wrong', { a: ex.type === 'choice' ? ex.options[ex.a] : ex.a[0] })}
          </div>
          <div className="q-explain">{ex.why}</div>
          <button className="retry" onClick={altraVegada}>{t('gram_retry')}</button>
        </>
      )}

      {resultat === null && saved && (
        <div className="q-prev">{saved.ok ? t('gram_had_right') : t('gram_had_wrong')} · {t('gram_tries', { n: saved.tries })}</div>
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

function Practica({ quiz, onAnswer, lliso: llisoInicial, titolLliso }) {
  const t = useT()
  const [lliso, setLliso] = useState(llisoInicial || null)
  const [mida, setMida] = useState(20)
  const [tanda, setTanda] = useState(null)
  const [i, setI] = useState(0)
  const [resolt, setResolt] = useState(false)
  const [encerts, setEncerts] = useState(0)

  const font = useMemo(() => (lliso ? TOTS.filter((t) => t.lesson === lliso) : TOTS), [lliso])
  const nomLliso = LESSONS.find((l) => l.id === lliso)?.title
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
          Entren primer els que has fallat i els que no has fet mai; la resta s’omple amb els
          que ja tens fets.
        </p>

        <h2>{t('gram_which_class')}</h2>
        <div className="filters">
          <button className={`chip ${!lliso ? 'active' : ''}`} onClick={() => setLliso(null)}>
            Totes ({TOTS.length})
          </button>
          {LESSONS.filter((l) => l.date).map((l) => {
            const n = TOTS.filter((t) => t.lesson === l.id).length
            if (!n) return null
            return (
              <button key={l.id} className={`chip ${lliso === l.id ? 'active' : ''}`} onClick={() => setLliso(l.id)}>
                📘 {l.title.split('—')[0].trim()} ({n})
              </button>
            )
          })}
        </div>
        <div className="avui-box">
          <b>{pendents}</b>
          <span>per encertar{nomLliso ? ` de ${nomLliso.split('—')[0].trim()}` : ''}</span>
        </div>
        <h2>{t('prac_how_many')}</h2>
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
          <b>{t('prac_score', { a: encerts, b: tanda.length, p: pct })}</b>
          <span>{pct >= 80 ? t('prac_great') : pct >= 50 ? t('prac_ok') : t('prac_bad')}</span>
        </div>
        <button className="cta" onClick={comenca}>{t('prac_another')}</button>
        <button className="cta ghost" onClick={() => setTanda(null)}>{t('prac_resize')}</button>
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
        {actual.unit && (
          <em className="unit"> · {actual.book === 'schorn' ? 'Schorn' : 'Holle'} {/^\d/.test(actual.unit) ? `cap. ${actual.unit}` : actual.unit}</em>
        )}
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
          {i + 1 < tanda.length ? t('prac_next') : t('prac_result')}
        </button>
      )}
      <button className="quit" onClick={() => setTanda(null)}>{t('cards_quit')}</button>
    </div>
  )
}

export default function Grammar({ quiz, onAnswer, practicaLliso, titolLliso, modeInicial }) {
  const [obert, setObert] = useState(GRAMMAR[0].id)
  const [mode, setMode] = useState(modeInicial || 'temes')
  const t = useT()

  return (
    <div className="grammar">
      <div className="subtabs">
        <button className={mode === 'temes' ? 'active' : ''} onClick={() => setMode('temes')}>{t('gram_by_topic')}</button>
        <button className={mode === 'practica' ? 'active' : ''} onClick={() => setMode('practica')}>{t('gram_practice')}</button>
      </div>

      {mode === 'practica' && <Practica quiz={quiz} onAnswer={onAnswer} lliso={practicaLliso} titolLliso={titolLliso} />}

      {mode === 'temes' && (<>
      <p className="hint">{t('gram_intro')}</p>

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
                    {g.book === 'schorn' ? 'Schorn' : 'Holle'} · {/^\d/.test(g.unit) ? `cap. ${g.unit}` : g.unit}
                  </em>
                )}
              </span>
              <span className="exam-count">{fets ? `${ok}/${g.exercises.length}` : `${t('gram_ex_short', { n: g.exercises.length })}`} {isOpen ? '▾' : '▸'}</span>
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

                <h3 className="g-ex-title">{t('gram_exercises')}</h3>
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
