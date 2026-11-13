---
title: "QUIC (part 10 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 10 of 13)

### Type: `SessionOptions`

#### `sessionOptions.alpn`

* Type: {string} (client) | {string\[]} (server)

The ALPN (Application-Layer Protocol Negotiation) identifier(s).

For **client** sessions, this is a single string specifying the protocol
the client wants to use (e.g. `'h3'`).

For **server** sessions, this is a non-empty array of protocol names in
preference order that the server supports (e.g. `['h3', 'h3-29']`).
During the TLS handshake, the server selects the first protocol from its
list that the client also supports.

The negotiated ALPN determines which Application implementation is used
for the session. `'h3'` and `'h3-*'` variants select the HTTP/3
application; all other values select the default application.

Default: `'h3'`

#### `sessionOptions.application`

* Type: {quic.ApplicationOptions}

Application-specific options.

```mjs
const { listen } = await import('node:quic');

await listen((session) => { /* ... */ }, {
  application: {
    maxHeaderPairs: 64,
    qpackMaxDTableCapacity: 8192,
    enableDatagrams: true,
  },
  // ... other session options
});
```

#### `sessionOptions.ca`

* Type: {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

The CA certificates to use for sessions.

#### `sessionOptions.cc`

* Type: {string}

Specifies the congestion control algorithm that will be used.
Must be set to one of either `'reno'`, `'cubic'`, or `'bbr'`.

This is an advanced option that users typically won't have need to specify.

#### `sessionOptions.certs` (client only)

* Type: {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

The TLS certificates to use for client sessions. For server sessions,
certificates are specified per-identity in the `sessionOptions.sni` map.

#### `sessionOptions.certificateCompression`

* Type: {string\[]} One or more of `'zlib'`, `'brotli'`, or `'zstd'`, in
  preference order.

Enables TLS certificate compression (RFC 8879) for this session. When
omitted, certificate compression is disabled.

On the server side, the certificate chain is compressed using the first
listed algorithm that the client advertises support for. On the client side,
the listed algorithms are advertised to the server so that the server may
compress its certificate. When client authentication is in use, the option
also controls compression of the client's certificate.

Compressing the certificate chain is especially useful for QUIC because it
reduces the size of the server's first flight, which is bounded by the
anti-amplification limit (see Certificate size and handshake
performance). Certificate compression requires TLS 1.3, which QUIC always
uses.

At most three algorithms may be specified. The option is silently ignored if
Node.js was built against a shared OpenSSL that lacks certificate compression
support.

#### `sessionOptions.ciphers`

* Type: {string}

The list of supported TLS 1.3 cipher algorithms.

#### `sessionOptions.crl`

* Type: {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

The CRL to use for sessions.

#### `sessionOptions.enableEarlyData`

* Type: {boolean} **Default:** `true`

When `true`, enables TLS 0-RTT early data for this session. Early data
allows the client to send application data before the TLS handshake
completes, reducing latency on reconnection when a valid session ticket
is available. Set to `false` to disable early data support.

#### `sessionOptions.groups`

* Type: {string}

The list of supported TLS 1.3 cipher groups.

#### `sessionOptions.keylog`

* Type: {boolean}

When `true`, enables TLS key logging for the session. Key material is
delivered to the `session.onkeylog` callback in NSS Key Log Format.
Each callback invocation receives a single line of key material. The output
can be used with tools such as Wireshark to decrypt captured QUIC traffic.

#### `sessionOptions.keys` (client only)

* Type: {KeyObject|KeyObject\[]}

The TLS crypto keys to use for client sessions. For server sessions,
keys are specified per-identity in the `sessionOptions.sni` map.

#### `sessionOptions.maxPayloadSize`

* Type: {bigint|number}

Specifies the maximum UDP packet payload size.

#### `sessionOptions.maxStreamWindow`

* Type: {bigint|number}

Specifies the maximum stream flow-control window size.

#### `sessionOptions.maxWindow`

* Type: {bigint|number}

Specifies the maximum session flow-control window size.

#### `sessionOptions.minVersion`

* Type: {number}

The minimum QUIC version number to allow. This is an advanced option that users
typically won't have need to specify.

#### `sessionOptions.preferredAddressPolicy`

* Type: {string} One of `'use'`, `'ignore'`, or `'default'`.
* **Default:** `'ignore'`

When the remote peer advertises a preferred address, this option specifies whether
to use it or ignore it. The default is `'ignore'` because honoring a server's
preferred address causes the client to migrate its connection to a different IP
address, which can be exploited for data exfiltration attacks that are
indistinguishable from legitimate QUIC connection migration at the network level.
Set to `'use'` only when connecting to trusted servers that require preferred
address migration.

#### `sessionOptions.qlog`

* Type: {boolean}

When `true`, enables qlog diagnostic output for the session. Qlog data
is delivered to the `session.onqlog` callback as chunks of JSON-SEQ
formatted text. The output can be analyzed with qlog visualization tools
such as qvis.

#### `sessionOptions.sessionTicket`

* Type: {ArrayBufferView} A session ticket to use for 0RTT session resumption.

#### `sessionOptions.datagramDropPolicy`

* Type: {string}
* **Default:** `'drop-oldest'`

Controls which datagram to drop when the pending datagram queue
(sized by `session.maxPendingDatagrams`) is full. Must be one of
`'drop-oldest'` (discard the oldest queued datagram to make room) or
`'drop-newest'` (reject the incoming datagram). Dropped datagrams are
reported as lost via the `ondatagramstatus` callback.

This option is immutable after session creation.

#### `sessionOptions.streamIdleTimeout`

* Type: {bigint|number}
* **Default:** `30000` (30 seconds)

The maximum time in milliseconds that a peer-initiated stream can be idle
(no data received) before it is automatically destroyed. This protects
against slowloris-style attacks where a remote peer opens streams but never
sends data, holding server resources indefinitely. Only peer-initiated
streams are checked — locally-initiated streams are the application's
responsibility. Set to `0` to disable.

The idle check runs as part of the normal send processing loop, so it adds
no additional timers or event loop overhead. The
`session.stats.streamsIdleTimedOut` counter tracks how many streams have been
destroyed by this mechanism.

#### `sessionOptions.maxDatagramSendAttempts`

* Type: {number}
* **Default:** `5`

The maximum number of `SendPendingData` cycles a datagram can survive
without being sent before it is abandoned. When a datagram cannot be
sent due to congestion control or packet size constraints, it remains
in the queue and the attempt counter increments. Once the limit is
reached, the datagram is dropped and reported as `'abandoned'` via the
`ondatagramstatus` callback. Valid range: `1` to `255`.

#### `sessionOptions.drainingPeriodMultiplier`

* Type: {number}
* **Default:** `3`

A multiplier applied to the Probe Timeout (PTO) to compute the draining
period duration after receiving a `CONNECTION_CLOSE` frame from the peer.
RFC 9000 Section 10.2 requires the draining period to persist for at least
three times the current PTO. The valid range is `3` to `255`. Values below
`3` are clamped to `3`.

#### `sessionOptions.handshakeTimeout`

* Type: {bigint|number}

Specifies the maximum number of milliseconds a TLS handshake is permitted to take
to complete before timing out.

#### `sessionOptions.initialRtt`

* Type: {bigint|number}
* **Default:** `0` (use ngtcp2 default of 333ms)

Specifies the initial round-trip time estimate in milliseconds. This value is
used for probe timeout (PTO) computation, initial pacing, and early loss
detection before the first actual RTT sample is collected from the connection.
The default of 333ms is appropriate for the general internet. For low-latency
environments such as loopback or same-rack deployments, setting a value closer
to the actual RTT (e.g., `1`) avoids unnecessarily conservative initial
behavior.

#### `sessionOptions.keepAlive`

* Type: {bigint|number}
* **Default:** `0` (disabled)

Specifies the keep-alive timeout in milliseconds. When set to a non-zero
value, PING frames will be sent automatically to keep the connection alive
before the idle timeout fires. The value should be less than the effective
idle timeout (`maxIdleTimeout` transport parameter) to be useful.

#### `sessionOptions.truncatedReads`

* Type: {string} One of `'error'` or `'ignore'`.
* **Default:** `'error'`

Controls how reading a stream reports a truncated read. A stream's read side
can end without receiving a QUIC FIN, meaning the peer never signalled that
the whole stream had been sent and the data received may be incomplete. This
selects how the stream's async iterator reports this:

* `'error'` - The default. Peers are expected to always send a FIN to end
  their data explicitly, and so any truncation is an error. The iterator yields
  the data that did arrive and then throws, so an incomplete stream can never
  be mistaken for a complete one. Incomplete streams will either throw a
  `ERR_QUIC_STREAM_RESET` carrying the peer's error code, a connection error,
  or `ERR_QUIC_STREAM_ABORTED` for other cases.

* `'ignore'` - The truncation itself is ignored: only a stream or connection
  error is reported, and any clean abort/cancellation or similar simply ends
  the stream. A non-zero peer reset, non-zero local stop-sending or connection
  error still fails, but a truncation with no error at all (an idle timeout,
  a graceful close, or a plain `stopSending()`) ends the read cleanly with the
  data received. This matches `stream.closed`, which rejects only on an error.

#### `sessionOptions.verifyPeer` (client only)

* Type: {string} One of `'strict'`, `'auto'`, or `'manual'`.
* **Default:** `'auto'`

Controls how the client handles server certificate validation:

* `'strict'` — OpenSSL aborts the TLS handshake immediately if the server's
  certificate fails validation. The `session.opened` promise rejects with a
  TLS error. The application cannot inspect the certificate or the error
  details. This is the most secure mode.

* `'auto'` — The TLS handshake completes regardless of validation result.
  If validation fails, the `session.opened` promise is rejected with an error
  containing the validation reason, and the session is destroyed. The
  `onhandshake` callback (if set) fires before rejection, allowing diagnostic
  logging. This is the default and matches the behavior of `tls.connect()`
  with `rejectUnauthorized: true`.

* `'manual'` — The TLS handshake completes regardless of validation result.
  The `session.opened` promise resolves with the handshake info, which includes
  `validationErrorReason` and `validationErrorCode` if validation failed. The
  application is responsible for checking these values and deciding whether to
  continue. Use this mode for custom validation logic, certificate pinning, or
  intentionally accepting self-signed certificates.

#### `sessionOptions.servername` (client only)

* Type: {string}

The peer server name to target (SNI). Defaults to `'localhost'`.

#### `sessionOptions.sni` (server only)

* Type: {Object}

An object mapping host names to TLS identity options for Server Name
Indication (SNI) support. This is required for server sessions and must
contain at least one entry. The special key `'*'` specifies the optional
default/fallback identity used when no other host name matches. If no
wildcard entry is provided, connections with unrecognized server names
will be rejected with a TLS `unrecognized_name` alert. Each entry may
contain:

* `keys` {KeyObject|KeyObject\[]} The TLS private keys. **Required.**
* `certs` {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}
  The TLS certificates. **Required.**
* `verifyPrivateKey` {boolean} Verify the private key. Default: `false`.
* `port` {number} The port to advertise in ORIGIN frames (RFC 9412) for
  this host name. **Default:** `443`. Only used for HTTP/3 sessions.
* `authoritative` {boolean} Whether to include this host name in ORIGIN
  frames. **Default:** `true`. Set to `false` to exclude a host name
  from ORIGIN advertisements. Wildcard (`'*'`) entries are always
  excluded regardless of this setting.

```mjs
const endpoint = await listen(callback, {
  sni: {
    '*': { keys: [defaultKey], certs: [defaultCert] },
    'api.example.com': { keys: [apiKey], certs: [apiCert], port: 8443 },
    'www.example.com': { keys: [wwwKey], certs: [wwwCert] },
    'internal.example.com': { keys: [intKey], certs: [intCert], authoritative: false },
  },
});
```

Shared TLS options (such as `ciphers`, `groups`, `keylog`, and `verifyClient`)
are specified at the top level of the session options and apply to all
identities. Each SNI entry overrides only the per-identity certificate
fields.

The SNI map can be replaced at runtime using `endpoint.setSNIContexts()`,
which atomically swaps the map for new sessions while existing sessions
continue to use their original identity.

#### `sessionOptions.tlsTrace`

* Type: {boolean}

True to enable TLS tracing output.

#### `sessionOptions.token` (client only)

* Type: {ArrayBufferView}

An opaque address validation token previously received from the server
via the `session.onnewtoken` callback. Providing a valid token on
reconnection allows the client to skip the server's address validation,
reducing handshake latency.

#### `sessionOptions.transportParams`

* Type: {quic.TransportParams}

The QUIC transport parameters to use for the session.

#### `sessionOptions.unacknowledgedPacketThreshold`

* Type: {bigint|number}

Specifies the maximum number of unacknowledged packets a session should allow.

#### `sessionOptions.rejectUnauthorized`

* Type: {boolean} **Default:** `true`

If `true`, the peer certificate is verified against the list of supplied CAs.
An error is emitted if verification fails; the error can be inspected via
the `validationErrorReason` and `validationErrorCode` fields in the
handshake callback. If `false`, peer certificate verification errors are
ignored.

#### `sessionOptions.reuseEndpoint`

* Type: {boolean}
* Default: `true`

When `true` (the default), `connect()` will attempt to reuse an existing
endpoint rather than creating a new one for each session. This provides
connection pooling behavior — multiple sessions can share a single UDP
socket. The reuse logic will not return an endpoint that is listening on
the same address as the connect target (to prevent CID routing conflicts).
