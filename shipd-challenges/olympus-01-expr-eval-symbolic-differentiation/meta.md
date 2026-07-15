# Submission metadata (paste into the Shipd Olympus form)

| Field | Value |
|-------|-------|
| **Track** | Olympus |
| **Repository** | `https://github.com/silentmatt/expr-eval` |
| **Pinned commit** | `6e889e0e75c50ac37d70c35388602025650e0c50` |
| **Base branch** | `master` |
| **Language** | JavaScript (Node.js) |
| **Category** | Feature / Algorithms |
| **Canonical issue** | none (self-proposed enhancement) |
| **Base image** | `public.ecr.aws/d3j8x8q7/olympus-base:latest` |

## Form field → file mapping

| Shipd field | Use this file |
|-------------|---------------|
| Problem description | `description.md` |
| Dockerfile | `Dockerfile` |
| JUnit `test.sh` | `test.sh` |
| Test patch (unified diff) | `test.patch` |
| Solution patch (unified diff) | `solution.patch` |
| Solution explanation | `approach.md` |

## Why this fits Olympus (difficulty / long-horizon)

- **Solvable & verified:** on a fresh clone at the pinned commit,
  `test.patch` alone → 20 failing tests; `test.patch` + `solution.patch`
  → **499 passing**. Both patches apply cleanly.
- **Long-horizon:** the reference solution is ~215 LOC of new code across
  **2 files** (`src/differentiate.js`, `src/expression.js`), implementing a
  full calculus rule set over the library's RPN instruction model.
- **Hard (target pass rate ≤ 40%):** requires understanding an unusual RPN
  token representation *and* correctly composing chain/product/quotient/power
  rules plus a dozen function derivatives — easy to get subtly wrong, and the
  tests cross-check every case numerically against finite differences.
- **Fair:** everything required is stated in the description and discoverable
  in the repo (the `simplify`/`substitute` modules show the exact token model
  to mirror). No hidden/unsupported behavior is tested.

## Reproduce locally

```bash
git clone https://github.com/silentmatt/expr-eval && cd expr-eval
git checkout 6e889e0e75c50ac37d70c35388602025650e0c50
git apply /path/to/test.patch          # 20 new tests now fail
npm install --legacy-peer-deps && npm run build
npx mocha test/differentiate.js        # -> failures (feature missing)
git apply /path/to/solution.patch
npm run build && npx mocha             # -> 499 passing
```
