---
title: "Zlib (part 4 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/zlib.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Zlib (part 4 of 7)

## Class: `zlib.ZipEntry`

> Stability: 1.0 - Early development

The ZIP archive API is experimental. Using any part of it (this class among
them) emits an experimental warning the first time; merely importing
`node:zlib` does not.

A single file or directory inside a ZIP archive. Instances are produced by
`ZipBuffer` and `ZipFile`, or created directly for writing with
`ZipEntry.create()`/`ZipEntry.createStream()`.

`create()` and `content()` each have a `*Sync` counterpart (the streaming
`contentIterator()` does not). As with the synchronous `node:fs` APIs, these
block the
Node.js event loop and further JavaScript execution until the operation
(including any deflate/inflate pass) completes; use them only where
synchronous execution is appropriate (for example, short-lived scripts or
startup code), not in code that must stay responsive.

### Static method: `zlib.ZipEntry.create(filename, data[, options])`

* `filename` {string} The entry's name within the archive. A trailing `/`
  marks a directory entry.
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} The entry's complete,
  uncompressed content. Must be empty when `filename` names a directory.
* `options` {Object}
  * `comment` {string} An entry comment.
  * `mode` {integer} Unix permission bits. **Default:** `0o644` (`0o755` for
    directories).
  * `modified` {Date} The entry's modification time. **Default:** the
    current time.
  * `method` {string} One of `'deflate'`, `'store'`, or `'zstd'`. **Default:**
    `'deflate'`, except for directories and empty content, which are always
    stored.
* Returns: {Promise} Fulfilled with a {ZipEntry}.

Compresses `data` (unless `method` is `'store'`, or compression would not
reduce its size) and computes its CRC-32.

When the entry ends up stored uncompressed (because `method` is `'store'`,
or because compression would not reduce the size), the entry retains a
zero-copy view of `data` rather than a copy, and its CRC-32 has already been
recorded. Do not mutate `data` after creating the entry; pass a copy if it
might change.

The MS-DOS date/time fields ZIP uses for `modified` have 2-second resolution
and no time zone. When `modified` does not fall on a whole 2-second
boundary, an Info-ZIP extended-timestamp extra field is written as well,
recording the whole (UTC) second so the time round-trips more precisely (see
`zipEntry.modified`). This applies to every entry-creation path.

### Static method: `zlib.ZipEntry.createStream(filename, source[, options])`

* `filename` {string} The entry's name within the archive. Must not end
  in `/`.
* `source` {AsyncIterable} Yields the entry's uncompressed content as
  `Uint8Array` chunks.
* `options` {Object}
  * `comment` {string} An entry comment.
  * `mode` {integer} Unix permission bits. **Default:** `0o644`.
  * `modified` {Date} The entry's modification time. **Default:** the
    current time.
  * `method` {string} One of `'deflate'`, `'store'`, or `'zstd'`. **Default:**
    `'deflate'`.
* Returns: {ZipEntry}

Creates an entry whose content is compressed on the fly as it is serialized
by `zlib.createZipArchive()`, without buffering `source` in memory. Its
`size`, `compressedSize`, and `crc32` only become available once
serialization has finished. There is no synchronous counterpart: streaming
entries only make sense with an asynchronous, incrementally-produced
`source`.

`source` is drained exactly once, during serialization. Until that happens
the entry has no readable content, so `zipEntry.content()`,
`zipEntry.contentSync()`, and `zipEntry.contentIterator()` throw
`ERR_INVALID_STATE`. If the entry is serialized by adding it to a writable
`ZipFile` with `zipFile.addEntry()` (or `addEntrySync()`), it is then
**promoted in place** to a file-backed entry pointing at the copy just written,
so it becomes readable (and can be serialized again) for as long as that
`ZipFile` stays open. Serializing it any other way (for example directly
through `zlib.createZipArchive()`) leaves it spent and unreadable.

Because `source` may hold an operating-system resource (a file read stream,
say), a streaming entry is disposable: its `Symbol.dispose` and
`Symbol.asyncDispose` methods destroy `source` if it has not been consumed.
An entry passed to an archive is disposed by that archive (see
`zlib.createZipArchive()`); dispose an entry directly only when it was
built but never handed to one. Disposal is a no-op for non-streaming entries -
in particular a file-backed entry never closes the `ZipFile` descriptor it
borrows.

### Static method: `zlib.ZipEntry.createSymlink(filename, target[, options])`

* `filename` {string} The entry's name within the archive.
* `target` {string} The symbolic link's target path.
* `options` {Object}
  * `comment` {string} An entry comment.
  * `mode` {integer} Unix permission bits. **Default:** `0o777`.
  * `modified` {Date} The entry's modification time. **Default:** the current
    time.
* Returns: {ZipEntry}

Creates a symbolic-link entry: a stored entry whose content is `target` and
whose Unix mode type bits mark it as a symlink, so `zipEntry.isSymlink` is
`true` when it is read back. Extraction tools that honor symlink entries
recreate the link; treat `target` as untrusted (see `zipEntry.name` on
path safety).

### Static method: `zlib.ZipEntry.createSync(filename, data[, options])`

* `filename` {string} The entry's name within the archive. A trailing `/`
  marks a directory entry.
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} The entry's complete,
  uncompressed content. Must be empty when `filename` names a directory.
* `options` {Object} See `zlib.ZipEntry.create()`.
* Returns: {ZipEntry}

The synchronous version of `zlib.ZipEntry.create()`.

### Static method: `zlib.ZipEntry.read(buffer)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer} A complete ZIP archive.
* Returns: {Iterator} of {ZipEntry}.

Parses every entry out of `buffer` directly, without indexing it into a
`ZipBuffer`. Like `ZipBuffer`, the yielded entries hold zero-copy views
of `buffer` rather than copies of their content, so the same rule applies: do
not mutate or reuse `buffer` while any of them is still in use.

### `zipEntry.comment`

* Type: {string}

### `zipEntry.compressed`

* Type: {boolean}

`true` if the entry's content is stored in compressed form (any compression
method, currently deflate or Zstandard); `false` if it is stored
uncompressed.

### `zipEntry.compressedSize`

* Type: {number}

### `zipEntry.content([options])`

* `options` {Object}
  * `verify` {boolean} Verify the entry's CRC-32 checksum. **Default:** `true`.
  * `maxSize` {number} Reject content declaring more than this many
    uncompressed bytes, before allocating anything. **Default:**
    `zlib.getMaxZipContentSize()`.
* Returns: {Promise} Fulfilled with a {Buffer} containing the entry's
  decompressed content. The buffer is a fresh copy that shares no memory
  with the archive or with data the entry was created from.

Throws an `ERR_ZIP_ENTRY_TOO_LARGE` error if the entry's declared size
exceeds `maxSize`, an `ERR_ZIP_ENTRY_CORRUPT` error if the content fails
CRC-32 verification or does not match its declared size, and an
`ERR_INVALID_STATE` error for a streaming entry
(`zlib.ZipEntry.createStream()`) whose content is not yet available (see
that method for when a streaming entry becomes readable).

### `zipEntry.contentSync([options])`

* `options` {Object} See `zipEntry.content()`.
* Returns: {Buffer} The entry's decompressed content.

The synchronous version of `zipEntry.content()`.

### `zipEntry.contentIterator([options])`

* `options` {Object}
  * `verify` {boolean} Verify the entry's CRC-32 checksum. **Default:** `true`.
  * `maxSize` {number} Reject content declaring more than this many
    uncompressed bytes, before decompressing anything. **Default:** no limit.
* Returns: {AsyncIterator} of {Buffer} chunks of the entry's decompressed
  content.

Unlike `zipEntry.content()`, this does not buffer the whole member in
memory. For a file-backed entry (one returned by `zipFile.get()`) the
compressed bytes are read from disk as the iterator is consumed and nothing is
retained; the entry is valid only while its `ZipFile` is open.

Because streaming is the bounded-memory path for arbitrarily large members, it
is **not** capped by `zlib.getMaxZipContentSize()` the way
`zipEntry.content()` is - that default guards a single large allocation,
which streaming never makes. Output is still bounded per chunk to the declared
uncompressed size; pass `maxSize` to impose an explicit ceiling.

For an in-memory entry stored without compression, the yielded chunks are
zero-copy views of the entry's retained content (see
`zipEntry.rawContent`); do not mutate them.

The yielded chunks are **provisional until the iterator completes**. CRC-32
verification (and the final declared-size check) can only run once every byte
has been read, so a corrupt or truncated entry is reported by the iterator
throwing _after_ the last chunk, not before the first. Each chunk is still
bounded so the total never exceeds the declared size or `maxSize`, but a
consumer that must not act on unverified bytes should buffer them (or use
`zipEntry.content()`, which verifies before returning anything) rather than
processing chunks as they arrive.

### `zipEntry.crc32`

* Type: {number}

### `zipEntry.flags`

* Type: {number}

The entry's raw general-purpose bit flag.

### `zipEntry.isDirectory`

* Type: {boolean}

`true` if the entry is a directory (its name ends with `/`).

### `zipEntry.isFile`

* Type: {boolean}

`true` if the entry is a regular file — that is, neither a directory nor a
symbolic link.

### `zipEntry.isSymlink`

* Type: {boolean}

`true` if the entry is a symbolic link (its Unix mode type bits are
`S_IFLNK`); its content is the link target. Always `false` for archives not
written on a Unix-like system. When extracting, treat a symlink's target as
untrusted — see `zipEntry.name` on path safety.

### `zipEntry.mode`

* Type: {number}

The entry's Unix mode permission bits, including the setuid, setgid, and
sticky bits (the low 12 bits, `0o7777`), or `0` if the archive was not written
on a Unix-like system. The file-type bits are not included here; use
`zipEntry.isDirectory` / `zipEntry.isSymlink` for the type.

### `zipEntry.modified`

* Type: {Date}

The entry's last-modification time. When the archive carries a higher-fidelity
timestamp in an extra field — an NTFS (`0x000a`), Info-ZIP extended (`0x5455`),
or Info-ZIP Unix (`0x5855`) field, as most modern tools write — that absolute
(UTC) time is used; otherwise the coarse, local-time MS-DOS date/time field
(2-second resolution) is used.

Some tools store their high-fidelity timestamp only in the local file header,
so on a file-backed entry (one returned by `zipFile.get()`) the first read
of this property may perform a small synchronous positioned disk read to
resolve that header. If that read fails, the value silently falls back to the
central-directory data.

### `zipEntry.method`

* Type: {number}

The entry's raw compression method: `0` for stored, `8` for deflate, `93`
for Zstandard.

### `zipEntry.name`

* Type: {string}

The entry's name, decoded from the central directory, which is treated as
authoritative — a local file header that disagrees is ignored, so a
mismatched-header ("ZIP-confusion") archive cannot make `name` disagree with
what is read. The bytes are decoded from a valid Info-ZIP Unicode Path extra
field (`0x7075`) when one is present; otherwise as UTF-8 when the
language-encoding flag (general-purpose bit 11) is set **or the bytes are
valid UTF-8** (plenty of tools wrote UTF-8 names without ever setting the
flag); and as CP437 — the historical default — only when they are not.
See `zipEntry.nameBuffer` for the raw bytes.

The name is returned **verbatim**: it is never normalized, and a name
containing `..`, a leading `/`, a drive letter, or backslashes is neither
rewritten nor rejected. A `ZipFile`/`ZipBuffer` never writes to disk, so
guarding against path traversal ("Zip Slip") when extracting is the caller's
responsibility.

### `zipEntry.nameBuffer`

* Type: {Buffer}

The entry's raw name bytes, before any character decoding. Useful when the
archive's names are in an encoding other than UTF-8 or CP437 and the caller
wants to decode them itself.

### `zipEntry.rawContent`

* Type: {Buffer|null}

The entry's raw (still compressed, if applicable) content when it is held in
memory, or `null` when there is no in-memory buffer to expose - for an entry
created with `zlib.ZipEntry.createStream()`, or a file-backed entry
returned by `zipFile.get()`, whose bytes are read from disk on demand
rather than retained. Use `zipEntry.content()` or
`zipEntry.contentIterator()` to read a file-backed entry.

### `zipEntry.size`

* Type: {number}

The entry's uncompressed size, in bytes.
