---
title: "SharedArrayBuffer.prototype.maxByteLength"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/sharedarraybuffer/maxbytelength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedArrayBuffer.prototype.maxByteLength

The **`maxByteLength`** accessor property of `SharedArrayBuffer` instances returns the maximum length (in bytes) that this `SharedArrayBuffer` can be grown to.

## Description

The `maxByteLength` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is established when the shared array is constructed, set via the `maxByteLength` option of the `SharedArrayBuffer()` constructor, and cannot be changed.

If this `SharedArrayBuffer` was constructed without specifying a `maxByteLength` value, this property returns a value equal to the value of the `SharedArrayBuffer`'s `byteLength`.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Using maxByteLength

In this example, we create a 8-byte buffer that is resizable to a max length of 16 bytes, then return its `maxByteLength`:

```js
const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 });

buffer.maxByteLength; // 16
```

## See also

- `SharedArrayBuffer`
