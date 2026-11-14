---
title: "ArrayBuffer.prototype.transfer()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/arraybuffer/transfer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ArrayBuffer.prototype.transfer()

The **`transfer()`** method of `ArrayBuffer` instances creates a new `ArrayBuffer` with the same byte content as this buffer, then detaches this buffer.

## Syntax

```js
transfer()
transfer(newByteLength)
```

### Parameters

- `newByteLength` (optional)
    The `byteLength` of the new `ArrayBuffer`. Defaults to the `byteLength` of this `ArrayBuffer`.
    - If `newByteLength` is smaller than the `byteLength` of this `ArrayBuffer`, the "overflowing" bytes are dropped.
    - If `newByteLength` is larger than the `byteLength` of this `ArrayBuffer`, the extra bytes are filled with zeros.
    - If this `ArrayBuffer` is resizable, `newByteLength` must not be greater than its `maxByteLength`.

### Return value

A new `ArrayBuffer` object. Its contents are initialized to the contents of this `ArrayBuffer`, and extra bytes, if any, are filled with zeros. The new `ArrayBuffer` is resizable if and only if this `ArrayBuffer` is resizable, in which case its `maxByteLength` is the same as this `ArrayBuffer`'s. The original `ArrayBuffer` is detached.

### Exceptions

- `RangeError`
    Thrown if this `ArrayBuffer` is resizable and `newByteLength` is greater than the `maxByteLength` of this `ArrayBuffer`.
- `TypeError`
    Thrown if this `ArrayBuffer` is already detached, or if it can only be detached by designated operations. Currently, only certain web APIs are capable of creating `ArrayBuffer` objects with designated detaching methods, such as `GPUBuffer.getMappedRange()` and `WebAssembly.Memory.buffer`.

## Description

The `transfer()` method performs the same operation as the structured clone algorithm. It copies the bytes of this `ArrayBuffer` into a new `ArrayBuffer` object, then detaches this `ArrayBuffer` object. See transferring ArrayBuffers for more information.

`transfer()` preserves the resizability of this `ArrayBuffer`. If you want the new `ArrayBuffer` to be non-resizable, use `transferToFixedLength()` instead. There's no way to transfer a buffer that makes a fixed-length buffer become resizable.

`transfer()` is very efficient because implementations may implement this method as a zero-copy move or a `realloc` — there does not need to be an actual copy of the data.

## Examples

### Transferring an ArrayBuffer

```js
// Create an ArrayBuffer and write a few bytes
const buffer = new ArrayBuffer(8);
const view = new Uint8Array(buffer);
view[1] = 2;
view[7] = 4;

// Copy the buffer to the same size
const buffer2 = buffer.transfer();
console.log(buffer.detached); // true
console.log(buffer2.byteLength); // 8
const view2 = new Uint8Array(buffer2);
console.log(view2[1]); // 2
console.log(view2[7]); // 4

// Copy the buffer to a smaller size
const buffer3 = buffer2.transfer(4);
console.log(buffer3.byteLength); // 4
const view3 = new Uint8Array(buffer3);
console.log(view3[1]); // 2
console.log(view3[7]); // undefined

// Copy the buffer to a larger size
const buffer4 = buffer3.transfer(8);
console.log(buffer4.byteLength); // 8
const view4 = new Uint8Array(buffer4);
console.log(view4[1]); // 2
console.log(view4[7]); // 0

// Already detached, throws TypeError
buffer.transfer(); // TypeError: Cannot perform ArrayBuffer.prototype.transfer on a detached ArrayBuffer
```

### Transferring a resizable ArrayBuffer

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const view = new Uint8Array(buffer);
view[1] = 2;
view[7] = 4;

// Copy the buffer to a smaller size
const buffer2 = buffer.transfer(4);
console.log(buffer2.byteLength); // 4
console.log(buffer2.maxByteLength); // 16
const view2 = new Uint8Array(buffer2);
console.log(view2[1]); // 2
console.log(view2[7]); // undefined
buffer2.resize(8);
console.log(view2[7]); // 0

// Copy the buffer to a larger size within maxByteLength
const buffer3 = buffer2.transfer(12);
console.log(buffer3.byteLength); // 12

// Copy the buffer to a larger size than maxByteLength
buffer3.transfer(20); // RangeError: Invalid array buffer length
```

## See also

- Polyfill of `ArrayBuffer.prototype.transfer` in `core-js`
- es-shims polyfill of `ArrayBuffer.prototype.transfer`
- `ArrayBuffer`
- `ArrayBuffer.prototype.detached`
- `ArrayBuffer.prototype.transferToFixedLength()`
