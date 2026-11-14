---
title: "Worker threads (part 5 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/worker_threads.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Worker threads (part 5 of 5)

### `worker.startCpuProfile([options])`

* `options` {Object}
  * `sampleInterval` {number} Requested sampling interval in milliseconds. **Default:** `0`.
  * `maxBufferSize` {integer} Maximum number of samples to retain.
    **Default:** `4294967295`.
* Returns: {Promise}

Starting a CPU profile then return a Promise that fulfills with an error
or an `CPUProfileHandle` object. This API supports `await using` syntax.

```cjs
const { Worker } = require('node:worker_threads');

const worker = new Worker(`
  const { parentPort } = require('worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

worker.on('online', async () => {
  const handle = await worker.startCpuProfile({ sampleInterval: 1 });
  const profile = await handle.stop();
  console.log(profile);
  worker.terminate();
});
```

`await using` example.

```cjs
const { Worker } = require('node:worker_threads');

const w = new Worker(`
  const { parentPort } = require('node:worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

w.on('online', async () => {
  // Stop profile automatically when return and profile will be discarded
  await using handle = await w.startCpuProfile();
});
```

### `worker.startHeapProfile([options])`

* `options` {Object}
  * `sampleInterval` {number} The average sampling interval in bytes.
    **Default:** `524288` (512 KiB).
  * `stackDepth` {integer} The maximum stack depth for samples.
    **Default:** `16`.
  * `forceGC` {boolean} Force garbage collection before taking the profile.
    **Default:** `false`.
  * `includeObjectsCollectedByMajorGC` {boolean} Include objects collected
    by major GC. **Default:** `false`.
  * `includeObjectsCollectedByMinorGC` {boolean} Include objects collected
    by minor GC. **Default:** `false`.
* Returns: {Promise}

Starting a Heap profile then return a Promise that fulfills with an error
or an `HeapProfileHandle` object. This API supports `await using` syntax.

```cjs
const { Worker } = require('node:worker_threads');

const worker = new Worker(`
  const { parentPort } = require('worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

worker.on('online', async () => {
  const handle = await worker.startHeapProfile();
  const profile = await handle.stop();
  console.log(profile);
  worker.terminate();
});
```

```mjs
import { Worker } from 'node:worker_threads';

const worker = new Worker(`
  const { parentPort } = require('node:worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

worker.on('online', async () => {
  const handle = await worker.startHeapProfile();
  const profile = await handle.stop();
  console.log(profile);
  worker.terminate();
});
```

`await using` example.

```cjs
const { Worker } = require('node:worker_threads');

const w = new Worker(`
  const { parentPort } = require('node:worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

w.on('online', async () => {
  // Stop profile automatically when return and profile will be discarded
  await using handle = await w.startHeapProfile();
});
```

```mjs
import { Worker } from 'node:worker_threads';

const w = new Worker(`
  const { parentPort } = require('node:worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

w.on('online', async () => {
  // Stop profile automatically when return and profile will be discarded
  await using handle = await w.startHeapProfile();
});
```

### `worker.stderr`

* Type: {stream.Readable}

This is a readable stream which contains data written to `process.stderr`
inside the worker thread. If `stderr: true` was not passed to the
`Worker` constructor, then data is piped to the parent thread's
`process.stderr` stream.

### `worker.stdin`

* Type: {null|stream.Writable}

If `stdin: true` was passed to the `Worker` constructor, this is a
writable stream. The data written to this stream will be made available in
the worker thread as `process.stdin`.

### `worker.stdout`

* Type: {stream.Readable}

This is a readable stream which contains data written to `process.stdout`
inside the worker thread. If `stdout: true` was not passed to the
`Worker` constructor, then data is piped to the parent thread's
`process.stdout` stream.

### `worker.terminate()`

* Returns: {Promise}

Stop all JavaScript execution in the worker thread as soon as possible.
Returns a Promise for the exit code that is fulfilled when the
`'exit'` event is emitted.

### `worker.threadId`

* Type: {integer}

An integer identifier for the referenced thread. Inside the worker thread,
it is available as `require('node:worker_threads').threadId`.
This value is unique for each `Worker` instance inside a single process.

### `worker.threadName`

* {string|null}

A string identifier for the referenced thread or null if the thread is not running.
Inside the worker thread, it is available as `require('node:worker_threads').threadName`.

### `worker.unref()`

Calling `unref()` on a worker allows the thread to exit if this is the only
active handle in the event system. If the worker is already `unref()`ed calling
`unref()` again has no effect.

### `workerSymbol.asyncDispose`

Calls `worker.terminate()` when the dispose scope is exited.

```js
async function example() {
  await using worker = new Worker('for (;;) {}', { eval: true });
  // Worker is automatically terminate when the scope is exited.
}
```

## Notes

### Synchronous blocking of stdio

`Worker`s utilize message passing via {MessagePort} to implement interactions
with `stdio`. This means that `stdio` output originating from a `Worker` can
get blocked by synchronous code on the receiving end that is blocking the
Node.js event loop.

```mjs
import {
  Worker,
  isMainThread,
} from 'node:worker_threads';

if (isMainThread) {
  new Worker(new URL(import.meta.url));
  for (let n = 0; n < 1e10; n++) {
    // Looping to simulate work.
  }
} else {
  // This output will be blocked by the for loop in the main thread.
  console.log('foo');
}
```

```cjs
const {
  Worker,
  isMainThread,
} = require('node:worker_threads');

if (isMainThread) {
  new Worker(__filename);
  for (let n = 0; n < 1e10; n++) {
    // Looping to simulate work.
  }
} else {
  // This output will be blocked by the for loop in the main thread.
  console.log('foo');
}
```

### Launching worker threads from preload scripts

Take care when launching worker threads from preload scripts (scripts loaded
and run using the `-r` command line flag). Unless the `execArgv` option is
explicitly set, new Worker threads automatically inherit the command line flags
from the running process and will preload the same preload scripts as the main
thread. If the preload script unconditionally launches a worker thread, every
thread spawned will spawn another until the application crashes.
