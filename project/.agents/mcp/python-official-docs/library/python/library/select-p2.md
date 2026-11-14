---
title: "select --- Waiting for I/O completion (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/select.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# select --- Waiting for I/O completion (part 2 of 2)

## Polling objects

The `poll` system call, supported on most Unix systems, provides better
scalability for network servers that service many, many clients at the same
time. `poll` scales better because the system call only requires listing
the file descriptors of interest, while `select` builds a bitmap, turns
on bits for the fds of interest, and then afterward the whole bitmap has to be
linearly scanned again. `select` is *O*(*highest file descriptor*), while
`poll` is *O*(*number of file descriptors*).

### `poll.register(fd[, eventmask])`

Register a file descriptor with the polling object.  Future calls to the
`poll()` method will then check whether the file descriptor has any
pending I/O events.  *fd* can be either an integer, or an object with a
`fileno()` method that returns an integer.  File objects
implement `fileno()`, so they can also be used as the argument.

*eventmask* is an optional bitmask describing the type of events you want to
check for, and can be a combination of the constants `POLLIN`,
`POLLPRI`, and `POLLOUT`, described in the table below.  If not
specified, the default value used will check for all 3 types of events.

```text
+-------------------+-------------------------------------------+
| Constant          | Meaning                                   |
+===================+===========================================+
| :const:`POLLIN`   | There is data to read.                    |
+-------------------+-------------------------------------------+
| :const:`POLLPRI`  | There is urgent data to read.             |
+-------------------+-------------------------------------------+
| :const:`POLLOUT`  | Ready for output: writing will not block. |
+-------------------+-------------------------------------------+
| :const:`POLLERR`  | Error condition of some sort.             |
+-------------------+-------------------------------------------+
| :const:`POLLHUP`  | Hung up.                                  |
+-------------------+-------------------------------------------+
| :const:`POLLRDHUP`| Stream socket peer closed connection, or  |
|                   | shut down writing half of connection.     |
+-------------------+-------------------------------------------+
| :const:`POLLNVAL` | Invalid request: descriptor not open.     |
+-------------------+-------------------------------------------+
```

Registering a file descriptor that's already registered is not an error, and has
the same effect as registering the descriptor exactly once.

### `poll.modify(fd, eventmask)`

Modifies an already registered fd. This has the same effect as
`register(fd, eventmask)`.  Attempting to modify a file descriptor
that was never registered causes an `OSError` exception with errno
`ENOENT` to be raised.

### `poll.unregister(fd)`

Remove a file descriptor being tracked by a polling object.  Just like the
`register()` method, *fd* can be an integer or an object with a
`fileno()` method that returns an integer.

Attempting to remove a file descriptor that was never registered causes a
`KeyError` exception to be raised.

### `poll.poll([timeout])`

Polls the set of registered file descriptors, and returns a possibly empty list
containing `(fd, event)` 2-tuples for the descriptors that have events or
errors to report. *fd* is the file descriptor, and *event* is a bitmask with
bits set for the reported events for that descriptor --- `POLLIN` for
waiting input, `POLLOUT` to indicate that the descriptor can be written
to, and so forth. An empty list indicates that the call timed out and no file
descriptors had any events to report. If *timeout* is given, it specifies the
length of time in milliseconds which the system will wait for events before
returning. If *timeout* is omitted, negative, or `None`, the call will
block until there is an event for this poll object.

> *Changed in version 3.5.*
> The function is now retried with a recomputed timeout when interrupted by
> a signal, except if the signal handler raises an exception (see
> PEP 475 for the rationale), instead of raising
> `InterruptedError`.

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.
> If `ppoll()` function is available, *timeout* has a resolution
> of `1` ns (`1e-6` ms) instead of `1` ms.

## Kqueue objects

### `kqueue.close()`

Close the control file descriptor of the kqueue object.

### `kqueue.closed`

`True` if the kqueue object is closed.

### `kqueue.fileno()`

Return the file descriptor number of the control fd.

### `kqueue.fromfd(fd)`

Create a kqueue object from a given file descriptor.

### `kqueue.control(changelist, max_events[, timeout]) -> eventlist`

Low level interface to kevent

- changelist must be an iterable of kevent objects or `None`
- max_events must be 0 or a positive integer
- timeout in seconds (non-integers are possible); the default is `None`,
to wait forever

> *Changed in version 3.5.*
> The function is now retried with a recomputed timeout when interrupted by
> a signal, except if the signal handler raises an exception (see
> PEP 475 for the rationale), instead of raising
> `InterruptedError`.

> *Changed in version 3.15.*
> Accepts any real number as *timeout*, not only integer or float.

## Kevent objects

https://man.freebsd.org/cgi/man.cgi?query=kqueue&sektion=2

### `kevent.ident`

Value used to identify the event. The interpretation depends on the filter
but it's usually the file descriptor. In the constructor ident can either
be an int or an object with a `fileno()` method. kevent
stores the integer internally.

### `kevent.filter`

Name of the kernel filter.

```text
+---------------------------+---------------------------------------------+
| Constant                  | Meaning                                     |
+===========================+=============================================+
| :const:`KQ_FILTER_READ`   | Takes a descriptor and returns whenever     |
|                           | there is data available to read.            |
+---------------------------+---------------------------------------------+
| :const:`KQ_FILTER_WRITE`  | Takes a descriptor and returns whenever     |
|                           | there is data available to write.           |
+---------------------------+---------------------------------------------+
| :const:`KQ_FILTER_AIO`    | AIO requests.                               |
+---------------------------+---------------------------------------------+
| :const:`KQ_FILTER_VNODE`  | Returns when one or more of the requested   |
|                           | events watched in *fflag* occurs.           |
+---------------------------+---------------------------------------------+
| :const:`KQ_FILTER_PROC`   | Watch for events on a process ID.           |
+---------------------------+---------------------------------------------+
| :const:`KQ_FILTER_NETDEV` | Watch for events on a network device        |
|                           | (not available on macOS).                   |
+---------------------------+---------------------------------------------+
| :const:`KQ_FILTER_SIGNAL` | Returns whenever the watched signal is      |
|                           | delivered to the process.                   |
+---------------------------+---------------------------------------------+
| :const:`KQ_FILTER_TIMER`  | Establishes an arbitrary timer.             |
+---------------------------+---------------------------------------------+
```

### `kevent.flags`

Filter action.

```text
+---------------------------+----------------------------------------------+
| Constant                  | Meaning                                      |
+===========================+==============================================+
| :const:`KQ_EV_ADD`        | Adds or modifies an event.                   |
+---------------------------+----------------------------------------------+
| :const:`KQ_EV_DELETE`     | Removes an event from the queue.             |
+---------------------------+----------------------------------------------+
| :const:`KQ_EV_ENABLE`     | Permits control() to return the event.       |
+---------------------------+----------------------------------------------+
| :const:`KQ_EV_DISABLE`    | Disables event.                              |
+---------------------------+----------------------------------------------+
| :const:`KQ_EV_ONESHOT`    | Removes event after first occurrence.        |
+---------------------------+----------------------------------------------+
| :const:`KQ_EV_CLEAR`      | Reset the state after an event is retrieved. |
+---------------------------+----------------------------------------------+
| :const:`KQ_EV_SYSFLAGS`   | Internal event.                              |
+---------------------------+----------------------------------------------+
| :const:`KQ_EV_FLAG1`      | Internal event.                              |
+---------------------------+----------------------------------------------+
| :const:`KQ_EV_EOF`        | Filter-specific EOF condition.               |
+---------------------------+----------------------------------------------+
| :const:`KQ_EV_ERROR`      | See return values.                           |
+---------------------------+----------------------------------------------+
```

### `kevent.fflags`

Filter-specific flags.

`KQ_FILTER_READ` and  `KQ_FILTER_WRITE` filter flags:

```text
+----------------------------+--------------------------------------------+
| Constant                   | Meaning                                    |
+============================+============================================+
| :const:`KQ_NOTE_LOWAT`     | Low water mark of a socket buffer.         |
+----------------------------+--------------------------------------------+
```

`KQ_FILTER_VNODE` filter flags:

```text
+----------------------------+--------------------------------------------+
| Constant                   | Meaning                                    |
+============================+============================================+
| :const:`KQ_NOTE_DELETE`    | *unlink()* was called.                     |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_WRITE`     | A write occurred.                          |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_EXTEND`    | The file was extended.                     |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_ATTRIB`    | An attribute was changed.                  |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_LINK`      | The link count has changed.                |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_RENAME`    | The file was renamed.                      |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_REVOKE`    | Access to the file was revoked.            |
+----------------------------+--------------------------------------------+
```

`KQ_FILTER_PROC` filter flags:

```text
+----------------------------+--------------------------------------------+
| Constant                   | Meaning                                    |
+============================+============================================+
| :const:`KQ_NOTE_EXIT`      | The process has exited.                    |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_FORK`      | The process has called *fork()*.           |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_EXEC`      | The process has executed a new process.    |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_PCTRLMASK` | Internal filter flag.                      |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_PDATAMASK` | Internal filter flag.                      |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_TRACK`     | Follow a process across *fork()*.          |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_CHILD`     | Returned on the child process for          |
|                            | *NOTE_TRACK*.                              |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_TRACKERR`  | Unable to attach to a child.               |
+----------------------------+--------------------------------------------+
```

`KQ_FILTER_NETDEV` filter flags (not available on macOS):

```text
+----------------------------+--------------------------------------------+
| Constant                   | Meaning                                    |
+============================+============================================+
| :const:`KQ_NOTE_LINKUP`    | Link is up.                                |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_LINKDOWN`  | Link is down.                              |
+----------------------------+--------------------------------------------+
| :const:`KQ_NOTE_LINKINV`   | Link state is invalid.                     |
+----------------------------+--------------------------------------------+
```

### `kevent.data`

Filter-specific data.

### `kevent.udata`

User-defined value.
