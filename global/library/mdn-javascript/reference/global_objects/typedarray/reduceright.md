---
title: "TypedArray.prototype.reduceRight()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/reduceright/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.reduceRight()

The **`reduceRight()`** method of `TypedArray` instances applies a function against an accumulator and each value of the typed array (from right-to-left) to reduce it to a single value. This method has the same algorithm as `Array.prototype.reduceRight()`.

```js
const uint8 = new Uint8Array([10, 20, 30]);

const result = uint8.reduceRight(
  (accumulator, currentValue) => `${accumulator}, ${currentValue}`,
);

console.log(result);
// Expected output: "30, 20, 10"
```

## Syntax

```js
reduceRight(callbackFn)
reduceRight(callbackFn, initialValue)
```

### Parameters

- `callbackFn`
    A function to execute for each element in the typed array. Its return value becomes the value of the `accumulator` parameter on the next invocation of `callbackFn`. For the last invocation, the return value becomes the return value of `reduceRight()`. The function is called with the following arguments:
    - `accumulator`
        The value resulting from the previous call to `callbackFn`. On the first call, its value is `initialValue` if the latter is specified; otherwise its value is the last element of the typed array.
    - `currentValue`
        The value of the current element. On the first call, its value is the last element if `initialValue` is specified; otherwise its value is the second-to-last element.
    - `currentIndex`
        The index position of `currentValue` in the typed array. On the first call, its value is `array.length - 1` if `initialValue` is specified, otherwise `array.length - 2`.
    - `array`
        The typed array `reduceRight()` was called upon.
- `initialValue` (optional)
    Value to use as accumulator to the first call of the `callbackFn`. If no initial value is supplied, the last element in the typed array will be used and skipped. Calling `reduceRight()` on an empty typed array without an initial value creates a `TypeError`.

### Return value

The value that results from the reduction.

## Description

See `Array.prototype.reduceRight()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Sum up all values within an array

```js
const total = new Uint8Array([0, 1, 2, 3]).reduceRight((a, b) => a + b);
// total === 6
```

## See also

- Polyfill of `TypedArray.prototype.reduceRight` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.map()`
- `TypedArray.prototype.reduce()`
- `Array.prototype.reduceRight()`
- `Object.groupBy()`
- `Map.groupBy()`
