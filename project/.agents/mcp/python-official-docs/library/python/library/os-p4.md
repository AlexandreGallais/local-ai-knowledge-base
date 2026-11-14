---
title: "os --- Miscellaneous operating system interfaces (part 4 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 4 of 16)

## File Descriptor Operations

These functions operate on I/O streams referenced using file descriptors.

File descriptors are small integers corresponding to a file that has been opened
by the current process.  For example, standard input is usually file descriptor
0, standard output is 1, and standard error is 2.  Further files opened by a
process will then be assigned 3, 4, 5, and so forth.  The name "file descriptor"
is slightly deceptive; on Unix platforms, sockets and pipes are also referenced
by file descriptors.

The `fileno()` method can be used to obtain the file descriptor
associated with a file object when required.  Note that using the file
descriptor directly will bypass the file object methods, ignoring aspects such
as internal buffering of data.

### `close(fd)`

Close file descriptor *fd*.

> **Note:** This function is intended for low-level I/O and must be applied to a file
> descriptor as returned by `os.open()` or `pipe()`.  To close a "file
> object" returned by the built-in function `open()` or by `popen()` or
> `fdopen()`, use its `close()` method.

### `closerange(fd_low, fd_high, /)`

Close all file descriptors from *fd_low* (inclusive) to *fd_high* (exclusive),
ignoring errors. Equivalent to (but much faster than):

```
for fd in range(fd_low, fd_high):
    try:
        os.close(fd)
    except OSError:
        pass
```

### `copy_file_range(src, dst, count, offset_src=None, offset_dst=None)`

Copy *count* bytes from file descriptor *src*, starting from offset
*offset_src*, to file descriptor *dst*, starting from offset *offset_dst*.
If *offset_src* is `None`, then *src* is read from the current position;
respectively for *offset_dst*.

In Linux kernel older than 5.3, the files pointed to by *src* and *dst*
must reside in the same filesystem, otherwise an `OSError` is
raised with `errno` set to `errno.EXDEV`.

This copy is done without the additional cost of transferring data
from the kernel to user space and then back into the kernel. Additionally,
some filesystems could implement extra optimizations, such as the use of
reflinks (i.e., two or more inodes that share pointers to the same
copy-on-write disk blocks; supported file systems include btrfs and XFS)
and server-side copy (in the case of NFS).

The function copies bytes between two file descriptors. Text options, like
the encoding and the line ending, are ignored.

The return value is the amount of bytes copied. This could be less than the
amount requested.

> **Note:** On Linux, `os.copy_file_range()` should not be used for copying a
> range of a pseudo file from a special filesystem like procfs and sysfs.
> It will always copy no bytes and return 0 as if the file was empty
> because of a known Linux kernel issue.

> **Availability:** Linux >= 4.5 with glibc >= 2.27.

> *Added in version 3.8.*

### `device_encoding(fd)`

Return a string describing the encoding of the device associated with *fd*
if it is connected to a terminal; else return `None`.

On Unix, if the Python UTF-8 Mode is enabled, return
`'UTF-8'` rather than the device encoding.

> *Changed in version 3.10.*
> On Unix, the function now implements the Python UTF-8 Mode.

### `dup(fd, /)`

Return a duplicate of file descriptor *fd*. The new file descriptor is
non-inheritable.

On Windows, when duplicating a standard stream (0: stdin, 1: stdout,
2: stderr), the new file descriptor is :ref:`inheritable
<fd_inheritance>`.

> **Availability:** not WASI.

> *Changed in version 3.4.*
> The new file descriptor is now non-inheritable.

### `dup2(fd, fd2, inheritable=True)`

Duplicate file descriptor *fd* to *fd2*, closing the latter first if
necessary. Return *fd2*. The new file descriptor is :ref:`inheritable
<fd_inheritance>` by default or non-inheritable if *inheritable*
is `False`.

> **Availability:** not WASI.

> *Changed in version 3.4.*
> Add the optional *inheritable* parameter.

> *Changed in version 3.7.*
> Return *fd2* on success. Previously, `None` was always returned.

### `fchmod(fd, mode)`

Change the mode of the file given by *fd* to the numeric *mode*.  See the
docs for `chmod()` for possible values of *mode*.  As of Python 3.3, this
is equivalent to `os.chmod(fd, mode)`.

> **Availability:** Unix, Windows.
>
> The function is limited on WASI, see wasm-availability for more
> information.

> *Changed in version 3.13.*
> Added support on Windows.

### `fchown(fd, uid, gid)`

Change the owner and group id of the file given by *fd* to the numeric *uid*
and *gid*.  To leave one of the ids unchanged, set it to -1.  See
`chown()`.  As of Python 3.3, this is equivalent to ``os.chown(fd, uid,
gid)``.

> **Availability:** Unix.
>
> The function is limited on WASI, see wasm-availability for more
> information.

### `fdatasync(fd)`

Force write of file with filedescriptor *fd* to disk. Does not force update of
metadata.

> **Availability:** Unix, not macOS, not iOS.

### `fpathconf(fd, name, /)`

Return system configuration information relevant to an open file. *name*
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

As of Python 3.3, this is equivalent to `os.pathconf(fd, name)`.

> **Availability:** Unix.

### `fstat(fd)`

Get the status of the file descriptor *fd*. Return a `stat_result`
object.

As of Python 3.3, this is equivalent to `os.stat(fd)`.

> **See also:** The `.stat()` function.

### `fstatvfs(fd, /)`

Return information about the filesystem containing the file associated with
file descriptor *fd* in a `statvfs_result`, like `statvfs()`.
As of Python 3.3, this is equivalent to `os.statvfs(fd)`.

> **Availability:** Unix.

### `fsync(fd)`

Force write of file with filedescriptor *fd* to disk.  On Unix, this calls the
native `fsync function; on Windows, the MS commit` function.

If you're starting with a buffered Python file object *f*, first do
`f.flush()`, and then do `os.fsync(f.fileno())`, to ensure that all internal
buffers associated with *f* are written to disk.

> **Availability:** Unix, Windows.

### `ftruncate(fd, length, /)`

Truncate the file corresponding to file descriptor *fd*, so that it is at
most *length* bytes in size.  As of Python 3.3, this is equivalent to
`os.truncate(fd, length)`.

> **Availability:** Unix, Windows.

> *Changed in version 3.5.*
> Added support for Windows

### `get_blocking(fd, /)`

Get the blocking mode of the file descriptor: `False` if the
`O_NONBLOCK` flag is set, `True` if the flag is cleared.

See also `set_blocking()` and `socket.socket.setblocking()`.

> **Availability:** Unix, Windows.
>
> The function is limited on WASI, see wasm-availability for more
> information.
>
> On Windows, this function is limited to pipes.

> *Added in version 3.5.*

> *Changed in version 3.12.*
> Added support for pipes on Windows.

### `grantpt(fd, /)`

Grant access to the slave pseudo-terminal device associated with the
master pseudo-terminal device to which the file descriptor *fd* refers.
The file descriptor *fd* is not closed upon failure.

Calls the C standard library function `grantpt`.

> **Availability:** Unix, not WASI.

> *Added in version 3.13.*

### `isatty(fd, /)`

Return `True` if the file descriptor *fd* is open and connected to a
tty(-like) device, else `False`.

### `lockf(fd, cmd, len, /)`

Apply, test or remove a POSIX lock on an open file descriptor.
*fd* is an open file descriptor.
*cmd* specifies the command to use - one of `F_LOCK`, `F_TLOCK`,
`F_ULOCK` or `F_TEST`.
*len* specifies the section of the file to lock.

> **Availability:** Unix.

> *Added in version 3.3.*

### `F_LOCK`

```python
F_TLOCK
F_ULOCK
F_TEST
```

Flags that specify what action `lockf()` will take.

> **Availability:** Unix.

> *Added in version 3.3.*

### `login_tty(fd, /)`

Prepare the tty of which fd is a file descriptor for a new login session.
Make the calling process a session leader; make the tty the controlling tty,
the stdin, the stdout, and the stderr of the calling process; close fd.

> **Availability:** Unix, not WASI.

> *Added in version 3.11.*

### `lseek(fd, pos, whence, /)`

Set the current position of file descriptor *fd* to position *pos*, modified
by *whence*, and return the new position in bytes relative to
the start of the file.
Valid values for *whence* are:

- `SEEK_SET` or `0` -- set *pos* relative to the beginning of the file
- `SEEK_CUR` or `1` -- set *pos* relative to the current file position
- `SEEK_END` or `2` -- set *pos* relative to the end of the file
- `SEEK_HOLE` -- set *pos* to the next data location, relative to *pos*
- `SEEK_DATA` -- set *pos* to the next data hole, relative to *pos*

> *Changed in version 3.3.*
> Add support for `SEEK_HOLE` and `SEEK_DATA`.

### `SEEK_SET`

```python
SEEK_CUR
SEEK_END
```

Parameters to the `lseek()` function and the `seek()`
method on file-like objects,
for whence to adjust the file position indicator.

`SEEK_SET`
Adjust the file position relative to the beginning of the file.
`SEEK_CUR`
Adjust the file position relative to the current file position.
`SEEK_END`
Adjust the file position relative to the end of the file.

Their values are 0, 1, and 2, respectively.

### `SEEK_HOLE`

```python
SEEK_DATA
```

Parameters to the `lseek()` function and the `seek()`
method on file-like objects,
for seeking file data and holes on sparsely allocated files.

`SEEK_DATA`
Adjust the file offset to the next location containing data,
relative to the seek position.

`SEEK_HOLE`
Adjust the file offset to the next location containing a hole,
relative to the seek position.
A hole is defined as a sequence of zeros.

> **Note:** These operations only make sense for filesystems that support them.

> **Availability:** Linux >= 3.1, macOS, Unix

> *Added in version 3.3.*

### `open(path, flags, mode=0o777, *, dir_fd=None)`

Open the file *path* and set various flags according to *flags* and possibly
its mode according to *mode*.  When computing *mode*, the current umask value
is first masked out.  Return the file descriptor for the newly opened file.
The new file descriptor is non-inheritable.

For a description of the flag and mode values, see the C run-time documentation;
flag constants (like `O_RDONLY` and `O_WRONLY`) are defined in
the `os` module.  In particular, on Windows adding
`O_BINARY` is needed to open files in binary mode.

This function can support :ref:`paths relative to directory descriptors
<dir_fd>` with the *dir_fd* parameter.

> *Changed in version 3.4.*
> The new file descriptor is now non-inheritable.

> **Note:** This function is intended for low-level I/O.  For normal usage, use the
> built-in function `open()`, which returns a file object with
> `read()` and `write()` methods.
> To wrap a file descriptor in a file object, use `fdopen()`.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise an
> exception, the function now retries the system call instead of raising an
> `InterruptedError` exception (see PEP 475 for the rationale).

> *Changed in version 3.6.*
> Accepts a path-like object.

The following constants are options for the *flags* parameter to the
`open()` function.  They can be combined using the bitwise OR operator
`|`.  Some of them are not available on all platforms.  For descriptions of
their availability and use, consult the open(2) manual page on Unix
or the MSDN on Windows.

### `O_RDONLY`

```python
O_WRONLY
O_RDWR
O_APPEND
O_CREAT
O_EXCL
O_TRUNC
```

The above constants are available on Unix and Windows.

### `O_DSYNC`

```python
O_RSYNC
O_SYNC
O_NDELAY
O_NONBLOCK
O_NOCTTY
O_CLOEXEC
```

The above constants are only available on Unix.

> *Changed in version 3.3.*
> Add `O_CLOEXEC` constant.

### `O_BINARY`

```python
O_NOINHERIT
O_SHORT_LIVED
O_TEMPORARY
O_RANDOM
O_SEQUENTIAL
O_TEXT
```

The above constants are only available on Windows.

### `O_EVTONLY`

```python
O_FSYNC
O_SYMLINK
O_NOFOLLOW_ANY
```

The above constants are only available on macOS.

> *Changed in version 3.10.*
> Add `O_EVTONLY`, `O_FSYNC`, `O_SYMLINK`
> and `O_NOFOLLOW_ANY` constants.

### `O_ASYNC`

```python
O_DIRECT
O_DIRECTORY
O_NOFOLLOW
O_NOATIME
O_PATH
O_TMPFILE
O_SHLOCK
O_EXLOCK
```

The above constants are extensions and not present if they are not defined by
the C library.

> *Changed in version 3.4.*
> Add `O_PATH` on systems that support it.
> Add `O_TMPFILE`, only available on Linux Kernel 3.11
> or newer.

### `openpty()`

Open a new pseudo-terminal pair. Return a pair of file descriptors
`(master, slave)` for the pty and the tty, respectively. The new file
descriptors are non-inheritable. For a (slightly) more
portable approach, use the `pty` module.

> **Availability:** Unix, not WASI.

> *Changed in version 3.4.*
> The new file descriptors are now non-inheritable.

### `pipe()`

Create a pipe.  Return a pair of file descriptors `(r, w)` usable for
reading and writing, respectively. The new file descriptor is
non-inheritable.

> **Availability:** Unix, Windows.

> *Changed in version 3.4.*
> The new file descriptors are now non-inheritable.

### `pipe2(flags, /)`

Create a pipe with *flags* set atomically.
*flags* can be constructed by ORing together one or more of these values:
`O_NONBLOCK`, `O_CLOEXEC`.
Return a pair of file descriptors `(r, w)` usable for reading and writing,
respectively.

> **Availability:** Unix, macOS >= 27.0, not WASI, not iOS.

> *Added in version 3.3.*

### `posix_fallocate(fd, offset, len, /)`

Ensures that enough disk space is allocated for the file specified by *fd*
starting from *offset* and continuing for *len* bytes.

> **Availability:** Unix, not macOS, not iOS.

> *Added in version 3.3.*

### `posix_fadvise(fd, offset, len, advice, /)`

Announces an intention to access data in a specific pattern thus allowing
the kernel to make optimizations.
The advice applies to the region of the file specified by *fd* starting at
*offset* and continuing for *len* bytes.
*advice* is one of `POSIX_FADV_NORMAL`, `POSIX_FADV_SEQUENTIAL`,
`POSIX_FADV_RANDOM`, `POSIX_FADV_NOREUSE`,
`POSIX_FADV_WILLNEED` or `POSIX_FADV_DONTNEED`.

> **Availability:** Unix, not macOS, not iOS.

> *Added in version 3.3.*
