---
title: "TextEncoderStream: writable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textencoderstream/writable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextEncoderStream: writable property

The **`writable`** read-only property of the `TextEncoderStream` interface returns a `WritableStream` that accepts strings to be encoded into binary data.

## Value

A `WritableStream`.

## Examples

This example creates a `TextEncoderStream` that encodes strings as UTF-8. It writes some strings to the `writable` stream, then reads the encoded binary data from the `readable` stream.

```js
const stream = new TextEncoderStream();

// Write data to be encoded
const data = "你好世界";
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
console.log(new Uint8Array(output).toBase64()); // 5L2g5aW95LiW55WM
```

## See also

- `TransformStream.writable`
