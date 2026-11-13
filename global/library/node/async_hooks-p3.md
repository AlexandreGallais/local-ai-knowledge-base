---
title: "Async hooks (part 3 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/async_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Async hooks (part 3 of 3)

### `async_hooks.executionAsyncResource()`

* Returns: {Object} The resource representing the current execution.
  Useful to store data within the resource.

Resource objects returned by `executionAsyncResource()` are most often internal
Node.js handle objects with undocumented APIs. Using any functions or properties
on the object is likely to crash your application and should be avoided.

Using `executionAsyncResource()` in the top-level execution context will
return an empty object as there is no handle or request object to use,
but having an object representing the top-level can be helpful.

```mjs
import { open } from 'node:fs';
import { executionAsyncId, executionAsyncResource } from 'node:async_hooks';

console.log(executionAsyncId(), executionAsyncResource());  // 1 {}
open(new URL(import.meta.url), 'r', (err, fd) => {
  console.log(executionAsyncId(), executionAsyncResource());  // 7 FSReqWrap
});
```

```cjs
const { open } = require('node:fs');
const { executionAsyncId, executionAsyncResource } = require('node:async_hooks');

console.log(executionAsyncId(), executionAsyncResource());  // 1 {}
open(__filename, 'r', (err, fd) => {
  console.log(executionAsyncId(), executionAsyncResource());  // 7 FSReqWrap
});
```

This can be used to implement continuation local storage without the
use of a tracking `Map` to store the metadata:

```mjs
import { createServer } from 'node:http';
import {
  executionAsyncId,
  executionAsyncResource,
  createHook,
} from 'node:async_hooks';
const sym = Symbol('state'); // Private symbol to avoid pollution

createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    const cr = executionAsyncResource();
    if (cr) {
      resource[sym] = cr[sym];
    }
  },
}).enable();

const server = createServer((req, res) => {
  executionAsyncResource()[sym] = { state: req.url };
  setTimeout(function() {
    res.end(JSON.stringify(executionAsyncResource()[sym]));
  }, 100);
}).listen(3000);
```

```cjs
const { createServer } = require('node:http');
const {
  executionAsyncId,
  executionAsyncResource,
  createHook,
} = require('node:async_hooks');
const sym = Symbol('state'); // Private symbol to avoid pollution

createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    const cr = executionAsyncResource();
    if (cr) {
      resource[sym] = cr[sym];
    }
  },
}).enable();

const server = createServer((req, res) => {
  executionAsyncResource()[sym] = { state: req.url };
  setTimeout(function() {
    res.end(JSON.stringify(executionAsyncResource()[sym]));
  }, 100);
}).listen(3000);
```

### `async_hooks.executionAsyncId()`

* Returns: {number} The `asyncId` of the current execution context. Useful to
  track when something calls.

```mjs
import { executionAsyncId } from 'node:async_hooks';
import fs from 'node:fs';

console.log(executionAsyncId());  // 1 - bootstrap
const path = '.';
fs.open(path, 'r', (err, fd) => {
  console.log(executionAsyncId());  // 6 - open()
});
```

```cjs
const async_hooks = require('node:async_hooks');
const fs = require('node:fs');

console.log(async_hooks.executionAsyncId());  // 1 - bootstrap
const path = '.';
fs.open(path, 'r', (err, fd) => {
  console.log(async_hooks.executionAsyncId());  // 6 - open()
});
```

The ID returned from `executionAsyncId()` is related to execution timing, not
causality (which is covered by `triggerAsyncId()`):

```js
const server = net.createServer((conn) => {
  // Returns the ID of the server, not of the new connection, because the
  // callback runs in the execution scope of the server's MakeCallback().
  async_hooks.executionAsyncId();

}).listen(port, () => {
  // Returns the ID of a TickObject (process.nextTick()) because all
  // callbacks passed to .listen() are wrapped in a nextTick().
  async_hooks.executionAsyncId();
});
```

Promise contexts may not get precise `executionAsyncIds` by default.
See the section on promise execution tracking.

### `async_hooks.triggerAsyncId()`

* Returns: {number} The ID of the resource responsible for calling the callback
  that is currently being executed.

```js
const server = net.createServer((conn) => {
  // Returns the triggerAsyncId of the server, not of the new connection,
  // because the callback runs in the execution scope of the server's
  // MakeCallback().
  async_hooks.triggerAsyncId();

}).listen(port, () => {
  // Even though all callbacks passed to .listen() are wrapped in a nextTick()
  // the callback itself exists because the call to the server's .listen()
  // was made. So the return value would be the ID of the server.
  async_hooks.triggerAsyncId();
});
```

Promise contexts may not get valid `triggerAsyncId`s by default. See
the section on promise execution tracking.

### `async_hooks.asyncWrapProviders`

* Returns: A map of provider types to the corresponding numeric id.
  This map contains all the event types that might be emitted by the `async_hooks.init()` event.

This feature suppresses the deprecated usage of `process.binding('async_wrap').Providers`.
See: DEP0111

## Promise execution tracking

By default, promise executions are not assigned `asyncId`s due to the relatively
expensive nature of the promise introspection API provided by
V8. This means that programs using promises or `async`/`await` will not get
correct execution and trigger ids for promise callback contexts by default.

```mjs
import { executionAsyncId, triggerAsyncId } from 'node:async_hooks';

Promise.resolve(1729).then(() => {
  console.log(`eid ${executionAsyncId()} tid ${triggerAsyncId()}`);
});
// produces:
// eid 1 tid 0
```

```cjs
const { executionAsyncId, triggerAsyncId } = require('node:async_hooks');

Promise.resolve(1729).then(() => {
  console.log(`eid ${executionAsyncId()} tid ${triggerAsyncId()}`);
});
// produces:
// eid 1 tid 0
```

Observe that the `then()` callback claims to have executed in the context of the
outer scope even though there was an asynchronous hop involved. Also,
the `triggerAsyncId` value is `0`, which means that we are missing context about
the resource that caused (triggered) the `then()` callback to be executed.

Installing async hooks via `async_hooks.createHook` enables promise execution
tracking:

```mjs
import { createHook, executionAsyncId, triggerAsyncId } from 'node:async_hooks';
createHook({ init() {} }).enable(); // forces PromiseHooks to be enabled.
Promise.resolve(1729).then(() => {
  console.log(`eid ${executionAsyncId()} tid ${triggerAsyncId()}`);
});
// produces:
// eid 7 tid 6
```

```cjs
const { createHook, executionAsyncId, triggerAsyncId } = require('node:async_hooks');

createHook({ init() {} }).enable(); // forces PromiseHooks to be enabled.
Promise.resolve(1729).then(() => {
  console.log(`eid ${executionAsyncId()} tid ${triggerAsyncId()}`);
});
// produces:
// eid 7 tid 6
```

In this example, adding any actual hook function enabled the tracking of
promises. There are two promises in the example above; the promise created by
`Promise.resolve()` and the promise returned by the call to `then()`. In the
example above, the first promise got the `asyncId` `6` and the latter got
`asyncId` `7`. During the execution of the `then()` callback, we are executing
in the context of promise with `asyncId` `7`. This promise was triggered by
async resource `6`.

Another subtlety with promises is that `before` and `after` callbacks are run
only on chained promises. That means promises not created by `then()`/`catch()`
will not have the `before` and `after` callbacks fired on them. For more details
see the details of the V8 PromiseHooks API.

### Disabling promise execution tracking

Tracking promise execution can cause a significant performance overhead.
To opt out of promise tracking, set `trackPromises` to `false`:

```cjs
const { createHook } = require('node:async_hooks');
const { writeSync } = require('node:fs');
createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    // This init hook does not get called when trackPromises is set to false.
    writeSync(1, `init hook triggered for ${type}\n`);
  },
  trackPromises: false,  // Do not track promises.
}).enable();
Promise.resolve(1729);
```

```mjs
import { createHook } from 'node:async_hooks';
import { writeSync } from 'node:fs';

createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    // This init hook does not get called when trackPromises is set to false.
    writeSync(1, `init hook triggered for ${type}\n`);
  },
  trackPromises: false,  // Do not track promises.
}).enable();
Promise.resolve(1729);
```

## JavaScript embedder API

Library developers that handle their own asynchronous resources performing tasks
like I/O, connection pooling, or managing callback queues may use the
`AsyncResource` JavaScript API so that all the appropriate callbacks are called.

### Class: `AsyncResource`

The documentation for this class has moved `AsyncResource`.

## Class: `AsyncLocalStorage`

The documentation for this class has moved `AsyncLocalStorage`.
