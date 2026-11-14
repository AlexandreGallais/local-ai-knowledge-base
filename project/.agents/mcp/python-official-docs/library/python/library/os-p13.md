---
title: "os --- Miscellaneous operating system interfaces (part 13 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 13 of 16)

## Process Management

These functions may be used to create and manage processes.

The various `exec*()` functions take a list of arguments for the new
program loaded into the process.  In each case, the first of these arguments is
passed to the new program as its own name rather than as an argument a user may
have typed on a command line.  For the C programmer, this is the `argv[0]`
passed to a program's `main`.  For example, ``os.execv('/bin/echo',
['foo', 'bar'])` will only print `bar` on standard output; `foo`` will seem
to be ignored.

### `abort()`

Generate a `SIGABRT` signal to the current process.  On Unix, the default
behavior is to produce a core dump; on Windows, the process immediately returns
an exit code of `3`.  Be aware that calling this function will not call the
Python signal handler registered for `SIGABRT` with
`signal.signal()`.

### `add_dll_directory(path)`

Add a path to the DLL search path.

This search path is used when resolving dependencies for imported
extension modules (the module itself is resolved through
`sys.path`), and also by `ctypes`.

Remove the directory by calling **close()** on the returned object
or using it in a `with` statement.

See the `Microsoft documentation
<https://msdn.microsoft.com/44228cf2-6306-466c-8f16-f513cd3ba8b5>`_
for more information about how DLLs are loaded.

> **Availability:** Windows.

> *Added in version 3.8.*
> Previous versions of CPython would resolve DLLs using the default
> behavior for the current process. This led to inconsistencies,
> such as only sometimes searching `PATH` or the current
> working directory, and OS functions such as `AddDllDirectory`
> having no effect.
> In 3.8, the two primary ways DLLs are loaded now explicitly
> override the process-wide behavior to ensure consistency. See the
> porting notes for information on
> updating libraries.

### `execl(path, arg0, arg1, ...)`

```python
execle(path, arg0, arg1, ..., env)
execlp(file, arg0, arg1, ...)
execlpe(file, arg0, arg1, ..., env)
execv(path, args)
execve(path, args, env)
execvp(file, args)
execvpe(file, args, env)
```

These functions all execute a new program, replacing the current process; they
do not return.  On Unix, the new executable is loaded into the current process,
and will have the same process id as the caller.  Errors will be reported as
`OSError` exceptions.

The current process is replaced immediately. Open file objects and
descriptors are not flushed, so if there may be data buffered
on these open files, you should flush them using
`flush()` or `os.fsync()` before calling an
`exec*()` function.

The "l" and "v" variants of the `exec*()` functions differ in how
command-line arguments are passed.  The "l" variants are perhaps the easiest
to work with if the number of parameters is fixed when the code is written; the
individual parameters simply become additional parameters to the `execl*()`
functions.  The "v" variants are good when the number of parameters is
variable, with the arguments being passed in a list or tuple as the *args*
parameter.  In either case, the arguments to the child process should start with
the name of the command being run, but this is not enforced.

The variants which include a "p" near the end (`execlp()`,
`execlpe()`, `execvp()`, and `execvpe()`) will use the
`PATH` environment variable to locate the program *file*.  When the
environment is being replaced (using one of the `exec*e()` variants,
discussed in the next paragraph), the new environment is used as the source of
the `PATH` variable. The other variants, `execl()`, `execle()`,
`execv()`, and `execve()`, will not use the `PATH` variable to
locate the executable; *path* must contain an appropriate absolute or relative
path. Relative paths must include at least one slash, even on Windows, as
plain names will not be resolved.

For `execle()`, `execlpe()`, `execve()`, and `execvpe()` (note
that these all end in "e"), the *env* parameter must be a mapping which is
used to define the environment variables for the new process (these are used
instead of the current process' environment); the functions `execl()`,
`execlp()`, `execv()`, and `execvp()` all cause the new process to
inherit the environment of the current process.

For `execve()` on some platforms, *path* may also be specified as an open
file descriptor.  This functionality may not be supported on your platform;
you can check whether or not it is available using `os.supports_fd`.
If it is unavailable, using it will raise a `NotImplementedError`.

> **Availability:** Unix, Windows, not WASI, not Android, not iOS.

> *Changed in version 3.3.*
> Added support for specifying *path* as an open file descriptor
> for `execve()`.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `_exit(n)`

Exit the process with status *n*, without calling cleanup handlers, flushing
stdio buffers, etc.

> **Note:** The standard way to exit is `sys.exit(n).  exit()` should
> normally only be used in the child process after a `fork()`.

The following exit codes are defined and can be used with `_exit()`,
although they are not required.  These are typically used for system programs
written in Python, such as a mail server's external command delivery program.

> **Note:** Some of these may not be available on all Unix platforms, since there is some
> variation.  These constants are defined where they are defined by the underlying
> platform.

### `EX_OK`

Exit code that means no error occurred. May be taken from the defined value of
`EXIT_SUCCESS` on some platforms. Generally has a value of zero.

> **Availability:** Unix, Windows.

### `EX_USAGE`

Exit code that means the command was used incorrectly, such as when the wrong
number of arguments are given.

> **Availability:** Unix, not WASI.

### `EX_DATAERR`

Exit code that means the input data was incorrect.

> **Availability:** Unix, not WASI.

### `EX_NOINPUT`

Exit code that means an input file did not exist or was not readable.

> **Availability:** Unix, not WASI.

### `EX_NOUSER`

Exit code that means a specified user did not exist.

> **Availability:** Unix, not WASI.

### `EX_NOHOST`

Exit code that means a specified host did not exist.

> **Availability:** Unix, not WASI.

### `EX_UNAVAILABLE`

Exit code that means that a required service is unavailable.

> **Availability:** Unix, not WASI.

### `EX_SOFTWARE`

Exit code that means an internal software error was detected.

> **Availability:** Unix, not WASI.

### `EX_OSERR`

Exit code that means an operating system error was detected, such as the
inability to fork or create a pipe.

> **Availability:** Unix, not WASI.

### `EX_OSFILE`

Exit code that means some system file did not exist, could not be opened, or had
some other kind of error.

> **Availability:** Unix, not WASI.

### `EX_CANTCREAT`

Exit code that means a user specified output file could not be created.

> **Availability:** Unix, not WASI.

### `EX_IOERR`

Exit code that means that an error occurred while doing I/O on some file.

> **Availability:** Unix, not WASI.

### `EX_TEMPFAIL`

Exit code that means a temporary failure occurred.  This indicates something
that may not really be an error, such as a network connection that couldn't be
made during a retryable operation.

> **Availability:** Unix, not WASI.

### `EX_PROTOCOL`

Exit code that means that a protocol exchange was illegal, invalid, or not
understood.

> **Availability:** Unix, not WASI.

### `EX_NOPERM`

Exit code that means that there were insufficient permissions to perform the
operation (but not intended for file system problems).

> **Availability:** Unix, not WASI.

### `EX_CONFIG`

Exit code that means that some kind of configuration error occurred.

> **Availability:** Unix, not WASI.

### `EX_NOTFOUND`

Exit code that means something like "an entry was not found".

> **Availability:** Unix, not WASI.

### `fork()`

Fork a child process.  Return `0` in the child and the child's process id in the
parent.  If an error occurs `OSError` is raised.

Note that some platforms including FreeBSD <= 6.3 and Cygwin have
known issues when using `fork()` from a thread.

> **Warning:** If you use TLS sockets in an application calling `fork()`, see
> the warning in the `ssl` documentation.

> **Warning:** On macOS the use of this function is unsafe when mixed with using
> higher-level system APIs, and that includes using `urllib.request`.

> *Changed in version 3.8.*
> Calling `fork()` in a subinterpreter is no longer supported
> (`RuntimeError` is raised).

> *Changed in version 3.12.*
> If Python is able to detect that your process has multiple
> threads, `os.fork()` now raises a `DeprecationWarning`.
> We chose to surface this as a warning, when detectable, to better
> inform developers of a design problem that the POSIX platform
> specifically notes as not supported. Even in code that
> *appears* to work, it has never been safe to mix threading with
> `os.fork()` on POSIX platforms. The CPython runtime itself has
> always made API calls that are not safe for use in the child
> process when threads existed in the parent (such as `malloc` and
> `free`).
>
> Users of macOS or users of libc or malloc implementations other
> than those typically found in glibc to date are among those
> already more likely to experience deadlocks running such code.
>
> See `this discussion on fork being incompatible with threads
> <https://discuss.python.org/t/33555>`_
> for technical details of why we're surfacing this longstanding
> platform compatibility problem to developers.

> **Availability:** POSIX, not WASI, not Android, not iOS.

### `forkpty()`

Fork a child process, using a new pseudo-terminal as the child's controlling
terminal. Return a pair of `(pid, fd)`, where *pid* is `0` in the child, the
new child's process id in the parent, and *fd* is the file descriptor of the
master end of the pseudo-terminal.  For a more portable approach, use the
`pty` module.  If an error occurs `OSError` is raised.

The returned file descriptor *fd* is non-inheritable.

> **Warning:** On macOS the use of this function is unsafe when mixed with using
> higher-level system APIs, and that includes using `urllib.request`.

> *Changed in version 3.8.*
> Calling `forkpty()` in a subinterpreter is no longer supported
> (`RuntimeError` is raised).

> *Changed in version 3.12.*
> If Python is able to detect that your process has multiple
> threads, this now raises a `DeprecationWarning`. See the
> longer explanation on `os.fork()`.

> *Changed in version 3.15.*
> The returned file descriptor is now made non-inheritable.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `kill(pid, sig, /)`

Send signal *sig* to the process *pid*.  Constants for the specific signals
available on the host platform are defined in the `signal` module.

Windows: The `signal.CTRL_C_EVENT` and
`signal.CTRL_BREAK_EVENT` signals are special signals which can
only be sent to console processes which share a common console window,
e.g., some subprocesses. Any other value for *sig* will cause the process
to be unconditionally killed by the TerminateProcess API, and the exit code
will be set to *sig*.

See also `signal.pthread_kill()`.

> **Availability:** Unix, Windows, not WASI, not iOS.

> *Changed in version 3.2.*
> Added Windows support.

### `killpg(pgid, sig, /)`

Send the signal *sig* to the process group *pgid*.

> **Availability:** Unix, not WASI, not iOS.

### `nice(increment, /)`

Add *increment* to the process's "niceness".  Return the new niceness.

> **Availability:** Unix, not WASI.

### `pidfd_open(pid, flags=0)`

Return a file descriptor referring to the process *pid* with *flags* set.
This descriptor can be used to perform process management without races
and signals.

See the pidfd_open(2) man page for more details.

> **Availability:** Linux >= 5.3, Android >= `build-time()` API level 31

> *Added in version 3.9.*

### `PIDFD_NONBLOCK`

This flag indicates that the file descriptor will be non-blocking.
If the process referred to by the file descriptor has not yet terminated,
then an attempt to wait on the file descriptor using waitid(2)
will immediately return the error `EAGAIN` rather than blocking.

> **Availability:** Linux >= 5.10

> *Added in version 3.12.*

### `plock(op, /)`

Lock program segments into memory.  The value of *op* (defined in
`<sys/lock.h>`) determines which segments are locked.

> **Availability:** Unix, not WASI, not macOS, not iOS.

### `popen(cmd, mode='r', buffering=-1)`

Open a pipe to or from command *cmd*.
The return value is an open file object
connected to the pipe, which can be read or written depending on whether *mode*
is `'r'` (default) or `'w'`.
The *buffering* argument have the same meaning as
the corresponding argument to the built-in `open()` function. The
returned file object reads or writes text strings rather than bytes.

The `close` method returns `None` if the subprocess exited
successfully, or the subprocess's return code if there was an
error. On POSIX systems, if the return code is positive it
represents the return value of the process left-shifted by one
byte.  If the return code is negative, the process was terminated
by the signal given by the negated value of the return code.  (For
example, the return value might be `- signal.SIGKILL` if the
subprocess was killed.)  On Windows systems, the return value
contains the signed integer return code from the child process.

On Unix, `waitstatus_to_exitcode()` can be used to convert the `close`
method result (exit status) into an exit code if it is not `None`. On
Windows, the `close` method result is directly the exit code
(or `None`).

This is implemented using `subprocess.Popen`; see that class's
documentation for more powerful ways to manage and communicate with
subprocesses.

> **Availability:** not WASI, not Android, not iOS.

> **Note:** The Python UTF-8 Mode affects encodings used
> for *cmd* and pipe contents.
>
> `popen()` is a simple wrapper around `subprocess.Popen`.
> Use `subprocess.Popen` or `subprocess.run()` to
> control options like encodings.

3.14
The `subprocess` module is recommended instead.
