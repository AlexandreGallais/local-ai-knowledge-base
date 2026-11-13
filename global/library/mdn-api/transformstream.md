---
title: "TransformStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/transformstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TransformStream

The **`TransformStream`** interface of the Streams API represents a concrete implementation of the pipe chain _transform stream_ concept.

It may be passed to the `ReadableStream.pipeThrough()` method in order to transform a stream of data from one format into another.
For example, it might be used to decode (or encode) video frames, decompress data, or convert the stream from XML to JSON.

A transformation algorithm may be provided as an optional argument to the object constructor.
If not supplied, data is not modified when piped through the stream.

`TransformStream` is a transferable object.

## Constructor

- `TransformStream()`
    Creates and returns a transform stream object, optionally specifying a transformation object and queuing strategies for the streams.

## Instance properties

- `TransformStream.readable` (read-only)
    The `readable` end of a `TransformStream`.
- `TransformStream.writable` (read-only)
    The `writable` end of a `TransformStream`.

## Instance methods

None

## Examples

### Anything-to-uint8array stream

In the following example, a transform stream passes through all chunks it receives as `Uint8Array` values.

```js
const transformContent = {
  start() {}, // required.
  async transform(chunk, controller) {
    chunk = await chunk;
    switch (typeof chunk) {
      case "object":
        // just say the stream is done I guess
        if (chunk === null) {
          controller.terminate();
        } else if (ArrayBuffer.isView(chunk)) {
          controller.enqueue(
            new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength),
          );
        } else if (
          Array.isArray(chunk) &&
          chunk.every((value) => typeof value === "number")
        ) {
          controller.enqueue(new Uint8Array(chunk));
        } else if (
          typeof chunk.valueOf === "function" &&
          chunk.valueOf() !== chunk
        ) {
          this.transform(chunk.valueOf(), controller); // hack
        } else if ("toJSON" in chunk) {
          this.transform(JSON.stringify(chunk), controller);
        }
        break;
      case "symbol":
        controller.error("Cannot send a symbol as a chunk part");
        break;
      case "undefined":
        controller.error("Cannot send undefined as a chunk part");
        break;
      default:
        controller.enqueue(this.textencoder.encode(String(chunk)));
        break;
    }
  },
  flush() {
    /* do any destructor work here */
  },
};

class AnyToU8Stream extends TransformStream {
  constructor() {
    super({ ...transformContent, textencoder: new TextEncoder() });
  }
}
```

### Chaining multiple ReadableStreams together

This is a useful one, where multiple streams can be conjoined. Examples include building a PWA with progressive loading and progressive streaming.

```js
let responses = [/* conjoined response tree */];
let { readable, writable } = new TransformStream();

responses.reduce(
  (a, res, i, arr) =>
    a.then(() => res.pipeTo(writable, { preventClose: i + 1 !== arr.length })),
  Promise.resolve(),
);
```

Note that this is not resilient to other influences.

## See also

- Streams—The Definitive Guide
