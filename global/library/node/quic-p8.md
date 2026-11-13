---
title: "QUIC (part 8 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 8 of 13)

### `stream.writer`

* Type: {Object}

Returns a Writer object for pushing data to the stream incrementally.
The Writer implements the stream/iter Writer interface with the
try-sync-fallback-to-async pattern.

Only available when no `body` source was provided at creation time or via
`stream.setBody()`. Non-writable streams return an already-closed
Writer. Throws `ERR_INVALID_STATE` if the outbound is already configured.

The Writer has the following methods:

* `writeSync(chunk)` — Synchronous write. Returns `true` if accepted,
  `false` if flow-controlled. Data is NOT accepted on `false`.
* `write(chunk[, options])` — Async write. Rejects with `ERR_INVALID_STATE`
  when the stream is flow-controlled rather than waiting for capacity.
  `options.signal` is checked at entry but not observed during the write.
* `writevSync(chunks)` — Synchronous vectored write. All-or-nothing.
* `writev(chunks[, options])` — Async vectored write. Rejects with
  `ERR_INVALID_STATE` when the stream is flow-controlled rather than waiting
  for capacity.
* `endSync()` — Synchronous close. Returns total bytes or `-1`.
* `end([options])` — Async close. If a drain is already pending, waits for it
  before closing.
* `fail(reason)` — Errors the stream (sends `RESET_STREAM` to peer).
  When `reason` is a `QuicError`, its `error.errorCode` is used
  as the wire code on the resulting `RESET_STREAM` frame; otherwise
  the wire code falls back to the negotiated application protocol's
  "internal error" code (`H3_INTERNAL_ERROR` (`0x102`) for HTTP/3, or
  the QUIC transport-layer `INTERNAL_ERROR` (`0x1`) for raw QUIC).
  See `stream.destroy()` for a full-stream abort that also resets
  the readable side via `STOP_SENDING`.
* `canWrite` — `true` if writes will be accepted, `false` if at capacity,
  or `null` if closed/errored. When `writeSync()` returns `false`, use
  `ondrain()` from `node:stream/iter` to wait before retrying. If `ondrain()`
  returns `null`, no drain wait is available and the write should not be
  retried.

```mjs
import { ondrain } from 'node:stream/iter';

while (!writer.writeSync(chunk)) {
  const drain = ondrain(writer);
  if (drain === null) break;
  await drain;
}
```

The bytes from each `writeSync()` / `writevSync()` / `write()` / `writev()`
input chunk are copied into an internal buffer, so the caller's source
buffer is unchanged and may be reused or mutated immediately after the
call returns. Callers that want to ensure a source buffer cannot be
mutated after handing it off can call `ArrayBuffer.prototype.transfer()`
themselves before passing the buffer.

### `stream.setBody(body)`

* `body` {string | ArrayBuffer | SharedArrayBuffer | ArrayBufferView |
  Blob | FileHandle | AsyncIterable | Iterable | Promise | null}

Sets the outbound body source for the stream. Can only be called once.
Mutually exclusive with `stream.writer`.

The following body source types are supported:

* `null` — The writable side is closed immediately (FIN sent with no data).
* `string` — UTF-8 encoded and sent as a single chunk.
* `ArrayBuffer`, `SharedArrayBuffer`, `ArrayBufferView` — Sent as a single
  chunk. The bytes are copied into an internal buffer, so the caller's
  source buffer is unchanged and may be reused or mutated immediately
  after the call returns. Callers wanting to ensure their source cannot
  be mutated after handing it off can call
  `ArrayBuffer.prototype.transfer()` themselves before passing the buffer.
* `Blob` — Sent from the Blob's underlying data queue.
* {FileHandle} — The file contents are read asynchronously via an
  fd-backed data source. The `FileHandle` must be opened for reading
  (e.g. via `fs.promises.open(path, 'r')`). Once passed as a body, the
  `FileHandle` is locked and cannot be used as a body for another stream.
  The `FileHandle` is automatically closed when the stream finishes.
* `AsyncIterable`, `Iterable` — Each yielded chunk (string or
  `Uint8Array`) is written incrementally in streaming mode.
* `Promise` — Awaited; the resolved value is used as the body (subject
  to the same type rules).

Throws `ERR_INVALID_STATE` if the outbound is already configured or if
the writer has been accessed.

### `stream.session`

* Type: {quic.QuicSession|null}

The session that created this stream, or `null` if the stream has been
destroyed. Read only.

### `stream.stats`

* Type: {quic.QuicStream.Stats}

The current statistics for the stream. Read only.

## Class: `QuicStream.Stats`

### `streamStats.ackedAt`

* Type: {bigint}

### `streamStats.bytesAccumulated`

* Type: {bigint}

The current number of bytes sitting in the stream's receive accumulation
buffer, awaiting delivery to the application. A value near zero indicates
the reader is keeping up with incoming data. A value near the stream's
flow control window indicates the application is not consuming data fast
enough.

### `streamStats.bytesReceived`

* Type: {bigint}

### `streamStats.bytesSent`

* Type: {bigint}

### `streamStats.createdAt`

* Type: {bigint}

### `streamStats.destroyedAt`

* Type: {bigint}

### `streamStats.finalSize`

* Type: {bigint}

### `streamStats.isConnected`

* Type: {bigint}

### `streamStats.maxBytesAccumulated`

* Type: {bigint}

The peak number of bytes that were accumulated in the stream's receive
buffer at any point during the stream's lifetime. This value only
increases monotonically. It is useful for diagnosing whether a stream
experienced backpressure episodes and whether the accumulation buffer
sizing is appropriate for the workload.

### `streamStats.maxOffset`

* Type: {bigint}

### `streamStats.maxOffsetAcknowledged`

* Type: {bigint}

### `streamStats.maxOffsetReceived`

* Type: {bigint}

### `streamStats.openedAt`

* Type: {bigint}

### `streamStats.receivedAt`

* Type: {bigint}
