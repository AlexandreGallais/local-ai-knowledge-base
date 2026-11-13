---
title: "File system (part 15 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 15 of 20)

### `fs.opendirSync(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `bufferSize` {number} Number of directory entries that are buffered
    internally when reading from the directory. Higher values lead to better
    performance but higher memory usage. **Default:** `32`
  * `recursive` {boolean} **Default:** `false`
* Returns: {fs.Dir}

Synchronously open a directory. See opendir(3).

Creates an {fs.Dir}, which contains all further functions for reading from
and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the
directory and subsequent read operations.

### `fs.openSync(path[, flags[, mode]])`

* `path` {string|Buffer|URL}
* `flags` {string|number} **Default:** `'r'`.
  See support of file system `flags`.
* `mode` {string|integer} **Default:** `0o666`
* Returns: {number}

Returns an integer representing the file descriptor.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.open()`.

### `fs.readdirSync(path[, options])`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
  * `withFileTypes` {boolean} **Default:** `false`
  * `recursive` {boolean} If `true`, reads the contents of a directory
    recursively. In recursive mode, it will list all files, sub files, and
    directories. **Default:** `false`.
* Returns: {string\[]|Buffer\[]|fs.Dirent\[]}

Reads the contents of the directory.

See the POSIX readdir(3) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames returned. If the `encoding` is set to `'buffer'`,
the filenames returned will be passed as {Buffer} objects.

If `options.withFileTypes` is set to `true`, the result will contain
{fs.Dirent} objects.

### `fs.readFileSync(path[, options])`

* `path` {string|Buffer|URL|integer} filename or file descriptor
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `null`
  * `flag` {string} See support of file system `flags`. **Default:** `'r'`.
  * `buffer` {Buffer|TypedArray|DataView|Function} A buffer to read into, or a
    function called with the file size that returns the buffer.
* Returns: {string|Buffer}

Returns the contents of the `path`.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.readFile()`.

If the `encoding` option is specified then this function returns a
string. Otherwise it returns a buffer.

If `buffer` is provided and no encoding is specified, the returned {Buffer} is
a view over the supplied buffer containing only the bytes read. If the
supplied buffer is too small to contain the entire file, an error will be
thrown.

Similar to `fs.readFile()`, when the path is a directory, the behavior of
`fs.readFileSync()` is platform-specific.

```mjs
import { readFileSync } from 'node:fs';

// macOS, Linux, and Windows
readFileSync('<directory>');
// => [Error: EISDIR: illegal operation on a directory, read <directory>]

//  FreeBSD
readFileSync('<directory>'); // => <data>
```

### `fs.readlinkSync(path[, options])`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* Returns: {string|Buffer}

Returns the symbolic link's string value.

See the POSIX readlink(2) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path returned. If the `encoding` is set to `'buffer'`,
the link path returned will be passed as a {Buffer} object.

### `fs.readSync(fd, buffer, offset, length[, position])`

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `offset` {integer}
* `length` {integer}
* `position` {integer|bigint|null} **Default:** `null`
* Returns: {number}

Returns the number of `bytesRead`.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.read()`.

### `fs.readSync(fd, buffer[, options])`

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `options` {Object}
  * `offset` {integer} **Default:** `0`
  * `length` {integer} **Default:** `buffer.byteLength - offset`
  * `position` {integer|bigint|null} **Default:** `null`
* Returns: {number}

Returns the number of `bytesRead`.

Similar to the above `fs.readSync` function, this version takes an optional `options` object.
If no `options` object is specified, it will default with the above values.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.read()`.

### `fs.readvSync(fd, buffers[, position])`

* `fd` {integer}
* `buffers` {ArrayBufferView\[]}
* `position` {integer|null} **Default:** `null`
* Returns: {number} The number of bytes read.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.readv()`.

### `fs.realpathSync(path[, options])`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* Returns: {string|Buffer}

Returns the resolved pathname.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.realpath()`.

### `fs.realpathSync.native(path[, options])`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* Returns: {string|Buffer}

Synchronous realpath(3).

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path returned. If the `encoding` is set to `'buffer'`,
the path returned will be passed as a {Buffer} object.

On Linux, when Node.js is linked against musl libc, the procfs file system must
be mounted on `/proc` in order for this function to work. Glibc does not have
this restriction.

### `fs.renameSync(oldPath, newPath)`

* `oldPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}

Renames the file from `oldPath` to `newPath`. Returns `undefined`.

See the POSIX rename(2) documentation for more details.

### `fs.rmdirSync(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object} There are currently no options exposed. There used to
  be options for `recursive`, `maxBusyTries`, and `emfileWait` but they were
  deprecated and removed. The `options` argument is still accepted for
  backwards compatibility but it is not used.

Synchronous rmdir(2). Returns `undefined`.

Using `fs.rmdirSync()` on a file (not a directory) results in an `ENOENT` error
on Windows and an `ENOTDIR` error on POSIX.

To get a behavior similar to the `rm -rf` Unix command, use `fs.rmSync()`
with options `{ recursive: true, force: true }`.

### `fs.rmSync(path[, options])`

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

Synchronously removes files and directories (modeled on the standard POSIX `rm`
utility). Returns `undefined`.

### `fs.statSync(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned
    {fs.Stats} object should be `bigint`. **Default:** `false`.
  * `throwIfNoEntry` {boolean} Whether an exception will be thrown
    if no file system entry exists, rather than returning `undefined`.
    **Default:** `true`.
* Returns: {fs.Stats}

Retrieves the {fs.Stats} for the path.

### `fs.statfsSync(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned
    {fs.StatFs} object should be `bigint`. **Default:** `false`.
* Returns: {fs.StatFs}

Synchronous statfs(2). Returns information about the mounted file system which
contains `path`.

In case of an error, the `err.code` will be one of Common System Errors.

### `fs.symlinkSync(target, path[, type])`

* `target` {string|Buffer|URL}
* `path` {string|Buffer|URL}
* `type` {string|null} **Default:** `null`
* Returns: `undefined`.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.symlink()`.

### `fs.truncateSync(path[, len])`

* `path` {string|Buffer|URL}
* `len` {integer} **Default:** `0`

Truncates the file. Returns `undefined`. A file descriptor can also be
passed as the first argument. In this case, `fs.ftruncateSync()` is called.

Passing a file descriptor is deprecated and may result in an error being thrown
in the future.

### `fs.unlinkSync(path)`

* `path` {string|Buffer|URL}

Synchronous unlink(2). Returns `undefined`.

### `fs.utimesSync(path, atime, mtime)`

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* Returns: `undefined`.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.utimes()`.

### `fs.writeFileSync(file, data[, options])`

* `file` {string|Buffer|URL|integer} filename or file descriptor
* `data` {string|Buffer|TypedArray|DataView}
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `mode` {integer} **Default:** `0o666`
  * `flag` {string} See support of file system `flags`. **Default:** `'w'`.
  * `flush` {boolean} If all data is successfully written to the file, and
    `flush` is `true`, `fs.fsyncSync()` is used to flush the data.
* Returns: `undefined`.

The `mode` option only affects the newly created file. See `fs.open()`
for more details.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.writeFile()`.

### `fs.writeSync(fd, buffer, offset[, length[, position]])`

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `offset` {integer} **Default:** `0`
* `length` {integer} **Default:** `buffer.byteLength - offset`
* `position` {integer|null} **Default:** `null`
* Returns: {number} The number of bytes written.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.write(fd, buffer...)`.

### `fs.writeSync(fd, buffer[, options])`

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `options` {Object}
  * `offset` {integer} **Default:** `0`
  * `length` {integer} **Default:** `buffer.byteLength - offset`
  * `position` {integer|null} **Default:** `null`
* Returns: {number} The number of bytes written.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.write(fd, buffer...)`.

### `fs.writeSync(fd, string[, position[, encoding]])`

* `fd` {integer}
* `string` {string}
* `position` {integer|null} **Default:** `null`
* `encoding` {string} **Default:** `'utf8'`
* Returns: {number} The number of bytes written.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.write(fd, string...)`.

### `fs.writevSync(fd, buffers[, position])`

* `fd` {integer}
* `buffers` {ArrayBufferView\[]}
* `position` {integer|null} **Default:** `null`
* Returns: {number} The number of bytes written.

For detailed information, see the documentation of the asynchronous version of
this API: `fs.writev()`.
