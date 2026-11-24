
<div align="center">

<img src="apple-touch-icon.png" width="96" height="96" alt="Basoir">

# Basoir — савол-жавоб китоби

**Доктор Толъат Хайтамнинг «Басоир» (بصائر) китоби — атеистик қарашларга ақл ва дин нуқтаи назаридан савол-жавоб шаклида бағишланган асар**

[**📖 Ўқишни бошлаш → abuyahyo.github.io/basoir**](https://abuyahyo.github.io/basoir/)

<sub>3 катта боб · 237 савол-жавоб · қидирув · тунги/кундузги мавзу · офлайн</sub>

</div>

---

## ✨ Имкониятлар

### 📖 Мазмун
- **3 катта боб** — муаллифнинг асосий мавзулари бўйича тартибланган (масалан, «Атеистларнинг коинот ва ҳаёт ҳақидаги қарашларини рад этиш»)
- **237 та савол-жавоб** — ҳар бири алоҳида мақола кўринишда
- **Боблар (фасллар) бўйича саёҳат** — саволлар ички фаслларга гуруҳланган
- **Муқаддима, тавсия этилган китоблар ва хотима** — алоҳида саҳифалар сифатида

### 🔍 Қидирув ва навигация
- Барча саволлар матни бўйича тезкор қидирув
- Мақола ичида олдинги/кейинги саволга ўтиш имконияти

### 🎨 Дизайн
- Олтин (gold) аксентли тунги ва кундузги мавзулар
- Тўлиқ ўнгдан-чапга (RTL) арабча интерфейс
- Noto Naskh Arabic ва Noto Serif Arabic шрифтлари

### 📱 PWA
- Офлайн режим — бир марта очилгач, интернетсиз ўқийди
- «Бош экранига қўшиш» билан илова каби ўрнатилади

---

## 🚀 Ишга тушириш

Қурилиш (build) ёки боғличилиқлар (dependencies) талаб қилинмайди — соф HTML/CSS/JS.

```bash
git clone https://github.com/abuyahyo/basoir.git
cd basoir
python3 -m http.server 8765
# Браузерда: http://127.0.0.1:8765
```

> Эслатма: `data.json` `fetch()` билан юкланади, шунинг учун файлни тўғридан-тўғри (`file://`) очиш эмас, статик сервердан очиш шарт.

---

## 🗂 Лойиҳа тузилиши

| Файл | Вазифаси |
|------|----------|
| `index.html` | Бутун интерфейс — UI, барча CSS ва JS бир файлда |
| `data.json` | Китоб мазмуни (~2 MB): боблар, фасллар, 237 савол-жавоб, муқаддима ва хотима |
| `manifest.webmanifest`, `sw.js` | PWA манифест ва service worker (офлайн) |
| Иконка файллари | `apple-touch-icon`, `icon-192`, `icon-512`, `icon-512-maskable` |

### Маълумот тузилиши
```json
{
  "babs":     ["1-қисм: мавзу номи", "..."],
  "chapters": [["фасл номи", "..."], []],
  "questions": [{ "num": 1, "title": "...", "babIdx": 0, "chIdx": 0, "bodyHtml": "..." }],
  "kutubHtml": "...",
  "xotimaHtml": "..."
}
```

---

## 🛠 Техник жиҳатлар

- **Қурилмасиз** — vanilla HTML/CSS/JS, ҳеч қандай framework йўқ
- **Мавзу** — CSS ўзгарувчилари (`--gold`, `--border` ва ҳ.к.) орқали тунги/кундузги режим
- **Рақамлар** — фойдаланувчига кўринадиган рақамлар `toArabicDigits()` орқали араб рақамларида (٠١٢٣)
- HTML кўруниши ишончли манбадан (`data.json`) келади ва `innerHTML` билан қўйилади

---

## 📦 Тарқатиш (Deploy)

**GitHub Pages** орқали `main` тармоғидан автоматик тарқатилади:
👉 [abuyahyo.github.io/basoir](https://abuyahyo.github.io/basoir/)

---

## 🤝 Ҳисса қўшиш

Хатолик топсангиз ёки таклифингиз бўлса — [Issue](https://github.com/abuyahyo/basoir/issues) очинг ёки Pull Request юборинг.

---

<div align="center">
<sub>Аллоҳ бу амални қабул қилсин ва ўқувчиларга манфаат берсин. 🤲</sub>
</div>

---

## 🇬🇧 English

<div align="center">

# Basoir — Questions & Answers Reader

A single-page Arabic Islamic web app hosting **بصائر (Basoir)** by Dr. Talat Haytham — a book of 237 questions and answers organized in 3 major parts, served on GitHub Pages.

[**📖 Open the reader**](https://abuyahyo.github.io/basoir/)

</div>

### Features
- **3 parts, 237 Q&A articles** with sub-chapter grouping and full-text search
- **Supplementary pages**: introduction (مقدمة), recommended books (كتب أوصي بها), conclusion (الخاتمة)
- **RTL-first Arabic UI** with gold-accented dark/light themes (Noto Naskh / Noto Serif Arabic)
- **PWA**: installable, works offline via service worker

### Getting started
No build step, no dependencies:

```bash
git clone https://github.com/abuyahyo/basoir.git
cd basoir
python3 -m http.server 8765   # http://127.0.0.1:8765
```

> Serve over HTTP — `data.json` is fetched at runtime and will not load over `file://`.

### Structure
- `index.html` — the entire UI shell (HTML + inline CSS + JS)
- `data.json` (~2 MB) — content: `babs` (parts), `chapters`, `questions` (237 entries with HTML bodies), auxiliary pages
- `sw.js` + `manifest.webmanifest` — offline support

### Deploy
Auto-deployed from `main` via **GitHub Pages**.
