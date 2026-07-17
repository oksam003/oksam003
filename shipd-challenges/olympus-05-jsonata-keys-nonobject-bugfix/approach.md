# Reference solution approach

The regression was introduced when several `for (var prop in obj)` loops were
replaced by `Object.keys(obj)` for safety against prototype pollution.
`Object.keys` throws a TypeError on a non-object, so every call site that could
receive `undefined` (a missing path, an optional argument) started throwing.

The fix centralises the tolerant behaviour in one helper and uses it everywhere
object keys are enumerated, so it spans four source files.

## `src/utils.js` - the helper

Add a `keys` utility that returns the object's keys, or an empty array when the
argument is not an object:

```js
function keys(arg) {
    return typeof arg === 'object' && arg !== null ? Object.keys(arg) : [];
}
```

Export it alongside the other utilities.

## Replace the unsafe calls

Swap `Object.keys(...)` for `utils.keys(...)` at the sites that walk a value's
keys, so a non-object is treated as having none:

- `src/functions.js` - `$each`, `$sift`, `$keys`, `$spread`, `$merge`, and the
  option handling in the format functions.
- `src/jsonata.js` - the evaluator paths that enumerate object keys.
- `src/datetime.js` - the word-based number matcher used by `$fromMillis`.

## Why it is correct

`utils.keys` preserves the original semantics for real objects (it delegates to
`Object.keys`) while returning `[]` for `undefined`/`null`, so the key-iterating
loops simply do nothing and the functions return `undefined` (an empty jsonata
sequence). Real objects are unaffected, and the whole pre-existing suite still
passes (1799 tests).
