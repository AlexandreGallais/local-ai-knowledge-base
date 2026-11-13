---
title: "File system (part 4 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 4 of 20)

```mjs
import {
  open,
} from 'node:fs/promises';

const file = await open('./some/file/to/read');

for await (const chunk of file.readableWebStream())
  console.log(chunk);

await file.close();
```

```cjs
const {
  open,
} = require('node:fs/promises');

(async () => {
  const file = await open('./some/file/to/read');

  for await (const chunk of file.readableWebStream())
    console.log(chunk);

  await file.close();
})();
```

While the `ReadableStream` will read the file to completion, it will not
close the `FileHandle` automatically. User code must still call the
`fileHandle.close()` method unless the `autoClose` option is set to `true`.

#### `filehandle.readFile(options)`

* `options` {Object|string}
  * `encoding` {string|null} **Default:** `null`
  * `signal` {AbortSignal} allows aborting an in-progress readFile
  * `buffer` {Buffer|TypedArray|DataView|Function} A buffer to read into, or a
    function called with the file size that returns the buffer.
* Returns: {Promise} Fulfills upon a successful read with the contents of the
  file. If no encoding is specified (using `options.encoding`), the data is
  returned as a {Buffer} object. Otherwise, the data will be a string.

Asynchronously reads the entire contents of a file.

If `options` is a string, then it specifies the `encoding`.

If `buffer` is provided and no encoding is specified, the returned {Buffer} is
a view over the supplied buffer containing only the bytes read. If the
supplied buffer is too small to contain the entire file, the operation will
fail.

The {FileHandle} has to support reading.

If one or more `filehandle.read()` calls are made on a file handle and then a
`filehandle.readFile()` call is made, the data will be read from the current
position till the end of the file. It doesn't always read from the beginning
of the file.

An example using the `buffer` option with a pre-allocated buffer:

```mjs
import { Buffer } from 'node:buffer';
import { open } from 'node:fs/promises';

const file = await open('./some/file/to/read');
try {
  const buf = Buffer.alloc(16384);
  const contents = await file.readFile({ buffer: buf });
  console.log(contents); // A view over `buf` containing only the bytes read
} finally {
  await file.close();
}
```

An example using the `buffer` option with a function returning a buffer:

```mjs
import { Buffer } from 'node:buffer';
import { open } from 'node:fs/promises';

const file = await open('./some/file/to/read');
try {
  const contents = await file.readFile({
    buffer: (size) => Buffer.alloc(size),
  });
  console.log(contents);
} finally {
  await file.close();
}
```

#### `filehandle.readLines([options])`

* `options` {Object}
  * `encoding` {string} **Default:** `null`
  * `autoClose` {boolean} **Default:** `true`
  * `emitClose` {boolean} **Default:** `true`
  * `start` {integer}
  * `end` {integer} **Default:** `Infinity`
  * `highWaterMark` {integer} **Default:** `64 * 1024`
* Returns: {readline.InterfaceConstructor}

Convenience method to create a `readline` interface and stream over the file.
See `filehandle.createReadStream()` for the options.

```mjs
import { open } from 'node:fs/promises';

const file = await open('./some/file/to/read');

for await (const line of file.readLines()) {
  console.log(line);
}
```

```cjs
const { open } = require('node:fs/promises');

(async () => {
  const file = await open('./some/file/to/read');

  for await (const line of file.readLines()) {
    console.log(line);
  }
})();
```

#### `filehandle.readv(buffers[, position])`

* `buffers` {Buffer\[]|TypedArray\[]|DataView\[]}
* `position` {integer|null} The offset from the beginning of the file where
  the data should be read from. If `position` is not a `number`, the data will
  be read from the current position. **Default:** `null`
* Returns: {Promise} Fulfills upon success an object containing two properties:
  * `bytesRead` {integer} the number of bytes read
  * `buffers` {Buffer\[]|TypedArray\[]|DataView\[]} property containing
    a reference to the `buffers` input.

Read from a file and write to an array of {ArrayBufferView}s

#### `filehandle.stat([options])`

* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned {fs.Stats} object should be `bigint`. **Default:** `false`.
  * `signal` {AbortSignal} An AbortSignal to cancel the operation. **Default:** `undefined`.
* Returns: {Promise} Fulfills with an {fs.Stats} for the file.

#### `filehandle.sync()`

* Returns: {Promise} Fulfills with `undefined` upon success.

Request that all data for the open file descriptor is flushed to the storage
device. The specific implementation is operating system and device specific.
Refer to the POSIX fsync(2) documentation for more detail.

#### `filehandle.truncate(len)`

* `len` {integer} **Default:** `0`
* Returns: {Promise} Fulfills with `undefined` upon success.

Truncates the file.

If the file was larger than `len` bytes, only the first `len` bytes will be
retained in the file.

The following example retains only the first four bytes of the file:

```mjs
import { open } from 'node:fs/promises';

let filehandle = null;
try {
  filehandle = await open('temp.txt', 'r+');
  await filehandle.truncate(4);
} finally {
  await filehandle?.close();
}
```

If the file previously was shorter than `len` bytes, it is extended, and the
extended part is filled with null bytes (`'\0'`):

If `len` is negative then `0` will be used.

#### `filehandle.utimes(atime, mtime)`

* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* Returns: {Promise}

Change the file system timestamps of the object referenced by the {FileHandle}
then fulfills the promise with no arguments upon success.

#### `filehandle.write(buffer, offset[, length[, position]])`

* `buffer` {Buffer|TypedArray|DataView}
* `offset` {integer} The start position from within `buffer` where the data
  to write begins.
* `length` {integer} The number of bytes from `buffer` to write. **Default:**
  `buffer.byteLength - offset`
* `position` {integer|null} The offset from the beginning of the file where the
  data from `buffer` should be written. If `position` is not a `number`,
  the data will be written at the current position. See the POSIX pwrite(2)
  documentation for more detail. **Default:** `null`
* Returns: {Promise}

Write `buffer` to the file.

The promise is fulfilled with an object containing two properties:

* `bytesWritten` {integer} the number of bytes written
* `buffer` {Buffer|TypedArray|DataView} a reference to the
  `buffer` written.

It is unsafe to use `filehandle.write()` multiple times on the same file
without waiting for the promise to be fulfilled (or rejected). For this
scenario, use `filehandle.createWriteStream()`.

On Linux, positional writes do not work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

#### `filehandle.write(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView}
* `options` {Object}
  * `offset` {integer} **Default:** `0`
  * `length` {integer} **Default:** `buffer.byteLength - offset`
  * `position` {integer|null} **Default:** `null`
* Returns: {Promise}

Write `buffer` to the file.

Similar to the above `filehandle.write` function, this version takes an
optional `options` object. If no `options` object is specified, it will
default with the above values.

#### `filehandle.write(string[, position[, encoding]])`

* `string` {string}
* `position` {integer|null} The offset from the beginning of the file where the
  data from `string` should be written. If `position` is not a `number` the
  data will be written at the current position. See the POSIX pwrite(2)
  documentation for more detail. **Default:** `null`
* `encoding` {string} The expected string encoding. **Default:** `'utf8'`
* Returns: {Promise}

Write `string` to the file. If `string` is not a string, the promise is
rejected with an error.

The promise is fulfilled with an object containing two properties:

* `bytesWritten` {integer} the number of bytes written
* `buffer` {string} a reference to the `string` written.

It is unsafe to use `filehandle.write()` multiple times on the same file
without waiting for the promise to be fulfilled (or rejected). For this
scenario, use `filehandle.createWriteStream()`.

On Linux, positional writes do not work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

#### `filehandle.writeFile(data, options)`

* `data` {string|Buffer|TypedArray|DataView|AsyncIterable|Iterable}
* `options` {Object|string}
  * `encoding` {string|null} The expected character encoding when `data` is a
    string. **Default:** `'utf8'`
  * `signal` {AbortSignal|undefined} allows aborting an in-progress writeFile. **Default:** `undefined`
* Returns: {Promise}

Asynchronously writes data to a file, replacing the file if it already exists.
`data` can be a string, a buffer, an {AsyncIterable}, or an {Iterable} object.
The promise is fulfilled with no arguments upon success.

If `options` is a string, then it specifies the `encoding`.

The {FileHandle} has to support writing.

It is unsafe to use `filehandle.writeFile()` multiple times on the same file
without waiting for the promise to be fulfilled (or rejected).

If one or more `filehandle.write()` calls are made on a file handle and then a
`filehandle.writeFile()` call is made, the data will be written from the
current position till the end of the file. It doesn't always write from the
beginning of the file.

#### `filehandle.writev(buffers[, position])`

* `buffers` {Buffer\[]|TypedArray\[]|DataView\[]}
* `position` {integer|null} The offset from the beginning of the file where the
  data from `buffers` should be written. If `position` is not a `number`,
  the data will be written at the current position. **Default:** `null`
* Returns: {Promise}

Write an array of {ArrayBufferView}s to the file.

The promise is fulfilled with an object containing a two properties:

* `bytesWritten` {integer} the number of bytes written
* `buffers` {Buffer\[]|TypedArray\[]|DataView\[]} a reference to the `buffers`
  input.

It is unsafe to call `writev()` multiple times on the same file without waiting
for the promise to be fulfilled (or rejected).

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

#### `filehandle.writer([options])`

> Stability: 1 - Experimental

* `options` {Object}
  * `autoClose` {boolean} Close the file handle when the writer ends or
    fails. **Default:** `false`.
  * `start` {number} Byte offset to start writing at. When specified,
    writes use explicit positioning. **Default:** current file position.
  * `limit` {number} Maximum number of bytes the writer will accept.
    Async writes (`write()`, `writev()`) that would exceed the limit reject
    with `ERR_OUT_OF_RANGE`. Sync writes (`writeSync()`, `writevSync()`)
    return `false`. **Default:** no limit.
  * `chunkSize` {number} Maximum chunk size in bytes for synchronous write
    operations. Writes larger than this threshold fall back to async I/O.
    Set this to match the reader's `chunkSize` for optimal `pipeTo()`
    performance. **Default:** `131072` (128 KB).
* Returns: {Object}
  * `write(chunk[, options])` {Function} Returns {Promise}.
    Accepts `Uint8Array`, `Buffer`, or string (UTF-8 encoded).
    * `chunk` {Buffer|TypedArray|DataView|string}
    * `options` {Object}
      * `signal` {AbortSignal} If the signal is already aborted, the write
        rejects with `AbortError` without performing I/O.
  * `writev(chunks[, options])` {Function} Returns {Promise}. Uses
    scatter/gather I/O via a single `writev()` syscall. Accepts mixed
    `Uint8Array`/string arrays.
    * `chunks` {Buffer\[]|TypedArray\[]|DataView\[]|string\[]}
    * `options` {Object}
      * `signal` {AbortSignal} If the signal is already aborted, the write
        rejects with `AbortError` without performing I/O.
  * `writeSync(chunk)` {Function} Returns {boolean}. Attempts a synchronous
    write. Returns `true` if the write succeeded, `false` if the caller
    should fall back to async `write()`. Returns `false` when: the writer
    is closed/errored, an async operation is in flight, the chunk exceeds
    `chunkSize`, or the write would exceed `limit`.
    * `chunk` {Buffer|TypedArray|DataView|string}
  * `writevSync(chunks)` {Function} Returns {boolean}. Synchronous batch
    write. Same fallback semantics as `writeSync()`.
    * `chunks` {Buffer\[]|TypedArray\[]|DataView\[]|string\[]}
  * `end([options])` {Function} Returns {Promise}, fulfills with the total
    number of bytes written. Idempotent: returns `totalBytesWritten` if already
    closed, returns the pending promise if already closing. Rejects if the writer
    is in an errored state.
    * `options` {Object}
      * `signal` {AbortSignal} If the signal is already aborted, `end()`
        rejects with `AbortError` and the writer remains open.
  * `endSync()` {Function} Returns {number|number} total bytes written on
    success, `-1` if the writer is errored or an async operation is in
    flight. Idempotent when already closed.
  * `fail(reason)` {Function} Puts the writer into a terminal error state.
    Synchronous. If the writer is already closed or errored, this is a
    no-op. If `autoClose` is true, closes the file handle synchronously.

Return a `node:stream/iter` writer backed by this file handle.

The writer supports both `Symbol.asyncDispose` and `Symbol.dispose`:

* `await using w = fh.writer()` — if the writer is still open (no `end()`
  called), `asyncDispose` calls `fail()`. If `end()` is pending, it waits
  for it to complete.
* `using w = fh.writer()` — calls `fail()` unconditionally.

Async writes (`write()` and `writev()`) that are started without awaiting the
previous one are performed one at a time, in the order they were called, so
they never overlap in the file. A queued write is not performed if the writer
fails, or its `signal` aborts, before its turn.

The `writeSync()` and `writevSync()` methods enable the try-sync fast path
used by `stream/iter pipeTo()`. When the reader's chunk size matches the
writer's `chunkSize`, all writes in a `pipeTo()` pipeline complete
synchronously with zero promise overhead.

This function is only available when the `--experimental-stream-iter` flag is
enabled.
