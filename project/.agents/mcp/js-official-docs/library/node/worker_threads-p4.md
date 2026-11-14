---
title: "Worker threads (part 4 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/worker_threads.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Worker threads (part 4 of 5)

## Class: `Worker`

* Extends: {EventEmitter}

The `Worker` class represents an independent JavaScript execution thread.
Most Node.js APIs are available inside of it.

Notable differences inside a Worker environment are:

* The `process.stdin`, `process.stdout`, and `process.stderr`
  streams may be redirected by the parent thread.
* The `require('node:worker_threads').isMainThread` property is set to `false`.
* The `require('node:worker_threads').parentPort` message port is available.
* `process.exit()` does not stop the whole program, just the single thread,
  and `process.abort()` is not available.
* `process.chdir()` and `process` methods that set group or user ids
  are not available.
* `process.env` is a copy of the parent thread's environment variables,
  unless otherwise specified. Changes to one copy are not visible in other
  threads, and are not visible to native add-ons (unless
  `worker.SHARE_ENV` is passed as the `env` option to the
  `Worker` constructor). On Windows, unlike the main thread, a copy of the
  environment variables operates in a case-sensitive manner.
* `process.title` cannot be modified.
* Signals are not delivered through `process.on('...')`.
* Execution may stop at any point as a result of `worker.terminate()`
  being invoked.
* IPC channels from parent processes are not accessible.
* The `trace_events` module is not supported.
* Native add-ons can only be loaded from multiple threads if they fulfill
  certain conditions.

Creating `Worker` instances inside of other `Worker`s is possible.

Like Web Workers and the `node:cluster` module, two-way communication
can be achieved through inter-thread message passing. Internally, a `Worker` has
a built-in pair of `MessagePort`s that are already associated with each
other when the `Worker` is created. While the `MessagePort` object on the parent
side is not directly exposed, its functionalities are exposed through
`worker.postMessage()` and the `worker.on('message')` event
on the `Worker` object for the parent thread.

To create custom messaging channels (which is encouraged over using the default
global channel because it facilitates separation of concerns), users can create
a `MessageChannel` object on either thread and pass one of the
`MessagePort`s on that `MessageChannel` to the other thread through a
pre-existing channel, such as the global one.

See `port.postMessage()` for more information on how messages are passed,
and what kind of JavaScript values can be successfully transported through
the thread barrier.

```mjs
import assert from 'node:assert';
import {
  Worker, MessageChannel, MessagePort, isMainThread, parentPort,
} from 'node:worker_threads';
if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url));
  const subChannel = new MessageChannel();
  worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
  subChannel.port2.on('message', (value) => {
    console.log('received:', value);
  });
} else {
  parentPort.once('message', (value) => {
    assert(value.hereIsYourPort instanceof MessagePort);
    value.hereIsYourPort.postMessage('the worker is sending this');
    value.hereIsYourPort.close();
  });
}
```

```cjs
const assert = require('node:assert');
const {
  Worker, MessageChannel, MessagePort, isMainThread, parentPort,
} = require('node:worker_threads');
if (isMainThread) {
  const worker = new Worker(__filename);
  const subChannel = new MessageChannel();
  worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
  subChannel.port2.on('message', (value) => {
    console.log('received:', value);
  });
} else {
  parentPort.once('message', (value) => {
    assert(value.hereIsYourPort instanceof MessagePort);
    value.hereIsYourPort.postMessage('the worker is sending this');
    value.hereIsYourPort.close();
  });
}
```

### `new Worker(filename[, options])`

* `filename` {string|URL} The path to the Worker's main script or module. Must
  be either an absolute path or a relative path (i.e. relative to the
  current working directory) starting with `./` or `../`, or a WHATWG `URL`
  object using `file:` or `data:` protocol.
  When using a `data:` URL, the data is interpreted based on MIME type using
  the ECMAScript module loader.
  If `options.eval` is `true`, this is a string containing JavaScript code
  rather than a path.
* `options` {Object}
  * `argv` {any\[]} List of arguments which would be stringified and appended to
    `process.argv` in the worker. This is mostly similar to the `workerData`
    but the values are available on the global `process.argv` as if they
    were passed as CLI options to the script.
  * `env` {Object} If set, specifies the initial value of `process.env` inside
    the Worker thread. As a special value, `worker.SHARE_ENV` may be used
    to specify that the parent thread and the child thread should share their
    environment variables; in that case, changes to one thread's `process.env`
    object affect the other thread as well. **Default:** `process.env`.
  * `eval` {boolean} If `true` and the first argument is a `string`, interpret
    the first argument to the constructor as a script that is executed once the
    worker is online.
  * `execArgv` {string\[]} List of node CLI options passed to the worker.
    V8 options (such as `--max-old-space-size`) and options that affect the
    process (such as `--title`) are not supported. If set, this is provided
    as `process.execArgv` inside the worker. By default, options are
    inherited from the parent thread.
    Passing an explicit `execArgv` (including an empty array) replaces that
    inheritance: the worker receives only the listed flags. Under the
    Permission Model, that means an explicit
    `execArgv` can drop the parent's `--permission` / `--allow-*` grants.
    Omit `execArgv` to keep the parent's CLI flags. This is intended. See
    Permission Model limitations.
  * `stdin` {boolean} If this is set to `true`, then `worker.stdin`
    provides a writable stream whose contents appear as `process.stdin`
    inside the Worker. By default, no data is provided.
  * `stdout` {boolean} If this is set to `true`, then `worker.stdout` is
    not automatically piped through to `process.stdout` in the parent.
  * `stderr` {boolean} If this is set to `true`, then `worker.stderr` is
    not automatically piped through to `process.stderr` in the parent.
  * `workerData` {any} Any JavaScript value that is cloned and made
    available as `require('node:worker_threads').workerData`. The cloning
    occurs as described in the HTML structured clone algorithm, and an error
    is thrown if the object cannot be cloned (e.g. because it contains
    `function`s).
  * `trackUnmanagedFds` {boolean} If this is set to `true`, then the Worker
    tracks raw file descriptors managed through `fs.open()` and
    `fs.close()`, and closes them when the Worker exits, similar to other
    resources like network sockets or file descriptors managed through
    the `FileHandle` API. This option is automatically inherited by all
    nested `Worker`s. **Default:** `true`.
  * `transferList` {Object\[]} If one or more `MessagePort`-like objects
    are passed in `workerData`, a `transferList` is required for those
    items or `ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST` is thrown.
    See `port.postMessage()` for more information.
  * `resourceLimits` {Object} An optional set of resource limits for the new JS
    engine instance. Reaching these limits leads to termination of the `Worker`
    instance. These limits only affect the JS engine, and no external data,
    including no `ArrayBuffer`s. Even if these limits are set, the process may
    still abort if it encounters a global out-of-memory situation.
    * `maxOldGenerationSizeMb` {number} The maximum size of the main heap in
      MB. If the command-line argument `--max-old-space-size` is set, it
      overrides this setting.
    * `maxYoungGenerationSizeMb` {number} The maximum size of a heap space for
      recently created objects. If the command-line argument
      `--max-semi-space-size` is set, it overrides this setting.
    * `codeRangeSizeMb` {number} The size of a pre-allocated memory range
      used for generated code.
    * `stackSizeMb` {number} The default maximum stack size for the thread.
      Small values may lead to unusable Worker instances. **Default:** `4`.
  * `name` {string} An optional `name` to be replaced in the thread name
    and to the worker title for debugging/identification purposes,
    making the final title as `[worker ${id}] ${name}`.
    This parameter has a maximum allowed size, depending on the operating
    system. If the provided name exceeds the limit, it will be truncated
    * Maximum sizes:
      * Windows: 32,767 characters
      * macOS: 64 characters
      * Linux: 16 characters
      * NetBSD: limited to `PTHREAD_MAX_NAMELEN_NP`
      * FreeBSD and OpenBSD: limited to `MAXCOMLEN`
        **Default:** `'WorkerThread'`.

### Event: `'error'`

* `err` {any}

The `'error'` event is emitted if the worker thread throws an uncaught
exception. In that case, the worker is terminated.

### Event: `'exit'`

* `exitCode` {integer}

The `'exit'` event is emitted once the worker has stopped. If the worker
exited by calling `process.exit()`, the `exitCode` parameter is the
passed exit code. If the worker was terminated, the `exitCode` parameter is
`1`.

This is the final event emitted by any `Worker` instance.

### Event: `'message'`

* `value` {any} The transmitted value

The `'message'` event is emitted when the worker thread has invoked
`require('node:worker_threads').parentPort.postMessage()`.
See the `port.on('message')` event for more details.

All messages sent from the worker thread are emitted before the
`'exit'` event is emitted on the `Worker` object.

### Event: `'messageerror'`

* `error` {Error} An Error object

The `'messageerror'` event is emitted when deserializing a message failed.

### Event: `'online'`

The `'online'` event is emitted when the worker thread has started executing
JavaScript code.

### `worker.cpuUsage([prev])`

* Returns: {Promise}

This method returns a `Promise` that will resolve to an object identical to `process.threadCpuUsage()`,
or reject with an `ERR_WORKER_NOT_RUNNING` error if the worker is no longer running.
This methods allows the statistics to be observed from outside the actual thread.

### `worker.getHeapSnapshot([options])`

* `options` {Object}
  * `exposeInternals` {boolean} If true, expose internals in the heap snapshot.
    **Default:** `false`.
  * `exposeNumericValues` {boolean} If true, expose numeric values in
    artificial fields. **Default:** `false`.
* Returns: {Promise} A promise for a Readable Stream containing
  a V8 heap snapshot

Returns a readable stream for a V8 snapshot of the current state of the Worker.
See `v8.getHeapSnapshot()` for more details.

If the Worker thread is no longer running, which may occur before the
`'exit'` event is emitted, the returned `Promise` is rejected
immediately with an `ERR_WORKER_NOT_RUNNING` error.

### `worker.getHeapStatistics()`

* Returns: {Promise}

This method returns a `Promise` that will resolve to an object identical to `v8.getHeapStatistics()`,
or reject with an `ERR_WORKER_NOT_RUNNING` error if the worker is no longer running.
This methods allows the statistics to be observed from outside the actual thread.

### `worker.performance`

An object that can be used to query performance information from a worker
instance.

#### `performance.eventLoopUtilization([utilization1[, utilization2]])`

* `utilization1` {Object} The result of a previous call to
  `eventLoopUtilization()`.
* `utilization2` {Object} The result of a previous call to
  `eventLoopUtilization()` prior to `utilization1`.
* Returns: {Object}
  * `idle` {number}
  * `active` {number}
  * `utilization` {number}

The same call as `perf_hooks` `eventLoopUtilization()`, except the values
of the worker instance are returned.

One difference is that, unlike the main thread, bootstrapping within a worker
is done within the event loop. So the event loop utilization is
immediately available once the worker's script begins execution.

An `idle` time that does not increase does not indicate that the worker is
stuck in bootstrap. The following example shows how the worker's entire
lifetime never accumulates any `idle` time, but is still able to process
messages.

```mjs
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url));
  setInterval(() => {
    worker.postMessage('hi');
    console.log(worker.performance.eventLoopUtilization());
  }, 100).unref();
} else {
  parentPort.on('message', () => console.log('msg')).unref();
  (function r(n) {
    if (--n < 0) return;
    const t = Date.now();
    while (Date.now() - t < 300);
    setImmediate(r, n);
  })(10);
}
```

```cjs
const { Worker, isMainThread, parentPort } = require('node:worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  setInterval(() => {
    worker.postMessage('hi');
    console.log(worker.performance.eventLoopUtilization());
  }, 100).unref();
} else {
  parentPort.on('message', () => console.log('msg')).unref();
  (function r(n) {
    if (--n < 0) return;
    const t = Date.now();
    while (Date.now() - t < 300);
    setImmediate(r, n);
  })(10);
}
```

The event loop utilization of a worker is available only after the `'online'`
event emitted, and if called before this, or after the `'exit'`
event, then all properties have the value of `0`.

### `worker.postMessage(value[, transferList])`

* `value` {any}
* `transferList` {Object\[]}

Send a message to the worker that is received via
`require('node:worker_threads').parentPort.on('message')`.
See `port.postMessage()` for more details.

### `worker.ref()`

Opposite of `unref()`, calling `ref()` on a previously `unref()`ed worker does
_not_ let the program exit if it's the only active handle left (the default
behavior). If the worker is `ref()`ed, calling `ref()` again has
no effect.

### `worker.resourceLimits`

* Type: {Object}
  * `maxYoungGenerationSizeMb` {number}
  * `maxOldGenerationSizeMb` {number}
  * `codeRangeSizeMb` {number}
  * `stackSizeMb` {number}

Provides the set of JS engine resource constraints for this Worker thread.
If the `resourceLimits` option was passed to the `Worker` constructor,
this matches its values.

If the worker has stopped, the return value is an empty object.
