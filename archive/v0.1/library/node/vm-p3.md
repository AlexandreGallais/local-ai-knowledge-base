---
title: "VM (executing JavaScript) (part 3 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/vm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# VM (executing JavaScript) (part 3 of 7)

## Class: `vm.SourceTextModule`

> Stability: 1 - Experimental

This feature is only available with the `--experimental-vm-modules` command
flag enabled.

* Extends: {vm.Module}

The `vm.SourceTextModule` class provides the Source Text Module Record as
defined in the ECMAScript specification.

### `new vm.SourceTextModule(code[, options])`

* `code` {string} JavaScript Module code to parse
* `options`
  * `identifier` {string} String used in stack traces.
    **Default:** `'vm:module(i)'` where `i` is a context-specific ascending
    index.
  * `cachedData` {Buffer|TypedArray|DataView} Provides an optional `Buffer` or
    `TypedArray`, or `DataView` with V8's code cache data for the supplied
    source. The `code` must be the same as the module from which this
    `cachedData` was created.
  * `context` {Object} The contextified object as returned by the
    `vm.createContext()` method, to compile and evaluate this `Module` in.
    If no context is specified, the module is evaluated in the current
    execution context.
  * `lineOffset` {integer} Specifies the line number offset that is displayed
    in stack traces produced by this `Module`. **Default:** `0`.
  * `columnOffset` {integer} Specifies the first-line column number offset that
    is displayed in stack traces produced by this `Module`. **Default:** `0`.
  * `initializeImportMeta` {Function} Called during evaluation of this `Module`
    to initialize the `import.meta`.
    * `meta` {import.meta}
    * `module` {vm.SourceTextModule}
  * `importModuleDynamically` {Function} Used to specify the
    how the modules should be loaded during the evaluation of this module
    when `import()` is called. This option is part of the experimental
    modules API. We do not recommend using it in a production environment.
    For detailed information, see
    Support of dynamic `import()` in compilation APIs.

Creates a new `SourceTextModule` instance.

Properties assigned to the `import.meta` object that are objects may
allow the module to access information outside the specified `context`. Use
`vm.runInContext()` to create objects in a specific context.

```mjs
import vm from 'node:vm';

const contextifiedObject = vm.createContext({ secret: 42 });

const module = new vm.SourceTextModule(
  '<example-value>',
  {
    context: contextifiedObject,
    initializeImportMeta(meta) {
      // Note: this object is created in the top context. As such,
      // Object.getPrototypeOf(import.meta.prop) points to the
      // Object.prototype in the top context rather than that in
      // the contextified object.
      meta.prop = {};
    },
  });
// The module has an empty `moduleRequests` array.
module.linkRequests([]);
module.instantiate();
await module.evaluate();

// Now, Object.prototype.secret will be equal to 42.
//
// To fix this problem, replace
//     meta.prop = {};
// above with
//     meta.prop = vm.runInContext('({})', contextifiedObject);
```

```cjs
const vm = require('node:vm');
const contextifiedObject = vm.createContext({ secret: 42 });
(async () => {
  const module = new vm.SourceTextModule(
    '<example-value>',
    {
      context: contextifiedObject,
      initializeImportMeta(meta) {
        // Note: this object is created in the top context. As such,
        // Object.getPrototypeOf(import.meta.prop) points to the
        // Object.prototype in the top context rather than that in
        // the contextified object.
        meta.prop = {};
      },
    });
  // The module has an empty `moduleRequests` array.
  module.linkRequests([]);
  module.instantiate();
  await module.evaluate();
  // Now, Object.prototype.secret will be equal to 42.
  //
  // To fix this problem, replace
  //     meta.prop = {};
  // above with
  //     meta.prop = vm.runInContext('({})', contextifiedObject);
})();
```

### `sourceTextModule.createCachedData()`

* Returns: {Buffer}

Creates a code cache that can be used with the `SourceTextModule` constructor's
`cachedData` option. Returns a `Buffer`. This method may be called any number
of times before the module has been evaluated.

The code cache of the `SourceTextModule` doesn't contain any JavaScript
observable states. The code cache is safe to be saved along side the script
source and used to construct new `SourceTextModule` instances multiple times.

Functions in the `SourceTextModule` source can be marked as lazily compiled
and they are not compiled at construction of the `SourceTextModule`. These
functions are going to be compiled when they are invoked the first time. The
code cache serializes the metadata that V8 currently knows about the
`SourceTextModule` that it can use to speed up future compilations.

```js
// Create an initial module
const module = new vm.SourceTextModule('const a = 1;');

// Create cached data from this module
const cachedData = module.createCachedData();

// Create a new module using the cached data. The code must be the same.
const module2 = new vm.SourceTextModule('const a = 1;', { cachedData });
```

### `sourceTextModule.dependencySpecifiers`

> Stability: 0 - Deprecated: Use `sourceTextModule.moduleRequests` instead.

* Type: {string\[]}

The specifiers of all dependencies of this module. The returned array is frozen
to disallow any changes to it.

Corresponds to the `[[RequestedModules]]` field of Cyclic Module Records in
the ECMAScript specification.

### `sourceTextModule.hasAsyncGraph()`

* Returns: {boolean}

Iterates over the dependency graph and returns `true` if any module in its
dependencies or this module itself contains top-level `await` expressions,
otherwise returns `false`.

The search may be slow if the graph is big enough.

This requires the module to be instantiated first. If the module is not
instantiated yet, an error will be thrown.

### `sourceTextModule.hasTopLevelAwait()`

* Returns: {boolean}

Returns whether the module itself contains any top-level `await` expressions.

This corresponds to the field `[[HasTLA]]` in Cyclic Module Record in the
ECMAScript specification.

### `sourceTextModule.instantiate()`

* Returns: {undefined}

Instantiate the module with the linked requested modules.

This resolves the imported bindings of the module, including re-exported
binding names. When there are any bindings that cannot be resolved,
an error would be thrown synchronously.

If the requested modules include cyclic dependencies, the
`sourceTextModule.linkRequests(modules)` method must be called on all
modules in the cycle before calling this method.

### `sourceTextModule.linkRequests(modules)`

* `modules` {vm.Module\[]} Array of `vm.Module` objects that this module depends on.
  The order of the modules in the array is the order of
  `sourceTextModule.moduleRequests`.
* Returns: {undefined}

Link module dependencies. This method must be called before evaluation, and
can only be called once per module.

The order of the module instances in the `modules` array should correspond to the order of
`sourceTextModule.moduleRequests` being resolved. If two module requests have the same
specifier and import attributes, they must be resolved with the same module instance or an
`ERR_MODULE_LINK_MISMATCH` would be thrown. For example, when linking requests for this
module:

```mjs
import foo from 'foo';
import source Foo from 'foo';
```

The `modules` array must contain two references to the same instance, because the two
module requests are identical but in two phases.

If the module has no dependencies, the `modules` array can be empty.

Users can use `sourceTextModule.moduleRequests` to implement the host-defined
HostLoadImportedModule abstract operation in the ECMAScript specification,
and using `sourceTextModule.linkRequests()` to invoke specification defined
FinishLoadingImportedModule, on the module with all dependencies in a batch.

It's up to the creator of the `SourceTextModule` to determine if the resolution
of the dependencies is synchronous or asynchronous.

After each module in the `modules` array is linked, call
`sourceTextModule.instantiate()`.

### `sourceTextModule.moduleRequests`

* Type: {ModuleRequest\[]} Dependencies of this module.

The requested import dependencies of this module. The returned array is frozen
to disallow any changes to it.

For example, given a source text:

```mjs
import foo from 'foo';
import fooAlias from 'foo';
import bar from './bar.js';
import withAttrs from '../with-attrs.ts' with { arbitraryAttr: 'attr-val' };
import source Module from 'wasm-mod.wasm';
```

The value of the `sourceTextModule.moduleRequests` will be:

```js
[
  {
    specifier: 'foo',
    attributes: {},
    phase: 'evaluation',
  },
  {
    specifier: 'foo',
    attributes: {},
    phase: 'evaluation',
  },
  {
    specifier: './bar.js',
    attributes: {},
    phase: 'evaluation',
  },
  {
    specifier: '../with-attrs.ts',
    attributes: { arbitraryAttr: 'attr-val' },
    phase: 'evaluation',
  },
  {
    specifier: 'wasm-mod.wasm',
    attributes: {},
    phase: 'source',
  },
];
```

## Class: `vm.SyntheticModule`

> Stability: 1 - Experimental

This feature is only available with the `--experimental-vm-modules` command
flag enabled.

* Extends: {vm.Module}

The `vm.SyntheticModule` class provides the Synthetic Module Record as
defined in the WebIDL specification. The purpose of synthetic modules is to
provide a generic interface for exposing non-JavaScript sources to ECMAScript
module graphs.

```mjs
import { SyntheticModule } from 'node:vm';

const source = '{ "a": 1 }';
const syntheticModule = new SyntheticModule(['default'], function() {
  const obj = JSON.parse(source);
  this.setExport('default', obj);
});

// Use `syntheticModule` in linking
(async () => {
  await syntheticModule.link(() => {});
  await syntheticModule.evaluate();

  console.log('Default export:', syntheticModule.namespace.default);
})();
```

```cjs
const { SyntheticModule } = require('node:vm');

const source = '{ "a": 1 }';
const syntheticModule = new SyntheticModule(['default'], function() {
  const obj = JSON.parse(source);
  this.setExport('default', obj);
});

// Use `syntheticModule` in linking
(async () => {
  await syntheticModule.link(() => {});
  await syntheticModule.evaluate();

  console.log('Default export:', syntheticModule.namespace.default);
})();
```

### `new vm.SyntheticModule(exportNames, evaluateCallback[, options])`

* `exportNames` {string\[]} Array of names that will be exported from the
  module.
* `evaluateCallback` {Function} Called when the module is evaluated.
* `options`
  * `identifier` {string} String used in stack traces.
    **Default:** `'vm:module(i)'` where `i` is a context-specific ascending
    index.
  * `context` {Object} The contextified object as returned by the
    `vm.createContext()` method, to compile and evaluate this `Module` in.

Creates a new `SyntheticModule` instance.

Objects assigned to the exports of this instance may allow importers of
the module to access information outside the specified `context`. Use
`vm.runInContext()` to create objects in a specific context.

### `syntheticModule.setExport(name, value)`

* `name` {string} Name of the export to set.
* `value` {any} The value to set the export to.

This method sets the module export binding slots with the given value.

```mjs
import vm from 'node:vm';

const m = new vm.SyntheticModule(['x'], () => {
  m.setExport('x', 1);
});

await m.evaluate();

assert.strictEqual(m.namespace.x, 1);
```

```cjs
const vm = require('node:vm');
(async () => {
  const m = new vm.SyntheticModule(['x'], () => {
    m.setExport('x', 1);
  });
  await m.evaluate();
  assert.strictEqual(m.namespace.x, 1);
})();
```

## Type: `ModuleRequest`

* Type: {Object}
  * `specifier` {string} The specifier of the requested module.
  * `attributes` {Object} The `"with"` value passed to the
    WithClause in a ImportDeclaration, or an empty object if no value was
    provided.
  * `phase` {string} The phase of the requested module (`"source"` or `"evaluation"`).

A `ModuleRequest` represents the request to import a module with given import attributes and phase.

## `vm.compileFunction(code[, params[, options]])`

* `code` {string} The body of the function to compile.
* `params` {string\[]} An array of strings containing all parameters for the
  function.
* `options` {Object}
  * `filename` {string} Specifies the filename used in stack traces produced
    by this script. **Default:** `''`.
  * `lineOffset` {number} Specifies the line number offset that is displayed
    in stack traces produced by this script. **Default:** `0`.
  * `columnOffset` {number} Specifies the first-line column number offset that
    is displayed in stack traces produced by this script. **Default:** `0`.
  * `cachedData` {Buffer|TypedArray|DataView} Provides an optional `Buffer` or
    `TypedArray`, or `DataView` with V8's code cache data for the supplied
    source. This must be produced by a prior call to `vm.compileFunction()`
    with the same `code` and `params`.
  * `produceCachedData` {boolean} Specifies whether to produce new cache data.
    **Default:** `false`.
  * `parsingContext` {Object} The contextified object in which the said
    function should be compiled in.
  * `contextExtensions` {Object\[]} An array containing a collection of context
    extensions (objects wrapping the current scope) to be applied while
    compiling. **Default:** `[]`.
  * `importModuleDynamically`
    {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER}
    Used to specify the how the modules should be loaded during the evaluation of
    this function when `import()` is called. This option is part of the
    experimental modules API. We do not recommend using it in a production
    environment. For detailed information, see
    Support of dynamic `import()` in compilation APIs.
* Returns: {Function}

Compiles the given code into the provided context (if no context is
supplied, the current context is used), and returns it wrapped inside a
function with the given `params`.

## `vm.constants`

* Type: {Object}

Returns an object containing commonly used constants for VM operations.

### `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER`

> Stability: 1.1 - Active development

A constant that can be used as the `importModuleDynamically` option to
`vm.Script` and `vm.compileFunction()` so that Node.js uses the default
ESM loader from the main context to load the requested module.

For detailed information, see
Support of dynamic `import()` in compilation APIs.
