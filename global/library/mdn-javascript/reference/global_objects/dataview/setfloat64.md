---
title: "DataView.prototype.setFloat64()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/dataview/setfloat64/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataView.prototype.setFloat64()

The **`setFloat64()`** method of `DataView` instances takes a number and stores it as a 64-bit floating point number in the 8 bytes starting at the specified byte offset of this `DataView`. There is no alignment constraint; multi-byte values may be stored at any offset within bounds.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setFloat64(1, Math.PI);

console.log(view.getFloat64(1));
// Expected output: 3.141592653589793
```

## Syntax

```js
setFloat64(byteOffset, value)
setFloat64(byteOffset, value, littleEndian)
```

### Parameters

- `byteOffset`
    The offset, in bytes, from the start of the view to store the data in.
- `value`
    The value to set. For how the value is encoded in bytes, see Value encoding and normalization.
- `littleEndian` (optional)
    Indicates whether the data is stored in little- or big-endian format. If `false` or `undefined`, a big-endian value is written.

### Return value

`undefined`.

### Exceptions

- `RangeError`
    Thrown if the `byteOffset` is set such that it would store beyond the end of the view.

## Examples

### Using setFloat64()

```js
const buffer = new ArrayBuffer(10);
const dataview = new DataView(buffer);
dataview.setFloat64(0, 3);
dataview.getFloat64(1); // 3.785766995733679e-270
```

## See also

- JavaScript typed arrays guide
- `DataView`
- `ArrayBuffer`
- `Float64Array`
