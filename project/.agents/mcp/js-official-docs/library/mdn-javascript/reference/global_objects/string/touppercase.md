---
title: "String.prototype.toUpperCase()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/touppercase/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.toUpperCase()

The **`toUpperCase()`** method of `String` values returns this string converted to uppercase.

```js
const sentence = "The quick brown fox jumps over the lazy dog.";

console.log(sentence.toUpperCase());
// Expected output: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
```

## Syntax

```js
toUpperCase()
```

### Parameters

None.

### Return value

A new string representing the calling string converted to upper case.

## Description

The `toUpperCase()` method returns the value of the string converted to
uppercase. This method does not affect the value of the string itself since JavaScript
strings are immutable.

## Examples

### Basic usage

```js
console.log("alphabet".toUpperCase()); // 'ALPHABET'
```

### Conversion of non-string `this` values to strings

This method will convert any non-string value to a string, when you set its
`this` to a value that is not a string:

```js
const a = String.prototype.toUpperCase.call({
  toString() {
    return "abcdef";
  },
});

const b = String.prototype.toUpperCase.call(true);

// prints out 'ABCDEF TRUE'.
console.log(a, b);
```

## See also

- `String.prototype.toLocaleLowerCase()`
- `String.prototype.toLocaleUpperCase()`
- `String.prototype.toLowerCase()`
