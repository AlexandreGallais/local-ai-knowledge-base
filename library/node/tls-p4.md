---
title: "TLS (SSL) (part 4 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/tls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# TLS (SSL) (part 4 of 8)

## Class: `tls.TLSSocket`

* Extends: {net.Socket}

Performs transparent encryption of written data and all required TLS
negotiation.

Instances of `tls.TLSSocket` implement the duplex Stream interface.

Methods that return TLS connection metadata (e.g.
`tls.TLSSocket.getPeerCertificate()`) will only return data while the
connection is open.

### `new tls.TLSSocket(socket[, options])`

* `socket` {net.Socket|stream.Duplex}
  On the server side, any `Duplex` stream. On the client side, any
  instance of `net.Socket` (for generic `Duplex` stream support
  on the client side, `tls.connect()` must be used).
* `options` {Object}
  * `enableTrace`: See `tls.createServer()`
  * `isServer`: The SSL/TLS protocol is asymmetrical, TLSSockets must know if
    they are to behave as a server or a client. If `true` the TLS socket will be
    instantiated as a server. **Default:** `false`.
  * `server` {net.Server} A `net.Server` instance.
  * `requestCert`: Whether to authenticate the remote peer by requesting a
    certificate. Clients always request a server certificate. Servers
    (`isServer` is true) may set `requestCert` to true to request a client
    certificate.
  * `rejectUnauthorized`: See `tls.createServer()`
  * `ALPNProtocols`: See `tls.createServer()`
  * `SNICallback`: See `tls.createServer()`
  * `ALPNCallback`: See `tls.createServer()`
  * `session` {Buffer} A `Buffer` instance containing a TLS session.
  * `requestOCSP` {boolean} If `true`, specifies that the OCSP status request
    extension will be added to the client hello and an `'OCSPResponse'` event
    will be emitted on the socket before establishing a secure communication
  * `secureContext`: TLS context object created with
    `tls.createSecureContext()`. If a `secureContext` is _not_ provided, one
    will be created by passing the entire `options` object to
    `tls.createSecureContext()`.
  * ...: `tls.createSecureContext()` options that are used if the
    `secureContext` option is missing. Otherwise, they are ignored.

Construct a new `tls.TLSSocket` object from an existing TCP socket.

### Event: `'keylog'`

* `line` {Buffer} Line of ASCII text, in NSS `SSLKEYLOGFILE` format.

The `keylog` event is emitted on a `tls.TLSSocket` when key material
is generated or received by the socket. This keying material can be stored
for debugging, as it allows captured TLS traffic to be decrypted. It may
be emitted multiple times, before or after the handshake completes.

A typical use case is to append received lines to a common text file, which
is later used by software (such as Wireshark) to decrypt the traffic:

```js
const logFile = fs.createWriteStream('/tmp/ssl-keys.log', { flags: 'a' });
// ...
tlsSocket.on('keylog', (line) => logFile.write(line));
```

### Event: `'OCSPResponse'`

The `'OCSPResponse'` event is emitted if the `requestOCSP` option was set
when the `tls.TLSSocket` was created and an OCSP response has been received.
The listener callback is passed a single argument when called:

* `response` {Buffer} The server's OCSP response

Typically, the `response` is a digitally signed object from the server's CA that
contains information about server's certificate revocation status.

### Event: `'secure'`

The `'secure'` event is emitted after the TLS handshake has successfully
completed and a secure connection has been established.

This event is emitted on both client and server {tls.TLSSocket} instances,
including sockets created using the `new tls.TLSSocket()` constructor.

### Event: `'secureConnect'`

The `'secureConnect'` event is emitted after the handshaking process for a new
connection has successfully completed. The listener callback will be called
regardless of whether or not the server's certificate has been authorized. It
is the client's responsibility to check the `tlsSocket.authorized` property to
determine if the server certificate was signed by one of the specified CAs. If
`tlsSocket.authorized === false`, then the error can be found by examining the
`tlsSocket.authorizationError` property. If ALPN was used, the
`tlsSocket.alpnProtocol` property can be checked to determine the negotiated
protocol.

The `'secureConnect'` event is not emitted when a {tls.TLSSocket} is created
using the `new tls.TLSSocket()` constructor.

### Event: `'session'`

* `session` {Buffer}

The `'session'` event is emitted on a client `tls.TLSSocket` when a new session
or TLS ticket is available. This may or may not be before the handshake is
complete, depending on the TLS protocol version that was negotiated. The event
is not emitted on the server, or if a new session was not created, for example,
when the connection was resumed. For some TLS protocol versions the event may be
emitted multiple times, in which case all the sessions can be used for
resumption.

On the client, the `session` can be provided to the `session` option of
`tls.connect()` to resume the connection.

See Session Resumption for more information.

For TLSv1.2 and below, `tls.TLSSocket.getSession()` can be called once
the handshake is complete. For TLSv1.3, only ticket-based resumption is allowed
by the protocol, multiple tickets are sent, and the tickets aren't sent until
after the handshake completes. So it is necessary to wait for the
`'session'` event to get a resumable session. Applications
should use the `'session'` event instead of `getSession()` to ensure
they will work for all TLS versions. Applications that only expect to
get or use one session should listen for this event only once:

```js
tlsSocket.once('session', (session) => {
  // The session can be used immediately or later.
  tls.connect({
    session: session,
    // Other connect options...
  });
});
```

### `tlsSocket.address()`

* Returns: {Object}

Returns the bound `address`, the address `family` name, and `port` of the
underlying socket as reported by the operating system:
`{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`.

### `tlsSocket.alpnProtocol`

* Type: {string|boolean|null}

The negotiated ALPN protocol. This is `null` before the handshake completes.
Once the handshake completes, it settles as either the negotiated protocol
name, or `false` if the peers did not negotiate an ALPN protocol.

### `tlsSocket.authorizationError`

Returns the reason why the peer's certificate was not been verified. This
property is set only when `tlsSocket.authorized === false`.

### `tlsSocket.authorized`

* Type: {boolean}

This property is `true` if the peer certificate was signed by one of the CAs
specified when creating the `tls.TLSSocket` instance, otherwise `false`.

The peer certificate is only verified during a full TLS handshake. When a
connection is established by resuming a previous session (see
Session Resumption), verification is not repeated: `authorized` and
`authorizationError` carry the result stored with the session, including
any verification error and the case where the client presented no
certificate at all.

### `tlsSocket.disableRenegotiation()`

Disables TLS renegotiation for this `TLSSocket` instance. Once called, attempts
to renegotiate will trigger an `'error'` event on the `TLSSocket`.

### `tlsSocket.enableTrace()`

When enabled, TLS packet trace information is written to `stderr`. This can be
used to debug TLS connection problems.

The format of the output is identical to the output of
`openssl s_client -trace` or `openssl s_server -trace`. While it is produced by
OpenSSL's `SSL_trace()` function, the format is undocumented, can change
without notice, and should not be relied on.

### `tlsSocket.encrypted`

Always returns `true`. This may be used to distinguish TLS sockets from regular
`net.Socket` instances.

### `tlsSocket.exportKeyingMaterial(length, label[, context])`

* `length` {number} number of bytes to retrieve from keying material

* `label` {string} an application specific label, typically this will be a
  value from the
  IANA Exporter Label Registry.

* `context` {Buffer} Optionally provide a context.

* Returns: {Buffer} requested bytes of the keying material

Keying material is used for validations to prevent different kind of attacks in
network protocols, for example in the specifications of IEEE 802.1X.

Example

```js
const keyingMaterial = tlsSocket.exportKeyingMaterial(
  128,
  'client finished');

/*
 Example return value of keyingMaterial:
 <Buffer 76 26 af 99 c5 56 8e 42 09 91 ef 9f 93 cb ad 6c 7b 65 f8 53 f1 d8 d9
    12 5a 33 b8 b5 25 df 7b 37 9f e0 e2 4f b8 67 83 a3 2f cd 5d 41 42 4c 91
    74 ef 2c ... 78 more bytes>
*/
```

See the OpenSSL `SSL_export_keying_material` documentation for more
information.

### `tlsSocket.getCertificate()`

* Returns: {Object}

Returns an object representing the local certificate. The returned object has
some properties corresponding to the fields of the certificate.

See `tls.TLSSocket.getPeerCertificate()` for an example of the certificate
structure.

If there is no local certificate, an empty object will be returned. If the
socket has been destroyed, `null` will be returned.

### `tlsSocket.getCipher()`

* Returns: {Object}
  * `name` {string} OpenSSL name for the cipher suite.
  * `standardName` {string} IETF name for the cipher suite.
  * `version` {string} The minimum TLS protocol version supported by this cipher
    suite. For the actual negotiated protocol, see `tls.TLSSocket.getProtocol()`.

Returns an object containing information on the negotiated cipher suite.

For example, a TLSv1.2 protocol with AES256-SHA cipher:

```json
{
    "name": "AES256-SHA",
    "standardName": "TLS_RSA_WITH_AES_256_CBC_SHA",
    "version": "SSLv3"
}
```

See
SSL\_CIPHER\_get\_name
for more information.

### `tlsSocket.getEphemeralKeyInfo()`

* Returns: {Object}

Returns an object describing ephemeral key agreement in perfect forward
secrecy on a client connection. It returns an empty object when the key
agreement is not ephemeral. As this is only supported on a client socket;
`null` is returned if called on a server socket. The supported types are `'DH'`,
`'ECDH'`, and `'TLSGroup'`. For `'DH'` and `'ECDH'`, the object describes peer
temporary key parameters. For `'TLSGroup'`, the object identifies the negotiated
TLS Supported Group used for key agreement when a peer temporary key object is
not available.

The `name` property is available only when type is `'ECDH'` or `'TLSGroup'`. The
`size` property is not available when type is `'TLSGroup'`. For `'TLSGroup'`,
`name` is the negotiated TLS Supported Group name. Standardized TLS group names
and code points are listed in the IANA TLS Supported Groups registry.

For example: `{ type: 'ECDH', name: 'prime256v1', size: 256 }`.

### `tlsSocket.getFinished()`

* Returns: {Buffer|undefined} The latest `Finished` message that has been
  sent to the socket as part of an SSL/TLS handshake, or `undefined` if
  no `Finished` message has been sent yet.

As the `Finished` messages are message digests of the complete handshake
(with a total of 192 bits for TLS 1.0 and more for SSL 3.0), they can
be used for external authentication procedures when the authentication
provided by SSL/TLS is not desired or is not enough.

Corresponds to the `SSL_get_finished` routine in OpenSSL and may be used
to implement the `tls-unique` channel binding from RFC 5929.
