---
title: "HTTP (part 2 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 2 of 12)

## Class: `http.ClientRequest`

* Extends: {http.OutgoingMessage}

This object is created internally and returned from `http.request()`. It
represents an _in-progress_ request whose header has already been queued. The
header is still mutable using the `setHeader(name, value)`,
`getHeader(name)`, `removeHeader(name)` API. The actual header will
be sent along with the first data chunk or when calling `request.end()`.

To get the response, add a listener for `'response'` to the request object.
`'response'` will be emitted from the request object when the response
headers have been received. The `'response'` event is executed with one
argument which is an instance of `http.IncomingMessage`.

During the `'response'` event, one can add listeners to the
response object; particularly to listen for the `'data'` event.

If no `'response'` handler is added, then the response will be
entirely discarded. However, if a `'response'` event handler is added,
then the data from the response object **must** be consumed, either by
calling `response.read()` whenever there is a `'readable'` event, or
by adding a `'data'` handler, or by calling the `.resume()` method.
Until the data is consumed, the `'end'` event will not fire. Also, until
the data is read it will consume memory that can eventually lead to a
'process out of memory' error.

For backward compatibility, `res` will only emit `'error'` if there is an
`'error'` listener registered.

Set `Content-Length` header to limit the response body size.
If `response.strictContentLength` is set to `true`, mismatching the
`Content-Length` header value will result in an `Error` being thrown,
identified by `code:` `'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`.

`Content-Length` value should be in bytes, not characters. Use
`Buffer.byteLength()` to determine the length of the body in bytes.

### Event: `'abort'`

> Stability: 0 - Deprecated. Listen for the `'close'` event instead.

Emitted when the request has been aborted by the client. This event is only
emitted on the first call to `abort()`.

### Event: `'close'`

Indicates that the request is completed, or its underlying connection was
terminated prematurely (before the response completion).

### Event: `'connect'`

* `response` {http.IncomingMessage}
* `socket` {stream.Duplex}
* `head` {Buffer}

Emitted each time a server responds to a request with a `CONNECT` method. If
this event is not being listened for, clients receiving a `CONNECT` method will
have their connections closed.

This event is guaranteed to be passed an instance of the {net.Socket} class,
a subclass of {stream.Duplex}, unless the user specifies a socket
type other than {net.Socket}.

A client and server pair demonstrating how to listen for the `'connect'` event:

```mjs
import { createServer, request } from 'node:http';
import { connect } from 'node:net';
import { URL } from 'node:url';

// Create an HTTP tunneling proxy
const proxy = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, clientSocket, head) => {
  // Connect to an origin server
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = connect(port || 80, hostname, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// Now that proxy is running
proxy.listen(1337, '127.0.0.1', () => {

  // Make a request to a tunneling proxy
  const options = {
    port: 1337,
    host: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.google.com:80',
  };

  const req = request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('got connected!');

    // Make a request over an HTTP tunnel
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.google.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});
```

```cjs
const http = require('node:http');
const net = require('node:net');
const { URL } = require('node:url');

// Create an HTTP tunneling proxy
const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, clientSocket, head) => {
  // Connect to an origin server
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = net.connect(port || 80, hostname, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// Now that proxy is running
proxy.listen(1337, '127.0.0.1', () => {

  // Make a request to a tunneling proxy
  const options = {
    port: 1337,
    host: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.google.com:80',
  };

  const req = http.request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('got connected!');

    // Make a request over an HTTP tunnel
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.google.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});
```

### Event: `'continue'`

Emitted when the server sends a '100 Continue' HTTP response, usually because
the request contained 'Expect: 100-continue'. This is an instruction that
the client should send the request body.

### Event: `'finish'`

Emitted when the request has been sent. More specifically, this event is emitted
when the last segment of the request headers and body have been handed off to
the operating system for transmission over the network. It does not imply that
the server has received anything yet.

### Event: `'information'`

* `info` {Object}
  * `httpVersion` {string}
  * `httpVersionMajor` {integer}
  * `httpVersionMinor` {integer}
  * `statusCode` {integer}
  * `statusMessage` {string}
  * `headers` {Object}
  * `rawHeaders` {string\[]}

Emitted when the server sends a 1xx intermediate response (excluding 101
Upgrade). The listeners of this event will receive an object containing the
HTTP version, status code, status message, key-value headers object,
and array with the raw header names followed by their respective values.

```mjs
import { request } from 'node:http';

const options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/length_request',
};

// Make a request
const req = request(options);
req.end();

req.on('information', (info) => {
  console.log(`Got information prior to main response: ${info.statusCode}`);
});
```

```cjs
const http = require('node:http');

const options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/length_request',
};

// Make a request
const req = http.request(options);
req.end();

req.on('information', (info) => {
  console.log(`Got information prior to main response: ${info.statusCode}`);
});
```

101 Upgrade statuses do not fire this event due to their break from the
traditional HTTP request/response chain, such as web sockets, in-place TLS
upgrades, or HTTP 2.0. To be notified of 101 Upgrade notices, listen for the
`'upgrade'` event instead.

### Event: `'response'`

* `response` {http.IncomingMessage}

Emitted when a response is received to this request. This event is emitted only
once.

### Event: `'socket'`

* `socket` {stream.Duplex}

This event is guaranteed to be passed an instance of the {net.Socket} class,
a subclass of {stream.Duplex}, unless the user specifies a socket
type other than {net.Socket}.

### Event: `'timeout'`

Emitted when the underlying socket times out from inactivity. This only notifies
that the socket has been idle. The request must be destroyed manually.

See also: `request.setTimeout()`.

### Event: `'upgrade'`

* `response` {http.IncomingMessage}
* `stream` {stream.Duplex}
* `head` {Buffer}

Emitted each time a server responds to a request with an upgrade. If this
event is not being listened for and the response status code is 101 Switching
Protocols, clients receiving an upgrade header will have their connections
closed.

This event is guaranteed to be passed an instance of the {net.Socket} class,
a subclass of {stream.Duplex}, unless the user specifies a socket
type other than {net.Socket}.

A client server pair demonstrating how to listen for the `'upgrade'` event.

```mjs
import http from 'node:http';
import process from 'node:process';

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
server.on('upgrade', (req, stream, head) => {
  stream.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  stream.pipe(stream); // echo back
});

// Now that server is running
server.listen(1337, '127.0.0.1', () => {

  // make a request
  const options = {
    port: 1337,
    host: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket',
    },
  };

  const req = http.request(options);
  req.end();

  req.on('upgrade', (res, stream, upgradeHead) => {
    console.log('got upgraded!');
    stream.end();
    process.exit(0);
  });
});
```

```cjs
const http = require('node:http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
server.on('upgrade', (req, stream, head) => {
  stream.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  stream.pipe(stream); // echo back
});

// Now that server is running
server.listen(1337, '127.0.0.1', () => {

  // make a request
  const options = {
    port: 1337,
    host: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket',
    },
  };

  const req = http.request(options);
  req.end();

  req.on('upgrade', (res, stream, upgradeHead) => {
    console.log('got upgraded!');
    stream.end();
    process.exit(0);
  });
});
```

### `request.abort()`

> Stability: 0 - Deprecated: Use `request.destroy()` instead.

Marks the request as aborting. Calling this will cause remaining data
in the response to be dropped and the socket to be destroyed.

### `request.aborted`

> Stability: 0 - Deprecated. Check `request.destroyed` instead.

* Type: {boolean}

The `request.aborted` property will be `true` if the request has
been aborted.

### `request.connection`

> Stability: 0 - Deprecated. Use `request.socket`.

* Type: {stream.Duplex}

See `request.socket`.

### `request.cork()`

See `writable.cork()`.

### `request.end(data[, encoding])`

* `data` {string|Buffer|Uint8Array}
* `encoding` {string}
* `callback` {Function}
* Returns: {this}

Finishes sending the request. If any parts of the body are
unsent, it will flush them to the stream. If the request is
chunked, this will send the terminating `'0\r\n\r\n'`.

If `data` is specified, it is equivalent to calling
`request.write(data, encoding)` followed by `request.end(callback)`.

If `callback` is specified, it will be called when the request stream
is finished.

### `request.destroy([error])`

* `error` {Error} Optional, an error to emit with `'error'` event.
* Returns: {this}

Destroy the request. Optionally emit an `'error'` event,
and emit a `'close'` event. Calling this will cause remaining data
in the response to be dropped, and the socket to be destroyed if used,
or returned to the corresponding Agent pool otherwise if possible.

See `writable.destroy()` for further details.

#### `request.destroyed`

* Type: {boolean}

Is `true` after `request.destroy()` has been called.

See `writable.destroyed` for further details.

### `request.finished`

> Stability: 0 - Deprecated. Use `request.writableEnded`.

* Type: {boolean}

The `request.finished` property will be `true` if `request.end()`
has been called. `request.end()` will automatically be called if the
request was initiated via `http.get()`.

### `request.flushHeaders()`

Flushes the request headers.

For efficiency reasons, Node.js normally buffers the request headers until
`request.end()` is called or the first chunk of request data is written. It
then tries to pack the request headers and data into a single TCP packet.

That's usually desired (it saves a TCP round-trip), but not when the first
data is not sent until possibly much later. `request.flushHeaders()` bypasses
the optimization and kickstarts the request.

### `request.getHeader(name)`

* `name` {string}
* Returns: {any}

Reads out a header on the request. The name is case-insensitive.
The type of the return value depends on the arguments provided to
`request.setHeader()`.

```js
request.setHeader('content-type', 'text/html');
request.setHeader('Content-Length', Buffer.byteLength(body));
request.setHeader('Cookie', ['type=ninja', 'language=javascript']);
const contentType = request.getHeader('Content-Type');
// 'contentType' is 'text/html'
const contentLength = request.getHeader('Content-Length');
// 'contentLength' is of type number
const cookie = request.getHeader('Cookie');
// 'cookie' is of type string[]
```

### `request.getHeaderNames()`

* Returns: {string\[]}

Returns an array containing the unique names of the current outgoing headers.
All header names are lowercase.

```js
request.setHeader('Foo', 'bar');
request.setHeader('Cookie', ['foo=bar', 'bar=baz']);

const headerNames = request.getHeaderNames();
// headerNames === ['foo', 'cookie']
```

### `request.getHeaders()`

* Returns: {Object}

Returns a shallow copy of the current outgoing headers. Since a shallow copy
is used, array values may be mutated without additional calls to various
header-related http module methods. The keys of the returned object are the
header names and the values are the respective header values. All header names
are lowercase.

The object returned by the `request.getHeaders()` method _does not_
prototypically inherit from the JavaScript `Object`. This means that typical
`Object` methods such as `obj.toString()`, `obj.hasOwnProperty()`, and others
are not defined and _will not work_.

```js
request.setHeader('Foo', 'bar');
request.setHeader('Cookie', ['foo=bar', 'bar=baz']);

const headers = request.getHeaders();
// headers === { foo: 'bar', 'cookie': ['foo=bar', 'bar=baz'] }
```
