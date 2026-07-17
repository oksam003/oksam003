# Submission metadata (paste into the Shipd Olympus form)

| Field | Value |
|-------|-------|
| Track | Olympus |
| Repository | `https://github.com/jsonata-js/jsonata` |
| Pinned commit | `fec95dec2e2bf7214668c8499cae77a3c8d0be93` (the commit BEFORE the fix) |
| Base branch | `master` |
| Language | JavaScript (Node.js) |
| Category | bug_fix |
| Canonical issue | `https://github.com/jsonata-js/jsonata/pull/814` (upstream fix) |
| Base image | `public.ecr.aws/d3j8x8q7/olympus-base:latest` |

## Repo compliance

- Stars: ~2,660 (>= 500)
- License: MIT (permissive)
- Active maintenance: last pushed 2026-07 (within the last year)

## What this challenge is

This is a real regression, fixed upstream in commit `82e1597` ("regression
looking up keys of an object", #814). The pinned commit is that fix's PARENT,
so the repo is checked out with the bug present. The solution patch is the real
upstream source fix.

## Why this differentiates (plagiarism)

Earlier "add a function/feature" challenges were flagged as structurally similar
to existing submissions. This is a `bug_fix` tied to a specific real defect and
its upstream issue, so it does not share the idea or structure of an "add X"
task.

## Why this is a multi-subsystem (Olympus) task

The fix changes four source files across the utility layer, the function
library, the evaluator, and the datetime parser:

- `src/utils.js` - adds the safe `keys` helper
- `src/functions.js` - key-iterating built-in functions
- `src/jsonata.js` - evaluator paths that enumerate object keys
- `src/datetime.js` - the `$fromMillis` word matcher

## Form field to file mapping

| Shipd field | File |
|-------------|------|
| Problem description | `description.md` |
| Category | `bug_fix` |
| Language | JavaScript |
| Dockerfile | `Dockerfile` |
| Test patch (with test.sh) | `test.patch` |
| Solution patch | `solution.patch` |
| Solution explanation | `approach.md` |

## Offline execution

- `test.sh` runs mocha with the built-in `xunit` reporter (JUnit XML), exits
  with mocha's status, and installs nothing.
- jsonata has no runtime dependencies. The Dockerfile installs only the test
  tools (mocha, chai, chai-as-promised) at exact pinned versions and caches a
  copy at `/opt/node_modules_cache`; `test.sh` restores that copy (a plain file
  copy, no install) if the working tree's `node_modules` was reset.
- `base` mode excludes `async-function.js`, whose "HTTP request" tests reach the
  network and cannot run offline.

## Verified status

Fresh checkout at the pinned (parent) commit, test tools installed:

- `test.patch` applies cleanly and adds `test.sh` (mode 100755) plus
  `test/keys_nonobject_c4e91a.js`.
- `test.sh base` -> baseline passes. `test.sh new` before the fix -> fails (the
  bug is present: `$each`/`$sift` on a non-object throw).
- After `solution.patch`: `test.sh new` -> 8 passing, `test.sh all` -> passing,
  and the full upstream suite (1799 tests) is unaffected.

## Reproduce locally

```bash
git -c core.autocrlf=false clone https://github.com/jsonata-js/jsonata && cd jsonata
git checkout fec95dec2e2bf7214668c8499cae77a3c8d0be93
npm install --no-save mocha@7.2.0 chai@4.5.0 chai-as-promised@7.1.2
git apply /path/to/test.patch
bash ./test.sh new --output_path /tmp/new.xml   # fails: bug present
git apply /path/to/solution.patch
bash ./test.sh all --output_path /tmp/all.xml   # passes
```
