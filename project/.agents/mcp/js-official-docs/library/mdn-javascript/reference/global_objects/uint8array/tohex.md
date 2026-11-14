---
title: "Uint8Array.prototype.toHex()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/uint8array/tohex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Uint8Array.prototype.toHex()

The **`toHex()`** method of `Uint8Array` instances returns a hex-encoded string based on the data in this `Uint8Array` object.

This method creates strings from a byte array. To convert individual numbers into hex, use the `Number.prototype.toString()` method with `radix` set to `16` instead.

## Syntax

```js
toHex()
```

### Parameters

None.

### Return value

A hex-encoded string representing the data in the `Uint8Array`.

## Examples

### Encoding binary data

This example encodes data from a `Uint8Array` into a hex string.

```js
const uint8Array = new Uint8Array([202, 254, 208, 13]);
console.log(uint8Array.toHex()); // "cafed00d"

const data = new Uint8Array([255, 0, 0, 0, 255, 0, 0, 0, 255]);
for (let i = 0; i < data.length; i += 3) {
  console.log(data.slice(i, i + 3).toHex());
}
// "ff0000"
// "00ff00"
// "0000ff"
```

## See also

- Polyfill of `Uint8Array.prototype.toHex` in `core-js`
- es-shims polyfill of `Uint8Array.prototype.toHex`
- `Uint8Array`
- `Uint8Array.fromHex()`
- `Uint8Array.prototype.setFromHex()`
- `Number.prototype.toString()`
