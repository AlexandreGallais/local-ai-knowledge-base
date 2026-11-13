---
title: "HTTP/2 (part 3 of 15)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http2.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP/2 (part 3 of 15)

### Class: `Http2Session`

* Extends: {EventEmitter}

Instances of the `http2.Http2Session` class represent an active communications
session between an HTTP/2 client and server. Instances of this class are _not_
intended to be constructed directly by user code.

Each `Http2Session` instance will exhibit slightly different behaviors
depending on whether it is operating as a server or a client. The
`http2session.type` property can be used to determine the mode in which an
`Http2Session` is operating. On the server side, user code should rarely
have occasion to work with the `Http2Session` object directly, with most
actions typically taken through interactions with either the `Http2Server` or
`Http2Stream` objects.

User code will not create `Http2Session` instances directly. Server-side
`Http2Session` instances are created by the `Http2Server` instance when a
new HTTP/2 connection is received. Client-side `Http2Session` instances are
created using the `http2.connect()` method.

#### `Http2Session` and sockets

Every `Http2Session` instance is associated with exactly one `net.Socket` or
`tls.TLSSocket` when it is created. When either the `Socket` or the
`Http2Session` are destroyed, both will be destroyed.

Because of the specific serialization and processing requirements imposed
by the HTTP/2 protocol, it is not recommended for user code to read data from
or write data to a `Socket` instance bound to a `Http2Session`. Doing so can
put the HTTP/2 session into an indeterminate state causing the session and
the socket to become unusable.

Once a `Socket` has been bound to an `Http2Session`, user code should rely
solely on the API of the `Http2Session`.

#### Event: `'close'`

The `'close'` event is emitted once the `Http2Session` has been destroyed. Its
listener does not expect any arguments.

#### Event: `'connect'`

* `session` {Http2Session}
* `socket` {net.Socket}

The `'connect'` event is emitted once the `Http2Session` has been successfully
connected to the remote peer and communication may begin.

User code will typically not listen for this event directly.

#### Event: `'error'`

* `error` {Error}

The `'error'` event is emitted when an error occurs during the processing of
an `Http2Session`.

#### Event: `'frameError'`

* `type` {integer} The frame type.
* `code` {integer} The error code.
* `id` {integer} The stream id (or `0` if the frame isn't associated with a
  stream).

The `'frameError'` event is emitted when an error occurs while attempting to
send a frame on the session. If the frame that could not be sent is associated
with a specific `Http2Stream`, an attempt to emit a `'frameError'` event on the
`Http2Stream` is made.

If the `'frameError'` event is associated with a stream, the stream will be
closed and destroyed immediately following the `'frameError'` event. If the
event is not associated with a stream, the `Http2Session` will be shut down
immediately following the `'frameError'` event.

#### Event: `'goaway'`

* `errorCode` {number} The HTTP/2 error code specified in the `GOAWAY` frame.
* `lastStreamID` {number} The ID of the last stream the remote peer successfully
  processed (or `0` if no ID is specified).
* `opaqueData` {Buffer} If additional opaque data was included in the `GOAWAY`
  frame, a `Buffer` instance will be passed containing that data.

The `'goaway'` event is emitted when a `GOAWAY` frame is received.

The `Http2Session` instance will be shut down automatically when the `'goaway'`
event is emitted.

#### Event: `'localSettings'`

* `settings` {HTTP/2 Settings Object} A copy of the `SETTINGS` frame received.

The `'localSettings'` event is emitted when an acknowledgment `SETTINGS` frame
has been received.

When using `http2session.settings()` to submit new settings, the modified
settings do not take effect until the `'localSettings'` event is emitted.

```js
session.settings({ enablePush: false });

session.on('localSettings', (settings) => {
  /* Use the new settings */
});
```

#### Event: `'ping'`

* `payload` {Buffer} The `PING` frame 8-byte payload

The `'ping'` event is emitted whenever a `PING` frame is received from the
connected peer.

#### Event: `'remoteSettings'`

* `settings` {HTTP/2 Settings Object} A copy of the `SETTINGS` frame received.

The `'remoteSettings'` event is emitted when a new `SETTINGS` frame is received
from the connected peer.

```js
session.on('remoteSettings', (settings) => {
  /* Use the new settings */
});
```

#### Event: `'stream'`

* `stream` {Http2Stream} A reference to the stream
* `headers` {HTTP/2 Headers Object} An object describing the headers
* `flags` {number} The associated numeric flags
* `rawHeaders` {HTTP/2 Raw Headers} An array containing the raw headers

The `'stream'` event is emitted when a new `Http2Stream` is created.

```js
session.on('stream', (stream, headers, flags) => {
  const method = headers[':method'];
  const path = headers[':path'];
  // ...
  stream.respond({
    ':status': 200,
    'content-type': 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

On the server side, user code will typically not listen for this event directly,
and would instead register a handler for the `'stream'` event emitted by the
`net.Server` or `tls.Server` instances returned by `http2.createServer()` and
`http2.createSecureServer()`, respectively, as in the example below:

```mjs
import { createServer } from 'node:http2';

// Create an unencrypted HTTP/2 server
const server = createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.on('error', (error) => console.error(error));
  stream.end('<h1>Hello World</h1>');
});

server.listen(8000);
```

```cjs
const http2 = require('node:http2');

// Create an unencrypted HTTP/2 server
const server = http2.createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.on('error', (error) => console.error(error));
  stream.end('<h1>Hello World</h1>');
});

server.listen(8000);
```

Even though HTTP/2 streams and network sockets are not in a 1:1 correspondence,
a network error will destroy each individual stream and must be handled on the
stream level, as shown above.

#### Event: `'timeout'`

After the `http2session.setTimeout()` method is used to set the timeout period
for this `Http2Session`, the `'timeout'` event is emitted if there is no
activity on the `Http2Session` after the configured number of milliseconds.
Its listener does not expect any arguments.

```js
session.setTimeout(2000);
session.on('timeout', () => { /* .. */ });
```

#### `http2session.alpnProtocol`

* Type: {string|undefined}

Value will be `undefined` if the `Http2Session` is not yet connected to a
socket, `h2c` if the `Http2Session` is not connected to a `TLSSocket`, or
will return the value of the connected `TLSSocket`'s own `alpnProtocol`
property.

#### `http2session.close([callback])`

* `callback` {Function}

Gracefully closes the `Http2Session`, allowing any existing streams to
complete on their own and preventing new `Http2Stream` instances from being
created. Once closed, `http2session.destroy()` _might_ be called if there
are no open `Http2Stream` instances.

If specified, the `callback` function is registered as a handler for the
`'close'` event.

#### `http2session.closed`

* Type: {boolean}

Will be `true` if this `Http2Session` instance has been closed, otherwise
`false`.

#### `http2session.connecting`

* Type: {boolean}

Will be `true` if this `Http2Session` instance is still connecting, will be set
to `false` before emitting `connect` event and/or calling the `http2.connect`
callback.

#### `http2session.destroy(error)`

* `error` {Error} An `Error` object if the `Http2Session` is being destroyed
  due to an error.
* `code` {number} The HTTP/2 error code to send in the final `GOAWAY` frame.
  If unspecified, and `error` is not undefined, the default is `INTERNAL_ERROR`,
  otherwise defaults to `NO_ERROR`.

Immediately terminates the `Http2Session` and the associated `net.Socket` or
`tls.TLSSocket`.

Once destroyed, the `Http2Session` will emit the `'close'` event. If `error`
is not undefined, an `'error'` event will be emitted immediately before the
`'close'` event.

If there are any remaining open `Http2Streams` associated with the
`Http2Session`, those will also be destroyed.

#### `http2session.destroyed`

* Type: {boolean}

Will be `true` if this `Http2Session` instance has been destroyed and must no
longer be used, otherwise `false`.

#### `http2session.encrypted`

* Type: {boolean|undefined}

Value is `undefined` if the `Http2Session` session socket has not yet been
connected, `true` if the `Http2Session` is connected with a `TLSSocket`,
and `false` if the `Http2Session` is connected to any other kind of socket
or stream.

#### `http2session.goaway([code[, lastStreamID[, opaqueData]]])`

* `code` {number} An HTTP/2 error code
* `lastStreamID` {number} The numeric ID of the last processed `Http2Stream`
* `opaqueData` {Buffer|TypedArray|DataView} A `TypedArray` or `DataView`
  instance containing additional data to be carried within the `GOAWAY` frame.

Transmits a `GOAWAY` frame to the connected peer _without_ shutting down the
`Http2Session`.

#### `http2session.localSettings`

* Type: {HTTP/2 Settings Object}

A prototype-less object describing the current local settings of this
`Http2Session`. The local settings are local to _this_ `Http2Session` instance.

#### `http2session.originSet`

* Type: {string\[]|undefined}

If the `Http2Session` is connected to a `TLSSocket`, the `originSet` property
will return an `Array` of origins for which the `Http2Session` may be
considered authoritative.

The `originSet` property is only available when using a secure TLS connection.

#### `http2session.pendingSettingsAck`

* Type: {boolean}

Indicates whether the `Http2Session` is currently waiting for acknowledgment of
a sent `SETTINGS` frame. Will be `true` after calling the
`http2session.settings()` method. Will be `false` once all sent `SETTINGS`
frames have been acknowledged.

#### `http2session.ping([payload, ]callback)`

* `payload` {Buffer|TypedArray|DataView} Optional ping payload.
* `callback` {Function}
* Returns: {boolean}

Sends a `PING` frame to the connected HTTP/2 peer. A `callback` function must
be provided. The method will return `true` if the `PING` was sent, `false`
otherwise.

The maximum number of outstanding (unacknowledged) pings is determined by the
`maxOutstandingPings` configuration option. The default maximum is 10.

If provided, the `payload` must be a `Buffer`, `TypedArray`, or `DataView`
containing 8 bytes of data that will be transmitted with the `PING` and
returned with the ping acknowledgment.

The callback will be invoked with three arguments: an error argument that will
be `null` if the `PING` was successfully acknowledged, a `duration` argument
that reports the number of milliseconds elapsed since the ping was sent and the
acknowledgment was received, and a `Buffer` containing the 8-byte `PING`
payload.

```js
session.ping(Buffer.from('abcdefgh'), (err, duration, payload) => {
  if (!err) {
    console.log(`Ping acknowledged in ${duration} milliseconds`);
    console.log(`With payload '${payload.toString()}'`);
  }
});
```

If the `payload` argument is not specified, the default payload will be the
64-bit timestamp (little endian) marking the start of the `PING` duration.

#### `http2session.ref()`

Calls `ref()` on this `Http2Session`
instance's underlying `net.Socket`.

#### `http2session.remoteSettings`

* Type: {HTTP/2 Settings Object}

A prototype-less object describing the current remote settings of this
`Http2Session`. The remote settings are set by the _connected_ HTTP/2 peer.

#### `http2session.setLocalWindowSize(windowSize)`

* `windowSize` {number}

Sets the local endpoint's connection-level window size.
The `windowSize` is the total window size to set, not
the delta.

Increases take effect immediately, but decreases only apply as the window
already advertised to the peer is consumed, since a window that has been
advertised cannot be retracted. To use a window smaller than the default from
the start of the connection, set the `connectionWindowSize` option when
creating the server or client session instead.

```mjs
import { createServer } from 'node:http2';

const server = createServer();
const expectedWindowSize = 2 ** 20;
server.on('session', (session) => {

  // Set local window size to be 2 ** 20
  session.setLocalWindowSize(expectedWindowSize);
});
```

```cjs
const http2 = require('node:http2');

const server = http2.createServer();
const expectedWindowSize = 2 ** 20;
server.on('session', (session) => {

  // Set local window size to be 2 ** 20
  session.setLocalWindowSize(expectedWindowSize);
});
```

For http2 clients the proper event is either `'connect'` or `'remoteSettings'`.

#### `http2session.setTimeout(msecs, callback)`

* `msecs` {number}
* `callback` {Function}

Used to set a callback function that is called when there is no activity on
the `Http2Session` after `msecs` milliseconds. The given `callback` is
registered as a listener on the `'timeout'` event.

#### `http2session.socket`

* Type: {net.Socket|tls.TLSSocket}

Returns a `Proxy` object that acts as a `net.Socket` (or `tls.TLSSocket`) but
limits available methods to ones safe to use with HTTP/2.

`emit`, `end`, `pause`, `read`, `resume`, and `write` will throw
an error with code `ERR_HTTP2_NO_SOCKET_MANIPULATION`. See
`Http2Session` and Sockets for more information.

`destroy`, `setTimeout`, `ref`, and `unref` methods will be called on this
`Http2Session`.

All other interactions will be routed directly to the socket.

#### `http2session.state`

Provides miscellaneous information about the current state of the
`Http2Session`.
