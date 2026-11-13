---
id: parse-numbers
title: "Read a number from a text"
topic: math
summary: "Number, parseFloat and parseInt traps, a strict decimal reader, a decimal comma."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S1, S36]
license: MIT, written for this base; facts from the sources below
---

# Read a number from a text

Contents: Number(text) accepts the empty text · parseFloat and parseInt read only the start · Parse a decimal strictly · Parse a decimal comma · Sources

## 1. Number(text) accepts the empty text

Formula: `Number(text)` converts the whole text or gives `NaN`.

Example: `Number('12px')` gives `NaN`. `Number('1e3')` gives `1000`. `Number('0x10')` gives `16`. `Number('')` gives `0`. `Number(null)` gives `0`.

Pitfall: An empty input field becomes 0. Test for the empty text first.

Sources: [S1] [E]

## 2. parseFloat and parseInt read only the start

Formula: they read the longest valid start and ignore the rest.

Example: `parseFloat('12px')` gives `12`. `parseFloat('1,5')` gives `1`. `parseInt('1e3')` gives `1`. `parseInt(0.0000005)` gives `5`.

Pitfall: Wrong input passes as a wrong number. Do not use them to check user input.

Sources: [S36] [E]

## 3. Parse a decimal strictly

Formula: accept an optional sign, digits, one decimal separator, an optional exponent. Give `NaN` for anything else.

Example: `parseDecimal('3.14')` gives `3.14`. `parseDecimal('12abc')` gives `NaN`. `parseDecimal('')` gives `NaN`. `parseDecimal('0x10')` gives `NaN`.

Pitfall: Check the result with `Number.isNaN` and show an error. Do not continue with 0.

Kit: `parseDecimal` in `kit/math/parse-decimal.ts`. Sources: [S1] [S36] [E]

## 4. Parse a decimal comma

Formula: pass the separator: `parseDecimal(text, ',')`. Spaces are removed first, no-break spaces too.

Example: `parseDecimal('1,5', ',')` gives `1.5`. `parseDecimal('1 234,5', ',')` gives `1234.5`.

Pitfall: `Number('1,5')` gives `NaN` and `parseFloat('1,5')` gives `1`. `parseDecimal('1,5')` without the separator gives `NaN`.

Kit: `parseDecimal` in `kit/math/parse-decimal.ts`. Sources: [E]

## Sources

- [S1] MDN (Mozilla), 2026, "Number", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number>.
- [S36] MDN, 2025, "parseFloat()", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
