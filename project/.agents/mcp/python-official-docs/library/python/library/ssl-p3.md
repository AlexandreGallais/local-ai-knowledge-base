---
title: "ssl --- TLS/SSL wrapper for socket objects (part 3 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ssl.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ssl --- TLS/SSL wrapper for socket objects (part 3 of 9)

### `CERT_REQUIRED`

Possible value for `SSLContext.verify_mode`.
In this mode, certificates are
required from the other side of the socket connection; an `SSLError`
will be raised if no certificate is provided, or if its validation fails.
This mode is **not** sufficient to verify a certificate in client mode as
it does not match hostnames.  `check_hostname` must be
enabled as well to verify the authenticity of a cert.
`PROTOCOL_TLS_CLIENT` uses `CERT_REQUIRED` and
enables `check_hostname` by default.

With server socket, this mode provides mandatory TLS client cert
authentication.  A client certificate request is sent to the client and
the client must provide a valid and trusted certificate.

Use of this setting requires a valid set of CA certificates to
be passed to `SSLContext.load_verify_locations()`.

### class `VerifyMode`

`enum.IntEnum` collection of CERT_* constants.

> *Added in version 3.6.*

### `VERIFY_DEFAULT`

Possible value for `SSLContext.verify_flags`. In this mode, certificate
revocation lists (CRLs) are not checked. By default OpenSSL does neither
require nor verify CRLs.

> *Added in version 3.4.*

### `VERIFY_CRL_CHECK_LEAF`

Possible value for `SSLContext.verify_flags`. In this mode, only the
peer cert is checked but none of the intermediate CA certificates. The mode
requires a valid CRL that is signed by the peer cert's issuer (its direct
ancestor CA). If no proper CRL has been loaded with
`SSLContext.load_verify_locations`, validation will fail.

> *Added in version 3.4.*

### `VERIFY_CRL_CHECK_CHAIN`

Possible value for `SSLContext.verify_flags`. In this mode, CRLs of
all certificates in the peer cert chain are checked.

> *Added in version 3.4.*

### `VERIFY_X509_STRICT`

Possible value for `SSLContext.verify_flags` to disable workarounds
for broken X.509 certificates.

> *Added in version 3.4.*

### `VERIFY_ALLOW_PROXY_CERTS`

Possible value for `SSLContext.verify_flags` to enables proxy
certificate verification.

> *Added in version 3.10.*

### `VERIFY_X509_TRUSTED_FIRST`

Possible value for `SSLContext.verify_flags`. It instructs OpenSSL to
prefer trusted certificates when building the trust chain to validate a
certificate. This flag is enabled by default.

> *Added in version 3.4.4.*

### `VERIFY_X509_PARTIAL_CHAIN`

Possible value for `SSLContext.verify_flags`. It instructs OpenSSL to
accept intermediate CAs in the trust store to be treated as trust-anchors,
in the same way as the self-signed root CA certificates. This makes it
possible to trust certificates issued by an intermediate CA without having
to trust its ancestor root CA.

> *Added in version 3.10.*

### class `VerifyFlags`

`enum.IntFlag` collection of VERIFY_* constants.

> *Added in version 3.6.*

### `PROTOCOL_TLS`

Selects the highest protocol version that both the client and server support.
Despite the name, this option can select both "SSL" and "TLS" protocols.

> *Added in version 3.6.*

> *Deprecated since version 3.10.*
> TLS clients and servers require different default settings for secure
> communication. The generic TLS protocol constant is deprecated in
> favor of `PROTOCOL_TLS_CLIENT` and `PROTOCOL_TLS_SERVER`.

### `PROTOCOL_TLS_CLIENT`

Auto-negotiate the highest protocol version that both the client and
server support, and configure the context client-side connections. The
protocol enables `CERT_REQUIRED` and
`check_hostname` by default.

> *Added in version 3.6.*

### `PROTOCOL_TLS_SERVER`

Auto-negotiate the highest protocol version that both the client and
server support, and configure the context server-side connections.

> *Added in version 3.6.*

### `PROTOCOL_SSLv23`

Alias for `PROTOCOL_TLS`.

> *Deprecated since version 3.6.*
> Use `PROTOCOL_TLS` instead.

### `PROTOCOL_SSLv3`

Selects SSL version 3 as the channel encryption protocol.

This protocol is not available if OpenSSL is compiled with the
`no-ssl3` option.

> **Warning:** SSL version 3 is insecure.  Its use is highly discouraged.

> *Deprecated since version 3.6.*
> OpenSSL has deprecated all version specific protocols. Use the default
> protocol `PROTOCOL_TLS_SERVER` or `PROTOCOL_TLS_CLIENT`
> with `SSLContext.minimum_version` and
> `SSLContext.maximum_version` instead.

### `PROTOCOL_TLSv1`

Selects TLS version 1.0 as the channel encryption protocol.

> *Deprecated since version 3.6.*
> OpenSSL has deprecated all version specific protocols.

### `PROTOCOL_TLSv1_1`

Selects TLS version 1.1 as the channel encryption protocol.
Available only with openssl version 1.0.1+.

> *Added in version 3.4.*

> *Deprecated since version 3.6.*
> OpenSSL has deprecated all version specific protocols.

### `PROTOCOL_TLSv1_2`

Selects TLS version 1.2 as the channel encryption protocol.
Available only with openssl version 1.0.1+.

> *Added in version 3.4.*

> *Deprecated since version 3.6.*
> OpenSSL has deprecated all version specific protocols.

### `OP_ALL`

Enables workarounds for various bugs present in other SSL implementations.
This option is set by default.  It does not necessarily set the same
flags as OpenSSL's `SSL_OP_ALL` constant.

> *Added in version 3.2.*

### `OP_NO_SSLv2`

Prevents an SSLv2 connection.  This option is only applicable in
conjunction with `PROTOCOL_TLS`.  It prevents the peers from
choosing SSLv2 as the protocol version.

> *Added in version 3.2.*

> *Deprecated since version 3.6.*
> SSLv2 is deprecated

### `OP_NO_SSLv3`

Prevents an SSLv3 connection.  This option is only applicable in
conjunction with `PROTOCOL_TLS`.  It prevents the peers from
choosing SSLv3 as the protocol version.

> *Added in version 3.2.*

> *Deprecated since version 3.6.*
> SSLv3 is deprecated

### `OP_NO_TLSv1`

Prevents a TLSv1 connection.  This option is only applicable in
conjunction with `PROTOCOL_TLS`.  It prevents the peers from
choosing TLSv1 as the protocol version.

> *Added in version 3.2.*

> *Deprecated since version 3.7.*
> The option is deprecated since OpenSSL 1.1.0, use the new
> `SSLContext.minimum_version` and
> `SSLContext.maximum_version` instead.

### `OP_NO_TLSv1_1`

Prevents a TLSv1.1 connection. This option is only applicable in conjunction
with `PROTOCOL_TLS`. It prevents the peers from choosing TLSv1.1 as
the protocol version. Available only with openssl version 1.0.1+.

> *Added in version 3.4.*

> *Deprecated since version 3.7.*
> The option is deprecated since OpenSSL 1.1.0.

### `OP_NO_TLSv1_2`

Prevents a TLSv1.2 connection. This option is only applicable in conjunction
with `PROTOCOL_TLS`. It prevents the peers from choosing TLSv1.2 as
the protocol version. Available only with openssl version 1.0.1+.

> *Added in version 3.4.*

> *Deprecated since version 3.7.*
> The option is deprecated since OpenSSL 1.1.0.

### `OP_NO_TLSv1_3`

Prevents a TLSv1.3 connection. This option is only applicable in conjunction
with `PROTOCOL_TLS`. It prevents the peers from choosing TLSv1.3 as
the protocol version. TLS 1.3 is available with OpenSSL 1.1.1 or later.
When Python has been compiled against an older version of OpenSSL, the
flag defaults to *0*.

> *Added in version 3.6.3.*

> *Deprecated since version 3.7.*
> The option is deprecated since OpenSSL 1.1.0. It was added to 2.7.15 and
> 3.6.3 for backwards compatibility with OpenSSL 1.0.2.

### `OP_NO_RENEGOTIATION`

Disable all renegotiation in TLSv1.2 and earlier. Do not send
HelloRequest messages, and ignore renegotiation requests via ClientHello.

This option is only available with OpenSSL 1.1.0h and later.

> *Added in version 3.7.*

### `OP_CIPHER_SERVER_PREFERENCE`

Use the server's cipher ordering preference, rather than the client's.
This option has no effect on client sockets and SSLv2 server sockets.

> *Added in version 3.3.*

### `OP_SINGLE_DH_USE`

Prevents reuse of the same DH key for distinct SSL sessions.  This
improves forward secrecy but requires more computational resources.
This option only applies to server sockets.

> *Added in version 3.3.*

### `OP_SINGLE_ECDH_USE`

Prevents reuse of the same ECDH key for distinct SSL sessions.  This
improves forward secrecy but requires more computational resources.
This option only applies to server sockets.

> *Added in version 3.3.*

### `OP_ENABLE_MIDDLEBOX_COMPAT`

Send dummy Change Cipher Spec (CCS) messages in TLS 1.3 handshake to make
a TLS 1.3 connection look more like a TLS 1.2 connection.

This option is only available with OpenSSL 1.1.1 and later.

> *Added in version 3.8.*

### `OP_NO_COMPRESSION`

Disable compression on the SSL channel.  This is useful if the application
protocol supports its own compression scheme.

> *Added in version 3.3.*

### class `Options`

`enum.IntFlag` collection of OP_* constants.

### `OP_NO_TICKET`

Prevent client side from requesting a session ticket.

> *Added in version 3.6.*

### `OP_IGNORE_UNEXPECTED_EOF`

Ignore unexpected shutdown of TLS connections.

This option is only available with OpenSSL 3.0.0 and later.

> *Added in version 3.10.*

### `OP_ENABLE_KTLS`

Enable the use of the kernel TLS. To benefit from the feature, OpenSSL must
have been compiled with support for it, and the negotiated cipher suites and
extensions must be supported by it (a list of supported ones may vary by
platform and kernel version).

Note that with enabled kernel TLS some cryptographic operations are
performed by the kernel directly and not via any available OpenSSL
Providers. This might be undesirable if, for example, the application
requires all cryptographic operations to be performed by the FIPS provider.

This option is only available with OpenSSL 3.0.0 and later.

> *Added in version 3.12.*

### `OP_LEGACY_SERVER_CONNECT`

Allow legacy insecure renegotiation between OpenSSL and unpatched servers
only.

> *Added in version 3.12.*

### `HAS_ALPN`

Whether the OpenSSL library has built-in support for the *Application-Layer
Protocol Negotiation* TLS extension as described in RFC 7301.

> *Added in version 3.5.*

### `HAS_NEVER_CHECK_COMMON_NAME`

Whether the OpenSSL library has built-in support not checking subject
common name and `SSLContext.hostname_checks_common_name` is
writeable.

> *Added in version 3.7.*

### `HAS_ECDH`

Whether the OpenSSL library has built-in support for the Elliptic Curve-based
Diffie-Hellman key exchange.  This should be true unless the feature was
explicitly disabled by the distributor.

> *Added in version 3.3.*

### `HAS_SNI`

Whether the OpenSSL library has built-in support for the *Server Name
Indication* extension (as defined in RFC 6066).

> *Added in version 3.2.*

### `HAS_NPN`

Whether the OpenSSL library has built-in support for the *Next Protocol
Negotiation* as described in the `Application Layer Protocol
Negotiation <https://en.wikipedia.org/wiki/Application-Layer_Protocol_Negotiation>`_.
When true, you can use the `SSLContext.set_npn_protocols()` method to advertise
which protocols you want to support.

> *Added in version 3.3.*

### `HAS_SSLv2`

Whether the OpenSSL library has built-in support for the SSL 2.0 protocol.

> *Added in version 3.7.*

### `HAS_SSLv3`

Whether the OpenSSL library has built-in support for the SSL 3.0 protocol.

> *Added in version 3.7.*

### `HAS_TLSv1`

Whether the OpenSSL library has built-in support for the TLS 1.0 protocol.

> *Added in version 3.7.*

### `HAS_TLSv1_1`

Whether the OpenSSL library has built-in support for the TLS 1.1 protocol.

> *Added in version 3.7.*

### `HAS_TLSv1_2`

Whether the OpenSSL library has built-in support for the TLS 1.2 protocol.

> *Added in version 3.7.*

### `HAS_TLSv1_3`

Whether the OpenSSL library has built-in support for the TLS 1.3 protocol.

> *Added in version 3.7.*

### `HAS_PSK`

Whether the OpenSSL library has built-in support for TLS-PSK.

> *Added in version 3.13.*

### `HAS_PSK_TLS13`

Whether the OpenSSL library has built-in support for External PSKs in TLS
1.3 as described in RFC 9258.

> *Added in version 3.15.*

### `HAS_PHA`

Whether the OpenSSL library has built-in support for TLS-PHA.

> *Added in version 3.14.*

### `CHANNEL_BINDING_TYPES`

List of supported TLS channel binding types.  Strings in this list
can be used as arguments to `SSLSocket.get_channel_binding()`.

> *Added in version 3.3.*

### `OPENSSL_VERSION`

The version string of the OpenSSL library loaded by the interpreter:

```
>>> ssl.OPENSSL_VERSION
'OpenSSL 1.0.2k  26 Jan 2017'
```

> *Added in version 3.2.*

### `OPENSSL_VERSION_INFO`

A tuple of five integers representing version information about the
OpenSSL library:

```
>>> ssl.OPENSSL_VERSION_INFO
(1, 0, 2, 11, 15)
```

> *Added in version 3.2.*

### `OPENSSL_VERSION_NUMBER`

The raw version number of the OpenSSL library, as a single integer:

```
>>> ssl.OPENSSL_VERSION_NUMBER
268443839
>>> hex(ssl.OPENSSL_VERSION_NUMBER)
'0x100020bf'
```

> *Added in version 3.2.*

### `ALERT_DESCRIPTION_HANDSHAKE_FAILURE`

```python
ALERT_DESCRIPTION_INTERNAL_ERROR
ALERT_DESCRIPTION_*
```

Alert Descriptions from RFC 5246 and others. The `IANA TLS Alert Registry
<https://www.iana.org/assignments/tls-parameters/tls-parameters.xml#tls-parameters-6>`_
contains this list and references to the RFCs where their meaning is defined.

Used as the return value of the callback function in
`SSLContext.set_servername_callback()`.

> *Added in version 3.4.*

### class `AlertDescription`

`enum.IntEnum` collection of ALERT_DESCRIPTION_* constants.

> *Added in version 3.6.*

### `Purpose.SERVER_AUTH`

Option for `create_default_context()` and
`SSLContext.load_default_certs()`.  This value indicates that the
context may be used to authenticate web servers (therefore, it will
be used to create client-side sockets).

> *Added in version 3.4.*

### `Purpose.CLIENT_AUTH`

Option for `create_default_context()` and
`SSLContext.load_default_certs()`.  This value indicates that the
context may be used to authenticate web clients (therefore, it will
be used to create server-side sockets).

> *Added in version 3.4.*

### class `SSLErrorNumber`

`enum.IntEnum` collection of SSL_ERROR_* constants.

> *Added in version 3.6.*

### class `TLSVersion`

`enum.IntEnum` collection of SSL and TLS versions for
`SSLContext.maximum_version` and `SSLContext.minimum_version`.

> *Added in version 3.7.*

### `TLSVersion.MAXIMUM_SUPPORTED`

The minimum or maximum supported SSL or TLS version. These are magic
constants. Their values don't reflect the lowest and highest available
TLS/SSL versions.

### `TLSVersion.TLSv1_3`

SSL 3.0 to TLS 1.3.

> *Deprecated since version 3.10.*
> All `TLSVersion` members except `TLSVersion.TLSv1_2` and
> `TLSVersion.TLSv1_3` are deprecated.
