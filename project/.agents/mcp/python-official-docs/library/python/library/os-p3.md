---
title: "os --- Miscellaneous operating system interfaces (part 3 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 3 of 16)

### `setregid(rgid, egid, /)`

Set the current process's real and effective group ids.

> **Availability:** Unix, not WASI, not Android.

### `setresgid(rgid, egid, sgid, /)`

Set the current process's real, effective, and saved group ids.

> **Availability:** Unix, not WASI, not Android, not macOS, not iOS.

> *Added in version 3.2.*

### `setresuid(ruid, euid, suid, /)`

Set the current process's real, effective, and saved user ids.

> **Availability:** Unix, not WASI, not Android, not macOS, not iOS.

> *Added in version 3.2.*

### `setreuid(ruid, euid, /)`

Set the current process's real and effective user ids.

> **Availability:** Unix, not WASI, not Android.

### `getsid(pid, /)`

Call the system call `getsid`.  See the Unix manual for the semantics.

> **Availability:** Unix, not WASI.

### `setsid()`

Call the system call `setsid`.  See the Unix manual for the semantics.

> **Availability:** Unix, not WASI.

### `setuid(uid, /)`

Set the current process's user id.

> **Availability:** Unix, not WASI, not Android.

### `strerror(code, /)`

Return the error message corresponding to the error code in *code*.
On platforms where `strerror` returns `NULL` when given an unknown
error number, `ValueError` is raised.

### `supports_bytes_environ`

`True` if the native OS type of the environment is bytes (eg. `False` on
Windows).

> *Added in version 3.2.*

### `umask(mask, /)`

Set the current numeric umask and return the previous umask.

The function is a stub on WASI, see wasm-availability for more
information.

### `uname()`

Returns information identifying the current operating system.
The return value is a `uname_result`.

On macOS, iOS and Android, this returns the *kernel* name and release (i.e.,
`'Darwin'` on macOS and iOS; `'Linux'` on Android). `platform.uname()`
can be used to get the user-facing operating system name and release on iOS and
Android.

> **See also:** `sys.platform` which has finer granularity.
>
> The `platform` module provides detailed checks for the
> system's identity.

> **Availability:** Unix.

> *Changed in version 3.3.*
> Return type changed from a tuple to a tuple-like object
> with named attributes.

### class `uname_result`

Name and information about the system returned by `os.uname()`.
These attributes correspond to the members described in uname(2).

For backwards compatibility, this object is also iterable, behaving
like a five-tuple containing `sysname`,
`nodename`, `release`,
`version`, and `machine`
in that order.

### `sysname`

Operating system name.

### `nodename`

Name of machine on network. Some systems truncate
`nodename` to 8 characters or to the leading
component; a better way to get the hostname is `socket.gethostname()`
or even `socket.gethostbyaddr(socket.gethostname())`.

### `release`

Operating system release.

### `version`

Operating system version.

### `machine`

Hardware identifier.

### `unsetenv(key, /)`

Unset (delete) the environment variable named *key*. Such changes to the
environment affect subprocesses started with `os.system()`, `popen()` or
`fork()` and `execv()`.

Deletion of items in `os.environ` is automatically translated into a
corresponding call to `unsetenv()`; however, calls to `unsetenv()`
don't update `os.environ`, so it is actually preferable to delete items of
`os.environ`.

See also the `os.reload_environ()` function.

> *Changed in version 3.9.*
> The function is now always available and is also available on Windows.

### `unshare(flags)`

Disassociate parts of the process execution context, and move them into a
newly created namespace.
See the unshare(2)
man page for more details.
The *flags* argument is a bit mask, combining zero or more of the
CLONE_* constants,
that specifies which parts of the execution context should be
unshared from their existing associations and moved to a new namespace.
If the *flags* argument is `0`, no changes are made to the calling process's
execution context.

> **Availability:** Linux >= 2.6.16.

> *Added in version 3.12.*

> **See also:** The `setns()` function.

Flags to the `unshare()` function, if the implementation supports them.
See unshare(2) in the Linux manual
for their exact effect and availability.

### `CLONE_FILES`

```python
CLONE_FS
CLONE_NEWCGROUP
CLONE_NEWIPC
CLONE_NEWNET
CLONE_NEWNS
CLONE_NEWPID
CLONE_NEWTIME
CLONE_NEWUSER
CLONE_NEWUTS
CLONE_SIGHAND
CLONE_SYSVSEM
CLONE_THREAD
CLONE_VM
```

## File Object Creation

These functions create new file objects.  (See also
`open()` for opening file descriptors.)

### `fdopen(fd, *args, **kwargs)`

Return an open file object connected to the file descriptor *fd*.  This is an
alias of the `open()` built-in function and accepts the same arguments.
The only difference is that the first argument of `fdopen()` must always
be an integer.
