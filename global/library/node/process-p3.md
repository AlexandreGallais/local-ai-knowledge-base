---
title: "Process (part 3 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Process (part 3 of 10)

### Event: `'warning'`

* `warning` {Error} Key <example-value> of the warning are:
  * `name` {string} The name of the warning. **Default:** `'Warning'`.
  * `message` {string} A system-provided description of the warning.
  * `stack` {string} A stack trace to the location in the code where the warning
    was issued.

The `'warning'` event is emitted whenever Node.js emits a process warning.

A process warning is similar to an error in that it describes exceptional
conditions that are being brought to the user's attention. However, warnings
are not part of the normal Node.js and JavaScript error handling flow.
Node.js can emit warnings whenever it detects bad coding practices that could
lead to sub-optimal application performance, bugs, or security vulnerabilities.

```mjs
import process from 'node:process';

process.on('warning', (warning) => {
  console.warn(warning.name);    // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack);   // Print the stack trace
});
```

```cjs
process.on('warning', (warning) => {
  console.warn(warning.name);    // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack);   // Print the stack trace
});
```

By default, Node.js will print process warnings to `stderr`. The `--no-warnings`
command-line option can be used to suppress the default console output but the
`'warning'` event will still be emitted by the `process` object. Currently, it
is not possible to suppress specific warning types other than deprecation
warnings. To suppress deprecation warnings, check out the `--no-deprecation`
flag.

The following example illustrates the warning that is printed to `stderr` when
too many listeners have been added to an event:

```console
$ node
> events.defaultMaxListeners = 1;
> process.on('foo', () => {});
> process.on('foo', () => {});
> (node:38638) MaxListenersExceededWarning: Possible EventEmitter memory leak
detected. 2 foo listeners added. Use emitter.setMaxListeners() to increase limit
```

In contrast, the following example turns off the default warning output and
adds a custom handler to the `'warning'` event:

```console
$ node --no-warnings
> const p = process.on('warning', (warning) => console.warn('Do not do that!'));
> events.defaultMaxListeners = 1;
> process.on('foo', () => {});
> process.on('foo', () => {});
> Do not do that!
```

The `--trace-warnings` command-line option can be used to have the default
console output for warnings include the full stack trace of the warning.

Launching Node.js using the `--throw-deprecation` command-line flag will
cause custom deprecation warnings to be thrown as exceptions.

Using the `--trace-deprecation` command-line flag will cause the custom
deprecation to be printed to `stderr` along with the stack trace.

Using the `--no-deprecation` command-line flag will suppress all reporting
of the custom deprecation.

The `*-deprecation` command-line flags only affect warnings that use the name
`'DeprecationWarning'`.

#### Emitting custom warnings

See the `process.emitWarning()` method for issuing
custom or application-specific warnings.

#### Node.js warning names

There are no strict guidelines for warning types (as identified by the `name`
property) emitted by Node.js. New types of warnings can be added at any time.
A few of the warning types that are most common include:

* `'DeprecationWarning'` - Indicates use of a deprecated Node.js API or feature.
  Such warnings must include a `'code'` property identifying the
  deprecation code.
* `'ExperimentalWarning'` - Indicates use of an experimental Node.js API or
  feature. Such features must be used with caution as they may change at any
  time and are not subject to the same strict semantic-versioning and long-term
  support policies as supported features.
* `'MaxListenersExceededWarning'` - Indicates that too many listeners for a
  given event have been registered on either an `EventEmitter` or `EventTarget`.
  This is often an indication of a memory leak.
* `'TimeoutOverflowWarning'` - Indicates that a numeric value that cannot fit
  within a 32-bit signed integer has been provided to either the `setTimeout()`
  or `setInterval()` functions.
* `'TimeoutNegativeWarning'` - Indicates that a negative number has provided to
  either the `setTimeout()` or `setInterval()` functions.
* `'TimeoutNaNWarning'` - Indicates that a value which is not a number has
  provided to either the `setTimeout()` or `setInterval()` functions.
* `'UnsupportedWarning'` - Indicates use of an unsupported option or feature
  that will be ignored rather than treated as an error. One example is use of
  the HTTP response status message when using the HTTP/2 compatibility API.

### Event: `'worker'`

* `worker` {Worker} The {Worker} that was created.

The `'worker'` event is emitted after a new {Worker} thread has been created.

### Signal events

Signal events will be emitted when the Node.js process receives a signal. Please
refer to signal(7) for a listing of standard POSIX signal names such as
`'SIGINT'`, `'SIGHUP'`, etc.

Signals are not available on `Worker` threads.

The signal handler will receive the signal's name (`'SIGINT'`,
`'SIGTERM'`, etc.) as the first argument.

The name of each event will be the uppercase common name for the signal (e.g.
`'SIGINT'` for `SIGINT` signals).

```mjs
import process from 'node:process';

// Begin reading from stdin so the process does not exit.
process.stdin.resume();

process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});

// Using a single function to handle multiple signals
function handle(signal) {
  console.log(`Received ${signal}`);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
```

```cjs
// Begin reading from stdin so the process does not exit.
process.stdin.resume();

process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});

// Using a single function to handle multiple signals
function handle(signal) {
  console.log(`Received ${signal}`);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
```

* `'SIGUSR1'` is reserved by Node.js to start the debugger. It's possible to
  install a listener but doing so might interfere with the debugger.
* `'SIGTERM'` and `'SIGINT'` have default handlers on non-Windows platforms that
  reset the terminal mode before exiting with code `128 + signal number`. If one
  of these signals has a listener installed, its default behavior will be
  removed. Signal events are emitted asynchronously, so Node.js may exit before
  the listener is called if the event loop is otherwise empty.
* `'SIGPIPE'` is ignored by default. It can have a listener installed.
* `'SIGHUP'` is generated on Windows when the console window is closed, and on
  other platforms under various similar conditions. See signal(7). It can have a
  listener installed, however Node.js will be unconditionally terminated by
  Windows about 10 seconds later. On non-Windows platforms, the default
  behavior of `SIGHUP` is to terminate Node.js, but once a listener has been
  installed its default behavior will be removed.
* `'SIGTERM'` is not supported on Windows, it can be listened on.
* `'SIGINT'` from the terminal is supported on all platforms, and can usually be
  generated with `Ctrl`+`C` (though this may be configurable).
  It is not generated when terminal raw mode is enabled
  and `Ctrl`+`C` is used.
* `'SIGBREAK'` is delivered on Windows when `Ctrl`+`Break` is
  pressed. On non-Windows platforms, it can be listened on, but there is no way
  to send or generate it.
* `'SIGWINCH'` is delivered when the console has been resized. On Windows, this
  will only happen on write to the console when the cursor is being moved, or
  when a readable tty is used in raw mode.
* `'SIGKILL'` cannot have a listener installed, it will unconditionally
  terminate Node.js on all platforms.
* `'SIGSTOP'` cannot have a listener installed.
* `'SIGBUS'`, `'SIGFPE'`, `'SIGSEGV'`, and `'SIGILL'`, when not raised
  artificially using kill(2), inherently leave the process in a state from
  which it is not safe to call JS listeners. Doing so might cause the process
  to stop responding.
* `0` can be sent to test for the existence of a process, it has no effect if
  the process exists, but will throw an error if the process does not exist.

Windows does not support signals so has no equivalent to termination by signal,
but Node.js offers some emulation with `process.kill()`, and
`subprocess.kill()`:

* Sending `SIGINT`, `SIGTERM`, and `SIGKILL` will cause the unconditional
  termination of the target process, and afterwards, subprocess will report that
  the process was terminated by signal.
* Sending signal `0` can be used as a platform independent way to test for the
  existence of a process.

## `process.abort()`

The `process.abort()` method causes the Node.js process to exit immediately and
generate a core file.

This feature is not available in `Worker` threads.

## `process.addUncaughtExceptionCaptureCallback(fn)`

> Stability: 1 - Experimental

* `fn` {Function}

The `process.addUncaughtExceptionCaptureCallback()` function adds a callback
that will be invoked when an uncaught exception occurs, receiving the exception
value as its first argument.

Unlike `process.setUncaughtExceptionCaptureCallback()`, this function allows
multiple callbacks to be registered and does not conflict with the
`domain` module. Callbacks are called in reverse order of registration
(most recent first). If a callback returns `true`, subsequent callbacks
and the default uncaught exception handling are skipped.

```mjs
import process from 'node:process';

process.addUncaughtExceptionCaptureCallback((err) => {
  console.error('Caught exception:', err.message);
  return true; // Indicates exception was handled
});
```

```cjs
process.addUncaughtExceptionCaptureCallback((err) => {
  console.error('Caught exception:', err.message);
  return true; // Indicates exception was handled
});
```

## `process.allowedNodeEnvironmentFlags`

* Type: {Set}

The `process.allowedNodeEnvironmentFlags` property is a special,
read-only `Set` of flags allowable within the `NODE_OPTIONS`
environment variable.

`process.allowedNodeEnvironmentFlags` extends `Set`, but overrides
`Set.prototype.has` to recognize several different possible flag
representations. `process.allowedNodeEnvironmentFlags.has()` will
return `true` in the following cases:

* Flags may omit leading single (`-`) or double (`--`) dashes; e.g.,
  `inspect-brk` for `--inspect-brk`, or `r` for `-r`.
* Flags passed through to V8 (as listed in `--v8-options`) may replace
  one or more _non-leading_ dashes for an underscore, or vice-versa;
  e.g., `--perf_basic_prof`, `--perf-basic-prof`, `--perf_basic-prof`,
  etc.
* Flags may contain one or more equals (`=`) characters; all
  characters after and including the first equals will be ignored;
  e.g., `--stack-trace-limit=100`.
* Flags _must_ be allowable within `NODE_OPTIONS`.

When iterating over `process.allowedNodeEnvironmentFlags`, flags will
appear only _once_; each will begin with one or more dashes. Flags
passed through to V8 will contain underscores instead of non-leading
dashes:

```mjs
import { allowedNodeEnvironmentFlags } from 'node:process';

allowedNodeEnvironmentFlags.forEach((flag) => {
  // -r
  // --inspect-brk
  // --abort_on_uncaught_exception
  // ...
});
```

```cjs
const { allowedNodeEnvironmentFlags } = require('node:process');

allowedNodeEnvironmentFlags.forEach((flag) => {
  // -r
  // --inspect-brk
  // --abort_on_uncaught_exception
  // ...
});
```

The methods `add()`, `clear()`, and `delete()` of
`process.allowedNodeEnvironmentFlags` do nothing, and will fail
silently.

If Node.js was compiled _without_ `NODE_OPTIONS` support (shown in
`process.config`), `process.allowedNodeEnvironmentFlags` will
contain what _would have_ been allowable.

## `process.arch`

* Type: {string}

The operating system CPU architecture for which the Node.js binary was compiled.
Possible values are: `'arm'`, `'arm64'`, `'ia32'`, `'loong64'`, `'mips'`,
`'mipsel'`, `'ppc64'`, `'riscv64'`, `'s390'`, `'s390x'`, and `'x64'`.

```mjs
import { arch } from 'node:process';

console.log(`This processor architecture is ${arch}`);
```

```cjs
const { arch } = require('node:process');

console.log(`This processor architecture is ${arch}`);
```

## `process.argv`

* Type: {string\[]}

The `process.argv` property returns an array containing the command-line
arguments passed when the Node.js process was launched. The first element will
be `process.execPath`. See `process.argv0` if access to the original value
of `argv[0]` is needed. If a program entry point was provided, the second element
will be the absolute path to it. The remaining elements are additional command-line
arguments.

For example, assuming the following script for `process-args.js`:

```mjs
import { argv } from 'node:process';

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```

```cjs
const { argv } = require('node:process');

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```

Launching the Node.js process as:

```bash
node process-args.js one two=three four
```

Would generate the output:

```text
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```

## `process.argv0`

* Type: {string}

The `process.argv0` property stores a read-only copy of the original value of
`argv[0]` passed when Node.js starts.

```console
$ bash -c 'exec -a customArgv0 ./node'
> process.argv[0]
'/Volumes/code/external/node/out/Release/node'
> process.argv0
'customArgv0'
```

## `process.availableMemory()`

* Returns: {number}

Gets the amount of free memory that is still available to the process
(in bytes).

See `uv_get_available_memory` for more
information.

## `process.channel`

* Type: {Object}

If the Node.js process was spawned with an IPC channel (see the
Child Process documentation), the `process.channel`
property is a reference to the IPC channel. If no IPC channel exists, this
property is `undefined`.

### `process.channel.ref()`

This method makes the IPC channel keep the event loop of the process
running if `.unref()` has been called before.

Typically, this is managed through the number of `'disconnect'` and `'message'`
listeners on the `process` object. However, this method can be used to
explicitly request a specific behavior.

### `process.channel.unref()`

This method makes the IPC channel not keep the event loop of the process
running, and lets it finish even while the channel is open.

Typically, this is managed through the number of `'disconnect'` and `'message'`
listeners on the `process` object. However, this method can be used to
explicitly request a specific behavior.
