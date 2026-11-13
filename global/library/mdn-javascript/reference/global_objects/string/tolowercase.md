---
title: "String.prototype.toLowerCase()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/tolowercase/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.toLowerCase()

The **`toLowerCase()`** method of `String` values returns this string converted to lower case.

```js
const sentence = "The quick brown fox jumps over the lazy dog.";

console.log(sentence.toLowerCase());
// Expected output: "the quick brown fox jumps over the lazy dog."
```

## Syntax

```js
toLowerCase()
```

### Parameters

None.

### Return value

A new string representing the calling string converted to lower case.

## Description

The `toLowerCase()` method returns the value of the string converted to
lower case. `toLowerCase()` does not affect the value of the string
`str` itself.

## Examples

### Using `toLowerCase()`

```js
console.log("ALPHABET".toLowerCase()); // 'alphabet'
```

## See also

- `String.prototype.toLocaleLowerCase()`
- `String.prototype.toLocaleUpperCase()`
- `String.prototype.toUpperCase()`
