import { useEffect, useState } from 'react'
import { pushToGit, pullFromGit, isConfigured } from '../lib/sync.js'
import { importAll, resetSrs, resetQuiz, exportAll } from '../lib/db.js'
import { voices, onVoicesReady, speak, ttsAvailable } from '../lib/tts.js'
import { todayISO } from '../lib/srs.js'
import { useT } from '../i18n/index.jsx'

// Un sol repo, com al caleta-tracker: el codi i el progrés viuen junts.
// Els capítols de lectura NO hi van (vegeu src/lib/db.js).
const DEFECTES = { gh_owner: 'Gemmagf', gh_repo: 'schwiiz', gh_branch: 'main', gh_token: '' }

export default function Settings({ getConfig, setConfig, setToast, onReload, voiceURI, setVoiceURI, dirty, syncOn, mida, setMida, lang, setLang }) {
  const t = useT()
  const [gh, setGh] = useState({ gh_owner: 'Gemmagf', gh_repo: 'schwiiz', gh_branch: 'main', gh_token: '' })
  const [lastSync, setLastSync] = useState('')
  const [llista, setLlista] = useState([])
  const [ocupat, setOcupat] = useState(false)

  useEffect(() => {
    (async () => {
      const vals = {}
      for (const k of ['gh_owner', 'gh_repo', 'gh_branch', 'gh_token']) {
        vals[k] = (await getConfig(k)) || DEFECTES[k] || ''
      }
      // Hi va haver un moment amb un repo de dades a part. Ja no existeix:
      // si la config el té guardat, es corregeix sola.
      if (vals.gh_repo === 'schwiiz-data') {
        vals.gh_repo = 'schwiiz'
        await setConfig('gh_repo', 'schwiiz')
        setToast('Repo corregit a «schwiiz» ✓')
      }
      setGh(vals)
      setLastSync((await getConfig('lastSync')) || '')
    })()
    return onVoicesReady(setLlista)
  }, [])

  async function desar() {
    for (const [k, v] of Object.entries(gh)) await setConfig(k, v.trim())
    setToast(t('toast_saved'))
  }

  async function pujar() {
    setOcupat(true)
    try {
      let r
      try {
        r = await pushToGit()
      } catch (e) {
        if (e.codi !== 'possible-perdua') throw e
        // Millor perdre una sessió d'avui que la còpia bona de setmanes
        if (!confirm(`${e.message}\n\nVols pujar igualment i sobreescriure el que hi ha al repo?`)) {
          setToast('Pujada aturada. Prem «⬇ Baixar progrés».')
          setOcupat(false)
          return
        }
        r = await pushToGit({ force: true })
      }
      setToast(r.ok ? t('toast_pushed') : `No s’ha pogut pujar: ${r.reason}`)
      if (r.ok) { setLastSync(new Date().toISOString()); await onReload() }
    } catch (e) {
      setToast(`Error: ${e.message}`)
    }
    setOcupat(false)
  }

  async function baixar() {
    if (!confirm(t('confirm_pull'))) return
    setOcupat(true)
    try {
      const remot = await pullFromGit()
      if (!remot) setToast('No s’ha trobat cap estat al repo')
      else { await importAll(remot); await onReload(); setToast(t('toast_pulled')) }
    } catch (e) {
      setToast(`Error: ${e.message}`)
    }
    setOcupat(false)
  }

  // A iOS una PWA es pot quedar encallada en una versió antiga. Això la neteja de debò:
  // esborra el service worker i tota la memòria cau, i recarrega.
  async function actualitzar() {
    if (!confirm(t('confirm_update'))) return
    setOcupat(true)
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations()
        await Promise.all(regs.map((r) => r.unregister()))
      }
      if (window.caches) {
        const noms = await caches.keys()
        await Promise.all(noms.map((n) => caches.delete(n)))
      }
    } catch { /* si el navegador no ho permet, la recàrrega ja farà el que pugui */ }
    location.reload(true)
  }

  async function exportar() {
    const dades = await exportAll()
    const blob = new Blob([JSON.stringify(dades, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `schwiiz-progres-${todayISO()}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  async function esborrar(tipus) {
    if (!confirm(t('confirm_reset'))) return
    if (tipus === 'srs') await resetSrs()
    else await resetQuiz()
    await onReload()
    setToast(t('toast_deleted'))
  }

  const veus = llista.length ? llista : voices()

  return (
    <div className="settings">
      <h2>{t('set_language')}</h2>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="ca">Català</option>
        <option value="en">English</option>
      </select>
      <p className="hint">{t('set_language_hint')}</p>

      <h2>{t('set_review')}</h2>
      <label>{t('set_round_size')}</label>
      <select value={mida} onChange={(e) => setMida(Number(e.target.value))}>
        {[50, 100, 150, 200, 300, 500].map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <p className="hint">{t('set_round_hint')}</p>

      <h2>{t('set_pron')}</h2>
      {!ttsAvailable() ? (
        <p className="hint">Aquest navegador no té síntesi de veu.</p>
      ) : (
        <>
          <label>{t('set_voice')}</label>
          <select value={voiceURI || ''} onChange={(e) => setVoiceURI(e.target.value)}>
            <option value="">{t('set_voice_auto')}</option>
            {veus.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} — {v.lang}</option>)}
          </select>
          <div className="btn-row">
            <button onClick={() => speak('Grüezi mitenand, wie gaht’s?', { voiceURI })}>{t('set_voice_test')}</button>
          </div>
          <p className="hint warn">{t('set_voice_warn')}</p>
        </>
      )}

      <h2>{t('set_sync')}</h2>
      <p className="hint">{t('set_sync_hint')}</p>
      {syncOn && (
        <div className={`sync-state ${dirty ? 'pend' : 'ok'}`}>
          {dirty ? t('set_pending') : t('set_all_synced')}
        </div>
      )}
      <label>{t('set_user')}</label>
      <input value={gh.gh_owner} onChange={(e) => setGh({ ...gh, gh_owner: e.target.value })} placeholder="Gemmagf" autoCapitalize="off" />
      <label>{t('set_repo')}</label>
      <input value={gh.gh_repo} onChange={(e) => setGh({ ...gh, gh_repo: e.target.value })} autoCapitalize="off" />
      <label>{t('set_branch')}</label>
      <input value={gh.gh_branch} onChange={(e) => setGh({ ...gh, gh_branch: e.target.value })} autoCapitalize="off" />
      <label>Token (fine-grained sobre <code>schwiiz</code>, Contents: read/write)</label>
      <input type="password" value={gh.gh_token} onChange={(e) => setGh({ ...gh, gh_token: e.target.value })} placeholder="github_pat_..." autoCapitalize="off" />
      <p className="hint warn">{t('set_token_warn')}</p>
      <div className="btn-row">
        <button onClick={desar}>{t('set_save_cfg')}</button>
        <button onClick={pujar} disabled={ocupat}>{t('set_push')}</button>
        <button onClick={baixar} disabled={ocupat}>{t('set_pull')}</button>
      </div>
      {lastSync && <p className="hint">{t('set_last_sync', { d: new Date(lastSync).toLocaleString(t.lang === 'en' ? 'en-GB' : 'ca-ES') })}</p>}

      

      <h2>{t('set_version')}</h2>
      <p className="hint">{t('set_built', { d: typeof __BUILD__ !== 'undefined' ? __BUILD__ : '—' })}</p>
      <div className="btn-row">
        <button onClick={actualitzar} disabled={ocupat}>{t('set_force_update')}</button>
      </div>
      <p className="hint">{t('set_force_hint')}</p>

      <h2>{t('set_data')}</h2>
      <div className="btn-row">
        <button onClick={exportar}>{t('set_export')}</button>
        <button className="danger" onClick={() => esborrar('srs')}>{t('set_reset_cards')}</button>
        <button className="danger" onClick={() => esborrar('quiz')}>{t('set_reset_ex')}</button>
      </div>
    </div>
  )
}
