---
title: "DNS (part 2 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/dns.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# DNS (part 2 of 4)

## `dns.resolveAny(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `ret` {Object\[]}

Uses the DNS protocol to resolve all records (also known as `ANY` or `*` query).
The `ret` argument passed to the `callback` function will be an array containing
various types of records. Each object has a property `type` that indicates the
type of the current record. And depending on the `type`, additional properties
will be present on the object:

| Type      | Properties                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `'A'`     | `address`/`ttl`                                                                                                                                  |
| `'AAAA'`  | `address`/`ttl`                                                                                                                                  |
| `'CAA'`   | Refer to `dns.resolveCaa()`                                                                                                                  |
| `'CNAME'` | `value`                                                                                                                                          |
| `'MX'`    | Refer to `dns.resolveMx()`                                                                                                                   |
| `'NAPTR'` | Refer to `dns.resolveNaptr()`                                                                                                                |
| `'NS'`    | `value`                                                                                                                                          |
| `'PTR'`   | `value`                                                                                                                                          |
| `'SOA'`   | Refer to `dns.resolveSoa()`                                                                                                                  |
| `'SRV'`   | Refer to `dns.resolveSrv()`                                                                                                                  |
| `'TLSA'`  | Refer to `dns.resolveTlsa()`                                                                                                                 |
| `'TXT'`   | This type of record contains an array property called `entries` which refers to `dns.resolveTxt()`, e.g. `{ entries: ['...'], type: 'TXT' }` |

Here is an example of the `ret` object passed to the callback:

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

DNS server operators may choose not to respond to `ANY`
queries. It may be better to call individual methods like `dns.resolve4()`,
`dns.resolveMx()`, and so on. For more details, see RFC 8482.

## `dns.resolveCname(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[]}

Uses the DNS protocol to resolve `CNAME` records for the `hostname`. The
`addresses` argument passed to the `callback` function
will contain an array of canonical name records available for the `hostname`
(e.g. `['bar.example.com']`).

## `dns.resolveCaa(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `records` {Object\[]}

Uses the DNS protocol to resolve `CAA` records for the `hostname`. The
`addresses` argument passed to the `callback` function
will contain an array of certification authority authorization records
available for the `hostname` (e.g. `[{critical: 0, iodef:
'mailto:user@example.com'}, {critical: 128, issue: 'pki.example.com'}]`).

## `dns.resolveMx(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {Object\[]}

Uses the DNS protocol to resolve mail exchange records (`MX` records) for the
`hostname`. The `addresses` argument passed to the `callback` function will
contain an array of objects containing both a `priority` and `exchange`
property (e.g. `[{priority: 10, exchange: 'mx.example.com'}, ...]`).

## `dns.resolveNaptr(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {Object\[]}

Uses the DNS protocol to resolve regular expression-based records (`NAPTR`
records) for the `hostname`. The `addresses` argument passed to the `callback`
function will contain an array of objects with the following properties:

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

## `dns.resolveNs(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[]}

Uses the DNS protocol to resolve name server records (`NS` records) for the
`hostname`. The `addresses` argument passed to the `callback` function will
contain an array of name server records available for `hostname`
(e.g. `['ns1.example.com', 'ns2.example.com']`).

## `dns.resolvePtr(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[]}

Uses the DNS protocol to resolve pointer records (`PTR` records) for the
`hostname`. The `addresses` argument passed to the `callback` function will
be an array of strings containing the reply records.

## `dns.resolveSoa(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `address` {Object}

Uses the DNS protocol to resolve a start of authority record (`SOA` record) for
the `hostname`. The `address` argument passed to the `callback` function will
be an object with the following properties:

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

## `dns.resolveSrv(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {Object\[]}

Uses the DNS protocol to resolve service records (`SRV` records) for the
`hostname`. The `addresses` argument passed to the `callback` function will
be an array of objects with the following properties:

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

## `dns.resolveTlsa(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `records` {Object\[]}

Uses the DNS protocol to resolve certificate associations (`TLSA` records) for
the `hostname`. The `records` argument passed to the `callback` function is an
array of objects with these properties:

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

## `dns.resolveTxt(hostname, callback)`

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `records` {string\[]}

Uses the DNS protocol to resolve text queries (`TXT` records) for the
`hostname`. The `records` argument passed to the `callback` function is a
two-dimensional array of the text records available for `hostname` (e.g.
`[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ]`). Each sub-array contains TXT chunks of
one record. Depending on the use case, these could be either joined together or
treated separately.

## `dns.reverse(ip, callback)`

* `ip` {string}
* `callback` {Function}
  * `err` {Error}
  * `hostnames` {string\[]}

Performs a reverse DNS query that resolves an IPv4 or IPv6 address to an
array of host names.

On error, `err` is an `Error` object, where `err.code` is
one of the DNS error codes.

## `dns.setDefaultResultOrder(order)`

* `order` {string} must be `'ipv4first'`, `'ipv6first'` or `'verbatim'`.

Set the default value of `order` in `dns.lookup()` and
`dnsPromises.lookup()`. The value could be:

* `ipv4first`: sets default `order` to `ipv4first`.
* `ipv6first`: sets default `order` to `ipv6first`.
* `verbatim`: sets default `order` to `verbatim`.

The default is `verbatim` and `dns.setDefaultResultOrder()` have higher
priority than `--dns-result-order`. When using worker threads,
`dns.setDefaultResultOrder()` from the main thread won't affect the default
dns orders in workers.

## `dns.getDefaultResultOrder()`

Get the default value for `order` in `dns.lookup()` and
`dnsPromises.lookup()`. The value could be:

* `ipv4first`: for `order` defaulting to `ipv4first`.
* `ipv6first`: for `order` defaulting to `ipv6first`.
* `verbatim`: for `order` defaulting to `verbatim`.

## `dns.setServers(servers)`

* `servers` {string\[]} array of RFC 5952 formatted addresses

Sets the IP address and port of servers to be used when performing DNS
resolution. The `servers` argument is an array of RFC 5952 formatted
addresses. If the port is the IANA default DNS port (53) it can be omitted.

```js
dns.setServers([
  '8.8.8.8',
  '[2001:4860:4860::8888]',
  '8.8.8.8:1053',
  '[2001:4860:4860::8888]:1053',
]);
```

An error will be thrown if an invalid address is provided.

The `dns.setServers()` method must not be called while a DNS query is in
progress.

The `dns.setServers()` method affects only `dns.resolve()`,
`dns.resolve*()` and `dns.reverse()` (and specifically _not_
`dns.lookup()`).

This method works much like
resolve.conf.
That is, if attempting to resolve with the first server provided results in a
`NOTFOUND` error, the `resolve()` method will _not_ attempt to resolve with
subsequent servers provided. Fallback DNS servers will only be used if the
earlier ones time out or result in some other error.
