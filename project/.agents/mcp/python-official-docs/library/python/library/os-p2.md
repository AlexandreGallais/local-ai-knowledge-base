---
title: "os --- Miscellaneous operating system interfaces (part 2 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 2 of 16)

## Process Parameters

These functions and data items provide information and operate on the current
process and user.

### `ctermid()`

Return the filename corresponding to the controlling terminal of the process.

> **Availability:** Unix, not WASI.

### `environ`

A mapping object where keys and values are strings that represent
the process environment.  For example, `environ['HOME']` is the pathname
of your home directory (on some platforms), and is equivalent to
`getenv("HOME")` in C.

This mapping is captured the first time the `os` module is imported,
typically during Python startup as part of processing `site.py`.  Changes
to the environment made after this time are not reflected in `os.environ`,
except for changes made by modifying `os.environ` directly.

This mapping may be used to modify the environment as well as query the
environment.  `putenv()` will be called automatically when the mapping
is modified.

On Unix, keys and values use `sys.getfilesystemencoding()` and
`'surrogateescape'` error handler. Use `environb` if you would like
to use a different encoding.

On Windows, the keys are converted to uppercase. This also applies when
getting, setting, or deleting an item. For example,
`environ['monty'] = 'python'` maps the key `'MONTY'` to the value
`'python'`.

> **Note:** Calling `putenv()` directly does not change `os.environ`, so it's better
> to modify `os.environ`.

> **Note:** On some platforms, including FreeBSD and macOS, setting `environ` may
> cause memory leaks.  Refer to the system documentation for
> `putenv`.

You can delete items in this mapping to unset environment variables.
`unsetenv()` will be called automatically when an item is deleted from
`os.environ`, and when one of the `pop()` or
`clear()` methods is called.

If the clearenv(3) function is available, the `clear()` method
uses it and emits a single `os._clearenv` audit event. Otherwise, it emits
an `os.unsetenv` event on each deleted variable.

> **See also:** The `os.reload_environ()` function.

> *Changed in version 3.9.*
> Updated to support PEP 584's merge (`|`) and update (`|=`) operators.

> *Changed in version 3.15.*
> The `clear()` method can now emit an `os._clearenv` audit
> event.

### `environb`

Bytes version of `environ`: a mapping object where both keys
and values are `bytes` objects representing the process environment.
`environ` and `environb` are synchronized (modifying
`environb` updates `environ`, and vice versa).

`environb` is only available if `supports_bytes_environ` is
`True`.

> *Added in version 3.2.*

> *Changed in version 3.9.*
> Updated to support PEP 584's merge (`|`) and update (`|=`) operators.

### `reload_environ()`

The `os.environ` and `os.environb` mappings are a cache of
environment variables at the time that Python started.
As such, changes to the current process environment are not reflected
if made outside Python, or by `os.putenv()` or `os.unsetenv()`.
Use `os.reload_environ()` to update `os.environ` and `os.environb`
with any such changes to the current process environment.

> **Warning:** This function is not thread-safe. Calling it while the environment is
> being modified in another thread is an undefined behavior. Reading from
> `os.environ` or `os.environb`, or calling `os.getenv()`
> while reloading, may return an empty result.

> *Added in version 3.14.*

### `chdir(path)`

```python
fchdir(fd)
getcwd()
```

These functions are described in os-file-dir.

### `fsencode(filename)`

Encode path-like *filename* to the
filesystem encoding and error handler; return `bytes`
unchanged.

`fsdecode()` is the reverse function.

> *Added in version 3.2.*

> *Changed in version 3.6.*
> Support added to accept objects implementing the `os.PathLike`
> interface.

### `fsdecode(filename)`

Decode the path-like *filename* from the
filesystem encoding and error handler; return `str`
unchanged.

`fsencode()` is the reverse function.

> *Added in version 3.2.*

> *Changed in version 3.6.*
> Support added to accept objects implementing the `os.PathLike`
> interface.

### `fspath(path)`

Return the file system representation of the path.

If `str` or `bytes` is passed in, it is returned unchanged.
Otherwise `__fspath__()` is called and its value is
returned as long as it is a `str` or `bytes` object.
In all other cases, `TypeError` is raised.

> *Added in version 3.6.*

### class `PathLike`

An abstract base class for objects representing a file system path,
e.g. `pathlib.PurePath`.

> *Added in version 3.6.*

### `__fspath__()`

Return the file system path representation of the object.

The method should only return a `str` or `bytes` object,
with the preference being for `str`.

### `getenv(key, default=None)`

Return the value of the environment variable *key* as a string if it exists, or
*default* if it doesn't. *key* is a string. Note that
since `getenv()` uses `os.environ`, the mapping of `getenv()` is
similarly also captured on import, and the function may not reflect
future environment changes.

On Unix, keys and values are decoded with `sys.getfilesystemencoding()`
and `'surrogateescape'` error handler. Use `os.getenvb()` if you
would like to use a different encoding.

> **Availability:** Unix, Windows.

### `getenvb(key, default=None)`

Return the value of the environment variable *key* as bytes if it exists, or
*default* if it doesn't. *key* must be bytes. Note that
since `getenvb()` uses `os.environb`, the mapping of `getenvb()` is
similarly also captured on import, and the function may not reflect
future environment changes.

`getenvb()` is only available if `supports_bytes_environ`
is `True`.

> **Availability:** Unix.

> *Added in version 3.2.*

### `get_exec_path(env=None)`

Returns the list of directories that will be searched for a named
executable, similar to a shell, when launching a process.
*env*, when specified, should be an environment variable dictionary
to lookup the PATH in.
By default, when *env* is `None`, `environ` is used.

> *Added in version 3.2.*

### `getegid()`

Return the effective group id of the current process.  This corresponds to the
"set id" bit on the file being executed in the current process.

> **Availability:** Unix, not WASI.

### `geteuid()`

Return the current process's effective user id.

> **Availability:** Unix, not WASI.

### `getgid()`

Return the real group id of the current process.

> **Availability:** Unix.
>
> The function is a stub on WASI, see wasm-availability for more
> information.

### `getgrouplist(user, group, /)`

Return list of group ids that *user* belongs to. If *group* is not in the
list, it is included; typically, *group* is specified as the group ID
field from the password <example-value> for *user*, because that group ID will
otherwise be potentially omitted.

> **Availability:** Unix, not WASI.

> *Added in version 3.3.*

### `getgroups()`

Return list of supplemental group ids associated with the current process.

> **Availability:** Unix, not WASI.

> **Note:** On macOS, `getgroups()` behavior differs somewhat from
> other Unix platforms. If the Python interpreter was built with a
> deployment target of `10.5` or earlier, `getgroups()` returns
> the list of effective group ids associated with the current user process;
> this list is limited to a system-defined number of entries, typically 16,
> and may be modified by calls to `setgroups()` if suitably privileged.
> If built with a deployment target greater than `10.5`,
> `getgroups()` returns the current group access list for the user
> associated with the effective user id of the process; the group access
> list may change over the lifetime of the process, it is not affected by
> calls to `setgroups()`, and its length is not limited to 16.  The
> deployment target value can be obtained with
> `sysconfig.get_config_var('MACOSX_DEPLOYMENT_TARGET')`.

### `getlogin()`

Return the name of the user logged in on the controlling terminal of the
process.  For most purposes, it is more useful to use
`getpass.getuser()` since the latter checks the environment variables
`LOGNAME` or `USERNAME` to find out who the user is, and
falls back to `pwd.getpwuid(os.getuid())[0]` to get the login name of the
current real user id.

> **Availability:** Unix, Windows, not WASI.

### `getpgid(pid)`

Return the process group id of the process with process id *pid*. If *pid* is 0,
the process group id of the current process is returned.

> **Availability:** Unix, not WASI.

### `getpgrp()`

Return the id of the current process group.

> **Availability:** Unix, not WASI.

### `getpid()`

Return the current process id.

The function is a stub on WASI, see wasm-availability for more
information.

### `getppid()`

Return the parent's process id.  When the parent process has exited, on Unix
the id returned is the one of the init process (1), on Windows it is still
the same id, which may be already reused by another process.

> **Availability:** Unix, Windows, not WASI.

> *Changed in version 3.2.*
> Added support for Windows.

### `getpriority(which, who)`

Get program scheduling priority.  The value *which* is one of
`PRIO_PROCESS`, `PRIO_PGRP`, or `PRIO_USER`, and *who*
is interpreted relative to *which* (a process identifier for
`PRIO_PROCESS`, process group identifier for `PRIO_PGRP`, and a
user ID for `PRIO_USER`).  A zero value for *who* denotes
(respectively) the calling process, the process group of the calling process,
or the real user ID of the calling process.

> **Availability:** Unix, not WASI.

> *Added in version 3.3.*

### `PRIO_PROCESS`

```python
PRIO_PGRP
PRIO_USER
```

Parameters for the `getpriority()` and `setpriority()` functions.

> **Availability:** Unix, not WASI.

> *Added in version 3.3.*

### `PRIO_DARWIN_THREAD`

```python
PRIO_DARWIN_PROCESS
PRIO_DARWIN_BG
PRIO_DARWIN_NONUI
```

Parameters for the `getpriority()` and `setpriority()` functions.

> **Availability:** macOS

> *Added in version 3.12.*

### `getresuid()`

Return a tuple (ruid, euid, suid) denoting the current process's
real, effective, and saved user ids.

> **Availability:** Unix, not WASI, not macOS, not iOS.

> *Added in version 3.2.*

### `getresgid()`

Return a tuple (rgid, egid, sgid) denoting the current process's
real, effective, and saved group ids.

> **Availability:** Unix, not WASI, not macOS, not iOS.

> *Added in version 3.2.*

### `getuid()`

Return the current process's real user id.

> **Availability:** Unix.
>
> The function is a stub on WASI, see wasm-availability for more
> information.

### `initgroups(username, gid, /)`

Call the system `initgroups()` to initialize the group access list with all of
the groups of which the specified username is a member, plus the specified
group id.

> **Availability:** Unix, not WASI, not Android.

> *Added in version 3.2.*

### `putenv(key, value, /)`

Set the environment variable named *key* to the string *value*.  Such
changes to the environment affect subprocesses started with `os.system()`,
`popen()` or `fork()` and `execv()`.

Assignments to items in `os.environ` are automatically translated into
corresponding calls to `putenv()`; however, calls to `putenv()`
don't update `os.environ`, so it is actually preferable to assign to items
of `os.environ`. This also applies to `getenv()` and `getenvb()`, which
respectively use `os.environ` and `os.environb` in their implementations.

See also the `os.reload_environ()` function.

> **Note:** On some platforms, including FreeBSD and macOS, setting `environ` may
> cause memory leaks. Refer to the system documentation for `putenv`.

> *Changed in version 3.9.*
> The function is now always available.

### `setegid(egid, /)`

Set the current process's effective group id.

> **Availability:** Unix, not WASI, not Android.

### `seteuid(euid, /)`

Set the current process's effective user id.

> **Availability:** Unix, not WASI, not Android.

### `setgid(gid, /)`

Set the current process' group id.

> **Availability:** Unix, not WASI, not Android.

### `setgroups(groups, /)`

Set the list of supplemental group ids associated with the current process to
*groups*. *groups* must be a sequence, and each element must be an integer
identifying a group. This operation is typically available only to the superuser.

> **Availability:** Unix, not WASI.

> **Note:** On macOS, the length of *groups* may not exceed the
> system-defined maximum number of effective group ids, typically 16.
> See the documentation for `getgroups()` for cases where it may not
> return the same group list set by calling setgroups().

### `setns(fd, nstype=0)`

Reassociate the current thread with a Linux namespace.
See the setns(2) and namespaces(7) man pages for more
details.

If *fd* refers to a `/proc/{pid}/ns/` link, `setns()` reassociates the
calling thread with the namespace associated with that link,
and *nstype* may be set to one of the
CLONE_NEW* constants
to impose constraints on the operation
(`0` means no constraints).

Since Linux 5.8, *fd* may refer to a PID file descriptor obtained from
`pidfd_open()`. In this case, `setns()` reassociates the calling thread
into one or more of the same namespaces as the thread referred to by *fd*.
This is subject to any constraints imposed by *nstype*,
which is a bit mask combining one or more of the
CLONE_NEW* constants,
e.g. `setns(fd, os.CLONE_NEWUTS | os.CLONE_NEWPID)`.
The caller's memberships in unspecified namespaces are left unchanged.

*fd* can be any object with a `fileno()` method, or a raw file descriptor.

This example reassociates the thread with the `init` process's network namespace:

```
fd = os.open("/proc/1/ns/net", os.O_RDONLY)
os.setns(fd, os.CLONE_NEWNET)
os.close(fd)
```

> **Availability:** Linux >= 3.0 with glibc >= 2.14.

> *Added in version 3.12.*

> **See also:** The `unshare()` function.

### `setpgrp()`

Call the system call `setpgrp` or `setpgrp(0, 0)` depending on
which version is implemented (if any).  See the Unix manual for the semantics.

> **Availability:** Unix, not WASI.

### `setpgid(pid, pgrp, /)`

Call the system call `setpgid` to set the process group id of the
process with id *pid* to the process group with id *pgrp*.  See the Unix manual
for the semantics.

> **Availability:** Unix, not WASI.

### `setpriority(which, who, priority)`

Set program scheduling priority. The value *which* is one of
`PRIO_PROCESS`, `PRIO_PGRP`, or `PRIO_USER`, and *who*
is interpreted relative to *which* (a process identifier for
`PRIO_PROCESS`, process group identifier for `PRIO_PGRP`, and a
user ID for `PRIO_USER`). A zero value for *who* denotes
(respectively) the calling process, the process group of the calling process,
or the real user ID of the calling process.
*priority* is a value in the range -20 to 19. The default priority is 0;
lower priorities cause more favorable scheduling.

> **Availability:** Unix, not WASI.

> *Added in version 3.3.*
