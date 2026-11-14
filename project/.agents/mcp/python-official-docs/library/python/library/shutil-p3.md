---
title: "shutil --- High-level file operations (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/shutil.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# shutil --- High-level file operations (part 3 of 4)

### `move(src, dst, copy_function=copy2)`

Recursively move a file or directory (*src*) to another location and return
the destination.

If *dst* is an existing directory or a symlink to a directory, then *src*
is moved inside that directory. The destination path in that directory must
not already exist.

If *dst* already exists but is not a directory, it may be overwritten
depending on `os.rename()` semantics.

`os.rename()` is preferably used internally when *src* and the destination are on
the same filesystem. In case `os.rename()` fails due to `OSError`
(e.g. the user has write permission to the destination file but not to its parent
directory), this method falls back to using *copy_function*, in which case
*src* is copied to the destination using *copy_function* and then removed.

In case of symlinks, a new symlink pointing to the target of *src* will be
created in or as the destination, and *src* will be removed.

If *copy_function* is given, it must be a callable that takes two arguments,
*src* and the destination, and will be used to copy *src* to the destination
if `os.rename()` cannot be used.  If the source is a directory,
`copytree()` is called, passing it the *copy_function*. The
default *copy_function* is `copy2()`.  Using `copy()` as the
*copy_function* allows the move to succeed when it is not possible to also
copy the metadata, at the expense of not copying any of the metadata.

> *Changed in version 3.3.*
> Added explicit symlink handling for foreign filesystems, thus adapting
> it to the behavior of GNU's `mv`.
> Now returns *dst*.

> *Changed in version 3.5.*
> Added the *copy_function* keyword argument.

> *Changed in version 3.8.*
> Platform-specific fast-copy syscalls may be used internally in order to
> copy the file more efficiently. See
> shutil-platform-dependent-efficient-copy-operations section.

> *Changed in version 3.9.*
> Accepts a path-like object for both *src* and *dst*.

### `disk_usage(path)`

Return disk usage statistics about the given path as a named tuple
with the attributes *total*, *used* and *free*, which are the amount of
total, used and free space, in bytes. *path* may be a file or a
directory.

> **Note:** On Unix filesystems, *path* must point to a path within a **mounted**
> filesystem partition. On those platforms, CPython doesn't attempt to
> retrieve disk usage information from non-mounted filesystems.

> *Added in version 3.3.*

> *Changed in version 3.8.*
> On Windows, *path* can now be a file or directory.

> **Availability:** Unix, Windows.

### `chown(path, user=None, group=None, *, dir_fd=None, \`

```python
follow_symlinks=True)
```

Change owner *user* and/or *group* of the given *path*.

*user* can be a system user name or a uid; the same applies to *group*. At
least one argument is required.

See also `os.chown()`, the underlying function.

> **Availability:** Unix.

> *Added in version 3.3.*

> *Changed in version 3.13.*
> Added *dir_fd* and *follow_symlinks* parameters.

### `which(cmd, mode=os.F_OK | os.X_OK, path=None)`

Return the path to an executable which would be run if the given *cmd* was
called.  If no *cmd* would be called, return `None`.

*mode* is a permission mask passed to `os.access()`, by default
determining if the file exists and is executable.

*path* is a "`PATH` string" specifying the directories to look in,
delimited by `os.pathsep`. When no *path* is specified, the
`PATH` environment variable is read from `os.environ`,
falling back to `os.defpath` if it is not set.

If *cmd* contains a directory component, `which()` only checks the
specified path directly and does not search the directories listed in
*path* or in the system's `PATH` environment variable.

On Windows, the current directory is prepended to the *path* if *mode* does
not include `os.X_OK`. When the *mode* does include `os.X_OK`, the
Windows API `NeedCurrentDirectoryForExePathW` will be consulted to
determine if the current directory should be prepended to *path*. To avoid
consulting the current working directory for executables: set the environment
variable `NoDefaultCurrentDirectoryInExePath`.

Also on Windows, the `PATHEXT` environment variable is used to
resolve commands that may not already include an extension. For example,
if you call `shutil.which("python")`, `which()` will search `PATHEXT`
to know that it should look for `python.exe` within the *path*
directories. For example, on Windows:

```
>>> shutil.which("python")
'C:\\Python33\\python.EXE'
```

This is also applied when *cmd* is a path that contains a directory
component:

```
>>> shutil.which("C:\\Python33\\python")
'C:\\Python33\\python.EXE'
```

> *Added in version 3.3.*

> *Changed in version 3.8.*
> The `bytes` type is now accepted.  If *cmd* type is
> `bytes`, the result type is also `bytes`.

> *Changed in version 3.12.*
> On Windows, the current directory is no longer prepended to the search
> path if *mode* includes `os.X_OK` and WinAPI
> `NeedCurrentDirectoryForExePathW(cmd)` is false, else the current
> directory is prepended even if it is already in the search path;
> `PATHEXT` is used now even when *cmd* includes a directory component
> or ends with an extension that is in `PATHEXT`; and filenames that
> have no extension can now be found.

### exception `Error`

Subclass of `OSError` collecting exceptions raised during a multi-file
operation. For `copytree()`, the exception argument is a list of 3-tuples
(*srcname*, *dstname*, *exception*).

### Platform-dependent efficient copy operations

Starting from Python 3.8, all functions involving a file copy
(`copyfile()`, `copy()`, `copy2()`,
`copytree()`, and `move()`) may use
platform-specific "fast-copy" syscalls in order to copy the file more
efficiently (see 33671).
"fast-copy" means that the copying operation occurs within the kernel, avoiding
the use of userspace buffers in Python as in "`outfd.write(infd.read())`".

On macOS fcopyfile is used to copy the file content (not metadata).

On Linux `os.copy_file_range()` or `os.sendfile()` is used.

On Solaris `os.sendfile()` is used.

On Windows `shutil.copyfile()` uses a bigger default buffer size (1 MiB
instead of 64 KiB) and a `memoryview()`-based variant of
`shutil.copyfileobj()` is used, which still reads and writes in a loop.
`shutil.copy2()` uses the native `CopyFile2` call on Windows, which is the most
efficient method, supports copy-on-write, and preserves metadata.

If the fast-copy operation fails and no data was written in the destination
file then shutil will silently fall back to less efficient
`copyfileobj()` function internally.

> *Changed in version 3.8.*

> *Changed in version 3.14.*
> Solaris now uses `os.sendfile()`.

> *Changed in version 3.14.*
> Copy-on-write or server-side copy may be used internally via
> `os.copy_file_range()` on supported Linux filesystems.

### copytree example

An example that uses the `ignore_patterns()` helper:

```
from shutil import copytree, ignore_patterns

copytree(source, destination, ignore=ignore_patterns('*.pyc', 'tmp*'))
```

This will copy everything except `.pyc` files and files or directories whose
name starts with `tmp`.

Another example that uses the *ignore* argument to add a logging call:

```
from shutil import copytree
import logging

def _logpath(path, names):
    logging.info('Working in %s', path)
    return []   # nothing will be ignored

copytree(source, destination, ignore=_logpath)
```

### rmtree example

This example shows how to remove a directory tree on Windows where some
of the files have their read-only bit set. It uses the onexc callback
to clear the readonly bit and reattempt the remove. Any subsequent failure
will propagate.:

```
import os, stat
import shutil

def remove_readonly(func, path, _):
    "Clear the readonly bit and reattempt the removal"
    os.chmod(path, stat.S_IWRITE)
    func(path)

shutil.rmtree(directory, onexc=remove_readonly)
```
