---
title: "TypedArray.prototype.some()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/some/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.some()

The **`some()`** method of `TypedArray` instances returns `true` if it finds an element in the array that satisfies the provided testing function. Otherwise, it returns `false`. This method has the same algorithm as `Array.prototype.some()`.

```js
function isNegative(element, index, array) {
  return element < 0;
}

const int8 = new Int8Array([-10, 20, -30, 40, -50]);
const positives = new Int8Array([10, 20, 30, 40, 50]);

console.log(int8.some(isNegative));
// Expected output: true

console.log(positives.some(isNegative));
// Expected output: false
```

## Syntax

```js
some(callbackFn)
some(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    A function to execute for each element in the typed array. It should return a truthy value to indicate the element passes the test, and a falsy value otherwise. The function is called with the following arguments:
    - `element`
        The current element being processed in the typed array.
    - `index`
        The index of the current element being processed in the typed array.
    - `array`
        The typed array `some()` was called upon.
- `thisArg` (optional)
    A value to use as `this` when executing `callbackFn`. See iterative methods.

### Return value

`false` unless `callbackFn` returns a truthy value for a typed array element, in which case `true` is immediately returned.

## Description

See `Array.prototype.some()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Testing size of all typed array elements

The following example tests whether any element in the typed array is bigger than 10.

```js
function isBiggerThan10(element, index, array) {
  return element > 10;
}
new Uint8Array([2, 5, 8, 1, 4]).some(isBiggerThan10); // false
new Uint8Array([12, 5, 8, 1, 4]).some(isBiggerThan10); // true
```

## See also

- Polyfill of `TypedArray.prototype.some` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.every()`
- `TypedArray.prototype.forEach()`
- `TypedArray.prototype.find()`
- `TypedArray.prototype.includes()`
- `Array.prototype.some()`
