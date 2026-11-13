---
title: "Net (part 2 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/net.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Net (part 2 of 6)

## Class: `net.Server`

* Extends: {EventEmitter}

This class is used to create a TCP or IPC server.

A listening TCP `net.Server` can be transferred to a worker thread by listing it
in the `transferList` of a `worker_threads` `postMessage()` call. This moves
the underlying listening socket to the receiving thread, where it resumes
accepting connections. See Transferring TCP handles to other threads.

### `new net.Server(options)`

* `options` {Object} See
  `net.createServer([options][, connectionListener])`.
* `connectionListener` {Function} Automatically set as a listener for the
  `'connection'` event.
* Returns: {net.Server}

`net.Server` is an `EventEmitter` with the following events:

### Event: `'close'`

Emitted when the server closes. If connections exist, this
event is not emitted until all connections are ended.

### Event: `'connection'`

* Type: {net.Socket} The connection object

Emitted when a new connection is made. `socket` is an instance of
`net.Socket`.

### Event: `'error'`

* Type: {Error}

Emitted when an error occurs. Unlike `net.Socket`, the `'close'`
event will **not** be emitted directly following this event unless
`server.close()` is manually called. See the example in discussion of
`server.listen()`.

### Event: `'listening'`

Emitted when the server has been bound after calling `server.listen()`.

### Event: `'drop'`

When the number of connections reaches the threshold of `server.maxConnections`,
the server will drop new connections and emit `'drop'` event instead. If it is a
TCP server, the argument is as follows, otherwise the argument is `undefined`.

* `data` {Object} The argument passed to event listener.
  * `localAddress` {string}  Local address.
  * `localPort` {number} Local port.
  * `localFamily` {string} Local family.
  * `remoteAddress` {string} Remote address.
  * `remotePort` {number} Remote port.
  * `remoteFamily` {string} Remote IP family. `'IPv4'` or `'IPv6'`.

### `server.address()`

* Returns: {Object|string|null}

Returns the bound `address`, the address `family` name, and `port` of the server
as reported by the operating system if listening on an IP socket
(useful to find which port was assigned when getting an OS-assigned address):
`{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`.

For a server listening on a pipe or Unix domain socket, the name is returned
as a string.

```js
const server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  // Handle errors here.
  throw err;
});

// Grab an arbitrary unused port.
server.listen(() => {
  console.log('opened server on', server.address());
});
```

`server.address()` returns `null` before the `'listening'` event has been
emitted or after calling `server.close()`.

### `server.close([callback])`

* `callback` {Function} Called when the server is closed.
* Returns: {net.Server}

Stops the server from accepting new connections and keeps existing
connections. This function is asynchronous, the server is finally closed
when all connections are ended and the server emits a `'close'` event.
The optional `callback` will be called once the `'close'` event occurs. Unlike
that event, it will be called with an `Error` as its only argument if the server
was not open when it was closed.

### `serverSymbol.asyncDispose`

Calls `server.close()` and returns a promise that fulfills when the
server has closed.

### `server.getConnections(callback)`

* `callback` {Function}
* Returns: {net.Server}

Asynchronously get the number of concurrent connections on the server. Works
when sockets were sent to forks.

Callback should take two arguments `err` and `count`.

### `server.listen()`

Start a server listening for connections. A `net.Server` can be a TCP or
an IPC server depending on what it listens to.

Possible signatures:

* `server.listen(handle[, backlog][, callback])`
* `server.listen(options[, callback])`
* `server.listen(path[, backlog][, callback])`
  for IPC servers
* [`server.listen([port[, host[, backlog]]][, callback])`][`server.listen(port)`]
  for TCP servers

This function is asynchronous. When the server starts listening, the
`'listening'` event will be emitted. The last parameter `callback`
will be added as a listener for the `'listening'` event.

All `listen()` methods can take a `backlog` parameter to specify the maximum
length of the queue of pending connections. The actual length will be determined
by the OS through sysctl settings such as `tcp_max_syn_backlog` and `somaxconn`
on Linux. The default value of this parameter is 511 (not 512).

All `net.Socket` are set to `SO_REUSEADDR` (see `socket(7)` for
details).

The `server.listen()` method can be called again if and only if there was an
error during the first `server.listen()` call or `server.close()` has been
called. Otherwise, an `ERR_SERVER_ALREADY_LISTEN` error will be thrown.

One of the most common errors raised when listening is `EADDRINUSE`.
This happens when another server is already listening on the requested
`port`/`path`/`handle`. One way to handle this would be to retry
after a certain amount of time:

```js
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  }
});
```

#### `server.listen(handle, backlog)`

* `handle` {Object}
* `backlog` {number} Common parameter of `server.listen()` functions
* `callback` {Function}
* Returns: {net.Server}

Start a server listening for connections on a given `handle` that has
already been bound to a port, a Unix domain socket, or a Windows named pipe.

The `handle` object can be either a server, a socket (anything with an
underlying `_handle` member), a `BoundSocket`, or an object with an `fd`
member that is a valid file descriptor.

When `handle` is a `BoundSocket`, the server adopts the already-bound
socket and starts listening on it. Adoption consumes the bound socket (see
ownership transfer).

Listening on a file descriptor is not supported on Windows.

#### `server.listen(options[, callback])`

* `options` {Object} Required. Supports the following properties:
  * `backlog` {number} Common parameter of `server.listen()`
    functions.
  * `exclusive` {boolean} **Default:** `false`
  * `handle` {net.BoundSocket} A pre-bound `BoundSocket`. The server adopts
    the already-bound socket and listens on it, ignoring `host`, `port`, and
    `path`. Adoption consumes the bound socket (see
    ownership transfer).
  * `host` {string}
  * `ipv6Only` {boolean} For TCP servers, setting `ipv6Only` to `true` will
    disable dual-stack support, i.e., binding to host `::` won't make
    `0.0.0.0` be bound. **Default:** `false`.
  * `reusePort` {boolean} For TCP servers, setting `reusePort` to `true` allows
    multiple sockets on the same host to bind to the same port. Incoming connections
    are distributed by the operating system to listening sockets. This option is
    available only on some platforms, such as Linux 3.9+, DragonFlyBSD 3.6+, FreeBSD 12.0+,
    Solaris 11.4, and AIX 7.2.5+. On unsupported platforms, this option raises
    an error. **Default:** `false`.
  * `path` {string} Will be ignored if `port` is specified. See
    Identifying paths for IPC connections.
  * `port` {number}
  * `readableAll` {boolean} For IPC servers makes the pipe readable
    for all users. **Default:** `false`.
  * `signal` {AbortSignal} An AbortSignal that may be used to close a listening
    server.
  * `writableAll` {boolean} For IPC servers makes the pipe writable
    for all users. **Default:** `false`.
* `callback` {Function}
  functions.
* Returns: {net.Server}

If `handle` is specified, the server adopts that pre-bound socket. Otherwise, if
`port` is specified, it behaves the same as
[`server.listen([port[, host[, backlog]]][, callback])`][`server.listen(port)`].
Otherwise, if `path` is specified, it behaves the same as
`server.listen(path[, backlog][, callback])`.
If none of them is specified, an error will be thrown.

> Using the `signal` option to destroy a long-lived server as a resource cleanup
> mechanism is deprecated. The `signal` option remains appropriate for
> cancellation, externally propagated aborts, and timeouts. See
> DEP0209.

If `exclusive` is `false` (default), then cluster workers will use the same
underlying handle, allowing connection handling duties to be shared. When
`exclusive` is `true`, the handle is not shared, and attempted port sharing
results in an error. An example which listens on an exclusive port is
shown below.

```js
server.listen({
  host: 'localhost',
  port: 80,
  exclusive: true,
});
```

When `exclusive` is `true` and the underlying handle is shared, it is
possible that several workers query a handle with different backlogs.
In this case, the first `backlog` passed to the master process will be used.

Starting an IPC server as root may cause the server path to be inaccessible for
unprivileged users. Using `readableAll` and `writableAll` will make the server
accessible for all users.

If the `signal` option is enabled, calling `.abort()` on the corresponding
`AbortController` is similar to calling `.close()` on the server:

```js
const controller = new AbortController();
server.listen({
  host: 'localhost',
  port: 80,
  signal: controller.signal,
});
// Later, when you want to close the server.
controller.abort();
```

#### `server.listen(path, backlog)`

* `path` {string} Path the server should listen to. See
  Identifying paths for IPC connections.
* `backlog` {number} Common parameter of `server.listen()` functions.
* `callback` {Function}.
* Returns: {net.Server}

Start an IPC server listening for connections on the given `path`.

#### `server.listen([port[, host[, backlog]]][, callback])`

* `port` {number}
* `host` {string}
* `backlog` {number} Common parameter of `server.listen()` functions.
* `callback` {Function}.
* Returns: {net.Server}

Start a TCP server listening for connections on the given `port` and `host`.

If `port` is omitted or is 0, the operating system will assign an arbitrary
unused port, which can be retrieved by using `server.address().port`
after the `'listening'` event has been emitted.

If `host` is omitted, the server will accept connections on the
unspecified IPv6 address (`::`) when IPv6 is available, or the
unspecified IPv4 address (`0.0.0.0`) otherwise.

In most operating systems, listening to the unspecified IPv6 address (`::`)
may cause the `net.Server` to also listen on the unspecified IPv4 address
(`0.0.0.0`).

### `server.listening`

* Type: {boolean} Indicates whether or not the server is listening for connections.

### `server.maxConnections`

* Type: {integer}

When the number of connections reaches the `server.maxConnections` threshold:

1. If the process is not running in cluster mode, Node.js will close the connection.

2. If the process is running in cluster mode, Node.js will, by default, route the connection to another worker process. To close the connection instead, set `server.dropMaxConnection` to `true`.

It is not recommended to use this option once a socket has been sent to a child
with `child_process.fork()`.

### `server.dropMaxConnection`

* Type: {boolean}

Set this property to `true` to begin closing connections once the number of connections reaches the `server.maxConnections` threshold. This setting is only effective in cluster mode.

### `server.ref()`

* Returns: {net.Server}

Opposite of `unref()`, calling `ref()` on a previously `unref`ed server will
_not_ let the program exit if it's the only server left (the default behavior).
If the server is `ref`ed calling `ref()` again will have no effect.

### `server.unref()`

* Returns: {net.Server}

Calling `unref()` on a server will allow the program to exit if this is the only
active server in the event system. If the server is already `unref`ed calling
`unref()` again will have no effect.
