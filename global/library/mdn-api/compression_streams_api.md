---
title: "Compression Streams API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/compression_streams_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Compression Streams API

The **Compression Streams API** provides a JavaScript API for compressing and decompressing streams of data using the gzip or deflate formats.

Built-in compression means that JavaScript applications will not need to include a compression library, which makes the download size of the application smaller.

The Fetch API's `Response` can be used to convert streams to:

- `ArrayBuffer`
- `Blob`
- `Uint8Array`
- `String`
- JSON

## Interfaces

- `CompressionStream`
    Compresses a stream of data.
- `DecompressionStream`
    Decompresses a stream of data.

## Examples

In this example a stream is compressed using gzip compression.

```js
const compressedReadableStream = inputReadableStream.pipeThrough(
  new CompressionStream("gzip"),
);
```

In the following example a function decompresses a blob using gzip.

```js
async function DecompressBlob(blob) {
  const ds = new DecompressionStream("gzip");
  const decompressedStream = blob.stream().pipeThrough(ds);
  return await new Response(decompressedStream).blob();
}
```
