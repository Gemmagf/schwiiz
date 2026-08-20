// Temes de gramàtica Züridütsch + exercicis autocorregits.
//
// Tipus d'exercici:
//   'choice' -> q amb ___, options[], a = índex de la correcta
//   'gap'    -> q amb ___, a = array de respostes acceptades (es compara en minúscules, sense accents)
// `why` és l'explicació que surt després de respondre.

// Camps opcionals per lligar el contingut als llibres de classe:
//   book: 'holle' | 'schorn'   (vegeu src/data/readings.js)
//   unit: 'K3'                 (capítol/unitat dins del llibre)
// Encara no s'han omplert: falta l'índex dels llibres.
const TEMES = [
  {
    id: 'g01',
    book: 'holle',
    unit: '08',
    order: 8.1,
    title: 'El verb sii (ser / estar)',
    emoji: '🟰',
    lesson: 'base',
    summary: 'El verb més important. En dialecte l’infinitiu és "sii", no "sein".',
    points: [
      'ich **bi** · du **bisch** · er/sie/es **isch**',
      'mir **sind** · ihr **sind** · sie **sind**',
      'Les tres formes del plural són iguals: sempre "sind".',
      '"isch" (i no "ist") és la marca sonora número u del suís-alemany.'
    ],
    table: {
      head: ['Züridütsch', 'Hochdeutsch'],
      rows: [
        ['ich bi', 'ich bin'], ['du bisch', 'du bist'], ['er/sie/es isch', 'er/sie/es ist'],
        ['mir sind', 'wir sind'], ['ihr sind', 'ihr seid'], ['sie sind', 'sie sind']
      ]
    },
    exercises: [
      { id: 'g01e1', type: 'choice', q: 'Ich ___ us Katalonie.', options: ['bi', 'bisch', 'isch'], a: 0, why: '1a persona singular: ich bi.' },
      { id: 'g01e2', type: 'choice', q: 'Du ___ hüt müed.', options: ['bi', 'bisch', 'sind'], a: 1, why: '2a persona singular: du bisch (el -st alemany es torna -sch).' },
      { id: 'g01e3', type: 'choice', q: 'Er ___ mis Nachbar.', options: ['bisch', 'isch', 'sind'], a: 1, why: '3a persona singular: er isch.' },
      { id: 'g01e4', type: 'gap', q: 'Mir ___ am Bahnhof.', a: ['sind'], why: 'Tot el plural fa "sind".' },
      { id: 'g01e5', type: 'gap', q: 'Ihr ___ z spaat.', a: ['sind'], why: 'En dialecte "ihr sind", no "ihr seid".' },
      { id: 'g01e6', type: 'choice', q: 'Com es diu "ell és amable"?', options: ['Er isch fründlich.', 'Er ist freundlich.', 'Er bisch fründlich.'], a: 0, why: 'isch + fründlich (freundlich → fründlich).' }
    ]
  },
  {
    id: 'g02',
    book: 'holle',
    unit: '08',
    order: 8.2,
    title: 'El verb haa (tenir)',
    emoji: '🤲',
    lesson: 'base',
    summary: '"haben" es torna "haa". El plural acaba en -nd, com gairebé tot.',
    points: [
      'ich **ha** · du **hesch** · er/sie/es **het**',
      'mir **händ** · ihr **händ** · sie **händ**',
      'Serveix també per formar el passat: "ich **ha** gässe" (he menjat).'
    ],
    table: {
      head: ['Züridütsch', 'Hochdeutsch'],
      rows: [
        ['ich ha', 'ich habe'], ['du hesch', 'du hast'], ['er het', 'er hat'],
        ['mir händ', 'wir haben'], ['ihr händ', 'ihr habt'], ['sie händ', 'sie haben']
      ]
    },
    exercises: [
      { id: 'g02e1', type: 'choice', q: 'Ich ___ kei Ziit.', options: ['ha', 'hesch', 'het'], a: 0, why: 'ich ha.' },
      { id: 'g02e2', type: 'choice', q: 'Du ___ es schöns Huus.', options: ['ha', 'hesch', 'händ'], a: 1, why: 'du hesch.' },
      { id: 'g02e3', type: 'gap', q: 'Sie ___ zwei Chind.', a: ['händ', 'hand'], why: 'Plural: händ.' },
      { id: 'g02e4', type: 'gap', q: 'Er ___ Hunger.', a: ['het'], why: '3a persona singular: het.' },
      { id: 'g02e5', type: 'choice', q: 'Com dius "tenim una reunió"?', options: ['Mir händ e Sitzig.', 'Mir haben eine Sitzung.', 'Mir het e Sitzig.'], a: 0, why: 'mir händ + e Sitzig (die Sitzung → d Sitzig).' },
      { id: 'g02e6', type: 'gap', q: 'Ihr ___ rächt.', a: ['händ', 'hand'], why: 'ihr händ = ihr habt.' }
    ]
  },
  {
    id: 'g03',
    book: 'holle',
    unit: '08 · 19',
    order: 8.3,
    title: 'Present dels verbs regulars',
    emoji: '🔁',
    lesson: 'base',
    summary: 'Un sol patró per a gairebé tots els verbs. Molt més fàcil que l’alemany estàndard.',
    points: [
      'Infinitiu acaba en **-e** (no -en): mach**e**, lehr**e**, schaff**e**.',
      'ich mach**e** · du mach**sch** · er mach**t**',
      'mir mach**ed** · ihr mach**ed** · sie mach**ed**',
      'Les tres persones del plural són SEMPRE iguals. Recorda: **-ed**.',
      'El -st alemany es torna -sch a tot arreu: du schaff**sch**, du lehr**sch**.'
    ],
    table: {
      head: ['Persona', 'mache (fer)', 'schaffe (treballar)'],
      rows: [
        ['ich', 'mache', 'schaffe'], ['du', 'machsch', 'schaffsch'], ['er/sie/es', 'macht', 'schafft'],
        ['mir/ihr/sie', 'mached', 'schaffed']
      ]
    },
    exercises: [
      { id: 'g03e1', type: 'gap', q: 'Du ___ (schaffe) z Züri.', a: ['schaffsch'], why: '2a sing. → -sch: schaffsch.' },
      { id: 'g03e2', type: 'gap', q: 'Mir ___ (lehre) Schwiizerdütsch.', a: ['lehred'], why: 'Plural → -ed: lehred.' },
      { id: 'g03e3', type: 'choice', q: 'Was ___ ihr am Wuchenänd?', options: ['machsch', 'mached', 'macht'], a: 1, why: '"ihr" és plural → mached.' },
      { id: 'g03e4', type: 'choice', q: 'Si ella treballa molt: "Sie ___ vil."', options: ['schaffsch', 'schafft', 'schaffed'], a: 1, why: '"sie" en singular (ella) → schafft.' },
      { id: 'g03e5', type: 'gap', q: 'Ich ___ (warte) uf de Bus.', a: ['warte'], why: '1a sing. = infinitiu: warte.' },
      { id: 'g03e6', type: 'choice', q: 'Quin és l’infinitiu correcte en dialecte?', options: ['lernen', 'lehre', 'lehren'], a: 1, why: 'Els infinitius perden la -n final: lernen → lehre.' }
    ]
  },
  {
    id: 'g04',
    book: 'holle',
    unit: '01',
    order: 1,
    title: 'Els canvis de so (la clau de tot)',
    emoji: '🔊',
    lesson: 'base',
    summary: 'Si saps alemany, el 70% del suís-alemany és aplicar 6 regles de transformació.',
    points: [
      '**k → ch**: Kind → **Ch**ind · kaufen → **ch**aufe · kalt → **ch**alt · können → **ch**öne',
      '**au → uu**: Haus → H**uu**s · auf → **u**f · kaufen → ch**au**fe (aquesta es manté!)',
      '**ei → ii**: Wein → W**ii** · Zeit → Z**ii**t · mein → m**ii**n · weiss → weiss (es manté)',
      '**-en → -e**: machen → mach**e** · Wochen → Wuch**e**',
      '**-st → -sch**: bist → bi**sch** · ist → i**sch** · fast → fa**sch**t',
      '**-ung → -ig**: Wohnung → Wohn**ig** · Sitzung → Sitz**ig** · Zeitung → Ziit**ig**'
    ],
    exercises: [
      { id: 'g04e1', type: 'gap', q: 'Passa a dialecte: "die Küche" → d ___', a: ['chuchi'], why: 'k → ch i -e final: Küche → Chuchi.' },
      { id: 'g04e2', type: 'gap', q: 'Passa a dialecte: "das Haus" → s ___', a: ['huus'], why: 'au → uu: Haus → Huus.' },
      { id: 'g04e3', type: 'gap', q: 'Passa a dialecte: "die Wohnung" → d ___', a: ['wohnig'], why: '-ung → -ig: Wohnung → Wohnig.' },
      { id: 'g04e4', type: 'choice', q: 'Com es diu "kalt" en Züridütsch?', options: ['kalt', 'chalt', 'chuld'], a: 1, why: 'k → ch: kalt → chalt.' },
      { id: 'g04e5', type: 'choice', q: '"der Wein" en dialecte és...', options: ['de Wein', 'de Wii', 'de Wiin'], a: 1, why: 'ei → ii: Wein → Wii.' },
      { id: 'g04e6', type: 'gap', q: 'Passa a dialecte: "die Zeit" → d ___', a: ['ziit'], why: 'ei → ii: Zeit → Ziit.' },
      { id: 'g04e7', type: 'choice', q: '"nicht" en dialecte de Zuric és...', options: ['nicht', 'nöd', 'net'], a: 1, why: 'Zuric fa "nöd". Berna fa "nid", Basilea "nit".' }
    ]
  },
  {
    id: 'g05',
    book: 'holle',
    unit: '02–03',
    order: 2,
    title: 'Articles: de, d, s',
    emoji: '📌',
    lesson: 'base',
    summary: 'Els articles s’escurcen dràsticament. Els gèneres són els mateixos que en alemany.',
    points: [
      'Determinat: **de** Maa (der) · **d** Frau (die) · **s** Chind (das)',
      'Indeterminat: **en** Maa (ein) · **e** Frau (eine) · **es** Chind (ein)',
      'Plural determinat: **d** — d Chind, d Lüüt.',
      'S’escriuen sovint enganxats en la parla: "s Huus" sona /sHuus/.',
      'Si ja saps el gènere alemany, el saps en dialecte. No cal reaprendre res.'
    ],
    table: {
      head: ['Gènere', 'Determinat', 'Indeterminat'],
      rows: [['masculí', 'de Maa', 'en Maa'], ['femení', 'd Frau', 'e Frau'], ['neutre', 's Chind', 'es Chind'], ['plural', 'd Chind', '— (Chind)']]
    },
    exercises: [
      { id: 'g05e1', type: 'gap', q: '___ Frau isch nätt. (article determinat)', a: ['d'], why: 'die → d.' },
      { id: 'g05e2', type: 'gap', q: '___ Chind schlaft. (article determinat)', a: ['s'], why: 'das → s.' },
      { id: 'g05e3', type: 'choice', q: '___ Maa chunt spöter.', options: ['de', 'd', 's'], a: 0, why: 'der → de.' },
      { id: 'g05e4', type: 'choice', q: 'Com dius "un pis" (eine Wohnung)?', options: ['en Wohnig', 'e Wohnig', 'es Wohnig'], a: 1, why: 'Wohnung és femenina → e Wohnig.' },
      { id: 'g05e5', type: 'choice', q: 'Com dius "una casa" (ein Haus)?', options: ['en Huus', 'e Huus', 'es Huus'], a: 2, why: 'Haus és neutre → es Huus.' },
      { id: 'g05e6', type: 'gap', q: '___ Velo staht dusse. (article determinat, das Velo)', a: ['s'], why: 'Velo és neutre → s Velo.' }
    ]
  },
  {
    id: 'g06',
    book: 'holle',
    unit: '04',
    order: 4,
    title: 'Negació: nöd i kei',
    emoji: '🚫',
    lesson: 'base',
    summary: 'Dues paraules, dos usos. Igual que nicht/kein en alemany.',
    points: [
      '**nöd** nega verbs, adjectius i frases senceres. Va DESPRÉS del verb conjugat.',
      'Ich verstahn **nöd**. · Das isch **nöd** guet. · Ich gang hüt **nöd** ge schaffe.',
      '**kei** nega substantius (= cap, gens de). Va DAVANT del substantiu.',
      'Ich ha **kei** Ziit. · Es hät **kei** Brot meh.',
      'Regla ràpida: si darrere hi va un substantiu sense article → kei. Si no → nöd.'
    ],
    exercises: [
      { id: 'g06e1', type: 'gap', q: 'Ich ha ___ Gäld.', a: ['kei'], why: 'Davant d’un substantiu → kei.' },
      { id: 'g06e2', type: 'gap', q: 'Das isch ___ richtig.', a: ['nöd', 'nod'], why: 'Nega un adjectiu → nöd.' },
      { id: 'g06e3', type: 'choice', q: 'Ich verstahn ___.', options: ['kei', 'nöd', 'nüüt'], a: 1, why: 'Nega el verb → nöd. ("Ich verstahn nüüt" = no entenc RES, també correcte però és una altra cosa.)' },
      { id: 'g06e4', type: 'choice', q: 'Er het ___ Auto.', options: ['nöd', 'kei', 'nüüt'], a: 1, why: 'Substantiu → kei.' },
      { id: 'g06e5', type: 'gap', q: 'Mir gönd hüt ___ i d Stadt.', a: ['nöd', 'nod'], why: 'Nega tota la frase → nöd, després del verb.' },
      { id: 'g06e6', type: 'choice', q: 'Com dius "no ho sé"?', options: ['Ich weiss kei.', 'Ich weiss nöd.', 'Ich nöd weiss.'], a: 1, why: 'nöd va SEMPRE després del verb conjugat, mai davant.' }
    ]
  },
  {
    id: 'g07',
    book: 'holle',
    unit: '08',
    order: 8.4,
    title: 'Verbs modals: chöne, wölle, müese',
    emoji: '🎛️',
    lesson: 'base',
    summary: 'Els tres que faràs servir cada dia. El segon verb va a l’infinitiu, al final.',
    points: [
      '**chöne** (poder): ich cha · du chasch · er cha · mir chönd',
      '**wölle** (voler): ich wott · du wottsch · er wott · mir wänd',
      '**müese** (haver de): ich mues · du muesch · er mues · mir müend',
      'Estructura: modal conjugat + ... + infinitiu **al final**.',
      'Ich **cha** hüt nöd **cho**. · Ich **wott** es Bier **trinke**.'
    ],
    table: {
      head: ['', 'chöne', 'wölle', 'müese'],
      rows: [
        ['ich', 'cha', 'wott', 'mues'], ['du', 'chasch', 'wottsch', 'muesch'],
        ['er/sie/es', 'cha', 'wott', 'mues'], ['mir/ihr/sie', 'chönd', 'wänd', 'müend']
      ]
    },
    exercises: [
      { id: 'g07e1', type: 'gap', q: 'Ich ___ hüt nöd cho. (poder)', a: ['cha'], why: 'ich cha.' },
      { id: 'g07e2', type: 'gap', q: 'Du ___ es Bier? (voler)', a: ['wottsch'], why: 'du wottsch.' },
      { id: 'g07e3', type: 'choice', q: 'Mir ___ jetzt gaa. (haver de)', options: ['mues', 'muesch', 'müend'], a: 2, why: 'Plural → müend.' },
      { id: 'g07e4', type: 'choice', q: 'On va l’infinitiu en "Ich cha ___ ___"?', options: ['Just després del modal', 'Al final de la frase', 'Al principi'], a: 1, why: 'L’infinitiu tanca sempre la frase: "Ich cha hüt nöd cho."' },
      { id: 'g07e5', type: 'choice', q: 'Tradueix: "Vull aprendre suís-alemany."', options: ['Ich wott Schwiizerdütsch lehre.', 'Ich lehre wott Schwiizerdütsch.', 'Ich wott lehre Schwiizerdütsch.'], a: 0, why: 'Modal en 2a posició, infinitiu al final.' },
      { id: 'g07e6', type: 'gap', q: 'Er ___ am achti da sii. (haver de)', a: ['mues'], why: 'er mues.' }
    ]
  },
  {
    id: 'g08',
    book: 'holle',
    unit: '20',
    order: 20,
    title: 'El passat: només el perfet',
    emoji: '⏪',
    lesson: 'base',
    summary: 'Bona notícia: el suís-alemany NO té Präteritum. Un sol temps passat per a tot.',
    points: [
      'Oblida "ich machte", "ich ging", "ich war". No existeixen en dialecte.',
      'Fórmula: **haa** o **sii** conjugat + participi al final.',
      'Ich **ha** gmacht. · Ich **bi** gange. · Ich **ha** gässe.',
      '"era / estava" = **ich bi gsi** (literalment "he estat"). Aquesta l’has de saber sí o sí.',
      '"tenia" = **ich ha gha**.',
      'Verbs de moviment i de canvi d’estat fan **sii**: gange, cho, blibe, gsi.'
    ],
    table: {
      head: ['Català', 'Züridütsch', 'Hochdeutsch'],
      rows: [
        ['jo era / vaig ser', 'ich bi gsi', 'ich war'],
        ['jo tenia', 'ich ha gha', 'ich hatte'],
        ['jo vaig anar', 'ich bi gange', 'ich bin gegangen'],
        ['jo vaig menjar', 'ich ha gässe', 'ich habe gegessen'],
        ['jo vaig venir', 'ich bi cho', 'ich bin gekommen'],
        ['jo vaig dir', 'ich ha gseit', 'ich habe gesagt']
      ]
    },
    exercises: [
      { id: 'g08e1', type: 'gap', q: 'Ich ___ geschter z Bärn gsi.', a: ['bi'], why: '"gsi" (estat) sempre amb sii → ich bi gsi.' },
      { id: 'g08e2', type: 'gap', q: 'Mir ___ scho gässe.', a: ['händ', 'hand'], why: 'ässe fa haa → mir händ gässe.' },
      { id: 'g08e3', type: 'choice', q: 'Com dius "vaig anar a casa"?', options: ['Ich ha hei gange.', 'Ich bi hei gange.', 'Ich ging hei.'], a: 1, why: 'Verb de moviment → sii. I el Präteritum no existeix.' },
      { id: 'g08e4', type: 'choice', q: 'Tradueix "ich hatte keine Zeit".', options: ['Ich hatt kei Ziit.', 'Ich ha kei Ziit gha.', 'Ich bi kei Ziit gsi.'], a: 1, why: '"tenia" = ha ... gha.' },
      { id: 'g08e5', type: 'gap', q: 'Er ___ am Aabig cho.', a: ['isch'], why: 'cho (venir) és moviment → sii: er isch cho.' },
      { id: 'g08e6', type: 'choice', q: 'Quin temps verbal NO existeix en suís-alemany?', options: ['El perfet', 'El Präteritum (ich machte)', 'El present'], a: 1, why: 'El Präteritum ha desaparegut del dialecte. Tot el passat es fa amb el perfet.' }
    ]
  },
  {
    id: 'g09',
    book: 'holle',
    unit: '10 · 23',
    order: 10,
    title: 'Ordre de les paraules',
    emoji: '🧩',
    lesson: 'base',
    summary: 'Igual que l’alemany: el verb conjugat va en segona posició. Sempre.',
    points: [
      'Afirmativa: **Ich gang** hüt i d Stadt.',
      'Si comences per un altre element, el verb continua sent el segon: **Hüt gang ich** i d Stadt.',
      'Pregunta sí/no: el verb va PRIMER — **Gasch** du hüt i d Stadt?',
      'Pregunta amb W-: W- + verb + subjecte — **Wo gasch** du hii?',
      'Amb "wil" (perquè) el verb se’n va al FINAL: Ich blibe deheim, **wil** ich müed **bi**.'
    ],
    exercises: [
      { id: 'g09e1', type: 'choice', q: 'Quina és correcta?', options: ['Hüt ich gang i d Stadt.', 'Hüt gang ich i d Stadt.', 'Hüt i d Stadt gang ich.'], a: 1, why: 'El verb ha de ser el segon element: Hüt (1) gang (2) ich.' },
      { id: 'g09e2', type: 'choice', q: 'Com preguntes "véns demà?"', options: ['Du chunsch morn?', 'Chunsch du morn?', 'Morn du chunsch?'], a: 1, why: 'Pregunta sí/no → verb primer.' },
      { id: 'g09e3', type: 'gap', q: 'Ordena: [wo] [du] [wohnsch] →  ___ wohnsch du?', a: ['wo'], why: 'W- + verb + subjecte: Wo wohnsch du?' },
      { id: 'g09e4', type: 'choice', q: 'Quina és correcta amb "wil"?', options: ['Ich chume nöd, wil ich bi chrank.', 'Ich chume nöd, wil ich chrank bi.', 'Ich chume nöd, wil bi ich chrank.'], a: 1, why: 'Després de "wil" el verb conjugat va al final.' },
      { id: 'g09e5', type: 'choice', q: 'Tradueix: "Demà treballo a Zuric."', options: ['Morn ich schaffe z Züri.', 'Morn schaffe ich z Züri.', 'Ich morn schaffe z Züri.'], a: 1, why: 'Verb en segona posició.' },
      { id: 'g09e6', type: 'gap', q: 'Pregunta l’hora: ___ spaat isch es?', a: ['wie'], why: 'Wie spaat isch es? = Quina hora és?' }
    ]
  },
  {
    id: 'g10',
    book: 'holle',
    unit: null,
    order: 99,
    title: 'El diminutiu -li',
    emoji: '🐣',
    lesson: 'base',
    summary: 'Els suïssos ho fan diminutiu TOT. No sempre vol dir "petit": sovint és afecte o costum.',
    points: [
      'Se li afegeix **-li** al substantiu, sovint amb Umlaut: Huus → H**üü**sli.',
      'Chind → Chindli · Bier → Bierli · Hund → Hündli · Frau → Fräuli',
      'Moltes paraules JA són diminutius fossilitzats: **Gipfeli**, **Meitli**, **Müesli**, **Zvieri**.',
      'Tot diminutiu és **neutre**: s Hüüsli, s Bierli, s Chindli.',
      'Compte: fer-ho servir massa sona infantil. Escolta on ho fan servir els nadius.'
    ],
    exercises: [
      { id: 'g10e1', type: 'gap', q: 'Diminutiu de "Chind" → ___', a: ['chindli'], why: 'Chind + li = Chindli.' },
      { id: 'g10e2', type: 'gap', q: 'Diminutiu de "Huus" → ___', a: ['hüüsli', 'huusli', 'hüsli'], why: 'Huus → Hüüsli (amb Umlaut).' },
      { id: 'g10e3', type: 'choice', q: 'Quin article porta "Hüüsli"?', options: ['de', 'd', 's'], a: 2, why: 'Tots els diminutius són neutres → s Hüüsli.' },
      { id: 'g10e4', type: 'choice', q: 'Què és un "Gipfeli"?', options: ['Un cim petit', 'Un croissant', 'Una moneda'], a: 1, why: 'Literalment "cimet", però vol dir croissant. Diminutiu fossilitzat.' },
      { id: 'g10e5', type: 'choice', q: '"Meitli" vol dir...', options: ['noia', 'noi', 'mestra'], a: 0, why: 'Meitli = noia (Mädchen). També un diminutiu fossilitzat.' }
    ]
  },
  {
    id: 'g11',
    book: 'holle',
    unit: '06 · 12',
    order: 6.5,
    title: 'Pronoms: datiu i acusatiu',
    emoji: '👉',
    lesson: 'base',
    summary: 'El genitiu no existeix en dialecte. Només et cal datiu i acusatiu.',
    points: [
      'Acusatiu (complement directe): **mi** · **di** · **en** (ell) · **sie** (ella) · **üs** · **sie**',
      'Datiu (complement indirecte): **mir** · **dir** · **em** (a ell) · **ere** (a ella) · **üs** · **ene**',
      'Chasch **mir** hälfe? (a mi = datiu, perquè "hälfe" regeix datiu)',
      'Ich gseh **di** morn. (a tu = acusatiu)',
      'El genitiu alemany es substitueix per **vo** + datiu: "s Huus **vo mim** Brueder".'
    ],
    table: {
      head: ['', 'Acusatiu', 'Datiu'],
      rows: [['jo', 'mi', 'mir'], ['tu', 'di', 'dir'], ['ell', 'en', 'em'], ['ella', 'sie', 'ere'], ['nosaltres', 'üs', 'üs'], ['ells', 'sie', 'ene']]
    },
    exercises: [
      { id: 'g11e1', type: 'gap', q: 'Chasch ___ hälfe? (a mi)', a: ['mir'], why: '"hälfe" regeix datiu → mir.' },
      { id: 'g11e2', type: 'choice', q: 'Ich gseh ___ morn. (a tu)', options: ['dir', 'di', 'du'], a: 1, why: '"gseh" regeix acusatiu → di.' },
      { id: 'g11e3', type: 'choice', q: 'Ich ha ___ s Buech gää. (a ell)', options: ['en', 'em', 'er'], a: 1, why: 'Qui rep = datiu → em.' },
      { id: 'g11e4', type: 'gap', q: 'Chunsch du mit ___? (amb nosaltres)', a: ['üs', 'us'], why: '"mit" regeix datiu → üs.' },
      { id: 'g11e5', type: 'choice', q: 'Com dius "la casa del meu germà"?', options: ['s Huus vo mim Brueder', 's Huus mines Brueders', 'mim Brueder s Huus'], a: 0, why: 'El genitiu no existeix: vo + datiu.' }
    ]
  },
  {
    id: 'g12',
    book: 'holle',
    unit: '16',
    order: 16,
    title: 'Paraules interrogatives',
    emoji: '❓',
    lesson: 'base',
    summary: 'Les set que necessites per sobreviure una conversa.',
    points: [
      '**Was?** què · **Wär?** qui · **Wo?** on · **Wänn?** quan',
      '**Wie?** com · **Wieso? / Warum?** per què · **Wievil?** quant',
      'Compte amb el fals amic: **Wär** = qui (alemany "wer"), NO "on".',
      '**Wo häre?** = cap on · **Wo har?** = d’on',
      'Ordre: interrogativa + verb + subjecte. **Wänn chunsch du?**'
    ],
    exercises: [
      { id: 'g12e1', type: 'gap', q: '___ heissisch du? (com)', a: ['wie'], why: 'Wie heissisch du? = Com et dius?' },
      { id: 'g12e2', type: 'gap', q: '___ wohnsch du? (on)', a: ['wo'], why: 'Wo wohnsch du?' },
      { id: 'g12e3', type: 'choice', q: '___ isch das? (qui)', options: ['Wo', 'Wär', 'Was'], a: 1, why: 'Wär = qui. Wo = on.' },
      { id: 'g12e4', type: 'choice', q: '___ choschtet das? (quant)', options: ['Wievil', 'Was', 'Wie'], a: 0, why: 'Wievil choschtet das? — també val "Was choschtet das?".' },
      { id: 'g12e5', type: 'gap', q: '___ chunsch du? (quan)', a: ['wänn', 'wann'], why: 'Wänn chunsch du?' }
    ]
  },
  {
    id: 'g13',
    book: 'holle',
    unit: '27',
    order: 27.1,
    title: 'Konjunktiv II: wär, hätt, chönt',
    emoji: '🎩',
    lesson: 'base',
    summary: 'La forma de la cortesia i de les hipòtesis. La faràs servir cada dia per demanar coses.',
    points: [
      '**sii** → ich **wär** · du **wärsch** · er **wär** · mir **wäred**',
      '**haa** → ich **hätt** · du **hättsch** · er **hätt** · mir **hätted**',
      '**chöne** → ich **chönt** · du **chöntsch** · er **chönt** · mir **chönted**',
      '**wölle** → ich **wett** (= voldria). "Ich wett es Bier" és la manera normal de demanar.',
      'Per a la resta de verbs: **wür / würd** + infinitiu → "Ich **wür** säge…"',
      'Das **wär** super! · **Chöntsch** mer hälfe? · Ich **hätt** gärn en Kaffi.'
    ],
    table: {
      head: ['', 'Present', 'Konjunktiv II'],
      rows: [
        ['ich sóc / seria', 'ich bi', 'ich wär'],
        ['jo tinc / tindria', 'ich ha', 'ich hätt'],
        ['jo puc / podria', 'ich cha', 'ich chönt'],
        ['jo vull / voldria', 'ich wott', 'ich wett'],
        ['jo faig / faria', 'ich mache', 'ich wür mache']
      ]
    },
    exercises: [
      { id: 'g13e1', type: 'gap', q: 'Ich ___ gärn es Glas Wii. (voldria — de haa)', a: ['hätt'], why: '"Ich hätt gärn…" és LA fórmula per demanar qualsevol cosa.' },
      { id: 'g13e2', type: 'choice', q: '___ Sie mer hälfe? (posa-hi el Konjunktiv)', options: ['Chönd', 'Chönted', 'Chasch'], a: 1, why: 'Konjunktiv de chöne en forma de cortesia: chönted Sie. "Chönd Sie" (present) també s’usa, però és menys suau.' },
      { id: 'g13e3', type: 'gap', q: 'Das ___ super! (seria)', a: ['wär'], why: 'sii → wär.' },
      { id: 'g13e4', type: 'choice', q: 'Com dius «voldria anar»?', options: ['Ich wott gaa.', 'Ich wett gaa.', 'Ich wär gaa.'], a: 1, why: '"wott" = vull (directe). "wett" = voldria (educat).' },
      { id: 'g13e5', type: 'choice', q: 'Wänn ich Ziit ___, wür ich cho.', options: ['ha', 'hätt', 'händ'], a: 1, why: 'Hipòtesi → Konjunktiv: wänn ich Ziit hätt.' }
    ]
  },
  {
    id: 'g14',
    book: 'holle',
    unit: '15',
    order: 15,
    title: 'L’imperatiu',
    emoji: '📣',
    lesson: 'base',
    summary: 'Donar ordres i instruccions. Dues formes: tu i vosaltres/vostè.',
    points: [
      'A **du**: l’arrel del verb, sense terminació. **Chum!** **Gang!** **Lueg!** **Mach!** **Wart!**',
      'A **ihr** i a **Sie**: arrel + **-ed**. **Chömed!** **Gönd!** **Lueged!** **Mached!**',
      'Amb vostè s’hi afegeix el pronom: **Lueged Sie!** · **Chömed Sie!**',
      'Per suavitzar-ho: hi poses **bitte**, o ho gires en pregunta — "**Chöntsch** du…?"',
      'Molt sentit al carrer: **Lueg mal!** (mira!) · **Wart chli!** (espera una mica!)'
    ],
    exercises: [
      { id: 'g14e1', type: 'gap', q: 'Digues a un amic que vingui: ___! (cho)', a: ['chum'], why: 'Imperatiu de du: arrel nua → Chum!' },
      { id: 'g14e2', type: 'choice', q: 'Digues a un grup que miri: ___!', options: ['Lueg', 'Lueged', 'Luege'], a: 1, why: 'Plural i vostè → arrel + -ed: Lueged!' },
      { id: 'g14e3', type: 'gap', q: 'Digues a un amic que esperi una mica: ___ chli! (warte)', a: ['wart'], why: 'Wart chli!' },
      { id: 'g14e4', type: 'choice', q: 'Com dius «entri, si us plau» a un client?', options: ['Chum bitte ine!', 'Chömed Sie bitte ine!', 'Chömed bitte ine!'], a: 1, why: 'Amb vostè: forma en -ed + Sie.' },
      { id: 'g14e5', type: 'choice', q: 'Quina manera de demanar és la MÉS educada?', options: ['Gib mer s Salz!', 'Gib mer bitte s Salz.', 'Chöntsch mer bitte s Salz gää?'], a: 2, why: 'Girar-ho en pregunta amb Konjunktiv és el registre més suau.' }
    ]
  },
  {
    id: 'g15',
    book: 'holle',
    unit: '21',
    order: 21,
    title: 'El futur (que no existeix)',
    emoji: '⏩',
    lesson: 'base',
    summary: 'Una altra bona notícia: el dialecte no té futur. Es fa servir el present.',
    points: [
      'Oblida "werden". En dialecte pràcticament no s’usa per fer el futur.',
      'Present + una paraula de temps i ja tens el futur:',
      '**Morn gang ich** uf Bärn. = Demà aniré a Berna.',
      '**Nächscht Wuche fangt** de Kurs **aa**. = La setmana vinent començarà el curs.',
      'Recorda l’ordre: si comences per la paraula de temps, el verb continua sent el segon.'
    ],
    exercises: [
      { id: 'g15e1', type: 'choice', q: 'Com dius «demà treballaré»?', options: ['Morn wird ich schaffe.', 'Morn schaffe ich.', 'Morn ich schaffe.'], a: 1, why: 'Present + "morn". I el verb en segona posició.' },
      { id: 'g15e2', type: 'choice', q: 'Com dius «l’any que ve aniré a Suïssa»?', options: ['Nächschts Johr gang ich i d Schwiiz.', 'Nächschts Johr werde ich i d Schwiiz gaa.', 'Ich gang werde i d Schwiiz.'], a: 0, why: 'Present + expressió de temps.' },
      { id: 'g15e3', type: 'gap', q: 'Completa amb el present: Morn ___ ich di aa. (rüefe = trucar)', a: ['rüefe'], why: '1a persona = infinitiu: rüefe. El prefix "aa" va al final.' },
      { id: 'g15e4', type: 'choice', q: 'Quants temps verbals de passat i futur té el dialecte?', options: ['Un passat i un futur', 'Un passat i cap futur', 'Dos passats i un futur'], a: 1, why: 'Només el perfet per al passat, i res per al futur: el present ho cobreix.' }
    ]
  },
  {
    id: 'g16',
    book: 'holle',
    unit: '08 · 23',
    order: 8.5,
    title: 'Verbs separables',
    emoji: '✂️',
    lesson: 'base',
    summary: 'Verbs que es parteixen: el prefix se’n va al final de la frase.',
    points: [
      '**uufstah** (llevar-se) → Ich **stande** am sibni **uf**.',
      '**aafange** (començar) → De Film **fangt** am achti **aa**.',
      '**iichaufe** (fer la compra) → Ich **chaufe** am Samschtig **ii**.',
      '**mitcho** (venir amb) → **Chunsch** du **mit**?',
      'Al perfet el prefix torna a enganxar-se, davant del ge-: uf**g**stande, aa**g**fange.',
      'Ich bi am sibni **uufgstande**. · De Film het **aagfange**.'
    ],
    exercises: [
      { id: 'g16e1', type: 'choice', q: 'Quina és correcta? (uufstah, a les set)', options: ['Ich uufstande am sibni.', 'Ich stande am sibni uf.', 'Ich stande uf am sibni.'], a: 1, why: 'El prefix "uf" tanca la frase.' },
      { id: 'g16e2', type: 'gap', q: 'De Kurs fangt am nüüni ___. (aafange)', a: ['aa', 'a'], why: 'El prefix separat va al final: fangt … aa.' },
      { id: 'g16e3', type: 'choice', q: 'Com preguntes «véns amb nosaltres?»', options: ['Mitchunsch du?', 'Chunsch du mit?', 'Du mitchunsch?'], a: 1, why: 'Verb primer (pregunta), prefix al final.' },
      { id: 'g16e4', type: 'choice', q: 'Passat de «Ich stande uf»:', options: ['Ich bi uufgstande.', 'Ich ha uufgstande.', 'Ich bi gstande uf.'], a: 0, why: 'Verb de moviment/canvi d’estat → sii. I el prefix torna a enganxar-se: uufgstande.' },
      { id: 'g16e5', type: 'gap', q: 'Digues a algú que pari: Hör ___! (ufhöre)', a: ['uf', 'ufe'], why: 'Hör uf! = Prou!' }
    ]
  },
  {
    id: 'g17',
    book: 'holle',
    unit: '25',
    order: 25,
    title: 'Les relatives amb «wo»',
    emoji: '🔗',
    lesson: 'base',
    summary: 'Una sola paraula per a totes les relatives. Aquí el dialecte és molt més fàcil que l’alemany.',
    points: [
      'L’alemany fa der/die/das/den/dem segons el cas. El dialecte fa **wo** i prou.',
      'De Maa, **wo** det staht, isch min Nachbar.',
      'D Frau, **wo** ich gseh han, isch d Chefin.',
      'S Buech, **wo** ich läse, isch guet.',
      '**wo** també vol dir "quan" per al passat: "**Wo** ich chli gsi bi…" = Quan era petita…',
      'Com sempre en subordinada, el verb se’n va al final.'
    ],
    exercises: [
      { id: 'g17e1', type: 'gap', q: 'De Zug, ___ am achti fahrt, isch voll.', a: ['wo'], why: 'Totes les relatives fan "wo".' },
      { id: 'g17e2', type: 'choice', q: 'Quina és correcta?', options: ['D Frau, die ich kännt han…', 'D Frau, wo ich kännt han…', 'D Frau, welchi ich kännt han…'], a: 1, why: 'En dialecte no es fan servir die/der/welche per a relatives: només "wo".' },
      { id: 'g17e3', type: 'choice', q: 'Tradueix: «Quan era petita, vivia a Barcelona.»', options: ['Wänn ich chli gsi bi, han ich z Barcelona gwohnt.', 'Wo ich chli gsi bi, han ich z Barcelona gwohnt.', 'Als ich chli gsi bi, han ich z Barcelona gwohnt.'], a: 1, why: 'Per al passat puntual, "wo" fa d’"als". "Wänn" és per a condicions o coses repetides.' },
      { id: 'g17e4', type: 'choice', q: 'On va el verb dins de la relativa?', options: ['En segona posició', 'Al final', 'Just després de wo'], a: 1, why: 'Subordinada → verb conjugat al final: "…, wo ich gseh han."' },
      { id: 'g17e5', type: 'gap', q: 'S Huus, ___ mir chauft händ, isch alt.', a: ['wo'], why: 'wo, sempre wo.' }
    ]
  },
  {
    id: 'g18',
    book: 'holle',
    unit: '24',
    order: 24,
    title: 'Comparar: grösser, am gröschte',
    emoji: '📊',
    lesson: 'base',
    summary: 'Comparatiu amb -er i superlatiu amb «am …-schte».',
    points: [
      'Comparatiu: adjectiu + **-er** → gross → **grösser** · schnäll → **schnäller**',
      'Superlatiu: **am** + adjectiu + **-schte** → **am gröschte** · **am schnällschte**',
      'Irregulars que has de saber: guet → **besser** → **am beschte**',
      'vil → **mee** → **am meischte** · gärn → **lieber** → **am liebschte**',
      'Per comparar es fa servir **als**: "Er isch grösser **als** ich."',
      '"Ich ha **lieber** Tee" = m’estimo més el te.'
    ],
    table: {
      head: ['Base', 'Comparatiu', 'Superlatiu'],
      rows: [
        ['gross', 'grösser', 'am gröschte'],
        ['schnäll', 'schnäller', 'am schnällschte'],
        ['guet', 'besser', 'am beschte'],
        ['vil', 'mee', 'am meischte'],
        ['gärn', 'lieber', 'am liebschte']
      ]
    },
    exercises: [
      { id: 'g18e1', type: 'gap', q: 'Züri isch ___ als Bärn. (gross)', a: ['grösser'], why: 'Comparatiu: -er.' },
      { id: 'g18e2', type: 'choice', q: 'Das isch ___ Lösig. (la millor)', options: ['di guet', 'di beschti', 'di mee'], a: 1, why: 'guet → besser → am beschte / di beschti davant d’un substantiu.' },
      { id: 'g18e3', type: 'gap', q: 'Ich ha ___ Kaffi als Tee. (m’estimo més)', a: ['lieber'], why: 'gärn → lieber.' },
      { id: 'g18e4', type: 'choice', q: 'Com dius «ell corre més ràpid»?', options: ['Er springt am schnällschte.', 'Er springt schnäller.', 'Er springt mee schnäll.'], a: 1, why: 'Comparatiu amb -er, mai amb "mee" davant.' },
      { id: 'g18e5', type: 'gap', q: 'Superlatiu de «schnäll»: am ___', a: ['schnällschte', 'schnellschte'], why: 'am + -schte.' }
    ]
  },
  {
    id: 'g19',
    book: 'holle',
    unit: '19',
    order: 19,
    title: 'Estar fent: «am … sii»',
    emoji: '⏳',
    lesson: 'base',
    summary: 'El dialecte sí que té una forma per dir que estàs fent una cosa ara mateix. L’alemany estàndard no.',
    points: [
      'Estructura: **sii** conjugat + **am** + infinitiu (escrit en majúscula, com un substantiu).',
      'Ich **bi am Schaffe**. = Estic treballant.',
      'Er **isch am Ässe**. = Està menjant.',
      'Mir **sind am Luege**. = Estem mirant.',
      'És el paral·lel exacte del "estic + gerundi" català, i s’usa molt.',
      'Compte: no és el mateix que el present normal. "Ich schaffe" = treballo (en general).'
    ],
    exercises: [
      { id: 'g19e1', type: 'gap', q: 'Ich ___ am Choche. (estic cuinant)', a: ['bi'], why: 'sii + am + infinitiu: ich bi am Choche.' },
      { id: 'g19e2', type: 'choice', q: 'Com dius «està dormint»?', options: ['Er schlaft.', 'Er isch am Schlafe.', 'Er isch schlafe.'], a: 1, why: 'sii + am + infinitiu.' },
      { id: 'g19e3', type: 'choice', q: 'Quina diferència hi ha entre «Ich schaffe» i «Ich bi am Schaffe»?', options: ['Cap, són sinònims', 'La primera és general, la segona és ara mateix', 'La primera és passat'], a: 1, why: '"Ich schaffe" = treballo (en general). "Ich bi am Schaffe" = estic treballant ara.' },
      { id: 'g19e4', type: 'gap', q: 'Mir ___ am Ässe. (estem menjant)', a: ['sind'], why: 'Plural de sii: sind.' }
    ]
  },
  {
    id: 'g20',
    book: 'holle',
    unit: '13',
    order: 13,
    title: 'Adjectius davant del substantiu',
    emoji: '🎨',
    lesson: 'base',
    summary: 'Les terminacions -e / -i / -s. Aquí el dialecte NO fa igual que l’alemany.',
    points: [
      'Darrere de sii no porten res: "De Maa isch **alt**." · "D Frau isch **alt**."',
      'Davant d’un substantiu amb article indeterminat, sí:',
      'masculí: en **alte** Maa · femení: e **alti** Frau · neutre: es **alts** Chind',
      'plural: **alti** Chind',
      'La femenina en **-i** és la que més sona a suís (alemany: eine alt**e** Frau).',
      'La neutra fa **-s**, no -es: es guet**s** Buech.'
    ],
    table: {
      head: ['Gènere', 'Dialecte', 'Hochdeutsch'],
      rows: [
        ['masculí', 'en guete Maa', 'ein guter Mann'],
        ['femení', 'e gueti Frau', 'eine gute Frau'],
        ['neutre', 'es guets Chind', 'ein gutes Kind'],
        ['plural', 'gueti Chind', 'gute Kinder']
      ]
    },
    exercises: [
      { id: 'g20e1', type: 'gap', q: 'Es isch e ___ Frau. (nätt)', a: ['nätti', 'netti'], why: 'Femení indeterminat → -i.' },
      { id: 'g20e2', type: 'choice', q: 'Das isch es ___ Buech.', options: ['guete', 'gueti', 'guets'], a: 2, why: 'Neutre → -s: es guets Buech.' },
      { id: 'g20e3', type: 'choice', q: 'Ich ha en ___ Fründ.', options: ['guete', 'gueti', 'guets'], a: 0, why: 'Masculí → -e: en guete Fründ.' },
      { id: 'g20e4', type: 'gap', q: 'Darrere del verb no porta terminació: D Frau isch ___. (alt)', a: ['alt'], why: 'Ús predicatiu → adjectiu nu.' },
      { id: 'g20e5', type: 'choice', q: 'Quina terminació delata més que parles dialecte i no alemany?', options: ['La masculina -e', 'La femenina -i', 'Cap'], a: 1, why: 'L’alemany fa "eine gute Frau"; el dialecte, "e gueti Frau".' }
    ]
  },
  {
    id: 'g21',
    book: 'holle',
    unit: '05',
    order: 5,
    title: 'Demostratius: dä, die, das',
    emoji: '👆',
    lesson: 'base',
    summary: 'Assenyalar coses. Són les mateixes paraules que els articles, però dites amb força.',
    points: [
      '**dä** Maa (masculí) · **die** Frau (femení) · **das** Chind (neutre) · **die** Chind (plural)',
      'Fixa’t que són els articles de/d/s però en la forma llarga i accentuada.',
      'Per precisar on és, s’hi afegeix **da** (aquí) o **det** (allà):',
      '**dä** Maa **da** = aquest home d’aquí · **die** Frau **det** = aquella dona d’allà',
      '**das** tot sol vol dir "això": "Was isch **das**?" · "**Das** isch guet."'
    ],
    table: {
      head: ['Gènere', 'Article', 'Demostratiu'],
      rows: [['masculí', 'de Maa', 'dä Maa'], ['femení', 'd Frau', 'die Frau'], ['neutre', 's Chind', 'das Chind'], ['plural', 'd Chind', 'die Chind']]
    },
    exercises: [
      { id: 'g21e1', type: 'gap', q: '___ Maa da isch min Nachbar. (aquest)', a: ['dä'], why: 'Masculí → dä.' },
      { id: 'g21e2', type: 'choice', q: '___ Frau det schaffet mit mir.', options: ['dä', 'die', 'das'], a: 1, why: 'Femení → die.' },
      { id: 'g21e3', type: 'gap', q: 'Was isch ___? (això)', a: ['das'], why: '"das" tot sol = això.' },
      { id: 'g21e4', type: 'choice', q: 'Quina diferència hi ha entre «de Maa» i «dä Maa»?', options: ['Cap', 'El primer és l’article, el segon assenyala', 'El segon és plural'], a: 1, why: 'Mateixa família de paraules: l’article dit amb força es torna demostratiu.' },
      { id: 'g21e5', type: 'choice', q: 'Com dius «aquelles criatures d’allà»?', options: ['die Chind det', 'das Chind det', 'dä Chind det'], a: 0, why: 'Plural → die, i "det" per marcar la distància.' }
    ]
  },
  {
    id: 'g22',
    book: 'holle',
    unit: '06',
    order: 6,
    title: 'El plural dels substantius',
    emoji: '👥',
    lesson: 'base',
    summary: 'La pista fiable no és la terminació: és l’article. En plural sempre és «d».',
    points: [
      'Sigui quin sigui el gènere, **el plural porta sempre d**: d Manne, d Fraue, d Chind.',
      'Quatre patrons de formació:',
      'Sense canvi: s Chind → d **Chind** · s Zimmer → d **Zimmer**',
      'Només Umlaut: de Tag → d **Täg** · de Vogel → d **Vögel**',
      'Amb -e: de Fründ → d **Fründe** · d Frau → d **Fraue**',
      'Amb -er i Umlaut: s Huus → d **Hüüser** · s Buech → d **Büecher**',
      'Aquí el dialecte s’allunya de l’alemany: molts masculins fan el plural només amb Umlaut, sense afegir res.'
    ],
    table: {
      head: ['Singular', 'Plural', 'Patró'],
      rows: [
        ['s Chind', 'd Chind', 'sense canvi'],
        ['de Tag', 'd Täg', 'Umlaut'],
        ['de Fründ', 'd Fründe', '+ -e'],
        ['s Huus', 'd Hüüser', '+ -er i Umlaut'],
        ['s Buech', 'd Büecher', '+ -er i Umlaut']
      ]
    },
    exercises: [
      { id: 'g22e1', type: 'gap', q: 'Plural de «s Huus» → d ___', a: ['hüüser', 'huuser'], why: '-er amb Umlaut: Hüüser.' },
      { id: 'g22e2', type: 'gap', q: 'Plural de «de Tag» → d ___', a: ['täg', 'taeg'], why: 'Només Umlaut: Täg.' },
      { id: 'g22e3', type: 'choice', q: 'Plural de «s Chind»:', options: ['d Chinder', 'd Chind', 'd Chinde'], a: 1, why: 'No canvia. L’article "d" és l’única marca.' },
      { id: 'g22e4', type: 'choice', q: 'Quina és la pista més fiable que un substantiu és plural?', options: ['La terminació', 'L’article «d»', 'L’Umlaut'], a: 1, why: 'Les terminacions varien; l’article "d" hi és sempre.' },
      { id: 'g22e5', type: 'gap', q: 'Plural de «s Buech» → d ___', a: ['büecher', 'buecher'], why: 'Büecher.' }
    ]
  },
  {
    id: 'g23',
    book: 'holle',
    unit: '07',
    order: 7,
    title: 'Tractament: du o Sie',
    emoji: '🤝',
    lesson: 'base',
    summary: 'Equivocar-s’hi és el error que més es nota. A Suïssa es va amb més compte que a Alemanya.',
    points: [
      '**Sie** fa servir sempre les formes de plural: Sie **händ**, Sie **chönd**, Sie **sind**.',
      'Salutació: **Grüezi** va amb Sie · **Hoi** i **Sali** van amb du.',
      'Comiat: **Uf Wiederluege** amb Sie · **Tschüss** o **Ciao** amb du.',
      'De **Sie** a: desconeguts, botigues, gent gran, clients, l’administració.',
      'De **du** a: amics, família, criatures, i a molta feina entre companys.',
      'El **du** l’ofereix sempre la persona gran o de més rang: "Sölle mer **duze**?"',
      'Regla pràctica: si dubtes, Sie. Passar de Sie a du és fàcil; a l’inrevés és incòmode.'
    ],
    exercises: [
      { id: 'g23e1', type: 'choice', q: 'A la caixa d’un supermercat, com saludes?', options: ['Hoi!', 'Grüezi!', 'Sali!'], a: 1, why: 'Amb desconeguts, Grüezi i Sie.' },
      { id: 'g23e2', type: 'gap', q: 'Amb Sie: ___ Sie hüt Ziit? (de haa)', a: ['händ', 'hand'], why: 'Sie sempre amb la forma de plural: händ.' },
      { id: 'g23e3', type: 'choice', q: 'Quina és correcta amb vostè?', options: ['Chasch Sie mer hälfe?', 'Chönd Sie mer hälfe?', 'Cha Sie mer hälfe?'], a: 1, why: 'Sie + chönd (plural).' },
      { id: 'g23e4', type: 'choice', q: 'Qui ofereix passar al «du»?', options: ['Qui vulgui', 'La persona més gran o de més rang', 'Sempre la més jove'], a: 1, why: 'A Suïssa és una norma força respectada.' },
      { id: 'g23e5', type: 'choice', q: 'Si dubtes, què fas servir?', options: ['du, és més amable', 'Sie', 'Depèn del dia'], a: 1, why: 'Sie mai ofèn; du fora de lloc, sí.' }
    ]
  },
  {
    id: 'g24',
    book: 'holle',
    unit: '09',
    order: 9,
    title: 'Gang go & chum cho',
    emoji: '🚶',
    lesson: 'base',
    summary: 'Una construcció que l’alemany no té i que sentiràs cada dia. Anar a fer una cosa.',
    points: [
      'Per dir "anar a fer alguna cosa" s’hi posa **go** entremig:',
      '**gaa** + **go** + infinitiu → Ich **gang go poschte**. = Vaig a comprar.',
      'Ich **gang go schlafe**. = Me’n vaig a dormir. · Mir **gönd go ässe**. = Anem a menjar.',
      'Amb el verb venir, la partícula és **cho**:',
      '**cho** + **cho** + infinitiu → **Chunsch cho ässe?** = Véns a menjar?',
      'Er **chunt cho luege**. = Ve a mirar.',
      'La partícula no es tradueix i **no es pot ometre**. En alemany seria només "Ich gehe einkaufen".',
      'És una de les marques més clares que parles dialecte i no alemany.'
    ],
    table: {
      head: ['Züridütsch', 'Hochdeutsch', 'Català'],
      rows: [
        ['Ich gang go poschte.', 'Ich gehe einkaufen.', 'Vaig a comprar.'],
        ['Mir gönd go ässe.', 'Wir gehen essen.', 'Anem a menjar.'],
        ['Chunsch cho luege?', 'Kommst du schauen?', 'Véns a mirar?'],
        ['Ich gang go schlafe.', 'Ich gehe schlafen.', 'Me’n vaig a dormir.']
      ]
    },
    exercises: [
      { id: 'g24e1', type: 'gap', q: 'Ich gang ___ poschte. (la partícula)', a: ['go'], why: 'Amb gaa, sempre "go".' },
      { id: 'g24e2', type: 'gap', q: 'Chunsch ___ ässe? (la partícula)', a: ['cho'], why: 'Amb cho, la partícula és "cho".' },
      { id: 'g24e3', type: 'choice', q: 'Quina és correcta?', options: ['Mir gönd ässe.', 'Mir gönd go ässe.', 'Mir gönd cho ässe.'], a: 1, why: 'gaa demana "go". Sense partícula sona a alemany.' },
      { id: 'g24e4', type: 'choice', q: 'Què vol dir «go» aquí?', options: ['Res per si sola, és obligatòria', '«ja»', '«cap a»'], a: 0, why: 'No es tradueix; forma part de la construcció.' },
      { id: 'g24e5', type: 'choice', q: 'Tradueix: «Ve a ajudar.»', options: ['Er chunt hälfe.', 'Er chunt cho hälfe.', 'Er gaht go hälfe.'], a: 1, why: 'cho + cho + infinitiu.' }
    ]
  },
  {
    id: 'g25',
    book: 'holle',
    unit: '11',
    order: 11,
    title: 'Nombres ordinals i dates',
    emoji: '📅',
    lesson: 'base',
    summary: 'Primer, segon, tercer… i com es diu una data.',
    points: [
      '**erschte · zweite · dritte · vierte · füfte · sächste · sibte · achte · nüünte · zähnte**',
      'A partir del 20 s’hi afegeix **-schte**: zwänzg → **zwänzgschte**',
      'Dates amb **am** + ordinal: **am erschte Mai** · **am zwölfte Februar**',
      'Pisos amb **im**: **im dritte Stock** = al tercer pis',
      'Recorda que els cardinals van al revés que en català: **einezwänzg** = 21 (u-i-vint).'
    ],
    table: {
      head: ['Nombre', 'Cardinal', 'Ordinal'],
      rows: [['1', 'eis', 'erschte'], ['2', 'zwei', 'zweite'], ['3', 'drü', 'dritte'], ['5', 'foif', 'füfte'], ['10', 'zäh', 'zähnte'], ['20', 'zwänzg', 'zwänzgschte']]
    },
    exercises: [
      { id: 'g25e1', type: 'gap', q: 'Ordinal d’«eis» → ___', a: ['erschte', 'erscht'], why: 'erschte, com "erste" en alemany.' },
      { id: 'g25e2', type: 'choice', q: 'Com dius «l’u de maig»?', options: ['am eis Mai', 'am erschte Mai', 'de eis Mai'], a: 1, why: 'am + ordinal.' },
      { id: 'g25e3', type: 'gap', q: 'Ordinal de «drü» → ___', a: ['dritte', 'dritt'], why: 'dritte.' },
      { id: 'g25e4', type: 'choice', q: 'Què vol dir «einezwänzg»?', options: ['12', '21', '20'], a: 1, why: 'Primer la unitat, després la desena: u-i-vint = 21.' },
      { id: 'g25e5', type: 'choice', q: 'Com dius «al tercer pis»?', options: ['am dritte Stock', 'im dritte Stock', 'uf dritte Stock'], a: 1, why: 'Pisos amb "im".' }
    ]
  },
  {
    id: 'g26',
    book: 'holle',
    unit: '14',
    order: 14,
    title: 'Possessius: min, mini, mis',
    emoji: '🫱',
    lesson: 'base',
    summary: 'Les mateixes tres terminacions que els adjectius: -n / -i / -s.',
    points: [
      'masculí **min** Vatter · femení **mini** Mueter · neutre **mis** Chind · plural **mini** Chind',
      'Amb tu: **din** Vatter · **dini** Mueter · **dis** Chind · **dini** Chind',
      'D’ell: **sin** / **sini** / **sis** · De nosaltres: **üse** / **üsi** / **üses**',
      'Fixa’t en el patró: la femenina i el plural fan **-i**, igual que els adjectius (e guet**i** Frau).',
      'Recorda que el genitiu no existeix: "la casa del meu germà" = s Huus **vo mim** Brueder.'
    ],
    table: {
      head: ['', 'masculí', 'femení', 'neutre'],
      rows: [
        ['el meu', 'min Vatter', 'mini Mueter', 'mis Chind'],
        ['el teu', 'din Vatter', 'dini Mueter', 'dis Chind'],
        ['el seu (d’ell)', 'sin Vatter', 'sini Mueter', 'sis Chind'],
        ['el nostre', 'üse Vatter', 'üsi Mueter', 'üses Chind']
      ]
    },
    exercises: [
      { id: 'g26e1', type: 'gap', q: '___ Mueter chunt morn. (la meva)', a: ['mini'], why: 'Femení → -i: mini Mueter.' },
      { id: 'g26e2', type: 'choice', q: '___ Chind isch chrank. (el meu)', options: ['min', 'mini', 'mis'], a: 2, why: 'Neutre → -s: mis Chind.' },
      { id: 'g26e3', type: 'gap', q: 'Wo isch ___ Velo? (la teva bici, s Velo és neutre)', a: ['dis'], why: 'Neutre → dis.' },
      { id: 'g26e4', type: 'choice', q: 'Com dius «la casa de la meva germana»?', options: ['mini Schwöschter s Huus', 's Huus vo minere Schwöschter', 's Huus minere Schwöschter'], a: 1, why: 'Sense genitiu: vo + datiu.' },
      { id: 'g26e5', type: 'choice', q: 'Quina terminació comparteixen el femení i el plural?', options: ['-n', '-i', '-s'], a: 1, why: 'mini Mueter i mini Chind: totes dues amb -i.' }
    ]
  },
  {
    id: 'g27',
    book: 'holle',
    unit: '17',
    order: 17,
    title: 'Preposicions i contraccions',
    emoji: '📍',
    lesson: 'base',
    summary: 'El que costa no són les preposicions: són les contraccions, que s’escriuen totes juntes.',
    points: [
      'De lloc: **i / im** (a dins) · **uf / ufem** (sobre) · **under** · **über** · **näbet** (al costat) · **zwüsche** · **vor** · **hinder** · **bi** (a casa de)',
      'De temps: **am** Mäntig · **im** Summer · **am** achti (hora) · **sit** · **bis** · **vor** · **nach**',
      'De causa i finalitat: **für** · **wäge** (per culpa de) · **zum** + infinitiu (per a)',
      'Contraccions que has de reconèixer de seguida:',
      'i + em = **im** · a + em = **am** · zu + em = **zum** · uf + em = **ufem** · bi + em = **bim** · vo + em = **vom** · i + eme = **ime**',
      'Amb ciutats es fa servir **z**: **z** Züri · **z** Bärn (i no "in Zürich").'
    ],
    table: {
      head: ['Contracció', 'Ve de', 'Exemple'],
      rows: [
        ['im', 'i + em', 'im Büro'],
        ['am', 'a + em', 'am Bahnhof'],
        ['zum', 'zu + em', 'zum Aazt'],
        ['ufem', 'uf + em', 'ufem Tisch'],
        ['bim', 'bi + em', 'bim Dokter'],
        ['ime', 'i + eme', 'ime Zug']
      ]
    },
    exercises: [
      { id: 'g27e1', type: 'gap', q: 'Ich bi ___ Büro. (a l’oficina)', a: ['im'], why: 'i + em = im.' },
      { id: 'g27e2', type: 'choice', q: 'S Buech ligt ___ Tisch.', options: ['im', 'ufem', 'zum'], a: 1, why: 'Sobre la taula → uf + em = ufem.' },
      { id: 'g27e3', type: 'gap', q: 'Ich wohne ___ Züri. (a Zuric)', a: ['z'], why: 'Amb ciutats, "z": z Züri.' },
      { id: 'g27e4', type: 'choice', q: 'Com dius «dilluns»?', options: ['uf Mäntig', 'am Mäntig', 'im Mäntig'], a: 1, why: 'Dies de la setmana amb "am".' },
      { id: 'g27e5', type: 'gap', q: 'Ich gang ___ Dokter. (a cal metge)', a: ['zum'], why: 'zu + em = zum.' },
      { id: 'g27e6', type: 'choice', q: '«ime Zug» ve de…', options: ['i + em', 'i + eme', 'i + de'], a: 1, why: 'Amb article indeterminat: i + eme = ime (en un tren).' }
    ]
  },
  {
    id: 'g28',
    book: 'holle',
    unit: '18',
    order: 18,
    title: 'Conjuncions i on va el verb',
    emoji: '⛓️',
    lesson: 'base',
    summary: 'La conjunció que tries decideix on acaba el verb. És la regla que més s’oblida.',
    points: [
      'Les que **no** mouen el verb (queda en segona posició): **und · oder · aber · dänn · sondern**',
      'Ich bi müed, **aber** ich **chume** trotzdem.',
      'Les que **envien el verb al final**: **wil · dass · öb · wenn · wo · öbwohl · bevor · bis · damit**',
      'Ich chume nöd, **wil** ich chrank **bi**.',
      'Er het gfrogt, **öb** ich Ziit **han**.',
      '**dass** sovint es deixa caure: "Ich glaub, er chunt spöter." I aleshores el verb es queda en segona posició.'
    ],
    table: {
      head: ['Tipus', 'Conjuncions', 'El verb va…'],
      rows: [
        ['coordinants', 'und, oder, aber, dänn', 'en segona posició'],
        ['subordinants', 'wil, dass, öb, wenn, wo, öbwohl', 'al final']
      ]
    },
    exercises: [
      { id: 'g28e1', type: 'choice', q: 'Quina és correcta?', options: ['Ich blibe deheim, wil ich bi müed.', 'Ich blibe deheim, wil ich müed bi.', 'Ich blibe deheim, wil bi ich müed.'], a: 1, why: '"wil" és subordinant → el verb tanca la frase.' },
      { id: 'g28e2', type: 'choice', q: 'I amb «aber»?', options: ['…, aber ich chume trotzdem.', '…, aber ich trotzdem chume.', '…, aber chume ich trotzdem.'], a: 0, why: '"aber" no mou res: el verb es queda en segona posició.' },
      { id: 'g28e3', type: 'gap', q: 'Er het gfrogt, ___ ich Ziit han. (si)', a: ['öb'], why: '"öb" = si (interrogativa indirecta), i envia el verb al final.' },
      { id: 'g28e4', type: 'choice', q: 'Quina conjunció NO envia el verb al final?', options: ['wil', 'öbwohl', 'oder'], a: 2, why: 'und/oder/aber/dänn són coordinants.' },
      { id: 'g28e5', type: 'choice', q: 'Si deixes caure el «dass», on va el verb?', options: ['Continua al final', 'Torna a la segona posició', 'Al principi'], a: 1, why: 'Sense "dass" la frase deixa de ser subordinada d’ordre: "Ich glaub, er chunt spöter."' }
    ]
  },
  {
    id: 'g29',
    book: 'holle',
    unit: '22',
    order: 22,
    title: 'La passiva (i com evitar-la)',
    emoji: '🔄',
    lesson: 'base',
    summary: 'Existeix, però el dialecte la defuig. El que fan de debò és una altra cosa.',
    points: [
      'El que sentiràs de veritat és **me** (= "hom", l’alemany "man") amb el verb en actiu:',
      '**Me** macht das so. = Això es fa així. · **Me** seit, es sig guet.',
      'Aquesta és la manera natural. Si dubtes, tira per aquí.',
      'La passiva de manual existeix amb **werde** + participi: "S Huus **wird** bout."',
      'ich **wird** · du **wirsch** · er **wird**',
      'Al passat, el participi de werde és **worde**: "Es **isch** gmacht **worde**." = Es va fer.',
      'Compte: «werde» serveix per a la passiva, però **no** per fer el futur (el futur no existeix).'
    ],
    exercises: [
      { id: 'g29e1', type: 'choice', q: 'Com diria un suís «això es fa així»?', options: ['Das wird so gmacht.', 'Me macht das so.', 'Das isch so gmacht.'], a: 1, why: 'Totes dues s’entenen, però la natural en dialecte és amb "me".' },
      { id: 'g29e2', type: 'gap', q: 'Es isch scho gmacht ___. (participi de werde)', a: ['worde'], why: 'werde → worde. "Es isch gmacht worde" = es va fer.' },
      { id: 'g29e3', type: 'choice', q: 'Per a què NO serveix «werde» en dialecte?', options: ['Per a la passiva', 'Per fer el futur', 'Per a les dues coses'], a: 1, why: 'El futur es fa amb el present. "werde" queda per a la passiva.' },
      { id: 'g29e4', type: 'gap', q: '___ seit, das sig nöd eifach. (hom diu)', a: ['me', 'mer'], why: '"me" (o "mer") = man.' },
      { id: 'g29e5', type: 'choice', q: '«S Huus wird bout» vol dir…', options: ['La casa es construeix', 'La casa es construirà', 'La casa s’ha construït'], a: 0, why: 'Passiva de present. El futur necessitaria una paraula de temps.' }
    ]
  },
  {
    id: 'g30',
    book: 'holle',
    unit: '26',
    order: 26,
    title: 'Verbs reflexius',
    emoji: '🪞',
    lesson: 'base',
    summary: 'Els pronoms són els mateixos que ja saps: mi, di, sich.',
    points: [
      'Acusatiu: **mi · di · sich · üs · eu · sich**',
      'Ich freue **mi**. = M’alegro. · Setz **di**! = Seu! · Er wäscht **sich**.',
      'Quan l’acció es fa "per a un mateix", el pronom va en **datiu**: **mer · dir · em**',
      'Ich chaufe **mer** es Buech. = Em compro un llibre.',
      'Ich han **mer** es Glacé kauft. = M’he comprat un gelat.',
      'Reflexius que faràs servir molt: sich **freue** (alegrar-se), sich **setze** (seure), sich **verspöte** (fer tard), sich **uskänne** (orientar-se).'
    ],
    table: {
      head: ['Persona', 'Acusatiu', 'Datiu'],
      rows: [['jo', 'mi', 'mer'], ['tu', 'di', 'dir'], ['ell/ella', 'sich', 'em / ere'], ['nosaltres', 'üs', 'üs']]
    },
    exercises: [
      { id: 'g30e1', type: 'gap', q: 'Ich freue ___! (m’alegro)', a: ['mi'], why: 'Acusatiu reflexiu de 1a persona: mi.' },
      { id: 'g30e2', type: 'gap', q: 'Setz ___! (seu, a un amic)', a: ['di'], why: 'Imperatiu + reflexiu de tu: Setz di!' },
      { id: 'g30e3', type: 'choice', q: 'Ich chaufe ___ es nöis Velo. (per a mi)', options: ['mi', 'mer', 'mich'], a: 1, why: 'Acció per a un mateix → datiu: mer.' },
      { id: 'g30e4', type: 'choice', q: 'Com dius «he fet tard»?', options: ['Ich ha mi verspöted.', 'Ich ha mer verspöted.', 'Ich bi mi verspöted.'], a: 0, why: 'sich verspöte, amb haa i el reflexiu en acusatiu.' },
      { id: 'g30e5', type: 'gap', q: 'Er wäscht ___. (es renta)', a: ['sich'], why: '3a persona: sich.' }
    ]
  },
  {
    id: 'g31',
    book: 'holle',
    unit: '27',
    order: 27.2,
    title: 'Estil indirecte: seig i häig',
    emoji: '💬',
    lesson: 'base',
    summary: 'Quan expliques el que ha dit un altre i no en respons. Dues formes que has de reconèixer.',
    points: [
      'De **sii** surt **seig** · de **haa** surt **häig**.',
      'Er het gseit, er **seig** chrank. = Ha dit que estava malalt.',
      'Sie het gseit, sie **häig** kei Ziit. = Ha dit que no tenia temps.',
      'Fer servir seig/häig marca distància: **ho expliques, però no dius que sigui veritat**.',
      'Amb la resta de verbs, el dialecte normalment tira pel dret amb l’indicatiu:',
      'Er het gseit, er **chunt** spöter. = Ha dit que vindrà més tard.',
      'Les sentiràs sobretot a les notícies, als xafardeigs i quan algú es vol treure responsabilitat de sobre.'
    ],
    exercises: [
      { id: 'g31e1', type: 'gap', q: 'Er het gseit, er ___ chrank. (de sii)', a: ['seig'], why: 'sii → seig en estil indirecte.' },
      { id: 'g31e2', type: 'gap', q: 'Sie het gseit, sie ___ kei Ziit. (de haa)', a: ['häig'], why: 'haa → häig.' },
      { id: 'g31e3', type: 'choice', q: 'Què hi afegeix «seig» respecte de dir «er isch chrank»?', options: ['Res, és més formal', 'Que ho expliques però no en respons', 'Que és mentida'], a: 1, why: 'Marca que estàs citant algú altre, sense comprometre’t.' },
      { id: 'g31e4', type: 'choice', q: 'Amb la majoria de verbs, com es fa l’estil indirecte en dialecte?', options: ['Amb formes especials per a cada verb', 'Amb l’indicatiu normal', 'No es pot fer'], a: 1, why: 'Només sii i haa tenen formes pròpies d’ús corrent; la resta van en indicatiu.' }
    ]
  }
]

// S'exporta en l'ordre del llibre de l'Andrea Holle (Schweizerdeutsch verstehen).
// Els temes sense capítol (unit: null) van al final.
export const GRAMMAR = [...TEMES].sort((a, b) => (a.order || 99) - (b.order || 99))
