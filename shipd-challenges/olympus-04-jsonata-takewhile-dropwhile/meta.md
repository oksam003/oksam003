# Submission metadata (paste into the Shipd Olympus form)

| Field | Value |
|-------|-------|
| Track | Olympus |
| Repository | `https://github.com/jsonata-js/jsonata` |
| Pinned commit | `6c7e95fdbf4405a1e741852a7cd8cd985b4305bb` |
| Base branch | `master` |
| Language | JavaScript (Node.js) |
| Category | feature_request |
| Canonical issue | none (self-proposed feature) |
| Base image | `public.ecr.aws/d3j8x8q7/olympus-base:latest` |

## Repo compliance

- Stars: ~2,660 (>= 500)
- License: MIT (permissive)
- Active maintenance: last pushed 2026-07 (within the last year)
- Fresh repo for these challenges (not markdown-it, which had prior submissions)

## Why this is a multi-subsystem (Olympus) task

The reference solution changes two source files in two subsystems:

- function library: `src/functions.js` implements the two higher-order functions
- language runtime: `src/jsonata.js` binds them into the evaluator's static
  frame with a `<af>` type signature

The functions are not standalone helpers - they call back into the evaluator
(`func.apply`) to run the predicate and build jsonata sequences, so getting them
right requires coordinating the function library, the higher-order-function
calling convention, and the runtime's signature-checked binding.

## Form field to file mapping

| Shipd field | File |
|-------------|------|
| Problem description | `description.md` |
| Category | `feature_request` |
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

Fresh clone at the pinned commit, test tools installed:

- `test.patch` applies cleanly and adds `test.sh` (mode 100755) plus
  `test/hof_runs_7b3f21.js`.
- `test.sh base` -> baseline passes (1782 tests). `test.sh new` before the
  solution -> 10 failing (feature absent).
- After `solution.patch`: `test.sh new` -> 10 passing, `test.sh all` -> passing,
  and the full upstream suite (1799 tests) is unaffected.

## Reproduce locally

```bash
git -c core.autocrlf=false clone https://github.com/jsonata-js/jsonata && cd jsonata
git checkout 6c7e95fdbf4405a1e741852a7cd8cd985b4305bb
npm install --no-save mocha@7.2.0 chai@4.5.0 chai-as-promised@7.1.2
git apply /path/to/test.patch
bash ./test.sh new --output_path /tmp/new.xml   # fails: feature missing
git apply /path/to/solution.patch
bash ./test.sh all --output_path /tmp/all.xml   # passes
```
