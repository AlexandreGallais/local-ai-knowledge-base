---
title: "Modules: ECMAScript modules (part 1 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/esm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: ECMAScript modules

> Stability: 2 - Stable

## Introduction

ECMAScript modules are the official standard format to package JavaScript
code for reuse. Modules are defined using a variety of `import` and
`export` statements.

The following example of an ES module exports a function:

```js
// addTwo.mjs
function addTwo(num) {
  return num + 2;
}

export { addTwo };
```

The following example of an ES module imports the function from `addTwo.mjs`:

```js
// app.mjs
import { addTwo } from './addTwo.mjs';

// Prints: 6
console.log(addTwo(4));
```

Node.js fully supports ECMAScript modules as they are currently specified and
provides interoperability between them and its original module format,
CommonJS.

## Enabling

Node.js has two module systems: CommonJS modules and ECMAScript modules.

Authors can tell Node.js to interpret JavaScript as an ES module via the `.mjs`
file extension, the `package.json` `"type"` field with a value `"module"`,
or the `--input-type` flag with a value of `"module"`. These are explicit
markers of code being intended to run as an ES module.

Inversely, authors can explicitly tell Node.js to interpret JavaScript as
CommonJS via the `.cjs` file extension, the `package.json` `"type"` field
with a value `"commonjs"`, or the `--input-type` flag with a value of
`"commonjs"`.

When code lacks explicit markers for either module system, Node.js will inspect
the source code of a module to look for ES module syntax. If such syntax is
found, Node.js will run the code as an ES module; otherwise it will run the
module as CommonJS. See Determining module system for more details.

## Packages

This section was moved to Modules: Packages.

## `import` Specifiers

### Terminology

The _specifier_ of an `import` statement is the string after the `from` keyword,
e.g. `'node:path'` in `import { sep } from 'node:path'`. Specifiers are also
used in `export from` statements, and as the argument to an `import()`
expression.

There are three types of specifiers:

* _Relative specifiers_ like `'./startup.js'` or `'../config.mjs'`. They refer
  to a path relative to the location of the importing file. _The file extension
  is always necessary for these._

* _Bare specifiers_ like `'some-package'` or `'some-package/shuffle'`. They can
  refer to the main entry point of a package by the package name, or a
  specific feature module within a package prefixed by the package name as per
  the examples respectively. _Including the file extension is only necessary
  for packages without an `"exports"` field._

* _Absolute specifiers_ like `'file:///opt/nodejs/config.js'`. They refer
  directly and explicitly to a full path.

Bare specifier resolutions are handled by the Node.js module
resolution and loading algorithm.
All other specifier resolutions are always only resolved with
the standard relative URL resolution semantics.

Like in CommonJS, module files within packages can be accessed by appending a
path to the package name unless the package's `package.json` contains an
`"exports"` field, in which case files within packages can only be accessed
via the paths defined in `"exports"`.

For details on these package resolution rules that apply to bare specifiers in
the Node.js module resolution, see the packages documentation.

### Mandatory file extensions

A file extension must be provided when using the `import` keyword to resolve
relative or absolute specifiers. Directory indexes (e.g. `'./startup/index.js'`)
must also be fully specified.

This behavior matches how `import` behaves in browser environments, assuming a
typically configured server.

### URLs

ES modules are resolved and cached as URLs. This means that special characters
must be percent-encoded, such as `#` with `%23` and `?` with `%3F`.

`file:`, `node:`, and `data:` URL schemes are supported. A specifier like
`'https://example.com/app.js'` is not supported natively in Node.js unless using
a custom HTTPS loader.

#### `file:` URLs

Modules are loaded multiple times if the `import` specifier used to resolve
them has a different query or fragment.

```js
import './foo.mjs?query=1'; // loads ./foo.mjs with query of "?query=1"
import './foo.mjs?query=2'; // loads ./foo.mjs with query of "?query=2"
```

The volume root may be referenced via `/`, `//`, or `file:///`. Given the
differences between URL and path resolution (such as percent encoding
details), it is recommended to use url.pathToFileURL when importing a path.

#### `data:` imports

`data:` URLs are supported for importing with the following MIME types:

* `text/javascript` for ES modules
* `application/json` for JSON
* `application/wasm` for Wasm

```js
import 'data:text/javascript,console.log("hello!");';
import _ from 'data:application/json,"world!"' with { type: 'json' };
```

`data:` URLs only resolve bare specifiers for builtin modules
and absolute specifiers. Resolving
relative specifiers does not work because `data:` is not a
special scheme. For example, attempting to load `./foo`
from `data:text/javascript,import "./foo";` fails to resolve because there
is no concept of relative resolution for `data:` URLs.

#### `node:` imports

`node:` URLs are supported as an alternative means to load Node.js builtin
modules. This URL scheme allows for builtin modules to be referenced by valid
absolute URL strings.

```js
import fs from 'node:fs/promises';
```

## Import attributes

Import attributes are an inline syntax for module import
statements to pass on more information alongside the module specifier.

```js
import fooData from './foo.json' with { type: 'json' };

const { default: barData } =
  await import('./bar.json', { with: { type: 'json' } });
```

Node.js only supports the `type` attribute, for which it supports the following values:

| Attribute `type` | Needed for       |
| ---------------- | ---------------- |
| `'json'`         | JSON modules |
| `'text'`         | Text modules |

The `type: 'json'` attribute is mandatory when importing JSON modules.
The `type: 'text'` attribute is mandatory when importing text modules.

## Built-in modules

Built-in modules provide named exports of their public API. A
default export is also provided which is the value of the CommonJS exports.
The default export can be used for, among other things, modifying the named
exports. Named exports of built-in modules are updated only by calling
`module.syncBuiltinESMExports()`.

```js
import EventEmitter from 'node:events';
const e = new EventEmitter();
```

```js
import { readFile } from 'node:fs';
readFile('./foo.txt', (err, source) => {
  if (err) {
    console.error(err);
  } else {
    console.log(source);
  }
});
```

```js
import fs, { readFileSync } from 'node:fs';
import { syncBuiltinESMExports } from 'node:module';
import { Buffer } from 'node:buffer';

fs.readFileSync = () => Buffer.from('Hello, ESM');
syncBuiltinESMExports();

fs.readFileSync === readFileSync;
```

> When importing built-in modules, all the named exports (i.e. properties of the module exports object)
> are populated even if they are not individually accessed.
> This can make initial imports of built-in modules slightly slower compared to loading them with
> `require()` or `process.getBuiltinModule()`, where the module exports object is evaluated immediately,
> but some of its properties may only be initialized when first accessed individually.

## `import()` expressions

Dynamic `import()` provides an asynchronous way to import modules. It is
supported in both CommonJS and ES modules, and can be used to load both CommonJS
and ES modules.

## `import.meta`

* Type: {Object}

The `import.meta` meta property is an `Object` that contains the following
properties. It is only supported in ES modules.

### `import.meta.dirname`

* Type: {string} The directory name of the current module.

This is the same as the `path.dirname()` of the `import.meta.filename`.

> **Caveat**: only present on `file:` modules.

### `import.meta.filename`

* Type: {string} The full absolute path and filename of the current module, with
  symlinks resolved.

This is the same as the `url.fileURLToPath()` of the `import.meta.url`.

> **Caveat** only local modules support this property. Modules not using the
> `file:` protocol will not provide it.

### `import.meta.url`

* Type: {string} The absolute `file:` URL of the module.

This is defined exactly the same as it is in browsers providing the URL of the
current module file.

This enables useful patterns such as relative file loading:

```js
import { readFileSync } from 'node:fs';
const buffer = readFileSync(new URL('./data.proto', import.meta.url));
```

### `import.meta.main`

> Stability: 1.0 - Early development

* Type: {boolean} `true` when the current module is the entry point of the current process; `false` otherwise.

Equivalent to `require.main === module` in CommonJS.

Analogous to Python's `__name__ == "__main__"`.

```js
export function foo() {
  return 'Hello, world';
}

function main() {
  const message = foo();
  console.log(message);
}

if (import.meta.main) main();
// `foo` can be imported from another module without possible side-effects from `main`
```

### `import.meta.resolve(specifier)`

> Stability: 1.2 - Release candidate

* `specifier` {string} The module specifier to resolve relative to the
  current module.
* Returns: {string} The absolute URL string that the specifier would resolve to.

`import.meta.resolve` is a module-relative resolution function scoped to
each module, returning the URL string.

```js
const dependencyAsset = import.meta.resolve('component-lib/asset.css');
// file:///app/node_modules/component-lib/asset.css
import.meta.resolve('./dep.js');
// file:///app/dep.js
```

All features of the Node.js module resolution are supported. Dependency
resolutions are subject to the permitted exports resolutions within the package.

**Caveats**:

* This can result in synchronous file-system operations, which
  can impact performance similarly to `require.resolve`.
* This feature is not available within custom loaders (it would
  create a deadlock).

**Non-standard API**:

When using the `--experimental-import-meta-resolve` flag, that function accepts
a second argument:

* `parent` {string|URL} An optional absolute parent module URL to resolve from.
  **Default:** `import.meta.url`
