---
title: "String.fromCodePoint()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/fromcodepoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.fromCodePoint()

The **`String.fromCodePoint()`** static method returns a string created from the specified sequence of code points.

```js
console.log(String.fromCodePoint(9731, 9733, 9842, 0x2f804));
// Expected output: "☃★♲你"
```

## Syntax

```js
String.fromCodePoint()
String.fromCodePoint(num1)
String.fromCodePoint(num1, num2)
String.fromCodePoint(num1, num2, /* …, */ numN)
```

### Parameters

- `num1`, …, `numN`
    An integer between `0` and `0x10FFFF` (inclusive) representing a Unicode code point.

### Return value

A string created by using the specified sequence of code points.

### Exceptions

- `RangeError`
    Thrown if `numN` is not an integer, is less than `0`, or is greater than `0x10FFFF` after being converted to a number.

## Description

Because `fromCodePoint()` is a static method of `String`, you always use it as `String.fromCodePoint()`, rather than as a method of a `String` value you created.

Unicode code points range from `0` to `1114111` (`0x10FFFF`). In UTF-16, each string index is a code unit with value `0` – `65535`. Higher code points are represented by _a pair_ of 16-bit surrogate pseudo-characters. Therefore, `fromCodePoint()` may return a string whose `length` (in UTF-16 code units) is larger than the number of arguments passed. For information on Unicode, see UTF-16 characters, Unicode code points, and grapheme clusters.

## Examples

### Using fromCodePoint()

Valid input:

```js
String.fromCodePoint(42); // "*"
String.fromCodePoint(65, 90); // "AZ"
String.fromCodePoint(0x404); // "\u0404" === "Є"
String.fromCodePoint(0x2f804); // "\uD87E\uDC04"
String.fromCodePoint(194564); // "\uD87E\uDC04"
String.fromCodePoint(0x1d306, 0x61, 0x1d307); // "\uD834\uDF06a\uD834\uDF07"
```

Invalid input:

```js
String.fromCodePoint("_"); // RangeError
String.fromCodePoint(Infinity); // RangeError
String.fromCodePoint(-1); // RangeError
String.fromCodePoint(3.14); // RangeError
String.fromCodePoint(3e-2); // RangeError
String.fromCodePoint(NaN); // RangeError
```

### Compared to fromCharCode()

`String.fromCharCode()` cannot return supplementary characters (i.e., code points `0x010000` – `0x10FFFF`) by specifying their code point. Instead, it requires the UTF-16 surrogate pair in order to return a supplementary character:

```js
String.fromCharCode(0xd83c, 0xdf03); // Code Point U+1F303 "Night with
String.fromCharCode(55356, 57091); // Stars" === "\uD83C\uDF03"
```

`String.fromCodePoint()`, on the other hand, can return 4-byte supplementary characters, as well as the more common 2-byte BMP characters, by specifying their code point (which is equivalent to the UTF-32 code unit):

```js
String.fromCodePoint(0x1f303); // or 127747 in decimal
```

## See also

- Polyfill of `String.fromCodePoint` in `core-js`
- es-shims polyfill of `String.fromCodePoint`
- `String.fromCharCode()`
- `String.prototype.charAt()`
- `String.prototype.codePointAt()`
- `String.prototype.charCodeAt()`
