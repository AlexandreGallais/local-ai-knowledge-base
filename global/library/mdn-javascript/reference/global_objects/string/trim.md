---
title: "String.prototype.trim()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/trim/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.trim()

The **`trim()`** method of `String` values removes whitespace from both ends of this string and returns a new string, without modifying the original string.

To return a new string with whitespace trimmed from just one end, use `trimStart()` or `trimEnd()`.

```js
const greeting = "   Hello world!   ";

console.log(greeting);
// Expected output: "   Hello world!   ";

console.log(greeting.trim());
// Expected output: "Hello world!";
```

## Syntax

```js
trim()
```

### Parameters

None.

### Return value

A new string representing `str` stripped of whitespace from both its beginning and end. Whitespace is defined as white space characters plus line terminators.

If neither the beginning nor the end of `str` has any whitespace, a new string is still returned (essentially a copy of `str`).

## Examples

### Using trim()

The following example trims whitespace from both ends of `str`.

```js
const str = "   foo  ";
console.log(str.trim()); // 'foo'
```

## See also

- `String.prototype.trimStart()`
- `String.prototype.trimEnd()`
