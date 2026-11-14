---
title: "File system (part 18 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 18 of 20)

### Class: `fs.Utf8Stream`

> Stability: 1 - Experimental

An optimized UTF-8 stream writer that allows for flushing all the internal
buffering on demand. It handles `EAGAIN` errors correctly, allowing for
customization, for example, by dropping content if the disk is busy.

#### Event: `'close'`

The `'close'` event is emitted when the stream is fully closed.

#### Event: `'drain'`

The `'drain'` event is emitted when the internal buffer has drained sufficiently
to allow continued writing.

#### Event: `'drop'`

The `'drop'` event is emitted when the maximal length is reached and that data
will not be written. The data that was dropped is passed as the first argument
to the event handler.

#### Event: `'error'`

The `'error'` event is emitted when an error occurs.

#### Event: `'finish'`

The `'finish'` event is emitted when the stream has been ended and all data has
been flushed to the underlying file.

#### Event: `'ready'`

The `'ready'` event is emitted when the stream is ready to accept writes.

#### Event: `'write'`

The `'write'` event is emitted when a write operation has completed. The number
of bytes written is passed as the first argument to the event handler.

#### `new fs.Utf8Stream([options])`

* `options` {Object}
  * `append`: {boolean} Appends writes to dest file instead of truncating it.
    **Default**: `true`.
  * `contentMode`: {string} Which type of data you can send to the write
    function, supported values are `'utf8'` or `'buffer'`. **Default**:
    `'utf8'`.
  * `dest`: {string} A path to a file to be written to (mode controlled by the
    append option).
  * `fd`: {number} A file descriptor, something that is returned by `fs.open()`
    or `fs.openSync()`.
  * `fs`: {Object} An object that has the same API as the `fs` module, useful
    for mocking, testing, or customizing the behavior of the stream.
  * `fsync`: {boolean} Perform a `fs.fsyncSync()` every time a write is
    completed.
  * `maxLength`: {number} The maximum length of the internal buffer. If a write
    operation would cause the buffer to exceed `maxLength`, the data written is
    dropped and a drop event is emitted with the dropped data
  * `maxWrite`: {number} The maximum number of bytes that can be written;
    **Default**: `16384`
  * `minLength`: {number} The minimum length of the internal buffer that is
    required to be full before flushing.
  * `mkdir`: {boolean} Ensure directory for `dest` file exists when true.
    **Default**: `false`.
  * `mode`: {number|string} Specify the creating file mode (see `fs.open()`).
  * `periodicFlush`: {number} Calls flush every `periodicFlush` milliseconds.
  * `retryEAGAIN` {Function} A function that will be called when `write()`,
    `writeSync()`, or `flushSync()` encounters an `EAGAIN` or `EBUSY` error.
    If the return value is `true` the operation will be retried, otherwise it
    will bubble the error. The `err` is the error that caused this function to
    be called, `writeBufferLen` is the length of the buffer that was written,
    and `remainingBufferLen` is the length of the remaining buffer that the
    stream did not try to write.
    * `err` {any} An error or `null`.
    * `writeBufferLen` {number}
    * `remainingBufferLen`: {number}
  * `sync`: {boolean} Perform writes synchronously.

#### `utf8Stream.append`

* {boolean} Whether the stream is appending to the file or truncating it.

#### `utf8Stream.contentMode`

* {string} The type of data that can be written to the stream. Supported
  values are `'utf8'` or `'buffer'`. **Default**: `'utf8'`.

#### `utf8Stream.destroy()`

Close the stream immediately, without flushing the internal buffer.

#### `utf8Stream.end()`

Close the stream gracefully, flushing the internal buffer before closing.

#### `utf8Stream.fd`

* {number} The file descriptor that is being written to.

#### `utf8Stream.file`

* {string} The file that is being written to.

#### `utf8Stream.flush(callback)`

* `callback` {Function}
  * `err` {Error|null} An error if the flush failed, otherwise `null`.

Writes the current buffer to the file. The callback is invoked after pending
writes complete and, unless the `fsync` option is enabled, after the data has
been synchronized with `fs.fsync()`. `fsync` errors indicating that the file
descriptor does not support synchronization (for example, a pipe or a TTY)
are ignored.

#### `utf8Stream.flushSync()`

Flushes the buffered data synchronously. This is a costly operation.

If an asynchronous write is in flight when `flushSync()` is called, only the
data queued after it is written, and it may reach the file before the data
of the in-flight write.

#### `utf8Stream.fsync`

* {boolean} Whether the stream is performing a `fs.fsyncSync()` after every
  write operation.

#### `utf8Stream.maxLength`

* {number} The maximum length of the internal buffer. If a write
  operation would cause the buffer to exceed `maxLength`, the data written is
  dropped and a drop event is emitted with the dropped data.

#### `utf8Stream.minLength`

* {number} The minimum length of the internal buffer that is required to be
  full before flushing.

#### `utf8Stream.mkdir`

* {boolean} Whether the stream should ensure that the directory for the
  `dest` file exists. If `true`, it will create the directory if it does not
  exist. **Default**: `false`.

#### `utf8Stream.mode`

* {number|string} The mode of the file that is being written to.

#### `utf8Stream.periodicFlush`

* {number} The number of milliseconds between flushes. If set to `0`, no
  periodic flushes will be performed.

#### `utf8Stream.reopen(file)`

* `file`: {string|Buffer|URL} A path to a file to be written to (mode
  controlled by the append option).

Reopen the file in place, useful for log rotation.

#### `utf8Stream.sync`

* {boolean} Whether the stream is writing synchronously or asynchronously.

#### `utf8Stream.write(data)`

* `data` {string|Buffer|TypedArray|DataView} The data to write.
* Returns {boolean}

When the `options.contentMode` is set to `'utf8'` when the stream is created,
the `data` argument must be a string. If the `contentMode` is set to `'buffer'`,
the `data` argument must be a {Buffer}, {TypedArray}, or {DataView}.

#### `utf8Stream.writing`

* {boolean} Whether the stream is currently writing data to the file.

#### `utf8StreamSymbol.dispose`

Calls `utf8Stream.destroy()`.

This method enables the stream to be used with `using`, which
will automatically destroy the stream when the scope exits. For more
information, see the MDN documentation on `using` statements.

### Class: `fs.WriteStream`

* Extends {stream.Writable}

Instances of {fs.WriteStream} cannot be constructed directly. They are created and
returned using the `fs.createWriteStream()` function.

#### Event: `'close'`

Emitted when the {fs.WriteStream}'s underlying file descriptor has been closed.

#### Event: `'open'`

* `fd` {integer} Integer file descriptor used by the {fs.WriteStream}.

Emitted when the {fs.WriteStream}'s file is opened.

#### Event: `'ready'`

Emitted when the {fs.WriteStream} is ready to be used.

Fires immediately after `'open'`.

#### `writeStream.bytesWritten`

The number of bytes written so far. Does not include data that is still queued
for writing.

#### `writeStream.close([callback])`

* `callback` {Function}
  * `err` {Error}

Closes `writeStream`. Optionally accepts a
callback that will be executed once the `writeStream`
is closed.

#### `writeStream.path`

The path to the file the stream is writing to as specified in the first
argument to `fs.createWriteStream()`. If `path` is passed as a string, then
`writeStream.path` will be a string. If `path` is passed as a {Buffer}, then
`writeStream.path` will be a {Buffer}.

#### `writeStream.pending`

* Type: {boolean}

This property is `true` if the underlying file has not been opened yet,
i.e. before the `'ready'` event is emitted.
