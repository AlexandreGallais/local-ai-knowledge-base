---
title: "RangeError: argument is not a valid code point"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/not_a_valid_code_point/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RangeError: argument is not a valid code point

The JavaScript exception "Invalid code point" occurs when `NaN` values,
negative Integers (-1), non-Integers (5.4), or values larger than 0x10FFFF (1114111) are
used with `String.fromCodePoint()`.

## Message

```plain
RangeError: Invalid code point -1 (V8-based)
RangeError: -1 is not a valid code point (Firefox)
RangeError: Arguments contain a value that is out of range of code points (Safari)
```

## Error type

`RangeError`

## What went wrong?

`String.fromCodePoint()` throws this error when passed `NaN`
values, negative Integers (-1), non-Integers (5.4), or values larger than 0x10FFFF
(1114111).

A code point is a value in the
Unicode codespace; that is, the range of integers from `0` to
`0x10FFFF`.

## Examples

### Invalid cases

```js
String.fromCodePoint("_"); // RangeError
String.fromCodePoint(Infinity); // RangeError
String.fromCodePoint(-1); // RangeError
String.fromCodePoint(3.14); // RangeError
String.fromCodePoint(3e-2); // RangeError
String.fromCodePoint(NaN); // RangeError
```

### Valid cases

```js
String.fromCodePoint(42); // "*"
String.fromCodePoint(65, 90); // "AZ"
String.fromCodePoint(0x404); // 'Є' (U+0404)
String.fromCodePoint(0x2f804); // '你' (U+2F804)
String.fromCodePoint(194564); // '你'
String.fromCodePoint(0x1d306, 0x61, 0x1d307); // '𝌆a𝌇'
```

## See also

- `String.fromCodePoint()`
