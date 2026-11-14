---
title: "ArrayBuffer.prototype.transferToFixedLength()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/arraybuffer/transfertofixedlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ArrayBuffer.prototype.transferToFixedLength()

The **`transferToFixedLength()`** method of `ArrayBuffer` instances creates a new non-resizable `ArrayBuffer` with the same byte content as this buffer, then detaches this buffer.

## Syntax

```js
transferToFixedLength()
transferToFixedLength(newByteLength)
```

### Parameters

- `newByteLength`
    The `byteLength` of the new `ArrayBuffer`. Defaults to the `byteLength` of this `ArrayBuffer`.
    - If `newByteLength` is smaller than the `byteLength` of this `ArrayBuffer`, the "overflowing" bytes are dropped.
    - If `newByteLength` is larger than the `byteLength` of this `ArrayBuffer`, the extra bytes are filled with zeros.

### Return value

A new `ArrayBuffer` object. Its contents are initialized to the contents of this `ArrayBuffer`, and extra bytes, if any, are filled with zeros. The new `ArrayBuffer` is always non-resizable. The original `ArrayBuffer` is detached.

### Exceptions

- `TypeError`
    Thrown if this `ArrayBuffer` is already detached, or if it can only be detached by designated operations. Currently, only certain web APIs are capable of creating `ArrayBuffer` objects with designated detaching methods, such as `GPUBuffer.getMappedRange()` and `WebAssembly.Memory.buffer`.

## Description

Unlike `transfer()`, `transferToFixedLength()` always creates a non-resizable `ArrayBuffer`. This means `newByteLength` can be larger than the `maxByteLength`, even if this `ArrayBuffer` is resizable. See transferring ArrayBuffers for more information.

## Examples

### Transferring a resizable ArrayBuffer to fixed-length

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const view = new Uint8Array(buffer);
view[1] = 2;
view[7] = 4;

const buffer2 = buffer.transferToFixedLength();
console.log(buffer2.byteLength); // 8
console.log(buffer2.resizable); // false
const view2 = new Uint8Array(buffer2);
console.log(view2[1]); // 2
console.log(view2[7]); // 4
```

Using `transferToFixedLength`, `newByteLength` can be larger than the `maxByteLength` of the original `ArrayBuffer`.

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const view = new Uint8Array(buffer);
view[1] = 2;
view[7] = 4;

const buffer2 = buffer.transferToFixedLength(20);
console.log(buffer2.byteLength); // 20
console.log(buffer2.resizable); // false
const view2 = new Uint8Array(buffer2);
console.log(view2[1]); // 2
console.log(view2[7]); // 4
```

## See also

- Polyfill of `ArrayBuffer.prototype.transferToFixedLength` in `core-js`
- es-shims polyfill of `ArrayBuffer.prototype.transferToFixedLength`
- `ArrayBuffer`
- `ArrayBuffer.prototype.detached`
- `ArrayBuffer.prototype.transfer()`
