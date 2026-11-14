---
title: "QUIC (part 11 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 11 of 13)

Set to `false` to force creation of a new endpoint for the session. This
is useful when endpoint isolation is required (e.g., testing stateless
reset behavior where source port identity matters).

#### `sessionOptions.verifyClient`

* Type: {boolean}

True to require verification of TLS client certificate.

#### `sessionOptions.verifyPrivateKey` (client only)

* Type: {boolean}

True to require private key <example-value> for client sessions. For server
sessions, this option is specified per-identity in the
`sessionOptions.sni` map.

#### `sessionOptions.version`

* Type: {number}

The QUIC version number to use. This is an advanced option that users typically
won't have need to specify.

### Type: `TransportParams`

The `TransportParams` type represents the QUIC transport parameters that are
negotiated during session establishment. These parameters are used when
creating a session. The negotiated values can be observed via the
`session.localTransportParams` and `session.remoteTransportParams` properties.

#### `transportParams.initialSCID`

* Type: {string}

The initial source connection ID (SCID) specified. This field is ignored on
creation of the session and is provided for informational purposes only when
available in the `session.localTransportParams` and
`session.remoteTransportParams` properties.

#### `transportParams.originalDCID`

* Type: {string}

The original destination connection ID (DCID) specified. This field is
ignored on creation of the session and is provided for informational
purposes only when available in the `session.localTransportParams` and
`session.remoteTransportParams` properties.

#### `transportParams.preferredAddressIpv4`

* Type: {net.SocketAddress} The preferred IPv4 address to advertise (only
  used by servers).

#### `transportParams.preferredAddressIpv6`

* Type: {net.SocketAddress} The preferred IPv6 address to advertise (only
  used by servers)

#### `transportParams.initialMaxStreamDataBidiLocal`

* Type: {bigint|number}

#### `transportParams.initialMaxStreamDataBidiRemote`

* Type: {bigint|number}

#### `transportParams.initialMaxStreamDataUni`

* Type: {bigint|number}

#### `transportParams.initialMaxData`

* Type: {bigint|number}

#### `transportParams.initialMaxStreamsBidi`

* Type: {bigint|number}

#### `transportParams.initialMaxStreamsUni`

* Type: {bigint|number}

#### `transportParams.maxIdleTimeout`

* Type: {bigint|number}

#### `transportParams.activeConnectionIDLimit`

* Type: {bigint|number}

#### `transportParams.ackDelayExponent`

* Type: {bigint|number}

#### `transportParams.maxAckDelay`

* Type: {bigint|number}

#### `transportParams.maxDatagramFrameSize`

* Type: {bigint|number}
* **Default:** `1200`

The maximum size in bytes of a DATAGRAM frame payload that this endpoint
is willing to receive. Set to `0` to disable datagram support. The peer
will not send datagrams larger than this value. The actual maximum size of
a datagram that can be _sent_ is determined by the peer's
`maxDatagramFrameSize`, not this endpoint's value.

#### `transportParams.retrySCID`

* Type: {string}

The retry connection ID specified. This field is ignored on creation
of the session and is provided for informational purposes only when
available in the `session.localTransportParams` and
`session.remoteTransportParams` properties.

## Callbacks

### Callback error handling

All session and stream callbacks may be synchronous functions or async
functions. If a callback throws synchronously or returns a promise that
rejects, the error is caught and the owning session or stream is destroyed
with that error:

* Stream callbacks (`onblocked`, `onreset`, `onstopsending`, `onheaders`,
  `ontrailers`, `oninfo`, `onwanttrailers`): the stream is destroyed.
* Session callbacks (`onapplication`, `onstream`, `ondatagram`,
  `ondatagramstatus`, `onpathvalidation`, `onsessionticket`,
  `onnewtoken`, `onversionnegotiation`, `onorigin`, `ongoaway`,
  `onhandshake`, `onkeylog`, `onqlog`): the session is destroyed along
  with all of its streams.

Before destruction, the optional `session.onerror` or
`stream.onerror` callback is invoked (if set), giving the application a
chance to observe or log the error. The `session.closed` or `stream.closed`
promise will reject with the error.

If the `onerror` callback itself throws or returns a promise that rejects,
the error from `onerror` is surfaced as an uncaught exception.

### Callback: `OnSessionCallback`

* `this` {quic.QuicEndpoint}
* `session` {quic.QuicSession}

The callback function that is invoked when a new server session is initiated by
a remote peer. It is called once the peer's TLS `ClientHello` has been
processed, so the negotiated TLS parameters are immediately available when
the callback runs. Sessions whose handshake is rejected before this point are
never surfaced.

### Callback: `OnStreamCallback`

* `this` {quic.QuicSession}
* `stream` {quic.QuicStream}

### Callback: `OnDatagramCallback`

* `this` {quic.QuicSession}
* `datagram` {Uint8Array}
* `early` {boolean}

### Callback: `OnDatagramStatusCallback`

* `this` {quic.QuicSession}
* `id` {bigint}
* `status` {string} One of `'acknowledged'`, `'lost'`, or `'abandoned'`.
  `'acknowledged'` means the peer confirmed receipt. `'lost'` means the
  datagram was sent but the network lost it. `'abandoned'` means the
  datagram was never sent on the wire (dropped due to queue overflow,
  send attempt limit exceeded, or frame size rejection).

### Callback: `OnApplicationCallback`

* `this` {quic.QuicSession}
* `applicationoption` {quic.QuicSession}

The callback function that is invoked when application options change.
E.g. for http/3 settings are included in applications options and
may arrive after the connection is established.

### Callback: `OnPathValidationCallback`

* `this` {quic.QuicSession}
* `result` {string} One of either `'success'`, `'failure'`, or `'aborted'`.
* `newLocalAddress` {net.SocketAddress} The local address of the validated path.
* `newRemoteAddress` {net.SocketAddress} The remote address of the validated path.
* `oldLocalAddress` {net.SocketAddress | null} The local address of the previous
  path, or `null` if this is the first path validation (e.g., preferred address
  migration from the client's perspective).
* `oldRemoteAddress` {net.SocketAddress | null} The remote address of the previous
  path, or `null`.
* `preferredAddress` {boolean} `true` if the path validation was triggered by
  a preferred address migration on the client side. `undefined` on the server side.

### Callback: `OnSessionTicketCallback`

* `this` {quic.QuicSession}
* `ticket` {Object}

### Callback: `OnVersionNegotiationCallback`

* `this` {quic.QuicSession}
* `version` {number} The QUIC version that was configured for this session
  (the version that the server did not support).
* `requestedVersions` {number\[]} The versions advertised by the server in
  the Version Negotiation packet. These are the versions the server supports.
* `supportedVersions` {number\[]} The versions supported locally, expressed
  as a two-element array `[minVersion, maxVersion]`.

Called when the server responds to the client's Initial packet with a
Version Negotiation packet, indicating that the version used by the client
is not supported. The session is always destroyed immediately after this
callback returns.

### Callback: `OnHandshakeCallback`

* `this` {quic.QuicSession}
* `info` {Object} The same object that `session.opened` resolves with.
  * `local` {net.SocketAddress} The local socket address.
  * `remote` {net.SocketAddress} The remote socket address.
  * `servername` {string} The SNI server name negotiated during the handshake.
  * `protocol` {string} The ALPN protocol negotiated during the handshake.
  * `cipher` {string} The name of the negotiated TLS cipher suite.
  * `cipherVersion` {string} The TLS protocol version of the cipher suite.
  * `validationErrorReason` {string} If certificate validation failed, the
    reason string. Empty string if validation succeeded.
  * `validationErrorCode` {number} If certificate validation failed, the
    error code. `0` if validation succeeded.
  * `earlyDataAttempted` {boolean} Whether 0-RTT early data was attempted.
  * `earlyDataAccepted` {boolean} Whether 0-RTT early data was accepted.

### Callback: `OnNewTokenCallback`

* `this` {quic.QuicSession}
* `token` {Buffer} The NEW\_TOKEN token data.
* `address` {SocketAddress} The remote address the token is associated with.

### Callback: `OnOriginCallback`

* `this` {quic.QuicSession}
* `origins` {string\[]} The list of origins the server is authoritative for.

### Callback: `OnKeylogCallback`

* `this` {quic.QuicSession}
* `line` {string} A single line of NSS Key Log Format text, including
  a trailing newline character.

Called when TLS key <example-value> is available. Only fires when
`sessionOptions.keylog` is `true`. Multiple lines are emitted during the
TLS 1.3 handshake, each containing a secret label, the client random, and
the secret value.

### Callback: `OnQlogCallback`

* `this` {quic.QuicSession}
* `data` {string} A chunk of JSON-SEQ formatted qlog data.
* `fin` {boolean} `true` if this is the final qlog chunk for the session.

Called when qlog diagnostic data is available. Only fires when
`sessionOptions.qlog` is `true`. The `data` chunks should be
concatenated in order to produce the complete qlog output. When `fin` is
`true`, no more chunks will be emitted and the concatenated result is a
complete JSON-SEQ document.

### Callback: `OnBlockedCallback`

* `this` {quic.QuicStream}

### Callback: `OnStreamErrorCallback`

* `this` {quic.QuicStream}
* `error` {any}

### Callback: `OnHeadersCallback`

* `this` {quic.QuicStream}
* `headers` {Object} Header object with lowercase string keys and
  string or string-array values.

Called when initial request or response headers are received. For HTTP/3,
this delivers request pseudo-headers on the server and response headers
on the client.

### Callback: `OnTrailersCallback`

* `this` {quic.QuicStream}
* `trailers` {Object} Trailing header object.

Called when trailing headers are received from the peer.

### Callback: `OnInfoCallback`

* `this` {quic.QuicStream}
* `headers` {Object} Informational header object.

Called when informational (1xx) headers are received from the server
(e.g., 103 Early Hints).
