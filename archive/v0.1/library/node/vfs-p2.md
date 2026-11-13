---
title: "Virtual File System (part 2 of 2)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/vfs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Virtual File System (part 2 of 2)

## Module loader integration

Once a `VirtualFileSystem` is mounted, paths under the mount point
participate in module resolution and loading. The CommonJS
resolution algorithm used by `require()` and
`require.resolve()` and the ES modules resolution algorithm
used by `import` and `import.meta.resolve()` are unchanged;
instead, every file system operation those algorithms perform is
dispatched on the path being probed: paths under a mount point are
served by the owning VFS, and all other paths are served by the real
file system. Files served from the VFS therefore behave as
first-class modules.

Because mounted paths live in a reserved namespace that cannot exist
on disk, any given path is served either by exactly one VFS or by
the real file system, never both. There is no search order or
fallback between the two: if a path under a mount point does not
exist in the VFS, resolution fails with `ENOENT` without consulting
the disk, and a mounted layer never shadows a real directory.

For resolution purposes the mount point behaves as a file system
root: `package.json` scope lookups and loading from `node_modules`
folders stop at the mount point. For example, when
`${mountPoint}/foo/bar/main.cjs` calls `require('baz')`, the lookup
goes through:

* `${mountPoint}/foo/bar/node_modules/baz`
* `${mountPoint}/foo/node_modules/baz`
* `${mountPoint}/node_modules/baz`
* If `$NODE_PATH` is set, the folders listed in `$NODE_PATH`
* `$HOME/.node_modules/baz`
* `$HOME/.node_libraries/baz`
* `$PREFIX/lib/node/baz`

The last four entries are the global folders, which are legacy
CommonJS behavior and do not apply to `import`. Absolute specifiers
may cross the boundary in either direction: a module on the real
file system can `require()` a mounted path, and a virtual module can
`require()` a real one.

```cjs
const vfs = require('node:vfs');

const myVfs = vfs.create();
myVfs.mkdirSync('/lib');
myVfs.writeFileSync('/lib/greet.js', 'module.exports = () => "hi";');
myVfs.writeFileSync(
  '/lib/package.json', '{"main": "./greet.js"}');
const mountPoint = myVfs.mount();

const greet = require(`${mountPoint}/lib`);
console.log(greet()); // 'hi'

myVfs.unmount();
```

For ECMAScript modules, use `file:` URLs when passing mounted paths
to dynamic `import()`. `vfs.mountPointURL` provides the mount
point in that form; this keeps VFS imports portable on Windows,
where mounted paths use Windows path syntax.

```mjs
import vfs from 'node:vfs';

const myVfs = vfs.create();
myVfs.writeFileSync('/mod.mjs', 'export const value = 42;');
myVfs.mount();

const { value } = await import(`${myVfs.mountPointURL}/mod.mjs`);
console.log(value); // 42

myVfs.unmount();
```

CommonJS modules loaded from a mounted VFS are identified by their VFS paths
that start with the mount point. This is reflected in, for example, `__filename` and
`__dirname` in the module, or the errors stack traces involving functions from
the VFS modules. ES modules in the VFS are similarly identified by the `file:` URL of
their VFS paths and this is reflected in e.g. `import.meta.url`.

Like modules loaded from the real file system, modules loaded from the VFS are
cached on the first load. When `require()` or `import()` is used to load an absolute
path or URL that falls under the mounted VFS multiple times, the module is only loaded
once and subsequent calls return the same instance.

Calling `vfs.unmount()` invalidates the modules that were loaded
from the mount point: a subsequent `require()` or `import` of a path
under a re-created mount re-reads the file from the newly mounted
VFS rather than returning a stale module. Modules loaded from other
VFS instances or from the real file system are unaffected.

Mounting and unmounting do not stop any module execution that is
already started, or invalidate any objects materialized from VFS
modules that are already executed. As with modules in the real file
system, the callers are responsible for avoiding removal or
invalidation of modules in the virtual file system while they are
being loaded.

Native addons (`.node` files) stored in a mounted VFS can be `require()`d as
well. The operating system's dynamic loader cannot open a virtual path, so the
addon's bytes are read from the VFS and loaded from a private, self-cleaning
temporary image instead. Addons on the real file system are unaffected and
load directly.

Shared libraries opened through `ffi.dlopen()` (or
`new ffi.DynamicLibrary()`) work the same way: a library path inside a
mounted VFS is detected, its bytes are read from the VFS, and the library is
loaded from a private, self-cleaning image while `library.path` keeps
reporting the virtual path. Libraries on the real file system load directly.

## Use with Single Executable Applications

When running as a Single Executable Application built with
`"useVfs": true` in the SEA configuration, the bundled assets are
automatically mounted as a read-only virtual file system and the injected
main script is executed from the root of the mount. No additional setup is
required. Since the mount point is reserved and chosen at runtime, bundled
code accesses the assets through `__dirname`-relative paths and relative
`require()` calls rather than through a fixed path:

```cjs
// In the SEA main script, __dirname is the root of the mounted assets.
const fs = require('node:fs');
const path = require('node:path');

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const template = fs.readFileSync(
  path.join(__dirname, 'templates/index.html'), 'utf8');
```

ESM entry points (`"mainFormat": "module"`) are supported: the main module
is loaded from inside the mount through the ESM loader, and
`import.meta.dirname` points at the mount root.

`"useVfs"` cannot be used together with `"useSnapshot"` or `"useCodeCache"`.
The SEA configuration parser will error if either combination is detected.

Instead of listing individual `"assets"`, the SEA configuration can point
`"vfsArchive"` at a prebuilt ZIP archive; the mount is then backed by a
`ZipProvider` over the embedded archive, and each file is inflated when
it is read. See Serving the assets from a ZIP archive for details.

See the Single Executable Application documentation for more information
on creating SEA builds with assets.

## Class: `VirtualProvider`

The base class for all VFS providers. Subclasses implement the essential
primitives (such as `open`, `stat`, `readdir`, `mkdir`, `rmdir`, `unlink`,
`rename`, etc.) and inherit default implementations of the derived
methods (such as `readFile`, `writeFile`, `exists`, `copyFile`, `access`, etc.).

### Capability flags

* `provider.readonly` {boolean} **Default:** `false`.
* `provider.supportsSymlinks` {boolean} **Default:** `false`.
* `provider.supportsWatch` {boolean} **Default:** `false`.

### Creating custom providers

```cjs
const { VirtualProvider } = require('node:vfs');

class StaticProvider extends VirtualProvider {
  get readonly() { return true; }

  statSync(path) { /* ... */ }
  openSync(path, flags) { /* ... */ }
  readdirSync(path, options) { /* ... */ }
  // ...
}
```

The base class throws `ERR_METHOD_NOT_IMPLEMENTED` for any primitive
that has not been overridden, and rejects writes from a `readonly`
provider with `EROFS`.

## Class: `MemoryProvider`

The default in-memory provider. Stores files, directories, and symbolic
links in a `Map`-backed tree, supports symlinks (`supportsSymlinks ===
true`), and supports watching (`supportsWatch === true`).

### `memoryProvider.setReadOnly()`

Locks the provider into read-only mode. Subsequent writes through any
`VirtualFileSystem` using this provider throw `EROFS`. There is no
way to revert the provider to writable.

```cjs
const vfs = require('node:vfs');

const provider = new vfs.MemoryProvider();
const myVfs = vfs.create(provider);
myVfs.writeFileSync('/seed.txt', 'initial');

provider.setReadOnly();

myVfs.writeFileSync('/x.txt', 'fail'); // throws EROFS
```

## Class: `ComposableProvider`

`ComposableProvider` combines one or more providers in priority order. The first
provider is the writable layer; reads search from first to last. Directories
are merged, with entries in higher-priority layers shadowing entries with the
same name in lower layers. Writes to a lower file copy it to the first provider
before changing it. Removing a file hides lower copies without deleting them.
The first provider must be writable to change the composed file system.

### `new ComposableProvider(providers)`

* `providers` {VirtualProvider\[]} Non-empty array of providers, ordered from
  highest to lowest priority.

```cjs
const vfs = require('node:vfs');

const memory = new vfs.MemoryProvider();
const disk = new vfs.RealFSProvider('/tmp/vfs-root');
const combined = vfs.create(new vfs.ComposableProvider([memory, disk]));
combined.writeFileSync('/config.json', '{"debug":true}');
// The file in memory shadows /tmp/vfs-root/config.json.
```

### `composableProvider.providers`

* {VirtualProvider\[]}

A copy of the ordered provider list. Changes to this array do not affect the
composition. File handles opened before a write continue to refer to the layer
on which they were opened. Watching a path watches only its currently selected
provider, not changes across the entire composition. Symbolic links are
resolved by the provider containing them, not across providers. Traversal
through a symbolic-link directory is not supported by the composition. Renaming
a directory over a directory that exists only in a lower layer is not supported.
Layer selection and copy-up use synchronous provider operations, including
when invoked through the asynchronous VFS API.

## Class: `RealFSProvider`

A provider that wraps a directory (i.e. one on the actual file system) and
exposes its contents through the VFS API. All VFS paths are resolved relative to
the root and verified to stay inside it; symbolic links resolving outside the
root are rejected. This path mapping is not a sandbox or access-control
mechanism.

### `new RealFSProvider(rootPath)`

* `rootPath` {string} The absolute file-system path to use as the root.
  Must be a non-empty string.

```cjs
const vfs = require('node:vfs');

const realVfs = vfs.create(new vfs.RealFSProvider('/tmp/vfs-root'));
realVfs.writeFileSync('/file.txt', 'hello'); // writes /tmp/vfs-root/file.txt
```

### `realFSProvider.rootPath`

* {string}

The resolved absolute path used as the root.

## Class: `ZipProvider`

A provider that exposes the entries of a ZIP archive - either a
`zlib.ZipBuffer` (in memory) or a `zlib.ZipFile` (on disk) - through
the VFS API. `provider.readonly` reflects the archive's own
`zipFile.writable` flag: a `ZipBuffer` is always writable, and a
`ZipFile` is writable only when opened with `{ writable: true }`.

Directories are recognized both explicitly (an entry whose name ends in `/`)
and implicitly (any entry name starting with `"<dir>/"`), and are listed by
`readdir()`, including with `{ recursive: true }`, either way. Because a ZIP
member cannot be edited or read in place - only fully written or fully
decompressed - a file opened for writing only commits its content (as a new
archive entry) when the handle is closed.

Every method has a synchronous counterpart (`openSync()`, `statSync()`,
`readdirSync()`, and so on), backed by the equally complete synchronous
surface `zlib.ZipBuffer`/`zlib.ZipFile` expose. As with those, the
synchronous methods here block the Node.js event loop and further JavaScript
execution until the operation - including any deflate/inflate pass -
completes.

```cjs
const vfs = require('node:vfs');
const zlib = require('node:zlib');
const { readFileSync } = require('node:fs');

async function main() {
  const zip = new zlib.ZipBuffer(readFileSync('archive.zip'));
  const archiveVfs = vfs.create(new vfs.ZipProvider(zip));

  console.log(await archiveVfs.promises.readdir('/'));
  await archiveVfs.promises.writeFile('/new.txt', 'hello');
}
main();
```

### `new ZipProvider(source)`

* `source` {zlib.ZipBuffer|zlib.ZipFile} An already-open archive.

## Implementation details

### `Stats` objects

VFS `Stats` objects are real instances of `fs.Stats` (or
`fs.BigIntStats` when `{ bigint: true }` is requested). Their
fields use synthetic but stable values:

* `dev` is `4085` (the VFS device id).
* `ino` is monotonically increasing per process.
* `blksize` is `4096`.
* `blocks` is `Math.ceil(size / 512)`.
* Times default to the moment the entry was created/last modified.
