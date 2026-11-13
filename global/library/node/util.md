---
title: "Util (part 1 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/util.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Util

> Stability: 2 - Stable

The `node:util` module supports the needs of Node.js internal APIs. Many of the
utilities are useful for application and module developers as well. To access
it:

```mjs
import util from 'node:util';
```

```cjs
const util = require('node:util');
```

## `util.callbackify(original)`

* `original` {Function} An `async` function
* Returns: {Function} a callback style function

Takes an `async` function (or a function that returns a `Promise`) and returns a
function following the error-first callback style, i.e. taking
an `(err, value) => ...` callback as the last argument. In the callback, the
first argument will be the rejection reason (or `null` if the `Promise`
resolved), and the second argument will be the resolved value.

```mjs
import { callbackify } from 'node:util';

async function fn() {
  return 'hello world';
}
const callbackFunction = callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});
```

```cjs
const { callbackify } = require('node:util');

async function fn() {
  return 'hello world';
}
const callbackFunction = callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});
```

Will print:

```text
hello world
```

The callback is executed asynchronously, and will have a limited stack trace.
If the callback throws, the process will emit an `'uncaughtException'`
event, and if not handled will exit.

Since `null` has a special meaning as the first argument to a callback, if a
wrapped function rejects a `Promise` with a falsy value as a reason, the value
is wrapped in an `Error` with the original value stored in a field named
`reason`.

```mjs
import util from 'node:util';

function fn() {
  return Promise.reject(null);
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  // When the Promise was rejected with `null` it is wrapped with an Error and
  // the original value is stored in `reason`.
  err && Object.hasOwn(err, 'reason') && err.reason === null;  // true
});
```

```cjs
const util = require('node:util');

function fn() {
  return Promise.reject(null);
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  // When the Promise was rejected with `null` it is wrapped with an Error and
  // the original value is stored in `reason`.
  err && Object.hasOwn(err, 'reason') && err.reason === null;  // true
});
```

## `util.convertProcessSignalToExitCode(signal)`

* `signal` {string} A signal name (e.g. `'SIGTERM'`)
* Returns: {number} The exit code corresponding to `signal`

The `util.convertProcessSignalToExitCode()` method converts a signal name to its
corresponding POSIX exit code. Following the POSIX standard, the exit code
for a process terminated by a signal is calculated as `128 + signal number`.

If `signal` is not a valid signal name, then an error will be thrown. See
`signal(7)` for a list of valid signals.

```mjs
import { convertProcessSignalToExitCode } from 'node:util';

console.log(convertProcessSignalToExitCode('SIGTERM')); // 143 (128 + 15)
console.log(convertProcessSignalToExitCode('SIGKILL')); // 137 (128 + 9)
```

```cjs
const { convertProcessSignalToExitCode } = require('node:util');

console.log(convertProcessSignalToExitCode('SIGTERM')); // 143 (128 + 15)
console.log(convertProcessSignalToExitCode('SIGKILL')); // 137 (128 + 9)
```

This is particularly useful when working with processes to determine
the exit code based on the signal that terminated the process.

## `util.debuglog(section[, callback])`

* `section` {string} A string identifying the portion of the application for
  which the `debuglog` function is being created.
* `callback` {Function} A callback invoked the first time the logging function
  is called with a function argument that is a more optimized logging function.
* Returns: {Function} The logging function

The `util.debuglog()` method is used to create a function that conditionally
writes debug messages to `stderr` based on the existence of the `NODE_DEBUG`
environment variable. If the `section` name appears within the value of that
environment variable, then the returned function operates similar to
`console.error()`. If not, then the returned function is a no-op.

```mjs
import { debuglog } from 'node:util';
const log = debuglog('foo');

log('hello from foo [%d]', 123);
```

```cjs
const { debuglog } = require('node:util');
const log = debuglog('foo');

log('hello from foo [%d]', 123);
```

If this program is run with `NODE_DEBUG=foo` in the environment, then
it will output something like:

```console
FOO 3245: hello from foo [123]
```

where `3245` is the process id. If it is not run with that
environment variable set, then it will not print anything.

The `section` supports wildcard also:

```mjs
import { debuglog } from 'node:util';
const log = debuglog('foo-bar');

log('hi there, it\'s foo-bar [%d]', 2333);
```

```cjs
const { debuglog } = require('node:util');
const log = debuglog('foo-bar');

log('hi there, it\'s foo-bar [%d]', 2333);
```

if it is run with `NODE_DEBUG=foo*` in the environment, then it will output
something like:

```console
FOO-BAR 3257: hi there, it's foo-bar [2333]
```

Multiple comma-separated `section` names may be specified in the `NODE_DEBUG`
environment variable: `NODE_DEBUG=fs,net,tls`.

The optional `callback` argument can be used to replace the logging function
with a different function that doesn't have any initialization or
unnecessary wrapping.

```mjs
import { debuglog } from 'node:util';
let log = debuglog('internals', (debug) => {
  // Replace with a logging function that optimizes out
  // testing if the section is enabled
  log = debug;
});
```

```cjs
const { debuglog } = require('node:util');
let log = debuglog('internals', (debug) => {
  // Replace with a logging function that optimizes out
  // testing if the section is enabled
  log = debug;
});
```

### `debuglog().enabled`

* Type: {boolean}

The `util.debuglog().enabled` getter is used to create a test that can be used
in conditionals based on the existence of the `NODE_DEBUG` environment variable.
If the `section` name appears within the value of that environment variable,
then the returned value will be `true`. If not, then the returned value will be
`false`.

```mjs
import { debuglog } from 'node:util';
const enabled = debuglog('foo').enabled;
if (enabled) {
  console.log('hello from foo [%d]', 123);
}
```

```cjs
const { debuglog } = require('node:util');
const enabled = debuglog('foo').enabled;
if (enabled) {
  console.log('hello from foo [%d]', 123);
}
```

If this program is run with `NODE_DEBUG=foo` in the environment, then it will
output something like:

```console
hello from foo [123]
```

## `util.debug(section)`

Alias for `util.debuglog`. Usage allows for readability of that doesn't imply
logging when only using `util.debuglog().enabled`.

## `util.deprecate(fn, msg[, code[, options]])`

* `fn` {Function} The function that is being deprecated.
* `msg` {string} A warning message to display when the deprecated function is
  invoked.
* `code` {string} A deprecation code. See the list of deprecated APIs for a
  list of codes.
* `options` {Object}
  * `modifyPrototype` {boolean} When false do not change the prototype of object
    while emitting the deprecation warning.
    **Default:** `true`.
* Returns: {Function} The deprecated function wrapped to emit a warning.

The `util.deprecate()` method wraps `fn` (which may be a function or class) in
such a way that it is marked as deprecated.

```mjs
import { deprecate } from 'node:util';

export const obsoleteFunction = deprecate(() => {
  // Do something here.
}, 'obsoleteFunction() is deprecated. Use newShinyFunction() instead.');
```

```cjs
const { deprecate } = require('node:util');

exports.obsoleteFunction = deprecate(() => {
  // Do something here.
}, 'obsoleteFunction() is deprecated. Use newShinyFunction() instead.');
```

When called, `util.deprecate()` will return a function that will emit a
`DeprecationWarning` using the `'warning'` event. The warning will
be emitted and printed to `stderr` the first time the returned function is
called. After the warning is emitted, the wrapped function is called without
emitting a warning.

If the same optional `code` is supplied in multiple calls to `util.deprecate()`,
the warning will be emitted only once for that `code`.

```mjs
import { deprecate } from 'node:util';

const fn1 = deprecate(
  () => 'a value',
  'deprecation message',
  'DEP0001',
);
const fn2 = deprecate(
  () => 'a  different value',
  'other dep message',
  'DEP0001',
);
fn1(); // Emits a deprecation warning with code DEP0001
fn2(); // Does not emit a deprecation warning because it has the same code
```

```cjs
const { deprecate } = require('node:util');

const fn1 = deprecate(
  function() {
    return 'a value';
  },
  'deprecation message',
  'DEP0001',
);
const fn2 = deprecate(
  function() {
    return 'a  different value';
  },
  'other dep message',
  'DEP0001',
);
fn1(); // Emits a deprecation warning with code DEP0001
fn2(); // Does not emit a deprecation warning because it has the same code
```

If either the `--no-deprecation` or `--no-warnings` command-line flags are
used, or if the `process.noDeprecation` property is set to `true` _prior_ to
the first deprecation warning, the `util.deprecate()` method does nothing.

If the `--trace-deprecation` or `--trace-warnings` command-line flags are set,
or the `process.traceDeprecation` property is set to `true`, a warning and a
stack trace are printed to `stderr` the first time the deprecated function is
called.

If the `--throw-deprecation` command-line flag is set, or the
`process.throwDeprecation` property is set to `true`, then an exception will be
thrown when the deprecated function is called.

The `--throw-deprecation` command-line flag and `process.throwDeprecation`
property take precedence over `--trace-deprecation` and
`process.traceDeprecation`.

## `util.debounce(fn, wait[, options])`

* `fn` {Function} The function to debounce.
* `wait` {integer} The number of milliseconds to delay `fn`.
* `options` {Object}
  * `leading` {boolean} When `true`, invokes `fn` immediately when a new
    debounce window begins. **Default:** `false`.
  * `rejectOnCancel` {boolean} When `true`, a call superseded by a later call
    rejects with an `AbortError`. **Default:** `false`.
  * `signal` {AbortSignal} An `AbortSignal` that cancels pending calls and
    prevents future calls when aborted.
* Returns: {Function} The debounced function.

Creates a function that delays calling `fn` until `wait` milliseconds have
elapsed since the most recent invocation. The debounced function returns a
{Promise} for the value returned by `fn`. If `fn` throws or returns a rejected
promise, the returned promise is rejected with the same reason.

When the debounced function is called more than once before the delay expires,
`fn` receives the arguments from the most recent call. By default, the promises
from all calls resolve or reject with the result of that invocation. If
`options.rejectOnCancel` is `true`, the promises from superseded calls reject
with an `AbortError` instead.

When `options.leading` is `true`, the first call in a debounce window invokes
`fn` immediately. Calls made during that window are delayed until `wait`
milliseconds have elapsed since the most recent call. A trailing invocation
only occurs if the debounced function was called again during the window.
The window begins before `fn` is invoked, so recursive calls and calls made
while an asynchronous `fn` is pending are part of the same window if they occur
before the delay expires. This also applies to calls made after a synchronous
`fn` returns but before the delay expires.

If `options.signal` is aborted, pending and future calls reject with an
`AbortError`, with the signal's reason set as the error's `cause`, and `fn` is
not invoked by those calls. If the signal is already aborted, `debounce()`
throws an `AbortError`.

The returned function has the following properties:

* `cancel([reason])` cancels the current debounce window. Its pending promises
  reject with an `AbortError`. If provided, `reason` is set as the error's
  `cause`.
* `flush()` cancels the delay and invokes `fn` immediately. It has no effect if
  no invocation is pending.
* `pending` {Promise|null} is the promise returned by the most recent call in
  the current debounce window, or `null` if no invocation is pending.
* `pendingCount` {integer} is the number of calls awaiting the invocation in
  the current debounce window.
* `ref()` makes the pending and future timeout keep the Node.js event loop
  active. Returns the debounced function.
* `unref()` allows the event loop to exit while a timeout is pending. This also
  applies to future timeouts. Returns the debounced function.

When invoked, `fn` has the debounced function as its `this` value. After a
trailing invocation, a new debounce window can begin even if a promise returned
by `fn` is still pending. The debounced function preserves the `name` and
`length` of `fn`.

```mjs
import { setTimeout as wait } from 'node:timers/promises';
import { debounce } from 'node:util';

const fn = debounce(async (value) => {
  await wait(100);
  return value;
}, 50);

const first = fn(1);
const second = fn(2);

console.log(await first);  // 2
console.log(await second); // 2
```

A debounced function can be used to trigger an action after a period of
inactivity. Each call resets the timeout:

```cjs
const { debounce } = require('node:util');

const onInactivity = debounce(() => {
  console.log('No activity for 5 seconds');
}, 5_000).unref();

process.stdin.on('data', (data) => {
  console.log(`Received ${data.length} bytes`);
  onInactivity();
});

// Start the initial inactivity timeout.
onInactivity();
```
