---
title: "Zlib (part 5 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/zlib.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Zlib (part 5 of 7)

## Class: `zlib.ZipFile`

> Stability: 1.0 - Early development

The ZIP archive API is experimental. Using any part of it (this class among
them) emits an experimental warning the first time; merely importing
`node:zlib` does not.

A random-access view over the entries of a ZIP archive on disk. Only the
archive's tail and central directory are read up front; member content is
read from disk lazily, on demand. Writable when opened with
`{ writable: true }`: `zipFile.addEntry()`/`zipFile.add()` append the
new member's data where the central directory used to be, then rewrite the
central directory immediately after it; `zipFile.delete()` just rewrites
the central directory. Both mean the file is altered as soon as the method's
returned `Promise` fulfills. Deleted or replaced members are left behind as
dead space; `zipFile.compact()` produces a stream with none.

These in-place edits are **not crash-atomic**. Rewriting the central directory
happens in place, so a write that fails partway - the disk fills, the device
disconnects, the process is killed - can leave the archive on disk with a
partial or missing central directory, i.e. unreadable, even though the member
data before it is intact. The rejected call surfaces the underlying error and
the `ZipFile` object is left usable (its in-memory view is not discarded, so a
caller can attempt recovery - for example re-writing the entries elsewhere with
`zipFile.compact()`), but that in-memory view may no longer match the bytes
on disk. Write to a copy, or `compact()` into a fresh file, when durability
across a failure matters.

Every method has a `*Sync` counterpart. As with the synchronous `node:fs`
APIs, these block the Node.js event loop and further JavaScript execution
until the operation completes; use them only where synchronous execution is
appropriate (for example, short-lived scripts or startup code), not in code
that must stay responsive. A synchronous method throws `ERR_INVALID_STATE`
if called while an asynchronous `add()`, `addEntry()`, `delete()`, or
`close()` on the same `ZipFile` has not settled yet, since letting the two
interleave could corrupt the archive.

```mjs
import { ZipFile } from 'node:zlib';
import { Buffer } from 'node:buffer';

const zip = await ZipFile.open('archive.zip', { writable: true });
try {
  const entry = await zip.get('member.txt');
  console.log((await entry.content()).toString());
  for await (const chunk of await zip.stream('huge.bin')) {
    // Process each chunk without buffering the whole member.
  }
  await zip.add('new.txt', Buffer.from('hello'));
  await zip.delete('unwanted.txt');
} finally {
  await zip.close();
}
```

```cjs
const { ZipFile } = require('node:zlib');

async function main() {
  const zip = await ZipFile.open('archive.zip', { writable: true });
  try {
    const entry = await zip.get('member.txt');
    console.log((await entry.content()).toString());
    for await (const chunk of await zip.stream('huge.bin')) {
      // Process each chunk without buffering the whole member.
    }
    await zip.add('new.txt', Buffer.from('hello'));
    await zip.delete('unwanted.txt');
  } finally {
    await zip.close();
  }
}
main();
```

### Static method: `zlib.ZipFile.open(filename[, options])`

* `filename` {string}
* `options` {Object}
  * `writable` {boolean} Open the underlying file for both reading and
    writing (`'r+'`), enabling `zipFile.addEntry()`/`zipFile.add()`/
    `zipFile.delete()`. **Default:** `false`.
* Returns: {Promise} Fulfilled with a {ZipFile}.

Throws an `ERR_ZIP_ARCHIVE_TOO_LARGE` error if the archive's central
directory is too large to buffer in memory.

### Static method: `zlib.ZipFile.openSync(filename[, options])`

* `filename` {string}
* `options` {Object} See `zlib.ZipFile.open()`.
* Returns: {ZipFile}

The synchronous version of `zlib.ZipFile.open()`.

### `zipFile.add(filename, data[, options])`

* `filename` {string} The entry's name within the archive. A trailing `/`
  marks a directory entry.
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} The entry's complete,
  uncompressed content.
* `options` {Object} See `zlib.ZipEntry.create()`.
* Returns: {Promise} Fulfilled with the created {ZipEntry}.

Equivalent to `zipFile.addEntry(await zlib.ZipEntry.create(filename, data,
options))`.

### `zipFile.addEntry(entry)`

* `entry` {ZipEntry}
* Returns: {Promise} Fulfilled with `entry`.

Writes `entry` where the central directory currently starts, then rewrites
the central directory to include it, replacing any existing entry of the
same name. Throws `ERR_ZIP_NOT_WRITABLE` if the `ZipFile` was not opened
with `{ writable: true }`.

The returned (same) `entry` is left readable: a streaming entry created with
`zlib.ZipEntry.createStream()`, which would otherwise be spent once
serialized, is promoted in place to a file-backed entry pointing at the copy
just written (valid while this `ZipFile` is open). In-memory entries keep their
own buffer unchanged.

### `zipFile.addEntrySync(entry)`

* `entry` {ZipEntry}
* Returns: {ZipEntry} `entry`.

The synchronous version of `zipFile.addEntry()`. `entry` must not be a
pending streaming entry (one created with
`zlib.ZipEntry.createStream()`) - there is no synchronous way to drain
its asynchronous source.

### `zipFile.addSync(filename, data[, options])`

* `filename` {string} The entry's name within the archive. A trailing `/`
  marks a directory entry.
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} The entry's complete,
  uncompressed content.
* `options` {Object} See `zlib.ZipEntry.createSync()`.
* Returns: {ZipEntry} The created entry.

The synchronous version of `zipFile.add()`. Equivalent to
`zipFile.addEntrySync(zlib.ZipEntry.createSync(filename, data, options))`.

### `zipFile.close()`

* Returns: {Promise}

Closes the underlying file handle.

Closing does not invalidate outstanding objects: `ZipEntry` objects previously
returned by `zipFile.get()` and the `ZipFile`'s own methods will fail with
system-level errors (for example `EBADF`) if used after close, rather than a
dedicated Node.js error code. The same applies to `zipFile.closeSync()`.

### `zipFile.closeSync()`

The synchronous version of `zipFile.close()`.

### `zipFile.comment`

* Type: {string}

The archive-level comment, preserved byte-for-byte across
`zipFile.addEntry()`/`zipFile.delete()` calls. The bytes are decoded
as UTF-8 when they are valid UTF-8 and as CP437 otherwise (the field carries
no encoding flag of its own).

### `zipFile.compact([comment])`

* `comment` {string} An archive comment. **Default:** `zipFile.comment`.
* Returns: {stream.Readable} A stream of the currently live entries,
  serialized as a fresh archive with no dead space left by prior
  `zipFile.addEntry()`/`zipFile.delete()` calls.

Does not modify the open file; pipe the result into a new one:

```mjs
import { createWriteStream } from 'node:fs';
zip.compact().pipe(createWriteStream('compacted.zip'));
```

### `zipFile.compactSync([comment])`

* `comment` {string} An archive comment. **Default:** `zipFile.comment`.
* Returns: {Buffer} The currently live entries, serialized as a fresh
  archive with no dead space left by prior
  `zipFile.addEntry()`/`zipFile.delete()` calls.

The synchronous version of `zipFile.compact()`. Does not modify the
open file.

### `zipFile.delete(name)`

* `name` {string}
* Returns: {Promise} Fulfilled with `true` if an entry named `name` existed
  and was removed, `false` otherwise.

Rewrites the central directory without writing any new content - the
archive does not grow. Throws `ERR_ZIP_NOT_WRITABLE` if the `ZipFile` was
not opened with `{ writable: true }`.

### `zipFile.deleteSync(name)`

* `name` {string}
* Returns: {boolean} `true` if an entry named `name` existed and was
  removed, `false` otherwise.

The synchronous version of `zipFile.delete()`.

### `zipFile.entries()`

* Returns: {Iterator} of `[name, entry]` pairs, where `entry` is a
  {Promise} fulfilled with a `ZipEntry`.

### `zipFile.entriesSync()`

* Returns: {Iterator} of `[name, entry]` pairs, where `entry` is a resolved
  `ZipEntry` (not a `Promise`).

The synchronous version of `zipFile.entries()`.

### `zipFile.forEach(callback[, thisArg])`

* `callback` {Function}
* `thisArg` {any}

### `zipFile.forEachSync(callback[, thisArg])`

* `callback` {Function}
* `thisArg` {any}

The synchronous version of `zipFile.forEach()`: `callback` is invoked
with a resolved `ZipEntry` instead of a `Promise`.

### `zipFile.get(name)`

* `name` {string}
* Returns: {Promise} Fulfilled with a {ZipEntry}.

Returns a lazy, file-backed `ZipEntry` for `name`. Nothing is read from
disk here and no content is buffered: the returned entry reads (and, for
`zipEntry.content()`, decompresses) its member straight from the file on
each access, and the `ZipFile` retains no member content. The entry is valid
only while this `ZipFile` is open. Reading its content later may throw
`ERR_ZIP_ENTRY_TOO_LARGE` if the member is too large to hold in a single
buffer; use `zipEntry.contentIterator()` (or `zipFile.stream()`)
instead. Throws `ERR_ZIP_ENTRY_NOT_FOUND` if the archive has no entry
named `name`.

### `zipFile.getSync(name)`

* `name` {string}
* Returns: {ZipEntry}

The synchronous version of `zipFile.get()`. Like `get()`, it reads
nothing up front and only builds the lazy handle, so it does not itself block
on I/O - but reads performed later through the returned entry (such as
`zipEntry.contentSync()`) do; see the note above on synchronous methods.

### `zipFile.has(name)`

* `name` {string}
* Returns: {boolean}

### `zipFile.keys()`

* Returns: {Iterator} of entry names.

### `zipFile.size`

* Type: {number}

The number of entries in the archive.

### `zipFile.stream(name[, options])`

* `name` {string}
* `options` {Object}
  * `verify` {boolean} Verify the entry's CRC-32 checksum. **Default:** `true`.
  * `maxSize` {number} Reject content declaring more than this many
    uncompressed bytes. **Default:** no limit.
* Returns: {Promise} Fulfilled with a {stream.Readable} of the member's
  decompressed content, without buffering the whole member in memory.

Convenience wrapper that resolves to a `Readable` over
`zipEntry.contentIterator()` of `zipFile.get()``(name)`; the
compressed bytes are read from disk as the stream is consumed. The returned
promise rejects with `ERR_ZIP_ENTRY_NOT_FOUND` if the archive has no entry
named `name`.

### `zipFile.values()`

* Returns: {Iterator} of {Promise} objects, each fulfilled with a
  `ZipEntry`.

### `zipFile.valuesSync()`

* Returns: {Iterator} of resolved `ZipEntry` values (not `Promise`s).

The synchronous version of `zipFile.values()`.

### `zipFile.writable`

* Type: {boolean}

Whether this `ZipFile` was opened with `{ writable: true }`.

## Class: `zlib.ZlibBase`

* Extends: `stream.Transform`

Not exported by the `node:zlib` module. It is documented here because it is the
base class of the compressor/decompressor classes.

This class inherits from `stream.Transform`, allowing `node:zlib` objects to
be used in pipes and similar stream operations.

### `zlib.bytesWritten`

* Type: {number}

The `zlib.bytesWritten` property specifies the number of bytes written to
the engine, before the bytes are processed (compressed or decompressed,
as appropriate for the derived class).

### `zlib.close([callback])`

* `callback` {Function}

Close the underlying handle.

### `zlib.flush([kind, ]callback)`

* `kind` **Default:** `zlib.constants.Z_FULL_FLUSH` for zlib-based streams,
  `zlib.constants.BROTLI_OPERATION_FLUSH` for Brotli-based streams, and
  `zlib.constants.ZSTD_e_flush` for Zstd-based streams.
* `callback` {Function}

Flush pending data. Don't call this frivolously, premature flushes negatively
impact the effectiveness of the compression algorithm.

Calling this only flushes data from the internal `zlib` state, and does not
perform flushing of any kind on the streams level. Rather, it behaves like a
normal call to `.write()`, i.e. it will be queued up behind other pending
writes and will only produce output when data is being read from the stream.

### `zlib.params(level, strategy, callback)`

* `level` {integer}
* `strategy` {integer}
* `callback` {Function}

This function is only available for zlib-based streams, i.e. not Brotli.

Dynamically update the compression level and compression strategy.
Only applicable to deflate algorithm.

### `zlib.reset()`

For inflate and deflate streams, reset the compressor/decompressor to factory
defaults.

For Brotli streams, start a new compression or decompression session while
preserving the configured parameters and dictionary.

For Zstd streams, cancel the current frame and start a new session while
preserving the configured parameters and dictionary. If `pledgedSrcSize` was
configured for a Zstd compressor, it applies again to the next frame.

Resetting a gzip stream after it has emitted output for an incomplete member
causes the stream to error with `ERR_ZLIB_INCOMPLETE_FRAME`. Resetting at
that point would discard the member state while the bytes already written out
remain at the start of the output stream, leaving it undecodable. Call
`.end()`, or start over with a new gzip stream, instead.
zlib-wrapped deflate may still `reset()` after a flush; callers that reuse
the compressor discard the first output. Raw deflate has no wrapper header,
so `reset()` after a flush still concatenates.

Calling `reset()` while a write is in progress throws an `Error`.

Resetting an incomplete Zstd compression frame after it has emitted output
causes the stream to error with `ERR_ZLIB_INCOMPLETE_FRAME`. Resetting at
that point would discard the frame state while the bytes already written
out remain at the start of the output stream, leaving it undecodable. Call
`.end()`, or start over with a new stream, instead.
