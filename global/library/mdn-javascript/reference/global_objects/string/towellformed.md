---
title: "String.prototype.toWellFormed()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/towellformed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.toWellFormed()

The **`toWellFormed()`** method of `String` values returns a string where all lone surrogates of this string are replaced with the Unicode replacement character U+FFFD.

## Syntax

```js
toWellFormed()
```

### Parameters

None.

### Return value

A new string that is a copy of this string, with all lone surrogates replaced with the Unicode replacement character U+FFFD. If `str` is well formed, a new string is still returned (essentially a copy of `str`).

## Description

Strings in JavaScript are UTF-16 encoded. UTF-16 encoding has the concept of _surrogate pairs_, which is introduced in detail in the UTF-16 characters, Unicode code points, and grapheme clusters section.

`toWellFormed()` iterates through the code units of this string, and replaces any lone surrogates with the Unicode replacement character U+FFFD `�`. This ensures that the returned string is well-formed and can be used in functions that expect well-formed strings, such as `encodeURI`. Compared to a custom implementation, `toWellFormed()` is more efficient, as engines can directly access the internal representation of strings.

When ill-formed strings are used in certain contexts, such as `TextEncoder`, they are automatically converted to well-formed strings using the same replacement character. When lone surrogates are rendered, they are also rendered as the replacement character (a diamond with a question mark inside).

## Examples

### Using toWellFormed()

```js
const strings = [
  // Lone leading surrogate
  "ab\uD800",
  "ab\uD800c",
  // Lone trailing surrogate
  "\uDFFFab",
  "c\uDFFFab",
  // Well-formed
  "abc",
  "ab\uD83D\uDE04c",
];

for (const str of strings) {
  console.log(str.toWellFormed());
}
// Logs:
// "ab�"
// "ab�c"
// "�ab"
// "c�ab"
// "abc"
// "ab😄c"
```

### Avoiding errors in encodeURI()

`encodeURI` throws an error if the string passed is not well-formed. This can be avoided by using `toWellFormed()` to convert the string to a well-formed string first.

```js
const illFormed = "https://example.com/search?q=\uD800";

try {
  encodeURI(illFormed);
} catch (e) {
  console.log(e); // URIError: URI malformed
}

console.log(encodeURI(illFormed.toWellFormed())); // "https://example.com/search?q=%EF%BF%BD"
```

## See also

- Polyfill of `String.prototype.toWellFormed` in `core-js`
- es-shims polyfill of `String.prototype.toWellFormed`
- `String.prototype.isWellFormed()`
- `String.prototype.normalize()`
