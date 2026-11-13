---
title: "TransformStream: writable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/transformstream/writable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TransformStream: writable property

The **`writable`** read-only property of the `TransformStream` interface returns the `WritableStream` instance controlled by this `TransformStream`. This stream accepts input data that will be transformed and emitted to the `readable` stream.

## Value

A `WritableStream`.

## Examples

This example creates a `TransformStream` that converts all input text to uppercase letters. It writes some text to the `writable` stream, then reads the transformed text from the `readable` stream.

```js
const stream = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

// Write data to be transformed
const writer = stream.writable.getWriter();
writer.write("hello ");
writer.write("world");
writer.close();

// Read transformed data
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
console.log(output); // HELLO WORLD
```
