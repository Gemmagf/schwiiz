// Repàs espaiat (SM-2 simplificat, com Anki però amb menys manetes).
//
// Estat d'una targeta: { id, ease, interval, reps, lapses, due, last }
//   ease     factor de facilitat (1.3 – 2.8), comença a 2.5
//   interval dies fins al pròxim repàs
//   due      data ISO (YYYY-MM-DD) del pròxim repàs
//
// Notes: 0 = un altre cop · 1 = costa · 2 = bé · 3 = fàcil

export const GRADES = [
  { g: 0, label: 'Un altre cop', hint: 'no me’n recordava', cls: 'again' },
  { g: 1, label: 'Costa', hint: 'amb esforç', cls: 'hard' },
  { g: 2, label: 'Bé', hint: 'l’he encertada', cls: 'good' },
  { g: 3, label: 'Fàcil', hint: 'immediata', cls: 'easy' }
]

const MIN_EASE = 1.3
const MAX_EASE = 2.8

export function todayISO(d = new Date()) {
  const tz = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return tz.toISOString().slice(0, 10)
}

export function addDays(iso, days) {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + Math.round(days))
  return todayISO(d)
}

export function newCard(id) {
  return { id, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: todayISO(), last: null }
}

// Aplica una nota i retorna la targeta actualitzada.
// Si retorna interval 0, la targeta torna a la cua d'aquesta mateixa sessió.
export function grade(card, g, today = todayISO()) {
  const c = { ...newCard(card.id), ...card }
  let ease = c.ease

  if (g === 0) {
    // Fallada: torna a començar, però l'historial (lapses) es guarda.
    ease = clamp(ease - 0.2)
    return { ...c, ease, interval: 0, reps: 0, lapses: c.lapses + 1, due: today, last: today }
  }

  let interval
  if (g === 1) {
    ease = clamp(ease - 0.15)
    interval = c.reps === 0 ? 1 : Math.max(1, c.interval * 1.2)
  } else if (g === 2) {
    if (c.reps === 0) interval = 1
    else if (c.reps === 1) interval = 3
    else interval = c.interval * ease
  } else {
    ease = clamp(ease + 0.15)
    if (c.reps === 0) interval = 3
    else if (c.reps === 1) interval = 6
    else interval = c.interval * ease * 1.3
  }

  interval = Math.max(1, Math.min(365, Math.round(interval)))
  return { ...c, ease, interval, reps: c.reps + 1, due: addDays(today, interval), last: today }
}

function clamp(e) {
  return Math.max(MIN_EASE, Math.min(MAX_EASE, Math.round(e * 100) / 100))
}

// Targetes que toca repassar avui (les noves compten com a pendents).
export function dueCards(items = [], states = {}, today = todayISO()) {
  return items.filter((it) => {
    const s = states[it.id]
    return !s || !s.due || s.due <= today
  })
}

// Barreja de debò (Fisher-Yates). El truc de sort(() => Math.random() - 0.5)
// no reparteix uniformement: deixa les targetes gairebé on eren.
export function barreja(llista) {
  const a = [...llista]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Construeix una tanda de repàs.
//   1. Primer les que toquen, ordenades per com de malament te les saps:
//      més fallades, després menys facilitat, després les vençudes de fa més temps.
//   2. Si no n'hi ha prou per omplir la tanda, s'hi afegeixen targetes noves.
//   3. Tot barrejat al final: la sessió no ha d'anar per temes.
export function construeixTanda(items, states, mida, today = todayISO()) {
  const vençudes = []
  const noves = []
  for (const it of items) {
    const s = states[it.id]
    if (!s || !s.reps) noves.push(it)
    else if (s.due <= today) vençudes.push(it)
  }
  vençudes.sort((a, b) => {
    const A = states[a.id], B = states[b.id]
    return (B.lapses - A.lapses) || (A.ease - B.ease) || A.due.localeCompare(B.due)
  })
  return barreja([...vençudes, ...barreja(noves)].slice(0, mida))
}

// Classificació ràpida per al tauler.
export function stats(items = [], states = {}, today = todayISO()) {
  let nous = 0, arepassar = 0, apresos = 0
  for (const it of items) {
    const s = states[it.id]
    if (!s || s.reps === 0) nous++
    else if (s.due <= today) arepassar++
    else apresos++
  }
  return { nous, arepassar, apresos, total: items.length }
}
