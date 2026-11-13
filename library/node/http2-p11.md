---
title: "HTTP/2 (part 11 of 15)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http2.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP/2 (part 11 of 15)

### Headers object

Headers are represented as own-properties on JavaScript objects. The property
keys will be serialized to lower-case. Property values should be strings (if
they are not they will be coerced to strings) or an `Array` of strings (in order
to send more than one value per header field).

```js
const headers = {
  ':status': '200',
  'content-type': 'text-plain',
  'ABC': ['has', 'more', 'than', 'one', 'value'],
};

stream.respond(headers);
```

Header objects passed to callback functions will have a `null` prototype. This
means that normal JavaScript object methods such as
`Object.prototype.toString()` and `Object.prototype.hasOwnProperty()` will
not work.

For incoming headers:

* The `:status` header is converted to `number`.
* Duplicates of `:status`, `:method`, `:authority`, `:scheme`, `:path`,
  `:protocol`, `age`, `authorization`, `access-control-allow-credentials`,
  `access-control-max-age`, `access-control-request-method`, `content-encoding`,
  `content-language`, `content-length`, `content-location`, `content-md5`,
  `content-range`, `content-type`, `date`, `dnt`, `etag`, `expires`, `from`,
  `host`, `if-match`, `if-modified-since`, `if-none-match`, `if-range`,
  `if-unmodified-since`, `last-modified`, `location`, `max-forwards`,
  `proxy-authorization`, `range`, `referer`,`retry-after`, `tk`,
  `upgrade-insecure-requests`, `user-agent` or `x-content-type-options` are
  discarded.
* `set-cookie` is always an array. Duplicates are added to the array.
* For duplicate `cookie` headers, the values are joined together with '; '.
* For all other headers, the values are joined together with ', '.

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream, headers) => {
  console.log(headers[':path']);
  console.log(headers.ABC);
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream, headers) => {
  console.log(headers[':path']);
  console.log(headers.ABC);
});
```

#### Raw headers

In some APIs, in addition to object format, headers can also be passed or
accessed as a raw flat array, preserving details of ordering and
duplicate keys to match the raw transmission format.

In this format the keys and values are in the same list. It is _not_ a
list of tuples. So, the even-numbered offsets are key values, and the
odd-numbered offsets are the associated values. Duplicate headers are
not merged and so each key-value pair will appear separately.

This can be useful for cases such as proxies, where existing headers
should be exactly forwarded as received, or as a performance
optimization when the headers are already available in raw format.

```js
const rawHeaders = [
  ':status',
  '404',
  'content-type',
  'text/plain',
];

stream.respond(rawHeaders);
```

#### Sensitive headers

HTTP2 headers can be marked as sensitive, which means that the HTTP/2
header compression algorithm will never index them. This can make sense for
header values with low entropy and that may be considered valuable to an
attacker, for example `Cookie` or `Authorization`. To achieve this, add
the header name to the `[http2.sensitiveHeaders]` property as an array:

```js
const headers = {
  ':status': '200',
  'content-type': 'text-plain',
  'cookie': 'some-cookie',
  'other-sensitive-header': 'very secret data',
  [http2.sensitiveHeaders]: ['cookie', 'other-sensitive-header'],
};

stream.respond(headers);
```

For some headers, such as `Authorization` and short `Cookie` headers,
this flag is set automatically.

This property is also set for received headers. It will contain the names of
all headers marked as sensitive, including ones marked that way automatically.

For raw headers, this should still be set as a property on the array, like
`rawHeadersArray[http2.sensitiveHeaders] = ['cookie']`, not as a separate key
and value pair within the array itself.

### Settings object

The `http2.getDefaultSettings()`, `http2.getPackedSettings()`,
`http2.createServer()`, `http2.createSecureServer()`,
`http2session.settings()`, `http2session.localSettings`, and
`http2session.remoteSettings` APIs either return or receive as input an
object that defines configuration settings for an `Http2Session` object.
These objects are ordinary JavaScript objects containing the following
properties.

* `headerTableSize` {number} Specifies the maximum number of bytes used for
  header compression. The minimum allowed value is 0. The maximum allowed value
  is 232-1. **Default:** `4096`.
* `enablePush` {boolean} Specifies `true` if HTTP/2 Push Streams are to be
  permitted on the `Http2Session` instances. **Default:** `true`.
* `initialWindowSize` {number} Specifies the _sender's_ initial window size in
  bytes for stream-level flow control. The minimum allowed value is 0. The
  maximum allowed value is 232-1. **Default:** `65535`.
  This is a per-stream limit; the window for the connection as a whole is
  configured separately with the `connectionWindowSize` option of
  `http2.createServer()` or `http2.connect()`.
* `maxFrameSize` {number} Specifies the size in bytes of the largest frame
  payload. The minimum allowed value is 16,384. The maximum allowed value is
  224-1. **Default:** `16384`.
* `maxConcurrentStreams` {number} Specifies the maximum number of concurrent
  streams permitted on an `Http2Session`. There is no default value which
  implies, at least theoretically, 232-1 streams may be open
  concurrently at any given time in an `Http2Session`. The minimum value
  is 0. The maximum allowed value is 232-1. **Default:**
  `4294967295`.
* `maxHeaderListSize` {number} Specifies the maximum size (uncompressed octets)
  of header list that will be accepted. The minimum allowed value is 0. The
  maximum allowed value is 232-1. **Default:** `65535`.
* `maxHeaderSize` {number} Alias for `maxHeaderListSize`.
* `enableConnectProtocol`{boolean} Specifies `true` if the "Extended Connect
  Protocol" defined by RFC 8441 is to be enabled. This setting is only
  meaningful if sent by the server. Once the `enableConnectProtocol` setting
  has been enabled for a given `Http2Session`, it cannot be disabled.
  **Default:** `false`.
* `customSettings` {Object} Specifies additional settings, yet not implemented
  in node and the underlying libraries. The key of the object defines the
  numeric value of the settings type (as defined in the "HTTP/2 SETTINGS"
  registry established by \[RFC 7540]) and the values the actual numeric value
  of the settings.
  The settings type has to be an integer in the range from 1 to 2^16-1.
  It should not be a settings type already handled by node, i.e. currently
  it should be greater than 6, although it is not an error.
  The values need to be unsigned integers in the range from 0 to 2^32-1.
  Currently, a maximum of up 10 custom settings is supported.
  It is only supported for sending SETTINGS, or for receiving settings values
  specified in the `remoteCustomSettings` options of the server or client
  object. Do not mix the `customSettings`-mechanism for a settings id with
  interfaces for the natively handled settings, in case a setting becomes
  natively supported in a future node version.

All additional properties on the settings object are ignored.

### Error handling

There are several types of error conditions that may arise when using the
`node:http2` module:

Validation errors occur when an incorrect argument, option, or setting value is
passed in. These will always be reported by a synchronous `throw`.

State errors occur when an action is attempted at an incorrect time (for
instance, attempting to send data on a stream after it has closed). These will
be reported using either a synchronous `throw` or via an `'error'` event on
the `Http2Stream`, `Http2Session` or HTTP/2 Server objects, depending on where
and when the error occurs.

Internal errors occur when an HTTP/2 session fails unexpectedly. These will be
reported via an `'error'` event on the `Http2Session` or HTTP/2 Server objects.

Protocol errors occur when various HTTP/2 protocol constraints are violated.
These will be reported using either a synchronous `throw` or via an `'error'`
event on the `Http2Stream`, `Http2Session` or HTTP/2 Server objects, depending
on where and when the error occurs.

### Invalid character handling in header names and values

The HTTP/2 implementation applies stricter handling of invalid characters in
HTTP header names and values than the HTTP/1 implementation.

Header field names are _case-insensitive_ and are transmitted over the wire
strictly as lower-case strings. The API provided by Node.js allows header
names to be set as mixed-case strings (e.g. `Content-Type`) but will convert
those to lower-case (e.g. `content-type`) upon transmission.

Header field-names _must only_ contain one or more of the following ASCII
characters: `a`-`z`, `A`-`Z`, `0`-`9`, `!`, `#`, `$`, `%`, `&`, `'`, `*`, `+`,
`-`, `.`, `^`, `_`, `` ` `` (backtick), `|`, and `~`.

Using invalid characters within an HTTP header field name will cause the
stream to be closed with a protocol error being reported.

Header field values are handled with more leniency but _should_ not contain
new-line or carriage return characters and _should_ be limited to US-ASCII
characters, per the requirements of the HTTP specification.

### Push streams on the client

To receive pushed streams on the client, set a listener for the `'stream'`
event on the `ClientHttp2Session`:

```mjs
import { connect } from 'node:http2';

const client = connect('http://localhost');

client.on('stream', (pushedStream, requestHeaders) => {
  pushedStream.on('push', (responseHeaders) => {
    // Process response headers
  });
  pushedStream.on('data', (chunk) => { /* handle pushed data */ });
});

const req = client.request({ ':path': '/' });
```

```cjs
const http2 = require('node:http2');

const client = http2.connect('http://localhost');

client.on('stream', (pushedStream, requestHeaders) => {
  pushedStream.on('push', (responseHeaders) => {
    // Process response headers
  });
  pushedStream.on('data', (chunk) => { /* handle pushed data */ });
});

const req = client.request({ ':path': '/' });
```

### Supporting the `CONNECT` method

The `CONNECT` method is used to allow an HTTP/2 server to be used as a proxy
for TCP/IP connections.

A simple TCP Server:

```mjs
import { createServer } from 'node:net';

const server = createServer((socket) => {
  let name = '';
  socket.setEncoding('utf8');
  socket.on('data', (chunk) => name += chunk);
  socket.on('end', () => socket.end(`hello ${name}`));
});

server.listen(8000);
```

```cjs
const net = require('node:net');

const server = net.createServer((socket) => {
  let name = '';
  socket.setEncoding('utf8');
  socket.on('data', (chunk) => name += chunk);
  socket.on('end', () => socket.end(`hello ${name}`));
});

server.listen(8000);
```

An HTTP/2 CONNECT proxy:

```mjs
import { createServer, constants } from 'node:http2';
const { NGHTTP2_REFUSED_STREAM, NGHTTP2_CONNECT_ERROR } = constants;
import { connect } from 'node:net';

const proxy = createServer();
proxy.on('stream', (stream, headers) => {
  if (headers[':method'] !== 'CONNECT') {
    // Only accept CONNECT requests
    stream.close(NGHTTP2_REFUSED_STREAM);
    return;
  }
  const auth = new URL(`tcp://${headers[':authority']}`);
  // It's a very good idea to verify that hostname and port are
  // things this proxy should be connecting to.
  const socket = connect(auth.port, auth.hostname, () => {
    stream.respond();
    socket.pipe(stream);
    stream.pipe(socket);
  });
  socket.on('error', (error) => {
    stream.close(NGHTTP2_CONNECT_ERROR);
  });
});

proxy.listen(8001);
```

```cjs
const http2 = require('node:http2');
const { NGHTTP2_REFUSED_STREAM } = http2.constants;
const net = require('node:net');

const proxy = http2.createServer();
proxy.on('stream', (stream, headers) => {
  if (headers[':method'] !== 'CONNECT') {
    // Only accept CONNECT requests
    stream.close(NGHTTP2_REFUSED_STREAM);
    return;
  }
  const auth = new URL(`tcp://${headers[':authority']}`);
  // It's a very good idea to verify that hostname and port are
  // things this proxy should be connecting to.
  const socket = net.connect(auth.port, auth.hostname, () => {
    stream.respond();
    socket.pipe(stream);
    stream.pipe(socket);
  });
  socket.on('error', (error) => {
    stream.close(http2.constants.NGHTTP2_CONNECT_ERROR);
  });
});

proxy.listen(8001);
```

An HTTP/2 CONNECT client:

```mjs
import { connect, constants } from 'node:http2';

const client = connect('http://localhost:8001');

// Must not specify the ':path' and ':scheme' headers
// for CONNECT requests or an error will be thrown.
const req = client.request({
  ':method': 'CONNECT',
  ':authority': 'localhost:8000',
});

req.on('response', (headers) => {
  console.log(headers[constants.HTTP2_HEADER_STATUS]);
});
let data = '';
req.setEncoding('utf8');
req.on('data', (chunk) => data += chunk);
req.on('end', () => {
  console.log(`The server says: ${data}`);
  client.close();
});
req.end('Jane');
```

```cjs
const http2 = require('node:http2');

const client = http2.connect('http://localhost:8001');

// Must not specify the ':path' and ':scheme' headers
// for CONNECT requests or an error will be thrown.
const req = client.request({
  ':method': 'CONNECT',
  ':authority': 'localhost:8000',
});

req.on('response', (headers) => {
  console.log(headers[http2.constants.HTTP2_HEADER_STATUS]);
});
let data = '';
req.setEncoding('utf8');
req.on('data', (chunk) => data += chunk);
req.on('end', () => {
  console.log(`The server says: ${data}`);
  client.close();
});
req.end('Jane');
```
