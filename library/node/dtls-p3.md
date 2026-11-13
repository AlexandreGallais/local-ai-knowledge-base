---
title: "DTLS (part 3 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dtls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# DTLS (part 3 of 3)

## Class: `DTLSEndpoint.Stats`

A view of the collected statistics for an endpoint.

### `endpointStats.createdAt`

* Type: {bigint} A timestamp indicating when the endpoint was created. Read only.

### `endpointStats.destroyedAt`

* Type: {bigint} A timestamp indicating when the endpoint was destroyed. Read only.

### `endpointStats.bytesReceived`

* Type: {bigint} The total number of bytes received by this endpoint. Read only.

### `endpointStats.bytesSent`

* Type: {bigint} The total number of bytes sent by this endpoint. Read only.

### `endpointStats.packetsReceived`

* Type: {bigint} The total number of UDP packets received by this endpoint. Read only.

### `endpointStats.packetsSent`

* Type: {bigint} The total number of UDP packets sent by this endpoint. Read only.

### `endpointStats.serverSessions`

* Type: {bigint} The total number of peer-initiated sessions accepted by this
  endpoint. Read only.

### `endpointStats.clientSessions`

* Type: {bigint} The total number of sessions initiated by this endpoint. Read only.

### `endpointStats.serverBusyCount`

* Type: {bigint} The total number of incoming connections rejected because the
  endpoint was marked busy. Read only.

### `endpointStats.serverRejectedCount`

* Type: {bigint} The number of datagrams discarded before a handshake was
  attempted because they could not be a ClientHello. Read only.

Datagrams arriving at a listening endpoint that do not match an existing
session are screened for the shape of a DTLS ClientHello record before any
state is allocated for them. A steadily rising value indicates junk or scan
traffic rather than failing clients, which are counted as sessions that never
complete.

### `endpointStats.serverRefusedCount`

* Type: {bigint} The number of otherwise valid handshake attempts refused
  because the endpoint was at `maxSessions` or the peer was at
  `maxSessionsPerHost`. Read only.

### `endpointStats.isConnected`

* Type: {boolean}

`true` if the stats object is still connected to the underlying endpoint.
Once the endpoint is destroyed, the stats become a stale snapshot.

## Class: `DTLSSession`

Represents a DTLS association with a single remote peer.

### `session.send(data)`

* `data` {string|Buffer|TypedArray|DataView} The data to send. At most 16384
  bytes. A view sends the bytes it covers, so an offset or a subarray is sent
  as given rather than as the whole buffer behind it.
* Returns: {number} The number of bytes written to the DTLS layer.

Send application data to the peer. The data is encrypted by DTLS before
being sent over UDP. Can only be called after the handshake completes
(`session.opened` has resolved).

DTLS carries application data in a single record per datagram and does not
fragment it, so `data` must fit in one record. Sending more throws
`ERR_OUT_OF_RANGE`. This limit is independent of the `mtu` option: a record
larger than the path MTU is still sent, and is fragmented by IP.

Throws `ERR_INVALID_STATE` if the handshake has not completed, or if the
session is closed or destroyed.

A successful return means the data was handed to the DTLS layer and written
to the socket, not that the peer received it. DTLS runs over UDP, so
application data may still be lost in transit.

### `session.close()`

* Returns: {Promise} Resolves when the session is closed.

Initiates a graceful DTLS shutdown by sending a `close_notify` alert.

### `session.destroy([error])`

Immediately destroys the session without sending `close_notify`.

### `session.destroyed`

* {boolean} True once the session has been destroyed, whether by
  `session.destroy()`, by a close, or by its endpoint going away.

### `session.endpoint`

* {DTLSEndpoint} The endpoint carrying this session. For a session from
  `dtls.listen()` this is the listening endpoint, shared with every other
  session on it; for one from `dtls.connect()` it is the endpoint created
  to carry that session alone.

### `session.servername`

* {string|undefined} The server name for this session: the name the client
  sent in the SNI extension, read on either side of the connection.
  `undefined` when no name was sent. See Server name indication.

### `session.opened`

* {Promise} Resolves with `{ protocol }` when the DTLS handshake completes.

Rejects if the handshake fails, and also if the session is closed or
destroyed before the handshake completes -- in that case with
`ERR_INVALID_STATE`, or with the error passed to
`session.destroy()` if one was given. The promise always settles, so
awaiting it cannot hang.

### `session.closed`

* {Promise} Settles when the session is fully closed. Resolves when the close
  was graceful, and rejects with the error when the session was destroyed with
  one, or when its endpoint was. The promise always settles, so awaiting it
  cannot hang.

### `session.remoteAddress`

* Returns: {Object} `{ address, family, port }`

### `session.protocol`

* Returns: {string} The negotiated DTLS protocol version
  (e.g., `'DTLSv1.2'`).

### `session.cipher`

* Returns: {Object} `{ name, standardName, version }`

### `session.peerCertificate`

* Returns: {string|undefined} The peer's certificate in PEM format, or
  `undefined` if the peer sent none.

This is the leaf certificate as PEM text and nothing else. For the issuer chain
and the parsed fields, use `session.peerX509Certificate`, whose `toString()`
returns this same PEM. Use `session.authorized` and
`session.authorizationError` for the verification result rather than
parsing either.

### `session.peerX509Certificate`

* Returns: {X509Certificate|undefined} The peer's certificate, or `undefined`
  if the peer sent none.

An `X509Certificate` for the peer's leaf certificate. The issuer chain is
reachable through its `issuerCertificate` property, and the parsed fields --
`subject`, `issuer`, `validFrom`, `validTo`, `fingerprint256`, `serialNumber`
and the rest -- are properties of that object.

Where `tls.TLSSocket.getPeerCertificate()` returns a plain dictionary with
`valid_from`, `valid_to` and a chain walked through `issuerCertificate`, this
returns the same `X509Certificate` class that
`tls.TLSSocket.getPeerX509Certificate()` does. Call `toLegacyObject()` on
it to get the dictionary form.

The same object is returned on every access once the peer's certificate is
available.

### `session.session`

* Returns: {Buffer|undefined} An opaque session for resuming this connection
  later, or `undefined` on a server session or before the handshake completes.

Pass it as the `session` option to a later `dtls.connect()`. It is bound to
the host this connection authenticated against and is refused elsewhere; see
Session resumption.

Server sessions return `undefined`: a server has no identity to bind the value
to, and it is the client that carries a session between connections.

### `session.reused`

* Returns: {boolean} `true` if this connection resumed an earlier session
  rather than performing a full handshake.

Like `session.authorized`, this reads `false` once the session is closed.

### `session.authorized`

* Returns: {boolean} `true` if the peer presented a certificate chain that
  verified against the configured certificate authorities, and, for a client,
  matched the requested identity. `false` before the handshake completes.

### `session.authorizationError`

* Returns: {string|undefined} The short X509 verification error code, for
  example `'CERT_HAS_EXPIRED'` or `'HOSTNAME_MISMATCH'`, or `undefined` if the
  peer's chain verified.

A peer that presented no certificate at all reports
`'UNABLE_TO_GET_ISSUER_CERT'`, so this can be used to distinguish "no
certificate" from "a certificate that failed to verify".

The chain is verified even when `rejectUnauthorized` is `false`; the result is
simply not enforced. That makes these two properties the way to apply a custom
authorization policy:

```mjs
import { connect } from 'node:dtls';

const session = connect('192.0.2.1', 4433, {
  ca: [caCert],
  servername: 'example.com',
  rejectUnauthorized: false,
});

await session.opened;

if (!session.authorized && session.authorizationError !== 'CERT_HAS_EXPIRED') {
  await session.close();
}
```

### `session.alpnProtocol`

* Returns: {string|undefined} The negotiated ALPN protocol, or `undefined` if
  ALPN was not used.

If a server has `alpn` configured and a client offers only protocols the
server does not support, the server sends a fatal `no_application_protocol`
alert and the handshake fails, as required by RFC 7301 section 3.2. A
server with no `alpn` configured declines the extension instead, and the
handshake completes with no protocol negotiated.

### `session.srtpProfile`

* Returns: {string|undefined} The negotiated SRTP protection profile name.

### `session.stats`

* Type: {DTLSSession.Stats}

The statistics collected for this session. Read only. The stats object is
live and updated as data flows through the session.

### `session.exportKeyingMaterial(length, label[, context])`

* `length` {number} Number of bytes to export. Must be an integer between
  `1` and `65536`.
* `label` {string} The label for the exported keying material.
* `context` {Buffer} Optional context value.
* Returns: {Buffer}

Exports keying material from the DTLS session, as defined in
RFC 5705. This is commonly used with DTLS-SRTP to derive
encryption keys for media streams.

Throws `ERR_OUT_OF_RANGE` if `length` is outside the accepted range. The upper
bound is not imposed by RFC 5705; it exists so that a caller cannot request
an arbitrarily large allocation, and is far above what any defined exporter
needs (DTLS-SRTP uses 60 bytes).

### Callback properties

#### `session.onmessage`

* {Function}
  * `data` {Buffer}

Set to receive application data from the peer.

#### `session.onerror`

* {Function}
  * `error` {Error}

Set to receive error notifications.

#### `session.onhandshake`

* {Function}
  * `protocol` {string}

Set to receive handshake completion notifications.

#### `session.onkeylog`

* {Function}
  * `line` {string}

Set to receive TLS key log lines (for debugging with Wireshark).

### `sessionSymbol.asyncDispose`

Equivalent to calling `session.close()`.

## Class: `DTLSSession.Stats`

A view of the collected statistics for a session.

### `sessionStats.createdAt`

* Type: {bigint} A timestamp indicating when the session was created. Read only.

### `sessionStats.destroyedAt`

* Type: {bigint} A timestamp indicating when the session was destroyed. Read only.

### `sessionStats.closingAt`

* Type: {bigint} A timestamp indicating when `close()` was called. Read only.

### `sessionStats.handshakeCompletedAt`

* Type: {bigint} A timestamp indicating when the DTLS handshake completed. Read only.

### `sessionStats.bytesReceived`

* Type: {bigint} The total number of application data bytes received. Read only.

### `sessionStats.bytesSent`

* Type: {bigint} The total number of application data bytes sent. Read only.

### `sessionStats.messagesReceived`

* Type: {bigint} The total number of application messages received. Read only.

### `sessionStats.messagesSent`

* Type: {bigint} The total number of application messages sent. Read only.

### `sessionStats.retransmitCount`

* Type: {bigint} The total number of DTLS handshake retransmissions. Read only.

### `sessionStats.isConnected`

* Type: {boolean}

`true` if the stats object is still connected to the underlying session.
Once the session is destroyed, the stats become a stale snapshot.

## DTLS-SRTP example

DTLS-SRTP is used by WebRTC for media encryption. The DTLS handshake
negotiates the SRTP protection profile and provides keying material.

```mjs
import { listen, connect } from 'node:dtls';
import { readFileSync } from 'node:fs';

// Server with SRTP
const server = listen((session) => {
  session.onhandshake = () => {
    console.log('SRTP profile:', session.srtpProfile);
    const keys = session.exportKeyingMaterial(
      60,
      'EXTRACTOR-dtls_srtp',
    );
    console.log('SRTP keying material:', keys);
  };
}, {
  cert: readFileSync('server-cert.pem'),
  key: readFileSync('server-key.pem'),
  port: 5004,
  srtp: 'SRTP_AES128_CM_SHA1_80:SRTP_AEAD_AES_128_GCM',
});

// Client with SRTP
const session = connect('127.0.0.1', 5004, {
  rejectUnauthorized: false,
  srtp: 'SRTP_AEAD_AES_128_GCM:SRTP_AES128_CM_SHA1_80',
});

await session.opened;
console.log('Negotiated SRTP:', session.srtpProfile);
const keys = session.exportKeyingMaterial(60, 'EXTRACTOR-dtls_srtp');
```

## MTU considerations

Since libuv does not currently support path MTU discovery, the DTLS module
uses a conservative default MTU of 1200 bytes. This value works across
virtually all network paths but may be suboptimal for local networks.

This bounds the UDP payload, not the application payload: a record carries
somewhat less once its header and MAC are accounted for. It is fixed when the
endpoint is created and cannot be changed afterwards. It does not bound
`session.send()`, which is limited by the DTLS record size instead.

The MTU can be configured via the `mtu` option:

```mjs
// For a local network where you know the path MTU
const endpoint = listen(callback, {
  // ...
  mtu: 1400,
});
```

The minimum allowed MTU is 256 bytes. The maximum is 65535.
