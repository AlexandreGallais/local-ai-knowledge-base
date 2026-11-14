---
title: "CompressionStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/compressionstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CompressionStream

The **`CompressionStream`** interface of the `Compression Streams API` compresses a stream of data. It implements the same shape as a `TransformStream`, allowing it to be used in `ReadableStream.pipeThrough()` and similar methods.

## Constructor

- `CompressionStream()`
    Creates a new `CompressionStream`.

## Instance properties

- `CompressionStream.readable` (read-only)
    Returns the `ReadableStream` instance controlled by this object.
- `CompressionStream.writable` (read-only)
    Returns the `WritableStream` instance controlled by this object.

## Examples

In this example a stream is compressed using gzip compression.

```js
const compressedReadableStream = inputReadableStream.pipeThrough(
  new CompressionStream("gzip"),
);
```

## See also

- `DecompressionStream`
- `TransformStream`
