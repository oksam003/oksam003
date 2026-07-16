# Olympus - markdown-it abbreviations (multi-subsystem, differentiated)

A ready-to-submit Shipd Olympus challenge: add abbreviation support to
[`markdown-it/markdown-it`](https://github.com/markdown-it/markdown-it) core.
This is the differentiated alternative to the footnotes challenge (olympus-02),
built to clear the plagiarism/similarity warning while keeping a multi-subsystem
shape.

## Files

| File | Purpose |
|------|---------|
| `description.md` | Problem statement (paste into the description box) |
| `Dockerfile` | Olympus base image, `WORKDIR /app`, `npm ci` + deps cache |
| `test.patch` | Adds `test.sh` (mode 100755, base/new modes, JUnit via `node --test`) and `test/markdown-it/abbr_e4a7c2.test.mjs` |
| `solution.patch` | Reference solution: block rule + core rule + registry wiring (4 files) |
| `approach.md` | Reference-solution explanation |
| `meta.md` | Repo, pinned commit, category, offline notes, verified status |

## Why abbreviations (vs footnotes)

- Differentiation: footnotes is the classic markdown-it example and collided
  with an existing submission. Abbreviations is a distinct idea and structure.
- Still multi-subsystem: the solution spans the block parser (`abbr_def`) and a
  core rule (`abbr_replace`) that rewrites the inline token stream - more than a
  single local change.

## Offline / reproducibility

- `test.sh` uses Node's built-in test runner + JUnit reporter (no installs, no
  network). Runtime deps are installed with `npm ci` at build time and cached at
  `/opt/node_modules_cache`; `test.sh` restores them offline if `node_modules`
  was reset.

## Verified

Fresh clone at `2d9bbea`, deps installed:

- test.patch only: base passes, new fails (feature absent).
- test.patch + solution.patch: new 9 pass, all pass; upstream 293 markdown-it
  and 652 CommonMark tests unaffected.

See `meta.md` for exact commands and the note on the rollout difficulty gates.
