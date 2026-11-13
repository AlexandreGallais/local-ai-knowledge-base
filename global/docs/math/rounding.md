---
id: rounding
title: "Round a number"
topic: math
summary: "floor, ceil, trunc, Math.round and its halves, half away from zero, half to even, to N decimals, to a step, to significant digits, toFixed."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S1, S3, S4, S5, S6, S38]
license: MIT, written for this base; facts from the sources below
---

# Round a number

Contents: floor, ceil and trunc · Math.round rounds a half toward +Infinity · Round a half away from zero · Round a half to even · Round to N decimals · Round to a step · Round to significant digits · toFixed returns a text and rounds the stored binary value · Sources

## 1. floor, ceil and trunc

Formula: floor goes down, ceil goes up, trunc drops the fraction.

Example: `Math.floor(-2.7)` gives `-3`. `Math.ceil(-2.7)` gives `-2`. `Math.trunc(-2.7)` gives `-2`.

Pitfall: `x | 0` only works on 32 bits. `2147483648.5 | 0` gives `-2147483648`. Use `Math.trunc`.

Sources: [S1] [E]

## 2. Math.round rounds a half toward +Infinity

Formula: `Math.round(x)` is the nearest integer; a fraction of exactly 0.5 goes up.

Example: `Math.round(2.5)` gives `3`. `Math.round(-2.5)` gives `-2`. `Math.round(-0.5)` gives `-0`.

Pitfall: Other languages give -3 for -2.5. Do not replace it with `Math.floor(x + 0.5)`: for `0.49999999999999994` that gives `1`, and `Math.round` gives `0`.

Sources: [S4] [E]

## 3. Round a half away from zero

Formula: sign(x) * round(abs(x)).

Example: `roundHalfAwayFromZero(2.5)` gives `3`. `roundHalfAwayFromZero(-2.5)` gives `-3`.

Pitfall: Use this function, not `Math.round`, when a negative value must round like its positive twin.

Kit: `roundHalfAwayFromZero` in `kit/math/round-half-away-from-zero.ts`. Sources: [S4] [E]

## 4. Round a half to even

Formula: a fraction of exactly 0.5 goes to the even neighbor.

Example: `roundHalfEven(0.5)` gives `0`. `roundHalfEven(1.5)` gives `2`. `roundHalfEven(2.5)` gives `2`. `roundHalfEven(12.5)` gives `12`.

Pitfall: Use it only when many rounded values are added: it avoids an upward drift. For a value on screen, round away from zero.

Kit: `roundHalfEven` in `kit/math/round-half-even.ts`. , `roundToDecimalsHalfEven`. Sources: [S3] [S6] [E]

## 5. Round to N decimals

Formula: move the decimal point N places in the number text, round, move it back.

Example: the wrong way, then the right one.

Wrong:

```ts
const rounded = Math.round(value * 100) / 100;
const alsoWrong = Math.round((value + Number.EPSILON) * 100) / 100;
```

Right:

```ts
const rounded = roundToDecimals(value, 2);
```

Example: `Math.round(1.005 * 100) / 100` gives `1`. With `Number.EPSILON`, `10.075` gives `10.07`. `roundToDecimals(1.005, 2)` gives `1.01`. `roundToDecimals(10.075, 2)` gives `10.08`. `roundToDecimals(-1.005, 2)` gives `-1.01`.

Pitfall: `1.005 * 100` gives `100.49999999999999`. On 10000 values like x.xx5, the first wrong recipe fails 572 times and the second 557 times.

Kit: `roundToDecimals` in `kit/math/round-to-decimals.ts`. Sources: [S38] [E]

## 6. Round to a step

Formula: round(value / step) * step, then round to the decimals of the step.

Example: `roundToStep(7.3, 0.5)` gives `7.5`. `roundToStep(0.3, 0.1)` gives `0.3`.

Pitfall: `Math.round(0.3 / 0.1) * 0.1` gives `0.30000000000000004`.

Kit: `roundToStep` in `kit/math/round-to-step.ts`. Sources: [E]

## 7. Round to significant digits

Formula: `Number(value.toPrecision(digits))`.

Example: `roundToSignificant(123456, 3)` gives `123000`. `roundToSignificant(0.00123456, 3)` gives `0.00123`.

Pitfall: `(123456).toPrecision(2)` gives the text `"1.2e+5"`. Convert it back to a number before you use it.

Kit: `roundToSignificant` in `kit/math/round-to-significant.ts`. Sources: [E]

## 8. toFixed returns a text and rounds the stored binary value

Formula: `value.toFixed(digits)` returns a string with `digits` decimals, 0 to 100.

Example: `(1.005).toFixed(2)` gives `"1.00"`. `(2.55).toFixed(1)` gives `"2.5"`. `(-0.0001).toFixed(2)` gives `"-0.00"`. `(1e21).toFixed(2)` gives `"1e+21"`.

Pitfall: The result is a string: `(1.5).toFixed(1) + 1` gives `"1.51"`. Never compute with it. To show a number, use `Intl.NumberFormat`.

Sources: [S5] [E]

## Sources

- [S1] MDN (Mozilla), 2026, "Number", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number>.
- [S3] Goldberg D., 1991, "What Every Computer Scientist Should Know About Floating-Point Arithmetic", <https://docs.oracle.com/cd/E19957-01/816-2464/ncg_goldberg.html>.
- [S4] MDN, 2025, "Math.round()", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round>.
- [S5] MDN, 2026, "Number.prototype.toFixed()", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed>.
- [S6] MDN, 2026, "Intl.NumberFormat() constructor", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat>.
- [S38] Moore J., 2014, "Rounding Decimals in JavaScript", <https://www.jacklmoore.com/notes/rounding-in-javascript/>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
