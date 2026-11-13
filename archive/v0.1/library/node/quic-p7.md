---
title: "QUIC (part 7 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 7 of 13)

## Class: `QuicStream`

### `stream.opened`

* Type: {Promise}

A promise that is immediately fulfilled, if the stream fits within
flow control limits or fulfilled when the pending stream is created.
It rejects, if a pending stream is closed with an error before being
created.

### `stream.closed`

* Type: {Promise}

A promise that is fulfilled when the stream is fully closed. It resolves
when the stream closes cleanly (including idle timeout). It rejects with
an `ERR_QUIC_APPLICATION_ERROR` or `ERR_QUIC_TRANSPORT_ERROR` when the
stream is closed due to a QUIC error (e.g., stream reset by the peer,
CONNECTION\_CLOSE with a non-zero error code).

### `stream.destroy([error[, options]])`

* `error` {any}
* `options` {Object}
  * `code` {bigint|number} The application error code to include in the
    `RESET_STREAM` and `STOP_SENDING` frames sent to the peer. Numbers are
    coerced to `BigInt`. When omitted, the wire code is derived from `error`
    (see below).
  * `reason` {string} An optional human-readable reason string. Accepted for
    symmetry with `session.close()` and `session.destroy()`, but
    **not transmitted on the wire** — neither `RESET_STREAM` nor
    `STOP_SENDING` carry a reason field. Provided for application logging
    and for use by the `stream.onerror` callback.

Immediately and abruptly destroys the stream. If `error` is provided and
`stream.onerror` is set, the `onerror` callback is invoked before
destruction. The `stream.closed` promise rejects with the error.

When the stream is destroyed with an `error` (or with an explicit
`options.code`), the QUIC stack signals the abort to the peer:

* If the writable side is still open, a `RESET_STREAM` frame is sent.
* If the readable side is still open (a bidirectional stream, or a
  remote-initiated unidirectional stream), a `STOP_SENDING` frame is sent.

Both frames carry the same wire code, resolved with the following
precedence:

1. `options.code`, when explicitly provided.
2. `error.errorCode`, when `error` is a `QuicError`.
3. The negotiated application protocol's "internal error" code
   (`H3_INTERNAL_ERROR` (`0x102`) for HTTP/3, or the QUIC transport-layer
   `INTERNAL_ERROR` (`0x1`) for raw QUIC).

A clean destroy — no `error` and no `options.code` — does not emit
`RESET_STREAM` or `STOP_SENDING`; the stream's existing close machinery
handles teardown.

See Aborting a stream for an overview of the available stream-abort
APIs.

### `stream.destroyed`

* Type: {boolean}

True if `stream.destroy()` has been called.

### Aborting a stream

A QuicStream can be aborted in several ways, each producing different
wire-frame side effects:

* `stream.stopSending()` — Aborts only the readable side. Sends
  `STOP_SENDING` to the peer. The writable side is unaffected.
* `stream.resetStream()` — Aborts only the writable side. Sends
  `RESET_STREAM` to the peer. Unlike `writer.fail(reason)`, the wire
  code is given directly rather than derived from an error.
* `writer.fail(reason)` — Aborts only the writable side. Sends
  `RESET_STREAM` to the peer. The readable side is unaffected; any data
  already buffered for read remains available.
* `stream.destroy()` with an `error` argument — Tears the stream
  down completely. Sends `RESET_STREAM` on any still-open writable side
  **and** `STOP_SENDING` on any still-open readable side. The wire code
  is derived from `error` (see `stream.destroy()` for the precedence
  rules).
* `stream.destroy()` with an explicit `options.code` — Same as the
  previous form but with a caller-supplied wire code, which takes
  precedence over any code carried by `error`.

When `error` is a `QuicError`, its `error.errorCode` is used as
the wire code for both `writer.fail()` and `stream.destroy()`. Otherwise
the implementation falls back to the negotiated application protocol's
"internal error" code (see `QuicError`).

`stream.stopSending()` and `stream.resetStream()` do
not perform this derivation: they send `code` as given.

### `stream.resetStream([code])`

* `code` {number|bigint} The application error code to send to the peer.
  **Default:** `0n`.

Tells the peer that this end will not send any more data on this stream,
sending a `RESET_STREAM` frame carrying `code`. The readable side is left
open, so data already sent by the peer remains available to read.

Any data still queued for sending is discarded. A reset stream is never
acknowledged by the peer, so the outbound queue can no longer drain.

No acknowledgement of this action is provided. The call does nothing if the
stream has been destroyed, if it has already been reset, or if it is a
remote-initiated unidirectional stream, which has no writable side to abort.

### `stream.stopSending([code])`

* `code` {number|bigint} The application error code to send to the peer.
  **Default:** `0n`.

Asks the peer to stop sending data on this stream, sending a `STOP_SENDING`
frame carrying `code`. The writable side is left open, so this end can
still send data.

No acknowledgement of this action is provided. The call does nothing if the
stream has been destroyed, or if it is a locally-initiated unidirectional
stream, which has no readable side to abort.

### `stream.early`

* Type: {boolean}

True if any data on this stream was received as 0-RTT (early data)
before the TLS handshake completed. Early data is less secure and
could potentially be replayed by an attacker. Applications should
treat early data with appropriate caution.

This property is only meaningful on the server side. On the client
side, it is always `false`.

### `stream.direction`

* Type: {string|null} One of `'bidi'`, `'uni'`, or `null`.

The directionality of the stream, or `null` if the stream has been destroyed
or is still pending. Read only.

### `stream.budget`

* Type: {number}

The maximum number of bytes that the writer will buffer before
`writeSync()` returns `false`. When the buffered data exceeds this limit,
the caller should wait for drain before writing more.

The value can be changed dynamically at any time. This is particularly
useful for streams received via the `onstream` callback, where the
default (65536) may need to be adjusted based on application needs.
The valid range is `0` to `4294967295`.

### `stream.id`

* Type: {bigint|null}

The stream ID, or `null` if the stream has been destroyed or is still
pending. Read only.

### `stream.onerror`

* Type: {Function|undefined}

An optional callback invoked when the stream is destroyed with an error.
This includes errors caused by user callbacks that throw or reject (see
Callback error handling). The callback receives a single argument: the
error that triggered the destruction. If the `onerror` callback itself throws
or returns a promise that rejects, the error is surfaced as an uncaught
exception. Read/write.

### `stream.onblocked`

* Type: {quic.OnBlockedCallback}

The callback to invoke when the stream is blocked. Read/write.

### `stream.onreset`

* Type: {quic.OnStreamErrorCallback}

The callback to invoke when the peer aborts a direction of the stream by
sending a `RESET_STREAM` frame (the peer abandons their writable side, so
no further data will arrive on our readable side).

The callback receives a Node.js error whose `errorCode` (`bigint`)
property carries the application error code from the wire frame.

The stream is **not** automatically destroyed when this callback fires —
the application chooses how to react. Common patterns are: ignore (and
continue using the still-active direction on a bidirectional stream),
abort the other direction with `writer.fail()`, or tear down the
whole stream with `stream.destroy()`. Read/write.

### `stream.onstopsending`

* Type: {quic.OnStreamErrorCallback}

The callback to invoke when the peer aborts a direction of the stream by
sending a `STOP_SENDING` frame (the peer asks us to stop writing on our
writable side).

The callback receives a Node.js error whose `errorCode` (`bigint`)
property carries the application error code from the wire frame. Read/write.

### `stream.headers`

* Type: {Object|undefined}

The buffered initial headers received on this stream, or `undefined` if the
application does not support headers or no headers have been received yet.
For server-side streams, this contains the request headers (e.g., `:method`,
`:path`, `:scheme`). For client-side streams, this contains the response
headers (e.g., `:status`).

Header names are lowercase strings. Multi-value headers are represented as
arrays. The object has `__proto__: null`.

### `stream.onheaders`

* Type: {Function}

The callback to invoke when initial headers are received on the stream. The
callback receives `(headers)` where `headers` is an object (same format as
`stream.headers`). For HTTP/3, this delivers request pseudo-headers on the
server side and response headers on the client side. Throws
`ERR_INVALID_STATE` if set on a session that does not support headers.
Read/write.

### `stream.ontrailers`

* Type: {Function}

The callback to invoke when trailing headers are received from the peer.
The callback receives `(trailers)` where `trailers` is an object in the
same format as `stream.headers`. Throws `ERR_INVALID_STATE` if set on a
session that does not support headers. Read/write.

### `stream.oninfo`

* Type: {Function}

The callback to invoke when informational (1xx) headers are received from
the server. The callback receives `(headers)` where `headers` is an object
in the same format as `stream.headers`. Informational headers are sent
before the final response (e.g., 103 Early Hints). Throws
`ERR_INVALID_STATE` if set on a session that does not support headers.
Read/write.

### `stream.onwanttrailers`

* Type: {Function}

The callback to invoke when the application is ready for trailing headers
to be sent. This is called synchronously — the user must call
`stream.sendTrailers()` within this callback. Throws
`ERR_INVALID_STATE` if set on a session that does not support headers.
Read/write.

### `stream.pendingTrailers`

* Type: {Object|undefined}

Set trailing headers to be sent automatically when the application requests
them. This is an alternative to the `stream.onwanttrailers` callback
for cases where the trailers are known before the body completes. Throws
`ERR_INVALID_STATE` if set on a session that does not support headers.
Read/write.

### `stream.sendHeaders(headers[, options])`

* `headers` {Object} Header object with string keys and string or
  string-array values. Pseudo-headers (`:method`, `:path`, etc.) must
  appear before regular headers.
* `options` {Object}
  * `terminal` {boolean} If `true`, the stream is closed for sending
    after the headers (no body will follow). **Default:** `false`.
* Returns: {boolean}

Sends initial or response headers on the stream. For client-side streams,
this sends request headers. For server-side streams, this sends response
headers. Throws `ERR_INVALID_STATE` if the session does not support headers.

### `stream.sendInformationalHeaders(headers)`

* `headers` {Object} Header object. Must include `:status` with a 1xx
  value (e.g., `{ ':status': '103', 'link': '</style.css>; rel=preload' }`).
* Returns: {boolean}

Sends informational (1xx) response headers. Server only. Throws
`ERR_INVALID_STATE` if the session does not support headers.

### `stream.sendTrailers(headers)`

* `headers` {Object} Trailing header object. Pseudo-headers must not be
  included in trailers.
* Returns: {boolean}

Sends trailing headers on the stream. Must be called synchronously during
the `stream.onwanttrailers` callback, or set ahead of time via
`stream.pendingTrailers`. Throws `ERR_INVALID_STATE` if the session
does not support headers.

### `stream.priority`

* Type: {Object|null}
  * `level` {string} One of `'high'`, `'default'`, or `'low'`.
  * `incremental` {boolean} Whether the stream data should be interleaved
    with other streams of the same priority level.

The current priority of the stream. Returns `null` if the session does not
support priority (e.g. non-HTTP/3) or if the stream has been destroyed.
Read only. Use `stream.setPriority()` to change the priority.

On client-side HTTP/3 sessions, the value reflects what was set via
`stream.setPriority()`. On server-side HTTP/3 sessions, the value
reflects the peer's requested priority (e.g., from `PRIORITY_UPDATE` frames).

### `stream.setPriority([options])`

* `options` {Object}
  * `level` {string} The priority level. One of `'high'`, `'default'`, or
    `'low'`. **Default:** `'default'`.
  * `incremental` {boolean} When `true`, data from this stream may be
    interleaved with data from other streams of the same priority level.
    **Default:** `false`.

Sets the priority of the stream. Throws `ERR_INVALID_STATE` if the session
does not support priority (e.g. non-HTTP/3). Has no effect if the stream
has been destroyed.

### `streamSymbol.asyncIterator`

* Returns: {AsyncIterableIterator} yielding {Uint8Array\[]}

The stream implements `Symbol.asyncIterator`, making it directly usable
in `for await...of` loops. Each iteration yields a batch of `Uint8Array`
chunks.

Only one async iterator can be obtained per stream. A second call throws
`ERR_INVALID_STATE`. Non-readable streams (outbound-only unidirectional
or closed) return an immediately-finished iterator.

```mjs
for await (const chunks of stream) {
  for (const chunk of chunks) {
    // Process each Uint8Array chunk
  }
}
```

Compatible with stream/iter utilities:

```mjs
import Stream from 'node:stream/iter';
const body = await Stream.bytes(stream);
const text = await Stream.text(stream);
await Stream.pipeTo(stream, someWriter);
```
