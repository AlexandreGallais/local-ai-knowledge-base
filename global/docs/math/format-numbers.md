---
id: format-numbers
title: "Show a number"
topic: math
summary: "Intl.NumberFormat: decimals, rounding mode, percent, unit, negative zero, invisible separators of French output."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S6]
license: MIT, written for this base; facts from the sources below
---

# Show a number

Contents: Show a number with Intl.NumberFormat · Show a fixed number of decimals · Choose the rounding mode · Show a percent · Show a unit · Hide the negative zero · French output holds invisible separators · Sources

## 1. Show a number with Intl.NumberFormat

Formula: `new Intl.NumberFormat(locale, options).format(value)`.

Example: `new Intl.NumberFormat('en-US').format(1234567.891)` gives `"1,234,567.891"`.

Pitfall: Always pass the locale. Build the formatter once and reuse it.

Sources: [S6] [E]

## 2. Show a fixed number of decimals

Formula: set `minimumFractionDigits` and `maximumFractionDigits` to the same value.

Example: with `'en-US'` and both set to 1, `format(12)` gives `"12.0"` and `format(12.345)` gives `"12.3"`.

Pitfall: The default maximum is 3 decimals and the default minimum is 0: `format(12)` then gives `"12"`.

Sources: [S6] [E]

## 3. Choose the rounding mode

Formula: option `roundingMode`: `halfExpand` (default, away from zero), `halfEven`, `trunc`, `floor`, `ceil`, `expand`, `halfCeil`, `halfFloor`, `halfTrunc`.

Example: with 0 decimals, `format(2.5)` gives `"3"` and `format(-2.5)` gives `"-3"`. With `halfEven`, `format(2.5)` gives `"2"`. With `trunc` and 1 decimal, `format(2.99)` gives `"2.9"`.

Pitfall: `Math.round(-2.5)` gives `-2`, but the formatter shows `"-3"`. Do not mix the two for the same value.

Sources: [S6] [E]

## 4. Show a percent

Formula: option `style: 'percent'` multiplies the value by 100.

Example: with `'en-US'`, `format(0.256)` gives `"26%"`. With `maximumFractionDigits: 1` it gives `"25.6%"`.

Pitfall: Pass a ratio from 0 to 1, not a percent. A property named `...Percent` holds 0 to 100: divide it by 100 first.

Sources: [S6] [E]

## 5. Show a unit

Formula: options `style: 'unit'` and `unit`. Join two units with `-per-`.

Example: with `'en-US'`, unit `'kilometer-per-hour'`, `format(12)` gives `"12 km/h"`.

Pitfall: Pressure units are not in the list: `unit: 'bar'` and `unit: 'pascal'` throw `RangeError`. Format the number, then append the unit text yourself.

Sources: [S6] [E]

## 6. Hide the negative zero

Formula: add `signDisplay: 'negative'`.

Example: with 2 decimals, `format(-0.001)` gives `"-0"`. With `signDisplay: 'negative'` it gives `"0"`.

Pitfall: A value that rounds to zero keeps its minus sign by default.

Sources: [S6] [E]

## 7. French output holds invisible separators

Formula: with `'fr-FR'`, the group separator is U+202F (narrow no-break space) and the percent sign follows U+00A0 (no-break space).

Example: with `'fr-FR'`, `format(1234567.891)` shows `1 234 567,891`, but the two spaces are U+202F.

Pitfall: A test that compares with a text typed with normal spaces fails. Build the expected text with `String.fromCharCode(0x202f)`, or test `formatToParts`.

Sources: [E]

## Sources

- [S6] MDN, 2026, "Intl.NumberFormat() constructor", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
