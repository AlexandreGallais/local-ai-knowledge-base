---
title: "TLS (SSL) (part 8 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/tls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# TLS (SSL) (part 8 of 8)

## `tls.createServer(options)`

* `options` {Object}
  * `ALPNProtocols` {string\[]|Buffer|TypedArray|DataView} An array of strings,
    or a single `Buffer`, `TypedArray`, or `DataView` containing the supported
    ALPN protocols. Buffers should have the format `lenlen...`
    e.g. `0x05hello0x05world`, where the first byte is the length of the next
    protocol name. Passing an array is usually much simpler, e.g.
    `['hello', 'world']`. (Protocols should be ordered by their priority.)
  * `ALPNCallback` {Function} If set, this will be called when a
    client opens a connection using the ALPN extension. One argument will
    be passed to the callback: an object containing `servername` and
    `protocols` fields, respectively containing the server name from
    the SNI extension (if any) and an array of ALPN protocol name strings. The
    callback must return either one of the strings listed in
    `protocols`, which will be returned to the client as the selected
    ALPN protocol, or `undefined`, to reject the connection with a fatal alert.
    If a string is returned that does not match one of the client's ALPN
    protocols, an error will be thrown. This option cannot be used with the
    `ALPNProtocols` option, and setting both options will throw an error.
  * `clientCertEngine` {string} Name of an OpenSSL engine which can provide the
    client certificate. **Deprecated.**
  * `enableTrace` {boolean} If `true`, `tls.TLSSocket.enableTrace()` will be
    called on new connections. Tracing can be enabled after the secure
    connection is established, but this option must be used to trace the secure
    connection setup. **Default:** `false`.
  * `handshakeTimeout` {number} Abort the connection if the SSL/TLS handshake
    does not finish in the specified number of milliseconds.
    A `'tlsClientError'` is emitted on the `tls.Server` object whenever
    a handshake times out. **Default:** `120000` (120 seconds).
  * `rejectUnauthorized` {boolean} If not `false` the server will reject any
    connection which is not authorized with the list of supplied CAs. This
    option only has an effect if `requestCert` is `true`. **Default:** `true`.
  * `requestCert` {boolean} If `true` the server will request a certificate from
    clients that connect and attempt to verify that certificate. **Default:**
    `false`.
  * `sessionTimeout` {number} The number of seconds after which a TLS session
    created by the server will no longer be resumable. See
    Session Resumption for more information. **Default:** `300`.
  * `SNICallback(servername, callback)` {Function} A function that will be
    called if the client supports SNI TLS extension. Two arguments will be
    passed when called: `servername` and `callback`. `callback` is an
    error-first callback that takes two optional arguments: `error` and `ctx`.
    `ctx`, if provided, is a `SecureContext` instance.
    `tls.createSecureContext()` can be used to get a proper `SecureContext`.
    If `callback` is called with a falsy `ctx` argument, the default secure
    context of the server will be used. If `SNICallback` wasn't provided the
    default callback with high-level API will be used (see below).
  * `ticketKeys` {Buffer} 48-bytes of cryptographically strong pseudorandom
    data. See Session Resumption for more information.
  * `pskCallback` {Function} For TLS-PSK negotiation, see Pre-shared keys.
  * `pskIdentityHint` {string} optional hint to send to a client to help
    with selecting the identity during TLS-PSK negotiation. Will be ignored
    in TLS 1.3. Upon failing to set pskIdentityHint `'tlsClientError'` will be
    emitted with `'ERR_TLS_PSK_SET_IDENTITY_HINT_FAILED'` code.
  * ...: Any `tls.createSecureContext()` option can be provided. For
    servers, the identity options (`pfx`, `key`/`cert`, or `pskCallback`)
    are usually required.
  * ...: Any `net.createServer()` option can be provided.
* `secureConnectionListener` {Function}
* Returns: {tls.Server}

Creates a new `tls.Server`. The `secureConnectionListener`, if provided, is
automatically set as a listener for the `'secureConnection'` event.

The `ticketKeys` option is automatically shared between `node:cluster` module
workers.

The following illustrates a simple echo server:

```mjs
import { createServer } from 'node:tls';
import { readFileSync } from 'node:fs';

const options = {
  key: readFileSync('server-key.pem'),
  cert: readFileSync('server-cert.pem'),

  // This is necessary only if using client certificate authentication.
  requestCert: true,

  // This is necessary only if the client uses a self-signed certificate.
  ca: [ readFileSync('client-cert.pem') ],
};

const server = createServer(options, (socket) => {
  console.log('server connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
});
server.listen(8000, () => {
  console.log('server bound');
});
```

```cjs
const { createServer } = require('node:tls');
const { readFileSync } = require('node:fs');

const options = {
  key: readFileSync('server-key.pem'),
  cert: readFileSync('server-cert.pem'),

  // This is necessary only if using client certificate authentication.
  requestCert: true,

  // This is necessary only if the client uses a self-signed certificate.
  ca: [ readFileSync('client-cert.pem') ],
};

const server = createServer(options, (socket) => {
  console.log('server connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
});
server.listen(8000, () => {
  console.log('server bound');
});
```

To generate the certificate and key for this example, run:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout server-key.pem -out server-cert.pem
```

Then, to generate the `client-cert.pem` certificate for this example, run:

```bash
openssl pkcs12 -certpbe AES-256-CBC -export -out client-cert.pem \
  -inkey server-key.pem -in server-cert.pem
```

The server can be tested by connecting to it using the example client from
`tls.connect()`.

## `tls.setDefaultCACertificates(certs)`

* `certs` {string\[]|ArrayBufferView\[]} An array of CA certificates in PEM format.

Sets the default CA certificates used by Node.js TLS clients. If the provided
certificates are parsed successfully, they will become the default CA
certificate list returned by `tls.getCACertificates()` and used
by subsequent TLS connections that don't specify their own CA certificates.
The certificates will be deduplicated before being set as the default.

This function only affects the current Node.js thread. Previous
sessions cached by the HTTPS agent won't be affected by this change, so
this method should be called before any unwanted cacheable TLS connections are
made.

To use system CA certificates as the default:

```cjs
const tls = require('node:tls');
tls.setDefaultCACertificates(tls.getCACertificates('system'));
```

```mjs
import tls from 'node:tls';
tls.setDefaultCACertificates(tls.getCACertificates('system'));
```

This function completely replaces the default CA certificate list. To add additional
certificates to the existing defaults, get the current certificates and append to them:

```cjs
const tls = require('node:tls');
const currentCerts = tls.getCACertificates('default');
const additionalCerts = ['-----BEGIN CERTIFICATE-----\n...'];
tls.setDefaultCACertificates([...currentCerts, ...additionalCerts]);
```

```mjs
import tls from 'node:tls';
const currentCerts = tls.getCACertificates('default');
const additionalCerts = ['-----BEGIN CERTIFICATE-----\n...'];
tls.setDefaultCACertificates([...currentCerts, ...additionalCerts]);
```

## `tls.getCACertificates([type])`

* `type` {string|undefined} The type of CA certificates that will be returned. Valid values
  are `"default"`, `"system"`, `"bundled"` and `"extra"`.
  **Default:** `"default"`.
* Returns: {string\[]} An array of PEM-encoded certificates. The array may contain duplicates
  if the same certificate is repeatedly stored in multiple sources.

Returns an array containing the CA certificates from various sources, depending on `type`:

* `"default"`: return the CA certificates that will be used by the Node.js TLS clients by default.
  * When `--use-bundled-ca` is enabled (default), or `--use-openssl-ca` is not enabled,
    this would include CA certificates from the bundled Mozilla CA store.
  * When `--use-system-ca` is enabled, this would also include certificates from the system's
    trusted store.
  * When `NODE_EXTRA_CA_CERTS` is used, this would also include certificates loaded from the specified
    file.
* `"system"`: return the CA certificates that are loaded from the system's trusted store, according
  to rules set by `--use-system-ca`. This can be used to get the certificates from the system
  when `--use-system-ca` is not enabled.
* `"bundled"`: return the CA certificates from the bundled Mozilla CA store. This would be the same
  as `tls.rootCertificates`.
* `"extra"`: return the CA certificates loaded from `NODE_EXTRA_CA_CERTS`. It's an empty array if
  `NODE_EXTRA_CA_CERTS` is not set.

## `tls.getCiphers()`

* Returns: {string\[]}

Returns an array with the names of the supported TLS ciphers. The names are
lower-case for historical reasons, but must be uppercased to be used in
the `ciphers` option of `tls.createSecureContext()`.

Not all supported ciphers are enabled by default. See
Modifying the default TLS cipher suite.

Cipher names that start with `'tls_'` are for TLSv1.3, all the others are for
TLSv1.2 and below.

```js
console.log(tls.getCiphers()); // ['aes128-gcm-sha256', 'aes128-sha', ...]
```

## `tls.getCertificateCompressionAlgorithms()`

* Returns: {string\[]}

Returns an array with the names of the RFC 8879 certificate compression
algorithms supported by the current OpenSSL build, suitable for use in the
`certificateCompression` option of `tls.createSecureContext()`. Possible
values include `'zlib'`, `'brotli'`, and `'zstd'`.

The array is empty when certificate compression is unavailable.

```js
console.log(tls.getCertificateCompressionAlgorithms()); // ['zlib', 'brotli', 'zstd']
```

## `tls.rootCertificates`

* Type: {string\[]}

An immutable array of strings representing the root certificates (in PEM format)
from the bundled Mozilla CA store as supplied by the current Node.js version.

The bundled CA store, as supplied by Node.js, is a snapshot of Mozilla CA store
that is fixed at release time. It is identical on all supported platforms.

To get the actual CA certificates used by the current Node.js instance, which
may include certificates loaded from the system store (if `--use-system-ca` is used)
or loaded from a file indicated by `NODE_EXTRA_CA_CERTS`, use
`tls.getCACertificates()`.

## `tls.DEFAULT_ECDH_CURVE`

The default named curve or TLS group list to use for key agreement in a TLS
server. The default value is `'auto'`. See `tls.createSecureContext()` for
further information.

## `tls.DEFAULT_MAX_VERSION`

* Type: {string} The default value of the `maxVersion` option of
  `tls.createSecureContext()`. It can be assigned any of the supported TLS
  protocol versions, `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`.
  **Default:** `'TLSv1.3'`, unless changed using CLI options. Using
  `--tls-max-v1.2` sets the default to `'TLSv1.2'`. Using `--tls-max-v1.3` sets
  the default to `'TLSv1.3'`. If multiple of the options are provided, the
  highest maximum is used.

## `tls.DEFAULT_MIN_VERSION`

* Type: {string} The default value of the `minVersion` option of
  `tls.createSecureContext()`. It can be assigned any of the supported TLS
  protocol versions, `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`.
  Versions before TLSv1.2 may require downgrading the OpenSSL Security Level.
  **Default:** `'TLSv1.2'`, unless changed using CLI options. Using
  `--tls-min-v1.0` sets the default to `'TLSv1'`. Using `--tls-min-v1.1` sets
  the default to `'TLSv1.1'`. Using `--tls-min-v1.3` sets the default to
  `'TLSv1.3'`. If multiple of the options are provided, the lowest minimum is
  used.

## `tls.DEFAULT_CIPHERS`

* Type: {string} The default value of the `ciphers` option of
  `tls.createSecureContext()`. It can be assigned any of the supported
  OpenSSL ciphers.  Defaults to the content of
  `crypto.constants.defaultCoreCipherList`, unless changed using CLI options
  using `--tls-default-ciphers`.
