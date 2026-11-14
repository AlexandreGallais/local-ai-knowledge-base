---
title: "QUIC (part 12 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 12 of 13)

## HTTP/3 support

When the negotiated ALPN identifier is `'h3'` (or one of the `'h3-*'`
draft variants), the QUIC session runs the HTTP/3 application backed
by `nghttp3`. `'h3'` is the default ALPN for `quic.connect()` and
`quic.listen()`, so HTTP/3 is what you get unless you select a
different ALPN explicitly.

Selecting the HTTP/3 application enables a number of stream- and
session-level capabilities that are not available to non-HTTP/3
applications:

* **Headers and trailers** — request and response header blocks
  (including pseudo-headers such as `:method`, `:path`, `:scheme`,
  `:authority`, and `:status`), trailing headers, and informational
  (`1xx`) responses. See `stream.sendHeaders()`,
  `stream.sendTrailers()`, and
  `stream.sendInformationalHeaders()`.
* **Stream priority (RFC 9218)** — per-stream urgency and
  incremental flags. See `stream.priority` and
  `stream.setPriority()`.
* **HTTP/3 datagrams (RFC 9297)** — unreliable application-layer
  datagrams. The peer must advertise `SETTINGS_H3_DATAGRAM=1`, which
  is enabled by setting `application.enableDatagrams` to `true`
  on both peers. See `session.sendDatagram()` and
  `session.ondatagram`.
* **ORIGIN frame (RFC 9412)** — servers automatically advertise the
  hostnames in their `sessionOptions.sni` map (entries with
  `authoritative: true`); clients receive the list via
  `session.onorigin`.
* **GOAWAY** — graceful shutdown. The server emits `GOAWAY` as part
  of `session.close()`; the client observes it via
  `session.ongoaway` and stops opening new bidirectional streams.
* **Extended CONNECT settings (RFC 9220)** — the
  `SETTINGS_ENABLE_CONNECT_PROTOCOL` setting can be enabled via
  `application.enableConnectProtocol`. The setting is exchanged
  but the application is responsible for handling the `:protocol`
  pseudo-header and any payload framing on top.
* **QPACK tuning** — dynamic-table size and blocked-streams limits
  via `application.qpackMaxDTableCapacity` and friends.

### Minimal HTTP/3 client

```mjs
import { connect } from 'node:quic';
import process from 'node:process';

const session = await connect('example.com:443', {
  // ALPN defaults to 'h3'.
  servername: 'example.com',
});
await session.opened;

const stream = await session.createBidirectionalStream({
  headers: {
    ':method': 'GET',
    ':path': '/',
    ':scheme': 'https',
    ':authority': 'example.com',
  },
  onheaders(headers) {
    console.log('status:', headers[':status']);
  },
});

const decoder = new TextDecoder();
for await (const chunks of stream) {
  for (const chunk of chunks) {
    process.stdout.write(decoder.decode(chunk, { stream: true }));
  }
}

await session.close();
```

A few things to note:

* `session.createBidirectionalStream({ headers })` automatically
  marks the HEADERS frame as terminal when no `body` is provided —
  the request is `HEADERS` followed by `END_STREAM`.
* The `onheaders` callback receives the response pseudo-headers and
  regular headers in a single object with lowercase string keys.
  For incoming headers, the `:status` pseudo-header is converted to
  a `number`, matching HTTP/2 behavior. After the callback returns,
  the same object is also accessible via `stream.headers`.
* Reading `for await (const chunks of stream)` consumes the response
  body. Each iteration yields a `Uint8Array[]` batch of chunks.
* HTTP semantic helpers (URL parsing, method/status validation,
  redirects, content negotiation, and so on) are intentionally not
  built in. The caller is responsible for any HTTP-level handling
  beyond the wire framing.

### Minimal HTTP/3 server

```mjs
import { listen } from 'node:quic';

const encoder = new TextEncoder();

const endpoint = await listen((session) => {
  // The session.onstream callback fires for each new client-initiated
  // stream. It is optional here: with `onheaders` configured below,
  // request streams are consumed through that callback.
}, {
  sni: { '*': { keys: [defaultKey], certs: [defaultCert] } },
  // ALPN defaults to 'h3'.
  onheaders(headers) {
    // `this` is the QuicStream. Pseudo-headers are available on the
    // request header block (`:method`, `:path`, `:scheme`,
    // `:authority`).
    if (headers[':path'] === '/health') {
      this.sendHeaders({ ':status': '200', 'content-type': 'text/plain' });
      const w = this.writer;
      w.writeSync(encoder.encode('ok\n'));
      w.endSync();
    } else {
      this.sendHeaders({ ':status': '404' }, { terminal: true });
    }
  },
});

console.log('listening on', endpoint.address);
```

Server-side notes:

* Setting `onheaders` at the `listen()` level
  applies it to every incoming stream (it is wired up before
  `onstream` fires). Setting it inside `onstream` is too late for
  HTTP/3, where the request HEADERS frame is the first thing that
  arrives on the stream.
* `this.sendHeaders(headers, { terminal: true })` marks the
  response HEADERS frame as terminal (no body follows).
* For body responses, send headers first, then write to
  `this.writer` and call `endSync()` to send the body and close the
  stream cleanly.

### What is not implemented

* **Server push** — `PUSH_PROMISE` and the related push-stream
  machinery are not implemented and are not on the near-term
  roadmap. Server push has limited deployment in practice, and most
  use cases are better served by Early Hints (`103`) or by direct
  fetches from the client.
* **WebTransport / extended-CONNECT helpers** — the
  `SETTINGS_ENABLE_CONNECT_PROTOCOL` setting can be negotiated but
  there is no built-in support for the `:protocol` pseudo-header,
  WebTransport datagram demultiplexing, or capsule framing.
* **Higher-level HTTP semantics** — there is no built-in
  request/response router, URL parsing, content-encoding
  negotiation, body-type coercion, redirect following, or
  cookie handling. These are deliberately left to higher-level
  libraries built on top of `node:quic`.

## Performance measurement

QUIC sessions, streams, and endpoints emit `PerformanceEntry` objects
with `entryType` set to `'quic'`. These entries are only created when a
`PerformanceObserver` is observing the `'quic'` entry type, ensuring
zero overhead when not in use.

Each entry provides:

* `name` {string} One of `'QuicEndpoint'`, `'QuicSession'`, or `'QuicStream'`.
* `entryType` {string} Always `'quic'`.
* `startTime` {number} High-resolution timestamp (ms) when the object was created.
* `duration` {number} Lifetime in milliseconds from creation to destruction.
* `detail` {Object} Entry-specific metadata (see below).

### `QuicEndpoint` entries

* `detail.stats` {QuicEndpointStats} The endpoint's statistics object
  (frozen at destruction time).

### `QuicSession` entries

* `detail.stats` {QuicSessionStats} The session's statistics object
  (frozen at destruction time). Includes bytes sent/received, RTT
  measurements, congestion window, packet counts, and more.
* `detail.handshake` {Object|undefined} Timing-relevant handshake metadata,
  or `undefined` if the handshake did not complete before destruction.
  * `servername` {string} The negotiated SNI server name.
  * `protocol` {string} The negotiated ALPN protocol.
  * `earlyDataAttempted` {boolean} Whether 0-RTT early data was attempted.
  * `earlyDataAccepted` {boolean} Whether 0-RTT early data was accepted.
* `detail.path` {Object|undefined} The session's network path, or
  `undefined` if not yet established.
  * `local` {net.SocketAddress}
  * `remote` {net.SocketAddress}

### `QuicStream` entries

* `detail.stats` {QuicStreamStats} The stream's statistics object
  (frozen at destruction time). Includes bytes sent/received, timing
  timestamps, and offset tracking.
* `detail.direction` {string} Either `'bidi'` or `'uni'`.

### Example

```mjs
import { PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.duration.toFixed(1)}ms`);
    if (entry.name === 'QuicSession') {
      const { stats, handshake } = entry.detail;
      console.log(`  protocol: ${handshake?.protocol}`);
      console.log(`  bytes sent: ${stats.bytesSent}`);
      console.log(`  smoothed RTT: ${stats.smoothedRtt}ns`);
    }
  }
});
obs.observe({ entryTypes: ['quic'] });
```
