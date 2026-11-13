---
title: "TLS (SSL) (part 1 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/tls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# TLS (SSL)

> Stability: 2 - Stable

The `node:tls` module provides an implementation of the Transport Layer Security
(TLS) and Secure Socket Layer (SSL) protocols that is built on top of OpenSSL.
The module can be accessed using:

```mjs
import tls from 'node:tls';
```

```cjs
const tls = require('node:tls');
```

## Determining if crypto support is unavailable

It is possible for Node.js to be built without including support for the
`node:crypto` module. In such cases, attempting to `import` from `tls` or
calling `require('node:tls')` will result in an error being thrown.

When using CommonJS, the error thrown can be caught using try/catch:

```cjs
let tls;
try {
  tls = require('node:tls');
} catch (err) {
  console.error('tls support is disabled!');
}
```

When using the lexical ESM `import` keyword, the error can only be
caught if a handler for `process.on('uncaughtException')` is registered
_before_ any attempt to load the module is made (using, for instance,
a preload module).

When using ESM, if there is a chance that the code may be run on a build
of Node.js where crypto support is not enabled, consider using the
`import()` function instead of the lexical `import` keyword:

```mjs
let tls;
try {
  tls = await import('node:tls');
} catch (err) {
  console.error('tls support is disabled!');
}
```

## TLS/SSL concepts

TLS/SSL is a set of protocols that rely on a public key infrastructure (PKI) to
enable secure communication between a client and a server. For most common
cases, each server must have a private key.

Private keys can be generated in multiple ways. The example below illustrates
use of the OpenSSL command-line interface to generate a 2048-bit RSA private
key:

```bash
openssl genrsa -out ryans-key.pem 2048
```

With TLS/SSL, all servers (and some clients) must have a _certificate_.
Certificates are _public keys_ that correspond to a private key, and that are
digitally signed either by a Certificate Authority or by the owner of the
private key (such certificates are referred to as "self-signed"). The first
step to obtaining a certificate is to create a _Certificate Signing Request_
(CSR) file.

The OpenSSL command-line interface can be used to generate a CSR for a private
key:

```bash
openssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem
```

Once the CSR file is generated, it can either be sent to a Certificate
Authority for signing or used to generate a self-signed certificate.

Creating a self-signed certificate using the OpenSSL command-line interface
is illustrated in the example below:

```bash
openssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem
```

Once the certificate is generated, it can be used to generate a `.pfx` or
`.p12` file:

```bash
openssl pkcs12 -export -in ryans-cert.pem -inkey ryans-key.pem \
      -certfile ca-cert.pem -out ryans.pfx
```

Where:

* `in`: is the signed certificate
* `inkey`: is the associated private key
* `certfile`: is a concatenation of all Certificate Authority (CA) certs into
  a single file, e.g. `cat ca1-cert.pem ca2-cert.pem > ca-cert.pem`

### Perfect forward secrecy

The term _forward secrecy_ or _perfect forward secrecy_ describes a feature
of key-agreement (i.e., key-exchange) methods. That is, the server and client
keys are used to negotiate new temporary keys that are used specifically and
only for the current communication session. Practically, this means that even
if the server's private key is compromised, communication can only be decrypted
by eavesdroppers if the attacker manages to obtain the key-pair specifically
generated for the session.

Perfect forward secrecy is achieved by randomly generating a key pair for
key-agreement on every TLS/SSL handshake (in contrast to using the same key for
all sessions). Methods implementing this technique are called "ephemeral".

Currently two methods are commonly used to achieve perfect forward secrecy (note
the character "E" appended to the traditional abbreviations):

* ECDHE: An ephemeral version of the Elliptic Curve Diffie-Hellman
  key-agreement protocol.
* DHE: An ephemeral version of the Diffie-Hellman key-agreement protocol.

Perfect forward secrecy using ECDHE is enabled by default. The `ecdhCurve`
option can be used when creating a TLS server to customize the list of supported
ECDH curves for TLSv1.2 and below, and the list of supported TLS groups for
TLSv1.3. See `tls.createServer()` for more info.

DHE is disabled by default but can be enabled alongside ECDHE by setting the
`dhparam` option to `'auto'`. Custom DHE parameters are also supported but
discouraged in favor of automatically selected, well-known parameters.

Perfect forward secrecy was optional up to TLSv1.2. As of TLSv1.3, (EC)DHE is
always used (with the exception of PSK-only connections).

### ALPN and SNI

ALPN (Application-Layer Protocol Negotiation Extension) and
SNI (Server Name Indication) are TLS handshake extensions:

* ALPN: Allows the use of one TLS server for multiple protocols (HTTP, HTTP/2)
* SNI: Allows the use of one TLS server for multiple hostnames with different
  certificates.

### Pre-shared keys

TLS-PSK support is available as an alternative to normal certificate-based
authentication. It uses a pre-shared key instead of certificates to
authenticate a TLS connection, providing mutual authentication.
TLS-PSK and public key infrastructure are not mutually exclusive. Clients and
servers can accommodate both, choosing either of them during the normal cipher
negotiation step.

TLS-PSK is only a good choice where means exist to securely share a
key with every connecting machine, so it does not replace the public key
infrastructure (PKI) for the majority of TLS uses.
The TLS-PSK implementation in OpenSSL has seen many security flaws in
recent years, mostly because it is used only by a minority of applications.
Please consider all alternative solutions before switching to PSK ciphers.
Upon generating PSK it is of critical importance to use sufficient entropy as
discussed in RFC 4086. Deriving a shared secret from a password or other
low-entropy sources is not secure.

PSK ciphers are disabled by default, and using TLS-PSK thus requires explicitly
specifying a cipher suite with the `ciphers` option. The list of available
ciphers can be retrieved via `openssl ciphers -v 'PSK'`. All TLS 1.3
ciphers are eligible for PSK and can be retrieved via
`openssl ciphers -v -s -tls1_3 -psk`.
On the client connection, a custom `checkServerIdentity` should be passed
because the default one will fail in the absence of a certificate.

According to the RFC 4279, PSK identities up to 128 bytes in length and
PSKs up to 64 bytes in length must be supported. As of OpenSSL 1.1.0
maximum identity size is 128 bytes, and maximum PSK length is 256 bytes.

The current implementation doesn't support asynchronous PSK callbacks due to the
limitations of the underlying OpenSSL API.

To use TLS-PSK, client and server must specify the `pskCallback` option,
a function that returns the PSK to use (which must be compatible with
the selected cipher's digest).

It will be called first on the client:

* `hint` {string} optional message sent from the server to help the client
  decide which identity to use during negotiation.
  Always `null` if TLS 1.3 is used.
* Returns: {Object} in the form
  `{ psk: <Buffer|TypedArray|DataView>, identity: <string> }` or `null`.

Then on the server:

* `socket` {tls.TLSSocket} the server socket instance, equivalent to `this`.
* `identity` {string} identity parameter sent from the client.
* Returns: {Buffer|TypedArray|DataView} the PSK (or `null`).

A return value of `null` stops the negotiation process and sends an
`unknown_psk_identity` alert message to the other party.
If the server wishes to hide the fact that the PSK identity was not known,
the callback must provide some random data as `psk` to make the connection
fail with `decrypt_error` before negotiation is finished.

### Client-initiated renegotiation attack mitigation

The TLS protocol allows clients to renegotiate certain aspects of the TLS
session. Unfortunately, session renegotiation requires a disproportionate amount
of server-side resources, making it a potential vector for denial-of-service
attacks.

To mitigate the risk, renegotiation is limited to three times every ten minutes.
An `'error'` event is emitted on the `tls.TLSSocket` instance when this
threshold is exceeded. The limits are configurable:

* `tls.CLIENT_RENEG_LIMIT` {number} Specifies the number of renegotiation
  requests. **Default:** `3`.
* `tls.CLIENT_RENEG_WINDOW` {number} Specifies the time renegotiation window
  in seconds. **Default:** `600` (10 minutes).

The default renegotiation limits should not be modified without a full
understanding of the implications and risks.

TLSv1.3 does not support renegotiation.

### Session resumption

Establishing a TLS session can be relatively slow. The process can be sped
up by saving and later reusing the session state. There are several mechanisms
to do so, discussed here from oldest to newest (and preferred).

#### Session identifiers

Servers generate a unique ID for new connections and
send it to the client. Clients and servers save the session state. When
reconnecting, clients send the ID of their saved session state and if the server
also has the state for that ID, it can agree to use it. Otherwise, the server
will create a new session. See RFC 2246 for more information, page 23 and
30\.

Resumption using session identifiers is supported by most web browsers when
making HTTPS requests.

For Node.js, clients wait for the `'session'` event to get the session data,
and provide the data to the `session` option of a subsequent `tls.connect()`
to reuse the session. Servers must
implement handlers for the `'newSession'` and `'resumeSession'` events
to save and restore the session data using the session ID as the lookup key to
reuse sessions. To reuse sessions across load balancers or cluster workers,
servers must use a shared session cache (such as Redis) in their session
handlers.

#### Session tickets

The servers encrypt the entire session state and send it
to the client as a "ticket". When reconnecting, the state is sent to the server
in the initial connection. This mechanism avoids the need for a server-side
session cache. If the server doesn't use the ticket, for any reason (failure
to decrypt it, it's too old, etc.), it will create a new session and send a new
ticket. See RFC 5077 for more information.

Resumption using session tickets is becoming commonly supported by many web
browsers when making HTTPS requests.

For Node.js, clients use the same APIs for resumption with session identifiers
as for resumption with session tickets. For debugging, if
`tls.TLSSocket.getTLSTicket()` returns a value, the session data contains a
ticket, otherwise it contains client-side session state.

With TLSv1.3, be aware that multiple tickets may be sent by the server,
resulting in multiple `'session'` events, see `'session'` for more
information.

Single process servers need no specific implementation to use session tickets.
To use session tickets across server restarts or load balancers, servers must
all have the same ticket keys. There are three 16-byte keys internally, but the
tls API exposes them as a single 48-byte buffer for convenience.

It's possible to get the ticket keys by calling `server.getTicketKeys()` on
one server instance and then distribute them, but it is more reasonable to
securely generate 48 bytes of secure random data and set them with the
`ticketKeys` option of `tls.createServer()`. The keys should be regularly
regenerated and server's keys can be reset with
`server.setTicketKeys()`.

Session ticket keys are cryptographic keys, and they _**must be stored
securely**_. With TLS 1.2 and below, if they are compromised all sessions that
used tickets encrypted with them can be decrypted. They should not be stored
on disk, and they should be regenerated regularly.

If clients advertise support for tickets, the server will send them. The
server can disable tickets by supplying
`require('node:constants').SSL_OP_NO_TICKET` in `secureOptions`.

Both session identifiers and session tickets timeout, causing the server to
create new sessions. The timeout can be configured with the `sessionTimeout`
option of `tls.createServer()`.

For all the mechanisms, when resumption fails, servers will create new sessions.
Since failing to resume the session does not cause TLS/HTTPS connection
failures, it is easy to not notice unnecessarily poor TLS performance. The
OpenSSL CLI can be used to verify that servers are resuming sessions. Use the
`-reconnect` option to `openssl s_client`, for example:

```bash
openssl s_client -connect localhost:443 -reconnect
```

Read through the debug output. The first connection should say "New", for
example:

```text
New, TLSv1.2, Cipher is ECDHE-RSA-AES128-GCM-SHA256
```

Subsequent connections should say "Reused", for example:

```text
Reused, TLSv1.2, Cipher is ECDHE-RSA-AES128-GCM-SHA256
```
