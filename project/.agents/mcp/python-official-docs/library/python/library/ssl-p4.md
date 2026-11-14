---
title: "ssl --- TLS/SSL wrapper for socket objects (part 4 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ssl.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ssl --- TLS/SSL wrapper for socket objects (part 4 of 9)

## SSL sockets

### class `SSLSocket(socket.socket)`

SSL sockets provide the following methods of socket-objects:

- `accept()`
- `bind()`
- `close()`
- `connect()`
- `detach()`
- `fileno()`
- `getpeername()`, `getsockname()`
- `getsockopt()`, `setsockopt()`
- `gettimeout()`, `settimeout()`,
`setblocking()`
- `listen()`
- `makefile()`
- `recv()`, `recv_into()`
(but passing a non-zero `flags` argument is not allowed)
- `send()`, `sendall()` (with
the same limitation)
- `sendfile()` (it may be high-performant only when
the kernel TLS is enabled by setting `OP_ENABLE_KTLS` or when a
socket is plain-text, else `send()` will be used)
- `shutdown()`

However, since the SSL (and TLS) protocol has its own framing atop
of TCP, the SSL sockets abstraction can, in certain respects, diverge from
the specification of normal, OS-level sockets.  See especially the
notes on non-blocking sockets.

Instances of `SSLSocket` must be created using the
`SSLContext.wrap_socket()` method.

> *Changed in version 3.5.*
> The `sendfile()` method was added.

> *Changed in version 3.5.*
> The `shutdown()` does not reset the socket timeout each time bytes
> are received or sent. The socket timeout is now the maximum total duration
> of the shutdown.

> *Deprecated since version 3.6.*
> It is deprecated to create a `SSLSocket` instance directly, use
> `SSLContext.wrap_socket()` to wrap a socket.

> *Changed in version 3.7.*
> `SSLSocket` instances must be created with
> `wrap_socket()`. In earlier versions, it was possible
> to create instances directly. This was never documented or officially
> supported.

> *Changed in version 3.10.*
> Python now uses `SSL_read_ex` and `SSL_write_ex` internally. The
> functions support reading and writing of data larger than 2 GB. Writing
> zero-length data no longer fails with a protocol violation error.

> *Changed in version 3.15.*
> Python now uses `SSL_sendfile` internally when possible. The
> function sends a file more efficiently because it performs TLS encryption
> in the kernel to avoid additional context switches.

SSL sockets also have the following additional methods and attributes:

### `SSLSocket.read(len=1024, buffer=None)`

Read up to *len* bytes of data from the SSL socket and return the result as
a `bytes` instance. If *buffer* is specified, then read into the buffer
instead, and return the number of bytes read.

Raise `SSLWantReadError` or `SSLWantWriteError` if the socket is
non-blocking and the read would block.

As at any time a re-negotiation is possible, a call to `read()` can also
cause write operations.

> *Changed in version 3.5.*
> The socket timeout is no longer reset each time bytes are received or sent.
> The socket timeout is now the maximum total duration to read up to *len*
> bytes.

> *Deprecated since version 3.6.*
> Use `recv()` instead of `read()`.

### `SSLSocket.write(data)`

Write *data* to the SSL socket and return the number of bytes written. The
*data* argument must be an object supporting the buffer interface.

Raise `SSLWantReadError` or `SSLWantWriteError` if the socket is
non-blocking and the write would block.

As at any time a re-negotiation is possible, a call to `write()` can
also cause read operations.

> *Changed in version 3.5.*
> The socket timeout is no longer reset each time bytes are received or sent.
> The socket timeout is now the maximum total duration to write *data*.

> *Deprecated since version 3.6.*
> Use `send()` instead of `write()`.

> **Note:** The `read()` and `write()` methods are the
> low-level methods that read and write unencrypted, application-level data
> and decrypt/encrypt it to encrypted, wire-level data. These methods
> require an active SSL connection, i.e. the handshake was completed and
> `SSLSocket.unwrap()` was not called.
>
> Normally you should use the socket API methods like
> `recv()` and `send()` instead of these
> methods.

### `SSLSocket.do_handshake(block=False)`

Perform the SSL setup handshake.

If *block* is true and the timeout obtained by `gettimeout()`
is zero, the socket is set in blocking mode until the handshake is performed.

> *Changed in version 3.4.*
> The handshake method also performs `match_hostname()` when the
> `check_hostname` attribute of the socket's
> `context` is true.

> *Changed in version 3.5.*
> The socket timeout is no longer reset each time bytes are received or sent.
> The socket timeout is now the maximum total duration of the handshake.

> *Changed in version 3.7.*
> Hostname or IP address is matched by OpenSSL during handshake. The
> function `match_hostname()` is no longer used. In case OpenSSL
> refuses a hostname or IP address, the handshake is aborted early and
> a TLS alert message is sent to the peer.

### `SSLSocket.getpeercert(binary_form=False)`

If there is no certificate for the peer on the other end of the connection,
return `None`.  If the SSL handshake hasn't been done yet, raise
`ValueError`.

If the `binary_form` parameter is `False`, and a certificate was
received from the peer, this method returns a `dict` instance.  If the
certificate was not validated, the dict is empty.  If the certificate was
validated, it returns a dict with several keys, amongst them `subject`
(the principal for which the certificate was issued) and `issuer`
(the principal issuing the certificate).  If a certificate contains an
instance of the *Subject Alternative Name* extension (see RFC 3280),
there will also be a `subjectAltName` key in the dictionary.

The `subject` and `issuer` fields are tuples containing the sequence
of relative distinguished names (RDNs) given in the certificate's data
structure for the respective fields, and each RDN is a sequence of
name-value pairs.  Here is a real-world example:

```
{'issuer': ((('countryName', 'IL'),),
            (('organizationName', 'StartCom Ltd.'),),
            (('organizationalUnitName',
              'Secure Digital Certificate Signing'),),
            (('commonName',
              'StartCom Class 2 Primary Intermediate Server CA'),)),
 'notAfter': 'Nov 22 08:15:19 2013 GMT',
 'notBefore': 'Nov 21 03:09:52 2011 GMT',
 'serialNumber': '95F0',
 'subject': ((('description', '571208-SLe257oHY9fVQ07Z'),),
             (('countryName', 'US'),),
             (('stateOrProvinceName', 'California'),),
             (('localityName', 'San Francisco'),),
             (('organizationName', 'Electronic Frontier Foundation, Inc.'),),
             (('commonName', '*.eff.org'),),
             (('emailAddress', 'user@example.com'),)),
 'subjectAltName': (('DNS', '*.eff.org'), ('DNS', 'eff.org')),
 'version': 3}
```

If the `binary_form` parameter is `True`, and a certificate was
provided, this method returns the DER-encoded form of the entire certificate
as a sequence of bytes, or `None` if the peer did not provide a
certificate.  Whether the peer provides a certificate depends on the SSL
socket's role:

- for a client SSL socket, the server will always provide a certificate,
regardless of whether validation was required;

- for a server SSL socket, the client will only provide a certificate
when requested by the server; therefore `getpeercert()` will return
`None` if you used `CERT_NONE` (rather than
`CERT_OPTIONAL` or `CERT_REQUIRED`).

See also `SSLContext.check_hostname`.

> *Changed in version 3.2.*
> The returned dictionary includes additional items such as `issuer`
> and `notBefore`.

> *Changed in version 3.4.*
> `ValueError` is raised when the handshake isn't done.
> The returned dictionary includes additional X509v3 extension items
> such as `crlDistributionPoints`, `caIssuers` and `OCSP` URIs.

> *Changed in version 3.9.*
> IPv6 address strings no longer have a trailing new line.

### `SSLSocket.get_verified_chain()`

Returns verified certificate chain provided by the other
end of the SSL channel as a list of DER-encoded bytes.
If certificate verification was disabled method acts the same as
`get_unverified_chain()`.

The verified chain is not stored with a session, so the list is empty
when the session is resumed (see `session_reused`).

> *Added in version 3.13.*

### `SSLSocket.get_unverified_chain()`

Returns raw certificate chain provided by the other
end of the SSL channel as a list of DER-encoded bytes.

No certificates are exchanged when a session is resumed (see
`session_reused`); the list then holds what was stored
with the session, which for a session resumed from a ticket on the
server side is the peer's own certificate only.

> *Added in version 3.13.*

### `SSLSocket.cipher()`

Returns a three-value tuple containing the name of the cipher being used, the
version of the SSL protocol that defines its use, and the number of secret
bits being used.  If no connection has been established, returns `None`.

### `SSLSocket.shared_ciphers()`

Return the list of ciphers available in both the client and server.  Each
entry of the returned list is a three-value tuple containing the name of the
cipher, the version of the SSL protocol that defines its use, and the number
of secret bits the cipher uses.  `shared_ciphers()` returns
`None` if no connection has been established or the socket is a client
socket.

> *Added in version 3.5.*

### `SSLSocket.group()`

Return the group used for doing key <example-value> on this connection. If no
connection has been established, returns `None`.

> *Added in version 3.15.*

### `SSLSocket.client_sigalg()`

Return the signature algorithm used for performing certificate-based client
authentication on this connection, or `None` if no connection has been
established or client authentication didn't occur.

> *Added in version 3.15.*

### `SSLSocket.server_sigalg()`

Return the signature algorithm used by the server to complete the TLS
handshake on this connection, or `None` if no connection has been
established or the cipher suite has no signature.

> *Added in version 3.15.*

### `SSLSocket.compression()`

Return the compression algorithm being used as a string, or `None`
if the connection isn't compressed.

If the higher-level protocol supports its own compression mechanism,
you can use `OP_NO_COMPRESSION` to disable SSL-level compression.

> *Added in version 3.3.*

### `SSLSocket.get_channel_binding(cb_type="tls-unique")`

Get channel binding data for current connection, as a bytes object.  Returns
`None` if not connected or the handshake has not been completed.

The *cb_type* parameter allow selection of the desired channel binding
type. Valid channel binding types are listed in the
`CHANNEL_BINDING_TYPES` list.  Currently only the 'tls-unique' channel
binding, defined by RFC 5929, is supported.  `ValueError` will be
raised if an unsupported channel binding type is requested.

> *Added in version 3.3.*

### `SSLSocket.selected_alpn_protocol()`

Return the protocol that was selected during the TLS handshake.  If
`SSLContext.set_alpn_protocols()` was not called, if the other party does
not support ALPN, if this socket does not support any of the client's
proposed protocols, or if the handshake has not happened yet, `None` is
returned.

> *Added in version 3.5.*

### `SSLSocket.selected_npn_protocol()`

Return the higher-level protocol that was selected during the TLS/SSL
handshake. If `SSLContext.set_npn_protocols()` was not called, or
if the other party does not support NPN, or if the handshake has not yet
happened, this will return `None`.

> *Added in version 3.3.*

> *Deprecated since version 3.10.*
> NPN has been superseded by ALPN

### `SSLSocket.unwrap()`

Performs the SSL shutdown handshake, which removes the TLS layer from the
underlying socket, and returns the underlying socket object.  This can be
used to go from encrypted operation over a connection to unencrypted.  The
returned socket should always be used for further communication with the
other side of the connection, rather than the original socket.

### `SSLSocket.verify_client_post_handshake()`

Requests post-handshake authentication (PHA) from a TLS 1.3 client. PHA
can only be initiated for a TLS 1.3 connection from a server-side socket,
after the initial TLS handshake and with PHA enabled on both sides, see
`SSLContext.post_handshake_auth`.

The method does not perform a cert exchange immediately. The server-side
sends a CertificateRequest during the next write event and expects the
client to respond with a certificate on the next read event.

If any precondition isn't met (e.g. not TLS 1.3, PHA not enabled), an
`SSLError` is raised.

> **Note:** Only available with OpenSSL 1.1.1 and TLS 1.3 enabled. Without TLS 1.3
> support, the method raises `NotImplementedError`.

> *Added in version 3.8.*

### `SSLSocket.version()`

Return the actual SSL protocol version negotiated by the connection
as a string, or `None` if no secure connection is established.
As of this writing, possible return values include `"SSLv2"`,
`"SSLv3"`, `"TLSv1"`, `"TLSv1.1"` and `"TLSv1.2"`.
Recent OpenSSL versions may define more return values.

> *Added in version 3.5.*

### `SSLSocket.pending()`

Returns the number of already decrypted bytes available for read, pending on
the connection.

### `SSLSocket.context`

The `SSLContext` object this SSL socket is tied to.

> *Added in version 3.2.*

### `SSLSocket.server_side`

A boolean which is `True` for server-side sockets and `False` for
client-side sockets.

> *Added in version 3.2.*

### `SSLSocket.server_hostname`

Hostname of the server: `str` type, or `None` for server-side
socket or if the hostname was not specified in the constructor.

> *Added in version 3.2.*

> *Changed in version 3.7.*
> The attribute is now always ASCII text. When `server_hostname` is
> an internationalized domain name (IDN), this attribute now stores the
> A-label form (`"xn--pythn-mua.org"`), rather than the U-label form
> (`"pythön.org"`).

### `SSLSocket.session`

The `SSLSession` for this SSL connection. The session is available
for client and server side sockets after the TLS handshake has been
performed. For client sockets the session can be set before
`do_handshake()` has been called to reuse a session.

> *Added in version 3.6.*

### `SSLSocket.session_reused`

> *Added in version 3.6.*
