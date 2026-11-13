---
title: "Zlib (part 6 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/zlib.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Zlib (part 6 of 7)

## Class: `ZstdOptions`

> Stability: 1 - Experimental

Each Zstd-based class takes an `options` object. All options are optional.

* `flush` {integer} **Default:** `zlib.constants.ZSTD_e_continue`
* `finishFlush` {integer} **Default:** `zlib.constants.ZSTD_e_end`
* `chunkSize` {integer} **Default:** `16 * 1024`
* `params` {Object} Key-value object containing indexed Zstd parameters.
* `pledgedSrcSize` {number} Expected total size of the uncompressed input. It
  must be a non-negative safe integer and must match the input size when
  compression finishes. Only applicable to Zstd compressors.
* `maxOutputLength` {integer} Limits output size when using
  convenience methods. **Default:** `buffer.kMaxLength`
* `info` {boolean} If `true`, returns an object with `buffer` and `engine`. **Default:** `false`
* `dictionary` {Buffer|TypedArray|DataView|ArrayBuffer} Optional dictionary used
  to improve compression efficiency when compressing or decompressing data that
  shares common patterns with the dictionary.
* `rejectGarbageAfterEnd` {boolean} If `true`, decompression fails when
  input remains after a complete sequence of Zstd frames. **Default:** `false`

For example:

```js
const stream = zlib.createZstdCompress({
  chunkSize: 32 * 1024,
  params: {
    [zlib.constants.ZSTD_c_compressionLevel]: 10,
    [zlib.constants.ZSTD_c_checksumFlag]: 1,
  },
});
```

## Class: `zlib.ZstdCompress`

> Stability: 1 - Experimental

Compress data using the Zstd algorithm.

## Class: `zlib.ZstdDecompress`

> Stability: 1 - Experimental

Decompress data using the Zstd algorithm. Concatenated Zstd and skippable frames
are decoded as a single stream.

## `zlib.constants`

Provides an object enumerating Zlib-related constants.

## `zlib.crc32(data[, value])`

* `data` {string|Buffer|TypedArray|DataView} When `data` is a string,
  it will be encoded as UTF-8 before being used for computation.
* `value` {integer} An optional starting value. It must be a 32-bit unsigned
  integer. **Default:** `0`
* Returns: {integer} A 32-bit unsigned integer containing the checksum.

Computes a 32-bit Cyclic Redundancy Check checksum of `data`. If
`value` is specified, it is used as the starting value of the checksum,
otherwise, 0 is used as the starting value.

The CRC algorithm is designed to compute checksums and to detect error
in data transmission. It's not suitable for cryptographic authentication.

To be consistent with other APIs, if the `data` is a string, it will
be encoded with UTF-8 before being used for computation. If users only
use Node.js to compute and match the checksums, this works well with
other APIs that uses the UTF-8 encoding by default.

Some third-party JavaScript libraries compute the checksum on a
string based on `str.charCodeAt()` so that it can be run in browsers.
If users want to match the checksum computed with this kind of library
in the browser, it's better to use the same library in Node.js
if it also runs in Node.js. If users have to use `zlib.crc32()` to
match the checksum produced by such a third-party library:

1. If the library accepts `Uint8Array` as input, use `TextEncoder`
   in the browser to encode the string into a `Uint8Array` with UTF-8
   encoding, and compute the checksum based on the UTF-8 encoded string
   in the browser.
2. If the library only takes a string and compute the data based on
   `str.charCodeAt()`, on the Node.js side, convert the string into
   a buffer using `Buffer.from(str, 'utf16le')`.

```mjs
import zlib from 'node:zlib';
import { Buffer } from 'node:buffer';

let crc = zlib.crc32('hello');  // 907060870
crc = zlib.crc32('world', crc);  // 4192936109

crc = zlib.crc32(Buffer.from('hello', 'utf16le'));  // 1427272415
crc = zlib.crc32(Buffer.from('world', 'utf16le'), crc);  // 4150509955
```

```cjs
const zlib = require('node:zlib');
const { Buffer } = require('node:buffer');

let crc = zlib.crc32('hello');  // 907060870
crc = zlib.crc32('world', crc);  // 4192936109

crc = zlib.crc32(Buffer.from('hello', 'utf16le'));  // 1427272415
crc = zlib.crc32(Buffer.from('world', 'utf16le'), crc);  // 4150509955
```

## `zlib.createBrotliCompress([options])`

* `options` {brotli options}

Creates and returns a new `BrotliCompress` object.

## `zlib.createBrotliDecompress([options])`

* `options` {brotli options}

Creates and returns a new `BrotliDecompress` object.

## `zlib.createDeflate([options])`

* `options` {zlib options}

Creates and returns a new `Deflate` object.

## `zlib.createDeflateRaw([options])`

* `options` {zlib options}

Creates and returns a new `DeflateRaw` object.

An upgrade of zlib from 1.2.8 to 1.2.11 changed behavior when `windowBits`
is set to 8 for raw deflate streams. zlib would automatically set `windowBits`
to 9 if was initially set to 8. Newer versions of zlib will throw an exception,
so Node.js restored the original behavior of upgrading a value of 8 to 9,
since passing `windowBits = 9` to zlib actually results in a compressed stream
that effectively uses an 8-bit window only.

## `zlib.createGunzip([options])`

* `options` {zlib options}

Creates and returns a new `Gunzip` object.

## `zlib.createGzip([options])`

* `options` {zlib options}

Creates and returns a new `Gzip` object.
See example.

## `zlib.createInflate([options])`

* `options` {zlib options}

Creates and returns a new `Inflate` object.

## `zlib.createInflateRaw([options])`

* `options` {zlib options}

Creates and returns a new `InflateRaw` object.

## `zlib.createUnzip([options])`

* `options` {zlib options}

Creates and returns a new `Unzip` object.

## `zlib.createZipArchive(entries[, options])`

> Stability: 1.0 - Early development

The ZIP archive API is experimental. Using any part of it (this function among
them) emits an experimental warning the first time; merely importing
`node:zlib` does not.

* `entries` {Iterable|AsyncIterable} of `ZipEntry`.
* `options` {string|Object} An archive comment, as a shorthand for
  `{ comment: options }`.
  * `comment` {string} An archive comment.
  * `baseOffset` {number} Shifts every local/central header offset the
    archive records by this many bytes, so the emitted stream is
    self-describing even when something else is written before it - for
    example, appending the archive after `baseOffset` bytes already written to
    the same file, rather than at its start. **Default:** `0`.
* Returns: {stream.Readable} A byte stream of the serialized archive.

Serializes `entries` into a ZIP archive, switching to Zip64 structures
automatically once the entry count, or any offset or size, exceeds what the
classic 32-/16-bit ZIP fields can hold. The returned `Readable` is also an
`AsyncIterable` of the same {Buffer} chunks it streams.

Entries are written in iteration order and nothing deduplicates names: an
iterable that yields two entries with the same name produces an archive
containing both, and most extraction tools keep the one that appears later.
`ZipBuffer` and `ZipFile` `add()` methods replace entries by name
instead.

The entries are owned by the returned stream: each is consumed as the archive
is produced and must not be reused afterwards. This matters for streaming
entries (from `zlib.ZipEntry.createStream()`), which hold an underlying
source such as a file read stream. If the returned stream is destroyed before
it is fully consumed - for example, the destination of a `pipeline()`
fails - it disposes the entry it was serializing and every entry still queued
behind it, destroying their sources so no descriptor leaks. Consume the stream
to the end, or destroy it (directly, through a failed `pipeline()`, or with
`await using`), to guarantee this cleanup; a stream that is neither consumed
nor destroyed cannot release anything. A `ZipEntry` that is never handed to
an archive can be released directly with `Symbol.dispose` / `Symbol.asyncDispose`.

Throws an `ERR_ZIP_ARCHIVE_TOO_LARGE` error if the archive comment
exceeds 65,535 bytes when encoded as UTF-8.

```mjs
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Buffer } from 'node:buffer';
import { ZipEntry, createZipArchive } from 'node:zlib';

const entries = [
  await ZipEntry.create('hello.txt', Buffer.from('Hello, world!')),
  await ZipEntry.create('data/', Buffer.alloc(0)),
];
await pipeline(
  createZipArchive(entries, 'created by node:zlib'),
  createWriteStream('archive.zip'),
);
```

```cjs
const { createWriteStream } = require('node:fs');
const { pipeline } = require('node:stream/promises');
const { ZipEntry, createZipArchive } = require('node:zlib');

async function main() {
  const entries = [
    await ZipEntry.create('hello.txt', Buffer.from('Hello, world!')),
    await ZipEntry.create('data/', Buffer.alloc(0)),
  ];
  await pipeline(
    createZipArchive(entries, 'created by node:zlib'),
    createWriteStream('archive.zip'),
  );
}
main();
```

Passing `options.baseOffset` produces an archive that is valid immediately
when placed after other content in the same file, without relying on a
reader's self-extracting-archive detection to compensate for the shift:

```mjs
import { createWriteStream } from 'node:fs';
import { Buffer } from 'node:buffer';
import { ZipEntry, createZipArchive } from 'node:zlib';

const prefix = Buffer.from('#!/bin/sh\nexit 0\n');
const entries = [await ZipEntry.create('hello.txt', Buffer.from('Hello, world!'))];
const out = createWriteStream('self-extracting.zip');
out.write(prefix);
createZipArchive(entries, { baseOffset: prefix.byteLength }).pipe(out);
```

## `zlib.createZipArchiveSync(entries[, options])`

> Stability: 1.0 - Early development

The ZIP archive API is experimental. Using any part of it (this function among
them) emits an experimental warning the first time; merely importing
`node:zlib` does not.

* `entries` {Iterable} of `ZipEntry`.
* `options` {string|Object} See `zlib.createZipArchive()`.
* Returns: {Iterator} of {Buffer} chunks making up the serialized archive.

The synchronous version of `zlib.createZipArchive()`. Blocks the
Node.js event loop and further JavaScript execution until the whole
archive (including any deflate passes) has been produced; use only where
synchronous execution is appropriate (for example, short-lived scripts or
startup code), not in code that must stay responsive. `entries` must be a
plain (synchronous) `Iterable` - a streaming entry created with
`zlib.ZipEntry.createStream()` throws when its turn to serialize comes
up, since draining its asynchronous source has no synchronous equivalent.

As with `zlib.createZipArchive()`, the entries are owned by the returned
iterator and must not be reused. If iteration stops early - including the
throw on a streaming entry - the entry that stopped it and every entry still
queued behind it are disposed, releasing any sources they hold.

## `zlib.zipFiles(files[, options])`

> Stability: 1.0 - Early development

The ZIP archive API is experimental. Using any part of it (this function among
them) emits an experimental warning the first time; merely importing
`node:zlib` does not.

* `files` {Iterable} of `[sourcePath, entryName]` string pairs. Any iterable
  works — an array, a `Map`, the result of `Object.entries()`, a generator.
* `options` {string|Object}
  * `followSymlinks` {boolean} Resolve a symbolic link and archive the file it
    points to, rather than storing the link itself. **Default:** `true`.
  * `comment` {string} An archive comment; a string `options` is shorthand for
    `{ comment: options }`.
  * `baseOffset` {number} See `zlib.createZipArchive()`.
* Returns: {stream.Readable} of {Buffer} chunks making up the serialized
  archive.

Builds an archive from files on disk. For each `[sourcePath, entryName]` pair
it reads `sourcePath` and adds an entry named `entryName`, capturing the file's
Unix mode and modification time. A directory becomes a directory entry; a
regular file's contents are streamed in (as a `zlib.ZipEntry.createStream()`
entry) without being buffered in memory. Directory contents are not walked
recursively — list each path you want included.

When `followSymlinks` is `true` (the default) a symbolic link is resolved and
archived as its target file; when it is `false` the link itself is stored as a
symbolic-link entry whose content is the target path (see
`zlib.ZipEntry.createSymlink()`).

```mjs
import { zipFiles } from 'node:zlib';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

await pipeline(
  zipFiles([
    ['/data/report.pdf', 'report.pdf'],
    ['/data/notes.txt', 'docs/notes.txt'],
  ]),
  createWriteStream('archive.zip'),
);
```

## `zlib.createZstdCompress([options])`

> Stability: 1 - Experimental

* `options` {zstd options}

Creates and returns a new `ZstdCompress` object.

## `zlib.createZstdDecompress([options])`

> Stability: 1 - Experimental

* `options` {zstd options}

Creates and returns a new `ZstdDecompress` object.

## `zlib.getMaxZipContentSize()`

> Stability: 1.0 - Early development

The ZIP archive API is experimental. Using any part of it (this function among
them) emits an experimental warning the first time; merely importing
`node:zlib` does not.

* Returns: {number}

The current default ceiling, in bytes, applied by `zipEntry.content()`
when no explicit `maxSize` is given. **Default:** `268435456` (256 MiB).

## `zlib.setMaxZipContentSize(size)`

> Stability: 1.0 - Early development

The ZIP archive API is experimental. Using any part of it (this function among
them) emits an experimental warning the first time; merely importing
`node:zlib` does not.

* `size` {number}

Sets the default ceiling used by `zipEntry.content()` when no explicit
`maxSize` option is given. This is a guard against zip bombs: an archive
whose central directory declares a member larger than this is rejected
before allocating memory for it. Streaming reads
(`zipEntry.contentIterator()`, `zipFile.stream()`) are bounded-memory
by design and are not affected by this setting.
