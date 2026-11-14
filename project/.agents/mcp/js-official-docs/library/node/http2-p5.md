---
title: "HTTP/2 (part 5 of 15)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http2.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP/2 (part 5 of 15)

### Class: `Http2Stream`

* Extends: {stream.Duplex}

Each instance of the `Http2Stream` class represents a bidirectional HTTP/2
communications stream over an `Http2Session` instance. Any single `Http2Session`
may have up to 231-1 `Http2Stream` instances over its lifetime.

User code will not construct `Http2Stream` instances directly. Rather, these
are created, managed, and provided to user code through the `Http2Session`
instance. On the server, `Http2Stream` instances are created either in response
to an incoming HTTP request (and handed off to user code via the `'stream'`
event), or in response to a call to the `http2stream.pushStream()` method.
On the client, `Http2Stream` instances are created and returned when either the
`http2session.request()` method is called, or in response to an incoming
`'push'` event.

The `Http2Stream` class is a base for the `ServerHttp2Stream` and
`ClientHttp2Stream` classes, each of which is used specifically by either
the Server or Client side, respectively.

All `Http2Stream` instances are `Duplex` streams. The `Writable` side of the
`Duplex` is used to send data to the connected peer, while the `Readable` side
is used to receive data sent by the connected peer.

The default text character encoding for an `Http2Stream` is UTF-8. When using an
`Http2Stream` to send text, use the `'content-type'` header to set the character
encoding.

```js
stream.respond({
  'content-type': 'text/html; charset=utf-8',
  ':status': 200,
});
```

#### `Http2Stream` Lifecycle

##### Creation

On the server side, instances of `ServerHttp2Stream` are created either
when:

* A new HTTP/2 `HEADERS` frame with a previously unused stream ID is received;
* The `http2stream.pushStream()` method is called.

On the client side, instances of `ClientHttp2Stream` are created when the
`http2session.request()` method is called.

On the client, the `Http2Stream` instance returned by `http2session.request()`
may not be immediately ready for use if the parent `Http2Session` has not yet
been fully established. In such cases, operations called on the `Http2Stream`
will be buffered until the `'ready'` event is emitted. User code should rarely,
if ever, need to handle the `'ready'` event directly. The ready status of an
`Http2Stream` can be determined by checking the value of `http2stream.id`. If
the value is `undefined`, the stream is not yet ready for use.

##### Destruction

All `Http2Stream` instances are destroyed either when:

* An `RST_STREAM` frame for the stream is received by the connected peer,
  and (for client streams only) pending data has been read.
* The `http2stream.close()` method is called, and (for client streams only)
  pending data has been read.
* The `http2stream.destroy()` or `http2session.destroy()` methods are called.

When an `Http2Stream` instance is destroyed, an attempt will be made to send an
`RST_STREAM` frame to the connected peer.

When the `Http2Stream` instance is destroyed, the `'close'` event will
be emitted. Because `Http2Stream` is an instance of `stream.Duplex`, the
`'end'` event will also be emitted if the stream data is currently flowing.
The `'error'` event may also be emitted if `http2stream.destroy()` was called
with an `Error` passed as the first argument.

After the `Http2Stream` has been destroyed, the `http2stream.destroyed`
property will be `true` and the `http2stream.rstCode` property will specify the
`RST_STREAM` error code. The `Http2Stream` instance is no longer usable once
destroyed.

#### Event: `'aborted'`

The `'aborted'` event is emitted whenever a `Http2Stream` instance is
abnormally aborted in mid-communication.
Its listener does not expect any arguments.

The `'aborted'` event will only be emitted if the `Http2Stream` writable side
has not been ended.

#### Event: `'close'`

The `'close'` event is emitted when the `Http2Stream` is destroyed. Once
this event is emitted, the `Http2Stream` instance is no longer usable.

The HTTP/2 error code used when closing the stream can be retrieved using
the `http2stream.rstCode` property. If the code is any value other than
`NGHTTP2_NO_ERROR` (`0`), an `'error'` event will have also been emitted.

#### Event: `'error'`

* `error` {Error}

The `'error'` event is emitted when an error occurs during the processing of
an `Http2Stream`.

#### Event: `'frameError'`

* `type` {integer} The frame type.
* `code` {integer} The error code.
* `id` {integer} The stream id (or `0` if the frame isn't associated with a
  stream).

The `'frameError'` event is emitted when an error occurs while attempting to
send a frame. When invoked, the handler function will receive an integer
argument identifying the frame type, and an integer argument identifying the
error code. The `Http2Stream` instance will be destroyed immediately after the
`'frameError'` event is emitted.

#### Event: `'ready'`

The `'ready'` event is emitted when the `Http2Stream` has been opened, has
been assigned an `id`, and can be used. The listener does not expect any
arguments.

#### Event: `'timeout'`

The `'timeout'` event is emitted after no activity is received for this
`Http2Stream` within the number of milliseconds set using
`http2stream.setTimeout()`.
Its listener does not expect any arguments.

#### Event: `'trailers'`

* `headers` {HTTP/2 Headers Object} An object describing the headers
* `flags` {number} The associated numeric flags
* `rawHeaders` {HTTP/2 Raw Headers}

The `'trailers'` event is emitted when a block of headers associated with
trailing header fields is received. The listener callback is passed the HTTP/2 Headers Object, flags associated
with the headers, and the headers in raw format (see HTTP/2 Raw Headers).

This event might not be emitted if `http2stream.end()` is called
before trailers are received and the incoming data is not being read or
listened for.

```js
stream.on('trailers', (headers, flags) => {
  console.log(headers);
});
```

#### Event: `'wantTrailers'`

The `'wantTrailers'` event is emitted when the `Http2Stream` has queued the
final `DATA` frame to be sent on a frame and the `Http2Stream` is ready to send
trailing headers. When initiating a request or response, the `waitForTrailers`
option must be set for this event to be emitted.

#### `http2stream.aborted`

* Type: {boolean}

Set to `true` if the `Http2Stream` instance was aborted abnormally. When set,
the `'aborted'` event will have been emitted.

#### `http2stream.bufferSize`

* Type: {number}

This property shows the number of characters currently buffered to be written.
See `net.Socket.bufferSize` for details.

#### `http2stream.close(code[, callback])`

* `code` {number} Unsigned 32-bit integer identifying the error code.
  **Default:** `http2.constants.NGHTTP2_NO_ERROR` (`0x00`).
* `callback` {Function} An optional function registered to listen for the
  `'close'` event.

Closes the `Http2Stream` instance by sending an `RST_STREAM` frame to the
connected HTTP/2 peer.

#### `http2stream.closed`

* Type: {boolean}

Set to `true` if the `Http2Stream` instance has been closed.

#### `http2stream.destroyed`

* Type: {boolean}

Set to `true` if the `Http2Stream` instance has been destroyed and is no longer
usable.

#### `http2stream.endAfterHeaders`

* Type: {boolean}

Set to `true` if the `END_STREAM` flag was set in the request or response
HEADERS frame received, indicating that no additional data should be received
and the readable side of the `Http2Stream` will be closed.

#### `http2stream.id`

* Type: {number|undefined}

The numeric stream identifier of this `Http2Stream` instance. Set to `undefined`
if the stream identifier has not yet been assigned.

#### `http2stream.pending`

* Type: {boolean}

Set to `true` if the `Http2Stream` instance has not yet been assigned a
numeric stream identifier.

#### `http2stream.priority(options)`

> Stability: 0 - Deprecated: support for priority signaling has been deprecated
> in the RFC 9113 and is no longer supported in Node.js.

Empty method, only there to maintain some backward compatibility.

#### `http2stream.rstCode`

* Type: {number}

Set to the `RST_STREAM` error code reported when the `Http2Stream` is
destroyed after either receiving an `RST_STREAM` frame from the connected peer,
calling `http2stream.close()`, or `http2stream.destroy()`. Will be
`undefined` if the `Http2Stream` has not been closed.

#### `http2stream.sentHeaders`

* Type: {HTTP/2 Headers Object}

An object containing the outbound headers sent for this `Http2Stream`.

#### `http2stream.sentInfoHeaders`

* Type: {HTTP/2 Headers Object\[]}

An array of objects containing the outbound informational (additional) headers
sent for this `Http2Stream`.

#### `http2stream.sentTrailers`

* Type: {HTTP/2 Headers Object}

An object containing the outbound trailers sent for this `HttpStream`.

#### `http2stream.session`

* Type: {Http2Session}

A reference to the `Http2Session` instance that owns this `Http2Stream`. The
value will be `undefined` after the `Http2Stream` instance is destroyed.

#### `http2stream.setTimeout(msecs, callback)`

* `msecs` {number}
* `callback` {Function}

```mjs
import { connect, constants } from 'node:http2';
const client = connect('http://example.org:8000');
const { NGHTTP2_CANCEL } = constants;
const req = client.request({ ':path': '/' });

// Cancel the stream if there's no activity after 5 seconds
req.setTimeout(5000, () => req.close(NGHTTP2_CANCEL));
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('http://example.org:8000');
const { NGHTTP2_CANCEL } = http2.constants;
const req = client.request({ ':path': '/' });

// Cancel the stream if there's no activity after 5 seconds
req.setTimeout(5000, () => req.close(NGHTTP2_CANCEL));
```

#### `http2stream.state`

Provides miscellaneous information about the current state of the
`Http2Stream`.

* Type: {Object}
  * `localWindowSize` {number} The number of bytes the connected peer may send
    for this `Http2Stream` without receiving a `WINDOW_UPDATE`.
  * `state` {number} A flag indicating the low-level current state of the
    `Http2Stream` as determined by `nghttp2`.
  * `localClose` {number} `1` if this `Http2Stream` has been closed locally.
  * `remoteClose` {number} `1` if this `Http2Stream` has been closed
    remotely.
  * `sumDependencyWeight` {number} Legacy property, always set to `0`.
  * `weight` {number} Legacy property, always set to `16`.

A current state of this `Http2Stream`.

#### `http2stream.sendTrailers(headers)`

* `headers` {HTTP/2 Headers Object}

Sends a trailing `HEADERS` frame to the connected HTTP/2 peer. This method
will cause the `Http2Stream` to be immediately closed and must only be
called after the `'wantTrailers'` event has been emitted. When sending a
request or sending a response, the `options.waitForTrailers` option must be set
in order to keep the `Http2Stream` open after the final `DATA` frame so that
trailers can be sent.

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream) => {
  stream.respond(undefined, { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ xyz: 'abc' });
  });
  stream.end('Hello World');
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream) => {
  stream.respond(undefined, { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ xyz: 'abc' });
  });
  stream.end('Hello World');
});
```

The HTTP/1 specification forbids trailers from containing HTTP/2 pseudo-header
fields (e.g. `':method'`, `':path'`, etc).

### Class: `ClientHttp2Stream`

* Extends {Http2Stream}

The `ClientHttp2Stream` class is an extension of `Http2Stream` that is
used exclusively on HTTP/2 Clients. `Http2Stream` instances on the client
provide events such as `'response'` and `'push'` that are only relevant on
the client.

#### Event: `'continue'`

Emitted when the server sends a `100 Continue` status, usually because
the request contained `Expect: 100-continue`. This is an instruction that
the client should send the request body.

#### Event: `'headers'`

* `headers` {HTTP/2 Headers Object}
* `flags` {number}
* `rawHeaders` {HTTP/2 Raw Headers}

The `'headers'` event is emitted when an additional block of headers is received
for a stream, such as when a block of `1xx` informational headers is received.
The listener callback is passed the HTTP/2 Headers Object, flags associated
with the headers, and the headers in raw format (see HTTP/2 Raw Headers).

```js
stream.on('headers', (headers, flags) => {
  console.log(headers);
});
```

#### Event: `'push'`

* `headers` {HTTP/2 Headers Object}
* `flags` {number}
* `rawHeaders` {HTTP/2 Raw Headers}

The `'push'` event is emitted when response headers for a Server Push stream
are received. The listener callback is passed the HTTP/2 Headers Object, flags associated
with the headers, and the headers in raw format (see HTTP/2 Raw Headers).

```js
stream.on('push', (headers, flags) => {
  console.log(headers);
});
```

#### Event: `'response'`

* `headers` {HTTP/2 Headers Object}
* `flags` {number}
* `rawHeaders` {HTTP/2 Raw Headers}

The `'response'` event is emitted when a response `HEADERS` frame has been
received for this stream from the connected HTTP/2 server. The listener is
invoked with three arguments: an `Object` containing the received
HTTP/2 Headers Object, flags associated with the headers, and the headers
in raw format (see HTTP/2 Raw Headers).

```mjs
import { connect } from 'node:http2';
const client = connect('https://localhost');
const req = client.request({ ':path': '/' });
req.on('response', (headers, flags) => {
  console.log(headers[':status']);
});
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('https://localhost');
const req = client.request({ ':path': '/' });
req.on('response', (headers, flags) => {
  console.log(headers[':status']);
});
```
