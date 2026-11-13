---
title: "WritableStreamDefaultWriter: ready property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestreamdefaultwriter/ready/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStreamDefaultWriter: ready property

The **`ready`** read-only property of the
`WritableStreamDefaultWriter` interface returns a `Promise`
that resolves when the desired size of the stream's internal queue transitions from
non-positive to positive, signaling that it is no longer applying backpressure.

## Value

A `Promise`.

## Examples

The following example shows two uses of the `ready` property. The first uses
`ready` to ensure that the `WritableStream` is done writing and
thus able to receive data before sending a binary chunk. The second also checks whether
the `WritableStream` is done writing, but this time because the writing
must be finished before the writer can be closed.

```js
function sendMessage(message, writableStream) {
  // defaultWriter is of type WritableStreamDefaultWriter
  const defaultWriter = writableStream.getWriter();
  const encoder = new TextEncoder();
  const encoded = encoder.encode(message);
  encoded.forEach((chunk) => {
    // Make sure the stream and its writer are able to
    //   receive data.
    defaultWriter.ready
      .then(() => defaultWriter.write(chunk))
      .then(() => {
        console.log("Chunk written to sink.");
      })
      .catch((err) => {
        console.error(`Chunk error: ${err}`);
      });
    // Call ready again to ensure that all chunks are written
    //   before closing the writer.
    defaultWriter.ready
      .then(() => defaultWriter.close())
      .then(() => {
        console.log("All chunks written");
      })
      .catch((err) => {
        console.error(`Stream error: ${err}`);
      });
  });
}
```
