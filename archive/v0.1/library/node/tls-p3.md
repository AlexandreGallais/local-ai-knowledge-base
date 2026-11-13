---
title: "TLS (SSL) (part 3 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/tls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# TLS (SSL) (part 3 of 8)

## Class: `tls.Server`

* Extends: {net.Server}

Accepts encrypted connections using TLS or SSL.

### Event: `'connection'`

* `socket` {stream.Duplex}

This event is emitted when a new TCP stream is established, before the TLS
handshake begins. `socket` is typically an object of type `net.Socket` but
will not receive events unlike the socket created from the `net.Server`
`'connection'` event. Usually users will not want to access this event.

This event can also be explicitly emitted by users to inject connections
into the TLS server. In that case, any `Duplex` stream can be passed.

### Event: `'keylog'`

* `line` {Buffer} Line of ASCII text, in NSS `SSLKEYLOGFILE` format.
* `tlsSocket` {tls.TLSSocket} The `tls.TLSSocket` instance on which it was
  generated.

The `keylog` event is emitted when key <example-value> is generated or received by
a connection to this server (typically before handshake has completed, but not
necessarily). This keying material can be stored for debugging, as it allows
captured TLS traffic to be decrypted. It may be emitted multiple times for
each socket.

A typical use case is to append received lines to a common text file, which
is later used by software (such as Wireshark) to decrypt the traffic:

```js
const logFile = fs.createWriteStream('/tmp/ssl-keys.log', { flags: 'a' });
// ...
server.on('keylog', (line, tlsSocket) => {
  if (tlsSocket.remoteAddress !== '...')
    return; // Only log keys for a particular IP
  logFile.write(line);
});
```

### Event: `'newSession'`

The `'newSession'` event is emitted upon creation of a new TLS session. This may
be used to store sessions in external storage. The data should be provided to
the `'resumeSession'` callback.

The listener callback is passed three arguments when called:

* `sessionId` {Buffer} The TLS session identifier
* `sessionData` {Buffer} The TLS session data
* `callback` {Function} A callback function taking no arguments that must be
  invoked in order for data to be sent or received over the secure connection.

Listening for this event will have an effect only on connections established
after the addition of the event listener.

### Event: `'OCSPRequest'`

The `'OCSPRequest'` event is emitted when the client sends a certificate status
request. The listener callback is passed three arguments when called:

* `certificate` {Buffer} The server certificate
* `issuer` {Buffer} The issuer's certificate
* `callback` {Function} A callback function that must be invoked to provide
  the results of the OCSP request.

The server's current certificate can be parsed to obtain the OCSP URL
and certificate ID; after obtaining an OCSP response, `callback(null, resp)` is
then invoked, where `resp` is a `Buffer` instance containing the OCSP response.
Both `certificate` and `issuer` are `Buffer` DER-representations of the
primary and issuer's certificates. These can be used to obtain the OCSP
certificate ID and OCSP endpoint URL.

Alternatively, `callback(null, null)` may be called, indicating that there was
no OCSP response.

Calling `callback(err)` will result in a `socket.destroy(err)` call.

The typical flow of an OCSP request is as follows:

1. Client connects to the server and sends an `'OCSPRequest'` (via the status
   info extension in ClientHello).
2. Server receives the request and emits the `'OCSPRequest'` event, calling the
   listener if registered.
3. Server extracts the OCSP URL from either the `certificate` or `issuer` and
   performs an OCSP request to the CA.
4. Server receives `'OCSPResponse'` from the CA and sends it back to the client
   via the `callback` argument
5. Client validates the response and either destroys the socket or performs a
   handshake.

The `issuer` can be `null` if the certificate is either self-signed or the
issuer is not in the root certificates list. (An issuer may be provided
via the `ca` option when establishing the TLS connection.)

Listening for this event will have an effect only on connections established
after the addition of the event listener.

An npm module like asn1.js may be used to parse the certificates.

### Event: `'resumeSession'`

The `'resumeSession'` event is emitted when the client requests to resume a
previous TLS session. The listener callback is passed two arguments when
called:

* `sessionId` {Buffer} The TLS session identifier
* `callback` {Function} A callback function to be called when the prior session
  has been recovered: `callback([err[, sessionData]])`
  * `err` {Error}
  * `sessionData` {Buffer}

The event listener should perform a lookup in external storage for the
`sessionData` saved by the `'newSession'` event handler using the given
`sessionId`. If found, call `callback(null, sessionData)` to resume the session.
If not found, the session cannot be resumed. `callback()` must be called
without `sessionData` so that the handshake can continue and a new session can
be created. It is possible to call `callback(err)` to terminate the incoming
connection and destroy the socket.

Listening for this event will have an effect only on connections established
after the addition of the event listener.

The following illustrates resuming a TLS session:

```js
const tlsSessionStore = {};
server.on('newSession', (id, data, cb) => {
  tlsSessionStore[id.toString('hex')] = data;
  cb();
});
server.on('resumeSession', (id, cb) => {
  cb(null, tlsSessionStore[id.toString('hex')] || null);
});
```

### Event: `'secureConnection'`

The `'secureConnection'` event is emitted after the handshaking process for a
new connection has successfully completed. The listener callback is passed a
single argument when called:

* `tlsSocket` {tls.TLSSocket} The established TLS socket.

The `tlsSocket.authorized` property is a `boolean` indicating whether the
client has been verified by one of the supplied Certificate Authorities for the
server. If `tlsSocket.authorized` is `false`, then `socket.authorizationError`
is set to describe how authorization failed. Depending on the settings
of the TLS server, unauthorized connections may still be accepted.

The `tls.TLSSocket.servername` and `tls.TLSSocket.alpnProtocol`
properties can be used to check which server name was requested, and which
protocol was negotiated.

### Event: `'tlsClientError'`

The `'tlsClientError'` event is emitted when an error occurs before a secure
connection is established. The listener callback is passed two arguments when
called:

* `exception` {Error} The `Error` object describing the error
* `tlsSocket` {tls.TLSSocket} The `tls.TLSSocket` instance from which the
  error originated.

### `server.addContext(hostname, context)`

* `hostname` {string} A SNI host name or wildcard (e.g. `'*'`)
* `context` {Object|tls.SecureContext} An object containing any of the possible
  properties from the `tls.createSecureContext()` `options` arguments
  (e.g. `key`, `cert`, `ca`, etc), or a TLS context object created with
  `tls.createSecureContext()` itself.

The `server.addContext()` method adds a secure context that will be used if
the client request's SNI name matches the supplied `hostname` (or wildcard).

When there are multiple matching contexts, the most recently added one is
used.

### `server.address()`

* Returns: {Object}

Returns the bound address, the address family name, and port of the
server as reported by the operating system. See `net.Server.address()` for
more information.

### `server.close([callback])`

* `callback` {Function} A listener callback that will be registered to listen
  for the server instance's `'close'` event.
* Returns: {tls.Server}

The `server.close()` method stops the server from accepting new connections.

This function operates asynchronously. The `'close'` event will be emitted
when the server has no more open connections.

### `server.getTicketKeys()`

* Returns: {Buffer} A 48-byte buffer containing the session ticket keys.

Returns the session ticket keys.

See Session Resumption for more information.

### `server.listen()`

Starts the server listening for encrypted connections.
This method is identical to `server.listen()` from `net.Server`.

### `server.setSecureContext(options)`

* `options` {Object} An object containing any of the possible properties from
  the `tls.createSecureContext()` `options` arguments (e.g. `key`, `cert`,
  `ca`, etc).

The `server.setSecureContext()` method replaces the secure context of an
existing server. Existing connections to the server are not interrupted.

### `server.setTicketKeys(keys)`

* `keys` {Buffer|TypedArray|DataView} A 48-byte buffer containing the session
  ticket keys.

Sets the session ticket keys.

Changes to the ticket keys are effective only for future server connections.
Existing or currently pending server connections will use the previous keys.

See Session Resumption for more information.
