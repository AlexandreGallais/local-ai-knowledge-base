---
title: "QUIC (part 2 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 2 of 13)

## Architecture

The `quic` module is built around three core abstractions:

* `QuicEndpoint`: represents the local UDP socket binding for QUIC. It is
  used to send and receive QUIC packets and can be shared across multiple
  sessions. A single endpoint can be used as both a client and a server
  simultaneously.

* `QuicSession`: represents a QUIC connection between the local endpoint and
  a remote peer. A session is created either by initiating a connection to a
  remote peer using `quic.connect()` or by accepting an incoming connection
  from a remote peer via `quic.listen()`.

* `QuicStream`: represents a QUIC stream within a session. Streams are
  created by either local or remote peers and can be bidirectional or
  unidirectional.

Unlike traditional TCP-based protocols, QUIC "connections" are not inherently
tied to a specific local port / remote port pair. A session is initiated via
a QUIC endpoint but may be migrated to a different local or remote address
over its lifetime, outlive the endpoint that created it, and may even be
associated with multiple endpoints simultaneously. This flexibility allows for
advanced use cases such as connection migration, multi-homing, and load balancing.
Most often, however, a simple one-to-one relationship between endpoint and session
is sufficient.

### Integrated TLS 1.3

The QUIC protocol integrates TLS 1.3 directly into the protocol for connection
establishment and security. The `quic` module's API reflects this integration
by exposing TLS-related information and configuration options. It is currently
not possible to use QUIC without TLS or to use a different version of TLS.

Every QUIC session starts with the client and server performing a TLS handshake
to negotiate the application protocol (via ALPN), authenticate the server (and
optionally the client), exchange transport parameters, and establish shared keys
for encryption.

#### Certificate size and handshake performance

QUIC includes an anti-amplification limit (RFC 9000 Section 8.1) that
restricts the server to sending at most three times the data received from
the client before the client's address is validated. Because the client's
Initial packet is typically around 1200 bytes, the server can send at most
approximately 3600 bytes before it must wait for the client to acknowledge.

The server's initial response is dominated by its TLS certificate chain. If
the certificate chain exceeds the amplification limit, the handshake requires
an additional round trip — the server must pause, wait for the client's
acknowledgement, and then continue sending the remainder of the certificate.
This eliminates QUIC's 1-RTT handshake advantage over TCP+TLS and can add
50–100 ms or more of latency on the first connection, depending on the network
path.

To avoid this, servers should use compact certificate chains:

* **Use ECDSA certificates** (P-256 or P-384) rather than RSA. ECDSA keys and
  signatures are significantly smaller. A typical ECDSA P-256 certificate chain
  with one intermediate is approximately 1.5–2 KB, well within the amplification
  limit. An equivalent RSA-2048 chain is often 3–5 KB, which may exceed it.

* **Minimize the certificate chain.** Include only the leaf certificate and
  the necessary intermediate(s). Do not include the root certificate (clients
  already have it in their trust store). Avoid cross-signed intermediates when
  the self-signed root is already widely trusted.

* **Prefer certificate authorities with short chains.** Some CAs issue
  certificates with a single small intermediate, while others require multiple
  large RSA intermediates. The choice of CA directly affects handshake latency.

Certificate compression (RFC 8879) can also address this issue by
compressing the certificate chain during the handshake, often keeping the
server's Certificate message within the amplification limit and avoiding the
extra round trip. Certificate compression is opt-in via the
`certificateCompression` TLS option and is disabled by default. When
enabled, it applies to both the server's certificate and, for mutual TLS,
the client's certificate.

### Rate limiting

QUIC endpoints include built-in rate limiting to protect against
denial-of-service attacks. There are two layers of defense:

**Global rate limits** cap the total rate of stateless responses that the
endpoint will send, regardless of the source address. These protect against
floods from spoofed source IP addresses, where an attacker rotates through
many fake source addresses to bypass per-host limits. Four types of stateless
responses are independently rate-limited:

* **Retry packets** — sent to validate a client's address during connection
  setup. Configurable via `endpointOptions.retryRate` and
  `endpointOptions.retryBurst`.
* **Stateless reset packets** — sent when the endpoint receives a packet for an
  unknown session. Configurable via `endpointOptions.statelessResetRate`
  and `endpointOptions.statelessResetBurst`.
* **Version negotiation packets** — sent when a client uses an unsupported QUIC
  version. Configurable via `endpointOptions.versionNegotiationRate` and
  `endpointOptions.versionNegotiationBurst`.
* **Immediate connection close packets** — sent when the server is busy or a
  token is invalid. Configurable via `endpointOptions.immediateCloseRate`
  and `endpointOptions.immediateCloseBurst`.

Each rate limit uses a token bucket: the endpoint can send up to the burst
capacity instantly, and tokens refill at the configured rate per second. When
the bucket is empty, additional responses of that type are silently dropped.
The defaults (100 per second, burst of 200) are suitable for most deployments.

**Per-host session creation rate limits** cap how fast a single remote address
can create new sessions. This is tracked per validated remote address and
prevents a single client from churning through sessions (rapidly connecting and
disconnecting) to consume server resources. Configurable via
`endpointOptions.sessionCreationRate` and
`endpointOptions.sessionCreationBurst`. The defaults (50 per second, burst
of 100) are generous enough for legitimate traffic patterns. For benchmarking
scenarios where traffic comes from a single source, increase these values.

In addition to rate limiting, the endpoint supports **concurrent connection
limits** via `maxConnectionsPerHost` and `maxConnectionsTotal`, and a
**busy mode** via `endpoint.busy` that rejects all new connections.

Rate limiting activity can be monitored through the endpoint's statistics
object. Each rate limiter has a corresponding counter
(e.g., `endpoint.stats.retryRateLimited`,
`endpoint.stats.sessionCreationRateLimited`) that tracks how many responses
were dropped. A non-zero value indicates the rate limiter is actively
protecting the endpoint.

#### Block lists

Endpoints can filter incoming packets by source address using a
`net.BlockList`. The block list is checked before any QUIC processing
occurs, so blocked packets consume no resources beyond the check itself.

In **deny** mode (the default), packets from addresses in the list are dropped:

```mjs
import { BlockList } from 'node:net';
import { listen } from 'node:quic';

const blocked = new BlockList();
blocked.addSubnet('192.168.1.0', 24);  // Block an entire subnet
blocked.addAddress('10.0.0.5');        // Block a specific address

const endpoint = await listen(onSession, {
  endpoint: {
    blockList: blocked,
    blockListPolicy: 'deny',
  },
  // ...
});
```

In **allow** mode, only packets from addresses in the list are accepted:

```mjs
const trusted = new BlockList();
trusted.addSubnet('10.0.0.0', 8);

const endpoint = await listen(onSession, {
  endpoint: {
    blockList: trusted,
    blockListPolicy: 'allow',
  },
  // ...
});
```

The block list is evaluated live — rules added or removed after the endpoint
is created take effect immediately. The `endpoint.stats.packetsBlocked`
counter tracks how many packets have been dropped by the filter.

### Applications

Every `QuicSession` is associated with a single application protocol, negotiated
via ALPN during the TLS handshake. The `quic` module is designed to be
application-agnostic in general but includes built-in support for HTTP/3 as a
specific application protocol. When using HTTP/3, the `quic` module provides
additional APIs for handling HTTP/3-specific features such as headers, trailers,
and prioritization. For other application protocols, users can implement their
own message framing and multiplexing on top of the core QUIC transport features.

When initiating a TLS handshake, the client will include a list of supported
ALPN protocols in the `ClientHello`. The server selects one of these protocols
(if any) and includes it in the `ServerHello`. The negotiated protocol determines
how the `QuicSession` and `QuicStream` APIs behave. For example, when the `h3`
protocol is negotiated for HTTP/3, the `QuicSession` and `QuicStream` will support
HTTP/3-specific features.

Currently, the `quic` module only supports HTTP/3 as a built-in application protocol.
All other protocols must be implemented by the user on top of the provided JavaScript
API.

### Configuration

The QUIC API is designed to be flexible and highly configurable to support a wide
range of use cases. Users can configure various aspects of the QUIC transport,
TLS handshake, and application behavior via options passed to the `quic.connect()`
and `quic.listen()` functions, as well as dynamically on `QuicEndpoint` and
`QuicSession` instances. The API also provides access to detailed statistics and
events for monitoring and debugging.

QUIC transport parameters are exchanged during the TLS handshake to negotiate
various transport-level settings such as maximum stream counts, idle timeouts,
and datagram support. The `quic` module allows users to configure the transport
parameters their endpoint advertises to peers, as well as access the transport
parameters advertised by peers. These configure the capabilities and limits of
the QUIC connection in coordination with the peer.

A rich set of local settings is also available for configuring the behavior of
the local endpoint and sessions. These include settings for connection limits,
congestion control, stream prioritization, and more.

### Callbacks and Promises

The `quic` module uses a combination of callbacks and promises for asynchronous
operations. For example, initiating a connection with `quic.connect()` returns
a promise for the established session, while incoming sessions on the server
side are handled via a callback passed to `quic.listen()`. Within a session,
events such as incoming streams, datagrams, and session state changes are handled
via callbacks on the `QuicSession` instance. Promises are used for operations
that have a clear completion point, such as completion of the TLS handshake or
graceful closure of a session.

All callbacks are invoked synchronously and may either return synchronously or
return a promise. If a callback returns a promise that rejects, or throws an error,
the object will be destroyed with the error as the reason if an `onerror` callback
is not specified.

### Streams

Streams are the primary data-carrying abstraction in QUIC. A stream can be
initiated by either the local endpoint or the remote peer once a session is
established.

Streams can be either bidirectional (data flows in both directions) or
unidirectional (data flows in only one direction). The `quic` module provides
separate APIs for creating each kind:
`session.createBidirectionalStream()` and
`session.createUnidirectionalStream()`. Streams initiated by a remote
peer are delivered via the `session.onstream` callback. When the
negotiated application protocol supports the stream-level callbacks (e.g.
HTTP/3) and an `onheaders` callback is configured, incoming streams can
instead be consumed entirely through it and registering `onstream` is
optional.

There are two ways to write data to a stream:

* **Body source** — pass a `body` option when creating the stream (or call
  `stream.setBody()`). The body can be a string, `ArrayBuffer`,
  `ArrayBufferView`, `Blob`, `FileHandle`, `AsyncIterable`, sync `Iterable`,
  or `Promise` resolving to any of these. A `null` body closes the writable
  side immediately. This is the simplest approach when the data is available
  up front or can be expressed as an iterable.
* **Writer** — access `stream.writer` to push data incrementally. The
  writer exposes synchronous methods (`writeSync()`, `writevSync()`,
  `endSync()`) that return immediately, as well as asynchronous counterparts
  (`write()`, `writev()`, `end()`). The asynchronous `write()` and `writev()`
  methods use the stream/iter strict backpressure policy: when the write buffer
  is full, they reject with `ERR_INVALID_STATE` instead of waiting for capacity.
  If a drain is already pending, `end()` waits for it before closing. Check
  `writer.canWrite` before writing. To wait for capacity, use `ondrain()` from
  `node:stream/iter`, then retry the write. The stream's `onblocked` callback
  reports that transport flow control has blocked progress, but does not
  signal that writer capacity is available again.
  `writeSync()` returns `false` when the write buffer is full; the caller
  should wait with `ondrain()` before retrying.

These two approaches are mutually exclusive for a given stream.

Reading is done by iterating the stream as an async iterable. Each iteration
yields a batch of `Uint8Array` chunks:

```mjs
for await (const chunks of stream) {
  for (const chunk of chunks) {
    // Process each Uint8Array chunk
  }
}
```

Only one async iterator can be obtained per stream. The stream is also
compatible with `node:stream/iter` utilities such as `Stream.bytes()`,
`Stream.text()`, and `Stream.pipeTo()`.

Consuming a stream is what returns flow-control credit to the peer, so a
stream whose payload is not wanted should still be read to completion. Use
`Stream.dump()` to read the stream without retaining any of it.
