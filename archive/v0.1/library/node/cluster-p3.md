---
title: "Cluster (part 3 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cluster.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Cluster (part 3 of 3)

## `cluster.disconnect([callback])`

* `callback` {Function} Called when all workers are disconnected and handles are
  closed.

Calls `.disconnect()` on each worker in `cluster.workers`.

When they are disconnected all internal handles will be closed, allowing the
primary process to die gracefully if no other event is waiting.

The method takes an optional callback argument which will be called when
finished.

This can only be called from the primary process.

## `cluster.fork([env])`

* `env` {Object} Key/value pairs to add to worker process environment.
* Returns: {cluster.Worker}

Spawn a new worker process.

This can only be called from the primary process.

## `cluster.isMaster`

> Stability: 0 - Deprecated

Deprecated alias for `cluster.isPrimary`.

## `cluster.isPrimary`

* Type: {boolean}

True if the process is a primary. This is determined
by the `process.env.NODE_UNIQUE_ID`. If `process.env.NODE_UNIQUE_ID` is
undefined, then `isPrimary` is `true`.

## `cluster.isWorker`

* Type: {boolean}

True if the process is not a primary (it is the negation of `cluster.isPrimary`).

## `cluster.schedulingPolicy`

The scheduling policy, either `cluster.SCHED_RR` for round-robin or
`cluster.SCHED_NONE` to leave it to the operating system. This is a
global setting and effectively frozen once either the first worker is spawned,
or `.setupPrimary()` is called, whichever comes first.

`SCHED_RR` is the default on all operating systems except Windows.
Windows will change to `SCHED_RR` once libuv is able to effectively
distribute IOCP handles without incurring a large performance hit.

`cluster.schedulingPolicy` can also be set through the
`NODE_CLUSTER_SCHED_POLICY` environment variable. Valid
values are `'rr'` and `'none'`.

## `cluster.settings`

* Type: {Object}
  * `execArgv` {string\[]} List of string arguments passed to the Node.js
    executable. **Default:** `process.execArgv`.
  * `exec` {string} File path to worker file. **Default:** `process.argv[1]`.
  * `args` {string\[]} String arguments passed to worker.
    **Default:** `process.argv.slice(2)`.
  * `cwd` {string} Current working directory of the worker process. **Default:**
    `undefined` (inherits from parent process).
  * `serialization` {string} Specify the kind of serialization used for sending
    messages between processes. Possible values are `'json'` and `'advanced'`.
    See Advanced serialization for `child_process` for more details.
    **Default:** `false`.
  * `silent` {boolean} Whether or not to send output to parent's stdio.
    **Default:** `false`.
  * `stdio` {Array} Configures the stdio of forked processes. Because the
    cluster module relies on IPC to function, this configuration must contain an
    `'ipc'` entry. When this option is provided, it overrides `silent`. See
    `child_process.spawn()`'s `stdio`.
  * `uid` {number} Sets the user identity of the process. (See setuid(2).)
  * `gid` {number} Sets the group identity of the process. (See setgid(2).)
  * `inspectPort` {number|Function} Sets inspector port of worker.
    This can be a number, or a function that takes no arguments and returns a
    number. By default each worker gets its own port, incremented from the
    primary's `process.debugPort`.
  * `windowsHide` {boolean} Hide the forked processes console window that would
    normally be created on Windows systems. **Default:** `false`.

After calling `.setupPrimary()` (or `.fork()`) this settings object will
contain the settings, including the default values.

This object is not intended to be changed or set manually.

## `cluster.setupMaster([settings])`

> Stability: 0 - Deprecated

Deprecated alias for `.setupPrimary()`.

## `cluster.setupPrimary([settings])`

* `settings` {Object} See `cluster.settings`.

`setupPrimary` is used to change the default 'fork' behavior. Once called,
the settings will be present in `cluster.settings`.

Any settings changes only affect future calls to `.fork()` and have no
effect on workers that are already running.

The only attribute of a worker that cannot be set via `.setupPrimary()` is
the `env` passed to `.fork()`.

The defaults above apply to the first call only; the defaults for later
calls are the current values at the time of `cluster.setupPrimary()` is called.

```mjs
import cluster from 'node:cluster';

cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'https'],
  silent: true,
});
cluster.fork(); // https worker
cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'http'],
});
cluster.fork(); // http worker
```

```cjs
const cluster = require('node:cluster');

cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'https'],
  silent: true,
});
cluster.fork(); // https worker
cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'http'],
});
cluster.fork(); // http worker
```

This can only be called from the primary process.

## `cluster.worker`

* Type: {Object}

A reference to the current worker object. Not available in the primary process.

```mjs
import cluster from 'node:cluster';

if (cluster.isPrimary) {
  console.log('I am primary');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log(`I am worker #${cluster.worker.id}`);
}
```

```cjs
const cluster = require('node:cluster');

if (cluster.isPrimary) {
  console.log('I am primary');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log(`I am worker #${cluster.worker.id}`);
}
```

## `cluster.workers`

* Type: {Object}

A hash that stores the active worker objects, keyed by `id` field. This makes it
easy to loop through all the workers. It is only available in the primary
process.

A worker is removed from `cluster.workers` after the worker has disconnected
_and_ exited. The order between these two events cannot be determined in
advance. However, it is guaranteed that the removal from the `cluster.workers`
list happens before the last `'disconnect'` or `'exit'` event is emitted.

```mjs
import cluster from 'node:cluster';

for (const worker of Object.values(cluster.workers)) {
  worker.send('big announcement to all workers');
}
```

```cjs
const cluster = require('node:cluster');

for (const worker of Object.values(cluster.workers)) {
  worker.send('big announcement to all workers');
}
```
