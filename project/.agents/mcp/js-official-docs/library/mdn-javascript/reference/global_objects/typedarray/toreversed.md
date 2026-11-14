---
title: "TypedArray.prototype.toReversed()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/toreversed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.toReversed()

The **`toReversed()`** method of `TypedArray` instances is the copying counterpart of the `reverse()` method. It returns a new typed array with the elements in reversed order. This method has the same algorithm as `Array.prototype.toReversed()`.

## Syntax

```js
toReversed()
```

### Parameters

None.

### Return value

A new typed array containing the elements in reversed order.

## Description

See `Array.prototype.toReversed()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using toReversed()

```js
const uint8 = new Uint8Array([1, 2, 3]);
const reversedUint8 = uint8.toReversed();
console.log(reversedUint8); // Uint8Array [3, 2, 1]
console.log(uint8); // Uint8Array [1, 2, 3]
```

## See also

- Polyfill of `TypedArray.prototype.toReversed` in `core-js`
- JavaScript typed arrays guide
- `TypedArray.prototype.reverse()`
- `TypedArray.prototype.toSorted()`
- `TypedArray.prototype.with()`
- `Array.prototype.toReversed()`
