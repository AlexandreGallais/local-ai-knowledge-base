---
title: "DataView.prototype.getBigInt64()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/dataview/getbigint64/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataView.prototype.getBigInt64()

The **`getBigInt64()`** method of `DataView` instances reads 8 bytes starting at the specified byte offset of this `DataView` and interprets them as a 64-bit signed integer. There is no alignment constraint; multi-byte values may be fetched from any offset within bounds.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

// Highest possible BigInt value that fits in a signed 64-bit integer
const max = 2n ** (64n - 1n) - 1n;

const view = new DataView(buffer);
view.setBigInt64(1, max);

console.log(view.getBigInt64(1));
// Expected output: 9223372036854775807n
```

## Syntax

```js
getBigInt64(byteOffset)
getBigInt64(byteOffset, littleEndian)
```

### Parameters

- `byteOffset`
    The offset, in bytes, from the start of the view to read the data from.
- `littleEndian` (optional)
    Indicates whether the data is stored in little- or big-endian format. If `false` or `undefined`, a big-endian value is read.

### Return value

A `BigInt` from -263 to 263-1, inclusive.

### Exceptions

- `RangeError`
    Thrown if the `byteOffset` is set such that it would read beyond the end of the view.

## Examples

### Using getBigInt64()

```js
const { buffer } = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const dataview = new DataView(buffer);
console.log(dataview.getBigInt64(1)); // 72623859790382856n
```

## See also

- JavaScript typed arrays guide
- `DataView`
- `ArrayBuffer`
- `BigInt64Array`
