// Lectures.
//
// ⚠️ Aquí NO hi ha cap text de llibres amb drets d'autor. Els textos d'exemple
//    d'aquest fitxer són escrits expressament per a l'app. El material del teu
//    llibre de lectura (Hansdampf) l'afegeixes tu des de l'app: "Afegir un text",
//    i es queda al teu dispositiu.

export const BOOKS = [
  {
    id: 'holle',
    title: 'Schweizerdeutsch verstehen',
    subtitle: 'So sprichst du wie die Einheimischen',
    author: 'Andrea Holle',
    kind: 'vocabulari',
    note: 'Versió alemanya de Swiss German Unlocked. Font per al vocabulari i la teoria.'
  },
  {
    id: 'schorn',
    title: 'Schwiizerdütsch leicht gemacht',
    subtitle: 'S Schwiizerdüütsch vo Züri',
    author: 'Verena Schorn',
    kind: 'gramatica',
    note: 'Curs de dialecte de Zuric. Font per a l’ordre dels temes de gramàtica.'
  },
  {
    id: 'hansdampf',
    title: 'Hansdampf',
    subtitle: 'Gschichte us em Züri Oberland, Band 2',
    author: 'Johann Widmer',
    kind: 'lectura',
    note: 'Llibre de lectura. Els capítols els afegeixes tu des de l’app; no venen amb ella.'
  }
]

// Textos d'exemple, escrits per a l'app. Serveixen per provar el lector
// i per llegir alguna cosa mentre no hi tinguis material teu.
export const READINGS = [
  {
    id: 'r01',
    title: 'Am Morge z Züri',
    subtitle: 'Un dia normal, tot en present',
    level: 'A1',
    origin: 'text propi de l’app',
    intro: 'Present d’indicatiu i vocabulari de rutina diària. Comença per aquí.',
    body: `Am halbi sibni lüütet de Wecker. Ich stande uf, gange i d Chuchi und mache mer en Kaffi. Dusse isch es na dunkel und chalt. Ich lueg zum Feischter uus: es rägnet.

Ich näme s Tram Nummer sächs zum Bahnhof. Es hät vil Lüüt, aber ich finde na en Platz. In ere Viertelstund bi ich im Büro.

Zerscht schriibe ich mini Mails, dänn han ich e Sitzig mit em Chef. Am zäni mached mer Znüni-Pause. De Marco bringt Gipfeli mit.

Am Aabig gang ich nöd grad hei. Ich träffe mini Fründin am See. Mir trinked öppis und redet lang. Sie seit: «Du redsch scho vil besser Schwiizerdütsch!» Das freut mi.`
  },
  {
    id: 'r02',
    title: 'Im Zug uf Rapperswil',
    subtitle: 'Una excursió, tot en passat',
    level: 'A2',
    origin: 'text propi de l’app',
    intro: 'Tot el text va en perfet: «bi ich gfahre», «han ich ghört». És l’únic passat que fa servir el dialecte.',
    body: `Am Samschtig bi ich uf Rapperswil gfahre. S Wätter isch schön gsi, drum han ich de Zug gnoh und s Velo deheim gla.

Im Zug han ich es alts Ehepaar ghört. Sie händ vo früener verzellt: wie s Dorf gsi isch, wo sie jung gsi sind. Ich han nöd alles verstande, aber vil.

Z Rapperswil bi ich am See entlang gloffe. Es hät Schwän gha und vil Chind. Ich han mer es Glacé kauft und bi uf ere Bank ghocket.

Am Aabig bi ich müed hei cho. Aber ich han denkt: hüt han ich mee ghört als glehrt — und das isch au öppis wert.`
  },
  {
    id: 'r03',
    title: 'Im Dorflade',
    subtitle: 'Conversa de poble',
    level: 'A2',
    origin: 'text propi de l’app',
    intro: 'Registre de poble del Züri Oberland, amb tractament de vostè (Sie / Ihne). El to s’assembla al del teu llibre de lectura.',
    body: `S Dorf isch chli. Es hät en Lade, e Beiz und e Chile. De Lade ghört em Herr Brunner. Er kännt jede mit Name.

«Grüezi Frau Meier, wie gaht’s Ihne?»

«Danke, guet. Und Ihne?»

«Cha nöd klage. Händ Sie hüt scho ghört? De Bueb vom Nachbar het en Job z Züri übercho.»

«Nei! Das freut mi. Er isch immer so fliissig gsi.»

So gaht das im Dorf: mer chauft es Brot und gaht mit ere Gschicht hei.`
  }
]
