---
title: "subprocess --- Subprocess management (part 4 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/subprocess.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# subprocess --- Subprocess management (part 4 of 6)

> *Changed in version 3.8.*
> Popen can use `os.posix_spawn()` in some cases for better
> performance. On Windows Subsystem for Linux and QEMU User Emulation,
> Popen constructor using `os.posix_spawn()` no longer raise an
> exception on errors like missing program, but the child process fails
> with a non-zero `returncode`.

### Exceptions

Exceptions raised in the child process, before the new program has started to
execute, will be re-raised in the parent.

The most common exception raised is `OSError`.  This occurs, for example,
when trying to execute a non-existent file.  Applications should prepare for
`OSError` exceptions. Note that, when `shell=True`, `OSError`
will be raised by the child only if the selected shell itself was not found.
To determine if the shell failed to find the requested application, it is
necessary to check the return code or output from the subprocess.

A `ValueError` will be raised if `Popen` is called with invalid
arguments.

`check_call()` and `check_output()` will raise
`CalledProcessError` if the called process returns a non-zero return
code.

All of the functions and methods that accept a *timeout* parameter, such as
`run()` and `Popen.communicate()` will raise `TimeoutExpired` if
the timeout expires before the process exits.

Exceptions defined in this module all inherit from `SubprocessError`.

> *Added in version 3.3.*
> The `SubprocessError` base class was added.

## Security Considerations

Unlike some other popen functions, this library will not
implicitly choose to call a system shell.  This means that all characters,
including shell metacharacters, can safely be passed to child processes.
If the shell is invoked explicitly, via `shell=True`, it is the application's
responsibility to ensure that all whitespace and metacharacters are
quoted appropriately to avoid
shell injection
vulnerabilities. On some platforms, it is possible
to use `shlex.quote()` for this escaping.

On Windows, batch files (`*.bat` or `*.cmd`) may be launched by the
operating system in a system shell regardless of the arguments passed to this
library. This could result in arguments being parsed according to shell rules,
but without any escaping added by Python. If you are intentionally launching a
batch file with arguments from untrusted sources, consider passing
`shell=True` to allow Python to escape special characters. See 114539
for additional discussion.

## Popen Objects

Instances of the `Popen` class have the following methods:

### `Popen.poll()`

Check if child process has terminated.  Set and return
`returncode` attribute. Otherwise, returns `None`.

### `Popen.wait(timeout=None)`

Wait for child process to terminate.  Set and return
`returncode` attribute.

If the process does not terminate after *timeout* seconds, raise a
`TimeoutExpired` exception.  It is safe to catch this exception and
retry the wait.

> **Note:** This will deadlock when using `stdout=PIPE` or `stderr=PIPE`
> and the child process generates enough output to a pipe such that
> it blocks waiting for the OS pipe buffer to accept more data.
> Use `Popen.communicate()` when using pipes to avoid that.

> **Note:** When `timeout` is not `None` and the platform supports it, an
> efficient event-driven mechanism is used to wait for process termination:
>
> - Linux >= 5.3 uses `os.pidfd_open()` + `select.poll()`
> - macOS and other BSD variants use `select.kqueue()` +
> `KQ_FILTER_PROC` + `KQ_NOTE_EXIT`
> - Windows uses `WaitForSingleObject`
>
> If none of these mechanisms are available, the function falls back to a
> busy loop (non-blocking call and short sleeps).

> **Note:** Use the `asyncio` module for an asynchronous wait: see
> `asyncio.create_subprocess_exec`.

> *Changed in version 3.3.*
> *timeout* was added.

> *Changed in version 3.15.*
> if *timeout* is not `None`, use efficient event-driven implementation
> on Linux >= 5.3 and macOS / BSD.

### `Popen.communicate(input=None, timeout=None)`

Interact with process: Send data to stdin.  Read data from stdout and stderr,
until end-of-file is reached.  Wait for process to terminate and set the
`returncode` attribute.  The optional *input* argument should be
data to be sent to the child process, or `None`, if no data should be sent
to the child.  If streams were opened in text mode, *input* must be a string.
Otherwise, it must be bytes.

`communicate()` returns a tuple `(stdout_data, stderr_data)`.
The data will be strings if streams were opened in text mode; otherwise,
bytes.

Note that if you want to send data to the process's stdin, you need to create
the Popen object with `stdin=PIPE`.  Similarly, to get anything other than
`None` in the result tuple, you need to give `stdout=PIPE` and/or
`stderr=PIPE` too.

If the process does not terminate after *timeout* seconds, a
`TimeoutExpired` exception will be raised.  Catching this exception and
retrying communication will not lose any output.  Supplying *input* to a
subsequent post-timeout `communicate()` call is in undefined behavior
and may become an error in the future.

The child process is not killed if the timeout expires, so in order to
cleanup properly a well-behaved application should kill the child process and
finish communication:

```
proc = subprocess.Popen(...)
try:
    outs, errs = proc.communicate(timeout=15)
except TimeoutExpired:
    proc.kill()
    outs, errs = proc.communicate()
```

After a call to `communicate()` raises `TimeoutExpired`, do
not call `wait()`. Use an additional `communicate()`
call to finish handling pipes and populate the `returncode`
attribute.

> **Note:** The data read is buffered in memory, so do not use this method if the data
> size is large or unlimited.

> *Changed in version 3.3.*
> *timeout* was added.

### `Popen.send_signal(signal)`

Sends the signal *signal* to the child.

Do nothing if the process completed.

> **Note:** On Windows, SIGTERM is an alias for `terminate()`. CTRL_C_EVENT and
> CTRL_BREAK_EVENT can be sent to processes started with a *creationflags*
> parameter which includes `CREATE_NEW_PROCESS_GROUP`.

### `Popen.terminate()`

Stop the child. On POSIX OSs the method sends `SIGTERM` to the
child. On Windows the Win32 API function `TerminateProcess` is called
to stop the child.

### `Popen.kill()`

Kills the child. On POSIX OSs the function sends SIGKILL to the child.
On Windows `kill()` is an alias for `terminate()`.

The following attributes are also set by the class for you to access.
Reassigning them to new values is unsupported:

### `Popen.args`

The *args* argument as it was passed to `Popen` -- a
sequence of program arguments or else a single string.

> *Added in version 3.3.*

### `Popen.stdin`

If the *stdin* argument was `PIPE`, this attribute is a writeable
stream object as returned by `open()`. If the *encoding* or *errors*
arguments were specified or the *text* or *universal_newlines* argument
was `True`, the stream is a text stream, otherwise it is a byte stream.
If the *stdin* argument was not `PIPE`, this attribute is `None`.

### `Popen.stdout`

If the *stdout* argument was `PIPE`, this attribute is a readable
stream object as returned by `open()`. Reading from the stream provides
output from the child process. If the *encoding* or *errors* arguments were
specified or the *text* or *universal_newlines* argument was `True`, the
stream is a text stream, otherwise it is a byte stream. If the *stdout*
argument was not `PIPE`, this attribute is `None`.

### `Popen.stderr`

If the *stderr* argument was `PIPE`, this attribute is a readable
stream object as returned by `open()`. Reading from the stream provides
error output from the child process. If the *encoding* or *errors* arguments
were specified or the *text* or *universal_newlines* argument was `True`, the
stream is a text stream, otherwise it is a byte stream. If the *stderr* argument
was not `PIPE`, this attribute is `None`.

> **Warning:** Use `communicate()` rather than `.stdin.write`,
> `.stdout.read` or `.stderr.read` to avoid
> deadlocks due to any of the other OS pipe buffers filling up and blocking the
> child process.

### `Popen.pid`

The process ID of the child process.

Note that if you set the *shell* argument to `True`, this is the process ID
of the spawned shell.

### `Popen.returncode`

The child return code. Initially `None`, `returncode` is set by
a call to the `poll()`, `wait()`, or `communicate()` methods
if they detect that the process has terminated.

A `None` value indicates that the process hadn't yet terminated at the
time of the last method call.

A negative value `-N` indicates that the child was terminated by signal
`N` (POSIX only).

When `shell=True`, the return code reflects the exit status of the shell
itself (e.g. `/bin/sh`), which may map signals to codes such as
`128+N`. See the documentation of the shell (for example, the Bash
manual's Exit Status) for details.
