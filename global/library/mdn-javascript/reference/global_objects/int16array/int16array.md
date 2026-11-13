---
title: "Int16Array() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/int16array/int16array/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Int16Array() constructor

The **`Int16Array()`** constructor creates `Int16Array` objects. The contents are initialized to `0` unless initialization data is explicitly provided.

## Syntax

```js
new Int16Array()
new Int16Array(length)
new Int16Array(typedArray)
new Int16Array(object)

new Int16Array(buffer)
new Int16Array(buffer, byteOffset)
new Int16Array(buffer, byteOffset, length)
```

> **Note:**
> `Int16Array()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

See `TypedArray`.

### Exceptions

See `TypedArray`.

## Examples

### Different ways to create an Int16Array

```js
// From a length
const int16 = new Int16Array(2);
int16[0] = 42;
console.log(int16[0]); // 42
console.log(int16.length); // 2
console.log(int16.BYTES_PER_ELEMENT); // 2

// From an array
const x = new Int16Array([21, 31]);
console.log(x[1]); // 31

// From another TypedArray
const y = new Int16Array(x);
console.log(y[0]); // 21

// From an ArrayBuffer
const buffer = new ArrayBuffer(16);
const z = new Int16Array(buffer, 2, 4);
console.log(z.byteOffset); // 2

// From an iterable
const iterable = (function* () {
  yield* [1, 2, 3];
})();
const int16FromIterable = new Int16Array(iterable);
console.log(int16FromIterable);
// Int16Array [1, 2, 3]
```

## See also

- Polyfill of `Int16Array` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `ArrayBuffer`
- `DataView`
