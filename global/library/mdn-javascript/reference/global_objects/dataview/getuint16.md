---
title: "DataView.prototype.getUint16()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/dataview/getuint16/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataView.prototype.getUint16()

The **`getUint16()`** method of `DataView` instances reads 2 bytes starting at the specified byte offset of this `DataView` and interprets them as a 16-bit unsigned integer. There is no alignment constraint; multi-byte values may be fetched from any offset within bounds.

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
getUint16(byteOffset)
getUint16(byteOffset, littleEndian)
```

### Parameters

- `byteOffset`
    The offset, in bytes, from the start of the view to read the data from.
- `littleEndian` (optional)
    Indicates whether the data is stored in little- or big-endian format. If `false` or `undefined`, a big-endian value is read.

### Return value

An integer from 0 to 65535, inclusive.

### Exceptions

- `RangeError`
    Thrown if the `byteOffset` is set such that it would read beyond the end of the view.

## Examples

### Using getUint16()

```js
const { buffer } = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const dataview = new DataView(buffer);
console.log(dataview.getUint16(1)); // 258
```

## See also

- JavaScript typed arrays guide
- `DataView`
- `ArrayBuffer`
- `Uint16Array`
