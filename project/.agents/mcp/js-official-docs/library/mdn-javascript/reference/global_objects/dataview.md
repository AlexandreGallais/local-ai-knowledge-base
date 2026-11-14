---
title: "DataView"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/dataview/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataView

The **`DataView`** view provides a low-level interface for reading and writing multiple number types in a binary `ArrayBuffer`, without having to care about the platform's endianness.

## Description

### Endianness

Multi-byte number formats are represented in memory differently depending on machine architecture — see Endianness for an explanation. `DataView` accessors provide explicit control of how data is accessed, regardless of the executing computer's endianness. For example, WebAssembly memory is always little-endian, so you should use `DataView` instead of typed arrays to read and write multi-byte values. See `WebAssembly.Memory` for an example.

```js
const littleEndian = (() => {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
  // Int16Array uses the platform's endianness.
  return new Int16Array(buffer)[0] === 256;
})();
console.log(littleEndian); // true or false
```

> **Note:**
> `DataView` defaults to big-endian read and write, but most platforms use little-endian.

## Constructor

- `DataView()`
    Creates a new `DataView` object.

## Instance properties

These properties are defined on `DataView.prototype` and shared by all `DataView` instances.

- `DataView.prototype.buffer`
    Returns the `ArrayBuffer` referenced by the `DataView`.
- `DataView.prototype.byteLength`
    Returns the length (in bytes) of the `DataView`.
- `DataView.prototype.byteOffset`
    Returns the offset (in bytes) of the `DataView` from the start of its `ArrayBuffer`.
- `DataView.prototype.constructor`
    The constructor function that created the instance object. For `DataView` instances, the initial value is the `DataView` constructor.
- `DataView.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"DataView"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `DataView.prototype.getBigInt64()`
    Reads 8 bytes starting at the specified byte offset of this `DataView` and interprets them as a 64-bit signed integer.
- `DataView.prototype.getBigUint64()`
    Reads 8 bytes starting at the specified byte offset of this `DataView` and interprets them as a 64-bit unsigned integer.
- `DataView.prototype.getFloat16()`
    Reads 2 bytes starting at the specified byte offset of this `DataView` and interprets them as a 16-bit floating point number.
- `DataView.prototype.getFloat32()`
    Reads 4 bytes starting at the specified byte offset of this `DataView` and interprets them as a 32-bit floating point number.
- `DataView.prototype.getFloat64()`
    Reads 8 bytes starting at the specified byte offset of this `DataView` and interprets them as a 64-bit floating point number.
- `DataView.prototype.getInt16()`
    Reads 2 bytes starting at the specified byte offset of this `DataView` and interprets them as a 16-bit signed integer.
- `DataView.prototype.getInt32()`
    Reads 4 bytes starting at the specified byte offset of this `DataView` and interprets them as a 32-bit signed integer.
- `DataView.prototype.getInt8()`
    Reads 1 byte at the specified byte offset of this `DataView` and interprets it as an 8-bit signed integer.
- `DataView.prototype.getUint16()`
    Reads 2 bytes starting at the specified byte offset of this `DataView` and interprets them as a 16-bit unsigned integer.
- `DataView.prototype.getUint32()`
    Reads 4 bytes starting at the specified byte offset of this `DataView` and interprets them as a 32-bit unsigned integer.
- `DataView.prototype.getUint8()`
    Reads 1 byte at the specified byte offset of this `DataView` and interprets it as an 8-bit unsigned integer.
- `DataView.prototype.setBigInt64()`
    Takes a BigInt and stores it as a 64-bit signed integer in the 8 bytes starting at the specified byte offset of this `DataView`.
- `DataView.prototype.setBigUint64()`
    Takes a BigInt and stores it as a 64-bit unsigned integer in the 8 bytes starting at the specified byte offset of this `DataView`.
- `DataView.prototype.setFloat16()`
    Takes a number and stores it as a 16-bit float in the 2 bytes starting at the specified byte offset of this `DataView`.
- `DataView.prototype.setFloat32()`
    Takes a number and stores it as a 32-bit float in the 4 bytes starting at the specified byte offset of this `DataView`.
- `DataView.prototype.setFloat64()`
    Takes a number and stores it as a 64-bit float in the 8 bytes starting at the specified byte offset of this `DataView`.
- `DataView.prototype.setInt16()`
    Takes a number and stores it as a 16-bit signed integer in the 2 bytes at the specified byte offset of this `DataView`.
- `DataView.prototype.setInt32()`
    Takes a number and stores it as a 32-bit signed integer in the 4 bytes at the specified byte offset of this `DataView`.
- `DataView.prototype.setInt8()`
    Takes a number and stores it as an 8-bit signed integer in the byte at the specified byte offset of this `DataView`.
- `DataView.prototype.setUint16()`
    Takes a number and stores it as a 16-bit unsigned integer in the 2 bytes at the specified byte offset of this `DataView`.
- `DataView.prototype.setUint32()`
    Takes a number and stores it as a 32-bit unsigned integer in the 4 bytes at the specified byte offset of this `DataView`.
- `DataView.prototype.setUint8()`
    Takes a number and stores it as an 8-bit unsigned integer in the byte at the specified byte offset of this `DataView`.

## Examples

### Using DataView

```js
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer, 0);

view.setInt16(1, 42);
view.getInt16(1); // 42
```

## See also

- Polyfill of `DataView` in `core-js`
- `ArrayBuffer`
- `SharedArrayBuffer`
