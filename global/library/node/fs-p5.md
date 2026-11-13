---
title: "File system (part 5 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 5 of 20)

```mjs
import { open } from 'node:fs/promises';
import { from, pipeTo } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';

// Async pipeline
const fh = await open('output.gz', 'w');
await pipeTo(from('Hello!'), compressGzip(), fh.writer({ autoClose: true }));

// Sync pipeline with limit
const src = await open('input.txt', 'r');
const dst = await open('output.txt', 'w');
const w = dst.writer({ limit: 1024 * 1024 }); // Max 1 MB
await pipeTo(src.pull({ autoClose: true }), w);
await w.end();
await dst.close();
```

```cjs
const { open } = require('node:fs/promises');
const { from, pipeTo } = require('node:stream/iter');
const { compressGzip } = require('node:zlib/iter');

async function run() {
  // Async pipeline
  const fh = await open('output.gz', 'w');
  await pipeTo(from('Hello!'), compressGzip(), fh.writer({ autoClose: true }));

  // Sync pipeline with limit
  const src = await open('input.txt', 'r');
  const dst = await open('output.txt', 'w');
  const w = dst.writer({ limit: 1024 * 1024 }); // Max 1 MB
  await pipeTo(src.pull({ autoClose: true }), w);
  await w.end();
  await dst.close();
}

run().catch(console.error);
```

#### `filehandleSymbol.asyncDispose`

* Returns: {Promise}

Calls `filehandle.close()` and returns a promise that fulfills when the
filehandle is closed.

This method enables the filehandle to be used with `await using`, which
will automatically close the file when the scope exits. For more information,
see the MDN documentation on `using` statements.

### `fsPromises.access(path[, mode])`

* `path` {string|Buffer|URL}
* `mode` {integer} **Default:** `fs.constants.F_OK`
* Returns: {Promise} Fulfills with `undefined` upon success.

Tests a user's permissions for the file or directory specified by `path`.
The `mode` argument is an optional integer that specifies the accessibility
checks to be performed. `mode` should be either the value `fs.constants.F_OK`
or a mask consisting of the bitwise OR of any of `fs.constants.R_OK`,
`fs.constants.W_OK`, and `fs.constants.X_OK` (e.g.
`fs.constants.W_OK | fs.constants.R_OK`). Check File access constants for
possible values of `mode`.

If the accessibility check is successful, the promise is fulfilled with no
value. If any of the accessibility checks fail, the promise is rejected
with an {Error} object. The following example checks if the file
`/etc/passwd` can be read and written by the current process.

```mjs
import { access, constants } from 'node:fs/promises';

try {
  await access('<example-value>', constants.R_OK | constants.W_OK);
  console.log('can access');
} catch {
  console.error('cannot access');
}
```

Using `fsPromises.access()` to check for the accessibility of a file before
calling `fsPromises.open()` is not recommended. Doing so introduces a race
condition, since other processes may change the file's state between the two
calls. Instead, user code should open/read/write the file directly and handle
the error raised if the file is not accessible.

### `fsPromises.appendFile(path, data[, options])`

* `path` {string|Buffer|URL|FileHandle} filename or {FileHandle}
* `data` {string|Buffer|TypedArray|DataView|AsyncIterable|Iterable}
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `mode` {integer} **Default:** `0o666`
  * `flag` {string} See support of file system `flags`. **Default:** `'a'`.
  * `flush` {boolean} If `true`, the underlying file descriptor is flushed
    prior to closing it. **Default:** `false`.
* Returns: {Promise} Fulfills with `undefined` upon success.

Asynchronously append data to a file, creating the file if it does not yet
`data` can be a string, a buffer, an {AsyncIterable}, or an {Iterable} object.

If `options` is a string, then it specifies the `encoding`.

The `mode` option only affects the newly created file. See `fs.open()`
for more details.

The `path` may be specified as a {FileHandle} that has been opened
for appending (using `fsPromises.open()`).

### `fsPromises.chmod(path, mode)`

* `path` {string|Buffer|URL}
* `mode` {string|integer}
* Returns: {Promise} Fulfills with `undefined` upon success.

Changes the permissions of a file.

### `fsPromises.chown(path, uid, gid)`

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}
* Returns: {Promise} Fulfills with `undefined` upon success.

Changes the ownership of a file.

### `fsPromises.copyFile(src, dest[, mode])`

* `src` {string|Buffer|URL} source filename to copy
* `dest` {string|Buffer|URL} destination filename of the copy operation
* `mode` {integer} Optional modifiers that specify the behavior of the copy
  operation. It is possible to create a mask consisting of the bitwise OR of
  two or more values (e.g.
  `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`)
  **Default:** `0`.
  * `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest`
    already exists.
  * `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create
    a copy-on-write reflink. If the platform does not support copy-on-write,
    then a fallback copy mechanism is used.
  * `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to
    create a copy-on-write reflink. If the platform does not support
    copy-on-write, then the operation will fail.
* Returns: {Promise} Fulfills with `undefined` upon success.

Asynchronously copies `src` to `dest`. By default, `dest` is overwritten if it
already exists.

Symbolic links are followed. If `src` is a symbolic link, the target file is
copied. If `dest` is a symbolic link, the target file is overwritten unless
`mode` contains `fs.constants.COPYFILE_EXCL`.

No guarantees are made about the atomicity of the copy operation. If an
error occurs after the destination file has been opened for writing, an attempt
will be made to remove the destination.

```mjs
import { copyFile, constants } from 'node:fs/promises';

try {
  await copyFile('source.txt', 'destination.txt');
  console.log('source.txt was copied to destination.txt');
} catch {
  console.error('The file could not be copied');
}

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
try {
  await copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL);
  console.log('source.txt was copied to destination.txt');
} catch {
  console.error('The file could not be copied');
}
```

### `fsPromises.cp(src, dest[, options])`

* `src` {string|URL} source path to copy.
* `dest` {string|URL} destination path to copy to.
* `options` {Object}
  * `dereference` {boolean} dereference symlinks. **Default:** `false`.
  * `errorOnExist` {boolean} when `force` is `false`, and the destination
    exists, throw an error. **Default:** `false`.
  * `filter` {Function} Function to filter copied files/directories. Return
    `true` to copy the item, `false` to ignore it. When ignoring a directory,
    all of its contents will be skipped as well. Can also return a `Promise`
    that resolves to `true` or `false` **Default:** `undefined`.
    * `src` {string} source path to copy.
    * `dest` {string} destination path to copy to.
    * Returns: {boolean|Promise} A value that is coercible to `boolean` or
      a `Promise` that fulfils with such value.
  * `force` {boolean} overwrite existing file or directory. The copy
    operation will ignore errors if you set this to false and the destination
    exists. Use the `errorOnExist` option to change this behavior.
    **Default:** `true`.
  * `mode` {integer} modifiers for copy operation. **Default:** `0`.
    See `mode` flag of `fsPromises.copyFile()`.
  * `preserveTimestamps` {boolean} When `true` timestamps from `src` will
    be preserved. **Default:** `false`.
  * `recursive` {boolean} copy directories recursively **Default:** `false`
  * `verbatimSymlinks` {boolean} When `true`, path resolution for symlinks will
    be skipped. **Default:** `false`
* Returns: {Promise} Fulfills with `undefined` upon success.

Asynchronously copies the entire directory structure from `src` to `dest`,
including subdirectories and files.

When copying a directory to another directory, globs are not supported and
behavior is similar to `cp dir1/ dir2/`.

### `fsPromises.glob(pattern[, options])`

* `pattern` {string|string\[]}
* `options` {Object}
  * `cwd` {string|URL} current working directory. **Default:** `process.cwd()`
  * `exclude` {Function|string\[]} Function to filter out files/directories or a
    list of glob patterns to be excluded. If a function is provided, return
    `true` to exclude the item, `false` to include it. **Default:** `undefined`.
    If a string array is provided, each string should be a glob pattern that
    specifies paths to exclude. Note: Negation patterns (e.g., '!foo.js') are
    not supported.
  * `followSymlinks` {boolean} When `true`, symbolic links to directories are
    followed while expanding `**` patterns. **Default:** `false`.
  * `maxDepth` {integer} Maximum number of directory levels to traverse.
    The `cwd` directory has a depth of `0`. **Default:** `Infinity`.
  * `withFileTypes` {boolean} `true` if the glob should return paths as Dirents,
    `false` otherwise. **Default:** `false`.
* Returns: {AsyncIterator} An AsyncIterator that yields the paths of files
  that match the pattern.

When `followSymlinks` is enabled, detected symbolic link cycles are not
traversed recursively.

```mjs
import { glob } from 'node:fs/promises';

for await (const entry of glob('**/*.js'))
  console.log(entry);
```

```cjs
const { glob } = require('node:fs/promises');

(async () => {
  for await (const entry of glob('**/*.js'))
    console.log(entry);
})();
```

### `fsPromises.lchmod(path, mode)`

> Stability: 0 - Deprecated

* `path` {string|Buffer|URL}
* `mode` {integer}
* Returns: {Promise} Fulfills with `undefined` upon success.

Changes the permissions on a symbolic link.

This method is only implemented on macOS.

### `fsPromises.lchown(path, uid, gid)`

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}
* Returns: {Promise}  Fulfills with `undefined` upon success.

Changes the ownership on a symbolic link.

### `fsPromises.lutimes(path, atime, mtime)`

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* Returns: {Promise}  Fulfills with `undefined` upon success.

Changes the access and modification times of a file in the same way as
`fsPromises.utimes()`, with the difference that if the path refers to a
symbolic link, then the link is not dereferenced: instead, the timestamps of
the symbolic link itself are changed.

### `fsPromises.link(existingPath, newPath)`

* `existingPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* Returns: {Promise}  Fulfills with `undefined` upon success.

Creates a new link from the `existingPath` to the `newPath`. See the POSIX
link(2) documentation for more detail.

### `fsPromises.lstat(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} Whether the numeric values in the returned
    {fs.Stats} object should be `bigint`. **Default:** `false`.
  * `signal` {AbortSignal} An AbortSignal to cancel the operation.
    **Default:** `undefined`.
* Returns: {Promise}  Fulfills with the {fs.Stats} object for the given
  symbolic link `path`.

Equivalent to `fsPromises.stat()` unless `path` refers to a symbolic link,
in which case the link itself is stat-ed, not the file that it refers to.
Refer to the POSIX lstat(2) document for more detail.

### `fsPromises.mkdir(path[, options])`

* `path` {string|Buffer|URL}
* `options` {Object|integer}
  * `recursive` {boolean} **Default:** `false`
  * `mode` {string|integer} Not supported on Windows. See File modes
    for more details. **Default:** `0o777`.
* Returns: {Promise} Upon success, fulfills with `undefined` if `recursive`
  is `false`, or the first directory path created if `recursive` is `true`.

Asynchronously creates a directory.

The optional `options` argument can be an integer specifying `mode` (permission
and sticky bits), or an object with a `mode` property and a `recursive`
property indicating whether parent directories should be created. Calling
`fsPromises.mkdir()` when `path` is a directory that exists results in a
rejection only when `recursive` is false.

```mjs
import { mkdir } from 'node:fs/promises';

try {
  const projectFolder = new URL('./test/project/', import.meta.url);
  const createDir = await mkdir(projectFolder, { recursive: true });

  console.log(`created ${createDir}`);
} catch (err) {
  console.error(err.message);
}
```

```cjs
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

async function makeDirectory() {
  const projectFolder = join(__dirname, 'test', 'project');
  const dirCreation = await mkdir(projectFolder, { recursive: true });

  console.log(dirCreation);
  return dirCreation;
}

makeDirectory().catch(console.error);
```

### `fsPromises.mkdtemp(prefix[, options])`

* `prefix` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* Returns: {Promise} Fulfills with the created directory path.
  If `encoding` is `'buffer'`, then the resulting directory
  path is returned as a {Buffer}. Otherwise, the path is returned as a
  {string} using the specified encoding.

Creates a unique temporary directory. A unique directory name is generated by
appending six random characters to the end of the provided `prefix`. Due to
platform inconsistencies, avoid trailing `X` characters in `prefix`. Some
platforms, notably the BSDs, can return more than six random characters, and
replace trailing `X` characters in `prefix` with random characters.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use.

```mjs
import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

try {
  await mkdtemp(join(tmpdir(), 'foo-'));
} catch (err) {
  console.error(err);
}
```

The `fsPromises.mkdtemp()` method will append the six randomly selected
characters directly to the `prefix` string. For instance, given a directory
`/tmp`, if the intention is to create a temporary directory _within_ `/tmp`, the
`prefix` must end with a trailing platform-specific path separator
(`require('node:path').sep`).
