---
title: "ssl --- TLS/SSL wrapper for socket objects (part 7 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ssl.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ssl --- TLS/SSL wrapper for socket objects (part 7 of 9)

### `SSLContext.set_psk_client_callback(callback)`

Enables TLS-PSK (pre-shared key) authentication on a client-side connection.

In general, certificate based authentication should be preferred over this method.

The parameter `callback` is a callable object with the signature:
`def callback(hint: str | None) -> tuple[str | None, bytes]`.
The `hint` parameter is an optional identity hint sent by the server.
The return value is a tuple in the form (client-identity, psk).
Client-identity is an optional string which may be used by the server to
select a corresponding PSK for the client. The string must be less than or
equal to `256` octets when UTF-8 encoded. PSK is a
bytes-like object representing the pre-shared key. With TLS 1.2
and earlier, return a zero length PSK to reject the connection.

Setting `callback` to `None` removes any existing callback.

> **Note:** When using TLS 1.3:
>
> - the `hint` parameter is always `None`.
> - client-identity must be a non-empty string.
> - the PSK is only offered to the server, which may decline it and
> authenticate with a certificate instead.  That certificate is checked
> according to `verify_mode`, so a client relying on
> the PSK to authenticate the server should not set it to
> `CERT_NONE`, or should check `SSLSocket.session_reused`,
> which is true if the PSK was used.  A PSK handshake does not need any
> CA certificates to be loaded when using `CERT_REQUIRED`.
> - a zero length PSK does not reject the connection, it only means that
> no PSK is offered.  An exception raised by the callback has the same
> effect.
> - the PSK is used with the SHA-256 handshake digest, so a server can
> only accept it with a cipher suite that uses SHA-256.

Example usage:

```
context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
context.check_hostname = False
context.maximum_version = ssl.TLSVersion.TLSv1_2
context.set_ciphers('PSK')

# A simple lambda:
psk = bytes.fromhex('c0ffee')
context.set_psk_client_callback(lambda hint: (None, psk))

# A table using the hint from the server:
psk_table = { 'ServerId_1': bytes.fromhex('c0ffee'),
              'ServerId_2': bytes.fromhex('facade')
}
def callback(hint):
    return 'ClientId_1', psk_table.get(hint, b'')
context.set_psk_client_callback(callback)
```

This method will raise `NotImplementedError` if `HAS_PSK` is
`False`.

> *Added in version 3.13.*

### `SSLContext.set_psk_server_callback(callback, identity_hint=None)`

Enables TLS-PSK (pre-shared key) authentication on a server-side connection.

In general, certificate based authentication should be preferred over this method.

The parameter `callback` is a callable object with the signature:
`def callback(identity: str | None) -> bytes`.
The `identity` parameter is an optional identity sent by the client which can
be used to select a corresponding PSK.
The return value is a bytes-like object representing the pre-shared key.
With TLS 1.2 and earlier, return a zero length PSK to reject the connection.

Setting `callback` to `None` removes any existing callback.

The parameter `identity_hint` is an optional identity hint string sent to
the client. The string must be less than or equal to `256` octets when
UTF-8 encoded.

> **Note:** When using TLS 1.3:
>
> - the `identity_hint` parameter is not sent to the client.
> - a zero length PSK, or an exception raised by the callback, only
> declines the client's PSK.  If a certificate was loaded with
> `load_cert_chain()`, the handshake continues with
> certificate authentication instead of failing, so a server relying on
> the PSK to authenticate clients should not load one, or should check
> `SSLSocket.session_reused`, which is true if the PSK was used.
> - the PSK can only be accepted with a cipher suite that uses SHA-256.
> When a certificate is loaded, OpenSSL's default TLS 1.3 cipher suite
> order selects a SHA-384 suite instead, so the PSK is declined even if
> it matches.

Example usage:

```
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.maximum_version = ssl.TLSVersion.TLSv1_2
context.set_ciphers('PSK')

# A simple lambda:
psk = bytes.fromhex('c0ffee')
context.set_psk_server_callback(lambda identity: psk)

# A table using the identity of the client:
psk_table = { 'ClientId_1': bytes.fromhex('c0ffee'),
              'ClientId_2': bytes.fromhex('facade')
}
def callback(identity):
    return psk_table.get(identity, b'')
context.set_psk_server_callback(callback, 'ServerId_1')
```

This method will raise `NotImplementedError` if `HAS_PSK` is
`False`.

> *Added in version 3.13.*

## Certificates

Certificates in general are part of a public-key / private-key system.  In this
system, each *principal*, (which may be a machine, or a person, or an
organization) is assigned a unique two-part encryption key.  One part of the key
is public, and is called the *public key*; the other part is kept secret, and is
called the *private key*.  The two parts are related, in that if you encrypt a
message with one of the parts, you can decrypt it with the other part, and
**only** with the other part.

A certificate contains information about two principals.  It contains the name
of a *subject*, and the subject's public key.  It also contains a statement by a
second principal, the *issuer*, that the subject is who they claim to be, and
that this is indeed the subject's public key.  The issuer's statement is signed
with the issuer's private key, which only the issuer knows.  However, anyone can
verify the issuer's statement by finding the issuer's public key, decrypting the
statement with it, and comparing it to the other information in the certificate.
The certificate also contains information about the time period over which it is
valid.  This is expressed as two fields, called "notBefore" and "notAfter".

In the Python use of certificates, a client or server can use a certificate to
prove who they are.  The other side of a network connection can also be required
to produce a certificate, and that certificate can be validated to the
satisfaction of the client or server that requires such validation.  The
connection attempt can be set to raise an exception if the validation fails.
Validation is done automatically, by the underlying OpenSSL framework; the
application need not concern itself with its mechanics.  But the application
does usually need to provide sets of certificates to allow this process to take
place.

Python uses files to contain certificates.  They should be formatted as "PEM"
(see RFC 1422), which is a base-64 encoded form wrapped with a header line
and a footer line:

```
-----BEGIN CERTIFICATE-----
... (certificate in base64 PEM encoding) ...
-----END CERTIFICATE-----
```

### Certificate chains

The Python files which contain certificates can contain a sequence of
certificates, sometimes called a *certificate chain*.  This chain should start
with the specific certificate for the principal who "is" the client or server,
and then the certificate for the issuer of that certificate, and then the
certificate for the issuer of *that* certificate, and so on up the chain till
you get to a certificate which is *self-signed*, that is, a certificate which
has the same subject and issuer, sometimes called a *root certificate*.  The
certificates should just be concatenated together in the certificate file.  For
example, suppose we had a three certificate chain, from our server certificate
to the certificate of the certification authority that signed our server
certificate, to the root certificate of the agency which issued the
certification authority's certificate:

```
-----BEGIN CERTIFICATE-----
... (certificate for your server)...
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
... (the certificate for the CA)...
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
... (the root certificate for the CA's issuer)...
-----END CERTIFICATE-----
```

### CA certificates

If you are going to require validation of the other side of the connection's
certificate, you need to provide a "CA certs" file, filled with the certificate
chains for each issuer you are willing to trust.  Again, this file just contains
these chains concatenated together.  For validation, Python will use the first
chain it finds in the file which matches.  The platform's certificates file can
be used by calling `SSLContext.load_default_certs()`, this is done
automatically with `.create_default_context()`.

### Combined key and certificate

Often the private key is stored in the same file as the certificate; in this
case, only the `certfile` parameter to `SSLContext.load_cert_chain()`
needs to be passed.  If the private key is stored
with the certificate, it should come before the first certificate in
the certificate chain:

```
-----BEGIN RSA PRIVATE KEY-----
... (private key in base64 encoding) ...
-----END RSA PRIVATE KEY-----
-----BEGIN CERTIFICATE-----
... (certificate in base64 PEM encoding) ...
-----END CERTIFICATE-----
```

### Self-signed certificates

If you are going to create a server that provides SSL-encrypted connection
services, you will need to acquire a certificate for that service.  There are
many ways of acquiring appropriate certificates, such as buying one from a
certification authority.  Another common practice is to generate a self-signed
certificate.  The simplest way to do this is with the OpenSSL package, using
something like the following:

```
% openssl req -new -x509 -days 365 -nodes -out cert.pem -keyout cert.pem
Generating a 1024 bit RSA private key
.......++++++
.............................++++++
writing new private key to 'cert.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:MyState
Locality Name (eg, city) []:Some City
Organization Name (eg, company) [Internet Widgits Pty Ltd]:My Organization, Inc.
Organizational Unit Name (eg, section) []:My Group
Common Name (eg, YOUR name) []:myserver.mygroup.myorganization.com
Email Address []:user@example.com
%
```

The disadvantage of a self-signed certificate is that it is its own root
certificate, and no one else will have it in their cache of known (and trusted)
root certificates.
