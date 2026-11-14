---
title: "os --- Miscellaneous operating system interfaces (part 5 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 5 of 16)

### `POSIX_FADV_NORMAL`

```python
POSIX_FADV_SEQUENTIAL
POSIX_FADV_RANDOM
POSIX_FADV_NOREUSE
POSIX_FADV_WILLNEED
POSIX_FADV_DONTNEED
```

Flags that can be used in *advice* in `posix_fadvise()` that specify
the access pattern that is likely to be used.

> **Availability:** Unix.

> *Added in version 3.3.*

### `pread(fd, n, offset, /)`

Read at most *n* bytes from file descriptor *fd* at a position of *offset*,
leaving the file offset unchanged.

Return a bytestring containing the bytes read. If the end of the file
referred to by *fd* has been reached, an empty bytes object is returned.

> **Availability:** Unix.

> *Added in version 3.3.*

### `posix_openpt(oflag, /)`

Open and return a file descriptor for a master pseudo-terminal device.

Calls the C standard library function `posix_openpt`. The *oflag*
argument is used to set file status flags and file access modes as
specified in the manual page of `posix_openpt` of your system.

The returned file descriptor is non-inheritable.
If the value `O_CLOEXEC` is available on the system, it is added to
*oflag*.

> **Availability:** Unix, not WASI.

> *Added in version 3.13.*

### `preadv(fd, buffers, offset, flags=0, /)`

Read from a file descriptor *fd* at a position of *offset* into mutable
bytes-like objects *buffers*, leaving the file
offset unchanged.  Transfer data into each buffer until it is full and then
move on to the next buffer in the sequence to hold the rest of the data.

The flags argument contains a bitwise OR of zero or more of the following
flags:

- `RWF_HIPRI`
- `RWF_NOWAIT`
- `RWF_DONTCACHE`

Return the total number of bytes actually read which can be less than the
total capacity of all the objects.

The operating system may set a limit (`sysconf()` value
`'SC_IOV_MAX'`) on the number of buffers that can be used.

Combine the functionality of `os.readv()` and `os.pread()`.

> **Availability:** Linux >= 2.6.30, FreeBSD >= 6.0, OpenBSD >= 2.7, AIX >= 7.1.
>
> Using flags requires Linux >= 4.6.

> *Added in version 3.7.*

### `RWF_NOWAIT`

Do not wait for data which is not immediately available. If this flag is
specified, the system call will return instantly if it would have to read
data from the backing storage or wait for a lock.

If some data was successfully read, it will return the number of bytes read.
If no bytes were read, it will return `-1` and set errno to
`errno.EAGAIN`.

> **Availability:** Linux >= 4.14.

> *Added in version 3.7.*

### `RWF_HIPRI`

High priority read/write. Allows block-based filesystems to use polling
of the device, which provides lower latency, but may use additional
resources.

Currently, on Linux, this feature is usable only on a file descriptor opened
using the `O_DIRECT` flag.

> **Availability:** Linux >= 4.6.

> *Added in version 3.7.*

### `RWF_DONTCACHE`

Use uncached buffered IO.

> **Availability:** Linux >= 6.14

> *Added in version 3.15.*

### `RWF_ATOMIC`

Write data atomically. Requires alignment to the device's atomic write unit.

> **Availability:** Linux >= 6.11

> *Added in version 3.15.*

### `ptsname(fd, /)`

Return the name of the slave pseudo-terminal device associated with the
master pseudo-terminal device to which the file descriptor *fd* refers.
The file descriptor *fd* is not closed upon failure.

Calls the reentrant C standard library function `ptsname_r` if
it is available; otherwise, the C standard library function
`ptsname`, which is not guaranteed to be thread-safe, is called.

> **Availability:** Unix, not WASI.

> *Added in version 3.13.*

### `pwrite(fd, str, offset, /)`

Write the bytestring in *str* to file descriptor *fd* at position of
*offset*, leaving the file offset unchanged.

Return the number of bytes actually written.

> **Availability:** Unix.

> *Added in version 3.3.*

### `pwritev(fd, buffers, offset, flags=0, /)`

Write the *buffers* contents to file descriptor *fd* at an offset *offset*,
leaving the file offset unchanged.  *buffers* must be a sequence of
bytes-like objects. Buffers are processed in
array order. Entire contents of the first buffer is written before
proceeding to the second, and so on.

The flags argument contains a bitwise OR of zero or more of the following
flags:

- `RWF_DSYNC`
- `RWF_SYNC`
- `RWF_APPEND`
- `RWF_DONTCACHE`
- `RWF_ATOMIC`

Return the total number of bytes actually written.

The operating system may set a limit (`sysconf()` value
`'SC_IOV_MAX'`) on the number of buffers that can be used.

Combine the functionality of `os.writev()` and `os.pwrite()`.

> **Availability:** Linux >= 2.6.30, FreeBSD >= 6.0, OpenBSD >= 2.7, AIX >= 7.1.
>
> Using flags requires Linux >= 4.6.

> *Added in version 3.7.*

### `RWF_DSYNC`

Provide a per-write equivalent of the `O_DSYNC` `os.open()` flag.
This flag effect applies only to the data range written by the system call.

> **Availability:** Linux >= 4.7.

> *Added in version 3.7.*

### `RWF_SYNC`

Provide a per-write equivalent of the `O_SYNC` `os.open()` flag.
This flag effect applies only to the data range written by the system call.

> **Availability:** Linux >= 4.7.

> *Added in version 3.7.*

### `RWF_APPEND`

Provide a per-write equivalent of the `O_APPEND` `os.open()`
flag. This flag is meaningful only for `os.pwritev()`, and its
effect applies only to the data range written by the system call. The
*offset* argument does not affect the write operation; the data is always
appended to the end of the file. However, if the *offset* argument is
`-1`, the current file *offset* is updated.

> **Availability:** Linux >= 4.16.

> *Added in version 3.10.*

### `read(fd, n, /)`

Read at most *n* bytes from file descriptor *fd*.

Return a bytestring containing the bytes read. If the end of the file
referred to by *fd* has been reached, an empty bytes object is returned.

> **Note:** This function is intended for low-level I/O and must be applied to a file
> descriptor as returned by `os.open()` or `pipe()`.  To read a
> "file object" returned by the built-in function `open()` or by
> `popen()` or `fdopen()`, or `sys.stdin`, use its
> `read()` or `readline()` methods.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise an
> exception, the function now retries the system call instead of raising an
> `InterruptedError` exception (see PEP 475 for the rationale).

### `readinto(fd, buffer, /)`

Read from a file descriptor *fd* into a mutable
buffer object *buffer*.

The *buffer* should be mutable and bytes-like. On
success, returns the number of bytes read. Less bytes may be read than the
size of the buffer. The underlying system call will be retried when
interrupted by a signal, unless the signal handler raises an exception.
Other errors will not be retried and an error will be raised.

Returns 0 if *fd* is at end of file or if the provided *buffer* has
length 0 (which can be used to check for errors without reading data).
Never returns negative.

> **Note:** This function is intended for low-level I/O and must be applied to a file
> descriptor as returned by `os.open()` or `os.pipe()`.  To read a
> "file object" returned by the built-in function `open()`, or
> `sys.stdin`, use its member functions, for example
> `io.BufferedIOBase.readinto()`, `io.BufferedIOBase.read()`, or
> `io.TextIOBase.read()`

> *Added in version 3.14.*

### `sendfile(out_fd, in_fd, offset, count)`

```python
sendfile(out_fd, in_fd, offset, count, headers=(), trailers=(), flags=0)
```

Copy *count* bytes from file descriptor *in_fd* to file descriptor *out_fd*
starting at *offset*.
Return the number of bytes sent. When EOF is reached return `0`.

The first function notation is supported by all platforms that define
`sendfile()`.

On Linux, if *offset* is given as `None`, the bytes are read from the
current position of *in_fd* and the position of *in_fd* is updated.

The second case may be used on macOS and FreeBSD where *headers* and
*trailers* are arbitrary sequences of buffers that are written before and
after the data from *in_fd* is written. It returns the same as the first case.

On macOS and FreeBSD, a value of `0` for *count* specifies to send until
the end of *in_fd* is reached.

All platforms support sockets as *out_fd* file descriptor, and some platforms
allow other types (e.g. regular file, pipe) as well.

Cross-platform applications should not use *headers*, *trailers* and *flags*
arguments.

> **Availability:** Unix, not WASI.

> **Note:** For a higher-level wrapper of `sendfile()`, see
> `socket.socket.sendfile()`.

> *Added in version 3.3.*

> *Changed in version 3.9.*
> Parameters *out* and *in* was renamed to *out_fd* and *in_fd*.

### `SF_NODISKIO`

```python
SF_MNOWAIT
SF_SYNC
```

Parameters to the `sendfile()` function, if the implementation supports
them.

> **Availability:** Unix, not WASI.

> *Added in version 3.3.*

### `SF_NOCACHE`

Parameter to the `sendfile()` function, if the implementation supports
it. The data won't be cached in the virtual memory and will be freed afterwards.

> **Availability:** Unix, not WASI.

> *Added in version 3.11.*

### `set_blocking(fd, blocking, /)`

Set the blocking mode of the specified file descriptor. Set the
`O_NONBLOCK` flag if blocking is `False`, clear the flag otherwise.

See also `get_blocking()` and `socket.socket.setblocking()`.

> **Availability:** Unix, Windows.
>
> The function is limited on WASI, see wasm-availability for more
> information.
>
> On Windows, this function is limited to pipes.

> *Added in version 3.5.*

> *Changed in version 3.12.*
> Added support for pipes on Windows.

### `splice(src, dst, count, offset_src=None, offset_dst=None, flags=0)`

Transfer *count* bytes from file descriptor *src*, starting from offset
*offset_src*, to file descriptor *dst*, starting from offset *offset_dst*.

The splicing behaviour can be modified by specifying a *flags* value.
Any of the following variables may used, combined using bitwise OR
(the `|` operator):

- If `SPLICE_F_MOVE` is specified,
the kernel is asked to move pages instead of copying,
but pages may still be copied if the kernel cannot move the pages from the pipe.

- If `SPLICE_F_NONBLOCK` is specified,
the kernel is asked to not block on I/O.
This makes the splice pipe operations nonblocking,
but splice may nevertheless block because the spliced file descriptors may block.

- If `SPLICE_F_MORE` is specified,
it hints to the kernel that more data will be coming in a subsequent splice.

At least one of the file descriptors must refer to a pipe. If *offset_src*
is `None`, then *src* is read from the current position; respectively for
*offset_dst*. The offset associated to the file descriptor that refers to a
pipe must be `None`. The files pointed to by *src* and *dst* must reside in
the same filesystem, otherwise an `OSError` is raised with
`errno` set to `errno.EXDEV`.

This copy is done without the additional cost of transferring data
from the kernel to user space and then back into the kernel. Additionally,
some filesystems could implement extra optimizations. The copy is done as if
both files are opened as binary.

Upon successful completion, returns the number of bytes spliced to or from
the pipe. A return value of 0 means end of input. If *src* refers to a
pipe, then this means that there was no data to transfer, and it would not
make sense to block because there are no writers connected to the write end
of the pipe.

> **See also:** The splice(2) man page.

> **Availability:** Linux >= 2.6.17 with glibc >= 2.5

> *Added in version 3.10.*

### `SPLICE_F_MOVE`

```python
SPLICE_F_NONBLOCK
SPLICE_F_MORE
```

> *Added in version 3.10.*

### `readv(fd, buffers, /)`

Read from a file descriptor *fd* into a number of mutable :term:`bytes-like
objects <bytes-like object>` *buffers*. Transfer data into each buffer until
it is full and then move on to the next buffer in the sequence to hold the
rest of the data.

Return the total number of bytes actually read which can be less than the
total capacity of all the objects.

The operating system may set a limit (`sysconf()` value
`'SC_IOV_MAX'`) on the number of buffers that can be used.

> **Availability:** Unix.

> *Added in version 3.3.*

### `tcgetpgrp(fd, /)`

Return the process group associated with the terminal given by *fd* (an open
file descriptor as returned by `os.open()`).

> **Availability:** Unix, not WASI.

### `tcsetpgrp(fd, pg, /)`

Set the process group associated with the terminal given by *fd* (an open file
descriptor as returned by `os.open()`) to *pg*.

> **Availability:** Unix, not WASI.

### `ttyname(fd, /)`

Return a string which specifies the terminal device associated with
file descriptor *fd*.  If *fd* is not associated with a terminal device, an
exception is raised.

> **Availability:** Unix.

### `unlockpt(fd, /)`

Unlock the slave pseudo-terminal device associated with the master
pseudo-terminal device to which the file descriptor *fd* refers.
The file descriptor *fd* is not closed upon failure.

Calls the C standard library function `unlockpt`.

> **Availability:** Unix, not WASI.

> *Added in version 3.13.*

### `write(fd, str, /)`

Write the bytestring in *str* to file descriptor *fd*.

Return the number of bytes actually written.

> **Note:** This function is intended for low-level I/O and must be applied to a file
> descriptor as returned by `os.open()` or `pipe()`.  To write a "file
> object" returned by the built-in function `open()` or by `popen()` or
> `fdopen()`, or `sys.stdout` or `sys.stderr`, use its
> `write()` method.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise an
> exception, the function now retries the system call instead of raising an
> `InterruptedError` exception (see PEP 475 for the rationale).

### `writev(fd, buffers, /)`

Write the contents of *buffers* to file descriptor *fd*. *buffers* must be
a sequence of bytes-like objects. Buffers are
processed in array order. Entire contents of the first buffer is written
before proceeding to the second, and so on.

Returns the total number of bytes actually written.

The operating system may set a limit (`sysconf()` value
`'SC_IOV_MAX'`) on the number of buffers that can be used.

> **Availability:** Unix.

> *Added in version 3.3.*

### Querying the size of a terminal

> *Added in version 3.3.*

### `get_terminal_size(fd=STDOUT_FILENO, /)`

Return the size of the terminal window as `(columns, lines)`,
tuple of type `terminal_size`.

The optional argument `fd` (default `STDOUT_FILENO`, or standard
output) specifies which file descriptor should be queried.

If the file descriptor is not connected to a terminal, an `OSError`
is raised.

`shutil.get_terminal_size()` is the high-level function which
should normally be used, `os.get_terminal_size` is the low-level
implementation.

> **Availability:** Unix, Windows.

### class `terminal_size`

A subclass of tuple, holding `(columns, lines)` of the terminal window size.
