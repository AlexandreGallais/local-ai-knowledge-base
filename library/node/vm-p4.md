---
title: "VM (executing JavaScript) (part 4 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/vm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# VM (executing JavaScript) (part 4 of 7)

## `vm.createContext([contextObject[, options]])`

* `contextObject` {Object|vm.constants.DONT\_CONTEXTIFY|undefined}
  Either `vm.constants.DONT_CONTEXTIFY` or an object that will be contextified.
  If `undefined`, an empty contextified object will be created for backwards compatibility.
* `options` {Object}
  * `name` {string} Human-readable name of the newly created context.
    **Default:** `'VM Context i'`, where `i` is an ascending numerical index of
    the created context.
  * `origin` {string} Origin corresponding to the newly created
    context for display purposes. The origin should be formatted like a URL,
    but with only the scheme, host, and port (if necessary), like the value of
    the `url.origin` property of a `URL` object. Most notably, this
    string should omit the trailing slash, as that denotes a path.
    **Default:** `''`.
  * `codeGeneration` {Object}
    * `strings` {boolean} If set to false any calls to `eval` or function
      constructors (`Function`, `GeneratorFunction`, etc) will throw an
      `EvalError`. **Default:** `true`.
    * `wasm` {boolean} If set to false any attempt to compile a WebAssembly
      module will throw a `WebAssembly.CompileError`. **Default:** `true`.
  * `microtaskMode` {string} If set to `afterEvaluate`, microtasks (tasks
    scheduled through `Promise`s and `async function`s) will be run immediately
    after a script has run through `script.runInContext()`.
    They are included in the `timeout` and `breakOnSigint` scopes in that case.
  * `importModuleDynamically`
    {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER}
    Used to specify the how the modules should be loaded when `import()` is
    called in this context without a referrer script or module. This option is
    part of the experimental modules API. We do not recommend using it in a
    production environment. For detailed information, see
    Support of dynamic `import()` in compilation APIs.
* Returns: {Object} contextified object.

If the given `contextObject` is an object, the `vm.createContext()` method will prepare that
object and return a reference to it so that it can be used in
calls to `vm.runInContext()` or `script.runInContext()`. Inside such
scripts, the global object will be wrapped by the `contextObject`, retaining all of its
existing properties but also having the built-in objects and functions any
standard global object has. Outside of scripts run by the vm module, global
variables will remain unchanged.

```mjs
import { createContext, runInContext } from 'node:vm';

global.globalVar = 3;

const context = { globalVar: 1 };
createContext(context);

runInContext('globalVar *= 2;', context);

console.log(context);
// Prints: { globalVar: 2 }

console.log(global.globalVar);
// Prints: 3
```

```cjs
const { createContext, runInContext } = require('node:vm');

global.globalVar = 3;

const context = { globalVar: 1 };
createContext(context);

runInContext('globalVar *= 2;', context);

console.log(context);
// Prints: { globalVar: 2 }

console.log(global.globalVar);
// Prints: 3
```

If `contextObject` is omitted (or passed explicitly as `undefined`), a new,
empty contextified object will be returned.

When the global object in the newly created context is contextified, it has some quirks
compared to ordinary global objects. For example, it cannot be frozen. To create a context
without the contextifying quirks, pass `vm.constants.DONT_CONTEXTIFY` as the `contextObject`
argument. See the documentation of `vm.constants.DONT_CONTEXTIFY` for details.

The `vm.createContext()` method is primarily useful for creating a single
context that can be used to run multiple scripts. For instance, if emulating a
web browser, the method can be used to create a single context representing a
window's global object, then run all `<script>` tags together within that
context.

The provided `name` and `origin` of the context are made visible through the
Inspector API.

## `vm.isContext(object)`

* `object` {Object}
* Returns: {boolean}

Returns `true` if the given `object` object has been contextified using
`vm.createContext()`, or if it's the global object of a context created
using `vm.constants.DONT_CONTEXTIFY`.

## `vm.measureMemory([options])`

> Stability: 1 - Experimental

Measure the memory known to V8 and used by all contexts known to the
current V8 isolate, or the main context.

* `options` {Object} Optional.
  * `mode` {string} Either `'summary'` or `'detailed'`. In summary mode,
    only the memory measured for the main context will be returned. In
    detailed mode, the memory measured for all contexts known to the
    current V8 isolate will be returned.
    **Default:** `'summary'`
  * `execution` {string} Either `'default'` or `'eager'`. With default
    execution, the promise will not resolve until after the next scheduled
    garbage collection starts, which may take a while (or never if the program
    exits before the next GC). With eager execution, the GC will be started
    right away to measure the memory.
    **Default:** `'default'`
* Returns: {Promise} If the memory is successfully measured, the promise will
  resolve with an object containing information about the memory usage.
  Otherwise it will be rejected with an `ERR_CONTEXT_NOT_INITIALIZED` error.

The format of the object that the returned Promise may resolve with is
specific to the V8 engine and may change from one version of V8 to the next.

The returned result is different from the statistics returned by
`v8.getHeapSpaceStatistics()` in that `vm.measureMemory()` measure the
memory reachable by each V8 specific contexts in the current instance of
the V8 engine, while the result of `v8.getHeapSpaceStatistics()` measure
the memory occupied by each heap space in the current V8 instance.

```mjs
import { createContext, measureMemory } from 'node:vm';
// Measure the memory used by the main context.
measureMemory({ mode: 'summary' })
  // This is the same as vm.measureMemory()
  .then((result) => {
    // The current format is:
    // {
    //   total: { jsMemoryEstimate: 1601828, jsMemoryRange: [1601828, 5275288] },
    //   WebAssembly: { code: 0, metadata: 33962 },
    // }
    console.log(result);
  });

const context = createContext({ a: 1 });
measureMemory({ mode: 'detailed', execution: 'eager' }).then((result) => {
  // Reference the context here so that it won't be GC'ed
  // until the measurement is complete.
  console.log('Context:', context.a);
  // {
  //   total: { jsMemoryEstimate: 1767100, jsMemoryRange: [1767100, 5440560] },
  //   WebAssembly: { code: 0, metadata: 33962 },
  //   current: { jsMemoryEstimate: 1601828, jsMemoryRange: [1601828, 5275288] },
  //   other: [{ jsMemoryEstimate: 165272, jsMemoryRange: [Array] }],
  // }
  console.log(result);
});
```

```cjs
const { createContext, measureMemory } = require('node:vm');
// Measure the memory used by the main context.
measureMemory({ mode: 'summary' })
  // This is the same as vm.measureMemory()
  .then((result) => {
    // The current format is:
    // {
    //   total: { jsMemoryEstimate: 1601828, jsMemoryRange: [1601828, 5275288] },
    //   WebAssembly: { code: 0, metadata: 33962 },
    // }
    console.log(result);
  });

const context = createContext({ a: 1 });
measureMemory({ mode: 'detailed', execution: 'eager' }).then((result) => {
  // Reference the context here so that it won't be GC'ed
  // until the measurement is complete.
  console.log('Context:', context.a);
  // {
  //   total: { jsMemoryEstimate: 1767100, jsMemoryRange: [1767100, 5440560] },
  //   WebAssembly: { code: 0, metadata: 33962 },
  //   current: { jsMemoryEstimate: 1601828, jsMemoryRange: [1601828, 5275288] },
  //   other: [{ jsMemoryEstimate: 165272, jsMemoryRange: [Array] }],
  // }
  console.log(result);
});
```

## `vm.runInContext(code, contextifiedObject[, options])`

* `code` {string} The JavaScript code to compile and run.
* `contextifiedObject` {Object} The contextified object that will be used
  as the `global` when the `code` is compiled and run.
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

The `vm.runInContext()` method compiles `code`, runs it within the context of
the `contextifiedObject`, then returns the result. Running code does not have
access to the local scope. The `contextifiedObject` object _must_ have been
previously contextified using the `vm.createContext()` method.

If `options` is a string, then it specifies the filename.

The following example compiles and executes different scripts using a single
contextified object:

```mjs
import { createContext, runInContext } from 'node:vm';

const contextObject = { globalVar: 1 };
createContext(contextObject);

for (let i = 0; i < 10; ++i) {
  runInContext('globalVar *= 2;', contextObject);
}
console.log(contextObject);
// Prints: { globalVar: 1024 }
```

```cjs
const { createContext, runInContext } = require('node:vm');

const contextObject = { globalVar: 1 };
createContext(contextObject);

for (let i = 0; i < 10; ++i) {
  runInContext('globalVar *= 2;', contextObject);
}
console.log(contextObject);
// Prints: { globalVar: 1024 }
```
