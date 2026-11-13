---
title: "String.prototype.startsWith()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/startswith/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.startsWith()

The **`startsWith()`** method of `String` values determines whether this string begins with the characters of a specified string, returning `true` or `false` as appropriate.

```js
const str = "Saturday night plans";

console.log(str.startsWith("Sat"));
// Expected output: true

console.log(str.startsWith("Sat", 3));
// Expected output: false
```

## Syntax

```js
startsWith(searchString)
startsWith(searchString, position)
```

### Parameters

- `searchString`
    The characters to be searched for at the start of this string. Cannot be a regex. All values that are not regexes are coerced to strings, so omitting it or passing `undefined` causes `startsWith()` to search for the string `"undefined"`, which is rarely what you want.
- `position` (optional)
    The start position at which `searchString` is expected to be found (the index of `searchString`'s first character). Defaults to `0`.

### Return value

**`true`** if the given characters are found at the beginning of the string, including when `searchString` is an empty string; otherwise, **`false`**.

### Exceptions

- `TypeError`
    Thrown if `searchString` is a regex.

## Description

This method lets you determine whether or not a string begins with another string. This method is case-sensitive.

## Examples

### Using startsWith()

```js
const str = "To be, or not to be, that is the question.";

console.log(str.startsWith("To be")); // true
console.log(str.startsWith("not to be")); // false
console.log(str.startsWith("not to be", 10)); // true
```

## See also

- Polyfill of `String.prototype.startsWith` in `core-js`
- es-shims polyfill of `String.prototype.startsWith`
- `String.prototype.endsWith()`
- `String.prototype.includes()`
- `String.prototype.indexOf()`
- `String.prototype.lastIndexOf()`
