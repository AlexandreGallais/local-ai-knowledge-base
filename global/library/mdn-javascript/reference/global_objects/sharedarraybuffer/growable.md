---
title: "SharedArrayBuffer.prototype.growable"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/sharedarraybuffer/growable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedArrayBuffer.prototype.growable

The **`growable`** accessor property of `SharedArrayBuffer` instances returns whether this `SharedArrayBuffer` can be grow or not.

## Description

The `growable` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is established when the array is constructed. If a `maxByteLength` option was set in the constructor, `growable` will return `true`; if not, it will return `false`.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Using growable

In this example, we create a 8-byte buffer that is growable to a max length of 16 bytes, then check its `growable` property, growing it if `growable` returns `true`:

```js
const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 });

if (buffer.growable) {
  console.log("SAB is growable!");
  buffer.grow(12);
}
```

## See also

- `SharedArrayBuffer`
- `SharedArrayBuffer.prototype.grow()`
- `SharedArrayBuffer.prototype.maxByteLength`
