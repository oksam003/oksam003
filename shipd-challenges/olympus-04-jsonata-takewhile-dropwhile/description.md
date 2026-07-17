Add two higher-order array functions to jsonata's standard function library: `$takeWhile` and `$dropWhile`.

## Signatures

- `$takeWhile(array, function)` returns the longest leading run of `array` for which the predicate `function` returns a truthy value.
- `$dropWhile(array, function)` returns the elements of `array` starting at the first one for which the predicate returns a falsy value.

The predicate is invoked with `(value, index, array)`, the same convention as `$filter` and `$map`.

## Behaviour

- `$takeWhile` stops at the first falsy result and does not include any later element, even one that would pass.
- `$dropWhile` keeps every element once the predicate first returns falsy.
- An `undefined` array argument returns `undefined`.
- Results follow jsonata's usual sequence semantics: an empty result is `undefined`, and a single-element result is returned as that element rather than a one-element array.

## Examples

- `$takeWhile([1,2,3,4,1], function($x){ $x < 4 })` yields `[1,2,3]`
- `$dropWhile([1,2,3,4,1], function($x){ $x < 4 })` yields `[4,1]`

## Constraints

- Register the functions in the standard function library so they are callable as `$takeWhile` and `$dropWhile` with no extra setup.
