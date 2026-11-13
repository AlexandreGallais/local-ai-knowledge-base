---
title: "DNS (part 3 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dns.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# DNS (part 3 of 4)

## DNS promises API

The `dns.promises` API provides an alternative set of asynchronous DNS methods
that return `Promise` objects rather than using callbacks. The API is accessible
via `require('node:dns').promises` or `require('node:dns/promises')`.

### Class: `dnsPromises.Resolver`

An independent resolver for DNS requests.

Creating a new resolver uses the default server settings. Setting
the servers used for a resolver using
`resolver.setServers()` does not affect
other resolvers:

```mjs
import { Resolver } from 'node:dns/promises';
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// This request will use the server at 4.4.4.4, independent of global settings.
const addresses = await resolver.resolve4('example.org');
```

```cjs
const { Resolver } = require('node:dns').promises;
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// This request will use the server at 4.4.4.4, independent of global settings.
resolver.resolve4('example.org').then((addresses) => {
  // ...
});

// Alternatively, the same code can be written using async-await style.
(async function() {
  const addresses = await resolver.resolve4('example.org');
})();
```

The following methods from the `dnsPromises` API are available:

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

### `resolver.cancel()`

Cancel all outstanding DNS queries made by this resolver. The corresponding
promises will be rejected with an error with the code `ECANCELLED`.

### `dnsPromises.getServers()`

* Returns: {string\[]}

Returns an array of IP address strings, formatted according to RFC 5952,
that are currently configured for DNS resolution. A string will include a port
section if a custom port is used.

```json
[
  "8.8.8.8",
  "2001:4860:4860::8888",
  "8.8.8.8:1053",
  "[2001:4860:4860::8888]:1053"
]
```

### `dnsPromises.lookup(hostname[, options])`

* `hostname` {string}
* `options` {integer | Object}
  * `family` {integer} The record family. Must be `4`, `6`, or `0`. The value
    `0` indicates that either an IPv4 or IPv6 address is returned. If the
    value `0` is used with `{ all: true }` (see below), either one of or both
    IPv4 and IPv6 addresses are returned, depending on the system's DNS
    resolver. **Default:** `0`.
  * `hints` {number} One or more supported `getaddrinfo` flags. Multiple
    flags may be passed by bitwise `OR`ing their values.
  * `all` {boolean} When `true`, the `Promise` is resolved with all addresses in
    an array. Otherwise, returns a single address. **Default:** `false`.
  * `order` {string} When `verbatim`, the `Promise` is resolved with IPv4 and
    IPv6 addresses in the order the DNS resolver returned them. When `ipv4first`,
    IPv4 addresses are placed before IPv6 addresses. When `ipv6first`,
    IPv6 addresses are placed before IPv4 addresses.
    **Default:** `verbatim` (addresses are not reordered).
    Default value is configurable using `dns.setDefaultResultOrder()` or
    `--dns-result-order`. New code should use `{ order: 'verbatim' }`.
  * `verbatim` {boolean} When `true`, the `Promise` is resolved with IPv4 and
    IPv6 addresses in the order the DNS resolver returned them. When `false`,
    IPv4 addresses are placed before IPv6 addresses.
    This option will be deprecated in favor of `order`. When both are specified,
    `order` has higher precedence. New code should only use `order`.
    **Default:** `true` (addresses are not reordered). Default value is
    configurable using `dns.setDefaultResultOrder()` or
    `--dns-result-order`.

Resolves a host name (e.g. `'nodejs.org'`) into the first found A (IPv4) or
AAAA (IPv6) record. All `option` properties are optional. If `options` is an
integer, then it must be `4` or `6` – if `options` is not provided, then
either IPv4 or IPv6 addresses, or both, are returned if found.

With the `all` option set to `true`, the `Promise` is resolved with `addresses`
being an array of objects with the properties `address` and `family`.

On error, the `Promise` is rejected with an `Error` object, where `err.code`
is the error code.
Keep in mind that `err.code` will be set to `'ENOTFOUND'` not only when
the host name does not exist but also when the lookup fails in other ways
such as no available file descriptors.

`dnsPromises.lookup()` does not necessarily have anything to do with the DNS
protocol. The implementation uses an operating system facility that can
associate names with addresses and vice versa. This implementation can have
subtle but important consequences on the behavior of any Node.js program. Please
take some time to consult the Implementation considerations section before
using `dnsPromises.lookup()`.

Example usage:

```mjs
import dns from 'node:dns';
const dnsPromises = dns.promises;
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

await dnsPromises.lookup('example.org', options).then((result) => {
  console.log('address: %j family: IPv%s', result.address, result.family);
  // address: "2606:2800:21f:cb07:6820:80da:af6b:8b2c" family: IPv6
});

// When options.all is true, the result will be an Array.
options.all = true;
await dnsPromises.lookup('example.org', options).then((result) => {
  console.log('addresses: %j', result);
  // addresses: [{"address":"2606:2800:21f:cb07:6820:80da:af6b:8b2c","family":6}]
});
```

```cjs
const dns = require('node:dns');
const dnsPromises = dns.promises;
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

dnsPromises.lookup('example.org', options).then((result) => {
  console.log('address: %j family: IPv%s', result.address, result.family);
  // address: "2606:2800:21f:cb07:6820:80da:af6b:8b2c" family: IPv6
});

// When options.all is true, the result will be an Array.
options.all = true;
dnsPromises.lookup('example.org', options).then((result) => {
  console.log('addresses: %j', result);
  // addresses: [{"address":"2606:2800:21f:cb07:6820:80da:af6b:8b2c","family":6}]
});
```

### `dnsPromises.lookupService(address, port)`

* `address` {string}
* `port` {number}

Resolves the given `address` and `port` into a host name and service using
the operating system's underlying `getnameinfo` implementation.

If `address` is not a valid IP address, a `TypeError` will be thrown.
The `port` will be coerced to a number. If it is not a legal port, a `TypeError`
will be thrown.

On error, the `Promise` is rejected with an `Error` object, where `err.code`
is the error code.

```mjs
import dnsPromises from 'node:dns/promises';
const result = await dnsPromises.lookupService('127.0.0.1', 22);

console.log(result.hostname, result.service); // Prints: localhost ssh
```

```cjs
const dnsPromises = require('node:dns').promises;
dnsPromises.lookupService('127.0.0.1', 22).then((result) => {
  console.log(result.hostname, result.service);
  // Prints: localhost ssh
});
```

### `dnsPromises.resolve(hostname[, rrtype])`

* `hostname` {string} Host name to resolve.
* `rrtype` {string} Resource record type. **Default:** `'A'`.

Uses the DNS protocol to resolve a host name (e.g. `'nodejs.org'`) into an array
of the resource records. When successful, the `Promise` is resolved with an
array of resource records. The type and structure of individual results vary
based on `rrtype`:

| `rrtype`  | `records` contains             | Result type | Shorthand method                 |
| --------- | ------------------------------ | ----------- | -------------------------------- |
| `'A'`     | IPv4 addresses (default)       | {string}    | `dnsPromises.resolve4()`     |
| `'AAAA'`  | IPv6 addresses                 | {string}    | `dnsPromises.resolve6()`     |
| `'ANY'`   | any records                    | {Object}    | `dnsPromises.resolveAny()`   |
| `'CAA'`   | CA authorization records       | {Object}    | `dnsPromises.resolveCaa()`   |
| `'CNAME'` | canonical name records         | {string}    | `dnsPromises.resolveCname()` |
| `'MX'`    | mail exchange records          | {Object}    | `dnsPromises.resolveMx()`    |
| `'NAPTR'` | name authority pointer records | {Object}    | `dnsPromises.resolveNaptr()` |
| `'NS'`    | name server records            | {string}    | `dnsPromises.resolveNs()`    |
| `'PTR'`   | pointer records                | {string}    | `dnsPromises.resolvePtr()`   |
| `'SOA'`   | start of authority records     | {Object}    | `dnsPromises.resolveSoa()`   |
| `'SRV'`   | service records                | {Object}    | `dnsPromises.resolveSrv()`   |
| `'TLSA'`  | certificate associations       | {Object}    | `dnsPromises.resolveTlsa()`  |
| `'TXT'`   | text records                   | {string\[]} | `dnsPromises.resolveTxt()`   |

On error, the `Promise` is rejected with an `Error` object, where `err.code`
is one of the DNS error codes.

### `dnsPromises.resolve4(hostname[, options])`

* `hostname` {string} Host name to resolve.
* `options` {Object}
  * `ttl` {boolean} Retrieve the Time-To-Live value (TTL) of each record.
    When `true`, the `Promise` is resolved with an array of
    `{ address: '1.2.3.4', ttl: 60 }` objects rather than an array of strings,
    with the TTL expressed in seconds.

Uses the DNS protocol to resolve IPv4 addresses (`A` records) for the
`hostname`. On success, the `Promise` is resolved with an array of IPv4
addresses (e.g. `['74.125.79.104', '74.125.79.105', '74.125.79.106']`).

### `dnsPromises.resolve6(hostname[, options])`

* `hostname` {string} Host name to resolve.
* `options` {Object}
  * `ttl` {boolean} Retrieve the Time-To-Live value (TTL) of each record.
    When `true`, the `Promise` is resolved with an array of
    `{ address: '0:1:2:3:4:5:6:7', ttl: 60 }` objects rather than an array of
    strings, with the TTL expressed in seconds.

Uses the DNS protocol to resolve IPv6 addresses (`AAAA` records) for the
`hostname`. On success, the `Promise` is resolved with an array of IPv6
addresses.

### `dnsPromises.resolveAny(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve all records (also known as `ANY` or `*` query).
On success, the `Promise` is resolved with an array containing various types of
records. Each object has a property `type` that indicates the type of the
current record. And depending on the `type`, additional properties will be
present on the object:

| Type      | Properties                                                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'A'`     | `address`/`ttl`                                                                                                                                          |
| `'AAAA'`  | `address`/`ttl`                                                                                                                                          |
| `'CAA'`   | Refer to `dnsPromises.resolveCaa()`                                                                                                                  |
| `'CNAME'` | `value`                                                                                                                                                  |
| `'MX'`    | Refer to `dnsPromises.resolveMx()`                                                                                                                   |
| `'NAPTR'` | Refer to `dnsPromises.resolveNaptr()`                                                                                                                |
| `'NS'`    | `value`                                                                                                                                                  |
| `'PTR'`   | `value`                                                                                                                                                  |
| `'SOA'`   | Refer to `dnsPromises.resolveSoa()`                                                                                                                  |
| `'SRV'`   | Refer to `dnsPromises.resolveSrv()`                                                                                                                  |
| `'TLSA'`  | Refer to `dnsPromises.resolveTlsa()`                                                                                                                 |
| `'TXT'`   | This type of record contains an array property called `entries` which refers to `dnsPromises.resolveTxt()`, e.g. `{ entries: ['...'], type: 'TXT' }` |

Here is an example of the result object:

```js
[ { type: 'A', address: '127.0.0.1', ttl: 299 },
  { type: 'CNAME', value: 'example.com' },
  { type: 'MX', exchange: 'alt4.aspmx.l.example.com', priority: 50 },
  { type: 'NS', value: 'ns1.example.com' },
  { type: 'TXT', entries: [ 'v=spf1 include:_spf.example.com ~all' ] },
  { type: 'SOA',
    nsname: 'ns1.example.com',
    hostmaster: 'admin.example.com',
    serial: 156696742,
    refresh: 900,
    retry: 900,
    expire: 1800,
    minttl: 60 } ];
```

### `dnsPromises.resolveCaa(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve `CAA` records for the `hostname`. On success,
the `Promise` is resolved with an array of objects containing available
certification authority authorization records available for the `hostname`
(e.g. `[{critical: 0, iodef: 'mailto:pki@example.com'},{critical: 128, issue:
'pki.example.com'}]`).

### `dnsPromises.resolveCname(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve `CNAME` records for the `hostname`. On success,
the `Promise` is resolved with an array of canonical name records available for
the `hostname` (e.g. `['bar.example.com']`).

### `dnsPromises.resolveMx(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve mail exchange records (`MX` records) for the
`hostname`. On success, the `Promise` is resolved with an array of objects
containing both a `priority` and `exchange` property (e.g.
`[{priority: 10, exchange: 'mx.example.com'}, ...]`).

### `dnsPromises.resolveNaptr(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve regular expression-based records (`NAPTR`
records) for the `hostname`. On success, the `Promise` is resolved with an array
of objects with the following properties:

* `flags`
* `service`
* `regexp`
* `replacement`
* `order`
* `preference`

```js
({
  flags: 's',
  service: 'SIP+D2U',
  regexp: '',
  replacement: '_sip._udp.example.com',
  order: 30,
  preference: 100,
});
```
