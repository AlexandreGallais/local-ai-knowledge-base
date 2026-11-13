---
title: "ArrayBuffer.prototype.resizable"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/arraybuffer/resizable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ArrayBuffer.prototype.resizable

The **`resizable`** accessor property of `ArrayBuffer` instances returns whether this array buffer can be resized or not.

```js
const buffer1 = new ArrayBuffer(8, { maxByteLength: 16 });
const buffer2 = new ArrayBuffer(8);

console.log(buffer1.resizable);
// Expected output: true

console.log(buffer2.resizable);
// Expected output: false
```

## Description

The `resizable` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is established when the array is constructed. If the `maxByteLength` option was set in the constructor, `resizable` will return `true`; if not, it will return `false`.

## Examples

### Using resizable

In this example, we create a 8-byte buffer that is resizable to a max length of 16 bytes, then check its `resizable` property, resizing it if `resizable` returns `true`:

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

if (buffer.resizable) {
  console.log("Buffer is resizable!");
  buffer.resize(12);
}
```

## See also

- `ArrayBuffer`
- `ArrayBuffer.prototype.maxByteLength`
- `ArrayBuffer.prototype.resize()`
