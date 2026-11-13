---
title: "ArrayBuffer.prototype.slice()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/arraybuffer/slice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ArrayBuffer.prototype.slice()

The **`slice()`** method of `ArrayBuffer` instances returns a new `ArrayBuffer` whose contents are a copy of this `ArrayBuffer`'s bytes from `start`, inclusive, up to `end`, exclusive. If either `start` or `end` is negative, it refers to an index from the end of the array, as opposed to from the beginning.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);
const int32View = new Int32Array(buffer);
// Produces Int32Array [0, 0, 0, 0]

int32View[1] = 42;
const sliced = new Int32Array(buffer.slice(4, 12));
// Produces Int32Array [42, 0]

console.log(sliced[0]);
// Expected output: 42
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
    - Negative index counts back from the end of the buffer — if `-buffer.length <= start < 0`, `start + buffer.length` is used.
    - If `start < -buffer.length` or `start` is omitted, `0` is used.
    - If `start >= buffer.length`, an empty buffer is returned.
- `end` (optional)
    Zero-based index at which to end extraction, converted to an integer. `slice()` extracts up to but not including `end`.
    - Negative index counts back from the end of the buffer — if `-buffer.length <= end < 0`, `end + buffer.length` is used.
    - If `end < -buffer.length`, `0` is used.
    - If `end >= buffer.length` or `end` is omitted is `undefined`, `buffer.length` is used, causing all elements until the end to be extracted.
    - If `end` implies a position before or at the position that `start` implies, an empty buffer is returned.

### Return value

A new `ArrayBuffer` containing the extracted elements. It is not resizable, even if the original was.

## Examples

### Copying an ArrayBuffer

```js
const buf1 = new ArrayBuffer(8);
const buf2 = buf1.slice(0);
```

## See also

- `ArrayBuffer`
- `SharedArrayBuffer.prototype.slice()`
