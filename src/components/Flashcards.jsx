import { useEffect, useMemo, useRef, useState } from 'react'
import { TOPICS } from '../data/vocab.js'
import { LESSONS } from '../data/lessons.js'
import { GRADES, dueCards, construeixTanda, grade as gradeCard, newCard } from '../lib/srs.js'
import { speak, ttsAvailable } from '../lib/tts.js'
import { useT } from '../i18n/index.jsx'

const DIRECTIONS = [
  { id: 'ch2ca', clau: 'dir_ch2x', front: 'ch' },
  { id: 'ca2ch', clau: 'dir_x2ch', front: 'nat' },
  { id: 'de2ch', clau: 'dir_de2ch', front: 'de' }
]

export default function Flashcards({
  vocab = [], srs, onGrade, mida = 200, avuiFetes = 0,
  topicFilter, setTopicFilter, lessonFilter, setLessonFilter, dir, setDir, voiceURI
}) {
  const [queue, setQueue] = useState(null) // null = encara no s'ha començat
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState(false)
  const [done, setDone] = useState(0)
  const [ronda, setRonda] = useState(0)
  const [lliure, setLliure] = useState(false)
  const [filtresOberts, setFiltresOberts] = useState(true)
  const t = useT()

  // Les que has marcat «Costa» tornen una vegada dins de la mateixa tanda.
  // Amb el Set evitem que una targeta difícil et faci un bucle infinit.
  const reintentades = useRef(new Set())

  const pool = useMemo(() => {
    let p = vocab
    if (lessonFilter !== 'tots') p = p.filter((v) => (v.lesson || 'base') === lessonFilter)
    if (topicFilter !== 'tots') p = p.filter((v) => v.topic === topicFilter)
    return p
  }, [topicFilter, lessonFilter, vocab])

  const pendents = useMemo(() => dueCards(pool, srs), [pool, srs])

  useEffect(() => {
    setQueue(null); setIdx(0); setShown(false); setDone(0); setRonda(0)
  }, [topicFilter, lessonFilter, dir])

  function comenca(forcarTot = false) {
    const base = forcarTot ? pool : pendents
    if (!base.length) return
    reintentades.current = new Set()
    setQueue(forcarTot ? construeixTanda(base, {}, mida) : construeixTanda(base, srs, mida))
    setIdx(0); setShown(false); setDone(0)
    setRonda((r) => r + 1)
    setLliure(forcarTot)
  }

  function answer(g) {
    const item = queue[idx]
    const nou = gradeCard(srs[item.id] || newCard(item.id), g)
    onGrade(nou, g >= 2)

    let q = queue
    if (g === 0) {
      q = [...queue, item] // no la sabies: torna sí o sí
    } else if (g === 1 && !reintentades.current.has(item.id)) {
      reintentades.current.add(item.id)
      q = [...queue, item] // et costava: torna un cop més abans d'acabar
    }
    setQueue(q)
    setDone((d) => d + 1)
    setIdx(idx + 1)
    setShown(false)
  }

  const direccio = DIRECTIONS.find((d) => d.id === dir) || DIRECTIONS[0]

  // ---------- Inici / final de tanda ----------
  if (!queue || idx >= queue.length) {
    const acabada = queue && idx >= queue.length
    const seguents = Math.min(mida, pendents.length)

    return (
      <div className="cards-intro">
        {acabada && (
          <div className="done-box">
            <b>{t('cards_round_done', { n: ronda })}</b>
            <span>
              {done} {t('cards_cards')}{lliure ? t('cards_free_note') : ''}
            </span>
          </div>
        )}

        <div className="avui-box">
          <b>{avuiFetes}</b>
          <span>{t('cards_today')}</span>
        </div>

        <button className="cta" onClick={() => comenca(false)} disabled={!seguents}>
          {seguents
            ? acabada ? t('cards_another', { n: seguents }) : t('dash_review_n', { n: seguents })
            : t('dash_nothing')}
        </button>

        {!seguents && (
          <p className="hint center">
            {t('cards_all_done')}
          </p>
        )}
        {Boolean(seguents) && pendents.length > mida && (
          <p className="hint center">
            {t('cards_left', { n: pendents.length, m: mida })}
          </p>
        )}

        <button className="cta ghost" onClick={() => comenca(true)} disabled={!pool.length}>
          {t('cards_free', { n: Math.min(mida, pool.length) })}
        </button>

        <button className="filtres-toggle" onClick={() => setFiltresOberts(!filtresOberts)}>
          {filtresOberts ? '▾' : '▸'} {t('cards_filters')}
          {(topicFilter !== 'tots' || lessonFilter !== 'tots') && <span className="punt" />}
        </button>

        {filtresOberts && (
          <div className="filtres-panel">
            <h2>{t('cards_direction')}</h2>
            <div className="dir-list">
              {DIRECTIONS.map((d) => (
                <button key={d.id} className={`dir-btn ${dir === d.id ? 'active' : ''}`} onClick={() => setDir(d.id)}>
                  <b>{t(d.clau)}</b><span>{t(d.clau + '_hint')}</span>
                </button>
              ))}
            </div>

            <h2>{t('cards_source')}</h2>
            <div className="filters">
              <button className={`chip ${lessonFilter === 'tots' ? 'active' : ''}`} onClick={() => setLessonFilter('tots')}>
                {t('cards_all', { n: vocab.length })}
              </button>
              {LESSONS.map((l) => {
                const n = vocab.filter((v) => (v.lesson || 'base') === l.id).length
                if (!n) return null
                return (
                  <button key={l.id} className={`chip ${lessonFilter === l.id ? 'active' : ''}`} onClick={() => setLessonFilter(l.id)}>
                    {l.date ? `📘 ${l.title.split('—')[0].trim()}` : `📗 ${t('cards_basics')}`} ({n})
                  </button>
                )
              })}
            </div>

            <h2>{t('cards_topic')}</h2>
            <div className="filters">
              <button className={`chip ${topicFilter === 'tots' ? 'active' : ''}`} onClick={() => setTopicFilter('tots')}>
                {t('cards_all_topics', { n: pool.length })}
              </button>
              {TOPICS.map((tp) => {
                const base = lessonFilter === 'tots' ? vocab : vocab.filter((v) => (v.lesson || 'base') === lessonFilter)
                const n = base.filter((v) => v.topic === tp.id).length
                if (!n) return null
                return (
                  <button key={tp.id} className={`chip ${topicFilter === tp.id ? 'active' : ''}`} onClick={() => setTopicFilter(tp.id)}>
                    {tp.emoji} {t.nat(tp, 'label')} ({n})
                  </button>
                )
              })}
            </div>

            {(topicFilter !== 'tots' || lessonFilter !== 'tots') && (
              <button className="quit" onClick={() => { setTopicFilter('tots'); setLessonFilter('tots') }}>
                {t('cards_clear_filters')}
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  // ---------- Targeta ----------
  const item = queue[idx]
  const front = direccio.front === 'nat' ? t.nat(item) : item[direccio.front]
  const estat = srs[item.id]
  const topic = TOPICS.find((t) => t.id === item.topic)

  return (
    <div className="card-view">
      <div className="card-progress">
        <div className="bar"><div className="fill" style={{ width: `${(idx / queue.length) * 100}%` }} /></div>
        <span>{idx + 1} / {queue.length}</span>
      </div>

      <div className="flash">
        <div className="flash-topic">
          {topic?.emoji} {t.nat(topic, 'label')}
          {estat?.reps ? ` · ${t('cards_seen', { n: estat.reps })}` : ` · ${t('cards_new')}`}
          {estat?.lapses ? ` · ${t('cards_failed', { n: estat.lapses })}` : ''}
        </div>
        <div className="flash-front">{front}</div>

        {shown ? (
          <div className="flash-back">
            <div className="fb-row"><span className="fb-lbl">{t('lbl_dialect')}</span><b className="ch">{item.ch}</b>
              {ttsAvailable() && (
                <button className="speak" onClick={() => speak(item.ch, { voiceURI })} aria-label="Escoltar">🔊</button>
              )}
            </div>
            <div className="fb-row"><span className="fb-lbl">{t('lbl_german')}</span><span>{item.de}</span></div>
            <div className="fb-row"><span className="fb-lbl">{t('lbl_native')}</span><span>{t.nat(item)}</span></div>
            {item.note && <p className="flash-note">{item.note}</p>}
          </div>
        ) : (
          <button className="reveal" onClick={() => setShown(true)}>{t('cards_show')}</button>
        )}
      </div>

      {shown && (
        <div className="grades">
          {GRADES.map((g) => (
            <button key={g.g} className={`grade ${g.cls}`} onClick={() => answer(g.g)}>
              <b>{t('grade_' + g.cls)}</b><span>{t('grade_' + g.cls + '_hint')}</span>
            </button>
          ))}
        </div>
      )}

      <button className="quit" onClick={() => { setQueue(null); setIdx(0) }}>{t('cards_quit')}</button>
    </div>
  )
}
