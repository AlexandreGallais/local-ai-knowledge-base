---
title: "Child process (part 6 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/child_process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Child process (part 6 of 8)

## Class: `ChildProcess`

* Extends: {EventEmitter}

Instances of the `ChildProcess` represent spawned child processes.

Instances of `ChildProcess` are not intended to be created directly. Rather,
use the `child_process.spawn()`, `child_process.exec()`,
`child_process.execFile()`, or `child_process.fork()` methods to create
instances of `ChildProcess`.

### Event: `'close'`

* `code` {number} The exit code if the child process exited on its own, or
  `null` if the child process terminated due to a signal.
* `signal` {string} The signal by which the child process was terminated, or
  `null` if the child process did not terminated due to a signal.

The `'close'` event is emitted after a process has ended _and_ the stdio
streams of a child process have been closed. This is distinct from the
`'exit'` event, since multiple processes might share the same stdio
streams. The `'close'` event will always emit after `'exit'` was
already emitted, or `'error'` if the child process failed to spawn.

If the process exited, `code` is the final exit code of the process, otherwise
`null`. If the process terminated due to receipt of a signal, `signal` is the
string name of the signal, otherwise `null`. One of the two will always be
non-`null`.

```cjs
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
});

ls.on('exit', (code) => {
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

ls.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
});

ls.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});

const [code] = await once(ls, 'close');
console.log(`child process close all stdio with code ${code}`);
```

### Event: `'disconnect'`

The `'disconnect'` event is emitted after calling the
`subprocess.disconnect()` method in parent process or
`process.disconnect()` in child process. After disconnecting it is no longer
possible to send or receive messages, and the `subprocess.connected`
property is `false`.

### Event: `'error'`

* `err` {Error} The error.

The `'error'` event is emitted whenever:

* The process could not be spawned.
* The process could not be killed.
* Sending a message to the child process failed.
* The child process was aborted via the `signal` option.

The `'exit'` event may or may not fire after an error has occurred. When
listening to both the `'exit'` and `'error'` events, guard
against accidentally invoking handler functions multiple times.

See also `subprocess.kill()` and `subprocess.send()`.

### Event: `'exit'`

* `code` {number} The exit code if the child process exited on its own, or
  `null` if the child process terminated due to a signal.
* `signal` {string} The signal by which the child process was terminated, or
  `null` if the child process did not terminated due to a signal.

The `'exit'` event is emitted after the child process ends. If the process
exited, `code` is the final exit code of the process, otherwise `null`. If the
process terminated due to receipt of a signal, `signal` is the string name of
the signal, otherwise `null`. One of the two will always be non-`null`.

When the `'exit'` event is triggered, child process stdio streams might still be
open.

Node.js establishes signal handlers for `SIGINT` and `SIGTERM` and Node.js
processes will not terminate immediately due to receipt of those signals.
Rather, Node.js will perform a sequence of cleanup actions and then will
re-raise the handled signal.

See waitpid(2).

When `code` is `null` due to signal termination, you can use
`util.convertProcessSignalToExitCode()` to convert the signal to a POSIX
exit code.

### Event: `'message'`

* `message` {Object} A parsed JSON object or primitive value.
* `sendHandle` {Handle|undefined} `undefined` or a `net.Socket`,
  `net.Server`, `net.BoundSocket`, or `dgram.Socket` object.

The `'message'` event is triggered when a child process uses
`process.send()` to send messages.

The message goes through serialization and parsing. The resulting
message might not be the same as what is originally sent.

If the `serialization` option was set to `'advanced'` used when spawning the
child process, the `message` argument can contain data that JSON is not able
to represent.
See Advanced serialization for more details.

### Event: `'spawn'`

The `'spawn'` event is emitted once the child process has spawned successfully.
If the child process does not spawn successfully, the `'spawn'` event is not
emitted and the `'error'` event is emitted instead.

If emitted, the `'spawn'` event comes before all other events and before any
data is received via `stdout` or `stderr`.

The `'spawn'` event will fire regardless of whether an error occurs **within**
the spawned process. For example, if `bash some-command` spawns successfully,
the `'spawn'` event will fire, though `bash` may fail to spawn `some-command`.
This caveat also applies when using `{ shell: true }`.

### `subprocess.channel`

* Type: {Object} A pipe representing the IPC channel to the child process.

The `subprocess.channel` property is a reference to the child's IPC channel. If
no IPC channel exists, this property is `undefined`.

#### `subprocess.channel.ref()`

This method makes the IPC channel keep the event loop of the parent process
running if `.unref()` has been called before.

#### `subprocess.channel.unref()`

This method makes the IPC channel not keep the event loop of the parent process
running, and lets it finish even while the channel is open.

### `subprocess.connected`

* Type: {boolean} Set to `false` after `subprocess.disconnect()` is called.

The `subprocess.connected` property indicates whether it is still possible to
send and receive messages from a child process. When `subprocess.connected` is
`false`, it is no longer possible to send or receive messages.

### `subprocess.disconnect()`

Closes the IPC channel between parent and child processes, allowing the child
process to exit gracefully once there are no other connections keeping it alive.
After calling this method the `subprocess.connected` and
`process.connected` properties in both the parent and child processes
(respectively) will be set to `false`, and it will be no longer possible
to pass <example-value> between the processes.

The `'disconnect'` event will be emitted when there are no messages in the
process of being received. This will most often be triggered immediately after
calling `subprocess.disconnect()`.

When the child process is a Node.js instance (e.g. spawned using
`child_process.fork()`), the `process.disconnect()` method can be invoked
within the child process to close the IPC channel as well.

### `subprocess.exitCode`

* Type: {integer}

The `subprocess.exitCode` property indicates the exit code of the child process.
If the child process is still running, the field will be `null`.

When the child process is terminated by a signal, `subprocess.exitCode` will be
`null` and `subprocess.signalCode` will be set. To get the corresponding
POSIX exit code, use
`util.convertProcessSignalToExitCode(subprocess.signalCode)`.

### `subprocess.kill([signal])`

* `signal` {number|string}
* Returns: {boolean}

The `subprocess.kill()` method sends a signal to the child process. If no
argument is given, the process will be sent the `'SIGTERM'` signal. See
signal(7) for a list of available signals. This function returns `true` if
kill(2) succeeds, and `false` otherwise.

```cjs
const { spawn } = require('node:child_process');
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
});

// Send SIGHUP to process.
grep.kill('SIGHUP');
```

```mjs
import { spawn } from 'node:child_process';
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
});

// Send SIGHUP to process.
grep.kill('SIGHUP');
```

The `ChildProcess` object may emit an `'error'` event if the signal
cannot be delivered. Sending a signal to a child process that has already exited
is not an error but may have unforeseen consequences. Specifically, if the
process identifier (PID) has been reassigned to another process, the signal will
be delivered to that process instead which can have unexpected results.

While the function is called `kill`, the signal delivered to the child process
may not actually terminate the process.

See kill(2) for reference.

On Windows, where POSIX signals do not exist, signals are handled as follows.
`'SIGKILL'`, `'SIGTERM'`, `'SIGINT'` and `'SIGQUIT'` terminate the process
forcefully and abruptly (similar to `'SIGKILL'`); any other signal whose name is
known on Windows (such as `'SIGHUP'`) does the same. `'SIGWINCH'` is not
terminal and is not coerced: `subprocess.kill()` throws an `ENOSYS` error and
the child keeps running. A signal name that does not exist on Windows (such as
`'SIGSTOP'`) throws an `ERR_UNKNOWN_SIGNAL` error. See Signal Events for more
details.

On Linux, child processes of child processes will not be terminated
when attempting to kill their parent. This is likely to happen when running a
new process in a shell or with the use of the `shell` option of `ChildProcess`:

```cjs
const { spawn } = require('node:child_process');

const subprocess = spawn(
  'sh',
  [
    '-c',
    `node -e "setInterval(() => {
      console.log(process.pid, 'is alive')
    }, 500);"`,
  ], {
    stdio: ['inherit', 'inherit', 'inherit'],
  },
);

setTimeout(() => {
  subprocess.kill(); // Does not terminate the Node.js process in the shell.
}, 2000);
```

```mjs
import { spawn } from 'node:child_process';

const subprocess = spawn(
  'sh',
  [
    '-c',
    `node -e "setInterval(() => {
      console.log(process.pid, 'is alive')
    }, 500);"`,
  ], {
    stdio: ['inherit', 'inherit', 'inherit'],
  },
);

setTimeout(() => {
  subprocess.kill(); // Does not terminate the Node.js process in the shell.
}, 2000);
```

### `subprocessSymbol.dispose`

Calls `subprocess.kill()` with `'SIGTERM'`.

### `subprocess.killed`

* Type: {boolean} Set to `true` after `subprocess.kill()` is used to successfully
  send a signal to the child process.

The `subprocess.killed` property indicates whether the child process
successfully received a signal from `subprocess.kill()`. The `killed` property
does not indicate that the child process has been terminated.

### `subprocess.pid`

* Type: {integer|undefined}

Returns the process identifier (PID) of the child process. If the child process
fails to spawn due to errors, then the value is `undefined` and `error` is
emitted.

```cjs
const { spawn } = require('node:child_process');
const grep = spawn('grep', ['ssh']);

console.log(`Spawned child pid: ${grep.pid}`);
grep.stdin.end();
```

```mjs
import { spawn } from 'node:child_process';
const grep = spawn('grep', ['ssh']);

console.log(`Spawned child pid: ${grep.pid}`);
grep.stdin.end();
```

### `subprocess.ref()`

Calling `subprocess.ref()` after making a call to `subprocess.unref()` will
restore the removed reference count for the child process, forcing the parent
process to wait for the child process to exit before exiting itself.

```cjs
const { spawn } = require('node:child_process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore',
});

subprocess.unref();
subprocess.ref();
```

```mjs
import { spawn } from 'node:child_process';
import process from 'node:process';

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore',
});

subprocess.unref();
subprocess.ref();
```
