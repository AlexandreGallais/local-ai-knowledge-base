---
title: "TypedArray.prototype.fill()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/fill/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.fill()

The **`fill()`** method of `TypedArray` instances changes all elements within a range of indices in a typed array to a static value. It returns the modified typed array. This method has the same algorithm as `Array.prototype.fill()`.

```js
const uint8 = new Uint8Array([0, 0, 0, 0]);
// Value, start position, end position
uint8.fill(4, 1, 3);

console.log(uint8);
// Expected output: Uint8Array [0, 4, 4, 0]
```

## Syntax

```js
fill(value)
fill(value, start)
fill(value, start, end)
```

### Parameters

- `value`
    Value to fill the typed array with.
- `start` (optional)
    Zero-based index at which to start filling, converted to an integer.
- `end` (optional)
    Zero-based index at which to end filling, converted to an integer. `fill()` fills up to but not including `end`.

### Return value

The modified typed array, filled with `value`.

## Description

See `Array.prototype.fill()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using fill()

```js
new Uint8Array([1, 2, 3]).fill(4); // Uint8Array [4, 4, 4]
new Uint8Array([1, 2, 3]).fill(4, 1); // Uint8Array [1, 4, 4]
new Uint8Array([1, 2, 3]).fill(4, 1, 2); // Uint8Array [1, 4, 3]
new Uint8Array([1, 2, 3]).fill(4, 1, 1); // Uint8Array [1, 2, 3]
new Uint8Array([1, 2, 3]).fill(4, -3, -2); // Uint8Array [4, 2, 3]
```

## See also

- Polyfill of `TypedArray.prototype.fill` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `Array.prototype.fill()`
