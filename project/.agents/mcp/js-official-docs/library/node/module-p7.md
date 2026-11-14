---
title: "Modules: node:module API (part 7 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/module.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: node:module API (part 7 of 8)

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

* Returns: {Promise} The asynchronous version takes either an object containing the
  following properties, or a `Promise` that will resolve to such an object.
  * `format` {string}
  * `shortCircuit` {undefined|boolean} A signal that this hook intends to
    terminate the chain of `load` hooks. **Default:** `false`
  * `source` {string|ArrayBuffer|TypedArray} The source for Node.js to evaluate

> **Warning**: The asynchronous `load` hook and namespaced exports from CommonJS
> modules are incompatible. Attempting to use them together will result in an empty
> object from the import. This may be addressed in the future. This does not apply
> to the synchronous `load` hook, in which case exports can be used as usual.

The asynchronous version works similarly to the synchronous version, though
when using the asynchronous `load` hook, omitting vs providing a `source` for
`'commonjs'` has very different effects:

* When a `source` is provided, all `require` calls from this module will be
  processed by the ESM loader with registered `resolve` and `load` hooks; all
  `require.resolve` calls from this module will be processed by the ESM loader
  with registered `resolve` hooks; only a subset of the CommonJS API will be
  available (e.g. no `require.extensions`, no `require.cache`, no
  `require.resolve.paths`) and monkey-patching on the CommonJS module loader
  will not apply.
* If `source` is undefined or `null`, it will be handled by the CommonJS module
  loader and `require`/`require.resolve` calls will not go through the
  registered hooks. This behavior for nullish `source` is temporary — in the
  future, nullish `source` will not be supported.

These caveats do not apply to the synchronous `load` hook, in which case
the complete set of CommonJS APIs available to the customized CommonJS
modules, and `require`/`require.resolve` always go through the registered
hooks.

The Node.js internal asynchronous `load` implementation, which is the value of `next` for the
last hook in the `load` chain, returns `null` for `source` when `format` is
`'commonjs'` for backward compatibility. Here is an example hook that would
opt-in to using the non-default behavior:

```mjs
import { readFile } from 'node:fs/promises';

// Asynchronous version accepted by module.register(). This fix is not needed
// for the synchronous version accepted by module.registerHooks().
export async function load(url, context, nextLoad) {
  const result = await nextLoad(url, context);
  if (result.format === 'commonjs') {
    result.source ??= await readFile(new URL(result.responseURL ?? url));
  }
  return result;
}
```

This doesn't apply to the synchronous `load` hook either, in which case the
`source` returned contains source code loaded by the next hook, regardless
of module format.

### Examples

The various module customization hooks can be used together to accomplish
wide-ranging customizations of the Node.js code loading and evaluation
behaviors.

#### Import from HTTPS

The hook below registers hooks to enable rudimentary support for such
specifiers. While this may seem like a significant improvement to Node.js core
functionality, there are substantial downsides to actually using these hooks:
performance is much slower than loading files from disk, there is no caching,
and there is no security.

```mjs
// https-hooks.mjs
import { get } from 'node:https';

export function load(url, context, nextLoad) {
  // For JavaScript to be loaded over the network, we need to fetch and
  // return it.
  if (url.startsWith('https://')) {
    return new Promise((resolve, reject) => {
      get(url, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve({
          // This example assumes all network-provided JavaScript is ES module
          // code.
          format: 'module',
          shortCircuit: true,
          source: data,
        }));
      }).on('error', (err) => reject(err));
    });
  }

  // Let Node.js handle all other URLs.
  return nextLoad(url);
}
```

```mjs
// main.mjs
import { VERSION } from 'https://coffeescript.org/browser-compiler-modern/coffeescript.js';

console.log(VERSION);
```

With the preceding hooks module, running
`node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./https-hooks.mjs"));' ./main.mjs`
prints the current version of CoffeeScript per the module at the URL in
`main.mjs`.

#### Transpilation

Sources that are in formats Node.js doesn't understand can be converted into
JavaScript using the `load` hook.

This is less performant than transpiling source files before running Node.js;
transpiler hooks should only be used for development and testing purposes.

##### Asynchronous version

```mjs
// coffeescript-hooks.mjs
import { readFile } from 'node:fs/promises';
import { findPackageJSON } from 'node:module';
import coffeescript from 'coffeescript';

const extensionsRegex = /\.(coffee|litcoffee|coffee\.md)$/;

export async function load(url, context, nextLoad) {
  if (extensionsRegex.test(url)) {
    // CoffeeScript files can be either CommonJS or ES modules. Use a custom format
    // to tell Node.js not to detect its module type.
    const { source: rawSource } = await nextLoad(url, { ...context, format: 'coffee' });
    // This hook converts CoffeeScript source code into JavaScript source code
    // for all imported CoffeeScript files.
    const transformedSource = coffeescript.compile(rawSource.toString(), url);

    // To determine how Node.js would interpret the transpilation result,
    // search up the file system for the nearest parent package.json file
    // and read its "type" field.
    return {
      format: await getPackageType(url),
      shortCircuit: true,
      source: transformedSource,
    };
  }

  // Let Node.js handle all other URLs.
  return nextLoad(url, context);
}

async function getPackageType(url) {
  // `url` is only a file path during the first iteration when passed the
  // resolved url from the load() hook
  // an actual file path from load() will contain a file extension as it's
  // required by the spec
  // this simple truthy check for whether `url` contains a file extension will
  // work for most projects but does not cover some edge-cases (such as
  // extensionless files or a url ending in a trailing space)
  const pJson = findPackageJSON(url);

  return readFile(pJson, 'utf8')
    .then(JSON.parse)
    .then((json) => json?.type)
    .catch(() => undefined);
}
```

##### Synchronous version

```mjs
// coffeescript-sync-hooks.mjs
import { readFileSync } from 'node:fs';
import { registerHooks, findPackageJSON } from 'node:module';
import coffeescript from 'coffeescript';

const extensionsRegex = /\.(coffee|litcoffee|coffee\.md)$/;

function load(url, context, nextLoad) {
  if (extensionsRegex.test(url)) {
    const { source: rawSource } = nextLoad(url, { ...context, format: 'coffee' });
    const transformedSource = coffeescript.compile(rawSource.toString(), url);

    return {
      format: getPackageType(url),
      shortCircuit: true,
      source: transformedSource,
    };
  }

  return nextLoad(url, context);
}

function getPackageType(url) {
  const pJson = findPackageJSON(url);
  if (!pJson) {
    return undefined;
  }
  try {
    const file = readFileSync(pJson, 'utf-8');
    return JSON.parse(file)?.type;
  } catch {
    return undefined;
  }
}

registerHooks({ load });
```

#### Running hooks

```coffee
# main.coffee
import { scream } from './scream.coffee'
console.log scream 'hello, world'

import { version } from 'node:process'
console.log "Brought to you by Node.js version #{version}"
```

```coffee
# scream.coffee
export scream = (str) -> str.toUpperCase()
```

For the sake of running the example, add a `package.json` file containing the
module type of the CoffeeScript files.

```json
{
  "type": "module"
}
```

This is only for running the example. In real world loaders, `getPackageType()` must be
able to return an `format` known to Node.js even in the absence of an explicit type in a
`package.json`, or otherwise the `nextLoad` call would throw `ERR_UNKNOWN_FILE_EXTENSION`
(if undefined) or `ERR_UNKNOWN_MODULE_FORMAT` (if it's not a known format listed in
the load hook documentation).

With the preceding hooks modules, running
`node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./coffeescript-hooks.mjs"));' ./main.coffee`
or `node --import ./coffeescript-sync-hooks.mjs ./main.coffee`
causes `main.coffee` to be turned into JavaScript after its source code is
loaded from disk but before Node.js executes it; and so on for any `.coffee`,
`.litcoffee` or `.coffee.md` files referenced via `import` statements of any
loaded file.

#### Import maps

The previous two examples defined `load` hooks. This is an example of a
`resolve` hook. This hooks module reads an `import-map.json` file that defines
which specifiers to override to other URLs (this is a very simplistic
implementation of a small subset of the "import maps" specification).

##### Asynchronous version

```mjs
// import-map-hooks.js
import fs from 'node:fs/promises';

const { imports } = JSON.parse(await fs.readFile('import-map.json'));

export async function resolve(specifier, context, nextResolve) {
  if (Object.hasOwn(imports, specifier)) {
    return nextResolve(imports[specifier], context);
  }

  return nextResolve(specifier, context);
}
```

##### Synchronous version

```mjs
// import-map-sync-hooks.js
import fs from 'node:fs/promises';
import module from 'node:module';

const { imports } = JSON.parse(fs.readFileSync('import-map.json', 'utf-8'));

function resolve(specifier, context, nextResolve) {
  if (Object.hasOwn(imports, specifier)) {
    return nextResolve(imports[specifier], context);
  }

  return nextResolve(specifier, context);
}

module.registerHooks({ resolve });
```

##### Using the hooks

With these files:

```mjs
// main.js
import 'a-module';
```

```json
// import-map.json
{
  "imports": {
    "a-module": "./some-module.js"
  }
}
```

```mjs
// some-module.js
console.log('some module!');
```

Running `node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./import-map-hooks.js"));' main.js`
or `node --import ./import-map-sync-hooks.js main.js`
should print `some module!`.
