---
title: "TypedArray.prototype.reduce()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/reduce/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.reduce()

The **`reduce()`** method of `TypedArray` instances executes a user-supplied "reducer" callback function on each element of the typed array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the typed array is a single value. This method has the same algorithm as `Array.prototype.reduce()`.

```js
const uint8 = new Uint8Array([0, 1, 2, 3]);

function sum(accumulator, currentValue) {
  return accumulator + currentValue;
}

console.log(uint8.reduce(sum));
// Expected output: 6
```

## Syntax

```js
reduce(callbackFn)
reduce(callbackFn, initialValue)
```

### Parameters

- `callbackFn`
    A function to execute for each element in the typed array. Its return value becomes the value of the `accumulator` parameter on the next invocation of `callbackFn`. For the last invocation, the return value becomes the return value of `reduce()`. The function is called with the following arguments:
    - `accumulator`
        The value resulting from the previous call to `callbackFn`. On the first call, its value is `initialValue` if the latter is specified; otherwise its value is `array[0]`.
    - `currentValue`
        The value of the current element. On the first call, its value is `array[0]` if `initialValue` is specified; otherwise its value is `array[1]`.
    - `currentIndex`
        The index position of `currentValue` in the typed array. On the first call, its value is `0` if `initialValue` is specified, otherwise `1`.
    - `array`
        The typed array `reduce()` was called upon.
- `initialValue` (optional)
    A value to which `accumulator` is initialized the first time the callback is called.
    If `initialValue` is specified, `callbackFn` starts executing with the first value in the typed array as `currentValue`.
    If `initialValue` is _not_ specified, `accumulator` is initialized to the first value in the typed array, and `callbackFn` starts executing with the second value in the typed array as `currentValue`. In this case, if the typed array is empty (so that there's no first value to return as `accumulator`), an error is thrown.

### Return value

The value that results from running the "reducer" callback function to completion over the entire typed array.

### Exceptions

- `TypeError`
    Thrown if the typed array contains no elements and `initialValue` is not provided.

## Description

See `Array.prototype.reduce()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Sum up all values within an array

```js
const total = new Uint8Array([0, 1, 2, 3]).reduce((a, b) => a + b);
// total === 6
```

## See also

- Polyfill of `TypedArray.prototype.reduce` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.map()`
- `TypedArray.prototype.reduceRight()`
- `Array.prototype.reduce()`
- `Object.groupBy()`
- `Map.groupBy()`
