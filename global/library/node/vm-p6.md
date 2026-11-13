---
title: "VM (executing JavaScript) (part 6 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/vm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# VM (executing JavaScript) (part 6 of 7)

## What does it mean to "contextify" an object?

All JavaScript executed within Node.js runs within the scope of a "context".
According to the V8 Embedder's Guide:

> In V8, a context is an execution environment that allows separate, unrelated,
> JavaScript applications to run in a single instance of V8. You must explicitly
> specify the context in which you want any JavaScript code to be run.

When the method `vm.createContext()` is called with an object, the `contextObject` argument
will be used to wrap the global object of a new instance of a V8 Context
(if `contextObject` is `undefined`, a new object will be created from the current context
before its contextified). This V8 Context provides the `code` run using the `node:vm`
module's methods with an isolated global environment within which it can operate.
The process of creating the V8 Context and associating it with the `contextObject`
in the outer context is what this document refers to as "contextifying" the object.

The contextifying would introduce some quirks to the `globalThis` value in the context.
For example, it cannot be frozen, and it is not reference equal to the `contextObject`
in the outer context.

```mjs
import { createContext, runInContext } from 'node:vm';

// An undefined `contextObject` option makes the global object contextified.
const context = createContext();
console.log(runInContext('globalThis', context) === context);  // false
// A contextified global object cannot be frozen.
try {
  runInContext('Object.freeze(globalThis);', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // TypeError: Cannot freeze
}
console.log(runInContext('globalThis.foo = 1; foo;', context));  // 1
```

```cjs
const { createContext, runInContext } = require('node:vm');

// An undefined `contextObject` option makes the global object contextified.
const context = createContext();
console.log(runInContext('globalThis', context) === context);  // false
// A contextified global object cannot be frozen.
try {
  runInContext('Object.freeze(globalThis);', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // TypeError: Cannot freeze
}
console.log(runInContext('globalThis.foo = 1; foo;', context));  // 1
```

To create a context with an ordinary global object and get access to a global proxy in
the outer context with fewer quirks, specify `vm.constants.DONT_CONTEXTIFY` as the
`contextObject` argument.

### `vm.constants.DONT_CONTEXTIFY`

This constant, when used as the `contextObject` argument in vm APIs, instructs Node.js to create
a context without wrapping its global object with another object in a Node.js-specific manner.
As a result, the `globalThis` value inside the new context would behave more closely to an ordinary
one.

```mjs
import { createContext, runInContext, constants } from 'node:vm';

// Use vm.constants.DONT_CONTEXTIFY to freeze the global object.
const context = createContext(constants.DONT_CONTEXTIFY);
runInContext('Object.freeze(globalThis);', context);
try {
  runInContext('bar = 1; bar;', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // ReferenceError: bar is not defined
}
```

```cjs
const { createContext, runInContext, constants } = require('node:vm');

// Use vm.constants.DONT_CONTEXTIFY to freeze the global object.
const context = createContext(constants.DONT_CONTEXTIFY);
runInContext('Object.freeze(globalThis);', context);
try {
  runInContext('bar = 1; bar;', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // ReferenceError: bar is not defined
}
```

When `vm.constants.DONT_CONTEXTIFY` is used as the `contextObject` argument to `vm.createContext()`,
the returned object is a proxy-like object to the global object in the newly created context with
fewer Node.js-specific quirks. It is reference equal to the `globalThis` value in the new context,
can be modified from outside the context, and can be used to access built-ins in the new context directly.

```mjs
import { createContext, runInContext, constants } from 'node:vm';

const context = createContext(constants.DONT_CONTEXTIFY);

// Returned object is reference equal to globalThis in the new context.
console.log(runInContext('globalThis', context) === context);  // true

// Can be used to access globals in the new context directly.
console.log(context.Array);  // [Function: Array]
runInContext('foo = 1;', context);
console.log(context.foo);  // 1
context.bar = 1;
console.log(runInContext('bar;', context));  // 1

// Can be frozen and it affects the inner context.
Object.freeze(context);
try {
  runInContext('baz = 1; baz;', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // ReferenceError: baz is not defined
}
```

```cjs
const { createContext, runInContext, constants } = require('node:vm');

const context = createContext(constants.DONT_CONTEXTIFY);

// Returned object is reference equal to globalThis in the new context.
console.log(runInContext('globalThis', context) === context);  // true

// Can be used to access globals in the new context directly.
console.log(context.Array);  // [Function: Array]
runInContext('foo = 1;', context);
console.log(context.foo);  // 1
context.bar = 1;
console.log(runInContext('bar;', context));  // 1

// Can be frozen and it affects the inner context.
Object.freeze(context);
try {
  runInContext('baz = 1; baz;', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // ReferenceError: baz is not defined
}
```

## Timeout interactions with asynchronous tasks and Promises

`Promise`s and `async function`s can schedule tasks run by the JavaScript
engine asynchronously. By default, these tasks are run after all JavaScript
functions on the current stack are done executing.
This allows escaping the functionality of the `timeout` and
`breakOnSigint` options.

For example, the following code executed by `vm.runInNewContext()` with a
timeout of 5 milliseconds schedules an infinite loop to run after a promise
resolves. The scheduled loop is never interrupted by the timeout:

```mjs
import { runInNewContext } from 'node:vm';

function loop() {
  console.log('entering loop');
  while (1) console.log(Date.now());
}

runInNewContext(
  'Promise.resolve().then(() => loop());',
  { loop, console },
  { timeout: 5 },
);
// This is printed *before* 'entering infinite loop' (!)
console.log('done executing');
```

```cjs
const { runInNewContext } = require('node:vm');

function loop() {
  console.log('entering loop');
  while (1) console.log(Date.now());
}

runInNewContext(
  'Promise.resolve().then(() => loop());',
  { loop, console },
  { timeout: 5 },
);
// This is printed *before* 'entering infinite loop' (!)
console.log('done executing');
```

This can be addressed by passing `microtaskMode: 'afterEvaluate'` to the code
that creates the `Context`:

```mjs
import { runInNewContext } from 'node:vm';

function loop() {
  while (1) console.log(Date.now());
}

runInNewContext(
  'Promise.resolve().then(() => loop());',
  { loop, console },
  { timeout: 5, microtaskMode: 'afterEvaluate' },
);
```

```cjs
const { runInNewContext } = require('node:vm');

function loop() {
  while (1) console.log(Date.now());
}

runInNewContext(
  'Promise.resolve().then(() => loop());',
  { loop, console },
  { timeout: 5, microtaskMode: 'afterEvaluate' },
);
```

In this case, the microtask scheduled through `promise.then()` will be run
before returning from `vm.runInNewContext()`, and will be interrupted
by the `timeout` functionality. This applies only to code running in a
`vm.Context`, so e.g. `vm.runInThisContext()` does not take this option.

Promise callbacks are entered into the microtask queue of the context in which
they were created. For example, if `() => loop()` is replaced with just `loop`
in the above example, then `loop` will be pushed into the global microtask
queue, because it is a function from the outer (main) context, and thus will
also be able to escape the timeout.

If asynchronous scheduling functions such as `process.nextTick()`,
`queueMicrotask()`, `setTimeout()`, `setImmediate()`, etc. are made available
inside a `vm.Context`, functions passed to them will be added to global queues,
which are shared by all contexts. Therefore, callbacks passed to those functions
are not controllable through the timeout either.

### When `microtaskMode` is `'afterEvaluate'`, beware sharing Promises between Contexts

In `'afterEvaluate'` mode, the `Context` has its own microtask queue, separate
from the global microtask queue used by the outer (main) context. While this
mode is necessary to enforce `timeout` and enable `breakOnSigint` with
asynchronous tasks, it also makes sharing promises between contexts challenging.

In the example below, a promise is created in the inner context and shared with
the outer context. When the outer context `await` on the promise, the execution
flow of the outer context is disrupted in a surprising way: the log statement
is never executed.

```mjs
import { createContext, runInContext } from 'node:vm';

const inner_context = createContext({}, { microtaskMode: 'afterEvaluate' });

// runInContext() returns a Promise created in the inner context.
const inner_promise = runInContext('Promise.resolve()', inner_context);

// As part of performing `await`, the JavaScript runtime must enqueue a task
// on the microtask queue of the context where `inner_promise` was created.
// A task is added on the inner microtask queue, but **it will not be run
// automatically**: this task will remain pending indefinitely.
//
// Since the outer microtask queue is empty, execution in the outer module
// falls through, and the log statement below is never executed.
await inner_promise;

console.log('this will NOT be printed');
```

```cjs
const { createContext, runInContext } = require('node:vm');

// runInContext() returns a Promise created in the inner context.
const inner_context = createContext({}, { microtaskMode: 'afterEvaluate' });

(async () => {
  const inner_promise = runInContext('Promise.resolve()', inner_context);

  // As part of performing `await`, the JavaScript runtime must enqueue a task
  // on the microtask queue of the context where `inner_promise` was created.
  // A task is added on the inner microtask queue, but **it will not be run
  // automatically**: this task will remain pending indefinitely.
  //
  // Since the outer microtask queue is empty, execution in the outer module
  // falls through, and the log statement below is never executed.
  await inner_promise;

  console.log('this will NOT be printed');
})();
```

To successfully share promises between contexts with different microtask queues,
it is necessary to ensure that tasks on the inner microtask queue will be run
**whenever** the outer context enqueues a task on the inner microtask queue.

The tasks on the microtask queue of a given context are run whenever
`runInContext()` or `SourceTextModule.evaluate()` are invoked on a script or
module using this context. In our example, the normal execution flow can be
restored by scheduling a second call to `runInContext()` _before_ `await
inner_promise`.

```mjs
// Schedule `runInContext()` to manually drain the inner context microtask
// queue; it will run after the `await` statement below.
setImmediate(() => {
  vm.runInContext('', context);
});

await inner_promise;

console.log('OK');
```

**Note:** Strictly speaking, in this mode, `node:vm` departs from the letter of
the ECMAScript specification for enqueuing jobs, by allowing asynchronous
tasks from different contexts to run in a different order than they were
enqueued.
