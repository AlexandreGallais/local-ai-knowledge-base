---
title: "HTTP (part 8 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 8 of 12)

## Class: `http.OutgoingMessage`

* Extends: {Stream}

This class serves as the parent class of `http.ClientRequest`
and `http.ServerResponse`. It is an abstract outgoing message from
the perspective of the participants of an HTTP transaction.

### Event: `'drain'`

Emitted when the buffer of the message is free again.

### Event: `'finish'`

Emitted when the transmission is finished successfully.

### Event: `'prefinish'`

Emitted after `outgoingMessage.end()` is called.
When the event is emitted, all data has been processed but not necessarily
completely flushed.

### `outgoingMessage.addTrailers(headers)`

* `headers` {Object}

Adds HTTP trailers (headers but at the end of the message) to the message.

Trailers will **only** be emitted if the message is chunked encoded. If not,
the trailers will be silently discarded.

HTTP requires the `Trailer` header to be sent to emit trailers,
with a list of header field names in its value, e.g.

```js
message.writeHead(200, { 'Content-Type': 'text/plain',
                         'Trailer': 'Content-MD5' });
message.write(fileData);
message.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
message.end();
```

Attempting to set a header field name or value that contains invalid characters
will result in a `TypeError` being thrown.

### `outgoingMessage.appendHeader(name, value)`

* `name` {string} Header name
* `value` {string|string\[]} Header value
* Returns: {this}

Append a single header value to the header object.

If the value is an array, this is equivalent to calling this method multiple
times.

If there were no previous values for the header, this is equivalent to calling
`outgoingMessage.setHeader(name, value)`.

Depending of the value of `options.uniqueHeaders` when the client request or the
server were created, this will end up in the header being sent multiple times or
a single time with values joined using `; `.

### `outgoingMessage.connection`

> Stability: 0 - Deprecated: Use `outgoingMessage.socket` instead.

Alias of `outgoingMessage.socket`.

### `outgoingMessage.cork()`

See `writable.cork()`.

### `outgoingMessage.destroy([error])`

* `error` {Error} Optional, an error to emit with `error` event
* Returns: {this}

Destroys the message. Once a socket is associated with the message
and is connected, that socket will be destroyed as well.

### `outgoingMessage.end(chunk, encoding)`

* `chunk` {string|Buffer|Uint8Array}
* `encoding` {string} Optional, **Default**: `utf8`
* `callback` {Function} Optional
* Returns: {this}

Finishes the outgoing message. If any parts of the body are unsent, it will
flush them to the underlying system. If the message is chunked, it will
send the terminating chunk `0\r\n\r\n`, and send the trailers (if any).

If `chunk` is specified, it is equivalent to calling
`outgoingMessage.write(chunk, encoding)`, followed by
`outgoingMessage.end(callback)`.

If `callback` is provided, it will be called when the message is finished
(equivalent to a listener of the `'finish'` event).

### `outgoingMessage.flushHeaders()`

Flushes the message headers.

For efficiency reason, Node.js normally buffers the message headers
until `outgoingMessage.end()` is called or the first chunk of message data
is written. It then tries to pack the headers and data into a single TCP
packet.

It is usually desired (it saves a TCP round-trip), but not when the first
data is not sent until possibly much later. `outgoingMessage.flushHeaders()`
bypasses the optimization and kickstarts the message.

### `outgoingMessage.getHeader(name)`

* `name` {string} Name of header
* Returns: {number | string | string\[] | undefined}

Gets the value of the HTTP header with the given name. If that header is not
set, the returned value will be `undefined`.

### `outgoingMessage.getHeaderNames()`

* Returns: {string\[]}

Returns an array containing the unique names of the current outgoing headers.
All names are lowercase.

### `outgoingMessage.getHeaders()`

* Returns: {Object}

Returns a shallow copy of the current outgoing headers. Since a shallow
copy is used, array values may be mutated without additional calls to
various header-related HTTP module methods. The keys of the returned
object are the header names and the values are the respective header
values. All header names are lowercase.

The object returned by the `outgoingMessage.getHeaders()` method does
not prototypically inherit from the JavaScript `Object`. This means that
typical `Object` methods such as `obj.toString()`, `obj.hasOwnProperty()`,
and others are not defined and will not work.

```js
outgoingMessage.setHeader('Foo', 'bar');
outgoingMessage.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headers = outgoingMessage.getHeaders();
// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }
```

### `outgoingMessage.hasHeader(name)`

* `name` {string}
* Returns: {boolean}

Returns `true` if the header identified by `name` is currently set in the
outgoing headers. The header name is case-insensitive.

```js
const hasContentType = outgoingMessage.hasHeader('content-type');
```

### `outgoingMessage.headersSent`

* Type: {boolean}

Read-only. `true` if the headers were sent, otherwise `false`.

### `outgoingMessage.pipe()`

Overrides the `stream.pipe()` method inherited from the legacy `Stream` class
which is the parent class of `http.OutgoingMessage`.

Calling this method will throw an `Error` because `outgoingMessage` is a
write-only stream.

### `outgoingMessage.removeHeader(name)`

* `name` {string} Header name

Removes a header that is queued for implicit sending.

```js
outgoingMessage.removeHeader('Content-Encoding');
```

### `outgoingMessage.setHeader(name, value)`

* `name` {string} Header name
* `value` {number | string | string\[]} Header value
* Returns: {this}

Sets a single header value. If the header already exists in the to-be-sent
headers, its value will be replaced. Use an array of strings to send multiple
headers with the same name.

### `outgoingMessage.setHeaders(headers)`

* `headers` {Headers|Map}
* Returns: {this}

Sets multiple header values for implicit headers.
`headers` must be an instance of `Headers` or `Map`,
if a header already exists in the to-be-sent headers,
its value will be replaced.

```js
const headers = new Headers({ foo: 'bar' });
outgoingMessage.setHeaders(headers);
```

or

```js
const headers = new Map([['foo', 'bar']]);
outgoingMessage.setHeaders(headers);
```

When headers have been set with `outgoingMessage.setHeaders()`,
they will be merged with any headers passed to `response.writeHead()`,
with the headers passed to `response.writeHead()` given precedence.

```js
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  const headers = new Headers({ 'Content-Type': 'text/html' });
  res.setHeaders(headers);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

### `outgoingMessage.setTimeout(msecs[, callback])`

* `msecs` {number}
* `callback` {Function} Optional function to be called when a timeout
  occurs. Same as binding to the `timeout` event.
* Returns: {this}

Once a socket is associated with the message and is connected,
`socket.setTimeout()` will be called with `msecs` as the first parameter.

### `outgoingMessage.socket`

* Type: {stream.Duplex}

Reference to the underlying socket. Usually, users will not want to access
this property.

After calling `outgoingMessage.end()`, this property will be nulled.

### `outgoingMessage.uncork()`

See `writable.uncork()`

### `outgoingMessage.writableCorked`

* Type: {number}

The number of times `outgoingMessage.cork()` has been called.

### `outgoingMessage.writableEnded`

* Type: {boolean}

Is `true` if `outgoingMessage.end()` has been called. This property does
not indicate whether the data has been flushed. For that purpose, use
`message.writableFinished` instead.

### `outgoingMessage.writableFinished`

* Type: {boolean}

Is `true` if all data has been flushed to the underlying system.

### `outgoingMessage.writableHighWaterMark`

* Type: {number}

The `highWaterMark` of the underlying socket if assigned. Otherwise, the default
buffer level when `writable.write()` starts returning false (`16384`).

### `outgoingMessage.writableLength`

* Type: {number}

The number of buffered bytes.

### `outgoingMessage.writableObjectMode`

* Type: {boolean}

Always `false`.

### `outgoingMessage.write(chunk, encoding)`

* `chunk` {string|Buffer|Uint8Array}
* `encoding` {string} **Default**: `utf8`
* `callback` {Function}
* Returns: {boolean}

Sends a chunk of the body. This method can be called multiple times.

The `encoding` argument is only relevant when `chunk` is a string. Defaults to
`'utf8'`.

The `callback` argument is optional and will be called when this chunk of data
is flushed.

Returns `true` if the entire data was flushed successfully to the kernel
buffer. Returns `false` if all or part of the data was queued in the user
memory. The `'drain'` event will be emitted when the buffer is free again.

## `http.METHODS`

* Type: {string\[]}

A list of the HTTP methods that are supported by the parser.

## `http.STATUS_CODES`

* Type: {Object}

A collection of all the standard HTTP response status codes, and the
short description of each. For example, `http.STATUS_CODES[404] === 'Not
Found'`.
