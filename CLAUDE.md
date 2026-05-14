# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page Arabic Islamic web app (**بصائر**, by د. طلعت هيثم) hosted on GitHub Pages at `https://abuyahyo.github.io/basoir/`. It is a question-and-answer reader with three main parts, a search box, a light/dark theme toggle, and supplementary pages (مقدمة، كتب أوصي بها، الخاتمة).

There is no build step, no dependencies, no test suite. The entire app is `index.html` + `data.json` + `apple-touch-icon.png`. To preview locally, serve the folder over HTTP (`python3 -m http.server`) — `fetch('data.json')` will not work over `file://`.

## Architecture

`index.html` (~35 KB) is the UI shell: HTML, inline CSS, inline JS. It declares empty data variables, then `loadData()` fetches `data.json` and calls `buildBabRow()` + `render()`. Until the fetch resolves, the user sees a gold spinner with the Arabic text **جارٍ التحميل…** (and **تعذّر تحميل البيانات** on failure).

`data.json` (~2 MB) holds the book content:

- `babs`: `string[]` — the 3 main parts. Each entry is `"<sequence label>: <topic>"`, e.g. `"الجزء الأول: تفنيد آراء الملحدين في الكون والحياة"`. The code splits on `:` to render the label as a small eyebrow and the topic as the heading.
- `chapters`: `string[][]` — per-part chapter names, parallel to `babs`. An empty inner array means that part has no chapter sub-grouping (currently الجزء الأول).
- `questions`: `{num, title, babIdx, chIdx, bodyHtml}[]` — the 237 Q&A entries. `bodyHtml` is raw HTML and is injected via `innerHTML`; it contains paragraphs, `<div class="qr">` (Quran), `<div class="cit">` (citations), and footnotes.
- `kutubHtml` / `xotimaHtml`: raw HTML strings for the two static auxiliary pages.

The UI has 4 view modes controlled by `activeBabIdx`, `activeChapterIdx`, and `searchQuery`. `render()` picks between them:

1. **Home** (`activeBabIdx===null && !searchQuery`) — header + bab-row buttons.
2. **Chapter view** (`activeBabIdx!==null` and that part has chapters) — list of chapter buttons.
3. **List view** — grid of question cards, also used for search results.
4. **Article view** (`#article.on`) — single question body, with prev/next navigation through the currently filtered list.

The three auxiliary pages (`#muqArticle`, `#kutubArticle`, `#xotimaArticle`) are separate hidden sections shown by `openMuq` / `openKutub` / `openXotima` rather than by the main render path.

## Conventions specific to this codebase

- **The page is `dir="rtl"` and Arabic-first.** Any user-visible string must be Arabic. Numbers shown to readers (counts, etc.) go through `toArabicDigits()` to render as ٠١٢٣٤٥٦٧٨٩.
- **Two fonts, used intentionally.** `Noto Naskh Arabic` for UI/body, `Noto Serif Arabic` (700/900 weight) for headings, the logo, Quran blocks, and the topic titles on part buttons.
- **Gold accent comes from CSS variables** (`--gold`, `--goldl`, `--goldd`, `--border`) which flip between dark and light themes on `body.light-theme`. Reuse them rather than hardcoding colours. The existing code does hardcode `rgba(201,168,76,…)` in a few places — that's an accepted inconsistency, not a pattern to extend.
- **Question body HTML is trusted** (it comes from `data.json`, not user input) and is set via `innerHTML`. Don't try to sanitize it. Other user-controlled values that go into HTML must be escaped — `escAttr()` exists for this.
- **GitHub Pages serves from `main`.** Feature work happens on `claude/improve-file-handling-UUfQX`, then squash-merged into `main` via PR. The live site rebuilds 1–2 minutes after merge.
- **Commit/PR messages and code comments are in English**, even though the product is Arabic.
