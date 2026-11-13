---
title: "File system (part 20 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 20 of 20)

## Notes

### Ordering of callback and promise-based operations

Because they are executed asynchronously by the underlying thread pool,
there is no guaranteed ordering when using either the callback or
promise-based methods.

For example, the following is prone to error because the `fs.stat()`
operation might complete before the `fs.rename()` operation:

```js
const fs = require('node:fs');

fs.rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  console.log('renamed complete');
});
fs.stat('/tmp/world', (err, stats) => {
  if (err) throw err;
  console.log(`stats: ${JSON.stringify(stats)}`);
});
```

It is important to correctly order the operations by awaiting the results
of one before invoking the other:

```mjs
import { rename, stat } from 'node:fs/promises';

const oldPath = '/tmp/hello';
const newPath = '/tmp/world';

try {
  await rename(oldPath, newPath);
  const stats = await stat(newPath);
  console.log(`stats: ${JSON.stringify(stats)}`);
} catch (error) {
  console.error('there was an error:', error.message);
}
```

```cjs
const { rename, stat } = require('node:fs/promises');

(async function(oldPath, newPath) {
  try {
    await rename(oldPath, newPath);
    const stats = await stat(newPath);
    console.log(`stats: ${JSON.stringify(stats)}`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})('/tmp/hello', '/tmp/world');
```

Or, when using the callback APIs, move the `fs.stat()` call into the callback
of the `fs.rename()` operation:

```mjs
import { rename, stat } from 'node:fs';

rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  stat('/tmp/world', (err, stats) => {
    if (err) throw err;
    console.log(`stats: ${JSON.stringify(stats)}`);
  });
});
```

```cjs
const { rename, stat } = require('node:fs');

rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  stat('/tmp/world', (err, stats) => {
    if (err) throw err;
    console.log(`stats: ${JSON.stringify(stats)}`);
  });
});
```

### File paths

Most `fs` operations accept file paths that may be specified in the form of
a string, a {Buffer}, or a {URL} object using the `file:` protocol.

#### String paths

String paths are interpreted as UTF-8 character sequences identifying
the absolute or relative filename. Relative paths will be resolved relative
to the current working directory as determined by calling `process.cwd()`.

Example using an absolute path on POSIX:

```mjs
import { open } from 'node:fs/promises';

let fd;
try {
  fd = await open('/open/some/file.txt', 'r');
  // Do something with the file
} finally {
  await fd?.close();
}
```

Example using a relative path on POSIX (relative to `process.cwd()`):

```mjs
import { open } from 'node:fs/promises';

let fd;
try {
  fd = await open('file.txt', 'r');
  // Do something with the file
} finally {
  await fd?.close();
}
```

#### File URL paths

For most `node:fs` module functions, the `path` or `filename` argument may be
passed as a {URL} object using the `file:` protocol.

```mjs
import { readFileSync } from 'node:fs';

readFileSync(new URL('file:///tmp/hello'));
```

`file:` URLs are always absolute paths.

##### Platform-specific considerations

On Windows, `file:` {URL}s with a host name convert to UNC paths, while `file:`
{URL}s with drive letters convert to local absolute paths. `file:` {URL}s
with no host name and no drive letter will result in an error:

```mjs
import { readFileSync } from 'node:fs';
// On Windows :

// - WHATWG file URLs with hostname convert to UNC path
// file://hostname/p/a/t/h/file => \\hostname\p\a\t\h\file
readFileSync(new URL('file://hostname/p/a/t/h/file'));

// - WHATWG file URLs with drive letters convert to absolute path
// file:///C:/tmp/hello => C:\tmp\hello
readFileSync(new URL('file:///C:/tmp/hello'));

// - WHATWG file URLs without hostname must have a drive letters
readFileSync(new URL('file:///notdriveletter/p/a/t/h/file'));
readFileSync(new URL('file:///c/p/a/t/h/file'));
// TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must be absolute
```

`file:` {URL}s with drive letters must use `:` as a separator just after
the drive letter. Using another separator will result in an error.

On all other platforms, `file:` {URL}s with a host name are unsupported and
will result in an error:

```mjs
import { readFileSync } from 'node:fs';
// On other platforms:

// - WHATWG file URLs with hostname are unsupported
// file://hostname/p/a/t/h/file => throw!
readFileSync(new URL('file://hostname/p/a/t/h/file'));
// TypeError [ERR_INVALID_FILE_URL_PATH]: must be absolute

// - WHATWG file URLs convert to absolute path
// file:///tmp/hello => /tmp/hello
readFileSync(new URL('file:///tmp/hello'));
```

A `file:` {URL} having encoded slash characters will result in an error on all
platforms:

```mjs
import { readFileSync } from 'node:fs';

// On Windows
readFileSync(new URL('file:///C:/p/a/t/h/%2F'));
readFileSync(new URL('file:///C:/p/a/t/h/%2f'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
\ or / characters */

// On POSIX
readFileSync(new URL('file:///p/a/t/h/%2F'));
readFileSync(new URL('file:///p/a/t/h/%2f'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
/ characters */
```

On Windows, `file:` {URL}s having encoded backslash will result in an error:

```mjs
import { readFileSync } from 'node:fs';

// On Windows
readFileSync(new URL('file:///C:/path/%5C'));
readFileSync(new URL('file:///C:/path/%5c'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
\ or / characters */
```

#### Buffer paths

Paths specified using a {Buffer} are useful primarily on certain POSIX
operating systems that treat file paths as opaque byte sequences. On such
systems, it is possible for a single file path to contain sub-sequences that
use multiple character encodings. As with string paths, {Buffer} paths may
be relative or absolute:

Example using an absolute path on POSIX:

```mjs
import { open } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

let fd;
try {
  fd = await open(Buffer.from('/open/some/file.txt'), 'r');
  // Do something with the file
} finally {
  await fd?.close();
}
```

#### Per-drive working directories on Windows

On Windows, Node.js follows the concept of per-drive working directory. This
behavior can be observed when using a drive path without a backslash. For
example `fs.readdirSync('C:\\')` can potentially return a different result than
`fs.readdirSync('C:')`. For more information, see
this MSDN page.

### File descriptors

On POSIX systems, for every process, the kernel maintains a table of currently
open files and resources. Each open file is assigned a simple numeric
identifier called a _file descriptor_. At the system-level, all file system
operations use these file descriptors to identify and track each specific
file. Windows systems use a different but conceptually similar mechanism for
tracking resources. To simplify things for users, Node.js abstracts away the
differences between operating systems and assigns all open files a numeric file
descriptor.

The callback-based `fs.open()`, and synchronous `fs.openSync()` methods open a
file and allocate a new file descriptor. Once allocated, the file descriptor may
be used to read data from, write data to, or request information about the file.

Operating systems limit the number of file descriptors that may be open
at any given time so it is critical to close the descriptor when operations
are completed. Failure to do so will result in a memory leak that will
eventually cause an application to crash.

```mjs
import { open, close, fstat } from 'node:fs';

function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err;
  });
}

open('/open/some/file.txt', 'r', (err, fd) => {
  if (err) throw err;
  try {
    fstat(fd, (err, stat) => {
      if (err) {
        closeFd(fd);
        throw err;
      }

      // use stat

      closeFd(fd);
    });
  } catch (err) {
    closeFd(fd);
    throw err;
  }
});
```

The promise-based APIs use a {FileHandle} object in place of the numeric
file descriptor. These objects are better managed by the system to ensure
that resources are not leaked. However, it is still required that they are
closed when operations are completed:

```mjs
import { open } from 'node:fs/promises';

let file;
try {
  file = await open('/open/some/file.txt', 'r');
  const stat = await file.stat();
  // use stat
} finally {
  await file.close();
}
```

### Threadpool usage

All callback and promise-based file system APIs (with the exception of
`fs.FSWatcher()`) use libuv's threadpool. This can have surprising and negative
performance implications for some applications. See the
`UV_THREADPOOL_SIZE` documentation for more information.

### File system flags

The following flags are available wherever the `flag` option takes a
string.

* `'a'`: Open file for appending.
  The file is created if it does not exist.

* `'ax'`: Like `'a'` but fails if the path exists.

* `'a+'`: Open file for reading and appending.
  The file is created if it does not exist.

* `'ax+'`: Like `'a+'` but fails if the path exists.

* `'as'`: Open file for appending in synchronous mode.
  The file is created if it does not exist.

* `'as+'`: Open file for reading and appending in synchronous mode.
  The file is created if it does not exist.

* `'r'`: Open file for reading.
  An exception occurs if the file does not exist.

* `'rs'`: Open file for reading in synchronous mode.
  An exception occurs if the file does not exist.

* `'r+'`: Open file for reading and writing.
  An exception occurs if the file does not exist.

* `'rs+'`: Open file for reading and writing in synchronous mode. Instructs
  the operating system to bypass the local file system cache.

  This is primarily useful for opening files on NFS mounts as it allows
  skipping the potentially stale local cache. It has a very real impact on
  I/O performance so using this flag is not recommended unless it is needed.

  This doesn't turn `fs.open()` or `fsPromises.open()` into a synchronous
  blocking call. If synchronous operation is desired, something like
  `fs.openSync()` should be used.

* `'w'`: Open file for writing.
  The file is created (if it does not exist) or truncated (if it exists).

* `'wx'`: Like `'w'` but fails if the path exists.

* `'w+'`: Open file for reading and writing.
  The file is created (if it does not exist) or truncated (if it exists).

* `'wx+'`: Like `'w+'` but fails if the path exists.

`flag` can also be a number as documented by open(2); commonly used constants
are available from `fs.constants`. On Windows, flags are translated to
their equivalent ones where applicable, e.g. `O_WRONLY` to `FILE_GENERIC_WRITE`,
or `O_EXCL|O_CREAT` to `CREATE_NEW`, as accepted by `CreateFileW`.

The exclusive flag `'x'` (`O_EXCL` flag in open(2)) causes the operation to
return an error if the path already exists. On POSIX, if the path is a symbolic
link, using `O_EXCL` returns an error even if the link is to a path that does
not exist. The exclusive flag might not work with network file systems.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

Modifying a file rather than replacing it may require the `flag` option to be
set to `'r+'` rather than the default `'w'`.

The behavior of some flags are platform-specific. As such, opening a directory
on macOS and Linux with the `'a+'` flag, as in the example below, will return an
error. In contrast, on Windows and FreeBSD, a file descriptor or a `FileHandle`
will be returned.

```js
// macOS and Linux
fs.open('<directory>', 'a+', (err, fd) => {
  // => [Error: EISDIR: illegal operation on a directory, open <directory>]
});

// Windows and FreeBSD
fs.open('<directory>', 'a+', (err, fd) => {
  // => null, <fd>
});
```

On Windows, opening an existing hidden file using the `'w'` flag (either
through `fs.open()`, `fs.writeFile()`, or `fsPromises.open()`) will fail with
`EPERM`. Existing hidden files can be opened for writing with the `'r+'` flag.

A call to `fs.ftruncate()` or `filehandle.truncate()` can be used to reset
the file contents.
