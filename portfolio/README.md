# ◧ Portfolio — Samuel Okoosi (System Blueprint)

A personal portfolio designed as a **system blueprint** — instead of hiding the engineering behind a clean marketing UI, it *uses* system architecture as the graphic design language. Rendered on graph-paper, fully monospace.

Built with **Next.js** (App Router) and plain CSS.

## 🧩 Sections

- **01 · Data Model** — the developer profile rendered as a SQL `CREATE TABLE` statement with columns, constraints, and relations
- **02 · API Routes** — projects rendered as HTTP endpoints (`GET /projects/nexa`, method badges, status codes)
- **03 · Service Architecture** — the tech stack rendered as a Docker `docker-compose` container map (images, ports, `depends_on`)
- **04 · Connect** — contact details rendered as a `.env` config block

## ✨ Details

- Graph-paper blueprint grid background, corner-tick panel frames, engineering title block
- Syntax-highlighted SQL, colored HTTP method badges, container cubes
- Scroll-reveal sections, typing caret, live status indicator
- Fully responsive; respects `prefers-reduced-motion`

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

All content lives in [`app/data.js`](app/data.js) — edit `profile`, `schema`, `endpoints`, and `containers`.

---

Built by [Samuel Okoosi](https://github.com/oksam003)
