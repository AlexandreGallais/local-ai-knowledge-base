---
title: "WritableStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStream

The **`WritableStream`** interface of the Streams API provides a standard abstraction for writing streaming data to a destination, known as a sink.
This object comes with built-in backpressure and queuing.

`WritableStream` is a transferable object.

## Constructor

- `WritableStream()`
    Creates a new `WritableStream` object.

## Instance properties

- `WritableStream.locked` (read-only)
    A boolean indicating whether the `WritableStream` is locked to a writer.

## Instance methods

- `WritableStream.abort()`
    Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be immediately moved to an error state, with any queued writes discarded.
- `WritableStream.close()`
    Closes the stream.
- `WritableStream.getWriter()`
    Returns a new instance of `WritableStreamDefaultWriter` and locks the stream to that instance. While the stream is locked, no other writer can be acquired until this one is released.

## Examples

The following example illustrates several features of this interface. It creates the `WritableStream` with a custom sink. It then calls the stream's `getWriter()` method, which returns an instance of `WritableStreamDefaultWriter`. Next, several strings are written to the stream. Finally, `close()` returns a promise that resolves when all the writes have successfully completed.

```js
const writableStream = new WritableStream(
  // Implement the sink
  {
    write(chunk) {
      const textElement = document.getElementById("text-output");
      textElement.textContent += chunk;
    },
  },
);

const writer = writableStream.getWriter();

try {
  writer.write("Hello, ");
  writer.write("world!\n");
  writer.write("This has been a demo!\n");

  await writer.close(); // wait for all chunks to be written
  console.log("All chunks written");
} catch (error) {
  console.error("Stream error: ", error);
}
```

This example does not support the backpressure feature of Streams.

## See also

- Streams—The Definitive Guide
