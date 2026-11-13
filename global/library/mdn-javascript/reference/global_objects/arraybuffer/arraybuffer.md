---
title: "ArrayBuffer() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/arraybuffer/arraybuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ArrayBuffer() constructor

The **`ArrayBuffer()`** constructor creates `ArrayBuffer` objects.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(8);

console.log(buffer.byteLength);
// Expected output: 8
```

## Syntax

```js
new ArrayBuffer(length)
new ArrayBuffer(length, options)
```

> **Note:**
> `ArrayBuffer()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `length`
    The size, in bytes, of the array buffer to create.
- `options` (optional)
    An object, which can contain the following properties:
    - `maxByteLength` (optional)
        The maximum size, in bytes, that the array buffer can be resized to.

### Return value

A new `ArrayBuffer` object of the specified size, with its `maxByteLength` property set to the specified `maxByteLength` if one was specified. Its contents are initialized to 0.

### Exceptions

- `RangeError`
    Thrown in one of the following cases:
    - `length` or `maxByteLength` is larger than `Number.MAX_SAFE_INTEGER` (≥ 253) or negative.
    - `length` is larger than `maxByteLength`.

## Examples

### Creating an ArrayBuffer

In this example, we create a 8-byte buffer with an `Int32Array` view referring to the buffer:

```js
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
```

### Creating a resizable ArrayBuffer

In this example, we create a 8-byte buffer that is resizable to a max length of 16 bytes, then `resize()` it to 12 bytes:

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

buffer.resize(12);
```

> **Note:**
> It is recommended that `maxByteLength` is set to the smallest value possible for your use case. It should never exceed `1073741824` (1GB) to reduce the risk of out-of-memory errors.

## See also

- Polyfill of `ArrayBuffer` in `core-js`
- JavaScript typed arrays guide
- `SharedArrayBuffer`
