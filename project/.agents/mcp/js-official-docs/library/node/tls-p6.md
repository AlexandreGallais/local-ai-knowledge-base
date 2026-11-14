---
title: "TLS (SSL) (part 6 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/tls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# TLS (SSL) (part 6 of 8)

## `tls.connect(options[, callback])`

* `options` {Object}
  * `enableTrace`: See `tls.createServer()`
  * `host` {string} Host the client should connect to. **Default:**
    `'localhost'`.
  * `port` {number} Port the client should connect to.
  * `path` {string} Creates Unix socket connection to path. If this option is
    specified, `host` and `port` are ignored.
  * `socket` {stream.Duplex} Establish secure connection on a given socket
    rather than creating a new socket. Typically, this is an instance of
    `net.Socket`, but any `Duplex` stream is allowed.
    If this option is specified, `path`, `host`, and `port` are ignored,
    except for certificate validation. Usually, a socket is already connected
    when passed to `tls.connect()`, but it can be connected later.
    Connection/disconnection/destruction of `socket` is the user's
    responsibility; calling `tls.connect()` will not cause `net.connect()` to be
    called.
  * `allowHalfOpen` {boolean} If set to `false`, then the socket will
    automatically end the writable side when the readable side ends. If the
    `socket` option is set, this option has no effect. See the `allowHalfOpen`
    option of `net.Socket` for details. **Default:** `false`.
  * `rejectUnauthorized` {boolean} If not `false`, the server certificate is
    verified against the list of supplied CAs. An `'error'` event is emitted if
    verification fails; `err.code` contains the OpenSSL error code. **Default:**
    `true`.
  * `pskCallback` {Function} For TLS-PSK negotiation, see Pre-shared keys.
  * `ALPNProtocols` {string\[]|Buffer|TypedArray|DataView} An array of strings,
    or a single `Buffer`, `TypedArray`, or `DataView` containing the supported
    ALPN protocols. Buffers should have the format `lenlen...`
    e.g. `'\x08http/1.1\x08http/1.0'`, where the `len` byte is the length of the
    next protocol name. Passing an array is usually much simpler, e.g.
    `['http/1.1', 'http/1.0']`. Protocols earlier in the list have higher
    preference than those later.
  * `servername` {string} Server name for the SNI (Server Name Indication) TLS
    extension. It is the name of the host being connected to, and must be a host
    name, and not an IP address. It can be used by a multi-homed server to
    choose the correct certificate to present to the client, see the
    `SNICallback` option to `tls.createServer()`.
  * `checkServerIdentity(servername, cert)` {Function} A callback function
    to be used (instead of the builtin `tls.checkServerIdentity()` function)
    when checking the server's host name (or the provided `servername` when
    explicitly set) against the certificate. This should return an {Error} if
    verification fails. The method should return `undefined` if the `servername`
    and `cert` are verified.
  * `session` {Buffer} A `Buffer` instance, containing TLS session.
  * `requestOCSP` {boolean} If `true`, specifies that the OCSP status request
    extension will be added to the client hello and an `'OCSPResponse'` event
    will be emitted on the socket before establishing a secure communication.
  * `minDHSize` {number} Minimum size of the DH parameter in bits to accept a
    TLS connection. When a server offers a DH parameter with a size less
    than `minDHSize`, the TLS connection is destroyed and an error is thrown.
    **Default:** `1024`.
  * `highWaterMark` {number} Consistent with the readable stream `highWaterMark` parameter.
    **Default:** `16 * 1024`.
  * `timeout`: {number} If set and if a socket is created internally, will call
    `socket.setTimeout(timeout)` after the socket is created, but before it
    starts the connection.
  * `secureContext`: TLS context object created with
    `tls.createSecureContext()`. If a `secureContext` is _not_ provided, one
    will be created by passing the entire `options` object to
    `tls.createSecureContext()`.
  * `onread` {Object} If the `socket` option is missing, incoming data is
    stored in a single `buffer` and passed to the supplied `callback` when
    data arrives on the socket, otherwise the option is ignored. See the
    `onread` option of `net.Socket` for details.
  * ...: `tls.createSecureContext()` options that are used if the
    `secureContext` option is missing, otherwise they are ignored.
  * ...: Any `socket.connect()` option not already listed.
* `callback` {Function}
* Returns: {tls.TLSSocket}

The `callback` function, if specified, will be added as a listener for the
`'secureConnect'` event.

`tls.connect()` returns a `tls.TLSSocket` object.

Unlike the `https` API, `tls.connect()` does not enable the
SNI (Server Name Indication) extension by default, which may cause some
servers to return an incorrect certificate or reject the connection
altogether. To enable SNI, set the `servername` option in addition
to `host`.

The following illustrates a client for the echo server example from
`tls.createServer()`:

```mjs
// Assumes an echo server that is listening on port 8000.
import { connect } from 'node:tls';
import { readFileSync } from 'node:fs';
import { stdin } from 'node:process';

const options = {
  // Necessary only if the server requires client certificate authentication.
  key: readFileSync('client-key.pem'),
  cert: readFileSync('client-cert.pem'),

  // Necessary only if the server uses a self-signed certificate.
  ca: [ readFileSync('server-cert.pem') ],

  // Necessary only if the server's cert isn't for "localhost".
  checkServerIdentity: () => { return null; },
};

const socket = connect(8000, options, () => {
  console.log('client connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  stdin.pipe(socket);
  stdin.resume();
});
socket.setEncoding('utf8');
socket.on('data', (data) => {
  console.log(data);
});
socket.on('end', () => {
  console.log('server ends connection');
});
```

```cjs
// Assumes an echo server that is listening on port 8000.
const { connect } = require('node:tls');
const { readFileSync } = require('node:fs');

const options = {
  // Necessary only if the server requires client certificate authentication.
  key: readFileSync('client-key.pem'),
  cert: readFileSync('client-cert.pem'),

  // Necessary only if the server uses a self-signed certificate.
  ca: [ readFileSync('server-cert.pem') ],

  // Necessary only if the server's cert isn't for "localhost".
  checkServerIdentity: () => { return null; },
};

const socket = connect(8000, options, () => {
  console.log('client connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(socket);
  process.stdin.resume();
});
socket.setEncoding('utf8');
socket.on('data', (data) => {
  console.log(data);
});
socket.on('end', () => {
  console.log('server ends connection');
});
```

To generate the certificate and key for this example, run:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout client-key.pem -out client-cert.pem
```

Then, to generate the `server-cert.pem` certificate for this example, run:

```bash
openssl pkcs12 -certpbe AES-256-CBC -export -out server-cert.pem \
  -inkey <example-value>-key.pem -in client-cert.pem
```

## `tls.connect(path, options)`

* `path` {string} Default value for `options.path`.
* `options` {Object} See `tls.connect()`.
* `callback` {Function} See `tls.connect()`.
* Returns: {tls.TLSSocket}

Same as `tls.connect()` except that `path` can be provided
as an argument instead of an option.

A path option, if specified, will take precedence over the path argument.

## `tls.connect(port, host[, callback])`

* `port` {number} Default value for `options.port`.
* `host` {string} Default value for `options.host`.
* `options` {Object} See `tls.connect()`.
* `callback` {Function} See `tls.connect()`.
* Returns: {tls.TLSSocket}

Same as `tls.connect()` except that `port` and `host` can be provided
as arguments instead of options.

A port or host option, if specified, will take precedence over any port or host
argument.
