---
title: "Process (part 9 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Process (part 9 of 10)

## `process.resourceUsage()`

* Returns: {Object} the resource usage for the current process. All of these
  values come from the `uv_getrusage` call which returns
  a `uv_rusage_t` struct.
  * `userCPUTime` {integer} maps to `ru_utime` computed in microseconds.
    It is the same value as `process.cpuUsage().user`.
  * `systemCPUTime` {integer} maps to `ru_stime` computed in microseconds.
    It is the same value as `process.cpuUsage().system`.
  * `maxRSS` {integer} maps to `ru_maxrss` which is the maximum resident set
    size used in kibibytes (1024 bytes).
  * `sharedMemorySize` {integer} maps to `ru_ixrss` but is not supported by
    any platform.
  * `unsharedDataSize` {integer} maps to `ru_idrss` but is not supported by
    any platform.
  * `unsharedStackSize` {integer} maps to `ru_isrss` but is not supported by
    any platform.
  * `minorPageFault` {integer} maps to `ru_minflt` which is the number of
    minor page faults for the process, see
    this article for more details.
  * `majorPageFault` {integer} maps to `ru_majflt` which is the number of
    major page faults for the process, see
    this article for more details. This field is not
    supported on Windows.
  * `swappedOut` {integer} maps to `ru_nswap` but is not supported by any
    platform.
  * `fsRead` {integer} maps to `ru_inblock` which is the number of times the
    file system had to perform input.
  * `fsWrite` {integer} maps to `ru_oublock` which is the number of times the
    file system had to perform output.
  * `ipcSent` {integer} maps to `ru_msgsnd` but is not supported by any
    platform.
  * `ipcReceived` {integer} maps to `ru_msgrcv` but is not supported by any
    platform.
  * `signalsCount` {integer} maps to `ru_nsignals` but is not supported by any
    platform.
  * `voluntaryContextSwitches` {integer} maps to `ru_nvcsw` which is the
    number of times a CPU context switch resulted due to a process voluntarily
    giving up the processor before its time slice was completed (usually to
    await availability of a resource). This field is not supported on Windows.
  * `involuntaryContextSwitches` {integer} maps to `ru_nivcsw` which is the
    number of times a CPU context switch resulted due to a higher priority
    process becoming runnable or because the current process exceeded its
    time slice. This field is not supported on Windows.

```mjs
import { resourceUsage } from 'node:process';

console.log(resourceUsage());
/*
  Will output:
  {
    userCPUTime: 82872,
    systemCPUTime: 4143,
    maxRSS: 33164,
    sharedMemorySize: 0,
    unsharedDataSize: 0,
    unsharedStackSize: 0,
    minorPageFault: 2469,
    majorPageFault: 0,
    swappedOut: 0,
    fsRead: 0,
    fsWrite: 8,
    ipcSent: 0,
    ipcReceived: 0,
    signalsCount: 0,
    voluntaryContextSwitches: 79,
    involuntaryContextSwitches: 1
  }
*/
```

```cjs
const { resourceUsage } = require('node:process');

console.log(resourceUsage());
/*
  Will output:
  {
    userCPUTime: 82872,
    systemCPUTime: 4143,
    maxRSS: 33164,
    sharedMemorySize: 0,
    unsharedDataSize: 0,
    unsharedStackSize: 0,
    minorPageFault: 2469,
    majorPageFault: 0,
    swappedOut: 0,
    fsRead: 0,
    fsWrite: 8,
    ipcSent: 0,
    ipcReceived: 0,
    signalsCount: 0,
    voluntaryContextSwitches: 79,
    involuntaryContextSwitches: 1
  }
*/
```

## `process.send(message, sendHandle[, options])`

* `message` {Object}
* `sendHandle` {net.Server|net.Socket}
* `options` {Object} used to parameterize the sending of certain types of
  handles.`options` supports the following properties:
  * `keepOpen` {boolean} A value that can be used when passing instances of
    `net.Socket`. When `true`, the socket is kept open in the sending process.
    **Default:** `false`.
* `callback` {Function}
* Returns: {boolean}

If Node.js is spawned with an IPC channel, the `process.send()` method can be
used to send messages to the parent process. Messages will be received as a
`'message'` event on the parent's `ChildProcess` object.

If Node.js was not spawned with an IPC channel, `process.send` will be
`undefined`.

The message goes through serialization and parsing. The resulting message might
not be the same as what is originally sent.

## `process.setegid(id)`

* `id` {string|number} A group name or ID

The `process.setegid()` method sets the effective group identity of the process.
(See setegid(2).) The `id` can be passed as either a numeric ID or a group
name string. If a group name is specified, this method blocks while resolving
the associated a numeric ID.

```mjs
import process from 'node:process';

if (process.getegid && process.setegid) {
  console.log(`Current gid: ${process.getegid()}`);
  try {
    process.setegid(501);
    console.log(`New gid: ${process.getegid()}`);
  } catch (err) {
    console.error(`Failed to set gid: ${err}`);
  }
}
```

```cjs
if (process.getegid && process.setegid) {
  console.log(`Current gid: ${process.getegid()}`);
  try {
    process.setegid(501);
    console.log(`New gid: ${process.getegid()}`);
  } catch (err) {
    console.error(`Failed to set gid: ${err}`);
  }
}
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).
This feature is not available in `Worker` threads.

## `process.seteuid(id)`

* `id` {string|number} A user name or ID

The `process.seteuid()` method sets the effective user identity of the process.
(See seteuid(2).) The `id` can be passed as either a numeric ID or a username
string. If a username is specified, the method blocks while resolving the
associated numeric ID.

```mjs
import process from 'node:process';

if (process.geteuid && process.seteuid) {
  console.log(`Current uid: ${process.geteuid()}`);
  try {
    process.seteuid(501);
    console.log(`New uid: ${process.geteuid()}`);
  } catch (err) {
    console.error(`Failed to set uid: ${err}`);
  }
}
```

```cjs
if (process.geteuid && process.seteuid) {
  console.log(`Current uid: ${process.geteuid()}`);
  try {
    process.seteuid(501);
    console.log(`New uid: ${process.geteuid()}`);
  } catch (err) {
    console.error(`Failed to set uid: ${err}`);
  }
}
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).
This feature is not available in `Worker` threads.

## `process.setgid(id)`

* `id` {string|number} The group name or ID

The `process.setgid()` method sets the group identity of the process. (See
setgid(2).) The `id` can be passed as either a numeric ID or a group name
string. If a group name is specified, this method blocks while resolving the
associated numeric ID.

```mjs
import process from 'node:process';

if (process.getgid && process.setgid) {
  console.log(`Current gid: ${process.getgid()}`);
  try {
    process.setgid(501);
    console.log(`New gid: ${process.getgid()}`);
  } catch (err) {
    console.error(`Failed to set gid: ${err}`);
  }
}
```

```cjs
if (process.getgid && process.setgid) {
  console.log(`Current gid: ${process.getgid()}`);
  try {
    process.setgid(501);
    console.log(`New gid: ${process.getgid()}`);
  } catch (err) {
    console.error(`Failed to set gid: ${err}`);
  }
}
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).
This feature is not available in `Worker` threads.

## `process.setgroups(groups)`

* `groups` {integer\[]}

The `process.setgroups()` method sets the supplementary group IDs for the
Node.js process. This is a privileged operation that requires the Node.js
process to have `root` or the `CAP_SETGID` capability.

The `groups` array can contain numeric group IDs, group names, or both.

```mjs
import process from 'node:process';

if (process.getgroups && process.setgroups) {
  try {
    process.setgroups([501]);
    console.log(process.getgroups()); // new groups
  } catch (err) {
    console.error(`Failed to set groups: ${err}`);
  }
}
```

```cjs
if (process.getgroups && process.setgroups) {
  try {
    process.setgroups([501]);
    console.log(process.getgroups()); // new groups
  } catch (err) {
    console.error(`Failed to set groups: ${err}`);
  }
}
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).
This feature is not available in `Worker` threads.

## `process.setuid(id)`

* `id` {integer | string}

The `process.setuid(id)` method sets the user identity of the process. (See
setuid(2).) The `id` can be passed as either a numeric ID or a username string.
If a username is specified, the method blocks while resolving the associated
numeric ID.

```mjs
import process from 'node:process';

if (process.getuid && process.setuid) {
  console.log(`Current uid: ${process.getuid()}`);
  try {
    process.setuid(501);
    console.log(`New uid: ${process.getuid()}`);
  } catch (err) {
    console.error(`Failed to set uid: ${err}`);
  }
}
```

```cjs
if (process.getuid && process.setuid) {
  console.log(`Current uid: ${process.getuid()}`);
  try {
    process.setuid(501);
    console.log(`New uid: ${process.getuid()}`);
  } catch (err) {
    console.error(`Failed to set uid: ${err}`);
  }
}
```

This function is only available on POSIX platforms (i.e. not Windows or
Android).
This feature is not available in `Worker` threads.

## `process.setSourceMapsEnabled(val)`

> Stability: 1 - Experimental: Use `module.setSourceMapsSupport()` instead.

* `val` {boolean}

This function enables or disables the Source Map support for
stack traces.

It provides same features as launching Node.js process with commandline options
`--enable-source-maps`.

Only source maps in JavaScript files that are loaded after source maps has been
enabled will be parsed and loaded.

This implies calling `module.setSourceMapsSupport()` with an option
`{ nodeModules: true, generatedCode: true }`.

## `process.setUncaughtExceptionCaptureCallback(fn)`

* `fn` {Function|null}

The `process.setUncaughtExceptionCaptureCallback()` function sets a function
that will be invoked when an uncaught exception occurs, which will receive the
exception value itself as its first argument.

If such a function is set, the `'uncaughtException'` event will
not be emitted. If `--abort-on-uncaught-exception` was passed from the
command line or set through `v8.setFlagsFromString()`, the process will
not abort. Actions configured to take place on exceptions such as report
generations will be affected too

To unset the capture function,
`process.setUncaughtExceptionCaptureCallback(null)` may be used. Calling this
method with a non-`null` argument while another capture function is set will
throw an error.

To register multiple callbacks that can coexist, use
`process.addUncaughtExceptionCaptureCallback()` instead.

## `process.sourceMapsEnabled`

> Stability: 1 - Experimental: Use `module.getSourceMapsSupport()` instead.

* Type: {boolean}

The `process.sourceMapsEnabled` property returns whether the
Source Map support for stack traces is enabled.

## `process.stderr`

* Type: {Stream}

The `process.stderr` property returns a stream connected to
`stderr` (fd `2`). It is a `net.Socket` (which is a Duplex
stream) unless fd `2` refers to a file, in which case it is
a Writable stream.

`process.stderr` differs from other Node.js streams in important ways. See
note on process I/O for more information.

### `process.stderr.fd`

* Type: {number}

This property refers to the value of underlying file descriptor of
`process.stderr`. The value is fixed at `2`. In `Worker` threads,
this field does not exist.

## `process.stdin`

* Type: {Stream}

The `process.stdin` property returns a stream connected to
`stdin` (fd `0`). It is a `net.Socket` (which is a Duplex
stream) unless fd `0` refers to a file, in which case it is
a Readable stream.

For details of how to read from `stdin` see `readable.read()`.

As a Duplex stream, `process.stdin` can also be used in "old" mode that
is compatible with scripts written for Node.js prior to v0.10.
For more information see Stream compatibility.

In "old" streams mode the `stdin` stream is paused by default, so one
must call `process.stdin.resume()` to read from it. Note also that calling
`process.stdin.resume()` itself would switch stream to "old" mode.

### `process.stdin.fd`

* Type: {number}

This property refers to the value of underlying file descriptor of
`process.stdin`. The value is fixed at `0`. In `Worker` threads,
this field does not exist.
