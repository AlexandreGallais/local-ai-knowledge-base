---
title: "Process (part 7 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Process (part 7 of 10)

## `process.initgroups(user, extraGroup)`

* `user` {string|number} The user name or numeric identifier.
* `extraGroup` {string|number} A group name or numeric identifier.

The `process.initgroups()` method reads the `/etc/group` file and initializes
the group access list, using all groups of which the user is a member. This is
a privileged operation that requires that the Node.js process either have `root`
access or the `CAP_SETGID` capability.

Use care when dropping privileges:

```mjs
import { getgroups, initgroups, setgid } from 'node:process';

console.log(getgroups());         // [ 0 ]
initgroups('nodeuser', 1000);     // switch user
console.log(getgroups());         // [ 27, 30, 46, 1000, 0 ]
setgid(1000);                     // drop root gid
console.log(getgroups());         // [ 27, 30, 46, 1000 ]
```

```cjs
const { getgroups, initgroups, setgid } = require('node:process');

console.log(getgroups());         // [ 0 ]
initgroups('nodeuser', 1000);     // switch user
console.log(getgroups());         // [ 27, 30, 46, 1000, 0 ]
setgid(1000);                     // drop root gid
console.log(getgroups());         // [ 27, 30, 46, 1000 ]
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).
This feature is not available in `Worker` threads.

## `process.kill(pid[, signal])`

* `pid` {number} A process ID
* `signal` {string|number} The signal to send, either as a string or number.
  **Default:** `'SIGTERM'`.

The `process.kill()` method sends the `signal` to the process identified by
`pid`.

Signal names are strings such as `'SIGINT'` or `'SIGHUP'`. See Signal Events
and kill(2) for more information.

This method will throw an error if the target `pid` does not exist. As a special
case, a signal of `0` can be used to test for the existence of a process.
Windows platforms will throw an error if the `pid` is used to kill a process
group.

Even though the name of this function is `process.kill()`, it is really just a
signal sender, like the `kill` system call. The signal sent may do something
other than kill the target process.

```mjs
import process, { kill } from 'node:process';

process.on('SIGHUP', () => {
  console.log('Got SIGHUP signal.');
});

setTimeout(() => {
  console.log('Exiting.');
  process.exit(0);
}, 100);

kill(process.pid, 'SIGHUP');
```

```cjs
process.on('SIGHUP', () => {
  console.log('Got SIGHUP signal.');
});

setTimeout(() => {
  console.log('Exiting.');
  process.exit(0);
}, 100);

process.kill(process.pid, 'SIGHUP');
```

When `SIGUSR1` is received by a Node.js process, Node.js will start the
debugger. See Signal Events.

## `process.loadEnvFile(path)`

* `path` {string | URL | Buffer | undefined}. **Default:** `'./.env'`

Loads the `.env` file into `process.env`. Usage of `NODE_OPTIONS`
in the `.env` file will not have any effect on Node.js.

```cjs
const { loadEnvFile } = require('node:process');
loadEnvFile();
```

```mjs
import { loadEnvFile } from 'node:process';
loadEnvFile();
```

## `process.mainModule`

> Stability: 0 - Deprecated: Use `require.main` instead.

* Type: {Object}

The `process.mainModule` property provides an alternative way of retrieving
`require.main`. The difference is that if the main module changes at
runtime, `require.main` may still refer to the original main module in
modules that were required before the change occurred. Generally, it's
safe to assume that the two refer to the same module.

As with `require.main`, `process.mainModule` will be `undefined` if there
is no entry script.

## `process.memoryUsage()`

* Returns: {Object}
  * `rss` {integer}
  * `heapTotal` {integer}
  * `heapUsed` {integer}
  * `external` {integer}
  * `arrayBuffers` {integer}

Returns an object describing the memory usage of the Node.js process measured in
bytes.

```mjs
import { memoryUsage } from 'node:process';

console.log(memoryUsage());
// Prints:
// {
//  rss: 4935680,
//  heapTotal: 1826816,
//  heapUsed: 650472,
//  external: 49879,
//  arrayBuffers: 9386
// }
```

```cjs
const { memoryUsage } = require('node:process');

console.log(memoryUsage());
// Prints:
// {
//  rss: 4935680,
//  heapTotal: 1826816,
//  heapUsed: 650472,
//  external: 49879,
//  arrayBuffers: 9386
// }
```

* `heapTotal` and `heapUsed` refer to V8's memory usage.
* `external` refers to the memory usage of C++ objects bound to JavaScript
  objects managed by V8.
* `rss`, Resident Set Size, is the amount of space occupied in the main
  memory device (that is a subset of the total allocated memory) for the
  process, including all C++ and JavaScript objects and code.
* `arrayBuffers` refers to memory allocated for `ArrayBuffer`s and
  `SharedArrayBuffer`s, including all Node.js `Buffer`s.
  This is also included in the `external` value. When Node.js is used as an
  embedded library, this value may be `0` because allocations for `ArrayBuffer`s
  may not be tracked in that case.

When using `Worker` threads, `rss` will be a value that is valid for the
entire process, while the other fields will only refer to the current thread.

The `process.memoryUsage()` method iterates over each page to gather
information about memory usage which might be slow depending on the
program memory allocations.

### A note on process memoryUsage

On Linux or other systems where glibc is commonly used, an application may have sustained
`rss` growth despite stable `heapTotal` due to fragmentation caused by the glibc `malloc`
implementation. See nodejs/node#21973 on how to switch to an alternative `malloc`
implementation to address the performance issue.

## `process.memoryUsage.rss()`

* Returns: {integer}

The `process.memoryUsage.rss()` method returns an integer representing the
Resident Set Size (RSS) in bytes.

The Resident Set Size, is the amount of space occupied in the main
memory device (that is a subset of the total allocated memory) for the
process, including all C++ and JavaScript objects and code.

This is the same value as the `rss` property provided by `process.memoryUsage()`
but `process.memoryUsage.rss()` is faster.

```mjs
import { memoryUsage } from 'node:process';

console.log(memoryUsage.rss());
// 35655680
```

```cjs
const { memoryUsage } = require('node:process');

console.log(memoryUsage.rss());
// 35655680
```

## `process.nextTick(callback[, ...args])`

> Stability: 3 - Legacy: Use `queueMicrotask()` instead.

* `callback` {Function}
* `...args` {any} Additional arguments to pass when invoking the `callback`

`process.nextTick()` adds `callback` to the "next tick queue". This queue is
fully drained after the current operation on the JavaScript stack runs to
completion and before the event loop is allowed to continue. It's possible to
create an infinite loop if one were to recursively call `process.nextTick()`.
See the Event Loop guide for more background.

```mjs
import { nextTick } from 'node:process';

console.log('start');
nextTick(() => {
  console.log('nextTick callback');
});
console.log('scheduled');
// Output:
// start
// scheduled
// nextTick callback
```

```cjs
const { nextTick } = require('node:process');

console.log('start');
nextTick(() => {
  console.log('nextTick callback');
});
console.log('scheduled');
// Output:
// start
// scheduled
// nextTick callback
```

This is important when developing APIs in order to give users the opportunity
to assign event handlers _after_ an object has been constructed but before any
I/O has occurred:

```mjs
import { nextTick } from 'node:process';

function MyThing(options) {
  this.setupOptions(options);

  nextTick(() => {
    this.startDoingStuff();
  });
}

const thing = new MyThing();
thing.getReadyForStuff();

// thing.startDoingStuff() gets called now, not before.
```

```cjs
const { nextTick } = require('node:process');

function MyThing(options) {
  this.setupOptions(options);

  nextTick(() => {
    this.startDoingStuff();
  });
}

const thing = new MyThing();
thing.getReadyForStuff();

// thing.startDoingStuff() gets called now, not before.
```

It is very important for APIs to be either 100% synchronous or 100%
asynchronous. Consider this example:

```js
// WARNING!  DO NOT USE!  BAD UNSAFE HAZARD!
function maybeSync(arg, cb) {
  if (arg) {
    cb();
    return;
  }

  fs.stat('file', cb);
}
```

This API is hazardous because in the following case:

```js
const maybeTrue = Math.random() > 0.5;

maybeSync(maybeTrue, () => {
  foo();
});

bar();
```

It is not clear whether `foo()` or `bar()` will be called first.

The following approach is much better:

```mjs
import { nextTick } from 'node:process';

function definitelyAsync(arg, cb) {
  if (arg) {
    nextTick(cb);
    return;
  }

  fs.stat('file', cb);
}
```

```cjs
const { nextTick } = require('node:process');

function definitelyAsync(arg, cb) {
  if (arg) {
    nextTick(cb);
    return;
  }

  fs.stat('file', cb);
}
```

### When to use `queueMicrotask()` vs. `process.nextTick()`

The `queueMicrotask()` API is an alternative to `process.nextTick()` that instead of using the
"next tick queue" defers execution of a function using the same microtask queue used to execute the
then, catch, and finally handlers of resolved promises.

Within Node.js, every time the "next tick queue" is drained, the microtask queue
is drained immediately after.

So in CJS modules `process.nextTick()` callbacks are always run before `queueMicrotask()` ones.
However since ESM modules are processed already as part of the microtask queue, there
`queueMicrotask()` callbacks are always executed before `process.nextTick()` ones since Node.js
is already in the process of draining the microtask queue.

```mjs
import { nextTick } from 'node:process';

Promise.resolve().then(() => console.log('resolve'));
queueMicrotask(() => console.log('microtask'));
nextTick(() => console.log('nextTick'));
// Output:
// resolve
// microtask
// nextTick
```

```cjs
const { nextTick } = require('node:process');

Promise.resolve().then(() => console.log('resolve'));
queueMicrotask(() => console.log('microtask'));
nextTick(() => console.log('nextTick'));
// Output:
// nextTick
// resolve
// microtask
```

For _most_ userland use cases, the `queueMicrotask()` API provides a portable
and reliable mechanism for deferring execution that works across multiple
JavaScript platform environments and should be favored over `process.nextTick()`.
In simple scenarios, `queueMicrotask()` can be a drop-in replacement for
`process.nextTick()`.

```js
console.log('start');
queueMicrotask(() => {
  console.log('microtask callback');
});
console.log('scheduled');
// Output:
// start
// scheduled
// microtask callback
```

One note-worthy difference between the two APIs is that `process.nextTick()`
allows specifying additional values that will be passed as arguments to the
deferred function when it is called. Achieving the same result with
`queueMicrotask()` requires using either a closure or a bound function:

```js
function deferred(a, b) {
  console.log('microtask', a + b);
}

console.log('start');
queueMicrotask(deferred.bind(undefined, 1, 2));
console.log('scheduled');
// Output:
// start
// scheduled
// microtask 3
```

There are minor differences in the way errors raised from within the next tick
queue and microtask queue are handled. Errors thrown within a queued microtask
callback should be handled within the queued callback when possible. If they are
not, the `process.on('uncaughtException')` event handler can be used to capture
and handle the errors.

When in doubt, unless the specific capabilities of `process.nextTick()` are
needed, use `queueMicrotask()`.

## `process.noDeprecation`

* Type: {boolean}

The `process.noDeprecation` property indicates whether the `--no-deprecation`
flag is set on the current Node.js process. See the documentation for
the `'warning'` event and the
`emitWarning()` method for more information about this
flag's behavior.
