---
title: "TypedArray.prototype.toSorted()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/tosorted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.toSorted()

The **`toSorted()`** method of `TypedArray` instances is the copying version of the `sort()` method. It returns a new typed array with the elements sorted in ascending order. This method has the same algorithm as `Array.prototype.toSorted()`, except that it sorts the values numerically instead of as strings by default.

## Syntax

```js
toSorted()
toSorted(compareFn)
```

### Parameters

- `compareFn` (optional)
    A function that determines the order of the elements. If omitted, the typed array elements are sorted according to numeric value. See `sort()` for more information.

### Return value

A new typed array with the elements sorted in ascending order.

## Description

See `Array.prototype.toSorted()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Sorting an array

For more examples, see also the `Array.prototype.sort()` method.

```js
const numbers = new Uint8Array([40, 1, 5, 200]);
const numberSorted = numbers.toSorted();
console.log(numberSorted); // Uint8Array [ 1, 5, 40, 200 ]
// Unlike plain Arrays, a compare function is not required
// to sort the numbers numerically.
console.log(numbers); // Uint8Array [ 40, 1, 5, 200 ]
```

## See also

- Polyfill of `TypedArray.prototype.toSorted` in `core-js`
- JavaScript typed arrays guide
- `TypedArray.prototype.sort()`
- `TypedArray.prototype.toReversed()`
- `TypedArray.prototype.with()`
- `Array.prototype.toSorted()`
