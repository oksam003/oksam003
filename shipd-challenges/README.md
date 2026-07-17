# 🚀 Shipd Challenges

Solutions and work for **Shipd** coding challenges — organized by track.

## 🏛️ Olympus

| # | Challenge | Language | Status | Notes |
|---|-----------|----------|--------|-------|
| 05 | [jsonata key-lookup regression (bug_fix)](olympus-05-jsonata-keys-nonobject-bugfix/) | JavaScript | ✅ verified · bug_fix · **recommended** | Real regression fix in jsonata-js/jsonata (upstream #814): key-iterating functions throw on a non-object. Pinned at the fix's PARENT `fec95de`; solution is the real upstream fix across 4 files. **bug_fix category differentiates from the "add X" tasks that kept getting similarity-flagged.** Verified base pass / new fail (bug) → all pass |
| 04 | [jsonata $takeWhile / $dropWhile](olympus-04-jsonata-takewhile-dropwhile/) | JavaScript | ⚠️ similarity-flagged | Add two higher-order functions (function library + evaluator binding). Verified, but "add a function" structure was flagged as similar to an existing submission. Use olympus-05 instead |
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
