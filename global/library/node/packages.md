---
title: "Modules: Packages (part 1 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/packages.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: Packages

## Introduction

A package is a folder tree described by a `package.json` file. The package
consists of the folder containing the `package.json` file and all subfolders
until the next folder containing another `package.json` file, or a folder
named `node_modules`.

This page provides guidance for package authors writing `package.json` files
along with a reference for the `package.json` fields defined by Node.js.

## Determining module system

### Introduction

Node.js will treat the following as ES modules when passed to `node` as the
initial input, or when referenced by `import` statements or `import()`
expressions:

* Files with an `.mjs` extension.

* Files with a `.js` extension when the nearest parent `package.json` file
  contains a top-level `"type"` field with a value of `"module"`.

* Strings passed in as an argument to `--eval`, or piped to `node` via `STDIN`,
  with the flag `--input-type=module`.

* Code containing syntax only successfully parsed as ES modules, such as
  `import` or `export` statements or `import.meta`, with no explicit marker of
  how it should be interpreted. Explicit markers are `.mjs` or `.cjs`
  extensions, `package.json` `"type"` fields with either `"module"` or
  `"commonjs"` values, or the `--input-type` flag. Dynamic `import()`
  expressions are supported in either CommonJS or ES modules and would not force
  a file to be treated as an ES module. See Syntax detection.

Node.js will treat the following as CommonJS when passed to `node` as the
initial input, or when referenced by `import` statements or `import()`
expressions:

* Files with a `.cjs` extension.

* Files with a `.js` extension when the nearest parent `package.json` file
  contains a top-level field `"type"` with a value of `"commonjs"`.

* Strings passed in as an argument to `--eval` or `--print`, or piped to `node`
  via `STDIN`, with the flag `--input-type=commonjs`.

* Files with a `.js` extension with no parent `package.json` file or where the
  nearest parent `package.json` file lacks a `type` field, and where the code
  can evaluate successfully as CommonJS. In other words, Node.js tries to run
  such "ambiguous" files as CommonJS first, and will retry evaluating them as ES
  modules if the evaluation as CommonJS fails because the parser found ES module
  syntax.

Writing ES module syntax in "ambiguous" files incurs a performance cost, and
therefore it is encouraged that authors be explicit wherever possible. In
particular, package authors should always include the `"type"` field in
their `package.json` files, even in packages where all sources are CommonJS.
Being explicit about the `type` of the package will future-proof the package in
case the default type of Node.js ever changes, and it will also make things
easier for build tools and loaders to determine how the files in the package
should be interpreted.

### Syntax detection

> Stability: 1.2 - Release candidate

Node.js will inspect the source code of ambiguous input to determine whether it
contains ES module syntax; if such syntax is detected, the input will be treated
as an ES module.

Ambiguous input is defined as:

* Files with a `.js` extension or no extension; and either no controlling
  `package.json` file or one that lacks a `type` field.
* String input (`--eval` or `STDIN`) when `--input-type`is not specified.

ES module syntax is defined as syntax that would throw when evaluated as
CommonJS. This includes the following:

* `import` statements (but _not_ `import()` expressions, which are valid in
  CommonJS).
* `export` statements.
* `import.meta` references.
* `await` at the top level of a module.
* Lexical redeclarations of the CommonJS wrapper variables (`require`, `module`,
  `exports`, `__dirname`, `__filename`).

### Module resolution and loading

Node.js has two types of module resolution and loading, chosen based on how the module is requested.

When a module is requested via `require()` (available by default in CommonJS modules,
and can be dynamically generated using `createRequire()` in both CommonJS and ES Modules):

* Resolution:
  * The resolution initiated by `require()` supports folders as modules.
  * When resolving a specifier, if no exact match is found, `require()` will try to add
    extensions (`.js`, `.json`, and finally `.node`) and then attempt to resolve
    folders as modules.
  * It does not support URLs as specifiers by default.
* Loading:
  * `.json` files are treated as JSON text files.
  * `.node` files are interpreted as compiled addon modules loaded with `process.dlopen()`.
  * `.ts`, `.mts` and `.cts` files are treated as TypeScript text files.
  * Files with any other extension, or without extensions, are treated as JavaScript
    text files.
  * `require()` can only be used to load ECMAScript modules from CommonJS modules if
    the ECMAScript module _and its dependencies_ are synchronous
    (i.e. they do not contain top-level `await`).

When a module is requested via static `import` statements (only available in ES Modules)
or `import()` expressions (available in both CommonJS and ES Modules):

* Resolution:
  * The resolution of `import`/`import()` does not support folders as modules,
    directory indexes (e.g. `'./startup/index.js'`) must be fully specified.
  * It does not perform extension searching. A file extension must be provided
    when the specifier is a relative or absolute file URL.
  * It supports `file://` and `data:` URLs as specifiers by default.
* Loading:
  * `.json` files are treated as JSON text files. When importing JSON modules,
    an import type attribute is required (e.g.
    `import json from './data.json' with { type: 'json' }`).
  * `.node` files are interpreted as compiled addon modules loaded with
    `process.dlopen()`, if `--experimental-addon-modules` is enabled.
  * `.ts`, `.mts` and `.cts` files are treated as TypeScript text files.
  * It accepts only `.js`, `.mjs`, and `.cjs` extensions for JavaScript text
    files.
  * `.wasm` files are treated as WebAssembly modules.
  * Any other file extensions will result in a  `ERR_UNKNOWN_FILE_EXTENSION` error.
    Additional file extensions can be facilitated via customization hooks.
  * `import`/`import()` can be used to load JavaScript CommonJS modules.
    Such modules are passed through merve to try to identify named
    exports, which are available if they can be determined through static analysis.

Regardless of how a module is requested, the resolution and loading process can be customized
using customization hooks.

### `package.json` and file extensions

Within a package, the `package.json` `"type"` field defines how
Node.js should interpret `.js` files. If a `package.json` file does not have a
`"type"` field, `.js` files are treated as CommonJS.

A `package.json` `"type"` value of `"module"` tells Node.js to interpret `.js`
files within that package as using ES module syntax.

The `"type"` field applies not only to initial entry points (`node my-app.js`)
but also to files referenced by `import` statements and `import()` expressions.

```js
// my-app.js, treated as an ES module because there is a package.json
// file in the same folder with "type": "module".

import './startup/init.js';
// Loaded as ES module since ./startup contains no package.json file,
// and therefore inherits the "type" value from one level up.

import 'commonjs-package';
// Loaded as CommonJS since ./node_modules/commonjs-package/package.json
// lacks a "type" field or contains "type": "commonjs".

import './node_modules/commonjs-package/index.js';
// Loaded as CommonJS since ./node_modules/commonjs-package/package.json
// lacks a "type" field or contains "type": "commonjs".
```

Files ending with `.mjs` are always loaded as ES modules regardless of
the nearest parent `package.json`.

Files ending with `.cjs` are always loaded as CommonJS regardless of the
nearest parent `package.json`.

```js
import './legacy-file.cjs';
// Loaded as CommonJS since .cjs is always loaded as CommonJS.

import 'commonjs-package/src/index.mjs';
// Loaded as ES module since .mjs is always loaded as ES module.
```

The `.mjs` and `.cjs` extensions can be used to mix types within the same
package:

* Within a `"type": "module"` package, Node.js can be instructed to
  interpret a particular file as CommonJS by naming it with a `.cjs`
  extension (since both `.js` and `.mjs` files are treated as ES modules within
  a `"module"` package).

* Within a `"type": "commonjs"` package, Node.js can be instructed to
  interpret a particular file as an ES module by naming it with an `.mjs`
  extension (since both `.js` and `.cjs` files are treated as CommonJS within a
  `"commonjs"` package).

### `--input-type` flag

Strings passed in as an argument to `--eval` (or `-e`), or piped to `node` via
`STDIN`, are treated as ES modules when the `--input-type=module` flag
is set.

```bash
node --input-type=module --eval "import { sep } from 'node:path'; console.log(sep);"

echo "import { sep } from 'node:path'; console.log(sep);" | node --input-type=module
```

For completeness there is also `--input-type=commonjs`, for explicitly running
string input as CommonJS. This is the default behavior if `--input-type` is
unspecified.
