---
title: "File system (part 6 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 6 of 20)

### `fsPromises.mkdtempDisposable(prefix[, options])`

* `prefix` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* Returns: {Promise} Fulfills with a Promise for an async-disposable Object:
  * `path` {string|Buffer} The path of the created directory.
  * `remove` {AsyncFunction} A function which removes the created directory.
  * `[Symbol.asyncDispose]` {AsyncFunction} The same as `remove`.

The resulting Promise holds an async-disposable object whose `path` property
holds the created directory path. If `encoding` is `'buffer'`, the `path` will
also be a {Buffer}, otherwise a {string}. When the object is disposed, the
directory and its contents will be removed asynchronously if it still exists. If
the directory cannot be deleted, disposal will throw an error. The object has an
async `remove()` method which will perform the same task.

Both this function and the disposal function on the resulting object are
async, so it should be used with `await` + `await using` as in
`await using dir = await fsPromises.mkdtempDisposable('prefix')`.

See the MDN documentation on `using` statements for more information about
explicit resource management.

For detailed information, see the documentation of `fsPromises.mkdtemp()`.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use.

### `fsPromises.open(path, flags[, mode])`

* `path` {string|Buffer|URL}
* `flags` {string|number} See support of file system `flags`.
  **Default:** `'r'`.
* `mode` {string|integer} Sets the file mode (permission and sticky bits)
  if the file is created. See File modes for more details.
  **Default:** `0o666` (readable and writable)
* Returns: {Promise} Fulfills with a {FileHandle} object.

Opens a {FileHandle}.

Refer to the POSIX open(2) documentation for more detail.

Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented
by Naming Files, Paths, and Namespaces. Under NTFS, if the filename contains
a colon, Node.js will open a file system stream, as described by
this MSDN page.

### `fsPromises.opendir(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `bufferSize` {number} Number of directory entries that are buffered
    internally when reading from the directory. Higher values lead to better
    performance but higher memory usage. **Default:** `32`
  * `recursive` {boolean} Resolved `Dir` will be an {AsyncIterable}
    containing all sub files and directories. **Default:** `false`
* Returns: {Promise}  Fulfills with an {fs.Dir}.

Asynchronously open a directory for iterative scanning. See the POSIX
opendir(3) documentation for more detail.

Creates an {fs.Dir}, which contains all further functions for reading from
and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the
directory and subsequent read operations.

Example using async iteration:

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

### `fsPromises.readdir(path[, options])`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
  * `withFileTypes` {boolean} **Default:** `false`
  * `recursive` {boolean} If `true`, reads the contents of a directory
    recursively. In recursive mode, it will list all files, sub files, and
    directories. **Default:** `false`.
* Returns: {Promise}  Fulfills with an array of the names of the files in
  the directory excluding `'.'` and `'..'`.

Reads the contents of a directory.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames. If the `encoding` is set to `'buffer'`, the filenames returned
will be passed as {Buffer} objects.

If `options.withFileTypes` is set to `true`, the returned array will contain
{fs.Dirent} objects.

```mjs
import { readdir } from 'node:fs/promises';

try {
  const files = await readdir(path);
  for (const file of files)
    console.log(file);
} catch (err) {
  console.error(err);
}
```

### `fsPromises.readFile(path[, options])`

* `path` {string|Buffer|URL|FileHandle} filename or `FileHandle`
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `null`
  * `flag` {string} See support of file system `flags`. **Default:** `'r'`.
  * `signal` {AbortSignal} allows aborting an in-progress readFile
  * `buffer` {Buffer|TypedArray|DataView|Function} A buffer to read into, or a
    function called with the file size that returns the buffer.
* Returns: {Promise}  Fulfills with the contents of the file.

Asynchronously reads the entire contents of a file.

If no encoding is specified (using `options.encoding`), the data is returned
as a {Buffer} object. Otherwise, the data will be a string.

If `options` is a string, then it specifies the encoding.

If `buffer` is provided and no encoding is specified, the returned {Buffer} is
a view over the supplied buffer containing only the bytes read. If the
supplied buffer is too small to contain the entire file, the promise will be
rejected.

When the `path` is a directory, the behavior of `fsPromises.readFile()` is
platform-specific. On macOS, Linux, and Windows, the promise will be rejected
with an error. On FreeBSD, a representation of the directory's contents will be
returned.

An example of reading a `package.json` file located in the same directory of the
running code:

```mjs
import { readFile } from 'node:fs/promises';
try {
  const filePath = new URL('./package.json', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  console.error(err.message);
}
```

```cjs
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');
async function logFile() {
  try {
    const filePath = resolve('./package.json');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  } catch (err) {
    console.error(err.message);
  }
}
logFile();
```

It is possible to abort an ongoing `readFile` using an {AbortSignal}. If a
request is aborted the promise returned is rejected with an `AbortError`:

```mjs
import { readFile } from 'node:fs/promises';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = readFile(fileName, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.readFile` performs.

Any specified {FileHandle} has to support reading.

An example using the `buffer` option with a pre-allocated buffer:

```mjs
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';

const buf = Buffer.alloc(16384);
const contents = await readFile('/path/to/file', { buffer: buf });
console.log(contents); // A view over `buf` containing only the bytes read
```

An example using the `buffer` option with a function returning a buffer:

```mjs
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';

const contents = await readFile('/path/to/file', {
  buffer: (size) => Buffer.alloc(size),
});
console.log(contents);
```

### `fsPromises.readlink(path[, options])`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* Returns: {Promise} Fulfills with the `linkString` upon success.

Reads the contents of the symbolic link referred to by `path`. See the POSIX
readlink(2) documentation for more detail. The promise is fulfilled with the
`linkString` upon success.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path returned. If the `encoding` is set to `'buffer'`, the link path
returned will be passed as a {Buffer} object.

### `fsPromises.realpath(path[, options])`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* Returns: {Promise}  Fulfills with the resolved path upon success.

Determines the actual location of `path` using the same semantics as the
`fs.realpath.native()` function.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path. If the `encoding` is set to `'buffer'`, the path returned will be
passed as a {Buffer} object.

On Linux, when Node.js is linked against musl libc, the procfs file system must
be mounted on `/proc` in order for this function to work. Glibc does not have
this restriction.

### `fsPromises.rename(oldPath, newPath)`

* `oldPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* Returns: {Promise} Fulfills with `undefined` upon success.

Renames `oldPath` to `newPath`.

### `fsPromises.rmdir(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object} There are currently no options exposed. There used to
  be options for `recursive`, `maxBusyTries`, and `emfileWait` but they were
  deprecated and removed. The `options` argument is still accepted for
  backwards compatibility but it is not used.
* Returns: {Promise} Fulfills with `undefined` upon success.

Removes the directory identified by `path`.

Using `fsPromises.rmdir()` on a file (not a directory) results in the
promise being rejected with an `ENOENT` error on Windows and an `ENOTDIR`
error on POSIX.

To get a behavior similar to the `rm -rf` Unix command, use
`fsPromises.rm()` with options `{ recursive: true, force: true }`.

### `fsPromises.rm(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `force` {boolean} When `true`, exceptions will be ignored if `path` does
    not exist. **Default:** `false`.
  * `maxRetries` {integer} If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
    `EPERM` error is encountered, Node.js will retry the operation with a linear
    backoff wait of `retryDelay` milliseconds longer on each try. This option
    represents the number of retries. This option is ignored if the `recursive`
    option is not `true`. **Default:** `0`.
  * `recursive` {boolean} If `true`, perform a recursive directory removal. In
    recursive mode operations are retried on failure. **Default:** `false`.
  * `retryDelay` {integer} The amount of time in milliseconds to wait between
    retries. This option is ignored if the `recursive` option is not `true`.
    **Default:** `100`.
* Returns: {Promise} Fulfills with `undefined` upon success.

Removes files and directories (modeled on the standard POSIX `rm` utility).

### `fsPromises.stat(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned
    {fs.Stats} object should be `bigint`. **Default:** `false`.
  * `throwIfNoEntry` {boolean} Whether an exception will be thrown
    if no file system entry exists, rather than returning `undefined`.
    **Default:** `true`.
  * `signal` {AbortSignal} An AbortSignal to cancel the operation.
    **Default:** `undefined`.
* Returns: {Promise}  Fulfills with the {fs.Stats} object for the
  given `path`.

### `fsPromises.statfs(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned
    {fs.StatFs} object should be `bigint`. **Default:** `false`.
* Returns: {Promise} Fulfills with the {fs.StatFs} object for the
  given `path`.

### `fsPromises.symlink(target, path[, type])`

* `target` {string|Buffer|URL}
* `path` {string|Buffer|URL}
* `type` {string|null} **Default:** `null`
* Returns: {Promise} Fulfills with `undefined` upon success.

Creates a symbolic link.

The `type` argument is only used on Windows platforms and can be one of `'dir'`,
`'file'`, or `'junction'`. If the `type` argument is `null`, Node.js will
autodetect `target` type and use `'file'` or `'dir'`. If the `target` does not
exist, `'file'` will be used. Windows junction points require the destination
path to be absolute. When using `'junction'`, the `target` argument will
automatically be normalized to absolute path. Junction points on NTFS volumes
can only point to directories.

### `fsPromises.truncate(path[, len])`

* `path` {string|Buffer|URL}
* `len` {integer} **Default:** `0`
* Returns: {Promise} Fulfills with `undefined` upon success.

Truncates (shortens or extends the length) of the content at `path` to `len`
bytes.

### `fsPromises.unlink(path)`

* `path` {string|Buffer|URL}
* Returns: {Promise} Fulfills with `undefined` upon success.

If `path` refers to a symbolic link, then the link is removed without affecting
the file or directory to which that link refers. If the `path` refers to a file
path that is not a symbolic link, the file is deleted. See the POSIX unlink(2)
documentation for more detail.

### `fsPromises.utimes(path, atime, mtime)`

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* Returns: {Promise} Fulfills with `undefined` upon success.

Change the file system timestamps of the object referenced by `path`.

The `atime` and `mtime` arguments follow these rules:

* Values can be either numbers representing Unix epoch time, `Date`s, or a
  numeric string like `'123456789.0'`.
* If the value can not be converted to a number, or is `NaN`, `Infinity`, or
  `-Infinity`, an `Error` will be thrown.
