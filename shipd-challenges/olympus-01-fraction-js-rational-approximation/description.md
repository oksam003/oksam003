# Add bounded-denominator rational approximation to Fraction.js

## `approximate(limit)`

Returns a new `Fraction` that is the closest possible approximation of the current value whose denominator does not exceed `limit`. `limit` may be a `number` or a `bigint`.

Requirements:

- Return the nearest representable value. When two candidates are exactly the same distance from the true value, prefer the one with the smaller denominator.
- A `limit` below 1 is invalid and must throw.

## `convergents()`

Returns the value's continued-fraction convergents, in order, as an array of `Fraction` objects.

## Constraints

- The whole computation must stay exact. Fraction.js stores the numerator and denominator as BigInt, so the implementation must not fall back to floating point and lose precision on large inputs.
- The public TypeScript definitions should gain the two new methods.
