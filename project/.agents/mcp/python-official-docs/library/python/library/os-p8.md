---
title: "os --- Miscellaneous operating system interfaces (part 8 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 8 of 16)

### `mkdir(path, mode=0o777, *, dir_fd=None)`

Create a directory named *path* with numeric mode *mode*.

If the directory already exists, `FileExistsError` is raised. If a parent
directory in the path does not exist, `FileNotFoundError` is raised.

On some systems, *mode* is ignored.  Where it is used, the current umask
value is first masked out.  If bits other than the last 9 (i.e. the last 3
digits of the octal representation of the *mode*) are set, their meaning is
platform-dependent.  On some platforms, they are ignored and you should call
`chmod()` explicitly to set them.

On Windows, a *mode* of `0o700` is specifically handled to apply access
control to the new directory such that only the current user and
administrators have access. Other values of *mode* are ignored.

This function can also support :ref:`paths relative to directory descriptors
<dir_fd>`.

It is also possible to create temporary directories; see the
`tempfile` module's `tempfile.mkdtemp()` function.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.13.*
> Windows now handles a *mode* of `0o700`.

### `makedirs(name, mode=0o777, exist_ok=False, *, \`

```python
parent_mode=None)
```

Recursive directory creation function.  Like `mkdir()`, but makes all
intermediate-level directories needed to contain the leaf directory.

The *mode* parameter is passed to `mkdir()` for creating the leaf
directory; see the mkdir() description for how it
is interpreted.  To set the file permission bits of any newly created parent
directories you can set the umask before invoking `makedirs()`.  The
file permission bits of existing parent directories are not changed.

If *exist_ok* is `False` (the default), a `FileExistsError` is
raised if the target directory already exists.

If *parent_mode* is not `None`, it is used as the mode for any
newly-created, intermediate-level directories.  Like *mode*, it is
combined with the process's umask value; see :ref:`the mkdir()
description <mkdir_modebits>`.  Otherwise, intermediate directories are
created with the default mode, which is also subject to the umask.

> **Note:** `makedirs()` will become confused if the path elements to create
> include `pardir` (eg. ".." on UNIX systems).

This function handles UNC paths correctly.

> *Changed in version 3.2.*
> Added the *exist_ok* parameter.

> *Changed in version 3.4.1.*
> Before Python 3.4.1, if *exist_ok* was `True` and the directory existed,
> `makedirs()` would still raise an error if *mode* did not match the
> mode of the existing directory. Since this behavior was impossible to
> implement safely, it was removed in Python 3.4.1. See 21082.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.7.*
> The *mode* argument no longer affects the file permission bits of
> newly created intermediate-level directories.

> *Added in version 3.15.*
> The *parent_mode* parameter. To match the behavior from Python 3.6 and
> earlier (where *mode* was applied to all created directories), pass
> `parent_mode=mode`.

### `mkfifo(path, mode=0o666, *, dir_fd=None)`

Create a FIFO (a named pipe) named *path* with numeric mode *mode*.
The current umask value is first masked out from the mode.

This function can also support :ref:`paths relative to directory descriptors
<dir_fd>`.

FIFOs are pipes that can be accessed like regular files.  FIFOs exist until they
are deleted (for example with `os.unlink()`). Generally, FIFOs are used as
rendezvous between "client" and "server" type processes: the server opens the
FIFO for reading, and the client opens it for writing.  Note that `mkfifo()`
doesn't open the FIFO --- it just creates the rendezvous point.

> **Availability:** Unix, not WASI.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `mknod(path, mode=0o600, device=0, *, dir_fd=None)`

Create a filesystem node (file, device special file or named pipe) named
*path*. *mode* specifies both the permissions to use and the type of node
to be created, being combined (bitwise OR) with one of `stat.S_IFREG`,
`stat.S_IFCHR`, `stat.S_IFBLK`, and `stat.S_IFIFO`.
For `stat.S_IFCHR` and `stat.S_IFBLK`, *device* defines the
newly created device special file (probably using
`os.makedev()`), otherwise it is ignored.

This function can also support :ref:`paths relative to directory descriptors
<dir_fd>`.

> **Availability:** Unix, not WASI.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `major(device, /)`

Extract the device major number from a raw device number (usually the
`st_dev` or `st_rdev` field from `stat`).

### `minor(device, /)`

Extract the device minor number from a raw device number (usually the
`st_dev` or `st_rdev` field from `stat`).

### `makedev(major, minor, /)`

Compose a raw device number from the major and minor device numbers.

### `NODEV`

Non-existent device.

> *Added in version 3.15.*

### `pathconf(path, name)`

Return system configuration information relevant to a named file. *name*
specifies the configuration value to retrieve; it may be a string which is the
name of a defined system value; these names are specified in a number of
standards (POSIX.1, Unix 95, Unix 98, and others).  Some platforms define
additional names as well.  The names known to the host operating system are
given in the `pathconf_names` dictionary.  For configuration variables not
included in that mapping, passing an integer for *name* is also accepted.

If *name* is a string and is not known, `ValueError` is raised.  If a
specific value for *name* is not supported by the host system, even if it is
included in `pathconf_names`, an `OSError` is raised with
`errno.EINVAL` for the error number.

This function can support :ref:`specifying a file descriptor
<path_fd>`.

> **Availability:** Unix.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `pathconf_names`

Dictionary mapping names accepted by `pathconf()` and `fpathconf()` to
the integer values defined for those names by the host operating system.  This
can be used to determine the set of names known to the system.

> **Availability:** Unix.

### `readlink(path, *, dir_fd=None)`

Return a string representing the path to which the symbolic link points.  The
result may be either an absolute or relative pathname; if it is relative, it
may be converted to an absolute pathname using
`os.path.join(os.path.dirname(path), result)`.

If the *path* is a string object (directly or indirectly through a
`PathLike` interface), the result will also be a string object,
and the call may raise a UnicodeDecodeError. If the *path* is a bytes
object (direct or indirectly), the result will be a bytes object.

This function can also support :ref:`paths relative to directory descriptors
<dir_fd>`.

When trying to resolve a path that may contain links, use
`realpath()` to properly handle recursion and platform
differences.

> **Availability:** Unix, Windows.

> *Changed in version 3.2.*
> Added support for Windows 6.0 (Vista) symbolic links.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter.

> *Changed in version 3.6.*
> Accepts a path-like object on Unix.

> *Changed in version 3.8.*
> Accepts a path-like object and a bytes object on Windows.
> Added support for directory junctions, and changed to return the
> substitution path (which typically includes `\?\` prefix) rather
> than the optional "print name" field that was previously returned.

### `remove(path, *, dir_fd=None)`

Remove (delete) the file *path*.  If *path* is a directory, an
`OSError` is raised.  Use `rmdir()` to remove directories.
If the file does not exist, a `FileNotFoundError` is raised.

This function can support :ref:`paths relative to directory descriptors
<dir_fd>`.

On Windows, attempting to remove a file that is in use causes an exception to
be raised; on Unix, the directory entry is removed but the storage allocated
to the file is not made available until the original file is no longer in use.

This function is semantically identical to `unlink()`.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `removedirs(name)`

Remove directories recursively.  Works like `rmdir()` except that, if the
leaf directory is successfully removed, `removedirs()`  tries to
successively remove every parent directory mentioned in  *path* until an error
is raised (which is ignored, because it generally means that a parent directory
is not empty). For example, `os.removedirs('foo/bar/baz')` will first remove
the directory `'foo/bar/baz'`, and then remove `'foo/bar'` and `'foo'` if
they are empty. Raises `OSError` if the leaf directory could not be
successfully removed.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `rename(src, dst, *, src_dir_fd=None, dst_dir_fd=None)`

Rename the file or directory *src* to *dst*. If *dst* exists, the operation
will fail with an `OSError` subclass in a number of cases:

On Windows, if *dst* exists a `FileExistsError` is always raised.
The operation may fail if *src* and *dst* are on different filesystems. Use
`shutil.move()` to support moves to a different filesystem.

On Unix, if *src* is a file and *dst* is a directory or vice-versa, an
`IsADirectoryError` or a `NotADirectoryError` will be raised
respectively.  If both are directories and *dst* is empty, *dst* will be
silently replaced.  If *dst* is a non-empty directory, an `OSError`
is raised. If both are files, *dst* will be replaced silently if the user
has permission.  The operation may fail on some Unix flavors if *src* and
*dst* are on different filesystems.  If successful, the renaming will be an
atomic operation (this is a POSIX requirement).

This function can support specifying *src_dir_fd* and/or *dst_dir_fd* to
supply paths relative to directory descriptors.

If you want cross-platform overwriting of the destination, use `replace()`.

> *Changed in version 3.3.*
> Added the *src_dir_fd* and *dst_dir_fd* parameters.

> *Changed in version 3.6.*
> Accepts a path-like object for *src* and *dst*.

### `renames(old, new)`

Recursive directory or file renaming function. Works like `rename()`, except
creation of any intermediate directories needed to make the new pathname good is
attempted first. After the rename, directories corresponding to rightmost path
segments of the old name will be pruned away using `removedirs()`.

> **Note:** This function can fail with the new directory structure made if you lack
> permissions needed to remove the leaf directory or file.

> *Changed in version 3.6.*
> Accepts a path-like object for *old* and *new*.

### `replace(src, dst, *, src_dir_fd=None, dst_dir_fd=None)`

Rename the file or directory *src* to *dst*.  If *dst* is a non-empty directory,
`OSError` will be raised.  If *dst* exists and is a file, it will
be replaced silently if the user has permission.  The operation may fail
if *src* and *dst* are on different filesystems.  If successful,
the renaming will be an atomic operation (this is a POSIX requirement).

This function can support specifying *src_dir_fd* and/or *dst_dir_fd* to
supply paths relative to directory descriptors.

> *Added in version 3.3.*

> *Changed in version 3.6.*
> Accepts a path-like object for *src* and *dst*.

### `rmdir(path, *, dir_fd=None)`

Remove (delete) the directory *path*.  If the directory does not exist or is
not empty, a `FileNotFoundError` or an `OSError` is raised
respectively.  In order to remove whole directory trees,
`shutil.rmtree()` can be used.

This function can support :ref:`paths relative to directory descriptors
<dir_fd>`.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `scandir(path='.')`

Return an iterator of `os.DirEntry` objects corresponding to the
entries in the directory given by *path*. The entries are yielded in
arbitrary order, and the special entries `'.'` and `'..'` are not
included.  If a file is removed from or added to the directory after
creating the iterator, whether an entry for that file be included is
unspecified.

Using `scandir()` instead of `listdir()` can significantly
increase the performance of code that also needs file type or file
attribute information, because `os.DirEntry` objects expose this
information if the operating system provides it when scanning a directory.
All `os.DirEntry` methods may perform a system call, but
`is_dir()` and `is_file()` usually only
require a system call for symbolic links; `os.DirEntry.stat()`
always requires a system call on Unix but only requires one for
symbolic links on Windows.

*path* may be a path-like object.  If *path* is of type `bytes`
(directly or indirectly through the `PathLike` interface),
the type of the `name` and `path`
attributes of each `os.DirEntry` will be `bytes`; in all other
circumstances, they will be of type `str`.

This function can also support :ref:`specifying a file descriptor
<path_fd>`; the file descriptor must refer to a directory.

Sharing a `scandir()` iterator between threads will not corrupt the
iterator, but it is subject to race conditions:
which entries each thread receives is unspecified, and closing the iterator
while another thread is iterating ends that iteration early.

The `scandir()` iterator supports the context manager protocol
and has the following method:

### `scandir.close()`

Close the iterator and free acquired resources.

This is called automatically when the iterator is exhausted or garbage
collected, or when an error happens during iterating.  However it
is advisable to call it explicitly or use the `with`
statement.

> *Added in version 3.6.*

The following example shows a simple use of `scandir()` to display all
the files (excluding directories) in the given *path* that don't start with
`'.'`. The `entry.is_file()` call will generally not make an additional
system call:

```
with os.scandir(path) as it:
    for entry in it:
        if not entry.name.startswith('.') and entry.is_file():
            print(entry.name)
```

> **Note:** On Unix-based systems, `scandir()` uses the system's
> opendir()
> and
> readdir()
> functions. On Windows, it uses the Win32
> FindFirstFileW
> and
> FindNextFileW
> functions.

> *Added in version 3.5.*

> *Changed in version 3.6.*
> Added support for the context manager protocol and the
> `close()` method.  If a `scandir()` iterator is neither
> exhausted nor explicitly closed a `ResourceWarning` will be emitted
> in its destructor.
> The function accepts a path-like object.

> *Changed in version 3.7.*
> Added support for file descriptors on Unix.

> *Changed in version 3.15.*
> `os.scandir(-1)` now fails with `OSError(errno.EBADF)` rather than
> listing the current directory.
