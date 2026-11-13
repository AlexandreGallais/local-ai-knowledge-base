---
title: "DataView.prototype.setInt8()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/dataview/setint8/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataView.prototype.setInt8()

The **`setInt8()`** method of `DataView` instances takes a number and stores it as an 8-bit signed integer in the byte at the specified byte offset of this `DataView`.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setInt8(1, 127); // Max signed 8-bit integer

console.log(view.getInt8(1));
// Expected output: 127
```

## Syntax

```js
setInt8(byteOffset, value)
```

### Parameters

- `byteOffset`
    The offset, in bytes, from the start of the view to store the data in.
- `value`
    The value to set. For how the value is encoded in bytes, see Value encoding and normalization.

### Return value

`undefined`.

### Exceptions

- `RangeError`
    Thrown if the `byteOffset` is set such that it would store beyond the end of the view.

## Examples

### Using setInt8()

```js
const buffer = new ArrayBuffer(10);
const dataview = new DataView(buffer);
dataview.setInt8(0, 3);
dataview.getInt8(0); // 3
```

## See also

- JavaScript typed arrays guide
- `DataView`
- `ArrayBuffer`
- `Int8Array`
