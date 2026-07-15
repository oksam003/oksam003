# Add symbolic differentiation to expr-eval

`expr-eval` is a mathematical expression parser and evaluator. A parsed
`Expression` already supports `evaluate`, `simplify`, `substitute`,
`variables`, `toString`, and `toJSFunction` — but it has **no way to compute
the symbolic derivative** of an expression. Every real computer-algebra use
(plotting tangents, Newton's method, sensitivity analysis) currently has to
fall back to error-prone numeric finite differences.

## What to build

Implement `Expression.prototype.differentiate(variable)` that returns a **new
`Expression`** representing the exact symbolic derivative of the receiver with
respect to the given variable name.

```js
const parser = new Parser();
const f = parser.parse('x^2 * sin(x)');
const df = f.differentiate('x');      // -> a new Expression
df.evaluate({ x: 1.3 });              // == 2*1.3*sin(1.3) + 1.3^2*cos(1.3)
df.toString();                        // human-readable derivative
df.simplify().evaluate({ x: 1.3 });   // simplify() must still work on it
df.toJSFunction('x')(1.3);            // toJSFunction() must still work on it
```

The returned expression is a normal `Expression`, so `evaluate`, `toString`,
`simplify`, `toJSFunction`, and a second `differentiate` (higher-order
derivatives) must all work on the result.

## Rules the implementation must cover

- **Constants → 0**, the differentiation variable **→ 1**, and **any other
  variable is treated as a constant** (derivative 0).
- **Sum / difference** rules for `+` and `-`.
- **Product rule** for `*` and **quotient rule** for `/`.
- **Power rule** for `^`:
  - constant exponent: `d/dx u^n = n*u^(n-1)*u'`
  - variable exponent (general): `d/dx u^v = u^v*(v'*ln(u) + v*u'/u)`
- **Chain rule** applied throughout.
- **Unary minus/plus.**
- Derivatives of the built-in functions: `sin`, `cos`, `tan`, `asin`, `acos`,
  `atan`, `sinh`, `cosh`, `tanh`, `exp`, `ln`/`log`, `log2`, `log10`, `sqrt`,
  `cbrt`, and `abs`.

## Error handling

Constructs that are not meaningfully differentiable must throw an `Error` with
a clear message rather than returning a wrong result. This includes
conditionals (`?:`), custom function calls, array literals, member access, and
nested/multi-statement expressions. Calling `differentiate()` **without** a
variable name must also throw.

## Constraints

- Pure JavaScript, no new runtime dependencies.
- The existing test suite must continue to pass unchanged.
- The result must be a real `Expression` built from the same instruction model
  the rest of the library uses (so `simplify`/`toJSFunction`/etc. keep working).
