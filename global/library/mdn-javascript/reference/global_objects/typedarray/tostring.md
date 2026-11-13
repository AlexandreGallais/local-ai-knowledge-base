---
title: "TypedArray.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.toString()

The **`toString()`** method of `TypedArray` instances returns a string representing the specified typed array and its elements. This method has the same algorithm as `Array.prototype.toString()`.

```js
const uint8 = new Uint8Array([10, 20, 30, 40, 50]);

const uint8String = uint8.toString();

console.log(uint8String.startsWith("10"));
// Expected output: true
```

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string representing the elements of the typed array.

## Description

See `Array.prototype.toString()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Converting a typed array to a string

```js
const uint8 = new Uint8Array([1, 2, 3]);
// Explicit conversion
console.log(uint8.toString()); // 1,2,3
// Implicit conversion
console.log(`${uint8}`); // 1,2,3
```

## See also

- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.join()`
- `TypedArray.prototype.toLocaleString()`
- `Array.prototype.toString()`
- `String.prototype.toString()`
