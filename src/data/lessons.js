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
    date: '2026-08-19',
    note: 'Schorn 2.3 i 2.4: article indeterminat en/e/es, article negatiu kän/kä/käs, terminacions de l’adjectiu, zum + infinitiu i «e so-n-en». Més la fitxa de pronunciació dels diftongs ie·ue·üe.'
  },
  {
    id: 'c02',
    title: 'Classe 2 — demostratius i interrogatius',
    date: '2026-08-26',
    note: 'Schorn 3.4 i 3.5: demostratius amb daa/deet, i «Wele…?» contra «Was für…?». Més el full de verbs típicament suïssos i falsos amics.'
  }
]

export function lessonTitle(id) {
  return LESSONS.find((l) => l.id === id)?.title || id
}
