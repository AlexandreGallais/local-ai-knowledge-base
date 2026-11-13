---
title: "TypedArray (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray

A **_TypedArray_** object describes an array-like view of an
underlying binary data buffer.
There is no global property named `TypedArray`, nor is there a
directly visible `TypedArray` constructor. Instead, there are a number of
different global properties, whose values are typed array constructors for specific
element types, listed below. On the following pages you will find common properties and
methods that can be used with any typed array containing elements of any type.

## Description

The `TypedArray` constructor (often referred to as `%TypedArray%` to indicate its "intrinsicness", since it does not correspond to any global exposed to a JavaScript program) serves as the common superclass of all `TypedArray` subclasses. Think about `%TypedArray%` as an "abstract class" providing a common interface of utility methods for all typed array subclasses. This constructor is not directly exposed: there is no global `TypedArray` property. It is only accessible through `Object.getPrototypeOf(Int8Array)` and similar.

When creating an instance of a `TypedArray` subclass (e.g., `Int8Array`), an array buffer is created internally in memory or, if an `ArrayBuffer` object is given as constructor argument, that `ArrayBuffer` is used instead. The buffer address is saved as an internal property of the instance and all the methods of `%TypedArray%.prototype` will set and get values based on that array buffer address.

### TypedArray objects

| Type                            | Value Range                           | Size in bytes | Web IDL type          |
| ------------------------------- | ------------------------------------- | ------------- | --------------------- |
| `Int8Array`         | -128 to 127                           | 1             | `byte`                |
| `Uint8Array`        | 0 to 255                              | 1             | `octet`               |
| `Uint8ClampedArray` | 0 to 255                              | 1             | `octet`               |
| `Int16Array`        | -32768 to 32767                       | 2             | `short`               |
| `Uint16Array`       | 0 to 65535                            | 2             | `unsigned short`      |
| `Int32Array`        | -2147483648 to 2147483647             | 4             | `long`                |
| `Uint32Array`       | 0 to 4294967295                       | 4             | `unsigned long`       |
| `Float16Array`      | `-65504` to `65504`                   | 2             | N/A                   |
| `Float32Array`      | `-3.4e38` to `3.4e38`                 | 4             | `unrestricted float`  |
| `Float64Array`      | `-1.8e308` to `1.8e308`               | 8             | `unrestricted double` |
| `BigInt64Array`     | -263 to 263 - 1 | 8             | `bigint`              |
| `BigUint64Array`    | 0 to 264 - 1               | 8             | `bigint`              |

### Value encoding and normalization

All typed arrays operate on `ArrayBuffer`s, where you can observe the exact byte representation of each element, so how the numbers are encoded in binary format is significant.

- Unsigned integer arrays (`Uint8Array`, `Uint16Array`, `Uint32Array`, and `BigUint64Array`) store the number directly in binary.
- Signed integer arrays (`Int8Array`, `Int16Array`, `Int32Array`, and `BigInt64Array`) store the number using two's complement.
- Floating-point arrays (`Float16Array`, `Float32Array`, and `Float64Array`) store the number using IEEE 754 floating-point format. The `Number` reference has more information about the exact format. JavaScript numbers use double precision floating point format by default, which is the same as `Float64Array`. `Float32Array` uses 23 (instead of 52) bits for the mantissa and 8 (instead of 11) bits for the exponent. `Float16Array` uses 10 bits for the mantissa and 5 bits for the exponent. Note that the spec requires all `NaN` values to use the same bit encoding, but the exact bit pattern is implementation-dependent.
- `Uint8ClampedArray` is a special case. It stores the number in binary like `Uint8Array` does, but when you store a number outside the range, it _clamps_ the number to the range 0 to 255 by mathematical value, instead of truncating the most significant bits.

All typed arrays except `Int8Array`, `Uint8Array`, and `Uint8ClampedArray` store each element using multiple bytes. These bytes can either be ordered from most significant to least significant (big-endian) or from least significant to most significant (little-endian). See Endianness for more explanation. Typed arrays always use the platform's native byte order. If you want to specify the endianness when writing and reading from buffers, you should use a `DataView` instead.

When writing to these typed arrays, values that are outside the representable range are normalized.

- All integer arrays (except `Uint8ClampedArray`) use fixed-width number conversion, which first truncates the decimal part of the number and then takes the lowest bits.
- `Uint8ClampedArray` first clamps the number to the range 0 to 255 (values greater than 255 become 255 and values less than 0 become 0). It then _rounds_ (instead of flooring) the result to the nearest integer, with half-to-even; meaning if the number is exactly between two integers, it rounds to the nearest even integer. For example, `0.5` becomes `0`, `1.5` becomes `2`, and `2.5` becomes `2`.
- `Float16Array` and `Float32Array` perform a "round to even" to convert 64-bit floating point numbers to 32-bit and 16-bit. This is the same algorithm as provided by `Math.fround()` and `Math.f16round()`.

### Behavior when viewing a resizable buffer

When a `TypedArray` is created as a view of a resizable buffer, resizing the underlying buffer will have different effects on the size of the `TypedArray` depending on whether the `TypedArray` is constructed as length-tracking.

If a typed array is created without a specific size by omitting the third parameter or passing `undefined`, the typed array will become _length-tracking_, and will automatically resize to fit the underlying `buffer` as the latter is resized:

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const float32 = new Float32Array(buffer);

console.log(float32.byteLength); // 8
console.log(float32.length); // 2

buffer.resize(12);

console.log(float32.byteLength); // 12
console.log(float32.length); // 3
```

If a typed array is created with a specific size using the third `length` parameter, it won't resize to contain the `buffer` as the latter is grown:

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const float32 = new Float32Array(buffer, 0, 2);

console.log(float32.byteLength); // 8
console.log(float32.length); // 2
console.log(float32[0]); // 0, the initial value

buffer.resize(12);

console.log(float32.byteLength); // 8
console.log(float32.length); // 2
console.log(float32[0]); // 0, the initial value
```

When a `buffer` is shrunk, the viewing typed array may become out of bounds, in which case the typed array's observed size will decrease to 0. This is the only case where a non-length-tracking typed array's length may change.

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const float32 = new Float32Array(buffer, 0, 2);

buffer.resize(7);

console.log(float32.byteLength); // 0
console.log(float32.length); // 0
console.log(float32[0]); // undefined
```

If you then grow the `buffer` again to bring the typed array back in bounds, the typed array's size will be restored to its original value.

```js
buffer.resize(8);

console.log(float32.byteLength); // 8
console.log(float32.length); // 2
console.log(float32[0]); // 0 - back in bounds again!
```

The same can happen for length-tracking typed arrays as well, if the buffer is shrunk beyond the `byteOffset`.

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const float32 = new Float32Array(buffer, 4);
// float32 is length-tracking, but it only extends from the 4th byte
// to the end of the buffer, so if the buffer is resized to be shorter
// than 4 bytes, the typed array will become out of bounds
buffer.resize(3);
console.log(float32.byteLength); // 0
```

## Constructor

This object cannot be instantiated directly — attempting to construct it with `new` throws a `TypeError`.

```js
new (Object.getPrototypeOf(Int8Array))();
// TypeError: Abstract class TypedArray not directly constructable
```

Instead, you create an instance of a typed array of a particular type, such as an `Int8Array` or a `BigInt64Array`. These objects all have a common syntax for their constructors:

```js
new TypedArray()
new TypedArray(length)
new TypedArray(typedArray)
new TypedArray(object)

new TypedArray(buffer)
new TypedArray(buffer, byteOffset)
new TypedArray(buffer, byteOffset, length)
```

Where `TypedArray` is a constructor for one of the concrete types.

> **Note:**
> All `TypedArray` subclasses' constructors can only be constructed with `new`. Attempting to call one without `new` throws a `TypeError`.

### Parameters

- `typedArray`
    When called with an instance of a `TypedArray` subclass, the `typedArray` gets copied into a new typed array. For a non-bigint `TypedArray` constructor, the `typedArray` parameter can only be of one of the non-bigint types (such as `Int32Array`). Similarly, for a bigint `TypedArray` constructor (`BigInt64Array` or `BigUint64Array`), the `typedArray` parameter can only be of one of the bigint types. Each value in `typedArray` is converted to the corresponding type of the constructor before being copied into the new array. The length of the new typed array will be same as the length of the `typedArray` argument.
- `object`
    When called with an object that's not a `TypedArray` instance, a new typed array is created in the same way as the `TypedArray.from()` method.
- `length` (optional)
    When called with a non-object, the parameter will be treated as a number specifying the length of the typed array. An internal array buffer is created in memory, of size `length` multiplied by `BYTES_PER_ELEMENT` bytes, filled with zeros. Omitting all parameters is equivalent to using `0` as `length`.
- `buffer`, `byteOffset` (optional), `length` (optional)
    When called with an `ArrayBuffer` or `SharedArrayBuffer` instance, and optionally a `byteOffset` and a `length` argument, a new typed array view is created that views the specified buffer. The `byteOffset` (in bytes) and `length` (in number of elements, each occupying `BYTES_PER_ELEMENT` bytes) parameters specify the memory range that will be exposed by the typed array view. If both are omitted, all of `buffer` is viewed; if only `length` is omitted, the remainder of `buffer` starting from `byteOffset` is viewed. If `length` is omitted, the typed array becomes length-tracking.

### Exceptions

All `TypeArray` subclass constructors operate in the same way. They would all throw the following exceptions:

- `TypeError`
    Thrown in one of the following cases:
    - A `typedArray` is passed but it is a bigint type while the current constructor is not, or vice versa.
    - A `typedArray` is passed but the buffer it's viewing is detached, or a detached `buffer` is directly passed.
- `RangeError`
    Thrown in one of the following cases:
    - The new typed array's length is too large.
    - The length of `buffer` (if the `length` parameter is not specified) or `byteOffset` is not an integral multiple of the new typed array's element size.
    - `byteOffset` is not a valid array index (an integer between 0 and 253 - 1).
    - When creating a view from a buffer, the bounds are outside the buffer. In other words, `byteOffset + length * TypedArray.BYTES_PER_ELEMENT > buffer.byteLength`.

## Static properties

These properties are defined on the `TypedArray` constructor object and are thus shared by all `TypedArray` subclass constructors.

- `TypedArray[Symbol.species]`
    The constructor function used to create derived objects.

All `TypedArray` subclasses also have the following static properties:

- `TypedArray.BYTES_PER_ELEMENT`
    Returns a number value of the element size for the different `TypedArray` objects.

## Static methods

These methods are defined on the `TypedArray` constructor object and are thus shared by all `TypedArray` subclass constructors.

- `TypedArray.from()`
    Creates a new `TypedArray` from an array-like or iterable object. See also `Array.from()`.
- `TypedArray.of()`
    Creates a new `TypedArray` with a variable number of arguments. See also `Array.of()`.

## Instance properties

These properties are defined on `TypedArray.prototype` and shared by all `TypedArray` subclass instances.

- `TypedArray.prototype.buffer`
    Returns the `ArrayBuffer` referenced by the typed array.
- `TypedArray.prototype.byteLength`
    Returns the length (in bytes) of the typed array.
- `TypedArray.prototype.byteOffset`
    Returns the offset (in bytes) of the typed array from the start of its `ArrayBuffer`.
- `TypedArray.prototype.constructor`
    The constructor function that created the instance object. `TypedArray.prototype.constructor` is the hidden `TypedArray` constructor function, but each typed array subclass also defines its own `constructor` property.
- `TypedArray.prototype.length`
    Returns the number of elements held in the typed array.
- `TypedArray.prototype[Symbol.toStringTag]`
    The initial value of the `TypedArray.prototype[Symbol.toStringTag]` property is a getter that returns the same string as the typed array constructor's name. It returns `undefined` if the `this` value is not one of the typed array subclasses. This property is used in `Object.prototype.toString()`. However, because `TypedArray` also has its own `toString()` method, this property is not used unless you call `Object.prototype.toString.call()` with a typed array as `thisArg`.

All `TypedArray` subclasses also have the following instance properties:

- `TypedArray.prototype.BYTES_PER_ELEMENT`
    Returns a number value of the element size for the different `TypedArray` objects.
