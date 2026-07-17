# Reference solution approach

The feature spans two subsystems: the built-in function library implements the
behaviour, and the evaluator's static frame binds the functions into the
language with a type signature.

## Function library (`src/functions.js`)

`$takeWhile` and `$dropWhile` are higher-order functions, so they follow the
same shape as the existing `filter`: `async function`s that use
`this.createSequence()` to build a jsonata sequence, `hofFuncArgs(func, entry, i, arr)`
to assemble the `(value, index, array)` arguments, `await func.apply(this, ...)`
to invoke the predicate through the evaluator, and `boolean(res)` to coerce the
result to a truthy/falsy value.

- `takeWhile` pushes elements until the predicate first returns falsy, then
  breaks.
- `dropWhile` skips elements while the predicate returns truthy, then pushes the
  rest (using a `dropping` flag so the predicate is not re-evaluated once it has
  failed once).

Both return `undefined` for an `undefined` array, matching the other array
functions. The two functions are added to the object the module exports.

## Evaluator binding (`src/jsonata.js`)

Each function is registered in the interpreter's static frame next to `filter`:

```js
staticFrame.bind('takeWhile', defineFunction(fn.takeWhile, '<af>'));
staticFrame.bind('dropWhile', defineFunction(fn.dropWhile, '<af>'));
```

The `<af>` signature declares the argument types (array, function), which
jsonata validates at call time. This makes the names resolvable as `$takeWhile`
and `$dropWhile` during evaluation.

## Why it is correct

The predicate is evaluated through the same async `func.apply` path that
`$filter` uses, so it works with lambdas, partially applied functions, and the
`(value, index, array)` argument convention. Sequence construction via
`createSequence` gives the standard jsonata result semantics (empty -> undefined,
single element -> scalar). The pre-existing suite still passes: 1799 tests.
