# Reference solution approach

The whole feature is built on the continued-fraction expansion that Fraction.js already exposes through `toContinued()`, which returns the BigInt coefficients of the value. From those coefficients you can generate the convergents with the standard recurrence, and the best bounded-denominator approximation is always either a convergent or one specific semiconvergent.

## convergents()

Run the convergent recurrence over the continued-fraction coefficients:

```
h_i = a_i * h_{i-1} + h_{i-2}
k_i = a_i * k_{i-1} + k_{i-2}
```

seeded with `h = 1, 0` and `k = 0, 1`. Push each `h_i / k_i` as a Fraction, reapplying the original sign. The last convergent equals the value exactly because the continued fraction of a rational number is finite.

## approximate(limit)

Coerce `limit` to a BigInt `N` and reject anything below 1. If the denominator already fits inside `N`, the value itself is the answer, so return a clone.

Otherwise walk the same recurrence. As soon as a convergent denominator `k_i` would exceed `N`, stop. The best answer is one of two candidates, both with denominator at most `N`:

1. the last full convergent `h_{i-1} / k_{i-1}`, and
2. the highest admissible semiconvergent, `(h_{i-2} + t*h_{i-1}) / (k_{i-2} + t*k_{i-1})`, where `t = floor((N - k_{i-2}) / k_{i-1})`.

Compare the two by their exact distance to the true value. Because the value is `n/d`, the distance of a candidate `p/q` is `|p*d - n*q| / (q*d)`, so cross-multiplying by the two denominators lets you compare with BigInt only, no floating point. Pick the nearer candidate, and on a tie pick the smaller denominator. Reapply the sign and build the result with the internal `newFraction` helper.

## Why it is correct

A classic theorem in the theory of continued fractions states that the best rational approximation of a real number with denominator bounded by N is either a convergent or a semiconvergent, and among the semiconvergents between two convergents the one with the largest index is the closest. Comparing that single best semiconvergent against the last convergent therefore covers every case, including the subtle one where the fractional part rounds up (for example `approximate(1)` of pi returns 3, not 3's zeroth convergent).

## Files changed

- `src/fraction.js`: the two new prototype methods.
- `fraction.d.ts` and `fraction.d.mts`: the matching TypeScript signatures.

## Verification

The hidden tests check `approximate` against a brute-force search that tries every denominator up to N and keeps the closest fraction. This runs on hundreds of deterministic pseudo-random inputs plus targets derived from pi, e, and sqrt(2), so any deviation in the semiconvergent logic or the tie-breaking is caught. The pre-existing suite (314 tests) keeps passing, and the new suite adds 13 tests for a total of 327.
