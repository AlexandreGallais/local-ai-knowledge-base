---
id: number-basics
title: "Numbers in JavaScript: what a float does"
topic: math
summary: "Binary floats, drift, order of operations, NaN, Infinity and -0, printing, Float32: the facts to know before any calculation."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S1, S3, S7, S23]
license: MIT, written for this base; facts from the sources below
---

# Numbers in JavaScript: what a float does

Contents: A number is a 64-bit binary float · Multiplication drifts too · The order of operations changes the result · NaN, Infinity and negative zero · A number prints as the shortest text that reads back the same · A Float32 value differs from a number · Sources

## 1. A number is a 64-bit binary float

Formula: value = sign * (1 + mantissa) * 2^exponent. The 52 mantissa bits hold 15 to 17 significant decimal digits.

Example: `0.1 + 0.2` gives `0.30000000000000004`. `0.1 + 0.2 === 0.3` gives `false`.

Pitfall: Most decimal fractions have no exact binary form. Never expect an exact decimal result.

Sources: [S1] [S3] [E]

## 2. Multiplication drifts too

Formula: Each operation rounds its result to the nearest float.

Example: `0.57 * 100` gives `56.99999999999999`. `Math.floor(0.57 * 100)` gives `56`.

Pitfall: Do not floor or truncate a computed value. Round it first with `roundToDecimals`.

Sources: [S3] [S23] [E]

## 3. The order of operations changes the result

Formula: (a + b) + c is not always a + (b + c).

Example: `(0.1 + 0.2) + 0.3` gives `0.6000000000000001`. `0.1 + (0.2 + 0.3)` gives `0.6`.

Pitfall: Do not reorder a tested formula. Keep its parentheses.

Sources: [S3] [E]

## 4. NaN, Infinity and negative zero

Formula: `0 / 0` is `NaN`. `1 / 0` is `Infinity`. `NaN` is equal to nothing, not even to itself.

Example: `NaN === NaN` gives `false`. `Number.isNaN(NaN)` gives `true`. `Math.max(NaN, 1)` gives `NaN`. `Math.max()` gives `-Infinity`. `0 === -0` gives `true`.

Pitfall: `isNaN('abc')` gives `true` because it converts its argument first. Use `Number.isNaN` and `Number.isFinite`. Every comparison with `NaN` is false: test for `NaN` before you compare a value with a limit.

Sources: [S3] [S23] [E]

## 5. A number prints as the shortest text that reads back the same

Formula: `String(x)` keeps the fewest digits that give back the same number.

Example: `String(0.1)` gives `"0.1"`. `(0.1).toFixed(20)` gives `"0.10000000000000000555"`. `String(1e21)` gives `"1e+21"`. `String(0.0000001)` gives `"1e-7"`.

Pitfall: The printed text hides the stored error. Large and tiny numbers print with an exponent: never cut a number text at the dot.

Sources: [S23] [E]

## 6. A Float32 value differs from a number

Formula: `Math.fround(x)` is the nearest 32-bit float.

Example: `new Float32Array([0.1])[0]` gives `0.10000000149011612`. `Math.fround(0.1) === 0.1` gives `false`.

Pitfall: Compare a value read from a `Float32Array` with `Math.fround(expected)`, or with a tolerance.

Sources: [S7] [E]

## Sources

- [S1] MDN (Mozilla), 2026, "Number", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number>.
- [S3] Goldberg D., 1991, "What Every Computer Scientist Should Know About Floating-Point Arithmetic", <https://docs.oracle.com/cd/E19957-01/816-2464/ncg_goldberg.html>.
- [S7] MDN, 2026, "Math.fround()", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround>.
- [S23] Ecma TC39, 2026, "ECMAScript 2027 Language Specification", <https://raw.githubusercontent.com/tc39/ecma262/main/spec.html>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
