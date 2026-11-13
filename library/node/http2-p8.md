---
title: "HTTP/2 (part 8 of 15)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http2.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP/2 (part 8 of 15)

### `http2.createServer(options)`

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
    is `4`. **Default:** `128`.
  * `maxOutstandingPings` {number} Sets the maximum number of outstanding,
    unacknowledged pings. **Default:** `10`.
  * `maxSendHeaderBlockLength` {number} Sets the maximum allowed size for a
    serialized, compressed block of headers. Attempts to send headers that
    exceed this limit will result in a `'frameError'` event being emitted
    and the stream being closed and destroyed.
    While this sets the maximum allowed size to the entire block of headers,
    `nghttp2` (the internal http2 library) has a limit of `65536`
    for each decompressed key/value pair.
  * `paddingStrategy` {number} The strategy used for determining the amount of
    padding to use for `HEADERS` and `DATA` frames. **Default:**
    `http2.constants.PADDING_STRATEGY_NONE`. Value may be one of:
    * `http2.constants.PADDING_STRATEGY_NONE`: No padding is applied.
    * `http2.constants.PADDING_STRATEGY_MAX`: The maximum amount of padding,
      determined by the internal implementation, is applied.
    * `http2.constants.PADDING_STRATEGY_ALIGNED`: Attempts to apply enough
      padding to ensure that the total frame length, including the 9-byte
      header, is a multiple of 8. For each frame, there is a maximum allowed
      number of padding bytes that is determined by current flow control state
      and settings. If this maximum is less than the calculated amount needed to
      ensure alignment, the maximum is used and the total frame length is not
      necessarily aligned at 8 bytes.
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
  * `settings` {HTTP/2 Settings Object} The initial settings to send to the
    remote peer upon connection.
  * `streamResetBurst` {number} and `streamResetRate` {number} Sets the rate
    limit for the incoming stream reset (RST\_STREAM frame). Both settings must
    be set to have any effect, and default to 1000 and 33 respectively.
  * `remoteCustomSettings` {Array} The array of integer values determines the
    settings types, which are included in the `CustomSettings`-property of
    the received remoteSettings. Please see the `CustomSettings`-property of
    the `Http2Settings` object for more information,
    on the allowed setting types.
  * `Http1IncomingMessage` {http.IncomingMessage} Specifies the
    `IncomingMessage` class to used for HTTP/1 fallback. Useful for extending
    the original `http.IncomingMessage`. **Default:** `http.IncomingMessage`.
    **Deprecated.** Use `http1Options.IncomingMessage` instead. See
    DEP0202.
  * `Http1ServerResponse` {http.ServerResponse} Specifies the `ServerResponse`
    class to used for HTTP/1 fallback. Useful for extending the original
    `http.ServerResponse`. **Default:** `http.ServerResponse`.
    **Deprecated.** Use `http1Options.ServerResponse` instead. See
    DEP0202.
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
  * `Http2ServerRequest` {http2.Http2ServerRequest} Specifies the
    `Http2ServerRequest` class to use.
    Useful for extending the original `Http2ServerRequest`.
    **Default:** `Http2ServerRequest`.
  * `Http2ServerResponse` {http2.Http2ServerResponse} Specifies the
    `Http2ServerResponse` class to use.
    Useful for extending the original `Http2ServerResponse`.
    **Default:** `Http2ServerResponse`.
  * `unknownProtocolTimeout` {number} Specifies a timeout in milliseconds that
    a server should wait when an `'unknownProtocol'` is emitted. If the
    socket has not been destroyed by that time the server will destroy it.
    **Default:** `10000`.
  * `strictFieldWhitespaceValidation` {boolean} If `true`, it turns on strict leading
    and trailing whitespace validation for HTTP/2 header field names and values
    as per RFC-9113.
    **Default:** `true`.
  * `strictSingleValueFields` {boolean} If `true`, strict validation is used
    for headers and trailers defined as having only a single value, such that
    an error is thrown if multiple values are provided.
    **Default:** `true`.
  * `...options` {Object} Any `net.createServer()` option can be provided.
* `onRequestHandler` {Function} See Compatibility API
* Returns: {Http2Server}

Returns a `net.Server` instance that creates and manages `Http2Session`
instances.

Since there are no browsers known that support
unencrypted HTTP/2, the use of
`http2.createSecureServer()` is necessary when communicating
with browser clients.

```mjs
import { createServer } from 'node:http2';

// Create an unencrypted HTTP/2 server.
// Since there are no browsers known that support
// unencrypted HTTP/2, the use of `createSecureServer()`
// is necessary when communicating with browser clients.
const server = createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8000);
```

```cjs
const http2 = require('node:http2');

// Create an unencrypted HTTP/2 server.
// Since there are no browsers known that support
// unencrypted HTTP/2, the use of `http2.createSecureServer()`
// is necessary when communicating with browser clients.
const server = http2.createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8000);
```
