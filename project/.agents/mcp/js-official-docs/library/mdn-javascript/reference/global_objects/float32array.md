---
title: "Float32Array"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/float32array/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Float32Array

The **`Float32Array`** typed array represents an array of 32-bit floating point numbers in the platform byte order. If control over byte order is needed, use `DataView` instead. The contents are initialized to `0` unless initialization data is explicitly provided. Once established, you can reference elements in the array using the object's methods, or using standard array index syntax (that is, using bracket notation).

`Float32Array` is a subclass of the hidden `TypedArray` class.

## Constructor

- `Float32Array()`
    Creates a new `Float32Array` object.

## Static properties

_Also inherits static properties from its parent `TypedArray`_.

- `Float32Array.BYTES_PER_ELEMENT`
    Returns a number value of the element size. `4` in the case of `Float32Array`.

## Static methods

_Inherits static methods from its parent `TypedArray`_.

## Instance properties

_Also inherits instance properties from its parent `TypedArray`_.

These properties are defined on `Float32Array.prototype` and shared by all `Float32Array` instances.

- `Float32Array.prototype.BYTES_PER_ELEMENT`
    Returns a number value of the element size. `4` in the case of a `Float32Array`.
- `Float32Array.prototype.constructor`
    The constructor function that created the instance object. For `Float32Array` instances, the initial value is the `Float32Array` constructor.

## Instance methods

_Inherits instance methods from its parent `TypedArray`_.

## Examples

### Different ways to create a Float32Array

```js
// From a length
const float32 = new Float32Array(2);
float32[0] = 42;
console.log(float32[0]); // 42
console.log(float32.length); // 2
console.log(float32.BYTES_PER_ELEMENT); // 4

// From an array
const x = new Float32Array([21, 31]);
console.log(x[1]); // 31

// From another TypedArray
const y = new Float32Array(x);
console.log(y[0]); // 21

// From an ArrayBuffer
const buffer = new ArrayBuffer(32);
const z = new Float32Array(buffer, 4, 4);
console.log(z.byteOffset); // 4

// From an iterable
const iterable = (function* () {
  yield* [1, 2, 3];
})();
const float32FromIterable = new Float32Array(iterable);
console.log(float32FromIterable);
// Float32Array [1, 2, 3]
```

## See also

- Polyfill of `Float32Array` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `ArrayBuffer`
- `DataView`
