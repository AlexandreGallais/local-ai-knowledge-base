---
title: "ReadableStreamDefaultReader"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreamdefaultreader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamDefaultReader

The **`ReadableStreamDefaultReader`** interface of the Streams API represents a default reader that can be used to read stream data supplied from a network (such as a fetch request).

A `ReadableStreamDefaultReader` can be used to read from a `ReadableStream` that has an underlying source of any type (unlike a `ReadableStreamBYOBReader`, which can only be used with readable streams that have an _underlying byte source_).

Note however that zero-copy transfer from an underlying source is only supported for underlying byte sources that autoallocate buffers.
In other words, the stream must have been constructed specifying both `type="bytes"` and `autoAllocateChunkSize`.
For any other underlying source, the stream will always satisfy read requests with data from internal queues.

## Constructor

- `ReadableStreamDefaultReader()`
    Creates and returns a `ReadableStreamDefaultReader` object instance.

## Instance properties

- `ReadableStreamDefaultReader.closed` (read-only)
    Returns a `Promise` that fulfills when the stream closes, or rejects if the stream throws an error or the reader's lock is released. This property enables you to write code that responds to an end to the streaming process.

## Instance methods

- `ReadableStreamDefaultReader.cancel()`
    Returns a `Promise` that resolves when the stream is canceled. Calling this method signals a loss of interest in the stream by a consumer. The supplied `reason` argument will be given to the underlying source, which may or may not use it.
- `ReadableStreamDefaultReader.read()`
    Returns a promise providing access to the next chunk in the stream's internal queue.
- `ReadableStreamDefaultReader.releaseLock()`
    Releases the reader's lock on the stream.

## Examples

In the following example, an artificial `Response` is created to stream HTML fragments fetched from another resource to the browser.

It demonstrates the usage of a `ReadableStream` in combination with a `Uint8Array`.

```js
fetch("https://www.example.org/").then((response) => {
  const reader = response.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      // The following function handles each data chunk
      function push() {
        // "done" is a Boolean and value a "Uint8Array"
        return reader.read().then(({ done, value }) => {
          // Is there no more data to read?
          if (done) {
            // Tell the browser that we have finished sending data
            controller.close();
            return;
          }

          // Get the data and send it to the browser via the controller
          controller.enqueue(value);
          push();
        });
      }

      push();
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/html" } });
});
```

## See also

- Streams API concepts
- Using readable streams
- `ReadableStream`
