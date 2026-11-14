---
title: "Uint8Array.fromHex()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/uint8array/fromhex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Uint8Array.fromHex()

The **`Uint8Array.fromHex()`** static method creates a new `Uint8Array` object from a hexadecimal string.

This method parses the string into a byte array. To convert the string into a single number, use the `parseInt()` function with `radix` set to `16` instead.

## Syntax

```js
Uint8Array.fromHex(string)
```

### Parameters

- `string`
    A hexadecimal string encoding bytes to convert to a `Uint8Array`. The string must:
    - Have an even number of characters because two characters encode one byte.
    - Only contain characters in the hexadecimal alphabet, which includes 0–9 and A–F (case-insensitive).
    - Not contain whitespace (unlike `Uint8Array.prototype.setFromBase64()`).

### Return value

A new `Uint8Array` object containing the decoded bytes from the hexadecimal string.

### Exceptions

- `SyntaxError`
    Thrown if the input string contains characters outside the hex alphabet, or its length is odd.
- `TypeError`
    Thrown if the input string is not a string.

## Examples

### Decoding a hexadecimal string

This example decodes a hexadecimal string into a `Uint8Array`.

```js
const hexString = "cafed00d";
const bytes = Uint8Array.fromHex(hexString);
console.log(bytes); // Uint8Array [ 202, 254, 208, 13 ]
```

Uppercase characters are also supported:

```js
const hexString = "CAFEd00d";
const bytes = Uint8Array.fromHex(hexString);
console.log(bytes); // Uint8Array [ 202, 254, 208, 13 ]
```

## See also

- Polyfill of `Uint8Array.fromHex` in `core-js`
- es-shims polyfill of `Uint8Array.fromHex`
- `Uint8Array`
- `Uint8Array.prototype.setFromHex()`
- `Uint8Array.prototype.toHex()`
- `parseInt()`
