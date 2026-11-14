---
title: "TypedArray.prototype.lastIndexOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/lastindexof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.lastIndexOf()

The **`lastIndexOf()`** method of `TypedArray` instances returns the last index at which a given element can be found in the typed array, or -1 if it is not present. The typed array is searched backwards, starting at `fromIndex`. This method has the same algorithm as `Array.prototype.lastIndexOf()`.

```js
const uint8 = new Uint8Array([10, 20, 50, 50, 50, 60]);

console.log(uint8.lastIndexOf(50, 5));
// Expected output: 4

console.log(uint8.lastIndexOf(50, 3));
// Expected output: 3
```

## Syntax

```js
lastIndexOf(searchElement)
lastIndexOf(searchElement, fromIndex)
```

### Parameters

- `searchElement`
    Element to locate in the typed array.
- `fromIndex` (optional)
    Zero-based index at which to start searching backwards, converted to an integer.

### Return value

The last index of `searchElement` in the typed array; `-1` if not found.

## Description

See `Array.prototype.lastIndexOf()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using lastIndexOf()

```js
const uint8 = new Uint8Array([2, 5, 9, 2]);
uint8.lastIndexOf(2); // 3
uint8.lastIndexOf(7); // -1
uint8.lastIndexOf(2, 3); // 3
uint8.lastIndexOf(2, 2); // 0
uint8.lastIndexOf(2, -2); // 0
uint8.lastIndexOf(2, -1); // 3
```

## See also

- Polyfill of `TypedArray.prototype.lastIndexOf` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.findIndex()`
- `TypedArray.prototype.findLastIndex()`
- `TypedArray.prototype.indexOf()`
- `Array.prototype.lastIndexOf()`
- `String.prototype.lastIndexOf()`
