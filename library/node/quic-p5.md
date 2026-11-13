---
title: "QUIC (part 5 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 5 of 13)

## Class: `QuicSession`

A `QuicSession` represents the local side of a QUIC connection.

### `session.applicationOptions`

* Type: {quic.ApplicationOptions}

The current application-level options for this session. These include settings
that are specific to the negotiated application protocol (e.g. HTTP/3) and may
be negotiated separately from the transport parameters. Read only.
You can use the callback `session.onapplication` to be informed, when settings
from the remote arrive.

### `session.close([options])`

* `options` {Object}
  * `code` {bigint|number} The error code to include in the `CONNECTION_CLOSE`
    frame sent to the peer. Must be a non-negative 62-bit unsigned varint
    (`0n <= code <= 2n ** 62n - 1n`). **Default:** `0` (no error).
  * `type` {string} Either `'transport'` or `'application'`. Determines the
    error code namespace used in the `CONNECTION_CLOSE` frame. When `'transport'`
    (the default), the frame type is `0x1c` and the code is interpreted as a QUIC
    transport error. When `'application'`, the frame type is `0x1d` and the code
    is application-specific. **Default:** `'transport'`.
  * `reason` {string} An optional human-readable reason string included in
    the `CONNECTION_CLOSE` frame. Per RFC 9000, this is for diagnostic purposes
    only and should not be used for machine-readable error descriptions.
* Returns: {Promise}

Initiate a graceful close of the session. Existing streams will be allowed
to complete but no new streams will be opened. Once all streams have closed,
the session will be destroyed. The returned promise will be fulfilled once
the session has been destroyed. If a non-zero `code` is specified, the
promise will reject with an `ERR_QUIC_TRANSPORT_ERROR` or
`ERR_QUIC_APPLICATION_ERROR` depending on the `type`.

### `session.opened`

* Type: {Promise} for an {Object}
  * `local` {net.SocketAddress} The local socket address.
  * `remote` {net.SocketAddress} The remote socket address.
  * `servername` {string} The SNI server name negotiated during the handshake.
  * `protocol` {string} The ALPN protocol negotiated during the handshake.
  * `cipher` {string} The name of the negotiated TLS cipher suite.
  * `cipherVersion` {string} The TLS protocol version of the cipher suite
    (e.g., `'TLSv1.3'`).
  * `validationErrorReason` {string} If certificate validation failed, the
    reason string. Empty string if validation succeeded.
  * `validationErrorCode` {number} If certificate validation failed, the
    error code. `0` if validation succeeded.
  * `earlyDataAttempted` {boolean} Whether 0-RTT early data was attempted.
  * `earlyDataAccepted` {boolean} Whether 0-RTT early data was accepted by
    the server.

A promise that is fulfilled once the TLS handshake completes successfully.
The resolved value contains information about the established session
including the negotiated protocol, cipher suite, certificate validation
status, and 0-RTT early data status.

If the handshake fails or the session is destroyed before the handshake
completes, the promise will be rejected.

### `session.closed`

* Type: {Promise}

A promise that is fulfilled once the session is destroyed.

### `session.closing`

* Type: {boolean}

True if `session.close()` has been called and the session has not yet
been destroyed. Read only.

### `session.destroy([error[, options]])`

* `error` {any}
* `options` {Object}
  * `code` {bigint|number} The error code to include in the `CONNECTION_CLOSE`
    frame sent to the peer. Must be a non-negative 62-bit unsigned varint
    (`0n <= code <= 2n ** 62n - 1n`). **Default:** `0`.
  * `type` {string} Either `'transport'` or `'application'`. **Default:**
    `'transport'`.
  * `reason` {string} An optional human-readable reason string included in
    the `CONNECTION_CLOSE` frame.

Immediately destroy the session. All streams will be destroyed and the
session will be closed. If `error` is provided and `session.onerror` is
set, the `onerror` callback is invoked before destruction. The
`session.closed` promise will reject with the error. If `options` is
provided, the `CONNECTION_CLOSE` frame sent to the peer will include the
specified error code, type, and reason.

### `session.destroyed`

* Type: {boolean}

True if `session.destroy()` has been called. Read only.

### `session.localTransportParams`

* Type: {quic.TransportParams|null}

The transport parameters advertised by the local endpoint during the handshake.
Returns `null` if the session has been destroyed. Read only.

### `session.endpoint`

* Type: {quic.QuicEndpoint|null}

The endpoint that created this session. Returns `null` if the session
has been destroyed. Read only.

### `session.onapplication`

* Type: {quic.OnApplicationCallback}

The callback to invoke when new application options, e.g. HTTP/3 settings arrived.

### `session.onerror`

* Type: {Function|undefined}

An optional callback invoked when the session is destroyed with an error.
This includes errors caused by user callbacks that throw or reject (see
Callback error handling). The callback receives a single argument: the
error that triggered the destruction. If the `onerror` callback itself throws
or returns a promise that rejects, the error is surfaced as an uncaught
exception. Read/write.

Can also be set via the `onerror` option in `quic.connect()` or
`quic.listen()`.

### `session.onstream`

* Type: {quic.OnStreamCallback}

The callback to invoke when a new stream is initiated by a remote peer. Read/write.

If no `onstream` callback is set and the stream has no other consumer, an
incoming stream is destroyed on arrival and a warning is emitted. An
`onheaders` callback counts as a consumer when the negotiated application
protocol supports it (e.g. HTTP/3), because it is invoked for every incoming
request stream. Other stream-level callbacks (`ontrailers`, `oninfo`,
`onwanttrailers`) do not, since they are conditional or outbound-only and
would leave the stream unobservable. An HTTP/3 server that handles requests
entirely through `onheaders` does not need to set `onstream`.

### `session.ondatagram`

* Type: {quic.OnDatagramCallback}

The callback to invoke when a new datagram is received from a remote peer. Read/write.

### `session.ondatagramstatus`

* Type: {quic.OnDatagramStatusCallback}

The callback to invoke when the status of a datagram is updated. Read/write.

### `session.onearlyrejected`

* Type: {Function|undefined}

The callback to invoke when the server rejects 0-RTT early data. When
this fires, all streams that were opened during the 0-RTT phase have
been destroyed. The application should re-open streams if needed.
Read/write.

This callback only fires on the client side when the server rejects
the client's 0-RTT attempt. The connection falls back to 1-RTT and
continues normally.

### `session.onpathvalidation`

* Type: {quic.OnPathValidationCallback}

The callback to invoke when the path validation is updated. Read/write.

### `session.onsessionticket`

* Type: {quic.OnSessionTicketCallback}

The callback to invoke when a new session ticket is received. Read/write.

### `session.onversionnegotiation`

* Type: {quic.OnVersionNegotiationCallback}

The callback to invoke when a version negotiation is initiated. Read/write.

### `session.onhandshake`

* Type: {quic.OnHandshakeCallback}

The callback to invoke when the TLS handshake is completed. Read/write.

### `session.onnewtoken`

* Type: {quic.OnNewTokenCallback}

The callback to invoke when a NEW\_TOKEN token is received from the server.
The token can be passed as the `token` option on a future connection to
the same server to skip address validation. Read/write.

### `session.onorigin`

* Type: {quic.OnOriginCallback}

The callback to invoke when an ORIGIN frame (RFC 9412) is received from
the server, indicating which origins the server is authoritative for.
Read/write.

### `session.ongoaway`

* Type: {Function}

The callback to invoke when the peer sends an HTTP/3 GOAWAY frame,
indicating it is initiating a graceful shutdown. The callback receives
`(lastStreamId)` where `lastStreamId` is a `{bigint}`:

* When `lastStreamId` is `-1n`, the peer sent a shutdown notice (intent
  to close) without specifying a stream boundary. All existing streams
  may still be processed.
* When `lastStreamId` is `>= 0n`, it is the highest stream ID the peer
  may have processed. Streams with IDs above this value were NOT
  processed and can be safely retried on a new connection.

After GOAWAY is received, `session.createBidirectionalStream()` will
throw `ERR_INVALID_STATE`. Existing streams continue until they
complete or the session closes.

This callback is only relevant for HTTP/3 sessions. Read/write.

### `session.onkeylog`

* Type: {quic.OnKeylogCallback}

The callback to invoke when TLS key material is available. Requires
`sessionOptions.keylog` to be `true`. Each invocation receives a single
line of NSS Key Log Format text (including a trailing newline). This is
useful for decrypting packet captures with tools like Wireshark. Read/write.

Can also be set via the `onkeylog` option in `quic.connect()` or
`quic.listen()`.

### `session.onqlog`

* Type: {quic.OnQlogCallback}

The callback to invoke when qlog data is available. Requires
`sessionOptions.qlog` to be `true`. The callback receives a string
chunk of JSON-SEQ formatted qlog data and a boolean `fin` flag. When
`fin` is `true`, the chunk is the final qlog output for this session and
the concatenated chunks form a complete qlog trace. Read/write.

Qlog data arrives during the connection lifecycle. The first chunk contains
the qlog header with format metadata. Subsequent chunks contain trace
events. The final chunk (with `fin` set to `true`) is emitted during
session destruction and completes the JSON-SEQ output.

Can also be set via the `onqlog` option in `quic.connect()` or
`quic.listen()`.

### `session.createBidirectionalStream([options])`

* `options` {Object}
  * `body` {string | ArrayBuffer | SharedArrayBuffer | ArrayBufferView |
    Blob | FileHandle | AsyncIterable | Iterable | Promise | null}
    The outbound body source. See `stream.setBody()` for details on
    supported types. When omitted, the stream's outgoing side remains
    writable with no body queued; no FIN is sent immediately.
  * `headers` {Object} Initial request or response headers to send. Only
    used when the session supports headers (e.g. HTTP/3). If `body` is not
    specified and `headers` is provided, the stream is treated as
    headers-only (terminal).
  * `priority` {string} The priority level of the stream. One of `'high'`,
    `'default'`, or `'low'`. **Default:** `'default'`.
  * `incremental` {boolean} When `true`, data from this stream may be
    interleaved with data from other streams of the same priority level.
    When `false`, the stream should be completed before same-priority peers.
    **Default:** `false`.
  * `budget` {number} The maximum number of bytes that the writer
    will buffer before `writeSync()` returns `false`. When the buffered
    data exceeds this limit, the caller should wait for drain before
    writing more. **Default:** `65536` (64 KB).
  * `onheaders` {Function} Callback for received initial response headers.
    Called with `(headers)`.
  * `ontrailers` {Function} Callback for received trailing headers.
    Called with `(trailers)`.
  * `oninfo` {Function} Callback for received informational (1xx) headers.
    Called with `(headers)`.
  * `onwanttrailers` {Function} Callback when trailers should be sent.
    Called with no arguments; use `stream.sendTrailers()` within the
    callback.
* Returns: {Promise} for a {quic.QuicStream}

Open a new bidirectional stream. If the `body` option is not specified,
the stream's outgoing side remains writable and no FIN is sent
immediately. The `priority` and `incremental`
options are only used when the session supports priority (e.g. HTTP/3).
The `headers`, `onheaders`, `ontrailers`, `oninfo`, and `onwanttrailers`
options are only used when the session supports headers (e.g. HTTP/3).

### `session.createUnidirectionalStream([options])`

* `options` {Object}
  * `body` {string | ArrayBuffer | SharedArrayBuffer | ArrayBufferView |
    Blob | FileHandle | AsyncIterable | Iterable | Promise | null}
    The outbound body source. See `stream.setBody()` for details on
    supported types. When omitted, the stream's outgoing side remains
    writable with no body queued; no FIN is sent immediately.
  * `headers` {Object} Initial request headers to send.
  * `priority` {string} The priority level of the stream. One of `'high'`,
    `'default'`, or `'low'`. **Default:** `'default'`.
  * `incremental` {boolean} When `true`, data from this stream may be
    interleaved with data from other streams of the same priority level.
    When `false`, the stream should be completed before same-priority peers.
    **Default:** `false`.
  * `budget` {number} The maximum number of bytes that the writer
    will buffer before `writeSync()` returns `false`. When the buffered
    data exceeds this limit, the caller should wait for drain before
    writing more. **Default:** `65536` (64 KB).
  * `onheaders` {Function} Callback for received initial response headers.
    Called with `(headers)`.
  * `ontrailers` {Function} Callback for received trailing headers.
    Called with `(trailers)`.
  * `oninfo` {Function} Callback for received informational (1xx) headers.
    Called with `(headers)`.
  * `onwanttrailers` {Function} Callback when trailers should be sent.
* Returns: {Promise} for a {quic.QuicStream}

Open a new unidirectional stream. If the `body` option is not specified,
the stream's outgoing side remains writable and no FIN is sent
immediately. The `priority` and `incremental`
options are only used when the session supports priority (e.g. HTTP/3).

### `session.path`

* Type: {Object|undefined}
  * `local` {net.SocketAddress}
  * `remote` {net.SocketAddress}

The local and remote socket addresses associated with the session. Read only.

### `session.remoteTransportParams`

* Type: {quic.TransportParams|null|undefined}

The transport parameters advertised by the remote peer during the handshake.
Returns `null` if the session has been destroyed, `undefined` if the handshake
has not yet completed and the remote parameters are not yet available. Read
only.
