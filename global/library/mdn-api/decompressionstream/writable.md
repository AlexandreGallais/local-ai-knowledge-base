---
title: "DecompressionStream: writable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/decompressionstream/writable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DecompressionStream: writable property

The **`writable`** read-only property of the `DecompressionStream` interface returns a `WritableStream` that accepts compressed data to be decompressed, in the form of `ArrayBuffer`, `TypedArray`, or `DataView` chunks.

## Value

A `WritableStream`.

## Examples

This example creates a `DecompressionStream` that performs gzip decompression. It writes some compressed binary data to the `writable` stream, then reads the decompressed data from the `readable` stream, decoding it as UTF-8 text.

```js
const stream = new DecompressionStream("gzip");

// Write data to be compressed
const data = Uint8Array.fromBase64(
  "H4sIAAAAAAAAE/NIzcnJ11Eozy/KSVEEAObG5usNAAAA",
);
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
console.log(new TextDecoder().decode(new Uint8Array(output))); // Hello, world!
```

## See also

- `TransformStream.writable`
