---
title: "HTTP (part 9 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 9 of 12)

## `http.createServer(options)`

* `options` {Object}
  * `connectionsCheckingInterval`: Sets the interval value in milliseconds to
    check for request and headers timeout in incomplete requests.
    **Default:** `30000`.
  * `headersTimeout`: Sets the timeout value in milliseconds for receiving
    the complete HTTP headers from the client.
    See `server.headersTimeout` for more information.
    **Default:** `60000`.
  * `highWaterMark` {number} Optionally overrides all `socket`s'
    `readableHighWaterMark` and `writableHighWaterMark`. This affects
    `highWaterMark` property of both `IncomingMessage` and `ServerResponse`.
    **Default:** See `stream.getDefaultHighWaterMark()`.
  * `httpValidation` {string} Controls HTTP header value validation strictness
    for incoming requests. Accepted values are:
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
    **Default:** `false`.
  * `IncomingMessage` {http.IncomingMessage} Specifies the `IncomingMessage`
    class to be used. Useful for extending the original `IncomingMessage`.
    **Default:** `IncomingMessage`.
  * `joinDuplicateHeaders` {boolean} If set to `true`, this option allows
    joining the field line values of multiple headers in a request with
    a comma (`, `) instead of discarding the duplicates.
    For more information, refer to `message.headers`.
    **Default:** `false`.
  * `keepAlive` {boolean} If set to `true`, it enables keep-alive functionality
    on the socket immediately after a new incoming connection is received,
    similarly on what is done in `socket.setKeepAlive()`.
    **Default:** `false`.
  * `keepAliveInitialDelay` {number} If set to a positive number, it sets the
    initial delay before the first keepalive probe is sent on an idle socket.
    **Default:** `0`.
  * `keepAliveTimeout`: The number of milliseconds of inactivity a server
    needs to wait for additional incoming data, after it has finished writing
    the last response, before a socket will be destroyed.
    See `server.keepAliveTimeout` for more information.
    **Default:** `65000`.
  * `keepAliveTimeoutBuffer`: An additional buffer time in milliseconds added
    to `keepAliveTimeout` to extend the internal socket timeout.
    See `server.keepAliveTimeoutBuffer` for more information.
    **Default:** `1000`.
  * `maxHeaderSize` {number} Optionally overrides the value of
    `--max-http-header-size` for requests received by this server, i.e.
    the maximum length of request headers in bytes.
    **Default:** 16384 (16 KiB).
  * `noDelay` {boolean} If set to `true`, it disables the use of Nagle's
    algorithm immediately after a new incoming connection is received.
    **Default:** `true`.
  * `requestTimeout`: Sets the timeout value in milliseconds for receiving
    the entire request from the client.
    See `server.requestTimeout` for more information.
    **Default:** `300000`.
  * `requireHostHeader` {boolean} If set to `true`, it forces the server to
    respond with a 400 (Bad Request) status code to any HTTP/1.1
    request message that lacks a Host header
    (as mandated by the specification).
    **Default:** `true`.
  * `ServerResponse` {http.ServerResponse} Specifies the `ServerResponse` class
    to be used. Useful for extending the original `ServerResponse`. **Default:**
    `ServerResponse`.
  * `shouldUpgradeCallback(request)` {Function} A callback which receives an
    incoming request and returns a boolean, to control which upgrade attempts
    should be accepted. Accepted upgrades will fire an `'upgrade'` event (or
    their sockets will be destroyed, if no listener is registered) while
    rejected upgrades will fire a `'request'` event like any non-upgrade
    request. This options defaults to
    `() => server.listenerCount('upgrade') > 0`.
  * `uniqueHeaders` {Array} A list of response headers that should be sent only
    once. If the header's value is an array, the items will be joined
    using `; `.
  * `rejectNonStandardBodyWrites` {boolean} If set to `true`, an error is thrown
    when writing to an HTTP response which does not have a body.
    **Default:** `false`.
  * `optimizeEmptyRequests` {boolean} If set to `true`, requests without `Content-Length`
    or `Transfer-Encoding` headers (indicating no body) will be initialized with an
    already-ended body stream, so they will never emit any stream events
    (like `'data'` or `'end'`). You can use `req.readableEnded` to detect this case.
    **Default:** `false`.

* `requestListener` {Function}

* Returns: {http.Server}

Returns a new instance of `http.Server`.

The `requestListener` is a function which is automatically
added to the `'request'` event.

```mjs
import http from 'node:http';

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

```cjs
const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

```mjs
import http from 'node:http';

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

```cjs
const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

## `http.get(url, options)`

* `url` {string | URL}
* `options` {Object} Accepts the same `options` as
  `http.request()`, with the method set to GET by default.
* `callback` {Function}
* Returns: {http.ClientRequest}

Since most requests are GET requests without bodies, Node.js provides this
convenience method. The only difference between this method and
`http.request()` is that it sets the method to GET by default and calls `req.end()`
automatically. The callback must take care to consume the response
data for reasons stated in `http.ClientRequest` section.

The `callback` is invoked with a single argument that is an instance of
`http.IncomingMessage`.

JSON fetching example:

```js
http.get('http://localhost:8000/', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  // Any 2xx status code signals a successful response but
  // here we're only checking for 200.
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // Consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

## `http.globalAgent`

* Type: {http.Agent}

Global instance of `Agent` which is used as the default for all HTTP client
requests. Diverges from a default `Agent` configuration by having `keepAlive`
enabled and a `timeout` of 5 seconds.

## `http.maxHeaderSize`

* Type: {number}

Read-only property specifying the maximum allowed size of HTTP headers in bytes.
Defaults to 16 KiB. Configurable using the `--max-http-header-size` CLI
option.

This can be overridden for servers and client requests by passing the
`maxHeaderSize` option.
