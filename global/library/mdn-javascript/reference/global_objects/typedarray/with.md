---
title: "TypedArray.prototype.with()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/with/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.with()

The **`with()`** method of `TypedArray` instances is the copying version of using the bracket notation to change the value of a given index. It returns a new typed array with the element at the given index replaced with the given value. This method has the same algorithm as `Array.prototype.with()`.

## Syntax

```js
arrayInstance.with(index, value)
```

### Parameters

- `index`
    Zero-based index at which to change the typed array, converted to an integer.
- `value`
    Any value to be assigned to the given index.

### Return value

A new typed array with the element at `index` replaced with `value`.

### Exceptions

- `RangeError`
    Thrown if `index >= array.length` or `index < -array.length`.

## Description

See `Array.prototype.with()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using with()

```js
const arr = new Uint8Array([1, 2, 3, 4, 5]);
console.log(arr.with(2, 6)); // Uint8Array [1, 2, 6, 4, 5]
console.log(arr); // Uint8Array [1, 2, 3, 4, 5]
```

## See also

- Polyfill of `TypedArray.prototype.with` in `core-js`
- JavaScript typed arrays guide
- `TypedArray.prototype.toReversed()`
- `TypedArray.prototype.toSorted()`
- `TypedArray.prototype.at()`
- `Array.prototype.with()`
