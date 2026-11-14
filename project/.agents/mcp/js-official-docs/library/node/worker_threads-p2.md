---
title: "Worker threads (part 2 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/worker_threads.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Worker threads (part 2 of 5)

## `worker_threads.receiveMessageOnPort(port)`

* `port` {MessagePort|BroadcastChannel}

* Returns: {Object|undefined}

Receive a single message from a given `MessagePort`. If no message is available,
`undefined` is returned, otherwise an object with a single `message` property
that contains the message payload, corresponding to the oldest message in the
`MessagePort`'s queue.

```mjs
import { MessageChannel, receiveMessageOnPort } from 'node:worker_threads';
const { port1, port2 } = new MessageChannel();
port1.postMessage({ hello: 'world' });

console.log(receiveMessageOnPort(port2));
// Prints: { message: { hello: 'world' } }
console.log(receiveMessageOnPort(port2));
// Prints: undefined
```

```cjs
const { MessageChannel, receiveMessageOnPort } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();
port1.postMessage({ hello: 'world' });

console.log(receiveMessageOnPort(port2));
// Prints: { message: { hello: 'world' } }
console.log(receiveMessageOnPort(port2));
// Prints: undefined
```

When this function is used, no `'message'` event is emitted and the
`onmessage` listener is not invoked.

## `worker_threads.resourceLimits`

* Type: {Object}
  * `maxYoungGenerationSizeMb` {number}
  * `maxOldGenerationSizeMb` {number}
  * `codeRangeSizeMb` {number}
  * `stackSizeMb` {number}

Provides the set of JS engine resource constraints inside this Worker thread.
If the `resourceLimits` option was passed to the `Worker` constructor,
this matches its values.

If this is used in the main thread, its value is an empty object.

## `worker_threads.SHARE_ENV`

* Type: {symbol}

A special value that can be passed as the `env` option of the `Worker`
constructor, to indicate that the current thread and the Worker thread should
share read and write access to the same set of environment variables.

```mjs
import process from 'node:process';
import { Worker, SHARE_ENV } from 'node:worker_threads';
new Worker('process.env.SET_IN_WORKER = "foo"', { eval: true, env: SHARE_ENV })
  .once('exit', () => {
    console.log(process.env.SET_IN_WORKER);  // Prints 'foo'.
  });
```

```cjs
const { Worker, SHARE_ENV } = require('node:worker_threads');
new Worker('process.env.SET_IN_WORKER = "foo"', { eval: true, env: SHARE_ENV })
  .once('exit', () => {
    console.log(process.env.SET_IN_WORKER);  // Prints 'foo'.
  });
```

## `worker_threads.setEnvironmentData(key[, value])`

* `key` {any} Any arbitrary, cloneable JavaScript value that can be used as a
  {Map} key.
* `value` {any} Any arbitrary, cloneable JavaScript value that will be cloned
  and passed automatically to all new `Worker` instances. If `value` is passed
  as `undefined`, any previously set value for the `key` will be deleted.

The `worker.setEnvironmentData()` API sets the content of
`worker.getEnvironmentData()` in the current thread and all new `Worker`
instances spawned from the current context.

## `worker_threads.threadId`

* Type: {integer}

An integer identifier for the current thread. On the corresponding worker object
(if there is any), it is available as `worker.threadId`.
This value is unique for each `Worker` instance inside a single process.

## `worker_threads.threadName`

* {string|null}

A string identifier for the current thread or null if the thread is not running.
On the corresponding worker object (if there is any), it is available as `worker.threadName`.

## `worker_threads.workerData`

An arbitrary JavaScript value that contains a clone of the data passed
to this thread's `Worker` constructor.

The data is cloned as if using `postMessage()`,
according to the HTML structured clone algorithm.

```mjs
import { Worker, isMainThread, workerData } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), { workerData: 'Hello, world!' });
} else {
  console.log(workerData);  // Prints 'Hello, world!'.
}
```

```cjs
const { Worker, isMainThread, workerData } = require('node:worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: 'Hello, world!' });
} else {
  console.log(workerData);  // Prints 'Hello, world!'.
}
```

## `worker_threads.locks`

> Stability: 1 - Experimental

* {LockManager}

An instance of a `LockManager` that can be used to coordinate
access to resources that may be shared across multiple threads within the same
process. The API mirrors the semantics of the
browser `LockManager`

### Class: `Lock`

The `Lock` interface provides information about a lock that has been granted via
`locks.request()`

#### `lock.name`

* {string}

The name of the lock.

#### `lock.mode`

* {string}

The mode of the lock. Either `shared` or `exclusive`.

### Class: `LockManager`

The `LockManager` interface provides methods for requesting and introspecting
locks. To obtain a `LockManager` instance use

```mjs
import { locks } from 'node:worker_threads';
```

```cjs
const { locks } = require('node:worker_threads');
```

This implementation matches the browser `LockManager` API.

#### `locks.request(name[, options], callback)`

* `name` {string}
* `options` {Object}
  * `mode` {string} Either `'exclusive'` or `'shared'`. **Default:** `'exclusive'`.
  * `ifAvailable` {boolean} If `true`, the request will only be granted if the
    lock is not already held. If it cannot be granted, `callback` will be
    invoked with `null` instead of a `Lock` instance. **Default:** `false`.
  * `steal` {boolean} If `true`, any existing locks with the same name are
    released and the request is granted immediately, pre-empting any queued
    requests. **Default:** `false`.
  * `signal` {AbortSignal} that can be used to abort a
    pending (but not yet granted) lock request.
* `callback` {Function} Invoked once the lock is granted (or immediately with
  `null` if `ifAvailable` is `true` and the lock is unavailable). The lock is
  released automatically when the function returns, or—if the function returns
  a promise—when that promise settles.
* Returns: {Promise} Resolves once the lock has been released.

```mjs
import { locks } from 'node:worker_threads';

await locks.request('my_resource', async (lock) => {
  // The lock has been acquired.
});
// The lock has been released here.
```

```cjs
const { locks } = require('node:worker_threads');

locks.request('my_resource', async (lock) => {
  // The lock has been acquired.
}).then(() => {
  // The lock has been released here.
});
```

#### `locks.query()`

* Returns: {Promise}

Resolves with a `LockManagerSnapshot` describing the currently held and pending
locks for the current process.

```mjs
import { locks } from 'node:worker_threads';

const snapshot = await locks.query();
for (const lock of snapshot.held) {
  console.log(`held lock: name ${lock.name}, mode ${lock.mode}`);
}
for (const pending of snapshot.pending) {
  console.log(`pending lock: name ${pending.name}, mode ${pending.mode}`);
}
```

```cjs
const { locks } = require('node:worker_threads');

locks.query().then((snapshot) => {
  for (const lock of snapshot.held) {
    console.log(`held lock: name ${lock.name}, mode ${lock.mode}`);
  }
  for (const pending of snapshot.pending) {
    console.log(`pending lock: name ${pending.name}, mode ${pending.mode}`);
  }
});
```

## Class: `BroadcastChannel extends EventTarget`

Instances of `BroadcastChannel` allow asynchronous one-to-many communication
with all other `BroadcastChannel` instances bound to the same channel name.

```mjs
import {
  isMainThread,
  BroadcastChannel,
  Worker,
} from 'node:worker_threads';

const bc = new BroadcastChannel('hello');

if (isMainThread) {
  let c = 0;
  bc.onmessage = (event) => {
    console.log(event.data);
    if (++c === 10) bc.close();
  };
  for (let n = 0; n < 10; n++)
    new Worker(new URL(import.meta.url));
} else {
  bc.postMessage('hello from every worker');
  bc.close();
}
```

```cjs
const {
  isMainThread,
  BroadcastChannel,
  Worker,
} = require('node:worker_threads');

const bc = new BroadcastChannel('hello');

if (isMainThread) {
  let c = 0;
  bc.onmessage = (event) => {
    console.log(event.data);
    if (++c === 10) bc.close();
  };
  for (let n = 0; n < 10; n++)
    new Worker(__filename);
} else {
  bc.postMessage('hello from every worker');
  bc.close();
}
```

### `new BroadcastChannel(name)`

* `name` {any} The name of the channel to connect to. Any JavaScript value
  that can be converted to a string using `` `${name}` `` is permitted.

### `broadcastChannel.close()`

Closes the `BroadcastChannel` connection.

### `broadcastChannel.onmessage`

* Type: {Function} Invoked with a single `MessageEvent` argument
  when a message is received.

### `broadcastChannel.onmessageerror`

* Type: {Function} Invoked with a received message cannot be
  deserialized.

### `broadcastChannel.postMessage(message)`

* `message` {any} Any cloneable JavaScript value.

### `broadcastChannel.ref()`

Opposite of `unref()`. Calling `ref()` on a previously `unref()`ed
BroadcastChannel does _not_ let the program exit if it's the only active handle
left (the default behavior). If the port is `ref()`ed, calling `ref()` again
has no effect.

### `broadcastChannel.unref()`

Calling `unref()` on a BroadcastChannel allows the thread to exit if this
is the only active handle in the event system. If the BroadcastChannel is
already `unref()`ed calling `unref()` again has no effect.

## Class: `MessageChannel`

Instances of the `worker.MessageChannel` class represent an asynchronous,
two-way communications channel.
The `MessageChannel` has no methods of its own. `new MessageChannel()`
yields an object with `port1` and `port2` properties, which refer to linked
`MessagePort` instances.

```mjs
import { MessageChannel } from 'node:worker_threads';

const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message));
port2.postMessage({ foo: 'bar' });
// Prints: received { foo: 'bar' } from the `port1.on('message')` listener
```

```cjs
const { MessageChannel } = require('node:worker_threads');

const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message));
port2.postMessage({ foo: 'bar' });
// Prints: received { foo: 'bar' } from the `port1.on('message')` listener
```
