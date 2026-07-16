# Submission metadata (paste into the Shipd Olympus form)

| Field | Value |
|-------|-------|
| Track | Olympus |
| Repository | `https://github.com/markdown-it/markdown-it` |
| Pinned commit | `2d9bbea7df2ab1a48caecfafc39cb8599f193d3c` |
| Base branch | `master` |
| Language | JavaScript (Node.js) |
| Category | feature_request |
| Canonical issue | none (self-proposed feature) |
| Base image | `public.ecr.aws/d3j8x8q7/olympus-base:latest` |

## Repo compliance

- Stars: ~21,700 (>= 500)
- License: MIT (permissive)
- Active maintenance: last pushed 2026-07 (within the last year)

## Why this is a multi-subsystem (Olympus) task

The reference solution changes 8 files across four subsystems:

- block parser: `lib/rules_block/footnote_def.mjs` + `lib/parser_block.mjs`
- inline parser: `lib/rules_inline/footnote_ref.mjs`, `footnote_inline.mjs` + `lib/parser_inline.mjs`
- core chain: `lib/rules_core/footnote_tail.mjs` + `lib/parser_core.mjs`
- renderer: `lib/renderer.mjs`

Getting footnotes right requires coordinating token production across the block
and inline tokenizers, a core post-processing pass that rewrites the token
stream, and matching render rules - not a single local change.

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

- `test.sh` uses Node's built-in test runner and JUnit reporter, so nothing is
  installed and no network is used at test time.
- markdown-it has runtime dependencies (mdurl, entities, linkify-it, uc.micro,
  punycode.js). The Dockerfile installs them at build time and caches a copy at
  `/opt/node_modules_cache`; `test.sh` restores that copy (a plain file copy, no
  install) if the working tree's `node_modules` was reset before patches were
  applied.
- No build step is needed: the tests import the source directly.

## Verified status

Fresh clone at the pinned commit, LF working tree, dependencies installed:

- `test.patch` applies cleanly and adds `test.sh` (mode 100755) plus
  `test/markdown-it/footnote_363229.test.mjs`.
- `test.sh base` -> baseline passes. `test.sh new` before the solution -> fails
  (feature absent).
- After `solution.patch`: `test.sh new` -> 10 passing, `test.sh all` -> passing,
  and the full upstream suite (293 markdown-it + 652 CommonMark) is unaffected.

## Reproduce locally

```bash
git -c core.autocrlf=false clone https://github.com/markdown-it/markdown-it && cd markdown-it
git checkout 2d9bbea7df2ab1a48caecfafc39cb8599f193d3c
npm install
git apply /path/to/test.patch
bash ./test.sh new --output_path /tmp/new.xml   # fails: feature missing
git apply /path/to/solution.patch
bash ./test.sh all --output_path /tmp/all.xml   # passes
```

## Note on difficulty gates

The precheck-level requirements are satisfied here (active permissive repo,
minimal ASCII description, feature_request category, test.sh with base/new modes
producing JUnit XML offline, random-hashed test filename, multi-subsystem
solution). The Olympus rollout gates (pass rate <= 40%, >= 10 runs) are decided
by Shipd's own agent rollouts.
