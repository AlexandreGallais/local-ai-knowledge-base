---
title: "Modules: node:module API (part 1 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/module.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: `node:module` API

> Stability: 2 - Stable

The `node:module` module provides utilities for interacting with the Node.js
module system.

It can be accessed using:

```mjs
import module from 'node:module';
```

## Class: `Module`

`module` objects in CommonJS modules are instances of this class.

See the CommonJS documentation for the `module` object.

## `module.builtinModules`

* Type: {string\[]}

A list of the names of all modules provided by Node.js.

```mjs
import { builtinModules } from 'node:module';
console.log(builtinModules.filter((name) => name.startsWith('path')));
// Prints: [ 'path', 'path/posix', 'path/win32' ]
```

To test whether a module name corresponds to a builtin module, use
`module.isBuiltin()`.

## `module.createRequire(filename)`

* `filename` {string|URL} Filename to be used to construct the require
  function. Must be a file URL object, file URL string, or absolute path
  string.
* Returns: {require} Require function

```mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// sibling-module.js is a CommonJS module.
const siblingModule = require('./sibling-module');
```

## `module.findPackageJSON(specifier[, base])`

> Stability: 1.1 - Active Development

* `specifier` {string|URL} The specifier for the module whose `package.json` to
  retrieve. When passing a _bare specifier_, the `package.json` at the root of
  the package is returned. When passing a _relative specifier_ or an _absolute specifier_,
  the closest parent `package.json` is returned.
* `base` {string|URL} The absolute location (`file:` URL string or FS path) of the
  containing  module. For CJS, use `__filename` (not `__dirname`!); for ESM, use
  `import.meta.url`. You do not need to pass it if `specifier` is an `absolute specifier`.
* Returns: {string|undefined} A path if the `package.json` is found. When `specifier`
  is a package, the package's root `package.json`; when a relative or unresolved, the closest
  `package.json` to the `specifier`.

> **Caveat**: Do not use this to try to determine module format. There are many things affecting
> that determination; the `type` field of package.json is the _least_ definitive (ex file extension
> supersedes it, and a loader hook supersedes that).

> **Caveat**: This currently leverages only the built-in default resolver; if
> `resolve` customization hooks are registered, they will not affect the resolution.
> This may change in the future.

```text
/path/to/project
  ├ packages/
    ├ bar/
      ├ bar.js
      └ package.json // name = '@foo/bar'
    └ qux/
      ├ node_modules/
        └ some-package/
          └ package.json // name = 'some-package'
      ├ qux.js
      └ package.json // name = '@foo/qux'
  ├ main.js
  └ package.json // name = '@foo'
```

```mjs
// /path/to/project/packages/bar/bar.js
import { findPackageJSON } from 'node:module';

findPackageJSON('..', import.meta.url);
// '/path/to/project/package.json'
// Same result when passing an absolute specifier instead:
findPackageJSON(new URL('../', import.meta.url));
findPackageJSON(import.meta.resolve('../'));

findPackageJSON('some-package', import.meta.url);
// '/path/to/project/packages/bar/node_modules/some-package/package.json'
// When passing an absolute specifier, you might get a different result if the
// resolved module is inside a subfolder that has nested `package.json`.
findPackageJSON(import.meta.resolve('some-package'));
// '/path/to/project/packages/bar/node_modules/some-package/some-subfolder/package.json'

findPackageJSON('@foo/qux', import.meta.url);
// '/path/to/project/packages/qux/package.json'
```

```cjs
// /path/to/project/packages/bar/bar.js
const { findPackageJSON } = require('node:module');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

findPackageJSON('..', __filename);
// '/path/to/project/package.json'
// Same result when passing an absolute specifier instead:
findPackageJSON(pathToFileURL(path.join(__dirname, '..')));

findPackageJSON('some-package', __filename);
// '/path/to/project/packages/bar/node_modules/some-package/package.json'
// When passing an absolute specifier, you might get a different result if the
// resolved module is inside a subfolder that has nested `package.json`.
findPackageJSON(pathToFileURL(require.resolve('some-package')));
// '/path/to/project/packages/bar/node_modules/some-package/some-subfolder/package.json'

findPackageJSON('@foo/qux', __filename);
// '/path/to/project/packages/qux/package.json'
```

## `module.isBuiltin(moduleName)`

* `moduleName` {string} name of the module
* Returns: {boolean} returns true if the module is builtin else returns false

```mjs
import { isBuiltin } from 'node:module';
isBuiltin('node:fs'); // true
isBuiltin('fs'); // true
isBuiltin('wss'); // false
```

## `module.register(specifier, parentURL)`

> Stability: 0 - Deprecated: Use `module.registerHooks()` instead.

* `specifier` {string|URL} Customization hooks to be registered; this should be
  the same string that would be passed to `import()`, except that if it is
  relative, it is resolved relative to `parentURL`.
* `parentURL` {string|URL} If you want to resolve `specifier` relative to a base
  URL, such as `import.meta.url`, you can pass that URL here. **Default:**
  `'data:'`
* `options` {Object}
  * `parentURL` {string|URL} If you want to resolve `specifier` relative to a
    base URL, such as `import.meta.url`, you can pass that URL here. This
    property is ignored if the `parentURL` is supplied as the second argument.
    **Default:** `'data:'`
  * `data` {any} Any arbitrary, cloneable JavaScript value to pass into the
    `initialize` hook.
  * `transferList` {Object\[]} transferable objects to be passed into the
    `initialize` hook.

Register a module that exports hooks that customize Node.js module
resolution and loading behavior. See Customization hooks.

This feature requires `--allow-worker` if used with the Permission Model.

## `module.registerHooks(options)`

> Stability: 1.2 - Release candidate

* `options` {Object}
  * `load` {Function|undefined} See load hook. **Default:** `undefined`.
  * `resolve` {Function|undefined} See resolve hook. **Default:** `undefined`.
* Returns: {Object} An object with the following property:
  * `deregister()` {Function} Remove the registered hooks so that they are no
    longer called. Hooks are otherwise retained for the lifetime of the running
    process.
  * `[Symbol.dispose]` {Function} The same as `deregister`.

Register hooks that customize Node.js module resolution and loading behavior.
See Customization hooks. The returned object can be used to
deregister the hooks.

## `module.stripTypeScriptTypes(code[, options])`

> Stability: 1.2 - Release candidate

* `code` {string} The code to strip type annotations from.
* `options` {Object}
  * `mode` {string} **Default:** `'strip'`. Possible values are:
    * `'strip'` Only strip type annotations without performing the transformation of TypeScript features.
  * `sourceUrl` {string}  Specifies the source url used in the source map.
* Returns: {string} The code with type annotations stripped.

`module.stripTypeScriptTypes()` removes type annotations from TypeScript code. It
can be used to strip type annotations from TypeScript code before running it
with `vm.runInContext()` or `vm.compileFunction()`.

By default, it will throw an error if the code contains TypeScript features
that require transformation, such as `enum`s. See type-stripping for more information.

_WARNING_: The output of this function should not be considered stable across Node.js versions,
due to changes in the TypeScript parser.

```mjs
import { stripTypeScriptTypes } from 'node:module';
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code);
console.log(strippedCode);
// Prints: const a         = 1;
```

```cjs
const { stripTypeScriptTypes } = require('node:module');
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code);
console.log(strippedCode);
// Prints: const a         = 1;
```

If `sourceUrl` is provided, it will be used appended as a comment at the end of the output:

```mjs
import { stripTypeScriptTypes } from 'node:module';
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code, { mode: 'strip', sourceUrl: 'source.ts' });
console.log(strippedCode);
// Prints: const a         = 1\n\n//# sourceURL=source.ts;
```

```cjs
const { stripTypeScriptTypes } = require('node:module');
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code, { mode: 'strip', sourceUrl: 'source.ts' });
console.log(strippedCode);
// Prints: const a         = 1\n\n//# sourceURL=source.ts;
```

## `module.syncBuiltinESMExports()`

The `module.syncBuiltinESMExports()` method updates all the live bindings for
builtin ES Modules to match the properties of the CommonJS exports. It
does not add or remove exported names from the ES Modules.

```js
const fs = require('node:fs');
const assert = require('node:assert');
const { syncBuiltinESMExports } = require('node:module');

fs.readFile = newAPI;

delete fs.readFileSync;

function newAPI() {
  // ...
}

fs.newAPI = newAPI;

syncBuiltinESMExports();

import('node:fs').then((esmFS) => {
  // It syncs the existing readFile property with the new value
  assert.strictEqual(esmFS.readFile, newAPI);
  // readFileSync has been deleted from the required fs
  assert.strictEqual('readFileSync' in fs, false);
  // syncBuiltinESMExports() does not remove readFileSync from esmFS
  assert.strictEqual('readFileSync' in esmFS, true);
  // syncBuiltinESMExports() does not add names
  assert.strictEqual(esmFS.newAPI, undefined);
});
```
