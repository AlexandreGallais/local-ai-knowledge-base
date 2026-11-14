---
title: "os --- Miscellaneous operating system interfaces (part 9 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 9 of 16)

### class `DirEntry`

Object yielded by `scandir()` to expose the file path and other file
attributes of a directory entry.

`scandir()` will provide as much of this information as possible without
making additional system calls. When a `stat()` or `lstat()` system call
is made, the `os.DirEntry` object will cache the result.

`os.DirEntry` instances are not intended to be stored in long-lived data
structures; if you know the file metadata has changed or if a long time has
elapsed since calling `scandir()`, call `os.stat(entry.path)` to fetch
up-to-date information.

Because the `os.DirEntry` methods can make operating system calls, they may
also raise `OSError`. If you need very fine-grained
control over errors, you can catch `OSError` when calling one of the
`os.DirEntry` methods and handle as appropriate.

To be directly usable as a path-like object, `os.DirEntry`
implements the `PathLike` interface.

`DirEntry` objects are generic over the type of the
path (`str` or `bytes`).

Attributes and methods on a `os.DirEntry` instance are as follows:

### `name`

The entry's base filename, relative to the `scandir()` *path*
argument.

The `name` attribute will be `bytes` if the `scandir()`
*path* argument is of type `bytes` and `str` otherwise.  Use
`fsdecode()` to decode byte filenames.

### `path`

The entry's path name: equivalent to ``os.path.join(scandir_path,
entry.name)`` where *scandir_path* is the original `scandir()`
*path* argument.  Apart from the filename, the path preserves the
original `scandir()` argument.  If the `scandir()` *path*
argument was relative, the `path` attribute is also relative.
Changing the current working directory after creating the
`scandir()` iterator may cause later uses of `path` to resolve
differently.  On some platforms, the constructed path may not be valid
if the original `scandir()` argument was usable for enumeration but
not for joining with the entry name.  If the `scandir()` *path*
argument was a file descriptor, the `path`
attribute is the same as the `name` attribute.

The `path` attribute will be `bytes` if the `scandir()`
*path* argument is of type `bytes` and `str` otherwise.  Use
`fsdecode()` to decode byte filenames.

### `inode()`

Return the inode number of the entry.

The result is cached on the `os.DirEntry` object. Use
`os.stat(entry.path, follow_symlinks=False).st_ino` to fetch up-to-date
information.

On the first, uncached call, a system call is required on Windows but
not on Unix.

### `is_dir(*, follow_symlinks=True)`

Return `True` if this entry is a directory or a symbolic link pointing
to a directory; return `False` if the entry is or points to any other
kind of file, or if it doesn't exist anymore.

If *follow_symlinks* is `False`, return `True` only if this entry
is a directory (without following symlinks); return `False` if the
entry is any other kind of file or if it doesn't exist anymore.

The result is cached on the `os.DirEntry` object, with a separate cache
for *follow_symlinks* `True` and `False`. Call `os.stat()` along
with `stat.S_ISDIR()` to fetch up-to-date information.

On the first, uncached call, no system call is required in most cases.
Specifically, for non-symlinks, neither Windows or Unix require a system
call, except on certain Unix file systems, such as network file systems,
that return `dirent.d_type == DT_UNKNOWN`. If the entry is a symlink,
a system call will be required to follow the symlink unless
*follow_symlinks* is `False`.

This method can raise `OSError`, such as `PermissionError`,
but `FileNotFoundError` is caught and not raised.

### `is_file(*, follow_symlinks=True)`

Return `True` if this entry is a file or a symbolic link pointing to a
file; return `False` if the entry is or points to a directory or other
non-file entry, or if it doesn't exist anymore.

If *follow_symlinks* is `False`, return `True` only if this entry
is a file (without following symlinks); return `False` if the entry is
a directory or other non-file entry, or if it doesn't exist anymore.

The result is cached on the `os.DirEntry` object. Caching, system calls
made, and exceptions raised are as per `is_dir()`.

### `is_symlink()`

Return `True` if this entry is a symbolic link (even if broken);
return `False` if the entry points to a directory or any kind of file,
or if it doesn't exist anymore.

The result is cached on the `os.DirEntry` object. Call
`os.path.islink()` to fetch up-to-date information.

On the first, uncached call, no system call is required in most cases.
Specifically, neither Windows or Unix require a system call, except on
certain Unix file systems, such as network file systems, that return
`dirent.d_type == DT_UNKNOWN`.

This method can raise `OSError`, such as `PermissionError`,
but `FileNotFoundError` is caught and not raised.

### `is_junction()`

Return `True` if this entry is a junction (even if broken);
return `False` if the entry points to a regular directory, any kind
of file, a symlink, or if it doesn't exist anymore.

The result is cached on the `os.DirEntry` object. Call
`os.path.isjunction()` to fetch up-to-date information.

> *Added in version 3.12.*

### `stat(*, follow_symlinks=True)`

Return a `stat_result` object for this entry. This method
follows symbolic links by default; to stat a symbolic link add the
`follow_symlinks=False` argument.

On Unix, this method always requires a system call. On Windows, it
only requires a system call if *follow_symlinks* is `True` and the
entry is a reparse point (for example, a symbolic link or directory
junction).

On Windows, the `st_ino`, `st_dev` and `st_nlink` attributes of the
`stat_result` are always set to zero. Call `os.stat()` to
get these attributes.

The result is cached on the `os.DirEntry` object, with a separate cache
for *follow_symlinks* `True` and `False`. Call `os.stat()` to
fetch up-to-date information.

Note that there is a nice correspondence between several attributes
and methods of `os.DirEntry` and of `pathlib.Path`.  In
particular, the `name` attribute has the same
meaning, as do the `is_dir()`, `is_file()`, `is_symlink()`,
`is_junction()`, and `stat()` methods.

> *Added in version 3.5.*

> *Changed in version 3.6.*
> Added support for the `PathLike` interface.  Added support
> for `bytes` paths on Windows.

> *Changed in version 3.12.*
> The `st_ctime` attribute of a stat result is deprecated on Windows.
> The file creation time is properly available as `st_birthtime`, and
> in the future `st_ctime` may be changed to return zero or the
> metadata change time, if available.

### `stat(path, *, dir_fd=None, follow_symlinks=True)`

Get the status of a file or a file descriptor. Perform the equivalent of a
`stat` system call on the given path. *path* may be specified as
either a string or bytes -- directly or indirectly through the `PathLike`
interface -- or as an open file descriptor. Return a `stat_result`
object.

This function normally follows symlinks; to stat a symlink add the argument
`follow_symlinks=False`, or use `lstat()`.

This function can support specifying a file descriptor and
not following symlinks.

On Windows, passing `follow_symlinks=False` will disable following all
name-surrogate reparse points, which includes symlinks and directory
junctions. Other types of reparse points that do not resemble links or that
the operating system is unable to follow will be opened directly. When
following a chain of multiple links, this may result in the original link
being returned instead of the non-link that prevented full traversal. To
obtain stat results for the final path in this case, use the
`os.path.realpath()` function to resolve the path name as far as
possible and call `lstat()` on the result. This does not apply to
dangling symlinks or junction points, which will raise the usual exceptions.

Example:

```
>>> import os
>>> statinfo = os.stat('somefile.txt')
>>> statinfo
os.stat_result(st_mode=33188, st_ino=7876932, st_dev=234881026,
st_nlink=1, st_uid=501, st_gid=501, st_size=264, st_atime=1297230295,
st_mtime=1297230027, st_ctime=1297230027)
>>> statinfo.st_size
264
```

> **See also:** `fstat()` and `lstat()` functions.

> *Changed in version 3.3.*
> Added the *dir_fd* and *follow_symlinks* parameters,
> specifying a file descriptor instead of a path.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.8.*
> On Windows, all reparse points that can be resolved by the operating
> system are now followed, and passing `follow_symlinks=False`
> disables following all name surrogate reparse points. If the operating
> system reaches a reparse point that it is not able to follow, *stat* now
> returns the information for the original path as if
> `follow_symlinks=False` had been specified instead of raising an error.

### class `stat_result`

Object whose attributes correspond roughly to the members of the
`stat` structure. It is used for the result of `os.stat()`,
`os.fstat()` and `os.lstat()`.

Attributes:

### `st_mode`

File mode: file type and file mode bits (permissions).

### `st_ino`

Platform dependent, but if non-zero, uniquely identifies the
file for a given value of `st_dev`. Typically:

- the inode number on Unix,
- the `file index
<https://msdn.microsoft.com/en-us/library/aa363788>`_ on
Windows

### `st_dev`

Identifier of the device on which this file resides.

### `st_nlink`

Number of hard links.

### `st_uid`

User identifier of the file owner.

### `st_gid`

Group identifier of the file owner.

### `st_size`

Size of the file in bytes, if it is a regular file or a symbolic link.
The size of a symbolic link is the length of the pathname it contains,
without a terminating null byte.

Timestamps:

### `st_atime`

Time of most recent access expressed in seconds.

### `st_mtime`

Time of most recent content modification expressed in seconds.

### `st_ctime`

Time of most recent metadata change expressed in seconds.

> *Changed in version 3.12.*
> `st_ctime` is deprecated on Windows. Use `st_birthtime` for
> the file creation time. In the future, `st_ctime` will contain
> the time of the most recent metadata change, as for other platforms.

### `st_atime_ns`

Time of most recent access expressed in nanoseconds as an integer.

> *Added in version 3.3.*

### `st_mtime_ns`

Time of most recent content modification expressed in nanoseconds as an
integer.

> *Added in version 3.3.*

### `st_ctime_ns`

Time of most recent metadata change expressed in nanoseconds as an
integer.

> *Added in version 3.3.*

> *Changed in version 3.12.*
> `st_ctime_ns` is deprecated on Windows. Use `st_birthtime_ns`
> for the file creation time. In the future, `st_ctime` will contain
> the time of the most recent metadata change, as for other platforms.

### `st_birthtime`

Time of file creation expressed in seconds. This attribute is not
always available, and may raise `AttributeError`.

> *Changed in version 3.12.*
> `st_birthtime` is now available on Windows.

### `st_birthtime_ns`

Time of file creation expressed in nanoseconds as an integer.
This attribute is not always available, and may raise
`AttributeError`.

> *Added in version 3.12.*

> **Note:** The exact meaning and resolution of the `st_atime`,
> `st_mtime`, `st_ctime` and `st_birthtime` attributes
> depend on the operating system and the file system. For example, on
> Windows systems using the FAT32 file systems, `st_mtime` has
> 2-second resolution, and `st_atime` has only 1-day resolution.
> See your operating system documentation for details.
>
> Similarly, although `st_atime_ns`, `st_mtime_ns`,
> `st_ctime_ns` and `st_birthtime_ns` are always expressed in
> nanoseconds, many systems do not provide nanosecond precision.  On
> systems that do provide nanosecond precision, the floating-point object
> used to store `st_atime`, `st_mtime`, `st_ctime` and
> `st_birthtime` cannot preserve all of it, and as such will be
> slightly inexact. If you need the exact timestamps you should always use
> `st_atime_ns`, `st_mtime_ns`, `st_ctime_ns` and
> `st_birthtime_ns`.

On some Unix systems (such as Linux), the following attributes may also be
available:

### `st_blocks`

Number of 512-byte blocks allocated for file.
This may be smaller than `st_size`/512 when the file has holes.

### `st_blksize`

"Preferred" blocksize for efficient file system I/O. Writing to a file in
smaller chunks may cause an inefficient read-modify-rewrite.

### `st_rdev`

Type of device if an inode device.

### `st_flags`

User defined flags for file.

On other Unix systems (such as FreeBSD), the following attributes may be
available (but may be only filled out if root tries to use them):

### `st_gen`

File generation number.

On Solaris and derivatives, the following attributes may also be
available:

### `st_fstype`

String that uniquely identifies the type of the filesystem that
contains the file.

On macOS systems, the following attributes may also be available:

### `st_rsize`

Real size of the file.

### `st_creator`

Creator of the file.

### `st_type`

File type.

On Windows systems, the following attributes are also available:

### `st_file_attributes`

Windows file attributes: `dwFileAttributes` member of the
`BY_HANDLE_FILE_INFORMATION` structure returned by
`GetFileInformationByHandle`.
See the `FILE_ATTRIBUTE_*`
constants in the `stat` module.

> *Added in version 3.5.*
