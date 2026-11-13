---
title: "Single executable applications (part 2 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/single-executable-applications.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Single executable applications (part 2 of 3)

## Generating single executable applications with `--build-sea`

To generate a single executable application directly, the `--build-sea` flag can be
used. It takes a path to a configuration file in JSON format. If the path passed to it
isn't absolute, Node.js will use the path relative to the current working directory.

The configuration currently reads the following top-level fields:

```json
{
  "main": "/path/to/bundled/script.js",
  "mainFormat": "commonjs", // Default: "commonjs", options: "commonjs", "module"
  "executable": "/path/to/node/binary", // Optional, if not specified, uses the current Node.js binary
  "output": "/path/to/write/the/generated/executable",
  "disableExperimentalSEAWarning": true, // Default: false
  "useSnapshot": false,  // Default: false
  "useCodeCache": true, // Default: false
  "useVfs": true, // Default: false
  "vfsArchive": "/path/to/assets.zip", // Optional
  "execArgv": ["--no-warnings", "--max-old-space-size=4096"], // Optional
  "execArgvExtension": "env", // Default: "env", options: "none", "env", "cli"
  "assets": {  // Optional
    "a.dat": "/path/to/a.dat",
    "b.txt": "/path/to/b.txt"
  }
}
```

If the paths are not absolute, Node.js will use the path relative to the
current working directory. The version of the Node.js binary used to produce
the blob must be the same as the one to which the blob will be injected.

Note: When generating cross-platform SEAs (e.g., generating a SEA
for `linux-x64` on `darwin-arm64`), `useCodeCache` and `useSnapshot`
must be set to false to avoid generating incompatible executables.
Since code cache and snapshots can only be loaded on the same platform
where they are compiled, the generated executable might crash on startup when
trying to load code cache or snapshots built on a different platform.

### Assets

Users can include assets by adding a key-path dictionary to the configuration
as the `assets` field. At build time, Node.js would read the assets from the
specified paths and bundle them into the preparation blob. In the generated
executable, users can retrieve the assets using the `sea.getAsset()` and
`sea.getAssetAsBlob()` APIs.

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/executable",
  "assets": {
    "a.jpg": "/path/to/a.jpg",
    "b.txt": "/path/to/b.txt"
  }
}
```

The single-executable application can access the assets as follows:

```cjs
const { getAsset, getAssetAsBlob, getRawAsset, getAssetKeys } = require('node:sea');
// Get all asset keys.
const keys = getAssetKeys();
console.log(keys); // ['a.jpg', 'b.txt']
// Returns a copy of the data in an ArrayBuffer.
const image = getAsset('a.jpg');
// Returns a string decoded from the asset as UTF8.
const text = getAsset('b.txt', 'utf8');
// Returns a Blob containing the asset.
const blob = getAssetAsBlob('a.jpg');
// Returns an ArrayBuffer containing the raw asset without copying.
const raw = getRawAsset('a.jpg');
```

See documentation of the `sea.getAsset()`, `sea.getAssetAsBlob()`,
`sea.getRawAsset()` and `sea.getAssetKeys()` APIs for more information.

### Virtual file system (VFS) for assets

> Stability: 1.0 - Early development

In addition to using the `node:sea` API to access individual assets, the
bundled assets can be exposed as a read-only virtual file system and
accessed through standard `node:fs` APIs. To enable this, set
`"useVfs": true` in the SEA configuration.

A virtual file system never shadows the real file system: it is mounted at a
reserved mount point that cannot exist on the real file system, and the mount
point is chosen at runtime rather than being a fixed path. When `useVfs` is
enabled, the injected main script itself is placed at the root of the mount
and executed from there, so `__filename` and `__dirname` point inside the
virtual file system instead of reflecting `process.execPath`. Bundled
code therefore reaches the assets through `__dirname`-relative paths and
relative `require()` calls, without having to know the mount point:

```cjs
const fs = require('node:fs');
const path = require('node:path');

// __dirname is the root of the virtual file system holding the assets.
const rawConfig = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8');
const data = fs.readFileSync(path.join(__dirname, 'data/file.txt'));

// Directory operations work too.
const files = fs.readdirSync(path.join(__dirname, 'assets'));

// Check if a bundled file exists.
if (fs.existsSync(path.join(__dirname, 'optional.json'))) {
  // ...
}
```

The VFS supports the `node:fs` operations for reading files and directories.
Since the SEA VFS is read-only, write operations fail with `EROFS`. See the
VFS documentation for the full list of supported operations.

#### Loading modules from the VFS in a SEA

When `useVfs` is enabled, the main script is executed from inside the
virtual file system, and `require()` uses the module loader
integration of the VFS to load modules from the bundled assets. This
supports relative requires (e.g. `require('./helper.js')`) as well as
`node_modules` package lookups, which are confined to the mount:

```cjs
// Require bundled modules using relative paths.
const myModule = require('./lib/mymodule.js');

// Packages bundled under the node_modules asset prefix also resolve.
const dep = require('some-package');
```

#### ESM entry points

`"useVfs": true` also supports `"mainFormat": "module"`. The ESM main
script is loaded from inside the mount through the ESM loader, so
`import.meta.url`, `import.meta.filename`, and `import.meta.dirname`
reflect the location of the main script in the virtual file system, and
static and dynamic imports resolve against the bundled assets:

```mjs
import fs from 'node:fs';
import path from 'node:path';

// import.meta.dirname is the root of the virtual file system.
const data = fs.readFileSync(
  path.join(import.meta.dirname, 'data/file.txt'));

// Relative and bare specifier imports resolve inside the mount.
import myModule from './lib/mymodule.mjs';
const lazy = await import('./lib/lazy.mjs');
```

Module format detection works the same way as on the real file
system: name bundled ES modules with the `.mjs` extension (or provide the
relevant `package.json` files as assets) so they are interpreted as ESM.

#### Serving the assets from a ZIP archive with `"vfsArchive"`

Instead of listing individual `"assets"`, the configuration can point
`"vfsArchive"` at a prebuilt ZIP archive. The archive is embedded into the
executable as-is, and the virtual file system serves the files inside it,
inflating each one when it is read. When the assets are compressible (such
as JavaScript, JSON, or other text), a deflate-compressed archive can
substantially reduce the size of the generated executable.

The archive can be built with any ZIP tool, or with the ZIP support in
`node:zlib`:

```mjs
import { zipFiles } from 'node:zlib';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

await pipeline(
  zipFiles([
    ['./dist/config.json', 'config.json'],
    ['./dist/data.txt', 'data/data.txt'],
  ]),
  createWriteStream('assets.zip'),
);
```

The mounted file tree looks the same as with `"assets"`: the entries appear
under the mount point using their archive names, the main script is placed
at the mount point root, and access through `__dirname`-relative paths,
`require()`, and `import` is unchanged. However, `sea.getAsset()` and
`sea.getAssetAsBlob()` do not serve the individual files, because the
executable only embeds the archive; read the files through the file system
APIs instead. `"vfsArchive"` requires `"useVfs": true` and cannot be
combined with `"assets"`.

#### Snapshot and code caching limitations

`"useVfs": true` cannot be used together with `"useSnapshot": true` or
`"useCodeCache": true`. The code cache limitation is due to incomplete
implementation, not a technical impossibility. Consider bundling the
application if startup performance matters and do not rely on module loading
from the VFS in that case.

#### Native addon limitations

Native addons (`.node` files) cannot be loaded directly from the VFS because
`process.dlopen()` requires files on the real file system. To use native
addons in a SEA with VFS, write the asset to a temporary file first. See
Using native addons in the injected main script for an example.

### Startup snapshot support

The `useSnapshot` field can be used to enable startup snapshot support. In this
case, the `main` script would not be executed when the final executable is launched.
Instead, it would be run when the single executable application preparation
blob is generated on the building machine. The generated preparation blob would
then include a snapshot capturing the states initialized by the `main` script.
The final executable, with the preparation blob injected, would deserialize
the snapshot at run time.

When `useSnapshot` is true, the main script must invoke the
`v8.startupSnapshot.setDeserializeMainFunction()` API to configure code
that needs to be run when the final executable is launched by the users.

The typical pattern for an application to use snapshot in a single executable
application is:

1. At build time, on the building machine, the main script is run to
   initialize the heap to a state that's ready to take user input. The script
   should also configure a main function with
   `v8.startupSnapshot.setDeserializeMainFunction()`. This function will be
   compiled and serialized into the snapshot, but not invoked at build time.
2. At run time, the main function will be run on top of the deserialized heap
   on the user machine to process user input and generate output.

The general constraints of the startup snapshot scripts also apply to the main
script when it's used to build snapshot for the single executable application,
and the main script can use the `v8.startupSnapshot` API to adapt to
these constraints. See
documentation about startup snapshot support in Node.js.

### V8 code cache support

When `useCodeCache` is set to `true` in the configuration, during the generation
of the single executable preparation blob, Node.js will compile the `main`
script to generate the V8 code cache. The generated code cache would be part of
the preparation blob and get injected into the final executable. When the single
executable application is launched, instead of compiling the `main` script from
scratch, Node.js would use the code cache to speed up the compilation, then
execute the script, which would improve the startup performance.

### Execution arguments

The `execArgv` field can be used to specify Node.js-specific
arguments that will be automatically applied when the single
executable application starts. This allows application developers
to configure Node.js runtime options without requiring end users
to be aware of these flags.

For example, the following configuration:

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/executable",
  "execArgv": ["--no-warnings", "--max-old-space-size=2048"]
}
```

will instruct the SEA to be launched with the `--no-warnings` and
`--max-old-space-size=2048` flags. In the scripts embedded in the executable, these flags
can be accessed using the `process.execArgv` property:

```js
// If the executable is launched with `sea user-arg1 user-arg2`
console.log(process.execArgv);
// Prints: ['--no-warnings', '--max-old-space-size=2048']
console.log(process.argv);
// Prints ['/path/to/sea', 'path/to/sea', 'user-arg1', 'user-arg2']
```

The user-provided arguments are in the `process.argv` array starting from index 2,
similar to what would happen if the application is started with:

```console
node --no-warnings --max-old-space-size=2048 /path/to/bundled/script.js user-arg1 user-arg2
```

### Execution argument extension

The `execArgvExtension` field controls how additional execution arguments can be
provided beyond those specified in the `execArgv` field. It accepts one of three string values:

* `"none"`: No extension is allowed. Only the arguments specified in `execArgv` will be used,
  and the `NODE_OPTIONS` environment variable will be ignored.
* `"env"`: _(Default)_ The `NODE_OPTIONS` environment variable can extend the execution arguments.
  This is the default behavior to maintain backward compatibility.
* `"cli"`: The executable can be launched with `--node-options="--flag1 --flag2"`, and those flags
  will be parsed as execution arguments for Node.js instead of being passed to the user script.
  This allows using arguments that are not supported by the `NODE_OPTIONS` environment variable.

For example, with `"execArgvExtension": "cli"`:

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/executable",
  "execArgv": ["--no-warnings"],
  "execArgvExtension": "cli"
}
```

The executable can be launched as:

```console
./my-sea --node-options="--trace-exit" user-arg1 user-arg2
```

This would be equivalent to running:

```console
node --no-warnings --trace-exit /path/to/bundled/script.js user-arg1 user-arg2
```
