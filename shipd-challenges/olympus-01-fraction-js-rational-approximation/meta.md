# Submission metadata (paste into the Shipd Olympus form)

| Field | Value |
|-------|-------|
| Track | Olympus |
| Repository | `https://github.com/rawify/Fraction.js` |
| Pinned commit | `9aa0f355e5d6c25d10bce7a7ab25a3a4bd074942` |
| Base branch | `master` |
| Language | JavaScript (Node.js) |
| Category | feature_request |
| Canonical issue | none (self-proposed feature) |
| Base image | `public.ecr.aws/d3j8x8q7/olympus-base:latest` |

## Repo compliance

- Stars: 689 (>= 500)
- License: MIT (permissive)
- Active maintenance: last pushed 2025-09 (within the last year)

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

## Verified status

Reproduced on a fresh clone at the pinned commit, with an LF working tree
(as on the Linux grader):

- `test.patch` applies cleanly and adds `test.sh` (mode 100755) plus
  `tests/approximate_5545d6.test.js`.
- Base tests only: 314 passing. New tests only (before solution): 16 failing.
- After `solution.patch`: new suite 17 passing, full suite 331 passing.

`test.sh` selects tests by mode and propagates mocha's exit code:

- `test.sh base --output_path <p>` runs only the pre-existing tests.
- `test.sh new  --output_path <p>` runs only the added tests.
- `test.sh all  --output_path <p>` (default) runs everything.

It writes JUnit XML via mocha's `xunit` reporter, exits with mocha's own status
(non-zero on any failure), and never installs packages (the Dockerfile does).

## Important build-order note

`npm run build` (crude-build) rewrites `src/fraction.js` by stamping a
version/date header. The Dockerfile therefore only runs `npm install`, NOT the
build, so the repo tree stays pristine and `solution.patch` applies cleanly.
`test.sh` runs the build after the patches are applied. When reproducing, apply
the patches BEFORE building.

## Reproduce locally

```bash
git -c core.autocrlf=false clone https://github.com/rawify/Fraction.js && cd Fraction.js
git checkout 9aa0f355e5d6c25d10bce7a7ab25a3a4bd074942
npm install
git apply /path/to/test.patch                 # base passes, new fails
git apply /path/to/solution.patch              # apply BEFORE building
npm run build
npx mocha tests/*.js                           # 330 passing
```

## Note on difficulty gates

The precheck-level requirements (repo compliance, description, category,
UTF-8, and the test.sh base/new structure) are all satisfied here. The
Olympus rollout gates (pass rate <= 40%, >= 10 agent runs, long-horizon
medians) are decided by Shipd's own agent rollouts and can only be confirmed
by running them. If rollouts show it is too easy, harden by widening the
random battery, tightening tie-break cases, or adding the general
odd/even semiconvergent edge cases.
