---
title: "ssl --- TLS/SSL wrapper for socket objects (part 2 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ssl.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ssl --- TLS/SSL wrapper for socket objects (part 2 of 9)

## Functions, constants, and exceptions

### Socket creation

Instances of `SSLSocket` must be created using the
`SSLContext.wrap_socket()` method. The helper function
`create_default_context()` returns a new context with secure default
settings.

Client socket example with default context and IPv4/IPv6 dual stack:

```
import socket
import ssl

hostname = 'www.python.org'
context = ssl.create_default_context()

with socket.create_connection((hostname, 443)) as sock:
    with context.wrap_socket(sock, server_hostname=hostname) as ssock:
        print(ssock.version())
```

Client socket example with custom context and IPv4:

```
hostname = 'www.python.org'
# PROTOCOL_TLS_CLIENT requires valid cert chain and hostname
context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
context.load_verify_locations('path/to/cabundle.pem')

with socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0) as sock:
    with context.wrap_socket(sock, server_hostname=hostname) as ssock:
        print(ssock.version())
```

Server socket example listening on localhost IPv4:

```
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain('/path/to/certchain.pem', '/path/to/private.key')

with socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0) as sock:
    sock.bind(('127.0.0.1', 8443))
    sock.listen(5)
    with context.wrap_socket(sock, server_side=True) as ssock:
        conn, addr = ssock.accept()
        ...
```

### Context creation

A convenience function helps create `SSLContext` objects for common
purposes.

### `create_default_context(purpose=Purpose.SERVER_AUTH, *,\`

```python
cafile=None, capath=None, cadata=None)
```

Return a new `SSLContext` object with default settings for
the given *purpose*.  The settings are chosen by the `ssl` module,
and usually represent a higher security level than when calling the
`SSLContext` constructor directly.

*cafile*, *capath*, *cadata* represent optional CA certificates to
trust for certificate verification, as in
`SSLContext.load_verify_locations()`.  If all three are
`None`, this function can choose to trust the system's default
CA certificates instead.

The settings are: `PROTOCOL_TLS_CLIENT` or
`PROTOCOL_TLS_SERVER`, `OP_NO_SSLv2`, and `OP_NO_SSLv3`
with high encryption cipher suites without RC4 and
without unauthenticated cipher suites. Passing `SERVER_AUTH`
as *purpose* sets `verify_mode` to `CERT_REQUIRED`
and either loads CA certificates (when at least one of *cafile*, *capath* or
*cadata* is given) or uses `SSLContext.load_default_certs()` to load
default CA certificates.

When `keylog_filename` is supported and the environment
variable `SSLKEYLOGFILE` is set, `create_default_context()`
enables key logging.

The default settings for this context include
`VERIFY_X509_PARTIAL_CHAIN` and `VERIFY_X509_STRICT`.
These make the underlying OpenSSL implementation behave more like
a conforming implementation of RFC 5280, in exchange for a small
amount of incompatibility with older X.509 certificates.

> **Note:** The protocol, options, cipher and other settings may change to more
> restrictive values anytime without prior deprecation.  The values
> represent a fair balance between compatibility and security.
>
> If your application needs specific settings, you should create a
> `SSLContext` and apply the settings yourself.

> **Note:** If you find that when certain older clients or servers attempt to connect
> with a `SSLContext` created by this function that they get an error
> stating "Protocol or cipher suite mismatch", it may be that they only
> support SSL3.0 which this function excludes using the
> `OP_NO_SSLv3`. SSL3.0 is widely considered to be `completely broken
> <https://en.wikipedia.org/wiki/POODLE>`_. If you still wish to continue to
> use this function but still allow SSL 3.0 connections you can re-enable
> them using:
>
>
> ```
> ctx = ssl.create_default_context(Purpose.CLIENT_AUTH)
> ctx.options &= ~ssl.OP_NO_SSLv3
> ```
>

> **Note:** This context enables `VERIFY_X509_STRICT` by default, which
> may reject pre-RFC 5280 or malformed certificates that the
> underlying OpenSSL implementation otherwise would accept. While disabling
> this is not recommended, you can do so using:
>
>
> ```
> ctx = ssl.create_default_context()
> ctx.verify_flags &= ~ssl.VERIFY_X509_STRICT
> ```
>

> *Added in version 3.4.*

> *Changed in version 3.4.4.*
> RC4 was dropped from the default cipher string.

> *Changed in version 3.6.*
> ChaCha20/Poly1305 was added to the default cipher string.
>
> 3DES was dropped from the default cipher string.

> *Changed in version 3.8.*
> Support for key <example-value> to `SSLKEYLOGFILE` was added.

> *Changed in version 3.10.*
> The context now uses `PROTOCOL_TLS_CLIENT` or
> `PROTOCOL_TLS_SERVER` protocol instead of generic
> `PROTOCOL_TLS`.

> *Changed in version 3.13.*
> The context now uses `VERIFY_X509_PARTIAL_CHAIN` and
> `VERIFY_X509_STRICT` in its default verify flags.

### `get_sigalgs()`

Return a list of available TLS signature algorithm names used
by servers to complete the TLS handshake or clients requesting
certificate-based authentication. For example:

```
>>> ssl.get_sigalgs()  # doctest: +SKIP
['ecdsa_secp256r1_sha256', 'ecdsa_secp384r1_sha384', ...]
```

These names can be used when building string values to pass to the
`SSLContext.set_client_sigalgs()` and
`SSLContext.set_server_sigalgs()` methods.

> *Added in version 3.15.*

### exception `SSLError`

Raised to signal an error from the underlying SSL implementation
(currently provided by the OpenSSL library).  This signifies some
problem in the higher-level encryption and authentication layer that's
superimposed on the underlying network connection.  This error
is a subtype of `OSError`.  The error code and message of
`SSLError` instances are provided by the OpenSSL library.

> *Changed in version 3.3.*
> `SSLError` used to be a subtype of `socket.error`.

### `library`

A string mnemonic designating the OpenSSL submodule in which the error
occurred, such as `SSL`, `PEM` or `X509`.  The range of possible
values depends on the OpenSSL version.

> *Added in version 3.3.*

### `reason`

A string mnemonic designating the reason this error occurred, for
example `CERTIFICATE_VERIFY_FAILED`.  The range of possible
values depends on the OpenSSL version.

> *Added in version 3.3.*

### exception `SSLZeroReturnError`

A subclass of `SSLError` raised when trying to read or write and
the SSL connection has been closed cleanly.  Note that this doesn't
mean that the underlying transport (read TCP) has been closed.

> *Added in version 3.3.*

### exception `SSLWantReadError`

A subclass of `SSLError` raised by a :ref:`non-blocking SSL socket
<ssl-nonblocking>` when trying to read or write data, but more data needs
to be received on the underlying TCP transport before the request can be
fulfilled.

> *Added in version 3.3.*

### exception `SSLWantWriteError`

A subclass of `SSLError` raised by a :ref:`non-blocking SSL socket
<ssl-nonblocking>` when trying to read or write data, but more data needs
to be sent on the underlying TCP transport before the request can be
fulfilled.

> *Added in version 3.3.*

### exception `SSLSyscallError`

A subclass of `SSLError` raised when a system error was encountered
while trying to fulfill an operation on a SSL socket.  Unfortunately,
there is no easy way to inspect the original errno number.

> *Added in version 3.3.*

### exception `SSLEOFError`

A subclass of `SSLError` raised when the SSL connection has been
terminated abruptly.  Generally, you shouldn't try to reuse the underlying
transport when this error is encountered.

> *Added in version 3.3.*

### exception `SSLCertVerificationError`

A subclass of `SSLError` raised when certificate validation has
failed.

> *Added in version 3.7.*

### `verify_code`

A numeric error number that denotes the verification error.

### `verify_message`

A human readable string of the verification error.

### exception `CertificateError`

An alias for `SSLCertVerificationError`.

> *Changed in version 3.7.*
> The exception is now an alias for `SSLCertVerificationError`.

### `RAND_bytes(num, /)`

Return *num* cryptographically strong pseudo-random bytes. Raises an
`SSLError` if the PRNG has not been seeded with enough data or if the
operation is not supported by the current RAND method. `RAND_status()`
can be used to check the status of the PRNG and `RAND_add()` can be used
to seed the PRNG.

For almost all applications `os.urandom()` is preferable.

Read the Wikipedia article, `Cryptographically secure pseudorandom number
generator (CSPRNG)
<https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator>`_,
to get the requirements of a cryptographically strong generator.

> *Added in version 3.3.*

### `RAND_status()`

Return `True` if the SSL pseudo-random number generator has been seeded
with 'enough' randomness, and `False` otherwise.  Use `ssl.RAND_add()`
to increase the randomness of the pseudo-random number generator.

### `RAND_add(bytes, entropy, /)`

Mix the given *bytes* into the SSL pseudo-random number generator.  The
parameter *entropy* (a float) is a lower bound on the entropy contained in
string (so you can always use `0.0`).  See RFC 1750 for more
information on sources of entropy.

> *Changed in version 3.5.*
> Writable bytes-like object is now accepted.

### `cert_time_to_seconds(cert_time)`

Return the time in seconds since the epoch, given the `cert_time`
string representing the "notBefore" or "notAfter" date from a
certificate in `"%b %d %H:%M:%S %Y %Z"` strptime format (C
locale).

Here's an example:

```python
newcontext

>>> import ssl
>>> import datetime as dt
>>> timestamp = ssl.cert_time_to_seconds("Jan  5 09:34:43 2018 GMT")
>>> timestamp  # doctest: +SKIP
1515144883
>>> print(dt.datetime.fromtimestamp(timestamp, dt.UTC))  # doctest: +SKIP
2018-01-05 09:34:43+00:00
```

"notBefore" or "notAfter" dates must use GMT (RFC 5280).

> *Changed in version 3.5.*
> Interpret the input time as a time in UTC as specified by 'GMT'
> timezone in the input string. Local timezone was used
> previously. Return an integer (no fractions of a second in the
> input format)

### `get_server_certificate(addr, ssl_version=PROTOCOL_TLS_CLIENT, \`

```python
ca_certs=None[, timeout])
```

Given the address `addr` of an SSL-protected server, as a (*hostname*,
*port-number*) pair, fetches the server's certificate, and returns it as a
PEM-encoded string.  If `ssl_version` is specified, uses that version of
the SSL protocol to attempt to connect to the server.  If *ca_certs* is
specified, it should be a file containing a list of root certificates, the
same format as used for the *cafile* parameter in
`SSLContext.load_verify_locations()`.  The call will attempt to validate the
server certificate against that set of root certificates, and will fail
if the validation attempt fails.  A timeout can be specified with the
`timeout` parameter.

> *Changed in version 3.3.*
> This function is now IPv6-compatible.

> *Changed in version 3.5.*
> The default *ssl_version* is changed from `PROTOCOL_SSLv3` to
> `PROTOCOL_TLS` for maximum compatibility with modern servers.

> *Changed in version 3.10.*
> The *timeout* parameter was added.

### `DER_cert_to_PEM_cert(der_cert_bytes)`

Given a certificate as a DER-encoded blob of bytes, returns a PEM-encoded
string version of the same certificate.

### `PEM_cert_to_DER_cert(pem_cert_string)`

Given a certificate as an ASCII PEM string, returns a DER-encoded sequence of
bytes for that same certificate.

### `get_default_verify_paths()`

Returns a named tuple with paths to OpenSSL's default cafile and capath.
The paths are the same as used by
`SSLContext.set_default_verify_paths()`. The return value is a
named tuple `DefaultVerifyPaths`:

- `cafile` - resolved path to cafile or `None` if the file doesn't exist,
- `capath` - resolved path to capath or `None` if the directory doesn't exist,
- `openssl_cafile_env` - OpenSSL's environment key that points to a cafile,
- `openssl_cafile` - hard coded path to a cafile,
- `openssl_capath_env` - OpenSSL's environment key that points to a capath,
- `openssl_capath` - hard coded path to a capath directory

> *Added in version 3.4.*

### `enum_certificates(store_name)`

Retrieve certificates from Windows' system cert store. *store_name* may be
one of `CA`, `ROOT` or `MY`. Windows may provide additional cert
stores, too.

The function returns a list of (cert_bytes, encoding_type, trust) tuples.
The encoding_type specifies the encoding of cert_bytes. It is either
`x509_asn` for X.509 ASN.1 data or `pkcs_7_asn` for
PKCS#7 ASN.1 data. Trust specifies the purpose of the certificate as a set
of OIDS or exactly `True` if the certificate is trustworthy for all
purposes.

Example:

```
>>> ssl.enum_certificates("CA")
[(b'data...', 'x509_asn', {'1.3.6.1.5.5.7.3.1', '1.3.6.1.5.5.7.3.2'}),
 (b'data...', 'x509_asn', True)]
```

> **Availability:** Windows.

> *Added in version 3.4.*

### `enum_crls(store_name)`

Retrieve CRLs from Windows' system cert store. *store_name* may be
one of `CA`, `ROOT` or `MY`. Windows may provide additional cert
stores, too.

The function returns a list of (cert_bytes, encoding_type, trust) tuples.
The encoding_type specifies the encoding of cert_bytes. It is either
`x509_asn` for X.509 ASN.1 data or `pkcs_7_asn` for
PKCS#7 ASN.1 data.

> **Availability:** Windows.

> *Added in version 3.4.*

### Constants

All constants are now `enum.IntEnum` or `enum.IntFlag` collections.

> *Added in version 3.6.*

### `CERT_NONE`

Possible value for `SSLContext.verify_mode`.
Except for `PROTOCOL_TLS_CLIENT`,
it is the default mode.  With client-side sockets, just about any
cert is accepted.  Validation errors, such as untrusted or expired cert,
are ignored and do not abort the TLS/SSL handshake.

In server mode, no certificate is requested from the client, so the client
does not send any for client cert authentication.

See the discussion of ssl-security below.

### `CERT_OPTIONAL`

Possible value for `SSLContext.verify_mode`.
In client mode, `CERT_OPTIONAL`
has the same meaning as `CERT_REQUIRED`. It is recommended to
use `CERT_REQUIRED` for client-side sockets instead.

In server mode, a client certificate request is sent to the client.  The
client may either ignore the request or send a certificate in order
perform TLS client cert authentication.  If the client chooses to send
a certificate, it is verified.  Any verification error immediately aborts
the TLS handshake.

Use of this setting requires a valid set of CA certificates to
be passed to `SSLContext.load_verify_locations()`.
