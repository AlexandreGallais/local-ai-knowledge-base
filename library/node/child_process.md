---
title: "Child process (part 1 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/child_process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Child process

> Stability: 2 - Stable

The `node:child_process` module provides the ability to spawn subprocesses in
a manner that is similar, but not identical, to popen(3). This capability
is primarily provided by the `child_process.spawn()` function:

```cjs
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

```mjs
import { spawn } from 'node:child_process';
import { once } from 'node:events';
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

const [code] = await once(ls, 'close');
console.log(`child process exited with code ${code}`);
```

By default, pipes for `stdin`, `stdout`, and `stderr` are established between
the parent Node.js process and the spawned subprocess. These pipes have
limited (and platform-specific) capacity. If the subprocess writes to
stdout in excess of that limit without the output being captured, the
subprocess blocks, waiting for the pipe buffer to accept more data. This is
identical to the behavior of pipes in the shell. Use the `{ stdio: 'ignore' }`
option if the output will not be consumed.

The command lookup is performed using the `options.env.PATH` environment
variable if `env` is in the `options` object. Otherwise, `process.env.PATH` is
used. If `options.env` is set without `PATH`, lookup on Unix is performed
on a default search path search of `/usr/bin:/bin` (see your operating system's
manual for execvpe/execvp), on Windows the current processes environment
variable `PATH` is used.

On Windows, environment variables are case-insensitive. Node.js
lexicographically sorts the `env` keys and uses the first one that
case-insensitively matches. Only first (in lexicographic order) entry will be
passed to the subprocess. This might lead to issues on Windows when passing
objects to the `env` option that have multiple variants of the same key, such as
`PATH` and `Path`.

The `child_process.spawn()` method spawns the child process asynchronously,
without blocking the Node.js event loop. The `child_process.spawnSync()`
function provides equivalent functionality in a synchronous manner that blocks
the event loop until the spawned process either exits or is terminated.

For convenience, the `node:child_process` module provides a handful of
synchronous and asynchronous alternatives to `child_process.spawn()` and
`child_process.spawnSync()`. Each of these alternatives are implemented on
top of `child_process.spawn()` or `child_process.spawnSync()`.

* `child_process.exec()`: spawns a shell and runs a command within that
  shell, passing the `stdout` and `stderr` to a callback function when
  complete.
* `child_process.execFile()`: similar to `child_process.exec()` except
  that it spawns the command directly without first spawning a shell by
  default.
* `child_process.fork()`: spawns a new Node.js process and invokes a
  specified module with an IPC communication channel established that allows
  sending messages between parent and child.
* `child_process.execSync()`: a synchronous version of
  `child_process.exec()` that will block the Node.js event loop.
* `child_process.execFileSync()`: a synchronous version of
  `child_process.execFile()` that will block the Node.js event loop.

For certain use cases, such as automating shell scripts, the
synchronous counterparts may be more convenient. In many cases, however,
the synchronous methods can have significant impact on performance due to
stalling the event loop while spawned processes complete.
