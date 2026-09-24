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
  },
  {
    id: 'c03',
    title: 'Classe 3 — negació i demostratius',
    date: '2026-09-02',
    note: 'Holle 04 (kein/kei/keis i nöd) i 05 (demostratius, amb la e llarga de «dee»). Més el full d’expressions suïsses p. 102: amigs, ämel, öppedie, allpott.'
  },
  {
    id: 'c04',
    title: 'Classe 4 — pronoms i plurals',
    date: '2026-09-09',
    note: 'Holle 06 (pronoms er/sie/es i les formes del plural) i Schorn 6.1 (plurals per temes: cos, medicina, família, menjar). Full d’expressions p. 103: obsi, nidsi, überobe. I la cançó «Berge versetze».'
  },
  {
    id: 'c05',
    title: 'Classe 5 — conjugació i werde',
    date: '2026-09-16',
    note: 'Holle 08: present dels verbs regulars (amb la regla del -isch darrere z i s), sii/ha/werde, i dörfe. Holle 10: preguntes posant el verb davant del subjecte.'
  },
  {
    id: 'c06',
    title: 'Classe 6 — verbs irregulars i participis',
    date: '2026-09-23',
    note: 'Els 24 verbs irregulars més importants amb totes les formes, la inversió, l’imperatiu i el participi. Reforç de «gang go / chum cho» i full d’expressions p. 104.'
  }
]

export function lessonTitle(id) {
  return LESSONS.find((l) => l.id === id)?.title || id
}
