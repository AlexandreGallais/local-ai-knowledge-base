---
title: "DNS (part 4 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dns.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# DNS (part 4 of 4)

### `dnsPromises.resolveNs(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve name server records (`NS` records) for the
`hostname`. On success, the `Promise` is resolved with an array of name server
records available for `hostname` (e.g.
`['ns1.example.com', 'ns2.example.com']`).

### `dnsPromises.resolvePtr(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve pointer records (`PTR` records) for the
`hostname`. On success, the `Promise` is resolved with an array of strings
containing the reply records.

### `dnsPromises.resolveSoa(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve a start of authority record (`SOA` record) for
the `hostname`. On success, the `Promise` is resolved with an object with the
following properties:

* `nsname`
* `hostmaster`
* `serial`
* `refresh`
* `retry`
* `expire`
* `minttl`

```js
({
  nsname: 'ns.example.com',
  hostmaster: 'root.example.com',
  serial: 2013101809,
  refresh: 10000,
  retry: 2400,
  expire: 604800,
  minttl: 3600,
});
```

### `dnsPromises.resolveSrv(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve service records (`SRV` records) for the
`hostname`. On success, the `Promise` is resolved with an array of objects with
the following properties:

* `priority`
* `weight`
* `port`
* `name`

```js
({
  priority: 10,
  weight: 5,
  port: 21223,
  name: 'service.example.com',
});
```

### `dnsPromises.resolveTlsa(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve certificate associations (`TLSA` records) for
the `hostname`. On success, the `Promise` is resolved with an array of objects
with these properties:

* `certUsage`
* `selector`
* `match`
* `data`

```js
({
  certUsage: 3,
  selector: 1,
  match: 1,
  data: [ArrayBuffer],
});
```

### `dnsPromises.resolveTxt(hostname)`

* `hostname` {string}

Uses the DNS protocol to resolve text queries (`TXT` records) for the
`hostname`. On success, the `Promise` is resolved with a two-dimensional array
of the text records available for `hostname` (e.g.
`[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ]`). Each sub-array contains TXT chunks of
one record. Depending on the use case, these could be either joined together or
treated separately.

### `dnsPromises.reverse(ip)`

* `ip` {string}

Performs a reverse DNS query that resolves an IPv4 or IPv6 address to an
array of host names.

On error, the `Promise` is rejected with an `Error` object, where `err.code`
is one of the DNS error codes.

### `dnsPromises.setDefaultResultOrder(order)`

* `order` {string} must be `'ipv4first'`, `'ipv6first'` or `'verbatim'`.

Set the default value of `order` in `dns.lookup()` and
`dnsPromises.lookup()`. The value could be:

* `ipv4first`: sets default `order` to `ipv4first`.
* `ipv6first`: sets default `order` to `ipv6first`.
* `verbatim`: sets default `order` to `verbatim`.

The default is `verbatim` and `dnsPromises.setDefaultResultOrder()` have
higher priority than `--dns-result-order`. When using worker threads,
`dnsPromises.setDefaultResultOrder()` from the main thread won't affect the
default dns orders in workers.

### `dnsPromises.getDefaultResultOrder()`

Get the value of `dnsOrder`.

### `dnsPromises.setServers(servers)`

* `servers` {string\[]} array of RFC 5952 formatted addresses

Sets the IP address and port of servers to be used when performing DNS
resolution. The `servers` argument is an array of RFC 5952 formatted
addresses. If the port is the IANA default DNS port (53) it can be omitted.

```js
dnsPromises.setServers([
  '8.8.8.8',
  '[2001:4860:4860::8888]',
  '8.8.8.8:1053',
  '[2001:4860:4860::8888]:1053',
]);
```

An error will be thrown if an invalid address is provided.

The `dnsPromises.setServers()` method must not be called while a DNS query is in
progress.

This method works much like
resolve.conf.
That is, if attempting to resolve with the first server provided results in a
`NOTFOUND` error, the `resolve()` method will _not_ attempt to resolve with
subsequent servers provided. Fallback DNS servers will only be used if the
earlier ones time out or result in some other error.

## Error codes

Each DNS query can return one of the following error codes:

* `dns.NODATA`: DNS server returned an answer with no data.
* `dns.FORMERR`: DNS server claims query was misformatted.
* `dns.SERVFAIL`: DNS server returned general failure.
* `dns.NOTFOUND`: Domain name not found.
* `dns.NOTIMP`: DNS server does not implement the requested operation.
* `dns.REFUSED`: DNS server refused query.
* `dns.BADQUERY`: Misformatted DNS query.
* `dns.BADNAME`: Misformatted host name.
* `dns.BADFAMILY`: Unsupported address family.
* `dns.BADRESP`: Misformatted DNS reply.
* `dns.CONNREFUSED`: Could not contact DNS servers.
* `dns.TIMEOUT`: Timeout while contacting DNS servers.
* `dns.EOF`: End of file.
* `dns.FILE`: Error reading file.
* `dns.NOMEM`: Out of memory.
* `dns.DESTRUCTION`: Channel is being destroyed.
* `dns.BADSTR`: Misformatted string.
* `dns.BADFLAGS`: Illegal flags specified.
* `dns.NONAME`: Given host name is not numeric.
* `dns.BADHINTS`: Illegal hints flags specified.
* `dns.NOTINITIALIZED`: c-ares library initialization not yet performed.
* `dns.LOADIPHLPAPI`: Error loading `iphlpapi.dll`.
* `dns.ADDRGETNETWORKPARAMS`: Could not find `GetNetworkParams` function.
* `dns.CANCELLED`: DNS query cancelled.

The `dnsPromises` API also exports the above error codes, e.g., `dnsPromises.NODATA`.

## Implementation considerations

Although `dns.lookup()` and the various `dns.resolve*()/dns.reverse()`
functions have the same goal of associating a network name with a network
address (or vice versa), their behavior is quite different. These differences
can have subtle but significant consequences on the behavior of Node.js
programs.

### `dns.lookup()`

Under the hood, `dns.lookup()` uses the same operating system facilities
as most other programs. For instance, `dns.lookup()` will almost always
resolve a given name the same way as the `ping` command. On most POSIX-like
operating systems, the behavior of the `dns.lookup()` function can be
modified by changing settings in nsswitch.conf(5) and/or resolv.conf(5),
but changing these files will change the behavior of all other
programs running on the same operating system.

Though the call to `dns.lookup()` will be asynchronous from JavaScript's
perspective, it is implemented as a synchronous call to getaddrinfo(3) that runs
on libuv's threadpool. This can have surprising negative performance
implications for some applications, see the `UV_THREADPOOL_SIZE`
documentation for more information.

Various networking APIs will call `dns.lookup()` internally to resolve
host names. If that is an issue, consider resolving the host name to an address
using `dns.resolve()` and using the address instead of a host name. Also, some
networking APIs (such as `socket.connect()` and `dgram.createSocket()`)
allow the default resolver, `dns.lookup()`, to be replaced.

### `dns.resolve()`, `dns.resolve*()`, and `dns.reverse()`

These functions are implemented quite differently than `dns.lookup()`. They
do not use getaddrinfo(3) and they _always_ perform a DNS query on the
network. This network communication is always done asynchronously and does not
use libuv's threadpool.

As a result, these functions cannot have the same negative impact on other
processing that happens on libuv's threadpool that `dns.lookup()` can have.

They do not use the same set of configuration files that `dns.lookup()`
uses. For instance, they do not use the configuration from `/etc/hosts`.
