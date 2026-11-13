---
title: "Process (part 10 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Process (part 10 of 10)

## `process.stdout`

* Type: {Stream}

The `process.stdout` property returns a stream connected to
`stdout` (fd `1`). It is a `net.Socket` (which is a Duplex
stream) unless fd `1` refers to a file, in which case it is
a Writable stream.

For example, to copy `process.stdin` to `process.stdout`:

```mjs
import { stdin, stdout } from 'node:process';

stdin.pipe(stdout);
```

```cjs
const { stdin, stdout } = require('node:process');

stdin.pipe(stdout);
```

`process.stdout` differs from other Node.js streams in important ways. See
note on process I/O for more information.

### `process.stdout.fd`

* Type: {number}

This property refers to the value of underlying file descriptor of
`process.stdout`. The value is fixed at `1`. In `Worker` threads,
this field does not exist.

### A note on process I/O

`process.stdout` and `process.stderr` differ from other Node.js streams in
important ways:

1. They are used internally by `console.log()` and `console.error()`,
   respectively.
2. Writes may be synchronous depending on what the stream is connected to
   and whether the system is Windows or POSIX:
   * Files: _synchronous_ on Windows and POSIX
   * TTYs (Terminals): _asynchronous_ on Windows, _synchronous_ on POSIX
   * Pipes (and sockets): _synchronous_ on Windows, _asynchronous_ on POSIX

These behaviors are partly for historical reasons, as changing them would
create backward incompatibility, but they are also expected by some users.

Synchronous writes avoid problems such as output written with `console.log()` or
`console.error()` being unexpectedly interleaved, or not written at all if
`process.exit()` is called before an asynchronous write completes. See
`process.exit()` for more information.

_**Warning**_: Synchronous writes block the event loop until the write has
completed. This can be near instantaneous in the case of output to a file, but
under high system load, pipes that are not being read at the receiving end, or
with slow terminals or file systems, it's possible for the event loop to be
blocked often enough and long enough to have severe negative performance
impacts. This may not be a problem when writing to an interactive terminal
session, but consider this particularly careful when doing production logging to
the process output streams.

To check if a stream is connected to a TTY context, check the `isTTY`
property.

For instance:

```console
$ node -p "Boolean(process.stdin.isTTY)"
true
$ echo "foo" | node -p "Boolean(process.stdin.isTTY)"
false
$ node -p "Boolean(process.stdout.isTTY)"
true
$ node -p "Boolean(process.stdout.isTTY)" | cat
false
```

See the TTY documentation for more information.

## `process.throwDeprecation`

* Type: {boolean}

The initial value of `process.throwDeprecation` indicates whether the
`--throw-deprecation` flag is set on the current Node.js process.
`process.throwDeprecation` is mutable, so whether or not deprecation
warnings result in errors may be altered at runtime. See the
documentation for the `'warning'` event and the
`emitWarning()` method for more information.

```console
$ node --throw-deprecation -p "process.throwDeprecation"
true
$ node -p "process.throwDeprecation"
undefined
$ node
> process.emitWarning('test', 'DeprecationWarning');
undefined
> (node:26598) DeprecationWarning: test
> process.throwDeprecation = true;
true
> process.emitWarning('test', 'DeprecationWarning');
Thrown:
[DeprecationWarning: test] { name: 'DeprecationWarning' }
```

## `process.threadCpuUsage([previousValue])`

* `previousValue` {Object} A previous return value from calling
  `process.threadCpuUsage()`
* Returns: {Object}
  * `user` {integer}
  * `system` {integer}

The `process.threadCpuUsage()` method returns the user and system CPU time usage of
the current worker thread, in an object with properties `user` and `system`, whose
values are microsecond values (millionth of a second).

The result of a previous call to `process.threadCpuUsage()` can be passed as the
argument to the function, to get a diff reading.

## `process.title`

* Type: {string}

The `process.title` property returns the current process title (i.e. returns
the current value of `ps`). Assigning a new value to `process.title` modifies
the current value of `ps`.

When a new value is assigned, different platforms will impose different maximum
length restrictions on the title. Usually such restrictions are quite limited.
For instance, on Linux and macOS, `process.title` is limited to the size of the
binary name plus the length of the command-line arguments because setting the
`process.title` overwrites the `argv` memory of the process. Node.js 0.8
allowed for longer process title strings by also overwriting the `environ`
memory but that was potentially insecure and confusing in some (rather obscure)
cases.

Assigning a value to `process.title` might not result in an accurate label
within process manager applications such as macOS Activity Monitor or Windows
Services Manager.

## `process.traceDeprecation`

* Type: {boolean}

The `process.traceDeprecation` property indicates whether the
`--trace-deprecation` flag is set on the current Node.js process. See the
documentation for the `'warning'` event and the
`emitWarning()` method for more information about this
flag's behavior.

## `process.traceProcessWarnings`

* {boolean}

The `process.traceProcessWarnings` property indicates whether the `--trace-warnings` flag
is set on the current Node.js process. This property allows programmatic control over the
tracing of warnings, enabling or disabling stack traces for warnings at runtime.

```js
// Enable trace warnings
process.traceProcessWarnings = true;

// Emit a warning with a stack trace
process.emitWarning('Warning with stack trace');

// Disable trace warnings
process.traceProcessWarnings = false;
```

## `process.umask()`

> Stability: 0 - Deprecated. Calling `process.umask()` with no argument causes
> the process-wide umask to be written twice. This introduces a race condition
> between threads, and is a potential security vulnerability. There is no safe,
> cross-platform alternative API.

`process.umask()` returns the Node.js process's file mode creation mask. Child
processes inherit the mask from the parent process.

## `process.umask(mask)`

* `mask` {string|integer}

`process.umask(mask)` sets the Node.js process's file mode creation mask. Child
processes inherit the mask from the parent process. Returns the previous mask.

```mjs
import { umask } from 'node:process';

const newmask = 0o022;
const oldmask = umask(newmask);
console.log(
  `Changed umask from ${oldmask.toString(8)} to ${newmask.toString(8)}`,
);
```

```cjs
const { umask } = require('node:process');

const newmask = 0o022;
const oldmask = umask(newmask);
console.log(
  `Changed umask from ${oldmask.toString(8)} to ${newmask.toString(8)}`,
);
```

In `Worker` threads, `process.umask(mask)` will throw an exception.

## `process.unref(maybeRefable)`

* `maybeRefable` {any} An object that may be "unref'd".

An object is "unrefable" if it implements the Node.js "Refable protocol".
Specifically, this means that the object implements the `Symbol.for('nodejs.ref')`
and `Symbol.for('nodejs.unref')` methods. "Ref'd" objects will keep the Node.js
event loop alive, while "unref'd" objects will not. Historically, this was
implemented by using `ref()` and `unref()` methods directly on the objects.
This pattern, however, is being deprecated in favor of the "Refable protocol"
in order to better support Web Platform API types whose APIs cannot be modified
to add `ref()` and `unref()` methods but still need to support that behavior.

## `process.uptime()`

* Returns: {number}

The `process.uptime()` method returns the number of seconds the current Node.js
process has been running.

The return value includes fractions of a second. Use `Math.floor()` to get whole
seconds.

## `process.version`

* Type: {string}

The `process.version` property contains the Node.js version string.

```mjs
import { version } from 'node:process';

console.log(`Version: ${version}`);
// Version: v14.8.0
```

```cjs
const { version } = require('node:process');

console.log(`Version: ${version}`);
// Version: v14.8.0
```

To get the version string without the prepended _v_, use
`process.versions.node`.

## `process.versions`

* Type: {Object}

The `process.versions` property returns an object listing the version strings of
Node.js and its dependencies. `process.versions.modules` indicates the current
ABI version, which is increased whenever a C++ API changes. Node.js will refuse
to load modules that were compiled against a different module ABI version.

```mjs
import { versions } from 'node:process';

console.log(versions);
```

```cjs
const { versions } = require('node:process');

console.log(versions);
```

Will generate an object similar to:

```console
{ node: '26.0.0-pre',
  acorn: '8.15.0',
  ada: '3.4.1',
  amaro: '1.1.5',
  ares: '1.34.6',
  brotli: '1.2.0',
  merve: '1.0.0',
  cldr: '48.0',
  icu: '78.2',
  llhttp: '9.3.0',
  modules: '144',
  napi: '10',
  nbytes: '0.1.1',
  ncrypto: '0.0.1',
  nghttp2: '1.68.0',
  nghttp3: '',
  ngtcp2: '',
  openssl: '3.5.4',
  simdjson: '4.2.4',
  simdutf: '7.3.3',
  sqlite: '3.51.2',
  tz: '2025c',
  undici: '7.18.2',
  unicode: '17.0',
  uv: '1.51.0',
  uvwasi: '0.0.23',
  v8: '14.3.127.18-node.10',
  zlib: '1.3.1-e00f703',
  zstd: '1.5.7' }
```

## Exit codes

Node.js will normally exit with a `0` status code when no more async
operations are pending. The following status codes are used in other
cases:

* `1` **Uncaught Fatal Exception**: There was an uncaught exception,
  and it was not handled by a domain or an `'uncaughtException'` event
  handler.
* `2`: Unused (reserved by Bash for builtin misuse)
* `3` **Internal JavaScript Parse Error**: The JavaScript source code
  internal in the Node.js bootstrapping process caused a parse error. This
  is extremely rare, and generally can only happen during development
  of Node.js itself.
* `4` **Internal JavaScript Evaluation Failure**: The JavaScript
  source code internal in the Node.js bootstrapping process failed to
  return a function value when evaluated. This is extremely rare, and
  generally can only happen during development of Node.js itself.
* `5` **Fatal Error**: There was a fatal unrecoverable error in V8.
  Typically a message will be printed to stderr with the prefix `FATAL
  ERROR`.
* `6` **Non-function Internal Exception Handler**: There was an
  uncaught exception, but the internal fatal exception handler
  function was somehow set to a non-function, and could not be called.
* `7` **Internal Exception Handler Run-Time Failure**: There was an
  uncaught exception, and the internal fatal exception handler
  function itself threw an error while attempting to handle it. This
  can happen, for example, if an `'uncaughtException'` or
  `domain.on('error')` handler throws an error.
* `8`: Unused. In previous versions of Node.js, exit code 8 sometimes
  indicated an uncaught exception.
* `9` **Invalid Argument**: Either an unknown option was specified,
  or an option requiring a value was provided without a value.
* `10` **Internal JavaScript Run-Time Failure**: The JavaScript
  source code internal in the Node.js bootstrapping process threw an error
  when the bootstrapping function was called. This is extremely rare,
  and generally can only happen during development of Node.js itself.
* `12` **Invalid Debug Argument**: The `--inspect` and/or `--inspect-brk`
  options were set, but the port number chosen was invalid or unavailable.
* `13` **Unsettled Top-Level Await**: `await` was used outside of a function
  in the top-level code, but the passed `Promise` never settled.
* `14` **Snapshot Failure**: Node.js was started to build a V8 startup
  snapshot and it failed because certain requirements of the state of
  the application were not met.
* `124` **Process Timeout**: The process was still running when the duration
  set with `--process-timeout` elapsed.
* `>128` **Signal Exits**: If Node.js receives a fatal signal such as
  `SIGKILL` or `SIGHUP`, then its exit code will be `128` plus the
  value of the signal code. This is a standard POSIX practice, since
  exit codes are defined to be 7-bit integers, and signal exits set
  the high-order bit, and then contain the value of the signal code.
  For example, signal `SIGABRT` has value `6`, so the expected exit
  code will be `128` + `6`, or `134`.
