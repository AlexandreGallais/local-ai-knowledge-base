---
title: "QUIC (part 6 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 6 of 13)

### `session.sendDatagram(datagram[, encoding])`

* `datagram` {string|ArrayBufferView|Promise}
* `encoding` {string} The encoding to use if `datagram` is a string.
  **Default:** `'utf8'`.
* Returns: {Promise} for a {bigint} datagram ID.

Sends an unreliable datagram to the remote peer, returning a promise for
the datagram ID.

If `datagram` is a string, it will be encoded using the specified `encoding`.

If `datagram` is an `ArrayBufferView`, the bytes are copied into an
internal buffer; the caller's source buffer is unchanged and may be reused
or mutated immediately after the call returns. Callers that want to ensure
their source cannot be mutated after the call (for example, when handing
the buffer off to another async consumer) can call
`ArrayBuffer.prototype.transfer()` themselves before passing the buffer.

If `datagram` is a `Promise`, it will be awaited before sending. If the
session closes while awaiting, `0n` is returned silently (datagrams are
inherently unreliable).

If the datagram payload is zero-length (empty string after encoding, detached
buffer, or zero-length view), `0n` is returned and no datagram is sent.

For HTTP/3 sessions, the peer must advertise `SETTINGS_H3_DATAGRAM=1`
(via `application: { enableDatagrams: true }`) for datagrams to be sent.
If the peer's setting is `0`, `sendDatagram()` returns `0n` (per RFC 9297
§3, an endpoint MUST NOT send HTTP Datagrams unless the peer indicated
support).

Datagrams cannot be fragmented — each must fit within a single QUIC packet.
The maximum datagram size is determined by the peer's
`maxDatagramFrameSize` transport parameter (which the peer advertises during
the handshake). If the peer sets this to `0`, datagrams are not supported
and `0n` will be returned. If the datagram exceeds the peer's limit, it
will be silently dropped and `0n` returned. The local
`maxDatagramFrameSize` transport parameter (default: `1200` bytes) controls
what this endpoint advertises to the peer as its own maximum.

### `session.servername`

* Type: {string|boolean|null}

The SNI (Server Name Indication) host name associated with the session. This is
`null` before the client hello is processed. Once the hello has been
processed, this is either the host name string or `false` if the handshake
had no SNI.

### `session.alpnProtocol`

* Type: {string|null}

The negotiated ALPN protocol. This is `null` before the client hello is
processed. Once ALPN has been negotiated, this is the protocol string. ALPN
is mandatory in QUIC so this is never `false` on successful connections,
unlike `node:tls` where this is optional.

### `session.certificate`

* Type: {crypto.X509Certificate|undefined}

The local certificate as a `crypto.X509Certificate` instance. Server
sessions return the certificate configured for the negotiated SNI host.
Client sessions return `undefined` unless a client certificate was sent.
Returns `undefined` if the session is destroyed.

### `session.peerCertificate`

* Type: {crypto.X509Certificate|undefined}

The peer's certificate as a `crypto.X509Certificate` instance. Returns
`undefined` if the peer did not present a certificate or the session is
destroyed.

### `session.ephemeralKeyInfo`

* Type: {Object|undefined}

The ephemeral key <example-value> for the session, with properties such as
`type`, `name`, and `size`. Only available on client sessions. Returns
`undefined` for server sessions or if the session is destroyed.

### `session.maxDatagramSize`

* Type: {number}

The maximum datagram payload size in bytes that the peer will accept.
This is derived from the peer's `maxDatagramFrameSize` transport
parameter minus the DATAGRAM frame overhead (type byte and variable-length
integer encoding). Returns `0` if the peer does not support datagrams or
if the handshake has not yet completed. Datagrams larger than this value
will not be sent.

### `session.maxPendingDatagrams`

* Type: {number}
* **Default:** `128`

The maximum number of datagrams that can be queued for sending. Datagrams
are queued when `sendDatagram()` is called and sent opportunistically
alongside stream data by the packet serialization loop. When the queue
is full, the `sessionOptions.datagramDropPolicy` determines whether
the oldest or newest datagram is dropped. Dropped datagrams are reported
as lost via the `ondatagramstatus` callback.

This property can be changed dynamically to adjust queue capacity
based on application activity or memory pressure. The valid range
is `0` to `65535`.

### `session.stats`

* Type: {quic.QuicSession.Stats}

Return the current statistics for the session. Read only.

### `session.updateKey()`

Initiate a key <example-value> for the session.

### `sessionSymbol.asyncDispose`

Calls `session.close()` and returns a promise that fulfills when the
session has closed.

## Class: `QuicSession.Stats`

### `sessionStats.createdAt`

* Type: {bigint}

### `sessionStats.closingAt`

* Type: {bigint}

### `sessionStats.handshakeCompletedAt`

* Type: {bigint}

### `sessionStats.handshakeConfirmedAt`

* Type: {bigint}

### `sessionStats.bytesReceived`

* Type: {bigint}

### `sessionStats.bytesSent`

* Type: {bigint}

### `sessionStats.bidiInStreamCount`

* Type: {bigint}

### `sessionStats.bidiOutStreamCount`

* Type: {bigint}

### `sessionStats.uniInStreamCount`

* Type: {bigint}

### `sessionStats.uniOutStreamCount`

* Type: {bigint}

### `sessionStats.maxBytesInFlight`

* Type: {bigint}

### `sessionStats.bytesInFlight`

* Type: {bigint}

### `sessionStats.blockCount`

* Type: {bigint}

### `sessionStats.cwnd`

* Type: {bigint}

### `sessionStats.latestRtt`

* Type: {bigint}

### `sessionStats.minRtt`

* Type: {bigint}

### `sessionStats.rttVar`

* Type: {bigint}

### `sessionStats.smoothedRtt`

* Type: {bigint}

### `sessionStats.ssthresh`

* Type: {bigint}

### `sessionStats.datagramsReceived`

* Type: {bigint}

### `sessionStats.datagramsSent`

* Type: {bigint}

### `sessionStats.datagramsAcknowledged`

* Type: {bigint}

### `sessionStats.datagramsLost`

* Type: {bigint}

### `sessionStats.streamsIdleTimedOut`

* Type: {bigint} The total number of peer-initiated streams destroyed by the
  stream idle timeout. Read only.

## Class: `QuicError`

> Stability: 1 - Experimental

A `QuicError` is an `Error` subclass that carries an explicit numeric
QUIC error code. Use it to abort a QUIC stream or session with a
specific application-protocol-defined error code rather than letting
the implementation pick a generic fallback.

The class is exported from `node:quic`:

```mjs
import { QuicError } from 'node:quic';
```

```cjs
const { QuicError } = require('node:quic');
```

When a `QuicError` is supplied to APIs that emit a wire frame
(`writer.fail()`, `stream.destroy()`), the QUIC stack uses
`error.errorCode` as the wire code for the resulting frame.
When any other value is supplied (for example a plain `Error`), the
implementation falls back to the negotiated application protocol's
"internal error" code (`H3_INTERNAL_ERROR` (`0x102`) for HTTP/3, or
the QUIC transport-layer `INTERNAL_ERROR` (`0x1`) for raw QUIC).

The Node.js error code (`error.code`) defaults to
`'ERR_QUIC_STREAM_ABORTED'`. Callers who need a more specific code
string can override it via `options.code` — the numeric QUIC code
is unaffected.

The Node.js error code is fixed at `'ERR_QUIC_STREAM_ABORTED'` so that
catch blocks can distinguish a `QuicError` from other Node.js errors
without checking the prototype chain. The numeric QUIC code lives on
the separate `error.errorCode` property to avoid colliding with
the Node.js convention that `error.code` is a string.

### `new QuicError(message, options)`

* `message` {string} A human-readable description of the error.
* `options` {Object}
  * `errorCode` {bigint | number} The numeric QUIC error code. Numbers
    are coerced to `BigInt`. Must be a non-negative 62-bit unsigned
    varint (`0n <= errorCode <= 2n ** 62n - 1n`).
  * `code` {string} The Node.js-style error code string assigned to
    `error.code`. Defaults to `'ERR_QUIC_STREAM_ABORTED'`.
  * `type` {string} Either `'application'` (default) or `'transport'`.
    Indicates whether the code is defined by the negotiated
    application protocol (e.g. RFC 9114 for HTTP/3) or by the QUIC
    transport layer (RFC 9000). Stream resets always carry application
    codes, so the default is `'application'`.

```mjs
import { QuicError } from 'node:quic';

const err = new QuicError('rejecting stream', { errorCode: 0x10cn });
console.log(err.code);       // 'ERR_QUIC_STREAM_ABORTED'
console.log(err.errorCode);  // 268n
console.log(err.type);       // 'application'

const custom = new QuicError('custom failure', {
  errorCode: 0x10cn,
  code: 'ERR_MY_QUIC_FAILURE',
});
console.log(custom.code);    // 'ERR_MY_QUIC_FAILURE'
```

### `error.errorCode`

* Type: {bigint}

The numeric QUIC error code carried by this error.

### `error.type`

* Type: {string}

Either `'application'` or `'transport'`. Indicates the namespace of
`error.errorCode`.
