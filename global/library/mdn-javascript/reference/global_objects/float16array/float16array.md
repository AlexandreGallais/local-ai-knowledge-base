---
title: "Float16Array() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/float16array/float16array/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Float16Array() constructor

The **`Float16Array()`** constructor creates `Float16Array` objects. The contents are initialized to `0` unless initialization data is explicitly provided.

## Syntax

```js
new Float16Array()
new Float16Array(length)
new Float16Array(typedArray)
new Float16Array(object)

new Float16Array(buffer)
new Float16Array(buffer, byteOffset)
new Float16Array(buffer, byteOffset, length)
```

> **Note:**
> `Float16Array()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

See `TypedArray`.

### Exceptions

See `TypedArray`.

## Examples

### Different ways to create a Float16Array

```js
// From a length
const float16 = new Float16Array(2);
float16[0] = 42;
console.log(float16[0]); // 42
console.log(float16.length); // 2
console.log(float16.BYTES_PER_ELEMENT); // 2

// From an array
const x = new Float16Array([21, 31]);
console.log(x[1]); // 31

// From another TypedArray
const y = new Float16Array(x);
console.log(y[0]); // 21

// From an ArrayBuffer
const buffer = new ArrayBuffer(32);
const z = new Float16Array(buffer, 4, 4);
console.log(z.byteOffset); // 4

// From an iterable
const iterable = (function* () {
  yield* [1, 2, 3];
})();
const float16FromIterable = new Float16Array(iterable);
console.log(float16FromIterable);
// Float16Array [1, 2, 3]
```

## See also

- JavaScript typed arrays guide
- `TypedArray`
- `ArrayBuffer`
- `DataView`
