import { useEffect, useState } from 'react'
import { pushToGit, pullFromGit, isConfigured } from '../lib/sync.js'
import { importAll, resetSrs, resetQuiz, exportAll } from '../lib/db.js'
import { voices, onVoicesReady, speak, ttsAvailable } from '../lib/tts.js'
import { todayISO } from '../lib/srs.js'

// Un sol repo, com al caleta-tracker: el codi i el progrés viuen junts.
// Els capítols de lectura NO hi van (vegeu src/lib/db.js).
const DEFECTES = { gh_owner: 'Gemmagf', gh_repo: 'schwiiz', gh_branch: 'main', gh_token: '' }

export default function Settings({ getConfig, setConfig, setToast, onReload, voiceURI, setVoiceURI, dirty, syncOn, mida, setMida }) {
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
    setToast('Configuració desada ✓')
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
      setToast(r.ok ? 'Progrés pujat a git ✓' : `No s’ha pogut pujar: ${r.reason}`)
      if (r.ok) { setLastSync(new Date().toISOString()); await onReload() }
    } catch (e) {
      setToast(`Error: ${e.message}`)
    }
    setOcupat(false)
  }

  async function baixar() {
    if (!confirm('Això SOBREESCRIU el progrés d’aquest mòbil amb el que hi ha al repo. Segur?')) return
    setOcupat(true)
    try {
      const remot = await pullFromGit()
      if (!remot) setToast('No s’ha trobat cap estat al repo')
      else { await importAll(remot); await onReload(); setToast('Progrés recuperat del repo ✓') }
    } catch (e) {
      setToast(`Error: ${e.message}`)
    }
    setOcupat(false)
  }

  // A iOS una PWA es pot quedar encallada en una versió antiga. Això la neteja de debò:
  // esborra el service worker i tota la memòria cau, i recarrega.
  async function actualitzar() {
    if (!confirm('Es baixarà l’última versió de l’app. El teu progrés NO es toca. Continuar?')) return
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
    if (!confirm('Segur? Això no es pot desfer en aquest dispositiu.')) return
    if (tipus === 'srs') await resetSrs()
    else await resetQuiz()
    await onReload()
    setToast('Esborrat')
  }

  const veus = llista.length ? llista : voices()

  return (
    <div className="settings">
      <h2>Repàs</h2>
      <label>Targetes per tanda</label>
      <select value={mida} onChange={(e) => setMida(Number(e.target.value))}>
        {[50, 100, 150, 200, 300, 500].map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <p className="hint">
        Quantes targetes et proposa cada tanda. Quan l’acabes pots fer-ne una altra: el compte
        del dia va sumant. Dins de cada tanda entren primer les que et costen més (les que has
        fallat més vegades i les que tens menys assentades), i s’omple amb targetes noves.
      </p>

      <h2>Pronunciació</h2>
      {!ttsAvailable() ? (
        <p className="hint">Aquest navegador no té síntesi de veu.</p>
      ) : (
        <>
          <label>Veu (alemanya)</label>
          <select value={voiceURI || ''} onChange={(e) => setVoiceURI(e.target.value)}>
            <option value="">Automàtica (de-CH si n’hi ha)</option>
            {veus.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} — {v.lang}</option>)}
          </select>
          <div className="btn-row">
            <button onClick={() => speak('Grüezi mitenand, wie gaht’s?', { voiceURI })}>Provar la veu</button>
          </div>
          <p className="hint warn">
            No existeix cap veu de suís-alemany al mòbil. El que sents és una veu alemanya llegint
            text dialectal: et serveix per fixar paraules, però la pronúncia bona te la dona la classe.
          </p>
        </>
      )}

      <h2>Sincronitzar el progrés amb git</h2>
      <p className="hint">
        Opcional. Serveix per passar el teu progrés d’un dispositiu a un altre. Sense això l’app
        funciona igual, però el progrés només viu en aquest mòbil. Puja el repàs, la ratxa, els
        exercicis i les teves paraules a <code>data/state.json</code>. Els <b>capítols de
        lectura no hi pugen mai</b>: es queden en aquest dispositiu.
      </p>
      {syncOn && (
        <div className={`sync-state ${dirty ? 'pend' : 'ok'}`}>
          {dirty
            ? '↑ Tens progrés sense pujar. Es puja sol quan hi hagi connexió, o prem «Pujar progrés».'
            : '✓ Tot el progrés està pujat al repo.'}
        </div>
      )}
      <label>Usuari de GitHub</label>
      <input value={gh.gh_owner} onChange={(e) => setGh({ ...gh, gh_owner: e.target.value })} placeholder="Gemmagf" autoCapitalize="off" />
      <label>Repo</label>
      <input value={gh.gh_repo} onChange={(e) => setGh({ ...gh, gh_repo: e.target.value })} autoCapitalize="off" />
      <label>Branca</label>
      <input value={gh.gh_branch} onChange={(e) => setGh({ ...gh, gh_branch: e.target.value })} autoCapitalize="off" />
      <label>Token (fine-grained sobre <code>schwiiz</code>, Contents: read/write)</label>
      <input type="password" value={gh.gh_token} onChange={(e) => setGh({ ...gh, gh_token: e.target.value })} placeholder="github_pat_..." autoCapitalize="off" />
      <p className="hint warn">
        El token es guarda en aquest dispositiu (IndexedDB), sense xifrar. Fes servir només un token
        fine-grained limitat a aquest repo, i si el mòbil es perd, revoca’l des de GitHub.
      </p>
      <div className="btn-row">
        <button onClick={desar}>Desar config</button>
        <button onClick={pujar} disabled={ocupat}>⬆ Pujar progrés</button>
        <button onClick={baixar} disabled={ocupat}>⬇ Baixar progrés</button>
      </div>
      {lastSync && <p className="hint">Última sincronització: {new Date(lastSync).toLocaleString('ca-ES')}</p>}

      <h2>Contingut nou</h2>
      <p className="hint">
        El material de classe no arriba per aquí: viu al codi del repo. Quan s’hi afegeix contingut
        nou i es torna a desplegar, l’app s’actualitza sola en obrir-la amb connexió. Si sembla que
        no arriba, tanca-la del tot i torna-la a obrir.
      </p>

      <h2>Versió</h2>
      <p className="hint">
        Compilada el <b>{typeof __BUILD__ !== 'undefined' ? __BUILD__ : '—'}</b> (UTC).
      </p>
      <div className="btn-row">
        <button onClick={actualitzar} disabled={ocupat}>↻ Forçar actualització</button>
      </div>
      <p className="hint">
        Fes-ho servir si la data de dalt no coincideix amb l’última versió. Esborra la memòria
        cau i el service worker i torna a baixar l’app. El progrés no es toca.
      </p>

      <h2>Dades</h2>
      <div className="btn-row">
        <button onClick={exportar}>Exportar JSON</button>
        <button className="danger" onClick={() => esborrar('srs')}>Reiniciar flashcards</button>
        <button className="danger" onClick={() => esborrar('quiz')}>Reiniciar exercicis</button>
      </div>
    </div>
  )
}
