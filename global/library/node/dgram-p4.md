---
title: "UDP/datagram sockets (part 4 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dgram.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# UDP/datagram sockets (part 4 of 4)

## `node:dgram` module functions

### `dgram.createSocket(options[, callback])`

* `options` {Object} Available options are:
  * `type` {string} The family of socket. Must be either `'udp4'` or `'udp6'`.
    Required.
  * `reuseAddr` {boolean} When `true` `socket.bind()` will reuse the
    address, even if another process has already bound a socket on it, but
    only one socket can receive the data.
    **Default:** `false`.
  * `reusePort` {boolean} When `true` `socket.bind()` will reuse the
    port, even if another process has already bound a socket on it. Incoming
    datagrams are distributed to listening sockets. The option is available
    only on some platforms, such as Linux 3.9+, DragonFlyBSD 3.6+, FreeBSD 12.0+,
    Solaris 11.4, and AIX 7.2.5+. On unsupported platforms, this option raises
    an error when the socket is bound.
    **Default:** `false`.
  * `ipv6Only` {boolean} Setting `ipv6Only` to `true` will
    disable dual-stack support, i.e., binding to address `::` won't make
    `0.0.0.0` be bound. **Default:** `false`.
  * `recvBufferSize` {number} Sets the `SO_RCVBUF` socket value.
  * `sendBufferSize` {number} Sets the `SO_SNDBUF` socket value.
  * `lookup` {Function} Custom lookup function. **Default:** `dns.lookup()`.
    When the default is used, a literal IP address of the socket's family
    resolves to itself without calling `dns.lookup()`.
  * `signal` {AbortSignal} An AbortSignal that may be used to close a socket.
  * `receiveBlockList` {net.BlockList} `receiveBlockList` can be used for discarding
    inbound datagram to specific IP addresses, IP ranges, or IP subnets. This does not
    work if the server is behind a reverse proxy, NAT, etc. because the address
    checked against the blocklist is the address of the proxy, or the one
    specified by the NAT.
  * `sendBlockList` {net.BlockList} `sendBlockList` can be used for disabling outbound
    access to specific IP addresses, IP ranges, or IP subnets.
* `callback` {Function} Attached as a listener for `'message'` events. Optional.
* Returns: {dgram.Socket}

Creates a `dgram.Socket` object. Once the socket is created, calling
`socket.bind()` will instruct the socket to begin listening for datagram
messages. When `address` and `port` are not passed to `socket.bind()` the
method will bind the socket to the "all interfaces" address on a random port
(it does the right thing for both `udp4` and `udp6` sockets). The bound address
and port can be retrieved using `socket.address().address` and
`socket.address().port`.

If the `signal` option is enabled, calling `.abort()` on the corresponding
`AbortController` is similar to calling `.close()` on the socket:

```js
const controller = new AbortController();
const { signal } = controller;
const server = dgram.createSocket({ type: 'udp4', signal });
server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
// Later, when you want to close the server.
controller.abort();
```

### `dgram.createSocket(type[, callback])`

* `type` {string} Either `'udp4'` or `'udp6'`.
* `callback` {Function} Attached as a listener to `'message'` events.
* Returns: {dgram.Socket}

Creates a `dgram.Socket` object of the specified `type`.

Once the socket is created, calling `socket.bind()` will instruct the
socket to begin listening for datagram messages. When `address` and `port` are
not passed to `socket.bind()` the method will bind the socket to the "all
interfaces" address on a random port (it does the right thing for both `udp4`
and `udp6` sockets). The bound address and port can be retrieved using
`socket.address().address` and `socket.address().port`.
