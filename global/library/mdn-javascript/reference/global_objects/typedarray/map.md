---
title: "TypedArray.prototype.map()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/map/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.map()

The **`map()`** method of `TypedArray` instances creates a new typed array populated with the results of calling a provided function on every element in the calling typed array. This method has the same algorithm as `Array.prototype.map()`.

```js
const uint8 = new Uint8Array([25, 36, 49]);
const roots = uint8.map(Math.sqrt);

console.log(roots);
// Expected output: Uint8Array [5, 6, 7]
```

## Syntax

```js
map(callbackFn)
map(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    A function to execute for each element in the typed array. Its return value is added as a single element in the new typed array. The function is called with the following arguments:
    - `element`
        The current element being processed in the typed array.
    - `index`
        The index of the current element being processed in the typed array.
    - `array`
        The typed array `map()` was called upon.
- `thisArg` (optional)
    A value to use as `this` when executing `callbackFn`. See iterative methods.

### Return value

A new typed array with each element being the result of the callback function.

## Description

See `Array.prototype.map()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Mapping a typed array to a typed array of square roots

The following code takes a typed array and creates a new typed array containing the
square roots of the numbers in the first typed array.

```js
const numbers = new Uint8Array([1, 4, 9]);
const roots = numbers.map(Math.sqrt);
// roots is now: Uint8Array [1, 2, 3],
// numbers is still Uint8Array [1, 4, 9]
```

### Mapping a typed array of numbers using a function containing an argument

The following code shows how `map()` works when a function requiring one
argument is used with it. The argument will automatically be assigned to each element of
the typed array as `map()` loops through the original typed array.

```js
const numbers = new Uint8Array([1, 4, 9]);
const doubles = numbers.map((num) => num * 2);
// doubles is now Uint8Array [2, 8, 18]
// numbers is still Uint8Array [1, 4, 9]
```

## See also

- Polyfill of `TypedArray.prototype.map` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.forEach()`
- `TypedArray.from()`
- `Array.prototype.map()`
- `Map`
