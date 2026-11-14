---
title: "String.prototype.repeat()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/repeat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.repeat()

The **`repeat()`** method of `String` values constructs and returns a new string
which contains the specified number of copies of this string, concatenated together.

```js
const mood = "Happy! ";

console.log(`I feel ${mood.repeat(3)}`);
// Expected output: "I feel Happy! Happy! Happy! "
```

## Syntax

```js
repeat(count)
```

### Parameters

- `count`
    An integer between `0` and `Infinity`, indicating the number of times to repeat the string.

### Return value

A new string containing the specified number of copies of the given string.

### Exceptions

- `RangeError`
    Thrown if `count` is negative or if `count` overflows maximum string length.

## Examples

### Using repeat()

```js
"abc".repeat(-1); // RangeError
"abc".repeat(0); // ''
"abc".repeat(1); // 'abc'
"abc".repeat(2); // 'abcabc'
"abc".repeat(3.5); // 'abcabcabc' (count will be converted to integer)
"abc".repeat(1 / 0); // RangeError

({ toString: () => "abc", repeat: String.prototype.repeat }).repeat(2);
// 'abcabc' (repeat() is a generic method)
```

## See also

- Polyfill of `String.prototype.repeat` in `core-js`
- es-shims polyfill of `String.prototype.repeat`
- `String.prototype.concat()`
