---
title: "SharedArrayBuffer.prototype.slice()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/sharedarraybuffer/slice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedArrayBuffer.prototype.slice()

The **`slice()`** method of `SharedArrayBuffer` instances returns a new `SharedArrayBuffer` whose contents are a copy of this `SharedArrayBuffer`'s bytes from `start`, inclusive, up to `end`, exclusive. If either `start` or `end` is negative, it refers to an index from the end of the array, as opposed to from the beginning.

## Syntax

```js
slice()
slice(start)
slice(start, end)
```

### Parameters

- `start` (optional)
    Zero-based index at which to start extraction, converted to an integer.
    - Negative index counts back from the end of the buffer — if `-buffer.length <= start < 0`, `start + buffer.length` is used.
    - If `start < -buffer.length` or `start` is omitted, `0` is used.
    - If `start >= buffer.length`, an empty buffer is returned.
- `end` (optional)
    Zero-based index at which to end extraction, converted to an integer. `slice()` extracts up to but not including `end`.
    - Negative index counts back from the end of the buffer — if `-buffer.length <= end < 0`, `end + buffer.length` is used.
    - If `end < -buffer.length`, `0` is used.
    - If `end >= buffer.length` or `end` is omitted or `undefined`, `buffer.length` is used, causing all elements until the end to be extracted.
    - If `end` implies a position before or at the position that `start` implies, an empty buffer is returned.

### Return value

A new `SharedArrayBuffer` containing the extracted elements.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Using slice()

```js
// Create a SharedArrayBuffer with a size in bytes
const buffer = new SharedArrayBuffer(16);
const int32View = new Int32Array(buffer);
int32View[1] = 42;
// Produces Int32Array [0, 42, 0, 0]

const sliced = new Int32Array(buffer.slice(4, 12));
console.log(sliced); // Int32Array [42, 0]
```

### Using different start and end values

```js
const sab = new SharedArrayBuffer(1024);
sab.slice(); // SharedArrayBuffer { byteLength: 1024 }
sab.slice(2); // SharedArrayBuffer { byteLength: 1022 }
sab.slice(-2); // SharedArrayBuffer { byteLength: 2 }
sab.slice(0, 1); // SharedArrayBuffer { byteLength: 1 }
```

## See also

- `SharedArrayBuffer`
- `ArrayBuffer.prototype.slice()`
