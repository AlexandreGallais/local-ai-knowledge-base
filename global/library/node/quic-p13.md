---
title: "QUIC (part 13 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 13 of 13)

## Diagnostic Channels

### Channel: `quic.endpoint.created`

* `endpoint` {quic.QuicEndpoint}
* `config` {quic.EndpointOptions}

Published when a new endpoint is created.

### Channel: `quic.endpoint.listen`

* `endpoint` {quic.QuicEndpoint}
* `options` {quic.SessionOptions}

Published when an endpoint begins listening for incoming connections.

### Channel: `quic.endpoint.connect`

* `endpoint` {quic.QuicEndpoint}
* `address` {net.SocketAddress} The target server address.
* `options` {quic.SessionOptions}

Published when `quic.connect()` is about to create a client session.
Fires before the ngtcp2 connection is established, allowing diagnostic
subscribers to observe the connection intent.

### Channel: `quic.endpoint.closing`

* `endpoint` {quic.QuicEndpoint}
* `hasPendingError` {boolean}

Published when an endpoint begins gracefully closing.

### Channel: `quic.endpoint.closed`

* `endpoint` {quic.QuicEndpoint}
* `stats` {quic.QuicEndpoint.Stats} Final endpoint statistics.

Published when an endpoint has finished closing and is destroyed.

### Channel: `quic.endpoint.error`

* `endpoint` {quic.QuicEndpoint}
* `error` {any}

Published when an endpoint encounters an error that causes it to close.

### Channel: `quic.endpoint.busy.change`

* `endpoint` {quic.QuicEndpoint}
* `busy` {boolean}

Published when an endpoint's busy state changes.

### Channel: `quic.session.application`

* `applicationoptions` {quic.ApplicationOptions} Current application options.
* `session` {quic.QuicSession}

Published when a locally-initiated stream is opened.

### Channel: `quic.session.created.client`

* `endpoint` {quic.QuicEndpoint}
* `session` {quic.QuicSession}
* `address` {net.SocketAddress} The remote server address.
* `options` {quic.SessionOptions}

Published when a client-initiated session is created.

### Channel: `quic.session.created.server`

* `endpoint` {quic.QuicEndpoint}
* `session` {quic.QuicSession}
* `address` {net.SocketAddress|undefined} The remote peer address.

Published when a server-side session is created for an incoming connection.

### Channel: `quic.session.open.stream`

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `direction` {string} Either `'bidi'` or `'uni'`.

Published when a locally-initiated stream is opened.

### Channel: `quic.session.received.stream`

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `direction` {string} Either `'bidi'` or `'uni'`.

Published when a remotely-initiated stream is received.

### Channel: `quic.session.send.datagram`

* `id` {bigint} The datagram ID.
* `length` {number} The datagram payload size in bytes.
* `session` {quic.QuicSession}

Published when a datagram is queued for sending.

### Channel: `quic.session.update.key`

* `session` {quic.QuicSession}

Published when a TLS key <example-value> is initiated.

### Channel: `quic.session.closing`

* `session` {quic.QuicSession}

Published when a session begins gracefully closing (including when a
GOAWAY frame is received from the peer).

### Channel: `quic.session.closed`

* `session` {quic.QuicSession}
* `error` {any} The error that caused the close, or `undefined` if clean.
* `stats` {quic.QuicSession.Stats} Final session statistics.

Published when a session is destroyed. The `stats` object is a snapshot
of the final statistics at the time of destruction.

### Channel: `quic.session.error`

* `session` {quic.QuicSession}
* `error` {any} The error that caused the session to be destroyed.

Published when a session is destroyed due to an error. Fires before the
`onerror` callback and before streams are torn down. Unlike
`quic.session.closed` (which fires for both clean and error closes), this
channel fires only when an error is present, making it suitable for
error-only alerting.

### Channel: `quic.session.receive.datagram`

* `length` {number} The datagram payload size in bytes.
* `early` {boolean} Whether the datagram was received as 0-RTT early data.
* `session` {quic.QuicSession}

Published when a datagram is received from the remote peer.

### Channel: `quic.session.receive.datagram.status`

* `id` {bigint} The datagram ID.
* `status` {string} One of `'acknowledged'`, `'lost'`, or `'abandoned'`.
* `session` {quic.QuicSession}

Published when the delivery status of a sent datagram is updated.

### Channel: `quic.session.path.validation`

* `result` {string} One of `'success'`, `'failure'`, or `'aborted'`.
* `newLocalAddress` {net.SocketAddress}
* `newRemoteAddress` {net.SocketAddress}
* `oldLocalAddress` {net.SocketAddress|null}
* `oldRemoteAddress` {net.SocketAddress|null}
* `preferredAddress` {boolean}
* `session` {quic.QuicSession}

Published when a path validation attempt completes.

### Channel: `quic.session.new.token`

* `token` {Buffer} The NEW\_TOKEN token data.
* `address` {net.SocketAddress} The remote server address.
* `session` {quic.QuicSession}

Published when a client session receives a NEW\_TOKEN frame from the
server.

### Channel: `quic.session.ticket`

* `ticket` {Object} The opaque session ticket.
* `session` {quic.QuicSession}

Published when a new TLS session ticket is received.

### Channel: `quic.session.version.negotiation`

* `version` {number} The QUIC version that was configured for this session.
* `requestedVersions` {number\[]} The versions advertised by the server.
* `supportedVersions` {number\[]} The versions supported locally.
* `session` {quic.QuicSession}

Published when the client receives a Version Negotiation packet from the
server. The session is always destroyed immediately after.

### Channel: `quic.session.receive.origin`

* `origins` {string\[]} The list of origins the server is authoritative for.
* `session` {quic.QuicSession}

Published when the session receives an ORIGIN frame (RFC 9412) from
the peer.

### Channel: `quic.session.handshake`

* `session` {quic.QuicSession}
* `servername` {string}
* `protocol` {string}
* `cipher` {string}
* `cipherVersion` {string}
* `validationErrorReason` {string}
* `validationErrorCode` {number}
* `earlyDataAttempted` {boolean}
* `earlyDataAccepted` {boolean}

Published when the TLS handshake completes.

### Channel: `quic.session.goaway`

* `session` {quic.QuicSession}
* `lastStreamId` {bigint} The highest stream ID the peer may have processed.

Published when the peer sends an HTTP/3 GOAWAY frame. Streams with IDs
above `lastStreamId` were not processed and can be retried on a new
connection. A `lastStreamId` of `-1n` indicates a shutdown notice without
a stream boundary.

### Channel: `quic.session.early.rejected`

* `session` {quic.QuicSession}

Published when the server rejects 0-RTT early data. All streams that were
opened during the 0-RTT phase have been destroyed. Useful for diagnosing
latency regressions when 0-RTT is expected to succeed.

### Channel: `quic.stream.closed`

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `error` {any} The error that caused the close, or `undefined` if clean.
* `stats` {quic.QuicStream.Stats} Final stream statistics.

Published when a stream is destroyed. The `stats` object is a snapshot
of the final statistics at the time of destruction.

### Channel: `quic.stream.headers`

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `headers` {Object} The initial request or response headers.

Published when initial headers are received on a stream. For HTTP/3
server-side streams, this contains request pseudo-headers (`:method`,
`:path`, etc.). For client-side streams, this contains response headers
(`:status`, etc.).

### Channel: `quic.stream.trailers`

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `trailers` {Object} The trailing headers.

Published when trailing headers are received on a stream.

### Channel: `quic.stream.info`

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `headers` {Object} The informational headers.

Published when informational (1xx) headers are received on a stream
(e.g., 103 Early Hints).

### Channel: `quic.stream.reset`

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `error` {any} The QUIC error associated with the reset.

Published when a stream receives a RESET\_STREAM frame from the peer,
indicating the peer has aborted its sending direction. This is a key <example-value>
for diagnosing application-level issues such as cancelled requests.

### Channel: `quic.stream.blocked`

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}

Published when a stream is flow-control blocked and cannot send data
until the peer increases the flow control window. Useful for diagnosing
throughput issues caused by flow control.
