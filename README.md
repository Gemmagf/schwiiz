# 🇨🇭 Schwiiz

PWA privada per estudiar **suís-alemany (Züridütsch)**.
Offline-first · s'actualitza per git · flashcards amb repàs espaiat, gramàtica i frases.

## Què fa

- **Tauler**: quantes paraules tens assentades, què toca repassar avui, ratxa de dies.
- **Repàs**: flashcards amb SRS (tipus Anki). Tres direccions: català→dialecte,
  dialecte→català i Hochdeutsch→dialecte. Filtrable per tema.
- **Gramàtica**: 12 temes amb explicació, taules de conjugació i 70 exercicis que es
  corregeixen sols.
- **Frases**: 51 frases per situació i 6 diàlegs, amb opció de tapar la traducció per
  autoavaluar-se.
- **Ajustos**: veu, sincronització del progrés amb git, exportar dades.

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

## Publicar a GitHub Pages

1. Crea el repo a GitHub (pot ser privat; Pages requereix compte de pagament si és privat,
   si no fes-lo públic).
2. A **Settings → Pages → Source**, tria **GitHub Actions**.
3. `git push` a `main`. El workflow `.github/workflows/deploy.yml` fa la resta.

## Sincronitzar el progrés entre dispositius (opcional)

L'app funciona perfectament sense això: el progrés viu al mòbil. Si el vols compartir
entre dispositius:

1. Crea un **Personal Access Token fine-grained** limitat NOMÉS a aquest repo, amb
   **Contents: Read and write**.
2. A l'app → **Ajustos**, omple usuari, repo, branca i token, i prem **Desar config**.
3. **⬆ Pujar progrés** fa un commit a `data/state.json`.

> ⚠️ El token es guarda sense xifrar a IndexedDB del dispositiu. És acceptable per a ús
> personal amb un token fine-grained limitat a aquest repo. Si perds el mòbil, revoca'l.

## Estructura

```
content/          material de classe en brut (font, no el llegeix l'app)
data/state.json   progrés sincronitzat des del mòbil
src/
  data/vocab.js     226 paraules: dialecte · Hochdeutsch · català
  data/grammar.js   12 temes + 70 exercicis
  data/phrases.js   51 frases + 6 diàlegs
  data/lessons.js   índex de classes
  lib/srs.js        repàs espaiat (SM-2 simplificat)
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
