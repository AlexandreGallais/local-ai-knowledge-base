---
title: "HTTP/2 (part 13 of 15)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http2.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP/2 (part 13 of 15)

## Compatibility API

The Compatibility API has the goal of providing a similar developer experience
of HTTP/1 when using HTTP/2, making it possible to develop applications
that support both HTTP/1 and HTTP/2. This API targets only the
**public API** of the HTTP/1. However many modules use internal
methods or state, and those _are not supported_ as it is a completely
different implementation.

The following example creates an HTTP/2 server using the compatibility
API:

```mjs
import { createServer } from 'node:http2';
const server = createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Foo': 'bar',
  });
  res.end('ok');
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Foo': 'bar',
  });
  res.end('ok');
});
```

In order to create a mixed HTTPS and HTTP/2 server, refer to the
ALPN negotiation section.
Upgrading from non-tls HTTP/1 servers is not supported.

The HTTP/2 compatibility API is composed of `Http2ServerRequest` and
`Http2ServerResponse`. They aim at API compatibility with HTTP/1, but
they do not hide the differences between the protocols. As an example,
the status message for HTTP codes is ignored.

### ALPN negotiation

ALPN negotiation allows supporting both HTTPS and HTTP/2 over
the same socket. The `req` and `res` objects can be either HTTP/1 or
HTTP/2, and an application **must** restrict itself to the public API of
HTTP/1, and detect if it is possible to use the more advanced
features of HTTP/2.

The following example creates a server that supports both protocols:

```mjs
import { createSecureServer } from 'node:http2';
import { readFileSync } from 'node:fs';

const cert = readFileSync('./cert.pem');
const key = readFileSync('./key.pem');

const server = createSecureServer(
  { cert, key, allowHTTP1: true },
  onRequest,
).listen(8000);

function onRequest(req, res) {
  // Detects if it is an HTTPS request or HTTP/2
  const { socket: { alpnProtocol } } = req.httpVersion === '2.0' ?
    req.stream.session : req;
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({
    alpnProtocol,
    httpVersion: req.httpVersion,
  }));
}
```

```cjs
const { createSecureServer } = require('node:http2');
const { readFileSync } = require('node:fs');

const cert = readFileSync('./cert.pem');
const key = readFileSync('./key.pem');

const server = createSecureServer(
  { cert, key, allowHTTP1: true },
  onRequest,
).listen(4443);

function onRequest(req, res) {
  // Detects if it is an HTTPS request or HTTP/2
  const { socket: { alpnProtocol } } = req.httpVersion === '2.0' ?
    req.stream.session : req;
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({
    alpnProtocol,
    httpVersion: req.httpVersion,
  }));
}
```

The `'request'` event works identically on both HTTPS and
HTTP/2.

### Class: `http2.Http2ServerRequest`

* Extends: {stream.Readable}

A `Http2ServerRequest` object is created by `http2.Server` or
`http2.SecureServer` and passed as the first argument to the
`'request'` event. It may be used to access a request status, headers, and
data.

#### Event: `'aborted'`

The `'aborted'` event is emitted whenever a `Http2ServerRequest` instance is
abnormally aborted in mid-communication.

The `'aborted'` event will only be emitted if the `Http2ServerRequest` writable
side has not been ended.

#### Event: `'close'`

Indicates that the underlying `Http2Stream` was closed.
Just like `'end'`, this event occurs only once per response.

#### `request.aborted`

* Type: {boolean}

The `request.aborted` property will be `true` if the request has
been aborted.

#### `request.authority`

* Type: {string}

The request authority pseudo header field. Because HTTP/2 allows requests
to set either `:authority` or `host`, this value is derived from
`req.headers[':authority']` if present. Otherwise, it is derived from
`req.headers['host']`.

#### `request.complete`

* Type: {boolean}

The `request.complete` property will be `true` if the request has
been completed, aborted, or destroyed.

#### `request.connection`

> Stability: 0 - Deprecated. Use `request.socket`.

* Type: {net.Socket|tls.TLSSocket}

See `request.socket`.

#### `request.destroy([error])`

* `error` {Error}

Calls `destroy()` on the `Http2Stream` that received
the `Http2ServerRequest`. If `error` is provided, an `'error'` event
is emitted and `error` is passed as an argument to any listeners on the event.

It does nothing if the stream was already destroyed.

#### `request.headers`

* Type: {Object}

The request/response headers object.

Key-value pairs of header names and values. Header names are lower-cased.

```js
// Prints something like:
//
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*/*' }
console.log(request.headers);
```

See HTTP/2 Headers Object.

In HTTP/2, the request path, host name, protocol, and method are represented as
special headers prefixed with the `:` character (e.g. `':path'`). These special
headers will be included in the `request.headers` object. Care must be taken not
to inadvertently modify these special headers or errors may occur. For instance,
removing all headers from the request will cause errors to occur:

```js
removeAllHeaders(request.headers);
assert(request.url);   // Fails because the :path header has been removed
```

#### `request.httpVersion`

* Type: {string}

In case of server request, the HTTP version sent by the client. In the case of
client response, the HTTP version of the connected-to server. Returns
`'2.0'`.

Also `message.httpVersionMajor` is the first integer and
`message.httpVersionMinor` is the second.

#### `request.method`

* Type: {string}

The request method as a string. Read-only. Examples: `'GET'`, `'DELETE'`.

#### `request.rawHeaders`

* Type: {HTTP/2 Raw Headers}

The raw request/response headers list exactly as they were received.

```js
// Prints something like:
//
// [ 'user-agent',
//   'this is invalid because there can be only one',
//   'User-Agent',
//   'curl/7.22.0',
//   'Host',
//   '127.0.0.1:8000',
//   'ACCEPT',
//   '*/*' ]
console.log(request.rawHeaders);
```

#### `request.rawTrailers`

* Type: {string\[]}

The raw request/response trailer keys and values exactly as they were
received. Only populated at the `'end'` event.

#### `request.scheme`

* Type: {string}

The request scheme pseudo header field indicating the scheme
portion of the target URL.

#### `request.setTimeout(msecs, callback)`

* `msecs` {number}
* `callback` {Function}
* Returns: {http2.Http2ServerRequest}

Sets the `Http2Stream`'s timeout value to `msecs`. If a callback is
provided, then it is added as a listener on the `'timeout'` event on
the response object.

If no `'timeout'` listener is added to the request, the response, or
the server, then `Http2Stream`s are destroyed when they time out. If a
handler is assigned to the request, the response, or the server's `'timeout'`
events, timed out sockets must be handled explicitly.

#### `request.socket`

* Type: {net.Socket|tls.TLSSocket}

Returns a `Proxy` object that acts as a `net.Socket` (or `tls.TLSSocket`) but
applies getters, setters, and methods based on HTTP/2 logic.

`destroyed`, `readable`, and `writable` properties will be retrieved from and
set on `request.stream`.

`destroy`, `emit`, `end`, `on` and `once` methods will be called on
`request.stream`.

`setTimeout` method will be called on `request.stream.session`.

`pause`, `read`, `resume`, and `write` will throw an error with code
`ERR_HTTP2_NO_SOCKET_MANIPULATION`. See `Http2Session` and Sockets for
more information.

All other interactions will be routed directly to the socket. With TLS support,
use `request.socket.getPeerCertificate()` to obtain the client's
authentication details.

#### `request.stream`

* Type: {Http2Stream}

The `Http2Stream` object backing the request.

#### `request.trailers`

* Type: {Object}

The request/response trailers object. Only populated at the `'end'` event.

#### `request.url`

* Type: {string}

Request URL string. This contains only the URL that is present in the actual
HTTP request. If the request is:

```http
GET /status?name=ryan HTTP/1.1
Accept: text/plain
```

Then `request.url` will be:

```json
"/status?name=ryan"
```

To parse the url into its parts, `new URL()` can be used:

```console
$ node
> new URL('/status?name=ryan', 'http://example.com')
URL {
  href: 'http://example.com/status?name=ryan',
  origin: 'http://example.com',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'example.com',
  hostname: 'example.com',
  port: '',
  pathname: '/status',
  search: '?name=ryan',
  searchParams: URLSearchParams { 'name' => 'ryan' },
  hash: ''
}
```
