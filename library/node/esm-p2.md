---
title: "Modules: ECMAScript modules (part 2 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/esm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: ECMAScript modules (part 2 of 5)

## Interoperability with CommonJS

### `import` statements

An `import` statement can reference an ES module or a CommonJS module.
`import` statements are permitted only in ES modules, but dynamic `import()`
expressions are supported in CommonJS for loading ES modules.

When importing CommonJS modules, the
`module.exports` object is provided as the default export. Named exports may be
available, provided by static analysis as a convenience for better ecosystem
compatibility.

### `require`

The CommonJS module `require` currently only supports loading synchronous ES
modules (that is, ES modules that do not use top-level `await`).

See Loading ECMAScript modules using `require()` for details.

### CommonJS Namespaces

CommonJS modules consist of a `module.exports` object which can be of any type.

To support this, when importing CommonJS from an ECMAScript module, a namespace
wrapper for the CommonJS module is constructed, which always provides a
`default` export key <example-value> to the CommonJS `module.exports` value.

In addition, a heuristic static analysis is performed against the source text of
the CommonJS module to get a best-effort static list of exports to provide on
the namespace from values on `module.exports`. This is necessary since these
namespaces must be constructed prior to the evaluation of the CJS module.

These CommonJS namespace objects also provide the `default` export as a
`'module.exports'` named export, in order to unambiguously indicate that their
representation in CommonJS uses this value, and not the namespace value. This
mirrors the semantics of the handling of the `'module.exports'` export name in
`require(esm)` interop support.

When importing a CommonJS module, it can be reliably imported using the ES
module default import or its corresponding sugar syntax:

```js
import { default as cjs } from 'cjs';
// Identical to the above
import cjsSugar from 'cjs';

console.log(cjs);
console.log(cjs === cjsSugar);
// Prints:
//   <module.exports>
//   true
```

This Module Namespace Exotic Object can be directly observed either when using
`import * as m from 'cjs'` or a dynamic import:

```js
import * as m from 'cjs';
console.log(m);
console.log(m === await import('cjs'));
// Prints:
//   [Module] { default: <module.exports>, 'module.exports': <module.exports> }
//   true
```

For better compatibility with existing usage in the JS ecosystem, Node.js
in addition attempts to determine the CommonJS named exports of every imported
CommonJS module to provide them as separate ES module exports using a static
analysis process.

For example, consider a CommonJS module written:

```cjs
// cjs.cjs
exports.name = 'exported';
```

The preceding module supports named imports in ES modules:

```js
import { name } from './cjs.cjs';
console.log(name);
// Prints: 'exported'

import cjs from './cjs.cjs';
console.log(cjs);
// Prints: { name: 'exported' }

import * as m from './cjs.cjs';
console.log(m);
// Prints:
//   [Module] {
//     default: { name: 'exported' },
//     'module.exports': { name: 'exported' },
//     name: 'exported'
//   }
```

As can be seen from the last example of the Module Namespace Exotic Object being
logged, the `name` export is copied off of the `module.exports` object and set
directly on the ES module namespace when the module is imported.

Live binding updates or new exports added to `module.exports` are not detected
for these named exports.

The detection of named exports is based on common syntax patterns but does not
always correctly detect named exports. In these cases, using the default
import form described above can be a better option.

Named exports detection covers many common export patterns, reexport patterns
and build tool and transpiler outputs. See merve for the exact
semantics implemented.

### Differences between ES modules and CommonJS

#### No `require`, `exports`, or `module.exports`

In most cases, the ES module `import` can be used to load CommonJS modules.

If needed, a `require` function can be constructed within an ES module using
`module.createRequire()`.

#### No `__filename` or `__dirname`

These CommonJS variables are not available in ES modules.

`__filename` and `__dirname` use cases can be replicated via
`import.meta.filename` and `import.meta.dirname`.

#### No Addon Loading

Addons are not currently supported with ES module imports.

They can instead be loaded with `module.createRequire()` or
`process.dlopen`.

#### No `require.main`

To replace `require.main === module`, there is the `import.meta.main` API.

#### No `require.resolve`

Relative resolution can be handled via `new URL('./local', import.meta.url)`.

For a complete `require.resolve` replacement, there is the
import.meta.resolve API.

Alternatively `module.createRequire()` can be used.

#### No `NODE_PATH`

`NODE_PATH` is not part of resolving `import` specifiers. Please use symlinks
if this behavior is desired.

#### No `require.extensions`

`require.extensions` is not used by `import`. Module customization hooks can
provide a replacement.

#### No `require.cache`

`require.cache` is not used by `import` as the ES module loader has its own
separate cache.

## JSON modules

JSON files can be referenced by `import`:

```js
import packageConfig from './package.json' with { type: 'json' };
```

The `with { type: 'json' }` syntax is mandatory; see Import Attributes.

The imported JSON only exposes a `default` export. There is no support for named
exports. A cache entry is created in the CommonJS cache to avoid duplication.
The same object is returned in CommonJS if the JSON module has already been
imported from the same path.

## Text modules

> Stability: 1.0 - Early development

Text modules are available behind the `--experimental-import-text` flag.

Text files can be referenced by `import`:

```js
import message from './message.txt' with { type: 'text' };
```

The `with { type: 'text' }` syntax is mandatory; see Import Attributes.

The imported text only exposes a `default` export whose value is the module
source as a string.

## Wasm modules

Importing both WebAssembly module instances and WebAssembly source phase
imports is supported.

Both of these integrations are in line with the
ES Module Integration Proposal for WebAssembly.

When WebAssembly is unavailable in the current environment, importing a Wasm
module throws `ERR_WEBASSEMBLY_NOT_SUPPORTED`.
This also applies to source phase imports. Node.js does not provide an
alternative implementation when WebAssembly is unavailable.

### Wasm Source Phase Imports

> Stability: 1.2 - Release candidate

The Source Phase Imports proposal allows the `import source` keyword
combination to import a `WebAssembly.Module` object directly, instead of getting
a module instance already instantiated with its dependencies.

This is useful when needing custom instantiations for Wasm, while still
resolving and loading it through the ES module integration.

For example, to create multiple instances of a module, or to pass <example-value> imports
into a new instance of `library.wasm`:

```js
import source libraryModule from './library.wasm';

const instance1 = await WebAssembly.instantiate(libraryModule, importObject1);

const instance2 = await WebAssembly.instantiate(libraryModule, importObject2);
```

In addition to the static source phase, there is also a dynamic variant of the
source phase via the `import.source` dynamic phase import syntax:

```js
const dynamicLibrary = await import.source('./library.wasm');

const instance = await WebAssembly.instantiate(dynamicLibrary, importObject);
```

### JavaScript String Builtins

> Stability: 1.2 - Release candidate

When importing WebAssembly modules, the
WebAssembly JS String Builtins Proposal is automatically enabled through the
ESM Integration. This allows WebAssembly modules to directly use efficient
compile-time string builtins from the `wasm:js-string` namespace.

For example, the following Wasm module exports a string `getLength` function using
the `wasm:js-string` `length` builtin:

```text
(module
  ;; Compile-time import of the string length builtin.
  (import "wasm:js-string" "length" (func $string_length (param externref) (result i32)))

  ;; Define getLength, taking a JS value parameter assumed to be a string,
  ;; calling string length on it and returning the result.
  (func $getLength (param $str externref) (result i32)
    local.get $str
    call $string_length
  )

  ;; Export the getLength function.
  (export "getLength" (func $get_length))
)
```

```js
import { getLength } from './string-len.wasm';
getLength('foo'); // Returns 3.
```

Wasm builtins are compile-time imports that are linked during module compilation
rather than during instantiation. They do not behave like normal module graph
imports and they cannot be inspected via `WebAssembly.Module.imports(mod)`
or virtualized unless recompiling the module using the direct
`WebAssembly.compile` API with string builtins disabled.

String constants may also be imported from the `wasm:js/string-constants` builtin
import URL, allowing static JS string globals to be defined:

```text
(module
  (import "wasm:js/string-constants" "hello" (global $hello externref))
)
```

Importing a module in the source phase before it has been instantiated will also
use the compile-time builtins automatically:

```js
import source mod from './string-len.wasm';
const { exports: { getLength } } = await WebAssembly.instantiate(mod, {});
getLength('foo'); // Also returns 3.
```

### Wasm Instance Phase Imports

> Stability: 1.1 - Active development

Instance imports allow any `.wasm` files to be imported as normal modules,
supporting their module imports in turn.

For example, an `index.js` containing:

```js
import * as M from './library.wasm';
console.log(M);
```

executed under:

```bash
node index.mjs
```

would provide the exports interface for the instantiation of `library.wasm`.

### Reserved Wasm Namespaces

When importing WebAssembly module instances, they cannot use import module
names or import/export names that start with reserved prefixes:

* `wasm-js:` - reserved in all module import names, module names and export
  names.
* `wasm:` - reserved in module import names and export names (imported module
  names are allowed in order to support future builtin polyfills).

Importing a module using the above reserved names will throw a
`WebAssembly.LinkError`.

## Top-level `await`

The `await` keyword may be used in the top level body of an ECMAScript module.

Assuming an `a.mjs` with

```js
export const five = await Promise.resolve(5);
```

And a `b.mjs` with

```js
import { five } from './a.mjs';

console.log(five); // Logs `5`
```

```bash
node b.mjs # works
```

If a top level `await` expression never resolves, the `node` process will exit
with a `13` status code.

```js
import { spawn } from 'node:child_process';
import { execPath } from 'node:process';

spawn(execPath, [
  '--input-type=module',
  '--eval',
  // Never-resolving Promise:
  'await new Promise(() => {})',
]).once('exit', (code) => {
  console.log(code); // Logs `13`
});
```

## Loaders

The former Loaders documentation is now at
Modules: Customization hooks.
