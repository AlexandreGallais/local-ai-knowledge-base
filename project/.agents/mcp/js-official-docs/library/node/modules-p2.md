---
title: "Modules: CommonJS modules (part 2 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/modules.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: CommonJS modules (part 2 of 3)

## All together

To get the exact filename that will be loaded when `require()` is called, use
the `require.resolve()` function.

Putting together all of the above, here is the high-level algorithm
in pseudocode of what `require()` does:

```text
require(X) from module at path Y
1. If X is a core module,
   a. return the core module
   b. STOP
2. If X begins with '/'
   a. set Y to the file system root
3. If X is equal to '.', or X begins with './', '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
   c. THROW "not found"
4. If X begins with '#'
   a. LOAD_PACKAGE_IMPORTS(X, dirname(Y))
5. LOAD_PACKAGE_SELF(X, dirname(Y))
6. If a package map PACKAGE_MAP exists,
   a. Find the package ID for the package owning Y
        1. Let PARENT_PACKAGE_ID be FIND_PACKAGE_ID(dirname(Y), PACKAGE_MAP)
   b. LOAD_PACKAGE_MAP(X, PARENT_PACKAGE_ID, PACKAGE_MAP)
7. LOAD_NODE_MODULES(X, dirname(Y))
8. THROW "not found"

MAYBE_DETECT_AND_LOAD(X)
1. If X parses as a CommonJS module, load X as a CommonJS module. STOP.
2. Else, if the source code of X can be parsed as ECMAScript module using
  DETECT_MODULE_SYNTAX defined in the ESM resolver,
  a. Load X as an ECMAScript module. STOP.
3. THROW the SyntaxError from attempting to parse X as CommonJS in 1. STOP.

LOAD_AS_FILE(X)
1. If X is a file, load X as its file extension format. STOP
2. If X.js is a file,
    a. Find the closest package scope SCOPE to X.
    b. If no scope was found
      1. MAYBE_DETECT_AND_LOAD(X.js)
    c. If the SCOPE/package.json contains "type" field,
      1. If the "type" field is "module", load X.js as an ECMAScript module. STOP.
      2. If the "type" field is "commonjs", load X.js as a CommonJS module. STOP.
    d. MAYBE_DETECT_AND_LOAD(X.js)
3. If X.json is a file, load X.json to a JavaScript Object. STOP
4. If X.node is a file, load X.node as binary addon. STOP

LOAD_INDEX(X)
1. If X/index.js is a file
    a. Find the closest package scope SCOPE to X.
    b. If no scope was found, load X/index.js as a CommonJS module. STOP.
    c. If the SCOPE/package.json contains "type" field,
      1. If the "type" field is "module", load X/index.js as an ECMAScript module. STOP.
      2. Else, load X/index.js as a CommonJS module. STOP.
2. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
3. If X/index.node is a file, load X/index.node as binary addon. STOP

LOAD_AS_DIRECTORY(X)
1. If X/package.json is a file,
   a. Parse X/package.json, and look for "main" field.
   b. If "main" is a falsy value, GOTO 2.
   c. let M = X + (json main field)
   d. LOAD_AS_FILE(M)
   e. LOAD_INDEX(M)
   f. LOAD_INDEX(X) DEPRECATED
   g. THROW "not found"
2. LOAD_INDEX(X)

LOAD_NODE_MODULES(X, START)
1. Try to interpret X as a combination of NAME and SUBPATH where the name
   may have a @scope/ prefix and the subpath begins with a slash (`/`).
2. let DIRS = NODE_MODULES_PATHS(START)
3. for each DIR in DIRS:
   a. LOAD_PACKAGE_EXPORTS(SUBPATH, DIR/NAME)
   b. LOAD_AS_FILE(DIR/X)
   c. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules", GOTO d.
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS + GLOBAL_FOLDERS

FIND_PACKAGE_ID(PATH, PACKAGE_MAP)
1. Find the PACKAGE_ID for the entry whose "path" is a parent directory of PATH
2. If multiple entries are found, THROW "ambiguous resolution"
3. If no entry was found, THROW "external file".
4. return PACKAGE_ID

LOAD_PACKAGE_MAP(X, PARENT_PACKAGE_ID, PACKAGE_MAP)
1. Try to interpret X as a combination of NAME and SUBPATH where the name
   may have a @scope/ prefix and the subpath begins with a slash (`/`).
2. Find the package map entry for key <example-value>
3. Look up NAME in the entry's "dependencies" map.
4. If NAME is not found, THROW "not found".
5. Let TARGET be PACKAGE_MAP.packages[dependencies[name]]
6. Let PACKAGE_PATH be the resolved path of TARGET.
7. LOAD_PACKAGE_EXPORTS(SUBPATH, PACKAGE_PATH)
8. LOAD_AS_FILE(PACKAGE_PATH/SUBPATH)
9. LOAD_AS_DIRECTORY(PACKAGE_PATH/SUBPATH)
10. THROW "not found"

LOAD_PACKAGE_IMPORTS(X, DIR)
1. Find the closest package scope SCOPE to DIR.
2. If no scope was found, return.
3. If the SCOPE/package.json "imports" is null or undefined, return.
4. If `--no-require-module` is not enabled
  a. let CONDITIONS = ["node", "require", "module-sync"]
  b. Else, let CONDITIONS = ["node", "require"]
5. let MATCH = PACKAGE_IMPORTS_RESOLVE(X, pathToFileURL(SCOPE),
  CONDITIONS) defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH).

LOAD_PACKAGE_EXPORTS(SUBPATH, PACKAGE_DIR)
1. Parse PACKAGE_DIR/package.json, and look for "exports" field.
2. If "exports" is null or undefined, return.
3. If `--no-require-module` is not enabled
  a. let CONDITIONS = ["node", "require", "module-sync"]
  b. Else, let CONDITIONS = ["node", "require"]
4. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(PACKAGE_DIR), "." + SUBPATH,
   `package.json` "exports", CONDITIONS) defined in the ESM resolver.
5. RESOLVE_ESM_MATCH(MATCH)

LOAD_PACKAGE_SELF(X, DIR)
1. Find the closest package scope SCOPE to DIR.
2. If no scope was found, return.
3. If the SCOPE/package.json "exports" is null or undefined, return.
4. If the SCOPE/package.json "name" is not the first segment of X, return.
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(SCOPE),
   "." + X.slice("name".length), `package.json` "exports", ["node", "require"])
   defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

RESOLVE_ESM_MATCH(MATCH)
1. let RESOLVED_PATH = fileURLToPath(MATCH)
2. If the file at RESOLVED_PATH exists, load RESOLVED_PATH as its extension
   format. STOP
3. THROW "not found"
```

The "ESM resolver" is defined in the ESM documentation.

## Caching

Modules are cached after the first time they are loaded. This means (among other
things) that every call to `require('foo')` will get exactly the same object
returned, if it would resolve to the same file.

Provided `require.cache` is not modified, multiple calls to `require('foo')`
will not cause the module code to be executed multiple times. This is an
important feature. With it, "partially done" objects can be returned, thus
allowing transitive dependencies to be loaded even when they would cause cycles.

To have a module execute code multiple times, export a function, and call that
function.

### Module caching caveats

Modules are cached based on their resolved filename. Since modules may resolve
to a different filename based on the location of the calling module (loading
from `node_modules` folders), it is not a _guarantee_ that `require('foo')` will
always return the exact same object, if it would resolve to different files.

Additionally, on case-insensitive file systems or operating systems, different
resolved filenames can point to the same file, but the cache will still treat
them as different modules and will reload the file multiple times. For example,
`require('./foo')` and `require('./FOO')` return two different objects,
irrespective of whether or not `./foo` and `./FOO` are the same file.

## Built-in modules

Node.js has several modules compiled into the binary. These modules are
described in greater detail elsewhere in this documentation.

The built-in modules are defined within the Node.js source and are located in the
`lib/` folder.

Built-in modules can be identified using the `node:` prefix, in which case
it bypasses the `require` cache. For instance, `require('node:http')` will
always return the built in HTTP module, even if there is `require.cache` entry
by that name.

Some built-in modules are always preferentially loaded if their identifier is
passed to `require()`. For instance, `require('http')` will always
return the built-in HTTP module, even if there is a file by that name.

The list of all the built-in modules can be retrieved from `module.builtinModules`.
The modules being all listed without the `node:` prefix, except those that mandate such
prefix (as explained in the next section).

### Built-in modules with mandatory `node:` prefix

When being loaded by `require()`, some built-in modules must be requested with the
`node:` prefix. This requirement exists to prevent newly introduced built-in
modules from having a conflict with user land packages that already have
taken the name. Currently the built-in modules that requires the `node:` prefix are:

* `node:ffi`
* `node:sea`
* `node:sqlite`
* `node:test`
* `node:test/reporters`

The list of these modules is exposed in `module.builtinModules`, including the prefix.

## Cycles

When there are circular `require()` calls, a module might not have finished
executing when it is returned.

Consider this situation:

`a.js`:

```js
console.log('a starting');
exports.done = false;
const b = require('./b.js');
console.log('in a, b.done = %j', b.done);
exports.done = true;
console.log('a done');
```

`b.js`:

```js
console.log('b starting');
exports.done = false;
const a = require('./a.js');
console.log('in b, a.done = %j', a.done);
exports.done = true;
console.log('b done');
```

`main.js`:

```js
console.log('main starting');
const a = require('./a.js');
const b = require('./b.js');
console.log('in main, a.done = %j, b.done = %j', a.done, b.done);
```

When `main.js` loads `a.js`, then `a.js` in turn loads `b.js`. At that
point, `b.js` tries to load `a.js`. In order to prevent an infinite
loop, an **unfinished copy** of the `a.js` exports object is returned to the
`b.js` module. `b.js` then finishes loading, and its `exports` object is
provided to the `a.js` module.

By the time `main.js` has loaded both modules, they're both finished.
The output of this program would thus be:

```console
$ node main.js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done = true, b.done = true
```

Careful planning is required to allow cyclic module dependencies to work
correctly within an application.

## File modules

If the exact filename is not found, then Node.js will attempt to load the
required filename with the added extensions: `.js`, `.json`, and finally
`.node`. When loading a file that has a different extension (e.g. `.cjs`), its
full name must be passed to `require()`, including its file extension (e.g.
`require('./file.cjs')`).

`.json` files are parsed as JSON text files, `.node` files are interpreted as
compiled addon modules loaded with `process.dlopen()`. Files using any other
extension (or no extension at all) are parsed as JavaScript text files. Refer to
the Determining module system section to understand what parse goal will be
used.

A required module prefixed with `'/'` is an absolute path to the file. For
example, `require('/home/marco/foo.js')` will load the file at
`/home/marco/foo.js`.

A required module prefixed with `'./'` is relative to the file calling
`require()`. That is, `circle.js` must be in the same directory as `foo.js` for
`require('./circle')` to find it.

Without a leading `'/'`, `'./'`, or `'../'` to indicate a file, the module must
either be a core module or is loaded from a `node_modules` folder.

If the given path does not exist, `require()` will throw a
`MODULE_NOT_FOUND` error.

## Folders as modules

> Stability: 3 - Legacy: Use subpath exports or subpath imports instead.

There are three ways in which a folder may be passed to `require()` as
an argument.

The first is to create a `package.json` file in the root of the folder,
which specifies a `main` module. An example `package.json` file might
look like this:

```json
{ "name" : "some-library",
  "main" : "./lib/some-library.js" }
```

If this was in a folder at `./some-library`, then
`require('./some-library')` would attempt to load
`./some-library/lib/some-library.js`.

If there is no `package.json` file present in the directory, or if the
`"main"` entry is missing or cannot be resolved, then Node.js
will attempt to load an `index.js` or `index.node` file out of that
directory. For example, if there was no `package.json` file in the previous
example, then `require('./some-library')` would attempt to load:

* `./some-library/index.js`
* `./some-library/index.node`

If these attempts fail, then Node.js will report the entire module as missing
with the default error:

```console
Error: Cannot find module 'some-library'
```

In all three above cases, an `import('./some-library')` call would result in a
`ERR_UNSUPPORTED_DIR_IMPORT` error. Using package subpath exports or
subpath imports can provide the same containment organization benefits as
folders as modules, and work for both `require` and `import`.

## Loading from `node_modules` folders

If the module identifier passed to `require()` is not a
built-in module, and does not begin with `'/'`, `'../'`, or
`'./'`, then Node.js starts at the directory of the current module, and
adds `/node_modules`, and attempts to load the module from that location.
Node.js will not append `node_modules` to a path already ending in
`node_modules`.

If it is not found there, then it moves to the parent directory, and so
on, until the root of the file system is reached.

For example, if the file at `'/home/ry/projects/foo.js'` called
`require('bar.js')`, then Node.js would look in the following locations, in
this order:

* `/home/ry/projects/node_modules/bar.js`
* `/home/ry/node_modules/bar.js`
* `/home/node_modules/bar.js`
* `/node_modules/bar.js`

This allows programs to localize their dependencies, so that they do not
clash.

It is possible to require specific files or sub modules distributed with a
module by including a path suffix after the module name. For instance
`require('example-module/path/to/file')` would resolve `path/to/file`
relative to where `example-module` is located. The suffixed path follows the
same module resolution semantics.
