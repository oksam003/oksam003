# Reference solution — approach

## Key insight

`expr-eval` stores every expression as a **flat array of RPN instructions**
(`tokens`), the same representation `simplify`/`substitute`/`evaluate` already
walk with a stack. Differentiation is implemented the same way: a single
left-to-right pass over the instruction array, maintaining a stack whose
entries are **pairs**:

```
{ value: <RPN tokens for the sub-expression>,
  deriv: <RPN tokens for its derivative> }
```

Because both `value` and `deriv` are themselves valid RPN token arrays,
building a larger expression is just array concatenation with the operator
instruction appended (e.g. `mul(a, b) === a.concat(b, ['*'])`). This keeps the
whole implementation allocation-simple and avoids constructing a separate AST.

## Per-instruction rules

- `INUMBER` → `{ value:[n], deriv:[0] }`
- `IVAR name` → `{ value:[name], deriv:[ name === wrt ? 1 : 0 ] }`
  (every variable other than the target is a constant)
- `IOP2` (pop `b`, then `a`): value is `a ∘ b`; `deriv` applies the matching
  calculus rule:
  - `+` / `-`: `a' ± b'`
  - `*`: product rule `a'*b + a*b'`
  - `/`: quotient rule `(a'*b − a*b') / b^2`
  - `^`: constant exponent → power rule `n*u^(n-1)*u'`; otherwise the general
    logarithmic form `u^v*(v'*ln(u) + v*u'/u)`
- `IOP1` (pop `u`): unary minus/plus, plus the chain-rule derivatives of the
  built-in functions (`sin→cos·u'`, `cos→−sin·u'`, `exp→exp·u'`, `ln→u'/u`,
  `sqrt→u'/(2√u)`, the inverse-trig and hyperbolic families, etc.).
- Everything else (`IOP3` ternary, `IFUNCALL`, `IARRAY`, `IMEMBER`, `IEXPR`,
  `IENDSTATEMENT`, …) is not meaningfully differentiable and throws an `Error`
  with a specific message.

At the end the stack holds exactly one entry and its `deriv` tokens are wrapped
in a new `Expression`.

## Why it is correct

- The stack discipline mirrors RPN evaluation, so operands are always paired
  with their already-computed derivatives before an operator is applied —
  this is exactly the chain/product/quotient rules by construction.
- The constant-exponent power rule avoids `ln` of possibly-negative bases; the
  general form is only used when the exponent actually depends on a variable.
- Results are ordinary `Expression`s built from the same instruction types, so
  `simplify`, `toString`, `toJSFunction`, and repeated `differentiate` (for
  higher-order derivatives) all keep working.

## Files changed

- `src/differentiate.js` — new module implementing the algorithm (~215 lines).
- `src/expression.js` — import the module and add
  `Expression.prototype.differentiate(variable)`.

## Verification

- `d/dx` results are checked both against **closed-form values** and against a
  **central finite-difference approximation** across a battery of expressions.
- The full pre-existing suite (479 tests) still passes; the new suite adds 20
  tests → **499 passing**.
