---
title: "Process (part 4 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Process (part 4 of 10)

## `process.chdir(directory)`

* `directory` {string}

The `process.chdir()` method changes the current working directory of the
Node.js process or throws an exception if doing so fails (for instance, if
the specified `directory` does not exist).

```mjs
import { chdir, cwd } from 'node:process';

console.log(`Starting directory: ${cwd()}`);
try {
  chdir('/tmp');
  console.log(`New directory: ${cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}
```

```cjs
const { chdir, cwd } = require('node:process');

console.log(`Starting directory: ${cwd()}`);
try {
  chdir('/tmp');
  console.log(`New directory: ${cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}
```

This feature is not available in `Worker` threads.

## `process.config`

* Type: {Object}

The `process.config` property returns a frozen `Object` containing the
JavaScript representation of the configure options used to compile the current
Node.js executable. This is the same as the `config.gypi` file that was produced
when running the `./configure` script.

An example of the possible output looks like:

```json
{
  "target_defaults":
   { "cflags": [],
     "default_configuration": "Release",
     "defines": [],
     "include_dirs": [],
     "libraries": [] },
  "variables":
   {
     "host_arch": "x64",
     "napi_build_version": 5,
     "node_install_npm": "true",
     "node_prefix": "",
     "node_shared_cares": "false",
     "node_shared_http_parser": "false",
     "node_shared_libuv": "false",
     "node_shared_zlib": "false",
     "node_use_openssl": "true",
     "node_shared_openssl": "false",
     "target_arch": "x64",
     "v8_use_snapshot": 1
   }
}
```

## `process.connected`

* Type: {boolean}

If the Node.js process is spawned with an IPC channel (see the Child Process
and Cluster documentation), the `process.connected` property will return
`true` so long as the IPC channel is connected and will return `false` after
`process.disconnect()` is called.

Once `process.connected` is `false`, it is no longer possible to send messages
over the IPC channel using `process.send()`.

## `process.constrainedMemory()`

* Returns: {number}

Gets the amount of memory available to the process (in bytes) based on
limits imposed by the OS. If there is no such constraint, or the constraint
is unknown, `0` is returned.

See `uv_get_constrained_memory` for more
information.

## `process.cpuUsage([previousValue])`

* `previousValue` {Object} A previous return value from calling
  `process.cpuUsage()`
* Returns: {Object}
  * `user` {integer}
  * `system` {integer}

The `process.cpuUsage()` method returns the user and system CPU time usage of
the current process, in an object with properties `user` and `system`, whose
values are microsecond values (millionth of a second). These values measure time
spent in user and system code respectively, and may end up being greater than
actual elapsed time if multiple CPU cores are performing work for this process.

The result of a previous call to `process.cpuUsage()` can be passed as the
argument to the function, to get a diff reading.

```mjs
import { cpuUsage } from 'node:process';

const startUsage = cpuUsage();
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log(cpuUsage(startUsage));
// { user: 514883, system: 11226 }
```

```cjs
const { cpuUsage } = require('node:process');

const startUsage = cpuUsage();
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log(cpuUsage(startUsage));
// { user: 514883, system: 11226 }
```

## `process.cwd()`

* Returns: {string}

The `process.cwd()` method returns the current working directory of the Node.js
process.

```mjs
import { cwd } from 'node:process';

console.log(`Current directory: ${cwd()}`);
```

```cjs
const { cwd } = require('node:process');

console.log(`Current directory: ${cwd()}`);
```

## `process.debugPort`

* Type: {number}

The port used by the Node.js debugger when enabled.

```mjs
import process from 'node:process';

process.debugPort = 5858;
```

```cjs
process.debugPort = 5858;
```

## `process.disconnect()`

If the Node.js process is spawned with an IPC channel (see the Child Process
and Cluster documentation), the `process.disconnect()` method will close the
IPC channel to the parent process, allowing the child process to exit gracefully
once there are no other connections keeping it alive.

The effect of calling `process.disconnect()` is the same as calling
`ChildProcess.disconnect()` from the parent process.

If the Node.js process was not spawned with an IPC channel,
`process.disconnect()` will be `undefined`.

## `process.dlopen(module, filename[, flags])`

* `module` {Object}
* `filename` {string}
* `flags` {os.constants.dlopen} **Default:** `os.constants.dlopen.RTLD_LAZY`

The `process.dlopen()` method allows dynamically loading shared objects. It is
primarily used by `require()` to load C++ Addons, and should not be used
directly, except in special cases. In other words, `require()` should be
preferred over `process.dlopen()` unless there are specific reasons such as
custom dlopen flags or loading from ES modules.

The `flags` argument is an integer that allows to specify dlopen
behavior. See the `os.constants.dlopen` documentation for details.

An important requirement when calling `process.dlopen()` is that the `module`
instance must be passed. Functions exported by the C++ Addon are then
accessible via `module.exports`.

The example below shows how to load a C++ Addon, named `local.node`,
that exports a `foo` function. All the symbols are loaded before
the call returns, by passing the `RTLD_NOW` constant. In this example
the constant is assumed to be available.

```mjs
import { dlopen } from 'node:process';
import { constants } from 'node:os';
import { fileURLToPath } from 'node:url';

const module = { exports: {} };
dlopen(module, fileURLToPath(new URL('local.node', import.meta.url)),
       constants.dlopen.RTLD_NOW);
module.exports.foo();
```

```cjs
const { dlopen } = require('node:process');
const { constants } = require('node:os');
const { join } = require('node:path');

const module = { exports: {} };
dlopen(module, join(__dirname, 'local.node'), constants.dlopen.RTLD_NOW);
module.exports.foo();
```

## `process.emitWarning(warning[, options])`

* `warning` {string|Error} The warning to emit.
* `options` {Object}
  * `type` {string} When `warning` is a `String`, `type` is the name to use
    for the _type_ of warning being emitted. **Default:** `'Warning'`.
  * `code` {string} A unique identifier for the warning instance being emitted.
  * `ctor` {Function} When `warning` is a `String`, `ctor` is an optional
    function used to limit the generated stack trace. **Default:**
    `process.emitWarning`.
  * `detail` {string} Additional text to include with the error.

The `process.emitWarning()` method can be used to emit custom or application
specific process warnings. These can be listened for by adding a handler to the
`'warning'` event.

```mjs
import { emitWarning } from 'node:process';

// Emit a warning with a code and additional detail.
emitWarning('Something happened!', {
  code: 'MY_WARNING',
  detail: 'This is some additional information',
});
// Emits:
// (node:56338) [MY_WARNING] Warning: Something happened!
// This is some additional information
```

```cjs
const { emitWarning } = require('node:process');

// Emit a warning with a code and additional detail.
emitWarning('Something happened!', {
  code: 'MY_WARNING',
  detail: 'This is some additional information',
});
// Emits:
// (node:56338) [MY_WARNING] Warning: Something happened!
// This is some additional information
```

In this example, an `Error` object is generated internally by
`process.emitWarning()` and passed through to the
`'warning'` handler.

```mjs
import process from 'node:process';

process.on('warning', (warning) => {
  console.warn(warning.name);    // 'Warning'
  console.warn(warning.message); // 'Something happened!'
  console.warn(warning.code);    // 'MY_WARNING'
  console.warn(warning.stack);   // Stack trace
  console.warn(warning.detail);  // 'This is some additional information'
});
```

```cjs
process.on('warning', (warning) => {
  console.warn(warning.name);    // 'Warning'
  console.warn(warning.message); // 'Something happened!'
  console.warn(warning.code);    // 'MY_WARNING'
  console.warn(warning.stack);   // Stack trace
  console.warn(warning.detail);  // 'This is some additional information'
});
```

If `warning` is passed as an `Error` object, the `options` argument is ignored.

## `process.emitWarning(warning, type[, code])`

* `warning` {string|Error} The warning to emit.
* `type` {string} When `warning` is a `String`, `type` is the name to use
  for the _type_ of warning being emitted. **Default:** `'Warning'`.
* `code` {string} A unique identifier for the warning instance being emitted.
* `ctor` {Function} When `warning` is a `String`, `ctor` is an optional
  function used to limit the generated stack trace. **Default:**
  `process.emitWarning`.

The `process.emitWarning()` method can be used to emit custom or application
specific process warnings. These can be listened for by adding a handler to the
`'warning'` event.

```mjs
import { emitWarning } from 'node:process';

// Emit a warning using a string.
emitWarning('Something happened!');
// Emits: (node: 56338) Warning: Something happened!
```

```cjs
const { emitWarning } = require('node:process');

// Emit a warning using a string.
emitWarning('Something happened!');
// Emits: (node: 56338) Warning: Something happened!
```

```mjs
import { emitWarning } from 'node:process';

// Emit a warning using a string and a type.
emitWarning('Something Happened!', 'CustomWarning');
// Emits: (node:56338) CustomWarning: Something Happened!
```

```cjs
const { emitWarning } = require('node:process');

// Emit a warning using a string and a type.
emitWarning('Something Happened!', 'CustomWarning');
// Emits: (node:56338) CustomWarning: Something Happened!
```

```mjs
import { emitWarning } from 'node:process';

emitWarning('Something happened!', 'CustomWarning', 'WARN001');
// Emits: (node:56338) [WARN001] CustomWarning: Something happened!
```

```cjs
const { emitWarning } = require('node:process');

process.emitWarning('Something happened!', 'CustomWarning', 'WARN001');
// Emits: (node:56338) [WARN001] CustomWarning: Something happened!
```

In each of the previous examples, an `Error` object is generated internally by
`process.emitWarning()` and passed through to the `'warning'`
handler.

```mjs
import process from 'node:process';

process.on('warning', (warning) => {
  console.warn(warning.name);
  console.warn(warning.message);
  console.warn(warning.code);
  console.warn(warning.stack);
});
```

```cjs
process.on('warning', (warning) => {
  console.warn(warning.name);
  console.warn(warning.message);
  console.warn(warning.code);
  console.warn(warning.stack);
});
```

If `warning` is passed as an `Error` object, it will be passed through to the
`'warning'` event handler unmodified (and the optional `type`,
`code` and `ctor` arguments will be ignored):

```mjs
import { emitWarning } from 'node:process';

// Emit a warning using an Error object.
const myWarning = new Error('Something happened!');
// Use the Error name property to specify the type name
myWarning.name = 'CustomWarning';
myWarning.code = 'WARN001';

emitWarning(myWarning);
// Emits: (node:56338) [WARN001] CustomWarning: Something happened!
```

```cjs
const { emitWarning } = require('node:process');

// Emit a warning using an Error object.
const myWarning = new Error('Something happened!');
// Use the Error name property to specify the type name
myWarning.name = 'CustomWarning';
myWarning.code = 'WARN001';

emitWarning(myWarning);
// Emits: (node:56338) [WARN001] CustomWarning: Something happened!
```

A `TypeError` is thrown if `warning` is anything other than a string or `Error`
object.

While process warnings use `Error` objects, the process warning
mechanism is **not** a replacement for normal error handling mechanisms.

The following additional handling is implemented if the warning `type` is
`'DeprecationWarning'`:

* If the `--throw-deprecation` command-line flag is used, the deprecation
  warning is thrown as an exception rather than being emitted as an event.
* If the `--no-deprecation` command-line flag is used, the deprecation
  warning is suppressed.
* If the `--trace-deprecation` command-line flag is used, the deprecation
  warning is printed to `stderr` along with the full stack trace.

### Avoiding duplicate warnings

As a best practice, warnings should be emitted only once per process. To do
so, place the `emitWarning()` behind a boolean.

```mjs
import { emitWarning } from 'node:process';

function emitMyWarning() {
  if (!emitMyWarning.warned) {
    emitMyWarning.warned = true;
    emitWarning('Only warn once!');
  }
}
emitMyWarning();
// Emits: (node: 56339) Warning: Only warn once!
emitMyWarning();
// Emits nothing
```

```cjs
const { emitWarning } = require('node:process');

function emitMyWarning() {
  if (!emitMyWarning.warned) {
    emitMyWarning.warned = true;
    emitWarning('Only warn once!');
  }
}
emitMyWarning();
// Emits: (node: 56339) Warning: Only warn once!
emitMyWarning();
// Emits nothing
```
