# Olympus - Fraction.js bounded-denominator approximation

A ready-to-submit Shipd Olympus challenge: add `approximate(limit)` and
`convergents()` to [`rawify/Fraction.js`](https://github.com/rawify/Fraction.js)
(689 stars, MIT, actively maintained). Best rational approximation with a
denominator budget is a genuinely missing feature, the semiconvergent tie-break
is easy to get wrong, and every case is verified against an exhaustive
brute-force search.

## Files

| File | Purpose |
|------|---------|
| `description.md` | Problem statement (paste into the description box) |
| `Dockerfile` | Build env: Olympus base image, `WORKDIR /app`, install + build |
| `test.patch` | Adds `test.sh` (mode 100755, base/new modes) and `tests/approximate.test.js` |
| `solution.patch` | Reference solution: `src/fraction.js` + the two TypeScript defs |
| `approach.md` | Reference-solution explanation |
| `meta.md` | Repo, pinned commit, category, field mapping, verified status |

## Fixes applied vs the earlier attempt

- Switched to an actively maintained, permissive, 500+ star repo (was the stale
  `expr-eval`).
- `test.sh` now lives inside the test patch at the repo root, mode `100755`,
  and supports `base` and `new` modes so the grader can select or deselect the
  newly added tests. It installs nothing (the Dockerfile does).
- Category is `feature_request` (two brand-new methods).
- Description is plain ASCII with no em-dashes and no manual mid-sentence line
  wrapping.

## Verified

Fresh clone at commit `9aa0f35`, LF working tree:

- test.patch only: base tests 314 passing, new tests 12 failing.
- test.patch + solution.patch: new tests 13 passing, full suite 327 passing.

See `meta.md` for exact commands and the note on the rollout difficulty gates.
