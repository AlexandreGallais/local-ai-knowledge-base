---
title: "Net (part 5 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/net.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Net (part 5 of 6)

## Class: `net.BoundSocket`

Allows for the synchronous creation of a pre-bound socket, that can be passed
to `listen()` or `new net.Socket()` later on. For `listen()` this enables
synchronous port reservation, while for `new net.Socket()`, it allows control
over the local egress port/IP, via `bind(2)` semantics.

A `BoundSocket` binds either a TCP endpoint (`host` or `port`) or a
Unix domain/named-pipe endpoint (`path`); the two are mutually exclusive. For a
`path`, the file system entry is reserved in the constructor, so conflicts such
as `EADDRINUSE` throw synchronously exactly as a TCP bind does. On Linux a
leading `'\0'` in `path` selects the abstract namespace (no file system entry);
an abstract path on any other platform throws `ERR_INVALID_ARG_VALUE`.

Adoption transfers ownership of the socket; afterwards `address()` and `close()`
throw `ERR_SOCKET_HANDLE_ADOPTED`. A handle that is never adopted must be
closed to avoid leaking the socket. Closing a pipe `BoundSocket` removes its
file system entry; abstract and TCP binds have none to remove.

When a pipe `BoundSocket` bound to a source `path` is adopted as a client, that
path is reported as the socket's `localAddress` once it connects.

An un-adopted TCP `BoundSocket` can be moved to another thread by listing it in
the `transferList` of a `worker_threads` `postMessage()` call, see
Transferring TCP handles to other threads. It can likewise be sent to a
child process as the `sendHandle` argument of `subprocess.send()`. In both
cases the source is left in the adopted state. Pipe binds cannot be moved
either way.

When an adopted `BoundSocket` connects to a numeric IP literal, `connect(2)` is
issued synchronously, so `socket.localAddress` is resolved once
`socket.connect()` returns. Connection failures are still reported via a
deferred `'error'` event.

```mjs
import net from 'node:net';

const bound = new net.BoundSocket();
const { port } = bound.address();
console.log(`Reserved port ${port} for server`);

const server = net.createServer();
server.listen(bound); // Adopt as a server, or pass to new net.Socket() instead.
```

### `new net.BoundSocket([options])`

* `options` {Object}
  * `host` {string} Local address to bind. Must be a numeric IP literal; no DNS
    resolution is performed. **Default:** `'0.0.0.0'`, or `'::'` when
    `ipv6Only` is `true`.
  * `port` {number} Local port. `0` requests an OS-assigned ephemeral port.
    **Default:** `0`.
  * `ipv6Only` {boolean} Sets `IPV6_V6ONLY`, disabling dual-stack support so the
    socket binds IPv6 only. Only meaningful for IPv6 binds. **Default:**
    `false`.
  * `reusePort` {boolean} Sets `SO_REUSEPORT`, allowing multiple sockets to bind
    the same address and port for kernel-level load balancing. Support is
    platform-dependent. **Default:** `false`.
  * `path` {string} Binds a Unix domain socket (or Windows named pipe) at the
    given path instead of a TCP endpoint. A leading `'\0'` selects the Linux
    abstract namespace. Mutually exclusive with `host`, `port`, `ipv6Only`, and
    `reusePort`; combining them throws `ERR_INVALID_ARG_VALUE`.

### `boundSocket.address()`

* Returns: {Object|string} For a TCP bind, an object with `address`, `family`,
  and `port` properties, as `server.address()` returns. For a pipe bind, the
  bound path string, as `server.address()` returns for a pipe server.

Returns the bound local address. When bound with `port: 0`, `port` is the
OS-assigned ephemeral port.

### `boundSocket.isPipe`

* {boolean}

`true` when the socket was bound with a `path` (a Unix domain socket or Windows
named pipe), `false` for a TCP bind. The getter's presence on
`net.BoundSocket.prototype` also serves as a capability probe for `path`
support.

### `boundSocket.fd()`

* Returns: {integer} The underlying OS file descriptor, or `-1` on platforms
  that do not expose one for sockets (such as Windows).

Returns the file descriptor of the bound socket. Ownership remains with the
`BoundSocket`, so the descriptor must not be closed by the caller. The
descriptor is only available before the handle is adopted; afterwards it belongs
to the adopting `net.Server` or `net.Socket` and `fd()` throws
`ERR_SOCKET_HANDLE_ADOPTED`.

### `boundSocket.close()`

Releases the bound socket. Only needed when the handle is never adopted.

### `boundSocketSymbol.dispose`

Closes the handle if it has not been adopted or closed; otherwise a no-op.

## `net.connect()`

Aliases to
`net.createConnection()`.

Possible signatures:

* `net.connect(options[, connectListener])`
* `net.connect(path[, connectListener])` for IPC
  connections.
* `net.connect(port[, host][, connectListener])`
  for TCP connections.

### `net.connect(options[, connectListener])`

* `options` {Object}
* `connectListener` {Function}
* Returns: {net.Socket}

Alias to
`net.createConnection(options[, connectListener])`.

### `net.connect(path[, connectListener])`

* `path` {string}
* `connectListener` {Function}
* Returns: {net.Socket}

Alias to
`net.createConnection(path[, connectListener])`.

### `net.connect(port, host)`

* `port` {number}
* `host` {string}
* `connectListener` {Function}
* Returns: {net.Socket}

Alias to
`net.createConnection(port[, host][, connectListener])`.

## `net.createConnection()`

A factory function, which creates a new `net.Socket`,
immediately initiates connection with `socket.connect()`,
then returns the `net.Socket` that starts the connection.

When the connection is established, a `'connect'` event will be emitted
on the returned socket. The last parameter `connectListener`, if supplied,
will be added as a listener for the `'connect'` event **once**.

Possible signatures:

* `net.createConnection(options[, connectListener])`
* `net.createConnection(path[, connectListener])`
  for IPC connections.
* `net.createConnection(port[, host][, connectListener])`
  for TCP connections.

The `net.connect()` function is an alias to this function.

### `net.createConnection(options[, connectListener])`

* `options` {Object} Required. Will be passed to both the
  `new net.Socket([options])` call and the
  `socket.connect(options[, connectListener])`
  method.
* `connectListener` {Function} Common parameter of the
  `net.createConnection()` functions. If supplied, will be added as
  a listener for the `'connect'` event on the returned socket once.
* Returns: {net.Socket} The newly created socket used to start the connection.

For available options, see
`new net.Socket([options])`
and `socket.connect(options[, connectListener])`.

Additional options:

* `handle` {net.BoundSocket} A pre-bound `BoundSocket` used as the
  connection's source binding, honoring its local address and port. Adoption
  consumes the bound socket (see ownership transfer).
* `timeout` {number} If set, will be used to call
  `socket.setTimeout(timeout)` after the socket is created, but before
  it starts the connection.

Following is an example of a client of the echo server described
in the `net.createServer()` section:

```mjs
import net from 'node:net';
const client = net.createConnection({ port: 8124 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
```

```cjs
const net = require('node:net');
const client = net.createConnection({ port: 8124 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
```

To connect on the socket `/tmp/echo.sock`:

```js
const client = net.createConnection({ path: '/tmp/echo.sock' });
```

Following is an example of a client using the `port` and `onread`
option. In this case, the `onread` option will be only used to call
`new net.Socket([options])` and the `port` option will be used to
call `socket.connect(options[, connectListener])`.

```mjs
import net from 'node:net';
import { Buffer } from 'node:buffer';
net.createConnection({
  port: 8124,
  onread: {
    // Reuses a 4KiB Buffer for every read from the socket.
    buffer: Buffer.alloc(4 * 1024),
    callback: function(nread, buf) {
      // Received data is available in `buf` from 0 to `nread`.
      console.log(buf.toString('utf8', 0, nread));
    },
  },
});
```

```cjs
const net = require('node:net');
net.createConnection({
  port: 8124,
  onread: {
    // Reuses a 4KiB Buffer for every read from the socket.
    buffer: Buffer.alloc(4 * 1024),
    callback: function(nread, buf) {
      // Received data is available in `buf` from 0 to `nread`.
      console.log(buf.toString('utf8', 0, nread));
    },
  },
});
```

### `net.createConnection(path[, connectListener])`

* `path` {string} Path the socket should connect to. Will be passed to
  `socket.connect(path[, connectListener])`.
  See Identifying paths for IPC connections.
* `connectListener` {Function} Common parameter of the
  `net.createConnection()` functions, an "once" listener for the
  `'connect'` event on the initiating socket. Will be passed to
  `socket.connect(path[, connectListener])`.
* Returns: {net.Socket} The newly created socket used to start the connection.

Initiates an IPC connection.

This function creates a new `net.Socket` with all options set to default,
immediately initiates connection with
`socket.connect(path[, connectListener])`,
then returns the `net.Socket` that starts the connection.

### `net.createConnection(port, host)`

* `port` {number} Port the socket should connect to. Will be passed to
  `socket.connect(port[, host][, connectListener])`.
* `host` {string} Host the socket should connect to. Will be passed to
  `socket.connect(port[, host][, connectListener])`.
  **Default:** `'localhost'`.
* `connectListener` {Function} Common parameter of the
  `net.createConnection()` functions, an "once" listener for the
  `'connect'` event on the initiating socket. Will be passed to
  `socket.connect(port[, host][, connectListener])`.
* Returns: {net.Socket} The newly created socket used to start the connection.

Initiates a TCP connection.

This function creates a new `net.Socket` with all options set to default,
immediately initiates connection with
`socket.connect(port[, host][, connectListener])`,
then returns the `net.Socket` that starts the connection.

## `net.createServer(options)`

* `options` {Object}
  * `allowHalfOpen` {boolean} If set to `false`, then the socket will
    automatically end the writable side when the readable side ends.
    **Default:** `false`.
  * `highWaterMark` {number} Optionally overrides all `net.Socket`s'
    `readableHighWaterMark` and `writableHighWaterMark`.
    **Default:** See `stream.getDefaultHighWaterMark()`.
  * `keepAlive` {boolean} If set to `true`, it enables keep-alive functionality
    on the socket immediately after a new incoming connection is received,
    similarly on what is done in `socket.setKeepAlive()`. **Default:**
    `false`.
  * `keepAliveInitialDelay` {number} If set to a positive number, it sets the
    initial delay before the first keepalive probe is sent on an idle socket.
    **Default:** `0`.
  * `noDelay` {boolean} If set to `true`, it disables the use of Nagle's
    algorithm immediately after a new incoming connection is received.
    **Default:** `false`.
  * `pauseOnConnect` {boolean} Indicates whether the socket should be
    paused on incoming connections. **Default:** `false`.
  * `blockList` {net.BlockList} `blockList` can be used for disabling inbound
    access to specific IP addresses, IP ranges, or IP subnets. This does not
    work if the server is behind a reverse proxy, NAT, etc. because the address
    checked against the block list is the address of the proxy, or the one
    specified by the NAT.

* `connectionListener` {Function} Automatically set as a listener for the
  `'connection'` event.

* Returns: {net.Server}

Creates a new TCP or IPC server.

If `allowHalfOpen` is set to `true`, when the other end of the socket
signals the end of transmission, the server will only send back the end of
transmission when `socket.end()` is explicitly called. For example, in the
context of TCP, when a FIN packet is received, a FIN packet is sent
back only when `socket.end()` is explicitly called. Until then the
connection is half-closed (non-readable but still writable). See `'end'`
event and RFC 1122 (section 4.2.2.13) for more information.

If `pauseOnConnect` is set to `true`, then the socket associated with each
incoming connection will be paused, and no data will be read from its handle.
This allows connections to be passed between processes without any data being
read by the original process. To begin reading data from a paused socket, call
`socket.resume()`.

The server can be a TCP server or an IPC server, depending on what it
`listen()` to.

Here is an example of a TCP echo server which listens for connections
on port 8124:

```mjs
import net from 'node:net';
const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
```

```cjs
const net = require('node:net');
const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
```

Test this by using `telnet`:

```bash
telnet localhost 8124
```

To listen on the socket `/tmp/echo.sock`:

```js
server.listen('/tmp/echo.sock', () => {
  console.log('server bound');
});
```

Use `nc` to connect to a Unix domain socket server:

```bash
nc -U /tmp/echo.sock
```

## `net.getDefaultAutoSelectFamily()`

Gets the current default value of the `autoSelectFamily` option of `socket.connect(options)`.
The initial default value is `true`, unless the command line option
`--no-network-family-autoselection` is provided.

* Returns: {boolean} The current default value of the `autoSelectFamily` option.

## `net.setDefaultAutoSelectFamily(value)`

Sets the default value of the `autoSelectFamily` option of `socket.connect(options)`.

* `value` {boolean} The new default value.
  The initial default value is `true`, unless the command line option
  `--no-network-family-autoselection` is provided.
