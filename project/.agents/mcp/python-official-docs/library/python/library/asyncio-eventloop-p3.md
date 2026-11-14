---
title: "Event loop (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio-eventloop.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Event loop (part 3 of 6)

### `loop.create_connection(protocol_factory, \`

```python
host=None, port=None, *, ssl=None, \
family=0, proto=0, flags=0, sock=None, \
local_addr=None, server_hostname=None, \
ssl_handshake_timeout=None, \
ssl_shutdown_timeout=None, \
happy_eyeballs_delay=None, interleave=None, \
all_errors=False)
```

Open a streaming transport connection to a given
address specified by *host* and *port*.

The socket family can be either `AF_INET` or
`AF_INET6` depending on *host* (or the *family*
argument, if provided).

The socket type will be `SOCK_STREAM`.

*protocol_factory* must be a callable returning an
asyncio protocol implementation.

This method will try to establish the connection in the background.
When successful, it returns a `(transport, protocol)` pair.

The chronological synopsis of the underlying operation is as follows:

1. The connection is established and a transport
is created for it.

1. *protocol_factory* is called without arguments and is expected to
return a protocol instance.

1. The protocol instance is coupled with the transport by calling its
`connection_made()` method.

1. A `(transport, protocol)` tuple is returned on success.

The created transport is an implementation-dependent bidirectional
stream.

Other arguments:

- *ssl*: if given and not false, a SSL/TLS transport is created
(by default a plain TCP transport is created).  If *ssl* is
a `ssl.SSLContext` object, this context is used to create
the transport; if *ssl* is `True`, a default context returned
from `ssl.create_default_context()` is used.

> **See also:** SSL/TLS security considerations

- *server_hostname* sets or overrides the hostname that the target
server's certificate will be matched against.  Should only be passed
if *ssl* is not `None`.  By default the value of the *host* argument
is used.  If *host* is empty, there is no default and you must pass a
value for *server_hostname*.  If *server_hostname* is an empty
string, hostname matching is disabled (which is a serious security
risk, allowing for potential man-in-the-middle attacks).

- *family*, *proto*, *flags* are the optional address family, protocol
and flags to be passed through to getaddrinfo() for *host* resolution.
If given, these should all be integers from the corresponding
`socket` module constants.

- *happy_eyeballs_delay*, if given, enables Happy Eyeballs for this
connection. It should
be a floating-point number representing the amount of time in seconds
to wait for a connection attempt to complete, before starting the next
attempt in parallel. This is the "Connection Attempt Delay" as defined
in RFC 8305. A sensible default value recommended by the RFC is `0.25`
(250 milliseconds).

- *interleave* controls address reordering when a host name resolves to
multiple IP addresses.
If `0` or unspecified, no reordering is done, and addresses are
tried in the order returned by `getaddrinfo()`. If a positive integer
is specified, the addresses are interleaved by address family, and the
given integer is interpreted as "First Address Family Count" as defined
in RFC 8305. The default is `0` if *happy_eyeballs_delay* is not
specified, and `1` if it is.

- *sock*, if given, should be an existing, already connected
`socket.socket` object to be used by the transport.
If *sock* is given, none of *host*, *port*, *family*, *proto*, *flags*,
*happy_eyeballs_delay*, *interleave*
and *local_addr* should be specified.

> **Note:** The *sock* argument transfers ownership of the socket to the
> transport created. To close the socket, call the transport's
> `close()` method.

- *local_addr*, if given, is a `(local_host, local_port)` tuple used
to bind the socket locally.  The *local_host* and *local_port*
are looked up using `getaddrinfo()`, similarly to *host* and *port*.

- *ssl_handshake_timeout* is (for a TLS connection) the time in seconds
to wait for the TLS handshake to complete before aborting the connection.
`60.0` seconds if `None` (default).

- *ssl_shutdown_timeout* is the time in seconds to wait for the SSL shutdown
to complete before aborting the connection. `30.0` seconds if `None`
(default).

- *all_errors* determines what exceptions are raised when a connection cannot
be created. By default, only a single `Exception` is raised: the first
exception if there is only one or all errors have same message, or a single
`OSError` with the error messages combined. When `all_errors` is `True`,
an `ExceptionGroup` will be raised containing all exceptions (even if there
is only one).

> *Changed in version 3.5.*
> Added support for SSL/TLS in `ProactorEventLoop`.

> *Changed in version 3.6.*
> The socket option socket.TCP_NODELAY is set by default
> for all TCP connections.

> *Changed in version 3.7.*
> Added the *ssl_handshake_timeout* parameter.

> *Changed in version 3.8.*
> Added the *happy_eyeballs_delay* and *interleave* parameters.
>
> Happy Eyeballs Algorithm: Success with Dual-Stack Hosts.
> When a server's IPv4 path and protocol are working, but the server's
> IPv6 path and protocol are not working, a dual-stack client
> application experiences significant connection delay compared to an
> IPv4-only client.  This is undesirable because it causes the
> dual-stack client to have a worse user experience.  This document
> specifies requirements for algorithms that reduce this user-visible
> delay and provides an algorithm.
>
> For more information: https://datatracker.ietf.org/doc/html/rfc6555

> *Changed in version 3.11.*
> Added the *ssl_shutdown_timeout* parameter.

> *Changed in version 3.12.*
> *all_errors* was added.

> *Changed in version 3.15.*
> Raises a `ValueError` if `ssl.check_hostname` is `True`
> and `server_hostname` is not supplied.

> **See also:** The `open_connection()` function is a high-level alternative
> API.  It returns a pair of (`StreamReader`, `StreamWriter`)
> that can be used directly in async/await code.

### `loop.create_datagram_endpoint(protocol_factory, \`

```python
local_addr=None, remote_addr=None, *, \
family=0, proto=0, flags=0, \
reuse_port=None, \
allow_broadcast=None, sock=None)
```

Create a datagram connection.

The socket family can be either `AF_INET`,
`AF_INET6`, or `AF_UNIX`,
depending on *host* (or the *family* argument, if provided).

The socket type will be `SOCK_DGRAM`.

*protocol_factory* must be a callable returning a
protocol implementation.

A tuple of `(transport, protocol)` is returned on success.

Other arguments:

- *local_addr*, if given, is a `(local_host, local_port)` tuple used
to bind the socket locally.  The *local_host* and *local_port*
are looked up using `getaddrinfo()`.

> **Note:** On Windows, when using the proactor event loop with `local_addr=None`,
> an `OSError` with `errno.WSAEINVAL` will be raised
> when running it.

- *remote_addr*, if given, is a `(remote_host, remote_port)` tuple used
to connect the socket to a remote address.  The *remote_host* and
*remote_port* are looked up using `getaddrinfo()`.

- *family*, *proto*, *flags* are the optional address family, protocol
and flags to be passed through to `getaddrinfo()` for *host*
resolution. If given, these should all be integers from the
corresponding `socket` module constants.

- *reuse_port* tells the kernel to allow this endpoint to be bound to the
same port as other existing endpoints are bound to, so long as they all
set this flag when being created. This option is not supported on Windows
and some Unixes. If the socket.SO_REUSEPORT constant is not
defined then this capability is unsupported.

- *allow_broadcast* tells the kernel to allow this endpoint to send
messages to the broadcast address.

- *sock* can optionally be specified in order to use a preexisting,
already connected, `socket.socket` object to be used by the
transport. If specified, *local_addr* and *remote_addr* should be omitted
(must be `None`).

> **Note:** The *sock* argument transfers ownership of the socket to the
> transport created. To close the socket, call the transport's
> `close()` method.

See UDP echo client protocol and
UDP echo server protocol examples.

> *Changed in version 3.4.4.*
> The *family*, *proto*, *flags*, *reuse_address*, *reuse_port*,
> *allow_broadcast*, and *sock* parameters were added.

> *Changed in version 3.8.*
> Added support for Windows.

> *Changed in version 3.8.1.*
> The *reuse_address* parameter is no longer supported, as using
> socket.SO_REUSEADDR
> poses a significant security concern for
> UDP. Explicitly passing `reuse_address=True` will raise an exception.
> When multiple processes with differing UIDs assign sockets to an
> identical UDP socket address with `SO_REUSEADDR`, incoming packets can
> become randomly distributed among the sockets.
>
> For supported platforms, *reuse_port* can be used as a replacement for
> similar functionality. With *reuse_port*,
> socket.SO_REUSEPORT
> is used instead, which specifically
> prevents processes with differing UIDs from assigning sockets to the same
> socket address.

> *Changed in version 3.11.*
> The *reuse_address* parameter, disabled since Python 3.8.1,
> 3.7.6 and 3.6.10, has been entirely removed.

### `loop.create_unix_connection(protocol_factory, \`

```python
path=None, *, ssl=None, sock=None, \
server_hostname=None, ssl_handshake_timeout=None, \
ssl_shutdown_timeout=None)
```

Create a Unix connection.

The socket family will be `AF_UNIX`; socket
type will be `SOCK_STREAM`.

A tuple of `(transport, protocol)` is returned on success.

*path* is the name of a Unix domain socket and is required,
unless a *sock* parameter is specified.  Abstract Unix sockets,
`str`, `bytes`, and `Path` paths are
supported.

See the documentation of the `loop.create_connection()` method
for information about arguments to this method.

> **Availability:** Unix.

> *Changed in version 3.7.*
> Added the *ssl_handshake_timeout* parameter.
> The *path* parameter can now be a path-like object.

> *Changed in version 3.11.*
> Added the *ssl_shutdown_timeout* parameter.

### `loop.create_server(protocol_factory, \`

```python
host=None, port=None, *, \
family=socket.AF_UNSPEC, \
flags=socket.AI_PASSIVE, \
sock=None, backlog=100, ssl=None, \
reuse_address=None, reuse_port=None, \
keep_alive=None, \
ssl_handshake_timeout=None, \
ssl_shutdown_timeout=None, \
start_serving=True)
```

Create a TCP server (socket type `SOCK_STREAM`) listening
on *port* of the *host* address.

Returns a `Server` object.

Arguments:

- *protocol_factory* must be a callable returning a
protocol implementation.

- The *host* parameter can be set to several types which determine where
the server would be listening:

- If *host* is a string, the TCP server is bound to a single network
interface specified by *host*.

- If *host* is a sequence of strings, the TCP server is bound to all
network interfaces specified by the sequence.

- If *host* is an empty string or `None`, all interfaces are
assumed and a list of multiple sockets will be returned (most likely
one for IPv4 and another one for IPv6).

- The *port* parameter can be set to specify which port the server should
listen on. If `0` or `None` (the default), a random unused port will
be selected (note that if *host* resolves to multiple network interfaces,
a different random port will be selected for each interface).

- *family* can be set to either `socket.AF_INET` or
`AF_INET6` to force the socket to use IPv4 or IPv6.
If not set, the *family* will be determined from host name
(defaults to `AF_UNSPEC`).

- *flags* is a bitmask for `getaddrinfo()`.

- *sock* can optionally be specified in order to use a preexisting
socket object. If specified, *host* and *port* must not be specified.

> **Note:** The *sock* argument transfers ownership of the socket to the
> server created. To close the socket, call the server's
> `close()` method.

- *backlog* is the maximum number of queued connections passed to
`listen()` (defaults to 100).

- *ssl* can be set to an `SSLContext` instance to enable
TLS over the accepted connections.

- *reuse_address* tells the kernel to reuse a local socket in
`TIME_WAIT` state, without waiting for its natural timeout to
expire. If not specified will automatically be set to `True` on
Unix.

- *reuse_port* tells the kernel to allow this endpoint to be bound to the
same port as other existing endpoints are bound to, so long as they all
set this flag when being created. This option is not supported on
Windows.

- *keep_alive* set to `True` keeps connections active by enabling the
periodic transmission of messages.

> *Changed in version 3.13.*
> Added the *keep_alive* parameter.

- *ssl_handshake_timeout* is (for a TLS server) the time in seconds to wait
for the TLS handshake to complete before aborting the connection.
`60.0` seconds if `None` (default).

- *ssl_shutdown_timeout* is the time in seconds to wait for the SSL shutdown
to complete before aborting the connection. `30.0` seconds if `None`
(default).

- *start_serving* set to `True` (the default) causes the created server
to start accepting connections immediately.  When set to `False`,
the user should await on `Server.start_serving()` or
`Server.serve_forever()` to make the server to start accepting
connections.

> *Changed in version 3.5.*
> Added support for SSL/TLS in `ProactorEventLoop`.

> *Changed in version 3.5.1.*
> The *host* parameter can be a sequence of strings.

> *Changed in version 3.6.*
> Added *ssl_handshake_timeout* and *start_serving* parameters.
> The socket option socket.TCP_NODELAY is set by default
> for all TCP connections.

> *Changed in version 3.11.*
> Added the *ssl_shutdown_timeout* parameter.

> **See also:** The `start_server()` function is a higher-level alternative API
> that returns a pair of `StreamReader` and `StreamWriter`
> that can be used in an async/await code.

### `loop.create_unix_server(protocol_factory, path=None, \`

```python
*, sock=None, backlog=100, ssl=None, \
ssl_handshake_timeout=None, \
ssl_shutdown_timeout=None, \
start_serving=True, cleanup_socket=True)
```

Similar to `loop.create_server()` but works with the
`AF_UNIX` socket family.

*path* is the name of a Unix domain socket, and is required,
unless a *sock* argument is provided.  Abstract Unix sockets,
`str`, `bytes`, and `Path` paths
are supported.

If *cleanup_socket* is true then the Unix socket will automatically
be removed from the filesystem when the server is closed, unless the
socket has been replaced after the server has been created.

See the documentation of the `loop.create_server()` method
for information about arguments to this method.

> **Availability:** Unix.

> *Changed in version 3.7.*
> Added the *ssl_handshake_timeout* and *start_serving* parameters.
> The *path* parameter can now be a `Path` object.

> *Changed in version 3.11.*
> Added the *ssl_shutdown_timeout* parameter.

> *Changed in version 3.13.*
> Added the *cleanup_socket* parameter.
