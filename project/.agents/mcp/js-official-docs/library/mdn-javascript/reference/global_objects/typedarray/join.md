---
title: "TypedArray.prototype.join()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/join/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.join()

The **`join()`** method of `TypedArray` instances returns a new string that is the concatenation of all elements in this typed array, separated by commas or a specified separator string. If the typed array has only one item, that item's stringification is returned without using the separator. This method has the same algorithm as `Array.prototype.join()`.

```js
const uint8 = new Uint8Array([10, 20, 30, 40, 50]);

console.log(uint8.join());
// Expected output: "10,20,30,40,50"

console.log(uint8.join(""));
// Expected output: "1020304050"

console.log(uint8.join("-"));
// Expected output: "10-20-30-40-50"
```

## Syntax

```js
join()
join(separator)
```

### Parameters

- `separator` (optional)
    A string to separate each pair of adjacent elements of the typed array. If omitted, the typed array elements are separated with a comma (",").

### Return value

A string with all typed array elements joined. If `array.length` is `0`, the empty string is returned.

## Description

See `Array.prototype.join()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Using join()

```js
const uint8 = new Uint8Array([1, 2, 3]);
uint8.join(); // '1,2,3'
uint8.join(" / "); // '1 / 2 / 3'
uint8.join(""); // '123'
```

## See also

- Polyfill of `TypedArray.prototype.join` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.toString()`
- `Array.prototype.join()`
- `String.prototype.split()`
