---
title: "ssl --- TLS/SSL wrapper for socket objects (part 6 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ssl.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ssl --- TLS/SSL wrapper for socket objects (part 6 of 9)

### `SSLContext.sni_callback`

Register a callback function that will be called after the TLS Client Hello
handshake message has been received by the SSL/TLS server when the TLS client
specifies a server name indication. The server name indication mechanism
is specified in RFC 6066 section 3 - Server Name Indication.

Only one callback can be set per `SSLContext`.  If *sni_callback*
is set to `None` then the callback is disabled. Calling this function a
subsequent time will disable the previously registered callback.

The callback function will be called with three
arguments; the first being the `ssl.SSLSocket`, the second is a string
that represents the server name that the client is intending to communicate
(or `None` if the TLS Client Hello does not contain a server name)
and the third argument is the original `SSLContext`. The server name
argument is text. For internationalized domain name, the server
name is an IDN A-label (`"xn--pythn-mua.org"`).

A typical use of this callback is to change the `ssl.SSLSocket`'s
`SSLSocket.context` attribute to a new object of type
`SSLContext` representing a certificate chain that matches the server
name.

If the callback assigns a new context to `SSLSocket.context`, any
further ClientHello message on the same connection (for example after a
TLS 1.3 HelloRetryRequest) is dispatched to the new context's
*sni_callback*, if it has one; the original callback is not called again
for that connection.

Due to the early negotiation phase of the TLS connection, only limited
methods and attributes are usable like
`SSLSocket.selected_alpn_protocol()` and `SSLSocket.context`.
The `SSLSocket.getpeercert()`, `SSLSocket.get_verified_chain()`,
`SSLSocket.get_unverified_chain()` `SSLSocket.cipher()`
and `SSLSocket.compression()` methods require that
the TLS connection has progressed beyond the TLS Client Hello and therefore
will not return meaningful values nor can they be called safely.

The *sni_callback* function must return `None` to allow the
TLS negotiation to continue.  If a TLS failure is required, a constant
`ALERT_DESCRIPTION_*` can be
returned.  Other return values will result in a TLS fatal error with
`ALERT_DESCRIPTION_INTERNAL_ERROR`.

If an exception is raised from the *sni_callback* function the TLS
connection will terminate with a fatal TLS alert message
`ALERT_DESCRIPTION_HANDSHAKE_FAILURE`.

This method will raise `NotImplementedError` if the OpenSSL library
had OPENSSL_NO_TLSEXT defined when it was built.

> *Added in version 3.7.*

> *Changed in version 3.15.*
> After the callback assigns a new `SSLSocket.context`, later
> ClientHello messages on the connection are dispatched to the new
> context's *sni_callback*.

### `SSLContext.set_servername_callback(server_name_callback)`

This is a legacy API retained for backwards compatibility. When possible,
you should use `sni_callback` instead. The given *server_name_callback*
is similar to *sni_callback*, except that when the server hostname is an
IDN-encoded internationalized domain name, the *server_name_callback*
receives a decoded U-label (`"pythön.org"`).

If there is a decoding error on the server name, the TLS connection will
terminate with an `ALERT_DESCRIPTION_INTERNAL_ERROR` fatal TLS
alert message to the client.

> *Added in version 3.4.*

### `SSLContext.load_dh_params(dhfile, /)`

Load the key <example-value> parameters for Diffie-Hellman (DH) key exchange.
Using DH key <example-value> improves forward secrecy at the expense of
computational resources (both on the server and on the client).
The *dhfile* parameter should be the path to a file containing DH
parameters in PEM format.

This setting doesn't apply to client sockets.  You can also use the
`OP_SINGLE_DH_USE` option to further improve security.

> *Added in version 3.3.*

### `SSLContext.set_ecdh_curve(curve_name, /)`

Set the curve name for Elliptic Curve-based Diffie-Hellman (ECDH) key
exchange.  ECDH is significantly faster than regular DH while arguably
as secure.  The *curve_name* parameter should be a string describing
a well-known elliptic curve, for example `prime256v1` for a widely
supported curve.

This setting doesn't apply to client sockets.  You can also use the
`OP_SINGLE_ECDH_USE` option to further improve security.

This method is not available if `HAS_ECDH` is `False`.

> *Added in version 3.3.*

> **See also:** SSL/TLS & Perfect Forward Secrecy
> Vincent Bernat.

### `SSLContext.wrap_socket(sock, server_side=False, \`

```python
do_handshake_on_connect=True, suppress_ragged_eofs=True, \
server_hostname=None, session=None)
```

Wrap an existing Python socket *sock* and return an instance of
`SSLContext.sslsocket_class` (default `SSLSocket`). The
returned SSL socket is tied to the context, its settings and certificates.
*sock* must be a `SOCK_STREAM` socket; other
socket types are unsupported.

The parameter `server_side` is a boolean which identifies whether
server-side or client-side behavior is desired from this socket.

For client-side sockets, the context construction is lazy; if the
underlying socket isn't connected yet, the context construction will be
performed after `connect()` is called on the socket.  For
server-side sockets, if the socket has no remote peer, it is assumed
to be a listening socket, and the server-side SSL wrapping is
automatically performed on client connections accepted via the
`accept()` method. The method may raise `SSLError`.

On client connections, the optional parameter *server_hostname* specifies
the hostname of the service which we are connecting to.  This allows a
single server to host multiple SSL-based services with distinct certificates,
quite similarly to HTTP virtual hosts. Specifying *server_hostname* will
raise a `ValueError` if *server_side* is true.

The parameter `do_handshake_on_connect` specifies whether to do the SSL
handshake automatically after doing a `socket.connect()`, or whether the
application program will call it explicitly, by invoking the
`SSLSocket.do_handshake()` method.  Calling
`SSLSocket.do_handshake()` explicitly gives the program control over the
blocking behavior of the socket I/O involved in the handshake.

The parameter `suppress_ragged_eofs` specifies how the
`SSLSocket.recv()` method should signal unexpected EOF from the other end
of the connection.  If specified as `True` (the default), it returns a
normal EOF (an empty bytes object) in response to unexpected EOF errors
raised from the underlying socket; if `False`, it will raise the
exceptions back to the caller.

*session*, see `session`.

To wrap an `SSLSocket` in another `SSLSocket`, use
`SSLContext.wrap_bio()`.

> *Changed in version 3.5.*
> Always allow a server_hostname to be passed, even if OpenSSL does not
> have SNI.

> *Changed in version 3.6.*
> *session* argument was added.

> *Changed in version 3.7.*
> The method returns an instance of `SSLContext.sslsocket_class`
> instead of hard-coded `SSLSocket`.

### `SSLContext.sslsocket_class`

The return type of `SSLContext.wrap_socket()`, defaults to
`SSLSocket`. The attribute can be assigned to on instances of
`SSLContext` in order to return a custom subclass of
`SSLSocket`.

> *Added in version 3.7.*

### `SSLContext.wrap_bio(incoming, outgoing, server_side=False, \`

```python
server_hostname=None, session=None)
```

Wrap the BIO objects *incoming* and *outgoing* and return an instance of
`SSLContext.sslobject_class` (default `SSLObject`). The SSL
routines will read input data from the incoming BIO and write data to the
outgoing BIO.

The *server_side*, *server_hostname* and *session* parameters have the
same meaning as in `SSLContext.wrap_socket()`, and are validated in
the same way: in particular a `ValueError` is raised when
`check_hostname` is enabled but no *server_hostname* is
given, since there would be no name to match the peer's certificate
against.

> *Changed in version 3.6.*
> *session* argument was added.

> *Changed in version 3.7.*
> The method returns an instance of `SSLContext.sslobject_class`
> instead of hard-coded `SSLObject`.

> *Changed in version 3.15.*
> The *server_side*, *server_hostname* and *session* parameters are now
> validated as `SSLContext.wrap_socket()` validates them. Previously
> a context with `check_hostname` enabled and no
> *server_hostname* was accepted, and verified the certificate chain but
> never the peer's identity.

### `SSLContext.sslobject_class`

The return type of `SSLContext.wrap_bio()`, defaults to
`SSLObject`. The attribute can be overridden on instance of class
in order to return a custom subclass of `SSLObject`.

> *Added in version 3.7.*

### `SSLContext.session_stats()`

Get statistics about the SSL sessions created or managed by this context.
A dictionary is returned which maps the names of each piece of information to their
numeric values.  For example, here is the total number of hits and misses
in the session cache since the context was created:

```
>>> stats = context.session_stats()
>>> stats['hits'], stats['misses']
(0, 0)
```

### `SSLContext.check_hostname`

Whether to match the peer cert's hostname in
`SSLSocket.do_handshake()`. The context's
`verify_mode` must be set to `CERT_OPTIONAL` or
`CERT_REQUIRED`, and you must pass *server_hostname* to
`wrap_socket()` in order to match the hostname.  Enabling
hostname checking automatically sets `verify_mode` from
`CERT_NONE` to `CERT_REQUIRED`.  It cannot be set back to
`CERT_NONE` as long as hostname checking is enabled. The
`PROTOCOL_TLS_CLIENT` protocol enables hostname checking by default.
With other protocols, hostname checking must be enabled explicitly.

Example:

```
import socket, ssl

context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.verify_mode = ssl.CERT_REQUIRED
context.check_hostname = True
context.load_default_certs()

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
ssl_sock = context.wrap_socket(s, server_hostname='www.verisign.com')
ssl_sock.connect(('www.verisign.com', 443))
```

> *Added in version 3.4.*

> *Changed in version 3.7.*
> `verify_mode` is now automatically changed
> to `CERT_REQUIRED`  when hostname checking is enabled and
> `verify_mode` is `CERT_NONE`. Previously
> the same operation would have failed with a `ValueError`.

### `SSLContext.keylog_filename`

Write TLS keys to a keylog file, whenever key <example-value> is generated or
received. The keylog file is designed for debugging purposes only. The
file format is specified by NSS and used by many traffic analyzers such
as Wireshark. The log file is opened in append-only mode. Writes are
synchronized between threads, but not between processes.

> *Added in version 3.8.*

### `SSLContext.maximum_version`

A `TLSVersion` enum member representing the highest supported
TLS version. The value defaults to `TLSVersion.MAXIMUM_SUPPORTED`.
The attribute is read-only for protocols other than `PROTOCOL_TLS`,
`PROTOCOL_TLS_CLIENT`, and `PROTOCOL_TLS_SERVER`.

The attributes `maximum_version`,
`minimum_version` and
`SSLContext.options` all affect the supported SSL
and TLS versions of the context. The implementation does not prevent
invalid combinations. For example a context with
`OP_NO_TLSv1_2` in `options` and
`maximum_version` set to `TLSVersion.TLSv1_2`
will not be able to establish a TLS 1.2 connection.

> *Added in version 3.7.*

### `SSLContext.minimum_version`

Like `SSLContext.maximum_version` except it is the lowest
supported version or `TLSVersion.MINIMUM_SUPPORTED`.

> *Added in version 3.7.*

### `SSLContext.num_tickets`

Control the number of TLS 1.3 session tickets of a
`PROTOCOL_TLS_SERVER` context. The setting has no impact on TLS
1.0 to 1.2 connections.

> *Added in version 3.8.*

### `SSLContext.options`

An integer representing the set of SSL options enabled on this context.
The default value is `OP_ALL`, but you can specify other options
such as `OP_NO_SSLv2` by ORing them together.

> *Changed in version 3.6.*
> `SSLContext.options` returns `Options` flags:
>
> ```python
> >>> ssl.create_default_context().options  # doctest: +SKIP
> <Options.OP_ALL|OP_NO_SSLv3|OP_NO_SSLv2|OP_NO_COMPRESSION: 2197947391>
> ```
>

> *Deprecated since version 3.7.*
> All `OP_NO_SSL*` and `OP_NO_TLS*` options have been deprecated since
> Python 3.7. Use `SSLContext.minimum_version` and
> `SSLContext.maximum_version` instead.

### `SSLContext.post_handshake_auth`

Enable TLS 1.3 post-handshake client authentication. Post-handshake auth
is disabled by default and a server can only request a TLS client
certificate during the initial handshake. When enabled, a server may
request a TLS client certificate at any time after the handshake.

When enabled on client-side sockets, the client signals the server that
it supports post-handshake authentication.

When enabled on server-side sockets, `SSLContext.verify_mode` must
be set to `CERT_OPTIONAL` or `CERT_REQUIRED`, too. The
actual client cert exchange is delayed until
`SSLSocket.verify_client_post_handshake()` is called and some I/O is
performed.

> *Added in version 3.8.*

### `SSLContext.protocol`

The protocol version chosen when constructing the context.  This attribute
is read-only.

### `SSLContext.hostname_checks_common_name`

Whether `check_hostname` falls back to verify the cert's
subject common name in the absence of a subject alternative name
extension (default: true).

> *Added in version 3.7.*

> *Changed in version 3.10.*
> The flag had no effect with OpenSSL before version 1.1.1l. Python 3.8.9,
> 3.9.3, and 3.10 include workarounds for previous versions.

### `SSLContext.security_level`

An integer representing the `security level
<https://docs.openssl.org/master/man3/SSL_CTX_get_security_level/>`_
for the context. This attribute is read-only.

> *Added in version 3.10.*

### `SSLContext.verify_flags`

The flags for certificate verification operations. You can set flags like
`VERIFY_CRL_CHECK_LEAF` by ORing them together. By default OpenSSL
does neither require nor verify certificate revocation lists (CRLs).

> *Added in version 3.4.*

> *Changed in version 3.6.*
> `SSLContext.verify_flags` returns `VerifyFlags` flags:
>
> ```python
> >>> ssl.create_default_context().verify_flags  # doctest: +SKIP
> <VerifyFlags.VERIFY_X509_TRUSTED_FIRST: 32768>
> ```
>

### `SSLContext.verify_mode`

Whether to try to verify other peers' certificates and how to behave
if verification fails.  This attribute must be one of
`CERT_NONE`, `CERT_OPTIONAL` or `CERT_REQUIRED`.

> *Changed in version 3.6.*
> `SSLContext.verify_mode` returns `VerifyMode` enum:
>
> ```python
> >>> ssl.create_default_context().verify_mode  # doctest: +SKIP
> <VerifyMode.CERT_REQUIRED: 2>
> ```
>
