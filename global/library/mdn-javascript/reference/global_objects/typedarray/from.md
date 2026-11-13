---
title: "TypedArray.from()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/from/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.from()

The **`TypedArray.from()`** static method creates a new
typed array
from an array-like or iterable object. This method is nearly the same as
`Array.from()`.

```js
const uint16 = Int16Array.from("12345");

console.log(uint16);
// Expected output: Int16Array [1, 2, 3, 4, 5]
```

## Syntax

```js
TypedArray.from(arrayLike, mapFn)
TypedArray.from(arrayLike, mapFn, thisArg)
```

Where `TypedArray` is one of:

- `Int8Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Int16Array`
- `Uint16Array`
- `Int32Array`
- `Uint32Array`
- `Float16Array`
- `Float32Array`
- `Float64Array`
- `BigInt64Array`
- `BigUint64Array`

### Parameters

- `arrayLike`
    An iterable or array-like object to convert to a typed array.
- `mapFn` (optional)
    A function to call on every element of the typed array. If provided, every value to be added to the array is first passed through this function, and `mapFn`'s return value is added to the typed array instead. The function is called with the following arguments:
    - `element`
        The current element being processed in the typed array.
    - `index`
        The index of the current element being processed in the typed array.
- `thisArg` (optional)
    Value to use as `this` when executing `mapFn`.

### Return value

A new `TypedArray` instance.

## Description

See `Array.from()` for more details.

There are some subtle distinctions between `Array.from()` and `TypedArray.from()` (note: the `this` value mentioned below is the `this` value that `TypedArray.from()` was called with, not the `thisArg` argument used to invoke `mapFn`):

- If the `this` value of `TypedArray.from()` is not a constructor, `TypedArray.from()` will throw a `TypeError`, while `Array.from()` defaults to creating a new `Array`.
- The object constructed by `this` must be a `TypedArray` instance, while `Array.from()` allows its `this` value to be constructed to any object.
- When the `source` parameter is an iterator, `TypedArray.from()` first collects all the values from the iterator, then creates an instance of `this` using the count, and finally sets the values on the instance. `Array.from()` sets each value as it receives them from the iterator, then sets its `length` at the end.
- `TypedArray.from()` uses `[[Set]]` while `Array.from()` uses `[[DefineOwnProperty]]`. Hence, when working with `Proxy` objects, it calls `handler.set()` to create new elements rather than `handler.defineProperty()`.
- When `Array.from()` gets an array-like which isn't an iterator, it respects holes. `TypedArray.from()` will ensure the result is dense.

## Examples

### From an iterable object (Set)

```js
const s = new Set([1, 2, 3]);
Uint8Array.from(s);
// Uint8Array [ 1, 2, 3 ]
```

### From a string

```js
Int16Array.from("123");
// Int16Array [ 1, 2, 3 ]
```

### Use with arrow function and map

Using an arrow function as the map function to manipulate the elements

```js
Float32Array.from([1, 2, 3], (x) => x + x);
// Float32Array [ 2, 4, 6 ]
```

### Generate a sequence of numbers

```js
Uint8Array.from({ length: 5 }, (v, k) => k);
// Uint8Array [ 0, 1, 2, 3, 4 ]
```

### Calling from() on non-TypedArray constructors

The `this` value of `from()` must be a constructor that returns a `TypedArray` instance.

```js
function NotArray(len) {
  console.log("NotArray called with length", len);
}

Int8Array.from.call({}, []); // TypeError: #<Object> is not a constructor
Int8Array.from.call(NotArray, []);
// NotArray called with length 0
// TypeError: Method %TypedArray%.from called on incompatible receiver #<NotArray>
```

```js
function NotArray2(len) {
  console.log("NotArray2 called with length", len);
  return new Uint8Array(len);
}
console.log(Int8Array.from.call(NotArray2, [1, 2, 3]));
// NotArray2 called with length 3
// Uint8Array(3) [ 1, 2, 3 ]
```

## See also

- Polyfill of `TypedArray.from` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.of()`
- `TypedArray.prototype.map()`
- `Array.from()`
