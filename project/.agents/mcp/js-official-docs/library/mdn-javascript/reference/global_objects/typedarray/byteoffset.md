---
title: "TypedArray.prototype.byteOffset"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/byteoffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.byteOffset

The **`byteOffset`** accessor property of `TypedArray` instances returns the offset (in bytes) of this typed array from the start of its `ArrayBuffer` or `SharedArrayBuffer`.

## Description

The `byteOffset` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is established when the typed array is constructed and cannot be changed. However, the `byteOffset` becomes 0 if the underlying buffer is resized such that the viewed range is no longer valid.

## Examples

### Using the byteOffset property

```js
const buffer = new ArrayBuffer(8);

const uint8array1 = new Uint8Array(buffer);
uint8array1.byteOffset; // 0 (no offset specified)

const uint8array2 = new Uint8Array(buffer, 3);
uint8array2.byteOffset; // 3 (as specified when constructing Uint8Array)

const buffer2 = new ArrayBuffer(16, { maxByteLength: 32 });
const uint8lengthTracking = new Uint8Array(buffer2, 4);
uint8lengthTracking.byteOffset; // 4
buffer2.resize(3);
uint8lengthTracking.byteOffset; // 0 (viewed range is no longer valid)
```

## See also

- JavaScript typed arrays guide
- `TypedArray`
