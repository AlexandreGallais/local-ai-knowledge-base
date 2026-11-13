---
title: "Zlib (part 2 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/zlib.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Zlib (part 2 of 7)

## Memory usage tuning

### For zlib-based streams

From `zlib/zconf.h`, modified for Node.js usage:

The memory requirements for deflate are (in bytes):

```js
(1 << (windowBits + 2)) + (1 << (memLevel + 9));
```

That is: 128K for `windowBits` = 15 + 128K for `memLevel` = 8
(default values) plus a few kilobytes for small objects.

For example, to reduce the default memory requirements from 256K to 128K, the
options should be set to:

```js
const options = { windowBits: 14, memLevel: 7 };
```

This will, however, generally degrade compression.

The memory requirements for inflate are (in bytes) `1 << windowBits`.
That is, 32K for `windowBits` = 15 (default value) plus a few kilobytes
for small objects.

This is in addition to a single internal output slab buffer of size
`chunkSize`, which defaults to 16K.

The speed of `zlib` compression is affected most dramatically by the
`level` setting. A higher level will result in better compression, but
will take longer to complete. A lower level will result in less
compression, but will be much faster.

In general, greater memory usage options will mean that Node.js has to make
fewer calls to `zlib` because it will be able to process more data on
each `write` operation. So, this is another factor that affects the
speed, at the cost of memory usage.

### For Brotli-based streams

There are equivalents to the zlib options for Brotli-based streams, although
these options have different ranges than the zlib ones:

* zlib's `level` option matches Brotli's `BROTLI_PARAM_QUALITY` option.
* zlib's `windowBits` option matches Brotli's `BROTLI_PARAM_LGWIN` option.

See below for more details on Brotli-specific options.

### For Zstd-based streams

> Stability: 1 - Experimental

There are equivalents to the zlib options for Zstd-based streams, although
these options have different ranges than the zlib ones:

* zlib's `level` option matches Zstd's `ZSTD_c_compressionLevel` option.
* zlib's `windowBits` option matches Zstd's `ZSTD_c_windowLog` option.

See below for more details on Zstd-specific options.

## Flushing

Calling `.flush()` on a compression stream will make `zlib` return as much
output as currently possible. This may come at the cost of degraded compression
quality, but can be useful when data needs to be available as soon as possible.

In the following example, `flush()` is used to write a compressed partial
HTTP response to the client:

```mjs
import zlib from 'node:zlib';
import http from 'node:http';
import { pipeline } from 'node:stream';

http.createServer((request, response) => {
  // For the sake of simplicity, the Accept-Encoding checks are omitted.
  response.writeHead(200, { 'content-encoding': 'gzip' });
  const output = zlib.createGzip();
  let i;

  pipeline(output, response, (err) => {
    if (err) {
      // If an error occurs, there's not much we can do because
      // the server has already sent the 200 response code and
      // some amount of data has already been sent to the client.
      // The best we can do is terminate the response immediately
      // and log the error.
      clearInterval(i);
      response.end();
      console.error('An error occurred:', err);
    }
  });

  i = setInterval(() => {
    output.write(`The current time is ${Date()}\n`, () => {
      // The data has been passed to zlib, but the compression algorithm may
      // have decided to buffer the data for more efficient compression.
      // Calling .flush() will make the data available as soon as the client
      // is ready to receive it.
      output.flush();
    });
  }, 1000);
}).listen(1337);
```

```cjs
const zlib = require('node:zlib');
const http = require('node:http');
const { pipeline } = require('node:stream');

http.createServer((request, response) => {
  // For the sake of simplicity, the Accept-Encoding checks are omitted.
  response.writeHead(200, { 'content-encoding': 'gzip' });
  const output = zlib.createGzip();
  let i;

  pipeline(output, response, (err) => {
    if (err) {
      // If an error occurs, there's not much we can do because
      // the server has already sent the 200 response code and
      // some amount of data has already been sent to the client.
      // The best we can do is terminate the response immediately
      // and log the error.
      clearInterval(i);
      response.end();
      console.error('An error occurred:', err);
    }
  });

  i = setInterval(() => {
    output.write(`The current time is ${Date()}\n`, () => {
      // The data has been passed to zlib, but the compression algorithm may
      // have decided to buffer the data for more efficient compression.
      // Calling .flush() will make the data available as soon as the client
      // is ready to receive it.
      output.flush();
    });
  }, 1000);
}).listen(1337);
```

## Constants

### zlib constants

All of the constants defined in `zlib.h` are also defined on
`require('node:zlib').constants`. In the normal course of operations, it will
not be necessary to use these constants. They are documented so that their
presence is not surprising. This section is taken almost directly from the
zlib documentation.

Previously, the constants were available directly from `require('node:zlib')`,
for instance `zlib.Z_NO_FLUSH`. Accessing the constants directly from the module
is currently still possible but is deprecated.

Allowed flush values.

* `zlib.constants.Z_NO_FLUSH`
* `zlib.constants.Z_PARTIAL_FLUSH`
* `zlib.constants.Z_SYNC_FLUSH`
* `zlib.constants.Z_FULL_FLUSH`
* `zlib.constants.Z_FINISH`
* `zlib.constants.Z_BLOCK`

Return codes for the compression/decompression functions. Negative
values are errors, positive values are used for special but normal
events.

* `zlib.constants.Z_OK`
* `zlib.constants.Z_STREAM_END`
* `zlib.constants.Z_NEED_DICT`
* `zlib.constants.Z_ERRNO`
* `zlib.constants.Z_STREAM_ERROR`
* `zlib.constants.Z_DATA_ERROR`
* `zlib.constants.Z_MEM_ERROR`
* `zlib.constants.Z_BUF_ERROR`
* `zlib.constants.Z_VERSION_ERROR`

Compression levels.

* `zlib.constants.Z_NO_COMPRESSION`
* `zlib.constants.Z_BEST_SPEED`
* `zlib.constants.Z_BEST_COMPRESSION`
* `zlib.constants.Z_DEFAULT_COMPRESSION`

Compression strategy.

* `zlib.constants.Z_FILTERED`
* `zlib.constants.Z_HUFFMAN_ONLY`
* `zlib.constants.Z_RLE`
* `zlib.constants.Z_FIXED`
* `zlib.constants.Z_DEFAULT_STRATEGY`

### Brotli constants

There are several options and other constants available for Brotli-based
streams:

#### Flush operations

The following values are valid flush operations for Brotli-based streams:

* `zlib.constants.BROTLI_OPERATION_PROCESS` (default for all operations)
* `zlib.constants.BROTLI_OPERATION_FLUSH` (default when calling `.flush()`)
* `zlib.constants.BROTLI_OPERATION_FINISH` (default for the last chunk)
* `zlib.constants.BROTLI_OPERATION_EMIT_METADATA`
  * This particular operation may be hard to use in a Node.js context,
    as the streaming layer makes it hard to know which data will end up
    in this frame. Also, there is currently no way to consume this data through
    the Node.js API.

#### Compressor options

There are several options that can be set on Brotli encoders, affecting
compression efficiency and speed. Both the keys and the values can be accessed
as properties of the `zlib.constants` object.

The most important options are:

* `BROTLI_PARAM_MODE`
  * `BROTLI_MODE_GENERIC` (default)
  * `BROTLI_MODE_TEXT`, adjusted for UTF-8 text
  * `BROTLI_MODE_FONT`, adjusted for WOFF 2.0 fonts
* `BROTLI_PARAM_QUALITY`
  * Ranges from `BROTLI_MIN_QUALITY` to `BROTLI_MAX_QUALITY`,
    with a default of `BROTLI_DEFAULT_QUALITY`.
* `BROTLI_PARAM_SIZE_HINT`
  * Integer value representing the expected input size;
    defaults to `0` for an unknown input size.

The following flags can be set for advanced control over the compression
algorithm and memory usage tuning:

* `BROTLI_PARAM_LGWIN`
  * Ranges from `BROTLI_MIN_WINDOW_BITS` to `BROTLI_MAX_WINDOW_BITS`,
    with a default of `BROTLI_DEFAULT_WINDOW`, or up to
    `BROTLI_LARGE_MAX_WINDOW_BITS` if the `BROTLI_PARAM_LARGE_WINDOW` flag
    is set.
* `BROTLI_PARAM_LGBLOCK`
  * Ranges from `BROTLI_MIN_INPUT_BLOCK_BITS` to `BROTLI_MAX_INPUT_BLOCK_BITS`.
* `BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING`
  * Boolean flag that decreases compression ratio in favour of
    decompression speed.
* `BROTLI_PARAM_LARGE_WINDOW`
  * Boolean flag enabling “Large Window Brotli” mode (not compatible with the
    Brotli format as standardized in RFC 7932).
* `BROTLI_PARAM_NPOSTFIX`
  * Ranges from `0` to `BROTLI_MAX_NPOSTFIX`.
* `BROTLI_PARAM_NDIRECT`
  * Ranges from `0` to `15 << NPOSTFIX` in steps of `1 << NPOSTFIX`.

#### Decompressor options

These advanced options are available for controlling decompression:

* `BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION`
  * Boolean flag that affects internal memory allocation patterns.
* `BROTLI_DECODER_PARAM_LARGE_WINDOW`
  * Boolean flag enabling “Large Window Brotli” mode (not compatible with the
    Brotli format as standardized in RFC 7932).

### Zstd constants

> Stability: 1 - Experimental

There are several options and other constants available for Zstd-based
streams:

#### Flush operations

The following values are valid flush operations for Zstd-based streams:

* `zlib.constants.ZSTD_e_continue` (default for all operations)
* `zlib.constants.ZSTD_e_flush` (default when calling `.flush()`)
* `zlib.constants.ZSTD_e_end` (default for the last chunk)

#### Compressor options

There are several options that can be set on Zstd encoders, affecting
compression efficiency and speed. Both the keys and the values can be accessed
as properties of the `zlib.constants` object.

The most important options are:

* `ZSTD_c_compressionLevel`
  * Set compression parameters according to pre-defined cLevel table. Default
    level is ZSTD\_CLEVEL\_DEFAULT==3.
* `ZSTD_c_strategy`
  * Select the compression strategy.
  * Possible values are listed in the strategy options section below.

#### Strategy options

The following constants can be used as values for the `ZSTD_c_strategy`
parameter:

* `zlib.constants.ZSTD_fast`
* `zlib.constants.ZSTD_dfast`
* `zlib.constants.ZSTD_greedy`
* `zlib.constants.ZSTD_lazy`
* `zlib.constants.ZSTD_lazy2`
* `zlib.constants.ZSTD_btlazy2`
* `zlib.constants.ZSTD_btopt`
* `zlib.constants.ZSTD_btultra`
* `zlib.constants.ZSTD_btultra2`

Example:

```js
const stream = zlib.createZstdCompress({
  params: {
    [zlib.constants.ZSTD_c_strategy]: zlib.constants.ZSTD_btultra,
  },
});
```

#### Pledged Source Size

It's possible to specify the expected total size of the uncompressed input via
`opts.pledgedSrcSize`, which must be a non-negative safe integer. If the size
doesn't match at the end of the input, compression will fail with the code
`ZSTD_error_srcSize_wrong`.

`zlib.zstdCompress()` defaults `opts.pledgedSrcSize` to the byte length of
its input.

#### Decompressor options

These advanced options are available for controlling decompression:

* `ZSTD_d_windowLogMax`
  * Select a size limit (in power of 2) beyond which the streaming API will
    refuse to allocate memory buffer in order to protect the host from
    unreasonable memory requirements.

## Class: `Options`

Each zlib-based class takes an `options` object. No options are required.

Some options are only relevant when compressing and are
ignored by the decompression classes.

* `flush` {integer} **Default:** `zlib.constants.Z_NO_FLUSH`
* `finishFlush` {integer} **Default:** `zlib.constants.Z_FINISH`
* `chunkSize` {integer} **Default:** `16 * 1024`
* `windowBits` {integer}
* `level` {integer} (compression only)
* `memLevel` {integer} (compression only)
* `strategy` {integer} (compression only)
* `dictionary` {Buffer|TypedArray|DataView|ArrayBuffer} (deflate/inflate only,
  empty dictionary by default)
* `info` {boolean} (If `true`, returns an object with `buffer` and `engine`.)
* `maxOutputLength` {integer} Limits output size when using
  convenience methods. **Default:** `buffer.kMaxLength`
* `rejectGarbageAfterEnd` {boolean} If `true`, decompression fails when
  trailing input is detected after the end of the compressed stream. This
  includes unreadable bytes and, when decompressing gzip, additional gzip
  members following the first member. **Default:** `false`

See the `deflateInit2` and `inflateInit2` documentation for more
information.

## Class: `BrotliOptions`

Each Brotli-based class takes an `options` object. All options are optional.

* `flush` {integer} **Default:** `zlib.constants.BROTLI_OPERATION_PROCESS`
* `finishFlush` {integer} **Default:** `zlib.constants.BROTLI_OPERATION_FINISH`
* `chunkSize` {integer} **Default:** `16 * 1024`
* `params` {Object} Key-value object containing indexed Brotli parameters.
* `maxOutputLength` {integer} Limits output size when using
  convenience methods. **Default:** `buffer.kMaxLength`
* `info` {boolean} If `true`, returns an object with `buffer` and `engine`. **Default:** `false`
* `rejectGarbageAfterEnd` {boolean} If `true`, decompression fails when
  input remains after the first complete compressed stream. **Default:** `false`

For example:

```js
const stream = zlib.createBrotliCompress({
  chunkSize: 32 * 1024,
  params: {
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
    [zlib.constants.BROTLI_PARAM_SIZE_HINT]: fs.statSync(inputFile).size,
  },
});
```

## Class: `zlib.BrotliCompress`

* Extends: `ZlibBase`

Compress data using the Brotli algorithm.

## Class: `zlib.BrotliDecompress`

* Extends: `ZlibBase`

Decompress data using the Brotli algorithm.

## Class: `zlib.Deflate`

* Extends: `ZlibBase`

Compress data using deflate.

## Class: `zlib.DeflateRaw`

* Extends: `ZlibBase`

Compress data using deflate, and do not append a `zlib` header.

## Class: `zlib.Gunzip`

* Extends: `ZlibBase`

Decompress a gzip stream.

## Class: `zlib.Gzip`

* Extends: `ZlibBase`

Compress data using gzip.

## Class: `zlib.Inflate`

* Extends: `ZlibBase`

Decompress a deflate stream.

## Class: `zlib.InflateRaw`

* Extends: `ZlibBase`

Decompress a raw deflate stream.

## Class: `zlib.Unzip`

* Extends: `ZlibBase`

Decompress either a Gzip- or Deflate-compressed stream by auto-detecting
the header.
