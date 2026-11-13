---
title: "Worker threads (part 1 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/worker_threads.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Worker threads

> Stability: 2 - Stable

The `node:worker_threads` module enables the use of threads that execute
JavaScript in parallel. To access it:

```mjs
import worker_threads from 'node:worker_threads';
```

```cjs
const worker_threads = require('node:worker_threads');
```

Workers (threads) are useful for performing CPU-intensive JavaScript operations.
They do not help much with I/O-intensive work. The Node.js built-in
asynchronous I/O operations are more efficient than Workers can be.

Unlike `child_process` or `cluster`, `worker_threads` can share memory. They do
so by transferring `ArrayBuffer` instances or sharing `SharedArrayBuffer`
instances.

```mjs
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from 'node:worker_threads';

if (!isMainThread) {
  const { parse } = await import('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
}

export default function parseJSAsync(script) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL(import.meta.url), {
      workerData: script,
    });
    worker.on('message', resolve);
    worker.once('error', reject);
    worker.once('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};
```

```cjs
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('node:worker_threads');

if (isMainThread) {
  module.exports = function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script,
      });
      worker.on('message', resolve);
      worker.once('error', reject);
      worker.once('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  const { parse } = require('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
}
```

The above example spawns a Worker thread for each `parseJSAsync()` call. In
practice, use a pool of Workers for these kinds of tasks. Otherwise, the
overhead of creating Workers would likely exceed their benefit.

When implementing a worker pool, use the `AsyncResource` API to inform
diagnostic tools (e.g. to provide asynchronous stack traces) about the
correlation between tasks and their outcomes. See
"Using `AsyncResource` for a `Worker` thread pool"
in the `async_hooks` documentation for an example implementation.

Worker threads inherit non-process-specific options by default. Refer to
`Worker constructor options` to know how to customize worker thread options,
specifically `argv` and `execArgv` options.

## `worker_threads.getEnvironmentData(key)`

* `key` {any} Any arbitrary, cloneable JavaScript value that can be used as a
  {Map} key.
* Returns: {any}

Within a worker thread, `worker.getEnvironmentData()` returns a clone
of data passed to the spawning thread's `worker.setEnvironmentData()`.
Every new `Worker` receives its own copy of the environment data
automatically.

```mjs
import {
  Worker,
  isMainThread,
  setEnvironmentData,
  getEnvironmentData,
} from 'node:worker_threads';

if (isMainThread) {
  setEnvironmentData('Hello', 'World!');
  const worker = new Worker(new URL(import.meta.url));
} else {
  console.log(getEnvironmentData('Hello'));  // Prints 'World!'.
}
```

```cjs
const {
  Worker,
  isMainThread,
  setEnvironmentData,
  getEnvironmentData,
} = require('node:worker_threads');

if (isMainThread) {
  setEnvironmentData('Hello', 'World!');
  const worker = new Worker(__filename);
} else {
  console.log(getEnvironmentData('Hello'));  // Prints 'World!'.
}
```

## `worker_threads.isInternalThread`

* Type: {boolean}

Is `true` if this code is running inside of an internal `Worker` thread (e.g the loader thread).

```bash
node --experimental-loader ./loader.js main.js
```

```mjs
// loader.js
import { isInternalThread } from 'node:worker_threads';
console.log(isInternalThread);  // true
```

```cjs
// loader.js
const { isInternalThread } = require('node:worker_threads');
console.log(isInternalThread);  // true
```

```mjs
// main.js
import { isInternalThread } from 'node:worker_threads';
console.log(isInternalThread);  // false
```

```cjs
// main.js
const { isInternalThread } = require('node:worker_threads');
console.log(isInternalThread);  // false
```

## `worker_threads.isMainThread`

* Type: {boolean}

Is `true` if this code is not running inside of a `Worker` thread.

```mjs
import { Worker, isMainThread } from 'node:worker_threads';

if (isMainThread) {
  // This re-loads the current file inside a Worker instance.
  new Worker(new URL(import.meta.url));
} else {
  console.log('Inside Worker!');
  console.log(isMainThread);  // Prints 'false'.
}
```

```cjs
const { Worker, isMainThread } = require('node:worker_threads');

if (isMainThread) {
  // This re-loads the current file inside a Worker instance.
  new Worker(__filename);
} else {
  console.log('Inside Worker!');
  console.log(isMainThread);  // Prints 'false'.
}
```

## `worker_threads.markAsUntransferable(object)`

* `object` {any} Any arbitrary JavaScript value.

Mark an object as not transferable. If `object` occurs in the transfer list of
a `port.postMessage()` call, an error is thrown. This is a no-op if
`object` is a primitive value.

In particular, this makes sense for objects that can be cloned, rather than
transferred, and which are used by other objects on the sending side.
For example, Node.js marks the `ArrayBuffer`s it uses for its
`Buffer` pool with this.
`ArrayBuffer.prototype.transfer()` is disallowed on such array buffer
instances.

This operation cannot be undone.

```mjs
import { MessageChannel, markAsUntransferable } from 'node:worker_threads';

const pooledBuffer = new ArrayBuffer(8);
const typedArray1 = new Uint8Array(pooledBuffer);
const typedArray2 = new Float64Array(pooledBuffer);

markAsUntransferable(pooledBuffer);

const { port1 } = new MessageChannel();
try {
  // This will throw an error, because pooledBuffer is not transferable.
  port1.postMessage(typedArray1, [ typedArray1.buffer ]);
} catch (error) {
  // error.name === 'DataCloneError'
}

// The following line prints the contents of typedArray1 -- it still owns
// its memory and has not been transferred. Without
// `markAsUntransferable()`, this would print an empty Uint8Array and the
// postMessage call would have succeeded.
// typedArray2 is intact as well.
console.log(typedArray1);
console.log(typedArray2);
```

```cjs
const { MessageChannel, markAsUntransferable } = require('node:worker_threads');

const pooledBuffer = new ArrayBuffer(8);
const typedArray1 = new Uint8Array(pooledBuffer);
const typedArray2 = new Float64Array(pooledBuffer);

markAsUntransferable(pooledBuffer);

const { port1 } = new MessageChannel();
try {
  // This will throw an error, because pooledBuffer is not transferable.
  port1.postMessage(typedArray1, [ typedArray1.buffer ]);
} catch (error) {
  // error.name === 'DataCloneError'
}

// The following line prints the contents of typedArray1 -- it still owns
// its memory and has not been transferred. Without
// `markAsUntransferable()`, this would print an empty Uint8Array and the
// postMessage call would have succeeded.
// typedArray2 is intact as well.
console.log(typedArray1);
console.log(typedArray2);
```

There is no equivalent to this API in browsers.

## `worker_threads.isMarkedAsUntransferable(object)`

* `object` {any} Any JavaScript value.
* Returns: {boolean}

Check if an object is marked as not transferable with
`markAsUntransferable()`.

```mjs
import { markAsUntransferable, isMarkedAsUntransferable } from 'node:worker_threads';

const pooledBuffer = new ArrayBuffer(8);
markAsUntransferable(pooledBuffer);

isMarkedAsUntransferable(pooledBuffer);  // Returns true.
```

```cjs
const { markAsUntransferable, isMarkedAsUntransferable } = require('node:worker_threads');

const pooledBuffer = new ArrayBuffer(8);
markAsUntransferable(pooledBuffer);

isMarkedAsUntransferable(pooledBuffer);  // Returns true.
```

There is no equivalent to this API in browsers.

## `worker_threads.markAsUncloneable(object)`

* `object` {any} Any arbitrary JavaScript value.

Mark an object as not cloneable. If `object` is used as `message` in
a `port.postMessage()` call, an error is thrown. This is a no-op if `object` is a
primitive value.

This has no effect on `ArrayBuffer`, or any `Buffer` like objects.

This operation cannot be undone.

```mjs
import { markAsUncloneable } from 'node:worker_threads';

const anyObject = { foo: 'bar' };
markAsUncloneable(anyObject);
const { port1 } = new MessageChannel();
try {
  // This will throw an error, because anyObject is not cloneable.
  port1.postMessage(anyObject);
} catch (error) {
  // error.name === 'DataCloneError'
}
```

```cjs
const { markAsUncloneable } = require('node:worker_threads');

const anyObject = { foo: 'bar' };
markAsUncloneable(anyObject);
const { port1 } = new MessageChannel();
try {
  // This will throw an error, because anyObject is not cloneable.
  port1.postMessage(anyObject);
} catch (error) {
  // error.name === 'DataCloneError'
}
```

There is no equivalent to this API in browsers.

## `worker_threads.moveMessagePortToContext(port, contextifiedSandbox)`

* `port` {MessagePort} The message port to transfer.

* `contextifiedSandbox` {Object} A contextified object as returned by the
  `vm.createContext()` method.

* Returns: {MessagePort}

Transfer a `MessagePort` to a different `vm` Context. The original `port`
object is rendered unusable, and the returned `MessagePort` instance
takes its place.

The returned `MessagePort` is an object in the target context and
inherits from its global `Object` class. Objects passed to the
`port.onmessage()` listener are also created in the target context
and inherit from its global `Object` class.

However, the created `MessagePort` no longer inherits from
{EventTarget}, and only `port.onmessage()` can be used to receive
events using it.

## `worker_threads.parentPort`

* Type: {null|MessagePort}

If this thread is a `Worker`, this is a `MessagePort`
allowing communication with the parent thread. Messages sent using
`parentPort.postMessage()` are available in the parent thread
using `worker.on('message')`, and messages sent from the parent thread
using `worker.postMessage()` are available in this thread using
`parentPort.on('message')`.

```mjs
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url));
  worker.once('message', (message) => {
    console.log(message);  // Prints 'Hello, world!'.
  });
  worker.postMessage('Hello, world!');
} else {
  // When a message from the parent thread is received, send it back:
  parentPort.once('message', (message) => {
    parentPort.postMessage(message);
  });
}
```

```cjs
const { Worker, isMainThread, parentPort } = require('node:worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.once('message', (message) => {
    console.log(message);  // Prints 'Hello, world!'.
  });
  worker.postMessage('Hello, world!');
} else {
  // When a message from the parent thread is received, send it back:
  parentPort.once('message', (message) => {
    parentPort.postMessage(message);
  });
}
```

## `worker_threads.postMessageToThread(threadId, value, transferList)`

> Stability: 1.1 - Active development

* `threadId` {number} The target thread ID. If the thread ID is invalid, a
  `ERR_WORKER_MESSAGING_FAILED` error will be thrown. If the target thread ID is the current thread ID,
  a `ERR_WORKER_MESSAGING_SAME_THREAD` error will be thrown.
* `value` {any} The value to send.
* `transferList` {Object\[]} If one or more `MessagePort`-like objects are passed in `value`,
  a `transferList` is required for those items or `ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST` is thrown.
  See `port.postMessage()` for more information.
* `timeout` {number} Time to wait for the message to be delivered in milliseconds.
  By default it's `undefined`, which means wait forever. If the operation times out,
  a `ERR_WORKER_MESSAGING_TIMEOUT` error is thrown.
* Returns: {Promise} A promise which is fulfilled if the message was successfully processed by destination thread.

Sends a value to another worker, identified by its thread ID.

If the target thread has no listener for the `workerMessage` event, then the operation will throw
a `ERR_WORKER_MESSAGING_FAILED` error.

If the target thread threw an error while processing the `workerMessage` event, then the operation will throw
a `ERR_WORKER_MESSAGING_ERRORED` error.

This method should be used when the target thread is not the direct
parent or child of the current thread.
If the two threads are parent-children, use the `require('node:worker_threads').parentPort.postMessage()`
and the `worker.postMessage()` to let the threads communicate.

The example below shows the use of `postMessageToThread`: it creates 10 nested threads,
the last one will try to communicate with the main thread.

```mjs
import process from 'node:process';
import {
  postMessageToThread,
  threadId,
  workerData,
  Worker,
} from 'node:worker_threads';

const channel = new BroadcastChannel('sync');
const level = workerData?.level ?? 0;

if (level < 10) {
  const worker = new Worker(new URL(import.meta.url), {
    workerData: { level: level + 1 },
  });
}

if (level === 0) {
  process.on('workerMessage', (value, source) => {
    console.log(`${source} -> ${threadId}:`, value);
    postMessageToThread(source, { message: 'pong' });
  });
} else if (level === 10) {
  process.on('workerMessage', (value, source) => {
    console.log(`${source} -> ${threadId}:`, value);
    channel.postMessage('done');
    channel.close();
  });

  await postMessageToThread(0, { message: 'ping' });
}

channel.onmessage = channel.close;
```

```cjs
const {
  postMessageToThread,
  threadId,
  workerData,
  Worker,
} = require('node:worker_threads');

const channel = new BroadcastChannel('sync');
const level = workerData?.level ?? 0;

if (level < 10) {
  const worker = new Worker(__filename, {
    workerData: { level: level + 1 },
  });
}

if (level === 0) {
  process.on('workerMessage', (value, source) => {
    console.log(`${source} -> ${threadId}:`, value);
    postMessageToThread(source, { message: 'pong' });
  });
} else if (level === 10) {
  process.on('workerMessage', (value, source) => {
    console.log(`${source} -> ${threadId}:`, value);
    channel.postMessage('done');
    channel.close();
  });

  postMessageToThread(0, { message: 'ping' });
}

channel.onmessage = channel.close;
```
