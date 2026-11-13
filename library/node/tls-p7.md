---
title: "TLS (SSL) (part 7 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/tls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# TLS (SSL) (part 7 of 8)

## `tls.createSecureContext([options])`

* `options` {Object}
  * `allowPartialTrustChain` {boolean} Treat intermediate (non-self-signed)
    certificates in the trust CA certificate list as trusted.
  * `ca` {string|string\[]|Buffer|Buffer\[]} Optionally override the trusted CA
    certificates. If not specified, the CA certificates trusted by default are
    the same as the ones returned by `tls.getCACertificates()` using the
    `default` type.  If specified, the default list would be completely replaced
    (instead of being concatenated) by the certificates in the `ca` option.
    Users need to concatenate manually if they wish to add additional certificates
    instead of completely overriding the default.
    The value can be a string or `Buffer`, or an `Array` of
    strings and/or `Buffer`s. Any string or `Buffer` can contain multiple PEM
    CAs concatenated together. The peer's certificate must be chainable to a CA
    trusted by the server for the connection to be authenticated. When using
    certificates that are not chainable to a well-known CA, the certificate's CA
    must be explicitly specified as a trusted or the connection will fail to
    authenticate.
    If the peer uses a certificate that doesn't match or chain to one of the
    default CAs, use the `ca` option to provide a CA certificate that the peer's
    certificate can match or chain to.
    For self-signed certificates, the certificate is its own CA, and must be
    provided.
    For PEM encoded certificates, supported types are "TRUSTED CERTIFICATE",
    "X509 CERTIFICATE", and "CERTIFICATE".
  * `cert` {string|string\[]|Buffer|Buffer\[]} Cert chains in PEM format. One
    cert chain should be provided per private key. Each cert chain should
    consist of the PEM formatted certificate for a provided private `key`,
    followed by the PEM formatted intermediate certificates (if any), in order,
    and not including the root CA (the root CA must be pre-known to the peer,
    see `ca`). When providing multiple cert chains, they do not have to be in
    the same order as their private keys in `key`. If the intermediate
    certificates are not provided, the peer will not be able to validate the
    certificate, and the handshake will fail.
  * `certificateCompression` {string\[]} An array of supported certificate
    compression algorithm names, in preference order. Supported values are
    `'zlib'`, `'brotli'`, and `'zstd'`. When set, enables TLS certificate
    compression (RFC 8879) which compresses certificates during the TLS
    handshake, reducing handshake size. Only effective with TLSv1.3.
    **Default:** `[]` (disabled).
  * `sigalgs` {string} Colon-separated list of supported signature algorithms.
    The list can contain digest algorithms (`SHA256`, `MD5` etc.), public key
    algorithms (`RSA-PSS`, `ECDSA` etc.), combination of both (e.g
    'RSA+SHA384') or TLS v1.3 scheme names (e.g. `rsa_pss_pss_sha512`).
    See OpenSSL man pages
    for more info.
  * `ciphers` {string} Cipher suite specification, replacing the default. For
    more information, see Modifying the default TLS cipher suite. Permitted
    ciphers can be obtained via `tls.getCiphers()`. Cipher names must be
    uppercased in order for OpenSSL to accept them.
  * `clientCertEngine` {string} Name of an OpenSSL engine which can provide the
    client certificate. **Deprecated.**
  * `crl` {string|string\[]|Buffer|Buffer\[]} PEM formatted CRLs (Certificate
    Revocation Lists).
  * `dhparam` {string|Buffer} `'auto'` or custom Diffie-Hellman parameters,
    required for non-ECDHE perfect forward secrecy. If omitted or invalid,
    the parameters are silently discarded and DHE ciphers will not be available.
    ECDHE-based perfect forward secrecy will still be available.
  * `ecdhCurve` {string} A string describing a named curve, TLS group, or
    colon-separated list of named curves or TLS groups to use for key <example-value>,
    for example `P-521:P-384:P-256`, `X25519`, or `X25519MLKEM768`. The
    historical name of this option refers to ECDH key <example-value> in TLSv1.2 and
    below. In TLSv1.3, this option configures the TLS Supported Groups and
    key share groups offered or accepted by the TLS stack. Set to `auto` to
    select the group automatically. Use `crypto.getCurves()` to obtain a
    list of available elliptic curve names. For TLS group names, use
    `openssl list -tls-groups` or consult the IANA TLS Supported Groups
    registry.
    **Default:** `tls.DEFAULT_ECDH_CURVE`.
  * `honorCipherOrder` {boolean} Attempt to use the server's cipher suite
    preferences instead of the client's. When `true`, causes
    `SSL_OP_CIPHER_SERVER_PREFERENCE` to be set in `secureOptions`, see
    OpenSSL Options for more information.
  * `key` {string|string\[]|Buffer|Buffer\[]|Object\[]} Private keys in PEM
    format. PEM allows the option of private keys being encrypted. Encrypted
    keys will be decrypted with `options.passphrase`. Multiple keys using
    different algorithms can be provided either as an array of unencrypted key
    strings or buffers, or an array of objects in the form
    `{pem: <string|buffer>[, passphrase: <string>]}`. The object form can only
    occur in an array. `object.passphrase` is optional. Encrypted keys will be
    decrypted with `object.passphrase` if provided, or `options.passphrase` if
    it is not.
  * `privateKeyEngine` {string} Name of an OpenSSL engine to get private key
    from. Should be used together with `privateKeyIdentifier`. **Deprecated.**
  * `privateKeyIdentifier` {string} Identifier of a private key <example-value> by
    an OpenSSL engine. Should be used together with `privateKeyEngine`.
    Should not be set together with `key`, because both options define a
    private key in different ways. **Deprecated.**
  * `maxVersion` {string} Optionally set the maximum TLS version to allow. One
    of `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`. Cannot be specified
    along with the `secureProtocol` option; use one or the other.
    **Default:** `tls.DEFAULT_MAX_VERSION`.
  * `minVersion` {string} Optionally set the minimum TLS version to allow. One
    of `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`. Cannot be specified
    along with the `secureProtocol` option; use one or the other. Avoid
    setting to less than TLSv1.2, but it may be required for
    interoperability. Versions before TLSv1.2 may require downgrading the OpenSSL Security Level.
    **Default:** `tls.DEFAULT_MIN_VERSION`.
  * `passphrase` {string} Shared passphrase used for a single private key <example-value>
    a PFX.
  * `pfx` {string|string\[]|Buffer|Buffer\[]|Object\[]} PFX or PKCS12 encoded
    private key and certificate chain. `pfx` is an alternative to providing
    `key` and `cert` individually. PFX is usually encrypted, if it is,
    `passphrase` will be used to decrypt it. Multiple PFX can be provided either
    as an array of unencrypted PFX buffers, or an array of objects in the form
    `{buf: <string|buffer>[, passphrase: <string>]}`. The object form can only
    occur in an array. `object.passphrase` is optional. Encrypted PFX will be
    decrypted with `object.passphrase` if provided, or `options.passphrase` if
    it is not.
  * `secureOptions` {number} Optionally affect the OpenSSL protocol behavior,
    which is not usually necessary. This should be used carefully if at all!
    Value is a numeric bitmask of the `SSL_OP_*` options from
    OpenSSL Options.
  * `secureProtocol` {string} Legacy mechanism to select the TLS protocol
    version to use, it does not support independent control of the minimum and
    maximum version, and does not support limiting the protocol to TLSv1.3. Use
    `minVersion` and `maxVersion` instead. The possible values are listed as
    SSL\_METHODS, use the function names as strings. For example,
    use `'TLSv1_1_method'` to force TLS version 1.1, or `'TLS_method'` to allow
    any TLS protocol version up to TLSv1.3. It is not recommended to use TLS
    versions less than 1.2, but it may be required for interoperability.
    **Default:** none, see `minVersion`.
  * `sessionIdContext` {string} Opaque identifier used by servers to ensure
    session state is not shared between applications. Unused by clients.
  * `ticketKeys` {Buffer} 48-bytes of cryptographically strong pseudorandom
    data. See Session Resumption for more information.
  * `sessionTimeout` {number} The number of seconds after which a TLS session
    created by the server will no longer be resumable. See
    Session Resumption for more information. **Default:** `300`.

`tls.createServer()` sets the default value of the `honorCipherOrder` option
to `true`, other APIs that create secure contexts leave it unset.

`tls.createServer()` uses a 128 bit truncated SHA1 hash value generated
from `process.argv` as the default value of the `sessionIdContext` option, other
APIs that create secure contexts have no default value.

The `tls.createSecureContext()` method creates a `SecureContext` object. It is
usable as an argument to several `tls` APIs, such as `server.addContext()`,
but has no public methods. The `tls.Server` constructor and the
`tls.createServer()` method do not support the `secureContext` option.

A key is _required_ for ciphers that use certificates. Either `key` or
`pfx` can be used to provide it.

If the `ca` option is not given, then Node.js will default to using
Mozilla's publicly trusted list of CAs.

Custom DHE parameters are discouraged in favor of the new `dhparam: 'auto'`
option. When set to `'auto'`, well-known DHE parameters of sufficient strength
will be selected automatically. Otherwise, if necessary, `openssl dhparam` can
be used to create custom parameters. The key <example-value> must be greater than or
equal to 1024 bits or else an error will be thrown. Although 1024 bits is
permissible, use 2048 bits or larger for stronger security.
