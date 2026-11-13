---
title: "VM (executing JavaScript) (part 5 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/vm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# VM (executing JavaScript) (part 5 of 7)

## `vm.runInNewContext(code[, contextObject[, options]])`

* `code` {string} The JavaScript code to compile and run.
* `contextObject` {Object|vm.constants.DONT\_CONTEXTIFY|undefined}
  Either `vm.constants.DONT_CONTEXTIFY` or an object that will be contextified.
  If `undefined`, an empty contextified object will be created for backwards compatibility.
* `options` {Object|string}
  * `filename` {string} Specifies the filename used in stack traces produced
    by this script. **Default:** `'evalmachine.<anonymous>'`.
  * `lineOffset` {number} Specifies the line number offset that is displayed
    in stack traces produced by this script. **Default:** `0`.
  * `columnOffset` {number} Specifies the first-line column number offset that
    is displayed in stack traces produced by this script. **Default:** `0`.
  * `displayErrors` {boolean} When `true`, if an `Error` occurs
    while compiling the `code`, the line of code causing the error is attached
    to the stack trace. **Default:** `true`.
  * `timeout` {integer} Specifies the number of milliseconds to execute `code`
    before terminating execution. If execution is terminated, an `Error`
    will be thrown. This value must be a strictly positive integer.
  * `breakOnSigint` {boolean} If `true`, receiving `SIGINT`
    (`Ctrl`+`C`) will terminate execution and throw an
    `Error`. Existing handlers for the event that have been attached via
    `process.on('SIGINT')` are disabled during script execution, but continue to
    work after that. **Default:** `false`.
  * `contextName` {string} Human-readable name of the newly created context.
    **Default:** `'VM Context i'`, where `i` is an ascending numerical index of
    the created context.
  * `contextOrigin` {string} Origin corresponding to the newly
    created context for display purposes. The origin should be formatted like a
    URL, but with only the scheme, host, and port (if necessary), like the
    value of the `url.origin` property of a `URL` object. Most notably,
    this string should omit the trailing slash, as that denotes a path.
    **Default:** `''`.
  * `contextCodeGeneration` {Object}
    * `strings` {boolean} If set to false any calls to `eval` or function
      constructors (`Function`, `GeneratorFunction`, etc) will throw an
      `EvalError`. **Default:** `true`.
    * `wasm` {boolean} If set to false any attempt to compile a WebAssembly
      module will throw a `WebAssembly.CompileError`. **Default:** `true`.
  * `cachedData` {Buffer|TypedArray|DataView} Provides an optional `Buffer` or
    `TypedArray`, or `DataView` with V8's code cache data for the supplied
    source.
  * `importModuleDynamically`
    {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER}
    Used to specify the how the modules should be loaded during the evaluation
    of this script when `import()` is called. This option is part of the
    experimental modules API. We do not recommend using it in a production
    environment. For detailed information, see
    Support of dynamic `import()` in compilation APIs.
  * `microtaskMode` {string} If set to `afterEvaluate`, microtasks (tasks
    scheduled through `Promise`s and `async function`s) will be run immediately
    after the script has run. They are included in the `timeout` and
    `breakOnSigint` scopes in that case.
* Returns: {any} the result of the very last statement executed in the script.

This method is a shortcut to
`(new vm.Script(code, options)).runInContext(vm.createContext(options), options)`.
If `options` is a string, then it specifies the filename.

It does several things at once:

1. Creates a new context.
2. If `contextObject` is an object, contextifies it with the new context.
   If `contextObject` is undefined, creates a new object and contextifies it.
   If `contextObject` is `vm.constants.DONT_CONTEXTIFY`, don't contextify anything.
3. Compiles the code as a `vm.Script`
4. Runs the compiled code within the created context. The code does not have access to the scope in
   which this method is called.
5. Returns the result.

The following example compiles and executes code that increments a global
variable and sets a new one. These globals are contained in the `contextObject`.

```mjs
import { runInNewContext, constants } from 'node:vm';

const contextObject = {
  animal: 'cat',
  count: 2,
};

runInNewContext('count += 1; name = "kitty"', contextObject);
console.log(contextObject);
// Prints: { animal: 'cat', count: 3, name: 'kitty' }

// This would throw if the context is created from a contextified object.
// vm.constants.DONT_CONTEXTIFY allows creating contexts with ordinary global objects that
// can be frozen.
const frozenContext = runInNewContext(
  'Object.freeze(globalThis); globalThis;',
  constants.DONT_CONTEXTIFY,
);
```

```cjs
const { runInNewContext, constants } = require('node:vm');

const contextObject = {
  animal: 'cat',
  count: 2,
};

runInNewContext('count += 1; name = "kitty"', contextObject);
console.log(contextObject);
// Prints: { animal: 'cat', count: 3, name: 'kitty' }

// This would throw if the context is created from a contextified object.
// vm.constants.DONT_CONTEXTIFY allows creating contexts with ordinary global objects that
// can be frozen.
const frozenContext = runInNewContext(
  'Object.freeze(globalThis); globalThis;',
  constants.DONT_CONTEXTIFY,
);
```

## `vm.runInThisContext(code[, options])`

* `code` {string} The JavaScript code to compile and run.
* `options` {Object|string}
  * `filename` {string} Specifies the filename used in stack traces produced
    by this script. **Default:** `'evalmachine.<anonymous>'`.
  * `lineOffset` {number} Specifies the line number offset that is displayed
    in stack traces produced by this script. **Default:** `0`.
  * `columnOffset` {number} Specifies the first-line column number offset that
    is displayed in stack traces produced by this script. **Default:** `0`.
  * `displayErrors` {boolean} When `true`, if an `Error` occurs
    while compiling the `code`, the line of code causing the error is attached
    to the stack trace. **Default:** `true`.
  * `timeout` {integer} Specifies the number of milliseconds to execute `code`
    before terminating execution. If execution is terminated, an `Error`
    will be thrown. This value must be a strictly positive integer.
  * `breakOnSigint` {boolean} If `true`, receiving `SIGINT`
    (`Ctrl`+`C`) will terminate execution and throw an
    `Error`. Existing handlers for the event that have been attached via
    `process.on('SIGINT')` are disabled during script execution, but continue to
    work after that. **Default:** `false`.
  * `cachedData` {Buffer|TypedArray|DataView} Provides an optional `Buffer` or
    `TypedArray`, or `DataView` with V8's code cache data for the supplied
    source.
  * `importModuleDynamically`
    {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER}
    Used to specify the how the modules should be loaded during the evaluation
    of this script when `import()` is called. This option is part of the
    experimental modules API. We do not recommend using it in a production
    environment. For detailed information, see
    Support of dynamic `import()` in compilation APIs.
* Returns: {any} the result of the very last statement executed in the script.

`vm.runInThisContext()` compiles `code`, runs it within the context of the
current `global` and returns the result. Running code does not have access to
local scope, but does have access to the current `global` object.

If `options` is a string, then it specifies the filename.

The following example illustrates using both `vm.runInThisContext()` and
the JavaScript `eval()` function to run the same code:

```mjs
import { runInThisContext } from 'node:vm';
let localVar = 'initial value';

const vmResult = runInThisContext('localVar = "vm";');
console.log(`vmResult: '${vmResult}', localVar: '${localVar}'`);
// Prints: vmResult: 'vm', localVar: 'initial value'

const evalResult = eval('localVar = "eval";');
console.log(`evalResult: '${evalResult}', localVar: '${localVar}'`);
// Prints: evalResult: 'eval', localVar: 'eval'
```

```cjs
const { runInThisContext } = require('node:vm');
let localVar = 'initial value';

const vmResult = runInThisContext('localVar = "vm";');
console.log(`vmResult: '${vmResult}', localVar: '${localVar}'`);
// Prints: vmResult: 'vm', localVar: 'initial value'

const evalResult = eval('localVar = "eval";');
console.log(`evalResult: '${evalResult}', localVar: '${localVar}'`);
// Prints: evalResult: 'eval', localVar: 'eval'
```

Because `vm.runInThisContext()` does not have access to the local scope,
`localVar` is unchanged. In contrast, a direct `eval()` call _does_ have access
to the local scope, so the value `localVar` is changed. In this way
`vm.runInThisContext()` is much like an indirect `eval()` call, e.g.
`(0,eval)('code')`.

## Example: Running an HTTP server within a VM

When using either `script.runInThisContext()` or
`vm.runInThisContext()`, the code is executed within the current V8 global
context. The code passed to this VM context will have its own isolated scope.

In order to run a simple web server using the `node:http` module the code passed
to the context must either call `require('node:http')` on its own, or have a
reference to the `node:http` module passed to it. For instance:

```mjs
import { runInThisContext } from 'node:vm';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const code = `
((require) => {
  const { createServer } = require('node:http');

  createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\\n');
  }).listen(8124);

  console.log('Server running at http://127.0.0.1:8124/');
})`;

runInThisContext(code)(require);
```

```cjs
const { runInThisContext } = require('node:vm');

const code = `
((require) => {
  const { createServer } = require('node:http');

  createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\\n');
  }).listen(8124);

  console.log('Server running at http://127.0.0.1:8124/');
})`;

runInThisContext(code)(require);
```

The `require()` in the above case shares the state with the context it is
passed from. This may introduce risks when untrusted code is executed, e.g.
altering objects in the context in unwanted ways.
