---
title: "no-loss-of-precision"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-loss-of-precision.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-loss-of-precision

This rule would disallow the use of number literals that lose precision at runtime when converted to a JS `Number` due to 64-bit floating-point rounding.

## Rule Details

In JS, `Number`s are stored as double-precision floating-point numbers according to the IEEE 754 standard. Because of this, numbers can only retain accuracy up to a certain amount of digits. If the programmer enters additional digits, those digits will be lost in the conversion to the `Number` type and will result in unexpected behavior.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-loss-of-precision: "error"*/

const a = 9007199254740993
const b = 5123000000000000000000000000001
const c = 1230000000000000000000000.0
const d = .1230000000000000000000000
const e = 0X20000000000001
const f = 0X2_000000000_0001;
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-loss-of-precision: "error"*/

const a = 12345
const b = 123.456
const c = 123e34
const d = 12300000000000000000000000
const e = 0x1FFFFFFFFFFFFF
const f = 9007199254740991
const g = 9007_1992547409_91
```

## Options

This rule has no options.
