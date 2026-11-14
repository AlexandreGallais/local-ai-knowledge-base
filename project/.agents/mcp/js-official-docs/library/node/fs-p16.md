---
title: "File system (part 16 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 16 of 20)

## Common Objects

The common objects are shared by all of the file system API variants
(promise, callback, and synchronous).

### Class: `fs.Dir`

A class representing a directory stream.

Created by `fs.opendir()`, `fs.opendirSync()`, or
`fsPromises.opendir()`.

```mjs
import { opendir } from 'node:fs/promises';

try {
  const dir = await opendir('./');
  for await (const dirent of dir)
    console.log(dirent.name);
} catch (err) {
  console.error(err);
}
```

When using the async iterator, the {fs.Dir} object will be automatically
closed after the iterator exits.

#### `dir.close()`

* Returns: {Promise}

Asynchronously close the directory's underlying resource handle.
Subsequent reads will result in errors.

A promise is returned that will be fulfilled after the resource has been
closed.

#### `dir.close(callback)`

* `callback` {Function}
  * `err` {Error}

Asynchronously close the directory's underlying resource handle.
Subsequent reads will result in errors.

The `callback` will be called after the resource handle has been closed.

#### `dir.closeSync()`

Synchronously close the directory's underlying resource handle.
Subsequent reads will result in errors.

#### `dir.path`

* Type: {string}

The read-only path of this directory as was provided to `fs.opendir()`,
`fs.opendirSync()`, or `fsPromises.opendir()`.

#### `dir.read()`

* Returns: {Promise} Fulfills with a {fs.Dirent|null}

Asynchronously read the next directory entry via readdir(3) as an
{fs.Dirent}.

A promise is returned that will be fulfilled with an {fs.Dirent}, or `null`
if there are no more directory entries to read.

For directory reads handled by the native file system, directory entries
returned by this function are in no particular order as provided by the
operating system's underlying directory mechanisms.
Entries added or removed while iterating over the directory might not be
included in the iteration results.

#### `dir.read(callback)`

* `callback` {Function}
  * `err` {Error}
  * `dirent` {fs.Dirent|null}

Asynchronously read the next directory entry via readdir(3) as an
{fs.Dirent}.

After the read is completed, the `callback` will be called with an
{fs.Dirent}, or `null` if there are no more directory entries to read.

Directory entries returned by this function are in no particular order as
provided by the operating system's underlying directory mechanisms.
Entries added or removed while iterating over the directory might not be
included in the iteration results.

#### `dir.readSync()`

* Returns: {fs.Dirent|null}

Synchronously read the next directory entry as an {fs.Dirent}. See the
POSIX readdir(3) documentation for more detail.

If there are no more directory entries to read, `null` will be returned.

Directory entries returned by this function are in no particular order as
provided by the operating system's underlying directory mechanisms.
Entries added or removed while iterating over the directory might not be
included in the iteration results.

#### `dirSymbol.asyncIterator`

* Returns: {AsyncIterator} An AsyncIterator of {fs.Dirent}

Asynchronously iterates over the directory until all entries have
been read. Refer to the POSIX readdir(3) documentation for more detail.

Entries returned by the async iterator are always an {fs.Dirent}.
The `null` case from `dir.read()` is handled internally.

See {fs.Dir} for an example.

Directory entries returned by this iterator are in no particular order as
provided by the operating system's underlying directory mechanisms.
Entries added or removed while iterating over the directory might not be
included in the iteration results.

#### `dirSymbol.asyncDispose`

* Returns: {Promise}

Calls `dir.close()` if the directory handle is open, and returns a promise that
fulfills when disposal is complete.

This method enables the directory to be used with `await using`, which
will automatically close the directory when the scope exits. For more
information, see the MDN documentation on `using` statements.

#### `dirSymbol.dispose`

Calls `dir.closeSync()` if the directory handle is open, and returns
`undefined`.

This method enables the directory to be used with `using`, which
will automatically close the directory when the scope exits. For more
information, see the MDN documentation on `using` statements.

### Class: `fs.Dirent`

A representation of a directory entry, which can be a file or a subdirectory
within the directory, as returned by reading from an {fs.Dir}. The
directory entry is a combination of the file name and file type pairs.

Additionally, when `fs.readdir()` or `fs.readdirSync()` is called with
the `withFileTypes` option set to `true`, the resulting array is filled with
{fs.Dirent} objects, rather than strings or {Buffer}s.

When a directory is read, such as with `fs.readdir()` or
`fs.opendir()`, the file type of each entry is the type reported by the
operating system and may depend on the file system; for example, some file
systems may report a type that differs from what `fs.lstat()` returns.
Node.js calls `fs.lstat()` on such an entry only when the reported type
is unknown. Use `fs.lstat()` when an accurate file type is required.

#### `dirent.isBlockDevice()`

* Returns: {boolean}

Returns `true` if the {fs.Dirent} object describes a block device.

#### `dirent.isCharacterDevice()`

* Returns: {boolean}

Returns `true` if the {fs.Dirent} object describes a character device.

#### `dirent.isDirectory()`

* Returns: {boolean}

Returns `true` if the {fs.Dirent} object describes a file system
directory.

#### `dirent.isFIFO()`

* Returns: {boolean}

Returns `true` if the {fs.Dirent} object describes a first-in-first-out
(FIFO) pipe.

#### `dirent.isFile()`

* Returns: {boolean}

Returns `true` if the {fs.Dirent} object describes a regular file.

#### `dirent.isSocket()`

* Returns: {boolean}

Returns `true` if the {fs.Dirent} object describes a socket.

#### `dirent.isSymbolicLink()`

* Returns: {boolean}

Returns `true` if the {fs.Dirent} object describes a symbolic link.

#### `dirent.name`

* Type: {string|Buffer}

The file name that this {fs.Dirent} object refers to. The type of this
value is determined by the `options.encoding` passed to `fs.readdir()` or
`fs.readdirSync()`.

#### `dirent.parentPath`

* Type: {string}

The path to the parent directory of the file this {fs.Dirent} object refers to.

### Class: `fs.FSWatcher`

* Extends {EventEmitter}

A successful call to `fs.watch()` method will return a new {fs.FSWatcher}
object.

All {fs.FSWatcher} objects emit a `'change'` event whenever a specific watched
file is modified.

#### Event: `'change'`

* `eventType` {string} The type of change event that has occurred
* `filename` {string|Buffer} The filename that changed (if relevant/available)

Emitted when something changes in a watched directory or file.
See more details in `fs.watch()`.

The `filename` argument may not be provided depending on operating system
support. If `filename` is provided, it will be provided as a {Buffer} if
`fs.watch()` is called with its `encoding` option set to `'buffer'`, otherwise
`filename` will be a UTF-8 string.

```mjs
import { watch } from 'node:fs';
// Example when handled through fs.watch() listener
watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    console.log(filename);
    // Prints: <Buffer ...>
  }
});
```

#### Event: `'close'`

Emitted when the watcher stops watching for changes. The closed
{fs.FSWatcher} object is no longer usable in the event handler.

#### Event: `'error'`

* `error` {Error}

Emitted when an error occurs while watching the file. The errored
{fs.FSWatcher} object is no longer usable in the event handler.

#### `watcher.close()`

Stop watching for changes on the given {fs.FSWatcher}. Once stopped, the
{fs.FSWatcher} object is no longer usable.

#### `watcher.ref()`

* Returns: {fs.FSWatcher}

When called, requests that the Node.js event loop _not_ exit so long as the
{fs.FSWatcher} is active. Calling `watcher.ref()` multiple times will have
no effect.

By default, all {fs.FSWatcher} objects are "ref'ed", making it normally
unnecessary to call `watcher.ref()` unless `watcher.unref()` had been
called previously.

#### `watcher.unref()`

* Returns: {fs.FSWatcher}

When called, the active {fs.FSWatcher} object will not require the Node.js
event loop to remain active. If there is no other activity keeping the
event loop running, the process may exit before the {fs.FSWatcher} object's
callback is invoked. Calling `watcher.unref()` multiple times will have
no effect.

### Class: `fs.StatWatcher`

* Extends {EventEmitter}

A successful call to `fs.watchFile()` method will return a new {fs.StatWatcher}
object.

#### `watcher.ref()`

* Returns: {fs.StatWatcher}

When called, requests that the Node.js event loop _not_ exit so long as the
{fs.StatWatcher} is active. Calling `watcher.ref()` multiple times will have
no effect.

By default, all {fs.StatWatcher} objects are "ref'ed", making it normally
unnecessary to call `watcher.ref()` unless `watcher.unref()` had been
called previously.

#### `watcher.unref()`

* Returns: {fs.StatWatcher}

When called, the active {fs.StatWatcher} object will not require the Node.js
event loop to remain active. If there is no other activity keeping the
event loop running, the process may exit before the {fs.StatWatcher} object's
callback is invoked. Calling `watcher.unref()` multiple times will have
no effect.

### Class: `fs.ReadStream`

* Extends: {stream.Readable}

Instances of {fs.ReadStream} cannot be constructed directly. They are created and
returned using the `fs.createReadStream()` function.

#### Event: `'close'`

Emitted when the {fs.ReadStream}'s underlying file descriptor has been closed.

#### Event: `'open'`

* `fd` {integer} Integer file descriptor used by the {fs.ReadStream}.

Emitted when the {fs.ReadStream}'s file descriptor has been opened.

#### Event: `'ready'`

Emitted when the {fs.ReadStream} is ready to be used.

Fires immediately after `'open'`.

#### `readStream.bytesRead`

* Type: {number}

The number of bytes that have been read so far.

#### `readStream.path`

* Type: {string|Buffer}

The path to the file the stream is reading from as specified in the first
argument to `fs.createReadStream()`. If `path` is passed as a string, then
`readStream.path` will be a string. If `path` is passed as a {Buffer}, then
`readStream.path` will be a {Buffer}. If `fd` is specified, then
`readStream.path` will be `undefined`.

#### `readStream.pending`

* Type: {boolean}

This property is `true` if the underlying file has not been opened yet,
i.e. before the `'ready'` event is emitted.
