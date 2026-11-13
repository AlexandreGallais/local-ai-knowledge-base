---
title: "HTTPS (part 1 of 2)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/https.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTPS

> Stability: 2 - Stable

HTTPS is the HTTP protocol over TLS/SSL. In Node.js this is implemented as a
separate module.

## Determining if crypto support is unavailable

It is possible for Node.js to be built without including support for the
`node:crypto` module. In such cases, attempting to `import` from `https` or
calling `require('node:https')` will result in an error being thrown.

When using CommonJS, the error thrown can be caught using try/catch:

```cjs
let https;
try {
  https = require('node:https');
} catch (err) {
  console.error('https support is disabled!');
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
let https;
try {
  https = await import('node:https');
} catch (err) {
  console.error('https support is disabled!');
}
```

## Class: `https.Agent`

An `Agent` object for HTTPS similar to `http.Agent`. See
`https.request()` for more information.

Like `http.Agent`, the `createConnection(options[, callback])` method can be overridden
to customize how TLS connections are established.

> See `agent.createConnection()` for details on overriding this method,
> including asynchronous socket creation with a callback.

### `new Agent([options])`

* `options` {Object} Set of configurable options to set on the agent.
  Can have the same fields as for `http.Agent(options)`, and
  * `maxCachedSessions` {number} maximum number of TLS cached sessions.
    Use `0` to disable TLS session caching. **Default:** `100`.
  * `servername` {string} the value of
    Server Name Indication extension to be sent to the server. Use
    empty string `''` to disable sending the extension.
    **Default:** host name of the target server, unless the target server
    is specified using an IP address, in which case the default is `''` (no
    extension).

    See `Session Resumption` for information about TLS session reuse.

Requests that specify a custom `checkServerIdentity` option are not eligible
for connection reuse or TLS session reuse by an `https.Agent`, unless the
`checkServerIdentity` option was specified when constructing the Agent.

#### Event: `'keylog'`

* `line` {Buffer} Line of ASCII text, in NSS `SSLKEYLOGFILE` format.
* `tlsSocket` {tls.TLSSocket} The `tls.TLSSocket` instance on which it was
  generated.

The `keylog` event is emitted when key material is generated or received by a
connection managed by this agent (typically before handshake has completed, but
not necessarily). This keying material can be stored for debugging, as it
allows captured TLS traffic to be decrypted. It may be emitted multiple times
for each socket.

A typical use case is to append received lines to a common text file, which is
later used by software (such as Wireshark) to decrypt the traffic:

```js
// ...
https.globalAgent.on('keylog', (line, tlsSocket) => {
  fs.appendFileSync('/tmp/ssl-keys.log', line, { mode: 0o600 });
});
```

## Class: `https.Server`

* Extends: {tls.Server}

See `http.Server` for more information.

### `server.close([callback])`

* `callback` {Function}
* Returns: {https.Server}

See `server.close()` in the `node:http` module.

### `serverSymbol.asyncDispose`

Calls `server.close()` and returns a promise that
fulfills when the server has closed.

### `server.closeAllConnections()`

See `server.closeAllConnections()` in the `node:http` module.

### `server.closeIdleConnections()`

See `server.closeIdleConnections()` in the `node:http` module.

### `server.headersTimeout`

* Type: {number} **Default:** `60000`

See `server.headersTimeout` in the `node:http` module.

### `server.listen()`

Starts the HTTPS server listening for encrypted connections.
This method is identical to `server.listen()` from `net.Server`.

### `server.maxHeadersCount`

* Type: {number} **Default:** `1000`

See `server.maxHeadersCount` in the `node:http` module.

### `server.requestTimeout`

* Type: {number} **Default:** `300000`

See `server.requestTimeout` in the `node:http` module.

### `server.setTimeout(msecs)`

* `msecs` {number} **Default:** `120000` (2 minutes)
* `callback` {Function}
* Returns: {https.Server}

See `server.setTimeout()` in the `node:http` module.

### `server.timeout`

* Type: {number} **Default:** 0 (no timeout)

See `server.timeout` in the `node:http` module.

### `server.keepAliveTimeout`

* Type: {number} **Default:** `5000` (5 seconds)

See `server.keepAliveTimeout` in the `node:http` module.

## `https.createServer(options)`

* `options` {Object} Accepts `options` from `tls.createServer()`,
  `tls.createSecureContext()` and `http.createServer()`.
* `requestListener` {Function} A listener to be added to the `'request'` event.
* Returns: {https.Server}

```mjs
// curl -k https://localhost:8000/
import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';

const options = {
  key: readFileSync('private-key.pem'),
  cert: readFileSync('certificate.pem'),
};

createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

```cjs
// curl -k https://localhost:8000/
const https = require('node:https');
const fs = require('node:fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

Or

```mjs
import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';

const options = {
  pfx: readFileSync('test_cert.pfx'),
  passphrase: 'sample',
};

createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

```cjs
const https = require('node:https');
const fs = require('node:fs');

const options = {
  pfx: fs.readFileSync('test_cert.pfx'),
  passphrase: 'sample',
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

To generate the certificate and key for this example, run:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout private-key.pem -out certificate.pem
```

Then, to generate the `pfx` certificate for this example, run:

```bash
openssl pkcs12 -certpbe AES-256-CBC -export -out test_cert.pfx \
  -inkey private-key.pem -in certificate.pem -passout pass:sample
```

## `https.get(url, options)`

* `url` {string | URL}
* `options` {Object | string | URL} Accepts the same `options` as
  `https.request()`, with the method set to GET by default.
* `callback` {Function}
* Returns: {http.ClientRequest}

Like `http.get()` but for HTTPS.

`options` can be an object, a string, or a `URL` object. If `options` is a
string, it is automatically parsed with `new URL()`. If it is a `URL`
object, it will be automatically converted to an ordinary `options` object.

```mjs
import { get } from 'node:https';
import process from 'node:process';

get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
```

```cjs
const https = require('node:https');

https.get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
```

## `https.globalAgent`

Global instance of `https.Agent` for all HTTPS client requests. Diverges
from a default `https.Agent` configuration by having `keepAlive` enabled and
a `timeout` of 5 seconds.
