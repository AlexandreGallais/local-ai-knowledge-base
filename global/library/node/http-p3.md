---
title: "HTTP (part 3 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 3 of 12)

### `request.getRawHeaderNames()`

* Returns: {string\[]}

Returns an array containing the unique names of the current outgoing raw
headers. Header names are returned with their exact casing being set.

```js
request.setHeader('Foo', 'bar');
request.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headerNames = request.getRawHeaderNames();
// headerNames === ['Foo', 'Set-Cookie']
```

### `request.hasHeader(name)`

* `name` {string}
* Returns: {boolean}

Returns `true` if the header identified by `name` is currently set in the
outgoing headers. The header name matching is case-insensitive.

```js
const hasContentType = request.hasHeader('content-type');
```

### `request.maxHeadersCount`

* Type: {number} **Default:** `1000`

Limits maximum response headers count. If set to 0, no limit will be applied.

### `request.path`

* Type: {string} The request path.

### `request.method`

* Type: {string} The request method.

### `request.host`

* Type: {string} The request host.

### `request.protocol`

* Type: {string} The request protocol.

### `request.removeHeader(name)`

* `name` {string}

Removes a header that's already defined into headers object.

```js
request.removeHeader('Content-Type');
```

### `request.reusedSocket`

* Type: {boolean} Whether the request is sent through a reused socket.

When sending a request through a keep-alive-enabled agent, the underlying socket
might be reused. If the server closes the connection at the same time that the
agent reuses it, the request may encounter an `ECONNRESET` error.

The following example sends requests near the server's keep-alive timeout to
make this race easier to reproduce. It sets
`server.keepAliveTimeoutBuffer` to `0` so the internal socket timeout
matches `server.keepAliveTimeout`.

```mjs
import http from 'node:http';
const agent = new http.Agent({ keepAlive: true });
const server = http.createServer(
  { keepAliveTimeout: 3000, keepAliveTimeoutBuffer: 0 },
  (req, res) => {
    res.write('hello\n');
    res.end();
  },
);
server.listen(3000);

setInterval(() => {
  http.get('http://localhost:3000', { agent }, (res) => {
    res.resume();
  });
}, 3000);
```

```cjs
const http = require('node:http');
const agent = new http.Agent({ keepAlive: true });
const server = http.createServer(
  { keepAliveTimeout: 3000, keepAliveTimeoutBuffer: 0 },
  (req, res) => {
    res.write('hello\n');
    res.end();
  },
);
server.listen(3000);

setInterval(() => {
  http.get('http://localhost:3000', { agent }, (res) => {
    res.resume();
  });
}, 3000);
```

By checking `request.reusedSocket`, an application can retry idempotent requests
that fail because a reused connection was reset.

```mjs
import http from 'node:http';
const agent = new http.Agent({ keepAlive: true });

function retriableRequest() {
  const req = http
    .get('http://localhost:3000', { agent }, (res) => {
      // ...
    })
    .on('error', (err) => {
      // Check if retry is needed
      if (req.reusedSocket && err.code === 'ECONNRESET') {
        retriableRequest();
      }
    });
}

retriableRequest();
```

```cjs
const http = require('node:http');
const agent = new http.Agent({ keepAlive: true });

function retriableRequest() {
  const req = http
    .get('http://localhost:3000', { agent }, (res) => {
      // ...
    })
    .on('error', (err) => {
      // Check if retry is needed
      if (req.reusedSocket && err.code === 'ECONNRESET') {
        retriableRequest();
      }
    });
}

retriableRequest();
```

### `request.setHeader(name, value)`

* `name` {string}
* `value` {any}

Sets a single header value for headers object. If this header already exists in
the to-be-sent headers, its value will be replaced. Use an array of strings
here to send multiple headers with the same name. Non-string values will be
stored without modification. Therefore, `request.getHeader()` may return
non-string values. However, the non-string values will be converted to strings
for network transmission.

```js
request.setHeader('Content-Type', 'application/json');
```

or

```js
request.setHeader('Cookie', ['type=ninja', 'language=javascript']);
```

When the value is a string an exception will be thrown if it contains
characters outside the `latin1` encoding.

If you need to pass UTF-8 characters in the value please encode the value
using the RFC 8187 standard.

```js
const filename = 'Rock 🎵.txt';
request.setHeader('Content-Disposition', `attachment; filename*=utf-8''${encodeURIComponent(filename)}`);
```

### `request.setNoDelay([noDelay])`

* `noDelay` {boolean}

Once a socket is assigned to this request and is connected
`socket.setNoDelay()` will be called.

### `request.setSocketKeepAlive(enable)`

* `enable` {boolean}
* `initialDelay` {number}

Once a socket is assigned to this request and is connected
`socket.setKeepAlive()` will be called.

### `request.setTimeout(timeout[, callback])`

* `timeout` {number} Milliseconds before a request times out.
* `callback` {Function} Optional function to be called when a timeout occurs.
  Same as binding to the `'timeout'` event.
* Returns: {http.ClientRequest}

Once a socket is assigned to this request and is connected
`socket.setTimeout()` will be called.

### `request.socket`

* Type: {stream.Duplex}

Reference to the underlying socket. Usually users will not want to access
this property. In particular, the socket will not emit `'readable'` events
because of how the protocol parser attaches to the socket.

```mjs
import http from 'node:http';
const options = {
  host: 'www.google.com',
};
const req = http.get(options);
req.end();
req.once('response', (res) => {
  const ip = req.socket.localAddress;
  const port = req.socket.localPort;
  console.log(`Your IP address is ${ip} and your source port is ${port}.`);
  // Consume response object
});
```

```cjs
const http = require('node:http');
const options = {
  host: 'www.google.com',
};
const req = http.get(options);
req.end();
req.once('response', (res) => {
  const ip = req.socket.localAddress;
  const port = req.socket.localPort;
  console.log(`Your IP address is ${ip} and your source port is ${port}.`);
  // Consume response object
});
```

This property is guaranteed to be an instance of the {net.Socket} class,
a subclass of {stream.Duplex}, unless the user specified a socket
type other than {net.Socket}.

### `request.uncork()`

See `writable.uncork()`.

### `request.writableEnded`

* Type: {boolean}

Is `true` after `request.end()` has been called. This property
does not indicate whether the data has been flushed, for this use
`request.writableFinished` instead.

### `request.writableFinished`

* Type: {boolean}

Is `true` if all data has been flushed to the underlying system, immediately
before the `'finish'` event is emitted.

### `request.write(chunk, encoding)`

* `chunk` {string|Buffer|Uint8Array}
* `encoding` {string}
* `callback` {Function}
* Returns: {boolean}

Sends a chunk of the body. This method can be called multiple times. If no
`Content-Length` is set, data will automatically be encoded in HTTP Chunked
transfer encoding, so that server knows when the data ends. The
`Transfer-Encoding: chunked` header is added. Calling `request.end()`
is necessary to finish sending the request.

The `encoding` argument is optional and only applies when `chunk` is a string.
Defaults to `'utf8'`.

The `callback` argument is optional and will be called when this chunk of data
is flushed, but only if the chunk is non-empty.

Returns `true` if the entire data was flushed successfully to the kernel
buffer. Returns `false` if all or part of the data was queued in user memory.
`'drain'` will be emitted when the buffer is free again.

When `write` function is called with empty string or buffer, it does
nothing and waits for more input.
