# 🇨🇭 Schwiiz

**▶ https://gemmagf.github.io/schwiiz/**

PWA per estudiar **suís-alemany (Züridütsch)**.
Offline-first · el progrés se sincronitza a aquest mateix repo.
Offline-first · s'actualitza per git · flashcards amb repàs espaiat, gramàtica i frases.

## Què fa

- **Tauler**: quantes paraules tens assentades, què toca repassar avui, ratxa de dies.
- **Repàs**: flashcards amb SRS (tipus Anki), sempre barrejades. Tandes de 200 targetes
  (configurable); quan n'acabes una en pots fer una altra i el compte del dia va sumant.
  Cada tanda prioritza les que et costen més — les que has fallat més vegades i les que
  tens menys assentades — i s'omple amb targetes noves. Les que marques «Un altre cop»
  tornen dins de la mateixa tanda, i les de «Costa» hi tornen un cop. La direcció i els
  filtres per tema o classe són opcionals i van plegats.
- **Gramàtica**: dos modes — *Per temes* (40 temes en l'ordre dels llibres) i *Practicar*
  (tanda de 10/20/30/50 exercicis barrejats, prioritzant els fallats i els no fets).
  En total, 233 exercicis que es
  corregeixen sols.
- **Llegir**: tres coses en una.
  - *Textos*: lector on toques qualsevol paraula i en surt la traducció (resolent formes
    conjugades: `gfahre` → `fahre`, `Hüüsli` → `Huus`). D'un toc més, la paraula es
    converteix en flashcard i entra al repàs espaiat. Les paraules que ja tens surten
    subratllades dins del text. Pots afegir-hi els teus propis capítols.
  - *Diàlegs*: 6 converses per situació.
  - *Frases*: 94 frases per situació, amb opció de tapar la traducció.
- **Ajustos**: veu, sincronització del progrés amb git, exportar dades.

## Els llibres de classe

L'app està pensada per acompanyar tres llibres:

| Llibre | Autor | Què n'aporta |
|---|---|---|
| *Schweizerdeutsch verstehen* | Andrea Holle | **ordre dels temes de gramàtica, situacions i vocabulari** |
| *Schwiizerdütsch leicht gemacht — S Schwiizerdüütsch vo Züri* | Verena Schorn | material de classe setmana a setmana |
| *Hansdampf — Gschichte us em Züri Oberland, Band 2* | Johann Widmer | lectura |

Els 31 temes de gramàtica segueixen l'ordre dels capítols 1–27 del Holle i cada tema
en porta el número a la vista. Les etiquetes de Frases segueixen els capítols 28–34,
i els temes de vocabulari, les seves llistes de Vokabeln. La correspondència completa
és a [`content/mapa-holle.md`](content/mapa-holle.md).

> El text dels llibres **no** ve amb l'app i no s'hi ha de copiar: són obres amb drets
> d'autor. Els capítols que vulguis treballar els afegeixes tu des de *Llegir → Afegir un
> text*, i es queden al teu dispositiu. Els textos d'exemple que porta l'app estan escrits
> expressament per a ella.

## El cicle setmanal

1. Fas classe.
2. Enganxes el material a `content/` (tens `content/PLANTILLA.md`) o me'l passes directament.
3. Es converteix en targetes, exercicis i frases dins de `src/data/`, amb un identificador
   de lliçó (`c01`, `c02`...) perquè puguis repassar només allò.
4. `git push` → GitHub Actions compila i publica → el mòbil agafa la versió nova en obrir-la
   amb connexió.

## Instal·lar-la al mòbil

Obre la URL de GitHub Pages i:
- **iPhone (Safari)**: Compartir → *Afegir a la pantalla d'inici*.
- **Android (Chrome)**: menú ⋮ → *Instal·lar aplicació*.

A partir d'aquí funciona sense connexió: el service worker precarrega tota l'app i el
progrés es guarda a IndexedDB del mòbil.

## Posada en marxa

```bash
npm install
npm run dev        # desenvolupament a http://localhost:5173
npm run build      # build de producció a dist/
npm run preview    # servir el build
```

## Desplegament

A **GitHub Pages**, a https://gemmagf.github.io/schwiiz/. Cada push a `main` dispara
`.github/workflows/deploy.yml`, que compila i publica.

`paths-ignore` deixa fora `data/`, `content/` i el README: sincronitzar el progrés des del
mòbil no engega desplegaments inútils.

L'app penja de la subcarpeta `/schwiiz/`, i per això `vite.config.js` hi posa
`base: '/schwiiz/'` en compilar.

## Sincronitzar el progrés entre dispositius (opcional)

L'app funciona perfectament sense això: el progrés viu al mòbil. Si el vols compartir
entre dispositius:

1. Crea un **Personal Access Token fine-grained** limitat NOMÉS a aquest repo, amb
   **Contents: Read and write**.
2. A l'app → **Ajustos**, omple usuari, repo (`schwiiz`), branca i token, i prem **Desar config**.
3. **⬆ Pujar progrés** fa un commit a `data/state.json` d'aquest mateix repo.

Se sincronitzen el repàs espaiat, els exercicis, la ratxa i les paraules que has afegit
llegint. Els **capítols de lectura no**: com que aquest repo és públic i hi pot haver text
de llibres amb drets d'autor, es queden al dispositiu (igual que el `caleta-tracker` fa
amb les fotos). Per moure'ls, hi ha «Exportar JSON».

> ⚠️ El token es guarda sense xifrar a IndexedDB del dispositiu. És acceptable per a ús
> personal amb un token fine-grained limitat a aquest repo. Si perds el mòbil, revoca'l.

## Estructura

```
content/          material de classe en brut (font, no el llegeix l'app)
data/state.json   progrés sincronitzat des del mòbil
src/
  data/vocab.js     450 paraules: dialecte · Hochdeutsch · català
  data/grammar.js   40 temes + 233 exercicis
  data/phrases.js   94 frases + 6 diàlegs
  data/readings.js  llibres de referència + textos d'exemple propis
  data/glossary.js  189 paraules de suport + 73 formes conjugades, per al lector
  data/lessons.js   índex de classes
  lib/srs.js        repàs espaiat (SM-2 simplificat)
  lib/lookup.js     cerca d'una paraula tocada dins d'un text
  lib/db.js         IndexedDB (offline)
  lib/sync.js       sincronització GitHub
  lib/tts.js        pronunciació
  components/       UI
```

## Dues coses que has de saber

**L'ortografia del suís-alemany no existeix oficialment.** Aquí es fa servir l'escriptura
Dieth, la més estesa a Zuric. Si a classe ho escriuen diferent, mana la classe: canvia el
camp `ch` de l'entrada i ja està.

**No hi ha veus de suís-alemany als mòbils.** El botó 🔊 fa servir una veu alemanya
(de-CH si el dispositiu en té, si no de-DE) llegint text dialectal. Serveix per fixar
paraules; la pronúncia bona te la dona la classe, no l'app.
