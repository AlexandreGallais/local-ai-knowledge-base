---
title: "DecompressionStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/decompressionstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DecompressionStream

The **`DecompressionStream`** interface of the `Compression Streams API` decompresses a stream of data. It implements the same shape as a `TransformStream`, allowing it to be used in `ReadableStream.pipeThrough()` and similar methods.

## Constructor

- `DecompressionStream()`
    Creates a new `DecompressionStream`

## Instance properties

- `DecompressionStream.readable` (read-only)
    Returns the `ReadableStream` instance controlled by this object.
- `DecompressionStream.writable` (read-only)
    Returns the `WritableStream` instance controlled by this object.

## Examples

In this example a blob is decompressed using gzip compression.

```js
const ds = new DecompressionStream("gzip");
const decompressedStream = blob.stream().pipeThrough(ds);
```

## See also

- `CompressionStream`
- `TransformStream`
