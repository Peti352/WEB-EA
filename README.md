# WEB-EA — Webprogramozás 1 Előadás Beadandó

Készítette: **Peti352** (Neptun: `GULX05`)
Oktató: Dr. Subecz Zoltán
Intézmény: Neumann János Egyetem, GAMF Informatikai és Műszaki Kar

## Élő weboldal

`http://<subdomain>.nhely.hu` — telepítés után ide kerül

## Menüpontok (7 db, pontosan a feladat szerint)

| Fájl | Technológia | Pont |
|---|---|---|
| `index.html` | Főoldal, navigáció | 2 |
| `javascript.html` | Vanilla JS CRUD (tömb) | 2 |
| `react.html` | React CRUD (Vite build) | 2 |
| `spa.html` | SPA — Kalkulátor + Tic-Tac-Toe | 3 |
| `fetchapi.html` | Fetch API + PHP/MySQL | 4 |
| `axios.html` | React + Axios + PHP/MySQL | 4 |
| `oojs.html` | OOJS (class/extends/super) | 3 |

Plusz: internetes tárhely (3), GitHub (2), projektmunka (3), dokumentáció (2) = **30 pont**.

## Választott adatbázis

**Filmek** — egy film-adatbázis cím, rendező, év, műfaj és értékelés mezőkkel. Ugyanez az adathalmaz jelenik meg a vanilla JS és a React CRUD oldalakon kliens-oldali tömbként, a Fetch / Axios oldalakon pedig MySQL táblából szerverről.

## Tech stack

- **Front-end:** HTML5, CSS3, JavaScript (ES6+), React 18
- **Build:** Vite (Babel standalone nélkül, a feladat kiírása szerint)
- **Back-end:** PHP 8 + PDO
- **Adatbázis:** MySQL / MariaDB (utf8mb4)
- **HTTP kliens:** Fetch API, Axios
- **Deploy:** Nethely.hu ingyenes tárhely

## Mappaszerkezet

```
WEB-EA/
├── index.html, javascript.html, react.html, spa.html,
│   fetchapi.html, axios.html, oojs.html       # 7 menüpont
├── css/main.css                               # közös stílusok
├── js/
│   ├── common.js                              # aktív menü
│   ├── data.js                                # filmek seed tömb
│   ├── javascript-crud.js                     # vanilla JS CRUD
│   ├── oojs-app.js                            # OOJS alkalmazás
│   └── fetchapi-crud.js                       # Fetch API kliens
├── api/                                       # PHP backend
│   ├── config.php                             # PDO kapcsolat (CREDENTIALS!)
│   ├── list.php, create.php, update.php, delete.php
├── sql/schema.sql                             # DB séma + seed
├── react/
│   ├── react-app/  (src + dist)               # react.html tartalma
│   ├── spa-app/    (src + dist)               # spa.html tartalma
│   └── axios-app/  (src + dist)               # axios.html tartalma
├── docs/dokumentacio.md                       # dokumentáció forrás (PDF exporthoz)
└── PRD.md                                     # project requirements dokumentum
```

## React buildek újraépítése

Mindhárom React projekt független Vite app. Ha módosítod a `src/`-t:

```bash
cd react/react-app   &&  npm install  &&  npm run build
cd ../spa-app        &&  npm install  &&  npm run build
cd ../axios-app      &&  npm install  &&  npm run build
```

A build output a `dist/` mappában keletkezik, amit a host HTML-ek (`react.html`, `spa.html`, `axios.html`) `<iframe>`-ben mutatnak.

## Telepítés Nethely.hu-ra

1. **Adatbázis létrehozás** a Nethely admin felületen → phpMyAdmin → `sql/schema.sql` SQL tab-ban importálás.
2. **`api/config.php` szerkesztése:** írd bele a Nethely-től kapott DB nevet, user-t, jelszót.
3. **FTP feltöltés** — a következőket KELL feltölteni:
   - minden `*.html`
   - `css/`, `js/`, `api/`, `sql/`
   - `react/*/dist/` (mindhárom app)
   - `react/*/src/` (a feladat kifejezetten kéri)
   - **NE** töltsd fel: `node_modules/`, `.git/`, `PRD.md`, `docx_dump.txt`, `.claude/`

## Két React mini-app forrásai (SPA)

- **Kalkulátor** — klasszikus React tutorial minta alapján (React docs + tutorialspoint tutorial-ok kombinálva).
- **Tic-Tac-Toe** — a [React hivatalos Tic-Tac-Toe tutorial](https://react.dev/learn/tutorial-tic-tac-toe) alapján, egyszerűsítve és magyarosítva.

## Kiegészítő fájlok

- `PRD.md` — Product Requirements Document (részletes projekt-specifikáció)
- `.claude/` — Claude Code agent konfigurációk (nem része a beadandónak)
