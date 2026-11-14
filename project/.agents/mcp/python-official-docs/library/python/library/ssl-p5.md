---
title: "ssl --- TLS/SSL wrapper for socket objects (part 5 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ssl.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ssl --- TLS/SSL wrapper for socket objects (part 5 of 9)

## SSL contexts

> *Added in version 3.2.*

An SSL context holds various data longer-lived than single SSL connections,
such as SSL configuration options, certificate(s) and private key(s).
It also manages a cache of SSL sessions for server-side sockets, in order
to speed up repeated connections from the same clients.

### class `SSLContext(protocol=None)`

Create a new SSL context.  You may pass *protocol* which must be one
of the `PROTOCOL_*` constants defined in this module.  The parameter
specifies which version of the SSL protocol to use.  Typically, the
server chooses a particular protocol version, and the client must adapt
to the server's choice.  Most of the versions are not interoperable
with the other versions.  If not specified, the default is
`PROTOCOL_TLS`; it provides the most compatibility with other
versions.

Here's a table showing which versions in a client (down the side) can connect
to which versions in a server (along the top):

```text
========================  ============  ============  =============  =========  ===========  ===========
 *client* / **server**    **SSLv2**     **SSLv3**     **TLS** [3]_   **TLSv1**  **TLSv1.1**  **TLSv1.2**
------------------------  ------------  ------------  -------------  ---------  -----------  -----------
 *SSLv2*                    yes           no            no [1]_        no         no         no
 *SSLv3*                    no            yes           no [2]_        no         no         no
 *TLS* (*SSLv23*) [3]_      no [1]_       no [2]_       yes            yes        yes        yes
 *TLSv1*                    no            no            yes            yes        no         no
 *TLSv1.1*                  no            no            yes            no         yes        no
 *TLSv1.2*                  no            no            yes            no         no         yes
========================  ============  ============  =============  =========  ===========  ===========
```

**Footnotes**

> **See also:** `create_default_context()` lets the `ssl` module choose
> security settings for a given purpose.

> *Changed in version 3.6.*
> The context is created with secure default values. The options
> `OP_NO_COMPRESSION`, `OP_CIPHER_SERVER_PREFERENCE`,
> `OP_SINGLE_DH_USE`, `OP_SINGLE_ECDH_USE`,
> `OP_NO_SSLv2`,
> and `OP_NO_SSLv3` (except for `PROTOCOL_SSLv3`) are
> set by default. The initial cipher suite list contains only `HIGH`
> ciphers, no `NULL` ciphers and no `MD5` ciphers.

> *Deprecated since version 3.10.*
> `SSLContext` without protocol argument is deprecated. The
> context class will either require `PROTOCOL_TLS_CLIENT` or
> `PROTOCOL_TLS_SERVER` protocol in the future.

> *Changed in version 3.10.*
> The default cipher suites now include only secure AES and ChaCha20
> ciphers with forward secrecy and security level 2. RSA and DH keys with
> less than 2048 bits and ECC keys with less than 224 bits are prohibited.
> `PROTOCOL_TLS`, `PROTOCOL_TLS_CLIENT`, and
> `PROTOCOL_TLS_SERVER` use TLS 1.2 as minimum TLS version.

> **Note:** `SSLContext` only supports limited mutation once it has been used
> by a connection. Adding new certificates to the internal trust store is
> allowed, but changing ciphers, verification settings, or mTLS
> certificates may result in surprising behavior.

> **Note:** `SSLContext` is designed to be shared and used by multiple
> connections.
> Thus, it is thread-safe as long as it is not reconfigured after being
> used by a connection.

`SSLContext` objects have the following methods and attributes:

### `SSLContext.cert_store_stats()`

Get statistics about quantities of loaded X.509 certificates, count of
X.509 certificates flagged as CA certificates and certificate revocation
lists as dictionary.

Example for a context with one CA cert and one other cert:

```
>>> context.cert_store_stats()
{'crl': 0, 'x509_ca': 1, 'x509': 2}
```

> *Added in version 3.4.*

### `SSLContext.load_cert_chain(certfile, keyfile=None, password=None)`

Load a private key and the corresponding certificate.  The *certfile*
string must be the path to a single file in PEM format containing the
certificate as well as any number of CA certificates needed to establish
the certificate's authenticity.  The *keyfile* string, if present, must
point to a file containing the private key.  Otherwise the private
key will be taken from *certfile* as well.  See the discussion of
ssl-certificates for more information on how the certificate
is stored in the *certfile*.

The *password* argument may be a function to call to get the password for
decrypting the private key.  It will only be called if the private key is
encrypted and a password is necessary.  It will be called with no arguments,
and it should return a string, bytes, or bytearray.  If the return value is
a string it will be encoded as UTF-8 before using it to decrypt the key.
Alternatively a string, bytes, or bytearray value may be supplied directly
as the *password* argument.  It will be ignored if the private key is not
encrypted and no password is needed.

If the *password* argument is not specified and a password is required,
OpenSSL's built-in password <example-value> mechanism will be used to
interactively prompt the user for a password.

An `SSLError` is raised if the private key doesn't
match with the certificate.

> *Changed in version 3.3.*
> New optional argument *password*.

### `SSLContext.load_default_certs(purpose=Purpose.SERVER_AUTH)`

Load a set of default "certification authority" (CA) certificates from
default locations. On Windows it loads CA certs from the `CA` and
`ROOT` system stores. On all systems it calls
`SSLContext.set_default_verify_paths()`. In the future the method may
load CA certificates from other locations, too.

The *purpose* flag specifies what kind of CA certificates are loaded. The
default settings `Purpose.SERVER_AUTH` loads certificates, that are
flagged and trusted for TLS web server authentication (client side
sockets). `Purpose.CLIENT_AUTH` loads CA certificates for client
certificate verification on the server side.

> *Added in version 3.4.*

### `SSLContext.load_verify_locations(cafile=None, capath=None, cadata=None)`

Load a set of "certification authority" (CA) certificates used to validate
other peers' certificates when `verify_mode` is other than
`CERT_NONE`.  At least one of *cafile* or *capath* must be specified.

This method can also load certification revocation lists (CRLs) in PEM or
DER format. In order to make use of CRLs, `SSLContext.verify_flags`
must be configured properly.

The *cafile* string, if present, is the path to a file of concatenated
CA certificates in PEM format. See the discussion of
ssl-certificates for more information about how to arrange the
certificates in this file.

The *capath* string, if present, is
the path to a directory containing several CA certificates in PEM format,
following an `OpenSSL specific layout
<https://docs.openssl.org/master/man3/SSL_CTX_load_verify_locations/>`_.

The *cadata* object, if present, is either an ASCII string of one or more
PEM-encoded certificates or a bytes-like object of DER-encoded
certificates. Like with *capath* extra lines around PEM-encoded
certificates are ignored but at least one certificate must be present.

> *Changed in version 3.4.*
> New optional argument *cadata*

### `SSLContext.get_ca_certs(binary_form=False)`

Get a list of loaded "certification authority" (CA) certificates. If the
`binary_form` parameter is `False` each list
entry is a dict like the output of `SSLSocket.getpeercert()`. Otherwise
the method returns a list of DER-encoded certificates. The returned list
does not contain certificates from *capath* unless a certificate was
requested and loaded by a SSL connection.

> **Note:** Certificates in a capath directory aren't loaded unless they have
> been used at least once.

> *Added in version 3.4.*

### `SSLContext.get_ciphers()`

Get a list of enabled ciphers. The list is in order of cipher priority.
See `SSLContext.set_ciphers()`.

Example:

```
>>> ctx = ssl.SSLContext(ssl.PROTOCOL_SSLv23)
>>> ctx.set_ciphers('ECDHE+AESGCM:!ECDSA')
>>> ctx.get_ciphers()
[{'aead': True,
  'alg_bits': 256,
  'auth': 'auth-rsa',
  'description': 'ECDHE-RSA-AES256-GCM-SHA384 TLSv1.2 Kx=ECDH     Au=RSA  '
                 'Enc=AESGCM(256) Mac=AEAD',
  'digest': None,
  'id': 50380848,
  'kea': 'kx-ecdhe',
  'name': 'ECDHE-RSA-AES256-GCM-SHA384',
  'protocol': 'TLSv1.2',
  'strength_bits': 256,
  'symmetric': 'aes-256-gcm'},
 {'aead': True,
  'alg_bits': 128,
  'auth': 'auth-rsa',
  'description': 'ECDHE-RSA-AES128-GCM-SHA256 TLSv1.2 Kx=ECDH     Au=RSA  '
                 'Enc=AESGCM(128) Mac=AEAD',
  'digest': None,
  'id': 50380847,
  'kea': 'kx-ecdhe',
  'name': 'ECDHE-RSA-AES128-GCM-SHA256',
  'protocol': 'TLSv1.2',
  'strength_bits': 128,
  'symmetric': 'aes-128-gcm'}]
```

> *Added in version 3.6.*

### `SSLContext.get_groups(*, include_aliases=False)`

Get a list of groups implemented for key <example-value>, taking into
account the current TLS `minimum_version` and
`maximum_version` values.  For example:

```
>>> ctx = ssl.create_default_context()
>>> ctx.minimum_version = ssl.TLSVersion.TLSv1_3
>>> ctx.maximum_version = ssl.TLSVersion.TLSv1_3
>>> ctx.get_groups()  # doctest: +SKIP
['secp256r1', 'secp384r1', 'secp521r1', 'x25519', 'x448', ...]
```

By default, this method returns only the preferred IANA names for the
available groups. However, if the `include_aliases` parameter is set to
`True` this method will also return any associated aliases such as
the ECDH curve names supported in older versions of OpenSSL.

> *Added in version 3.15.*

### `SSLContext.set_default_verify_paths()`

Load a set of default "certification authority" (CA) certificates from
a filesystem path defined when building the OpenSSL library.  Unfortunately,
there's no easy way to know whether this method succeeds: no error is
returned if no certificates are to be found.  When the OpenSSL library is
provided as part of the operating system, though, it is likely to be
configured properly.

### `SSLContext.set_ciphers(ciphers, /)`

Set the allowed ciphers for sockets created with this context when
connecting using TLS 1.2 and earlier.  The *ciphers* argument should
be a string in the `OpenSSL cipher list format
<https://docs.openssl.org/master/man1/ciphers/>`_.
To set allowed TLS 1.3 ciphers, use `SSLContext.set_ciphersuites()`.

If no cipher can be selected (because compile-time options or other
configuration forbids use of all the specified ciphers), an
`SSLError` will be raised.

> **Note:** When connected, the `SSLSocket.cipher()` method of SSL sockets will
> return details about the negotiated cipher.

### `SSLContext.set_ciphersuites(ciphersuites, /)`

Set the allowed ciphers for sockets created with this context when
connecting using TLS 1.3.  The *ciphersuites* argument should be a
colon-separate string of TLS 1.3 cipher names.  If no cipher can be
selected (because compile-time options or other configuration forbids
use of all the specified ciphers), an `SSLError` will be raised.

> **Note:** When connected, the `SSLSocket.cipher()` method of SSL sockets will
> return details about the negotiated cipher.

> *Added in version 3.15.*

### `SSLContext.set_groups(groups, /)`

Set the groups allowed for key <example-value> for sockets created with this
context.  It should be a string in the `OpenSSL group list format
<https://docs.openssl.org/master/man3/SSL_CTX_set1_groups_list/>`_.

> **Note:** When connected, the `SSLSocket.group()` method of SSL sockets will
> return the group used for key <example-value> on that connection.

> *Added in version 3.15.*

### `SSLContext.set_client_sigalgs(sigalgs, /)`

Set the signature algorithms allowed for certificate-based client
authentication. It should be a string in the `OpenSSL client sigalgs
list format
<https://docs.openssl.org/master/man3/SSL_CTX_set1_client_sigalgs_list/>`_.

> **Note:** When connected, the `SSLSocket.client_sigalg()` method of SSL
> sockets will return the signature algorithm used for performing
> certificate-based client authentication on that connection.

> *Added in version 3.15.*

### `SSLContext.set_server_sigalgs(sigalgs, /)`

Set the signature algorithms allowed for the server to complete the TLS
handshake. It should be a string in the `OpenSSL sigalgs list format
<https://docs.openssl.org/master/man3/SSL_CTX_set1_sigalgs_list/>`_.

> **Note:** When connected, the `SSLSocket.server_sigalg()` method of SSL
> sockets will return the signature algorithm used by the server to
> complete the TLS handshake on that connection.

> *Added in version 3.15.*

### `SSLContext.set_alpn_protocols(alpn_protocols)`

Specify which protocols the socket should advertise during the SSL/TLS
handshake. It should be a list of ASCII strings, like ``['http/1.1',
'spdy/2']``, ordered by preference. The selection of a protocol will happen
during the handshake, and will play out according to RFC 7301. After a
successful handshake, the `SSLSocket.selected_alpn_protocol()` method will
return the agreed-upon protocol.

This method will raise `NotImplementedError` if `HAS_ALPN` is
`False`.

> *Added in version 3.5.*

### `SSLContext.set_npn_protocols(npn_protocols)`

Specify which protocols the socket should advertise during the SSL/TLS
handshake. It should be a list of strings, like `['http/1.1', 'spdy/2']`,
ordered by preference. The selection of a protocol will happen during the
handshake, and will play out according to the `Application Layer Protocol Negotiation
<https://en.wikipedia.org/wiki/Application-Layer_Protocol_Negotiation>`_. After a
successful handshake, the `SSLSocket.selected_npn_protocol()` method will
return the agreed-upon protocol.

This method will raise `NotImplementedError` if `HAS_NPN` is
`False`.

> *Added in version 3.3.*

> *Deprecated since version 3.10.*
> NPN has been superseded by ALPN
