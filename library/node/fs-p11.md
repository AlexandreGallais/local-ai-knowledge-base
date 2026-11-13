---
title: "File system (part 11 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 11 of 20)

### `fs.readFile(path[, options], callback)`

* `path` {string|Buffer|URL|integer} filename or file descriptor
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `null`
  * `flag` {string} See support of file system `flags`. **Default:** `'r'`.
  * `signal` {AbortSignal} allows aborting an in-progress readFile
  * `buffer` {Buffer|TypedArray|DataView|Function} A buffer to read into, or a
    function called with the file size that returns the buffer.
* `callback` {Function}
  * `err` {Error|AggregateError}
  * `data` {string|Buffer}

Asynchronously reads the entire contents of a file.

```mjs
import { readFile } from 'node:fs';

readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

The callback is passed two arguments `(err, data)`, where `data` is the
contents of the file.

If no encoding is specified, then the raw buffer is returned.

If `buffer` is provided and no encoding is specified, the returned {Buffer} is
a view over the supplied buffer containing only the bytes read. If the
supplied buffer is too small to contain the entire file, the callback is
called with an error.

If `options` is a string, then it specifies the encoding:

```mjs
import { readFile } from 'node:fs';

readFile('/etc/passwd', 'utf8', callback);
```

When the path is a directory, the behavior of `fs.readFile()` and
`fs.readFileSync()` is platform-specific. On macOS, Linux, and Windows, an
error will be returned. On FreeBSD, a representation of the directory's contents
will be returned.

```mjs
import { readFile } from 'node:fs';

// macOS, Linux, and Windows
readFile('<directory>', (err, data) => {
  // => [Error: EISDIR: illegal operation on a directory, read <directory>]
});

//  FreeBSD
readFile('<directory>', (err, data) => {
  // => null, <data>
});
```

It is possible to abort an ongoing request using an `AbortSignal`. If a
request is aborted the callback is called with an `AbortError`:

```mjs
import { readFile } from 'node:fs';

const controller = new AbortController();
const signal = controller.signal;
readFile(fileInfo[0].name, { signal }, (err, buf) => {
  // ...
});
// When you want to abort the request
controller.abort();
```

The `fs.readFile()` function buffers the entire file. To minimize memory costs,
when possible prefer streaming via `fs.createReadStream()`.

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.readFile` performs.

An example using the `buffer` option with a pre-allocated buffer:

```mjs
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs';

const buf = Buffer.alloc(16384);
readFile('/path/to/file', { buffer: buf }, (err, data) => {
  if (err) throw err;
  console.log(data); // A view over `buf` containing only the bytes read
});
```

An example using the `buffer` option with a function returning a buffer:

```mjs
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs';

readFile('/path/to/file', {
  buffer: (size) => Buffer.alloc(size),
}, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

#### File descriptors

1. Any specified file descriptor has to support reading.
2. If a file descriptor is specified as the `path`, it will not be closed
   automatically.
3. The reading will begin at the current position. For example, if the file
   already had `'Hello World'` and six bytes are read with the file descriptor,
   the call to `fs.readFile()` with the same file descriptor, would give
   `'World'`, rather than `'Hello World'`.

#### Performance Considerations

The `fs.readFile()` method asynchronously reads the contents of a file into
memory one chunk at a time, allowing the event loop to turn between each chunk.
This allows the read operation to have less impact on other activity that may
be using the underlying libuv thread pool but means that it will take longer
to read a complete file into memory.

The additional read overhead can vary broadly on different systems and depends
on the type of file being read. If the file type is not a regular file (a pipe
for instance) and Node.js is unable to determine an actual file size, each read
operation will load on 64 KiB of data. For regular files, each read will process
512 KiB of data.

For applications that require as-fast-as-possible reading of file contents, it
is better to use `fs.read()` directly and for application code to manage
reading the full contents of the file itself.

The Node.js GitHub issue #25741 provides more information and a detailed
analysis on the performance of `fs.readFile()` for multiple file sizes in
different Node.js versions.

### `fs.readlink(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* `callback` {Function}
  * `err` {Error}
  * `linkString` {string|Buffer}

Reads the contents of the symbolic link referred to by `path`. The callback gets
two arguments `(err, linkString)`.

See the POSIX readlink(2) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path passed to the callback. If the `encoding` is set to `'buffer'`,
the link path returned will be passed as a {Buffer} object.

### `fs.readv(fd, buffers[, position], callback)`

* `fd` {integer}
* `buffers` {ArrayBufferView\[]}
* `position` {integer|null} **Default:** `null`
* `callback` {Function}
  * `err` {Error}
  * `bytesRead` {integer}
  * `buffers` {ArrayBufferView\[]}

Read from a file specified by `fd` and write to an array of `ArrayBufferView`s
using `readv()`.

`position` is the offset from the beginning of the file from where data
should be read. If `typeof position !== 'number'`, the data will be read
from the current position.

The callback will be given three arguments: `err`, `bytesRead`, and
`buffers`. `bytesRead` is how many bytes were read from the file.

If this method is invoked as its `util.promisify()`ed version, it returns
a promise for an `Object` with `bytesRead` and `buffers` properties.

### `fs.realpath(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* `callback` {Function}
  * `err` {Error}
  * `resolvedPath` {string|Buffer}

Asynchronously computes the canonical pathname by resolving `.`, `..`, and
symbolic links.

A canonical pathname is not necessarily unique. Hard links and bind mounts can
expose a file system entity through many pathnames.

This function behaves like realpath(3), with some exceptions:

1. No case conversion is performed on case-insensitive file systems.

2. The maximum number of symbolic links is platform-independent and generally
   (much) higher than what the native realpath(3) implementation supports.

The `callback` gets two arguments `(err, resolvedPath)`. May use `process.cwd`
to resolve relative paths.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path passed to the callback. If the `encoding` is set to `'buffer'`,
the path returned will be passed as a {Buffer} object.

If `path` resolves to a socket or a pipe, the function will return a system
dependent name for that object.

A path that does not exist results in an ENOENT error.
`error.path` is the absolute file path.

### `fs.realpath.native(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* `callback` {Function}
  * `err` {Error}
  * `resolvedPath` {string|Buffer}

Asynchronous realpath(3).

The `callback` gets two arguments `(err, resolvedPath)`.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path passed to the callback. If the `encoding` is set to `'buffer'`,
the path returned will be passed as a {Buffer} object.

On Linux, when Node.js is linked against musl libc, the procfs file system must
be mounted on `/proc` in order for this function to work. Glibc does not have
this restriction.

### `fs.rename(oldPath, newPath, callback)`

* `oldPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* `callback` {Function}
  * `err` {Error}

Asynchronously rename file at `oldPath` to the pathname provided
as `newPath`. In the case that `newPath` already exists, it will
be overwritten. If there is a directory at `newPath`, an error will
be raised instead. No arguments other than a possible exception are
given to the completion callback.

See also: rename(2).

```mjs
import { rename } from 'node:fs';

rename('oldFile.txt', 'newFile.txt', (err) => {
  if (err) throw err;
  console.log('Rename complete!');
});
```

### `fs.rmdir(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {Object} There are currently no options exposed. There used to
  be options for `recursive`, `maxBusyTries`, and `emfileWait` but they were
  deprecated and removed. The `options` argument is still accepted for
  backwards compatibility but it is not used.
* `callback` {Function}
  * `err` {Error}

Asynchronous rmdir(2). No arguments other than a possible exception are given
to the completion callback.

Using `fs.rmdir()` on a file (not a directory) results in an `ENOENT` error on
Windows and an `ENOTDIR` error on POSIX.

To get a behavior similar to the `rm -rf` Unix command, use `fs.rm()`
with options `{ recursive: true, force: true }`.

### `fs.rm(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `force` {boolean} When `true`, exceptions will be ignored if `path` does
    not exist. **Default:** `false`.
  * `maxRetries` {integer} If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
    `EPERM` error is encountered, Node.js will retry the operation with a linear
    backoff wait of `retryDelay` milliseconds longer on each try. This option
    represents the number of retries. This option is ignored if the `recursive`
    option is not `true`. **Default:** `0`.
  * `recursive` {boolean} If `true`, perform a recursive removal. In
    recursive mode operations are retried on failure. **Default:** `false`.
  * `retryDelay` {integer} The amount of time in milliseconds to wait between
    retries. This option is ignored if the `recursive` option is not `true`.
    **Default:** `100`.
* `callback` {Function}
  * `err` {Error}

Asynchronously removes files and directories (modeled on the standard POSIX `rm`
utility). No arguments other than a possible exception are given to the
completion callback.

### `fs.stat(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned
    {fs.Stats} object should be `bigint`. **Default:** `false`.
  * `throwIfNoEntry` {boolean} Whether an exception will be thrown
    if no file system entry exists, rather than returning `undefined`.
    **Default:** `true`.
* `callback` {Function}
  * `err` {Error}
  * `stats` {fs.Stats}

Asynchronous stat(2). The callback gets two arguments `(err, stats)` where
`stats` is an {fs.Stats} object.

In case of an error, the `err.code` will be one of Common System Errors.

`fs.stat()` follows symbolic links. Use `fs.lstat()` to look at the
links themselves.

Using `fs.stat()` to check for the existence of a file before calling
`fs.open()`, `fs.readFile()`, or `fs.writeFile()` is not recommended.
Instead, user code should open/read/write the file directly and handle the
error raised if the file is not available.

To check if a file exists without manipulating it afterwards, `fs.access()`
is recommended.

For example, given the following directory structure:

```text
- txtDir
-- file.txt
- app.js
```

The next program will check for the stats of the given paths:

```mjs
import { stat } from 'node:fs';

const pathsToCheck = ['./txtDir', './txtDir/file.txt'];

for (let i = 0; i < pathsToCheck.length; i++) {
  stat(pathsToCheck[i], (err, stats) => {
    console.log(stats.isDirectory());
    console.log(stats);
  });
}
```

The resulting output will resemble:

```console
true
Stats {
  dev: 16777220,
  mode: 16877,
  nlink: 3,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 14214262,
  size: 96,
  blocks: 0,
  atimeMs: 1561174653071.963,
  mtimeMs: 1561174614583.3518,
  ctimeMs: 1561174626623.5366,
  birthtimeMs: 1561174126937.2893,
  atime: 2019-06-22T03:37:33.072Z,
  mtime: 2019-06-22T03:36:54.583Z,
  ctime: 2019-06-22T03:37:06.624Z,
  birthtime: 2019-06-22T03:28:46.937Z,
  atimeInstant: 2019-06-22T03:37:33.071963Z,
  mtimeInstant: 2019-06-22T03:36:54.5833518Z,
  ctimeInstant: 2019-06-22T03:37:06.6235366Z,
  birthtimeInstant: 2019-06-22T03:28:46.9372893Z
}
false
Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 14214074,
  size: 8,
  blocks: 8,
  atimeMs: 1561174616618.8555,
  mtimeMs: 1561174614584,
  ctimeMs: 1561174614583.8145,
  birthtimeMs: 1561174007710.7478,
  atime: 2019-06-22T03:36:56.619Z,
  mtime: 2019-06-22T03:36:54.584Z,
  ctime: 2019-06-22T03:36:54.584Z,
  birthtime: 2019-06-22T03:26:47.711Z,
  atimeInstant: 2019-06-22T03:36:56.6188555Z,
  mtimeInstant: 2019-06-22T03:36:54.584Z,
  ctimeInstant: 2019-06-22T03:36:54.5838145Z,
  birthtimeInstant: 2019-06-22T03:26:47.7107478Z
}
```

### `fs.statfs(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned
    {fs.StatFs} object should be `bigint`. **Default:** `false`.
* `callback` {Function}
  * `err` {Error}
  * `stats` {fs.StatFs}

Asynchronous statfs(2). Returns information about the mounted file system which
contains `path`. The callback gets two arguments `(err, stats)` where `stats`
is an {fs.StatFs} object.

In case of an error, the `err.code` will be one of Common System Errors.
