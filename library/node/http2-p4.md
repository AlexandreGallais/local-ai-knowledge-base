---
title: "HTTP/2 (part 4 of 15)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http2.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP/2 (part 4 of 15)

* Type: {Object}
  * `effectiveLocalWindowSize` {number} The current local (receive)
    flow control window size for the `Http2Session`.
  * `effectiveRecvDataLength` {number} The current number of bytes
    that have been received since the last flow control `WINDOW_UPDATE`.
  * `nextStreamID` {number} The numeric identifier to be used the
    next time a new `Http2Stream` is created by this `Http2Session`.
  * `localWindowSize` {number} The number of bytes that the remote peer can
    send without receiving a `WINDOW_UPDATE`.
  * `lastProcStreamID` {number} The numeric id of the `Http2Stream`
    for which a `HEADERS` or `DATA` frame was most recently received.
  * `remoteWindowSize` {number} The number of bytes that this `Http2Session`
    may send without receiving a `WINDOW_UPDATE`.
  * `outboundQueueSize` {number} The number of frames currently within the
    outbound queue for this `Http2Session`.
  * `deflateDynamicTableSize` {number} The current size in bytes of the
    outbound header compression state table.
  * `inflateDynamicTableSize` {number} The current size in bytes of the
    inbound header compression state table.

An object describing the current status of this `Http2Session`.

#### `http2session.settings(settings)`

* `settings` {HTTP/2 Settings Object}
* `callback` {Function} Callback that is called once the session is connected or
  right away if the session is already connected.
  * `err` {Error|null}
  * `settings` {HTTP/2 Settings Object} The updated `settings` object.
  * `duration` {integer}

Updates the current local settings for this `Http2Session` and sends a new
`SETTINGS` frame to the connected HTTP/2 peer.

Once called, the `http2session.pendingSettingsAck` property will be `true`
while the session is waiting for the remote peer to acknowledge the new
settings.

The new settings will not become effective until the `SETTINGS` acknowledgment
is received and the `'localSettings'` event is emitted. It is possible to send
multiple `SETTINGS` frames while acknowledgment is still pending.

#### `http2session.type`

* Type: {number}

The `http2session.type` will be equal to
`http2.constants.NGHTTP2_SESSION_SERVER` if this `Http2Session` instance is a
server, and `http2.constants.NGHTTP2_SESSION_CLIENT` if the instance is a
client.

#### `http2session.unref()`

Calls `unref()` on this `Http2Session`
instance's underlying `net.Socket`.

### Class: `ServerHttp2Session`

* Extends: {Http2Session}

#### `serverhttp2session.altsvc(alt, originOrStream)`

* `alt` {string} A description of the alternative service configuration as
  defined by RFC 7838.
* `originOrStream` {number|string|URL|Object} Either a URL string specifying
  the origin (or an `Object` with an `origin` property) or the numeric
  identifier of an active `Http2Stream` as given by the `http2stream.id`
  property.

Submits an `ALTSVC` frame (as defined by RFC 7838) to the connected client.

```mjs
import { createServer } from 'node:http2';

const server = createServer();
server.on('session', (session) => {
  // Set altsvc for origin https://example.org:80
  session.altsvc('h2=":8000"', 'https://example.org:80');
});

server.on('stream', (stream) => {
  // Set altsvc for a specific stream
  stream.session.altsvc('h2=":8000"', stream.id);
});
```

```cjs
const http2 = require('node:http2');

const server = http2.createServer();
server.on('session', (session) => {
  // Set altsvc for origin https://example.org:80
  session.altsvc('h2=":8000"', 'https://example.org:80');
});

server.on('stream', (stream) => {
  // Set altsvc for a specific stream
  stream.session.altsvc('h2=":8000"', stream.id);
});
```

Sending an `ALTSVC` frame with a specific stream ID indicates that the alternate
service is associated with the origin of the given `Http2Stream`.

The `alt` and origin string _must_ contain only ASCII bytes and are
strictly interpreted as a sequence of ASCII bytes. The special value `'clear'`
may be passed to clear any previously set alternative service for a given
domain.

When a string is passed for the `originOrStream` argument, it will be parsed as
a URL and the origin will be derived. For instance, the origin for the
HTTP URL `'https://example.org/foo/bar'` is the ASCII string
`'https://example.org'`. An error will be thrown if either the given string
cannot be parsed as a URL or if a valid origin cannot be derived.

A `URL` object, or any object with an `origin` property, may be passed as
`originOrStream`, in which case the value of the `origin` property will be
used. The value of the `origin` property _must_ be a properly serialized
ASCII origin.

#### Specifying alternative services

The format of the `alt` parameter is strictly defined by RFC 7838 as an
ASCII string containing a comma-delimited list of "alternative" protocols
associated with a specific host and port.

For example, the value `'h2="example.org:81"'` indicates that the HTTP/2
protocol is available on the host `'example.org'` on TCP/IP port 81. The
host and port _must_ be contained within the quote (`"`) characters.

Multiple alternatives may be specified, for instance: `'h2="example.org:81",
h2=":82"'`.

The protocol identifier (`'h2'` in the examples) may be any valid
ALPN Protocol ID.

The syntax of these values is not validated by the Node.js implementation and
are passed through as provided by the user or received from the peer.

#### `serverhttp2session.origin(...origins)`

* `origins` { string | URL | Object } One or more URL Strings passed as
  separate arguments.

Submits an `ORIGIN` frame (as defined by RFC 8336) to the connected client
to advertise the set of origins for which the server is capable of providing
authoritative responses.

```mjs
import { createSecureServer } from 'node:http2';
const options = getSecureOptionsSomehow();
const server = createSecureServer(options);
server.on('stream', (stream) => {
  stream.respond();
  stream.end('ok');
});
server.on('session', (session) => {
  session.origin('https://example.com', 'https://example.org');
});
```

```cjs
const http2 = require('node:http2');
const options = getSecureOptionsSomehow();
const server = http2.createSecureServer(options);
server.on('stream', (stream) => {
  stream.respond();
  stream.end('ok');
});
server.on('session', (session) => {
  session.origin('https://example.com', 'https://example.org');
});
```

When a string is passed as an `origin`, it will be parsed as a URL and the
origin will be derived. For instance, the origin for the HTTP URL
`'https://example.org/foo/bar'` is the ASCII string
`'https://example.org'`. An error will be thrown if either the given string
cannot be parsed as a URL or if a valid origin cannot be derived.

A `URL` object, or any object with an `origin` property, may be passed as
an `origin`, in which case the value of the `origin` property will be
used. The value of the `origin` property _must_ be a properly serialized
ASCII origin.

Alternatively, the `origins` option may be used when creating a new HTTP/2
server using the `http2.createSecureServer()` method:

```mjs
import { createSecureServer } from 'node:http2';
const options = getSecureOptionsSomehow();
options.origins = ['https://example.com', 'https://example.org'];
const server = createSecureServer(options);
server.on('stream', (stream) => {
  stream.respond();
  stream.end('ok');
});
```

```cjs
const http2 = require('node:http2');
const options = getSecureOptionsSomehow();
options.origins = ['https://example.com', 'https://example.org'];
const server = http2.createSecureServer(options);
server.on('stream', (stream) => {
  stream.respond();
  stream.end('ok');
});
```

### Class: `ClientHttp2Session`

* Extends: {Http2Session}

#### Event: `'altsvc'`

* `alt` {string}
* `origin` {string}
* `streamId` {number}

The `'altsvc'` event is emitted whenever an `ALTSVC` frame is received by
the client. The event is emitted with the `ALTSVC` value, origin, and stream
ID. If no `origin` is provided in the `ALTSVC` frame, `origin` will
be an empty string.

```mjs
import { connect } from 'node:http2';
const client = connect('https://example.org');

client.on('altsvc', (alt, origin, streamId) => {
  console.log(alt);
  console.log(origin);
  console.log(streamId);
});
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('https://example.org');

client.on('altsvc', (alt, origin, streamId) => {
  console.log(alt);
  console.log(origin);
  console.log(streamId);
});
```

#### Event: `'origin'`

* `origins` {string\[]}

The `'origin'` event is emitted whenever an `ORIGIN` frame is received by
the client. The event is emitted with an array of `origin` strings. The
`http2session.originSet` will be updated to include the received
origins.

```mjs
import { connect } from 'node:http2';
const client = connect('https://example.org');

client.on('origin', (origins) => {
  for (let n = 0; n < origins.length; n++)
    console.log(origins[n]);
});
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('https://example.org');

client.on('origin', (origins) => {
  for (let n = 0; n < origins.length; n++)
    console.log(origins[n]);
});
```

The `'origin'` event is only emitted when using a secure TLS connection.

#### `clienthttp2session.request(headers[, options])`

* `headers` {HTTP/2 Headers Object|HTTP/2 Raw Headers}

* `options` {Object}
  * `endStream` {boolean} `true` if the `Http2Stream` _writable_ side should
    be closed initially, such as when sending a `GET` request that should not
    expect a payload body.
  * `exclusive` {boolean} When `true` and `parent` identifies a parent Stream,
    the created stream is made the sole direct dependency of the parent, with
    all other existing dependents made a dependent of the newly created stream.
    **Default:** `false`.
  * `parent` {number} Specifies the numeric identifier of a stream the newly
    created stream is dependent on.
  * `waitForTrailers` {boolean} When `true`, the `Http2Stream` will emit the
    `'wantTrailers'` event after the final `DATA` frame has been sent.
  * `signal` {AbortSignal} An AbortSignal that may be used to abort an ongoing
    request.

* Returns: {ClientHttp2Stream}

For HTTP/2 Client `Http2Session` instances only, the `http2session.request()`
creates and returns an `Http2Stream` instance that can be used to send an
HTTP/2 request to the connected server.

When a `ClientHttp2Session` is first created, the socket may not yet be
connected. If `clienthttp2session.request()` is called during this time, the
actual request will be deferred until the socket is ready to go.

If the session becomes unavailable before the request can be created, the
returned stream will emit `ERR_HTTP2_GOAWAY_SESSION` or
`ERR_HTTP2_INVALID_SESSION` asynchronously.

This method is only available if `http2session.type` is equal to
`http2.constants.NGHTTP2_SESSION_CLIENT`.

```mjs
import { connect, constants } from 'node:http2';
const clientSession = connect('https://localhost:1234');
const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
} = constants;

const req = clientSession.request({ [HTTP2_HEADER_PATH]: '/' });
req.on('response', (headers) => {
  console.log(headers[HTTP2_HEADER_STATUS]);
  req.on('data', (chunk) => { /* .. */ });
  req.on('end', () => { /* .. */ });
});
```

```cjs
const http2 = require('node:http2');
const clientSession = http2.connect('https://localhost:1234');
const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
} = http2.constants;

const req = clientSession.request({ [HTTP2_HEADER_PATH]: '/' });
req.on('response', (headers) => {
  console.log(headers[HTTP2_HEADER_STATUS]);
  req.on('data', (chunk) => { /* .. */ });
  req.on('end', () => { /* .. */ });
});
```

When the `options.waitForTrailers` option is set, the `'wantTrailers'` event
is emitted immediately after queuing the last chunk of payload data to be sent.
The `http2stream.sendTrailers()` method can then be called to send trailing
headers to the peer.

When `options.waitForTrailers` is set, the `Http2Stream` will not automatically
close when the final `DATA` frame is transmitted. User code must call either
`http2stream.sendTrailers()` or `http2stream.close()` to close the
`Http2Stream`.

When `options.signal` is set with an `AbortSignal` and then `abort` on the
corresponding `AbortController` is called, the request will emit an `'error'`
event with an `AbortError` error.

The `:method` and `:path` pseudo-headers are not specified within `headers`,
they respectively default to:

* `:method` = `'GET'`
* `:path` = `/`
