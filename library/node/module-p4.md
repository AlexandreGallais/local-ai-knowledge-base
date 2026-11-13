---
title: "Modules: node:module API (part 4 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/module.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: node:module API (part 4 of 8)

### Synchronous customization hooks

> Stability: 1.2 - Release candidate

#### Registration of synchronous customization hooks

To register synchronous customization hooks, use `module.registerHooks()`, which
takes synchronous hook functions directly in-line.

```mjs
// register-hooks.js
import { registerHooks } from 'node:module';
registerHooks({
  resolve(specifier, context, nextResolve) { /* implementation */ },
  load(url, context, nextLoad) { /* implementation */ },
});
```

```cjs
// register-hooks.js
const { registerHooks } = require('node:module');
registerHooks({
  resolve(specifier, context, nextResolve) { /* implementation */ },
  load(url, context, nextLoad) { /* implementation */ },
});
```

##### Registering hooks before application code runs with flags

The hooks can be registered before the application code is run by using the
`--import` or `--require` flag:

```bash
node --import ./register-hooks.js ./my-app.js
node --require ./register-hooks.js ./my-app.js
```

The specifier passed to `--import` or `--require` can also come from a package:

```bash
node --import some-package/register ./my-app.js
node --require some-package/register ./my-app.js
```

Where `some-package` has an `"exports"` field defining the `/register`
export to map to a file that calls `registerHooks()`, like the
`register-hooks.js` examples above.

Using `--import` or `--require` ensures that the hooks are registered before any
application code is loaded, including the entry point of the application and for
any worker threads by default as well.

##### Registering hooks before application code runs programmatically

Alternatively, `registerHooks()` can be called from the entry point.

If the entry point needs to load other modules and the loading process needs to be
customized, load them using either `require()` or dynamic `import()` after the hooks
are registered. Do not use static `import` statements to load modules that need to be
customized in the same module that registers the hooks, because static `import` statements
are evaluated before any code in the importer module is run, including the call to
`registerHooks()`, regardless of where the static `import` statements appear in the importer
module.

```mjs
import { registerHooks } from 'node:module';

registerHooks({ /* implementation of synchronous hooks */ });

// If loaded using static import, the hooks would not be applied when loading
// my-app.mjs, because statically imported modules are all executed before its
// importer regardless of where the static import appears.
// import './my-app.mjs';

// my-app.mjs must be loaded dynamically to ensure the hooks are applied.
await import('./my-app.mjs');
```

```cjs
const { registerHooks } = require('node:module');

registerHooks({ /* implementation of synchronous hooks */ });

import('./my-app.mjs');
// Or, if my-app.mjs does not have top-level await or it's a CommonJS module,
// require() can also be used:
// require('./my-app.mjs');
```

##### Registering hooks before application code runs with a `data:` URL

Alternatively, inline JavaScript code can be embedded in `data:` URLs to register
the hooks before the application code runs. For example,

```bash
node --import 'data:text/javascript,import {registerHooks} from "node:module"; registerHooks(/* hooks code */);' ./my-app.js
```

#### Convention of hooks and chaining

Hooks are part of a chain, even if that chain consists of only one
custom (user-provided) hook and the default hook, which is always present.

Hook functions nest: each one must always return a plain object, and chaining happens
as a result of each function calling `next<hookName>()`, which is a reference to
the subsequent loader's hook (in LIFO order).

It's possible to call `registerHooks()` more than once:

```mjs
// entrypoint.mjs
import { registerHooks } from 'node:module';

const hook1 = { /* implementation of hooks */ };
const hook2 = { /* implementation of hooks */ };
// hook2 runs before hook1.
registerHooks(hook1);
registerHooks(hook2);
```

```cjs
// entrypoint.cjs
const { registerHooks } = require('node:module');

const hook1 = { /* implementation of hooks */ };
const hook2 = { /* implementation of hooks */ };
// hook2 runs before hook1.
registerHooks(hook1);
registerHooks(hook2);
```

In this example, the registered hooks will form chains. These chains run
last-in, first-out (LIFO). If both `hook1` and `hook2` define a `resolve`
hook, they will be called like so (note the right-to-left,
starting with `hook2.resolve`, then `hook1.resolve`, then the Node.js default):

Node.js default `resolve` ← `hook1.resolve` ← `hook2.resolve`

The same applies to all the other hooks.

A hook that returns a value lacking a required property triggers an exception. A
hook that returns without calling `next<hookName>()` _and_ without returning
`shortCircuit: true` also triggers an exception. These errors are to help
prevent unintentional breaks in the chain. Return `shortCircuit: true` from a
hook to signal that the chain is intentionally ending at your hook.

If a hook should be applied when loading other hook modules, the other hook
modules should be loaded after the hook is registered.

#### Deregistration of synchronous customization hooks

The object returned by `registerHooks()` has a `deregister()` method that can be
used to remove the hooks from the chain. Once `deregister()` is called, the hooks
will no longer be invoked during module resolution or loading.

This is currently only available for synchronous hooks registered via `registerHooks()`, not for asynchronous
hooks registered via `module.register()`.

```mjs
import { registerHooks } from 'node:module';

const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    console.log('resolve hook called for', specifier);
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    return nextLoad(url, context);
  },
});

// At this point, the hooks are active and will be called for
// any subsequent import() or require() calls.
await import('./my-module.mjs');

// Later, remove the hooks from the chain.
hooks.deregister();

// Subsequent loads will no longer trigger the hooks.
await import('./another-module.mjs');
```

```cjs
const { registerHooks } = require('node:module');

const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    console.log('resolve hook called for', specifier);
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    return nextLoad(url, context);
  },
});

// At this point, the hooks are active and will be called for
// any subsequent require() calls.
require('./my-module.cjs');

// Later, remove the hooks from the chain.
hooks.deregister();

// Subsequent loads will no longer trigger the hooks.
require('./another-module.cjs');
```

#### Hook functions accepted by `module.registerHooks()`

The `module.registerHooks()` method accepts the following synchronous hook functions.

```mjs
function resolve(specifier, context, nextResolve) {
  // Take an `import` or `require` specifier and resolve it to a URL.
}

function load(url, context, nextLoad) {
  // Take a resolved URL and return the source code to be evaluated.
}
```

Synchronous hooks are run in the same thread and the same realm where the modules
are loaded, the code in the hook function can pass values to the modules being referenced
directly via global variables or other shared states.

Unlike the asynchronous hooks, the synchronous hooks are not inherited into child worker
threads by default, though if the hooks are registered using a file preloaded by
`--import` or `--require`, child worker threads can inherit the preloaded scripts
via `process.execArgv` inheritance. See the documentation of `Worker` for details.

#### Synchronous `resolve(specifier, context, nextResolve)`

* `specifier` {string}
* `context` {Object}
  * `conditions` {string\[]} Export conditions of the relevant `package.json`
  * `importAttributes` {Object} An object whose key-value pairs represent the
    attributes for the module to import
  * `parentURL` {string|undefined} The module importing this one, or undefined
    if this is the Node.js entry point
* `nextResolve` {Function} The subsequent `resolve` hook in the chain, or the
  Node.js default `resolve` hook after the last user-supplied `resolve` hook
  * `specifier` {string}
  * `context` {Object|undefined} When omitted, the defaults are provided. When provided, defaults
    are merged in with preference to the provided properties.
* Returns: {Object}
  * `format` {string|null|undefined} A hint to the `load` hook (it might be ignored). It can be a
    module format (such as `'commonjs'` or `'module'`) or an arbitrary value like `'css'` or
    `'yaml'`.
  * `importAttributes` {Object|undefined} The import attributes to use when
    caching the module (optional; if excluded the input will be used)
  * `shortCircuit` {undefined|boolean} A signal that this hook intends to
    terminate the chain of `resolve` hooks. **Default:** `false`
  * `url` {string} The absolute URL to which this input resolves

The `resolve` hook chain is responsible for telling Node.js where to find and
how to cache a given `import` statement or expression, or `require` call. It can
optionally return a format (such as `'module'`) as a hint to the `load` hook. If
a format is specified, the `load` hook is ultimately responsible for providing
the final `format` value (and it is free to ignore the hint provided by
`resolve`); if `resolve` provides a `format`, a custom `load` hook is required
even if only to pass the value to the Node.js default `load` hook.

Import type attributes are part of the cache key for saving loaded modules into
the internal module cache. The `resolve` hook is responsible for returning an
`importAttributes` object if the module should be cached with different
attributes than were present in the source code.

The `conditions` property in `context` is an array of conditions that will be used
to match package exports conditions for this resolution
request. They can be used for looking up conditional mappings elsewhere or to
modify the list when calling the default resolution logic.

The current package exports conditions are always in
the `context.conditions` array passed into the hook. To guarantee _default
Node.js module specifier resolution behavior_ when calling `defaultResolve`, the
`context.conditions` array passed to it _must_ include _all_ elements of the
`context.conditions` array originally passed into the `resolve` hook.

```mjs
import { registerHooks } from 'node:module';

function resolve(specifier, context, nextResolve) {
  // When calling `defaultResolve`, the arguments can be modified. For example,
  // to change the specifier or to add applicable export conditions.
  if (specifier.includes('foo')) {
    specifier = specifier.replace('foo', 'bar');
    return nextResolve(specifier, {
      ...context,
      conditions: [...context.conditions, 'another-condition'],
    });
  }

  // The hook can also skip default resolution and provide a custom URL.
  if (specifier === 'special-module') {
    return {
      url: 'file:///path/to/special-module.mjs',
      format: 'module',
      shortCircuit: true,  // This is mandatory if nextResolve() is not called.
    };
  }

  // If no customization is needed, defer to the next hook in the chain which would be the
  // Node.js default resolve if this is the last user-specified loader.
  return nextResolve(specifier);
}

registerHooks({ resolve });
```

#### Synchronous `load(url, context, nextLoad)`

* `url` {string} The URL returned by the `resolve` chain
* `context` {Object}
  * `conditions` {string\[]} Export conditions of the relevant `package.json`
  * `format` {string|null|undefined} The format optionally supplied by the
    `resolve` hook chain. This can be any string value as an input; input values do not need to
    conform to the list of acceptable return values described below.
  * `importAttributes` {Object}
* `nextLoad` {Function} The subsequent `load` hook in the chain, or the
  Node.js default `load` hook after the last user-supplied `load` hook
  * `url` {string}
  * `context` {Object|undefined} When omitted, defaults are provided. When provided, defaults are
    merged in with preference to the provided properties. In the default `nextLoad`, if
    the module pointed to by `url` does not have explicit module type information,
    `context.format` is mandatory.

* Returns: {Object}
  * `format` {string} One of the acceptable module formats listed below.
  * `shortCircuit` {undefined|boolean} A signal that this hook intends to
    terminate the chain of `load` hooks. **Default:** `false`
  * `source` {string|ArrayBuffer|TypedArray} The source for Node.js to evaluate

The `load` hook provides a way to define a custom method for retrieving the
source code of a resolved URL. This would allow a loader to potentially avoid
reading files from disk. It could also be used to map an unrecognized format to
a supported one, for example `yaml` to `module`.

```mjs
import { registerHooks } from 'node:module';
import { Buffer } from 'node:buffer';

function load(url, context, nextLoad) {
  // The hook can skip default loading and provide a custom source code.
  if (url === 'special-module') {
    return {
      source: 'export const special = 42;',
      format: 'module',
      shortCircuit: true,  // This is mandatory if nextLoad() is not called.
    };
  }

  // It's possible to modify the source code loaded by the next - possibly default - step,
  // for example, replacing 'foo' with 'bar' in the source code of the module.
  const result = nextLoad(url, context);
  const source = typeof result.source === 'string' ?
    result.source : Buffer.from(result.source).toString('utf8');
  return {
    source: source.replace(/foo/g, 'bar'),
    ...result,
  };
}

registerHooks({ load });
```

In a more advanced scenario, this can also be used to transform an unsupported
source to a supported one (see Examples below).

##### Accepted final formats returned by `load`

The final value of `format` must be one of the following:
