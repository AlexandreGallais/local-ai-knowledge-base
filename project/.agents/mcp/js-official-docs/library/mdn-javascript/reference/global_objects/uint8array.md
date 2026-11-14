---
title: "Uint8Array"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/uint8array/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Uint8Array

The **`Uint8Array`** typed array represents an array of 8-bit unsigned integers. The contents are initialized to `0` unless initialization data is explicitly provided. Once established, you can reference elements in the array using the object's methods, or using standard array index syntax (that is, using bracket notation).

`Uint8Array` is a subclass of the hidden `TypedArray` class.

## Description

`Uint8Array` is currently the only `TypedArray` subclass that has additional methods compared to other typed arrays. Because of its nature as a generic byte array, it is the most suitable for working with arbitrary binary data. It supports two sets of methods for the creation, serialization, and modification of `Uint8Array` data to/from hex strings and base64 strings.

- `Uint8Array.fromBase64()`, `Uint8Array.prototype.toBase64()`, and `Uint8Array.prototype.setFromBase64()` for working with base64 strings, where 3 bytes are encoded by 4 characters that are either 0–9, A–Z, a–z, "+", and "/" (or "-" and "\_", if using URL-safe base64).
- `Uint8Array.fromHex()`, `Uint8Array.prototype.toHex()`, and `Uint8Array.prototype.setFromHex()` for working with hex strings, where every byte is encoded by two characters, each one being either 0–9 or A–F (case-insensitive).

## Constructor

- `Uint8Array()`
    Creates a new `Uint8Array` object.

## Static properties

_Also inherits static properties from its parent `TypedArray`_.

- `Uint8Array.BYTES_PER_ELEMENT`
    Returns a number value of the element size. `1` in the case of `Uint8Array`.

## Static methods

_Inherits static methods from its parent `TypedArray`_.

- `Uint8Array.fromBase64()`
    Creates a new `Uint8Array` object from a base64-encoded string.
- `Uint8Array.fromHex()`
    Creates a new `Uint8Array` object from a hex-encoded string.

## Instance properties

_Also inherits instance properties from its parent `TypedArray`_.

These properties are defined on `Uint8Array.prototype` and shared by all `Uint8Array` instances.

- `Uint8Array.prototype.BYTES_PER_ELEMENT`
    Returns a number value of the element size. `1` in the case of a `Uint8Array`.
- `Uint8Array.prototype.constructor`
    The constructor function that created the instance object. For `Uint8Array` instances, the initial value is the `Uint8Array` constructor.

## Instance methods

_Inherits instance methods from its parent `TypedArray`_.

- `Uint8Array.prototype.setFromBase64()`
    Populates this `Uint8Array` object with bytes from a base64-encoded string, returning an object indicating how many bytes were read and written.
- `Uint8Array.prototype.setFromHex()`
    Populates this `Uint8Array` object with bytes from a hex-encoded string, returning an object indicating how many bytes were read and written.
- `Uint8Array.prototype.toBase64()`
    Returns a base64-encoded string based on the data in this `Uint8Array` object.
- `Uint8Array.prototype.toHex()`
    Returns a hex-encoded string based on the data in this `Uint8Array` object.

## Examples

### Different ways to create a Uint8Array

```js
// From a length
const uint8 = new Uint8Array(2);
uint8[0] = 42;
console.log(uint8[0]); // 42
console.log(uint8.length); // 2
console.log(uint8.BYTES_PER_ELEMENT); // 1

// From an array
const x = new Uint8Array([21, 31]);
console.log(x[1]); // 31

// From another TypedArray
const y = new Uint8Array(x);
console.log(y[0]); // 21

// From an ArrayBuffer
const buffer = new ArrayBuffer(8);
const z = new Uint8Array(buffer, 1, 4);
console.log(z.byteOffset); // 1

// From an iterable
const iterable = (function* () {
  yield* [1, 2, 3];
})();
const uint8FromIterable = new Uint8Array(iterable);
console.log(uint8FromIterable);
// Uint8Array [1, 2, 3]
```

## See also

- Polyfill of `Uint8Array` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `ArrayBuffer`
- `DataView`
