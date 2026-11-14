---
title: "TypedArray.prototype.reverse()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/reverse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.reverse()

The **`reverse()`** method of `TypedArray` instances reverses a typed array _in place_ and returns the reference to the same typed array, the first typed array element now becoming the last, and the last typed array element becoming the first. In other words, elements order in the typed array will be turned towards the direction opposite to that previously stated. This method has the same algorithm as `Array.prototype.reverse()`.

```js
const uint8 = new Uint8Array([1, 2, 3]);
uint8.reverse();

console.log(uint8);
// Expected output: Uint8Array [3, 2, 1]
```

## Syntax

```js
reverse()
```

### Parameters

None.

### Return value

The reference to the original typed array, now reversed. Note that the typed array is reversed _in place_, and no copy is made.

## Description

See `Array.prototype.reverse()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using reverse()

```js
const uint8 = new Uint8Array([1, 2, 3]);
uint8.reverse();

console.log(uint8); // Uint8Array [3, 2, 1]
```

## See also

- Polyfill of `TypedArray.prototype.reverse` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.join()`
- `TypedArray.prototype.sort()`
- `TypedArray.prototype.toReversed()`
- `Array.prototype.reverse()`
