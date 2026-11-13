---
title: "Buffer (part 10 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/buffer.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Buffer (part 10 of 11)

## `node:buffer` module APIs

While, the `Buffer` object is available as a global, there are additional
`Buffer`-related APIs that are available only via the `node:buffer` module
accessed using `require('node:buffer')`.

### `buffer.atob(data)`

> Stability: 3 - Legacy. Use `Buffer.from(data, 'base64')` instead.

* `data` {any} The Base64-encoded input string.
* Returns: {string}

Decodes a string of Base64-encoded data into bytes, and encodes those bytes
into a string using Latin-1 (ISO-8859-1).

The `data` may be any JavaScript-value that can be coerced into a string.

**This function is only provided for compatibility with legacy web platform APIs
and should never be used in new code, because they use strings to represent
binary data and predate the introduction of typed arrays in JavaScript.
For code running using Node.js APIs, converting between base64-encoded strings
and binary data should be performed using `Buffer.from(str, 'base64')` and
`buf.toString('base64')`.**

An automated migration is available (source:

```bash
npx codemod@latest @nodejs/buffer-atob-btoa
```

### `buffer.btoa(data)`

> Stability: 3 - Legacy. Use `buf.toString('base64')` instead.

* `data` {any} An ASCII (Latin1) string.
* Returns: {string}

Decodes a string into bytes using Latin-1 (ISO-8859), and encodes those bytes
into a string using Base64.

The `data` may be any JavaScript-value that can be coerced into a string.

**This function is only provided for compatibility with legacy web platform APIs
and should never be used in new code, because they use strings to represent
binary data and predate the introduction of typed arrays in JavaScript.
For code running using Node.js APIs, converting between base64-encoded strings
and binary data should be performed using `Buffer.from(str, 'base64')` and
`buf.toString('base64')`.**

An automated migration is available (source:

```bash
npx codemod@latest @nodejs/buffer-atob-btoa
```

### `buffer.isAscii(input)`

* `input` {Buffer | ArrayBuffer | TypedArray} The input to validate.
* Returns: {boolean}

This function returns `true` if `input` contains only valid ASCII-encoded data,
including the case in which `input` is empty.

A detached `ArrayBuffer`, or a `TypedArray` backed by one, is treated as empty.

### `buffer.isLatin1(input)`

* `input` {string} The string to validate.
* Returns: {boolean}

This function returns `true` if `input` can be losslessly encoded using the
Node.js `'latin1'` encoding, including the case in
which `input` is empty. That is, it returns `true` if every UTF-16 code unit
of `input` is in the range `U+0000` to `U+00FF`. Such a string is also a valid
WebIDL `ByteString`.

This check uses the Node.js definition of `'latin1'`, in which each code unit
from `U+0000` to `U+00FF` maps directly to the byte of the same value. It does
not use the WHATWG Encoding Standard definition, in which the `'latin1'`
label is an alias for `windows-1252`. For example, `'\u0080'` is considered
latin1 by this function, while `'€'` (`U+20AC`, which `windows-1252` encodes as
`0x80`) is not.

Unlike `buffer.isAscii()` and `buffer.isUtf8()`, this function
validates a string rather than a `Buffer`, `TypedArray`, or `ArrayBuffer`.
Every byte sequence would trivially be valid `'latin1'`, since every byte maps
to a code unit less than or equal to `0xFF`.

```mjs
import { isLatin1 } from 'node:buffer';

isLatin1('hello');   // true
isLatin1('café');    // true
isLatin1('\u00ff');  // true
isLatin1('\u0100');  // false
isLatin1('€');       // false
```

```cjs
const { isLatin1 } = require('node:buffer');

isLatin1('hello');   // true
isLatin1('café');    // true
isLatin1('\u00ff');  // true
isLatin1('\u0100');  // false
isLatin1('€');       // false
```

### `buffer.isUtf8(input)`

* `input` {Buffer | ArrayBuffer | TypedArray} The input to validate.
* Returns: {boolean}

This function returns `true` if `input` contains only valid UTF-8-encoded data,
including the case in which `input` is empty.

A detached `ArrayBuffer`, or a `TypedArray` backed by one, is treated as empty.

### `buffer.INSPECT_MAX_BYTES`

* Type: {integer} **Default:** `50`

Returns the maximum number of bytes that will be returned when
`buf.inspect()` is called. This can be overridden by user modules. See
`util.inspect()` for more details on `buf.inspect()` behavior.

### `buffer.kMaxLength`

* Type: {integer} The largest size allowed for a single `Buffer` instance.

An alias for `buffer.constants.MAX_LENGTH`.

### `buffer.kStringMaxLength`

* Type: {integer} The largest length allowed for a single `string` instance.

An alias for `buffer.constants.MAX_STRING_LENGTH`.

### `buffer.resolveObjectURL(id)`

* `id` {string} A `'blob:nodedata:...` URL string returned by a prior call to
  `URL.createObjectURL()`.
* Returns: {Blob}

Resolves a `'blob:nodedata:...'` an associated {Blob} object registered using
a prior call to `URL.createObjectURL()`.

### `buffer.transcode(source, fromEnc, toEnc)`

* `source` {Buffer|Uint8Array} A `Buffer` or `Uint8Array` instance.
* `fromEnc` {string} The current encoding.
* `toEnc` {string} To target encoding.
* Returns: {Buffer}

Re-encodes the given `Buffer` or `Uint8Array` instance from one character
encoding to another. Returns a new `Buffer` instance.

Throws if the `fromEnc` or `toEnc` specify invalid character encodings or if
conversion from `fromEnc` to `toEnc` is not permitted.

Encodings supported by `buffer.transcode()` are: `'ascii'`, `'utf8'`,
`'utf16le'`, `'ucs2'`, `'latin1'`, and `'binary'`.

The transcoding process will use substitution characters if a given byte
sequence cannot be adequately represented in the target encoding. For instance:

```mjs
import { Buffer, transcode } from 'node:buffer';

const newBuf = transcode(Buffer.from('€'), 'utf8', 'ascii');
console.log(newBuf.toString('ascii'));
// Prints: '?'
```

```cjs
const { Buffer, transcode } = require('node:buffer');

const newBuf = transcode(Buffer.from('€'), 'utf8', 'ascii');
console.log(newBuf.toString('ascii'));
// Prints: '?'
```

Because the Euro (`€`) sign is not representable in US-ASCII, it is replaced
with `?` in the transcoded `Buffer`.

### Buffer constants

#### `buffer.constants.MAX_LENGTH`

* Type: {integer} The largest size allowed for a single `Buffer` instance.

On 32-bit architectures, this value is equal to 231 - 1 (about 2
GiB).

On 64-bit architectures, this value is equal to `Number.MAX_SAFE_INTEGER`
(253 - 1, about 8 PiB).

It reflects `v8::Uint8Array::kMaxLength` under the hood.

This value is also available as `buffer.kMaxLength`.

#### `buffer.constants.MAX_STRING_LENGTH`

* Type: {integer} The largest length allowed for a single `string` instance.

Represents the largest `length` that a `string` primitive can have, counted
in UTF-16 code units.

This value may depend on the JS engine that is being used.
