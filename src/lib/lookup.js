// Cerca d'una paraula quan la toques dins d'un text.
//
// Ordre de cerca:
//   1. les teves pròpies targetes (el que ja has afegit mana)
//   2. el vocabulari d'estudi (vocab.js)
//   3. el glossari de suport (glossary.js)
//   4. formes conjugades (FORMS) → torna a provar amb l'infinitiu
//   5. heurístiques de terminació (-e, -t, -sch, -ed, -s, -li, ge-/g-)
//
// Si no troba res, retorna null i la interfície et deixa escriure tu la traducció.

import { VOCAB } from '../data/vocab.js'
import { GLOSSARY, FORMS } from '../data/glossary.js'

export function normalitza(w) {
  return (w || '')
    .toLowerCase()
    .replace(/[«»"'`´.,;:!?¿¡()\[\]…—–]/g, '')
    .replace(/[’‘]/g, "'")
    .trim()
}

// Una entrada de vocab pot contenir variants ("guet / schlächt") o article ("de Maa").
// Les indexem totes perquè tocar "Maa" o "schlächt" també funcioni.
function clausDe(entrada) {
  const claus = new Set()
  for (const variant of entrada.ch.split('/')) {
    const net = normalitza(variant)
    if (!net) continue
    claus.add(net)
    const parts = net.split(/\s+/)
    if (parts.length > 1) {
      claus.add(parts[parts.length - 1])       // "de maa" -> "maa"
      if (parts[0].length > 2) claus.add(parts[0])
    }
  }
  return [...claus]
}

let index = null

function construeix(userCards = []) {
  const idx = new Map()
  const afegeix = (clau, valor) => {
    if (!clau || idx.has(clau)) return
    idx.set(clau, valor)
  }
  // Prioritat baixa primer: després el que és més específic sobreescriu... com que
  // `afegeix` no sobreescriu, cal començar pel més prioritari.
  for (const c of userCards) {
    for (const k of clausDe(c)) afegeix(k, { ...c, font: 'teva' })
  }
  for (const v of VOCAB) {
    for (const k of clausDe(v)) afegeix(k, { ...v, font: 'vocabulari' })
  }
  for (const [k, val] of Object.entries(GLOSSARY)) {
    afegeix(normalitza(k), { ch: k, de: val.de, ca: val.ca, font: 'glossari' })
  }
  return idx
}

export function rebuildIndex(userCards) {
  index = construeix(userCards)
  return index
}

// Desfà l'Umlaut: Hüüsli -> huusli, Schwän -> schwan.
// El dialecte el fa servir per als plurals i els diminutius, i la forma base no en porta.
function senseUmlaut(w) {
  return w.replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ä/g, 'a')
}

// Variants a provar quan la forma exacta no hi és.
function variants(w) {
  const out = [w]
  const push = (x) => { if (x && x.length > 1 && !out.includes(x)) out.push(x) }

  if (FORMS[w]) push(FORMS[w])
  // participis: gmacht -> macht, gsi -> si
  if (w.startsWith('g') && w.length > 3) push(w.slice(1))
  if (w.startsWith('ge') && w.length > 4) push(w.slice(2))
  // terminacions verbals
  for (const suf of ['sch', 'ed', 'et', 'st', 't', 'e', 'n', 's']) {
    if (w.endsWith(suf) && w.length - suf.length >= 2) push(w.slice(0, -suf.length))
  }
  // infinitiu: la majoria acaben en -e
  push(w + 'e')
  // diminutiu
  if (w.endsWith('li') && w.length > 4) push(w.slice(0, -2))

  // Per a cada candidat, prova també la versió sense Umlaut (plurals i diminutius).
  for (const c of [...out]) {
    const pla = senseUmlaut(c)
    if (pla !== c) push(pla)
    if (c.endsWith('li') && c.length > 4) push(senseUmlaut(c.slice(0, -2)))
  }
  return out
}

export function cerca(paraula, userCards = []) {
  if (!index) rebuildIndex(userCards)
  const w = normalitza(paraula)
  if (!w) return null

  for (const v of variants(w)) {
    const trobat = index.get(v)
    if (trobat) return { ...trobat, formaBuscada: v, exacte: v === w }
    // les formes irregulars poden necessitar dos salts: gsi -> sii
    if (FORMS[v] && index.get(FORMS[v])) {
      return { ...index.get(FORMS[v]), formaBuscada: FORMS[v], exacte: false }
    }
  }
  return null
}

// Parteix un text en trossos: { t: 'text', w: true|false }.
// Els trossos amb w:true són paraules i es poden tocar.
export function tokenitza(text) {
  const parts = []
  const re = /[\p{L}\p{M}''ʼ-]+/gu
  let last = 0
  for (const m of text.matchAll(re)) {
    if (m.index > last) parts.push({ t: text.slice(last, m.index), w: false })
    parts.push({ t: m[0], w: true })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push({ t: text.slice(last), w: false })
  return parts
}
