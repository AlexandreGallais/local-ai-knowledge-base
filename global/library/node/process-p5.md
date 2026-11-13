---
title: "Process (part 5 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Process (part 5 of 10)

## `process.env`

* Type: {Object}

The `process.env` property returns an object containing the user environment.
See environ(7).

An example of this object looks like:

```json
{
  "TERM": "xterm-256color",
  "SHELL": "/usr/local/bin/bash",
  "USER": "maciej",
  "PATH": "~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin",
  "PWD": "<example-value>",
  "EDITOR": "vim",
  "SHLVL": "1",
  "HOME": "/Users/maciej",
  "LOGNAME": "maciej",
  "_": "/usr/local/bin/node"
}
```

It is possible to modify this object, but such modifications will not be
reflected outside the Node.js process, or (unless explicitly requested)
to other `Worker` threads.
In other words, the following example would not work:

```bash
node -e 'process.env.foo = "bar"' && echo $foo
```

While the following will:

```mjs
import { env } from 'node:process';

env.foo = 'bar';
console.log(env.foo);
```

```cjs
const { env } = require('node:process');

env.foo = 'bar';
console.log(env.foo);
```

Assigning a property on `process.env` will implicitly convert the value
to a string. **This behavior is deprecated.** Future versions of Node.js may
throw an error when the value is not a string, number, or boolean.

```mjs
import { env } from 'node:process';

env.test = null;
console.log(env.test);
// => 'null'
env.test = undefined;
console.log(env.test);
// => 'undefined'
```

```cjs
const { env } = require('node:process');

env.test = null;
console.log(env.test);
// => 'null'
env.test = undefined;
console.log(env.test);
// => 'undefined'
```

Use `delete` to delete a property from `process.env`.

```mjs
import { env } from 'node:process';

env.TEST = 1;
delete env.TEST;
console.log(env.TEST);
// => undefined
```

```cjs
const { env } = require('node:process');

env.TEST = 1;
delete env.TEST;
console.log(env.TEST);
// => undefined
```

On Windows operating systems, environment variables are case-insensitive.

```mjs
import { env } from 'node:process';

env.TEST = 1;
console.log(env.test);
// => 1
```

```cjs
const { env } = require('node:process');

env.TEST = 1;
console.log(env.test);
// => 1
```

Unless explicitly specified when creating a `Worker` instance,
each `Worker` thread has its own copy of `process.env`, based on its
parent thread's `process.env`, or whatever was specified as the `env` option
to the `Worker` constructor. Changes to `process.env` will not be visible
across `Worker` threads, and only the main thread can make changes that
are visible to the operating system or to native add-ons. On Windows, a copy of
`process.env` on a `Worker` instance operates in a case-sensitive manner
unlike the main thread.

## `process.execArgv`

* Type: {string\[]}

The `process.execArgv` property returns the set of Node.js-specific command-line
options passed when the Node.js process was launched. These options do not
appear in the array returned by the `process.argv` property, and do not
include the Node.js executable, the name of the script, or any options following
the script name. These options are useful in order to spawn child processes with
the same execution environment as the parent.

```bash
node --icu-data-dir=./foo --require ./bar.js script.js --version
```

Results in `process.execArgv`:

```json
["--icu-data-dir=./foo", "--require", "./bar.js"]
```

And `process.argv`:

```json
["/usr/local/bin/node", "script.js", "--version"]
```

Refer to `Worker` constructor for the detailed behavior of worker
threads with this property.

## `process.execPath`

* Type: {string}

The `process.execPath` property returns the absolute pathname of the executable
that started the Node.js process. Symbolic links, if any, are resolved.

```json
"/usr/local/bin/node"
```

## `process.execve(file[, args[, env]])`

> Stability: 1 - Experimental

* `file` {string} The name or path of the executable file to run.
* `args` {string\[]} List of string arguments. No argument can contain a null-byte (`\u0000`).
* `env` {Object} Environment key-value pairs.
  No key or value can contain a null-byte (`\u0000`).
  **Default:** `process.env`.

Replaces the current process with a new process.

This is achieved by using the `execve` POSIX function and therefore no memory or other
resources from the current process are preserved, except for the standard input,
standard output and standard error file descriptor.

On success, all other resources are discarded by the system when the
processes are swapped, without triggering any exit or close events, without
running any JavaScript cleanup handler (for example `process.on('exit')`),
and without invoking native `AtExit` callbacks registered through the
embedder API. Callers that need to run cleanup logic should do so before
calling `process.execve()`.

This function does not return on success. If the underlying `execve(2)`
system call fails, an `Error` is thrown whose `code` property is set to the
corresponding `errno` string (for example, `'ENOENT'` when `file` does not
exist), with `syscall` set to `'execve'` and `path` set to `file`. When
`execve(2)` fails the current process continues to run with its state
unchanged, so a caller may handle the error and take another action.

This function is not available on Windows or IBM i.

## `process.exit([code])`

* `code` {integer|string|null|undefined} The exit code. For string type, only
  integer strings (e.g.,'1') are allowed. **Default:** `0`.

The `process.exit()` method instructs Node.js to terminate the process
synchronously with an exit status of `code`. If `code` is omitted, exit uses
either the 'success' code `0` or the value of `process.exitCode` if it has been
set. Node.js will not terminate until all the `'exit'` event listeners are
called.

To exit with a 'failure' code:

```mjs
import { exit } from 'node:process';

exit(1);
```

```cjs
const { exit } = require('node:process');

exit(1);
```

The shell that executed Node.js should see the exit code as `1`.

Calling `process.exit()` will force the process to exit as quickly as possible
even if there are still asynchronous operations pending that have not yet
completed fully, including I/O operations to `process.stdout` and
`process.stderr`.

In most situations, it is not actually necessary to call `process.exit()`
explicitly. The Node.js process will exit on its own _if there is no additional
work pending_ in the event loop. The `process.exitCode` property can be set to
tell the process which exit code to use when the process exits gracefully.

For instance, the following example illustrates a _misuse_ of the
`process.exit()` method that could lead to data printed to stdout being
truncated and lost:

```mjs
import { exit } from 'node:process';

// This is an example of what *not* to do:
if (someConditionNotMet()) {
  printUsageToStdout();
  exit(1);
}
```

```cjs
const { exit } = require('node:process');

// This is an example of what *not* to do:
if (someConditionNotMet()) {
  printUsageToStdout();
  exit(1);
}
```

The reason this is problematic is because writes to `process.stdout` in Node.js
are sometimes _asynchronous_ and may occur over multiple ticks of the Node.js
event loop. Calling `process.exit()`, however, forces the process to exit
_before_ those additional writes to `stdout` can be performed.

Rather than calling `process.exit()` directly, the code _should_ set the
`process.exitCode` and allow the process to exit naturally by avoiding
scheduling any additional work for the event loop:

```mjs
import process from 'node:process';

// How to properly set the exit code while letting
// the process exit gracefully.
if (someConditionNotMet()) {
  printUsageToStdout();
  process.exitCode = 1;
}
```

```cjs
// How to properly set the exit code while letting
// the process exit gracefully.
if (someConditionNotMet()) {
  printUsageToStdout();
  process.exitCode = 1;
}
```

If it is necessary to terminate the Node.js process due to an error condition,
throwing an _uncaught_ error and allowing the process to terminate accordingly
is safer than calling `process.exit()`.

In `Worker` threads, this function stops the current thread rather
than the current process.

## `process.exitCode`

* Type: {integer|string|null|undefined} The exit code. For string type, only
  integer strings (e.g.,'1') are allowed. **Default:** `undefined`.

A number which will be the process exit code, when the process either
exits gracefully, or is exited via `process.exit()` without specifying
a code.

The value of `process.exitCode` can be updated by either assigning a value to
`process.exitCode` or by passing an argument to `process.exit()`:

```console
$ node -e 'process.exitCode = 9'; echo $?
9
$ node -e 'process.exit(42)'; echo $?
42
$ node -e 'process.exitCode = 9; process.exit(42)'; echo $?
42
```

The value can also be set implicitly by Node.js when unrecoverable errors occur (e.g.
such as the encountering of an unsettled top-level await). However explicit
manipulations of the exit code always take precedence over implicit ones:

```console
$ node --input-type=module -e 'await new Promise(() => {})'; echo $?
13
$ node --input-type=module -e 'process.exitCode = 9; await new Promise(() => {})'; echo $?
9
```

## `process.features.cached_builtins`

* Type: {boolean}

A boolean value that is `true` if the current Node.js build is caching builtin modules.

## `process.features.debug`

* Type: {boolean}

A boolean value that is `true` if the current Node.js build is a debug build.

## `process.features.inspector`

* Type: {boolean}

A boolean value that is `true` if the current Node.js build includes the inspector.

## `process.features.ipv6`

> Stability: 0 - Deprecated. This property is always true, and any checks based on it are
> redundant.

* Type: {boolean}

A boolean value that is `true` if the current Node.js build includes support for IPv6.

Since all Node.js builds have IPv6 support, this value is always `true`.

## `process.features.require_module`

* Type: {boolean}

A boolean value that is `true` if the current Node.js build supports
loading ECMAScript modules using `require()`.

## `process.features.tls`

* Type: {boolean}

A boolean value that is `true` if the current Node.js build includes support for TLS.

## `process.features.tls_alpn`

> Stability: 0 - Deprecated. Use `process.features.tls` instead.

* Type: {boolean}

A boolean value that is `true` if the current Node.js build includes support for ALPN in TLS.

In Node.js 11.0.0 and later versions, the OpenSSL dependencies feature unconditional ALPN support.
This value is therefore identical to that of `process.features.tls`.

## `process.features.tls_ocsp`

> Stability: 0 - Deprecated. Use `process.features.tls` instead.

* Type: {boolean}

A boolean value that is `true` if the current Node.js build includes support for OCSP in TLS.

In Node.js 11.0.0 and later versions, the OpenSSL dependencies feature unconditional OCSP support.
This value is therefore identical to that of `process.features.tls`.

## `process.features.tls_sni`

> Stability: 0 - Deprecated. Use `process.features.tls` instead.

* Type: {boolean}

A boolean value that is `true` if the current Node.js build includes support for SNI in TLS.

In Node.js 11.0.0 and later versions, the OpenSSL dependencies feature unconditional SNI support.
This value is therefore identical to that of `process.features.tls`.

## `process.features.typescript`

> Stability: 1.2 - Release candidate

* Type: {boolean|string}

A value that is `"strip"` by default, and `false` if
Node.js is run with `--no-strip-types`.

## `process.features.uv`

> Stability: 0 - Deprecated. This property is always true, and any checks based on it are
> redundant.

* Type: {boolean}

A boolean value that is `true` if the current Node.js build includes support for libuv.

Since it's not possible to build Node.js without libuv, this value is always `true`.
