---
title: "Zlib (part 3 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/zlib.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Zlib (part 3 of 7)

## Class: `zlib.ZipBuffer`

> Stability: 1.0 - Early development

The ZIP archive API is experimental. Using any part of it (this class among
them) emits an experimental warning the first time; merely importing
`node:zlib` does not.

An in-memory, **zero-copy** view over the entries of a ZIP archive already
held in a `Buffer`, `TypedArray`, `DataView`, or `ArrayBuffer`. Its set of
entries can be edited - entries added or removed - but, unlike `ZipFile`,
those edits are **not** written into the source buffer: a newly added entry is
held as a separate in-memory `ZipEntry` (the passed buffer is a fixed-size
view with no room to append to), and removal just drops the entry from
`ZipBuffer`'s index. The original bytes are never modified.
`zipBuffer.toBuffer()` serializes the current set of entries into a fresh
archive.

`ZipBuffer` does not copy the archive you hand it. It keeps a view onto that
memory and reads each entry's content lazily and directly from it, which is
what makes construction cheap regardless of archive size. The trade-off is
that you **must not modify or reuse** that memory - including the
`ArrayBuffer` backing a `TypedArray`/`DataView` - while the `ZipBuffer`, or
any `ZipEntry` obtained from it, is still in use: a later read would
observe the change and may fail or return corrupt data. Pass a copy (for
example `Buffer.from(source)`) if the source might be mutated or reused.

`add()` and `toBuffer()` each have a `*Sync` counterpart
(`addSync()`, `toBufferSync()`)
that performs the same compression work synchronously. As with the
synchronous `node:fs` APIs, these block the Node.js event loop and further
JavaScript execution until the operation completes; use them only where
synchronous execution is appropriate (for example, short-lived scripts or
startup code), not in code that must stay responsive.

```mjs
import { ZipBuffer } from 'node:zlib';
import { readFileSync, writeFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';

const zip = new ZipBuffer(readFileSync('archive.zip'));
for (const [name, entry] of zip) {
  console.log(name, entry.size);
}
await zip.add('hello.txt', Buffer.from('Hello, world!'));
zip.delete('unwanted.txt');
writeFileSync('archive.zip', await zip.toBuffer());
```

```cjs
const { ZipBuffer } = require('node:zlib');
const { readFileSync, writeFileSync } = require('node:fs');

async function main() {
  const zip = new ZipBuffer(readFileSync('archive.zip'));
  for (const [name, entry] of zip) {
    console.log(name, entry.size);
  }
  await zip.add('hello.txt', Buffer.from('Hello, world!'));
  zip.delete('unwanted.txt');
  writeFileSync('archive.zip', await zip.toBuffer());
}
main();
```

### `new zlib.ZipBuffer(buffer)`

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer} A complete ZIP archive.

Parses the archive's central directory. Throws an `ERR_ZIP_INVALID_ARCHIVE`
or `ERR_ZIP_UNSUPPORTED_FEATURE` error if `buffer` is not a well-formed,
supported archive.

`buffer` is **not copied**: the `ZipBuffer` retains a zero-copy view of it (for
a `TypedArray`, `DataView`, or `ArrayBuffer`, of the underlying `ArrayBuffer`)
and reads entry content directly from it on demand. Do not mutate or reuse that
memory while the `ZipBuffer` or any entry read from it is still live; pass a
copy if it might change.

### `zipBuffer.add(filename, data[, options])`

* `filename` {string} The entry's name within the archive. A trailing `/`
  marks a directory entry.
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} The entry's complete,
  uncompressed content.
* `options` {Object} See `zlib.ZipEntry.create()`.
* Returns: {Promise} Fulfilled with the created {ZipEntry}.

Equivalent to `zipBuffer.addEntry(await zlib.ZipEntry.create(filename, data,
options))`.

### `zipBuffer.addSync(filename, data[, options])`

* `filename` {string} The entry's name within the archive. A trailing `/`
  marks a directory entry.
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} The entry's complete,
  uncompressed content.
* `options` {Object} See `zlib.ZipEntry.createSync()`.
* Returns: {ZipEntry} The created entry.

The synchronous version of `zipBuffer.add()`. Equivalent to
`zipBuffer.addEntry(zlib.ZipEntry.createSync(filename, data, options))`.

### `zipBuffer.addEntry(entry)`

* `entry` {ZipEntry}
* Returns: {ZipEntry} `entry`.

Adds an already-built entry, keyed by its own `zipEntry.name`. Replaces
any existing entry of that name.

### `zipBuffer.clear()`

Removes every entry.

### `zipBuffer.comment`

* Type: {string}

The archive-level comment, preserved byte-for-byte across
`zipBuffer.toBuffer()` calls unless overridden. The bytes are decoded as
UTF-8 when they are valid UTF-8 and as CP437 otherwise (the field carries no
encoding flag of its own).

### `zipBuffer.delete(name)`

* `name` {string}
* Returns: {boolean} `true` if an entry named `name` existed and was removed.

### `zipBuffer.entries()`

* Returns: {Iterator} of `[name, entry]` pairs, where `entry` is a
  `ZipEntry`.

### `zipBuffer.forEach(callback[, thisArg])`

* `callback` {Function}
* `thisArg` {any}

Calls `callback` once for each entry, in the order the archive lists them.

### `zipBuffer.get(name)`

* `name` {string}
* Returns: {ZipEntry}

Throws `ERR_ZIP_ENTRY_NOT_FOUND` if the archive has no entry named `name`.

### `zipBuffer.has(name)`

* `name` {string}
* Returns: {boolean}

### `zipBuffer.keys()`

* Returns: {Iterator} of entry names.

### `zipBuffer.size`

* Type: {number}

The number of entries in the archive.

### `zipBuffer.toBuffer([options])`

* `options` {string|Object} An archive comment, as a shorthand for
  `{ comment: options }`.
  * `comment` {string} An archive comment. **Default:** `zipBuffer.comment`.
  * `baseOffset` {number} Shifts every offset the archive records by this
    many bytes, so the serialized archive is self-describing even when it is
    written somewhere other than the start of its eventual file - for example,
    after `baseOffset` bytes of other content already written to the same
    output. **Default:** `0`.
* Returns: {Promise} Fulfilled with a {Buffer} containing the serialized
  archive.

Serializes the current set of entries - in the order they were added or
read - into a fresh archive, switching to Zip64 structures automatically as
needed (see `zlib.createZipArchive()`).

### `zipBuffer.toBufferSync([options])`

* `options` {string|Object} See `zipBuffer.toBuffer()`.
* Returns: {Buffer} The serialized archive.

The synchronous version of `zipBuffer.toBuffer()` (see
`zlib.createZipArchiveSync()`).

### `zipBuffer.values()`

* Returns: {Iterator} of `ZipEntry`.

### `zipBuffer.writable`

* Type: {boolean}

Always `true`.
