---
title: "HTTP/2 (part 9 of 15)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http2.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP/2 (part 9 of 15)

### `http2.createSecureServer(options[, onRequestHandler])`

* `options` {Object}
  * `allowHTTP1` {boolean} Incoming client connections that do not support
    HTTP/2 will be downgraded to HTTP/1.x when set to `true`.
    See the `'unknownProtocol'` event. See ALPN negotiation.
    **Default:** `false`.
  * `maxDeflateDynamicTableSize` {number} Sets the maximum dynamic table size
    for deflating header fields. **Default:** `4Kib`.
  * `maxSettings` {number} Sets the maximum number of settings entries per
    `SETTINGS` frame. The minimum value allowed is `1`. **Default:** `32`.
  * `maxSessionMemory`{number} Sets the maximum memory that the `Http2Session`
    is permitted to use. The value is expressed in terms of number of megabytes,
    e.g. `1` equal 1 megabyte. The minimum value allowed is `1`. This is a
    credit based limit, existing `Http2Stream`s may cause this
    limit to be exceeded, but new `Http2Stream` instances will be rejected
    while this limit is exceeded. The current number of `Http2Stream` sessions,
    the current memory use of the header compression tables, header blocks
    retained by open streams, current data queued to be sent, inbound DATA
    frames retained by undrained streams, and unacknowledged `PING`
    and `SETTINGS` frames are all counted towards the current limit. When the
    limit is exceeded the session stops reading from the socket (applying
    backpressure) until the application consumes the queued data. **Default:**
    `10`.
  * `maxHeaderListPairs` {number} Sets the maximum number of header entries.
    This is similar to `server.maxHeadersCount` or
    `request.maxHeadersCount` in the `node:http` module. The minimum value
    is `4`. **Default:** `128`.
  * `maxOutstandingPings` {number} Sets the maximum number of outstanding,
    unacknowledged pings. **Default:** `10`.
  * `maxSendHeaderBlockLength` {number} Sets the maximum allowed size for a
    serialized, compressed block of headers. Attempts to send headers that
    exceed this limit will result in a `'frameError'` event being emitted
    and the stream being closed and destroyed.
  * `paddingStrategy` {number} Strategy used for determining the amount of
    padding to use for `HEADERS` and `DATA` frames. **Default:**
    `http2.constants.PADDING_STRATEGY_NONE`. Value may be one of:
    * `http2.constants.PADDING_STRATEGY_NONE`: No padding is applied.
    * `http2.constants.PADDING_STRATEGY_MAX`: The maximum amount of padding,
      determined by the internal implementation, is applied.
    * `http2.constants.PADDING_STRATEGY_ALIGNED`: Attempts to apply enough
      padding to ensure that the total frame length, including the
      9-byte header, is a multiple of 8. For each frame, there is a maximum
      allowed number of padding bytes that is determined by current flow control
      state and settings. If this maximum is less than the calculated amount
      needed to ensure alignment, the maximum is used and the total frame length
      is not necessarily aligned at 8 bytes.
  * `peerMaxConcurrentStreams` {number} Sets the maximum number of concurrent
    streams for the remote peer as if a `SETTINGS` frame had been received. Will
    be overridden if the remote peer sets its own value for
    `maxConcurrentStreams`. **Default:** `100`.
  * `maxSessionInvalidFrames` {integer} Sets the maximum number of invalid
    frames that will be tolerated before the session is closed.
    **Default:** `1000`.
  * `maxSessionRejectedStreams` {integer} Sets the maximum number of rejected
    upon creation streams that will be tolerated before the session is closed.
    Each rejection is associated with an `NGHTTP2_ENHANCE_YOUR_CALM`
    error that should tell the peer to not open any more streams, continuing
    to open streams is therefore regarded as a sign of a misbehaving peer.
    **Default:** `100`.
  * `connectionWindowSize` {number} Sets the initial flow control window for
    each session, in bytes. This is the total amount of data the remote peer
    may send across all streams before it has to wait for a `WINDOW_UPDATE`.
    The equivalent per-stream limit is `settings.initialWindowSize`. The
    minimum allowed value is `1` and the maximum is 231-1. Values
    below 65535 will not take effect until the initial protocol-default
    window of 65535 has been used.
    **Default:** `65535`.
  * `settings` {HTTP/2 Settings Object} The initial settings to send to the
    remote peer upon connection.
  * `streamResetBurst` {number} and `streamResetRate` {number} Sets the rate
    limit for the incoming stream reset (RST\_STREAM frame). Both settings must
    be set to have any effect, and default to 1000 and 33 respectively.
  * `remoteCustomSettings` {Array} The array of integer values determines the
    settings types, which are included in the `customSettings`-property of the
    received remoteSettings. Please see the `customSettings`-property of the
    `Http2Settings` object for more information, on the allowed setting types.
  * `...options` {Object} Any `tls.createServer()` options can be provided.
    For servers, the identity options (`pfx` or `key`/`cert`) are usually required.
  * `origins` {string\[]} An array of origin strings to send within an `ORIGIN`
    frame immediately following creation of a new server `Http2Session`.
  * `unknownProtocolTimeout` {number} Specifies a timeout in milliseconds that
    a server should wait when an `'unknownProtocol'` event is emitted. If
    the socket has not been destroyed by that time the server will destroy it.
    **Default:** `10000`.
  * `strictFieldWhitespaceValidation` {boolean} If `true`, it turns on strict leading
    and trailing whitespace validation for HTTP/2 header field names and values
    as per RFC-9113.
    **Default:** `true`.
  * `strictSingleValueFields` {boolean} If `true`, strict validation is used
    for headers and trailers defined as having only a single value, such that
    an error is thrown if multiple values are provided.
    **Default:** `true`.
  * `http1Options` {Object} An options object for configuring the HTTP/1
    fallback when `allowHTTP1` is `true`. These options are passed to the
    underlying HTTP/1 server. See `http.createServer()` for available
    options. Among others, the following are supported:
    * `IncomingMessage` {http.IncomingMessage} Specifies the
      `IncomingMessage` class to use for HTTP/1 fallback.
      **Default:** `http.IncomingMessage`.
    * `ServerResponse` {http.ServerResponse} Specifies the `ServerResponse`
      class to use for HTTP/1 fallback.
      **Default:** `http.ServerResponse`.
    * `keepAliveTimeout` {number} The number of milliseconds of inactivity
      a server needs to wait for additional incoming data, after it has
      finished writing the last response, before a socket will be destroyed.
      **Default:** `5000`.
* `onRequestHandler` {Function} See Compatibility API
* Returns: {Http2SecureServer}

Returns a `tls.Server` instance that creates and manages `Http2Session`
instances.

```mjs
import { createSecureServer } from 'node:http2';
import { readFileSync } from 'node:fs';

const options = {
  key: readFileSync('server-key.pem'),
  cert: readFileSync('server-cert.pem'),
};

// Create a secure HTTP/2 server
const server = createSecureServer(options);

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443);
```

```cjs
const http2 = require('node:http2');
const fs = require('node:fs');

const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
};

// Create a secure HTTP/2 server
const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443);
```

### `http2.connect(authority, options)`

* `authority` {string|URL} The remote HTTP/2 server to connect to. This must
  be in the form of a minimal, valid URL with the `http://` or `https://`
  prefix, host name, and IP port (if a non-default port is used). Userinfo
  (user ID and password), path, querystring, and fragment details in the
  URL will be ignored.
* `options` {Object}
  * `maxDeflateDynamicTableSize` {number} Sets the maximum dynamic table size
    for deflating header fields. **Default:** `4Kib`.
  * `maxSettings` {number} Sets the maximum number of settings entries per
    `SETTINGS` frame. The minimum value allowed is `1`. **Default:** `32`.
  * `maxSessionMemory`{number} Sets the maximum memory that the `Http2Session`
    is permitted to use. The value is expressed in terms of number of megabytes,
    e.g. `1` equal 1 megabyte. The minimum value allowed is `1`.
    This is a credit based limit, existing `Http2Stream`s may cause this
    limit to be exceeded, but new `Http2Stream` instances will be rejected
    while this limit is exceeded. The current number of `Http2Stream` sessions,
    the current memory use of the header compression tables, header blocks
    retained by open streams, current data queued to be sent, inbound DATA
    frames retained by undrained streams, and unacknowledged `PING` and
    `SETTINGS` frames are all counted towards the current limit. When the limit
    is exceeded the session stops reading from the socket (applying
    backpressure) until the application consumes the queued data. **Default:**
    `10`.
  * `maxHeaderListPairs` {number} Sets the maximum number of header entries.
    This is similar to `server.maxHeadersCount` or
    `request.maxHeadersCount` in the `node:http` module. The minimum value
    is `1`. **Default:** `128`.
  * `maxOriginSetSize` {number} Sets the maximum number of uniq origin the sever
    can send via ORIGIN frames. **Default:** `128`.
  * `maxOutstandingPings` {number} Sets the maximum number of outstanding,
    unacknowledged pings. **Default:** `10`.
  * `maxReservedRemoteStreams` {number} Sets the maximum number of reserved push
    streams the client will accept at any given time. Once the current number of
    currently reserved push streams exceeds reaches this limit, new push streams
    sent by the server will be automatically rejected. The minimum allowed value
    is 0. The maximum allowed value is 232-1. A negative value sets
    this option to the maximum allowed value. **Default:** `200`.
  * `maxSendHeaderBlockLength` {number} Sets the maximum allowed size for a
    serialized, compressed block of headers. Attempts to send headers that
    exceed this limit will result in a `'frameError'` event being emitted
    and the stream being closed and destroyed.
  * `paddingStrategy` {number} Strategy used for determining the amount of
    padding to use for `HEADERS` and `DATA` frames. **Default:**
    `http2.constants.PADDING_STRATEGY_NONE`. Value may be one of:
    * `http2.constants.PADDING_STRATEGY_NONE`: No padding is applied.
    * `http2.constants.PADDING_STRATEGY_MAX`: The maximum amount of padding,
      determined by the internal implementation, is applied.
    * `http2.constants.PADDING_STRATEGY_ALIGNED`: Attempts to apply enough
      padding to ensure that the total frame length, including the
      9-byte header, is a multiple of 8. For each frame, there is a maximum
      allowed number of padding bytes that is determined by current flow control
      state and settings. If this maximum is less than the calculated amount
      needed to ensure alignment, the maximum is used and the total frame length
      is not necessarily aligned at 8 bytes.
  * `peerMaxConcurrentStreams` {number} Sets the maximum number of concurrent
    streams for the remote peer as if a `SETTINGS` frame had been received. Will
    be overridden if the remote peer sets its own value for
    `maxConcurrentStreams`. **Default:** `100`.
  * `protocol` {string} The protocol to connect with, if not set in the
    `authority`. Value may be either `'http:'` or `'https:'`. **Default:**
    `'https:'`
  * `connectionWindowSize` {number} Sets the initial flow control window for
    this session, in bytes. This is the total amount of data the remote peer
    may send across all streams before it has to wait for a `WINDOW_UPDATE`.
    The equivalent per-stream limit is `settings.initialWindowSize`. The
    minimum allowed value is `1` and the maximum is 231-1. Values
    below 65535 will not take effect until the initial protocol-default
    window of 65535 has been used.
    **Default:** `65535`.
  * `settings` {HTTP/2 Settings Object} The initial settings to send to the
    remote peer upon connection.
  * `remoteCustomSettings` {Array} The array of integer values determines the
    settings types, which are included in the `CustomSettings`-property of the
    received remoteSettings. Please see the `CustomSettings`-property of the
    `Http2Settings` object for more information, on the allowed setting types.
  * `createConnection` {Function} An optional callback that receives the `URL`
    instance passed to `connect` and the `options` object, and returns any
    `Duplex` stream that is to be used as the connection for this session.
  * `...options` {Object} Any `net.connect()` or `tls.connect()` options
    can be provided.
  * `unknownProtocolTimeout` {number} Specifies a timeout in milliseconds that
    a server should wait when an `'unknownProtocol'` event is emitted. If
    the socket has not been destroyed by that time the server will destroy it.
    **Default:** `10000`.
  * `strictFieldWhitespaceValidation` {boolean} If `true`, it turns on strict leading
    and trailing whitespace validation for HTTP/2 header field names and values
    as per RFC-9113.
    **Default:** `true`.
* `listener` {Function} Will be registered as a one-time listener of the
  `'connect'` event.
* Returns: {ClientHttp2Session}

Returns a `ClientHttp2Session` instance.

```mjs
import { connect } from 'node:http2';
const client = connect('https://localhost:1234');

/* Use the client */

client.close();
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('https://localhost:1234');

/* Use the client */

client.close();
```
