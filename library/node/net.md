---
title: "Net (part 1 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/net.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Net

> Stability: 2 - Stable

The `node:net` module provides an asynchronous network API for creating stream-based
TCP or IPC servers (`net.createServer()`) and clients
(`net.createConnection()`).

It can be accessed using:

```mjs
import net from 'node:net';
```

```cjs
const net = require('node:net');
```

## IPC support

The `node:net` module supports IPC with named pipes on Windows, and Unix domain
sockets on other operating systems.

### Identifying paths for IPC connections

`net.connect()`, `net.createConnection()`, `server.listen()`, and
`socket.connect()` take a `path` parameter to identify IPC endpoints.

On Unix, the local domain is also known as the Unix domain. The path is a
file system pathname. It will throw an error when the length of pathname is
greater than the length of `sizeof(sockaddr_un.sun_path)`. Typical values are
107 bytes on Linux and 103 bytes on macOS. If a Node.js API abstraction creates
the Unix domain socket, it will unlink the Unix domain socket as well. For
example, `net.createServer()` may create a Unix domain socket and
`server.close()` will unlink it. But if a user creates the Unix domain
socket outside of these abstractions, the user will need to remove it. The same
applies when a Node.js API creates a Unix domain socket but the program then
crashes. In short, a Unix domain socket will be visible in the file system and
will persist until unlinked. On Linux, You can use Unix abstract socket by adding
`\0` to the beginning of the path, such as `\0abstract`. The path to the Unix
abstract socket is not visible in the file system and it will disappear automatically
when all open references to the socket are closed.

On Windows, the local domain is implemented using a named pipe. The path _must_
refer to an entry in `\\?\pipe\` or `\\.\pipe\`. Any characters are permitted,
but the latter may do some processing of pipe names, such as resolving `..`
sequences. Despite how it might look, the pipe namespace is flat. Pipes will
_not persist_. They are removed when the last reference to them is closed.
Unlike Unix domain sockets, Windows will close and remove the pipe when the
owning process exits.

JavaScript string escaping requires paths to be specified with extra backslash
escaping such as:

```js
net.createServer().listen(
  path.join('\\\\?\\pipe', process.cwd(), 'myctl'));
```

## Class: `net.BlockList`

The `BlockList` object can be used with some network APIs to specify rules for
disabling inbound or outbound access to specific IP addresses, IP ranges, or
IP subnets.

### `blockList.addAddress(address[, type])`

* `address` {string|net.SocketAddress} An IPv4 or IPv6 address.
* `type` {string} Either `'ipv4'` or `'ipv6'`. **Default:** `'ipv4'`.

Adds a rule to block the given IP address.

### `blockList.addAddresses(addresses[, type])`

* `addresses` {string\[]|net.SocketAddress\[]} An array of IPv4 or IPv6
  addresses.
* `type` {string} Either `'ipv4'` or `'ipv6'`. **Default:** `'ipv4'`.

Adds multiple address rules to the block list in a single operation.
This is more efficient than calling `blockList.addAddress()` repeatedly
when adding a large number of individual addresses, as the addresses
are inserted under a single internal lock acquisition.

### `blockList.addCIDR(cidr)`

* `cidr` {string} An IPv4 or IPv6 subnet in CIDR notation (e.g.
  `'10.0.0.0/8'` or `'2001:db8::/32'`).

Adds a subnet rule using CIDR notation. The address family is automatically
detected from the address (IPv6 if the address contains `':'`, IPv4
otherwise). This is equivalent to calling `blockList.addSubnet()` with
the parsed network address, prefix length, and family.

### `blockList.addCIDRs(cidrs)`

* `cidrs` {string\[]} An array of IPv4 or IPv6 subnets in CIDR notation.

Adds multiple subnet rules using CIDR notation in a single call. The address
family for each entry is automatically detected. This is equivalent to
calling `blockList.addCIDR()` for each element of the array.

### `blockList.addRange(start, end[, type])`

* `start` {string|net.SocketAddress} The starting IPv4 or IPv6 address in the
  range.
* `end` {string|net.SocketAddress} The ending IPv4 or IPv6 address in the range.
* `type` {string} Either `'ipv4'` or `'ipv6'`. **Default:** `'ipv4'`.

Adds a rule to block a range of IP addresses from `start` (inclusive) to
`end` (inclusive).

### `blockList.addSubnet(net, prefix[, type])`

* `net` {string|net.SocketAddress} The network IPv4 or IPv6 address.
* `prefix` {number} The number of CIDR prefix bits. For IPv4, this
  must be a value between `0` and `32`. For IPv6, this must be between
  `0` and `128`.
* `type` {string} Either `'ipv4'` or `'ipv6'`. **Default:** `'ipv4'`.

Adds a rule to block a range of IP addresses specified as a subnet mask.

### `blockList.check(address[, type])`

* `address` {string|net.SocketAddress} The IP address to check
* `type` {string} Either `'ipv4'` or `'ipv6'`. **Default:** `'ipv4'`.
* Returns: {boolean}

Returns `true` if the given IP address matches any of the rules added to the
`BlockList`.

```js
const blockList = new net.BlockList();
blockList.addAddress('123.123.123.123');
blockList.addRange('10.0.0.1', '10.0.0.10');
blockList.addSubnet('8592:757c:efae:4e45::', 64, 'ipv6');

console.log(blockList.check('123.123.123.123'));  // Prints: true
console.log(blockList.check('10.0.0.3'));  // Prints: true
console.log(blockList.check('222.111.111.222'));  // Prints: false

// IPv6 notation for IPv4 addresses works:
console.log(blockList.check('::ffff:7b7b:7b7b', 'ipv6')); // Prints: true
console.log(blockList.check('::ffff:123.123.123.123', 'ipv6')); // Prints: true
```

### `blockList.clear()`

Clears all rules from the `BlockList`.

### `blockList.fromJSON(value)`

> Stability: 1.2 - Release candidate

```js
const blockList = new net.BlockList();
const data = [
  'Subnet: IPv4 192.168.1.0/24',
  'Address: IPv4 10.0.0.5',
  'Range: IPv4 192.168.2.1-192.168.2.10',
  'Range: IPv4 10.0.0.1-10.0.0.10',
];
blockList.fromJSON(data);
blockList.fromJSON(JSON.stringify(data));
```

* `value` Blocklist.rules

### `BlockList.isBlockList(value)`

* `value` {any} Any JS value
* Returns {boolean} `true` if the `value` is a `net.BlockList`.

### `BlockList.PRIVATE_RANGES`

* Type: {string\[]}

A frozen array of CIDR strings representing private, loopback, and link-local
IP address ranges. This can be passed to `blockList.addCIDRs()` to quickly
populate a blocklist with all non-routable address ranges.

The included ranges are:

* `10.0.0.0/8` — RFC 1918 private IPv4
* `172.16.0.0/12` — RFC 1918 private IPv4
* `192.168.0.0/16` — RFC 1918 private IPv4
* `127.0.0.0/8` — IPv4 loopback
* `::1/128` — IPv6 loopback
* `169.254.0.0/16` — IPv4 link-local
* `fe80::/10` — IPv6 link-local
* `fc00::/7` — IPv6 unique local (ULA)

```js
const blockList = new net.BlockList();
blockList.addCIDRs(net.BlockList.PRIVATE_RANGES);

console.log(blockList.check('10.0.0.1'));      // Prints: true
console.log(blockList.check('127.0.0.1'));     // Prints: true
console.log(blockList.check('8.8.8.8'));       // Prints: false
```

### `blockList.removeAddress(address[, type])`

* `address` {string|net.SocketAddress} An IPv4 or IPv6 address.
* `type` {string} Either `'ipv4'` or `'ipv6'`. **Default:** `'ipv4'`.

Removes a rule that was previously added with `blockList.addAddress()`. The
address must match exactly the value used when the rule was added. If the
specified address does not exist, this is a no-op.

### `blockList.removeCIDR(cidr)`

* `cidr` {string} An IPv4 or IPv6 subnet in CIDR notation (e.g.
  `'10.0.0.0/8'` or `'2001:db8::/32'`).

Removes a subnet rule using CIDR notation. The address family is automatically
detected from the address. This is equivalent to calling
`blockList.removeSubnet()` with the parsed network address, prefix length,
and family. If the specified subnet does not exist, this is a no-op.

### `blockList.removeRange(start, end[, type])`

* `start` {string|net.SocketAddress} The starting IPv4 or IPv6 address in the
  range.
* `end` {string|net.SocketAddress} The ending IPv4 or IPv6 address in the range.
* `type` {string} Either `'ipv4'` or `'ipv6'`. **Default:** `'ipv4'`.

Removes a rule that was previously added with `blockList.addRange()`. The `start`
and `end` addresses must match exactly the values used when the rule was added.
If the specified range does not exist, this is a no-op.

### `blockList.removeSubnet(net, prefix[, type])`

* `net` {string|net.SocketAddress} The network IPv4 or IPv6 address.
* `prefix` {number} The number of CIDR prefix bits. For IPv4, this
  must be a value between `0` and `32`. For IPv6, this must be between
  `0` and `128`.
* `type` {string} Either `'ipv4'` or `'ipv6'`. **Default:** `'ipv4'`.

Removes a rule that was previously added with `blockList.addSubnet()`. The
network address and prefix must match exactly the values used when the rule was
added. If the specified subnet does not exist, this is a no-op.

### `blockList.rules`

* Type: {string\[]}

The list of rules added to the blocklist.

### `blockList.size`

* Type: {number}

The number of rules in the blocklist. This is equivalent to
`blockList.rules.length` but does not allocate the rules array.

### `blockList.toJSON()`

> Stability: 1.2 - Release candidate

* Returns Blocklist.rules

## Class: `net.SocketAddress`

### `new net.SocketAddress([options])`

* `options` {Object}
  * `address` {string} The network address as either an IPv4 or IPv6 string.
    **Default**: `'127.0.0.1'` if `family` is `'ipv4'`; `'::'` if `family` is
    `'ipv6'`.
  * `family` {string} One of either `'ipv4'` or `'ipv6'`.
    **Default**: `'ipv4'`.
  * `flowlabel` {number} An IPv6 flow-label used only if `family` is `'ipv6'`.
  * `port` {number} An IP port.

### `socketaddress.address`

* Type: {string}

### `socketaddress.family`

* Type: {string} Either `'ipv4'` or `'ipv6'`.

### `socketaddress.flowlabel`

* Type: {number}

### `socketaddress.port`

* Type: {number}

### `SocketAddress.parse(input)`

* `input` {string} An input string containing an IP address and optional port,
  e.g. `123.1.2.3:1234` or `[1::1]:1234`.
* Returns: {net.SocketAddress} Returns a `SocketAddress` if parsing was successful.
  Otherwise returns `undefined`.
