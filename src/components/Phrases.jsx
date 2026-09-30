import { useState } from 'react'
import { PHRASES, PHRASE_TAGS, DIALOGS } from '../data/phrases.js'
import { speak, ttsAvailable } from '../lib/tts.js'
import Reader from './Reader.jsx'
import { useT } from '../i18n/index.jsx'

function Speak({ text, voiceURI }) {
  if (!ttsAvailable()) return null
  return <button className="speak" onClick={() => speak(text, { voiceURI })} aria-label="Escoltar">🔊</button>
}

export default function Phrases({ voiceURI, reader }) {
  const [vista, setVista] = useState('textos')
  const [tag, setTag] = useState('tots')
  const [tapat, setTapat] = useState(false)
  const [obert, setObert] = useState(DIALOGS[0].id)
  const t = useT()

  const llista = tag === 'tots' ? PHRASES : PHRASES.filter((p) => p.tag === tag)

  return (
    <div className="phrases">
      <div className="subtabs">
        <button className={vista === 'textos' ? 'active' : ''} onClick={() => setVista('textos')}>{t('read_texts')}</button>
        <button className={vista === 'dialegs' ? 'active' : ''} onClick={() => setVista('dialegs')}>{t('read_dialogues')}</button>
        <button className={vista === 'frases' ? 'active' : ''} onClick={() => setVista('frases')}>{t('read_phrases')}</button>
      </div>

      {vista === 'textos' && <Reader {...reader} voiceURI={voiceURI} />}

      {vista !== 'textos' && (
        <label className="cover-toggle">
          <input type="checkbox" checked={tapat} onChange={(e) => setTapat(e.target.checked)} />
          {t('read_cover')}
        </label>
      )}

      {vista === 'frases' ? (
        <>
          <div className="filters">
            <button className={`chip ${tag === 'tots' ? 'active' : ''}`} onClick={() => setTag('tots')}>{t('read_all_phrases')}</button>
            {PHRASE_TAGS.map((et) => (
              <button key={et.id} className={`chip ${tag === et.id ? 'active' : ''}`} onClick={() => setTag(et.id)}>
                {et.emoji} {t.nat(et, 'label', 'tag_')}
              </button>
            ))}
          </div>

          <p className="hint">{t('read_phrases_intro')}</p>

          <ul className="phrase-list">
            {llista.map((p) => (
              <li key={p.id}>
                <div className="ph-head">
                  <b className="ch">{p.ch}</b>
                  <Speak text={p.ch} voiceURI={voiceURI} />
                </div>
                <Hidden tapat={tapat}>
                  <div className="ph-ca">{t.nat(p)}</div>
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
                <span>{d.emoji} {t.nat({ id: d.id }, 'x') ?? d.title}</span>
                <span className="exam-count">{t('read_lines', { n: d.lines.length })} {isOpen ? '▾' : '▸'}</span>
              </button>
              {isOpen && (
                <>
                  <p className="g-summary">{t.nat({ id: d.id + '_set' }, 'x') ?? d.setting}</p>
                  <ul className="dialog">
                    {d.lines.map((l, i) => (
                      <li key={i} className={l.who === 'you' ? 'you' : 'them'}>
                        <div className="ph-head">
                          <b className="ch">{l.ch}</b>
                          <Speak text={l.ch} voiceURI={voiceURI} />
                        </div>
                        <Hidden tapat={tapat}>
                          <div className="ph-ca">{t.nat({ id: `${d.id}_${i}`, ca: l.ca }, 'ca')}</div>
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
  const t = useT()
  const [obert, setObert] = useState(false)
  if (!tapat || obert) return <div className="ph-trad">{children}</div>
  return (
    <button className="ph-trad covered" onClick={() => setObert(true)}>{t('read_reveal')}</button>
  )
}
