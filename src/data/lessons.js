// Índex de classes. Cada cop que passis material nou d'una classe, s'afegeix aquí
// una entrada i el contingut nou porta `lesson: 'c01'` (o el que toqui) a vocab/grammar/phrases.
// Així pots repassar només el que has fet a la classe de la setmana.

export const LESSONS = [
  {
    id: 'base',
    title: 'Fonaments',
    date: null,
    note: 'Vocabulari, gramàtica i frases de base per arrencar. No ve de cap classe concreta.'
  }
  // Exemple de com quedarà una classe teva:
  // { id: 'c01', title: 'Classe 1 — presentacions', date: '2026-08-27', note: 'Verbs sii/haa, salutacions' }
]

export function lessonTitle(id) {
  return LESSONS.find((l) => l.id === id)?.title || id
}
