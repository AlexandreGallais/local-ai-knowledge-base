---
title: "Net (part 3 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/net.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Net (part 3 of 6)

## Class: `net.Socket`

* Extends: {stream.Duplex}

This class is an abstraction of a TCP socket or a streaming IPC endpoint
(uses named pipes on Windows, and Unix domain sockets otherwise). It is also
an `EventEmitter`.

A `net.Socket` can be created by the user and used directly to interact with
a server. For example, it is returned by `net.createConnection()`,
so the user can use it to talk to the server.

It can also be created by Node.js and passed to the user when a connection
is received. For example, it is passed to the listeners of a
`'connection'` event emitted on a `net.Server`, so the user can use
it to interact with the client.

### Transferring TCP handles to other threads

A connected TCP `net.Socket` can be moved to another thread by listing it in the
`transferList` of a `worker_threads` `postMessage()` call. After the
transfer, the source socket is destroyed on the sending thread (further use
fails with `ERR_STREAM_DESTROYED` rather than silently dropping data), and the
socket continues to work on the receiving thread. This makes it possible to
accept connections on one thread and distribute them across a pool of worker
threads, for example to build a `node:cluster`-like model on top of worker
threads.

The socket must be a freshly accepted or created TCP connection: it must still
be attached to a live handle, must not be connecting or destroyed, and must not
have started reading or have buffered data. Otherwise `postMessage()` throws
`ERR_WORKER_HANDLE_NOT_TRANSFERABLE`. Only TCP sockets are supported.

```cjs
const net = require('node:net');
const { Worker } = require('node:worker_threads');

// worker.js receives `{ socket }` messages and handles each connection.
const worker = new Worker('./worker.js');

const server = net.createServer((socket) => {
  // Hand the freshly accepted connection off to the worker thread.
  worker.postMessage({ socket }, [socket]);
});
server.listen(8000);
```

A listening `net.Server` can be transferred the same way, which moves the
listening socket itself (and its pending accept queue) to the receiving thread.

An un-adopted TCP `BoundSocket` can also be transferred, which moves the
bound (but not yet listening or connected) socket. This allows a port to be
reserved synchronously on one thread and adopted by a server or outgoing
connection on another. Pipe binds are not transferable. After the transfer, the
source `BoundSocket` behaves as if it had been adopted: `address()`, `fd()` and
`close()` throw `ERR_SOCKET_HANDLE_ADOPTED`.

### `new net.Socket([options])`

* `options` {Object} Available options are:
  * `allowHalfOpen` {boolean} If set to `false`, then the socket will
    automatically end the writable side when the readable side ends. See
    `net.createServer()` and the `'end'` event for details. **Default:**
    `false`.
  * `blockList` {net.BlockList} `blockList` can be used for disabling outbound
    access to specific IP addresses, IP ranges, or IP subnets.
  * `fd` {number} If specified, wrap around an existing socket with
    the given file descriptor, otherwise a new socket will be created.
  * `handle` {net.BoundSocket} If specified, wrap around the bound socket from a
    `BoundSocket`. A subsequent
    `socket.connect()` uses the bound socket as the
    connection's source binding (honoring the bound local address and port).
    Adoption consumes the bound socket (see
    ownership transfer).
  * `keepAlive` {boolean} If set to `true`, it enables keep-alive functionality on
    the socket immediately after the connection is established, similarly on what
    is done in `socket.setKeepAlive()`. **Default:** `false`.
  * `keepAliveInitialDelay` {number} If set to a positive number, it sets the
    initial delay before the first keepalive probe is sent on an idle socket. **Default:** `0`.
  * `noDelay` {boolean} If set to `true`, it disables the use of Nagle's algorithm
    immediately after the socket is established. **Default:** `false`.
  * `onread` {Object} If specified, incoming data is stored in a single `buffer`
    and passed to the supplied `callback` when data arrives on the socket.
    This will cause the streaming functionality to not provide any data.
    The socket will emit events like `'error'`, `'end'`, and `'close'`
    as usual. Methods like `pause()` and `resume()` will also behave as
    expected.
    * `buffer` {Buffer|Uint8Array|Function} Either a reusable chunk of memory to
      use for storing incoming data or a function that returns such.
    * `callback` {Function} This function is called for every chunk of incoming
      data. Two arguments are passed to it: the number of bytes written to
      `buffer` and a reference to `buffer`. Return `false` from this function to
      implicitly `pause()` the socket. This function will be executed in the
      global context.
  * `readable` {boolean} Allow reads on the socket when an `fd` is passed,
    otherwise ignored. **Default:** `false`.
  * `signal` {AbortSignal} An Abort signal that may be used to destroy the
    socket.
  * `typeOfService` {number} The initial Type of Service (TOS) value.
  * `writable` {boolean} Allow writes on the socket when an `fd` is passed,
    otherwise ignored. **Default:** `false`.
* Returns: {net.Socket}

Creates a new socket object.

The newly created socket can be either a TCP socket or a streaming IPC
endpoint, depending on what it `connect()` to.

### Event: `'close'`

* `hadError` {boolean} `true` if the socket had a transmission error.

Emitted once the socket is fully closed. The argument `hadError` is a boolean
which says if the socket was closed due to a transmission error.

### Event: `'connect'`

Emitted when a socket connection is successfully established.
See `net.createConnection()`.

### Event: `'connectionAttempt'`

* `ip` {string} The IP which the socket is attempting to connect to.
* `port` {number} The port which the socket is attempting to connect to.
* `family` {number} The family of the IP. It can be `6` for IPv6 or `4` for IPv4.

Emitted when a new connection attempt is started. This may be emitted multiple times
if the family autoselection algorithm is enabled in `socket.connect(options)`.

### Event: `'connectionAttemptFailed'`

* `ip` {string} The IP which the socket attempted to connect to.
* `port` {number} The port which the socket attempted to connect to.
* `family` {number} The family of the IP. It can be `6` for IPv6 or `4` for IPv4.
* `error` {Error} The error associated with the failure.

Emitted when a connection attempt failed. This may be emitted multiple times
if the family autoselection algorithm is enabled in `socket.connect(options)`.

### Event: `'connectionAttemptTimeout'`

* `ip` {string} The IP which the socket attempted to connect to.
* `port` {number} The port which the socket attempted to connect to.
* `family` {number} The family of the IP. It can be `6` for IPv6 or `4` for IPv4.

Emitted when a connection attempt timed out. This is only emitted (and may be
emitted multiple times) if the family autoselection algorithm is enabled
in `socket.connect(options)`.

### Event: `'data'`

* Type: {Buffer|string}

Emitted when data is received. The argument `data` will be a `Buffer` or
`String`. Encoding of data is set by `socket.setEncoding()`.

The data will be lost if there is no listener when a `Socket`
emits a `'data'` event.

### Event: `'drain'`

Emitted when the write buffer becomes empty. Can be used to throttle uploads.

See also: the return values of `socket.write()`.

### Event: `'end'`

Emitted when the other end of the socket signals the end of transmission, thus
ending the readable side of the socket.

By default (`allowHalfOpen` is `false`) the socket will send an end of
transmission packet back and destroy its file descriptor once it has written out
its pending write queue. However, if `allowHalfOpen` is set to `true`, the
socket will not automatically `end()` its writable side,
allowing the user to write arbitrary amounts of data. The user must call
`end()` explicitly to close the connection (i.e. sending a
FIN packet back).

### Event: `'error'`

* Type: {Error}

Emitted when an error occurs. The `'close'` event will be called directly
following this event.

### Event: `'lookup'`

Emitted after resolving the host name but before connecting.
Not applicable to Unix sockets.

* `err` {Error|null} The error object. See `dns.lookup()`.
* `address` {string} The IP address.
* `family` {number|null} The address type. See `dns.lookup()`.
* `host` {string} The host name.

### Event: `'ready'`

Emitted when a socket is ready to be used.

Triggered immediately after `'connect'`.

### Event: `'timeout'`

Emitted if the socket times out from inactivity. This is only to notify that
the socket has been idle. The user must manually close the connection.

See also: `socket.setTimeout()`.

### `socket.address()`

* Returns: {Object}

Returns the bound `address`, the address `family` name and `port` of the
socket as reported by the operating system:
`{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`

### `socket.autoSelectFamilyAttemptedAddresses`

* Type: {string\[]}

This property is only present if the family autoselection algorithm is enabled in
`socket.connect(options)` and it is an array of the addresses that have been attempted.

Each address is a string in the form of `$IP:$PORT`. If the connection was successful,
then the last address is the one that the socket is currently connected to.

### `socket.bufferSize`

> Stability: 0 - Deprecated: Use `writable.writableLength` instead.

* Type: {integer}

This property shows the number of characters buffered for writing. The buffer
may contain strings whose length after encoding is not yet known. So this number
is only an approximation of the number of bytes in the buffer.

`net.Socket` has the property that `socket.write()` always works. This is to
help users get up and running quickly. The computer cannot always keep up
with the amount of data that is written to a socket. The network connection
simply might be too slow. Node.js will internally queue up the data written to a
socket and send it out over the wire when it is possible.

The consequence of this internal buffering is that memory may grow.
Users who experience large or growing `bufferSize` should attempt to
"throttle" the data flows in their program with
`socket.pause()` and `socket.resume()`.

### `socket.bytesRead`

* Type: {integer}

The amount of received bytes.

### `socket.bytesWritten`

* Type: {integer}

The amount of bytes sent.

### `socket.connect()`

Initiate a connection on a given socket.

Possible signatures:

* `socket.connect(options[, connectListener])`
* `socket.connect(path[, connectListener])`
  for IPC connections.
* `socket.connect(port[, host][, connectListener])`
  for TCP connections.
* Returns: {net.Socket} The socket itself.

This function is asynchronous. When the connection is established, the
`'connect'` event will be emitted. If there is a problem connecting,
instead of a `'connect'` event, an `'error'` event will be emitted with
the error passed to the `'error'` listener.
The last parameter `connectListener`, if supplied, will be added as a listener
for the `'connect'` event **once**.

This function should only be used for reconnecting a socket after
`'close'` has been emitted or otherwise it may lead to undefined
behavior.

#### `socket.connect(options[, connectListener])`

* `options` {Object}
* `connectListener` {Function} Common parameter of `socket.connect()`
  methods. Will be added as a listener for the `'connect'` event once.
* Returns: {net.Socket} The socket itself.

Initiate a connection on a given socket. Normally this method is not needed,
the socket should be created and opened with `net.createConnection()`. Use
this only when implementing a custom Socket.

For TCP connections, available `options` are:

* `autoSelectFamily` {boolean}: If set to `true`, it enables a family
  autodetection algorithm that loosely implements section 5 of RFC 8305. The
  `all` option passed to lookup is set to `true` and the sockets attempts to
  connect to all obtained IPv6 and IPv4 addresses, in sequence, until a
  connection is established. The first returned AAAA address is tried first,
  then the first returned A address, then the second returned AAAA address and
  so on. Each connection attempt (but the last one) is given the amount of time
  specified by the `autoSelectFamilyAttemptTimeout` option before timing out and
  trying the next address. Ignored if the `family` option is not `0` or if
  `localAddress` is set. Connection errors are not emitted if at least one
  connection succeeds. If all connections attempts fails, a single
  `AggregateError` with all failed attempts is emitted. **Default:**
  `net.getDefaultAutoSelectFamily()`.
* `autoSelectFamilyAttemptTimeout` {number}: The amount of time in milliseconds
  to wait for a connection attempt to finish before trying the next address when
  using the `autoSelectFamily` option. If set to a positive integer less than
  `10`, then the value `10` will be used instead. **Default:**
  `net.getDefaultAutoSelectFamilyAttemptTimeout()`.
* `family` {number}: Version of IP stack. Must be `4`, `6`, or `0`. The value
  `0` indicates that both IPv4 and IPv6 addresses are allowed. **Default:** `0`.
* `hints` {number} Optional `dns.lookup()` hints.
* `host` {string} Host the socket should connect to. **Default:** `'localhost'`.
* `localAddress` {string} Local address the socket should connect from.
* `localPort` {number} Local port the socket should connect from.
* `lookup` {Function} Custom lookup function. **Default:** `dns.lookup()`.
* `port` {number} Required. Port the socket should connect to.

For IPC connections, available `options` are:

* `path` {string} Required. Path the client should connect to.
  See Identifying paths for IPC connections. If provided, the TCP-specific
  options above are ignored.

#### `socket.connect(path[, connectListener])`

* `path` {string} Path the client should connect to. See
  Identifying paths for IPC connections.
* `connectListener` {Function} Common parameter of `socket.connect()`
  methods. Will be added as a listener for the `'connect'` event once.
* Returns: {net.Socket} The socket itself.

Initiate an IPC connection on the given socket.

Alias to
`socket.connect(options[, connectListener])`
called with `{ path: path }` as `options`.

#### `socket.connect(port, host)`

* `port` {number} Port the client should connect to.
* `host` {string} Host the client should connect to.
* `connectListener` {Function} Common parameter of `socket.connect()`
  methods. Will be added as a listener for the `'connect'` event once.
* Returns: {net.Socket} The socket itself.

Initiate a TCP connection on the given socket.

Alias to
`socket.connect(options[, connectListener])`
called with `{port: port, host: host}` as `options`.
