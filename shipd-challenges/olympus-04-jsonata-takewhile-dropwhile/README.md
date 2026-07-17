# Olympus - jsonata $takeWhile / $dropWhile (new repo)

A ready-to-submit Shipd Olympus challenge on a fresh repo:
[`jsonata-js/jsonata`](https://github.com/jsonata-js/jsonata) (2.6k stars, MIT,
active). Adds two higher-order array functions - `$takeWhile` and `$dropWhile` -
to the JSONata expression language. Built after markdown-it was found to have
prior submissions.

## Files

| File | Purpose |
|------|---------|
| `description.md` | Problem statement (paste into the description box) |
| `Dockerfile` | Olympus base image, `WORKDIR /app`, pinned test tools + deps cache |
| `test.patch` | Adds `test.sh` (mode 100755, base/new modes, JUnit via mocha xunit) and `test/hof_runs_7b3f21.js` |
| `solution.patch` | Reference solution: `src/functions.js` + `src/jsonata.js` |
| `approach.md` | Reference-solution explanation |
| `meta.md` | Repo, pinned commit, category, offline notes, verified status |

## Why this repo/feature

- Fresh repo: avoids the prior-submission collisions that flagged the markdown-it
  challenges.
- Multi-subsystem: the solution spans the function library (`functions.js`) and
  the evaluator's signature-checked runtime binding (`jsonata.js`); the functions
  call back into the evaluator to run the predicate.
- Offline + verifiable: jsonata has no runtime deps; tests run with mocha and
  produce JUnit XML with no network.

## Verified

Fresh clone at `6c7e95f`, test tools installed:

- test.patch only: base passes (1782), new fails (10, feature absent).
- test.patch + solution.patch: new 10 pass, all pass; upstream 1799 tests
  unaffected.

See `meta.md` for exact commands and the note on the rollout difficulty gates.
