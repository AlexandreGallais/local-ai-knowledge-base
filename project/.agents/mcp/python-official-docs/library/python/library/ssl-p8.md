---
title: "ssl --- TLS/SSL wrapper for socket objects (part 8 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ssl.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ssl --- TLS/SSL wrapper for socket objects (part 8 of 9)

## Examples

### Testing for SSL support

To test for the presence of SSL support in a Python installation, user code
should use the following idiom:

```
try:
    import ssl
except ImportError:
    pass
else:
    ...  # do something that requires SSL support
```

### Client-side operation

This example creates a SSL context with the recommended security settings
for client sockets, including automatic certificate verification:

```
>>> context = ssl.create_default_context()
```

If you prefer to tune security settings yourself, you might create
a context from scratch (but beware that you might not get the settings
right):

```
>>> context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
>>> context.load_verify_locations("/etc/ssl/certs/ca-bundle.crt")
```

(this snippet assumes your operating system places a bundle of all CA
certificates in `/etc/ssl/certs/ca-bundle.crt`; if not, you'll get an
error and have to adjust the location)

The `PROTOCOL_TLS_CLIENT` protocol configures the context for cert
validation and hostname verification. `verify_mode` is
set to `CERT_REQUIRED` and `check_hostname` is set
to `True`. All other protocols create SSL contexts with insecure defaults.

When you use the context to connect to a server, `CERT_REQUIRED`
and `check_hostname` validate the server certificate: it
ensures that the server certificate was signed with one of the CA
certificates, checks the signature for correctness, and verifies other
properties like validity and identity of the hostname:

```
>>> conn = context.wrap_socket(socket.socket(socket.AF_INET),
...                            server_hostname="www.python.org")
>>> conn.connect(("www.python.org", 443))
```

You may then fetch the certificate:

```
>>> cert = conn.getpeercert()
```

Visual inspection shows that the certificate does identify the desired service
(that is, the HTTPS host `www.python.org`):

```
>>> pprint.pprint(cert)
{'OCSP': ('http://ocsp.digicert.com',),
 'caIssuers': ('http://cacerts.digicert.com/DigiCertSHA2ExtendedValidationServerCA.crt',),
 'crlDistributionPoints': ('http://crl3.digicert.com/sha2-ev-server-g1.crl',
                           'http://crl4.digicert.com/sha2-ev-server-g1.crl'),
 'issuer': ((('countryName', 'US'),),
            (('organizationName', 'DigiCert Inc'),),
            (('organizationalUnitName', 'www.digicert.com'),),
            (('commonName', 'DigiCert SHA2 Extended Validation Server CA'),)),
 'notAfter': 'Sep  9 12:00:00 2016 GMT',
 'notBefore': 'Sep  5 00:00:00 2014 GMT',
 'serialNumber': '01BB6F00122B177F36CAB49CEA8B6B26',
 'subject': ((('businessCategory', 'Private Organization'),),
             (('1.3.6.1.4.1.311.60.2.1.3', 'US'),),
             (('1.3.6.1.4.1.311.60.2.1.2', 'Delaware'),),
             (('serialNumber', '3359300'),),
             (('streetAddress', '16 Allen Rd'),),
             (('postalCode', '03894-4801'),),
             (('countryName', 'US'),),
             (('stateOrProvinceName', 'NH'),),
             (('localityName', 'Wolfeboro'),),
             (('organizationName', 'Python Software Foundation'),),
             (('commonName', 'www.python.org'),)),
 'subjectAltName': (('DNS', 'www.python.org'),
                    ('DNS', 'python.org'),
                    ('DNS', 'pypi.org'),
                    ('DNS', 'docs.python.org'),
                    ('DNS', 'testpypi.org'),
                    ('DNS', 'bugs.python.org'),
                    ('DNS', 'wiki.python.org'),
                    ('DNS', 'hg.python.org'),
                    ('DNS', 'mail.python.org'),
                    ('DNS', 'packaging.python.org'),
                    ('DNS', 'pythonhosted.org'),
                    ('DNS', 'www.pythonhosted.org'),
                    ('DNS', 'test.pythonhosted.org'),
                    ('DNS', 'us.pycon.org'),
                    ('DNS', 'id.python.org')),
 'version': 3}
```

Now the SSL channel is established and the certificate verified, you can
proceed to talk with the server:

```
>>> conn.sendall(b"HEAD / HTTP/1.0\r\nHost: linuxfr.org\r\n\r\n")
>>> pprint.pprint(conn.recv(1024).split(b"\r\n"))
[b'HTTP/1.1 200 OK',
 b'Date: Sat, 18 Oct 2014 18:27:20 GMT',
 b'Server: nginx',
 b'Content-Type: text/html; charset=utf-8',
 b'X-Frame-Options: SAMEORIGIN',
 b'Content-Length: 45679',
 b'Accept-Ranges: bytes',
 b'Via: 1.1 varnish',
 b'Age: 2188',
 b'X-Served-By: cache-lcy1134-LCY',
 b'X-Cache: HIT',
 b'X-Cache-Hits: 11',
 b'Vary: Cookie',
 b'Strict-Transport-Security: max-age=63072000; includeSubDomains',
 b'Connection: close',
 b'',
 b'']
```

See the discussion of ssl-security below.

### Server-side operation

For server operation, typically you'll need to have a server certificate, and
private key, each in a file.  You'll first create a context holding the key
and the certificate, so that clients can check your authenticity.  Then
you'll open a socket, bind it to a port, call `listen()` on it, and start
waiting for clients to connect:

```
import socket, ssl

context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
context.load_cert_chain(certfile="mycertfile", keyfile="mykeyfile")

bindsocket = socket.socket()
bindsocket.bind(('myaddr.example.com', 10023))
bindsocket.listen(5)
```

When a client connects, you'll call `accept()` on the socket to get the
new socket from the other end, and use the context's `SSLContext.wrap_socket()`
method to create a server-side SSL socket for the connection:

```
while True:
    newsocket, fromaddr = bindsocket.accept()
    connstream = context.wrap_socket(newsocket, server_side=True)
    try:
        deal_with_client(connstream)
    finally:
        connstream.shutdown(socket.SHUT_RDWR)
        connstream.close()
```

Then you'll read data from the `connstream` and do something with it till you
are finished with the client (or the client is finished with you):

```
def deal_with_client(connstream):
    data = connstream.recv(1024)
    # empty data means the client is finished with us
    while data:
        if not do_something(connstream, data):
            # we'll assume do_something returns False
            # when we're finished with client
            break
        data = connstream.recv(1024)
    # finished with client
```

And go back to listening for new client connections (of course, a real server
would probably handle each client connection in a separate thread, or put
the sockets in non-blocking mode and use an event loop).

## Notes on non-blocking sockets

SSL sockets behave slightly different than regular sockets in
non-blocking mode. When working with non-blocking sockets, there are
thus several things you need to be aware of:

- Most `SSLSocket` methods will raise either
`SSLWantWriteError` or `SSLWantReadError` instead of
`BlockingIOError` if an I/O operation would
block. `SSLWantReadError` will be raised if a read operation on
the underlying socket is necessary, and `SSLWantWriteError` for
a write operation on the underlying socket. Note that attempts to
*write* to an SSL socket may require *reading* from the underlying
socket first, and attempts to *read* from the SSL socket may require
a prior *write* to the underlying socket.

> *Changed in version 3.5.*
> In earlier Python versions, the `SSLSocket.send()` method
> returned zero instead of raising `SSLWantWriteError` or
> `SSLWantReadError`.

- Calling `select()` tells you that the OS-level socket can be
read from (or written to), but it does not imply that there is sufficient
data at the upper SSL layer.  For example, only part of an SSL frame might
have arrived.  Therefore, you must be ready to handle `SSLSocket.recv()`
and `SSLSocket.send()` failures, and retry after another call to
`select()`.

- Conversely, since the SSL layer has its own framing, a SSL socket may
still have data available for reading without `select()`
being aware of it.  Therefore, you should first call
`SSLSocket.recv()` to drain any potentially available data, and then
only block on a `select()` call if still necessary.

(of course, similar provisions apply when using other primitives such as
`poll()`, or those in the `selectors` module)

- The SSL handshake itself will be non-blocking: the
`SSLSocket.do_handshake()` method has to be retried until it returns
successfully.  Here is a synopsis using `select()` to wait for
the socket's readiness:

```
while True:
    try:
        sock.do_handshake()
        break
    except ssl.SSLWantReadError:
        select.select([sock], [], [])
    except ssl.SSLWantWriteError:
        select.select([], [sock], [])
```

> **See also:** The `asyncio` module supports :ref:`non-blocking SSL sockets
> <ssl-nonblocking>` and provides a higher level Streams API.
> It polls for events using the `selectors` module and
> handles `SSLWantWriteError`, `SSLWantReadError` and
> `BlockingIOError` exceptions. It runs the SSL handshake asynchronously
> as well.

## Memory BIO support

> *Added in version 3.5.*

Ever since the SSL module was introduced in Python 2.6, the `SSLSocket`
class has provided two related but distinct areas of functionality:

- SSL protocol handling
- Network IO

The network IO API is identical to that provided by `socket.socket`,
from which `SSLSocket` also inherits. This allows an SSL socket to be
used as a drop-in replacement for a regular socket, making it very easy to add
SSL support to an existing application.

Combining SSL protocol handling and network IO usually works well, but there
are some cases where it doesn't. An example is async IO frameworks that want to
use a different IO multiplexing model than the "select/poll on a file
descriptor" (readiness based) model that is assumed by `socket.socket`
and by the internal OpenSSL socket IO routines. This is mostly relevant for
platforms like Windows where this model is not efficient. For this purpose, a
reduced scope variant of `SSLSocket` called `SSLObject` is
provided.

### class `SSLObject`

A reduced-scope variant of `SSLSocket` representing an SSL protocol
instance that does not contain any network IO methods. This class is
typically used by framework authors that want to implement asynchronous IO
for SSL through memory buffers.

This class implements an interface on top of a low-level SSL object as
implemented by OpenSSL. This object captures the state of an SSL connection
but does not provide any network IO itself. IO needs to be performed through
separate "BIO" objects which are OpenSSL's IO abstraction layer.

This class has no public constructor.  An `SSLObject` instance
must be created using the `wrap_bio()` method. This
method will create the `SSLObject` instance and bind it to a
pair of BIOs. The *incoming* BIO is used to pass data from Python to the
SSL protocol instance, while the *outgoing* BIO is used to pass data the
other way around.

The following methods are available:

- `context`
- `server_side`
- `server_hostname`
- `session`
- `session_reused`
- `read()`
- `write()`
- `getpeercert()`
- `get_verified_chain()`
- `get_unverified_chain()`
- `selected_alpn_protocol()`
- `selected_npn_protocol()`
- `cipher()`
- `shared_ciphers()`
- `compression()`
- `pending()`
- `do_handshake()`
- `verify_client_post_handshake()`
- `unwrap()`
- `get_channel_binding()`
- `version()`

When compared to `SSLSocket`, this object lacks the following
features:

- Any form of network IO; `recv()` and `send()` read and write only to
the underlying `MemoryBIO` buffers.

- There is no *do_handshake_on_connect* machinery. You must always manually
call `do_handshake()` to start the handshake.

- There is no handling of *suppress_ragged_eofs*. All end-of-file conditions
that are in violation of the protocol are reported via the
`SSLEOFError` exception.

- The method `unwrap()` call does not return anything,
unlike for an SSL socket where it returns the underlying socket.

- The *server_name_callback* callback passed to
`SSLContext.set_servername_callback()` will get an `SSLObject`
instance instead of a `SSLSocket` instance as its first parameter.

Some notes related to the use of `SSLObject`:

- All IO on an `SSLObject` is non-blocking.
This means that for example `read()` will raise an
`SSLWantReadError` if it needs more data than the incoming BIO has
available.

> *Changed in version 3.7.*
> `SSLObject` instances must be created with
> `wrap_bio()`. In earlier versions, it was possible to
> create instances directly. This was never documented or officially
> supported.

An SSLObject communicates with the outside world using memory buffers. The
class `MemoryBIO` provides a memory buffer that can be used for this
purpose.  It wraps an OpenSSL memory BIO (Basic IO) object:

### class `MemoryBIO`

A memory buffer that can be used to pass data between Python and an SSL
protocol instance.

### `MemoryBIO.pending`

Return the number of bytes currently in the memory buffer.

### `MemoryBIO.eof`

A boolean indicating whether the memory BIO is current at the end-of-file
position.

### `MemoryBIO.read(n=-1, /)`

Read up to *n* bytes from the memory buffer. If *n* is not specified or
negative, all bytes are returned.

### `MemoryBIO.write(buf, /)`

Write the bytes from *buf* to the memory BIO. The *buf* argument must be an
object supporting the buffer protocol.

The return value is the number of bytes written, which is always equal to
the length of *buf*.

### `MemoryBIO.write_eof()`

Write an EOF marker to the memory BIO. After this method has been called, it
is illegal to call `write()`. The attribute `eof` will
become true after all data currently in the buffer has been read.

## SSL session

> *Added in version 3.6.*

### class `SSLSession`

Session object used by `session`.
