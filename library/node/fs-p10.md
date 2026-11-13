---
title: "File system (part 10 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 10 of 20)

### `fs.lchown(path, uid, gid, callback)`

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}
* `callback` {Function}
  * `err` {Error}

Set the owner of the symbolic link. No arguments other than a possible
exception are given to the completion callback.

See the POSIX lchown(2) documentation for more detail.

### `fs.lutimes(path, atime, mtime, callback)`

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* `callback` {Function}
  * `err` {Error}

Changes the access and modification times of a file in the same way as
`fs.utimes()`, with the difference that if the path refers to a symbolic
link, then the link is not dereferenced: instead, the timestamps of the
symbolic link itself are changed.

No arguments other than a possible exception are given to the completion
callback.

### `fs.link(existingPath, newPath, callback)`

* `existingPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* `callback` {Function}
  * `err` {Error}

Creates a new link from the `existingPath` to the `newPath`. See the POSIX
link(2) documentation for more detail. No arguments other than a possible
exception are given to the completion callback.

### `fs.lstat(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned
    {fs.Stats} object should be `bigint`. **Default:** `false`.
  * `signal` {AbortSignal} An AbortSignal to cancel the operation.
    **Default:** `undefined`.
* `callback` {Function}
  * `err` {Error}
  * `stats` {fs.Stats}

Retrieves the {fs.Stats} for the symbolic link referred to by the path.
The callback gets two arguments `(err, stats)` where `stats` is a {fs.Stats}
object. `lstat()` is identical to `stat()`, except that if `path` is a symbolic
link, then the link itself is stat-ed, not the file that it refers to.

See the POSIX lstat(2) documentation for more details.

### `fs.mkdir(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {Object|integer}
  * `recursive` {boolean} **Default:** `false`
  * `mode` {string|integer} Not supported on Windows. See File modes
    for more details. **Default:** `0o777`.
* `callback` {Function}
  * `err` {Error}
  * `path` {string|undefined} Present only if a directory is created with
    `recursive` set to `true`.

Asynchronously creates a directory.

The callback is given a possible exception and, if `recursive` is `true`, the
first directory path created, `(err[, path])`.
`path` can still be `undefined` when `recursive` is `true`, if no directory was
created (for instance, if it was previously created).

The optional `options` argument can be an integer specifying `mode` (permission
and sticky bits), or an object with a `mode` property and a `recursive`
property indicating whether parent directories should be created. Calling
`fs.mkdir()` when `path` is a directory that exists results in an error only
when `recursive` is false. If `recursive` is false and the directory exists,
an `EEXIST` error occurs.

```mjs
import { mkdir } from 'node:fs';

// Create ./tmp/a/apple, regardless of whether ./tmp and ./tmp/a exist.
mkdir('./tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});
```

On Windows, using `fs.mkdir()` on the root directory even with recursion will
result in an error:

```mjs
import { mkdir } from 'node:fs';

mkdir('/', { recursive: true }, (err) => {
  // => [Error: EPERM: operation not permitted, mkdir 'C:\']
});
```

See the POSIX mkdir(2) documentation for more details.

### `fs.mkdtemp(prefix[, options], callback)`

* `prefix` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* `callback` {Function}
  * `err` {Error}
  * `directory` {string|Buffer}

Creates a unique temporary directory.

Generates six random characters to be appended behind a required
`prefix` to create a unique temporary directory. Due to platform
inconsistencies, avoid trailing `X` characters in `prefix`. Some platforms,
notably the BSDs, can return more than six random characters, and replace
trailing `X` characters in `prefix` with random characters.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use.

The created directory path is passed to the callback's second parameter. If
`encoding` is `'buffer'`, then the resulting directory path is passed as a
{Buffer}. Otherwise, the path is passed as a {string} using the specified
encoding.

```mjs
import { mkdtemp } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

mkdtemp(join(tmpdir(), 'foo-'), (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // Prints: /tmp/foo-itXde2 or C:\Users\...\AppData\Local\Temp\foo-itXde2
});
```

The `fs.mkdtemp()` method will append the six randomly selected characters
directly to the `prefix` string. For instance, given a directory `/tmp`, if the
intention is to create a temporary directory _within_ `/tmp`, the `prefix`
must end with a trailing platform-specific path separator
(`require('node:path').sep`).

```mjs
import { tmpdir } from 'node:os';
import { mkdtemp } from 'node:fs';

// The parent directory for the new temporary directory
const tmpDir = tmpdir();

// This method is *INCORRECT*:
mkdtemp(tmpDir, (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // Will print something similar to `/tmpabc123`.
  // A new temporary directory is created at the file system root
  // rather than *within* the /tmp directory.
});

// This method is *CORRECT*:
import { sep } from 'node:path';
mkdtemp(`${tmpDir}${sep}`, (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // Will print something similar to `/tmp/abc123`.
  // A new temporary directory is created within
  // the /tmp directory.
});
```

### `fs.open(path[, flags[, mode]], callback)`

* `path` {string|Buffer|URL}
* `flags` {string|number} See support of file system `flags`.
  **Default:** `'r'`.
* `mode` {string|integer} **Default:** `0o666` (readable and writable)
* `callback` {Function}
  * `err` {Error}
  * `fd` {integer}

Asynchronous file open. See the POSIX open(2) documentation for more details.

`mode` sets the file mode (permission and sticky bits), but only if the file was
created. On Windows, only the write permission can be manipulated; see
`fs.chmod()`.

The callback gets two arguments `(err, fd)`.

Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented
by Naming Files, Paths, and Namespaces. Under NTFS, if the filename contains
a colon, Node.js will open a file system stream, as described by
this MSDN page.

Functions based on `fs.open()` exhibit this behavior as well:
`fs.writeFile()`, `fs.readFile()`, etc.

### `fs.openAsBlob(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `type` {string} An optional mime type for the blob.
* Returns: {Promise} Fulfills with a {Blob} upon success.

Returns a {Blob} whose data is backed by the given file.

The file must not be modified after the {Blob} is created. Any modifications
will cause reading the {Blob} data to fail with a `DOMException` error.
Synchronous stat operations on the file when the `Blob` is created, and before
each read in order to detect whether the file data has been modified on disk.

```mjs
import { openAsBlob } from 'node:fs';

const blob = await openAsBlob('the.file.txt');
const ab = await blob.arrayBuffer();
blob.stream();
```

```cjs
const { openAsBlob } = require('node:fs');

(async () => {
  const blob = await openAsBlob('the.file.txt');
  const ab = await blob.arrayBuffer();
  blob.stream();
})();
```

### `fs.opendir(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `bufferSize` {number} Number of directory entries that are buffered
    internally when reading from the directory. Higher values lead to better
    performance but higher memory usage. **Default:** `32`
  * `recursive` {boolean} **Default:** `false`
* `callback` {Function}
  * `err` {Error}
  * `dir` {fs.Dir}

Asynchronously open a directory. See the POSIX opendir(3) documentation for
more details.

Creates an {fs.Dir}, which contains all further functions for reading from
and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the
directory and subsequent read operations.

### `fs.read(fd, buffer, offset, length, position, callback)`

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView} The buffer that the data will be
  written to.
* `offset` {integer} The position in `buffer` to write the data to.
* `length` {integer} The number of bytes to read.
* `position` {integer|bigint|null} Specifies where to begin reading from in the
  file. If `position` is `null` or `-1 `, data will be read from the current
  file position, and the file position will be updated. If `position` is
  a non-negative integer, the file position will be unchanged.
* `callback` {Function}
  * `err` {Error}
  * `bytesRead` {integer}
  * `buffer` {Buffer}

Read data from the file specified by `fd`.

The callback is given the three arguments, `(err, bytesRead, buffer)`.

If the file is not modified concurrently, the end-of-file is reached when the
number of bytes read is zero.

If this method is invoked as its `util.promisify()`ed version, it returns
a promise for an `Object` with `bytesRead` and `buffer` properties.

The `fs.read()` method reads data from the file specified
by the file descriptor (`fd`).
The `length` argument indicates the maximum number
of bytes that Node.js
will attempt to read from the kernel.
However, the actual number of bytes read (`bytesRead`) can be lower
than the specified `length` for various reasons.

For example:

* If the file is shorter than the specified `length`, `bytesRead`
  will be set to the actual number of bytes read.
* If the file encounters EOF (End of File) before the buffer could
  be filled, Node.js will read all available bytes until EOF is encountered,
  and the `bytesRead` parameter in the callback will indicate
  the actual number of bytes read, which may be less than the specified `length`.
* If the file is on a slow network `filesystem`
  or encounters any other issue during reading,
  `bytesRead` can be lower than the specified `length`.

Therefore, when using `fs.read()`, it's important to
check the `bytesRead` value to
determine how many bytes were actually read from the file.
Depending on your application
logic, you may need to handle cases where `bytesRead`
is lower than the specified `length`,
such as by wrapping the read call in a loop if you require
a minimum amount of bytes.

This behavior is similar to the POSIX `preadv2` function.

### `fs.read(fd[, options], callback)`

* `fd` {integer}
* `options` {Object}
  * `buffer` {Buffer|TypedArray|DataView} **Default:** `Buffer.alloc(16384)`
  * `offset` {integer} **Default:** `0`
  * `length` {integer} **Default:** `buffer.byteLength - offset`
  * `position` {integer|bigint|null} **Default:** `null`
* `callback` {Function}
  * `err` {Error}
  * `bytesRead` {integer}
  * `buffer` {Buffer}

Similar to the `fs.read()` function, this version takes an optional
`options` object. If no `options` object is specified, it will default with the
above values.

### `fs.read(fd, buffer[, options], callback)`

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView} The buffer that the data will be
  written to.
* `options` {Object}
  * `offset` {integer} **Default:** `0`
  * `length` {integer} **Default:** `buffer.byteLength - offset`
  * `position` {integer|bigint} **Default:** `null`
* `callback` {Function}
  * `err` {Error}
  * `bytesRead` {integer}
  * `buffer` {Buffer}

Similar to the `fs.read()` function, this version takes an optional
`options` object. If no `options` object is specified, it will default with the
above values.

### `fs.readdir(path[, options], callback)`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
  * `withFileTypes` {boolean} **Default:** `false`
  * `recursive` {boolean} If `true`, reads the contents of a directory
    recursively. In recursive mode, it will list all files, sub files and
    directories. **Default:** `false`.
* `callback` {Function}
  * `err` {Error}
  * `files` {string\[]|Buffer\[]|fs.Dirent\[]}

Reads the contents of a directory. The callback gets two arguments `(err, files)`
where `files` is an array of the names of the files in the directory excluding
`'.'` and `'..'`.

See the POSIX readdir(3) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames passed to the callback. If the `encoding` is set to `'buffer'`,
the filenames returned will be passed as {Buffer} objects.

If `options.withFileTypes` is set to `true`, the `files` array will contain
{fs.Dirent} objects.
