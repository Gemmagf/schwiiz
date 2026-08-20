// Capa offline-first amb IndexedDB (via idb). Font de veritat LOCAL.
// sync.js s'encarrega de bolcar-ho a data/state.json del repo (font de veritat remota).

import { openDB } from 'idb'

const DB_NAME = 'schwiiz'
const DB_VERSION = 1

export const dbReady = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('srs')) {
      db.createObjectStore('srs', { keyPath: 'id' }) // estat SRS per targeta
    }
    if (!db.objectStoreNames.contains('quiz')) {
      db.createObjectStore('quiz', { keyPath: 'id' }) // { id, ok, tries, at } per exercici de gramàtica
    }
    if (!db.objectStoreNames.contains('sessions')) {
      db.createObjectStore('sessions', { keyPath: 'date' }) // { date, reviewed, correct } — ratxa
    }
    if (!db.objectStoreNames.contains('meta')) {
      db.createObjectStore('meta', { keyPath: 'key' }) // config + flag dirty
    }
  }
})

async function markDirty() {
  const db = await dbReady
  await db.put('meta', { key: 'dirty', value: true })
  await db.put('meta', { key: 'lastChange', value: new Date().toISOString() })
}

// ---- SRS ----
export async function getAllSrs() {
  const db = await dbReady
  const all = await db.getAll('srs')
  return Object.fromEntries(all.map((c) => [c.id, c]))
}

export async function putSrs(card) {
  const db = await dbReady
  await db.put('srs', card)
  await markDirty()
  return card
}

export async function resetSrs(ids) {
  const db = await dbReady
  const tx = db.transaction('srs', 'readwrite')
  if (ids) for (const id of ids) tx.store.delete(id)
  else await tx.store.clear()
  await tx.done
  await markDirty()
}

// ---- Exercicis de gramàtica ----
export async function getAllQuiz() {
  const db = await dbReady
  const all = await db.getAll('quiz')
  return Object.fromEntries(all.map((q) => [q.id, q]))
}

export async function putQuiz(id, ok) {
  const db = await dbReady
  const cur = (await db.get('quiz', id)) || { id, tries: 0 }
  const rec = { id, ok, tries: cur.tries + 1, at: new Date().toISOString() }
  await db.put('quiz', rec)
  await markDirty()
  return rec
}

export async function resetQuiz(ids) {
  const db = await dbReady
  const tx = db.transaction('quiz', 'readwrite')
  if (ids) for (const id of ids) tx.store.delete(id)
  else await tx.store.clear()
  await tx.done
  await markDirty()
}

// ---- Sessions (ratxa diària) ----
export async function bumpSession(date, correct) {
  const db = await dbReady
  const rec = (await db.get('sessions', date)) || { date, reviewed: 0, correct: 0 }
  rec.reviewed += 1
  if (correct) rec.correct += 1
  await db.put('sessions', rec)
  await markDirty()
  return rec
}

export async function getSessions() {
  const db = await dbReady
  return db.getAll('sessions')
}

// ---- Config ----
export async function getConfig(key) {
  const db = await dbReady
  return (await db.get('meta', key))?.value
}

export async function setConfig(key, value) {
  const db = await dbReady
  await db.put('meta', { key, value })
}

// ---- Import / export per al sync amb git ----
export async function exportAll() {
  const db = await dbReady
  return {
    srs: await db.getAll('srs'),
    quiz: await db.getAll('quiz'),
    sessions: await db.getAll('sessions'),
    exportedAt: new Date().toISOString()
  }
}

export async function importAll(state) {
  const db = await dbReady
  for (const s of ['srs', 'quiz', 'sessions']) {
    if (!Array.isArray(state[s])) continue
    const tx = db.transaction(s, 'readwrite')
    await tx.store.clear()
    for (const rec of state[s]) tx.store.put(rec)
    await tx.done
  }
  await db.put('meta', { key: 'dirty', value: false })
}
