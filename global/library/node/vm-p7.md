---
title: "VM (executing JavaScript) (part 7 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/vm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# VM (executing JavaScript) (part 7 of 7)

## Support of dynamic `import()` in compilation APIs

The following APIs support an `importModuleDynamically` option to enable dynamic
`import()` in code compiled by the vm module.

* `new vm.Script`
* `vm.compileFunction()`
* `new vm.SourceTextModule`
* `vm.runInThisContext()`
* `vm.runInContext()`
* `vm.runInNewContext()`
* `vm.createContext()`

This option is still part of the experimental modules API. We do not recommend
using it in a production environment.

### When the `importModuleDynamically` option is not specified or undefined

If this option is not specified, or if it's `undefined`, code containing
`import()` can still be compiled by the vm APIs, but when the compiled code is
executed and it actually calls `import()`, the result will reject with
`ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`.

### When `importModuleDynamically` is `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER`

This option is currently not supported for `vm.SourceTextModule`.

With this option, when an `import()` is initiated in the compiled code, Node.js
would use the default ESM loader from the main context to load the requested
module and return it to the code being executed.

This gives access to Node.js built-in modules such as `fs` or `http`
to the code being compiled. If the code is executed in a different context,
be aware that the objects created by modules loaded from the main context
are still from the main context and not `instanceof` built-in classes in the
new context.

```cjs
const { Script, constants } = require('node:vm');
const script = new Script(
  'import("node:fs").then(({readFile}) => readFile instanceof Function)',
  { importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER });

// false: URL loaded from the main context is not an instance of the Function
// class in the new context.
script.runInNewContext().then(console.log);
```

```mjs
import { Script, constants } from 'node:vm';

const script = new Script(
  'import("node:fs").then(({readFile}) => readFile instanceof Function)',
  { importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER });

// false: URL loaded from the main context is not an instance of the Function
// class in the new context.
script.runInNewContext().then(console.log);
```

This option also allows the script or function to load user modules:

```mjs
import { Script, constants } from 'node:vm';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';

// Write test.js and test.txt to the directory where the current script
// being run is located.
writeFileSync(resolve(import.meta.dirname, 'test.mjs'),
              'export const filename = "./test.json";');
writeFileSync(resolve(import.meta.dirname, 'test.json'),
              '{"hello": "world"}');

// Compile a script that loads test.mjs and then test.json
// as if the script is placed in the same directory.
const script = new Script(
  `(async function() {
    const { filename } = await import('./test.mjs');
    return import(filename, { with: { type: 'json' } })
  })();`,
  {
    filename: resolve(import.meta.dirname, 'test-with-default.js'),
    importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER,
  });

// { default: { hello: 'world' } }
script.runInThisContext().then(console.log);
```

```cjs
const { Script, constants } = require('node:vm');
const { resolve } = require('node:path');
const { writeFileSync } = require('node:fs');

// Write test.js and test.txt to the directory where the current script
// being run is located.
writeFileSync(resolve(__dirname, 'test.mjs'),
              'export const filename = "./test.json";');
writeFileSync(resolve(__dirname, 'test.json'),
              '{"hello": "world"}');

// Compile a script that loads test.mjs and then test.json
// as if the script is placed in the same directory.
const script = new Script(
  `(async function() {
    const { filename } = await import('./test.mjs');
    return import(filename, { with: { type: 'json' } })
  })();`,
  {
    filename: resolve(__dirname, 'test-with-default.js'),
    importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER,
  });

// { default: { hello: 'world' } }
script.runInThisContext().then(console.log);
```

There are a few caveats with loading user modules using the default loader
from the main context:

1. The module being resolved would be relative to the `filename` option passed
   to `vm.Script` or `vm.compileFunction()`. The resolution can work with a
   `filename` that's either an absolute path or a URL string.  If `filename` is
   a string that's neither an absolute path or a URL, or if it's undefined,
   the resolution will be relative to the current working directory
   of the process. In the case of `vm.createContext()`, the resolution is always
   relative to the current working directory since this option is only used when
   there isn't a referrer script or module.
2. For any given `filename` that resolves to a specific path, once the process
   manages to load a particular module from that path, the result may be cached,
   and subsequent load of the same module from the same path would return the
   same thing. If the `filename` is a URL string, the cache would not be hit
   if it has different search parameters. For `filename`s that are not URL
   strings, there is currently no way to bypass the caching behavior.

### When `importModuleDynamically` is a function

When `importModuleDynamically` is a function, it will be invoked when `import()`
is called in the compiled code for users to customize how the requested module
should be compiled and evaluated. Currently, the Node.js instance must be
launched with the `--experimental-vm-modules` flag for this option to work. If
the flag isn't set, this callback will be ignored. If the code evaluated
actually calls to `import()`, the result will reject with
`ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING_FLAG`.

The callback `importModuleDynamically(specifier, referrer, importAttributes)`
has the following signature:

* `specifier` {string} specifier passed to `import()`
* `referrer` {vm.Script|Function|vm.SourceTextModule|Object}
  The referrer is the compiled `vm.Script` for `new vm.Script`,
  `vm.runInThisContext`, `vm.runInContext` and `vm.runInNewContext`. It's the
  compiled `Function` for `vm.compileFunction`, the compiled
  `vm.SourceTextModule` for `new vm.SourceTextModule`, and the context `Object`
  for `vm.createContext()`.
* `importAttributes` {Object} The `"with"` value passed to the
  `optionsExpression` optional parameter, or an empty object if no value was
  provided.
* `phase` {string} The phase of the dynamic import (`"source"` or `"evaluation"`).
* Returns: {Module Namespace Object|vm.Module} Returning a `vm.Module` is
  recommended in order to take advantage of error tracking, and to avoid issues
  with namespaces that contain `then` function exports.

```mjs
// This script must be run with --experimental-vm-modules.
import { Script, SyntheticModule } from 'node:vm';

const script = new Script('import("foo.json", { with: { type: "json" } })', {
  async importModuleDynamically(specifier, referrer, importAttributes) {
    console.log(specifier);  // 'foo.json'
    console.log(referrer);   // The compiled script
    console.log(importAttributes);  // { type: 'json' }
    const m = new SyntheticModule(['bar'], () => { });
    await m.link(() => { });
    m.setExport('bar', { hello: 'world' });
    return m;
  },
});
const result = await script.runInThisContext();
console.log(result);  //  { bar: { hello: 'world' } }
```

```cjs
// This script must be run with --experimental-vm-modules.
const { Script, SyntheticModule } = require('node:vm');

(async function main() {
  const script = new Script('import("foo.json", { with: { type: "json" } })', {
    async importModuleDynamically(specifier, referrer, importAttributes) {
      console.log(specifier);  // 'foo.json'
      console.log(referrer);   // The compiled script
      console.log(importAttributes);  // { type: 'json' }
      const m = new SyntheticModule(['bar'], () => { });
      await m.link(() => { });
      m.setExport('bar', { hello: 'world' });
      return m;
    },
  });
  const result = await script.runInThisContext();
  console.log(result);  //  { bar: { hello: 'world' } }
})();
```
