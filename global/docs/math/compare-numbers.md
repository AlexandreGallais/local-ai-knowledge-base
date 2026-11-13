---
id: compare-numbers
title: "Compare two computed numbers"
topic: math
summary: "Never === on a computed value: absolute tolerance near zero, relative elsewhere, chosen from the data; sort with a comparator."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S2, S20]
license: MIT, written for this base; facts from the sources below
---

# Compare two computed numbers

Contents: Do not use === on a computed value · Absolute and relative tolerance · Choose the tolerance from the data · Compare with zero with an absolute tolerance · Sort numbers with a comparator · Sources

## 1. Do not use === on a computed value

Formula: Two computed values are equal when their difference is below a tolerance.

Example: the wrong way, then the right one.

Wrong:

```ts
const isFull = levelRatio * 100 === 57;
```

Right:

```ts
const isFull = isCloseTo(levelRatio * 100, 57, { absolute: 1e-9 });
```

Pitfall: `0.57 * 100 === 57` gives `false`. Use `===` only for integers and for values you did not compute.

Sources: [S2] [E]

## 2. Absolute and relative tolerance

Formula: equal when abs(a - b) <= max(absoluteTolerance, relativeTolerance * max(abs(a), abs(b))).

Example: `isCloseTo(0.1 + 0.2, 0.3, { absolute: 1e-12 })` gives `true`. `isCloseTo(1e10 + 1, 1e10, { absolute: 0, relative: 1e-9 })` gives `true`.

Pitfall: `Number.EPSILON` alone is too small above 1. `1000.1 + 1000.2` gives `2000.3000000000002`, and `Math.abs(1000.1 + 1000.2 - 2000.3) < Number.EPSILON` gives `false`.

Kit: `isCloseTo` in `kit/math/is-close-to.ts`. Sources: [S2] [S20] [E]

## 3. Choose the tolerance from the data

Formula: tolerance = half of the last digit you show or store. In tests, use 1e-9.

Example: A value shown with 1 decimal: tolerance 0.05. An input with step 0.1: tolerance 0.01.

Pitfall: Do not widen a tolerance to make a test pass. A large error means the formula is wrong.

Sources: [S2] [S20]

## 4. Compare with zero with an absolute tolerance

Formula: near zero, test abs(x) <= absoluteTolerance. A relative tolerance cannot work there.

Example: `Math.sin(Math.PI)` gives `1.2246467991473532e-16`, not `0`. `isCloseTo(Math.sin(Math.PI), 0, { absolute: 1e-12 })` gives `true`.

Pitfall: `Math.sin(Math.PI) === 0` gives `false`.

Sources: [S20] [E]

## 5. Sort numbers with a comparator

Formula: `values.toSorted((left, right) => left - right)`.

Example: `[10, 9, 1].toSorted((left, right) => left - right)` gives `[1, 9, 10]`.

Pitfall: `[10, 9, 1].sort()` gives `[1, 10, 9]`: without a comparator the values are sorted as text. `sort` also changes the array; `toSorted` returns a copy.

Sources: [E]

## Sources

- [S2] MDN, 2026, "Number.EPSILON", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON>.
- [S20] Dawson B., 2012, "Comparing Floating Point Numbers, 2012 Edition", <https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
