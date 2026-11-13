---
title: "HTTP (part 11 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 11 of 12)

## `http.isValidHeaderValue(value[, options])`

* `value` {any}
* `options` {Object}
  * `httpValidation` {string} Validation strictness, one of `'strict'` or
    `'relaxed'`. These have the same meaning as the `httpValidation` option of
    `http.createServer()` and `http.request()`. **Default:** `'strict'`.
* Returns: {boolean}

Returns `true` if `value` is a valid HTTP header value, and `false` otherwise.
With the default options this is the same check that
`http.validateHeaderValue()` performs, but the result is returned instead
of an error being thrown.

`undefined` and symbols are never valid header values. Other non-string
values are converted to strings before being checked, as they are when passed
to `outgoingMessage.setHeader(name, value)`.

Passing an invalid `options` argument throws.

```mjs
import { isValidHeaderValue } from 'node:http';

console.log(isValidHeaderValue('text/html')); // true
console.log(isValidHeaderValue(123)); // true
console.log(isValidHeaderValue(undefined)); // false
console.log(isValidHeaderValue('a\r\nb')); // false
console.log(isValidHeaderValue('a\x01b')); // false
console.log(isValidHeaderValue('a\x01b', { httpValidation: 'relaxed' })); // true
```

```cjs
const { isValidHeaderValue } = require('node:http');

console.log(isValidHeaderValue('text/html')); // true
console.log(isValidHeaderValue(123)); // true
console.log(isValidHeaderValue(undefined)); // false
console.log(isValidHeaderValue('a\r\nb')); // false
console.log(isValidHeaderValue('a\x01b')); // false
console.log(isValidHeaderValue('a\x01b', { httpValidation: 'relaxed' })); // true
```

## `http.validateHeaderName(name[, label])`

* `name` {string}
* `label` {string} Label for error message. **Default:** `'Header name'`.

Performs the low-level validations on the provided `name` that are done when
`res.setHeader(name, value)` is called.

Passing illegal value as `name` will result in a `TypeError` being thrown,
identified by `code: 'ERR_INVALID_HTTP_TOKEN'`.

It is not necessary to use this method before passing headers to an HTTP request
or response. The HTTP module will automatically validate such headers.

Example:

```mjs
import { validateHeaderName } from 'node:http';

try {
  validateHeaderName('');
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code); // --> 'ERR_INVALID_HTTP_TOKEN'
  console.error(err.message); // --> 'Header name must be a valid HTTP token [""]'
}
```

```cjs
const { validateHeaderName } = require('node:http');

try {
  validateHeaderName('');
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code); // --> 'ERR_INVALID_HTTP_TOKEN'
  console.error(err.message); // --> 'Header name must be a valid HTTP token [""]'
}
```

## `http.validateHeaderValue(name, value)`

* `name` {string}
* `value` {any}

Performs the low-level validations on the provided `value` that are done when
`res.setHeader(name, value)` is called.

Passing illegal value as `value` will result in a `TypeError` being thrown.

* Undefined value error is identified by `code: 'ERR_HTTP_INVALID_HEADER_VALUE'`.
* Invalid value character error is identified by `code: 'ERR_INVALID_CHAR'`.

It is not necessary to use this method before passing headers to an HTTP request
or response. The HTTP module will automatically validate such headers.

Examples:

```mjs
import { validateHeaderValue } from 'node:http';

try {
  validateHeaderValue('x-my-header', undefined);
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code === 'ERR_HTTP_INVALID_HEADER_VALUE'); // --> true
  console.error(err.message); // --> 'Invalid value "undefined" for header "x-my-header"'
}

try {
  validateHeaderValue('x-my-header', 'oʊmɪɡə');
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code === 'ERR_INVALID_CHAR'); // --> true
  console.error(err.message); // --> 'Invalid character in header content ["x-my-header"]'
}
```

```cjs
const { validateHeaderValue } = require('node:http');

try {
  validateHeaderValue('x-my-header', undefined);
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code === 'ERR_HTTP_INVALID_HEADER_VALUE'); // --> true
  console.error(err.message); // --> 'Invalid value "undefined" for header "x-my-header"'
}

try {
  validateHeaderValue('x-my-header', 'oʊmɪɡə');
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code === 'ERR_INVALID_CHAR'); // --> true
  console.error(err.message); // --> 'Invalid character in header content ["x-my-header"]'
}
```

## `http.setMaxIdleHTTPParsers(max)`

* `max` {number} **Default:** `1000`.

Set the maximum number of idle HTTP parsers.

## `http.setGlobalProxyFromEnv([proxyEnv])`

* `proxyEnv` {Object} An object containing proxy configuration. This accepts the
  same options as the `proxyEnv` option accepted by `Agent`. **Default:**
  `process.env`.
* Returns: {Function} A function that restores the original agent and dispatcher
  settings to the state before this `http.setGlobalProxyFromEnv()` is invoked.

Dynamically resets the global configurations to enable built-in proxy support for
`fetch()` and `http.request()`/`https.request()` at runtime, as an alternative
to using the `--use-env-proxy` flag or `NODE_USE_ENV_PROXY` environment variable.
It can also be used to override settings configured from the environment variables.

As this function resets the global configurations, any previously configured
`http.globalAgent`, `https.globalAgent` or undici global dispatcher would be
overridden after this function is invoked. It's recommended to invoke it before any
requests are made and avoid invoking it in the middle of any requests.

See Built-in Proxy Support for details on proxy URL formats and `NO_PROXY`
syntax.

## `http.websocketMask(source, mask, output, offset, length)`

* `source` {Buffer|TypedArray|DataView} The data to mask.
* `mask` {Buffer|TypedArray|DataView} The 4-byte masking key.
* `output` {Buffer|TypedArray|DataView} Where to write the masked data.
* `offset` {integer} Byte offset in `output` at which to start writing.
* `length` {integer} Number of bytes of `source` to mask.

XORs the first `length` bytes of `source` with `mask`, repeated, and writes the
result to `output` starting at `offset`: byte `i` of `source` is XORed with
byte `i % 4` of `mask`. This is the masking operation that WebSocket clients
apply to every frame payload they send (RFC 6455, Section 5.3), and that
servers undo on every frame they receive. Applying it twice with the same
`mask` restores the original data. `source` is not modified, unless it shares
memory with `output`.

All arguments are treated as raw bytes, whatever the view type. `source` and
`output` may be the same view or overlapping views over the same memory; the
result is the same as if `source` had been copied first.

An error is thrown if `mask` is not exactly 4 bytes long, if `length` is
greater than `source.byteLength`, if `offset + length` is greater than
`output.byteLength`, or if `output` is backed by an immutable `ArrayBuffer`.
Nothing is written in that case. `source` and `mask` may be backed by an
immutable `ArrayBuffer`.

```mjs
import { Buffer } from 'node:buffer';
import { websocketMask, websocketUnmask } from 'node:http';

const key = Buffer.from([0x37, 0xfa, 0x21, 0x3d]);
const payload = Buffer.from('Hello');

// Write a masked copy of the payload after a 6-byte frame header.
const frame = Buffer.alloc(6 + payload.length);
websocketMask(payload, key, frame, 6, payload.length);
console.log(frame.subarray(6));
// Prints: <Buffer 7f 9f 4d 51 58>

const received = frame.subarray(6);
websocketUnmask(received, key);
console.log(received.toString());
// Prints: Hello
```

```cjs
const { Buffer } = require('node:buffer');
const { websocketMask, websocketUnmask } = require('node:http');

const key = Buffer.from([0x37, 0xfa, 0x21, 0x3d]);
const payload = Buffer.from('Hello');

// Write a masked copy of the payload after a 6-byte frame header.
const frame = Buffer.alloc(6 + payload.length);
websocketMask(payload, key, frame, 6, payload.length);
console.log(frame.subarray(6));
// Prints: <Buffer 7f 9f 4d 51 58>

const received = frame.subarray(6);
websocketUnmask(received, key);
console.log(received.toString());
// Prints: Hello
```

## `http.websocketUnmask(buffer, mask)`

* `buffer` {Buffer|TypedArray|DataView} The data to unmask, in place.
* `mask` {Buffer|TypedArray|DataView} The 4-byte masking key.

XORs every byte of `buffer` with `mask`, repeated, in place: byte `i` is XORed
with byte `i % 4` of `mask`. This is equivalent to
`http.websocketMask(buffer, mask, buffer, 0, buffer.byteLength)`, and is
typically used to unmask a received WebSocket frame payload
(RFC 6455, Section 5.3). See `http.websocketMask()` for an example.

An error is thrown, and nothing is written, if `mask` is not exactly 4 bytes
long or if `buffer` is backed by an immutable `ArrayBuffer`.

## Class: `WebSocket`

A browser-compatible implementation of {WebSocket}.
