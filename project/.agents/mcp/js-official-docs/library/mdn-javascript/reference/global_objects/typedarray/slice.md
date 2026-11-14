---
title: "TypedArray.prototype.slice()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/slice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.slice()

The **`slice()`** method of `TypedArray` instances returns a copy of a portion of a typed array into a new typed array object selected from `start` to `end` (`end` not included) where `start` and `end` represent the index of items in that typed array. The original typed array will not be modified. This method has the same algorithm as `Array.prototype.slice()`.

```js
const bytes = new Uint8Array([10, 20, 30, 40, 50]);
const byteSlice = bytes.slice(1, 3);

console.log(byteSlice);
// Expected output: Uint8Array [20, 30]
```

## Syntax

```js
slice()
slice(start)
slice(start, end)
```

### Parameters

- `start` (optional)
    Zero-based index at which to start extraction, converted to an integer.
- `end` (optional)
    Zero-based index at which to end extraction, converted to an integer. `slice()` extracts up to but not including `end`.

### Return value

A new typed array containing the extracted elements.

## Description

See `Array.prototype.slice()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Return a portion of an existing typed array

```js
const bytes = new Uint8Array([1, 2, 3]);
bytes.slice(1); // Uint8Array [ 2, 3 ]
bytes.slice(2); // Uint8Array [ 3 ]
bytes.slice(-2); // Uint8Array [ 2, 3 ]
bytes.slice(0, 1); // Uint8Array [ 1 ]
```

## See also

- Polyfill of `TypedArray.prototype.slice` in `core-js`
- es-shims polyfill of `TypedArray.prototype.slice`
- JavaScript typed arrays guide
- `TypedArray`
- `Array.prototype.slice()`
- `String.prototype.slice()`
