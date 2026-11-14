---
title: "DNS (part 1 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dns.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# DNS

> Stability: 2 - Stable

The `node:dns` module enables name resolution. For example, use it to look up IP
addresses of host names.

Although named for the Domain Name System (DNS), it does not always use the
DNS protocol for lookups. `dns.lookup()` uses the operating system
facilities to perform name resolution. It may not need to perform any network
communication. To perform name resolution the way other applications on the same
system do, use `dns.lookup()`.

```mjs
import dns from 'node:dns';

dns.lookup('example.org', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
// address: "2606:2800:21f:cb07:6820:80da:af6b:8b2c" family: IPv6
```

```cjs
const dns = require('node:dns');

dns.lookup('example.org', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
// address: "2606:2800:21f:cb07:6820:80da:af6b:8b2c" family: IPv6
```

All other functions in the `node:dns` module connect to an actual DNS server to
perform name resolution. They will always use the network to perform DNS
queries. These functions do not use the same set of configuration files used by
`dns.lookup()` (e.g. `/etc/hosts`). Use these functions to always perform
DNS queries, bypassing other name-resolution facilities.

```mjs
import dns from 'node:dns';

dns.resolve4('archive.org', (err, addresses) => {
  if (err) throw err;

  console.log(`addresses: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
    });
  });
});
```

```cjs
const dns = require('node:dns');

dns.resolve4('archive.org', (err, addresses) => {
  if (err) throw err;

  console.log(`addresses: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
    });
  });
});
```

See the Implementation considerations section for more information.

## Class: `dns.Resolver`

An independent resolver for DNS requests.

Creating a new resolver uses the default server settings. Setting
the servers used for a resolver using
`resolver.setServers()` does not affect
other resolvers:

```mjs
import { Resolver } from 'node:dns';
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// This request will use the server at 4.4.4.4, independent of global settings.
resolver.resolve4('example.org', (err, addresses) => {
  // ...
});
```

```cjs
const { Resolver } = require('node:dns');
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// This request will use the server at 4.4.4.4, independent of global settings.
resolver.resolve4('example.org', (err, addresses) => {
  // ...
});
```

The following methods from the `node:dns` module are available:

* `resolver.getServers()`
* `resolver.resolve()`
* `resolver.resolve4()`
* `resolver.resolve6()`
* `resolver.resolveAny()`
* `resolver.resolveCaa()`
* `resolver.resolveCname()`
* `resolver.resolveMx()`
* `resolver.resolveNaptr()`
* `resolver.resolveNs()`
* `resolver.resolvePtr()`
* `resolver.resolveSoa()`
* `resolver.resolveSrv()`
* `resolver.resolveTlsa()`
* `resolver.resolveTxt()`
* `resolver.reverse()`
* `resolver.setServers()`

### `Resolver([options])`

Create a new resolver.

* `options` {Object}
  * `timeout` {integer} Query timeout in milliseconds, or `-1` to use the
    default timeout.
  * `tries` {integer} The number of tries the resolver will try contacting
    each name server before giving up. **Default:** `4`
  * `maxTimeout` {integer} The max retry timeout, in milliseconds.
    **Default:** `0`, disabled.

### `resolver.cancel()`

Cancel all outstanding DNS queries made by this resolver. The corresponding
callbacks will be called with an error with code `ECANCELLED`.

### `resolver.setLocalAddress(ipv4)`

* `ipv4` {string} A string representation of an IPv4 address.
  **Default:** `'0.0.0.0'`
* `ipv6` {string} A string representation of an IPv6 address.
  **Default:** `'::0'`

The resolver instance will send its requests from the specified IP address.
This allows programs to specify outbound interfaces when used on multi-homed
systems.

If a v4 or v6 address is not specified, it is set to the default and the
operating system will choose a local address automatically.

The resolver will use the v4 local address when making requests to IPv4 DNS
servers, and the v6 local address when making requests to IPv6 DNS servers.
The `rrtype` of resolution requests has no impact on the local address used.

## `dns.getServers()`

* Returns: {string\[]}

Returns an array of IP address strings, formatted according to RFC 5952,
that are currently configured for DNS resolution. A string will include a port
section if a custom port is used.

```json
[
  "8.8.8.8",
  "2001:4860:4860::8888",
  "8.8.8.8:1053",
  "[2001:4860:4860::8888]:1053",
]
```

## `dns.lookup(hostname[, options], callback)`

* `hostname` {string}
* `options` {integer | Object}
  * `family` {integer|string} The record family. Must be `4`, `6`, or `0`. For
    backward compatibility reasons,`'IPv4'` and `'IPv6'` are interpreted as `4`
    and `6` respectively. The value `0` indicates that either an IPv4 or IPv6
    address is returned. If the value `0` is used with `{ all: true }` (see
    below), either one of or both IPv4 and IPv6 addresses are returned,
    depending on the system's DNS resolver. **Default:** `0`.
  * `hints` {number} One or more supported `getaddrinfo` flags. Multiple
    flags may be passed by bitwise `OR`ing their values.
  * `all` {boolean} When `true`, the callback returns all resolved addresses in
    an array. Otherwise, returns a single address. **Default:** `false`.
  * `order` {string} When `verbatim`, the resolved addresses are returned
    unsorted. When `ipv4first`, the resolved addresses are sorted by placing
    IPv4 addresses before IPv6 addresses. When `ipv6first`, the resolved
    addresses are sorted by placing IPv6 addresses before IPv4 addresses.
    **Default:** `verbatim` (addresses are not reordered).
    Default value is configurable using `dns.setDefaultResultOrder()` or
    `--dns-result-order`.
  * `verbatim` {boolean} When `true`, the callback receives IPv4 and IPv6
    addresses in the order the DNS resolver returned them. When `false`,
    IPv4 addresses are placed before IPv6 addresses.
    This option will be deprecated in favor of `order`. When both are specified,
    `order` has higher precedence. New code should only use `order`.
    **Default:** `true` (addresses are not reordered). Default value is
    configurable using `dns.setDefaultResultOrder()` or
    `--dns-result-order`.
* `callback` {Function}
  * `err` {Error}
  * `address` {string} A string representation of an IPv4 or IPv6 address.
    Not provided when `options.all` is `true`.
  * `family` {integer} `4` or `6`, denoting the family of `address`, or `0` if
    the address is not an IPv4 or IPv6 address. `0` is a likely indicator of a
    bug in the name resolution service used by the operating system.
    Not provided when `options.all` is `true`.
  * `addresses` {Object\[]} An array of address objects when `options.all` is
    `true`. Each object has the following properties:
    * `address` {string} A string representation of an IPv4 or IPv6 address.
    * `family` {integer} `4` or `6`, denoting the family of `address`.

Resolves a host name (e.g. `'nodejs.org'`) into the first found A (IPv4) or
AAAA (IPv6) record. All `option` properties are optional. If `options` is an
integer, then it must be `4` or `6` – if `options` is not provided, then
either IPv4 or IPv6 addresses, or both, are returned if found.

With the `all` option set to `true`, the arguments for `callback` change to
`(err, addresses)`, with `addresses` being an array of objects with the
properties `address` and `family`.

On error, `err` is an `Error` object, where `err.code` is the error code.
Keep in mind that `err.code` will be set to `'ENOTFOUND'` not only when
the host name does not exist but also when the lookup fails in other ways
such as no available file descriptors.

`dns.lookup()` does not necessarily have anything to do with the DNS protocol.
The implementation uses an operating system facility that can associate names
with addresses and vice versa. This implementation can have subtle but
important consequences on the behavior of any Node.js program. Please take some
time to consult the Implementation considerations section before using
`dns.lookup()`.

Example usage:

```mjs
import dns from 'node:dns';
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup('example.org', options, (err, address, family) =>
  console.log('address: %j family: IPv%s', address, family));
// address: "2606:2800:21f:cb07:6820:80da:af6b:8b2c" family: IPv6

// When options.all is true, the result will be an Array.
options.all = true;
dns.lookup('example.org', options, (err, addresses) =>
  console.log('addresses: %j', addresses));
// addresses: [{"address":"2606:2800:21f:cb07:6820:80da:af6b:8b2c","family":6}]
```

```cjs
const dns = require('node:dns');
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup('example.org', options, (err, address, family) =>
  console.log('address: %j family: IPv%s', address, family));
// address: "2606:2800:21f:cb07:6820:80da:af6b:8b2c" family: IPv6

// When options.all is true, the result will be an Array.
options.all = true;
dns.lookup('example.org', options, (err, addresses) =>
  console.log('addresses: %j', addresses));
// addresses: [{"address":"2606:2800:21f:cb07:6820:80da:af6b:8b2c","family":6}]
```

If this method is invoked as its `util.promisify()`ed version, and `all`
is not set to `true`, it returns a `Promise` for an `Object` with `address` and
`family` properties.

### Supported getaddrinfo flags

The following flags can be passed as hints to `dns.lookup()`.

* `dns.ADDRCONFIG`: Limits returned address types to the types of non-loopback
  addresses configured on the system. For example, IPv4 addresses are only
  returned if the current system has at least one IPv4 address configured.
* `dns.V4MAPPED`: If the IPv6 family was specified, but no IPv6 addresses were
  found, then return IPv4 mapped IPv6 addresses. It is not supported
  on some operating systems (e.g. FreeBSD 10.1).
* `dns.ALL`: If `dns.V4MAPPED` is specified, return resolved IPv6 addresses as
  well as IPv4 mapped IPv6 addresses.

## `dns.lookupService(address, port, callback)`

* `address` {string}
* `port` {number}
* `callback` {Function}
  * `err` {Error}
  * `hostname` {string} e.g. `example.com`
  * `service` {string} e.g. `http`

Resolves the given `address` and `port` into a host name and service using
the operating system's underlying `getnameinfo` implementation.

If `address` is not a valid IP address, a `TypeError` will be thrown.
The `port` will be coerced to a number. If it is not a legal port, a `TypeError`
will be thrown.

On an error, `err` is an `Error` object, where `err.code` is the error code.

```mjs
import dns from 'node:dns';
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
  console.log(hostname, service);
  // Prints: localhost ssh
});
```

```cjs
const dns = require('node:dns');
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
  console.log(hostname, service);
  // Prints: localhost ssh
});
```

If this method is invoked as its `util.promisify()`ed version, it returns a
`Promise` for an `Object` with `hostname` and `service` properties.

## `dns.resolve(hostname[, rrtype], callback)`

* `hostname` {string} Host name to resolve.
* `rrtype` {string} Resource record type. **Default:** `'A'`.
* `callback` {Function}
  * `err` {Error}
  * `records` {string\[] | Object\[] | Object}

Uses the DNS protocol to resolve a host name (e.g. `'nodejs.org'`) into an array
of the resource records. The `callback` function has arguments
`(err, records)`. When successful, `records` will be an array of resource
records. The type and structure of individual results varies based on `rrtype`:

| `rrtype`  | `records` contains             | Result type | Shorthand method         |
| --------- | ------------------------------ | ----------- | ------------------------ |
| `'A'`     | IPv4 addresses (default)       | {string}    | `dns.resolve4()`     |
| `'AAAA'`  | IPv6 addresses                 | {string}    | `dns.resolve6()`     |
| `'ANY'`   | any records                    | {Object}    | `dns.resolveAny()`   |
| `'CAA'`   | CA authorization records       | {Object}    | `dns.resolveCaa()`   |
| `'CNAME'` | canonical name records         | {string}    | `dns.resolveCname()` |
| `'MX'`    | mail exchange records          | {Object}    | `dns.resolveMx()`    |
| `'NAPTR'` | name authority pointer records | {Object}    | `dns.resolveNaptr()` |
| `'NS'`    | name server records            | {string}    | `dns.resolveNs()`    |
| `'PTR'`   | pointer records                | {string}    | `dns.resolvePtr()`   |
| `'SOA'`   | start of authority records     | {Object}    | `dns.resolveSoa()`   |
| `'SRV'`   | service records                | {Object}    | `dns.resolveSrv()`   |
| `'TLSA'`  | certificate associations       | {Object}    | `dns.resolveTlsa()`  |
| `'TXT'`   | text records                   | {string\[]} | `dns.resolveTxt()`   |

On error, `err` is an `Error` object, where `err.code` is one of the
DNS error codes.

## `dns.resolve4(hostname[, options], callback)`

* `hostname` {string} Host name to resolve.
* `options` {Object}
  * `ttl` {boolean} Retrieves the Time-To-Live value (TTL) of each record.
    When `true`, the callback receives an array of
    `{ address: '1.2.3.4', ttl: 60 }` objects rather than an array of strings,
    with the TTL expressed in seconds.
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[] | Object\[]}

Uses the DNS protocol to resolve an IPv4 addresses (`A` records) for the
`hostname`. The `addresses` argument passed to the `callback` function
will contain an array of IPv4 addresses (e.g.
`['74.125.79.104', '74.125.79.105', '74.125.79.106']`).

## `dns.resolve6(hostname[, options], callback)`

* `hostname` {string} Host name to resolve.
* `options` {Object}
  * `ttl` {boolean} Retrieve the Time-To-Live value (TTL) of each record.
    When `true`, the callback receives an array of
    `{ address: '0:1:2:3:4:5:6:7', ttl: 60 }` objects rather than an array of
    strings, with the TTL expressed in seconds.
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[] | Object\[]}

Uses the DNS protocol to resolve IPv6 addresses (`AAAA` records) for the
`hostname`. The `addresses` argument passed to the `callback` function
will contain an array of IPv6 addresses.
