---
title: "os --- Miscellaneous operating system interfaces (part 7 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 7 of 16)

## Files and Directories

On some Unix platforms, many of these functions support one or more of these
features:

- **specifying a file descriptor:**
Normally the *path* argument provided to functions in the `os` module
must be a string specifying a file path.  However, some functions now
alternatively accept an open file descriptor for their *path* argument.
The function will then operate on the file referred to by the descriptor.
For POSIX systems, Python will call the variant of the function prefixed
with `f` (e.g. call `fchdir` instead of `chdir`).

You can check whether or not *path* can be specified as a file descriptor
for a particular function on your platform using `os.supports_fd`.
If this functionality is unavailable, using it will raise a
`NotImplementedError`.

If the function also supports *dir_fd* or *follow_symlinks* arguments, it's
an error to specify one of those when supplying *path* as a file descriptor.

- **paths relative to directory descriptors:** If *dir_fd* is not `None`, it
should be a file descriptor referring to a directory, and the path to operate
on should be relative; path will then be relative to that directory.  If the
path is absolute, *dir_fd* is ignored.  For POSIX systems, Python will call
the variant of the function with an `at` suffix and possibly prefixed with
`f` (e.g. call `faccessat` instead of `access`).

You can check whether or not *dir_fd* is supported for a particular function
on your platform using `os.supports_dir_fd`.  If it's unavailable,
using it will raise a `NotImplementedError`.

- **not following symlinks:** If *follow_symlinks* is
`False`, and the last element of the path to operate on is a symbolic link,
the function will operate on the symbolic link itself rather than the file
pointed to by the link.  For POSIX systems, Python will call the `l...`
variant of the function.

You can check whether or not *follow_symlinks* is supported for a particular
function on your platform using `os.supports_follow_symlinks`.
If it's unavailable, using it will raise a `NotImplementedError`.

### `access(path, mode, *, dir_fd=None, effective_ids=False, follow_symlinks=True)`

Use the real uid/gid to test for access to *path*.  Note that most operations
will use the effective uid/gid, therefore this routine can be used in a
suid/sgid environment to test if the invoking user has the specified access to
*path*.  *mode* should be `F_OK` to test the existence of *path*, or it
can be the inclusive OR of one or more of `R_OK`, `W_OK`, and
`X_OK` to test permissions.  Return `True` if access is allowed,
`False` if not. See the Unix man page access(2) for more
information.

This function can support specifying :ref:`paths relative to directory
descriptors <dir_fd>` and not following symlinks.

If *effective_ids* is `True`, `access()` will perform its access
checks using the effective uid/gid instead of the real uid/gid.
*effective_ids* may not be supported on your platform; you can check whether
or not it is available using `os.supports_effective_ids`.  If it is
unavailable, using it will raise a `NotImplementedError`.

> **Note:** Using `access()` to check if a user is authorized to e.g. open a file
> before actually doing so using `open()` creates a security hole,
> because the user might exploit the short time interval between checking
> and opening the file to manipulate it. It's preferable to use EAFP
> techniques. For example:
>
>
> ```
> if os.access("myfile", os.R_OK):
>     with open("myfile") as fp:
>         return fp.read()
> return "some default data"
> ```
>
>
> is better written as:
>
>
> ```
> try:
>     fp = open("myfile")
> except PermissionError:
>     return "some default data"
> else:
>     with fp:
>         return fp.read()
> ```
>

> **Note:** I/O operations may fail even when `access()` indicates that they would
> succeed, particularly for operations on network filesystems which may have
> permissions semantics beyond the usual POSIX permission-bit model.

> *Changed in version 3.3.*
> Added the *dir_fd*, *effective_ids*, and *follow_symlinks* parameters.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `F_OK`

```python
R_OK
W_OK
X_OK
```

Values to pass as the *mode* parameter of `access()` to test the
existence, readability, writability and executability of *path*,
respectively.

### `chdir(path)`

Change the current working directory to *path*.

This function can support specifying a file descriptor.  The
descriptor must refer to an opened directory, not an open file.

This function can raise `OSError` and subclasses such as
`FileNotFoundError`, `PermissionError`, and `NotADirectoryError`.

> **See also:** The `contextlib.chdir()` context manager, which changes the current
> working directory on entering and restores the previous one on exit.

> *Changed in version 3.3.*
> Added support for specifying *path* as a file descriptor
> on some platforms.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `chflags(path, flags, *, follow_symlinks=True)`

Set the flags of *path* to the numeric *flags*. *flags* may take a combination
(bitwise OR) of the following values (as defined in the `stat` module):

- `stat.UF_NODUMP`
- `stat.UF_IMMUTABLE`
- `stat.UF_APPEND`
- `stat.UF_OPAQUE`
- `stat.UF_NOUNLINK`
- `stat.UF_COMPRESSED`
- `stat.UF_HIDDEN`
- `stat.SF_ARCHIVED`
- `stat.SF_IMMUTABLE`
- `stat.SF_APPEND`
- `stat.SF_NOUNLINK`
- `stat.SF_SNAPSHOT`

This function can support not following symlinks.

> **Availability:** Unix, not WASI.

> *Changed in version 3.3.*
> Added the *follow_symlinks* parameter.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `chmod(path, mode, *, dir_fd=None, follow_symlinks=True)`

Change the mode of *path* to the numeric *mode*. *mode* may take one of the
following values (as defined in the `stat` module) or bitwise ORed
combinations of them:

- `stat.S_ISUID`
- `stat.S_ISGID`
- `stat.S_ENFMT`
- `stat.S_ISVTX`
- `stat.S_IREAD`
- `stat.S_IWRITE`
- `stat.S_IEXEC`
- `stat.S_IRWXU`
- `stat.S_IRUSR`
- `stat.S_IWUSR`
- `stat.S_IXUSR`
- `stat.S_IRWXG`
- `stat.S_IRGRP`
- `stat.S_IWGRP`
- `stat.S_IXGRP`
- `stat.S_IRWXO`
- `stat.S_IROTH`
- `stat.S_IWOTH`
- `stat.S_IXOTH`

This function can support specifying a file descriptor,
paths relative to directory descriptors and :ref:`not
following symlinks <follow_symlinks>`.

> **Note:** Although Windows supports `chmod()`, you can only set the file's
> read-only flag with it (via the `stat.S_IWRITE` and `stat.S_IREAD`
> constants or a corresponding integer value).  All other bits are ignored.
> The default value of *follow_symlinks* is `False` on Windows.
>
> The function is limited on WASI, see wasm-availability for more
> information.

> *Changed in version 3.3.*
> Added support for specifying *path* as an open file descriptor,
> and the *dir_fd* and *follow_symlinks* arguments.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.13.*
> Added support for a file descriptor and the *follow_symlinks* argument
> on Windows.

### `chown(path, uid, gid, *, dir_fd=None, follow_symlinks=True)`

Change the owner and group id of *path* to the numeric *uid* and *gid*.  To
leave one of the ids unchanged, set it to -1.

This function can support specifying a file descriptor,
paths relative to directory descriptors and :ref:`not
following symlinks <follow_symlinks>`.

See `shutil.chown()` for a higher-level function that accepts names in
addition to numeric ids.

> **Availability:** Unix.
>
> The function is limited on WASI, see wasm-availability for more
> information.

> *Changed in version 3.3.*
> Added support for specifying *path* as an open file descriptor,
> and the *dir_fd* and *follow_symlinks* arguments.

> *Changed in version 3.6.*
> Supports a path-like object.

### `chroot(path)`

Change the root directory of the current process to *path*.

> **Availability:** Unix, not WASI, not Android.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `fchdir(fd)`

Change the current working directory to the directory represented by the file
descriptor *fd*.  The descriptor must refer to an opened directory, not an
open file.  As of Python 3.3, this is equivalent to `os.chdir(fd)`.

> **Availability:** Unix.

### `getcwd()`

Return a string representing the current working directory.

### `getcwdb()`

Return a bytestring representing the current working directory.

> *Changed in version 3.8.*
> The function now uses the UTF-8 encoding on Windows, rather than the ANSI
> code page: see PEP 529 for the rationale. The function is no longer
> deprecated on Windows.

### `lchflags(path, flags)`

Set the flags of *path* to the numeric *flags*, like `chflags()`, but do
not follow symbolic links.  As of Python 3.3, this is equivalent to
`os.chflags(path, flags, follow_symlinks=False)`.

> **Availability:** Unix, not WASI.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `lchmod(path, mode)`

Change the mode of *path* to the numeric *mode*. If path is a symlink, this
affects the symlink rather than the target.  See the docs for `chmod()`
for possible values of *mode*.  As of Python 3.3, this is equivalent to
`os.chmod(path, mode, follow_symlinks=False)`.

`lchmod()` is not part of POSIX, but Unix implementations may have it if
changing the mode of symbolic links is supported.

> **Availability:** Unix, Windows, not Linux, FreeBSD >= 1.3, NetBSD >= 1.3, not OpenBSD

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.13.*
> Added support on Windows.

### `lchown(path, uid, gid)`

Change the owner and group id of *path* to the numeric *uid* and *gid*.  This
function will not follow symbolic links.  As of Python 3.3, this is equivalent
to `os.chown(path, uid, gid, follow_symlinks=False)`.

> **Availability:** Unix.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `link(src, dst, *, src_dir_fd=None, dst_dir_fd=None, follow_symlinks=True)`

Create a hard link pointing to *src* named *dst*.

This function can support specifying *src_dir_fd* and/or *dst_dir_fd* to
supply paths relative to directory descriptors, and :ref:`not
following symlinks <follow_symlinks>`.
The default value of *follow_symlinks* is `False` on Windows.

> **Availability:** Unix, Windows.

> *Changed in version 3.2.*
> Added Windows support.

> *Changed in version 3.3.*
> Added the *src_dir_fd*, *dst_dir_fd*, and *follow_symlinks* parameters.

> *Changed in version 3.6.*
> Accepts a path-like object for *src* and *dst*.

### `listdir(path='.')`

Return a list containing the names of the entries in the directory given by
*path*.  The list is in arbitrary order, and does not include the special
entries `'.'` and `'..'` even if they are present in the directory.
If a file is removed from or added to the directory during the call of
this function, whether a name for that file be included is unspecified.

*path* may be a path-like object.  If *path* is of type `bytes`
(directly or indirectly through the `PathLike` interface),
the filenames returned will also be of type `bytes`;
in all other circumstances, they will be of type `str`.

This function can also support :ref:`specifying a file descriptor
<path_fd>`; the file descriptor must refer to a directory.

> **Note:** To encode `str` filenames to `bytes`, use `fsencode()`.

> **See also:** The `scandir()` function returns directory entries along with
> file attribute information, giving better performance for many
> common use cases.

> *Changed in version 3.2.*
> The *path* parameter became optional.

> *Changed in version 3.3.*
> Added support for specifying *path* as an open file descriptor.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.15.*
> `os.listdir(-1)` now fails with `OSError(errno.EBADF)` rather than
> listing the current directory.

### `listdrives()`

Return a list containing the names of drives on a Windows system.

A drive name typically looks like `'C:\'`. Not every drive name
will be associated with a volume, and some may be inaccessible for
a variety of reasons, including permissions, network connectivity
or missing media. This function does not test for access.

May raise `OSError` if an error occurs collecting the drive
names.

> **Availability:** Windows

> *Added in version 3.12.*

### `listmounts(volume)`

Return a list containing the mount points for a volume on a Windows
system.

*volume* must be represented as a GUID path, like those returned by
`os.listvolumes()`. Volumes may be mounted in multiple locations
or not at all. In the latter case, the list will be empty. Mount
points that are not associated with a volume will not be returned by
this function.

The mount points return by this function will be absolute paths, and
may be longer than the drive name.

Raises `OSError` if the volume is not recognized or if an error
occurs collecting the paths.

> **Availability:** Windows

> *Added in version 3.12.*

### `listvolumes()`

Return a list containing the volumes in the system.

Volumes are typically represented as a GUID path that looks like
`\?\Volume{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}\`. Files can
usually be accessed through a GUID path, permissions allowing.
However, users are generally not familiar with them, and so the
recommended use of this function is to retrieve mount points
using `os.listmounts()`.

May raise `OSError` if an error occurs collecting the volumes.

> **Availability:** Windows

> *Added in version 3.12.*

### `lstat(path, *, dir_fd=None)`

Perform the equivalent of an `lstat` system call on the given path.
Similar to `stat()`, but does not follow symbolic links. Return a
`stat_result` object.

On platforms that do not support symbolic links, this is an alias for
`stat()`.

As of Python 3.3, this is equivalent to ``os.stat(path, dir_fd=dir_fd,
follow_symlinks=False)``.

This function can also support :ref:`paths relative to directory descriptors
<dir_fd>`.

> **See also:** The `.stat()` function.

> *Changed in version 3.2.*
> Added support for Windows 6.0 (Vista) symbolic links.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.8.*
> On Windows, now opens reparse points that represent another path
> (name surrogates), including symbolic links and directory junctions.
> Other kinds of reparse points are resolved by the operating system as
> for `stat()`.
