// Sincronització del PROGRÉS amb el repo git, via GitHub Contents API.
// Font de veritat remota = data/state.json.
//
// Important: això sincronitza el teu progrés (SRS, exercicis, ratxa) entre dispositius.
// El CONTINGUT (vocabulari, gramàtica, frases) NO ve per aquí: viu al codi i s'actualitza
// quan es torna a desplegar l'app. Són dos camins diferents a propòsit.
//
// Config (a IndexedDB, store 'meta'):
//   gh_token  -> PAT fine-grained, només aquest repo, Contents: read/write
//   gh_owner  -> usuari de GitHub
//   gh_repo   -> 'schwiiz'  (el mateix repo de l'app, que és privat)
//   gh_branch -> 'main'

import { exportAll, getConfig, setConfig } from './db.js'

const API = 'https://api.github.com'
const STATE_PATH = 'data/state.json'

// Els codis d'error de GitHub no diuen res a qui els llegeix. Els traduïm al que
// s'ha de fer per arreglar-ho.
function explica(status, { owner, repo, branch }) {
  if (status === 401) return 'El token no és vàlid o ha caducat. Genera’n un de nou.'
  if (status === 403) return `El token no té permís d’escriptura. Ha de tenir «Contents: Read and write» sobre ${repo}.`
  if (status === 404) return `No es troba ${owner}/${repo} (branca ${branch}). Comprova el nom del repo i que el token hi tingui accés seleccionat.`
  if (status === 409) return 'Conflicte: algú altre ha pujat abans. Torna-ho a provar.'
  if (status === 422) return `La branca «${branch}» no existeix en aquest repo.`
  return `GitHub ha respost ${status}.`
}

async function ghConfig() {
  const [token, owner, repo, branch] = await Promise.all([
    getConfig('gh_token'), getConfig('gh_owner'), getConfig('gh_repo'), getConfig('gh_branch')
  ])
  return { token, owner, repo, branch: branch || 'main' }
}

export async function isConfigured() {
  const c = await ghConfig()
  return Boolean(c.token && c.owner && c.repo)
}

const b64encode = (str) => btoa(unescape(encodeURIComponent(str)))
const b64decode = (str) => decodeURIComponent(escape(atob(str)))

async function getRemoteSha({ token, owner, repo, branch }) {
  const res = await fetch(`${API}/repos/${owner}/${repo}/contents/${STATE_PATH}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
  })
  if (res.status === 404) return null // el fitxer encara no existeix: el crearem
  if (!res.ok) throw new Error(explica(res.status, { owner, repo, branch }))
  return (await res.json()).sha
}

export async function pushToGit() {
  if (!navigator.onLine) return { ok: false, reason: 'offline' }
  const c = await ghConfig()
  if (!c.token || !c.owner || !c.repo) return { ok: false, reason: 'not-configured' }

  const state = await exportAll()
  const content = b64encode(JSON.stringify(state, null, 2))
  const sha = await getRemoteSha(c)

  const res = await fetch(`${API}/repos/${c.owner}/${c.repo}/contents/${STATE_PATH}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${c.token}`, Accept: 'application/vnd.github+json' },
    body: JSON.stringify({
      message: `Progrés Schwiiz (${new Date().toISOString()})`,
      content,
      branch: c.branch,
      ...(sha ? { sha } : {})
    })
  })
  if (!res.ok) throw new Error(explica(res.status, c))
  await setConfig('dirty', false)
  await setConfig('lastSync', new Date().toISOString())
  return { ok: true }
}

export async function pullFromGit() {
  const c = await ghConfig()
  if (!c.token || !c.owner || !c.repo) return null
  const res = await fetch(`${API}/repos/${c.owner}/${c.repo}/contents/${STATE_PATH}?ref=${c.branch}`, {
    headers: { Authorization: `Bearer ${c.token}`, Accept: 'application/vnd.github+json' }
  })
  if (!res.ok) return null
  const json = await res.json()
  try {
    return JSON.parse(b64decode(json.content))
  } catch {
    return null
  }
}

export async function syncIfDirty() {
  const dirty = await getConfig('dirty')
  if (dirty && navigator.onLine && (await isConfigured())) {
    try {
      return await pushToGit()
    } catch (e) {
      return { ok: false, reason: String(e) }
    }
  }
  return { ok: false, reason: 'nothing-to-sync' }
}
