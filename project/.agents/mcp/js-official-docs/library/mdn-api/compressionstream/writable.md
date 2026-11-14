---
title: "CompressionStream: writable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/compressionstream/writable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CompressionStream: writable property

The **`writable`** read-only property of the `CompressionStream` interface returns a `WritableStream` that accepts uncompressed data to be compressed, in the form of `ArrayBuffer`, `TypedArray`, or `DataView` chunks.

## Value

A `WritableStream`.

## Examples

This example creates a `CompressionStream` that performs gzip compression. It writes some binary data to the `writable` stream, then reads the compressed data from the `readable` stream.

```js
const stream = new CompressionStream("gzip");

// Write data to be compressed
const data = new TextEncoder().encode("Hello, world!");
const writer = stream.writable.getWriter();
writer.write(data);
writer.close();

// Read compressed data
const reader = stream.readable.getReader();
let done = false;
let output = [];
while (!done) {
  const result = await reader.read();
  if (result.value) {
    output.push(...result.value);
  }
  done = result.done;
}
console.log(new Uint8Array(output).toBase64()); // H4sIAAAAAAAAE/NIzcnJ11Eozy/KSVEEAObG5usNAAAA
```

## See also

- `TransformStream.writable`
