---
title: "Modules: CommonJS modules (part 3 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/modules.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: CommonJS modules (part 3 of 3)

## Loading from the global folders

If the `NODE_PATH` environment variable is set to a colon-delimited list
of absolute paths, then Node.js will search those paths for modules if they
are not found elsewhere.

On Windows, `NODE_PATH` is delimited by semicolons (`;`) instead of colons.

`NODE_PATH` was originally created to support loading modules from
varying paths before the current module resolution algorithm was defined.

`NODE_PATH` is still supported, but is less necessary now that the Node.js
ecosystem has settled on a convention for locating dependent modules.
Sometimes deployments that rely on `NODE_PATH` show surprising behavior
when people are unaware that `NODE_PATH` must be set. Sometimes a
module's dependencies change, causing a different version (or even a
different module) to be loaded as the `NODE_PATH` is searched.

Additionally, Node.js will search in the following list of GLOBAL\_FOLDERS:

* 1: `$HOME/.node_modules`
* 2: `$HOME/.node_libraries`
* 3: `$PREFIX/lib/node`

Where `$HOME` is the user's home directory, and `$PREFIX` is the Node.js
configured `node_prefix`.

These are mostly for historic reasons.

It is strongly encouraged to place dependencies in the local `node_modules`
folder. These will be loaded faster, and more reliably.

## The module wrapper

Before a module's code is executed, Node.js will wrap it with a function
wrapper that looks like the following:

```js
(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
});
```

By doing this, Node.js achieves a few things:

* It keeps top-level variables (defined with `var`, `const`, or `let`) scoped to
  the module rather than the global object.
* It helps to provide some global-looking variables that are actually specific
  to the module, such as:
  * The `module` and `exports` objects that the implementor can use to export
    values from the module.
  * The convenience variables `__filename` and `__dirname`, containing the
    module's absolute filename and directory path.

## The module scope

### `__dirname`

* Type: {string}

The directory name of the current module. This is the same as the
`path.dirname()` of the `__filename`.

Example: running `node example.js` from `/Users/mjr`

```js
console.log(__dirname);
// Prints: /Users/mjr
console.log(path.dirname(__filename));
// Prints: /Users/mjr
```

### `__filename`

* Type: {string}

The file name of the current module. This is the current module file's absolute
path with symlinks resolved.

For a main program this is not necessarily the same as the file name used in the
command line.

See `__dirname` for the directory name of the current module.

Examples:

Running `node example.js` from `/Users/mjr`

```js
console.log(__filename);
// Prints: /Users/mjr/example.js
console.log(__dirname);
// Prints: /Users/mjr
```

Given two modules: `a` and `b`, where `b` is a dependency of
`a` and there is a directory structure of:

* `/Users/mjr/app/a.js`
* `/Users/mjr/app/node_modules/b/b.js`

References to `__filename` within `b.js` will return
`/Users/mjr/app/node_modules/b/b.js` while references to `__filename` within
`a.js` will return `/Users/mjr/app/a.js`.

### `exports`

* Type: {Object}

A reference to the `module.exports` that is shorter to type.
See the section about the exports shortcut for details on when to use
`exports` and when to use `module.exports`.

### `module`

* Type: {module}

A reference to the current module, see the section about the
`module` object. In particular, `module.exports` is used for defining what
a module exports and makes available through `require()`.

### `require(id)`

* `id` {string} module name or path
* Returns: {any} exported module content

Used to import modules, `JSON`, and local files. Modules can be imported
from `node_modules`. Local modules and JSON files can be imported using
a relative path (e.g. `./`, `./foo`, `./bar/baz`, `../foo`) that will be
resolved against the directory named by `__dirname` (if defined) or
the current working directory. The relative paths of POSIX style are resolved
in an OS independent fashion, meaning that the examples above will work on
Windows in the same way they would on Unix systems.

```js
// Importing a local module with a path relative to the `__dirname` or current
// working directory. (On Windows, this would resolve to .\path\myLocalModule.)
const myLocalModule = require('./path/myLocalModule');

// Importing a JSON file:
const jsonData = require('./path/filename.json');

// Importing a module from node_modules or Node.js built-in module:
const crypto = require('node:crypto');
```

#### `require.cache`

* Type: {Object}

Modules are cached in this object when they are required. By deleting a key
value from this object, the next `require` will reload the module.
This does not apply to native addons, for which reloading will result in an
error.

Adding or replacing entries is also possible. This cache is checked before
built-in modules and if a name matching a built-in module is added to the cache,
only `node:`-prefixed require calls are going to receive the built-in module.
Use with care!

```js
const assert = require('node:assert');
const realFs = require('node:fs');

const fakeFs = {};
require.cache.fs = { exports: fakeFs };

assert.strictEqual(require('fs'), fakeFs);
assert.strictEqual(require('node:fs'), realFs);
```

#### `require.extensions`

> Stability: 0 - Deprecated

* Type: {Object}

Instruct `require` on how to handle certain file extensions.

Process files with the extension `.sjs` as `.js`:

```js
require.extensions['.sjs'] = require.extensions['.js'];
```

**Deprecated.** In the past, this list has been used to load non-JavaScript
modules into Node.js by compiling them on-demand. However, in practice, there
are much better ways to do this, such as loading modules via some other Node.js
program, or compiling them to JavaScript ahead of time.

Avoid using `require.extensions`. Use could cause subtle bugs and resolving the
extensions gets slower with each registered extension.

#### `require.main`

* Type: {module | undefined}

The `Module` object representing the entry script loaded when the Node.js
process launched, or `undefined` if the entry point of the program is not a
CommonJS module.
See "Accessing the main module".

In `entry.js` script:

```js
console.log(require.main);
```

```bash
node entry.js
```

```js
Module {
  id: '.',
  path: '/absolute/path/to',
  exports: {},
  filename: '/absolute/path/to/entry.js',
  loaded: false,
  children: [],
  paths:
   [ '/absolute/path/to/node_modules',
     '/absolute/path/node_modules',
     '/absolute/node_modules',
     '/node_modules' ] }
```

#### `require.resolve(request[, options])`

* `request` {string} The module path to resolve.
* `options` {Object}
  * `paths` {string\[]} Paths to resolve module location from. If present, these
    paths are used instead of the default resolution paths, with the exception
    of GLOBAL\_FOLDERS like `$HOME/.node_modules`, which are
    always included. Each of these paths is used as a starting point for
    the module resolution algorithm, meaning that the `node_modules` hierarchy
    is checked from this location.
* Returns: {string}

Use the internal `require()` machinery to look up the location of a module,
but rather than loading the module, just return the resolved filename.

If the module can not be found, a `MODULE_NOT_FOUND` error is thrown.

##### `require.resolve.paths(request)`

* `request` {string} The module path whose lookup paths are being retrieved.
* Returns: {string\[]|null}

Returns an array containing the paths searched during resolution of `request` or
`null` if the `request` string references a core module, for example `http` or
`fs`.

## The `module` object

* Type: {Object}

In each module, the `module` free variable is a reference to the object
representing the current module. For convenience, `module.exports` is
also accessible via the `exports` module-global. `module` is not actually
a global but rather local to each module.

### `module.children`

* Type: {module\[]}

The module objects required for the first time by this one.

### `module.exports`

* Type: {Object}

The `module.exports` object is created by the `Module` system. Sometimes this is
not acceptable; many want their module to be an instance of some class. To do
this, assign the desired export object to `module.exports`. Assigning
the desired object to `exports` will simply rebind the local `exports` variable,
which is probably not what is desired.

For example, suppose we were making a module called `a.js`:

```js
const EventEmitter = require('node:events');

module.exports = new EventEmitter();

// Do some work, and after some time emit
// the 'ready' event from the module itself.
setTimeout(() => {
  module.exports.emit('ready');
}, 1000);
```

Then in another file we could do:

```js
const a = require('./a');
a.on('ready', () => {
  console.log('module "a" is ready');
});
```

Assignment to `module.exports` must be done immediately. It cannot be
done in any callbacks. This does not work:

`x.js`:

```js
setTimeout(() => {
  module.exports = { a: 'hello' };
}, 0);
```

`y.js`:

```js
const x = require('./x');
console.log(x.a);
```

#### `exports` shortcut

The `exports` variable is available within a module's file-level scope, and is
assigned the value of `module.exports` before the module is evaluated.

It allows a shortcut, so that `module.exports.f = ...` can be written more
succinctly as `exports.f = ...`. However, be aware that like any variable, if a
new value is assigned to `exports`, it is no longer bound to `module.exports`:

```js
module.exports.hello = true; // Exported from require of module
exports = { hello: false };  // Not exported, only available in the module
```

When the `module.exports` property is being completely replaced by a new
object, it is common to also reassign `exports`:

```js
module.exports = exports = function Constructor() {
  // ... etc.
};
```

To illustrate the behavior, imagine this hypothetical implementation of
`require()`, which is quite similar to what is actually done by `require()`:

```js
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // Module code here. In this example, define a function.
    function someFunc() {}
    exports = someFunc;
    // At this point, exports is no longer a shortcut to module.exports, and
    // this module will still export an empty default object.
    module.exports = someFunc;
    // At this point, the module will now export someFunc, instead of the
    // default object.
  })(module, module.exports);
  return module.exports;
}
```

### `module.filename`

* Type: {string}

The fully resolved filename of the module.

### `module.id`

* Type: {string}

The identifier for the module. Typically this is the fully resolved
filename.

### `module.isPreloading`

* Type: {boolean} `true` if the module is running during the Node.js preload
  phase.

### `module.loaded`

* Type: {boolean}

Whether or not the module is done loading, or is in the process of
loading.

### `module.parent`

> Stability: 0 - Deprecated: Please use `require.main` and
> `module.children` instead.

* Type: {module | null | undefined}

The module that first required this one, or `null` if the current module is the
entry point of the current process, or `undefined` if the module was loaded by
something that is not a CommonJS module (E.G.: REPL or `import`).

### `module.path`

* Type: {string}

The directory name of the module. This is usually the same as the
`path.dirname()` of the `module.id`.

### `module.paths`

* Type: {string\[]}

The search paths for the module.

### `module.require(id)`

* `id` {string}
* Returns: {any} exported module content

The `module.require()` method provides a way to load a module as if
`require()` was called from the original module.

In order to do this, it is necessary to get a reference to the `module` object.
Since `require()` returns the `module.exports`, and the `module` is typically
_only_ available within a specific module's code, it must be explicitly exported
in order to be used.

## The `Module` object

This section was moved to
Modules: `module` core module.

* `module.builtinModules`
* `module.createRequire(filename)`
* `module.syncBuiltinESMExports()`

## Source map v3 support

This section was moved to
Modules: `module` core module.

* `module.findSourceMap(path)`
* Class: `module.SourceMap`
  * `new SourceMap(payload)`
  * `sourceMap.payload`
  * `sourceMap.findEntry(lineNumber, columnNumber)`
