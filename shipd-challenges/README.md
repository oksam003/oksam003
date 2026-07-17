# 🚀 Shipd Challenges

Solutions and work for **Shipd** coding challenges — organized by track.

## 🏛️ Olympus

| # | Challenge | Language | Status | Notes |
|---|-----------|----------|--------|-------|
| 04 | [jsonata $takeWhile / $dropWhile](olympus-04-jsonata-takewhile-dropwhile/) | JavaScript | ✅ verified · multi-subsystem · **recommended** | Add two higher-order functions to jsonata-js/jsonata @ `6c7e95f` (2.6k★, MIT, active). Solution spans function library + evaluator runtime binding. **New repo** (markdown-it had prior submissions); offline mocha JUnit; verified base pass / new fail → all pass |
| 03 | [markdown-it abbreviations](olympus-03-markdown-it-abbreviations/) | JavaScript | ⚠️ repo has prior submissions | Core `<abbr>` support (block + core, 4 files). Verified, but markdown-it tasks were flagged as previously submitted. Use olympus-04 instead |
| 02 | [markdown-it footnotes](olympus-02-markdown-it-footnotes/) | JavaScript | ⚠️ prior submission (footnotes) | Core footnote support (8 files). Superseded by olympus-04 |
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
