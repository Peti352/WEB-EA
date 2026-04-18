# PRD — Web-programozás 1 Előadás Beadandó

> **Státusz:** Tervezés
> **Tárgy:** Webprogramozás 1 (GAMF, Neumann János Egyetem)
> **Oktató:** Dr. Subecz Zoltán
> **Összes pont:** 30
> **Verziókövetés:** GitHub (repo: `WEB-EA`, user: `Peti352`  (valodi nevek: Peti + Gabor))
> **Tárhely:** Nethely.hu (ingyenes, 256 MB, PHP 8, MySQL)

---

## 1. Cél és scope

Egy több menüpontos web-alkalmazás elkészítése, amely a webfejlesztés alapvető technológiáit demonstrálja (vanilla JS, React, Fetch API, Axios, OOJS, PHP + MySQL). Az alkalmazás egy választott adatbázishoz kapcsolódóan CRUD (Create, Read, Update, Delete) műveleteket valósít meg különböző technológiai stack-ekkel, külön-külön menüpontokon.

**Nem cél:** egyetlen monolit alkalmazás építése. A feladat kifejezetten 7 különálló, önállóan működő demó-oldal elkészítését kéri, közös fejléccel/lábléccel és egységes nézettel.

---

## 2. Csoportmunka

- **Kétfős csoport kötelező.** Ha nincs pár, a tanár engedélyezi az egyedüli munkát — ilyenkor **2 GitHub fiókot kell létrehozni** a projektmunka pont (3 pont) megszerzéséhez.
- A párból elég, ha **az egyik személy nevén** fut az internetes tárhely és az alkalmazás.
- A dokumentációt **mindkét félnek be kell adnia** a Teams-en.
- A GitHub-on legyen **látható ki mit csinált** (külön commit-ek saját név alatt).

**Jelenlegi státusz:** TBD — eldöntendő, hogy Peti352 egyedül dolgozik-e (2 fiókkal), vagy van-e társa.

---

## 3. Tech stack

| Réteg | Technológia | Megjegyzés |
|---|---|---|
| Front-end struktúra | HTML5, CSS3 | Egységes fejléc + lábléc minden oldalon |
| Vanilla JS | ES6+ | `javascript.html`, `oojs.html`, `fetchapi.html` |
| React | **Babel/standalone nélkül**, Vite vagy CRA helyi telepítéssel | `react.html`, `spa.html`, `axios.html` |
| HTTP client | Fetch API + Axios | `fetchapi.html`, `axios.html` |
| Back-end | **PHP 8** + PDO | Csak ahol a feladat kéri (`fetchapi`, `axios`) |
| Adatbázis | **MySQL/MariaDB** (Nethely) | phpMyAdmin-on keresztül |
| Verziókövetés | Git + GitHub (public repo) | Min. 5 commit időben elosztva |
| Deploy | Nethely.hu ingyenes tárhely | FTP (Total Commander / WinSCP) |

---

## 4. Választandó adatbázis

A tanár által megadott Google Drive mappából kell egyet választani:
https://drive.google.com/drive/folders/12lDIxariOadDkGPaEssksPnL63lzYCbg?usp=sharing

**Jelenlegi választás:** TBD — egy adatbázis a mappából. A választott fájl **egy** táblája lesz a CRUD alapja (ugyanaz a táblára építünk minden menüpontnál, hogy konzisztens legyen).

---

## 5. Funkcionális követelmények (menüpontonként)

### 5.1 `index.html` — Főoldal (2 pont)
- Látványos, bemutató jellegű weboldal.
- **H1:** „Web programozás-1 Előadás Házi feladat"
- **Lábléc:** készítők neve + Neptun kódja.
- Felső menü linkekkel a többi oldalra (`javascript.html`, `react.html`, `spa.html`, `fetchapi.html`, `axios.html`, `oojs.html`).

### 5.2 `javascript.html` — Vanilla JS CRUD (2 pont)
- CRUD alkalmazás **tiszta JavaScripttel**.
- Adatforrás: a választott adatbázis **egyik fájljának** adatai (JSON vagy array a JS fájlban).
- **Adattárolás: JS tömbben (memóriában)** — nem kell perzisztencia.
- Funkciók: új elem létrehozás, lista kiírás, elem szerkesztés, törlés.

### 5.3 `react.html` — React CRUD (2 pont)
- CRUD React-tel.
- Vite / CRA helyi fejlesztés, build után a `dist`/`build` tartalmát használjuk.
- Ugyanaz az adatforrás, mint a `javascript.html`-nél.
- Adat kliens-oldali state-ben (`useState`).

### 5.4 `spa.html` — Single Page Application (3 pont)
- **2 menüpontos SPA** React-tel.
- Minden menüpont **1-1 önálló React alkalmazás**.
- **Nehézségi fok:** órán bemutatott Calculator / Tic-Tac-Toe szint.
- **Kötelező:** komponensek + `useState` állapotváltozók mindkettőben.
- Dokumentációban meg kell adni, honnan (forrás) vettük a két mini-app-ot.
- GitHub-on: `react/` mappa, benne a **src és dist** tartalma.

### 5.5 `fetchapi.html` — Fetch API + PHP (4 pont)
- CRUD **vanilla JavaScripttel + Fetch API-val**.
- Szerver oldali rész: **PHP + MySQL** (PDO).
- Back-end végpontok: pl. `api/list.php`, `api/create.php`, `api/update.php`, `api/delete.php`.
- Kliens-oldalon `fetch()` hívások JSON-nal.

### 5.6 `axios.html` — React + Axios + PHP (4 pont)
- CRUD **React-tel + Axios-szal**.
- Szerver oldali rész: ugyanaz a PHP + MySQL stack.
- Axios `get/post/put/delete` hívások a PHP végpontokra.

### 5.7 `oojs.html` — Objektumorientált JavaScript (3 pont)
- **Szabadon választott** grafikus OOJS alkalmazás (pl. egyszerű rajzoló, mozgó alakzatok, kis játék).
- **Kötelező elemek:**
  - `class` deklaráció
  - `constructor`
  - metódusok
  - `document.body.appendChild` használat
  - `extends` (örökléssel)
  - `super`

---

## 6. Nem-funkcionális követelmények

### 6.1 Internetes deploy — Nethely.hu (3 pont, kötelező)
- FTP feltöltés a tárhely főmappájába.
- MySQL adatbázis létrehozás phpMyAdmin-nal.
- PHP fájlokban `localhost`, `dbname`, `dbuser`, `dbpass` beállítása a Nethely-ről kapott adatokkal.
- Az alkalmazás **nyilvános URL-en** elérhető kell legyen (pl. `http://<subdomain>.nhely.hu`).

### 6.2 GitHub verziókövetés (2 pont, kötelező)
- **Public repo.**
- **Min. 5 commit**, időben **arányosan elosztva** (nem lehet egyszerre feltölteni az egészet).
- Repo név: `WEB-EA` (Peti352 fiókon).

### 6.3 Projektmunka láthatóság GitHub-on (3 pont)
- A csoport tagjai külön-külön commitoljanak saját GitHub fiókjukról.
- Git `user.name` mindenkinél a saját név legyen.
- Egyedüli hallgatónál: 2 GitHub fiók, mindkettő alól commitok.

### 6.4 Dokumentáció (2 pont, kötelező)
- **PDF formátum, min. 15 oldal.**
- **Kötelezően tartalmaz:**
  - Képernyőképek minden menüponton az alkalmazás működéséről.
  - Weboldal URL-je.
  - GitHub projekt URL-je.
  - Részletes leírás, hogy az előző feladatpontokat hogy és hol valósítottuk meg.
  - **FTP és URL cím, felhasználónév, jelszó** a DB és a tárhely ellenőrzéséhez.
  - Csapattagok felosztása (ki melyik részt csinálta).
  - SPA két React alkalmazás **forrásának hivatkozása**.
- **Fájlnév:** `Név-NeptunKód.pdf` (pl. `GaalAdam-ABC123.pdf`).
- **Beadás:** Teams, mindkét csapattag külön-külön.

---

## 7. Pontozás (összesen 30)

| Tétel | Pont |
|---|---|
| `index.html` főoldal | 2 |
| `javascript.html` | 2 |
| `react.html` | 2 |
| `spa.html` | 3 |
| `fetchapi.html` | 4 |
| `axios.html` | 4 |
| `oojs.html` | 3 |
| Internetes tárhely (kötelező) | 3 |
| GitHub verziókövetés (kötelező) | 2 |
| Projektmunka GitHub-on | 3 |
| Dokumentáció (kötelező) | 2 |
| **Összesen** | **30** |

**Figyelem:** Ha **bármelyik kötelező** elem (internet deploy / GitHub / dokumentáció / bármelyik menüpont) hiányzik, a többi sem kerül értékelésre.

---

## 8. Fájl- és mappastruktúra (tervezett)

```
WEB-EA/
├── index.html
├── javascript.html
├── react.html              # a react mini-app build output beágyazva
├── spa.html                # a spa mini-app build output beágyazva
├── fetchapi.html
├── axios.html
├── oojs.html
├── css/
│   └── main.css
├── js/
│   ├── common.js           # közös menü, layout
│   ├── javascript-crud.js
│   ├── fetchapi-crud.js
│   └── oojs-app.js
├── react/                  # React mini-appok (src + dist)
│   ├── react-app/
│   │   ├── src/
│   │   └── dist/
│   ├── spa-app/
│   │   ├── src/
│   │   └── dist/
│   └── axios-app/
│       ├── src/
│       └── dist/
├── api/                    # PHP backend (Fetch + Axios)
│   ├── config.php
│   ├── list.php
│   ├── create.php
│   ├── update.php
│   └── delete.php
├── sql/
│   └── schema.sql          # DB séma + seed adatok
├── docs/
│   └── dokumentacio.md     # dokumentáció forrása → PDF export
├── README.md
└── .gitignore
```

---

## 9. Mérföldkövek (min. 5 commit időben elosztva)

1. **M1 — Projekt váz + főoldal:** mappastruktúra, `index.html`, CSS, közös menü.
2. **M2 — Vanilla JS + OOJS:** `javascript.html` CRUD, `oojs.html` grafikus app.
3. **M3 — React részek:** `react.html`, `spa.html` (2 mini-app).
4. **M4 — Backend + integráció:** PHP API végpontok, MySQL schema, `fetchapi.html`, `axios.html`.
5. **M5 — Deploy + dokumentáció:** Nethely feltöltés, PDF dokumentáció 15+ oldal, véglegesítés.

---

## 10. Nyitott kérdések

- [ ] Egyedül csinálod, vagy van társ? (Befolyásolja a GitHub-fiók stratégiát.)
- [ ] Melyik adatbázist választjuk a Google Drive mappából?
- [ ] Melyik React scaffolding eszközt használjuk (Vite ajánlott, gyorsabb mint CRA)?
- [ ] Milyen témát adjunk a `oojs.html`-nek? (pl. rajzoló app, egyszerű játék, mozgó alakzatok)
- [ ] Neptun kódot meg kell adnod a főoldal láblécéhez és a dokumentáció fájlnevéhez.
