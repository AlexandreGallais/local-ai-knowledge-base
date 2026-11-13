---
title: "TLS (SSL) (part 5 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/tls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# TLS (SSL) (part 5 of 8)

### `tlsSocket.getPeerCertificate([detailed])`

* `detailed` {boolean} Include the full certificate chain if `true`, otherwise
  include just the peer's certificate.
* Returns: {Object} A certificate object.

Returns an object representing the peer's certificate. If the peer does not
provide a certificate, an empty object will be returned. If the socket has been
destroyed, `null` will be returned.

If the full certificate chain was requested, each certificate will include an
`issuerCertificate` property containing an object representing its issuer's
certificate.

#### Certificate object

A certificate object has properties corresponding to the fields of the
certificate.

* `ca` {boolean} `true` if a Certificate Authority (CA), `false` otherwise.
* `raw` {Buffer} The DER encoded X.509 certificate data.
* `subject` {Object} The certificate subject, described in terms of
  Country (`C`), StateOrProvince (`ST`), Locality (`L`), Organization (`O`),
  OrganizationalUnit (`OU`), and CommonName (`CN`). The CommonName is typically
  a DNS name with TLS certificates. Example:
  `{C: 'UK', ST: 'BC', L: 'Metro', O: 'Node Fans', OU: 'Docs', CN: 'example.com'}`.
* `issuer` {Object} The certificate issuer, described in the same terms as the
  `subject`.
* `valid_from` {string} The date-time the certificate is valid from.
* `valid_to` {string} The date-time the certificate is valid to.
* `serialNumber` {string} The certificate serial number, as a hex string.
  Example: `'B9B0D332A1AA5635'`.
* `fingerprint` {string} The SHA-1 digest of the DER encoded certificate. It is
  returned as a `:` separated hexadecimal string. Example: `'2A:7A:C2:DD:...'`.
* `fingerprint256` {string} The SHA-256 digest of the DER encoded certificate.
  It is returned as a `:` separated hexadecimal string. Example:
  `'2A:7A:C2:DD:...'`.
* `fingerprint512` {string} The SHA-512 digest of the DER encoded certificate.
  It is returned as a `:` separated hexadecimal string. Example:
  `'2A:7A:C2:DD:...'`.
* `ext_key_usage` {Array} (Optional) The extended key usage, a set of OIDs.
* `subjectaltname` {string} (Optional) A string containing concatenated names
  for the subject, an alternative to the `subject` names.
* `infoAccess` {Array} (Optional) An array describing the AuthorityInfoAccess,
  used with OCSP.
* `issuerCertificate` {Object} (Optional) The issuer certificate object. For
  self-signed certificates, this may be a circular reference.

The certificate may contain information about the public key, depending on
the key type.

For RSA keys, the following properties may be defined:

* `bits` {number} The RSA bit size. Example: `1024`.
* `exponent` {string} The RSA exponent, as a string in hexadecimal number
  notation. Example: `'0x010001'`.
* `modulus` {string} The RSA modulus, as a hexadecimal string. Example:
  `'B56CE45CB7...'`.
* `pubkey` {Buffer} The public key.

For EC keys, the following properties may be defined:

* `pubkey` {Buffer} The public key.
* `bits` {number} The key size in bits. Example: `256`.
* `asn1Curve` {string} (Optional) The ASN.1 name of the OID of the elliptic
  curve. Well-known curves are identified by an OID. While it is unusual, it is
  possible that the curve is identified by its mathematical properties, in which
  case it will not have an OID. Example: `'prime256v1'`.
* `nistCurve` {string} (Optional) The NIST name for the elliptic curve, if it
  has one (not all well-known curves have been assigned names by NIST). Example:
  `'P-256'`.

Example certificate:

```js
{ subject:
   { OU: [ 'Domain Control Validated', 'PositiveSSL Wildcard' ],
     CN: '*.nodejs.org' },
  issuer:
   { C: 'GB',
     ST: 'Greater Manchester',
     L: 'Salford',
     O: 'COMODO CA Limited',
     CN: 'COMODO RSA Domain Validation Secure Server CA' },
  subjectaltname: 'DNS:*.nodejs.org, DNS:nodejs.org',
  infoAccess:
   { 'CA Issuers - URI':
      [ 'http://crt.comodoca.com/COMODORSADomainValidationSecureServerCA.crt' ],
     'OCSP - URI': [ 'http://ocsp.comodoca.com' ] },
  modulus: 'B56CE45CB740B09A13F64AC543B712FF9EE8E4C284B542A1708A27E82A8D151CA178153E12E6DDA15BF70FFD96CB8A88618641BDFCCA03527E665B70D779C8A349A6F88FD4EF6557180BD4C98192872BCFE3AF56E863C09DDD8BC1EC58DF9D94F914F0369102B2870BECFA1348A0838C9C49BD1C20124B442477572347047506B1FCD658A80D0C44BCC16BC5C5496CFE6E4A8428EF654CD3D8972BF6E5BFAD59C93006830B5EB1056BBB38B53D1464FA6E02BFDF2FF66CD949486F0775EC43034EC2602AEFBF1703AD221DAA2A88353C3B6A688EFE8387811F645CEED7B3FE46E1F8B9F59FAD028F349B9BC14211D5830994D055EEA3D547911E07A0ADDEB8A82B9188E58720D95CD478EEC9AF1F17BE8141BE80906F1A339445A7EB5B285F68039B0F294598A7D1C0005FC22B5271B0752F58CCDEF8C8FD856FB7AE21C80B8A2CE983AE94046E53EDE4CB89F42502D31B5360771C01C80155918637490550E3F555E2EE75CC8C636DDE3633CFEDD62E91BF0F7688273694EEEBA20C2FC9F14A2A435517BC1D7373922463409AB603295CEB0BB53787A334C9CA3CA8B30005C5A62FC0715083462E00719A8FA3ED0A9828C3871360A73F8B04A4FC1E71302844E9BB9940B77E745C9D91F226D71AFCAD4B113AAF68D92B24DDB4A2136B55A1CD1ADF39605B63CB639038ED0F4C987689866743A68769CC55847E4A06D6E2E3F1',
  exponent: '0x10001',
  pubkey: <Buffer ... >,
  valid_from: 'Aug 14 00:00:00 2017 GMT',
  valid_to: 'Nov 20 23:59:59 2019 GMT',
  fingerprint: '01:02:59:D9:C3:D2:0D:08:F7:82:4E:44:A4:B4:53:C5:E2:3A:87:4D',
  fingerprint256: '69:AE:1A:6A:D4:3D:C6:C1:1B:EA:C6:23:DE:BA:2A:14:62:62:93:5C:7A:EA:06:41:9B:0B:BC:87:CE:48:4E:02',
  fingerprint512: '19:2B:3E:C3:B3:5B:32:E8:AE:BB:78:97:27:E4:BA:6C:39:C9:92:79:4F:31:46:39:E2:70:E5:5F:89:42:17:C9:E8:64:CA:FF:BB:72:56:73:6E:28:8A:92:7E:A3:2A:15:8B:C2:E0:45:CA:C3:BC:EA:40:52:EC:CA:A2:68:CB:32',
  ext_key_usage: [ '1.3.6.1.5.5.7.3.1', '1.3.6.1.5.5.7.3.2' ],
  serialNumber: '66593D57F20CBC573E433381B5FEC280',
  raw: <Buffer ... > }
```

### `tlsSocket.getPeerFinished()`

* Returns: {Buffer|undefined} The latest `Finished` message that is expected
  or has actually been received from the socket as part of an SSL/TLS handshake,
  or `undefined` if there is no `Finished` message so far.

As the `Finished` messages are message digests of the complete handshake
(with a total of 192 bits for TLS 1.0 and more for SSL 3.0), they can
be used for external authentication procedures when the authentication
provided by SSL/TLS is not desired or is not enough.

Corresponds to the `SSL_get_peer_finished` routine in OpenSSL and may be used
to implement the `tls-unique` channel binding from RFC 5929.

### `tlsSocket.getPeerX509Certificate()`

* Returns: {X509Certificate}

Returns the peer certificate as an {X509Certificate} object.

If there is no peer certificate, or the socket has been destroyed,
`undefined` will be returned.

### `tlsSocket.getProtocol()`

* Returns: {string|null}

Returns a string containing the negotiated SSL/TLS protocol version of the
current connection. The value `'unknown'` will be returned for connected
sockets that have not completed the handshaking process. The value `null` will
be returned for server sockets or disconnected client sockets.

Protocol versions are:

* `'SSLv3'`
* `'TLSv1'`
* `'TLSv1.1'`
* `'TLSv1.2'`
* `'TLSv1.3'`

See the OpenSSL `SSL_get_version` documentation for more information.

### `tlsSocket.getSession()`

* Type: {Buffer}

Returns the TLS session data or `undefined` if no session was
negotiated. On the client, the data can be provided to the `session` option of
`tls.connect()` to resume the connection. On the server, it may be useful
for debugging.

See Session Resumption for more information.

Note: `getSession()` works only for TLSv1.2 and below. For TLSv1.3, applications
must use the `'session'` event (it also works for TLSv1.2 and below).

### `tlsSocket.getSharedSigalgs()`

* Returns: {Array} List of signature algorithms shared between the server and
  the client in the order of decreasing preference.

See
SSL\_get\_shared\_sigalgs
for more information.

### `tlsSocket.getTLSTicket()`

* Type: {Buffer}

For a client, returns the TLS session ticket if one is available, or
`undefined`. For a server, always returns `undefined`.

It may be useful for debugging.

See Session Resumption for more information.

### `tlsSocket.getX509Certificate()`

* Returns: {X509Certificate}

Returns the local certificate as an {X509Certificate} object.

If there is no local certificate, or the socket has been destroyed,
`undefined` will be returned.

### `tlsSocket.isSessionReused()`

* Returns: {boolean} `true` if the session was reused, `false` otherwise.

See Session Resumption for more information.

### `tlsSocket.localAddress`

* Type: {string}

Returns the string representation of the local IP address.

### `tlsSocket.localPort`

* Type: {integer}

Returns the numeric representation of the local port.

### `tlsSocket.remoteAddress`

* Type: {string}

Returns the string representation of the remote IP address. For example,
`'74.125.127.100'` or `'2001:4860:a005::68'`.

### `tlsSocket.remoteFamily`

* Type: {string}

Returns the string representation of the remote IP family. `'IPv4'` or `'IPv6'`.

### `tlsSocket.remotePort`

* Type: {integer}

Returns the numeric representation of the remote port. For example, `443`.

### `tlsSocket.renegotiate(options, callback)`

* `options` {Object}
  * `rejectUnauthorized` {boolean} If not `false`, the server certificate is
    verified against the list of supplied CAs. An `'error'` event is emitted if
    verification fails; `err.code` contains the OpenSSL error code. **Default:**
    `true`.
  * `requestCert`

* `callback` {Function} If `renegotiate()` returned `true`, callback is
  attached once to the `'secure'` event. If `renegotiate()` returned `false`,
  `callback` will be called in the next tick with an error, unless the
  `tlsSocket` has been destroyed, in which case `callback` will not be called
  at all.

* Returns: {boolean} `true` if renegotiation was initiated, `false` otherwise.

The `tlsSocket.renegotiate()` method initiates a TLS renegotiation process.
Upon completion, the `callback` function will be passed a single argument
that is either an `Error` (if the request failed) or `null`.

This method can be used to request a peer's certificate after the secure
connection has been established.

When running as the server, the socket will be destroyed with an error after
`handshakeTimeout` timeout.

For TLSv1.3, renegotiation cannot be initiated, it is not supported by the
protocol.

### `tlsSocket.servername`

* Type: {string|boolean|null}

The SNI (Server Name Indication) host name associated with the socket. This is
`null` before the handshake completes. Once the handshake completes it settles
as either the host name string, or `false` if SNI was not used.

### `tlsSocket.setKeyCert(context)`

* `context` {Object|tls.SecureContext} An object containing at least `key` and
  `cert` properties from the `tls.createSecureContext()` `options`, or a
  TLS context object created with `tls.createSecureContext()` itself.

The `tlsSocket.setKeyCert()` method sets the private key and certificate to use
for the socket. This is mainly useful if you wish to select a server certificate
from a TLS server's `ALPNCallback`.

### `tlsSocket.setMaxSendFragment(size)`

* `size` {number} The maximum TLS fragment size. The maximum value is `16384`.
  **Default:** `16384`.
* Returns: {boolean}

The `tlsSocket.setMaxSendFragment()` method sets the maximum TLS fragment size.
Returns `true` if setting the limit succeeded; `false` otherwise.

Smaller fragment sizes decrease the buffering latency on the client: larger
fragments are buffered by the TLS layer until the entire fragment is received
and its integrity is verified; large fragments can span multiple roundtrips
and their processing can be delayed due to packet loss or reordering. However,
smaller fragments add extra TLS framing bytes and CPU overhead, which may
decrease overall server throughput.

## `tls.checkServerIdentity(hostname, cert)`

* `hostname` {string} The host name or IP address to verify the certificate
  against.
* `cert` {Object} A certificate object representing the peer's certificate.
* Returns: {Error|undefined}

Verifies the certificate `cert` is issued to `hostname`.

Returns {Error} object, populating it with `reason`, `host`, and `cert` on
failure. On success, returns {undefined}.

This function is intended to be used in combination with the
`checkServerIdentity` option that can be passed to `tls.connect()` and as
such operates on a certificate object. For other purposes, consider using
`x509.checkHost()` instead.

This function can be overwritten by providing an alternative function as the
`options.checkServerIdentity` option that is passed to `tls.connect()`. The
overwriting function can call `tls.checkServerIdentity()` of course, to augment
the checks done with additional verification.

This function is only called if the certificate passed all other checks, such as
being issued by trusted CA (`options.ca`).

Earlier versions of Node.js incorrectly accepted certificates for a given
`hostname` if a matching `uniformResourceIdentifier` subject alternative name
was present (see CVE-2021-44531). Applications that wish to accept
`uniformResourceIdentifier` subject alternative names can use a custom
`options.checkServerIdentity` function that implements the desired behavior.
