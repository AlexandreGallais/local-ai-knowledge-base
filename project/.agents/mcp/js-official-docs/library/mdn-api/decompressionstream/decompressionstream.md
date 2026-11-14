---
title: "DecompressionStream: DecompressionStream() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/decompressionstream/decompressionstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DecompressionStream: DecompressionStream() constructor

The **`DecompressionStream()`** constructor creates a new `DecompressionStream` object which decompresses a stream of data.

## Syntax

```js
new DecompressionStream(format)
```

### Parameters

- `format`
    One of the following compression formats:
    - `"brotli"`
        Decompress the stream using the Brotli algorithm.
    - `"gzip"`
        Decompress the stream using the GZIP algorithm.
    - `"deflate"`
        Decompress the stream using the DEFLATE algorithm in ZLIB Compressed Data Format.
        The ZLIB format includes a header with information about the compression method and the uncompressed size of the data, and a trailing checksum for verifying the integrity of the data
    - `"deflate-raw"`
        Decompress the stream using the DEFLATE algorithm without a header and trailing checksum.
    - `"zstd"`
        Decompress the stream using the ZSTD algorithm.

### Exceptions

- `TypeError`
    Thrown if the format passed to the constructor is not supported.

## Examples

In this example a gzip-compressed blob is decompressed.

```js
const ds = new DecompressionStream("gzip");
const decompressedStream = blob.stream().pipeThrough(ds);
```
