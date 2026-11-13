---
title: "HTTP/2 (part 10 of 15)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http2.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP/2 (part 10 of 15)

### `http2.constants`

#### Header name constants

The `HTTP2_HEADER_*` constants provide names for HTTP/2 pseudo-headers and
known HTTP header names. Using these string constants is optional. For example,
`http2.constants.HTTP2_HEADER_CONTENT_TYPE` is equal to `'content-type'`.
For APIs that accept regular header names,
`http2.constants.HTTP2_HEADER_CONTENT_TYPE`, `'content-type'`, and
`'Content-Type'` have the same effect; Node.js serializes the name in
lower-case.

Regular header constants can be used with the compatibility API wherever the
corresponding literal header name is accepted. In compatibility API request
handlers, prefer `request.method`, `request.authority`, `request.scheme`, and
`request.url` for the corresponding pseudo-headers. Other incoming
pseudo-headers remain available through `request.headers`. Set response status
through `response.statusCode` or the `statusCode` argument to
`response.writeHead()`. Passing `HTTP2_HEADER_STATUS` (`':status'`) to
`response.setHeader()` or in `response.writeHead()`'s headers object throws
`ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED`. `HTTP2_HEADER_PROTOCOL` is a request
pseudo-header and cannot be sent in a response.

Incoming header object keys are lower-case, so use a constant or a lower-case
literal when accessing them as object properties. Using a constant does not
change header validation, and the availability of a constant does not imply
that the header is valid in every HTTP/2 context. See HTTP/2 Headers Object
and Invalid character handling in header names and values for details about
header casing and validation.

##### Pseudo-header constants

`HTTP2_HEADER_METHOD`, `HTTP2_HEADER_AUTHORITY`, `HTTP2_HEADER_SCHEME`, and
`HTTP2_HEADER_PATH` identify request pseudo-headers. `HTTP2_HEADER_STATUS`
identifies the response pseudo-header. `HTTP2_HEADER_PROTOCOL` identifies the
extended `CONNECT` request pseudo-header. Pseudo-headers are not permitted in
trailers.

| Constant                                 | Value          |
| ---------------------------------------- | -------------- |
| `http2.constants.HTTP2_HEADER_STATUS`    | `':status'`    |
| `http2.constants.HTTP2_HEADER_METHOD`    | `':method'`    |
| `http2.constants.HTTP2_HEADER_AUTHORITY` | `':authority'` |
| `http2.constants.HTTP2_HEADER_SCHEME`    | `':scheme'`    |
| `http2.constants.HTTP2_HEADER_PATH`      | `':path'`      |
| `http2.constants.HTTP2_HEADER_PROTOCOL`  | `':protocol'`  |

##### Regular header constants

The `HTTP2_HEADER_CONNECTION`, `HTTP2_HEADER_UPGRADE`,
`HTTP2_HEADER_HTTP2_SETTINGS`, `HTTP2_HEADER_KEEP_ALIVE`,
`HTTP2_HEADER_PROXY_CONNECTION`, and `HTTP2_HEADER_TRANSFER_ENCODING`
constants identify connection-specific headers that HTTP/2 does not permit.
`HTTP2_HEADER_TE` is permitted only when its value is `'trailers'`.

| Constant                                                        | Value                                |
| --------------------------------------------------------------- | ------------------------------------ |
| `http2.constants.HTTP2_HEADER_ACCEPT_ENCODING`                  | `'accept-encoding'`                  |
| `http2.constants.HTTP2_HEADER_ACCEPT_LANGUAGE`                  | `'accept-language'`                  |
| `http2.constants.HTTP2_HEADER_ACCEPT_RANGES`                    | `'accept-ranges'`                    |
| `http2.constants.HTTP2_HEADER_ACCEPT`                           | `'accept'`                           |
| `http2.constants.HTTP2_HEADER_ACCESS_CONTROL_ALLOW_CREDENTIALS` | `'access-control-allow-credentials'` |
| `http2.constants.HTTP2_HEADER_ACCESS_CONTROL_ALLOW_HEADERS`     | `'access-control-allow-headers'`     |
| `http2.constants.HTTP2_HEADER_ACCESS_CONTROL_ALLOW_METHODS`     | `'access-control-allow-methods'`     |
| `http2.constants.HTTP2_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN`      | `'access-control-allow-origin'`      |
| `http2.constants.HTTP2_HEADER_ACCESS_CONTROL_EXPOSE_HEADERS`    | `'access-control-expose-headers'`    |
| `http2.constants.HTTP2_HEADER_ACCESS_CONTROL_REQUEST_HEADERS`   | `'access-control-request-headers'`   |
| `http2.constants.HTTP2_HEADER_ACCESS_CONTROL_REQUEST_METHOD`    | `'access-control-request-method'`    |
| `http2.constants.HTTP2_HEADER_AGE`                              | `'age'`                              |
| `http2.constants.HTTP2_HEADER_AUTHORIZATION`                    | `'authorization'`                    |
| `http2.constants.HTTP2_HEADER_CACHE_CONTROL`                    | `'cache-control'`                    |
| `http2.constants.HTTP2_HEADER_CONNECTION`                       | `'connection'`                       |
| `http2.constants.HTTP2_HEADER_CONTENT_DISPOSITION`              | `'content-disposition'`              |
| `http2.constants.HTTP2_HEADER_CONTENT_ENCODING`                 | `'content-encoding'`                 |
| `http2.constants.HTTP2_HEADER_CONTENT_LENGTH`                   | `'content-length'`                   |
| `http2.constants.HTTP2_HEADER_CONTENT_TYPE`                     | `'content-type'`                     |
| `http2.constants.HTTP2_HEADER_COOKIE`                           | `'cookie'`                           |
| `http2.constants.HTTP2_HEADER_DATE`                             | `'date'`                             |
| `http2.constants.HTTP2_HEADER_ETAG`                             | `'etag'`                             |
| `http2.constants.HTTP2_HEADER_FORWARDED`                        | `'forwarded'`                        |
| `http2.constants.HTTP2_HEADER_HOST`                             | `'host'`                             |
| `http2.constants.HTTP2_HEADER_IF_MODIFIED_SINCE`                | `'if-modified-since'`                |
| `http2.constants.HTTP2_HEADER_IF_NONE_MATCH`                    | `'if-none-match'`                    |
| `http2.constants.HTTP2_HEADER_IF_RANGE`                         | `'if-range'`                         |
| `http2.constants.HTTP2_HEADER_LAST_MODIFIED`                    | `'last-modified'`                    |
| `http2.constants.HTTP2_HEADER_LINK`                             | `'link'`                             |
| `http2.constants.HTTP2_HEADER_LOCATION`                         | `'location'`                         |
| `http2.constants.HTTP2_HEADER_RANGE`                            | `'range'`                            |
| `http2.constants.HTTP2_HEADER_REFERER`                          | `'referer'`                          |
| `http2.constants.HTTP2_HEADER_SERVER`                           | `'server'`                           |
| `http2.constants.HTTP2_HEADER_SET_COOKIE`                       | `'set-cookie'`                       |
| `http2.constants.HTTP2_HEADER_STRICT_TRANSPORT_SECURITY`        | `'strict-transport-security'`        |
| `http2.constants.HTTP2_HEADER_TRANSFER_ENCODING`                | `'transfer-encoding'`                |
| `http2.constants.HTTP2_HEADER_TE`                               | `'te'`                               |
| `http2.constants.HTTP2_HEADER_UPGRADE_INSECURE_REQUESTS`        | `'upgrade-insecure-requests'`        |
| `http2.constants.HTTP2_HEADER_UPGRADE`                          | `'upgrade'`                          |
| `http2.constants.HTTP2_HEADER_USER_AGENT`                       | `'user-agent'`                       |
| `http2.constants.HTTP2_HEADER_VARY`                             | `'vary'`                             |
| `http2.constants.HTTP2_HEADER_X_CONTENT_TYPE_OPTIONS`           | `'x-content-type-options'`           |
| `http2.constants.HTTP2_HEADER_X_FRAME_OPTIONS`                  | `'x-frame-options'`                  |
| `http2.constants.HTTP2_HEADER_KEEP_ALIVE`                       | `'keep-alive'`                       |
| `http2.constants.HTTP2_HEADER_PROXY_CONNECTION`                 | `'proxy-connection'`                 |
| `http2.constants.HTTP2_HEADER_X_XSS_PROTECTION`                 | `'x-xss-protection'`                 |
| `http2.constants.HTTP2_HEADER_ALT_SVC`                          | `'alt-svc'`                          |
| `http2.constants.HTTP2_HEADER_CONTENT_SECURITY_POLICY`          | `'content-security-policy'`          |
| `http2.constants.HTTP2_HEADER_EARLY_DATA`                       | `'early-data'`                       |
| `http2.constants.HTTP2_HEADER_EXPECT_CT`                        | `'expect-ct'`                        |
| `http2.constants.HTTP2_HEADER_ORIGIN`                           | `'origin'`                           |
| `http2.constants.HTTP2_HEADER_PURPOSE`                          | `'purpose'`                          |
| `http2.constants.HTTP2_HEADER_TIMING_ALLOW_ORIGIN`              | `'timing-allow-origin'`              |
| `http2.constants.HTTP2_HEADER_X_FORWARDED_FOR`                  | `'x-forwarded-for'`                  |
| `http2.constants.HTTP2_HEADER_PRIORITY`                         | `'priority'`                         |
| `http2.constants.HTTP2_HEADER_ACCEPT_CHARSET`                   | `'accept-charset'`                   |
| `http2.constants.HTTP2_HEADER_ACCESS_CONTROL_MAX_AGE`           | `'access-control-max-age'`           |
| `http2.constants.HTTP2_HEADER_ALLOW`                            | `'allow'`                            |
| `http2.constants.HTTP2_HEADER_CONTENT_LANGUAGE`                 | `'content-language'`                 |
| `http2.constants.HTTP2_HEADER_CONTENT_LOCATION`                 | `'content-location'`                 |
| `http2.constants.HTTP2_HEADER_CONTENT_MD5`                      | `'content-md5'`                      |
| `http2.constants.HTTP2_HEADER_CONTENT_RANGE`                    | `'content-range'`                    |
| `http2.constants.HTTP2_HEADER_DNT`                              | `'dnt'`                              |
| `http2.constants.HTTP2_HEADER_EXPECT`                           | `'expect'`                           |
| `http2.constants.HTTP2_HEADER_EXPIRES`                          | `'expires'`                          |
| `http2.constants.HTTP2_HEADER_FROM`                             | `'from'`                             |
| `http2.constants.HTTP2_HEADER_IF_MATCH`                         | `'if-match'`                         |
| `http2.constants.HTTP2_HEADER_IF_UNMODIFIED_SINCE`              | `'if-unmodified-since'`              |
| `http2.constants.HTTP2_HEADER_MAX_FORWARDS`                     | `'max-forwards'`                     |
| `http2.constants.HTTP2_HEADER_PREFER`                           | `'prefer'`                           |
| `http2.constants.HTTP2_HEADER_PROXY_AUTHENTICATE`               | `'proxy-authenticate'`               |
| `http2.constants.HTTP2_HEADER_PROXY_AUTHORIZATION`              | `'proxy-authorization'`              |
| `http2.constants.HTTP2_HEADER_REFRESH`                          | `'refresh'`                          |
| `http2.constants.HTTP2_HEADER_RETRY_AFTER`                      | `'retry-after'`                      |
| `http2.constants.HTTP2_HEADER_TRAILER`                          | `'trailer'`                          |
| `http2.constants.HTTP2_HEADER_TK`                               | `'tk'`                               |
| `http2.constants.HTTP2_HEADER_VIA`                              | `'via'`                              |
| `http2.constants.HTTP2_HEADER_WARNING`                          | `'warning'`                          |
| `http2.constants.HTTP2_HEADER_WWW_AUTHENTICATE`                 | `'www-authenticate'`                 |
| `http2.constants.HTTP2_HEADER_HTTP2_SETTINGS`                   | `'http2-settings'`                   |

#### Error codes for `RST_STREAM` and `GOAWAY`

| Value  | Name                | Constant                                      |
| ------ | ------------------- | --------------------------------------------- |
| `0x00` | No Error            | `http2.constants.NGHTTP2_NO_ERROR`            |
| `0x01` | Protocol Error      | `http2.constants.NGHTTP2_PROTOCOL_ERROR`      |
| `0x02` | Internal Error      | `http2.constants.NGHTTP2_INTERNAL_ERROR`      |
| `0x03` | Flow Control Error  | `http2.constants.NGHTTP2_FLOW_CONTROL_ERROR`  |
| `0x04` | Settings Timeout    | `http2.constants.NGHTTP2_SETTINGS_TIMEOUT`    |
| `0x05` | Stream Closed       | `http2.constants.NGHTTP2_STREAM_CLOSED`       |
| `0x06` | Frame Size Error    | `http2.constants.NGHTTP2_FRAME_SIZE_ERROR`    |
| `0x07` | Refused Stream      | `http2.constants.NGHTTP2_REFUSED_STREAM`      |
| `0x08` | Cancel              | `http2.constants.NGHTTP2_CANCEL`              |
| `0x09` | Compression Error   | `http2.constants.NGHTTP2_COMPRESSION_ERROR`   |
| `0x0a` | Connect Error       | `http2.constants.NGHTTP2_CONNECT_ERROR`       |
| `0x0b` | Enhance Your Calm   | `http2.constants.NGHTTP2_ENHANCE_YOUR_CALM`   |
| `0x0c` | Inadequate Security | `http2.constants.NGHTTP2_INADEQUATE_SECURITY` |
| `0x0d` | HTTP/1.1 Required   | `http2.constants.NGHTTP2_HTTP_1_1_REQUIRED`   |

The `'timeout'` event is emitted when there is no activity on the Server for
a given number of milliseconds set using `http2server.setTimeout()`.

### `http2.getDefaultSettings()`

* Returns: {HTTP/2 Settings Object}

Returns an object containing the default settings for an `Http2Session`
instance. This method returns a new object instance every time it is called
so instances returned may be safely modified for use.

### `http2.getPackedSettings([settings])`

* `settings` {HTTP/2 Settings Object}
* Returns: {Buffer}

Returns a `Buffer` instance containing serialized representation of the given
HTTP/2 settings as specified in the HTTP/2 specification. This is intended
for use with the `HTTP2-Settings` header field.

```mjs
import { getPackedSettings } from 'node:http2';

const packed = getPackedSettings({ enablePush: false });

console.log(packed.toString('base64'));
// Prints: AAIAAAAA
```

```cjs
const http2 = require('node:http2');

const packed = http2.getPackedSettings({ enablePush: false });

console.log(packed.toString('base64'));
// Prints: AAIAAAAA
```

### `http2.getUnpackedSettings(buf)`

* `buf` {Buffer|TypedArray} The packed settings.
* Returns: {HTTP/2 Settings Object}

Returns a HTTP/2 Settings Object containing the deserialized settings from
the given `Buffer` as generated by `http2.getPackedSettings()`.

### `http2.performServerHandshake(socket[, options])`

* `socket` {stream.Duplex}
* `options` {Object} Any `http2.createServer()` option can be provided.
* Returns: {ServerHttp2Session}

Create an HTTP/2 server session from an existing socket.

### `http2.sensitiveHeaders`

* Type: {symbol}

This symbol can be set as a property on the HTTP/2 headers object with an array
value in order to provide a list of headers considered sensitive.
See Sensitive headers for more details.
