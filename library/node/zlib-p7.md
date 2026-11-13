---
title: "Zlib (part 7 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/zlib.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Zlib (part 7 of 7)

## Convenience methods

All of these take a {Buffer}, {TypedArray}, {DataView}, {ArrayBuffer}, or string
as the first argument, an optional second argument
to supply options to the `zlib` classes and will call the supplied callback
with `callback(error, result)`.

Every method has a `*Sync` counterpart, which accept the same arguments, but
without a callback.

### `zlib.brotliCompress(buffer[, options], callback)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {brotli options}
* `callback` {Function}

### `zlib.brotliCompressSync(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {brotli options}

Compress a chunk of data with `BrotliCompress`.

### `zlib.brotliDecompress(buffer[, options], callback)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {brotli options}
* `callback` {Function}

### `zlib.brotliDecompressSync(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {brotli options}

Decompress a chunk of data with `BrotliDecompress`.

### `zlib.deflate(buffer[, options], callback)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.deflateSync(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

Compress a chunk of data with `Deflate`.

### `zlib.deflateRaw(buffer[, options], callback)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.deflateRawSync(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

Compress a chunk of data with `DeflateRaw`.

### `zlib.gunzip(buffer[, options], callback)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.gunzipSync(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

Decompress a chunk of data with `Gunzip`.

### `zlib.gzip(buffer[, options], callback)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.gzipSync(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

Compress a chunk of data with `Gzip`.

### `zlib.inflate(buffer[, options], callback)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.inflateSync(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

Decompress a chunk of data with `Inflate`.

### `zlib.inflateRaw(buffer[, options], callback)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.inflateRawSync(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

Decompress a chunk of data with `InflateRaw`.

### `zlib.unzip(buffer[, options], callback)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.unzipSync(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

Decompress a chunk of data with `Unzip`.

### `zlib.zstdCompress(buffer[, options], callback)`

> Stability: 1 - Experimental

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zstd options}
* `callback` {Function}

### `zlib.zstdCompressSync(buffer[, options])`

> Stability: 1 - Experimental

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zstd options}

Compress a chunk of data with `ZstdCompress`.

### `zlib.zstdDecompress(buffer[, options], callback)`

> Stability: 1 - Experimental

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zstd options}
* `callback` {Function}

### `zlib.zstdDecompressSync(buffer[, options])`

> Stability: 1 - Experimental

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zstd options}

Decompress a chunk of data with `ZstdDecompress`.

## Iterable Compression

> Stability: 1 - Experimental

The `node:zlib/iter` module provides compression and decompression transforms
for use with the `node:stream/iter` iterable streams API.

This module is available only when the `--experimental-stream-iter` CLI flag
is enabled.

Each algorithm has both an async variant (stateful async generator, for use
with `pull()` and `pipeTo()`) and a sync variant (stateful sync
generator, for use with `pullSync()` and `pipeToSync()`).

The async transforms run compression on the libuv threadpool, overlapping
I/O with JavaScript execution. The sync transforms run compression directly
on the main thread.

> Note: The defaults for these transforms are tuned for streaming throughput,
> and differ from the defaults in `node:zlib`. In particular, gzip/deflate
> default to level 4 (not 6) and memLevel 9 (not 8), and Brotli defaults to
> quality 6 (not 11). These choices match common HTTP server configurations
> and provide significantly faster compression with only a small reduction in
> compression ratio. All defaults can be overridden via options.

```mjs
import { from, pull, bytes, text } from 'node:stream/iter';
import { compressGzip, decompressGzip } from 'node:zlib/iter';

// Async round-trip
const compressed = await bytes(pull(from('hello'), compressGzip()));
const original = await text(pull(from(compressed), decompressGzip()));
console.log(original); // 'hello'
```

```cjs
const { from, pull, bytes, text } = require('node:stream/iter');
const { compressGzip, decompressGzip } = require('node:zlib/iter');

async function run() {
  const compressed = await bytes(pull(from('hello'), compressGzip()));
  const original = await text(pull(from(compressed), decompressGzip()));
  console.log(original); // 'hello'
}

run().catch(console.error);
```

```mjs
import { fromSync, pullSync, textSync } from 'node:stream/iter';
import { compressGzipSync, decompressGzipSync } from 'node:zlib/iter';

// Sync round-trip
const compressed = pullSync(fromSync('hello'), compressGzipSync());
const original = textSync(pullSync(compressed, decompressGzipSync()));
console.log(original); // 'hello'
```

```cjs
const { fromSync, pullSync, textSync } = require('node:stream/iter');
const { compressGzipSync, decompressGzipSync } = require('node:zlib/iter');

const compressed = pullSync(fromSync('hello'), compressGzipSync());
const original = textSync(pullSync(compressed, decompressGzipSync()));
console.log(original); // 'hello'
```

### `compressBrotliSync([options])`

* `options` {Object}
  * `chunkSize` {number} Output buffer size. **Default:** `65536` (64 KB).
  * `params` {Object} Key-value object where keys and values are
    `zlib.constants` entries. The most important compressor parameters are:
    * `BROTLI_PARAM_MODE` -- `BROTLI_MODE_GENERIC` (default),
      `BROTLI_MODE_TEXT`, or `BROTLI_MODE_FONT`.
    * `BROTLI_PARAM_QUALITY` -- ranges from `BROTLI_MIN_QUALITY` to
      `BROTLI_MAX_QUALITY`. **Default:** `6` (not `BROTLI_DEFAULT_QUALITY`
      which is 11). Quality 6 is appropriate for streaming; quality 11 is
      intended for offline/build-time compression.
    * `BROTLI_PARAM_SIZE_HINT` -- expected input size. **Default:** `0`
      (unknown).
    * `BROTLI_PARAM_LGWIN` -- window size (log2). **Default:** `20` (1 MB).
      The Brotli library default is 22 (4 MB); the reduced default saves
      memory without significant compression impact for streaming workloads.
    * `BROTLI_PARAM_LGBLOCK` -- input block size (log2).
      See the Brotli compressor options in the zlib documentation for the
      full list.
  * `dictionary` {Buffer|TypedArray|DataView}
* Returns: {Object} A stateful transform.

Create a Brotli compression transform. Output is compatible with
`zlib.brotliDecompress()` and `decompressBrotli()`/`decompressBrotliSync()`.

### `compressDeflateSync([options])`

* `options` {Object}
  * `chunkSize` {number} Output buffer size. **Default:** `65536` (64 KB).
  * `level` {number} Compression level (`0`-`9`). **Default:** `4`.
  * `windowBits` {number} **Default:** `Z_DEFAULT_WINDOWBITS` (15).
  * `memLevel` {number} **Default:** `9`.
  * `strategy` {number} **Default:** `Z_DEFAULT_STRATEGY`.
  * `dictionary` {Buffer|TypedArray|DataView}
* Returns: {Object} A stateful transform.

Create a deflate compression transform. Output is compatible with
`zlib.inflate()` and `decompressDeflate()`/`decompressDeflateSync()`.

### `compressGzipSync([options])`

* `options` {Object}
  * `chunkSize` {number} Output buffer size. **Default:** `65536` (64 KB).
  * `level` {number} Compression level (`0`-`9`). **Default:** `4`.
  * `windowBits` {number} **Default:** `Z_DEFAULT_WINDOWBITS` (15).
  * `memLevel` {number} **Default:** `9`.
  * `strategy` {number} **Default:** `Z_DEFAULT_STRATEGY`.
  * `dictionary` {Buffer|TypedArray|DataView}
* Returns: {Object} A stateful transform.

Create a gzip compression transform. Output is compatible with `zlib.gunzip()`
and `decompressGzip()`/`decompressGzipSync()`.

### `compressZstdSync([options])`

* `options` {Object}
  * `chunkSize` {number} Output buffer size. **Default:** `65536` (64 KB).
  * `params` {Object} Key-value object where keys and values are
    `zlib.constants` entries. The most important compressor parameters are:
    * `ZSTD_c_compressionLevel` -- **Default:** `ZSTD_CLEVEL_DEFAULT` (3).
    * `ZSTD_c_checksumFlag` -- generate a checksum. **Default:** `0`.
    * `ZSTD_c_strategy` -- compression strategy. Values include
      `ZSTD_fast`, `ZSTD_dfast`, `ZSTD_greedy`, `ZSTD_lazy`,
      `ZSTD_lazy2`, `ZSTD_btlazy2`, `ZSTD_btopt`, `ZSTD_btultra`,
      `ZSTD_btultra2`.
      See the Zstd compressor options in the zlib documentation for the
      full list.
  * `pledgedSrcSize` {number} Expected uncompressed size as a non-negative safe
    integer (optional hint).
  * `dictionary` {Buffer|TypedArray|DataView}
* Returns: {Object} A stateful transform.

Create a Zstandard compression transform. Output is compatible with
`zlib.zstdDecompress()` and `decompressZstd()`/`decompressZstdSync()`.

### `decompressBrotliSync([options])`

* `options` {Object}
  * `chunkSize` {number} Output buffer size. **Default:** `65536` (64 KB).
  * `params` {Object} Key-value object where keys and values are
    `zlib.constants` entries. Available decompressor parameters:
    * `BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION` -- boolean
      flag affecting internal memory allocation.
    * `BROTLI_DECODER_PARAM_LARGE_WINDOW` -- boolean flag enabling "Large
      Window Brotli" mode (not compatible with RFC 7932).
      See the Brotli decompressor options in the zlib documentation for
      details.
  * `dictionary` {Buffer|TypedArray|DataView}
* Returns: {Object} A stateful transform.

Create a Brotli decompression transform.

### `decompressDeflateSync([options])`

* `options` {Object}
  * `chunkSize` {number} Output buffer size. **Default:** `65536` (64 KB).
  * `windowBits` {number} **Default:** `Z_DEFAULT_WINDOWBITS` (15).
  * `dictionary` {Buffer|TypedArray|DataView}
* Returns: {Object} A stateful transform.

Create a deflate decompression transform.

### `decompressGzipSync([options])`

* `options` {Object}
  * `chunkSize` {number} Output buffer size. **Default:** `65536` (64 KB).
  * `windowBits` {number} **Default:** `Z_DEFAULT_WINDOWBITS` (15).
  * `dictionary` {Buffer|TypedArray|DataView}
* Returns: {Object} A stateful transform.

Create a gzip decompression transform.

### `decompressZstdSync([options])`

* `options` {Object}
  * `chunkSize` {number} Output buffer size. **Default:** `65536` (64 KB).
  * `params` {Object} Key-value object where keys and values are
    `zlib.constants` entries. Available decompressor parameters:
    * `ZSTD_d_windowLogMax` -- maximum window size (log2) the decompressor
      will allocate. Limits memory usage against malicious input.
      See the Zstd decompressor options in the zlib documentation for
      details.
  * `dictionary` {Buffer|TypedArray|DataView}
* Returns: {Object} A stateful transform.

Create a Zstandard decompression transform.
