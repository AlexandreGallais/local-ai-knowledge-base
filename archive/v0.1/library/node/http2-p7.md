---
title: "HTTP/2 (part 7 of 15)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http2.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP/2 (part 7 of 15)

### Class: `Http2Server`

* Extends: {net.Server}

Instances of `Http2Server` are created using the `http2.createServer()`
function. The `Http2Server` class is not exported directly by the
`node:http2` module.

#### Event: `'checkContinue'`

* `request` {http2.Http2ServerRequest}
* `response` {http2.Http2ServerResponse}

If a `'request'` listener is registered or `http2.createServer()` is
supplied a callback function, the `'checkContinue'` event is emitted each time
a request with an HTTP `Expect: 100-continue` is received. If this event is
not listened for, the server will automatically respond with a status
`100 Continue` as appropriate.

Handling this event involves calling `response.writeContinue()` if the
client should continue to send the request body, or generating an appropriate
HTTP response (e.g. 400 Bad Request) if the client should not continue to send
the request body.

When this event is emitted and handled, the `'request'` event will
not be emitted.

#### Event: `'connection'`

* `socket` {stream.Duplex}

This event is emitted when a new TCP stream is established. `socket` is
typically an object of type `net.Socket`. Usually users will not want to
access this event.

This event can also be explicitly emitted by users to inject connections
into the HTTP server. In that case, any `Duplex` stream can be passed.

#### Event: `'request'`

* `request` {http2.Http2ServerRequest}
* `response` {http2.Http2ServerResponse}

Emitted each time there is a request. There may be multiple requests
per session. See the Compatibility API.

#### Event: `'session'`

* `session` {ServerHttp2Session}

The `'session'` event is emitted when a new `Http2Session` is created by the
`Http2Server`.

#### Event: `'sessionError'`

* `error` {Error}
* `session` {ServerHttp2Session}

The `'sessionError'` event is emitted when an `'error'` event is emitted by
an `Http2Session` object associated with the `Http2Server`.

#### Event: `'stream'`

* `stream` {Http2Stream} A reference to the stream
* `headers` {HTTP/2 Headers Object} An object describing the headers
* `flags` {number} The associated numeric flags
* `rawHeaders` {HTTP/2 Raw Headers} An array containing the raw headers

The `'stream'` event is emitted when a `'stream'` event has been emitted by
an `Http2Session` associated with the server.

See also `Http2Session`'s `'stream'` event.

```mjs
import { createServer, constants } from 'node:http2';
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
} = constants;

const server = createServer();
server.on('stream', (stream, headers, flags) => {
  const method = headers[HTTP2_HEADER_METHOD];
  const path = headers[HTTP2_HEADER_PATH];
  // ...
  stream.respond({
    [HTTP2_HEADER_STATUS]: 200,
    [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

```cjs
const http2 = require('node:http2');
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
} = http2.constants;

const server = http2.createServer();
server.on('stream', (stream, headers, flags) => {
  const method = headers[HTTP2_HEADER_METHOD];
  const path = headers[HTTP2_HEADER_PATH];
  // ...
  stream.respond({
    [HTTP2_HEADER_STATUS]: 200,
    [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

#### Event: `'timeout'`

The `'timeout'` event is emitted when there is no activity on the Server for
a given number of milliseconds set using `http2server.setTimeout()`.
**Default:** 0 (no timeout)

#### `server.close([callback])`

* `callback` {Function}

Stops the server from establishing new sessions and streams.

If `callback` is provided, it is not invoked until all active sessions have been
closed, although the server has already stopped allowing new sessions. See
`net.Server.close()` for more details.

#### `serverSymbol.asyncDispose`

Calls `server.close()` and returns a promise that fulfills when the
server has closed.

#### `server.setTimeout(msecs)`

* `msecs` {number} **Default:** 0 (no timeout)
* `callback` {Function}
* Returns: {Http2Server}

Used to set the timeout value for http2 server requests,
and sets a callback function that is called when there is no activity
on the `Http2Server` after `msecs` milliseconds.

The given callback is registered as a listener on the `'timeout'` event.

In case if `callback` is not a function, a new `ERR_INVALID_ARG_TYPE`
error will be thrown.

#### `server.timeout`

* Type: {number} Timeout in milliseconds. **Default:** 0 (no timeout)

The number of milliseconds of inactivity before a socket is presumed
to have timed out.

A value of `0` will disable the timeout behavior on incoming connections.

The socket timeout logic is set up on connection, so changing this
value only affects new connections to the server, not any existing connections.

#### `server.updateSettings([settings])`

* `settings` {HTTP/2 Settings Object}

Used to update the server with the provided settings.

Throws `ERR_HTTP2_INVALID_SETTING_VALUE` for invalid `settings` values.

Throws `ERR_INVALID_ARG_TYPE` for invalid `settings` argument.

### Class: `Http2SecureServer`

* Extends: {tls.Server}

Instances of `Http2SecureServer` are created using the
`http2.createSecureServer()` function. The `Http2SecureServer` class is not
exported directly by the `node:http2` module.

#### Event: `'checkContinue'`

* `request` {http2.Http2ServerRequest}
* `response` {http2.Http2ServerResponse}

If a `'request'` listener is registered or `http2.createSecureServer()`
is supplied a callback function, the `'checkContinue'` event is emitted each
time a request with an HTTP `Expect: 100-continue` is received. If this event
is not listened for, the server will automatically respond with a status
`100 Continue` as appropriate.

Handling this event involves calling `response.writeContinue()` if the
client should continue to send the request body, or generating an appropriate
HTTP response (e.g. 400 Bad Request) if the client should not continue to send
the request body.

When this event is emitted and handled, the `'request'` event will
not be emitted.

#### Event: `'connection'`

* `socket` {stream.Duplex}

This event is emitted when a new TCP stream is established, before the TLS
handshake begins. `socket` is typically an object of type `net.Socket`.
Usually users will not want to access this event.

This event can also be explicitly emitted by users to inject connections
into the HTTP server. In that case, any `Duplex` stream can be passed.

#### Event: `'request'`

* `request` {http2.Http2ServerRequest}
* `response` {http2.Http2ServerResponse}

Emitted each time there is a request. There may be multiple requests
per session. See the Compatibility API.

#### Event: `'session'`

* `session` {ServerHttp2Session}

The `'session'` event is emitted when a new `Http2Session` is created by the
`Http2SecureServer`.

#### Event: `'sessionError'`

* `error` {Error}
* `session` {ServerHttp2Session}

The `'sessionError'` event is emitted when an `'error'` event is emitted by
an `Http2Session` object associated with the `Http2SecureServer`.

#### Event: `'stream'`

* `stream` {Http2Stream} A reference to the stream
* `headers` {HTTP/2 Headers Object} An object describing the headers
* `flags` {number} The associated numeric flags
* `rawHeaders` {HTTP/2 Raw Headers} An array containing the raw headers

The `'stream'` event is emitted when a `'stream'` event has been emitted by
an `Http2Session` associated with the server.

See also `Http2Session`'s `'stream'` event.

```mjs
import { createSecureServer, constants } from 'node:http2';
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
} = constants;

const options = getOptionsSomehow();

const server = createSecureServer(options);
server.on('stream', (stream, headers, flags) => {
  const method = headers[HTTP2_HEADER_METHOD];
  const path = headers[HTTP2_HEADER_PATH];
  // ...
  stream.respond({
    [HTTP2_HEADER_STATUS]: 200,
    [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

```cjs
const http2 = require('node:http2');
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
} = http2.constants;

const options = getOptionsSomehow();

const server = http2.createSecureServer(options);
server.on('stream', (stream, headers, flags) => {
  const method = headers[HTTP2_HEADER_METHOD];
  const path = headers[HTTP2_HEADER_PATH];
  // ...
  stream.respond({
    [HTTP2_HEADER_STATUS]: 200,
    [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

#### Event: `'timeout'`

The `'timeout'` event is emitted when there is no activity on the Server for
a given number of milliseconds set using `http2secureServer.setTimeout()`.
**Default:** 0 (no timeout)

#### Event: `'unknownProtocol'`

* `socket` {stream.Duplex}

The `'unknownProtocol'` event is emitted when a connecting client fails to
negotiate an allowed protocol (i.e. HTTP/2 or HTTP/1.1). The event handler
receives the socket for handling. If no listener is registered for this event,
the connection is terminated. A timeout may be specified using the
`'unknownProtocolTimeout'` option passed to `http2.createSecureServer()`.

In earlier versions of Node.js, this event would be emitted if `allowHTTP1` is
`false` and, during the TLS handshake, the client either does not send an ALPN
extension or sends an ALPN extension that does not include HTTP/2 (`h2`). Newer
versions of Node.js only emit this event if `allowHTTP1` is `false` and the
client does not send an ALPN extension. If the client sends an ALPN extension
that does not include HTTP/2 (or HTTP/1.1 if `allowHTTP1` is `true`), the TLS
handshake will fail and no secure connection will be established.

See the Compatibility API.

#### `server.close([callback])`

* `callback` {Function}

Stops the server from establishing new sessions and streams.

If `callback` is provided, it is not invoked until all active sessions have been
closed, although the server has already stopped allowing new sessions. See
`tls.Server.close()` for more details.

#### `server.setTimeout(msecs)`

* `msecs` {number} **Default:** `120000` (2 minutes)
* `callback` {Function}
* Returns: {Http2SecureServer}

Used to set the timeout value for http2 secure server requests,
and sets a callback function that is called when there is no activity
on the `Http2SecureServer` after `msecs` milliseconds.

The given callback is registered as a listener on the `'timeout'` event.

In case if `callback` is not a function, a new `ERR_INVALID_ARG_TYPE`
error will be thrown.

#### `server.timeout`

* Type: {number} Timeout in milliseconds. **Default:** 0 (no timeout)

The number of milliseconds of inactivity before a socket is presumed
to have timed out.

A value of `0` will disable the timeout behavior on incoming connections.

The socket timeout logic is set up on connection, so changing this
value only affects new connections to the server, not any existing connections.

#### `server.updateSettings([settings])`

* `settings` {HTTP/2 Settings Object}

Used to update the server with the provided settings.

Throws `ERR_HTTP2_INVALID_SETTING_VALUE` for invalid `settings` values.

Throws `ERR_INVALID_ARG_TYPE` for invalid `settings` argument.
