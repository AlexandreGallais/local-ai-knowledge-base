---
title: "Int32Array() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/int32array/int32array/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Int32Array() constructor

The **`Int32Array()`** constructor creates `Int32Array` objects. The contents are initialized to `0` unless initialization data is explicitly provided.

## Syntax

```js
new Int32Array()
new Int32Array(length)
new Int32Array(typedArray)
new Int32Array(object)

new Int32Array(buffer)
new Int32Array(buffer, byteOffset)
new Int32Array(buffer, byteOffset, length)
```

> **Note:**
> `Int32Array()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

See `TypedArray`.

### Exceptions

See `TypedArray`.

## Examples

### Different ways to create an Int32Array

```js
// From a length
const int32 = new Int32Array(2);
int32[0] = 42;
console.log(int32[0]); // 42
console.log(int32.length); // 2
console.log(int32.BYTES_PER_ELEMENT); // 4

// From an array
const x = new Int32Array([21, 31]);
console.log(x[1]); // 31

// From another TypedArray
const y = new Int32Array(x);
console.log(y[0]); // 21

// From an ArrayBuffer
const buffer = new ArrayBuffer(32);
const z = new Int32Array(buffer, 4, 4);
console.log(z.byteOffset); // 4

// From an iterable
const iterable = (function* () {
  yield* [1, 2, 3];
})();
const int32FromIterable = new Int32Array(iterable);
console.log(int32FromIterable);
// Int32Array [1, 2, 3]
```

## See also

- Polyfill of `Int32Array` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `ArrayBuffer`
- `DataView`
