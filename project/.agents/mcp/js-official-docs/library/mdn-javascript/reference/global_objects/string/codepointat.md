---
title: "String.prototype.codePointAt()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/codepointat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.codePointAt()

The **`codePointAt()`** method of `String` values returns a non-negative integer that is the Unicode code point value of the character starting at the given index. Note that the index is still based on UTF-16 code units, not Unicode code points.

```js
const icons = "☃★♲";

console.log(icons.codePointAt(1));
// Expected output: "9733"
```

## Syntax

```js
codePointAt(index)
```

### Parameters

- `index`
    Zero-based index of the character to be returned. Converted to an integer — `undefined` is converted to 0.

### Return value

A non-negative integer representing the code point value of the character at the given `index`.

- If `index` is out of the range of `0` – `str.length - 1`, `codePointAt()` returns `undefined`.
- If the element at `index` is a UTF-16 leading surrogate, returns the code point of the surrogate _pair_.
- If the element at `index` is a UTF-16 trailing surrogate, returns _only_ the trailing surrogate code unit.

## Description

Characters in a string are indexed from left to right. The index of the first character is `0`, and the index of the last character in a string called `str` is `str.length - 1`.

Unicode code points range from `0` to `1114111` (`0x10FFFF`). In UTF-16, each string index is a code unit with value `0` – `65535`. Higher code points are represented by _a pair_ of 16-bit surrogate pseudo-characters. Therefore, `codePointAt()` returns a code point that may span two string indices. For information on Unicode, see UTF-16 characters, Unicode code points, and grapheme clusters.

## Examples

### Using codePointAt()

```js
"ABC".codePointAt(0); // 65
"ABC".codePointAt(0).toString(16); // 41

"😍".codePointAt(0); // 128525
"\ud83d\ude0d".codePointAt(0); // 128525
"\ud83d\ude0d".codePointAt(0).toString(16); // 1f60d

"😍".codePointAt(1); // 56845
"\ud83d\ude0d".codePointAt(1); // 56845
"\ud83d\ude0d".codePointAt(1).toString(16); // de0d

"ABC".codePointAt(42); // undefined
```

### Looping with codePointAt()

Because using string indices for looping causes the same code point to be visited twice (once for the leading surrogate, once for the trailing surrogate), and the second time `codePointAt()` returns _only_ the trailing surrogate, it's better to avoid looping by index.

```js
const str = "\ud83d\udc0e\ud83d\udc71\u2764";

for (let i = 0; i < str.length; i++) {
  console.log(str.codePointAt(i).toString(16));
}
// '1f40e', 'dc0e', '1f471', 'dc71', '2764'
```

Instead, use a `for...of` statement or spread the string, both of which invoke the string's `[Symbol.iterator]()`, which iterates by code points. Then, use `codePointAt(0)` to get the code point of each element.

```js
for (const codePoint of str) {
  console.log(codePoint.codePointAt(0).toString(16));
}
// '1f40e', '1f471', '2764'

[...str].map((cp) => cp.codePointAt(0).toString(16));
// ['1f40e', '1f471', '2764']
```

## See also

- Polyfill of `String.prototype.codePointAt` in `core-js`
- es-shims polyfill of `String.prototype.codePointAt`
- `String.fromCodePoint()`
- `String.fromCharCode()`
- `String.prototype.charCodeAt()`
- `String.prototype.charAt()`
