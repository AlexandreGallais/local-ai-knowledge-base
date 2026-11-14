---
title: "Modules: node:module API (part 6 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/module.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: node:module API (part 6 of 8)

### Asynchronous customization hooks

> Stability: 1.1 - Active Development

#### Caveats of asynchronous customization hooks

The asynchronous customization hooks have many caveats and it is uncertain if their
issues can be resolved. Users are encouraged to use the synchronous customization hooks
via `module.registerHooks()` instead to avoid these caveats.

* Asynchronous hooks run on a separate thread, so the hook functions cannot directly
  mutate the global state of the modules being customized. It's typical to use message
  channels and atomics to pass data between the two or to affect control flows.
  See Communication with asynchronous module customization hooks.
* Asynchronous hooks do not affect all `require()` calls in the module graph.
  * Custom `require` functions created using `module.createRequire()` are not
    affected.
  * If the asynchronous `load` hook does not override the `source` for CommonJS modules
    that go through it, the child modules loaded by those CommonJS modules via built-in
    `require()` would not be affected by the asynchronous hooks either.
* There are several caveats that the asynchronous hooks need to handle when
  customizing CommonJS modules. See asynchronous `resolve` hook and
  asynchronous `load` hook for details.
* When `require()` calls inside CommonJS modules are customized by asynchronous hooks,
  Node.js may need to load the source code of the CommonJS module multiple times to maintain
  compatibility with existing CommonJS monkey-patching. If the module code changes between
  loads, this may lead to unexpected behaviors.
  * As a side effect, if both asynchronous hooks and synchronous hooks are registered and the
    asynchronous hooks choose to customize the CommonJS module, the synchronous hooks may be
    invoked multiple times for the `require()` calls in that CommonJS module.

#### Registration of asynchronous customization hooks

Asynchronous customization hooks are registered using `module.register()` which takes
a path or URL to another module that exports the asynchronous hook functions.

Similar to `registerHooks()`, `register()` can be called in a module preloaded by `--import` or
`--require`, or called directly within the entry point.

```mjs
// Use module.register() to register asynchronous hooks in a dedicated thread.
import { register } from 'node:module';
register('./hooks.mjs', import.meta.url);

// If my-app.mjs is loaded statically here as `import './my-app.mjs'`, since ESM
// dependencies are evaluated before the module that imports them,
// it's loaded _before_ the hooks are registered above and won't be affected.
// To ensure the hooks are applied, dynamic import() must be used to load ESM
// after the hooks are registered.
import('./my-app.mjs');
```

```cjs
const { register } = require('node:module');
const { pathToFileURL } = require('node:url');
// Use module.register() to register asynchronous hooks in a dedicated thread.
register('./hooks.mjs', pathToFileURL(__filename));

import('./my-app.mjs');
```

In `hooks.mjs`:

```mjs
// hooks.mjs
export async function resolve(specifier, context, nextResolve) {
  /* implementation */
}
export async function load(url, context, nextLoad) {
  /* implementation */
}
```

Unlike synchronous hooks, the asynchronous hooks would not run for these modules loaded in the file
that calls `register()`:

```mjs
// register-hooks.js
import { register, createRequire } from 'node:module';
register('./hooks.mjs', import.meta.url);

// Asynchronous hooks does not affect modules loaded via custom require()
// functions created by module.createRequire().
const userRequire = createRequire(import.meta.filename);
userRequire('./my-app-2.cjs');  // Hooks won't affect this
```

```cjs
// register-hooks.js
const { register, createRequire } = require('node:module');
const { pathToFileURL } = require('node:url');
register('./hooks.mjs', pathToFileURL(__filename));

// Asynchronous hooks does not affect modules loaded via built-in require()
// in the module calling `register()`
require('./my-app-2.cjs');  // Hooks won't affect this
// .. or custom require() functions created by module.createRequire().
const userRequire = createRequire(__filename);
userRequire('./my-app-3.cjs');  // Hooks won't affect this
```

Asynchronous hooks can also be registered using a `data:` URL with the `--import` flag:

```bash
node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("my-instrumentation", pathToFileURL("./"));' ./my-app.js
```

#### Chaining of asynchronous customization hooks

Chaining of `register()` work similarly to `registerHooks()`. If synchronous and asynchronous
hooks are mixed, the synchronous hooks are always run first before the asynchronous
hooks start running, that is, in the last synchronous hook being run, its next
hook includes invocation of the asynchronous hooks.

```mjs
// entrypoint.mjs
import { register } from 'node:module';

register('./foo.mjs', import.meta.url);
register('./bar.mjs', import.meta.url);
await import('./my-app.mjs');
```

```cjs
// entrypoint.cjs
const { register } = require('node:module');
const { pathToFileURL } = require('node:url');

const parentURL = pathToFileURL(__filename);
register('./foo.mjs', parentURL);
register('./bar.mjs', parentURL);
import('./my-app.mjs');
```

If `foo.mjs` and `bar.mjs` define a `resolve` hook, they will be called like so
(note the right-to-left, starting with `./bar.mjs`, then `./foo.mjs`, then the Node.js default):

Node.js default ← `./foo.mjs` ← `./bar.mjs`

When using the asynchronous hooks, the registered hooks also affect subsequent
`register` calls, which takes care of loading hook modules. In the example above,
`bar.mjs` will be resolved and loaded via the hooks registered by `foo.mjs`
(because `foo`'s hooks will have already been added to the chain). This allows
for things like writing hooks in non-JavaScript languages, so long as
earlier registered hooks transpile into JavaScript.

The `register()` method cannot be called from the thread running the hook module that
exports the asynchronous hooks or its dependencies.

#### Communication with asynchronous module customization hooks

Asynchronous hooks run on a dedicated thread, separate from the main
thread that runs application code. This means mutating global variables won't
affect the other thread(s), and message channels must be used to communicate
between the threads.

The `register` method can be used to pass data to an `initialize` hook. The
data passed to the hook may include transferable objects like ports.

```mjs
import { register } from 'node:module';
import { MessageChannel } from 'node:worker_threads';

// This example demonstrates how a message channel can be used to
// communicate with the hooks, by sending `port2` to the hooks.
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
  console.log(msg);
});
port1.unref();

register('./my-hooks.mjs', {
  parentURL: import.meta.url,
  data: { number: 1, port: port2 },
  transferList: [port2],
});
```

```cjs
const { register } = require('node:module');
const { pathToFileURL } = require('node:url');
const { MessageChannel } = require('node:worker_threads');

// This example showcases how a message channel can be used to
// communicate with the hooks, by sending `port2` to the hooks.
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
  console.log(msg);
});
port1.unref();

register('./my-hooks.mjs', {
  parentURL: pathToFileURL(__filename),
  data: { number: 1, port: port2 },
  transferList: [port2],
});
```

#### Asynchronous hooks accepted by `module.register()`

The `register` method can be used to register a module that exports a set of
hooks. The hooks are functions that are called by Node.js to customize the
module resolution and loading process. The exported functions must have specific
names and signatures, and they must be exported as named exports.

```mjs
export async function initialize({ number, port }) {
  // Receives data from `register`.
}

export async function resolve(specifier, context, nextResolve) {
  // Take an `import` or `require` specifier and resolve it to a URL.
}

export async function load(url, context, nextLoad) {
  // Take a resolved URL and return the source code to be evaluated.
}
```

Asynchronous hooks are run in a separate thread, isolated from the main thread where
application code runs. That means it is a different realm. The hooks thread
may be terminated by the main thread at any time, so do not depend on
asynchronous operations (like `console.log`) to complete. They are inherited into
child workers by default.

#### `initialize()`

* `data` {any} The data from `register(loader, import.meta.url, { data })`.

The `initialize` hook is only accepted by `register`. `registerHooks()` does
not support nor need it since initialization done for synchronous hooks can be run
directly before the call to `registerHooks()`.

The `initialize` hook provides a way to define a custom function that runs in
the hooks thread when the hooks module is initialized. Initialization happens
when the hooks module is registered via `register`.

This hook can receive data from a `register` invocation, including
ports and other transferable objects. The return value of `initialize` can be a
{Promise}, in which case it will be awaited before the main application thread
execution resumes.

Module customization code:

```mjs
// path-to-my-hooks.js

export async function initialize({ number, port }) {
  port.postMessage(`increment: ${number + 1}`);
}
```

Caller code:

```mjs
import assert from 'node:assert';
import { register } from 'node:module';
import { MessageChannel } from 'node:worker_threads';

// This example showcases how a message channel can be used to communicate
// between the main (application) thread and the hooks running on the hooks
// thread, by sending `port2` to the `initialize` hook.
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
  assert.strictEqual(msg, 'increment: 2');
});
port1.unref();

register('./path-to-my-hooks.js', {
  parentURL: import.meta.url,
  data: { number: 1, port: port2 },
  transferList: [port2],
});
```

```cjs
const assert = require('node:assert');
const { register } = require('node:module');
const { pathToFileURL } = require('node:url');
const { MessageChannel } = require('node:worker_threads');

// This example showcases how a message channel can be used to communicate
// between the main (application) thread and the hooks running on the hooks
// thread, by sending `port2` to the `initialize` hook.
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
  assert.strictEqual(msg, 'increment: 2');
});
port1.unref();

register('./path-to-my-hooks.js', {
  parentURL: pathToFileURL(__filename),
  data: { number: 1, port: port2 },
  transferList: [port2],
});
```

#### Asynchronous `resolve(specifier, context, nextResolve)`

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
* Returns: {Object|Promise} The asynchronous version takes either an object containing the
  following properties, or a `Promise` that will resolve to such an object.
  * `format` {string|null|undefined} A hint to the `load` hook (it might be ignored). It can be a
    module format (such as `'commonjs'` or `'module'`) or an arbitrary value like `'css'` or
    `'yaml'`.
  * `importAttributes` {Object|undefined} The import attributes to use when
    caching the module (optional; if excluded the input will be used)
  * `shortCircuit` {undefined|boolean} A signal that this hook intends to
    terminate the chain of `resolve` hooks. **Default:** `false`
  * `url` {string} The absolute URL to which this input resolves

The asynchronous version works similarly to the synchronous version, only that the
`nextResolve` function returns a `Promise`, and the `resolve` hook itself can return a `Promise`.

> **Warning** In the case of the asynchronous version, despite support for returning
> promises and async functions, calls to `resolve` may still block the main thread which
> can impact performance.

> **Warning** The `resolve` hook invoked for `require()` calls inside CommonJS modules
> customized by asynchronous hooks does not receive the original specifier passed to
> `require()`. Instead, it receives a URL already fully resolved using the default
> CommonJS resolution.

> **Warning** In the CommonJS modules that are customized by the asynchronous customization hooks,
> `require.resolve()` and `require()` will use `"import"` export condition instead of
> `"require"`, which may cause unexpected behaviors when loading dual packages.

```mjs
export async function resolve(specifier, context, nextResolve) {
  // When calling `defaultResolve`, the arguments can be modified. For example,
  // to change the specifier or add conditions.
  if (specifier.includes('foo')) {
    specifier = specifier.replace('foo', 'bar');
    return nextResolve(specifier, {
      ...context,
      conditions: [...context.conditions, 'another-condition'],
    });
  }

  // The hook can also skips default resolution and provide a custom URL.
  if (specifier === 'special-module') {
    return {
      url: 'file:///path/to/special-module.mjs',
      format: 'module',
      shortCircuit: true,  // This is mandatory if not calling nextResolve().
    };
  }

  // If no customization is needed, defer to the next hook in the chain which would be the
  // Node.js default resolve if this is the last user-specified loader.
  return nextResolve(specifier);
}
```

#### Asynchronous `load(url, context, nextLoad)`
