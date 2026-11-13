---
title: "TypedArray.prototype.every()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/every/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.every()

The **`every()`** method of `TypedArray` instances returns `false` if it finds an element in the array that does not satisfy the provided testing function. Otherwise, it returns `true`. This method has the same algorithm as `Array.prototype.every()`.

```js
function isNegative(element, index, array) {
  return element < 0;
}

const int8 = new Int8Array([-10, -20, -30, -40, -50]);

console.log(int8.every(isNegative));
// Expected output: true
```

## Syntax

```js
every(callbackFn)
every(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    A function to execute for each element in the typed array. It should return a truthy value to indicate the element passes the test, and a falsy value otherwise. The function is called with the following arguments:
    - `element`
        The current element being processed in the typed array.
    - `index`
        The index of the current element being processed in the typed array.
    - `array`
        The typed array `every()` was called upon.
- `thisArg` (optional)
    A value to use as `this` when executing `callbackFn`. See iterative methods.

### Return value

`true` unless `callbackFn` returns a falsy value for a typed array element, in which case `false` is immediately returned.

## Description

See `Array.prototype.every()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Testing size of all typed array elements

The following example tests whether all elements in the typed array are 10 or bigger.

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
new Uint8Array([12, 5, 8, 130, 44]).every(isBigEnough); // false
new Uint8Array([12, 54, 18, 130, 44]).every(isBigEnough); // true
```

## See also

- Polyfill of `TypedArray.prototype.every` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.forEach()`
- `TypedArray.prototype.some()`
- `TypedArray.prototype.find()`
- `Array.prototype.every()`
