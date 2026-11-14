---
title: "socket --- Low-level networking interface (part 6 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/socket.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# socket --- Low-level networking interface (part 6 of 7)

### `recvmsg_into(buffers[, ancbufsize[, flags]])`

Receive normal data and ancillary data from the socket, behaving as
`recvmsg()` would, but scatter the non-ancillary data into a
series of buffers instead of returning a new bytes object.  The
*buffers* argument must be an iterable of objects that export
writable buffers (e.g. `bytearray` objects); these will be
filled with successive chunks of the non-ancillary data until it
has all been written or there are no more buffers.  The operating
system may set a limit (`sysconf()` value `SC_IOV_MAX`)
on the number of buffers that can be used.  The *ancbufsize* and
*flags* arguments have the same meaning as for `recvmsg()`.

The return value is a 4-tuple: ``(nbytes, ancdata, msg_flags,
address)``, where *nbytes* is the total number of bytes of
non-ancillary data written into the buffers, and *ancdata*,
*msg_flags* and *address* are the same as for `recvmsg()`.

Example:

```
>>> import socket
>>> s1, s2 = socket.socketpair()
>>> b1 = bytearray(b'----')
>>> b2 = bytearray(b'0123456789')
>>> b3 = bytearray(b'--------------')
>>> s1.send(b'Mary had a little lamb')
22
>>> s2.recvmsg_into([b1, memoryview(b2)[2:9], b3])
(22, [], 0, None)
>>> [b1, b2, b3]
[bytearray(b'Mary'), bytearray(b'01 had a 9'), bytearray(b'little lamb---')]
```

> **Availability:** Unix.
>
> Most Unix platforms.

> *Added in version 3.3.*

### `recvfrom_into(buffer[, nbytes[, flags]])`

Receive data from the socket, writing it into *buffer* instead of creating a
new bytestring.  The return value is a pair `(nbytes, address)` where *nbytes* is
the number of bytes received and *address* is the address of the socket sending
the data.  See the Unix manual page recv(2) for the meaning of the
optional argument *flags*; it defaults to zero. The format of *address*
depends on the address family --- see socket-addresses.

### `recv_into(buffer[, nbytes[, flags]])`

Receive up to *nbytes* bytes from the socket, storing the data into a buffer
rather than creating a new bytestring.  If *nbytes* is not specified (or 0),
receive up to the size available in the given buffer.  Returns the number of
bytes received.  See the Unix manual page recv(2) for the meaning
of the optional argument *flags*; it defaults to zero.

### `send(bytes[, flags])`

Send data to the socket.  The socket must be connected to a remote socket.  The
optional *flags* argument has the same meaning as for `recv()`.
Returns the number of bytes sent. Applications are responsible for checking that
all data has been sent; if only some of the data was transmitted, the
application needs to attempt delivery of the remaining data. For further
information on this topic, consult the socket-howto.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise
> an exception, the method now retries the system call instead of raising
> an `InterruptedError` exception (see PEP 475 for the rationale).

### `sendall(bytes[, flags])`

Send data to the socket.  The socket must be connected to a remote socket.  The
optional *flags* argument has the same meaning as for `recv()`.
Unlike `send()`, this method continues to send data from *bytes* until
either all data has been sent or an error occurs.  `None` is returned on
success.  On error, an exception is raised, and there is no way to determine how
much data, if any, was successfully sent.

> *Changed in version 3.5.*
> The socket timeout is no longer reset each time data is sent successfully.
> The socket timeout is now the maximum total duration to send all data.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise
> an exception, the method now retries the system call instead of raising
> an `InterruptedError` exception (see PEP 475 for the rationale).

### `sendto(bytes, address)`

```python
sendto(bytes, flags, address)
```

Send data to the socket.  The socket should not be connected to a remote socket,
since the destination socket is specified by *address*.  The optional *flags*
argument has the same meaning as for `recv()`.  Return the number of
bytes sent. The format of *address* depends on the address family --- see
socket-addresses.

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise
> an exception, the method now retries the system call instead of raising
> an `InterruptedError` exception (see PEP 475 for the rationale).

### `sendmsg(buffers[, ancdata[, flags[, address]]])`

Send normal and ancillary data to the socket, gathering the
non-ancillary data from a series of buffers and concatenating it
into a single message.  The *buffers* argument specifies the
non-ancillary data as an iterable of
bytes-like objects
(e.g. `bytes` objects); the operating system may set a limit
(`sysconf()` value `SC_IOV_MAX`) on the number of buffers
that can be used.  The *ancdata* argument specifies the ancillary
data (control messages) as an iterable of zero or more tuples
`(cmsg_level, cmsg_type, cmsg_data)`, where *cmsg_level* and
*cmsg_type* are integers specifying the protocol level and
protocol-specific type respectively, and *cmsg_data* is a
bytes-like object holding the associated data.  Note that
some systems (in particular, systems without `CMSG_SPACE()`)
might support sending only one control message per call.  The
*flags* argument defaults to 0 and has the same meaning as for
`send()`.  If *address* is supplied and not `None`, it sets a
destination address for the message.  The return value is the
number of bytes of non-ancillary data sent.

The following function sends the list of file descriptors *fds*
over an `AF_UNIX` socket, on systems which support the
`SCM_RIGHTS` mechanism.  See also `recvmsg()`.:

```
import socket, array

def send_fds(sock, msg, fds):
    return sock.sendmsg([msg], [(socket.SOL_SOCKET, socket.SCM_RIGHTS, array.array("i", fds))])
```

> **Availability:** Unix, not WASI.
>
> Most Unix platforms.

> *Added in version 3.3.*

> *Changed in version 3.5.*
> If the system call is interrupted and the signal handler does not raise
> an exception, the method now retries the system call instead of raising
> an `InterruptedError` exception (see PEP 475 for the rationale).

### `sendmsg_afalg([msg], *, op[, iv[, assoclen[, flags]]])`

Specialized version of `sendmsg()` for `AF_ALG` socket.
Set mode, IV, AEAD associated data length and flags for `AF_ALG` socket.

> **Availability:** Linux >= 2.6.38.

> *Added in version 3.6.*

### `sendfile(file, offset=0, count=None)`

Send a file until EOF is reached by using high-performance
`os.sendfile` and return the total number of bytes which were sent.
*file* must be a regular file object opened in binary mode. If
`os.sendfile` is not available (e.g. Windows) or *file* is not a
regular file `send()` will be used instead. *offset* tells from where to
start reading the file. If specified, *count* is the total number of bytes
to transmit as opposed to sending the file until EOF is reached. File
position is updated on return or also in case of error in which case
`file.tell()` can be used to figure out the number of
bytes which were sent. The socket must be of `SOCK_STREAM` type.
Non-blocking sockets are not supported.

> *Added in version 3.5.*

### `set_inheritable(inheritable)`

Set the inheritable flag of the socket's file
descriptor or socket's handle.

> *Added in version 3.4.*

### `setblocking(flag)`

Set blocking or non-blocking mode of the socket: if *flag* is false, the
socket is set to non-blocking, else to blocking mode.

This method is a shorthand for certain `settimeout()` calls:

- `sock.setblocking(True)` is equivalent to `sock.settimeout(None)`

- `sock.setblocking(False)` is equivalent to `sock.settimeout(0.0)`

> *Changed in version 3.7.*
> The method no longer applies `SOCK_NONBLOCK` flag on
> `socket.type`.

### `settimeout(value)`

Set a timeout on blocking socket operations.  The *value* argument can be a
nonnegative real number expressing seconds, or `None`.
If a non-zero value is given, subsequent socket operations will raise a
`timeout` exception if the timeout period *value* has elapsed before
the operation has completed.  If zero is given, the socket is put in
non-blocking mode. If `None` is given, the socket is put in blocking mode.

For further information, please consult the notes on socket timeouts.

> *Changed in version 3.7.*
> The method no longer toggles `SOCK_NONBLOCK` flag on
> `socket.type`.

> *Changed in version 3.15.*
> Accepts any real number, not only integer or float.

### `setsockopt(level, optname, value: int | Buffer)`

```python
setsockopt(level, optname, None, optlen: int)
```

Set the value of the given socket option (see the Unix manual page
setsockopt(2)).  The needed symbolic constants are defined in this
module (SO_* etc.).  The value can be an integer,
`None` or a bytes-like object representing a buffer. In the latter
case it is up to the caller to ensure that the bytestring contains the
proper bits (see the optional built-in module `struct` for a way to
encode C structures as bytestrings). When *value* is set to `None`,
*optlen* argument is required. It's equivalent to calling `setsockopt` C
function with `optval=NULL` and `optlen=optlen`.

> *Changed in version 3.5.*
> Writable bytes-like object is now accepted.

> *Changed in version 3.6.*
> setsockopt(level, optname, None, optlen: int) form added.

> **Availability:** not WASI.

### `shutdown(how)`

Shut down one or both halves of the connection.  If *how* is `SHUT_RD`,
further receives are disallowed.  If *how* is `SHUT_WR`, further sends
are disallowed.  If *how* is `SHUT_RDWR`, further sends and receives are
disallowed.

> **Availability:** not WASI.

### `share(process_id)`

Duplicate a socket and prepare it for sharing with a target process.  The
target process must be provided with *process_id*.  The resulting bytes object
can then be passed to the target process using some form of interprocess
communication and the socket can be recreated there using `fromshare()`.
Once this method has been called, it is safe to close the socket since
the operating system has already duplicated it for the target process.

> **Availability:** Windows.

> *Added in version 3.3.*

Note that there are no methods `read()` or `write()`; use
`recv()` and `send()` without *flags* argument instead.

Socket objects also have these (read-only) attributes that correspond to the
values given to the `socket` constructor.

### `family`

The socket family.

### `type`

The socket type.

### `proto`

The socket protocol.

### class `SocketType`

The base class of the `socket` type, re-exported from
`_socket`.  An instance check such as
`isinstance(socket(...), SocketType)` is true, but `SocketType` is not
the same as `type(socket(...))`, which is `socket` itself.

## Notes on socket timeouts

A socket object can be in one of three modes: blocking, non-blocking, or
timeout.  Sockets are by default always created in blocking mode, but this
can be changed by calling `setdefaulttimeout()`.

- In *blocking mode*, operations block until complete or the system returns
an error (such as connection timed out).

- In *non-blocking mode*, operations fail (with an error that is unfortunately
system-dependent) if they cannot be completed immediately: functions from the
`select` module can be used to know when and whether a socket is available
for reading or writing.

- In *timeout mode*, operations fail if they cannot be completed within the
timeout specified for the socket (they raise a `timeout` exception)
or if the system returns an error.

> **Note:** At the operating system level, sockets in *timeout mode* are internally set
> in non-blocking mode.  Also, the blocking and timeout modes are shared between
> file descriptors and socket objects that refer to the same network endpoint.
> This implementation detail can have visible consequences if e.g. you decide
> to use the `fileno()` of a socket.

### Timeouts and the `connect` method

The `connect()` operation is also subject to the timeout
setting, and in general it is recommended to call `settimeout()`
before calling `connect()` or pass a timeout parameter to
`create_connection()`.  However, the system network stack may also
return a connection timeout error of its own regardless of any Python socket
timeout setting.

### Timeouts and the `accept` method

If `getdefaulttimeout()` is not `None`, sockets returned by
the `accept()` method inherit that timeout.  Otherwise, the
behaviour depends on settings of the listening socket:

- if the listening socket is in *blocking mode* or in *timeout mode*,
the socket returned by `accept()` is in *blocking mode*;

- if the listening socket is in *non-blocking mode*, whether the socket
returned by `accept()` is in blocking or non-blocking mode
is operating system-dependent.  If you want to ensure cross-platform
behaviour, it is recommended you manually override this setting.
