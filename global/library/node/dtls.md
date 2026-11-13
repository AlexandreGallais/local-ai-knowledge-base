---
title: "DTLS (part 1 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dtls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# DTLS

> Stability: 1.1 - Active Development

The `node:dtls` module provides an implementation of the Datagram Transport
Layer Security (DTLS) protocol over UDP. DTLS provides TLS-equivalent
security guarantees for datagram-based communication, including
confidentiality, integrity, and authentication.

To use this module, it must be enabled at build time with the
`--experimental-dtls` configure flag and at runtime with the
`--experimental-dtls` CLI flag.

```bash
node --experimental-dtls app.mjs
```

```mjs
import { listen, connect } from 'node:dtls';
```

```cjs
const { listen, connect } = require('node:dtls');
```

## Permission model

When using the Permission Model, the `--allow-net` flag must be passed to
allow DTLS network operations. Without it, calling `dtls.connect()` or
`dtls.listen()` will throw an `ERR_ACCESS_DENIED` error.

```console
node --permission --allow-fs-read=* --experimental-dtls index.mjs
Error: Access to this API has been restricted. Use --allow-net to manage permissions.
  code: 'ERR_ACCESS_DENIED',
  permission: 'Net',
}
```

Creating a `DTLSEndpoint` instance without connecting or listening
is permitted even without `--allow-net`, since no network I/O occurs until
`dtls.connect()` or `dtls.listen()` is called.

## DTLS vs TLS

DTLS is designed for UDP transport and differs from TLS in several key ways:

* No stream guarantees: Messages may arrive out of order or be lost.
  DTLS preserves datagram semantics.
* One socket, many peers: A single UDP socket can serve multiple DTLS
  sessions. The `DTLSEndpoint` manages this multiplexing.
* Cookie exchange: DTLS servers use a stateless cookie mechanism
  (HelloVerifyRequest) to prevent denial-of-service amplification attacks.
* Retransmission: DTLS handles handshake retransmission internally since
  UDP does not guarantee delivery.

## `dtls.listen(callback, options)`

* `callback` {Function} Called for each new DTLS session accepted by the
  server.
  * `session` {DTLSSession} The new session.
* `options` {Object}
  * `cert` {string|Buffer} Server certificate in PEM format. **Required.**
  * `key` {string|Buffer} Server private key in PEM format. **Required.**
  * `secureContext` {DTLSSecureContext} A context from
    `dtls.createSecureContext()` to use instead of building one from the
    credential <example-value> below. Must have been created with `isServer: true`.
    Cannot be combined with any option the context already carries.
  * `sni` {Object|Function} Server Name Indication. A map of host names to the
    identity to serve them with, or a function returning one. Cannot be
    combined with `secureContext`; set it on the context instead. See
    Server Name Indication.
  * `passphrase` {string} Passphrase to decrypt `key`, if it is encrypted.
    Ignored when `key` is not encrypted. Unlike `key` and `cert`, this must be
    a string, matching `tls.createSecureContext()`.
  * `port` {number} Port to bind to. **Required.**
  * `host` {string} Address to bind to. **Default:** `'0.0.0.0'`.
  * `ca` {string|Buffer|string\[]|Buffer\[]} CA certificates in PEM format.
  * `ciphers` {string} OpenSSL cipher list string.
  * `alpn` {string\[]|Buffer} ALPN protocol names. Each name must be between
    1 and 255 bytes. A `Buffer` must already be in ALPN wire format: one
    length byte followed by that many bytes, repeated.
  * `srtp` {string} Colon-separated SRTP protection profile names
    (e.g., `'SRTP_AES128_CM_SHA1_80:SRTP_AEAD_AES_128_GCM'`).
  * `requestCert` {boolean} Request a certificate from the client.
    **Default:** `false`.
  * `rejectUnauthorized` {boolean} Only has an effect together with
    `requestCert`. When `true`, a client that presents no certificate, or one
    that does not chain to a trusted CA, is rejected during the handshake and
    receives a TLS alert. When `false`, the certificate is still requested and
    verified but the handshake completes regardless, leaving the decision to
    the application via `session.authorized`. **Default:** `true`.
  * `mtu` {number} Maximum size in bytes of a DTLS datagram. **Default:**
    `1200`.
  * `handshakeTimeout` {number} Milliseconds a handshake may take before it is
    abandoned. `0` disables it. **Default:** `60000`. See
    Handshake timeout.
  * `ipv6Only` {boolean} When `true`, an IPv6 endpoint serves IPv6 only. When
    `false`, binding `'::'` also accepts IPv4 peers, which arrive with mapped
    addresses such as `'::ffff:203.0.113.1'` -- anything keyed on the peer
    address, including `maxSessionsPerHost`, sees them in that form. Has no
    effect on an IPv4 endpoint. **Default:** `false`.
  * `reusePort` {boolean} When `true`, sets `SO_REUSEPORT`, so several
    processes may bind the same port and the kernel spreads arriving
    datagrams between them. Every one of them must set it. **Default:**
    `false`.
  * `udpReceiveBufferSize` {number} Size in bytes for the socket's receive
    buffer (`SO_RCVBUF`). Raising it gives the endpoint room for bursts that
    the default would drop. The kernel clamps this to its own maximum.
    **Default:** the system default.
  * `udpSendBufferSize` {number} Size in bytes for the socket's send buffer
    (`SO_SNDBUF`). Clamped as above. **Default:** the system default.
  * `udpTTL` {number} IP time-to-live for outgoing datagrams, from `1` to
    `255`. **Default:** the system default.
  * `maxSessions` {number} The maximum number of concurrent sessions the
    endpoint will hold. Set to `0` for no limit. **Default:** `10000`.
  * `maxSessionsPerHost` {number} The maximum number of concurrent sessions
    from any single source IP address, ignoring port. Set to `0` for no limit.
    **Default:** `1000`.
  * `sessionIdContext` {string} Opaque identifier scoping resumable sessions
    to this server, at most 32 bytes. **Default:** a value derived from
    `process.argv`, as in `tls.createServer()`.
* Returns: {DTLSEndpoint}

Creates a DTLS server bound to the specified address and port. The server
uses automatic HMAC-based cookie exchange for DoS protection. See
Denial of service.

Binding failures are thrown with the code the operating system gave, as in
`net` and `dgram`: an address already in use throws an error whose `code` is
`'EADDRINUSE'`, with `errno` and `syscall` set.

```mjs
import { listen } from 'node:dtls';
import { readFileSync } from 'node:fs';

const endpoint = listen((session) => {
  session.onmessage = (data) => {
    console.log('Received:', data.toString());
    session.send('pong');
  };

  session.onhandshake = (protocol) => {
    console.log('Handshake complete:', protocol);
  };
}, {
  cert: readFileSync('server-cert.pem'),
  key: readFileSync('server-key.pem'),
  port: 4433,
});

console.log('DTLS server listening on', endpoint.address);
```

## `dtls.connect(host, port[, options])`

* `host` {string} Remote host to connect to, as an IPv4 or IPv6 literal.
  Host names are not resolved.
* `port` {number} Remote port to connect to.
* `options` {Object}
  * `ca` {string|Buffer|string\[]|Buffer\[]} CA certificates in PEM format.
  * `cert` {string|Buffer} Client certificate in PEM format.
  * `key` {string|Buffer} Client private key in PEM format.
  * `secureContext` {DTLSSecureContext} A context from
    `dtls.createSecureContext()` to use instead of building one from the
    credential <example-value> below. Must **not** have been created with
    `isServer: true`. Cannot be combined with any option the context already
    carries.
  * `psk` {Object|Function} A pre-shared key as `{ identity, key }`, or a
    function returning one. See Pre-shared keys.
  * `session` {Buffer} A session from `session.session` on an earlier
    connection, to resume rather than handshake in full. See
    Session resumption.
  * `passphrase` {string} Passphrase to decrypt `key`, if it is encrypted.
    Ignored when `key` is not encrypted. Unlike `key` and `cert`, this must be
    a string, matching `tls.createSecureContext()`.
  * `rejectUnauthorized` {boolean} When `true`, the server's certificate must
    both chain to a trusted CA and match the expected identity (`servername`,
    or `host` when `servername` is not set); otherwise the handshake is
    aborted and `session.opened` rejects. When `false`, the certificate is
    still verified and the handshake completes regardless, leaving the
    decision to the application via `session.authorized` and
    `session.authorizationError`. **Default:** `true`.
  * `servername` {string} Server name used for the SNI (Server Name
    Indication) extension and as the identity checked during certificate
    verification. **Default:** the `host` argument. Set to `''` to disable SNI.
    SNI is never sent for IP address literals.
  * `bindHost` {string} Local bind address. **Default:** `'::'` when `host` is an
    IPv6 literal, otherwise `'0.0.0.0'`. The local socket must be in the same
    address family as the peer.
  * `bindPort` {number} Local bind port. **Default:** `0` (ephemeral).
  * `alpn` {string\[]|Buffer} ALPN protocol names. Each name must be between
    1 and 255 bytes. A `Buffer` must already be in ALPN wire format: one
    length byte followed by that many bytes, repeated.
  * `srtp` {string} SRTP protection profile names.
  * `mtu` {number} Maximum size in bytes of a DTLS datagram. **Default:**
    `1200`.
  * `handshakeTimeout` {number} Milliseconds a handshake may take before it is
    abandoned and `session.opened` rejects. `0` disables it. **Default:**
    `60000`. See Handshake timeout.
* Returns: {DTLSSession}

Connects to a DTLS server. Returns a `DTLSSession` whose `opened` property
is a `Promise` that resolves when the handshake completes.

```mjs
import { connect } from 'node:dtls';
import { readFileSync } from 'node:fs';

const session = connect('127.0.0.1', 4433, {
  ca: [readFileSync('ca-cert.pem')],
});

await session.opened;
session.send('hello');

session.onmessage = (data) => {
  console.log('Received:', data.toString());
};
```

## `dtls.createSecureContext([options])`

* `options` {Object}
  * `alpn` {string\[]} ALPN protocols.
  * `ca` {string|Buffer|Array} CA certificates in PEM format. When omitted,
    the bundled default certificate authorities are used.
  * `cert` {string|Buffer} Certificate in PEM format.
  * `ciphers` {string} OpenSSL cipher suite list.
  * `ecdhCurve` {string} Named curve or curve list for ECDH.
  * `isServer` {boolean} Build a context for a server. **Default:** `false`.
  * `key` {string|Buffer} Private key in PEM format.
  * `passphrase` {string} Passphrase for `key`, if it is encrypted.
  * `rejectUnauthorized` {boolean} Verification behaviour, as for
    `dtls.listen()` and `dtls.connect()`.
  * `requestCert` {boolean} Request a certificate from the peer. Servers only.
  * `sessionIdContext` {string} Session id context. Servers only.
  * `sni` {Object|Function} Server Name Indication. Servers only. See
    Server Name Indication.
  * `psk` {Object|Function} Pre-shared keys. See Pre-shared keys.
  * `pskIdentityHint` {string} Identity hint to advertise, naming which key a
    client should pick. Requires `psk`. Servers only.
  * `srtp` {string} SRTP profile list.
  * `ticketKeys` {Buffer} Session ticket keys, for resuming sessions across
    endpoints and restarts. Servers only. See Session resumption.
* Returns: {DTLSSecureContext}

Options marked "Servers only" require `isServer: true`. Passing one to a
client context throws `ERR_INVALID_ARG_VALUE`, rather than being ignored or
applied where it can have no effect.

Creates a reusable secure context. Pass it to `dtls.listen()` or
`dtls.connect()` as `secureContext` in place of the credential options.

A context holds a parsed certificate and key and, when `ca` is given, its own
certificate store; roughly 28 KiB in total. Building one per connection is
therefore expensive in memory rather than in time -- two thousand of them cost
about 54 MiB, against 2 MiB when a single context is shared. Clients opening
many connections should build the context once.

The peer identity checked during verification is **not** part of the context.
It is bound to each connection from `servername` (or the host), so one context
can be used against different peers and still reject the wrong certificate.

`isServer` is fixed when the context is created, because it selects the
underlying OpenSSL method. Passing a server context to `dtls.connect()`,
or a client context to `dtls.listen()`, throws.

```mjs
import { connect, createSecureContext, listen } from 'node:dtls';
import { readFileSync } from 'node:fs';

const serverContext = createSecureContext({
  cert: readFileSync('server-cert.pem'),
  key: readFileSync('server-key.pem'),
  isServer: true,
});

// One context, several endpoints.
const a = listen(onsession, { secureContext: serverContext, port: 5684 });
const b = listen(onsession, { secureContext: serverContext, port: 5685 });

const clientContext = createSecureContext({
  ca: readFileSync('ca-cert.pem'),
});

// One context, many connections, each verified against its own name.
const s1 = connect('192.0.2.1', 5684, {
  secureContext: clientContext,
  servername: 'a.example.com',
});
const s2 = connect('192.0.2.2', 5684, {
  secureContext: clientContext,
  servername: 'b.example.com',
});
```
