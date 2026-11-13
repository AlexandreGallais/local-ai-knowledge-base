---
id: range-operations
title: "Ranges: modulo, clamp, interpolation, mapping, percent"
topic: math
summary: "The floored modulo, clamp, lerp and its inverse, mapping a value from one range to another, even steps, percent."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S9, S10, S11, S12, S14, S23]
license: MIT, written for this base; facts from the sources below
---

# Ranges: modulo, clamp, interpolation, mapping, percent

Contents: % is a remainder, not a modulo · Clamp a value · Interpolate between two values (lerp) · Find the position of a value in a range (inverse lerp) · Map a value from one range to another · Build even steps · Compute a percent · Sources

## 1. % is a remainder, not a modulo

Formula: modulo(a, n) = ((a % n) + n) % n. The result has the sign of n.

Example: `-13 % 5` gives `-3`. `modulo(-13, 5)` gives `2`. `modulo(-1, 360)` gives `359`.

Pitfall: `-1 % 2 === 1` gives `false`: test an odd number with `n % 2 !== 0`. Use `modulo` for an index, an angle or a cycle.

Kit: `modulo` in `kit/math/modulo.ts`. Sources: [S9] [S10] [S23] [E]

## 2. Clamp a value

Formula: clamp(x, minimum, maximum) = min(max(x, minimum), maximum).

Example: `clamp(11, 0, 10)` gives `10`. `clamp(-1, 0, 10)` gives `0`.

Pitfall: `Math.clamp` does not exist at the project versions. `clamp(NaN, 0, 10)` gives `NaN`.

Kit: `clamp` in `kit/math/clamp.ts`. Sources: [S14] [E]

## 3. Interpolate between two values (lerp)

Formula: lerp(a, b, t) = a * (1 - t) + b * t. t = 0 gives a, t = 1 gives b.

Example: `lerp(10, 20, 0.25)` gives `12.5`. `lerp(20, 620, 0.8)` gives `500`.

Pitfall: The form a + (b - a) * t can miss b at t = 1: `0.2 + (0.9 - 0.2) * 1` gives `0.8999999999999999`.

Kit: `lerp` in `kit/math/lerp.ts`. Sources: [S12] [E]

## 4. Find the position of a value in a range (inverse lerp)

Formula: inverseLerp(a, b, x) = (x - a) / (b - a).

Example: `inverseLerp(10, 20, 12.5)` gives `0.25`.

Pitfall: a equal to b divides by zero. The function throws `RangeError`: check the range first.

Kit: `inverseLerp` in `kit/math/inverse-lerp.ts`. Sources: [S11] [E]

## 5. Map a value from one range to another

Formula: mapRange(x, { start: a, end: b }, { start: c, end: d }) = lerp(c, d, inverseLerp(a, b, x)).

Example: a 4 to 20 mA signal on a 0 to 100 scale: `mapRange(12, { start: 4, end: 20 }, { start: 0, end: 100 })` gives `50`. `mapRange(22, { start: 4, end: 20 }, { start: 0, end: 100 })` gives `112.5`. `mapRangeClamped(22, { start: 4, end: 20 }, { start: 0, end: 100 })` gives `100`.

Pitfall: Without the clamp, a value out of range moves the needle out of the dial. Use `mapRangeClamped` for a needle or a bar.

Kit: `mapRange` in `kit/math/map-range.ts`. , `mapRangeClamped`. Sources: [S11] [E]

## 6. Build even steps

Formula: step i = lerp(start, end, i / count), for i from 0 to count.

Example: `linearSteps(0, 100, 4)` gives `[0, 25, 50, 75, 100]`. `linearSteps(0, 1, 10)[3]` gives `0.3`.

Pitfall: Do not add the step again and again: `0.1 + 0.1 + 0.1` gives `0.30000000000000004`.

Kit: `linearSteps` in `kit/math/linear-steps.ts`. Sources: [E]

## 7. Compute a percent

Formula: percent = part * 100 / whole. Multiply first, then divide.

Example: `percentOf(7, 100)` gives `7`. `percentOf(1, 8)` gives `12.5`.

Pitfall: `7 / 100 * 100` gives `7.000000000000001`. A name ending with `Percent` holds 0 to 100; a name ending with `Ratio` holds 0 to 1.

Kit: `percentOf` in `kit/math/percent-of.ts`. , `percentChange`. Sources: [E]

## Sources

- [S9] MDN, 2025, "Remainder (%)", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder>.
- [S10] Leijen D., 2001, "Division and Modulus for Computer Scientists", <https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf>.
- [S11] D3 (Observable), « d3-scale : Linear scales », "d3-scale : Linear scales", <https://d3js.org/d3-scale/linear>.
- [S12] D3 (Observable), « d3-interpolate : Value interpolation », "d3-interpolate : Value interpolation", <https://d3js.org/d3-interpolate/value>.
- [S14] TC39, « ECMAScript proposals » (étapes 2 à 3), "ECMAScript proposals", <https://github.com/tc39/proposals>.
- [S23] Ecma TC39, 2026, "ECMAScript 2027 Language Specification", <https://raw.githubusercontent.com/tc39/ecma262/main/spec.html>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
