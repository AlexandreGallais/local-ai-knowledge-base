---
title: "Net (part 6 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/net.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Net (part 6 of 6)

## `net.getDefaultAutoSelectFamilyAttemptTimeout()`

Gets the current default value of the `autoSelectFamilyAttemptTimeout` option of `socket.connect(options)`.
The initial default value is `500` or the value specified via the command line
option `--network-family-autoselection-attempt-timeout`.

* Returns: {number} The current default value of the `autoSelectFamilyAttemptTimeout` option.

## `net.setDefaultAutoSelectFamilyAttemptTimeout(value)`

Sets the default value of the `autoSelectFamilyAttemptTimeout` option of `socket.connect(options)`.

* `value` {number} The new default value, which must be a positive number. If the number is less than `10`,
  the value `10` is used instead. The initial default value is `250` or the value specified via the command line
  option `--network-family-autoselection-attempt-timeout`.

## `net.isIP(input)`

* `input` {string}
* Returns: {integer}

Returns `6` if `input` is an IPv6 address, including an IPv4-mapped IPv6 address.
Returns `4` if `input` is an IPv4 address in dot-decimal notation with no
leading zeroes. Otherwise, returns `0`.

```js
net.isIP('::1'); // returns 6
net.isIP('::ffff:127.0.0.1'); // returns 6
net.isIP('127.0.0.1'); // returns 4
net.isIP('127.000.000.001'); // returns 0
net.isIP('127.0.0.1/24'); // returns 0
net.isIP('fhqwhgads'); // returns 0
```

## `net.isIPv4(input)`

* `input` {string}
* Returns: {boolean}

Returns `true` if `input` is an IPv4 address in dot-decimal notation with no
leading zeroes. Otherwise, returns `false`.

```js
net.isIPv4('127.0.0.1'); // returns true
net.isIPv4('127.000.000.001'); // returns false
net.isIPv4('127.0.0.1/24'); // returns false
net.isIPv4('fhqwhgads'); // returns false
```

## `net.isIPv6(input)`

* `input` {string}
* Returns: {boolean}

Returns `true` if `input` is an IPv6 address, including an IPv4-mapped IPv6 address.
Otherwise, returns `false`.

```js
net.isIPv6('::1'); // returns true
net.isIPv6('::ffff:127.0.0.1'); // returns true
net.isIPv6('fhqwhgads'); // returns false
```
