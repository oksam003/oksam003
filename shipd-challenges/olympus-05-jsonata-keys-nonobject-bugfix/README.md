# Olympus - jsonata key-lookup regression (bug_fix)

A ready-to-submit Shipd Olympus **bug_fix** challenge on
[`jsonata-js/jsonata`](https://github.com/jsonata-js/jsonata) (2.6k stars, MIT,
active). It reproduces a real regression (upstream #814) where functions that
iterate an object's keys throw a TypeError on a non-object argument. Built as a
bug fix to differentiate from the earlier "add a function/feature" challenges
that the similarity check kept flagging.

## Files

| File | Purpose |
|------|---------|
| `description.md` | Bug report (paste into the description box) |
| `Dockerfile` | Olympus base image, `WORKDIR /app`, pinned test tools + deps cache |
| `test.patch` | Adds `test.sh` (mode 100755, base/new modes, JUnit via mocha xunit) and `test/keys_nonobject_c4e91a.js` (regression tests) |
| `solution.patch` | The real upstream source fix across 4 files |
| `approach.md` | Reference-solution explanation |
| `meta.md` | Repo, pinned (parent) commit, canonical issue, offline notes, verified status |

## Why this repo/task

- **Differentiated**: a `bug_fix` tied to a specific real defect and its upstream
  issue - structurally unlike the flagged "add X" tasks.
- **Multi-subsystem**: the fix spans `utils.js`, `functions.js`, `jsonata.js`,
  and `datetime.js`.
- **Authentic**: the solution is the actual upstream fix (commit `82e1597`); the
  pinned commit is its parent, so the repo is checked out with the bug present.
- **Offline + verifiable**: jsonata has no runtime deps; tests run with mocha and
  produce JUnit XML with no network.

## Verified

Fresh checkout at the pinned parent commit `fec95de`, test tools installed:

- test.patch only: base passes, new fails (bug present: `$each`/`$sift` on a
  non-object throw).
- test.patch + solution.patch: new 8 pass, all pass; upstream 1799 tests
  unaffected.

See `meta.md` for exact commands and the note on the rollout difficulty gates.
