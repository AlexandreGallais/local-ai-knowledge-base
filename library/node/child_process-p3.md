---
title: "Child process (part 3 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/child_process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Child process (part 3 of 8)

### `child_process.fork(modulePath, args)`

* `modulePath` {string|URL} The module to run in the child.
* `args` {string\[]} List of string arguments.
* `options` {Object}
  * `cwd` {string|URL} Current working directory of the child process.
  * `detached` {boolean} Prepare child process to run independently of its
    parent process. Specific behavior depends on the platform (see
    `options.detached`).
  * `env` {Object} Environment key-value pairs. **Default:** `process.env`.
  * `execPath` {string} Executable used to create the child process.
  * `execArgv` {string\[]} List of string arguments passed to the executable.
    **Default:** `process.execArgv`.
  * `gid` {number} Sets the group identity of the process (see setgid(2)).
  * `serialization` {string} Specify the kind of serialization used for sending
    messages between processes. Possible values are `'json'` and `'advanced'`.
    See Advanced serialization for more details. **Default:** `'json'`.
  * `signal` {AbortSignal} Allows closing the child process using an
    AbortSignal.
  * `killSignal` {string|integer} The signal value to be used when the spawned
    process will be killed by timeout or abort signal. **Default:** `'SIGTERM'`.
  * `silent` {boolean} If `true`, stdin, stdout, and stderr of the child
    process will be piped to the parent process, otherwise they will be inherited
    from the parent process, see the `'pipe'` and `'inherit'` options for
    `child_process.spawn()`'s `stdio` for more details.
    **Default:** `false`.
  * `stdio` {Array|string} See `child_process.spawn()`'s `stdio`.
    When this option is provided, it overrides `silent`. If the array variant
    is used, it must contain exactly one item with value `'ipc'` or an error
    will be thrown. For instance `[0, 1, 2, 'ipc']`.
  * `uid` {number} Sets the user identity of the process (see setuid(2)).
  * `windowsHide` {boolean} Hide the subprocess console window that would
    normally be created on Windows systems. **Default:** `false`.
  * `windowsVerbatimArguments` {boolean} No quoting or escaping of arguments is
    done on Windows. Ignored on Unix. **Default:** `false`.
  * `timeout` {number} In milliseconds the maximum amount of time the process
    is allowed to run. **Default:** `undefined`.
* Returns: {ChildProcess}

The `child_process.fork()` method is a special case of
`child_process.spawn()` used specifically to spawn new Node.js processes.
Like `child_process.spawn()`, a `ChildProcess` object is returned. The
returned `ChildProcess` will have an additional communication channel
built-in that allows messages to be passed back and forth between the parent and
child. See `subprocess.send()` for details.

Keep in mind that spawned Node.js child processes are
independent of the parent with exception of the IPC communication channel
that is established between the two. Each process has its own memory, with
their own V8 instances. Because of the additional resource allocations
required, spawning a large number of child Node.js processes is not
recommended.

By default, `child_process.fork()` will spawn new Node.js instances using the
`process.execPath` of the parent process. The `execPath` property in the
`options` object allows for an alternative execution path to be used.

Node.js processes launched with a custom `execPath` will communicate with the
parent process using the file descriptor (fd) identified using the
environment variable `NODE_CHANNEL_FD` on the child process.

Unlike the fork(2) POSIX system call, `child_process.fork()` does not clone the
current process.

The `shell` option available in `child_process.spawn()` is not supported by
`child_process.fork()` and will be ignored if set.

> Using the `signal` option to destroy a long-lived child process as a resource
> cleanup mechanism is deprecated. The `signal` option remains appropriate for
> cancellation, externally propagated aborts, and timeouts. See
> DEP0209.

If the `signal` option is enabled, calling `.abort()` on the corresponding
`AbortController` is similar to calling `.kill()` on the child process except
the error passed to the callback will be an `AbortError`:

```cjs
const { fork } = require('node:child_process');

if (process.argv[2] === 'child') {
  setTimeout(() => {
    console.log(`Hello from ${process.argv[2]}!`);
  }, 1_000);
} else {
  const controller = new AbortController();
  const { signal } = controller;
  const child = fork(__filename, ['child'], { signal });
  child.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
  });
  controller.abort(); // Stops the child process
}
```

```mjs
import { fork } from 'node:child_process';
import process from 'node:process';

if (process.argv[2] === 'child') {
  setTimeout(() => {
    console.log(`Hello from ${process.argv[2]}!`);
  }, 1_000);
} else {
  const controller = new AbortController();
  const { signal } = controller;
  const child = fork(import.meta.url, ['child'], { signal });
  child.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
  });
  controller.abort(); // Stops the child process
}
```
