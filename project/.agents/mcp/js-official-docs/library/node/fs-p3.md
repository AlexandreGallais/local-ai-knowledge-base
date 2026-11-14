---
title: "File system (part 3 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 3 of 20)

### Class: `FileHandle`

A {FileHandle} object is an object wrapper for a numeric file descriptor.

Instances of the {FileHandle} object are created by the `fsPromises.open()`
method.

All {FileHandle} objects are {EventEmitter}s.

If a {FileHandle} is not closed using the `filehandle.close()` method, it will
try to automatically close the file descriptor and emit a process warning,
helping to prevent memory leaks. Please do not rely on this behavior because
it can be unreliable and the file may not be closed. Instead, always explicitly
close {FileHandle}s. Node.js may change this behavior in the future.

#### Event: `'close'`

The `'close'` event is emitted when the {FileHandle} has been closed and can no
longer be used.

#### `filehandle.appendFile(data[, options])`

* `data` {string|Buffer|TypedArray|DataView|AsyncIterable|Iterable}
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `signal` {AbortSignal|undefined} allows aborting an in-progress writeFile. **Default:** `undefined`
* Returns: {Promise} Fulfills with `undefined` upon success.

Alias of `filehandle.writeFile()`.

When operating on file handles, the mode cannot be changed from what it was set
to with `fsPromises.open()`. Therefore, this is equivalent to
`filehandle.writeFile()`.

#### `filehandle.chmod(mode)`

* `mode` {integer} the file mode bit mask.
* Returns: {Promise} Fulfills with `undefined` upon success.

Modifies the permissions on the file. See chmod(2).

#### `filehandle.chown(uid, gid)`

* `uid` {integer} The file's new owner's user id.
* `gid` {integer} The file's new group's group id.
* Returns: {Promise} Fulfills with `undefined` upon success.

Changes the ownership of the file. A wrapper for chown(2).

#### `filehandle.close()`

* Returns: {Promise} Fulfills with `undefined` upon success.

Closes the file handle after waiting for any pending operation on the handle to
complete.

```mjs
import { open } from 'node:fs/promises';

let filehandle;
try {
  filehandle = await open('thefile.txt', 'r');
} finally {
  await filehandle?.close();
}
```

#### `filehandle.createReadStream([options])`

* `options` {Object}
  * `encoding` {string} **Default:** `null`
  * `autoClose` {boolean} **Default:** `true`
  * `emitClose` {boolean} **Default:** `true`
  * `start` {integer}
  * `end` {integer} **Default:** `Infinity`
  * `highWaterMark` {integer} **Default:** `64 * 1024`
  * `signal` {AbortSignal|undefined} **Default:** `undefined`
* Returns: {fs.ReadStream}

`options` can include `start` and `end` values to read a range of bytes from
the file instead of the entire file. Both `start` and `end` are inclusive and
start counting at 0, allowed values are in the
\[0, `Number.MAX_SAFE_INTEGER`] range. If `start` is
omitted or `undefined`, `filehandle.createReadStream()` reads sequentially from
the current file position. The `encoding` can be any one of those accepted by
{Buffer}.

If the `FileHandle` points to a character device that only supports blocking
reads (such as keyboard or sound card), read operations do not finish until data
is available. This can prevent the process from exiting and the stream from
closing naturally.

By default, the stream will emit a `'close'` event after it has been
destroyed.  Set the `emitClose` option to `false` to change this behavior.

```mjs
import { open } from 'node:fs/promises';

const fd = await open('/dev/input/event0');
// Create a stream from some character device.
const stream = fd.createReadStream();
setTimeout(() => {
  stream.close(); // This may not close the stream.
  // Artificially marking end-of-stream, as if the underlying resource had
  // indicated end-of-file by itself, allows the stream to close.
  // This does not cancel pending read operations, and if there is such an
  // operation, the process may still not be able to exit successfully
  // until it finishes.
  stream.push(null);
  stream.read(0);
}, 100);
```

If `autoClose` is false, then the file descriptor won't be closed, even if
there's an error. It is the application's responsibility to close it and make
sure there's no file descriptor leak. If `autoClose` is set to true (default
behavior), on `'error'` or `'end'` the file descriptor will be closed
automatically.

An example to read the last 10 bytes of a file which is 100 bytes long:

```mjs
import { open } from 'node:fs/promises';

const fd = await open('sample.txt');
fd.createReadStream({ start: 90, end: 99 });
```

#### `filehandle.createWriteStream([options])`

* `options` {Object}
  * `encoding` {string} **Default:** `'utf8'`
  * `autoClose` {boolean} **Default:** `true`
  * `emitClose` {boolean} **Default:** `true`
  * `start` {integer}
  * `highWaterMark` {number} **Default:** See
    `stream.getDefaultHighWaterMark()`.
  * `flush` {boolean} If `true`, the underlying file descriptor is flushed
    prior to closing it. **Default:** `false`.
* Returns: {fs.WriteStream}

`options` may also include a `start` option to allow writing data at some
position past the beginning of the file, allowed values are in the
\[0, `Number.MAX_SAFE_INTEGER`] range. Modifying a file rather than
replacing it may require the `flags` `open` option to be set to `r+` rather than
the default `r`. The `encoding` can be any one of those accepted by {Buffer}.

If `autoClose` is set to true (default behavior) on `'error'` or `'finish'`
the file descriptor will be closed automatically. If `autoClose` is false,
then the file descriptor won't be closed, even if there's an error.
It is the application's responsibility to close it and make sure there's no
file descriptor leak.

By default, the stream will emit a `'close'` event after it has been
destroyed.  Set the `emitClose` option to `false` to change this behavior.

#### `filehandle.datasync()`

* Returns: {Promise} Fulfills with `undefined` upon success.

Forces all currently queued I/O operations associated with the file to the
operating system's synchronized I/O completion state. Refer to the POSIX
fdatasync(2) documentation for details.

Unlike `filehandle.sync` this method does not flush modified metadata.

#### `filehandle.fd`

* Type: {number} The numeric file descriptor managed by the {FileHandle} object.

#### `filehandle.pull(...transforms)`

> Stability: 1 - Experimental

* `...transforms` {Function|Object} Optional transforms to apply via
  `stream/iter pull()`.
* `options` {Object}
  * `signal` {AbortSignal}
  * `autoClose` {boolean} Close the file handle when the stream ends.
    **Default:** `false`.
  * `start` {number} Byte offset to begin reading from. When specified,
    reads use explicit positioning (`pread` semantics). **Default:** current
    file position.
  * `limit` {number} Maximum number of bytes to read before ending the
    iterator. Reads stop when `limit` bytes have been delivered or EOF is
    reached, whichever comes first. **Default:** read until EOF.
  * `chunkSize` {number} Size in bytes of the buffer allocated for each
    read operation. **Default:** `131072` (128 KB).
* Returns: {AsyncIterable} whose chunks fulfill with {Uint8Array\[]}

Return the file contents as an async iterable using the
`node:stream/iter` pull model. Reads are performed in `chunkSize`-byte
chunks (default 128 KB). If transforms are provided, they are applied
via `stream/iter pull()`.

The file handle is locked from the first read of the iterable, and unlocked
when iteration completes, an error occurs, or the consumer breaks. An iterable
that is never read does not lock the file handle.

This function is only available when the `--experimental-stream-iter` flag is
enabled.

```mjs
import { open } from 'node:fs/promises';
import { text } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';

const fh = await open('input.txt', 'r');

// Read as text
console.log(await text(fh.pull({ autoClose: true })));

// Read 1 KB starting at byte 100
const fh2 = await open('input.txt', 'r');
console.log(await text(fh2.pull({ start: 100, limit: 1024, autoClose: true })));

// Read with compression
const fh3 = await open('input.txt', 'r');
const compressed = fh3.pull(compressGzip(), { autoClose: true });
```

```cjs
const { open } = require('node:fs/promises');
const { text } = require('node:stream/iter');
const { compressGzip } = require('node:zlib/iter');

async function run() {
  const fh = await open('input.txt', 'r');

  // Read as text
  console.log(await text(fh.pull({ autoClose: true })));

  // Read 1 KB starting at byte 100
  const fh2 = await open('input.txt', 'r');
  console.log(await text(fh2.pull({ start: 100, limit: 1024, autoClose: true })));

  // Read with compression
  const fh3 = await open('input.txt', 'r');
  const compressed = fh3.pull(compressGzip(), { autoClose: true });
}

run().catch(console.error);
```

#### `filehandle.pullSync(...transforms)`

> Stability: 1 - Experimental

* `...transforms` {Function|Object} Optional transforms to apply via
  `stream/iter pullSync()`.
* `options` {Object}
  * `autoClose` {boolean} Close the file handle when the stream ends.
    **Default:** `false`.
  * `start` {number} Byte offset to begin reading from. When specified,
    reads use explicit positioning. **Default:** current file position.
  * `limit` {number} Maximum number of bytes to read before ending the
    iterator. **Default:** read until EOF.
  * `chunkSize` {number} Size in bytes of the buffer allocated for each
    read operation. **Default:** `131072` (128 KB).
* Returns: {Iterable} whose chunks return {Uint8Array\[]}

Synchronous counterpart of `filehandle.pull()`. Returns a sync iterable
that reads the file using synchronous I/O on the main thread. Reads are
performed in `chunkSize`-byte chunks (default 128 KB).

The file handle is locked from the first read of the iterable until iteration
ends, as with `filehandle.pull()`. Unlike the async `pull()`, this method does not support `AbortSignal` since all
operations are synchronous.

This function is only available when the `--experimental-stream-iter` flag is
enabled.

```mjs
import { open } from 'node:fs/promises';
import { textSync, pipeToSync } from 'node:stream/iter';
import { compressGzipSync, decompressGzipSync } from 'node:zlib/iter';

const fh = await open('input.txt', 'r');

// Read as text (sync)
console.log(textSync(fh.pullSync({ autoClose: true })));

// Sync compress pipeline: file -> gzip -> file
const src = await open('input.txt', 'r');
const dst = await open('output.gz', 'w');
pipeToSync(src.pullSync(compressGzipSync(), { autoClose: true }), dst.writer({ autoClose: true }));
```

```cjs
const { open } = require('node:fs/promises');
const { textSync, pipeToSync } = require('node:stream/iter');
const { compressGzipSync, decompressGzipSync } = require('node:zlib/iter');

async function run() {
  const fh = await open('input.txt', 'r');

  // Read as text (sync)
  console.log(textSync(fh.pullSync({ autoClose: true })));

  // Sync compress pipeline: file -> gzip -> file
  const src = await open('input.txt', 'r');
  const dst = await open('output.gz', 'w');
  pipeToSync(
    src.pullSync(compressGzipSync(), { autoClose: true }),
    dst.writer({ autoClose: true }),
  );
}

run().catch(console.error);
```

#### `filehandle.read(buffer, offset, length, position)`

* `buffer` {Buffer|TypedArray|DataView} A buffer that will be filled with the
  file data read.
* `offset` {integer} The location in the buffer at which to start filling.
  **Default:** `0`
* `length` {integer} The number of bytes to read. **Default:**
  `buffer.byteLength - offset`
* `position` {integer|bigint|null} The location where to begin reading data
  from the file. If `null` or `-1`, data will be read from the current file
  position, and the position will be updated. If `position` is a non-negative
  integer, the current file position will remain unchanged.
  **Default:** `null`
* Returns: {Promise} Fulfills upon success with an object with two properties:
  * `bytesRead` {integer} The number of bytes read
  * `buffer` {Buffer|TypedArray|DataView} A reference to the passed in `buffer`
    argument.

Reads data from the file and stores that in the given buffer.

If the file is not modified concurrently, the end-of-file is reached when the
number of bytes read is zero.

#### `filehandle.read([options])`

* `options` {Object}
  * `buffer` {Buffer|TypedArray|DataView} A buffer that will be filled with the
    file data read. **Default:** `Buffer.alloc(16384)`
  * `offset` {integer} The location in the buffer at which to start filling.
    **Default:** `0`
  * `length` {integer} The number of bytes to read. **Default:**
    `buffer.byteLength - offset`
  * `position` {integer|bigint|null} The location where to begin reading data
    from the file. If `null` or `-1`, data will be read from the current file
    position, and the position will be updated. If `position` is a non-negative
    integer, the current file position will remain unchanged.
    **Default:**: `null`
* Returns: {Promise} Fulfills upon success with an object with two properties:
  * `bytesRead` {integer} The number of bytes read
  * `buffer` {Buffer|TypedArray|DataView} A reference to the passed in `buffer`
    argument.

Reads data from the file and stores that in the given buffer.

If the file is not modified concurrently, the end-of-file is reached when the
number of bytes read is zero.

#### `filehandle.read(buffer[, options])`

* `buffer` {Buffer|TypedArray|DataView} A buffer that will be filled with the
  file data read.
* `options` {Object}
  * `offset` {integer} The location in the buffer at which to start filling.
    **Default:** `0`
  * `length` {integer} The number of bytes to read. **Default:**
    `buffer.byteLength - offset`
  * `position` {integer|bigint|null} The location where to begin reading data
    from the file. If `null` or `-1`, data will be read from the current file
    position, and the position will be updated. If `position` is a non-negative
    integer, the current file position will remain unchanged.
    **Default:**: `null`
* Returns: {Promise} Fulfills upon success with an object with two properties:
  * `bytesRead` {integer} The number of bytes read
  * `buffer` {Buffer|TypedArray|DataView} A reference to the passed in `buffer`
    argument.

Reads data from the file and stores that in the given buffer.

If the file is not modified concurrently, the end-of-file is reached when the
number of bytes read is zero.

#### `filehandle.readableWebStream([options])`

* `options` {Object}
  * `autoClose` {boolean} When true, causes the {FileHandle} to be closed when the
    stream is closed. **Default:** `false`
* Returns: {ReadableStream}

Returns a byte-oriented `ReadableStream` that may be used to read the file's
contents.

An error will be thrown if this method is called more than once or is called
after the `FileHandle` is closed or closing.
