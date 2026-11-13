---
title: "Single executable applications (part 3 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/single-executable-applications.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Single executable applications (part 3 of 3)

## Single-executable application API

The `node:sea` builtin allows interaction with the single-executable application
from the JavaScript main script embedded into the executable.

### `sea.isSea()`

* Returns: {boolean} Whether this script is running inside a single-executable
  application.

### `sea.getAsset(key[, encoding])`

This method can be used to retrieve the assets configured to be bundled into the
single-executable application at build time.
An error is thrown when no matching asset can be found.

* `key`  {string} the key for the asset in the dictionary specified by the
  `assets` field in the single-executable application configuration.
* `encoding` {string} If specified, the asset will be decoded as
  a string. Any encoding supported by the `TextDecoder` is accepted.
  If unspecified, an `ArrayBuffer` containing a copy of the asset would be
  returned instead.
* Returns: {string|ArrayBuffer}

### `sea.getAssetAsBlob(key[, options])`

Similar to `sea.getAsset()`, but returns the result in a {Blob}.
An error is thrown when no matching asset can be found.

* `key`  {string} the key for the asset in the dictionary specified by the
  `assets` field in the single-executable application configuration.
* `options` {Object}
  * `type` {string} An optional mime type for the blob.
* Returns: {Blob}

### `sea.getRawAsset(key)`

This method can be used to retrieve the assets configured to be bundled into the
single-executable application at build time.
An error is thrown when no matching asset can be found.

Unlike `sea.getAsset()` or `sea.getAssetAsBlob()`, this method does not
return a copy. Instead, it returns the raw asset bundled inside the executable.

For now, users should avoid writing to the returned array buffer. If the
injected section is not marked as writable or not aligned properly,
writes to the returned array buffer is likely to result in a crash.

* `key`  {string} the key for the asset in the dictionary specified by the
  `assets` field in the single-executable application configuration.
* Returns: {ArrayBuffer}

### `sea.getAssetKeys()`

* Returns {string\[]} An array containing all the keys of the assets
  embedded in the executable. If no assets are embedded, returns an empty array.

This method can be used to retrieve an array of all the keys of assets
embedded into the single-executable application.
An error is thrown when not running inside a single-executable application.

## In the injected main script

### Module format of the injected main script

To specify how Node.js should interpret the injected main script, use the
`mainFormat` field in the single-executable application configuration.
The accepted values are:

* `"commonjs"`: The injected main script is treated as a CommonJS module.
* `"module"`: The injected main script is treated as an ECMAScript module.

If the `mainFormat` field is not specified, it defaults to `"commonjs"`.

Currently, `"mainFormat": "module"` cannot be used together with `"useSnapshot"`.

### Module loading in the injected main script

In the injected main script, module loading does not read from the file system.
By default, both `require()` and `import` statements would only be able to load
the built-in modules. Attempting to load a module that can only be found in the
file system will throw an error.

Users can bundle their application into a standalone JavaScript file to inject
into the executable. This also ensures a more deterministic dependency graph.

To load modules from the file system in the injected main script, users can
create a `require` function that can load from the file system using
`module.createRequire()`. For example, in a CommonJS entry point:

```js
const { createRequire } = require('node:module');
require = createRequire(__filename);
```

### `require()` in the injected main script

`require()` in the injected main script is not the same as the `require()`
available to modules that are not injected.
Currently, it does not have any of the properties that non-injected
`require()` has except `require.main`.

### `__filename` and `module.filename` in the injected main script

The values of `__filename` and `module.filename` in the injected main script
are equal to `process.execPath`.

### `__dirname` in the injected main script

The value of `__dirname` in the injected main script is equal to the directory
name of `process.execPath`.

### `import.meta` in the injected main script

When using `"mainFormat": "module"`, `import.meta` is available in the
injected main script with the following properties:

* `import.meta.url`: A `file:` URL corresponding to `process.execPath`.
* `import.meta.filename`: Equal to `process.execPath`.
* `import.meta.dirname`: The directory name of `process.execPath`.
* `import.meta.main`: `true`.

`import.meta.resolve` is currently not supported.

### `import()` in the injected main script

`import()` can be used to dynamically load built-in modules in both
CommonJS and ESM (`"mainFormat": "module"`) single executable applications.
Attempting to use `import()` to load modules from
the file system will throw an error.

### Using native addons in the injected main script

Native addons can be bundled as assets into the single-executable application
by specifying them in the `assets` field of the configuration file used to
generate the single-executable application preparation blob.
The addon can then be loaded in the injected main script by writing the asset
to a temporary file and loading it with `process.dlopen()`.

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/executable",
  "assets": {
    "myaddon.node": "/path/to/myaddon/build/Release/myaddon.node"
  }
}
```

```js
// script.js
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { getRawAsset } = require('node:sea');
const addonPath = path.join(os.tmpdir(), 'myaddon.node');
fs.writeFileSync(addonPath, new Uint8Array(getRawAsset('myaddon.node')));
const myaddon = { exports: {} };
process.dlopen(myaddon, addonPath);
console.log(myaddon.exports);
fs.rmSync(addonPath);
```

Known caveat: if the single-executable application is produced by postject running on a Linux arm64 docker container,
the produced ELF binary does not have the correct hash table to load the addons and
will crash on `process.dlopen()`. Build the single-executable application on other platforms, or at least on
a non-container Linux arm64 environment to work around this issue.

## Notes

### Single executable application creation process

The process documented here is subject to change.

#### 1. Generating single executable preparation blobs

To build a single executable application, Node.js would first generate a blob
that contains all the necessary information to run the bundled script.
When using `--build-sea`, this step is done internally along with the injection.

##### Dumping the preparation blob to disk

Before `--build-sea` was introduced, an older workflow was introduced to write the
preparation blob to disk for injection by external tools. This can still
be used for verification purposes.

To dump the preparation blob to disk for verification, use `--experimental-sea-config`.
This writes a file that can be injected into a Node.js binary using tools like postject.

The configuration is similar to that of `--build-sea`, except that the
`output` field specifies the path to write the generated blob file instead of
the final executable.

```json
{
  "main": "/path/to/bundled/script.js",
  // Instead of the final executable, this is the path to write the blob.
  "output": "/path/to/write/the/generated/blob.blob"
}
```

#### 2. Injecting the preparation blob into the `node` binary

To complete the creation of a single executable application, the generated blob
needs to be injected into a copy of the `node` binary, as documented below.

When using `--build-sea`, this step is done internally along with the blob generation.

* If the `node` binary is a PE file, the blob should be injected as a resource
  named `NODE_SEA_BLOB`.
* If the `node` binary is a Mach-O file, the blob should be injected as a section
  named `NODE_SEA_BLOB` in the `NODE_SEA` segment.
* If the `node` binary is an ELF file, the blob should be injected as a note
  named `NODE_SEA_BLOB`.

Then, the SEA building process searches the binary for the
`NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2:0` fuse string and flip the
last character to `1` to indicate that a resource has been injected.

##### Injecting the preparation blob manually

Before `--build-sea` was introduced, an older workflow was introduced to allow
external tools to inject the generated blob into a copy of the `node` binary.

For example, with postject:

1. Create a copy of the `node` executable and name it according to your needs:

   * On systems other than Windows:

   ```bash
   cp $(command -v node) hello
   ```

   * On Windows:

   ```text
   node -e "require('fs').copyFileSync(process.execPath, 'hello.exe')"
   ```

   The `.exe` extension is necessary.

2. Remove the signature of the binary (macOS and Windows only):

   * On macOS:

   ```bash
   codesign --remove-signature hello
   ```

   * On Windows (optional):

   signtool can be used from the installed Windows SDK. If this step is
   skipped, ignore any signature-related warning from postject.

   ```powershell
   signtool remove /s hello.exe
   ```

3. Inject the blob into the copied binary by running `postject` with
   the following options:

   * `hello` / `hello.exe` - The name of the copy of the `node` executable
     created in step 4.
   * `NODE_SEA_BLOB` - The name of the resource / note / section in the binary
     where the contents of the blob will be stored.
   * `sea-prep.blob` - The name of the blob created in step 1.
   * `--sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2` - The
     fuse used by the Node.js project to detect if a file has been injected.
   * `--macho-segment-name NODE_SEA` (only needed on macOS) - The name of the
     segment in the binary where the contents of the blob will be
     stored.

   To summarize, here is the required command for each platform:

   * On Linux:
     ```bash
     npx postject hello NODE_SEA_BLOB sea-prep.blob \
         --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
     ```

   * On Windows - PowerShell:
     ```powershell
     npx postject hello.exe NODE_SEA_BLOB sea-prep.blob `
         --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
     ```

   * On Windows - Command Prompt:
     ```text
     npx postject hello.exe NODE_SEA_BLOB sea-prep.blob ^
         --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
     ```

   * On macOS:
     ```bash
     npx postject hello NODE_SEA_BLOB sea-prep.blob \
         --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
         --macho-segment-name NODE_SEA
     ```

### Platform support

Single-executable support is tested regularly on CI only on the following
platforms:

* Windows
* macOS (arm64 only; x64 is not currently supported and is skipped in the
  tests)
* Linux (all distributions supported by Node.js except Alpine and all
  architectures supported by Node.js except s390x)

This is due to a lack of better tools to generate single-executables that can be
used to test this feature on other platforms.

Suggestions for other resource injection tools/workflows are welcomed. Please
start a discussion at <https://github.com/nodejs/single-executable/discussions>
to help us document them.
