# Olympus - markdown-it footnotes (multi-subsystem)

A ready-to-submit Shipd Olympus challenge: add first-class footnote support to
[`markdown-it/markdown-it`](https://github.com/markdown-it/markdown-it) (~21.7k
stars, MIT, actively maintained) in the core library. This was built
specifically to satisfy the Olympus "long-horizon / multi-subsystem" criterion:
the reference solution coordinates the block parser, inline parser, core chain,
and renderer across 8 files.

## Files

| File | Purpose |
|------|---------|
| `description.md` | Problem statement (paste into the description box) |
| `Dockerfile` | Olympus base image, `WORKDIR /app`, installs + caches deps |
| `test.patch` | Adds `test.sh` (mode 100755, base/new modes, JUnit via `node --test`) and `test/markdown-it/footnote_363229.test.mjs` |
| `solution.patch` | Reference solution: 4 new rule files + block/inline/core/renderer wiring |
| `approach.md` | Reference-solution explanation |
| `meta.md` | Repo, pinned commit, category, offline notes, verified status |

## Why this passes the checks that tripped earlier challenges

- Multi-subsystem: the solution spans block/inline/core/renderer (8 files), so
  it is not "a focused local change" (the Long-Horizon failure on the Fraction.js
  attempt).
- Offline: `test.sh` uses Node's built-in test runner and JUnit reporter, so
  nothing is installed and no network is used. Runtime deps are installed at
  build time and cached at `/opt/node_modules_cache`; `test.sh` restores them
  offline if `node_modules` was reset (the 403 failure mode from before).
- test.sh lives in the test patch at repo root, mode `100755`, supports
  `base` / `new` / `all`, and propagates the runner's exit code.
- Test file uses a random-hashed name (`footnote_363229.test.mjs`).
- Description is plain ASCII, minimal, and `feature_request`.

## Verified

Fresh clone at `2d9bbea`, deps installed:

- test.patch only: base passes, new fails (feature absent).
- test.patch + solution.patch: new 10 pass, all pass; upstream 293 markdown-it
  and 652 CommonMark tests unaffected.

See `meta.md` for exact commands and the note on the rollout difficulty gates.
