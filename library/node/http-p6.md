---
title: "HTTP (part 6 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 6 of 12)

## Class: `http.ServerResponse`

* Extends: {http.OutgoingMessage}

This object is created internally by an HTTP server, not by the user. It is
passed as the second parameter to the `'request'` event.

### Event: `'close'`

Indicates that the response is completed, or its underlying connection was
terminated prematurely (before the response completion).

### Event: `'finish'`

Emitted when the response has been sent. More specifically, this event is
emitted when the last segment of the response headers and body have been
handed off to the operating system for transmission over the network. It
does not imply that the client has received anything yet.

### `response.addTrailers(headers)`

* `headers` {Object}

This method adds HTTP trailing headers (a header but at the end of the
message) to the response.

Trailers will **only** be emitted if chunked encoding is used for the
response; if it is not (e.g. if the request was HTTP/1.0), they will
be silently discarded.

HTTP requires the `Trailer` header to be sent in order to
emit trailers, with a list of the header fields in its value. E.g.,

```js
response.writeHead(200, { 'Content-Type': 'text/plain',
                          'Trailer': 'Content-MD5' });
response.write(fileData);
response.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
response.end();
```

Attempting to set a header field name or value that contains invalid characters
will result in a `TypeError` being thrown.

### `response.connection`

> Stability: 0 - Deprecated. Use `response.socket`.

* Type: {stream.Duplex}

See `response.socket`.

### `response.cork()`

See `writable.cork()`.

### `response.end(data[, encoding])`

* `data` {string|Buffer|Uint8Array}
* `encoding` {string}
* `callback` {Function}
* Returns: {this}

This method signals to the server that all of the response headers and body
have been sent; that server should consider this message complete.
The method, `response.end()`, MUST be called on each response.

If `data` is specified, it is similar in effect to calling
`response.write(data, encoding)` followed by `response.end(callback)`.

If `callback` is specified, it will be called when the response stream
is finished.

### `response.finished`

> Stability: 0 - Deprecated. Use `response.writableEnded`.

* Type: {boolean}

The `response.finished` property will be `true` if `response.end()`
has been called.

### `response.flushHeaders()`

Flushes the response headers. See also: `request.flushHeaders()`.

### `response.getHeader(name)`

* `name` {string}
* Returns: {number | string | string\[] | undefined}

Reads out a header that's already been queued but not sent to the client.
The name is case-insensitive. The type of the return value depends
on the arguments provided to `response.setHeader()`.

```js
response.setHeader('Content-Type', 'text/html');
response.setHeader('Content-Length', Buffer.byteLength(body));
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
const contentType = response.getHeader('content-type');
// contentType is 'text/html'
const contentLength = response.getHeader('Content-Length');
// contentLength is of type number
const setCookie = response.getHeader('set-cookie');
// setCookie is of type string[]
```

### `response.getHeaderNames()`

* Returns: {string\[]}

Returns an array containing the unique names of the current outgoing headers.
All header names are lowercase.

```js
response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headerNames = response.getHeaderNames();
// headerNames === ['foo', 'set-cookie']
```

### `response.getHeaders()`

* Returns: {Object}

Returns a shallow copy of the current outgoing headers. Since a shallow copy
is used, array values may be mutated without additional calls to various
header-related http module methods. The keys of the returned object are the
header names and the values are the respective header values. All header names
are lowercase.

The object returned by the `response.getHeaders()` method _does not_
prototypically inherit from the JavaScript `Object`. This means that typical
`Object` methods such as `obj.toString()`, `obj.hasOwnProperty()`, and others
are not defined and _will not work_.

```js
response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headers = response.getHeaders();
// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }
```

### `response.hasHeader(name)`

* `name` {string}
* Returns: {boolean}

Returns `true` if the header identified by `name` is currently set in the
outgoing headers. The header name matching is case-insensitive.

```js
const hasContentType = response.hasHeader('content-type');
```

### `response.headersSent`

* Type: {boolean}

Boolean (read-only). True if headers were sent, false otherwise.

### `response.removeHeader(name)`

* `name` {string}

Removes a header that's queued for implicit sending.

```js
response.removeHeader('Content-Encoding');
```

### `response.req`

* Type: {http.IncomingMessage}

A reference to the original HTTP `request` object.

### `response.sendDate`

* Type: {boolean}

When true, the Date header will be automatically generated and sent in
the response if it is not already present in the headers. Defaults to true.

This should only be disabled for testing; the Date header is required in
most HTTP responses (see RFC 9110 Section 6.6.1 for details).

### `response.setHeader(name, value)`

* `name` {string}
* `value` {number | string | string\[]}
* Returns: {http.ServerResponse}

Returns the response object.

Sets a single header value for implicit headers. If this header already exists
in the to-be-sent headers, its value will be replaced. Use an array of strings
here to send multiple headers with the same name. Non-string values will be
stored without modification. Therefore, `response.getHeader()` may return
non-string values. However, the non-string values will be converted to strings
for network transmission. The same response object is returned to the caller,
to enable call chaining.

```js
response.setHeader('Content-Type', 'text/html');
```

or

```js
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
```

Attempting to set a header field name or value that contains invalid characters
will result in a `TypeError` being thrown.

When headers have been set with `response.setHeader()`, they will be merged
with any headers passed to `response.writeHead()`, with the headers passed
to `response.writeHead()` given precedence.

```js
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

If `response.writeHead()` method is called and this method has not been
called, it will directly write the supplied header values onto the network
channel without caching internally, and the `response.getHeader()` on the
header will not yield the expected result. If progressive population of headers
is desired with potential future retrieval and modification, use
`response.setHeader()` instead of `response.writeHead()`.

### `response.setTimeout(msecs[, callback])`

* `msecs` {number}
* `callback` {Function}
* Returns: {http.ServerResponse}

Sets the Socket's timeout value to `msecs`. If a callback is
provided, then it is added as a listener on the `'timeout'` event on
the response object.

If no `'timeout'` listener is added to the request, the response, or
the server, then sockets are destroyed when they time out. If a handler is
assigned to the request, the response, or the server's `'timeout'` events,
timed out sockets must be handled explicitly.

### `response.socket`

* Type: {stream.Duplex}

Reference to the underlying socket. Usually users will not want to access
this property. In particular, the socket will not emit `'readable'` events
because of how the protocol parser attaches to the socket. After
`response.end()`, the property is nulled.

```mjs
import http from 'node:http';
const server = http.createServer((req, res) => {
  const ip = res.socket.remoteAddress;
  const port = res.socket.remotePort;
  res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(3000);
```

```cjs
const http = require('node:http');
const server = http.createServer((req, res) => {
  const ip = res.socket.remoteAddress;
  const port = res.socket.remotePort;
  res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(3000);
```

This property is guaranteed to be an instance of the {net.Socket} class,
a subclass of {stream.Duplex}, unless the user specified a socket
type other than {net.Socket}.

### `response.statusCode`

* Type: {number} **Default:** `200`

When using implicit headers (not calling `response.writeHead()` explicitly),
this property controls the status code that will be sent to the client when
the headers get flushed.

```js
response.statusCode = 404;
```

After response header was sent to the client, this property indicates the
status code which was sent out.

### `response.statusMessage`

* Type: {string}

When using implicit headers (not calling `response.writeHead()` explicitly),
this property controls the status message that will be sent to the client when
the headers get flushed. If this is left as `undefined` then the standard
message for the status code will be used.

```js
response.statusMessage = 'Not found';
```

After response header was sent to the client, this property indicates the
status message which was sent out.

### `response.strictContentLength`

* Type: {boolean} **Default:** `false`

If set to `true`, Node.js will check whether the `Content-Length`
header value and the size of the body, in bytes, are equal.
Mismatching the `Content-Length` header value will result
in an `Error` being thrown, identified by `code:` `'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`.

### `response.uncork()`

See `writable.uncork()`.

### `response.writableEnded`

* Type: {boolean}

Is `true` after `response.end()` has been called. This property
does not indicate whether the data has been flushed, for this use
`response.writableFinished` instead.

### `response.writableFinished`

* Type: {boolean}

Is `true` if all data has been flushed to the underlying system, immediately
before the `'finish'` event is emitted.

### `response.write(chunk, encoding)`

* `chunk` {string|Buffer|Uint8Array}
* `encoding` {string} **Default:** `'utf8'`
* `callback` {Function}
* Returns: {boolean}

If this method is called and `response.writeHead()` has not been called,
it will switch to implicit header mode and flush the implicit headers.

This sends a chunk of the response body. This method may
be called multiple times to provide successive parts of the body.

If `rejectNonStandardBodyWrites` is set to true in `createServer`
then writing to the body is not allowed when the request method or response
status do not support content. If an attempt is made to write to the body for a
HEAD request or as part of a `204` or `304`response, a synchronous `Error`
with the code `ERR_HTTP_BODY_NOT_ALLOWED` is thrown.

`chunk` can be a string or a buffer. If `chunk` is a string,
the second parameter specifies how to encode it into a byte stream.
`callback` will be called when this chunk of data is flushed.

This is the raw HTTP body and has nothing to do with higher-level multi-part
body encodings that may be used.

The first time `response.write()` is called, it will send the buffered
header information and the first chunk of the body to the client. The second
time `response.write()` is called, Node.js assumes data will be streamed,
and sends the new data separately. That is, the response is buffered up to the
first chunk of the body.

Returns `true` if the entire data was flushed successfully to the kernel
buffer. Returns `false` if all or part of the data was queued in user memory.
`'drain'` will be emitted when the buffer is free again.

### `response.writeContinue()`

Sends an HTTP/1.1 100 Continue message to the client, indicating that
the request body should be sent. See the `'checkContinue'` event on
`Server`.

### `response.writeEarlyHints(hints[, callback])`

* `hints` {Object}
* `callback` {Function}

Sends an HTTP/1.1 103 Early Hints message to the client with a Link header,
indicating that the user agent can preload/preconnect the linked resources.
The `hints` is an object containing the values of headers to be sent with
early hints message. The optional `callback` argument will be called when
the response message has been written.

**Example**

```js
const earlyHintsLink = '</styles.css>; rel=preload; as=style';
response.writeEarlyHints({
  'link': earlyHintsLink,
});

const earlyHintsLinks = [
  '</styles.css>; rel=preload; as=style',
  '</scripts.js>; rel=preload; as=script',
];
response.writeEarlyHints({
  'link': earlyHintsLinks,
  'x-trace-id': 'id for diagnostics',
});

const earlyHintsCallback = () => console.log('early hints message sent');
response.writeEarlyHints({
  'link': earlyHintsLinks,
}, earlyHintsCallback);
```
