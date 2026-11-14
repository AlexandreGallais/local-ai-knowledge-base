---
title: "TypedArray.prototype.copyWithin()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/copywithin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.copyWithin()

The **`copyWithin()`** method of `TypedArray` instances shallow copies part of this typed array to another location in the same typed array and returns this typed array without modifying its length. This method has the same algorithm as `Array.prototype.copyWithin()`.

```js
const uint8 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);

// Insert position, start position, end position
uint8.copyWithin(3, 1, 3);

console.log(uint8);
// Expected output: Uint8Array [1, 2, 3, 2, 3, 6, 7, 8]
```

## Syntax

```js
copyWithin(target, start)
copyWithin(target, start, end)
```

### Parameters

- `target`
    Zero-based index at which to copy the sequence to, converted to an integer. This corresponds to where the element at `start` will be copied to, and all elements between `start` and `end` are copied to succeeding indices.
- `start`
    Zero-based index at which to start copying elements from, converted to an integer.
- `end` (optional)
    Zero-based index at which to end copying elements from, converted to an integer. `copyWithin()` copies up to but not including `end`.

### Return value

The modified typed array.

## Description

See `Array.prototype.copyWithin()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using copyWithin()

```js
const buffer = new ArrayBuffer(8);
const uint8 = new Uint8Array(buffer);
uint8.set([1, 2, 3]);
console.log(uint8); // Uint8Array [ 1, 2, 3, 0, 0, 0, 0, 0 ]
uint8.copyWithin(3, 0, 3);
console.log(uint8); // Uint8Array [ 1, 2, 3, 1, 2, 3, 0, 0 ]
```

## See also

- Polyfill of `TypedArray.prototype.copyWithin` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `Array.prototype.copyWithin()`
