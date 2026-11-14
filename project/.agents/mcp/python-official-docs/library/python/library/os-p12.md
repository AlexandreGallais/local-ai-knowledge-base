---
title: "os --- Miscellaneous operating system interfaces (part 12 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 12 of 16)

### `eventfd_read(fd)`

Read value from an `eventfd()` file descriptor and return a 64 bit
unsigned int. The function does not verify that *fd* is an `eventfd()`.

> **Availability:** Linux >= 2.6.27

> *Added in version 3.10.*

### `eventfd_write(fd, value)`

Add value to an `eventfd()` file descriptor. *value* must be a 64 bit
unsigned int. The function does not verify that *fd* is an `eventfd()`.

> **Availability:** Linux >= 2.6.27

> *Added in version 3.10.*

### `EFD_CLOEXEC`

Set close-on-exec flag for new `eventfd()` file descriptor.

> **Availability:** Linux >= 2.6.27

> *Added in version 3.10.*

### `EFD_NONBLOCK`

Set `O_NONBLOCK` status flag for new `eventfd()` file
descriptor.

> **Availability:** Linux >= 2.6.27

> *Added in version 3.10.*

### `EFD_SEMAPHORE`

Provide semaphore-like semantics for reads from an `eventfd()` file
descriptor. On read the internal counter is decremented by one.

> **Availability:** Linux >= 2.6.30

> *Added in version 3.10.*

### Timer File Descriptors

> *Added in version 3.13.*

These functions provide support for Linux's *timer file descriptor* API.
Naturally, they are all only available on Linux.

### `timerfd_create(clockid, /, *, flags=0)`

Create and return a timer file descriptor (*timerfd*).

The file descriptor returned by `timerfd_create()` supports:

- `read()`
- `select()`
- `poll()`

The file descriptor's `read()` method can be called with a buffer size
of 8. If the timer has already expired one or more times, `read()`
returns the number of expirations with the host's endianness, which may be
converted to an `int` by `int.from_bytes(x, byteorder=sys.byteorder)`.

`select()` and `poll()` can be used to wait until
timer expires and the file descriptor is readable.

*clockid* must be a valid clock ID,
as defined in the `time` module:

- `time.CLOCK_REALTIME`
- `time.CLOCK_MONOTONIC`
- `time.CLOCK_BOOTTIME` (Since Linux 3.15 for timerfd_create)

If *clockid* is `time.CLOCK_REALTIME`, a settable system-wide
real-time clock is used. If the system clock is changed, the timer setting
needs to be updated. To cancel the timer when the system clock is changed, see
`TFD_TIMER_CANCEL_ON_SET`.

If *clockid* is `time.CLOCK_MONOTONIC`, a non-settable monotonically
increasing clock is used. Even if the system clock is changed, the timer
setting will not be affected.

If *clockid* is `time.CLOCK_BOOTTIME`, it is the same as
`time.CLOCK_MONOTONIC` except it includes any time that the system
is suspended.

The file descriptor's behaviour can be modified by specifying a *flags* value.
Any of the following variables may be used, combined using bitwise OR
(the `|` operator):

- `TFD_NONBLOCK`
- `TFD_CLOEXEC`

If `TFD_NONBLOCK` is not set as a flag, `read()` blocks until
the timer expires. If it is set as a flag, `read()` doesn't block, but
if there hasn't been an expiration since the last call to read,
`read()` raises `OSError` with `errno` set to
`errno.EAGAIN`.

`TFD_CLOEXEC` is always set by Python automatically.

The file descriptor must be closed with `os.close()` when it is no
longer needed, or else the file descriptor will be leaked.

> **See also:** The timerfd_create(2) man page.

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.13.*

### `timerfd_settime(fd, /, *, flags=0, initial=0.0, interval=0.0)`

Alter a timer file descriptor's internal timer.
This function operates the same interval timer as `timerfd_settime_ns()`.

*fd* must be a valid timer file descriptor.

The timer's behaviour can be modified by specifying a *flags* value.
Any of the following variables may be used, combined using bitwise OR
(the `|` operator):

- `TFD_TIMER_ABSTIME`
- `TFD_TIMER_CANCEL_ON_SET`

The timer is disabled by setting *initial* to zero (`0`).
If *initial* is greater than zero, the timer is enabled.
If *initial* is less than zero, it raises an `OSError` exception
with `errno` set to `errno.EINVAL`.

By default the timer will fire when *initial* seconds have elapsed.

However, if the `TFD_TIMER_ABSTIME` flag is set,
the timer will fire when the timer's clock
(set by *clockid* in `timerfd_create()`) reaches *initial* seconds.

The timer's interval is set by the *interval* real number.
If *interval* is zero, the timer only fires once, on the initial expiration.
If *interval* is greater than zero, the timer fires every time *interval*
seconds have elapsed since the previous expiration.
If *interval* is less than zero, it raises `OSError` with `errno`
set to `errno.EINVAL`.

If the `TFD_TIMER_CANCEL_ON_SET` flag is set along with
`TFD_TIMER_ABSTIME` and the clock for this timer is
`time.CLOCK_REALTIME`, the timer is marked as cancelable if the
real-time clock is changed discontinuously. Reading the descriptor is
aborted with the error `errno.ECANCELED`.

Linux manages system clock as UTC. A daylight-savings time transition is
done by changing time offset only and doesn't cause discontinuous system
clock change.

Discontinuous system clock change will be caused by the following events:

- `settimeofday`
- `clock_settime`
- set the system date and time by `date` command

Return a two-item tuple of (`next_expiration`, `interval`) from
the previous timer state, before this function executed.

> **See also:** timerfd_create(2), timerfd_settime(2),
> settimeofday(2), clock_settime(2),
> and date(1).

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.13.*

### `timerfd_settime_ns(fd, /, *, flags=0, initial=0, interval=0)`

Similar to `timerfd_settime()`, but use time as nanoseconds.
This function operates the same interval timer as `timerfd_settime()`.

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.13.*

### `timerfd_gettime(fd, /)`

Return a two-item tuple of floats (`next_expiration`, `interval`).

`next_expiration` denotes the relative time until the timer next fires,
regardless of if the `TFD_TIMER_ABSTIME` flag is set.

`interval` denotes the timer's interval.
If zero, the timer will only fire once, after `next_expiration` seconds
have elapsed.

> **See also:** timerfd_gettime(2)

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.13.*

### `timerfd_gettime_ns(fd, /)`

Similar to `timerfd_gettime()`, but return time as nanoseconds.

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.13.*

### `TFD_NONBLOCK`

A flag for the `timerfd_create()` function,
which sets the `O_NONBLOCK` status flag for the new timer file
descriptor. If `TFD_NONBLOCK` is not set as a flag, `read()` blocks.

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.13.*

### `TFD_CLOEXEC`

A flag for the `timerfd_create()` function,
If `TFD_CLOEXEC` is set as a flag, set close-on-exec flag for new file
descriptor.

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.13.*

### `TFD_TIMER_ABSTIME`

A flag for the `timerfd_settime()` and `timerfd_settime_ns()` functions.
If this flag is set, *initial* is interpreted as an absolute value on the
timer's clock (in UTC seconds or nanoseconds since the Unix Epoch).

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.13.*

### `TFD_TIMER_CANCEL_ON_SET`

A flag for the `timerfd_settime()` and `timerfd_settime_ns()`
functions along with `TFD_TIMER_ABSTIME`.
The timer is cancelled when the time of the underlying clock changes
discontinuously.

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.13.*

### Linux extended attributes

> *Added in version 3.3.*

These functions are all available on Linux only.

### `getxattr(path, attribute, *, follow_symlinks=True)`

Return the value of the extended filesystem attribute *attribute* for
*path*. *attribute* can be bytes or str (directly or indirectly through the
`PathLike` interface). If it is str, it is encoded with the filesystem
encoding.

This function can support specifying a file descriptor and
not following symlinks.

> *Changed in version 3.6.*
> Accepts a path-like object for *path* and *attribute*.

### `listxattr(path=None, *, follow_symlinks=True)`

Return a list of the extended filesystem attributes on *path*.  The
attributes in the list are represented as strings decoded with the filesystem
encoding.  If *path* is `None`, `listxattr()` will examine the current
directory.

This function can support specifying a file descriptor and
not following symlinks.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.15.*
> `os.listxattr(-1)` now fails with `OSError(errno.EBADF)` rather than
> listing extended attributes of the current directory.

### `removexattr(path, attribute, *, follow_symlinks=True)`

Removes the extended filesystem attribute *attribute* from *path*.
*attribute* should be bytes or str (directly or indirectly through the
`PathLike` interface). If it is a string, it is encoded
with the filesystem encoding and error handler.

This function can support specifying a file descriptor and
not following symlinks.

> *Changed in version 3.6.*
> Accepts a path-like object for *path* and *attribute*.

### `setxattr(path, attribute, value, flags=0, *, follow_symlinks=True)`

Set the extended filesystem attribute *attribute* on *path* to *value*.
*attribute* must be a bytes or str with no embedded NULs (directly or
indirectly through the `PathLike` interface). If it is a str,
it is encoded with the filesystem encoding and error handler.  *flags* may be
`XATTR_REPLACE` or `XATTR_CREATE`. If `XATTR_REPLACE` is
given and the attribute does not exist, `ENODATA` will be raised.
If `XATTR_CREATE` is given and the attribute already exists, the
attribute will not be created and `EEXISTS` will be raised.

This function can support specifying a file descriptor and
not following symlinks.

> **Note:** A bug in Linux kernel versions less than 2.6.39 caused the flags argument
> to be ignored on some filesystems.

> *Changed in version 3.6.*
> Accepts a path-like object for *path* and *attribute*.

### `XATTR_SIZE_MAX`

The maximum size the value of an extended attribute can be. Currently, this
is 64 KiB on Linux.

### `XATTR_CREATE`

This is a possible value for the flags argument in `setxattr()`. It
indicates the operation must create an attribute.

### `XATTR_REPLACE`

This is a possible value for the flags argument in `setxattr()`. It
indicates the operation must replace an existing attribute.
