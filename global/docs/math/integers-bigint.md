---
id: integers-bigint
title: "Integers and BigInt"
topic: math
summary: "Safe integers up to 2^53 - 1, integer checks, BigInt rules and BigInt in JSON."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S1, S8]
license: MIT, written for this base; facts from the sources below
---

# Integers and BigInt

Contents: Integers are exact up to 2^53 - 1 · Check that a value is an integer · BigInt rules · BigInt and JSON · Sources

## 1. Integers are exact up to 2^53 - 1

Formula: safe range = -(2^53 - 1) to 2^53 - 1, that is 9007199254740991.

Example: `2 ** 53 === 2 ** 53 + 1` gives `true`. `Number.isSafeInteger(2 ** 53)` gives `false`.

Pitfall: A larger identifier read from JSON loses its last digits. Carry it as a string.

Sources: [S1] [E]

## 2. Check that a value is an integer

Formula: `Number.isInteger(x)`, and `Number.isSafeInteger(x)` for a count or an index.

Example: `Number.isInteger(5.0)` gives `true`. `Number.isInteger(5.000000000000001)` gives `false`.

Pitfall: `Number.isInteger(5.0000000000000001)` gives `true`: the literal is already rounded to 5.

Sources: [E]

## 3. BigInt rules

Formula: write `123n`. Both operands must be BigInt. Division drops the fraction.

Example: `2n ** 53n + 1n` gives `9007199254740993n`. `5n / 2n` gives `2n`.

Pitfall: `1n + 1` throws `TypeError`. `Math.max(1n, 2n)` throws `TypeError`. `BigInt(1.5)` throws `RangeError`. Use BigInt only when a value can pass 2^53.

Sources: [S8] [E]

## 4. BigInt and JSON

Formula: convert a BigInt to a string before `JSON.stringify`.

Example: `JSON.stringify({ a: 1n })` throws `TypeError`.

Pitfall: `Number(2n ** 53n + 1n)` gives `9007199254740992`: the conversion loses 1.

Sources: [S8] [E]

## Sources

- [S1] MDN (Mozilla), 2026, "Number", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number>.
- [S8] MDN, 2026, "BigInt", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
