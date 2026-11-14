---
title: "DataView.prototype.setUint16()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/dataview/setuint16/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataView.prototype.setUint16()

The **`setUint16()`** method of `DataView` instances takes a number and stores it as a 16-bit unsigned integer in the 2 bytes starting at the specified byte offset of this `DataView`. There is no alignment constraint; multi-byte values may be stored at any offset within bounds.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setUint16(1, 65535); // Max unsigned 16-bit integer

console.log(view.getUint16(1));
// Expected output: 65535
```

## Syntax

```js
setUint16(byteOffset, value)
setUint16(byteOffset, value, littleEndian)
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

### Using setUint16()

```js
const buffer = new ArrayBuffer(10);
const dataview = new DataView(buffer);
dataview.setUint16(0, 3);
dataview.getUint16(1); // 768
```

## See also

- JavaScript typed arrays guide
- `DataView`
- `ArrayBuffer`
- `Uint16Array`
