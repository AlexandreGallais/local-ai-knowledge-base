---
title: "select --- Waiting for I/O completion (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/select.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `select` --- Waiting for I/O completion

Module `select`.

This module provides access to the `select` and `poll` functions
available in most operating systems, `devpoll` available on
Solaris and derivatives, `epoll` available on Linux 2.5+ and
`kqueue` available on most BSD.
Note that on Windows, it only works for sockets; on other operating systems,
it also works for other file types (in particular, on Unix, it works on pipes).
It cannot be used on regular files to determine whether a file has grown since
it was last read.

> **Note:** The `selectors` module allows high-level and efficient I/O
> multiplexing, built upon the `select` module primitives. Users are
> encouraged to use the `selectors` module instead, unless they want
> precise control over the OS-level primitives used.

The module defines the following:

### exception `error`

A deprecated alias of `OSError`.

> *Changed in version 3.3.*
> Following PEP 3151, this class was made an alias of `OSError`.

### `devpoll()`

Returns a `/dev/poll`
polling object; see section devpoll-objects below for the
methods supported by devpoll objects.

`devpoll` objects are linked to the number of file
descriptors allowed at the time of instantiation. If your program
reduces this value, `devpoll` will fail. If your program
increases this value, `devpoll` may return an
incomplete list of active file descriptors.

The new file descriptor is non-inheritable.

> *Added in version 3.3.*

> *Changed in version 3.4.*
> The new file descriptor is now non-inheritable.

> **Availability:** Solaris.

### `epoll(sizehint=-1, flags=0)`

Return an edge polling object,
which can be used as Edge or Level Triggered interface for I/O
events.

*sizehint* informs epoll about the expected number of events to be
registered.  It must be positive, or `-1` to use the default. It is only
used on older systems where epoll_create1(2) is not available;
otherwise it has no effect (though its value is still checked).

*flags* is deprecated and completely ignored.  However, when supplied, its
value must be `0` or `select.EPOLL_CLOEXEC`, otherwise `OSError` is
raised.

See the epoll-objects section below for the methods supported by
epolling objects.

`epoll` objects support the context management protocol: when used in a
`with` statement, the new file descriptor is automatically closed
at the end of the block.

The new file descriptor is non-inheritable.

> *Changed in version 3.3.*
> Added the *flags* parameter.

> *Changed in version 3.4.*
> Support for the `with` statement was added.
> The new file descriptor is now non-inheritable.

> *Deprecated since version 3.4.*
> The *flags* parameter.  `select.EPOLL_CLOEXEC` is used by default now.
> Use `os.set_inheritable()` to make the file descriptor inheritable.

> *Changed in version 3.15.*
> When CPython is built, this function may be disabled using
> `--disable-epoll`.

> **Availability:** Linux >= 2.5.44.

### `poll()`

Returns a polling object, which
supports registering and unregistering file descriptors, and then polling them
for I/O events; see section poll-objects below for the methods supported
by polling objects.

> **Availability:** Unix.

### `kqueue()`

Returns a kernel queue object; see section
kqueue-objects below for the methods supported by kqueue objects.

The new file descriptor is non-inheritable.

> *Changed in version 3.4.*
> The new file descriptor is now non-inheritable.

> **Availability:** BSD, macOS.

### `kevent(ident, filter=KQ_FILTER_READ, flags=KQ_EV_ADD, fflags=0, data=0, udata=0)`

Returns a kernel event object; see section
kevent-objects below for the methods supported by kevent objects.

> **Availability:** BSD, macOS.

### `select(rlist, wlist, xlist, timeout=None)`

This is a straightforward interface to the Unix `select` system call.
The first three arguments are iterables of 'waitable objects': either
integers representing file descriptors or objects with a parameterless method
named `fileno()` returning such an integer:

- *rlist*: wait until ready for reading
- *wlist*: wait until ready for writing
- *xlist*: wait for an "exceptional condition" (see the manual page for what
your system considers such a condition)

Empty iterables are allowed, but acceptance of three empty iterables is
platform-dependent. (It is known to work on Unix but not on Windows.)  The
optional *timeout* argument specifies a time-out in seconds; it may be
a non-integer to specify fractions of seconds.
When the *timeout* argument is omitted or `None`, the function blocks until
at least one file descriptor is ready.  A time-out value of zero specifies a
poll and never blocks.

The return value is a triple of lists of objects that are ready: subsets of the
first three arguments.  When the time-out is reached without a file descriptor
becoming ready, three empty lists are returned.

Among the acceptable object types in the iterables are Python :term:`file
objects <file object>` (e.g. `sys.stdin`, or objects returned by
`open()` or `os.popen()`), socket objects returned by
`socket.socket()`.  You may also define a wrapper class yourself,
as long as it has an appropriate `fileno()` method (that
really returns a file descriptor, not just a random integer).

> **Note:**
> File objects on Windows are not acceptable, but sockets are.  On Windows,
> the underlying `select` function is provided by the WinSock
> library, and does not handle file descriptors that don't originate from
> WinSock.

> *Changed in version 3.5.*
> The function is now retried with a recomputed timeout when interrupted by
> a signal, except if the signal handler raises an exception (see
> PEP 475 for the rationale), instead of raising
> `InterruptedError`.

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.

### `PIPE_BUF`

The minimum number of bytes which can be written without blocking to a pipe
when the pipe has been reported as ready for writing by `select()`,
`poll()` or another interface in this module.  This doesn't apply
to other kinds of file-like objects such as sockets.

This value is guaranteed by POSIX to be at least 512.

> **Availability:** Unix

> *Added in version 3.2.*

## `/dev/poll` polling objects

Solaris and derivatives have `/dev/poll`. While `select` is
*O*(*highest file descriptor*) and `poll` is *O*(*number of file
descriptors*), `/dev/poll` is *O*(*active file descriptors*).

`/dev/poll` behaviour is very close to the standard `poll`
object.

### `devpoll.close()`

Close the file descriptor of the polling object.

> *Added in version 3.4.*

### `devpoll.closed`

`True` if the polling object is closed.

> *Added in version 3.4.*

### `devpoll.fileno()`

Return the file descriptor number of the polling object.

> *Added in version 3.4.*

### `devpoll.register(fd[, eventmask])`

Register a file descriptor with the polling object.  Future calls to the
`poll()` method will then check whether the file descriptor has any
pending I/O events.  *fd* can be either an integer, or an object with a
`fileno()` method that returns an integer.  File objects
implement `fileno()`, so they can also be used as the argument.

*eventmask* is an optional bitmask describing the type of events you want to
check for. The constants are the same as with `poll`
object. The default value is a combination of the constants `POLLIN`,
`POLLPRI`, and `POLLOUT`.

> **Warning:** Registering a file descriptor that's already registered is not an
> error, but the result is undefined. The appropriate action is to
> unregister or modify it first. This is an important difference
> compared with `poll`.

### `devpoll.modify(fd[, eventmask])`

This method does an `unregister()` followed by a
`register()`. It is (a bit) more efficient than doing the same
explicitly.

### `devpoll.unregister(fd)`

Remove a file descriptor being tracked by a polling object.  Just like the
`register()` method, *fd* can be an integer or an object with a
`fileno()` method that returns an integer.

Attempting to remove a file descriptor that was never registered is
safely ignored.

### `devpoll.poll([timeout])`

Polls the set of registered file descriptors, and returns a possibly empty list
containing `(fd, event)` 2-tuples for the descriptors that have events or
errors to report. *fd* is the file descriptor, and *event* is a bitmask with
bits set for the reported events for that descriptor --- `POLLIN` for
waiting input, `POLLOUT` to indicate that the descriptor can be written
to, and so forth. An empty list indicates that the call timed out and no file
descriptors had any events to report. If *timeout* is given, it specifies the
length of time in milliseconds which the system will wait for events before
returning. If *timeout* is omitted, -1, or `None`, the call will
block until there is an event for this poll object.

> *Changed in version 3.5.*
> The function is now retried with a recomputed timeout when interrupted by
> a signal, except if the signal handler raises an exception (see
> PEP 475 for the rationale), instead of raising
> `InterruptedError`.

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.

## Edge and level trigger polling (epoll) objects

https://linux.die.net/man/4/epoll

The *eventmask* is a bit mask using the following constants:

```text
+-------------------------+------------------------------------------------+
| Constant                | Meaning                                        |
+=========================+================================================+
| :const:`EPOLLIN`        | Available for read.                            |
+-------------------------+------------------------------------------------+
| :const:`EPOLLOUT`       | Available for write.                           |
+-------------------------+------------------------------------------------+
| :const:`EPOLLPRI`       | Urgent data for read.                          |
+-------------------------+------------------------------------------------+
| :const:`EPOLLERR`       | Error condition happened on the associated fd. |
+-------------------------+------------------------------------------------+
| :const:`EPOLLHUP`       | Hang up happened on the associated fd.         |
+-------------------------+------------------------------------------------+
| :const:`EPOLLET`        | Set Edge Trigger behavior, the default is      |
|                         | Level Trigger behavior.                        |
+-------------------------+------------------------------------------------+
| :const:`EPOLLONESHOT`   | Set one-shot behavior. After one event is      |
|                         | pulled out, the fd is internally disabled.     |
+-------------------------+------------------------------------------------+
| :const:`EPOLLEXCLUSIVE` | Wake only one epoll object when the            |
|                         | associated fd has an event. The default (if    |
|                         | this flag is not set) is to wake all epoll     |
|                         | objects polling on an fd.                      |
+-------------------------+------------------------------------------------+
| :const:`EPOLLRDHUP`     | Stream socket peer closed connection or shut   |
|                         | down writing half of connection.               |
+-------------------------+------------------------------------------------+
| :const:`EPOLLRDNORM`    | Equivalent to :const:`EPOLLIN`                 |
+-------------------------+------------------------------------------------+
| :const:`EPOLLRDBAND`    | Priority data band can be read.                |
+-------------------------+------------------------------------------------+
| :const:`EPOLLWRNORM`    | Equivalent to :const:`EPOLLOUT`.               |
+-------------------------+------------------------------------------------+
| :const:`EPOLLWRBAND`    | Priority data may be written.                  |
+-------------------------+------------------------------------------------+
| :const:`EPOLLMSG`       | Ignored.                                       |
+-------------------------+------------------------------------------------+
| :const:`EPOLLWAKEUP`    | Prevents sleep during event waiting.           |
+-------------------------+------------------------------------------------+
```

> *Added in version 3.6.*
> `EPOLLEXCLUSIVE` was added.  It's only supported by Linux Kernel 4.5
> or later.

> *Added in version 3.14.*
> `EPOLLWAKEUP` was added. It's only supported by Linux Kernel 3.5
> or later.

### `epoll.close()`

Close the control file descriptor of the epoll object.

### `epoll.closed`

`True` if the epoll object is closed.

### `epoll.fileno()`

Return the file descriptor number of the control fd.

### `epoll.fromfd(fd)`

Create an epoll object from a given file descriptor.

### `epoll.register(fd[, eventmask])`

Register a file descriptor *fd* with the epoll object.

### `epoll.modify(fd, eventmask)`

Modify a registered file descriptor *fd*.

### `epoll.unregister(fd)`

Remove a registered file descriptor from the epoll object.

> *Changed in version 3.9.*
> The method no longer ignores the `EBADF` error.

### `epoll.poll(timeout=None, maxevents=-1)`

Wait for events.
If *timeout* is given, it specifies the length of time in seconds
(may be non-integer) which the system will wait for events before returning.

> *Changed in version 3.5.*
> The function is now retried with a recomputed timeout when interrupted by
> a signal, except if the signal handler raises an exception (see
> PEP 475 for the rationale), instead of raising
> `InterruptedError`.

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.
