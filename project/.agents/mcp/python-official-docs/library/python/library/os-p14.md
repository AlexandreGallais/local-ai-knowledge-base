---
title: "os --- Miscellaneous operating system interfaces (part 14 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 14 of 16)

### `posix_spawn(path, argv, env, *, file_actions=None, \`

```python
setpgroup=None, resetids=False, setsid=False, setsigmask=(), \
setsigdef=(), scheduler=None)
```

Wraps the `posix_spawn` C library API for use from Python.

Most users should use `subprocess.run()` instead of `posix_spawn()`.

The positional-only arguments *path*, *args*, and *env* are similar to
`execve()`. *env* is allowed to be `None`, in which case current
process' environment is used.

The *path* parameter is the path to the executable file.  The *path* should
contain a directory.  Use `posix_spawnp()` to pass an executable file
without directory.

The *file_actions* argument may be a sequence of tuples describing actions
to take on specific file descriptors in the child process between the C
library implementation's `fork` and `exec` steps.
The first item in each tuple must be one of the three type indicator
listed below describing the remaining tuple elements:

### `POSIX_SPAWN_OPEN`

(`os.POSIX_SPAWN_OPEN`, *fd*, *path*, *flags*, *mode*)

Performs `os.dup2(os.open(path, flags, mode), fd)`.

### `POSIX_SPAWN_CLOSE`

(`os.POSIX_SPAWN_CLOSE`, *fd*)

Performs `os.close(fd)`.

### `POSIX_SPAWN_DUP2`

(`os.POSIX_SPAWN_DUP2`, *fd*, *new_fd*)

Performs `os.dup2(fd, new_fd)`.

### `POSIX_SPAWN_CLOSEFROM`

(`os.POSIX_SPAWN_CLOSEFROM`, *fd*)

Performs `os.closerange(fd, INF)`.

These tuples correspond to the C library
`posix_spawn_file_actions_addopen`,
`posix_spawn_file_actions_addclose`,
`posix_spawn_file_actions_adddup2`, and
`posix_spawn_file_actions_addclosefrom_np` API calls used to prepare
for the `posix_spawn` call itself.

The *setpgroup* argument will set the process group of the child to the value
specified. If the value specified is 0, the child's process group ID will be
made the same as its process ID. If the value of *setpgroup* is not set, the
child will inherit the parent's process group ID. This argument corresponds
to the C library `POSIX_SPAWN_SETPGROUP` flag.

If the *resetids* argument is `True` it will reset the effective UID and
GID of the child to the real UID and GID of the parent process. If the
argument is `False`, then the child retains the effective UID and GID of
the parent. In either case, if the set-user-ID and set-group-ID permission
bits are enabled on the executable file, their effect will override the
setting of the effective UID and GID. This argument corresponds to the C
library `POSIX_SPAWN_RESETIDS` flag.

If the *setsid* argument is `True`, it will create a new session ID
for `posix_spawn`. *setsid* requires `POSIX_SPAWN_SETSID`
or `POSIX_SPAWN_SETSID_NP` flag. Otherwise, `NotImplementedError`
is raised.

The *setsigmask* argument will set the signal mask to the signal set
specified. If the parameter is not used, then the child inherits the
parent's signal mask. This argument corresponds to the C library
`POSIX_SPAWN_SETSIGMASK` flag.

The *sigdef* argument will reset the disposition of all signals in the set
specified. This argument corresponds to the C library
`POSIX_SPAWN_SETSIGDEF` flag.

The *scheduler* argument must be a tuple containing the (optional) scheduler
policy and an instance of `sched_param` with the scheduler parameters.
A value of `None` in the place of the scheduler policy indicates that is
not being provided. This argument is a combination of the C library
`POSIX_SPAWN_SETSCHEDPARAM` and `POSIX_SPAWN_SETSCHEDULER`
flags.

> *Added in version 3.8.*

> *Changed in version 3.13.*
> *env* parameter accepts `None`.
> `os.POSIX_SPAWN_CLOSEFROM` is available on platforms where
> `posix_spawn_file_actions_addclosefrom_np` exists.

> **Availability:** Unix, not WASI, not Android, not iOS.

### `posix_spawnp(path, argv, env, *, file_actions=None, \`

```python
setpgroup=None, resetids=False, setsid=False, setsigmask=(), \
setsigdef=(), scheduler=None)
```

Wraps the `posix_spawnp` C library API for use from Python.

Similar to `posix_spawn()` except that the system searches
for the *executable* file in the list of directories specified by the
`PATH` environment variable (in the same way as for `execvp(3)`).

> *Added in version 3.8.*

> **Availability:** POSIX, not WASI, not Android, not iOS.
>
> See `posix_spawn()` documentation.

### `register_at_fork(*, before=None, after_in_parent=None, \`

```python
after_in_child=None)
```

Register callables to be executed when a new child process is forked
using `os.fork()` or similar process cloning APIs.
The parameters are optional and keyword-only.
Each specifies a different call point.

- *before* is a function called before forking a child process.
- *after_in_parent* is a function called from the parent process
after forking a child process.
- *after_in_child* is a function called from the child process.

These calls are only made if control is expected to return to the
Python interpreter.  A typical `subprocess` launch will not
trigger them as the child is not going to re-enter the interpreter.

Functions registered for execution before forking are called in
reverse registration order.  Functions registered for execution
after forking (either in the parent or in the child) are called
in registration order.

Note that `fork` calls made by third-party C code may not
call those functions, unless it explicitly calls `PyOS_BeforeFork`,
`PyOS_AfterFork_Parent` and `PyOS_AfterFork_Child`.

There is no way to unregister a function.

> **Availability:** Unix, not WASI, not Android, not iOS.

> *Added in version 3.7.*

### `spawnl(mode, path, ...)`

```python
spawnle(mode, path, ..., env)
spawnlp(mode, file, ...)
spawnlpe(mode, file, ..., env)
spawnv(mode, path, args)
spawnve(mode, path, args, env)
spawnvp(mode, file, args)
spawnvpe(mode, file, args, env)
```

Execute the program *path* in a new process.

(Note that the `subprocess` module provides more powerful facilities for
spawning new processes and retrieving their results; using that module is
preferable to using these functions.  Check especially the
subprocess-replacements section.)

If *mode* is `P_NOWAIT`, this function returns the process id of the new
process; if *mode* is `P_WAIT`, returns the process's exit code if it
exits normally, or `-signal`, where *signal* is the signal that killed the
process.  On Windows, the process id will actually be the process handle, so can
be used with the `waitpid()` function.

Note on VxWorks, this function doesn't return `-signal` when the new process is
killed. Instead it raises OSError exception.

The "l" and "v" variants of the `spawn*()` functions differ in how
command-line arguments are passed.  The "l" variants are perhaps the easiest
to work with if the number of parameters is fixed when the code is written; the
individual parameters simply become additional parameters to the
`spawnl*()` functions.  The "v" variants are good when the number of
parameters is variable, with the arguments being passed in a list or tuple as
the *args* parameter.  In either case, the arguments to the child process must
start with the name of the command being run.

The variants which include a second "p" near the end (`spawnlp()`,
`spawnlpe()`, `spawnvp()`, and `spawnvpe()`) will use the
`PATH` environment variable to locate the program *file*.  When the
environment is being replaced (using one of the `spawn*e()` variants,
discussed in the next paragraph), the new environment is used as the source of
the `PATH` variable.  The other variants, `spawnl()`,
`spawnle()`, `spawnv()`, and `spawnve()`, will not use the
`PATH` variable to locate the executable; *path* must contain an
appropriate absolute or relative path.

For `spawnle()`, `spawnlpe()`, `spawnve()`, and `spawnvpe()`
(note that these all end in "e"), the *env* parameter must be a mapping
which is used to define the environment variables for the new process (they are
used instead of the current process' environment); the functions
`spawnl()`, `spawnlp()`, `spawnv()`, and `spawnvp()` all cause
the new process to inherit the environment of the current process.  Note that
keys and values in the *env* dictionary must be strings; invalid keys or
values will cause the function to fail, with a return value of `127`.

As an example, the following calls to `spawnlp()` and `spawnvpe()` are
equivalent:

```
import os
os.spawnlp(os.P_WAIT, 'cp', 'cp', 'index.html', '/dev/null')

L = ['cp', 'index.html', '/dev/null']
os.spawnvpe(os.P_WAIT, 'cp', L, os.environ)
```

> **Availability:** Unix, Windows, not WASI, not Android, not iOS.
>
> `spawnlp()`, `spawnlpe()`, `spawnvp()`
> and `spawnvpe()` are not available on Windows.  `spawnle()` and
> `spawnve()` are not thread-safe on Windows; we advise you to use the
> `subprocess` module instead.

> *Changed in version 3.6.*
> Accepts a path-like object.

3.14
The `subprocess` module is recommended instead.

### `P_NOWAIT`

```python
P_NOWAITO
```

Possible values for the *mode* parameter to the `spawn*()` family of
functions.  If either of these values is given, the `spawn*()` functions
will return as soon as the new process has been created, with the process id as
the return value.

> **Availability:** Unix, Windows.

### `P_WAIT`

Possible value for the *mode* parameter to the `spawn*()` family of
functions.  If this is given as *mode*, the `spawn*()` functions will not
return until the new process has run to completion and will return the exit code
of the process the run is successful, or `-signal` if a signal kills the
process.

> **Availability:** Unix, Windows.

### `P_DETACH`

```python
P_OVERLAY
```

Possible values for the *mode* parameter to the `spawn*()` family of
functions.  These are less portable than those listed above. `P_DETACH`
is similar to `P_NOWAIT`, but the new process is detached from the
console of the calling process. If `P_OVERLAY` is used, the current
process will be replaced; the `spawn*()` function will not return.

> **Availability:** Windows.

### `startfile(path, [operation], [arguments], [cwd], [show_cmd])`

Start a file with its associated application.

When *operation* is not specified, this acts like double-clicking
the file in Windows Explorer, or giving the file name as an argument to the
`start` command from the interactive command shell: the file is opened
with whatever application (if any) its extension is associated.

When another *operation* is given, it must be a "command verb" that specifies
what should be done with the file. Common verbs documented by Microsoft are `'open'`,
`'print'` and  `'edit'` (to be used on files) as well as `'explore'` and
`'find'` (to be used on directories).

When launching an application, specify *arguments* to be passed as a single
string. This argument may have no effect when using this function to launch a
document.

The default working directory is inherited, but may be overridden by the *cwd*
argument. This should be an absolute path. A relative *path* will be resolved
against this argument.

Use *show_cmd* to override the default window style. Whether this has any
effect will depend on the application being launched. Values are integers as
supported by the Win32 `ShellExecute` function.

`startfile()` returns as soon as the associated application is launched.
There is no option to wait for the application to close, and no way to retrieve
the application's exit status.  The *path* parameter is relative to the current
directory or *cwd*.  If you want to use an absolute path, make sure the first
character is not a slash (`'/'`)  Use `pathlib` or the
`os.path.normpath()` function to ensure that paths are properly encoded for
Win32.

To reduce interpreter startup overhead, the Win32 `ShellExecute`
function is not resolved until this function is first called.  If the function
cannot be resolved, `NotImplementedError` will be raised.

> **Availability:** Windows.

> *Changed in version 3.10.*
> Added the *arguments*, *cwd* and *show_cmd* arguments, and the
> `os.startfile/2` audit event.

### `system(command)`

Execute the command (a string) in a subshell.  This is implemented by calling
the Standard C function `system`, and has the same limitations.
Changes to `sys.stdin`, etc. are not reflected in the environment of
the executed command. If *command* generates any output, it will be sent to
the interpreter standard output stream. The C standard does not
specify the meaning of the return value of the C function, so the return
value of the Python function is system-dependent.

On Unix, the return value is the exit status of the process encoded in the
format specified for `wait()`.

On Windows, the return value is that returned by the system shell after
running *command*.  The shell is given by the Windows environment variable
`COMSPEC`: it is usually `cmd.exe`, which returns the exit
status of the command run; on systems using a non-native shell, consult your
shell documentation.

The `subprocess` module provides more powerful facilities for spawning
new processes and retrieving their results; using that module is recommended
to using this function.  See the subprocess-replacements section in
the `subprocess` documentation for some helpful recipes.

On Unix, `waitstatus_to_exitcode()` can be used to convert the result
(exit status) into an exit code. On Windows, the result is directly the exit
code.

> **Availability:** Unix, Windows, not WASI, not Android, not iOS.

### `times()`

Returns the current global process times.
The return value is an object with five attributes:

- `user` - user time
- `system` - system time
- `children_user` - user time of all child processes
- `children_system` - system time of all child processes
- `elapsed` - elapsed real time since a fixed point in the past

For backwards compatibility, this object also behaves like a five-tuple
containing `user`, `system`, `children_user`,
`children_system`, and `elapsed` in that order.

See the Unix manual page
times(2) and times(3) manual page on Unix or `the GetProcessTimes MSDN
<https://docs.microsoft.com/windows/win32/api/processthreadsapi/nf-processthreadsapi-getprocesstimes>`_
on Windows. On Windows, only `user` and `system` are known; the other attributes are zero.

> **Availability:** Unix, Windows.

> *Changed in version 3.3.*
> Return type changed from a tuple to a tuple-like object
> with named attributes.
