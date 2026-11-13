---
title: "UDP/datagram sockets (part 2 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dgram.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# UDP/datagram sockets (part 2 of 4)

## Class: `dgram.Socket`

* Extends: {EventEmitter}

Encapsulates the datagram functionality.

New instances of `dgram.Socket` are created using `dgram.createSocket()`.
The `new` keyword is not to be used to create `dgram.Socket` instances.

### Event: `'close'`

The `'close'` event is emitted after a socket is closed with `close()`.
Once triggered, no new `'message'` events will be emitted on this socket.

### Event: `'connect'`

The `'connect'` event is emitted after a socket is associated to a remote
address as a result of a successful `connect()` call.

### Event: `'error'`

* `exception` {Error}

The `'error'` event is emitted whenever any error occurs. The event handler
function is passed a single `Error` object.

### Event: `'listening'`

The `'listening'` event is emitted once the `dgram.Socket` is addressable and
can receive data. This happens either explicitly with `socket.bind()` or
implicitly the first time data is sent using `socket.send()`.
Until the `dgram.Socket` is listening, the underlying system resources do not
exist and calls such as `socket.address()` and `socket.setTTL()` will fail.

### Event: `'message'`

The `'message'` event is emitted when a new datagram is available on a socket.
The event handler function is passed two arguments: `msg` and `rinfo`.

* `msg` {Buffer} The message.
* `rinfo` {Object} Remote address information.
  * `address` {string} The sender address.
  * `family` {string} The address family (`'IPv4'` or `'IPv6'`).
  * `port` {number} The sender port.
  * `size` {number} The message size.

If the source address of the incoming packet is an IPv6 link-local
address, the interface name is added to the `address`. For
example, a packet received on the `en0` interface might have the
address field set to `'fe80::2618:1234:ab11:3b9c%en0'`, where `'%en0'`
is the interface name as a zone ID suffix.

### `socket.addMembership(multicastAddress[, multicastInterface])`

* `multicastAddress` {string}
* `multicastInterface` {string}

Tells the kernel to join a multicast group at the given `multicastAddress` and
`multicastInterface` using the `IP_ADD_MEMBERSHIP` socket option. If the
`multicastInterface` argument is not specified, the operating system will choose
one interface and will add membership to it. To add membership to every
available interface, call `addMembership` multiple times, once per interface.

When called on an unbound socket, this method will implicitly bind to a random
port, listening on all interfaces.

When sharing a UDP socket across multiple `cluster` workers, the
`socket.addMembership()` function must be called only once or an
`EADDRINUSE` error will occur:

```mjs
import cluster from 'node:cluster';
import dgram from 'node:dgram';

if (cluster.isPrimary) {
  cluster.fork(); // Works ok.
  cluster.fork(); // Fails with EADDRINUSE.
} else {
  const s = dgram.createSocket('udp4');
  s.bind(1234, () => {
    s.addMembership('224.0.0.114');
  });
}
```

```cjs
const cluster = require('node:cluster');
const dgram = require('node:dgram');

if (cluster.isPrimary) {
  cluster.fork(); // Works ok.
  cluster.fork(); // Fails with EADDRINUSE.
} else {
  const s = dgram.createSocket('udp4');
  s.bind(1234, () => {
    s.addMembership('224.0.0.114');
  });
}
```

### `socket.addSourceSpecificMembership(sourceAddress, groupAddress[, multicastInterface])`

* `sourceAddress` {string}
* `groupAddress` {string}
* `multicastInterface` {string}

Tells the kernel to join a source-specific multicast channel at the given
`sourceAddress` and `groupAddress`, using the `multicastInterface` with the
`IP_ADD_SOURCE_MEMBERSHIP` socket option. If the `multicastInterface` argument
is not specified, the operating system will choose one interface and will add
membership to it. To add membership to every available interface, call
`socket.addSourceSpecificMembership()` multiple times, once per interface.

When called on an unbound socket, this method will implicitly bind to a random
port, listening on all interfaces.

### `socket.address()`

* Returns: {Object}

Returns an object containing the address information for a socket.
For UDP sockets, this object will contain `address`, `family`, and `port`
properties.

This method throws `EBADF` if called on an unbound socket.

### `socket.bind(port[, callback])`

* `port` {integer}
* `address` {string}
* `callback` {Function} with no parameters. Called when binding is complete.

For UDP sockets, causes the `dgram.Socket` to listen for datagram
messages on a named `port` and optional `address`. If `port` is not
specified or is `0`, the operating system will attempt to bind to a
random port. If `address` is not specified, the operating system will
attempt to listen on all addresses. Once binding is complete, a
`'listening'` event is emitted and the optional `callback` function is
called.

Specifying both a `'listening'` event listener and passing a
`callback` to the `socket.bind()` method is not harmful but not very
useful.

A bound datagram socket keeps the Node.js process running to receive
datagram messages.

If binding fails, an `'error'` event is generated. In rare cases (e.g.,
attempting to bind with a closed socket), an `Error` may be thrown.

Example of a UDP server listening on port 41234:

```mjs
import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
// Prints: server listening 0.0.0.0:41234
```

```cjs
const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
// Prints: server listening 0.0.0.0:41234
```

### `socket.bind(options[, callback])`

* `options` {Object} Required. Supports the following properties:
  * `port` {integer}
  * `address` {string}
  * `exclusive` {boolean}
  * `fd` {integer}
* `callback` {Function}

For UDP sockets, causes the `dgram.Socket` to listen for datagram
messages on a named `port` and optional `address` that are passed as
properties of an `options` object passed as the first argument. If
`port` is not specified or is `0`, the operating system will attempt
to bind to a random port. If `address` is not specified, the operating
system will attempt to listen on all addresses. Once binding is
complete, a `'listening'` event is emitted and the optional `callback`
function is called.

The `options` object may contain a `fd` property. When a `fd` greater
than `0` is set, it will wrap around an existing socket with the given
file descriptor. In this case, the properties of `port` and `address`
will be ignored.

Specifying both a `'listening'` event listener and passing a
`callback` to the `socket.bind()` method is not harmful but not very
useful.

The `options` object may contain an additional `exclusive` property that is
used when using `dgram.Socket` objects with the `cluster` module. When
`exclusive` is set to `false` (the default), cluster workers will use the same
underlying socket handle allowing connection handling duties to be shared.
When `exclusive` is `true`, however, the handle is not shared and attempted
port sharing results in an error. Creating a `dgram.Socket` with the `reusePort`
option set to `true` causes `exclusive` to always be `true` when `socket.bind()`
is called.

A bound datagram socket keeps the Node.js process running to receive
datagram messages.

If binding fails, an `'error'` event is generated. In rare cases (e.g.,
attempting to bind with a closed socket), an `Error` may be thrown.

An example socket listening on an exclusive port is shown below.

```js
socket.bind({
  address: 'localhost',
  port: 8000,
  exclusive: true,
});
```

### `socket.bindSync([options])`

* `options` {Object}
  * `port` {integer} If omitted or `0`, the operating system will assign an
    arbitrary unused port. **Default:** `0`.
  * `address` {string} A numeric IP address to bind to. Unlike
    `socket.bind()`, no DNS resolution is performed, so a host name is not
    accepted. If omitted, the operating system binds to all addresses
    (`'0.0.0.0'` for `udp4` sockets, `'::'` for `udp6`).
* Returns: {Object} The bound address as returned by `socket.address()`.

The synchronous counterpart of `socket.bind()`. `bind(2)` is a local,
non-blocking system call, so the bind is performed inline and the resolved
address is returned immediately, including the operating-system-assigned
ephemeral port when `port` is `0`:

```js
const dgram = require('node:dgram');

const socket = dgram.createSocket('udp4');
const address = socket.bindSync({ address: '0.0.0.0', port: 0 });
console.log(address); // e.g. { address: '0.0.0.0', family: 'IPv4', port: 53124 }
```

A bind failure such as `EADDRINUSE` is thrown synchronously rather than emitted
as an `'error'` event. After `bindSync()` returns, `socket.address()` is
valid synchronously and the `'listening'` event is emitted on the next tick.

`address` must be a numeric IP literal; `bindSync()` never performs DNS
resolution (asynchronous name resolution being the only genuinely blocking part
of binding). Incoming datagrams continue to be delivered asynchronously via the
`'message'` event. `bindSync()` always binds the socket's own handle and
does not participate in `cluster` handle sharing.

### `socket.close([callback])`

* `callback` {Function} Called when the socket has been closed.

Close the underlying socket and stop listening for data on it. If a callback is
provided, it is added as a listener for the `'close'` event.

### `socketSymbol.asyncDispose`

Calls `socket.close()` and returns a promise that fulfills when the
socket has closed.

### `socket.connect(port, address)`

* `port` {integer}
* `address` {string}
* `callback` {Function} Called when the connection is completed or on error.

Associates the `dgram.Socket` to a remote address and port. Every
message sent by this handle is automatically sent to that destination. Also,
the socket will only receive messages from that remote peer.
Trying to call `connect()` on an already connected socket will result
in an `ERR_SOCKET_DGRAM_IS_CONNECTED` exception. If `address` is not
provided, `'127.0.0.1'` (for `udp4` sockets) or `'::1'` (for `udp6` sockets)
will be used by default. Once the connection is complete, a `'connect'` event
is emitted and the optional `callback` function is called. In case of failure,
the `callback` is called or, failing this, an `'error'` event is emitted.

### `socket.connectSync(port[, address])`

* `port` {integer}
* `address` {string} A numeric IP address to connect to. Unlike
  `socket.connect()`, no DNS resolution is performed, so a host name is not
  accepted. If omitted, `'127.0.0.1'` (for `udp4` sockets) or `'::1'` (for
  `udp6` sockets) is used.

The synchronous counterpart of `socket.connect()`. For a UDP socket
`connect(2)` only records the default peer address and is a local, non-blocking
system call, so the association is performed inline. Any error raised by the
call itself (for example `EAFNOSUPPORT` for a mismatched address family) is
thrown synchronously rather than reported via the `'error'` event. Because
`connect(2)` does not probe reachability, errors such as `ECONNREFUSED` are
still surfaced asynchronously on a later send or receive, exactly as for
`socket.connect()`:

```js
const dgram = require('node:dgram');

const socket = dgram.createSocket('udp4');
socket.connectSync(41234, '127.0.0.1');
console.log(socket.remoteAddress()); // { address: '127.0.0.1', family: 'IPv4', port: 41234 }
```

If the socket is still unbound it is bound synchronously first. After
`connectSync()` returns, `socket.remoteAddress()` is valid synchronously
and the `'connect'` event is emitted on the next tick. Trying to call
`connectSync()` on an already connected socket throws an
`ERR_SOCKET_DGRAM_IS_CONNECTED` exception, and calling it while an
asynchronous `socket.bind()` is still in progress throws an
`ERR_SOCKET_ALREADY_BOUND` exception.

`address` must be a numeric IP literal; `connectSync()` never performs DNS
resolution (asynchronous name resolution being the only genuinely blocking part
of connecting).

### `socket.disconnect()`

A synchronous function that disassociates a connected `dgram.Socket` from
its remote address. Trying to call `disconnect()` on an unbound or already
disconnected socket will result in an `ERR_SOCKET_DGRAM_NOT_CONNECTED`
exception.

### `socket.dropMembership(multicastAddress[, multicastInterface])`

* `multicastAddress` {string}
* `multicastInterface` {string}

Instructs the kernel to leave a multicast group at `multicastAddress` using the
`IP_DROP_MEMBERSHIP` socket option. This method is automatically called by the
kernel when the socket is closed or the process terminates, so most apps will
never have reason to call this.

If `multicastInterface` is not specified, the operating system will attempt to
drop membership on all valid interfaces.

### `socket.dropSourceSpecificMembership(sourceAddress, groupAddress[, multicastInterface])`

* `sourceAddress` {string}
* `groupAddress` {string}
* `multicastInterface` {string}

Instructs the kernel to leave a source-specific multicast channel at the given
`sourceAddress` and `groupAddress` using the `IP_DROP_SOURCE_MEMBERSHIP`
socket option. This method is automatically called by the kernel when the
socket is closed or the process terminates, so most apps will never have
reason to call this.

If `multicastInterface` is not specified, the operating system will attempt to
drop membership on all valid interfaces.

### `socket.getRecvBufferSize()`

* Returns: {number} the `SO_RCVBUF` socket receive buffer size in bytes.

This method throws `ERR_SOCKET_BUFFER_SIZE` if called on an unbound socket.

### `socket.getSendBufferSize()`

* Returns: {number} the `SO_SNDBUF` socket send buffer size in bytes.

This method throws `ERR_SOCKET_BUFFER_SIZE` if called on an unbound socket.

### `socket.getSendQueueSize()`

* Returns: {number} Number of bytes queued for sending.

### `socket.getSendQueueCount()`

* Returns: {number} Number of send requests currently in the queue awaiting
  to be processed.
