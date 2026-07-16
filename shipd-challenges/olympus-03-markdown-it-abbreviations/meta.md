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

The reference solution changes 4 files across two core subsystems:

- block parser: `lib/rules_block/abbr_def.mjs` + `lib/parser_block.mjs`
- core chain: `lib/rules_core/abbr_replace.mjs` + `lib/parser_core.mjs`

The definitions are captured during block parsing, but the actual work happens
in a later core pass that rewrites the inline token stream produced by the
inline parser (splitting text tokens and splicing in `abbr_open`/`abbr_close`).
Getting it right requires coordinating the block tokenizer, the shape of the
inline token tree, and the core rule ordering - not a single local change.

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
  punycode.js). The Dockerfile installs them at build time with `npm ci` (the
  repo commits package-lock.json) and caches a copy at `/opt/node_modules_cache`;
  `test.sh` restores that copy (a plain file copy, no install) if the working
  tree's `node_modules` was reset before patches were applied.
- No build step is needed: the tests import the source directly.

## Verified status

Fresh clone at the pinned commit, dependencies installed:

- `test.patch` applies cleanly and adds `test.sh` (mode 100755) plus
  `test/markdown-it/abbr_e4a7c2.test.mjs`.
- `test.sh base` -> baseline passes. `test.sh new` before the solution -> fails
  (feature absent).
- After `solution.patch`: `test.sh new` -> 9 passing, `test.sh all` -> passing,
  and the full upstream suite (293 markdown-it + 652 CommonMark) is unaffected.

## Reproduce locally

```bash
git -c core.autocrlf=false clone https://github.com/markdown-it/markdown-it && cd markdown-it
git checkout 2d9bbea7df2ab1a48caecfafc39cb8599f193d3c
npm ci
git apply /path/to/test.patch
bash ./test.sh new --output_path /tmp/new.xml   # fails: feature missing
git apply /path/to/solution.patch
bash ./test.sh all --output_path /tmp/all.xml   # passes
```

## Differentiation

This challenge deliberately targets abbreviations rather than footnotes so it
does not share the idea or structure of an existing footnote submission, while
keeping a multi-subsystem (block parser + core token rewrite) shape.
