---
title: "File system (part 9 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 9 of 20)

### `fs.createReadStream(path[, options])`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `flags` {string} See support of file system `flags`. **Default:**
    `'r'`.
  * `encoding` {string} **Default:** `null`
  * `fd` {integer|FileHandle} **Default:** `null`
  * `mode` {integer} **Default:** `0o666`
  * `autoClose` {boolean} **Default:** `true`
  * `emitClose` {boolean} **Default:** `true`
  * `start` {integer}
  * `end` {integer} **Default:** `Infinity`
  * `highWaterMark` {integer} **Default:** `64 * 1024`
  * `fs` {Object|null} **Default:** `null`
  * `signal` {AbortSignal|null} **Default:** `null`
  * `windowsHandle` {bigint} A raw Win32 `HANDLE` value to read from, in place
    of `fd`. Windows only. **Default:** `null`
* Returns: {fs.ReadStream}

`options` can include `start` and `end` values to read a range of bytes from
the file instead of the entire file. Both `start` and `end` are inclusive and
start counting at 0, allowed values are in the
\[0, `Number.MAX_SAFE_INTEGER`] range. If `fd` is specified and `start` is
omitted or `undefined`, `fs.createReadStream()` reads sequentially from the
current file position. The `encoding` can be any one of those accepted by
{Buffer}.

If `fd` is specified, `ReadStream` will ignore the `path` argument and will use
the specified file descriptor. This means that no `'open'` event will be
emitted. `fd` should be blocking; non-blocking `fd`s should be passed to
{net.Socket}.

If `fd` points to a character device that only supports blocking reads
(such as keyboard or sound card), read operations do not finish until data is
available. This can prevent the process from exiting and the stream from
closing naturally.

On Windows, a value passed in `fd` is interpreted as a CRT file descriptor. To
use a raw Win32 `HANDLE` instead, such as an inherited anonymous pipe handle
obtained from another process, pass it as `windowsHandle`. The handle is wrapped
in a file descriptor that the stream owns and closes. The `windowsHandle` option
throws on non-Windows platforms and cannot be combined with the `fs` option.

By default, the stream will emit a `'close'` event after it has been
destroyed.  Set the `emitClose` option to `false` to change this behavior.

By providing the `fs` option, it is possible to override the corresponding `fs`
implementations for `open`, `read`, and `close`. When providing the `fs` option,
an override for `read` is required. If no `fd` is provided, an override for
`open` is also required. If `autoClose` is `true`, an override for `close` is
also required.

```mjs
import { createReadStream } from 'node:fs';

// Create a stream from some character device.
const stream = createReadStream('/dev/input/event0');
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

`mode` sets the file mode (permission and sticky bits), but only if the
file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

```mjs
import { createReadStream } from 'node:fs';

createReadStream('sample.txt', { start: 90, end: 99 });
```

If `options` is a string, then it specifies the encoding.

### `fs.createWriteStream(path[, options])`

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `flags` {string} See support of file system `flags`. **Default:**
    `'w'`.
  * `encoding` {string} **Default:** `'utf8'`
  * `fd` {integer|FileHandle} **Default:** `null`
  * `mode` {integer} **Default:** `0o666`
  * `autoClose` {boolean} **Default:** `true`
  * `emitClose` {boolean} **Default:** `true`
  * `start` {integer}
  * `fs` {Object|null} **Default:** `null`
  * `signal` {AbortSignal|null} **Default:** `null`
  * `highWaterMark` {number} **Default:** See
    `stream.getDefaultHighWaterMark()`.
  * `flush` {boolean} If `true`, the underlying file descriptor is flushed
    prior to closing it. **Default:** `false`.
  * `windowsHandle` {bigint} A raw Win32 `HANDLE` value to write to, in place
    of `fd`. Windows only. **Default:** `null`
* Returns: {fs.WriteStream}

`options` may also include a `start` option to allow writing data at some
position past the beginning of the file, allowed values are in the
\[0, `Number.MAX_SAFE_INTEGER`] range. Modifying a file rather than
replacing it may require the `flags` option to be set to `r+` rather than the
default `w`. The `encoding` can be any one of those accepted by {Buffer}.

If `autoClose` is set to true (default behavior) on `'error'` or `'finish'`
the file descriptor will be closed automatically. If `autoClose` is false,
then the file descriptor won't be closed, even if there's an error.
It is the application's responsibility to close it and make sure there's no
file descriptor leak.

On Windows, a value passed in `fd` is interpreted as a CRT file descriptor. To
use a raw Win32 `HANDLE` instead, such as an inherited anonymous pipe handle
obtained from another process, pass it as `windowsHandle`. The handle is wrapped
in a file descriptor that the stream owns and closes. The `windowsHandle` option
throws on non-Windows platforms and cannot be combined with the `fs` option.

By default, the stream will emit a `'close'` event after it has been
destroyed.  Set the `emitClose` option to `false` to change this behavior.

By providing the `fs` option it is possible to override the corresponding `fs`
implementations for `open`, `write`, `writev`, and `close`. Overriding `write()`
without `writev()` can reduce performance as some optimizations (`_writev()`)
will be disabled. When providing the `fs` option, overrides for at least one of
`write` and `writev` are required. If no `fd` option is supplied, an override
for `open` is also required. If `autoClose` is `true`, an override for `close`
is also required.

Like {fs.ReadStream}, if `fd` is specified, {fs.WriteStream} will ignore the
`path` argument and will use the specified file descriptor. This means that no
`'open'` event will be emitted. `fd` should be blocking; non-blocking `fd`s
should be passed to {net.Socket}.

If `options` is a string, then it specifies the encoding.

### `fs.exists(path, callback)`

> Stability: 0 - Deprecated: Use `fs.stat()` or `fs.access()` instead.

* `path` {string|Buffer|URL}
* `callback` {Function}
  * `exists` {boolean}

Test whether or not the element at the given `path` exists by checking with the file system.
Then call the `callback` argument with either true or false:

```mjs
import { exists } from 'node:fs';

exists('/etc/passwd', (e) => {
  console.log(e ? 'it exists' : 'no passwd!');
});
```

**The parameters for this callback are not consistent with other Node.js
callbacks.** Normally, the first parameter to a Node.js callback is an `err`
parameter, optionally followed by other parameters. The `fs.exists()` callback
has only one boolean parameter. This is one reason `fs.access()` is recommended
instead of `fs.exists()`.

If `path` is a symbolic link, it is followed. Thus, if `path` exists but points
to a non-existent element, the callback will receive the value `false`.

Using `fs.exists()` to check for the existence of a file before calling
`fs.open()`, `fs.readFile()`, or `fs.writeFile()` is not recommended. Doing
so introduces a race condition, since other processes may change the file's
state between the two calls. Instead, user code should open/read/write the
file directly and handle the error raised if the file does not exist.

**write (NOT RECOMMENDED)**

```mjs
import { exists, open, close } from 'node:fs';

exists('myfile', (e) => {
  if (e) {
    console.error('myfile already exists');
  } else {
    open('myfile', 'wx', (err, fd) => {
      if (err) throw err;

      try {
        writeMyData(fd);
      } finally {
        close(fd, (err) => {
          if (err) throw err;
        });
      }
    });
  }
});
```

**write (RECOMMENDED)**

```mjs
import { open, close } from 'node:fs';
open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('myfile already exists');
      return;
    }

    throw err;
  }

  try {
    writeMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

**read (NOT RECOMMENDED)**

```mjs
import { open, close, exists } from 'node:fs';

exists('myfile', (e) => {
  if (e) {
    open('myfile', 'r', (err, fd) => {
      if (err) throw err;

      try {
        readMyData(fd);
      } finally {
        close(fd, (err) => {
          if (err) throw err;
        });
      }
    });
  } else {
    console.error('myfile does not exist');
  }
});
```

**read (RECOMMENDED)**

```mjs
import { open, close } from 'node:fs';

open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  try {
    readMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

The "not recommended" examples above check for existence and then use the
file; the "recommended" examples are better because they use the file directly
and handle the error, if any.

In general, check for the existence of a file only if the file won't be
used directly, for example when its existence is a signal from another
process.

### `fs.fchmod(fd, mode, callback)`

* `fd` {integer}
* `mode` {string|integer}
* `callback` {Function}
  * `err` {Error}

Sets the permissions on the file. No arguments other than a possible exception
are given to the completion callback.

See the POSIX fchmod(2) documentation for more detail.

### `fs.fchown(fd, uid, gid, callback)`

* `fd` {integer}
* `uid` {integer}
* `gid` {integer}
* `callback` {Function}
  * `err` {Error}

Sets the owner of the file. No arguments other than a possible exception are
given to the completion callback.

See the POSIX fchown(2) documentation for more detail.

### `fs.fdatasync(fd, callback)`

* `fd` {integer}
* `callback` {Function}
  * `err` {Error}

Forces all currently queued I/O operations associated with the file to the
operating system's synchronized I/O completion state. Refer to the POSIX
fdatasync(2) documentation for details. No arguments other than a possible
exception are given to the completion callback.

### `fs.fstat(fd[, options], callback)`

* `fd` {integer}
* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned
    {fs.Stats} object should be `bigint`. **Default:** `false`.
  * `signal` {AbortSignal} An AbortSignal to cancel the operation.
    **Default:** `undefined`.
* `callback` {Function}
  * `err` {Error}
  * `stats` {fs.Stats}

Invokes the callback with the {fs.Stats} for the file descriptor.

See the POSIX fstat(2) documentation for more detail.

### `fs.fsync(fd, callback)`

* `fd` {integer}
* `callback` {Function}
  * `err` {Error}

Request that all data for the open file descriptor is flushed to the storage
device. The specific implementation is operating system and device specific.
Refer to the POSIX fsync(2) documentation for more detail. No arguments other
than a possible exception are given to the completion callback.

### `fs.ftruncate(fd[, len], callback)`

* `fd` {integer}
* `len` {integer} **Default:** `0`
* `callback` {Function}
  * `err` {Error}

Truncates the file descriptor. No arguments other than a possible exception are
given to the completion callback.

See the POSIX ftruncate(2) documentation for more detail.

If the file referred to by the file descriptor was larger than `len` bytes, only
the first `len` bytes will be retained in the file.

For example, the following program retains only the first four bytes of the
file:

```mjs
import { open, close, ftruncate } from 'node:fs';

function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err;
  });
}

open('temp.txt', 'r+', (err, fd) => {
  if (err) throw err;

  try {
    ftruncate(fd, 4, (err) => {
      closeFd(fd);
      if (err) throw err;
    });
  } catch (err) {
    closeFd(fd);
    if (err) throw err;
  }
});
```

If the file previously was shorter than `len` bytes, it is extended, and the
extended part is filled with null bytes (`'\0'`):

If `len` is negative then `0` will be used.

### `fs.futimes(fd, atime, mtime, callback)`

* `fd` {integer}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* `callback` {Function}
  * `err` {Error}

Change the file system timestamps of the object referenced by the supplied file
descriptor. See `fs.utimes()`.

### `fs.glob(pattern[, options], callback)`

* `pattern` {string|string\[]}

* `options` {Object}
  * `cwd` {string|URL} current working directory. **Default:** `process.cwd()`
  * `exclude` {Function|string\[]} Function to filter out files/directories or a
    list of glob patterns to be excluded. If a function is provided, return
    `true` to exclude the item, `false` to include it. **Default:** `undefined`.
  * `followSymlinks` {boolean} When `true`, symbolic links to directories are
    followed while expanding `**` patterns. **Default:** `false`.
  * `maxDepth` {integer} Maximum number of directory levels to traverse.
    The `cwd` directory has a depth of `0`. **Default:** `Infinity`.
  * `withFileTypes` {boolean} `true` if the glob should return paths as Dirents,
    `false` otherwise. **Default:** `false`.

* `callback` {Function}
  * `err` {Error}

* Retrieves the files matching the specified pattern.

When `followSymlinks` is enabled, detected symbolic link cycles are not
traversed recursively.

```mjs
import { glob } from 'node:fs';

glob('**/*.js', (err, matches) => {
  if (err) throw err;
  console.log(matches);
});
```

```cjs
const { glob } = require('node:fs');

glob('**/*.js', (err, matches) => {
  if (err) throw err;
  console.log(matches);
});
```

### `fs.lchmod(path, mode, callback)`

> Stability: 0 - Deprecated

* `path` {string|Buffer|URL}
* `mode` {integer}
* `callback` {Function}
  * `err` {Error|AggregateError}

Changes the permissions on a symbolic link. No arguments other than a possible
exception are given to the completion callback.

This method is only implemented on macOS.

See the POSIX lchmod(2) documentation for more detail.
