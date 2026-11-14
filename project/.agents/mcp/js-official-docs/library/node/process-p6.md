---
title: "Process (part 6 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Process (part 6 of 10)

## `process.finalization.register(ref, callback)`

> Stability: 1.2 - Release candidate

* `ref` {Object | Function} The reference to the resource that is being tracked.
* `callback` {Function} The callback function to be called when the resource
  is finalized.
  * `ref` {Object | Function} The reference to the resource that is being tracked.
  * `event` {string} The event that triggered the finalization. Defaults to 'exit'.

This function registers a callback to be called when the process emits the `exit`
event if the `ref` object was not garbage collected. If the object `ref` was garbage collected
before the `exit` event is emitted, the callback will be removed from the finalization registry,
and it will not be called on process exit.

Inside the callback you can release the resources allocated by the `ref` object.
Be aware that all limitations applied to the `beforeExit` event are also applied to the `callback` function,
this means that there is a possibility that the callback will not be called under special circumstances.

The idea of ​​this function is to help you free up resources when the starts process exiting,
but also let the object be garbage collected if it is no longer being used.

Eg: you can register an object that contains a buffer, you want to make sure that buffer is released
when the process exit, but if the object is garbage collected before the process exit, we no longer
need to release the buffer, so in this case we just remove the callback from the finalization registry.

```cjs
const { finalization } = require('node:process');

// Please make sure that the function passed to finalization.register()
// does not create a closure around unnecessary objects.
function onFinalize(obj, event) {
  // You can do whatever you want with the object
  obj.dispose();
}

function setup() {
  // This object can be safely garbage collected,
  // and the resulting shutdown function will not be called.
  // There are no leaks.
  const myDisposableObject = {
    dispose() {
      // Free your resources synchronously
    },
  };

  finalization.register(myDisposableObject, onFinalize);
}

setup();
```

```mjs
import { finalization } from 'node:process';

// Please make sure that the function passed to finalization.register()
// does not create a closure around unnecessary objects.
function onFinalize(obj, event) {
  // You can do whatever you want with the object
  obj.dispose();
}

function setup() {
  // This object can be safely garbage collected,
  // and the resulting shutdown function will not be called.
  // There are no leaks.
  const myDisposableObject = {
    dispose() {
      // Free your resources synchronously
    },
  };

  finalization.register(myDisposableObject, onFinalize);
}

setup();
```

The code above relies on the following assumptions:

* arrow functions are avoided
* regular functions are recommended to be within the global context (root)

Regular functions _could_ reference the context where the `obj` lives, making the `obj` not garbage collectible.

Arrow functions will hold the previous context. Consider, for example:

```js
class Test {
  constructor() {
    finalization.register(this, (ref) => ref.dispose());

    // Even something like this is highly discouraged
    // finalization.register(this, () => this.dispose());
  }
  dispose() {}
}
```

It is very unlikely (not impossible) that this object will be garbage collected,
but if it is not, `dispose` will be called when `process.exit` is called.

Be careful and avoid relying on this feature for the disposal of critical resources,
as it is not guaranteed that the callback will be called under all circumstances.

## `process.finalization.registerBeforeExit(ref, callback)`

> Stability: 1.2 - Release candidate

* `ref` {Object | Function} The reference
  to the resource that is being tracked.
* `callback` {Function} The callback function to be called when the resource
  is finalized.
  * `ref` {Object | Function} The reference to the resource that is being tracked.
  * `event` {string} The event that triggered the finalization. Defaults to 'beforeExit'.

This function behaves exactly like the `register`, except that the callback will be called
when the process emits the `beforeExit` event if `ref` object was not garbage collected.

Be aware that all limitations applied to the `beforeExit` event are also applied to the `callback` function,
this means that there is a possibility that the callback will not be called under special circumstances.

## `process.finalization.unregister(ref)`

> Stability: 1.2 - Release candidate

* `ref` {Object | Function} The reference
  to the resource that was registered previously.

This function remove the register of the object from the finalization
registry, so the callback will not be called anymore.

```cjs
const { finalization } = require('node:process');

// Please make sure that the function passed to finalization.register()
// does not create a closure around unnecessary objects.
function onFinalize(obj, event) {
  // You can do whatever you want with the object
  obj.dispose();
}

function setup() {
  // This object can be safely garbage collected,
  // and the resulting shutdown function will not be called.
  // There are no leaks.
  const myDisposableObject = {
    dispose() {
      // Free your resources synchronously
    },
  };

  finalization.register(myDisposableObject, onFinalize);

  // Do something

  myDisposableObject.dispose();
  finalization.unregister(myDisposableObject);
}

setup();
```

```mjs
import { finalization } from 'node:process';

// Please make sure that the function passed to finalization.register()
// does not create a closure around unnecessary objects.
function onFinalize(obj, event) {
  // You can do whatever you want with the object
  obj.dispose();
}

function setup() {
  // This object can be safely garbage collected,
  // and the resulting shutdown function will not be called.
  // There are no leaks.
  const myDisposableObject = {
    dispose() {
      // Free your resources synchronously
    },
  };

  // Please make sure that the function passed to finalization.register()
  // does not create a closure around unnecessary objects.
  function onFinalize(obj, event) {
    // You can do whatever you want with the object
    obj.dispose();
  }

  finalization.register(myDisposableObject, onFinalize);

  // Do something

  myDisposableObject.dispose();
  finalization.unregister(myDisposableObject);
}

setup();
```

## `process.getActiveResourcesInfo()`

* Returns: {string\[]}

The `process.getActiveResourcesInfo()` method returns an array of strings
containing the types of the active resources that are currently keeping the
event loop alive.

```mjs
import { getActiveResourcesInfo } from 'node:process';
import { setTimeout } from 'node:timers';

console.log('Before:', getActiveResourcesInfo());
setTimeout(() => {}, 1000);
console.log('After:', getActiveResourcesInfo());
// Prints:
//   Before: [ 'CloseReq', 'TTYWrap', 'TTYWrap', 'TTYWrap' ]
//   After: [ 'CloseReq', 'TTYWrap', 'TTYWrap', 'TTYWrap', 'Timeout' ]
```

```cjs
const { getActiveResourcesInfo } = require('node:process');
const { setTimeout } = require('node:timers');

console.log('Before:', getActiveResourcesInfo());
setTimeout(() => {}, 1000);
console.log('After:', getActiveResourcesInfo());
// Prints:
//   Before: [ 'TTYWrap', 'TTYWrap', 'TTYWrap' ]
//   After: [ 'TTYWrap', 'TTYWrap', 'TTYWrap', 'Timeout' ]
```

## `process.getBuiltinModule(id)`

* `id` {string} ID of the built-in module being requested.
* Returns: {Object|undefined}

`process.getBuiltinModule(id)` provides a way to load built-in modules
in a globally available function. ES Modules that need to support
other environments can use it to conditionally load a Node.js built-in
when it is run in Node.js, without having to deal with the resolution
error that can be thrown by `import` in a non-Node.js environment or
having to use dynamic `import()` which either turns the module into
an asynchronous module, or turns a synchronous API into an asynchronous one.

```mjs
if (globalThis.process?.getBuiltinModule) {
  // Run in Node.js, use the Node.js fs module.
  const fs = globalThis.process.getBuiltinModule('fs');
  // If `require()` is needed to load user-modules, use createRequire()
  const module = globalThis.process.getBuiltinModule('module');
  const require = module.createRequire(import.meta.url);
  const foo = require('foo');
}
```

If `id` specifies a built-in module available in the current Node.js process,
`process.getBuiltinModule(id)` method returns the corresponding built-in
module. If `id` does not correspond to any built-in module, `undefined`
is returned.

`process.getBuiltinModule(id)` accepts built-in module IDs that are recognized
by `module.isBuiltin(id)`. Some built-in modules must be loaded with the
`node:` prefix, see built-in modules with mandatory `node:` prefix.
The references returned by `process.getBuiltinModule(id)` always point to
the built-in module corresponding to `id` even if users modify
`require.cache` so that `require(id)` returns something else.

## `process.getegid()`

The `process.getegid()` method returns the numerical effective group identity
of the Node.js process. (See getegid(2).)

```mjs
import process from 'node:process';

if (process.getegid) {
  console.log(`Current gid: ${process.getegid()}`);
}
```

```cjs
if (process.getegid) {
  console.log(`Current gid: ${process.getegid()}`);
}
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).

## `process.geteuid()`

* Returns: {Object}

The `process.geteuid()` method returns the numerical effective user identity of
the process. (See geteuid(2).)

```mjs
import process from 'node:process';

if (process.geteuid) {
  console.log(`Current uid: ${process.geteuid()}`);
}
```

```cjs
if (process.geteuid) {
  console.log(`Current uid: ${process.geteuid()}`);
}
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).

## `process.getgid()`

* Returns: {Object}

The `process.getgid()` method returns the numerical group identity of the
process. (See getgid(2).)

```mjs
import process from 'node:process';

if (process.getgid) {
  console.log(`Current gid: ${process.getgid()}`);
}
```

```cjs
if (process.getgid) {
  console.log(`Current gid: ${process.getgid()}`);
}
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).

## `process.getgroups()`

* Returns: {integer\[]}

The `process.getgroups()` method returns an array with the supplementary group
IDs. POSIX leaves it unspecified if the effective group ID is included but
Node.js ensures it always is.

```mjs
import process from 'node:process';

if (process.getgroups) {
  console.log(process.getgroups()); // [ 16, 21, 297 ]
}
```

```cjs
if (process.getgroups) {
  console.log(process.getgroups()); // [ 16, 21, 297 ]
}
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).

## `process.getuid()`

* Returns: {integer}

The `process.getuid()` method returns the numeric user identity of the process.
(See getuid(2).)

```mjs
import process from 'node:process';

if (process.getuid) {
  console.log(`Current uid: ${process.getuid()}`);
}
```

```cjs
if (process.getuid) {
  console.log(`Current uid: ${process.getuid()}`);
}
```

This function not available on Windows.

## `process.hasUncaughtExceptionCaptureCallback()`

* Returns: {boolean}

Indicates whether a callback has been set using
`process.setUncaughtExceptionCaptureCallback()`.

## `process.hrtime([time])`

> Stability: 3 - Legacy. Use `process.hrtime.bigint()` instead.

* `time` {integer\[]} The result of a previous call to `process.hrtime()`
* Returns: {integer\[]}

This is the legacy version of `process.hrtime.bigint()`
before `bigint` was introduced in JavaScript.

The `process.hrtime()` method returns the current high-resolution real time
in a `[seconds, nanoseconds]` tuple `Array`, where `nanoseconds` is the
remaining part of the real time that can't be represented in second precision.

`time` is an optional parameter that must be the result of a previous
`process.hrtime()` call to diff with the current time. If the parameter
passed in is not a tuple `Array`, a `TypeError` will be thrown. Passing in a
user-defined array instead of the result of a previous call to
`process.hrtime()` will lead to undefined behavior.

These times are relative to an arbitrary time in the
past, and not related to the time of day and therefore not subject to clock
drift. The primary use is for measuring performance between intervals:

```mjs
import { hrtime } from 'node:process';

const NS_PER_SEC = 1e9;
const time = hrtime();
// [ 1800216, 25 ]

setTimeout(() => {
  const diff = hrtime(time);
  // [ 1, 552 ]

  console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
  // Benchmark took 1000000552 nanoseconds
}, 1000);
```

```cjs
const { hrtime } = require('node:process');

const NS_PER_SEC = 1e9;
const time = hrtime();
// [ 1800216, 25 ]

setTimeout(() => {
  const diff = hrtime(time);
  // [ 1, 552 ]

  console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
  // Benchmark took 1000000552 nanoseconds
}, 1000);
```

## `process.hrtime.bigint()`

* Returns: {bigint}

The `bigint` version of the `process.hrtime()` method returning the
current high-resolution real time in nanoseconds as a `bigint`.

Unlike `process.hrtime()`, it does not support an additional `time`
argument since the difference can just be computed directly
by subtraction of the two `bigint`s.

```mjs
import { hrtime } from 'node:process';

const start = hrtime.bigint();
// 191051479007711n

setTimeout(() => {
  const end = hrtime.bigint();
  // 191052633396993n

  console.log(`Benchmark took ${end - start} nanoseconds`);
  // Benchmark took 1154389282 nanoseconds
}, 1000);
```

```cjs
const { hrtime } = require('node:process');

const start = hrtime.bigint();
// 191051479007711n

setTimeout(() => {
  const end = hrtime.bigint();
  // 191052633396993n

  console.log(`Benchmark took ${end - start} nanoseconds`);
  // Benchmark took 1154389282 nanoseconds
}, 1000);
```
