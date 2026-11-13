---
title: "SharedArrayBuffer.prototype.grow()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/sharedarraybuffer/grow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedArrayBuffer.prototype.grow()

The **`grow()`** method of `SharedArrayBuffer` instances grows the `SharedArrayBuffer` to the specified size, in bytes.

## Syntax

```js
grow(newLength)
```

### Parameters

- `newLength`
    The new length, in bytes, to resize the `SharedArrayBuffer` to.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the `SharedArrayBuffer` is not growable.
- `RangeError`
    Thrown if `newLength` is larger than the `maxByteLength` of the `SharedArrayBuffer` or smaller than the `byteLength`.

## Description

The `grow()` method grows a `SharedArrayBuffer` to the size specified by the `newLength` parameter, provided that the `SharedArrayBuffer` is growable and the new size is less than or equal to the `maxByteLength` of the `SharedArrayBuffer`. New bytes are initialized to 0.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Using grow()

In this example, we create a 8-byte buffer that is growable to a max length of 16 bytes, then check its `growable` property, growing it if `growable` returns `true`:

```js
const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 });

if (buffer.growable) {
  console.log("SAB is growable!");
  buffer.grow(12);
}
```

## See also

- `SharedArrayBuffer`
- `SharedArrayBuffer.prototype.growable`
- `SharedArrayBuffer.prototype.maxByteLength`
