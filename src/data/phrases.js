// Frases útils i diàlegs per situacions reals.
// PHRASES  = frases soltes, filtrables per etiqueta.
// DIALOGS  = converses curtes, línia a línia, per llegir en veu alta.

// Les etiquetes segueixen els capítols de situacions del Holle (28–34).
export const PHRASE_TAGS = [
  { id: 'sobreviure', label: 'Demanar ajuda', emoji: '🆘', unit: '34' },
  { id: 'presentar', label: 'Presentar-se', emoji: '🙋', unit: '28' },
  { id: 'salutacions', label: 'Salutacions', emoji: '👋', unit: '29' },
  { id: 'smalltalk', label: 'Smalltalk', emoji: '💬', unit: '30' },
  { id: 'metge', label: 'Al metge', emoji: '🩺', unit: '31' },
  { id: 'feina', label: 'Feina i entrevista', emoji: '💼', unit: '32' },
  { id: 'hotel', label: 'A l’hotel', emoji: '🛎️', unit: '33' },
  { id: 'fora', label: 'Compres, camí i tren', emoji: '🚶', unit: '34' }
]

export const PHRASES = [
  // Sobreviure — les que et salven la vida el primer mes
  { id: 'p01', ch: 'Entschuldigung, ich verstahn nöd.', de: 'Entschuldigung, ich verstehe nicht.', ca: 'Perdoni, no ho entenc.', tag: 'sobreviure' },
  { id: 'p02', ch: 'Chönd Sie das bitte wiederhole?', de: 'Können Sie das bitte wiederholen?', ca: 'Ho pot repetir, si us plau?', tag: 'sobreviure' },
  { id: 'p03', ch: 'Chönd Sie chli langsamer rede?', de: 'Können Sie etwas langsamer sprechen?', ca: 'Pot parlar una mica més a poc a poc?', tag: 'sobreviure' },
  { id: 'p04', ch: 'Ich lehre grad Schwiizerdütsch.', de: 'Ich lerne gerade Schweizerdeutsch.', ca: 'Estic aprenent suís-alemany.', tag: 'sobreviure' },
  { id: 'p05', ch: 'Chönd mer Hochdütsch rede?', de: 'Können wir Hochdeutsch sprechen?', ca: 'Podem parlar alemany estàndard?', tag: 'sobreviure' },
  { id: 'p06', ch: 'Wie seit mer das uf Schwiizerdütsch?', de: 'Wie sagt man das auf Schweizerdeutsch?', ca: 'Com es diu això en suís-alemany?', tag: 'sobreviure' },
  { id: 'p07', ch: 'Was heisst das?', de: 'Was heisst das?', ca: 'Què vol dir això?', tag: 'sobreviure' },
  { id: 'p08', ch: 'Chasch mer hälfe?', de: 'Kannst du mir helfen?', ca: 'Em pots ajudar?', tag: 'sobreviure' },
  { id: 'p09', ch: 'Ich weiss nöd.', de: 'Ich weiss nicht.', ca: 'No ho sé.', tag: 'sobreviure' },
  { id: 'p10', ch: 'Kei Problem.', de: 'Kein Problem.', ca: 'Cap problema.', tag: 'sobreviure' },

  // Presentar-se
  { id: 'p20', ch: 'Ich heisse Gemma.', de: 'Ich heisse Gemma.', ca: 'Em dic Gemma.', tag: 'presentar' },
  { id: 'p21', ch: 'Wie heissisch du?', de: 'Wie heisst du?', ca: 'Com et dius? (informal)', tag: 'presentar' },
  { id: 'p22', ch: 'Wie heissed Sie?', de: 'Wie heissen Sie?', ca: 'Com es diu? (formal)', tag: 'presentar' },
  { id: 'p23', ch: 'Ich chume us Katalonie.', de: 'Ich komme aus Katalonien.', ca: 'Vinc de Catalunya.', tag: 'presentar' },
  { id: 'p24', ch: 'Ich wohne z Züri.', de: 'Ich wohne in Zürich.', ca: 'Visc a Zuric.', tag: 'presentar', note: '"z" + ciutat = a (Zuric, Bern, Basel).' },
  { id: 'p25', ch: 'Ich bi sit eim Johr da.', de: 'Ich bin seit einem Jahr hier.', ca: 'Fa un any que sóc aquí.', tag: 'presentar' },
  { id: 'p26', ch: 'Was machsch du berueflich?', de: 'Was machst du beruflich?', ca: 'A què et dediques?', tag: 'presentar' },
  { id: 'p27', ch: 'Ich schaffe als ...', de: 'Ich arbeite als ...', ca: 'Treballo de ...', tag: 'presentar' },
  { id: 'p28', ch: 'Freut mi, di kännezlerne.', de: 'Freut mich, dich kennenzulernen.', ca: 'Encantada de conèixe’t.', tag: 'presentar' },
  { id: 'p29', ch: 'Redsch du Änglisch?', de: 'Sprichst du Englisch?', ca: 'Parles anglès?', tag: 'presentar' },

  // Social
  { id: 'p40', ch: 'Wie gaht’s dir?', de: 'Wie geht es dir?', ca: 'Com estàs?', tag: 'smalltalk' },
  { id: 'p41', ch: 'Ganz guet, danke.', de: 'Ganz gut, danke.', ca: 'Molt bé, gràcies.', tag: 'smalltalk' },
  { id: 'p42', ch: 'Was machsch du so?', de: 'Was machst du so?', ca: 'Què fas? / Com et va?', tag: 'smalltalk' },
  { id: 'p43', ch: 'Gömmer?', de: 'Gehen wir?', ca: 'Anem?', tag: 'smalltalk', note: 'Contracció de "gönd mir". Molt col·loquial i molt usada.' },
  { id: 'p44', ch: 'Häsch Luscht?', de: 'Hast du Lust?', ca: 'Et ve de gust?', tag: 'smalltalk' },
  { id: 'p45', ch: 'Machemer öppis am Samschtig?', de: 'Machen wir etwas am Samstag?', ca: 'Fem alguna cosa dissabte?', tag: 'smalltalk' },
  { id: 'p46', ch: 'Bis spöter!', de: 'Bis später!', ca: 'Fins després!', tag: 'smalltalk' },
  { id: 'p47', ch: 'Schöns Wuchenänd!', de: 'Schönes Wochenende!', ca: 'Bon cap de setmana!', tag: 'smalltalk' },
  { id: 'p48', ch: 'Alles Gueti!', de: 'Alles Gute!', ca: 'Molta sort! / Que vagi bé!', tag: 'smalltalk' },
  { id: 'p49', ch: 'Das isch mega guet!', de: 'Das ist sehr gut!', ca: 'Això està molt bé!', tag: 'smalltalk' },
  { id: 'p50', ch: 'Ich ha mi verspöted, sorry.', de: 'Ich habe mich verspätet, sorry.', ca: 'Faig tard, perdona.', tag: 'smalltalk' },

  // Feina
  { id: 'p60', ch: 'Ich ha en Termin am zäni.', de: 'Ich habe einen Termin um zehn.', ca: 'Tinc una cita a les deu.', tag: 'feina' },
  { id: 'p61', ch: 'Chömmer das churz bespräche?', de: 'Können wir das kurz besprechen?', ca: 'Ho podem comentar un moment?', tag: 'feina' },
  { id: 'p62', ch: 'Ich schicke dir s Mail.', de: 'Ich schicke dir die E-Mail.', ca: 'T’envio el correu.', tag: 'feina' },
  { id: 'p63', ch: 'Ich bi hüt im Homeoffice.', de: 'Ich bin heute im Homeoffice.', ca: 'Avui treballo des de casa.', tag: 'feina' },
  { id: 'p64', ch: 'Wänn passt es dir?', de: 'Wann passt es dir?', ca: 'Quan et va bé?', tag: 'feina' },
  { id: 'p65', ch: 'Ich mues das na aaluege.', de: 'Ich muss das noch anschauen.', ca: 'Encara ho he de mirar.', tag: 'feina' },
  { id: 'p66', ch: 'Das isch erlediget.', de: 'Das ist erledigt.', ca: 'Això ja està fet.', tag: 'feina' },
  { id: 'p67', ch: 'Ich ha na e Frag.', de: 'Ich habe noch eine Frage.', ca: 'Tinc una pregunta més.', tag: 'feina' },
  { id: 'p68', ch: 'Machsch du Znüni-Pause?', de: 'Machst du Frühstückspause?', ca: 'Fas la pausa del matí?', tag: 'feina' },
  { id: 'p69', ch: 'Schöne Feierabig!', de: 'Schönen Feierabend!', ca: 'Bona sortida! (en plegar)', tag: 'feina', note: 'Es diu cada dia en sortir de la feina. Si no ho dius, cantes.' },

  // Al carrer
  { id: 'p80', ch: 'Wo isch de Bahnhof?', de: 'Wo ist der Bahnhof?', ca: 'On és l’estació?', tag: 'fora' },
  { id: 'p81', ch: 'Wie chume-n-i is Zentrum?', de: 'Wie komme ich ins Zentrum?', ca: 'Com arribo al centre?', tag: 'fora' },
  { id: 'p82', ch: 'Fahrt das Tram zum Bahnhof?', de: 'Fährt diese Tram zum Bahnhof?', ca: 'Aquest tramvia va a l’estació?', tag: 'fora' },
  { id: 'p83', ch: 'Es Billett nach Bärn, bitte.', de: 'Eine Fahrkarte nach Bern, bitte.', ca: 'Un bitllet per Berna, si us plau.', tag: 'fora' },
  { id: 'p84', ch: 'Uf welem Perron?', de: 'Auf welchem Gleis?', ca: 'A quina andana?', tag: 'fora' },
  { id: 'p85', ch: 'Ich hätt gärn zwei Gipfeli.', de: 'Ich hätte gern zwei Croissants.', ca: 'Voldria dos croissants.', tag: 'fora' },
  { id: 'p86', ch: 'Chan ich mit Charte zale?', de: 'Kann ich mit Karte zahlen?', ca: 'Puc pagar amb targeta?', tag: 'fora' },
  { id: 'p87', ch: 'Isch das no frei?', de: 'Ist der Platz noch frei?', ca: 'Aquest lloc és lliure?', tag: 'fora' },
  { id: 'p88', ch: 'D Rächnig, bitte.', de: 'Die Rechnung, bitte.', ca: 'El compte, si us plau.', tag: 'fora' },
  { id: 'p89', ch: 'Stimmt so.', de: 'Stimmt so.', ca: 'Quedi’s el canvi.', tag: 'fora' },

  // ---- Salutacions (Holle · cap. 29 Begrüssungen) ----
  { id: 'p100', ch: 'Grüezi mitenand!', de: 'Guten Tag zusammen!', ca: 'Bon dia a tots! (formal, a un grup)', tag: 'salutacions' },
  { id: 'p101', ch: 'Guete Morge!', de: 'Guten Morgen!', ca: 'Bon dia! (al matí)', tag: 'salutacions' },
  { id: 'p102', ch: 'Guete Aabig!', de: 'Guten Abend!', ca: 'Bon vespre!', tag: 'salutacions' },
  { id: 'p103', ch: 'Grüess di!', de: 'Grüss dich!', ca: 'Hola! (informal, a una persona)', tag: 'salutacions' },
  { id: 'p104', ch: 'Lang nöd gseh!', de: 'Lange nicht gesehen!', ca: 'Fa temps que no ens vèiem!', tag: 'salutacions' },
  { id: 'p105', ch: 'Und selber?', de: 'Und selbst?', ca: 'I tu què? (tornant la pregunta)', tag: 'salutacions' },
  { id: 'p106', ch: 'Machs guet!', de: 'Mach’s gut!', ca: 'Que vagi bé! (comiat informal)', tag: 'salutacions' },
  { id: 'p107', ch: 'Bis bald!', de: 'Bis bald!', ca: 'Fins aviat!', tag: 'salutacions' },

  // ---- Smalltalk (Holle · cap. 30) ----
  { id: 'p120', ch: 'Schöns Wätter hüt, gäll?', de: 'Schönes Wetter heute, oder?', ca: 'Quin bon dia fa avui, oi?', tag: 'smalltalk', note: 'El "gäll?" final és puríssim suís: busca que l’altre t’ho confirmi.' },
  { id: 'p121', ch: 'Wohnsch du scho lang da?', de: 'Wohnst du schon lange hier?', ca: 'Fa molt que vius aquí?', tag: 'smalltalk' },
  { id: 'p122', ch: 'Gfallt’s dir z Züri?', de: 'Gefällt es dir in Zürich?', ca: 'T’agrada Zuric?', tag: 'smalltalk' },
  { id: 'p123', ch: 'Was machsch i de Freiziit?', de: 'Was machst du in der Freizeit?', ca: 'Què fas al temps lliure?', tag: 'smalltalk' },
  { id: 'p124', ch: 'Häsch es schöns Wuchenänd gha?', de: 'Hattest du ein schönes Wochenende?', ca: 'Has fet bon cap de setmana?', tag: 'smalltalk' },
  { id: 'p125', ch: 'Ich mues jetzt leider goh.', de: 'Ich muss jetzt leider gehen.', ca: 'Ara me n’he d’anar, em sap greu.', tag: 'smalltalk' },
  { id: 'p126', ch: 'Mir sind üs scho mal begägnet, oder?', de: 'Wir sind uns schon mal begegnet, oder?', ca: 'Ja ens hem vist abans, oi?', tag: 'smalltalk' },

  // ---- Al metge (Holle · cap. 31 Arzttermin) ----
  { id: 'p140', ch: 'Ich hätt gärn en Termin.', de: 'Ich hätte gern einen Termin.', ca: 'Voldria hora.', tag: 'metge' },
  { id: 'p141', ch: 'Ich fühl mi nöd guet.', de: 'Ich fühle mich nicht gut.', ca: 'No em trobo bé.', tag: 'metge' },
  { id: 'p142', ch: 'Ich ha Chopfweh.', de: 'Ich habe Kopfschmerzen.', ca: 'Em fa mal el cap.', tag: 'metge', note: 'El patró és -weh: Buuchweh, Halsweh, Zahnweh.' },
  { id: 'p143', ch: 'Ich ha Buuchweh.', de: 'Ich habe Bauchschmerzen.', ca: 'Em fa mal la panxa.', tag: 'metge' },
  { id: 'p144', ch: 'Wo tuet’s weh?', de: 'Wo tut es weh?', ca: 'On et fa mal?', tag: 'metge' },
  { id: 'p145', ch: 'Sit wenn händ Sie das?', de: 'Seit wann haben Sie das?', ca: 'Des de quan ho té?', tag: 'metge' },
  { id: 'p146', ch: 'Sit drü Täg.', de: 'Seit drei Tagen.', ca: 'Des de fa tres dies.', tag: 'metge' },
  { id: 'p147', ch: 'Ich bi allergisch uf Penicillin.', de: 'Ich bin allergisch gegen Penizillin.', ca: 'Sóc al·lèrgica a la penicil·lina.', tag: 'metge' },
  { id: 'p148', ch: 'Nämed Sie Medikamänt?', de: 'Nehmen Sie Medikamente?', ca: 'Pren alguna medicació?', tag: 'metge' },
  { id: 'p149', ch: 'Ich schriibe Sie chrank.', de: 'Ich schreibe Sie krank.', ca: 'Li faré la baixa.', tag: 'metge' },

  // ---- Entrevista de feina (Holle · cap. 32 Bewerbungsgespräch) ----
  { id: 'p160', ch: 'Ich han mi uf d Stell beworbe.', de: 'Ich habe mich auf die Stelle beworben.', ca: 'M’he presentat a la plaça.', tag: 'feina' },
  { id: 'p161', ch: 'Verzelled Sie öppis über sich.', de: 'Erzählen Sie etwas über sich.', ca: 'Expliqui’m alguna cosa de vostè.', tag: 'feina' },
  { id: 'p162', ch: 'Ich han füf Johr Erfahrig i dem Bereich.', de: 'Ich habe fünf Jahre Erfahrung in diesem Bereich.', ca: 'Tinc cinc anys d’experiència en aquest camp.', tag: 'feina' },
  { id: 'p163', ch: 'Wieso wänd Sie bi üs schaffe?', de: 'Warum wollen Sie bei uns arbeiten?', ca: 'Per què vol treballar amb nosaltres?', tag: 'feina' },
  { id: 'p164', ch: 'Was sind Ihri Stärchi?', de: 'Was sind Ihre Stärken?', ca: 'Quins són els seus punts forts?', tag: 'feina' },
  { id: 'p165', ch: 'Wänn chönted Sie aafange?', de: 'Wann könnten Sie anfangen?', ca: 'Quan podria començar?', tag: 'feina' },
  { id: 'p166', ch: 'Wie gross isch s Pensum?', de: 'Wie hoch ist das Pensum?', ca: 'Quin percentatge de jornada és?', tag: 'feina', note: 'El "Pensum" (60%, 80%, 100%) és central a Suïssa. Es pregunta sempre.' },
  { id: 'p167', ch: 'Mir mälded üs bi Ihne.', de: 'Wir melden uns bei Ihnen.', ca: 'Ja li direm alguna cosa.', tag: 'feina' },

  // ---- A l’hotel (Holle · cap. 33 Im Hotel) ----
  { id: 'p180', ch: 'Händ Sie na es Zimmer frei?', de: 'Haben Sie noch ein Zimmer frei?', ca: 'Els queda alguna habitació?', tag: 'hotel' },
  { id: 'p181', ch: 'Ich hätt gärn es Zimmer für zwei Nächt.', de: 'Ich hätte gern ein Zimmer für zwei Nächte.', ca: 'Voldria una habitació per dues nits.', tag: 'hotel' },
  { id: 'p182', ch: 'Für ei Person oder für zwei?', de: 'Für eine Person oder für zwei?', ca: 'Per a una persona o per a dues?', tag: 'hotel' },
  { id: 'p183', ch: 'Isch s Zmorge inbegriffe?', de: 'Ist das Frühstück inbegriffen?', ca: 'L’esmorzar hi va inclòs?', tag: 'hotel' },
  { id: 'p184', ch: 'Uf welche Name?', de: 'Auf welchen Namen?', ca: 'A quin nom?', tag: 'hotel' },
  { id: 'p185', ch: 'Ich möcht iichecke.', de: 'Ich möchte einchecken.', ca: 'Voldria fer el check-in.', tag: 'hotel' },
  { id: 'p186', ch: 'Wänn gits Zmorge?', de: 'Wann gibt es Frühstück?', ca: 'A quina hora és l’esmorzar?', tag: 'hotel' },
  { id: 'p187', ch: 'Bis wänn mues ich uschecke?', de: 'Bis wann muss ich auschecken?', ca: 'Fins a quina hora puc fer el check-out?', tag: 'hotel' },
  { id: 'p188', ch: 'Wie isch s WLAN-Passwort?', de: 'Wie ist das WLAN-Passwort?', ca: 'Quina és la contrasenya del wifi?', tag: 'hotel' },
  { id: 'p189', ch: 'De Schlüssel, bitte.', de: 'Den Schlüssel, bitte.', ca: 'La clau, si us plau.', tag: 'hotel' }
]

export const DIALOGS = [
  {
    id: 'd01',
    title: 'Al forn',
    emoji: '🥖',
    lesson: 'base',
    setting: 'Entres a una Bäckerei a Zuric al matí.',
    lines: [
      { who: 'them', ch: 'Grüezi! Was darfs sii?', de: 'Guten Tag! Was darf es sein?', ca: 'Bon dia! Què li poso?' },
      { who: 'you', ch: 'Grüezi. Ich hätt gärn zwei Gipfeli und es Brot.', de: 'Guten Tag. Ich hätte gern zwei Croissants und ein Brot.', ca: 'Bon dia. Voldria dos croissants i un pa.' },
      { who: 'them', ch: 'Gärn. Sunscht na öppis?', de: 'Gerne. Sonst noch etwas?', ca: 'És clar. Alguna cosa més?' },
      { who: 'you', ch: 'Nei danke, das isch alles.', de: 'Nein danke, das ist alles.', ca: 'No gràcies, això és tot.' },
      { who: 'them', ch: 'Das macht achte foifzg.', de: 'Das macht acht fünfzig.', ca: 'Són vuit amb cinquanta.' },
      { who: 'you', ch: 'Chan ich mit Charte zale?', de: 'Kann ich mit Karte zahlen?', ca: 'Puc pagar amb targeta?' },
      { who: 'them', ch: 'Klar. Merci vilmal, schöne Tag!', de: 'Klar. Vielen Dank, schönen Tag!', ca: 'És clar. Moltes gràcies, bon dia!' }
    ]
  },
  {
    id: 'd02',
    title: 'Presentar-se a la feina',
    emoji: '💼',
    lesson: 'base',
    setting: 'Primer dia, un company se t’acosta.',
    lines: [
      { who: 'them', ch: 'Hoi, ich bi de Marco. Bisch du nöi da?', de: 'Hallo, ich bin Marco. Bist du neu hier?', ca: 'Hola, sóc el Marco. Ets nova aquí?' },
      { who: 'you', ch: 'Hoi Marco, ich bi d Gemma. Ja, sit letschte Wuche.', de: 'Hallo Marco, ich bin Gemma. Ja, seit letzter Woche.', ca: 'Hola Marco, sóc la Gemma. Sí, des de la setmana passada.' },
      { who: 'them', ch: 'Cool. Und wo chunsch her?', de: 'Cool. Und wo kommst du her?', ca: 'Genial. I d’on véns?' },
      { who: 'you', ch: 'Us Barcelona. Ich lehre grad Schwiizerdütsch — red bitte langsam!', de: 'Aus Barcelona. Ich lerne gerade Schweizerdeutsch — sprich bitte langsam!', ca: 'De Barcelona. Estic aprenent suís-alemany — parla a poc a poc, si us plau!' },
      { who: 'them', ch: 'Haha, kei Problem. Machsch mit go Znüni?', de: 'Haha, kein Problem. Kommst du mit zum Znüni?', ca: 'Ha ha, cap problema. Véns a fer el mos de mig matí?' },
      { who: 'you', ch: 'Sehr gärn, danke!', de: 'Sehr gern, danke!', ca: 'Molt bé, gràcies!' }
    ]
  },
  {
    id: 'd03',
    title: 'Al tren',
    emoji: '🚆',
    lesson: 'base',
    setting: 'Al taulell de l’estació.',
    lines: [
      { who: 'you', ch: 'Grüezi. Es Billett nach Luzärn, bitte.', de: 'Guten Tag. Eine Fahrkarte nach Luzern, bitte.', ca: 'Bon dia. Un bitllet per Lucerna, si us plau.' },
      { who: 'them', ch: 'Eifach oder retour?', de: 'Einfach oder retour?', ca: 'Anada o anada i tornada?' },
      { who: 'you', ch: 'Retour, bitte. Wänn gaht de nächscht Zug?', de: 'Retour, bitte. Wann fährt der nächste Zug?', ca: 'Anada i tornada. Quan surt el pròxim tren?' },
      { who: 'them', ch: 'Am halbi zwei, uf Perron sibe.', de: 'Um halb zwei, auf Gleis sieben.', ca: 'A la una i mitja, a l’andana set.' },
      { who: 'you', ch: 'Perfekt, merci vilmal!', de: 'Perfekt, vielen Dank!', ca: 'Perfecte, moltes gràcies!' }
    ]
  },
  {
    id: 'd04',
    title: 'No entenc res',
    emoji: '🆘',
    lesson: 'base',
    setting: 'Quan algú et parla massa ràpid. Memoritza aquest diàleg sencer.',
    lines: [
      { who: 'them', ch: '(parla molt ràpid)', de: '(spricht sehr schnell)', ca: '(parla molt ràpid)' },
      { who: 'you', ch: 'Excusi, ich ha das nöd verstande.', de: 'Entschuldigung, das habe ich nicht verstanden.', ca: 'Perdoni, això no ho he entès.' },
      { who: 'you', ch: 'Chönd Sie das bitte wiederhole, chli langsamer?', de: 'Können Sie das bitte wiederholen, etwas langsamer?', ca: 'Ho pot repetir més a poc a poc, si us plau?' },
      { who: 'them', ch: 'Sicher. Ich ha gfrogt, öb Sie es Kundechärtli händ.', de: 'Sicher. Ich habe gefragt, ob Sie eine Kundenkarte haben.', ca: 'És clar. Li he preguntat si té targeta de client.' },
      { who: 'you', ch: 'Ah, nei, ha ich nöd. Danke fürs Wiederhole!', de: 'Ah, nein, habe ich nicht. Danke fürs Wiederholen!', ca: 'Ah, no, no en tinc. Gràcies per repetir-ho!' }
    ]
  },
  {
    id: 'd05',
    title: 'Quedar amb algú',
    emoji: '📅',
    lesson: 'base',
    setting: 'Per WhatsApp amb una amiga.',
    lines: [
      { who: 'them', ch: 'Hoi! Häsch am Friitig Ziit?', de: 'Hallo! Hast du am Freitag Zeit?', ca: 'Hola! Tens temps divendres?' },
      { who: 'you', ch: 'Hoi! Ja, am Aabig scho. Was wottsch mache?', de: 'Hallo! Ja, am Abend schon. Was willst du machen?', ca: 'Hola! Sí, al vespre sí. Què vols fer?' },
      { who: 'them', ch: 'Öppis go trinke am See?', de: 'Etwas trinken gehen am See?', ca: 'Anem a fer un beure al llac?' },
      { who: 'you', ch: 'Super Idee. Am sibni?', de: 'Super Idee. Um sieben?', ca: 'Molt bona idea. A les set?' },
      { who: 'them', ch: 'Passt. Bis dänn!', de: 'Passt. Bis dann!', ca: 'Perfecte. Fins llavors!' }
    ]
  },
  {
    id: 'd06',
    title: 'Al metge',
    emoji: '🩺',
    lesson: 'base',
    setting: 'A la consulta.',
    lines: [
      { who: 'them', ch: 'Grüezi. Was fehlt Ihne?', de: 'Guten Tag. Was fehlt Ihnen?', ca: 'Bon dia. Què li passa?' },
      { who: 'you', ch: 'Ich ha sit drü Täg Chopfweh und bi sehr müed.', de: 'Ich habe seit drei Tagen Kopfschmerzen und bin sehr müde.', ca: 'Fa tres dies que tinc mal de cap i estic molt cansada.' },
      { who: 'them', ch: 'Händ Sie au Fieber gha?', de: 'Hatten Sie auch Fieber?', ca: 'També ha tingut febre?' },
      { who: 'you', ch: 'Geschter scho, hüt nöd meh.', de: 'Gestern schon, heute nicht mehr.', ca: 'Ahir sí, avui ja no.' },
      { who: 'them', ch: 'Guet. Ich gib Ihne öppis us de Apothek.', de: 'Gut. Ich gebe Ihnen etwas aus der Apotheke.', ca: 'Bé. Li donaré alguna cosa de la farmàcia.' }
    ]
  }
]
