import { useEffect, useMemo, useState } from 'react'
import { READINGS, BOOKS } from '../data/readings.js'
import { cerca, tokenitza, normalitza, rebuildIndex } from '../lib/lookup.js'
import { speak, ttsAvailable } from '../lib/tts.js'
import { useT } from '../i18n/index.jsx'

const buit = { ch: '', de: '', ca: '' }

export default function Reader({ userCards, texts, onAddCard, onUpdateCard, onDeleteCard, onAddText, onDeleteText, voiceURI }) {
  const [vista, setVista] = useState('llista')     // llista | text | afegir | paraules
  const [actiu, setActiu] = useState(null)         // lectura oberta
  const [sel, setSel] = useState(null)             // { raw, trobat }
  const [form, setForm] = useState(buit)
  const [nou, setNou] = useState({ title: '', book: 'hansdampf', body: '' })
  const t = useT()

  // L'índex de cerca ha d'incloure les teves targetes: el que hi has posat tu mana.
  useEffect(() => { rebuildIndex(userCards) }, [userCards])

  // Paraules del text que ja tens recollides. Es resol amb la mateixa cerca que el toc,
  // perquè "gfahre" s'ha de marcar encara que la targeta sigui "fahre".
  const meves = useMemo(() => {
    const marcades = new Set()
    if (!actiu || !userCards.length) return marcades
    const vistes = new Set()
    for (const tok of tokenitza(actiu.body)) {
      if (!tok.w) continue
      const clau = normalitza(tok.t)
      if (vistes.has(clau)) continue
      vistes.add(clau)
      if (cerca(tok.t, userCards)?.font === 'teva') marcades.add(clau)
    }
    return marcades
  }, [actiu, userCards])

  function tocaParaula(raw) {
    const trobat = cerca(raw, userCards)
    setSel({ raw, trobat })
    setForm(trobat
      ? { ch: trobat.ch, de: trobat.de || '', ca: trobat.ca || '' }
      : { ch: raw, de: '', ca: '' })
  }

  function guardaTargeta() {
    const jaLaTens = userCards.find((c) => normalitza(c.ch) === normalitza(form.ch))
    const dades = {
      ch: form.ch.trim(),
      de: form.de.trim(),
      ca: form.ca.trim(),
      topic: 'lectura',
      source: actiu ? actiu.title : 'lectura'
    }
    if (!dades.ch) return
    if (jaLaTens) onUpdateCard({ ...jaLaTens, ...dades })
    else onAddCard(dades)
    setSel(null)
  }

  // ---------- Llista de lectures ----------
  if (vista === 'llista') {
    return (
      <div className="reader">
        <div className="reader-bar">
          <button className="mini" onClick={() => setVista('afegir')}>{t('read_add_text')}</button>
          <button className="mini" onClick={() => setVista('paraules')}>
            {t('read_my_words', { n: userCards.length })}
          </button>
        </div>

        {texts.length > 0 && <h2>{t('read_your_chapters')}</h2>}
        {texts.map((t) => (
          <div key={t.id} className="read-card">
            <button className="read-open" onClick={() => { setActiu(t); setVista('text') }}>
              <b>{t.title}</b>
              <span>{BOOKS.find((b) => b.id === t.book)?.title || 'text propi'} · {t.body.split(/\s+/).length} paraules</span>
            </button>
            <button className="del" onClick={() => { if (confirm(`Esborrar «${t.title}»?`)) onDeleteText(t.id) }}>🗑</button>
          </div>
        ))}

        <h2>{t('read_samples')}</h2>
        <p className="hint">{t('read_samples_hint')}</p>
        {READINGS.map((r) => (
          <div key={r.id} className="read-card">
            <button className="read-open" onClick={() => { setActiu(r); setVista('text') }}>
              <b>{r.title}</b>
              <span>{r.level} · {r.subtitle}</span>
            </button>
          </div>
        ))}
      </div>
    )
  }

  // ---------- Afegir un capítol ----------
  if (vista === 'afegir') {
    return (
      <div className="reader">
        <button className="tornar" onClick={() => setVista('llista')}>{t('read_back')}</button>
        <h2>{t('read_add_text')}</h2>
        <p className="hint">{t('read_add_hint')}</p>
        <label>{t('read_title')}</label>
        <input value={nou.title} onChange={(e) => setNou({ ...nou, title: e.target.value })} placeholder="p. ex. Hansdampf — Kapitel 3" />
        <label>{t('read_from')}</label>
        <select value={nou.book} onChange={(e) => setNou({ ...nou, book: e.target.value })}>
          {BOOKS.map((b) => <option key={b.id} value={b.id}>{b.title}</option>)}
          <option value="altre">{t('read_other')}</option>
        </select>
        <label>{t('read_text')}</label>
        <textarea rows={12} value={nou.body} onChange={(e) => setNou({ ...nou, body: e.target.value })} placeholder={t('read_text_ph')} />
        <div className="btn-row">
          <button
            disabled={!nou.title.trim() || !nou.body.trim()}
            onClick={() => {
              onAddText({ id: 't' + Date.now(), ...nou, title: nou.title.trim(), body: nou.body.trim() })
              setNou({ title: '', book: 'hansdampf', body: '' })
              setVista('llista')
            }}
          >{t('read_save')}</button>
        </div>
      </div>
    )
  }

  // ---------- Les meves paraules ----------
  if (vista === 'paraules') {
    return (
      <div className="reader">
        <button className="tornar" onClick={() => setVista('llista')}>{t('read_back')}</button>
        <h2>{t('read_my_words', { n: userCards.length })}</h2>
        <p className="hint">{t('read_words_hint')}</p>
        {!userCards.length && <p className="hint">{t('read_no_words')}</p>}
        <ul className="mywords">
          {userCards.map((c) => (
            <li key={c.id} className={c.ca ? '' : 'pendent'}>
              <div className="mw-head">
                <b className="ch">{c.ch}</b>
                {ttsAvailable() && <button className="speak" onClick={() => speak(c.ch, { voiceURI })}>🔊</button>}
                <button className="del" onClick={() => { if (confirm(`Esborrar «${c.ch}»?`)) onDeleteCard(c.id) }}>🗑</button>
              </div>
              {c.ca ? <div className="ph-ca">{c.ca}</div> : <div className="mw-todo">{t('read_no_translation')}</div>}
              {c.de && <div className="ph-de">{c.de}</div>}
              <div className="mw-src">{t('read_from_label', { s: c.source })}</div>
              <button className="retry" onClick={() => { setSel({ raw: c.ch, trobat: { ...c, font: 'teva' } }); setForm({ ch: c.ch, de: c.de || '', ca: c.ca || '' }) }}>
                Editar
              </button>
            </li>
          ))}
        </ul>
        {sel && <Panel {...{ sel, form, setForm, setSel, guardaTargeta, voiceURI, userCards }} />}
      </div>
    )
  }

  // ---------- Lectura ----------
  const paragrafs = actiu.body.split(/\n\s*\n/)
  return (
    <div className="reader">
      <button className="tornar" onClick={() => { setVista('llista'); setSel(null) }}>{t('read_back')}</button>
      <h1 className="read-title">{actiu.title}</h1>
      {actiu.intro && <p className="read-intro">{actiu.intro}</p>}
      <p className="hint">{t('read_tap_hint')}</p>

      <div className="read-body">
        {paragrafs.map((p, i) => (
          <p key={i}>
            {tokenitza(p).map((tok, j) =>
              tok.w ? (
                <button
                  key={j}
                  className={`w ${meves.has(normalitza(tok.t)) ? 'tinc' : ''} ${sel?.raw === tok.t ? 'sel' : ''}`}
                  onClick={() => tocaParaula(tok.t)}
                >{tok.t}</button>
              ) : (
                <span key={j}>{tok.t}</span>
              )
            )}
          </p>
        ))}
      </div>

      {ttsAvailable() && (
        <button className="cta ghost" onClick={() => speak(actiu.body.replace(/\n+/g, '. '), { voiceURI })}>
          {t('read_listen_all')}
        </button>
      )}

      {sel && <Panel {...{ sel, form, setForm, setSel, guardaTargeta, voiceURI, userCards }} />}
    </div>
  )
}

// Panell inferior amb la paraula tocada.
function Panel({ sel, form, setForm, setSel, guardaTargeta, voiceURI, userCards }) {
  const tt = useT()
  const jaLaTens = userCards.find((c) => normalitza(c.ch) === normalitza(form.ch))
  const trob = sel.trobat

  return (
    <>
      <div className="panel-fons" onClick={() => setSel(null)} />
      <div className="panel">
        <div className="panel-head">
          <b className="ch">{sel.raw}</b>
          {ttsAvailable() && <button className="speak" onClick={() => speak(sel.raw, { voiceURI })}>🔊</button>}
          <button className="panel-x" onClick={() => setSel(null)}>✕</button>
        </div>

        {trob ? (
          <div className="panel-found">
            {!trob.exacte && trob.formaBuscada && (
              <div className="panel-via">{tt('read_base_form')} <b>{trob.ch}</b></div>
            )}
            <div className="fb-row"><span className="fb-lbl">{tt('lbl_native')}</span><span>{trob.ca || '—'}</span></div>
            <div className="fb-row"><span className="fb-lbl">{tt('lbl_german')}</span><span>{trob.de || '—'}</span></div>
            {trob.note && <p className="flash-note">{trob.note}</p>}
            <div className="panel-font">
              {trob.font === 'teva' ? tt('read_from_yours') : tt('read_from_src', { s: trob.font })}
            </div>
          </div>
        ) : (
          <p className="panel-nores">{tt('read_not_found')}</p>
        )}

        <label>{tt('read_save_as')}</label>
        <input value={form.ch} onChange={(e) => setForm({ ...form, ch: e.target.value })} placeholder={tt('lbl_dialect')} />
        <label>{tt('lbl_native')}</label>
        <input value={form.ca} onChange={(e) => setForm({ ...form, ca: e.target.value })} placeholder={tt('read_meaning_ph')} />
        <label>{tt('read_de_ph')}</label>
        <input value={form.de} onChange={(e) => setForm({ ...form, de: e.target.value })} placeholder={tt('read_de_ph')} />

        <div className="btn-row">
          <button onClick={guardaTargeta} disabled={!form.ch.trim()}>
            {jaLaTens ? tt('read_update_card') : tt('read_add_card')}
          </button>
        </div>
      </div>
    </>
  )
}
