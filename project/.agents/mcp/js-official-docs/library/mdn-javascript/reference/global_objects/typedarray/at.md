---
title: "TypedArray.prototype.at()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/at/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.at()

The **`at()`** method of `TypedArray` instances takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the typed array. This method has the same algorithm as `Array.prototype.at()`.

```js
const int8 = new Int8Array([0, 10, -10, 20, -30, 40, -50]);

let index = 1;

console.log(`An index of ${index} returns the item ${int8.at(index)}`);
// Expected output: "An index of 1 returns the item 10"

index = -2;

console.log(`An index of ${index} returns the item ${int8.at(index)}`);
// Expected output: "An index of -2 returns the item 40"
```

## Syntax

```js
at(index)
```

### Parameters

- `index`
    Zero-based index of the typed array element to be returned, converted to an integer. Negative index counts back from the end of the typed array — if `index < 0`, `index + array.length` is accessed.

### Return value

The element in the typed array matching the given index. Always returns `undefined` if `index < -array.length` or `index >= array.length` without attempting to access the corresponding property.

## Description

See `Array.prototype.at()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Return the last value of a typed array

The following example provides a function which returns the last element found in a specified array.

```js
const uint8 = new Uint8Array([1, 2, 4, 7, 11, 18]);

// A function which returns the last item of a given array
function returnLast(arr) {
  return arr.at(-1);
}

const lastItem = returnLast(uint8);
console.log(lastItem); // 18
```

### Comparing methods

Here we compare different ways to select the penultimate (last but one) item of a `TypedArray`. While all below methods are valid, it highlights the succinctness and readability of the `at()` method.

```js
// Our typed array with values
const uint8 = new Uint8Array([1, 2, 4, 7, 11, 18]);

// Using length property
const lengthWay = uint8[uint8.length - 2];
console.log(lengthWay); // 11

// Using slice() method. Note an array is returned
const sliceWay = uint8.slice(-2, -1);
console.log(sliceWay[0]); // 11

// Using at() method
const atWay = uint8.at(-2);
console.log(atWay); // 11
```

## See also

- Polyfill of `TypedArray.prototype.at` in `core-js`
- es-shims polyfill of `TypedArray.prototype.at`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.findIndex()`
- `TypedArray.prototype.indexOf()`
- `TypedArray.prototype.with()`
- `Array.prototype.at()`
- `String.prototype.at()`
