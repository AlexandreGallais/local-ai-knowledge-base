---
title: "TypedArray.prototype.buffer"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/buffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.buffer

The **`buffer`** accessor property of `TypedArray` instances returns the `ArrayBuffer` or `SharedArrayBuffer` referenced by this typed array at construction time.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(8);
const uint16 = new Uint16Array(buffer);

console.log(uint16.buffer.byteLength);
// Expected output: 8
```

## Description

The `buffer` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is established when the _TypedArray_ is constructed and cannot be changed. _TypedArray_ is one of the TypedArray objects.

Because a typed array is a _view_ of a buffer, the underlying buffer may be longer than the typed array itself.

## Examples

### Using the buffer property

```js
const buffer = new ArrayBuffer(8);
const uint16 = new Uint16Array(buffer);
uint16.buffer; // ArrayBuffer { byteLength: 8 }
```

### Accessing the underlying buffer from a sliced array view

```js
const buffer = new ArrayBuffer(1024);
const arr = new Uint8Array(buffer, 64, 128);
console.log(arr.byteLength); // 128
console.log(arr.buffer.byteLength); // 1024
console.log(arr.buffer === buffer); // true
```

## See also

- JavaScript typed arrays guide
- `TypedArray`
