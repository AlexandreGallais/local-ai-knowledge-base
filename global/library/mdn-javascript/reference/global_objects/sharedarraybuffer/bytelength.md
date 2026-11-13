---
title: "SharedArrayBuffer.prototype.byteLength"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/sharedarraybuffer/bytelength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedArrayBuffer.prototype.byteLength

The **`byteLength`** accessor property of `SharedArrayBuffer` instances returns the length (in bytes) of this `SharedArrayBuffer`.

## Description

The `byteLength` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is established when the shared array is constructed and cannot be changed.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Using byteLength

```js
const sab = new SharedArrayBuffer(1024);
sab.byteLength; // 1024
```

## See also

- `SharedArrayBuffer`
