---
title: "Event loop (part 4 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio-eventloop.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Event loop (part 4 of 6)

### `loop.connect_accepted_socket(protocol_factory, \`

```python
sock, *, ssl=None, ssl_handshake_timeout=None, \
ssl_shutdown_timeout=None)
```

Wrap an already accepted connection into a transport/protocol pair.

This method can be used by servers that accept connections outside
of asyncio but that use asyncio to handle them.

Parameters:

- *protocol_factory* must be a callable returning a
protocol implementation.

- *sock* is a preexisting socket object returned from
`socket.accept()`.

> **Note:** The *sock* argument transfers ownership of the socket to the
> transport created. To close the socket, call the transport's
> `close()` method.

- *ssl* can be set to an `SSLContext` to enable SSL over
the accepted connections.

- *ssl_handshake_timeout* is (for an SSL connection) the time in seconds to
wait for the SSL handshake to complete before aborting the connection.
`60.0` seconds if `None` (default).

- *ssl_shutdown_timeout* is the time in seconds to wait for the SSL shutdown
to complete before aborting the connection. `30.0` seconds if `None`
(default).

Returns a `(transport, protocol)` pair.

> *Added in version 3.5.3.*

> *Changed in version 3.7.*
> Added the *ssl_handshake_timeout* parameter.

> *Changed in version 3.11.*
> Added the *ssl_shutdown_timeout* parameter.

### `loop.sendfile(transport, file, \`

```python
offset=0, count=None, *, fallback=True)
```

Send a *file* over a *transport*.  Return the total number of bytes
sent.

The method uses high-performance `os.sendfile()` if available.

*file* must be a regular file object opened in binary mode.

*offset* tells from where to start reading the file. If specified,
*count* is the total number of bytes to transmit as opposed to
sending the file until EOF is reached. File position is always updated,
even when this method raises an error, and
`file.tell()` can be used to obtain the actual
number of bytes sent.

*fallback* set to `True` makes asyncio to manually read and send
the file when the platform does not support the sendfile system call
(e.g. Windows or SSL socket on Unix).

Raise `SendfileNotAvailableError` if the system does not support
the *sendfile* syscall and *fallback* is `False`.

> *Added in version 3.7.*

### `loop.start_tls(transport, protocol, \`

```python
sslcontext, *, server_side=False, \
server_hostname=None, ssl_handshake_timeout=None, \
ssl_shutdown_timeout=None)
```

Upgrade an existing transport-based connection to TLS.

Create a TLS coder/decoder instance and insert it between the *transport*
and the *protocol*. The coder/decoder implements both *transport*-facing
protocol and *protocol*-facing transport.

Return the created two-interface instance. After *await*, the *protocol*
must stop using the original *transport* and communicate with the returned
object only because the coder caches *protocol*-side data and sporadically
exchanges extra TLS session packets with *transport*.

In some situations (e.g. when the passed transport is already closing) this
may return `None`.

Parameters:

- *transport* and *protocol* instances that methods like
`create_server()` and
`create_connection()` return.

- *sslcontext*: a configured instance of `SSLContext`.

- *server_side* pass `True` when a server-side connection is being
upgraded (like the one created by `create_server()`).

- *server_hostname*: sets or overrides the host name that the target
server's certificate will be matched against.

- *ssl_handshake_timeout* is (for a TLS connection) the time in seconds to
wait for the TLS handshake to complete before aborting the connection.
`60.0` seconds if `None` (default).

- *ssl_shutdown_timeout* is the time in seconds to wait for the SSL shutdown
to complete before aborting the connection. `30.0` seconds if `None`
(default).

> *Added in version 3.7.*

> *Changed in version 3.11.*
> Added the *ssl_shutdown_timeout* parameter.

### `loop.add_reader(fd, callback, *args)`

Start monitoring the *fd* file descriptor for read availability and
invoke *callback* with the specified arguments once *fd* is available for
reading.

Any preexisting callback registered for *fd* is cancelled and replaced by
*callback*.

### `loop.remove_reader(fd)`

Stop monitoring the *fd* file descriptor for read availability. Returns
`True` if *fd* was previously being monitored for reads.

### `loop.add_writer(fd, callback, *args)`

Start monitoring the *fd* file descriptor for write availability and
invoke *callback* with the specified arguments *args* once *fd* is
available for writing.

Any preexisting callback registered for *fd* is cancelled and replaced by
*callback*.

Use `functools.partial()` :ref:`to pass <example-value> arguments
<asyncio-pass-keywords>` to *callback*.

### `loop.remove_writer(fd)`

Stop monitoring the *fd* file descriptor for write availability. Returns
`True` if *fd* was previously being monitored for writes.

See also Platform Support section
for some limitations of these methods.

### Working with socket objects directly

In general, protocol implementations that use transport-based APIs
such as `loop.create_connection()` and `loop.create_server()`
are faster than implementations that work with sockets directly.
However, there are some use cases when performance is not critical, and
working with `socket` objects directly is more
convenient.

### `loop.sock_recv(sock, nbytes)`

Receive up to *nbytes* from *sock*.  Asynchronous version of
`socket.recv()`.

Return the received data as a bytes object.

*sock* must be a non-blocking socket.

> *Changed in version 3.7.*
> Even though this method was always documented as a coroutine
> method, releases before Python 3.7 returned a `Future`.
> Since Python 3.7 this is an `async def` method.

### `loop.sock_recv_into(sock, buf)`

Receive data from *sock* into the *buf* buffer.  Modeled after the blocking
`socket.recv_into()` method.

Return the number of bytes written to the buffer.

*sock* must be a non-blocking socket.

> *Added in version 3.7.*

### `loop.sock_recvfrom(sock, bufsize)`

Receive a datagram of up to *bufsize* from *sock*.  Asynchronous version of
`socket.recvfrom()`.

Return a tuple of (received data, remote address).

*sock* must be a non-blocking socket.

> *Added in version 3.11.*

### `loop.sock_recvfrom_into(sock, buf, nbytes=0)`

Receive a datagram of up to *nbytes* from *sock* into *buf*.
Asynchronous version of
`socket.recvfrom_into()`.

Return a tuple of (number of bytes received, remote address).

*sock* must be a non-blocking socket.

> *Added in version 3.11.*

### `loop.sock_sendall(sock, data)`

Send *data* to the *sock* socket. Asynchronous version of
`socket.sendall()`.

This method continues to send to the socket until either all data
in *data* has been sent or an error occurs.  `None` is returned
on success.  On error, an exception is raised. Additionally, there is no way
to determine how much data, if any, was successfully processed by the
receiving end of the connection.

*sock* must be a non-blocking socket.

> *Changed in version 3.7.*
> Even though the method was always documented as a coroutine
> method, before Python 3.7 it returned a `Future`.
> Since Python 3.7, this is an `async def` method.

### `loop.sock_sendto(sock, data, address)`

Send a datagram from *sock* to *address*.
Asynchronous version of
`socket.sendto()`.

Return the number of bytes sent.

*sock* must be a non-blocking socket.

> *Added in version 3.11.*

### `loop.sock_connect(sock, address)`

Connect *sock* to a remote socket at *address*.

Asynchronous version of `socket.connect()`.

*sock* must be a non-blocking socket.

With `SelectorEventLoop`, *address* does not need to be resolved:
for `AF_INET` and `AF_INET6` sockets,
`sock_connect` first checks whether *address* is already resolved by
calling `socket.inet_pton()`, and uses `loop.getaddrinfo()` to
resolve it if it is not.

`ProactorEventLoop`, the default event loop on Windows, does not
resolve *address*.  The host must already be a numeric IP address; passing
a host name raises `OSError`.  Resolve the address with
`loop.getaddrinfo()` first, or use `loop.create_connection()`,
which resolves the address on every platform.

> *Changed in version 3.5.2.*
> With `SelectorEventLoop`, `address` no longer needs to be
> resolved.

> **See also:** `loop.create_connection()`
> and  `asyncio.open_connection()`.

### `loop.sock_accept(sock)`

Accept a connection.  Modeled after the blocking
`socket.accept()` method.

The socket must be bound to an address and listening
for connections. The return value is a pair `(conn, address)` where *conn*
is a *new* socket object usable to send and receive data on the connection,
and *address* is the address bound to the socket on the other end of the
connection.

*sock* must be a non-blocking socket.

> *Changed in version 3.7.*
> Even though the method was always documented as a coroutine
> method, before Python 3.7 it returned a `Future`.
> Since Python 3.7, this is an `async def` method.

> **See also:** `loop.create_server()` and `start_server()`.

### `loop.sock_sendfile(sock, file, offset=0, count=None, \`

```python
*, fallback=True)
```

Send a file using high-performance `os.sendfile` if possible.
Return the total number of bytes sent.

Asynchronous version of `socket.sendfile()`.

*sock* must be a non-blocking `socket.SOCK_STREAM`
`socket`.

*file* must be a regular file object open in binary mode.

*offset* tells from where to start reading the file. If specified,
*count* is the total number of bytes to transmit as opposed to
sending the file until EOF is reached. File position is always updated,
even when this method raises an error, and
`file.tell()` can be used to obtain the actual
number of bytes sent.

*fallback*, when set to `True`, makes asyncio manually read and send
the file when the platform does not support the sendfile syscall
(e.g. Windows or SSL socket on Unix).

Raise `SendfileNotAvailableError` if the system does not support
*sendfile* syscall and *fallback* is `False`.

*sock* must be a non-blocking socket.

> *Added in version 3.7.*

### `loop.getaddrinfo(host, port, *, family=0, \`

```python
type=0, proto=0, flags=0)
```

Asynchronous version of `socket.getaddrinfo()`.

### `loop.getnameinfo(sockaddr, flags=0)`

Asynchronous version of `socket.getnameinfo()`.

> **Note:** Both *getaddrinfo* and *getnameinfo* internally utilize their synchronous
> versions through the loop's default thread pool executor.
> When this executor is saturated, these methods may experience delays,
> which higher-level networking libraries may report as increased timeouts.
> To mitigate this, consider using a custom executor for other user tasks,
> or setting a default executor with a larger number of workers.

> *Changed in version 3.7.*
> Both *getaddrinfo* and *getnameinfo* methods were always documented
> to return a coroutine, but prior to Python 3.7 they were, in fact,
> returning `asyncio.Future` objects.  Starting with Python 3.7
> both methods are coroutines.

### `loop.connect_read_pipe(protocol_factory, pipe)`

Register the read end of *pipe* in the event loop.

*protocol_factory* must be a callable returning an
asyncio protocol implementation.

*pipe* is a file-like object.  See
Supported pipe objects for the objects
supported as *pipe*.

Return pair `(transport, protocol)`, where *transport* supports
the `ReadTransport` interface and *protocol* is an object
instantiated by the *protocol_factory*.

With `SelectorEventLoop` event loop, the *pipe* is set to
non-blocking mode.

### `loop.connect_write_pipe(protocol_factory, pipe)`

Register the write end of *pipe* in the event loop.

*protocol_factory* must be a callable returning an
asyncio protocol implementation.

*pipe* is a file-like object.  See
Supported pipe objects for the objects
supported as *pipe*.

Return pair `(transport, protocol)`, where *transport* supports
`WriteTransport` interface and *protocol* is an object
instantiated by the *protocol_factory*.

With `SelectorEventLoop` event loop, the *pipe* is set to
non-blocking mode.

**Supported pipe objects**

These methods only work with objects the operating system can poll for
readiness or perform overlapped I/O on.  Regular files on disk are **not**
supported on any platform.  There is no asynchronous file I/O in asyncio;
use `loop.run_in_executor()` to read and write regular files without
blocking the event loop.

On Unix, with `SelectorEventLoop`, *pipe* must wrap one of the
following:

- a pipe, such as an end of an `os.pipe()` pair or a FIFO created with
`os.mkfifo()`;
- a socket;
- a character device, such as a terminal.

On Windows, where only `ProactorEventLoop` implements these methods,
*pipe* must wrap a handle opened for overlapped I/O (that is, created with the
`FILE_FLAG_OVERLAPPED` flag), since the handle has to be associated with an
I/O completion port.  Handles that were not opened for overlapped I/O are
rejected.  In particular, the standard streams (`sys.stdin`,
`sys.stdout` and `sys.stderr`), console handles, and the pipes
created by `os.pipe()` are **not** opened for overlapped I/O and therefore
cannot be used with these methods.

> **Note:** `SelectorEventLoop` does not support the above methods on
> Windows.  Use `ProactorEventLoop` instead for Windows.

> **See also:** The `loop.subprocess_exec()` and
> `loop.subprocess_shell()` methods.

### `loop.add_signal_handler(signum, callback, *args)`

Set *callback* as the handler for the *signum* signal,
passing *args* as positional arguments.

The callback will be invoked by *loop*, along with other queued callbacks
and runnable coroutines of that event loop. Unlike signal handlers
registered using `signal.signal()`, a callback registered with this
function is allowed to interact with the event loop.

Raise `ValueError` if the signal number is invalid or uncatchable.
Raise `RuntimeError` if there is a problem setting up the handler.

Use `functools.partial()` :ref:`to pass <example-value> arguments
<asyncio-pass-keywords>` to *callback*.

Like `signal.signal()`, this function must be invoked in the main
thread.

### `loop.remove_signal_handler(sig)`

Remove the handler for the *sig* signal.

Return `True` if the signal handler was removed, or `False` if
no handler was set for the given signal.

> **Availability:** Unix.

> **See also:** The `signal` module.
