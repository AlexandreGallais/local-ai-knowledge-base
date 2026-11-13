---
title: "TypedArray.prototype.indexOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/indexof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.indexOf()

The **`indexOf()`** method of `TypedArray` instances returns the first index at which a given element can be found in the typed array, or -1 if it is not present. This method has the same algorithm as `Array.prototype.indexOf()`.

```js
const uint8 = new Uint8Array([10, 20, 30, 40, 50]);

console.log(uint8.indexOf(50));
// Expected output: 4

// From position 3
console.log(uint8.indexOf(20, 3));
// Expected output: -1

console.log(uint8.indexOf(51));
// Expected output: -1
```

## Syntax

```js
indexOf(searchElement)
indexOf(searchElement, fromIndex)
```

### Parameters

- `searchElement`
    Element to locate in the typed array.
- `fromIndex` (optional)
    Zero-based index at which to start searching, converted to an integer.

### Return value

The first index of `searchElement` in the typed array; `-1` if not found.

## Description

See `Array.prototype.indexOf()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using indexOf()

```js
const uint8 = new Uint8Array([2, 5, 9]);
uint8.indexOf(2); // 0
uint8.indexOf(7); // -1
uint8.indexOf(9, 2); // 2
uint8.indexOf(2, -1); // -1
uint8.indexOf(2, -3); // 0
```

## See also

- Polyfill of `TypedArray.prototype.indexOf` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.findIndex()`
- `TypedArray.prototype.findLastIndex()`
- `TypedArray.prototype.lastIndexOf()`
- `Array.prototype.indexOf()`
- `String.prototype.indexOf()`
