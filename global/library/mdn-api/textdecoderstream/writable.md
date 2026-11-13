---
title: "TextDecoderStream: writable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textdecoderstream/writable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextDecoderStream: writable property

The **`writable`** read-only property of the `TextDecoderStream` interface returns a `WritableStream` that accepts binary data, in the form of `ArrayBuffer`, `TypedArray`, or `DataView` chunks (`SharedArrayBuffer` and its views are also allowed), to be decoded into strings.

## Value

A `WritableStream`.

## Examples

This example creates a `TextDecoderStream` that decodes UTF-8 encoded binary data. It writes some encoded binary data to the `writable` stream, then reads the decoded text from the `readable` stream.

```js
const stream = new TextDecoderStream();

// Write data to be decoded
const data = Uint8Array.fromBase64("5L2g5aW95LiW55WM");
const writer = stream.writable.getWriter();
writer.write(data);
writer.close();

// Read decoded data
const reader = stream.readable.getReader();
let done = false;
let output = "";
while (!done) {
  const result = await reader.read();
  if (result.value) {
    output += result.value;
  }
  done = result.done;
}
console.log(output);
```

## See also

- `TransformStream.writable`
