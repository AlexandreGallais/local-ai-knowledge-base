---
title: "HTTP (part 7 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 7 of 12)

### `response.writeHead(statusCode, statusMessage)`

* `statusCode` {number}
* `statusMessage` {string}
* `headers` {Object|Array}
* Returns: {http.ServerResponse}

Sends a response header to the request. The status code is a 3-digit HTTP
status code, like `404`. The last argument, `headers`, are the response headers.
Optionally one can give a human-readable `statusMessage` as the second
argument.

`headers` may be an `Array` where the keys and values are in the same list.
It is _not_ a list of tuples. So, the even-numbered offsets are key <example-value>,
and the odd-numbered offsets are the associated values. The array is in the same
format as `request.rawHeaders`.

Returns a reference to the `ServerResponse`, so that calls can be chained.

```js
const body = 'hello world';
response
  .writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain',
  })
  .end(body);
```

This method must only be called once on a message and it must
be called before `response.end()` is called.

If `response.write()` or `response.end()` are called before calling
this, the implicit/mutable headers will be calculated and call this function.

When headers have been set with `response.setHeader()`, they will be merged
with any headers passed to `response.writeHead()`, with the headers passed
to `response.writeHead()` given precedence.

If this method is called and `response.setHeader()` has not been called,
it will directly write the supplied header values onto the network channel
without caching internally, and the `response.getHeader()` on the header
will not yield the expected result. If progressive population of headers is
desired with potential future retrieval and modification, use
`response.setHeader()` instead.

```js
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

`Content-Length` is read in bytes, not characters. Use
`Buffer.byteLength()` to determine the length of the body in bytes. Node.js
will check whether `Content-Length` and the length of the body which has
been transmitted are equal or not.

Attempting to set a header field name or value that contains invalid characters
will result in a `TypeError` being thrown.

### `response.writeInformation(statusCode, headers)`

* `statusCode` {number} An HTTP 1xx informational status code, between `100`
  and `199` inclusive, excluding `101` (Switching Protocols) which is only
  available through the `'upgrade'` event.
* `headers` {Object|Array} An optional set of headers to send with the
  informational response. Accepts the same shapes as
  `response.writeHead()`.
* `callback` {Function} Optional, called once the message has been written
  to the socket.

Sends an arbitrary HTTP/1.1 1xx informational response to the client. This
is a generic equivalent of `response.writeContinue()`,
`response.writeProcessing()` and `response.writeEarlyHints()`, and
can be called multiple times before the final response. After the final
response headers have been sent (via `response.writeHead()` or an
implicit header), calling this method throws `ERR_HTTP_HEADERS_SENT`.

Clients receive these responses via the `'information'`
event on `http.ClientRequest`.

```js
response.writeInformation(110, { 'X-Progress': '50%' });
```

### `response.writeProcessing()`

Sends an HTTP/1.1 102 Processing message to the client, indicating that
the request body should be sent.

## Class: `http.IncomingMessage`

* Extends: {stream.Readable}

An `IncomingMessage` object is created by `http.Server` or
`http.ClientRequest` and passed as the first argument to the `'request'`
and `'response'` event respectively. It may be used to access response
status, headers, and data.

Different from its `socket` value which is a subclass of {stream.Duplex}, the
`IncomingMessage` itself extends {stream.Readable} and is created separately to
parse and emit the incoming HTTP headers and payload, as the underlying socket
may be reused multiple times in case of keep-alive.

### Event: `'aborted'`

> Stability: 0 - Deprecated. Listen for `'close'` event instead.

Emitted when the request has been aborted.

### Event: `'close'`

Emitted when the request has been completed.

### `message.aborted`

> Stability: 0 - Deprecated. Check `message.destroyed` from {stream.Readable}.

* Type: {boolean}

The `message.aborted` property will be `true` if the request has
been aborted.

### `message.complete`

* Type: {boolean}

The `message.complete` property will be `true` if a complete HTTP message has
been received and successfully parsed.

This property is particularly useful as a means of determining if a client or
server fully transmitted a message before a connection was terminated:

```js
const req = http.request({
  host: '127.0.0.1',
  port: 8080,
  method: 'POST',
}, (res) => {
  res.resume();
  res.on('end', () => {
    if (!res.complete)
      console.error(
        'The connection was terminated while the message was still being sent');
  });
});
```

### `message.connection`

> Stability: 0 - Deprecated. Use `message.socket`.

Alias for `message.socket`.

### `message.destroy([error])`

* `error` {Error}
* Returns: {this}

Calls `destroy()` on the socket that received the `IncomingMessage`. If `error`
is provided, an `'error'` event is emitted on the socket and `error` is passed
as an argument to any listeners on the event.

### `message.headers`

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

Duplicates in raw headers are handled in the following ways, depending on the
header name:

* Duplicates of `age`, `authorization`, `content-length`, `content-type`,
  `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`,
  `last-modified`, `location`, `max-forwards`, `proxy-authorization`, `referer`,
  `retry-after`, `server`, or `user-agent` are discarded.
  To allow duplicate values of the headers listed above to be joined,
  use the option `joinDuplicateHeaders` in `http.request()`
  and `http.createServer()`. See RFC 9110 Section 5.3 for more
  information.
* `set-cookie` is always an array. Duplicates are added to the array.
* For duplicate `cookie` headers, the values are joined together with `; `.
* For all other headers, the values are joined together with `, `.

### `message.headersDistinct`

* Type: {Object}

Similar to `message.headers`, but there is no join logic and the values are
always arrays of strings, even for headers received just once.

```js
// Prints something like:
//
// { 'user-agent': ['curl/7.22.0'],
//   host: ['127.0.0.1:8000'],
//   accept: ['*/*'] }
console.log(request.headersDistinct);
```

### `message.httpVersion`

* Type: {string}

In case of server request, the HTTP version sent by the client. In the case of
client response, the HTTP version of the connected-to server.
Probably either `'1.1'` or `'1.0'`.

Also `message.httpVersionMajor` is the first integer and
`message.httpVersionMinor` is the second.

### `message.method`

* Type: {string}

**Only valid for request obtained from `http.Server`.**

The request method as a string. Read only. Examples: `'GET'`, `'DELETE'`.

### `message.rawHeaders`

* Type: {string\[]}

The raw request/response headers list exactly as they were received.

The keys and values are in the same list. It is _not_ a
list of tuples. So, the even-numbered offsets are key <example-value>, and the
odd-numbered offsets are the associated values.

Header names are not lowercased, and duplicates are not merged.

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

### `message.rawTrailers`

* Type: {string\[]}

The raw request/response trailer keys and values exactly as they were
received. Only populated at the `'end'` event.

### `message.setTimeout(msecs[, callback])`

* `msecs` {number}
* `callback` {Function}
* Returns: {http.IncomingMessage}

Calls `message.socket.setTimeout(msecs, callback)`.

### `message.signal`

* Type: {AbortSignal}

An {AbortSignal} that is aborted when the message is destroyed before
completion or when its underlying socket closes before request handling or
response reading completes.
The signal is created lazily on first access — no {AbortController} is allocated
for requests that never use this property.

This is useful for cancelling downstream asynchronous work such as database
queries or `fetch` calls when a client disconnects mid-request.

```mjs
import http from 'node:http';

http.createServer(async (req, res) => {
  try {
    const data = await fetch('https://example.com/api', { signal: req.signal });
    res.end(JSON.stringify(await data.json()));
  } catch (err) {
    if (err.name === 'AbortError') return;
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}).listen(3000);
```

```cjs
const http = require('node:http');

http.createServer(async (req, res) => {
  try {
    const data = await fetch('https://example.com/api', { signal: req.signal });
    res.end(JSON.stringify(await data.json()));
  } catch (err) {
    if (err.name === 'AbortError') return;
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}).listen(3000);
```

### `message.socket`

* Type: {stream.Duplex}

The `net.Socket` object associated with the connection.

With HTTPS support, use `request.socket.getPeerCertificate()` to obtain the
client's authentication details.

This property is guaranteed to be an instance of the {net.Socket} class,
a subclass of {stream.Duplex}, unless the user specified a socket
type other than {net.Socket} or internally nulled.

### `message.statusCode`

* Type: {number}

**Only valid for response obtained from `http.ClientRequest`.**

The 3-digit HTTP response status code. E.G. `404`.

### `message.statusMessage`

* Type: {string}

**Only valid for response obtained from `http.ClientRequest`.**

The HTTP response status message (reason phrase). E.G. `OK` or `Internal Server
Error`.

### `message.trailers`

* Type: {Object}

The request/response trailers object. Only populated at the `'end'` event.

### `message.trailersDistinct`

* Type: {Object}

Similar to `message.trailers`, but there is no join logic and the values are
always arrays of strings, even for headers received just once.
Only populated at the `'end'` event.

### `message.url`

* Type: {string}

**Only valid for request obtained from `http.Server`.**

Request URL string. This contains only the URL that is present in the actual
HTTP request. Take the following request:

```http
GET /status?name=ryan HTTP/1.1
Accept: text/plain
```

To parse the URL into its parts:

```js
new URL(`http://${process.env.HOST ?? 'localhost'}${request.url}`);
```

When `request.url` is `'/status?name=ryan'` and `process.env.HOST` is undefined:

```console
$ node
> new URL(`http://${process.env.HOST ?? 'localhost'}${request.url}`);
URL {
  href: 'http://localhost/status?name=ryan',
  origin: 'http://localhost',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost',
  hostname: 'localhost',
  port: '',
  pathname: '/status',
  search: '?name=ryan',
  searchParams: URLSearchParams { 'name' => 'ryan' },
  hash: ''
}
```

Ensure that you set `process.env.HOST` to the server's host name, or consider
replacing this part entirely. If using `req.headers.host`, ensure proper
validation is used, as clients may specify a custom `Host` header.
