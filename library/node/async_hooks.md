---
title: "Async hooks (part 1 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/async_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Async hooks

> Stability: 1 - Experimental. Please migrate away from this API, if you can.
> We do not recommend using the `createHook`, `AsyncHook`, and
> `executionAsyncResource` APIs as they have usability issues, safety risks,
> and performance implications. Async context tracking use cases are better
> served by the stable `AsyncLocalStorage` API. If you have a use case for
> `createHook`, `AsyncHook`, or `executionAsyncResource` beyond the context
> tracking need solved by `AsyncLocalStorage` or diagnostics data currently
> provided by Diagnostics Channel, please open an issue at
> <https://github.com/nodejs/node/issues> describing your use case so we can
> create a more purpose-focused API.

We strongly discourage the use of the `async_hooks` API.
Other APIs that can cover most of its use cases include:

* `AsyncLocalStorage` tracks async context
* `process.getActiveResourcesInfo()` tracks active resources

The `node:async_hooks` module provides an API to track asynchronous resources.
It can be accessed using:

```mjs
import async_hooks from 'node:async_hooks';
```

```cjs
const async_hooks = require('node:async_hooks');
```

## Terminology

An asynchronous resource represents an object with an associated callback.
This callback may be called multiple times, such as the `'connection'`
event in `net.createServer()`, or just a single time like in `fs.open()`.
A resource can also be closed before the callback is called. `AsyncHook` does
not explicitly distinguish between these different cases but will represent them
as the abstract concept that is a resource.

If `Worker`s are used, each thread has an independent `async_hooks`
interface, and each thread will use a new set of async IDs.

## Overview

Following is a simple overview of the public API.

```mjs
import async_hooks from 'node:async_hooks';

// Return the ID of the current execution context.
const eid = async_hooks.executionAsyncId();

// Return the ID of the handle responsible for triggering the callback of the
// current execution scope to call.
const tid = async_hooks.triggerAsyncId();

// Create a new AsyncHook instance. All of these callbacks are optional.
const asyncHook =
    async_hooks.createHook({ init, before, after, destroy, promiseResolve });

// Allow callbacks of this AsyncHook instance to call. This is not an implicit
// action after running the constructor, and must be explicitly run to begin
// executing callbacks.
asyncHook.enable();

// Disable listening for new asynchronous events.
asyncHook.disable();

//
// The following are the callbacks that can be passed to createHook().
//

// init() is called during object construction. The resource may not have
// completed construction when this callback runs. Therefore, all fields of the
// resource referenced by "asyncId" may not have been populated.
function init(asyncId, type, triggerAsyncId, resource) { }

// before() is called just before the resource's callback is called. It can be
// called 0-N times for handles (such as TCPWrap), and will be called exactly 1
// time for requests (such as FSReqCallback).
function before(asyncId) { }

// after() is called just after the resource's callback has finished.
function after(asyncId) { }

// destroy() is called when the resource is destroyed.
function destroy(asyncId) { }

// promiseResolve() is called only for promise resources, when the
// resolve() function passed to the Promise constructor is invoked
// (either directly or through other means of resolving a promise).
function promiseResolve(asyncId) { }
```

```cjs
const async_hooks = require('node:async_hooks');

// Return the ID of the current execution context.
const eid = async_hooks.executionAsyncId();

// Return the ID of the handle responsible for triggering the callback of the
// current execution scope to call.
const tid = async_hooks.triggerAsyncId();

// Create a new AsyncHook instance. All of these callbacks are optional.
const asyncHook =
    async_hooks.createHook({ init, before, after, destroy, promiseResolve });

// Allow callbacks of this AsyncHook instance to call. This is not an implicit
// action after running the constructor, and must be explicitly run to begin
// executing callbacks.
asyncHook.enable();

// Disable listening for new asynchronous events.
asyncHook.disable();

//
// The following are the callbacks that can be passed to createHook().
//

// init() is called during object construction. The resource may not have
// completed construction when this callback runs. Therefore, all fields of the
// resource referenced by "asyncId" may not have been populated.
function init(asyncId, type, triggerAsyncId, resource) { }

// before() is called just before the resource's callback is called. It can be
// called 0-N times for handles (such as TCPWrap), and will be called exactly 1
// time for requests (such as FSReqCallback).
function before(asyncId) { }

// after() is called just after the resource's callback has finished.
function after(asyncId) { }

// destroy() is called when the resource is destroyed.
function destroy(asyncId) { }

// promiseResolve() is called only for promise resources, when the
// resolve() function passed to the Promise constructor is invoked
// (either directly or through other means of resolving a promise).
function promiseResolve(asyncId) { }
```

## `async_hooks.createHook(options)`

* `options` {Object} The Hook Callbacks to register
  * `init` {Function} The `init` callback.
  * `before` {Function} The `before` callback.
  * `after` {Function} The `after` callback.
  * `destroy` {Function} The `destroy` callback.
  * `promiseResolve` {Function} The `promiseResolve` callback.
  * `trackPromises` {boolean} Whether the hook should track `Promise`s. Cannot be `false` if
    `promiseResolve` is set. **Default**: `true`.
* Returns: {AsyncHook} Instance used for disabling and enabling hooks

Registers functions to be called for different lifetime events of each async
operation.

The callbacks `init()`/`before()`/`after()`/`destroy()` are called for the
respective asynchronous event during a resource's lifetime.

All callbacks are optional. For example, if only resource cleanup needs to
be tracked, then only the `destroy` callback needs to be passed. The
specifics of all functions that can be passed to `callbacks` is in the
Hook Callbacks section.

```mjs
import { createHook } from 'node:async_hooks';

const asyncHook = createHook({
  init(asyncId, type, triggerAsyncId, resource) { },
  destroy(asyncId) { },
});
```

```cjs
const async_hooks = require('node:async_hooks');

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) { },
  destroy(asyncId) { },
});
```

The callbacks will be inherited via the prototype chain:

```js
class MyAsyncCallbacks {
  init(asyncId, type, triggerAsyncId, resource) { }
  destroy(asyncId) {}
}

class MyAddedCallbacks extends MyAsyncCallbacks {
  before(asyncId) { }
  after(asyncId) { }
}

const asyncHook = async_hooks.createHook(new MyAddedCallbacks());
```

Because promises are asynchronous resources whose lifecycle is tracked
via the async hooks mechanism, the `init()`, `before()`, `after()`, and
`destroy()` callbacks _must not_ be async functions that return promises.

### Error handling

If any `AsyncHook` callbacks throw, the application will print the stack trace
and exit. The exit path does follow that of an uncaught exception, but
all `'uncaughtException'` listeners are removed, thus forcing the process to
exit. The `'exit'` callbacks will still be called unless the application is run
with `--abort-on-uncaught-exception`, in which case a stack trace will be
printed and the application exits, leaving a core file.

The reason for this error handling behavior is that these callbacks are running
at potentially volatile points in an object's lifetime, for example during
class construction and destruction. Because of this, it is deemed necessary to
bring down the process quickly in order to prevent an unintentional abort in the
future. This is subject to change in the future if a comprehensive analysis is
performed to ensure an exception can follow the normal control flow without
unintentional side effects.

### Printing in `AsyncHook` callbacks

Because printing to the console is an asynchronous operation, `console.log()`
will cause `AsyncHook` callbacks to be called. Using `console.log()` or
similar asynchronous operations inside an `AsyncHook` callback function will
cause an infinite recursion. An easy solution to this when debugging is to use a
synchronous logging operation such as `fs.writeFileSync(file, msg, flag)`.
This will print to the file and will not invoke `AsyncHook` recursively because
it is synchronous.

```mjs
import { writeFileSync } from 'node:fs';
import { format } from 'node:util';

function debug(...args) {
  // Use a function like this one when debugging inside an AsyncHook callback
  writeFileSync('log.out', `${format(...args)}\n`, { flag: 'a' });
}
```

```cjs
const fs = require('node:fs');
const util = require('node:util');

function debug(...args) {
  // Use a function like this one when debugging inside an AsyncHook callback
  fs.writeFileSync('log.out', `${util.format(...args)}\n`, { flag: 'a' });
}
```

If an asynchronous operation is needed for logging, it is possible to keep
track of what caused the asynchronous operation using the information
provided by `AsyncHook` itself. The logging should then be skipped when
it was the logging itself that caused the `AsyncHook` callback to be called. By
doing this, the otherwise infinite recursion is broken.
