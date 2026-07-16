# 🚀 Shipd Challenges

Solutions and work for **Shipd** coding challenges — organized by track.

## 🏛️ Olympus

| # | Challenge | Language | Status | Notes |
|---|-----------|----------|--------|-------|
| 02 | [markdown-it footnotes](olympus-02-markdown-it-footnotes/) | JavaScript | ✅ verified · multi-subsystem | Add core footnote support to markdown-it/markdown-it @ `2d9bbea` (21.7k★, MIT, active). Solution spans block/inline/core/renderer (8 files) to satisfy Olympus long-horizon; offline `node --test` JUnit; verified base pass / new fail → all pass |
| 01 | [Fraction.js rational approximation](olympus-01-fraction-js-rational-approximation/) | JavaScript | ⚠️ better for non-Olympus | Add `approximate()` + `convergents()` to rawify/Fraction.js @ `9aa0f35`. Passes prechecks but single-file, so fails Olympus long-horizon (multi-subsystem). Good for a lower track |

## 🔴 Mars

| # | Challenge | Language | Status | Notes |
|---|-----------|----------|--------|-------|
| — | _add your first challenge_ | — | ⬜ todo | |

---

## How this is organized

This folder is flat — add each challenge as a file (or a small subfolder if it
needs multiple files) and list it in the table above. Suggested naming:

```
olympus-01-<slug>.py        # or .js / .ts
mars-01-<slug>.py
```

**Status legend:** ⬜ todo · 🟨 in progress · ✅ solved · ⭐ optimized

---

_Maintained by [Samuel Okoosi](https://github.com/oksam003)_
