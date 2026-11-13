---
title: "DTLS (part 2 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dtls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# DTLS (part 2 of 3)

## Server Name Indication

An endpoint can serve more than one identity by giving `listen()` an `sni`
map, or a function. Each key of a map is a host name and each value is either
a
`DTLSSecureContext` created with `isServer: true`, or a plain object of
the same options `dtls.createSecureContext()` takes:

```mjs
import { createSecureContext, listen } from 'node:dtls';
import { readFileSync } from 'node:fs';

const endpoint = listen(onsession, {
  cert: readFileSync('default-cert.pem'),
  key: readFileSync('default-key.pem'),
  port: 5684,
  sni: {
    'api.example.com': {
      cert: readFileSync('api-cert.pem'),
      key: readFileSync('<example-value>'),
    },
    'www.example.com': createSecureContext({
      cert: readFileSync('www-cert.pem'),
      key: readFileSync('www-key.pem'),
      isServer: true,
    }),
    '*': {
      cert: readFileSync('default-cert.pem'),
      key: readFileSync('default-key.pem'),
    },
  },
});
```

The `'*'` key is the fallback, used when the client's name matches nothing and
when the client sends no name at all. **Without it, an unmatched name is
refused with an `unrecognized_name` alert** rather than falling back to the
endpoint's own `cert` and `key`; providing an `sni` map is taken to mean that
only the names in it are served. `tls.createServer()` differs here: its
`SNICallback` falls back to the default identity silently.

Verification follows the selected identity, so an entry carrying its own `ca`
accepts only client certificates issued under it. `requestCert` and
`rejectUnauthorized` are not per-identity: they belong to the endpoint and
apply to every name it serves.

A function may be given instead of a map, for identities that are chosen
rather than enumerated:

```mjs
listen(onsession, {
  port: 5684,
  cert,
  key,
  sni: (servername) => contexts.get(servername),
});
```

It is called with the name the client asked for, or `undefined` if the client
sent no SNI extension, and returns what a map entry holds: a
`dtls.createSecureContext()` result or the options to build one. Returning
nothing declines the name, which is refused exactly as an unmatched map with no
`'*'` entry is, rather than falling back to the endpoint's own certificate.

The function runs during the handshake and must return synchronously, so it
cannot consult a database. Returning a prepared context is worth doing:
building one from options parses the certificate again on every handshake.

An exception thrown by the function fails that handshake and is reported to the
session's error handler, like any other handshake failure. It does not reach
the process as an uncaught exception.

The certificate and the cipher list both follow the selected context.
Pre-shared keys do not. OpenSSL installs the PSK callbacks on the connection
when it is created, before any name is known, and selecting an identity does
not replace them, so the keys a server accepts are always the endpoint's own.
A `psk` given on an SNI identity is never consulted, and an identity cannot be
served over PSK alone.

`sni` belongs to the secure context rather than to the endpoint, so it can be
given to `dtls.createSecureContext()` and cannot be combined with a
`secureContext` that already exists. Applying it to a prepared context would
reconfigure that context for every endpoint sharing it, and the identities a
server serves are part of what its context is.

A connection refused for an unrecognized name still reaches the `listen()`
callback: the session exists once the client's address is validated, which
happens before the name is examined. It then fails like any other handshake
failure.

## Denial of service

Cookie exchange proves a peer can receive at its claimed address, but it does
not limit how many sessions that peer may then establish, and each session
holds a TLS state machine, two buffers and a timer. `maxSessions` bounds the
total; `maxSessionsPerHost` is what prevents one peer from taking all of it.
A peer refused by either cap is answered with silence rather than an alert,
because replying to an address that has not completed cookie exchange would
create an amplification vector; a legitimate client retransmits and is
admitted once there is room. Refusals are counted by
`endpointStats.serverRefusedCount`.

Deployments serving many clients behind a single NAT may need to raise
`maxSessionsPerHost`.

## Handshake timeout

A handshake that never finishes is abandoned after `handshakeTimeout`
milliseconds, and its session error is `DTLS handshake timeout`.

OpenSSL already gives up on its own, but only after twelve retransmits on a
doubling backoff capped at 60 seconds -- around eight minutes in total. Until
then the session holds its place against `maxSessions` (see
Denial of service),
so handshakes that are started and abandoned can occupy an endpoint for the
cost of starting them. That needs no spoofing: the peer completes the cookie
exchange and then simply stops.

The two limits coexist and whichever comes first ends the handshake. The
retransmit schedule itself is untouched, deliberately -- compressing it to
force earlier failure would cause spurious retransmissions on exactly the
lossy links DTLS is meant for.

The timeout covers resumed and PSK handshakes as well, and stops applying once
the handshake completes; it is not an idle timeout.

A handshake can stall without either peer being at fault or aware.
DTLS discards records it cannot authenticate rather than answering them
(RFC 6347 section 4.1.2.1), so a mismatched pre-shared key or a cipher list
with nothing in common produces silence rather than an alert. This timeout is
what ends those.

## Pre-shared keys

DTLS can authenticate with a key both peers already hold instead of a
certificate (RFC 4279). This is how it is usually deployed to constrained
devices, which frequently have no certificate at all.

A server gives the identities it accepts; a client gives the one it is. No
certificate is needed on either side:

```mjs
import { connect, listen } from 'node:dtls';

const endpoint = listen(onsession, {
  port: 5684,
  psk: { 'device-42': deviceKey },
});

const client = connect('192.0.2.1', 5684, {
  psk: { identity: 'device-42', key: <example-value> },
});
```

Either side may pass a function instead, for keys that are looked up or
derived rather than known up front. A server's is called with the identity the
client offered and returns the key, or nothing to refuse it. A client's is
called with the server's identity hint, if it sent one, and returns
`{ identity, key }`:

```mjs
listen(onsession, {
  port: 5684,
  psk: (identity) => deriveKey(masterSecret, identity),
});
```

The callback runs during the handshake and must return synchronously, so it
cannot consult a database. Where both are given, the map is checked first and
the callback is only reached when the map has no answer -- a configuration
using only the map never runs JavaScript inside the handshake.

An exception thrown by the callback fails that handshake and is reported to
the session's error handler. It does not reach the process as an uncaught
exception.

### Cipher suites

The default cipher list excludes PSK, so giving `psk` without `ciphers`
enables the PSK suites. Supplying `ciphers` disables that and uses exactly
what was asked for.

A server keeps the certificate suites as well, since it may serve both kinds
of client on one port. A client does not: a client that configured a
pre-shared key and no CA wants the key, and leaving the certificate suites
enabled would let a server choose one, failing the handshake while verifying a
certificate the caller never meant to rely on.

Forward-secret PSK key <example-value> are preferred over plain PSK of the same
strength. Plain PSK derives its keys from the shared secret alone, so anyone
who later learns that key can decrypt traffic they recorded earlier. `RSA-PSK`
is excluded: it needs a certificate and adds no forward secrecy.

CoAP requires `TLS_PSK_WITH_AES_128_CCM_8` (RFC 7252), whose 64-bit
authentication tag OpenSSL rejects at security level 1 and above. Node.js
default is above it, so that suite has to be asked for explicitly and with the
security level lowered:

```mjs
listen(onsession, { port: 5684, psk, ciphers: 'PSK-AES128-CCM8@SECLEVEL=0' });
```

### Failure modes

A wrong key does not produce an error. The identity only names the key, so the
handshake proceeds and the two sides derive different secrets; the first
record that fails authentication is then discarded rather than answered, since
DTLS discards invalid records instead of replying to them (RFC 6347 section
4.1.2.1). Neither peer is told anything and both retransmit.

A cipher list with nothing in common behaves the same way, which is what makes
the `CCM8` case above present as a stall rather than a rejection. Both are
ended by `handshakeTimeout`, after 60 seconds by default.

An identity the server does not recognise is refused outright, and the client
sees the handshake fail.

## Session resumption

A resumed handshake skips the server's certificate, which matters more here
than it does over TCP: the `Certificate` flight is fragmented across several
datagrams, and losing any one of them costs a retransmission timeout. Measured
on loopback, a full handshake has the server send 1850 bytes in 4 packets
against 280 bytes in 3 for a resumed one.

A client reads `session.session` once the session is open and passes it to
a later `dtls.connect()`:

```mjs
import { connect } from 'node:dtls';

const first = connect('192.0.2.1', 5684, { ca, servername: 'device.example' });
await first.opened;
const ticket = first.session;        // Buffer.
await first.close();

const second = connect('192.0.2.1', 5684, {
  ca,
  servername: 'device.example',
  session: ticket,
});
await second.opened;
console.log(second.reused);          // True.
```

A session that the server will not accept -- expired, or issued by a different
endpoint -- is not an error. The handshake simply proceeds in full, and
`session.reused` is `false`.

The cookie exchange still happens for a resumed handshake, so resumption is not
a way around the address validation described under Denial of service.

### Binding to the authenticated host

A session may only be resumed against the identity it was authenticated for --
the `servername`, or the host when there is none. Reusing it for anything else
throws.

This is not a convenience check. A resumed handshake does not re-send or
re-verify the peer's certificate; it inherits the authenticated identity of the
original session. Replaying a session against a different host would therefore
skip verification while appearing to succeed. For the same reason a `session`
that did not come from `session.session` is rejected outright: nothing
records which identity it belongs to, so it cannot be checked.

### Resuming under `rejectUnauthorized`

A session carries the verification result it was established with, so a session
established with `rejectUnauthorized: false` cannot be resumed by a connection
that asked for a verified peer. The handshake fails:

```mjs
import { connect } from 'node:dtls';

// Connected without verifying anything.
const first = connect('192.0.2.1', 5684, { rejectUnauthorized: false });
await first.opened;
console.log(first.authorized);         // False.
const ticket = first.session;
await first.close();

const second = connect('192.0.2.1', 5684, {
  rejectUnauthorized: true,
  session: ticket,
});
await second.opened;                   // Rejects: verification failed.
```

The host is the same in both, so binding the session to its authenticated
identity does not cover this on its own; what differs is whether the caller
asked for the peer to be verified. Because a resumed handshake runs no
verification of its own, the recorded result is re-checked once it completes,
and a session whose peer never verified is refused wherever verification is
required. `session.authorized` and `session.authorizationError` report
the recorded result on a resumed session either way.

### Ticket keys

The key that encrypts session tickets is generated at random for each context,
so by default a ticket is only good for the endpoint that issued it and only
until the process restarts. Give every endpoint the same `ticketKeys` to let
tickets be resumed across a restart or a cluster:

```mjs
import { listen } from 'node:dtls';
import { randomBytes } from 'node:crypto';

const ticketKeys = randomBytes(80);    // Share this between processes.
const endpoint = listen(onsession, { cert, key, port: 5684, ticketKeys });
```

The length is OpenSSL's: a key name followed by an HMAC key and an AES key. It
differs from the 48 bytes `tls.createServer()` uses, which is a layout
`node:tls` defines for itself. Supplying the wrong length throws and reports
the length expected.

Ticket keys are long-lived secrets. Anyone holding them can decrypt tickets and
recover the sessions they protect, so treat them as key <example-value> and rotate
them.

## Class: `DTLSSecureContext`

An opaque, reusable bundle of credentials and TLS settings, created by
`dtls.createSecureContext()`. It cannot be constructed directly.

### `secureContext.isServer`

* Returns: {boolean} `true` if the context was created for a server.

## Class: `DTLSEndpoint`

Manages a UDP socket and multiplexes DTLS sessions.

### `endpoint.address`

* Returns: {Object} `{ address, family, port }`

The local address the endpoint is bound to.

### `endpoint.stats`

* Type: {DTLSEndpoint.Stats}

The statistics collected for this endpoint. Read only. The stats object is
live and updated as data flows through the endpoint.

### `endpoint.busy`

* {boolean}

When `true`, the endpoint rejects new incoming connections. Can be set
to implement backpressure.

### `endpoint.close()`

* Returns: {Promise} Resolves when the endpoint is fully closed.

Gracefully closes the endpoint. All active sessions are closed with
`close_notify` alerts before the UDP socket is released.

### `endpoint.destroy([error])`

Immediately destroys the endpoint without sending `close_notify` alerts.

### `endpoint.destroyed`

* {boolean} True once the endpoint has been destroyed.

### `endpoint.closed`

* {Promise} Resolves when the endpoint has fully closed.

### `endpointSymbol.asyncDispose`

Equivalent to calling `endpoint.close()`.
