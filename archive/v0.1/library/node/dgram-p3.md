---
title: "UDP/datagram sockets (part 3 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dgram.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# UDP/datagram sockets (part 3 of 4)

### `socket.ref()`

* Returns: {dgram.Socket}

By default, binding a socket will cause it to block the Node.js process from
exiting as long as the socket is open. The `socket.unref()` method can be used
to exclude the socket from the reference counting that keeps the Node.js
process active. The `socket.ref()` method adds the socket back to the reference
counting and restores the default behavior.

Calling `socket.ref()` multiple times will have no additional effect.

The `socket.ref()` method returns a reference to the socket so calls can be
chained.

### `socket.remoteAddress()`

* Returns: {Object}

Returns an object containing the `address`, `family`, and `port` of the remote
endpoint. This method throws an `ERR_SOCKET_DGRAM_NOT_CONNECTED` exception
if the socket is not connected.

### `socket.send(msg, offset, length, address)`

* `msg` {Buffer|TypedArray|DataView|string|Array} Message to be sent.
* `offset` {integer} Offset in the buffer where the message starts.
* `length` {integer} Number of bytes in the message.
* `port` {integer} Destination port.
* `address` {string} Destination host name or IP address.
* `callback` {Function} Called when the message has been sent.

Broadcasts a datagram on the socket.
For connectionless sockets, the destination `port` and `address` must be
specified. Connected sockets, on the other hand, will use their associated
remote endpoint, so the `port` and `address` arguments must not be set.

The `msg` argument contains the message to be sent.
Depending on its type, different behavior can apply. If `msg` is a `Buffer`,
any `TypedArray` or a `DataView`,
the `offset` and `length` specify the offset within the `Buffer` where the
message begins and the number of bytes in the message, respectively.
If `msg` is a `String`, then it is automatically converted to a `Buffer`
with `'utf8'` encoding. With messages that
contain multi-byte characters, `offset` and `length` will be calculated with
respect to byte length and not the character position.
If `msg` is an array, `offset` and `length` must not be specified.

The `address` argument is a string. If the value of `address` is a host name,
DNS will be used to resolve the address of the host. If `address` is not
provided or otherwise nullish, `'127.0.0.1'` (for `udp4` sockets) or `'::1'`
(for `udp6` sockets) will be used by default.

If the socket has not been previously bound with a call to `bind`, the socket
is assigned a random port number and is bound to the "all interfaces" address
(`'0.0.0.0'` for `udp4` sockets, `'::0'` for `udp6` sockets.)

An optional `callback` function may be specified to as a way of reporting
DNS errors or for determining when it is safe to reuse the `buf` object.
DNS lookups delay the time to send for at least one tick of the
Node.js event loop.

The only way to know for sure that the datagram has been sent is by using a
`callback`. If an error occurs and a `callback` is given, the error will be
passed as the first argument to the `callback`. If a `callback` is not given,
the error is emitted as an `'error'` event on the `socket` object.

Offset and length are optional but both _must_ be set if either are used.
They are supported only when the first argument is a `Buffer`, a `TypedArray`,
or a `DataView`.

This method throws `ERR_SOCKET_BAD_PORT` if called on an unbound socket.

Example of sending a UDP packet to a port on `localhost`;

```mjs
import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
  client.close();
});
```

```cjs
const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
  client.close();
});
```

Example of sending a UDP packet composed of multiple buffers to a port on
`127.0.0.1`;

```mjs
import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('Some ');
const buf2 = Buffer.from('bytes');
const client = dgram.createSocket('udp4');
client.send([buf1, buf2], 41234, (err) => {
  client.close();
});
```

```cjs
const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from('Some ');
const buf2 = Buffer.from('bytes');
const client = dgram.createSocket('udp4');
client.send([buf1, buf2], 41234, (err) => {
  client.close();
});
```

Sending multiple buffers might be faster or slower, depending on the
application and operating system. Run benchmarks to
determine the optimal strategy on a case-by-case basis. Generally speaking,
however, sending multiple buffers is faster.

Example of sending a UDP packet using a socket connected to a port on
`localhost`:

```mjs
import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.connect(41234, 'localhost', (err) => {
  client.send(message, (err) => {
    client.close();
  });
});
```

```cjs
const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.connect(41234, 'localhost', (err) => {
  client.send(message, (err) => {
    client.close();
  });
});
```

#### Note about UDP datagram size

The maximum size of an IPv4/v6 datagram depends on the `MTU`
(Maximum Transmission Unit) and on the `Payload Length` field size.

* The `Payload Length` field is 16 bits wide, which means that a normal
  payload cannot exceed 64K octets including the internet header and data
  (65,507 bytes = 65,535 − 8 bytes UDP header − 20 bytes IP header);
  this is generally true for loopback interfaces, but such long datagram
  messages are impractical for most hosts and networks.

* The `MTU` is the largest size a given link layer technology can support for
  datagram messages. For any link, IPv4 mandates a minimum `MTU` of 68
  octets, while the recommended `MTU` for IPv4 is 576 (typically recommended
  as the `MTU` for dial-up type applications), whether they arrive whole or in
  fragments.

  For IPv6, the minimum `MTU` is 1280 octets. However, the mandatory minimum
  fragment reassembly buffer size is 1500 octets. The value of 68 octets is
  very small, since most current link layer technologies, like Ethernet, have a
  minimum `MTU` of 1500.

It is impossible to know in advance the MTU of each link through which
a packet might travel. Sending a datagram greater than the receiver `MTU` will
not work because the packet will get silently dropped without informing the
source that the data did not reach its intended recipient.

### `socket.setBroadcast(flag)`

* `flag` {boolean}

Sets or clears the `SO_BROADCAST` socket option. When set to `true`, UDP
packets may be sent to a local interface's broadcast address.

This method throws `EBADF` if called on an unbound socket.

### `socket.setMulticastInterface(multicastInterface)`

* `multicastInterface` {string}

_All references to scope in this section are referring to
IPv6 Zone Indexes, which are defined by RFC 4007. In string form, an IP
with a scope index is written as `'IP%scope'` where scope is an interface name
or interface number._

Sets the default outgoing multicast interface of the socket to a chosen
interface or back to system interface selection. The `multicastInterface` must
be a valid string representation of an IP from the socket's family.

For IPv4 sockets, this should be the IP configured for the desired physical
interface. All packets sent to multicast on the socket will be sent on the
interface determined by the most recent successful use of this call.

For IPv6 sockets, `multicastInterface` should include a scope to indicate the
interface as in the examples that follow. In IPv6, individual `send` calls can
also use explicit scope in addresses, so only packets sent to a multicast
address without specifying an explicit scope are affected by the most recent
successful use of this call.

This method throws `EBADF` if called on an unbound socket.

#### Example: IPv6 outgoing multicast interface

On most systems, where scope format uses the interface name:

```js
const socket = dgram.createSocket('udp6');

socket.bind(1234, () => {
  socket.setMulticastInterface('::%eth1');
});
```

On Windows, where scope format uses an interface number:

```js
const socket = dgram.createSocket('udp6');

socket.bind(1234, () => {
  socket.setMulticastInterface('::%2');
});
```

#### Example: IPv4 outgoing multicast interface

All systems use an IP of the host on the desired physical interface:

```js
const socket = dgram.createSocket('udp4');

socket.bind(1234, () => {
  socket.setMulticastInterface('10.0.0.2');
});
```

#### Call results

A call on a socket that is not ready to send or no longer open may throw a _Not
running_ `Error`.

If `multicastInterface` cannot be parsed into an IP then an _EINVAL_
`System Error` is thrown.

On IPv4, if `multicastInterface` is a valid address but does not match any
interface, or if the address does not match the family then
a `System Error` such as `EADDRNOTAVAIL` or `EPROTONOSUP` is thrown.

On IPv6, most errors with specifying or omitting scope will result in the socket
continuing to use (or returning to) the system's default interface selection.

A socket's address family's ANY address (IPv4 `'0.0.0.0'` or IPv6 `'::'`) can be
used to return control of the sockets default outgoing interface to the system
for future multicast packets.

### `socket.setMulticastLoopback(flag)`

* `flag` {boolean}

Sets or clears the `IP_MULTICAST_LOOP` socket option. When set to `true`,
multicast packets will also be received on the local interface.

This method throws `EBADF` if called on an unbound socket.

### `socket.setMulticastTTL(ttl)`

* `ttl` {integer}

Sets the `IP_MULTICAST_TTL` socket option. While TTL generally stands for
"Time to Live", in this context it specifies the number of IP hops that a
packet is allowed to travel through, specifically for multicast traffic. Each
router or gateway that forwards a packet decrements the TTL. If the TTL is
decremented to 0 by a router, it will not be forwarded.

The `ttl` argument may be between 0 and 255. The default on most systems is `1`.

This method throws `EBADF` if called on an unbound socket.

### `socket.setRecvBufferSize(size)`

* `size` {integer}

Sets the `SO_RCVBUF` socket option. Sets the maximum socket receive buffer
in bytes.

This method throws `ERR_SOCKET_BUFFER_SIZE` if called on an unbound socket.

### `socket.setSendBufferSize(size)`

* `size` {integer}

Sets the `SO_SNDBUF` socket option. Sets the maximum socket send buffer
in bytes.

This method throws `ERR_SOCKET_BUFFER_SIZE` if called on an unbound socket.

### `socket.setTTL(ttl)`

* `ttl` {integer}

Sets the `IP_TTL` socket option. While TTL generally stands for "Time to Live",
in this context it specifies the number of IP hops that a packet is allowed to
travel through. Each router or gateway that forwards a packet decrements the
TTL. If the TTL is decremented to 0 by a router, it will not be forwarded.
Changing TTL values is typically done for network probes or when multicasting.

The `ttl` argument may be between 1 and 255. The default on most systems
is 64.

This method throws `EBADF` if called on an unbound socket.

### `socket.unref()`

* Returns: {dgram.Socket}

By default, binding a socket will cause it to block the Node.js process from
exiting as long as the socket is open. The `socket.unref()` method can be used
to exclude the socket from the reference counting that keeps the Node.js
process active, allowing the process to exit even if the socket is still
listening.

Calling `socket.unref()` multiple times will have no additional effect.

The `socket.unref()` method returns a reference to the socket so calls can be
chained.
