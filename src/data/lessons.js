// Índex de classes. Cada cop que passis material nou d'una classe, s'afegeix aquí
// una entrada i el contingut nou porta `lesson: 'c01'` (o el que toqui) a vocab/grammar/phrases.
// Així pots repassar només el que has fet a la classe de la setmana.

export const LESSONS = [
  {
    id: 'base',
    title: 'Fonaments',
    date: null,
    note: 'Vocabulari, gramàtica i frases de base per arrencar. No ve de cap classe concreta.'
  },
  {
    id: 'c01',
    title: 'Classe 1 — articles i adjectius',
    date: '2026-08-26',
    note: 'Schorn 2.3 i 2.4 (article indeterminat i negatiu), 3.4 i 3.5 (demostratius, Wele/Was für), diftongs ie·ue·üe i els verbs típicament suïssos.'
  }
]

export function lessonTitle(id) {
  return LESSONS.find((l) => l.id === id)?.title || id
}
