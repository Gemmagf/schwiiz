// Temes de gramàtica Züridütsch + exercicis autocorregits.
//
// Tipus d'exercici:
//   'choice' -> q amb ___, options[], a = índex de la correcta
//   'gap'    -> q amb ___, a = array de respostes acceptades (es compara en minúscules, sense accents)
// `why` és l'explicació que surt després de respondre.

export const GRAMMAR = [
  {
    id: 'g01',
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
  }
]
