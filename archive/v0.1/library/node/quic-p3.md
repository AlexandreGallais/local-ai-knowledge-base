---
title: "QUIC (part 3 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 3 of 13)

### Datagrams

In addition to streams, QUIC supports unreliable datagrams (RFC 9221) for
use cases that require low-latency, best-effort messaging.

Datagram support is enabled at two levels. At the QUIC transport level, both
peers must advertise a non-zero `maxDatagramFrameSize` transport parameter
during the handshake. For HTTP/3 sessions, both peers must additionally set
`application.enableDatagrams` to `true`, which exchanges the
`SETTINGS_H3_DATAGRAM` setting on the HTTP/3 control stream.

A datagram is sent with a single call to `session.sendDatagram()`. Each
datagram must fit within a single QUIC packet — datagrams cannot be
fragmented. The maximum payload size is determined by the peer's
`maxDatagramFrameSize` and the path MTU. If a datagram is too large or the
peer does not support datagrams, `sendDatagram()` returns `0n` rather than
throwing an error.

There is no guarantee of delivery. Datagrams may be lost, duplicated, or
delivered out of order. The `session.ondatagramstatus` callback reports
whether each sent datagram was `'acknowledged'`, `'lost'`, or `'abandoned'`
(never sent on the wire).

### 0-RTT early data and session resumption

QUIC supports 0-RTT early data, allowing a client that has previously connected
to a server to send application data with its very first packet, without waiting
for the handshake to complete. This can eliminate a full round-trip of latency on
reconnection.

Two pieces of state from a prior connection make this possible:

* A **session ticket**, received via the `session.onsessionticket` callback,
  enables TLS session resumption and 0-RTT encryption. Pass it as the
  `sessionOptions.sessionTicket` option on a subsequent connection to the
  same server.
* An **address validation token**, received via the `session.onnewtoken`
  callback, allows the client to skip the server's address validation step
  (avoiding a Retry round-trip). Pass it as the `sessionOptions.token`
  option.

If the server accepts the session ticket, any data sent before the handshake
completes is 0-RTT early data. On the server side, `stream.early` is `true`
for streams carrying early data. The server can reject the 0-RTT attempt
(for example, if its configuration has changed since the ticket was issued).
When this happens, all streams opened during the 0-RTT phase are destroyed and
the client's `session.onearlyrejected` callback fires. The connection
falls back to a normal 1-RTT handshake and the application can reopen streams.

Early data is less secure than data sent after the handshake completes — it
can potentially be replayed by an attacker. Applications should treat 0-RTT
data with appropriate caution and avoid performing non-idempotent operations
during the early data phase.

### Connection lifecycle

A typical client session progresses through these stages:

1. Call `quic.connect()` with a server address and options. This returns a
   `QuicSession`.
2. The TLS handshake runs automatically. `session.opened` resolves when the
   handshake completes, providing the negotiated ALPN, cipher, and certificate
   validation results.
3. Open streams, send datagrams, and exchange data.
4. Call `session.close()` to initiate a graceful shutdown. Existing streams
   are allowed to finish, then the session is destroyed. The returned promise
   (also available as `session.closed`) resolves when teardown is complete.

On the server side, call `quic.listen()` with a callback. The callback
fires for each incoming session after the TLS handshake begins. Incoming
streams arrive via the `session.onstream` callback, or, for HTTP/3
sessions with an `onheaders` callback configured, directly through that
callback (see the minimal HTTP/3 server example).

`session.destroy()` is available for immediate teardown — all open streams
are destroyed and the session is closed without waiting for them to finish.

`QuicEndpoint` and `QuicSession` support `Symbol.asyncDispose`, so they can
be used with `await using` for automatic cleanup.

### Error handling

Errors in the `quic` module are communicated through two complementary
mechanisms: the `onerror` callback and the `closed` promise.

Both `QuicSession` and `QuicStream` expose an optional `onerror` callback.
When a session or stream is destroyed with an error — including errors thrown
by other user callbacks — the `onerror` callback is invoked with the error
before the object is torn down. Setting `onerror` also marks the `closed`
promise as handled, preventing unhandled rejection warnings. If `onerror`
is not set, the error is delivered solely through the rejection of the
`closed` promise.

The `QuicError` class carries an explicit numeric QUIC error code
(`error.errorCode`) alongside the usual `message` and `code` properties.
When a `QuicError` is passed to `stream.destroy()` or
`writer.fail()`, its `errorCode` is used in the `RESET_STREAM` or
`STOP_SENDING` frame sent to the peer. Any other error type falls back to
the negotiated protocol's generic internal error code.

### Permission model

When using the Permission Model, the `--allow-net` flag must be passed to
allow QUIC network operations. Without it, calling `quic.connect()` or
`quic.listen()` will throw an `ERR_ACCESS_DENIED` error.

```console
$ node --permission --allow-fs-read=* --experimental-quic index.mjs
Error: Access to this API has been restricted. Use --allow-net to manage permissions.
  code: 'ERR_ACCESS_DENIED',
  permission: 'Net',
}
```

Creating a `QuicEndpoint` instance without connecting or listening
is permitted even without `--allow-net`, since no network I/O occurs until
`quic.connect()` or `quic.listen()` is called.

## `quic.connect(address[, options])`

* `address` {string|net.SocketAddress}
* `options` {quic.SessionOptions}
* Returns: {Promise} a promise for a {quic.QuicSession}

Initiate a new client-side session.

```mjs
import { connect } from 'node:quic';
import { Buffer } from 'node:buffer';

const enc = new TextEncoder();
const alpn = 'foo';
const client = await connect('123.123.123.123:8888', { alpn });
await client.createUnidirectionalStream({
  body: enc.encode('hello world'),
});
```

By default, every call to `connect(...)` will create a new local
`QuicEndpoint` instance bound to a new random local IP port. To
specify the exact local address to use, or to multiplex multiple
QUIC sessions over a single local port, pass the `endpoint` option
with either a `QuicEndpoint` or `EndpointOptions` as the argument.

```mjs
import { QuicEndpoint, connect } from 'node:quic';

const endpoint = new QuicEndpoint({
  address: '127.0.0.1:1234',
});

const client = await connect('123.123.123.123:8888', { endpoint });
```

## `quic.listen(onsession[, options])`

* `onsession` {quic.OnSessionCallback}
* `options` {quic.SessionOptions}
* Returns: {Promise} a promise for a {quic.QuicEndpoint}

Configures the endpoint to listen as a server. When a new session is initiated by
a remote peer, the given `onsession` callback will be invoked with the created
session.

```mjs
import { listen } from 'node:quic';

const endpoint = await listen((session) => {
  // ... handle the session
});

// Closing the endpoint allows any sessions open when close is called
// to complete naturally while preventing new sessions from being
// initiated. Once all existing sessions have finished, the endpoint
// will be destroyed. The call returns a promise that is resolved once
// the endpoint is destroyed.
await endpoint.close();
```

By default, every call to `listen(...)` will create a new local
`QuicEndpoint` instance bound to a new random local IP port. To
specify the exact local address to use, or to multiplex multiple
QUIC sessions over a single local port, pass the `endpoint` option
with either a `QuicEndpoint` or `EndpointOptions` as the argument.

At most, any single `QuicEndpoint` can only be configured to listen as
a server once.

## `quic.listEndpoints([options])`

* `options` {object}
  * `active` {boolean} If `true` (the default), only returns endpoints that are
    active (not destroyed, not closing, and not busy). If `false` returns all
    endpoints.
* Returns: {quic.QuicEndpoint\[]}

Returns the list of all `QuicEndpoint` instances. By default, only active
endpoints are returned.

## `quic.constants`

* {Object}

An object containing commonly used constants for QUIC configuration.

### `quic.constants.cc`

* {Object}

Congestion control algorithm identifiers, for use with the
`sessionOptions.cc` option:

* `quic.constants.cc.RENO` — Reno congestion control.
* `quic.constants.cc.CUBIC` — CUBIC congestion control.
* `quic.constants.cc.BBR` — BBR congestion control.

### `quic.constants.DEFAULT_CIPHERS`

* {string}

The default TLS 1.3 cipher suite list used when `sessionOptions.ciphers`
is not specified.

### `quic.constants.DEFAULT_GROUPS`

* {string}

The default TLS 1.3 key-exchange group list used when
`sessionOptions.groups` is not specified.

## Class: `QuicEndpoint`

A `QuicEndpoint` encapsulates the local UDP-port binding for QUIC. It can be
used as both a client and a server.

### `new QuicEndpoint([options])`

* `options` {quic.EndpointOptions}

### `endpoint.address`

* Type: {net.SocketAddress|undefined}

The local UDP socket address to which the endpoint is bound, if any.

If the endpoint is not currently bound then the value will be `undefined`. Read only.

### `endpoint.busy`

* Type: {boolean}

When `endpoint.busy` is set to true, the endpoint will temporarily reject
new sessions from being created. Read/write.

```mjs
// Mark the endpoint busy. New sessions will be prevented.
endpoint.busy = true;

// Mark the endpoint free. New session will be allowed.
endpoint.busy = false;
```

The `busy` property is useful when the endpoint is under heavy load and needs to
temporarily reject new sessions while it catches up.

### `endpoint.close()`

* Returns: {Promise}

Gracefully close the endpoint. The endpoint will close and destroy itself when
all currently open sessions close. Once called, new sessions will be rejected.

Returns a promise that is fulfilled when the endpoint is destroyed.

### `endpoint.closed`

* Type: {Promise}

A promise that is fulfilled when the endpoint is destroyed. This will be the same promise that is
returned by the `endpoint.close()` function. Read only.

### `endpoint.closing`

* Type: {boolean}

True if `endpoint.close()` has been called and closing the endpoint has not yet completed.
Read only.

### `endpoint.destroy([error])`

* `error` {any}

Forcefully closes the endpoint by forcing all open sessions to be immediately
closed.

### `endpoint.destroyed`

* Type: {boolean}

True if `endpoint.destroy()` has been called. Read only.

### `endpoint.listening`

* Type: {boolean}

True if the endpoint is actively listening for incoming connections. Read only.

### `endpoint.maxConnectionsPerHost`

* Type: {number}

The maximum number of concurrent connections allowed per remote IP address.
`0` means unlimited (default). Can be set at construction time via the
`maxConnectionsPerHost` option and changed dynamically at any time.
The valid range is `0` to `65535`.

### `endpoint.maxConnectionsTotal`

* Type: {number}

The maximum total number of concurrent connections across all remote
addresses. `0` means unlimited (default). Can be set at construction time via
the `maxConnectionsTotal` option and changed dynamically at any time.
The valid range is `0` to `65535`.

### `endpoint.setSNIContexts(entries[, options])`

* `entries` {object} An object mapping host names to TLS identity options.
  Each entry must include `keys` and `certs`.
* `options` {object}
  * `replace` {boolean} If `true`, replaces the entire SNI map. If `false`
    (the default), merges the entries into the existing map.

Replaces or updates the SNI TLS contexts for this endpoint. This allows
changing the TLS identity (key/certificate) used for specific host names
without restarting the endpoint. Existing sessions are unaffected — only
new sessions will use the updated contexts.

```mjs
endpoint.setSNIContexts({
  'api.example.com': { keys: [newApiKey], certs: [newApiCert] },
});

// Replace the entire SNI map
endpoint.setSNIContexts({
  'api.example.com': { keys: [newApiKey], certs: [newApiCert] },
}, { replace: true });
```

### `endpoint.stats`

* Type: {quic.QuicEndpoint.Stats}

The statistics collected for an active endpoint. Read only.

### `endpointSymbol.asyncDispose`

Calls `endpoint.close()` and returns a promise that fulfills when the
endpoint has closed.
