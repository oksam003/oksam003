# Add bounded-denominator rational approximation to Fraction.js

Fraction.js can already reduce a fraction to a nearby simpler one with `simplify(eps)`, but that method works from an error tolerance. There is currently no way to ask the opposite, and far more common, question: "give me the closest fraction whose denominator is at most N". That is what you need for gear ratios, musical tuning, screen aspect ratios, calendar leap-year rules, and the classic 22/7 style approximations of pi. Right now a user has to write the continued-fraction math themselves.

Please add two related methods to the `Fraction` prototype.

## `approximate(limit)`

Returns a new `Fraction` that is the closest possible approximation of the current value whose denominator does not exceed `limit`. `limit` may be a `number` or a `bigint`.

Requirements:

- If the fraction already has a denominator less than or equal to `limit`, return an equal fraction (it is already the best possible answer).
- Otherwise return the nearest representable value. When two candidates are exactly the same distance from the true value, prefer the one with the smaller denominator.
- The sign of the value must be preserved, and zero must be handled.
- A `limit` below 1 is invalid and must throw.

Examples with pi:

- `new Fraction(Math.PI).approximate(1)` gives `3`
- `new Fraction(Math.PI).approximate(7)` gives `22/7`
- `new Fraction(Math.PI).approximate(99)` gives `311/99`
- `new Fraction(Math.PI).approximate(106)` gives `333/106`

## `convergents()`

Returns an array of `Fraction` objects: the continued-fraction convergents of the value, in order. Each convergent is the best rational approximation of the value among all fractions whose denominator is at most that convergent's own denominator, and the final entry equals the original value exactly. Integers and negative values must work.

## Constraints

- Pure JavaScript, no new runtime dependencies.
- The whole computation should stay exact. Fraction.js stores the numerator and denominator as BigInt, so the implementation must not fall back to floating point and lose precision on large inputs.
- All existing tests must keep passing, and the public TypeScript definitions should gain the two new methods.

## Category

feature_request. Both methods are new capabilities; nothing about the existing behavior of the library changes.
