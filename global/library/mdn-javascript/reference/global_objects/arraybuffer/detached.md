---
title: "ArrayBuffer.prototype.detached"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/arraybuffer/detached/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ArrayBuffer.prototype.detached

The **`detached`** accessor property of `ArrayBuffer` instances returns a boolean indicating whether or not this buffer has been detached (transferred).

## Description

The `detached` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is `false` when the `ArrayBuffer` is first created. The value becomes `true` if the `ArrayBuffer` is transferred, which detaches the instance from its underlying memory. Once a buffer becomes detached, it is no longer usable.

## Examples

### Using detached

```js
const buffer = new ArrayBuffer(8);
console.log(buffer.detached); // false
const newBuffer = buffer.transfer();
console.log(buffer.detached); // true
console.log(newBuffer.detached); // false
```

## See also

- Polyfill of `ArrayBuffer.prototype.detached` in `core-js`
- es-shims polyfill of `ArrayBuffer.prototype.detached`
- `ArrayBuffer`
- `ArrayBuffer.prototype.transfer()`
- `ArrayBuffer.prototype.transferToFixedLength()`
