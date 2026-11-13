---
title: "Stream (part 2 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 2 of 11)

## API for stream consumers

Almost all Node.js applications, no matter how simple, use streams in some
manner. The following is an example of using streams in a Node.js application
that implements an HTTP server:

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  // `req` is an http.IncomingMessage, which is a readable stream.
  // `res` is an http.ServerResponse, which is a writable stream.

  let body = '';
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  req.setEncoding('utf8');

  // Readable streams emit 'data' events once a listener is added.
  req.on('data', (chunk) => {
    body += chunk;
  });

  // The 'end' event indicates that the entire body has been received.
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // Write back something interesting to the user:
      res.write(typeof data);
      res.end();
    } catch (er) {
      // uh oh! bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});

server.listen(1337);

// $ curl localhost:1337 -d "{}"
// object
// $ curl localhost:1337 -d "\"foo\""
// string
// $ curl localhost:1337 -d "not json"
// error: Unexpected token 'o', "not json" is not valid JSON
```

`Writable` streams (such as `res` in the example) expose methods such as
`write()` and `end()` that are used to write data onto the stream.

`Readable` streams use the `EventEmitter` API for notifying application
code when data is available to be read off the stream. That available data can
be read from the stream in multiple ways.

Both `Writable` and `Readable` streams use the `EventEmitter` API in
various ways to communicate the current state of the stream.

`Duplex` and `Transform` streams are both `Writable` and
`Readable`.

Applications that are either writing data to or consuming data from a stream
are not required to implement the stream interfaces directly and will generally
have no reason to call `require('node:stream')`.

Developers wishing to implement new types of streams should refer to the
section API for stream implementers.
