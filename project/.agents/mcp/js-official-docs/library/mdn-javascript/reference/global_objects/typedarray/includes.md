---
title: "TypedArray.prototype.includes()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/includes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.includes()

The **`includes()`** method of `TypedArray` instances determines whether a typed array includes a certain value among its entries, returning `true` or `false` as appropriate. This method has the same algorithm as `Array.prototype.includes()`.

```js
const uint8 = new Uint8Array([10, 20, 30, 40, 50]);

console.log(uint8.includes(20));
// Expected output: true

// Check from position 3
console.log(uint8.includes(20, 3));
// Expected output: false
```

## Syntax

```js
includes(searchElement)
includes(searchElement, fromIndex)
```

### Parameters

- `searchElement`
    The value to search for.
- `fromIndex` (optional)
    Zero-based index at which to start searching, converted to an integer.

### Return value

A boolean value which is `true` if the value `searchElement` is found within the typed array (or the part of the typed array indicated by the index `fromIndex`, if specified).

## Description

See `Array.prototype.includes()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using includes()

```js
const uint8 = new Uint8Array([1, 2, 3]);
uint8.includes(2); // true
uint8.includes(4); // false
uint8.includes(3, 3); // false

// NaN handling (only relevant for floating point arrays)
new Uint8Array([NaN]).includes(NaN); // false, since the NaN passed to the constructor gets converted to 0
new Float32Array([NaN]).includes(NaN); // true
```

## See also

- Polyfill of `TypedArray.prototype.includes` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.indexOf()`
- `TypedArray.prototype.find()`
- `TypedArray.prototype.findIndex()`
- `Array.prototype.includes()`
- `String.prototype.includes()`
