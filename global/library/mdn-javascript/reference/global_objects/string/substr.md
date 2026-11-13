---
title: "String.prototype.substr()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/substr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.substr()

The **`substr()`** method of `String` values returns a portion of this string, starting at the specified index and extending for a given number of characters afterwards.

> **Note:**
> `substr()` is not part of the main ECMAScript specification — it's defined in Annex B: Additional ECMAScript Features for Web Browsers, which is normative optional for non-browser runtimes. Therefore, people are advised to use the standard `String.prototype.substring()` and `String.prototype.slice()` methods instead to make their code maximally cross-platform friendly. The `String.prototype.substring()` page has some comparisons between the three methods.

```js
const str = "Mozilla";

console.log(str.substr(1, 2));
// Expected output: "oz"

console.log(str.substr(2));
// Expected output: "zilla"
```

## Syntax

```js
substr(start)
substr(start, length)
```

### Parameters

- `start`
    The index of the first character to include in the returned substring.
- `length` (optional)
    The number of characters to extract.

### Return value

A new string containing the specified part of the given string.

## Description

A string's `substr()` method extracts `length` characters from the string, counting from the `start` index.

- If `start >= str.length`, an empty string is returned.
- If `start < 0`, the index starts counting from the end of the string. More formally, in this case the substring starts at `max(start + str.length, 0)`.
- If `start` is omitted or `undefined`, it's treated as `0`.
- If `length` is omitted or `undefined`, or if `start + length >= str.length`, `substr()` extracts characters to the end of the string.
- If `length < 0`, an empty string is returned.
- For both `start` and `length`, `NaN` is treated as `0`.

Although you are encouraged to avoid using `substr()`, there is no trivial way to migrate `substr()` to either `slice()` or `substring()` in legacy code without essentially writing a polyfill for `substr()`. For example, `str.substr(a, l)`, `str.slice(a, a + l)`, and `str.substring(a, a + l)` all have different results when `str = "01234", a = 1, l = -2` — `substr()` returns an empty string, `slice()` returns `"123"`, while `substring()` returns `"0"`. The actual refactoring path depends on the knowledge of the range of `a` and `l`.

## Examples

### Using substr()

```js
const string = "Mozilla";

console.log(string.substr(0, 1)); // 'M'
console.log(string.substr(1, 0)); // ''
console.log(string.substr(-1, 1)); // 'a'
console.log(string.substr(1, -1)); // ''
console.log(string.substr(-3)); // 'lla'
console.log(string.substr(1)); // 'ozilla'
console.log(string.substr(-20, 2)); // 'Mo'
console.log(string.substr(20, 2)); // ''
```

## See also

- Polyfill of `String.prototype.substr` in `core-js`
- es-shims polyfill of `String.prototype.substr`
- `String.prototype.slice()`
- `String.prototype.substring()`
