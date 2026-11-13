---
title: "String.prototype.endsWith()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/endswith/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.endsWith()

The **`endsWith()`** method of `String` values determines whether a string ends with the characters of this string, returning `true` or `false` as appropriate.

```js
const str1 = "Cats are the best!";

console.log(str1.endsWith("best!"));
// Expected output: true

console.log(str1.endsWith("best", 17));
// Expected output: true

const str2 = "Is this a question?";

console.log(str2.endsWith("question"));
// Expected output: false
```

## Syntax

```js
endsWith(searchString)
endsWith(searchString, endPosition)
```

### Parameters

- `searchString`
    The characters to be searched for at the end of `str`. Cannot be a regex. All values that are not regexes are coerced to strings, so omitting it or passing `undefined` causes `endsWith()` to search for the string `"undefined"`, which is rarely what you want.
- `endPosition` (optional)
    The end position at which `searchString` is expected to be found (the index of `searchString`'s last character plus 1). Defaults to `str.length`.

### Return value

**`true`** if the given characters are found at the end of the string, including when `searchString` is an empty string; otherwise, **`false`**.

### Exceptions

- `TypeError`
    Thrown if `searchString` is a regex.

## Description

This method lets you determine whether or not a string ends with another string. This method is case-sensitive.

## Examples

### Using endsWith()

```js
const str = "To be, or not to be, that is the question.";

console.log(str.endsWith("question.")); // true
console.log(str.endsWith("to be")); // false
console.log(str.endsWith("to be", 19)); // true
```

## See also

- Polyfill of `String.prototype.endsWith` in `core-js`
- es-shims polyfill of `String.prototype.endsWith`
- `String.prototype.startsWith()`
- `String.prototype.includes()`
- `String.prototype.indexOf()`
- `String.prototype.lastIndexOf()`
