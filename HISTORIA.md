# Història del projecte

Les etapes del desenvolupament, per poder reprendre el fil sense llegir-se tota la
conversa. Els commits `Progrés Schwiiz (...)` no hi surten: són les sincronitzacions
automàtiques del mòbil, no canvis de codi.

---

## 1. L'app (20/08/2026)

| Commit | Què |
|---|---|
| `b329132` | PWA inicial: React + Vite + `vite-plugin-pwa`, IndexedDB, repàs espaiat SM-2. Mateix patró que `caleta-tracker`, no el monolit de `xina`. |
| `1f91063` | Xip «↑ sense pujar» quan queda progrés per sincronitzar. |
| `681768a` | Lector amb toc-i-tradueix: toques una paraula del text i en surt la traducció, resolent formes conjugades. D'un toc més es converteix en flashcard. |
| `3260ebe` | De 12 a 20 temes de gramàtica. |
| `c5b3e23` | **Alineació amb els llibres de classe.** Arriben les fotos dels índexs: els temes passen a seguir els capítols de *Schweizerdeutsch verstehen* (Holle). Correspondència a `content/mapa-holle.md`. |
| `13a50dc` | `base: '/schwiiz/'` per a GitHub Pages: sense això el service worker no resol bé les rutes. |

## 2. Desplegament i sincronització (26–27/08/2026)

| Commit | Què |
|---|---|
| `a09d7e9` | Prova amb un repo de dades a part. |
| `8e772fa` | Gràfic d'evolució dels últims 30 dies. **Error corregit**: la ratxa comptava un dia de menys perquè convertia la mitjanit local a UTC. |
| `b8cb8f2` | Els errors de sincronització diuen què s'ha d'arreglar en comptes del codi HTTP. |
| `b41f194` → `6774e2f` | Provat Vercel amb repo privat i descartat: el compte és GitHub Free i Pages no admet repos privats. **Es torna a Pages amb repo públic**, i a canvi els capítols de lectura queden fora del sync (drets d'autor). |
| `e331510` | Botó «↻ Forçar actualització»: a iOS una PWA es pot quedar encallada en una versió antiga. |
| `2cde461` | **Progrés restaurat de l'historial de git** després que iOS esborrés les dades locals en reinstal·lar l'app. |
| `27939a5` | Protecció: si el dispositiu té menys de la meitat de targetes que el repo, la pujada s'atura. |
| `5f0209c` | L'app comprova si hi ha versió nova cada cop que hi tornes i avisa amb una barra. |

## 3. Com s'estudia (27–29/08/2026)

| Commit | Què |
|---|---|
| `6bfac91` | **Repàs per tandes barrejades**, no per categories. Tandes de 200 configurables; cada tanda prioritza les que més costen. «Un altre cop» i «Costa» tornen dins de la mateixa tanda. |
| `49f5e26` | Icona pròpia i els PNG que iOS necessita (`apple-touch-icon`), que abans faltaven. |
| `a8c414b` | Gramàtica amb dos modes: per temes o tanda de pràctica barrejada. |
| `50fbfc9` | Els exercicis compten a l'evolució. |
| `248274f` | Bloc «Repàs abans de classe» al tauler. |

## 4. El material de classe

| Commit | Classe | Contingut |
|---|---|---|
| `42fe3b9` | 1 i 2 | Articles, adjectius, Wele/Was für, diftongs ie·ue·üe, falsos amics |
| `70a345d` | — | El material es reparteix en dues classes |
| `7a5d5c2` | 3 i 4 | Negació, demostratius, pronoms, plurals |
| `3243b64` | 5 i 6 | Conjugació, `werde`, inversió, verbs irregulars |
| `242759f` | — | Practicar la gramàtica de qualsevol classe |
| `4505362` | 7 | öpper/öppis/öppe, verbs separables |
| `a57c525` | — | Pràctica intensiva del full de verbs (38 exercicis). Deduplicades 15 paraules repetides. |

## 5. Anglès, per compartir l'app (30/09–01/10/2026)

| Commit | Què |
|---|---|
| `f6d7324` | Interfície en anglès amb selector a Ajustos. `src/i18n/ui.js`. |
| `848439a` | Vocabulari (814), frases (94) i diàlegs. `src/i18n/en.js`. |
| `b199cd9` | Primers temes de gramàtica. |

Els comptadors ja són separats sense fer res: el progrés viu al dispositiu de cadascú.

---

## Decisions que val la pena no desfer

- **El text dels llibres no es copia a l'app.** Els capítols de lectura els afegeix ella
  des de *Llegir → Afegir un text* i no surten mai del dispositiu.
- **Repo públic i Pages**, perquè el compte és GitHub Free. Si algun dia passa a Pro,
  Pages amb repo privat és possible i els capítols podrien sincronitzar-se.
- **Si falta una traducció anglesa, es mostra el català.** Mai queda res en blanc.
- **Abans de reinstal·lar l'app o canviar de mòbil: ⬆ Pujar progrés.** iOS esborra les
  dades locals en treure la icona de la pantalla d'inici.
