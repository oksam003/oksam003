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

## Fixes applied across review rounds

- Switched to an actively maintained, permissive, 500+ star repo (was the stale
  `expr-eval`).
- `test.sh` lives inside the test patch at the repo root, mode `100755`,
  supports `base` and `new` modes, and now propagates mocha's exit code
  (non-zero on failure) instead of always exiting 0. It installs nothing.
- Test file renamed to `tests/approximate_5545d6.test.js` (random hash) so it
  cannot collide with an implementer's predictable filename.
- Added an explicit equal-distance tie-break test and tests asserting the two
  new methods appear in the TypeScript definitions.
- Dockerfile runs only `npm install`, not the build: `crude-build` rewrites
  `src/fraction.js`, which would otherwise dirty the tree and break the
  solution patch. `test.sh` builds after patches are applied.
- Category is `feature_request`; description is plain ASCII, no em-dashes, no
  manual mid-sentence line wrapping.
- Tests read the denominator through the public `toFraction()` output instead
  of the raw `.d` field, keeping assertions behavior-focused.
- Description trimmed to essentials (dropped obvious-default bullets, the pi
  example block, and the redundant Category section).
- Dockerfile pins exact dependency versions (`crude-build@0.1.3`,
  `mocha@11.7.6`) since the repo ships no lockfile, and ends with
  `CMD ["/bin/bash"]` for an interactive dev shell.

## Verified

Fresh clone at commit `9aa0f35`, LF working tree, patches applied before build:

- test.patch only: base tests 314 passing, new tests 16 failing.
- test.patch + solution.patch: new tests 17 passing, full suite 331 passing.

Round-4: added an exactness test that builds a value from a continued fraction
with a huge partial quotient (coprime denominators beyond 2^53) and asserts
`approximate` reproduces those convergents digit-for-digit, so a float-based
implementation cannot pass. Description trimmed further (dropped the motivation
paragraph and other redundant lines) while keeping the tie-break rule, the
exactness constraint, and the TypeScript requirement.

See `meta.md` for exact commands, the build-order note, and the rollout gates.
