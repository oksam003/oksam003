# Olympus · expr-eval symbolic differentiation

A ready-to-submit Shipd **Olympus** challenge: add a symbolic
`differentiate()` method to [`silentmatt/expr-eval`](https://github.com/silentmatt/expr-eval),
a ~1.5k★ pure-JS math expression parser. The feature is genuinely missing, is
hard (RPN token manipulation + a full calculus rule set), and is verified
end-to-end.

## Files

| File | Purpose |
|------|---------|
| `description.md` | Problem statement (paste into the Shipd description box) |
| `Dockerfile` | Build env — starts from the Olympus base image, `WORKDIR /app` |
| `test.sh` | JUnit runner — accepts `--output_path`, emits JUnit XML via mocha's `xunit` reporter |
| `test.patch` | Hidden tests (`test/differentiate.js`, 20 cases) as a unified diff |
| `solution.patch` | Reference solution (`src/differentiate.js` + `src/expression.js`) as a unified diff |
| `approach.md` | Reference-solution explanation (paste into the Shipd approach box) |
| `meta.md` | Repo, pinned commit, language/category, and the form field mapping |

## Verified status

Run on a fresh clone at commit `6e889e0`:

- `test.patch` only → **20 tests fail** (feature absent) — matches Shipd's *Verify Tests*.
- `test.patch` + `solution.patch` → **499 passing** (479 existing + 20 new) — matches *Verify Solution*.
- Both patches apply cleanly; `test.sh` writes valid JUnit XML.

## Notes for submission

- **Language:** JavaScript · **Category:** Feature / Algorithms.
- The Dockerfile installs with `--legacy-peer-deps` (the repo pins an old
  eslint peer range) and runs the rollup build the tests import from.
- If the Olympus base image doesn't include Node.js, add a Node install step to
  the Dockerfile before `npm install`.
- See `meta.md` for the exact repo URL, 40-char commit SHA, and reproduction steps.
