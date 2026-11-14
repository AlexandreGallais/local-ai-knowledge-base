---
title: "Process (part 2 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Process (part 2 of 10)

## Process events

The `process` object is an instance of `EventEmitter`.

### Event: `'beforeExit'`

The `'beforeExit'` event is emitted when Node.js empties its event loop and has
no additional work to schedule. Normally, the Node.js process will exit when
there is no work scheduled, but a listener registered on the `'beforeExit'`
event can make asynchronous calls, and thereby cause the Node.js process to
continue.

The listener callback function is invoked with the value of
`process.exitCode` passed as the only argument.

The `'beforeExit'` event is _not_ emitted for conditions causing explicit
termination, such as calling `process.exit()` or uncaught exceptions.

The `'beforeExit'` should _not_ be used as an alternative to the `'exit'` event
unless the intention is to schedule additional work.

```mjs
import process from 'node:process';

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');

// Prints:
// This message is displayed first.
// Process beforeExit event with code: 0
// Process exit event with code: 0
```

```cjs
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');

// Prints:
// This message is displayed first.
// Process beforeExit event with code: 0
// Process exit event with code: 0
```

### Event: `'disconnect'`

If the Node.js process is spawned with an IPC channel (see the Child Process
and Cluster documentation), the `'disconnect'` event will be emitted when
the IPC channel is closed.

### Event: `'exit'`

* `code` {integer}

The `'exit'` event is emitted when the Node.js process is about to exit as a
result of either:

* The `process.exit()` method being called explicitly;
* The Node.js event loop no longer having any additional work to perform.

There is no way to prevent the exiting of the event loop at this point, and once
all `'exit'` listeners have finished running the Node.js process will terminate.

The listener callback function is invoked with the exit code specified either
by the `process.exitCode` property, or the `exitCode` argument passed to the
`process.exit()` method.

```mjs
import process from 'node:process';

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```

```cjs
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```

Listener functions **must** only perform **synchronous** operations. The Node.js
process will exit immediately after calling the `'exit'` event listeners
causing any additional work still queued in the event loop to be abandoned.
In the following example, for instance, the timeout will never occur:

```mjs
import process from 'node:process';

process.on('exit', (code) => {
  setTimeout(() => {
    console.log('This will not run');
  }, 0);
});
```

```cjs
process.on('exit', (code) => {
  setTimeout(() => {
    console.log('This will not run');
  }, 0);
});
```

### Event: `'message'`

* `message` {Object|boolean|number|string|null} a parsed JSON object
  or a serializable primitive value.
* `sendHandle` {net.Server|net.Socket} a `net.Server` or `net.Socket`
  object, or undefined.

If the Node.js process is spawned with an IPC channel (see the Child Process
and Cluster documentation), the `'message'` event is emitted whenever a
message sent by a parent process using `childprocess.send()` is received by
the child process.

The message goes through serialization and parsing. The resulting message might
not be the same as what is originally sent.

If the `serialization` option was set to `advanced` used when spawning the
process, the `message` argument can contain data that JSON is not able
to represent.
See Advanced serialization for `child_process` for more details.

### Event: `'rejectionHandled'`

* `promise` {Promise} The late handled promise.

The `'rejectionHandled'` event is emitted whenever a `Promise` has been rejected
and an error handler was attached to it (using `promise.catch()`, for
example) later than one turn of the Node.js event loop.

The `Promise` object would have previously been emitted in an
`'unhandledRejection'` event, but during the course of processing gained a
rejection handler.

There is no notion of a top level for a `Promise` chain at which rejections can
always be handled. Being inherently asynchronous in nature, a `Promise`
rejection can be handled at a future point in time, possibly much later than
the event loop turn it takes for the `'unhandledRejection'` event to be emitted.

Another way of stating this is that, unlike in synchronous code where there is
an ever-growing list of unhandled exceptions, with Promises there can be a
growing-and-shrinking list of unhandled rejections.

In synchronous code, the `'uncaughtException'` event is emitted when the list of
unhandled exceptions grows.

In asynchronous code, the `'unhandledRejection'` event is emitted when the list
of unhandled rejections grows, and the `'rejectionHandled'` event is emitted
when the list of unhandled rejections shrinks.

```mjs
import process from 'node:process';

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
});
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
});
```

```cjs
const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
});
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
});
```

In this example, the `unhandledRejections` `Map` will grow and shrink over time,
reflecting rejections that start unhandled and then become handled. It is
possible to record such errors in an error log, either periodically (which is
likely best for long-running application) or upon process exit (which is likely
most convenient for scripts).

### Event: `'workerMessage'`

* `value` {any} A value transmitted using `postMessageToThread()`.
* `source` {number} The transmitting worker thread ID or `0` for the main thread.

The `'workerMessage'` event is emitted for any incoming message send by the other
party by using `postMessageToThread()`.

### Event: `'uncaughtException'`

* `err` {Error} The uncaught exception.
* `origin` {string} Indicates if the exception originates from an unhandled
  rejection or from a synchronous error. Can either be `'uncaughtException'` or
  `'unhandledRejection'`. The latter is used when an exception happens in a
  `Promise` based async context (or if a `Promise` is rejected) and
  `--unhandled-rejections` flag set to `strict` or `throw` (which is the
  default) and the rejection is not handled, or when a rejection happens during
  the command line entry point's ES module static loading phase.

The `'uncaughtException'` event is emitted when an uncaught JavaScript
exception bubbles all the way back to the event loop. By default, Node.js
handles such exceptions by printing the stack trace to `stderr` and exiting
with code 1, overriding any previously set `process.exitCode`.
Adding a handler for the `'uncaughtException'` event overrides this default
behavior. Alternatively, change the `process.exitCode` in the
`'uncaughtException'` handler which will result in the process exiting with the
provided exit code. Otherwise, in the presence of such handler the process will
exit with 0.

```mjs
import process from 'node:process';
import fs from 'node:fs';

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}\n`,
  );
});

setTimeout(() => {
  console.log('This will still run.');
}, 500);

// Intentionally cause an exception, but don't catch it.
nonexistentFunc();
console.log('This will not run.');
```

```cjs
const fs = require('node:fs');

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}\n`,
  );
});

setTimeout(() => {
  console.log('This will still run.');
}, 500);

// Intentionally cause an exception, but don't catch it.
nonexistentFunc();
console.log('This will not run.');
```

It is possible to monitor `'uncaughtException'` events without overriding the
default behavior to exit the process by installing a
`'uncaughtExceptionMonitor'` listener.

#### Warning: Using `'uncaughtException'` correctly

`'uncaughtException'` is a crude mechanism for exception handling
intended to be used only as a last resort. The event _should not_ be used as
an equivalent to `On Error Resume Next`. Unhandled exceptions inherently mean
that an application is in an undefined state. Attempting to resume application
code without properly recovering from the exception can cause additional
unforeseen and unpredictable issues.

Exceptions thrown from within the event handler will not be caught. Instead the
process will exit with a non-zero exit code and the stack trace will be printed.
This is to avoid infinite recursion.

Attempting to resume normally after an uncaught exception can be similar to
pulling out the power cord when upgrading a computer. Nine out of ten
times, nothing happens. But the tenth time, the system becomes corrupted.

The correct use of `'uncaughtException'` is to perform synchronous cleanup
of allocated resources (e.g. file descriptors, handles, etc) before shutting
down the process. **It is not safe to resume normal operation after
`'uncaughtException'`.**

To restart a crashed application in a more reliable way, whether
`'uncaughtException'` is emitted or not, an external monitor should be employed
in a separate process to detect application failures and recover or restart as
needed.

### Event: `'uncaughtExceptionMonitor'`

* `err` {Error} The uncaught exception.
* `origin` {string} Indicates if the exception originates from an unhandled
  rejection or from synchronous errors. Can either be `'uncaughtException'` or
  `'unhandledRejection'`. The latter is used when an exception happens in a
  `Promise` based async context (or if a `Promise` is rejected) and
  `--unhandled-rejections` flag set to `strict` or `throw` (which is the
  default) and the rejection is not handled, or when a rejection happens during
  the command line entry point's ES module static loading phase.

The `'uncaughtExceptionMonitor'` event is emitted before an
`'uncaughtException'` event is emitted or a hook installed via
`process.setUncaughtExceptionCaptureCallback()` is called.

Installing an `'uncaughtExceptionMonitor'` listener does not change the behavior
once an `'uncaughtException'` event is emitted. The process will
still crash if no `'uncaughtException'` listener is installed.

```mjs
import process from 'node:process';

process.on('uncaughtExceptionMonitor', (err, origin) => {
  MyMonitoringTool.logSync(err, origin);
});

// Intentionally cause an exception, but don't catch it.
nonexistentFunc();
// Still crashes Node.js
```

```cjs
process.on('uncaughtExceptionMonitor', (err, origin) => {
  MyMonitoringTool.logSync(err, origin);
});

// Intentionally cause an exception, but don't catch it.
nonexistentFunc();
// Still crashes Node.js
```

### Event: `'unhandledRejection'`

* `reason` {Error|any} The object with which the promise was rejected
  (typically an `Error` object).
* `promise` {Promise} The rejected promise.

The `'unhandledRejection'` event is emitted whenever a `Promise` is rejected and
no error handler is attached to the promise within a turn of the event loop.
When programming with Promises, exceptions are encapsulated as "rejected
promises". Rejections can be caught and handled using `promise.catch()` and
are propagated through a `Promise` chain. The `'unhandledRejection'` event is
useful for detecting and keeping track of promises that were rejected whose
rejections have not yet been handled.

```mjs
import process from 'node:process';

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

somePromise.then((res) => {
  return reportToUser(JSON.pasre(res)); // Note the typo (`pasre`)
}); // No `.catch()` or `.then()`
```

```cjs
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

somePromise.then((res) => {
  return reportToUser(JSON.pasre(res)); // Note the typo (`pasre`)
}); // No `.catch()` or `.then()`
```

The following will also trigger the `'unhandledRejection'` event to be
emitted:

```mjs
import process from 'node:process';

function SomeResource() {
  // Initially set the loaded status to a rejected promise
  this.loaded = Promise.reject(new Error('Resource not yet loaded!'));
}

const resource = new SomeResource();
// no .catch or .then on resource.loaded for at least a turn
```

```cjs
function SomeResource() {
  // Initially set the loaded status to a rejected promise
  this.loaded = Promise.reject(new Error('Resource not yet loaded!'));
}

const resource = new SomeResource();
// no .catch or .then on resource.loaded for at least a turn
```

In this example case, it is possible to track the rejection as a developer error
as would typically be the case for other `'unhandledRejection'` events. To
address such failures, a non-operational
`.catch(() => { })` handler may be attached to
`resource.loaded`, which would prevent the `'unhandledRejection'` event from
being emitted.

If an `'unhandledRejection'` event is emitted but not handled it will
be raised as an uncaught exception. This alongside other behaviors of
`'unhandledRejection'` events can changed via the `--unhandled-rejections` flag.
