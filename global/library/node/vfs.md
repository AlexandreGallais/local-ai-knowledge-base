---
title: "Virtual File System (part 1 of 2)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/vfs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Virtual File System

> Stability: 1 - Experimental

The `node:vfs` module provides a virtual file system with a `node:fs`-like API.
It is useful for tests, fixtures, embedded assets, and other scenarios where you
need a self-contained file system without touching the actual file-system.

To access it:

```mjs
import vfs from 'node:vfs';
```

```cjs
const vfs = require('node:vfs');
```

This module is only available under the `node:` scheme, and only when Node.js
is started with the `--experimental-vfs` flag.

## Security

The VFS API is not a sandbox, permission system, or access-control mechanism.
It does not isolate untrusted code from the host file system or from other
Node.js capabilities. Code that can access a `VirtualFileSystem` instance,
mount it, select its provider, or pass paths to it is trusted application code.

Mounting a VFS only redirects supported `node:fs` calls whose resolved paths
are under the mount point. It does not prevent code from using other paths or
other Node.js APIs to access resources available to the process.
`RealFSProvider` maps VFS paths under its configured root and rejects paths
that resolve outside that root, but that check is not a security boundary.
`ZipProvider` has no real file-system paths of its own to escape; its
entries only ever exist within the archive's own namespace. Do not rely on VFS
to run untrusted code; use operating-system-level isolation, such as separate
users, containers, or platform sandboxes, when a security boundary is
required.

## Basic usage

```cjs
const vfs = require('node:vfs');

const myVfs = vfs.create();
myVfs.mkdirSync('/dir', { recursive: true });
myVfs.writeFileSync('/dir/hello.txt', 'Hello, VFS!');

console.log(myVfs.readFileSync('/dir/hello.txt', 'utf8')); // 'Hello, VFS!'
```

`vfs.create()` returns a `VirtualFileSystem` instance backed by a
`MemoryProvider` by default. The instance exposes synchronous,
callback-based, and promise-based file system methods that mirror the
shape of the `node:fs` API. All paths are POSIX-style and absolute
(starting with `/`).

By default, the file tree is private to the VFS instance. To expose
it through the global `node:fs` module, `require()`, and `import`,
call `vfs.mount()`; call `vfs.unmount()` (or rely on a
`using` declaration) to detach again.

## `vfs.create(provider)`

* `provider` {VirtualProvider} The provider to use. **Default:**
  `new MemoryProvider()`.
* `options` {Object}
  * `emitExperimentalWarning` {boolean} Whether to emit the experimental
    warning when the instance is created. **Default:** `true`.
* Returns: {VirtualFileSystem}

Convenience factory equivalent to `new VirtualFileSystem(provider, options)`.

```cjs
const vfs = require('node:vfs');

// Default in-memory provider
const memoryVfs = vfs.create();

// Explicit provider
const realVfs = vfs.create(new vfs.RealFSProvider('/tmp/vfs-root'));
```

## `vfs.registerProvider(entry)`

* `entry` {Object}
  * `name` {string} A short identifier, used in diagnostics.
  * `canHandle` {Function} Called with the resolved path and its
    `fs.Stats`. Returns `true` if this provider should back the source.
  * `create` {Function} Called with the resolved path and its `fs.Stats`.
    Returns the {VirtualProvider} backing the source.

Registers a provider that `--vfs-load` can select for a source it
recognizes, so a file format Node.js has no built-in provider for can still be
mounted.

A source is claimed by the first provider whose `canHandle()` returns `true`.
Registered providers are consulted before the built-in ones, newest
registration first, and are offered directories as well as files, so a
registered provider can back, wrap, or vet any source. If none claims the
source, the built-in providers handle it: a directory with
`RealFSProvider`, and a file whose bytes are a ZIP archive with
`ZipProvider`.

Providers must be registered before the source is mounted. Register from a
module preloaded with `--require` or `--import`:

```cjs
// provider.js, preloaded with --require
const fs = require('node:fs');
const vfs = require('node:vfs');

const MAGIC = Buffer.from('CUSTOMFMT');

vfs.registerProvider({
  name: 'customfmt',
  canHandle(path, stats) {
    if (!stats.isFile()) return false;
    const head = Buffer.alloc(MAGIC.length);
    const fd = fs.openSync(path, 'r');
    try {
      fs.readSync(fd, head, 0, MAGIC.length, 0);
    } finally {
      fs.closeSync(fd);
    }
    return head.equals(MAGIC);
  },
  create(path) {
    return new MyCustomProvider(path);
  },
});
```

```console
$ node --experimental-vfs --require ./provider.js \
       --vfs-load archive.customfmt
```

## `vfs.vfsBase()`

* Returns: {string} The absolute path of the reserved root directory.

Returns the directory that holds the mount points of every mounted virtual file
system, which is `path.join(os.devNull, 'vfs')`. Reading it lists what is
mounted; see The reserved root directory.

```cjs
const vfs = require('node:vfs');
const fs = require('node:fs');

const myVfs = vfs.create();
const mountPoint = myVfs.mount();

fs.readdirSync(vfs.vfsBase()); // The name of every mount point in it
mountPoint.startsWith(vfs.vfsBase()); // true
```

## Class: `VirtualFileSystem`

A `VirtualFileSystem` wraps a `VirtualProvider` and exposes a
`node:fs`-like API. Each instance maintains its own file tree.

### `new VirtualFileSystem(provider)`

* `provider` {VirtualProvider} The provider to use. **Default:**
  `new MemoryProvider()`.
* `options` {Object}
  * `emitExperimentalWarning` {boolean} Whether to emit the experimental
    warning. **Default:** `true`.

### `vfs.mount()`

* Returns: {string} The absolute mount point.

Mounts the virtual file system and returns the resulting mount point.
After mounting, files in the VFS can be accessed through the
`node:fs` module and resolved through `require()` and `import`
using paths under the returned mount point.

Mount points always live inside a reserved namespace that cannot have child file system entries,
so virtual paths never conflate with (or shadow) real paths. A mount point is obtained from what
`vfs.mount()` returns or from `vfs.mountPoint`, and the mount points of all mounted file
systems can be listed by reading the reserved root directory, whose path `vfs.vfsBase()`
returns. The name of a mount point within that directory is assigned at runtime, so it is not
something to construct or hard-code.

```cjs
const vfs = require('node:vfs');
const fs = require('node:fs');

const myVfs = vfs.create();
myVfs.writeFileSync('/data.txt', 'Hello');
const mountPoint = myVfs.mount();
// e.g. '/dev/null/vfs/0'

fs.readFileSync(`${mountPoint}/data.txt`, 'utf8'); // 'Hello'
```

Like any mount point, the mount point cannot be removed or renamed, nor
replaced by renaming something else onto it: `fs.rmdir()` and
`fs.rename()` fail with `EBUSY`. A recursive `fs.rm()` of the mount
point empties the file system before failing the same way.

Each `VirtualFileSystem` instance may be mounted at most once at a
time. Attempting to mount an already-mounted instance throws
`ERR_INVALID_STATE`. Because each instance mounts inside its own
per-layer namespace, mounts from different instances can never
overlap.

The VFS supports the Explicit Resource Management proposal. Use
a `using` declaration to unmount automatically when leaving scope:

```cjs
const vfs = require('node:vfs');
const fs = require('node:fs');

let mountPoint;
{
  using myVfs = vfs.create();
  myVfs.writeFileSync('/data.txt', 'Hello');
  mountPoint = myVfs.mount();

  fs.readFileSync(`${mountPoint}/data.txt`, 'utf8'); // 'Hello'
} // VFS is automatically unmounted here

fs.existsSync(`${mountPoint}/data.txt`); // false
```

### `vfs.unmount()`

Unmounts the virtual file system. After unmounting, virtual files
are no longer reachable through `node:fs`, `require()`, or `import`.
The same instance may be mounted again by calling `mount()`.

This method is idempotent: calling `unmount()` on a VFS that is not
currently mounted has no effect.

### `vfs.mounted`

* {boolean}

`true` while the VFS is mounted; `false` otherwise.

### `vfs.mountPoint`

* {string | null}

The current mount point as an absolute string (the value returned by
the last `vfs.mount()` call), or `null` when the VFS is not
mounted.

### `vfs.mountPointURL`

* {string | null}

The current mount point as a `file:` URL string (the `vfs.mountPoint`
path converted with `url.pathToFileURL()`), or `null` when the VFS
is not mounted.

This is a convenience for addressing mounted files with URL-based
APIs such as dynamic `import()`:

```mjs
import vfs from 'node:vfs';

const myVfs = vfs.create();
myVfs.writeFileSync('/mod.mjs', 'export const value = 42;');
myVfs.mount();

const { value } = await import(`${myVfs.mountPointURL}/mod.mjs`);
console.log(value); // 42

myVfs.unmount();
```

### `vfs.provider`

* {VirtualProvider}

The provider backing this VFS instance.

### `vfs.readonly`

* {boolean}

`true` when the underlying provider is read-only.

### APIs

`VirtualFileSystem` implements the following methods, with the same
signatures as their `node:fs` counterparts:

#### Synchronous API

* `existsSync(path)`
* `statSync(path[, options])`
* `lstatSync(path[, options])`
* `readFileSync(path[, options])`
* `writeFileSync(path, data[, options])`
* `appendFileSync(path, data[, options])`
* `readdirSync(path[, options])`
* `mkdirSync(path[, options])`
* `rmdirSync(path)`
* `unlinkSync(path)`
* `renameSync(oldPath, newPath)`
* `copyFileSync(src, dest[, mode])`
* `realpathSync(path[, options])`
* `readlinkSync(path[, options])`
* `symlinkSync(target, path[, type])`
* `accessSync(path[, mode])`
* `rmSync(path[, options])`
* `truncateSync(path[, len])`
* `ftruncateSync(fd[, len])`
* `linkSync(existingPath, newPath)`
* `chmodSync(path, mode)`
* `chownSync(path, uid, gid)`
* `lchownSync(path, uid, gid)`
* `utimesSync(path, atime, mtime)`
* `lutimesSync(path, atime, mtime)`
* `mkdtempSync(prefix)`
* `opendirSync(path[, options])`
* `openAsBlob(path[, options])`
* File-descriptor ops: `openSync`, `closeSync`, `readSync`, `writeSync`,
  `fstatSync`
* Streams: `createReadStream`, `createWriteStream`
* Watchers: `watch`, `watchFile`, `unwatchFile`

#### Callback API

`readFile`, `writeFile`, `stat`, `lstat`, `readdir`, `realpath`, `readlink`,
`access`, `open`, `close`, `read`, `write`, `rm`, `fstat`, `truncate`,
`ftruncate`, `link`, `mkdtemp`, `opendir`. Each takes a Node.js-style
callback `(err, ...result) => {}`.

#### Promise API

`vfs.promises` exposes the promise-based variants:

```cjs
const vfs = require('node:vfs');

async function example() {
  const myVfs = vfs.create();
  await myVfs.promises.writeFile('/file.txt', 'hello');
  const data = await myVfs.promises.readFile('/file.txt', 'utf8');
  return data;
}
example();
```

The promise namespace mirrors `fs.promises` and includes `readFile`,
`writeFile`, `appendFile`, `stat`, `lstat`, `readdir`, `mkdir`, `rmdir`,
`unlink`, `rename`, `copyFile`, `realpath`, `readlink`, `symlink`,
`access`, `rm`, `truncate`, `link`, `mkdtemp`, `chmod`, `chown`, `lchown`,
`utimes`, `lutimes`, `open`, `lchmod`, and `watch`.

## The reserved root directory

While any virtual file system is mounted, the directory that holds the mount
points can be read through `node:fs`. `vfs.vfsBase()` returns its path,
`path.join(os.devNull, 'vfs')`. It contains a directory for every mounted file
system, named like the last segment of its `vfs.mountPoint`.

```cjs
const vfs = require('node:vfs');
const fs = require('node:fs');
const path = require('node:path');

const root = vfs.vfsBase();
const assets = vfs.create();
assets.writeFileSync('/logo.svg', '<svg/>');
const mountPoint = assets.mount();

const name = path.basename(mountPoint);
fs.readdirSync(root); // [ name ]
fs.readdirSync(root, { recursive: true }); // [ name, `${name}/logo.svg` ]
```

The root directory itself is read-only. Creating, removing, or changing its
entries fails with `EROFS`, while the file systems its entries lead to can be
written to as usual. When nothing is mounted, the root directory does not exist.
