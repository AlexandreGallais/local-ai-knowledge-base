---
title: "DataView.prototype.setInt32()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/dataview/setint32/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataView.prototype.setInt32()

The **`setInt32()`** method of `DataView` instances takes a number and stores it as a 32-bit signed integer in the 4 bytes starting at the specified byte offset of this `DataView`. There is no alignment constraint; multi-byte values may be stored at any offset within bounds.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setInt32(1, 2147483647); // Max signed 32-bit integer

console.log(view.getInt32(1));
// Expected output: 2147483647
```

## Syntax

```js
setInt32(byteOffset, value)
setInt32(byteOffset, value, littleEndian)
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

### Using setInt32()

```js
const buffer = new ArrayBuffer(10);
const dataview = new DataView(buffer);
dataview.setInt32(0, 3);
dataview.getInt32(1); // 768
```

## See also

- JavaScript typed arrays guide
- `DataView`
- `ArrayBuffer`
- `Int32Array`
