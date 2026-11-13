---
title: "Child process (part 2 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/child_process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Child process (part 2 of 8)

## Asynchronous process creation

The `child_process.spawn()`, `child_process.fork()`, `child_process.exec()`,
and `child_process.execFile()` methods all follow the idiomatic asynchronous
programming pattern typical of other Node.js APIs.

Each of the methods returns a `ChildProcess` instance. These objects
implement the Node.js `EventEmitter` API, allowing the parent process to
register listener functions that are called when certain events occur during
the life cycle of the child process.

The `child_process.exec()` and `child_process.execFile()` methods
additionally allow for an optional `callback` function to be specified that is
invoked when the child process terminates.

### Spawning `.bat` and `.cmd` files on Windows

The importance of the distinction between `child_process.exec()` and
`child_process.execFile()` can vary based on platform. On Unix-type
operating systems (Unix, Linux, macOS) `child_process.execFile()` can be
more efficient because it does not spawn a shell by default. On Windows,
however, `.bat` and `.cmd` files are not executable on their own without a
terminal, and therefore cannot be launched using `child_process.execFile()`.
When running on Windows, `.bat` and `.cmd` files can be invoked by:

* using `child_process.spawn()` with the `shell` option set (not recommended, see DEP0190), or
* using `child_process.exec()`, or
* spawning `cmd.exe` and passing the `.bat` or `.cmd` file as an argument
  (which is what `child_process.exec()` does internally).

In any case, if the script filename contains spaces, it needs to be quoted.

```cjs
const { exec, spawn } = require('node:child_process');

exec('my.bat', (err, stdout, stderr) => { /* ... */ });

// Or, spawning cmd.exe directly:
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

// If the script filename contains spaces, it needs to be quoted
exec('"my script.cmd" a b', (err, stdout, stderr) => { /* ... */ });
```

```mjs
import { exec, spawn } from 'node:child_process';

exec('my.bat', (err, stdout, stderr) => { /* ... */ });

// Or, spawning cmd.exe directly:
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

// If the script filename contains spaces, it needs to be quoted
exec('"my script.cmd" a b', (err, stdout, stderr) => { /* ... */ });
```

### `child_process.exec(command, options)`

* `command` {string} The command to run, with space-separated arguments.
* `options` {Object}
  * `cwd` {string|URL} Current working directory of the child process.
    **Default:** `process.cwd()`.
  * `env` {Object} Environment key-value pairs. **Default:** `process.env`.
  * `encoding` {string} **Default:** `'utf8'`
  * `shell` {string} Shell to execute the command with. See
    Shell requirements and Default Windows shell. **Default:**
    `'/bin/sh'` on Unix, `process.env.ComSpec` on Windows.
  * `signal` {AbortSignal} allows aborting the child process using an
    AbortSignal.
  * `timeout` {number} **Default:** `0`
  * `maxBuffer` {number} Largest amount of data in bytes allowed on stdout or
    stderr. If exceeded, the child process is terminated and any output is
    truncated. See caveat at `maxBuffer` and Unicode.
    **Default:** `1024 * 1024`.
  * `killSignal` {string|integer} **Default:** `'SIGTERM'`
  * `uid` {number} Sets the user identity of the process (see setuid(2)).
  * `gid` {number} Sets the group identity of the process (see setgid(2)).
  * `windowsHide` {boolean} Hide the subprocess console window that would
    normally be created on Windows systems. **Default:** `false`.
* `callback` {Function} called with the output when process terminates.
  * `error` {Error}
  * `stdout` {string|Buffer}
  * `stderr` {string|Buffer}
* Returns: {ChildProcess}

Spawns a shell then executes the `command` within that shell, buffering any
generated output. The `command` string passed to the exec function is processed
directly by the shell and special characters (vary based on
shell)
need to be dealt with accordingly:

```cjs
const { exec } = require('node:child_process');

exec('"/path/to/test file/test.sh" arg1 arg2');
// Double quotes are used so that the space in the path is not interpreted as
// a delimiter of multiple arguments.

exec('echo "The \\$HOME variable is $HOME"');
// The $HOME variable is escaped in the first instance, but not in the second.
```

```mjs
import { exec } from 'node:child_process';

exec('"/path/to/test file/test.sh" arg1 arg2');
// Double quotes are used so that the space in the path is not interpreted as
// a delimiter of multiple arguments.

exec('echo "The \\$HOME variable is $HOME"');
// The $HOME variable is escaped in the first instance, but not in the second.
```

**Never pass <example-value> user input to this function. Any input containing shell
metacharacters may be used to trigger arbitrary command execution.**

If a `callback` function is provided, it is called with the arguments
`(error, stdout, stderr)`. On success, `error` will be `null`. On error,
`error` will be an instance of `Error`. The `error.code` property will be
the exit code of the process. By convention, any exit code other than `0`
indicates an error. `error.signal` will be the signal that terminated the
process.

The `stdout` and `stderr` arguments passed to the callback will contain the
stdout and stderr output of the child process. By default, Node.js will decode
the output as UTF-8 and pass <example-value> to the callback. The `encoding` option
can be used to specify the character encoding used to decode the stdout and
stderr output. If `encoding` is `'buffer'`, or an unrecognized character
encoding, `Buffer` objects will be passed to the callback instead.

> Using the `signal` option to destroy a long-lived child process as a resource
> cleanup mechanism is deprecated. The `signal` option remains appropriate for
> cancellation, externally propagated aborts, and timeouts. See
> DEP0209.

```cjs
const { exec } = require('node:child_process');
exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

```mjs
import { exec } from 'node:child_process';
exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

If `timeout` is greater than `0`, the parent process will send the signal
identified by the `killSignal` property (the default is `'SIGTERM'`) if the
child process runs longer than `timeout` milliseconds.

Unlike the exec(3) POSIX system call, `child_process.exec()` does not replace
the existing process and uses a shell to execute the command.

If this method is invoked as its `util.promisify()`ed version, it returns
a `Promise` for an `Object` with `stdout` and `stderr` properties. The returned
`ChildProcess` instance is attached to the `Promise` as a `child` property. In
case of an error (including any error resulting in an exit code other than 0), a
rejected promise is returned, with the same `error` object given in the
callback, but with two additional properties `stdout` and `stderr`.

```cjs
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

async function lsExample() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
lsExample();
```

```mjs
import { promisify } from 'node:util';
import child_process from 'node:child_process';
const exec = promisify(child_process.exec);

async function lsExample() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
lsExample();
```

If the `signal` option is enabled, calling `.abort()` on the corresponding
`AbortController` is similar to calling `.kill()` on the child process except
the error passed to the callback will be an `AbortError`:

```cjs
const { exec } = require('node:child_process');
const controller = new AbortController();
const { signal } = controller;
const child = exec('grep ssh', { signal }, (error) => {
  console.error(error); // an AbortError
});
controller.abort();
```

```mjs
import { exec } from 'node:child_process';
const controller = new AbortController();
const { signal } = controller;
const child = exec('grep ssh', { signal }, (error) => {
  console.error(error); // an AbortError
});
controller.abort();
```

### `child_process.execFile(file, args[, callback])`

* `file` {string} The name or path of the executable file to run.
* `args` {string\[]} List of string arguments.
* `options` {Object}
  * `cwd` {string|URL} Current working directory of the child process.
  * `env` {Object} Environment key-value pairs. **Default:** `process.env`.
  * `encoding` {string} **Default:** `'utf8'`
  * `timeout` {number} **Default:** `0`
  * `maxBuffer` {number} Largest amount of data in bytes allowed on stdout or
    stderr. If exceeded, the child process is terminated and any output is
    truncated. See caveat at `maxBuffer` and Unicode.
    **Default:** `1024 * 1024`.
  * `killSignal` {string|integer} **Default:** `'SIGTERM'`
  * `uid` {number} Sets the user identity of the process (see setuid(2)).
  * `gid` {number} Sets the group identity of the process (see setgid(2)).
  * `windowsHide` {boolean} Hide the subprocess console window that would
    normally be created on Windows systems. **Default:** `false`.
  * `windowsVerbatimArguments` {boolean} No quoting or escaping of arguments is
    done on Windows. Ignored on Unix. **Default:** `false`.
  * `shell` {boolean|string} If `true`, runs `command` inside of a shell. Uses
    `'/bin/sh'` on Unix, and `process.env.ComSpec` on Windows. A different
    shell can be specified as a string. See Shell requirements and
    Default Windows shell. **Default:** `false` (no shell).
  * `signal` {AbortSignal} allows aborting the child process using an
    AbortSignal.
* `callback` {Function} Called with the output when process terminates.
  * `error` {Error}
  * `stdout` {string|Buffer}
  * `stderr` {string|Buffer}
* Returns: {ChildProcess}

The `child_process.execFile()` function is similar to `child_process.exec()`
except that it does not spawn a shell by default. Rather, the specified
executable `file` is spawned directly as a new process making it slightly more
efficient than `child_process.exec()`.

> Using the `signal` option to destroy a long-lived child process as a resource
> cleanup mechanism is deprecated. The `signal` option remains appropriate for
> cancellation, externally propagated aborts, and timeouts. See
> DEP0209.

The same options as `child_process.exec()` are supported. Since a shell is
not spawned, behaviors such as I/O redirection and file globbing are not
supported.

```cjs
const { execFile } = require('node:child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```

```mjs
import { execFile } from 'node:child_process';
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```

The `stdout` and `stderr` arguments passed to the callback will contain the
stdout and stderr output of the child process. By default, Node.js will decode
the output as UTF-8 and pass <example-value> to the callback. The `encoding` option
can be used to specify the character encoding used to decode the stdout and
stderr output. If `encoding` is `'buffer'`, or an unrecognized character
encoding, `Buffer` objects will be passed to the callback instead.

If this method is invoked as its `util.promisify()`ed version, it returns
a `Promise` for an `Object` with `stdout` and `stderr` properties. The returned
`ChildProcess` instance is attached to the `Promise` as a `child` property. In
case of an error (including any error resulting in an exit code other than 0), a
rejected promise is returned, with the same `error` object given in the
callback, but with two additional properties `stdout` and `stderr`.

```cjs
const util = require('node:util');
const execFile = util.promisify(require('node:child_process').execFile);
async function getVersion() {
  const { stdout } = await execFile('node', ['--version']);
  console.log(stdout);
}
getVersion();
```

```mjs
import { promisify } from 'node:util';
import child_process from 'node:child_process';
const execFile = promisify(child_process.execFile);
async function getVersion() {
  const { stdout } = await execFile('node', ['--version']);
  console.log(stdout);
}
getVersion();
```

**If the `shell` option is enabled, do not pass <example-value> user input to this
function. Any input containing shell metacharacters may be used to trigger
arbitrary command execution.**

If the `signal` option is enabled, calling `.abort()` on the corresponding
`AbortController` is similar to calling `.kill()` on the child process except
the error passed to the callback will be an `AbortError`:

```cjs
const { execFile } = require('node:child_process');
const controller = new AbortController();
const { signal } = controller;
const child = execFile('node', ['--version'], { signal }, (error) => {
  console.error(error); // an AbortError
});
controller.abort();
```

```mjs
import { execFile } from 'node:child_process';
const controller = new AbortController();
const { signal } = controller;
const child = execFile('node', ['--version'], { signal }, (error) => {
  console.error(error); // an AbortError
});
controller.abort();
```
