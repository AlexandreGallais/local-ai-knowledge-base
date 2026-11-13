---
title: "Async hooks (part 2 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/async_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Async hooks (part 2 of 3)

## Class: `AsyncHook`

The class `AsyncHook` exposes an interface for tracking lifetime events
of asynchronous operations.

### `asyncHook.enable()`

* Returns: {AsyncHook} A reference to `asyncHook`.

Enable the callbacks for a given `AsyncHook` instance. If no callbacks are
provided, enabling is a no-op.

The `AsyncHook` instance is disabled by default. If the `AsyncHook` instance
should be enabled immediately after creation, the following pattern can be used.

```mjs
import { createHook } from 'node:async_hooks';

const hook = createHook(callbacks).enable();
```

```cjs
const async_hooks = require('node:async_hooks');

const hook = async_hooks.createHook(callbacks).enable();
```

### `asyncHook.disable()`

* Returns: {AsyncHook} A reference to `asyncHook`.

Disable the callbacks for a given `AsyncHook` instance from the global pool of
`AsyncHook` callbacks to be executed. Once a hook has been disabled it will not
be called again until enabled.

For API consistency `disable()` also returns the `AsyncHook` instance.

### Hook callbacks

Key <example-value> in the lifetime of asynchronous events have been categorized into
four areas: instantiation, before/after the callback is called, and when the
instance is destroyed.

#### `init(asyncId, type, triggerAsyncId, resource)`

* `asyncId` {number} A unique ID for the async resource.
* `type` {string} The type of the async resource.
* `triggerAsyncId` {number} The unique ID of the async resource in whose
  execution context this async resource was created.
* `resource` {Object} Reference to the resource representing the async
  operation, needs to be released during _destroy_.

Called when a class is constructed that has the _possibility_ to emit an
asynchronous event. This _does not_ mean the instance must call
`before`/`after` before `destroy` is called, only that the possibility
exists.

This behavior can be observed by doing something like opening a resource then
closing it before the resource can be used. The following snippet demonstrates
this.

```mjs
import { createServer } from 'node:net';

createServer().listen(function() { this.close(); });
// OR
clearTimeout(setTimeout(() => {}, 10));
```

```cjs
require('node:net').createServer().listen(function() { this.close(); });
// OR
clearTimeout(setTimeout(() => {}, 10));
```

Every new resource is assigned an ID that is unique within the scope of the
current Node.js instance.

##### `type`

The `type` is a string identifying the type of resource that caused
`init` to be called. Generally, it will correspond to the name of the
resource's constructor.

The `type` of resources created by Node.js itself can change in any Node.js
release. Valid values include `TLSWRAP`,
`TCPWRAP`, `TCPSERVERWRAP`, `GETADDRINFOREQWRAP`, `FSREQCALLBACK`,
`Microtask`, and `Timeout`. Inspect the source code of the Node.js version used
to get the full list.

Furthermore users of `AsyncResource` create async resources independent
of Node.js itself.

There is also the `PROMISE` resource type, which is used to track `Promise`
instances and asynchronous work scheduled by them. The `Promise`s are only
tracked when `trackPromises` option is set to `true`.

Users are able to define their own `type` when using the public embedder API.

It is possible to have type name collisions. Embedders are encouraged to use
unique prefixes, such as the npm package name, to prevent collisions when
listening to the hooks.

##### `triggerAsyncId`

`triggerAsyncId` is the `asyncId` of the resource that caused (or "triggered")
the new resource to initialize and that caused `init` to call. This is different
from `async_hooks.executionAsyncId()` that only shows _when_ a resource was
created, while `triggerAsyncId` shows _why_ a resource was created.

The following is a simple demonstration of `triggerAsyncId`:

```mjs
import { createHook, executionAsyncId } from 'node:async_hooks';
import { stdout } from 'node:process';
import net from 'node:net';
import fs from 'node:fs';

createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = executionAsyncId();
    fs.writeSync(
      stdout.fd,
      `${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
}).enable();

net.createServer((conn) => {}).listen(8080);
```

```cjs
const { createHook, executionAsyncId } = require('node:async_hooks');
const { stdout } = require('node:process');
const net = require('node:net');
const fs = require('node:fs');

createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = executionAsyncId();
    fs.writeSync(
      stdout.fd,
      `${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
}).enable();

net.createServer((conn) => {}).listen(8080);
```

Output when hitting the server with `nc localhost 8080`:

```console
TCPSERVERWRAP(5): trigger: 1 execution: 1
TCPWRAP(7): trigger: 5 execution: 0
```

The `TCPSERVERWRAP` is the server which receives the connections.

The `TCPWRAP` is the new connection from the client. When a new
connection is made, the `TCPWrap` instance is immediately constructed. This
happens outside of any JavaScript stack. (An `executionAsyncId()` of `0` means
that it is being executed from C++ with no JavaScript stack above it.) With only
that information, it would be impossible to link resources together in
terms of what caused them to be created, so `triggerAsyncId` is given the task
of propagating what resource is responsible for the new resource's existence.

##### `resource`

`resource` is an object that represents the actual async resource that has
been initialized. The API to access the object may be specified by the
creator of the resource. Resources created by Node.js itself are internal
and may change at any time. Therefore no API is specified for these.

In some cases the resource object is reused for performance reasons, it is
thus not safe to use it as a key in a `WeakMap` or add properties to it.

##### Asynchronous context example

The context tracking use case is covered by the stable API `AsyncLocalStorage`.
This example only illustrates async hooks operation but `AsyncLocalStorage`
fits better to this use case.

The following is an example with additional information about the calls to
`init` between the `before` and `after` calls, specifically what the
callback to `listen()` will look like. The output formatting is slightly more
elaborate to make calling context easier to see.

```mjs
import async_hooks from 'node:async_hooks';
import fs from 'node:fs';
import net from 'node:net';
import { stdout } from 'node:process';
const { fd } = stdout;

let indent = 0;
async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = async_hooks.executionAsyncId();
    const indentStr = ' '.repeat(indent);
    fs.writeSync(
      fd,
      `${indentStr}${type}(${asyncId}):` +
      ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
  before(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}before:  ${asyncId}\n`);
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}after:  ${asyncId}\n`);
  },
  destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}destroy:  ${asyncId}\n`);
  },
}).enable();

net.createServer(() => {}).listen(8080, () => {
  // Let's wait 10ms before logging the server started.
  setTimeout(() => {
    console.log('>>>', async_hooks.executionAsyncId());
  }, 10);
});
```

```cjs
const async_hooks = require('node:async_hooks');
const fs = require('node:fs');
const net = require('node:net');
const { fd } = process.stdout;

let indent = 0;
async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = async_hooks.executionAsyncId();
    const indentStr = ' '.repeat(indent);
    fs.writeSync(
      fd,
      `${indentStr}${type}(${asyncId}):` +
      ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
  before(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}before:  ${asyncId}\n`);
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}after:  ${asyncId}\n`);
  },
  destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}destroy:  ${asyncId}\n`);
  },
}).enable();

net.createServer(() => {}).listen(8080, () => {
  // Let's wait 10ms before logging the server started.
  setTimeout(() => {
    console.log('>>>', async_hooks.executionAsyncId());
  }, 10);
});
```

Output from only starting the server:

```console
TCPSERVERWRAP(5): trigger: 1 execution: 1
TickObject(6): trigger: 5 execution: 1
before:  6
  Timeout(7): trigger: 6 execution: 6
after:   6
destroy: 6
before:  7
>>> 7
  TickObject(8): trigger: 7 execution: 7
after:   7
before:  8
after:   8
```

As illustrated in the example, `executionAsyncId()` and `execution` each specify
the value of the current execution context; which is delineated by calls to
`before` and `after`.

Only using `execution` to graph resource allocation results in the following:

```console
  root(1)
     ^
     |
TickObject(6)
     ^
     |
 Timeout(7)
```

The `TCPSERVERWRAP` is not part of this graph, even though it was the reason for
`console.log()` being called. This is because binding to a port without a host
name is a _synchronous_ operation, but to maintain a completely asynchronous
API the user's callback is placed in a `process.nextTick()`. Which is why
`TickObject` is present in the output and is a 'parent' for `.listen()`
callback.

The graph only shows _when_ a resource was created, not _why_, so to track
the _why_ use `triggerAsyncId`. Which can be represented with the following
graph:

```console
 bootstrap(1)
     |
     ˅
TCPSERVERWRAP(5)
     |
     ˅
 TickObject(6)
     |
     ˅
  Timeout(7)
```

#### `before(asyncId)`

* `asyncId` {number}

When an asynchronous operation is initiated (such as a TCP server receiving a
new connection) or completes (such as writing data to disk) a callback is
called to notify the user. The `before` callback is called just before said
callback is executed. `asyncId` is the unique identifier assigned to the
resource about to execute the callback.

The `before` callback will be called 0 to N times. The `before` callback
will typically be called 0 times if the asynchronous operation was cancelled
or, for example, if no connections are received by a TCP server. Persistent
asynchronous resources like a TCP server will typically call the `before`
callback multiple times, while other operations like `fs.open()` will call
it only once.

#### `after(asyncId)`

* `asyncId` {number}

Called immediately after the callback specified in `before` is completed.

If an uncaught exception occurs during execution of the callback, then `after`
will run _after_ the `'uncaughtException'` event is emitted or a `domain`'s
handler runs.

#### `destroy(asyncId)`

* `asyncId` {number}

Called after the resource corresponding to `asyncId` is destroyed. It is also
called asynchronously from the embedder API `emitDestroy()`.

Some resources depend on garbage collection for cleanup, so if a reference is
made to the `resource` object passed to `init` it is possible that `destroy`
will never be called, causing a memory leak in the application. If the resource
does not depend on garbage collection, then this will not be an issue.

Using the destroy hook results in additional overhead because it enables
tracking of `Promise` instances via the garbage collector.

#### `promiseResolve(asyncId)`

* `asyncId` {number}

Called when the `resolve` function passed to the `Promise` constructor is
invoked (either directly or through other means of resolving a promise).

`resolve()` does not do any observable synchronous work.

The `Promise` is not necessarily fulfilled or rejected at this point if the
`Promise` was resolved by assuming the state of another `Promise`.

```js
new Promise((resolve) => resolve(true)).then((a) => {});
```

calls the following callbacks:

```text
init for PROMISE with id 5, trigger id: 1
  promise resolve 5      # corresponds to resolve(true)
init for PROMISE with id 6, trigger id: 5  # the Promise returned by then()
  before 6               # the then() callback is entered
  promise resolve 6      # the then() callback resolves the promise by returning
  after 6
```
