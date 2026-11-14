---
title: "HTTP (part 10 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 10 of 12)

## `http.request(url, options)`

* `url` {string | URL}
* `options` {Object}
  * `agent` {http.Agent | boolean} Controls `Agent` behavior. Possible
    values:
    * `undefined` (default): use `http.globalAgent` for this host and port.
    * `Agent` object: explicitly use the passed in `Agent`.
    * `false`: causes a new `Agent` with default values to be used.
  * `auth` {string} Basic <example-value> (`'<example-value>'`) to compute an
    Authorization header.
  * `createConnection` {Function} A function that produces a socket/stream to
    use for the request when the `agent` option is not used. This can be used to
    avoid creating a custom `Agent` class just to override the default
    `createConnection` function. See `agent.createConnection()` for more
    details. Any `Duplex` stream is a valid return value.
  * `defaultPort` {number} Default port for the protocol. **Default:**
    `agent.defaultPort` if an `Agent` is used, else `undefined`.
  * `family` {number} IP address family to use when resolving `host` or
    `hostname`. Valid values are `4` or `6`. When unspecified, both IP v4 and
    v6 will be used.
  * `headers` {Object|Array} An object or an array of strings containing request
    headers. The array is in the same format as `message.rawHeaders`.
  * `hints` {number} Optional `dns.lookup()` hints.
  * `host` {string} A domain name or IP address of the server to issue the
    request to. **Default:** `'localhost'`.
  * `hostname` {string} Alias for `host`. To support `url.parse()`,
    `hostname` will be used if both `host` and `hostname` are specified.
  * `httpValidation` {string} Controls HTTP header value validation strictness
    for outgoing requests. Accepted values are:
    * `'strict'`: Strictest validation; rejects any non-ASCII or control
      characters in header values.
    * `'relaxed'`: Allows a limited set of non-ASCII characters in header
      values, aligning with the
      Fetch specification.
    * `'insecure'`: Disables all header value validation (equivalent to
      `insecureHTTPParser: true`).
      Cannot be used together with `insecureHTTPParser`. **Default:** `'strict'`.
  * `insecureHTTPParser` {boolean} If set to `true`, it will use an HTTP parser
    with leniency flags enabled. Using the insecure parser should be avoided.
    See `--insecure-http-parser` for more information.
    **Default:** `false`
  * `joinDuplicateHeaders` {boolean} It joins the field line values of
    multiple headers in a request with `, ` instead of discarding
    the duplicates. See `message.headers` for more information.
    **Default:** `false`.
  * `localAddress` {string} Local interface to bind for network connections.
  * `localPort` {number} Local port to connect from.
  * `lookup` {Function} Custom lookup function. **Default:** `dns.lookup()`.
  * `maxHeaderSize` {number} Optionally overrides the value of
    `--max-http-header-size` (the maximum length of response headers in
    bytes) for responses received from the server.
    **Default:** 16384 (16 KiB).
  * `method` {string} A string specifying the HTTP request method. **Default:**
    `'GET'`.
  * `path` {string} Request path. Should include query string if any.
    E.G. `'/index.html?page=12'`. An exception is thrown when the request path
    contains illegal characters. Currently, only spaces are rejected but that
    may change in the future. **Default:** `'/'`.
    The content in `path` is sent as the request target in the HTTP 1.1 message.
    When `path` is an absolute URL, this means the request target in the message in absolute form.
    If the receiving server is a proxy, the server typically forwards the request to the
    destination specified in the request target, and ignores the `Host` header.
    The user needs to make sure that `path`, `host` and the Host headers conform to the
    requirement of the request target in the HTTP specification.
    When the receiving server is known to be a proxy because the request is routed through
    Built-in Proxy Support, `http.request` will additionally perform a best-effort
    check to see that the `host` option or `Host` in `headers` agrees with the authority
    in `path` during the initial construction of the request. It gives up rewriting the
    request target for proxying and throws an error if they don't match at request
    construction time, though there won't be checks for later header mutations done by the user.
  * `port` {number} Port of remote server. **Default:** `defaultPort` if set,
    else `80`.
  * `protocol` {string} Protocol to use. **Default:** `'http:'`.
  * `setDefaultHeaders` {boolean}: Specifies whether or not to automatically add
    default headers such as `Connection`, `Content-Length`, `Transfer-Encoding`,
    and `Host`. If set to `false` then all necessary headers must be added
    manually. Defaults to `true`.
  * `setHost` {boolean}: Specifies whether or not to automatically add the
    `Host` header. If provided, this overrides `setDefaultHeaders`. Defaults to
    `true`.
  * `signal` {AbortSignal}: An AbortSignal that may be used to abort an ongoing
    request.
  * `socketPath` {string} Unix domain socket. Cannot be used if one of `host`
    or `port` is specified, as those specify a TCP Socket.
  * `timeout` {number}: A number specifying the socket timeout in milliseconds.
    This will set the timeout before the socket is connected.
  * `uniqueHeaders` {Array} A list of request headers that should be sent
    only once. If the header's value is an array, the items will be joined
    using `; `.
* `callback` {Function}
* Returns: {http.ClientRequest}

`options` in `socket.connect()` are also supported.

Node.js maintains several connections per server to make HTTP requests.
This function allows one to transparently issue requests.

`url` can be a string or a `URL` object. If `url` is a
string, it is automatically parsed with `new URL()`. If it is a `URL`
object, it will be automatically converted to an ordinary `options` object.

If both `url` and `options` are specified, the objects are merged, with the
`options` properties taking precedence.

The optional `callback` parameter will be added as a one-time listener for
the `'response'` event.

`http.request()` returns an instance of the `http.ClientRequest`
class. The `ClientRequest` instance is a writable stream. If one needs to
upload a file with a POST request, then write to the `ClientRequest` object.

```mjs
import http from 'node:http';
import { Buffer } from 'node:buffer';

const postData = JSON.stringify({
  'msg': 'Hello World!',
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();
```

```cjs
const http = require('node:http');

const postData = JSON.stringify({
  'msg': 'Hello World!',
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();
```

In the example `req.end()` was called. With `http.request()` one
must always call `req.end()` to signify the end of the request -
even if there is no data being written to the request body.

If any error is encountered during the request (be that with DNS resolution,
TCP level errors, or actual HTTP parse errors) an `'error'` event is emitted
on the returned request object. As with all `'error'` events, if no listeners
are registered the error will be thrown.

There are a few special headers that should be noted.

* Sending a 'Connection: keep-alive' will notify Node.js that the connection to
  the server should be persisted until the next request.

* Sending a 'Content-Length' header will disable the default chunked encoding.

* Sending an 'Expect' header will immediately send the request headers.
  Usually, when sending 'Expect: 100-continue', both a timeout and a listener
  for the `'continue'` event should be set. See RFC 2616 Section 8.2.3 for more
  information.

* Sending an Authorization header will override using the `auth` option
  to compute basic authentication.

Example using a `URL` as `options`:

```js
const options = new URL('<example-value>');

const req = http.request(options, (res) => {
  // ...
});
```

In a successful request, the following events will be emitted in the following
order:

* `'socket'`
* `'response'`
  * `'data'` any number of times, on the `res` object
    (`'data'` will not be emitted at all if the response body is empty, for
    instance, in most redirects)
  * `'end'` on the `res` object
* `'close'`

In the case of a connection error, the following events will be emitted:

* `'socket'`
* `'error'`
* `'close'`

In the case of a premature connection close before the response is received,
the following events will be emitted in the following order:

* `'socket'`
* `'error'` with an error with message `'Error: socket hang up'` and code
  `'ECONNRESET'`
* `'close'`

In the case of a premature connection close after the response is received,
the following events will be emitted in the following order:

* `'socket'`
* `'response'`
  * `'data'` any number of times, on the `res` object
* (connection closed here)
* `'aborted'` on the `res` object
* `'close'`
* `'error'` on the `res` object with an error with message
  `'Error: aborted'` and code `'ECONNRESET'`
* `'close'` on the `res` object

If a socket error (such as a TLS error) causes the premature close, that error
is emitted on the request before the close. The error emitted on the incomplete
response retains the message `'aborted'` and code `'ECONNRESET'`, with the original
socket error available as its `cause`. This also applies when the original socket
error has code `'ECONNRESET'`. If no underlying error is available, the response
error has no `cause` property.

If `req.destroy()` is called before a socket is assigned, the following
events will be emitted in the following order:

* (`req.destroy()` called here)
* `'error'` with an error with message `'Error: socket hang up'` and code
  `'ECONNRESET'`, or the error with which `req.destroy()` was called
* `'close'`

If `req.destroy()` is called before the connection succeeds, the following
events will be emitted in the following order:

* `'socket'`
* (`req.destroy()` called here)
* `'error'` with an error with message `'Error: socket hang up'` and code
  `'ECONNRESET'`, or the error with which `req.destroy()` was called
* `'close'`

If `req.destroy()` is called after the response is received, the following
events will be emitted in the following order:

* `'socket'`
* `'response'`
  * `'data'` any number of times, on the `res` object
* (`req.destroy()` called here)
* `'aborted'` on the `res` object
* `'close'`
* `'error'` on the `res` object with an error with message `'Error: aborted'`
  and code `'ECONNRESET'`. If an error was passed to `req.destroy()`, it is
  available as the response error's `cause`.
* `'close'` on the `res` object

If `req.abort()` is called before a socket is assigned, the following
events will be emitted in the following order:

* (`req.abort()` called here)
* `'abort'`
* `'close'`

If `req.abort()` is called before the connection succeeds, the following
events will be emitted in the following order:

* `'socket'`
* (`req.abort()` called here)
* `'abort'`
* `'error'` with an error with message `'Error: socket hang up'` and code
  `'ECONNRESET'`
* `'close'`

If `req.abort()` is called after the response is received, the following
events will be emitted in the following order:

* `'socket'`
* `'response'`
  * `'data'` any number of times, on the `res` object
* (`req.abort()` called here)
* `'abort'`
* `'aborted'` on the `res` object
* `'error'` on the `res` object with an error with message
  `'Error: aborted'` and code `'ECONNRESET'`.
* `'close'`
* `'close'` on the `res` object

Setting the `timeout` option or using the `setTimeout()` function will
not abort the request or do anything besides add a `'timeout'` event.

Passing an `AbortSignal` and then calling `abort()` on the corresponding
`AbortController` will behave the same way as calling `.destroy()` on the
request. Specifically, the `'error'` event will be emitted with an error with
the message `'AbortError: The operation was aborted'`, the code `'ABORT_ERR'`
and the `cause`, if one was provided.

## `http.isValidHeaderName(name)`

* `name` {any}
* Returns: {boolean}

Returns `true` if `name` is a valid HTTP header name (a non-empty string that
is an HTTP token), and `false` otherwise. This is the same check that
`http.validateHeaderName()` performs, but the result is returned instead of
an error being thrown, so it is suitable for use in hot paths where invalid
input is expected.

HTTP methods are also tokens, so this function can validate them as well.

```mjs
import { isValidHeaderName } from 'node:http';

console.log(isValidHeaderName('content-type')); // true
console.log(isValidHeaderName('X-Request-Id')); // true
console.log(isValidHeaderName('')); // false
console.log(isValidHeaderName('bad header')); // false
console.log(isValidHeaderName(42)); // false
```

```cjs
const { isValidHeaderName } = require('node:http');

console.log(isValidHeaderName('content-type')); // true
console.log(isValidHeaderName('X-Request-Id')); // true
console.log(isValidHeaderName('')); // false
console.log(isValidHeaderName('bad header')); // false
console.log(isValidHeaderName(42)); // false
```
