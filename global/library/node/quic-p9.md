---
title: "QUIC (part 9 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 9 of 13)

## Types

### type: `ApplicationOptions`

* Type: {Object}

The application specific options.

#### `applicationOptions.maxHeaderPairs`

* Type: {bigint|number}

Maximum number of header name-value pairs accepted per header block.
Headers beyond this limit are silently dropped. **Default:** `128`

#### `applicationOptions.maxHeaderLength`

* Type: {bigint|number}

Maximum total byte length of all header names and values combined per header
block. Headers that would push the total over this limit are silently
dropped. **Default:** `8192`

#### `applicationOptions.maxFieldSectionSize`

* Type: {bigint|number}

Maximum size of a compressed header field section (QPACK). `0` means
unlimited. **Default:** `0`

#### `applicationOptions.qpackMaxDTableCapacity`

* Type: {bigint|number}

QPACK dynamic table capacity in bytes. Set to `0` to disable the dynamic
table. **Default:** `4096`

#### `applicationOptions.qpackEncoderMaxDTableCapacity`

* Type: {bigint|number}

QPACK encoder maximum dynamic table capacity. **Default:** `4096`

#### `applicationOptions.qpackBlockedStreams`

* Type: {bigint|number}

Maximum number of streams that can e blocked waiting for QPACK dynamic table
updates. **Default:** `100`

#### `applicationOptions.enableConnectProtocol`

* Type: {boolean}

Enable the extended CONNECT protocol (RFC 9220). **Default:** `false`

#### `applicationOptions.enableDatagrams`

* Type: {boolean}

Enable HTTP/3 datagrams (RFC 9297). **Default:** `false`

### Type: `EndpointOptions`

* Type: {Object}

The endpoint configuration options passed when constructing a new `QuicEndpoint` instance.

#### `endpointOptions.address`

* Type: {net.SocketAddress | string} The local UDP address and port the endpoint should bind to.

If not specified the endpoint will bind to IPv4 `localhost` on a random port.

#### `endpointOptions.blockList`

* Type: {net.BlockList}

An optional `net.BlockList` instance for filtering incoming packets by
source address. When configured, every received UDP packet is checked against
the block list before any QUIC processing occurs, minimizing resource
expenditure on blocked sources. The block list is evaluated live — rules
added to the `BlockList` object after the endpoint is created take effect
immediately.

See `endpointOptions.blockListPolicy` for how matches are interpreted.

#### `endpointOptions.blockListPolicy`

* Type: {string} One of `'deny'` or `'allow'`.
* **Default:** `'deny'`

Controls how the `endpointOptions.blockList` is interpreted:

* `'deny'` — Packets from addresses matching the block list are dropped.
  All other addresses are accepted. This is the typical blocklist mode.
* `'allow'` — Only packets from addresses matching the block list are
  accepted. All other addresses are dropped. This is an allowlist mode
  for restricting access to known clients.

If no block list is configured, this option has no effect.

#### `endpointOptions.addressLRUSize`

* Type: {bigint|number}

The endpoint maintains an internal cache of validated socket addresses as a
performance optimization. This option sets the maximum number of addresses
that are cached. The value must be greater than `0`. This is an advanced option
that users typically won't have need to specify.

#### `endpointOptions.disableStatelessReset`

* Type: {boolean}

When `true`, the endpoint will not send stateless reset packets in response
to packets from unknown connections. Stateless resets allow a peer to detect
that a connection has been lost even when the server has no state for it.
Disabling them may be useful in testing or when stateless resets are handled
at a different layer.

#### `endpointOptions.idleTimeout`

* Type: {number}
* Default: `0`

The number of seconds an endpoint will remain alive after all sessions have
closed and it is no longer listening. A value of `0` (default) means the
endpoint is only destroyed when explicitly closed via `endpoint.close()` or
`endpoint.destroy()`. A positive value starts an idle timer when the endpoint
becomes idle; if no new sessions are created before the timer fires, the
endpoint is automatically destroyed. This is useful for connection pooling
where endpoints should linger briefly for reuse by future `connect()` calls.

#### `endpointOptions.ipv6Only`

* Type: {boolean}

When `true`, indicates that the endpoint should bind only to IPv6 addresses.

#### `endpointOptions.reusePort`

* Type: {boolean}
* Default: `false`

When `true`, allows multiple endpoints (across separate processes) to bind to
the same address and port. The kernel will load-balance incoming UDP datagrams
across all sockets bound with this option. This enables horizontal scaling of
QUIC servers by running multiple Node.js processes on the same port.

Supported on Linux 3.9+ and DragonFlyBSD 3.6+. On unsupported platforms, the
bind will fail with an error.

#### `endpointOptions.maxConnectionsPerHost`

* Type: {number}
* Default: `0` (unlimited)

Specifies the maximum number of concurrent sessions allowed per remote IP
address (ignoring port). When the limit is reached, new connections from the
same IP are refused with `CONNECTION_REFUSED`. A value of `0` disables the
limit. The maximum value is `65535`.

This limit can also be changed dynamically after construction via
`endpoint.maxConnectionsPerHost`.

#### `endpointOptions.maxConnectionsTotal`

* Type: {number}
* Default: `0` (unlimited)

Specifies the maximum total number of concurrent sessions across all remote
addresses. When the limit is reached, new connections are refused with
`CONNECTION_REFUSED`. A value of `0` disables the limit. The maximum value is
`65535`.

This limit can also be changed dynamically after construction via
`endpoint.maxConnectionsTotal`.

#### `endpointOptions.retryRate`

* Type: {number}
* **Default:** `100`

The maximum number of QUIC retry packets the endpoint will send per second.
This is a global rate limit (not per-host) that caps the total server-wide
retry response rate, preventing spoofed-source floods from consuming unbounded
resources.

#### `endpointOptions.retryBurst`

* Type: {number}
* **Default:** `200`

The maximum burst of retry packets allowed before rate limiting takes effect.

#### `endpointOptions.statelessResetRate`

* Type: {number}
* **Default:** `100`

The maximum number of stateless reset packets the endpoint will send per second.

#### `endpointOptions.statelessResetBurst`

* Type: {number}
* **Default:** `200`

The maximum burst of stateless reset packets allowed before rate limiting
takes effect.

#### `endpointOptions.versionNegotiationRate`

* Type: {number}
* **Default:** `100`

The maximum number of version negotiation packets the endpoint will send per
second.

#### `endpointOptions.versionNegotiationBurst`

* Type: {number}
* **Default:** `200`

The maximum burst of version negotiation packets allowed before rate limiting
takes effect.

#### `endpointOptions.immediateCloseRate`

* Type: {number}
* **Default:** `100`

The maximum number of immediate connection close packets the endpoint will
send per second.

#### `endpointOptions.immediateCloseBurst`

* Type: {number}
* **Default:** `200`

The maximum burst of immediate connection close packets allowed before rate
limiting takes effect.

#### `endpointOptions.sessionCreationRate`

* Type: {number}
* **Default:** `50`

The maximum number of new sessions that a single remote address can create per
second. This is a per-host rate limit tracked in the address validation LRU
cache. It prevents a validated remote address from churning through sessions
(rapidly opening and abandoning connections) faster than the server can handle.
For benchmarking where traffic comes from a single source, set this to a high
value.

#### `endpointOptions.sessionCreationBurst`

* Type: {number}
* **Default:** `100`

The maximum burst of new session creations allowed from a single remote address
before rate limiting takes effect.

#### `endpointOptions.retryTokenExpiration`

* Type: {bigint|number}

Specifies the length of time a QUIC retry token is considered valid.

#### `endpointOptions.resetTokenSecret`

* Type: {ArrayBufferView}

Specifies the 16-byte secret used to generate QUIC retry tokens.

#### `endpointOptions.tokenExpiration`

* Type: {bigint|number}

Specifies the length of time a QUIC token is considered valid.

#### `endpointOptions.tokenSecret`

* Type: {ArrayBufferView}

Specifies the 16-byte secret used to generate QUIC tokens.

#### `endpointOptions.udpReceiveBufferSize`

* Type: {number}

#### `endpointOptions.udpSendBufferSize`

* Type: {number}

#### `endpointOptions.udpTTL`

* Type: {number}

#### `endpointOptions.validateAddress`

* Type: {boolean}

When `true`, requires that the endpoint validate peer addresses using retry packets
while establishing a new connection.
