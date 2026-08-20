import { useState } from 'react'
import { PHRASES, PHRASE_TAGS, DIALOGS } from '../data/phrases.js'
import { speak, ttsAvailable } from '../lib/tts.js'
import Reader from './Reader.jsx'

function Speak({ text, voiceURI }) {
  if (!ttsAvailable()) return null
  return <button className="speak" onClick={() => speak(text, { voiceURI })} aria-label="Escoltar">🔊</button>
}

export default function Phrases({ voiceURI, reader }) {
  const [vista, setVista] = useState('textos')
  const [tag, setTag] = useState('tots')
  const [tapat, setTapat] = useState(false)
  const [obert, setObert] = useState(DIALOGS[0].id)

  const llista = tag === 'tots' ? PHRASES : PHRASES.filter((p) => p.tag === tag)

  return (
    <div className="phrases">
      <div className="subtabs">
        <button className={vista === 'textos' ? 'active' : ''} onClick={() => setVista('textos')}>📖 Textos</button>
        <button className={vista === 'dialegs' ? 'active' : ''} onClick={() => setVista('dialegs')}>🎭 Diàlegs</button>
        <button className={vista === 'frases' ? 'active' : ''} onClick={() => setVista('frases')}>💬 Frases</button>
      </div>

      {vista === 'textos' && <Reader {...reader} voiceURI={voiceURI} />}

      {vista !== 'textos' && (
        <label className="cover-toggle">
          <input type="checkbox" checked={tapat} onChange={(e) => setTapat(e.target.checked)} />
          Tapar les traduccions (toca per destapar)
        </label>
      )}

      {vista === 'frases' ? (
        <>
          <div className="filters">
            <button className={`chip ${tag === 'tots' ? 'active' : ''}`} onClick={() => setTag('tots')}>Totes</button>
            {PHRASE_TAGS.map((t) => (
              <button key={t.id} className={`chip ${tag === t.id ? 'active' : ''}`} onClick={() => setTag(t.id)}>
                {t.emoji} {t.label}
              </button>
            ))}
          </div>

          <p className="hint">
            Les situacions segueixen els capítols 28–34 de <b>Schweizerdeutsch verstehen</b>.
            {tag !== 'tots' && (() => {
              const t = PHRASE_TAGS.find((x) => x.id === tag)
              return t ? ` Ara mires el capítol ${t.unit}: ${t.label}.` : null
            })()}
          </p>

          <ul className="phrase-list">
            {llista.map((p) => (
              <li key={p.id}>
                <div className="ph-head">
                  <b className="ch">{p.ch}</b>
                  <Speak text={p.ch} voiceURI={voiceURI} />
                </div>
                <Hidden tapat={tapat}>
                  <div className="ph-ca">{p.ca}</div>
                  <div className="ph-de">{p.de}</div>
                </Hidden>
                {p.note && <div className="ph-note">{p.note}</div>}
              </li>
            ))}
          </ul>
        </>
      ) : vista === 'dialegs' ? (
        DIALOGS.map((d) => {
          const isOpen = obert === d.id
          return (
            <section key={d.id} className="study-sec">
              <button className="study-head" onClick={() => setObert(isOpen ? null : d.id)}>
                <span>{d.emoji} {d.title}</span>
                <span className="exam-count">{d.lines.length} línies {isOpen ? '▾' : '▸'}</span>
              </button>
              {isOpen && (
                <>
                  <p className="g-summary">{d.setting}</p>
                  <ul className="dialog">
                    {d.lines.map((l, i) => (
                      <li key={i} className={l.who === 'you' ? 'you' : 'them'}>
                        <div className="ph-head">
                          <b className="ch">{l.ch}</b>
                          <Speak text={l.ch} voiceURI={voiceURI} />
                        </div>
                        <Hidden tapat={tapat}>
                          <div className="ph-ca">{l.ca}</div>
                          <div className="ph-de">{l.de}</div>
                        </Hidden>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )
        })
      ) : null}
    </div>
  )
}

// Amaga la traducció fins que s'hi toca a sobre — per autoavaluar-se llegint.
function Hidden({ tapat, children }) {
  const [obert, setObert] = useState(false)
  if (!tapat || obert) return <div className="ph-trad">{children}</div>
  return (
    <button className="ph-trad covered" onClick={() => setObert(true)}>toca per veure la traducció</button>
  )
}
