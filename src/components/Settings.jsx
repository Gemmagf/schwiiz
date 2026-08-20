import { useEffect, useState } from 'react'
import { pushToGit, pullFromGit, isConfigured } from '../lib/sync.js'
import { importAll, resetSrs, resetQuiz, exportAll } from '../lib/db.js'
import { voices, onVoicesReady, speak, ttsAvailable } from '../lib/tts.js'

export default function Settings({ getConfig, setConfig, setToast, onReload, voiceURI, setVoiceURI, dirty, syncOn }) {
  const [gh, setGh] = useState({ gh_owner: '', gh_repo: 'schwiiz', gh_branch: 'main', gh_token: '' })
  const [lastSync, setLastSync] = useState('')
  const [llista, setLlista] = useState([])
  const [ocupat, setOcupat] = useState(false)

  useEffect(() => {
    (async () => {
      const vals = {}
      for (const k of ['gh_owner', 'gh_repo', 'gh_branch', 'gh_token']) {
        vals[k] = (await getConfig(k)) || (k === 'gh_repo' ? 'schwiiz' : k === 'gh_branch' ? 'main' : '')
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
      const r = await pushToGit()
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

  async function exportar() {
    const dades = await exportAll()
    const blob = new Blob([JSON.stringify(dades, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `schwiiz-progres-${new Date().toISOString().slice(0, 10)}.json`
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
        funciona igual, però el progrés només viu en aquest mòbil.
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
      <label>Token (fine-grained, només aquest repo, Contents: read/write)</label>
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

      <h2>Dades</h2>
      <div className="btn-row">
        <button onClick={exportar}>Exportar JSON</button>
        <button className="danger" onClick={() => esborrar('srs')}>Reiniciar flashcards</button>
        <button className="danger" onClick={() => esborrar('quiz')}>Reiniciar exercicis</button>
      </div>
    </div>
  )
}
