---
title: "Net (part 4 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/net.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Net (part 4 of 6)

### `socket.connecting`

* Type: {boolean}

If `true`,
`socket.connect(options[, connectListener])` was
called and has not yet finished. It will stay `true` until the socket becomes
connected, then it is set to `false` and the `'connect'` event is emitted. Note
that the
`socket.connect(options[, connectListener])`
callback is a listener for the `'connect'` event.

### `socket.destroy([error])`

* `error` {Object}
* Returns: {net.Socket}

Ensures that no more I/O activity happens on the current connection.
Destroys the stream and closes the connection.

See `writable.destroy()` for further details.

### `socket.destroyed`

* Type: {boolean} Indicates if the connection is destroyed or not. No further
  data can be transferred using a destroyed connection.

See `writable.destroyed` for further details.

### `socket.destroySoon()`

Destroys the socket after all data is written. If the `'finish'` event was
already emitted the socket is destroyed immediately. If the socket is still
writable it implicitly calls `socket.end()`.

### `socket.end(data[, encoding])`

* `data` {string|Buffer|Uint8Array}
* `encoding` {string} Only used when data is `string`. **Default:** `'utf8'`.
* `callback` {Function} Optional callback for when the socket is finished.
* Returns: {net.Socket} The socket itself.

Half-closes the socket. i.e., it sends a FIN packet. It is possible the
server will still send some data.

See `writable.end()` for further details.

### `socket.localAddress`

* Type: {string}

The string representation of the local IP address the remote client is
connecting on. For example, in a server listening on `'0.0.0.0'`, if a client
connects on `'192.168.1.1'`, the value of `socket.localAddress` would be
`'192.168.1.1'`.

### `socket.localPort`

* Type: {integer}

The numeric representation of the local port. For example, `80` or `21`.

### `socket.localFamily`

* Type: {string}

The string representation of the local IP family. `'IPv4'` or `'IPv6'`.

### `socket.pause()`

* Returns: {net.Socket} The socket itself.

Pauses the reading of data. That is, `'data'` events will not be emitted.
Useful to throttle back an upload.

### `socket.pending`

* Type: {boolean}

This is `true` if the socket is not connected yet, either because `.connect()`
has not yet been called or because it is still in the process of connecting
(see `socket.connecting`).

### `socket.ref()`

* Returns: {net.Socket} The socket itself.

Opposite of `unref()`, calling `ref()` on a previously `unref`ed socket will
_not_ let the program exit if it's the only socket left (the default behavior).
If the socket is `ref`ed calling `ref` again will have no effect.

### `socket.remoteAddress`

* Type: {string}

The string representation of the remote IP address. For example,
`'74.125.127.100'` or `'2001:4860:a005::68'`. Value may be `undefined` if
the socket is destroyed (for example, if the client disconnected).

### `socket.remoteFamily`

* Type: {string}

The string representation of the remote IP family. `'IPv4'` or `'IPv6'`. Value may be `undefined` if
the socket is destroyed (for example, if the client disconnected).

### `socket.remotePort`

* Type: {integer}

The numeric representation of the remote port. For example, `80` or `21`. Value may be `undefined` if
the socket is destroyed (for example, if the client disconnected).

### `socket.server`

* Type: {net.Server|null}

Reference to the server that accepted the socket. This is `null` for sockets
that were not accepted by a server.

### `socket.resetAndDestroy()`

* Returns: {net.Socket}

Close the TCP connection by sending an RST packet and destroy the stream.
If this TCP socket is in connecting status, it will send an RST packet and destroy this TCP socket once it is connected.
Otherwise, it will call `socket.destroy` with an `ERR_SOCKET_CLOSED` Error.
If this is not a TCP socket (for example, a pipe), calling this method will immediately throw an `ERR_INVALID_HANDLE_TYPE` Error.

### `socket.resume()`

* Returns: {net.Socket} The socket itself.

Resumes reading after a call to `socket.pause()`.

### `socket.setEncoding([encoding])`

* `encoding` {string}
* Returns: {net.Socket} The socket itself.

Set the encoding for the socket as a Readable Stream. See
`readable.setEncoding()` for more information.

### `socket.setKeepAlive()`

Enable/disable keep-alive functionality, and optionally configure the
keepalive probe timing. Returns the socket itself.

Possible signatures:

* `socket.setKeepAlive([options])`
* `socket.setKeepAlive([enable][, initialDelay][, interval][, count])`

Enabling keep-alive sets the initial delay before the first keepalive probe is
sent on an idle socket.

Set `initialDelay` (in milliseconds) to set the delay between the last
data packet received and the first keepalive probe. Setting `0` for
`initialDelay` will leave the value unchanged from the default
(or previous) setting.

Set `interval` (in milliseconds) to set the delay between successive
keepalive probes once they begin (`TCP_KEEPINTVL`). Set `count` to the
number of unacknowledged probes sent before the connection is dropped
(`TCP_KEEPCNT`). Both are only applied when keep-alive is enabled.
Omitting `interval` or `count` uses the defaults of `1000` ms and `10`.
As with `initialDelay`, a non-positive `interval` or `count` leaves the
corresponding system default unchanged.

`initialDelay` and `interval` are specified in milliseconds but the
underlying socket options are configured in whole seconds; the values are
divided by `1000` and rounded down before being applied. For example,
setting `initialDelay` to `400` will result in a `TCP_KEEPIDLE` of `0`
seconds (since `400 / 1000` rounds down to `0`).

Enabling the keep-alive functionality will set the following socket options:

* `SO_KEEPALIVE=1`
* `TCP_KEEPIDLE=initialDelay / 1000`
* `TCP_KEEPCNT=count`
* `TCP_KEEPINTVL=interval / 1000`

On Windows versions older than build 1709, keep-alive is configured through
`SIO_KEEPALIVE_VALS`, which has no probe-count field, so `count` is ignored on
those platforms.

#### `socket.setKeepAlive([options])`

* `options` {Object}
  * `enable` {boolean} **Default:** `false`
  * `initialDelay` {number} **Default:** `0`
  * `interval` {number} **Default:** `1000`
  * `count` {number} **Default:** `10`
* Returns: {net.Socket} The socket itself.

Configure keep-alive using an options object. See `socket.setKeepAlive()`
for a description of each property.

```js
socket.setKeepAlive({ enable: true, initialDelay: 1000, interval: 1000, count: 10 });
```

#### `socket.setKeepAlive(enable, interval)`

* `enable` {boolean} **Default:** `false`
* `initialDelay` {number} **Default:** `0`
* `interval` {number} **Default:** `1000`
* `count` {number} **Default:** `10`
* Returns: {net.Socket} The socket itself.

Configure keep-alive using positional arguments. See
`socket.setKeepAlive()` for a description of each argument.

### `socket.setNoDelay([noDelay])`

* `noDelay` {boolean} **Default:** `true`
* Returns: {net.Socket} The socket itself.

Enable/disable the use of Nagle's algorithm.

When a TCP connection is created, it will have Nagle's algorithm enabled.

Nagle's algorithm delays data before it is sent via the network. It attempts
to optimize throughput at the expense of latency.

Passing `true` for `noDelay` or not passing an argument will disable Nagle's
algorithm for the socket. Passing `false` for `noDelay` will enable Nagle's
algorithm.

### `socket.setTimeout(timeout[, callback])`

* `timeout` {number}
* `callback` {Function}
* Returns: {net.Socket} The socket itself.

Sets the socket to timeout after `timeout` milliseconds of inactivity on
the socket. By default `net.Socket` do not have a timeout.

When an idle timeout is triggered the socket will receive a `'timeout'`
event but the connection will not be severed. The user must manually call
`socket.end()` or `socket.destroy()` to end the connection.

```js
socket.setTimeout(3000);
socket.on('timeout', () => {
  console.log('socket timeout');
  socket.end();
});
```

If `timeout` is 0, then the existing idle timeout is disabled.

The optional `callback` parameter will be added as a one-time listener for the
`'timeout'` event.

### `socket.getTypeOfService()`

* Returns: {integer} The current TOS value.

Returns the current Type of Service (TOS) field for IPv4 packets or Traffic
Class for IPv6 packets for this socket.

`setTypeOfService()` may be called before the socket is connected; the value
will be cached and applied when the socket establishes a connection.
`getTypeOfService()` will return the currently set value even before connection.

On some platforms (e.g., Linux), certain TOS/ECN bits may be masked or ignored,
and behavior can differ between IPv4 and IPv6 or dual-stack sockets. Callers
should verify platform-specific semantics.

### `socket.setTypeOfService(tos)`

* `tos` {integer} The TOS value to set (0-255).
* Returns: {net.Socket} The socket itself.

Sets the Type of Service (TOS) field for IPv4 packets or Traffic Class for IPv6
Packets sent from this socket. This can be used to prioritize network traffic.

`setTypeOfService()` may be called before the socket is connected; the value
will be cached and applied when the socket establishes a connection.
`getTypeOfService()` will return the currently set value even before connection.

On some platforms (e.g., Linux), certain TOS/ECN bits may be masked or ignored,
and behavior can differ between IPv4 and IPv6 or dual-stack sockets. Callers
should verify platform-specific semantics.

### `socket.timeout`

* Type: {number|undefined}

The socket timeout in milliseconds as set by `socket.setTimeout()`.
It is `undefined` if a timeout has not been set.

### `socket.unref()`

* Returns: {net.Socket} The socket itself.

Calling `unref()` on a socket will allow the program to exit if this is the only
active socket in the event system. If the socket is already `unref`ed calling
`unref()` again will have no effect.

### `socket.write(data, encoding)`

* `data` {string|Buffer|Uint8Array}
* `encoding` {string} Only used when data is `string`. **Default:** `utf8`.
* `callback` {Function}
* Returns: {boolean}

Sends data on the socket. The second parameter specifies the encoding in the
case of a string. It defaults to UTF8 encoding.

Returns `true` if the entire data was flushed successfully to the kernel
buffer. Returns `false` if all or part of the data was queued in user memory.
`'drain'` will be emitted when the buffer is again free.

The optional `callback` parameter will be executed when the data is finally
written out, which may not be immediately.

See `Writable` stream `write()` method for more
information.

### `socket.readyState`

* Type: {string}

This property represents the state of the connection as a string.

* If the socket is connecting, `socket.readyState` is `opening`.
* If the socket is readable and writable, it is `open`.
* If the socket is readable and not writable, it is `readOnly`.
* If the socket is not readable and writable, it is `writeOnly`.
* Otherwise, it is `closed`.
