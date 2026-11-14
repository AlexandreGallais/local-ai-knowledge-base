---
title: "socket --- Low-level networking interface (part 5 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/socket.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# socket --- Low-level networking interface (part 5 of 7)

## Socket Objects

### class `socket(family=AF_INET, type=SOCK_STREAM, proto=0, fileno=None)`

Create a new socket using the given address family, socket type and protocol
number.  The address family should be `AF_INET` (the default),
`AF_INET6`, `AF_UNIX`, `AF_CAN`, `AF_PACKET`,
or `AF_RDS`. The socket type should be `SOCK_STREAM` (the
default), `SOCK_DGRAM`, `SOCK_RAW` or perhaps one of the other
`SOCK_` constants. The protocol number is usually zero and may be omitted
or in the case where the address family is `AF_CAN` the protocol
should be one of `CAN_RAW`, `CAN_BCM`, `CAN_ISOTP` or
`CAN_J1939`.

If *fileno* is specified, the values for *family*, *type*, and *proto* are
auto-detected from the specified file descriptor.  Auto-detection can be
overruled by calling the function with explicit *family*, *type*, or *proto*
arguments.  This only affects how Python represents e.g. the return value
of `socket.getpeername()` but not the actual OS resource.  Unlike
`socket.fromfd()`, *fileno* will return the same socket and not a
duplicate. This may help close a detached socket using
`close()`.

The newly created socket is non-inheritable.

> *Changed in version 3.3.*
> The AF_CAN family was added.
> The AF_RDS family was added.

> *Changed in version 3.4.*
> The CAN_BCM protocol was added.

> *Changed in version 3.4.*
> The returned socket is now non-inheritable.

> *Changed in version 3.7.*
> The CAN_ISOTP protocol was added.

> *Changed in version 3.7.*
> When `SOCK_NONBLOCK` or `SOCK_CLOEXEC`
> bit flags are applied to *type* they are cleared, and
> `socket.type` will not reflect them.  They are still passed
> to the underlying system `socket()` call.  Therefore,
>
>
> ```
> sock = socket.socket(
>     socket.AF_INET,
>     socket.SOCK_STREAM | socket.SOCK_NONBLOCK)
> ```
>
>
> will still create a non-blocking socket on OSes that support
> `SOCK_NONBLOCK`, but `sock.type` will be set to
> `socket.SOCK_STREAM`.

> *Changed in version 3.9.*
> The CAN_J1939 protocol was added.

> *Changed in version 3.10.*
> The IPPROTO_MPTCP protocol was added.

Socket objects have the following methods.  Except for
`makefile()`, these correspond to Unix system calls applicable
to sockets.

> *Changed in version 3.2.*
> Support for the context manager protocol was added.  Exiting the
> context manager is equivalent to calling `close()`.

### `accept()`

Accept a connection. The socket must be bound to an address and listening for
connections. The return value is a pair `(conn, address)` where *conn* is a
*new* socket object usable to send and receive data on the connection, and
*address* is the address bound to the socket on the other end of the connection.

The newly created socket is non-inheritable.

> *Changed in version 3.4.*
> The socket is now non-inheritable.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise
> an exception, the method now retries the system call instead of raising
> an `InterruptedError` exception (see PEP 475 for the rationale).

### `bind(address)`

Bind the socket to *address*.  The socket must not already be bound. The format
of *address* depends on the address family --- see socket-addresses.

> **Availability:** not WASI.

### `close()`

Mark the socket closed.  The underlying system resource (e.g. a file
descriptor) is also closed when all file objects from `makefile()`
are closed.  Once that happens, all future operations on the socket
object will fail. The remote end will receive no more data (after
queued data is flushed).

Sockets are automatically closed when they are garbage-collected, but
it is recommended to `close()` them explicitly, or to use a
`with` statement around them.

> *Changed in version 3.6.*
> `OSError` is now raised if an error occurs when the underlying
> `close` call is made.

> **Note:** `close()` releases the resource associated with a connection but
> does not necessarily close the connection immediately.  If you want
> to close the connection in a timely fashion, call `shutdown()`
> before `close()`.

### `connect(address)`

Connect to a remote socket at *address*. The format of *address* depends on the
address family --- see socket-addresses.

If the connection is interrupted by a signal, the method waits until the
connection completes, or raises a `TimeoutError` on timeout, if the
signal handler doesn't raise an exception and the socket is blocking or has
a timeout. For non-blocking sockets, the method raises an
`InterruptedError` exception if the connection is interrupted by a
signal (or the exception raised by the signal handler).

> *Changed in version 3.5.*
> The method now waits until the connection completes instead of raising an
> `InterruptedError` exception if the connection is interrupted by a
> signal, the signal handler doesn't raise an exception and the socket is
> blocking or has a timeout (see the PEP 475 for the rationale).

> **Availability:** not WASI.

### `connect_ex(address)`

Like `connect(address)`, but return an error indicator instead of raising an
exception for errors returned by the C-level `connect` call (other
problems, such as "host not found," can still raise exceptions).  The error
indicator is `0` if the operation succeeded, otherwise the value of the
`errno` variable.  This is useful to support, for example, asynchronous
connects.

> **Availability:** not WASI.

### `detach()`

Put the socket object into closed state without actually closing the
underlying file descriptor.  The file descriptor is returned, and can
be reused for other purposes.

> *Added in version 3.2.*

### `dup()`

Duplicate the socket.

The newly created socket is non-inheritable.

> *Changed in version 3.4.*
> The socket is now non-inheritable.

> **Availability:** not WASI.

### `fileno()`

Return the socket's file descriptor (a small integer), or -1 on failure. This
is useful with `select.select()`.

Under Windows the small integer returned by this method cannot be used where a
file descriptor can be used (such as `os.fdopen()`).  Unix does not have
this limitation.

### `get_inheritable()`

Get the inheritable flag of the socket's file
descriptor or socket's handle: `True` if the socket can be inherited in
child processes, `False` if it cannot.

> *Added in version 3.4.*

### `getpeername()`

Return the remote address to which the socket is connected.  This is useful to
find out the port number of a remote IPv4/v6 socket, for instance. The format
of the address returned depends on the address family --- see socket-addresses.
On some systems this function is not supported.

### `getsockname()`

Return the socket's own address.  This is useful to find out the port number of
an IPv4/v6 socket, for instance. The format of the address returned depends on
the address family --- see socket-addresses.

### `getsockopt(level, optname[, buflen])`

Return the value of the given socket option (see the Unix man page
getsockopt(2)).  The needed symbolic constants (SO_* etc.)
are defined in this module.  If *buflen* is absent, an integer option is assumed
and its integer value is returned by the function.  If *buflen* is present, it
specifies the maximum length of the buffer used to receive the option in, and
this buffer is returned as a bytes object.  It is up to the caller to decode the
contents of the buffer (see the optional built-in module `struct` for a way
to decode C structures encoded as byte strings).

> **Availability:** not WASI.

### `getblocking()`

Return `True` if socket is in blocking mode, `False` if in
non-blocking.

This is equivalent to checking `socket.gettimeout() != 0`.

> *Added in version 3.7.*

### `gettimeout()`

Return the timeout in seconds (float) associated with socket operations,
or `None` if no timeout is set.  This reflects the last call to
`setblocking()` or `settimeout()`.

### `ioctl(control, option)`

The `ioctl()` method is a limited interface to the WSAIoctl system
interface.  Please refer to the `Win32 documentation
<https://msdn.microsoft.com/en-us/library/ms741621%28VS.85%29.aspx>`_ for more
information.

On other platforms, the generic `fcntl.fcntl()` and `fcntl.ioctl()`
functions may be used; they accept a socket object as their first argument.

Currently only the following control codes are supported:
`SIO_RCVALL`, `SIO_KEEPALIVE_VALS`, and `SIO_LOOPBACK_FAST_PATH`.

> **Availability:** Windows

> *Changed in version 3.6.*
> `SIO_LOOPBACK_FAST_PATH` was added.

### `listen([backlog])`

Enable a server to accept connections.  If *backlog* is specified, it must
be at least 0 (if it is lower, it is set to 0); it specifies the number of
unaccepted connections that the system will allow before refusing new
connections. If not specified, a default reasonable value is chosen.

> **Availability:** not WASI.

> *Changed in version 3.5.*
> The *backlog* parameter is now optional.

### `makefile(mode='r', buffering=None, *, encoding=None, \`

```python
errors=None, newline=None)
```

Return a file object associated with the socket.  The exact returned
type depends on the arguments given to `makefile()`.  These arguments are
interpreted the same way as by the built-in `open()` function, except
the only supported *mode* values are `'r'` (default), `'w'`, `'b'`, or
a combination of those.

The socket must be in blocking mode; it can have a timeout, but the file
object's internal buffer may end up in an inconsistent state if a timeout
occurs.

Closing the file object returned by `makefile()` won't close the
original socket unless all other file objects have been closed and
`close()` has been called on the socket object.

> **Note:** On Windows, the file-like object created by `makefile()` cannot be
> used where a file object with a file descriptor is expected, such as the
> stream arguments of `subprocess.Popen()`.

### `recv(bufsize[, flags])`

Receive data from the socket.  The return value is a bytes object representing the
data received.  The maximum amount of data to be received at once is specified
by *bufsize*. A returned empty bytes object indicates that the client has disconnected.
See the Unix manual page recv(2) for the meaning of the optional argument
*flags*; it defaults to zero.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise
> an exception, the method now retries the system call instead of raising
> an `InterruptedError` exception (see PEP 475 for the rationale).

### `recvfrom(bufsize[, flags])`

Receive data from the socket.  The return value is a pair `(bytes, address)`
where *bytes* is a bytes object representing the data received and *address* is the
address of the socket sending the data.  See the Unix manual page
recv(2) for the meaning of the optional argument *flags*; it defaults
to zero. The format of *address* depends on the address family --- see
socket-addresses.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise
> an exception, the method now retries the system call instead of raising
> an `InterruptedError` exception (see PEP 475 for the rationale).

> *Changed in version 3.7.*
> For multicast IPv6 address, first item of *address* does not contain
> `%scope_id` part anymore. In order to get full IPv6 address use
> `getnameinfo()`.

### `recvmsg(bufsize[, ancbufsize[, flags]])`

Receive normal data (up to *bufsize* bytes) and ancillary data from
the socket.  The *ancbufsize* argument sets the size in bytes of
the internal buffer used to receive the ancillary data; it defaults
to 0, meaning that no ancillary data will be received.  Appropriate
buffer sizes for ancillary data can be calculated using
`CMSG_SPACE()` or `CMSG_LEN()`, and items which do not fit
into the buffer might be truncated or discarded.  The *flags*
argument defaults to 0 and has the same meaning as for
`recv()`.

The return value is a 4-tuple: ``(data, ancdata, msg_flags,
address)``.  The *data* item is a `bytes` object holding the
non-ancillary data received.  The *ancdata* item is a list of zero
or more tuples `(cmsg_level, cmsg_type, cmsg_data)` representing
the ancillary data (control messages) received: *cmsg_level* and
*cmsg_type* are integers specifying the protocol level and
protocol-specific type respectively, and *cmsg_data* is a
`bytes` object holding the associated data.  The *msg_flags*
item is the bitwise OR of various flags indicating conditions on
the received message; see your system documentation for details.
If the receiving socket is unconnected, *address* is the address of
the sending socket, if available; otherwise, its value is
unspecified.

On some systems, `sendmsg()` and `recvmsg()` can be used to
pass file descriptors between processes over an `AF_UNIX`
socket.  When this facility is used (it is often restricted to
`SOCK_STREAM` sockets), `recvmsg()` will return, in its
ancillary data, items of the form ``(socket.SOL_SOCKET,
socket.SCM_RIGHTS, fds)``, where *fds* is a `bytes` object
representing the new file descriptors as a binary array of the
native C `int` type.  If `recvmsg()` raises an
exception after the system call returns, it will first attempt to
close any file descriptors received via this mechanism.

Some systems do not indicate the truncated length of ancillary data
items which have been only partially received.  If an item appears
to extend beyond the end of the buffer, `recvmsg()` will issue
a `RuntimeWarning`, and will return the part of it which is
inside the buffer provided it has not been truncated before the
start of its associated data.

On systems which support the `SCM_RIGHTS` mechanism, the
following function will receive up to *maxfds* file descriptors,
returning the message data and a list containing the descriptors
(while ignoring unexpected conditions such as unrelated control
messages being received).  See also `sendmsg()`.:

```
import socket, array

def recv_fds(sock, msglen, maxfds):
    fds = array.array("i")   # Array of ints
    msg, ancdata, flags, addr = sock.recvmsg(msglen, socket.CMSG_LEN(maxfds * fds.itemsize))
    for cmsg_level, cmsg_type, cmsg_data in ancdata:
        if cmsg_level == socket.SOL_SOCKET and cmsg_type == socket.SCM_RIGHTS:
            # Append data, ignoring any truncated integers at the end.
            fds.frombytes(cmsg_data[:len(cmsg_data) - (len(cmsg_data) % fds.itemsize)])
    return msg, list(fds)
```

> **Availability:** Unix.
>
> Most Unix platforms.

> *Added in version 3.3.*

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise
> an exception, the method now retries the system call instead of raising
> an `InterruptedError` exception (see PEP 475 for the rationale).
