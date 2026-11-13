---
title: "File system (part 17 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 17 of 20)

### Class: `fs.Stats`

A {fs.Stats} object provides information about a file.

Objects returned from `fs.stat()`, `fs.lstat()`, `fs.fstat()`, and
their synchronous counterparts are of this type.
If `bigint` in the `options` passed to those methods is true, the numeric values
will be `bigint` instead of `number`, and the object will contain additional
nanosecond-precision properties suffixed with `Ns`.
`Stat` objects are not to be created directly using the `new` keyword.

```console
Stats {
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atimeMs: 1318289051000.1,
  mtimeMs: 1318289051000.1,
  ctimeMs: 1318289051000.1,
  birthtimeMs: 1318289051000.1,

  // Instances of Date
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT,

  // Instances of Temporal.Instant
  atimeInstant: 2011-10-10T23:24:11.0001Z,
  mtimeInstant: 2011-10-10T23:24:11.0001Z,
  ctimeInstant: 2011-10-10T23:24:11.0001Z,
  birthtimeInstant: 2011-10-10T23:24:11.0001Z
}
```

`bigint` version:

```console
BigIntStats {
  dev: 2114n,
  ino: 48064969n,
  mode: 33188n,
  nlink: 1n,
  uid: 85n,
  gid: 100n,
  rdev: 0n,
  size: 527n,
  blksize: 4096n,
  blocks: 8n,
  atimeMs: 1318289051000n,
  mtimeMs: 1318289051000n,
  ctimeMs: 1318289051000n,
  birthtimeMs: 1318289051000n,
  atimeNs: 1318289051000000000n,
  mtimeNs: 1318289051000000000n,
  ctimeNs: 1318289051000000000n,
  birthtimeNs: 1318289051000000000n,

  // Instances of Date
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT,

  // Instances of Temporal.Instant
  atimeInstant: 2011-10-10T23:24:11Z,
  mtimeInstant: 2011-10-10T23:24:11Z,
  ctimeInstant: 2011-10-10T23:24:11Z,
  birthtimeInstant: 2011-10-10T23:24:11Z
}
```

#### `stats.isBlockDevice()`

* Returns: {boolean}

Returns `true` if the {fs.Stats} object describes a block device.

#### `stats.isCharacterDevice()`

* Returns: {boolean}

Returns `true` if the {fs.Stats} object describes a character device.

#### `stats.isDirectory()`

* Returns: {boolean}

Returns `true` if the {fs.Stats} object describes a file system directory.

If the {fs.Stats} object was obtained from calling `fs.lstat()` on a
symbolic link which resolves to a directory, this method will return `false`.
This is because `fs.lstat()` returns information
about a symbolic link itself and not the path it resolves to.

#### `stats.isFIFO()`

* Returns: {boolean}

Returns `true` if the {fs.Stats} object describes a first-in-first-out (FIFO)
pipe.

#### `stats.isFile()`

* Returns: {boolean}

Returns `true` if the {fs.Stats} object describes a regular file.

#### `stats.isSocket()`

* Returns: {boolean}

Returns `true` if the {fs.Stats} object describes a socket.

#### `stats.isSymbolicLink()`

* Returns: {boolean}

Returns `true` if the {fs.Stats} object describes a symbolic link.

This method is only valid when using `fs.lstat()`.

#### `stats.dev`

* Type: {number|bigint}

The numeric identifier of the device containing the file.

#### `stats.ino`

* Type: {number|bigint}

The file system specific "Inode" number for the file.

#### `stats.mode`

* Type: {number|bigint}

A bit-field describing the file type and mode.

#### `stats.nlink`

* Type: {number|bigint}

The number of hard-links that exist for the file.

#### `stats.uid`

* Type: {number|bigint}

The numeric user identifier of the user that owns the file (POSIX).

#### `stats.gid`

* Type: {number|bigint}

The numeric group identifier of the group that owns the file (POSIX).

#### `stats.rdev`

* Type: {number|bigint}

A numeric device identifier if the file represents a device.

#### `stats.size`

* Type: {number|bigint}

The size of the file in bytes.

If the underlying file system does not support getting the size of the file,
this will be `0`.

#### `stats.blksize`

* Type: {number|bigint}

The file system block size for i/o operations.

#### `stats.blocks`

* Type: {number|bigint}

The number of blocks allocated for this file.

#### `stats.atimeMs`

* Type: {number|bigint}

The timestamp indicating the last time this file was accessed expressed in
milliseconds since the POSIX Epoch.

#### `stats.mtimeMs`

* Type: {number|bigint}

The timestamp indicating the last time this file was modified expressed in
milliseconds since the POSIX Epoch.

#### `stats.ctimeMs`

* Type: {number|bigint}

The timestamp indicating the last time the file status was changed expressed
in milliseconds since the POSIX Epoch.

#### `stats.birthtimeMs`

* Type: {number|bigint}

The timestamp indicating the creation time of this file expressed in
milliseconds since the POSIX Epoch.

#### `stats.atimeNs`

* Type: {bigint}

Only present when `bigint: true` is passed into the method that generates
the object.
The timestamp indicating the last time this file was accessed expressed in
nanoseconds since the POSIX Epoch.

#### `stats.mtimeNs`

* Type: {bigint}

Only present when `bigint: true` is passed into the method that generates
the object.
The timestamp indicating the last time this file was modified expressed in
nanoseconds since the POSIX Epoch.

#### `stats.ctimeNs`

* Type: {bigint}

Only present when `bigint: true` is passed into the method that generates
the object.
The timestamp indicating the last time the file status was changed expressed
in nanoseconds since the POSIX Epoch.

#### `stats.birthtimeNs`

* Type: {bigint}

Only present when `bigint: true` is passed into the method that generates
the object.
The timestamp indicating the creation time of this file expressed in
nanoseconds since the POSIX Epoch.

#### `stats.atime`

* Type: {Date}

The timestamp indicating the last time this file was accessed.

#### `stats.mtime`

* Type: {Date}

The timestamp indicating the last time this file was modified.

#### `stats.ctime`

* Type: {Date}

The timestamp indicating the last time the file status was changed.

#### `stats.birthtime`

* Type: {Date}

The timestamp indicating the creation time of this file.

#### Stat time values

The `atimeMs`, `mtimeMs`, `ctimeMs`, `birthtimeMs` properties are
numeric values that hold the corresponding times in milliseconds. Their
precision is platform specific. When `bigint: true` is passed into the
method that generates the object, the properties will be bigints,
otherwise they will be numbers.

The `atimeNs`, `mtimeNs`, `ctimeNs`, `birthtimeNs` properties are
bigints that hold the corresponding times in nanoseconds. They are
only present when `bigint: true` is passed into the method that generates
the object. Their precision is platform specific.

`atime`, `mtime`, `ctime`, and `birthtime` are
`Date` object alternate representations of the various times. The
`Date` and number values are not connected. Assigning a new number value, or
mutating the `Date` value, will not be reflected in the corresponding alternate
representation.

The times in the stat object have the following semantics:

* `atime` "Access Time": Time when file data last accessed. Changed
  by the mknod(2), utimes(2), and read(2) system calls.
* `mtime` "Modified Time": Time when file data last modified.
  Changed by the mknod(2), utimes(2), and write(2) system calls.
* `ctime` "Change Time": Time when file status was last changed
  (inode data modification). Changed by the chmod(2), chown(2),
  link(2), mknod(2), rename(2), unlink(2), utimes(2),
  read(2), and write(2) system calls.
* `birthtime` "Birth Time": Time of file creation. Set once when the
  file is created. On file systems where birthtime is not available,
  this field may instead hold either the `ctime` or
  `1970-01-01T00:00Z` (ie, Unix epoch timestamp `0`). This value may be greater
  than `atime` or `mtime` in this case. On Darwin and other FreeBSD variants,
  also set if the `atime` is explicitly set to an earlier value than the current
  `birthtime` using the utimes(2) system call.

Prior to Node.js 0.12, the `ctime` held the `birthtime` on Windows systems. As
of 0.12, `ctime` is not "creation time", and on Unix systems, it never was.

### Class: `fs.StatFs`

Provides information about a mounted file system.

Objects returned from `fs.statfs()` and its synchronous counterpart are of
this type. If `bigint` in the `options` passed to those methods is `true`, the
numeric values will be `bigint` instead of `number`.

```console
StatFs {
  type: 1397114950,
  bsize: 4096,
  frsize: 4096,
  blocks: 121938943,
  bfree: 61058895,
  bavail: 61058895,
  files: 999,
  ffree: 1000000
}
```

`bigint` version:

```console
StatFs {
  type: 1397114950n,
  bsize: 4096n,
  frsize: 4096n,
  blocks: 121938943n,
  bfree: 61058895n,
  bavail: 61058895n,
  files: 999n,
  ffree: 1000000n
}
```

#### `statfs.bavail`

* Type: {number|bigint}

Free blocks available to unprivileged users. Multiply by `statfs.bsize`
to get the number of available bytes.

```mjs
import { statfs } from 'node:fs/promises';

const stats = await statfs('/');
const availableBytes = stats.bsize * stats.bavail;
console.log(`Available space: ${availableBytes} bytes`);
```

```cjs
const { statfs } = require('node:fs/promises');

(async () => {
  const stats = await statfs('/');
  const availableBytes = stats.bsize * stats.bavail;
  console.log(`Available space: ${availableBytes} bytes`);
})();
```

#### `statfs.bfree`

* Type: {number|bigint}

Free blocks in file system. Multiply by `statfs.bsize` to get the number
of free bytes.

```mjs
import { statfs } from 'node:fs/promises';

const stats = await statfs('/');
const freeBytes = stats.bsize * stats.bfree;
console.log(`Free space: ${freeBytes} bytes`);
```

```cjs
const { statfs } = require('node:fs/promises');

(async () => {
  const stats = await statfs('/');
  const freeBytes = stats.bsize * stats.bfree;
  console.log(`Free space: ${freeBytes} bytes`);
})();
```

#### `statfs.blocks`

* Type: {number|bigint}

Total data blocks in file system. Multiply by `statfs.bsize` to get the
total size in bytes.

```mjs
import { statfs } from 'node:fs/promises';

const stats = await statfs('/');
const totalBytes = stats.bsize * stats.blocks;
console.log(`Total space: ${totalBytes} bytes`);
```

```cjs
const { statfs } = require('node:fs/promises');

(async () => {
  const stats = await statfs('/');
  const totalBytes = stats.bsize * stats.blocks;
  console.log(`Total space: ${totalBytes} bytes`);
})();
```

#### `statfs.bsize`

* Type: {number|bigint}

Optimal transfer block size in bytes.

#### `statfs.frsize`

* Type: {number|bigint}

Fundamental file system block size.

#### `statfs.ffree`

* Type: {number|bigint}

Free file nodes in file system.

#### `statfs.files`

* Type: {number|bigint}

Total file nodes in file system.

#### `statfs.type`

* Type: {number|bigint}

Type of file system. A platform-specific numeric identifier for the type of
file system. This value corresponds to the `f_type` field returned by
`statfs(2)` on POSIX systems (for example, `0xEF53` for ext4 on Linux). Its
meaning is OS-dependent and is not guaranteed to be consistent across
platforms.
