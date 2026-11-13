---
title: "CompressionStream: CompressionStream() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/compressionstream/compressionstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CompressionStream: CompressionStream() constructor

The **`CompressionStream()`** constructor creates a new `CompressionStream` object which compresses a stream of data.

## Syntax

```js
new CompressionStream(format)
```

### Parameters

- `format`
    One of the following allowed compression formats:
    - `"brotli"`
        Compresses the stream using the Brotli algorithm.
    - `"gzip"`
        Compresses the stream using the GZIP format.
    - `"deflate"`
        Compresses the stream using the DEFLATE algorithm in ZLIB Compressed Data Format.
        The ZLIB format includes a header with information about the compression method and the uncompressed size of the data, and a trailing checksum for verifying the integrity of the data
    - `"deflate-raw"`
        Compresses the stream using the DEFLATE algorithm without a header and trailing checksum.
    - `"zstd"`
        Compresses the stream using the ZSTD algorithm.

### Exceptions

- `TypeError`
    Thrown if the format passed to the constructor is not supported.

## Examples

In this example a stream is compressed using gzip compression.

```js
const compressedReadableStream = inputReadableStream.pipeThrough(
  new CompressionStream("gzip"),
);
```
