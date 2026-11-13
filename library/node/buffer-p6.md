---
title: "Buffer (part 6 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/buffer.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Buffer (part 6 of 11)

### `buf.lastIndexOf(value, start[, end])`

* `value` {string|Buffer|Uint8Array|integer} What to search for.
* `start` {integer} Where to begin searching in `buf`. If negative, then
  offset is calculated from the end of `buf`. **Default:**
  `buf.length - 1`.
* `end` {integer} Where to stop searching in `buf` (exclusive). **Default:**
  `buf.length`.
* `encoding` {string} If `value` is a string, this is the encoding used to
  determine the binary representation of the string that will be searched for in
  `buf`. **Default:** `'utf8'`.
* Returns: {integer} The index of the last occurrence of `value` in `buf`, or
  `-1` if `buf` does not contain `value`.

Identical to `buf.indexOf()`, except the last occurrence of `value` is found
rather than the first occurrence.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('this buffer is a buffer');

console.log(buf.lastIndexOf('this'));
// Prints: 0
console.log(buf.lastIndexOf('buffer'));
// Prints: 17
console.log(buf.lastIndexOf(Buffer.from('buffer')));
// Prints: 17
console.log(buf.lastIndexOf(97));
// Prints: 15 (97 is the decimal ASCII value for 'a')
console.log(buf.lastIndexOf(Buffer.from('yolo')));
// Prints: -1
console.log(buf.lastIndexOf('buffer', 5));
// Prints: 5
console.log(buf.lastIndexOf('buffer', 4));
// Prints: -1

const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');

console.log(utf16Buffer.lastIndexOf('\u03a3', undefined, 'utf16le'));
// Prints: 6
console.log(utf16Buffer.lastIndexOf('\u03a3', -5, 'utf16le'));
// Prints: 4
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('this buffer is a buffer');

console.log(buf.lastIndexOf('this'));
// Prints: 0
console.log(buf.lastIndexOf('buffer'));
// Prints: 17
console.log(buf.lastIndexOf(Buffer.from('buffer')));
// Prints: 17
console.log(buf.lastIndexOf(97));
// Prints: 15 (97 is the decimal ASCII value for 'a')
console.log(buf.lastIndexOf(Buffer.from('yolo')));
// Prints: -1
console.log(buf.lastIndexOf('buffer', 5));
// Prints: 5
console.log(buf.lastIndexOf('buffer', 4));
// Prints: -1

const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');

console.log(utf16Buffer.lastIndexOf('\u03a3', undefined, 'utf16le'));
// Prints: 6
console.log(utf16Buffer.lastIndexOf('\u03a3', -5, 'utf16le'));
// Prints: 4
```

If `value` is not a string, number, or `Buffer`, this method will throw a
`TypeError`. If `value` is a number, it will be coerced to a valid byte value,
an integer between 0 and 255.

If `byteOffset` is not a number, it will be coerced to a number. Any arguments
that coerce to `NaN`, like `{}` or `undefined`, will search the whole buffer.
This behavior matches `String.prototype.lastIndexOf()`.

```mjs
import { Buffer } from 'node:buffer';

const b = Buffer.from('abcdef');

// Passing a value that's a number, but not a valid byte.
// Prints: 2, equivalent to searching for 99 or 'c'.
console.log(b.lastIndexOf(99.9));
console.log(b.lastIndexOf(256 + 99));

// Passing a byteOffset that coerces to NaN.
// Prints: 1, searching the whole buffer.
console.log(b.lastIndexOf('b', undefined));
console.log(b.lastIndexOf('b', {}));

// Passing a byteOffset that coerces to 0.
// Prints: -1, equivalent to passing 0.
console.log(b.lastIndexOf('b', null));
console.log(b.lastIndexOf('b', []));
```

```cjs
const { Buffer } = require('node:buffer');

const b = Buffer.from('abcdef');

// Passing a value that's a number, but not a valid byte.
// Prints: 2, equivalent to searching for 99 or 'c'.
console.log(b.lastIndexOf(99.9));
console.log(b.lastIndexOf(256 + 99));

// Passing a byteOffset that coerces to NaN.
// Prints: 1, searching the whole buffer.
console.log(b.lastIndexOf('b', undefined));
console.log(b.lastIndexOf('b', {}));

// Passing a byteOffset that coerces to 0.
// Prints: -1, equivalent to passing 0.
console.log(b.lastIndexOf('b', null));
console.log(b.lastIndexOf('b', []));
```

If `value` is an empty string or empty `Buffer`, `byteOffset` will be returned.

### `buf.length`

* Type: {integer}

Returns the number of bytes in `buf`.

```mjs
import { Buffer } from 'node:buffer';

// Create a `Buffer` and write a shorter string to it using UTF-8.

const buf = Buffer.alloc(1234);

console.log(buf.length);
// Prints: 1234

buf.write('some string', 0, 'utf8');

console.log(buf.length);
// Prints: 1234
```

```cjs
const { Buffer } = require('node:buffer');

// Create a `Buffer` and write a shorter string to it using UTF-8.

const buf = Buffer.alloc(1234);

console.log(buf.length);
// Prints: 1234

buf.write('some string', 0, 'utf8');

console.log(buf.length);
// Prints: 1234
```

### `buf.parent`

> Stability: 0 - Deprecated: Use `buf.buffer` instead.

The `buf.parent` property is a deprecated alias for `buf.buffer`.

### `buf.readBigInt64BE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy: `0 <= offset <= buf.length - 8`. **Default:** `0`.
* Returns: {bigint}

Reads a signed, big-endian 64-bit integer from `buf` at the specified `offset`.

Integers read from a `Buffer` are interpreted as two's complement signed
values.

### `buf.readBigInt64LE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy: `0 <= offset <= buf.length - 8`. **Default:** `0`.
* Returns: {bigint}

Reads a signed, little-endian 64-bit integer from `buf` at the specified
`offset`.

Integers read from a `Buffer` are interpreted as two's complement signed
values.

### `buf.readBigUInt64BE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy: `0 <= offset <= buf.length - 8`. **Default:** `0`.
* Returns: {bigint}

Reads an unsigned, big-endian 64-bit integer from `buf` at the specified
`offset`.

This function is also available under the `readBigUint64BE` alias.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);

console.log(buf.readBigUInt64BE(0));
// Prints: 4294967295n
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);

console.log(buf.readBigUInt64BE(0));
// Prints: 4294967295n
```

### `buf.readBigUInt64LE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy: `0 <= offset <= buf.length - 8`. **Default:** `0`.
* Returns: {bigint}

Reads an unsigned, little-endian 64-bit integer from `buf` at the specified
`offset`.

This function is also available under the `readBigUint64LE` alias.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);

console.log(buf.readBigUInt64LE(0));
// Prints: 18446744069414584320n
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);

console.log(buf.readBigUInt64LE(0));
// Prints: 18446744069414584320n
```

### `buf.readDoubleBE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - 8`. **Default:** `0`.
* Returns: {number}

Reads a 64-bit, big-endian double from `buf` at the specified `offset`.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(buf.readDoubleBE(0));
// Prints: 8.20788039913184e-304
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(buf.readDoubleBE(0));
// Prints: 8.20788039913184e-304
```

### `buf.readDoubleLE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - 8`. **Default:** `0`.
* Returns: {number}

Reads a 64-bit, little-endian double from `buf` at the specified `offset`.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(buf.readDoubleLE(0));
// Prints: 5.447603722011605e-270
console.log(buf.readDoubleLE(1));
// Throws ERR_OUT_OF_RANGE.
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(buf.readDoubleLE(0));
// Prints: 5.447603722011605e-270
console.log(buf.readDoubleLE(1));
// Throws ERR_OUT_OF_RANGE.
```

### `buf.readFloatBE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - 4`. **Default:** `0`.
* Returns: {number}

Reads a 32-bit, big-endian float from `buf` at the specified `offset`.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4]);

console.log(buf.readFloatBE(0));
// Prints: 2.387939260590663e-38
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4]);

console.log(buf.readFloatBE(0));
// Prints: 2.387939260590663e-38
```

### `buf.readFloatLE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - 4`. **Default:** `0`.
* Returns: {number}

Reads a 32-bit, little-endian float from `buf` at the specified `offset`.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4]);

console.log(buf.readFloatLE(0));
// Prints: 1.539989614439558e-36
console.log(buf.readFloatLE(1));
// Throws ERR_OUT_OF_RANGE.
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4]);

console.log(buf.readFloatLE(0));
// Prints: 1.539989614439558e-36
console.log(buf.readFloatLE(1));
// Throws ERR_OUT_OF_RANGE.
```

### `buf.readInt8([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - 1`. **Default:** `0`.
* Returns: {integer}

Reads a signed 8-bit integer from `buf` at the specified `offset`.

Integers read from a `Buffer` are interpreted as two's complement signed values.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([-1, 5]);

console.log(buf.readInt8(0));
// Prints: -1
console.log(buf.readInt8(1));
// Prints: 5
console.log(buf.readInt8(2));
// Throws ERR_OUT_OF_RANGE.
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([-1, 5]);

console.log(buf.readInt8(0));
// Prints: -1
console.log(buf.readInt8(1));
// Prints: 5
console.log(buf.readInt8(2));
// Throws ERR_OUT_OF_RANGE.
```

### `buf.readInt16BE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - 2`. **Default:** `0`.
* Returns: {integer}

Reads a signed, big-endian 16-bit integer from `buf` at the specified `offset`.

Integers read from a `Buffer` are interpreted as two's complement signed values.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0, 5]);

console.log(buf.readInt16BE(0));
// Prints: 5
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0, 5]);

console.log(buf.readInt16BE(0));
// Prints: 5
```

### `buf.readInt16LE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - 2`. **Default:** `0`.
* Returns: {integer}

Reads a signed, little-endian 16-bit integer from `buf` at the specified
`offset`.

Integers read from a `Buffer` are interpreted as two's complement signed values.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0, 5]);

console.log(buf.readInt16LE(0));
// Prints: 1280
console.log(buf.readInt16LE(1));
// Throws ERR_OUT_OF_RANGE.
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0, 5]);

console.log(buf.readInt16LE(0));
// Prints: 1280
console.log(buf.readInt16LE(1));
// Throws ERR_OUT_OF_RANGE.
```

### `buf.readInt32BE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - 4`. **Default:** `0`.
* Returns: {integer}

Reads a signed, big-endian 32-bit integer from `buf` at the specified `offset`.

Integers read from a `Buffer` are interpreted as two's complement signed values.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0, 0, 0, 5]);

console.log(buf.readInt32BE(0));
// Prints: 5
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0, 0, 0, 5]);

console.log(buf.readInt32BE(0));
// Prints: 5
```

### `buf.readInt32LE([offset])`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - 4`. **Default:** `0`.
* Returns: {integer}

Reads a signed, little-endian 32-bit integer from `buf` at the specified
`offset`.

Integers read from a `Buffer` are interpreted as two's complement signed values.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0, 0, 0, 5]);

console.log(buf.readInt32LE(0));
// Prints: 83886080
console.log(buf.readInt32LE(1));
// Throws ERR_OUT_OF_RANGE.
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0, 0, 0, 5]);

console.log(buf.readInt32LE(0));
// Prints: 83886080
console.log(buf.readInt32LE(1));
// Throws ERR_OUT_OF_RANGE.
```

### `buf.readIntBE(offset, byteLength)`

* `offset` {integer} Number of bytes to skip before starting to read. Must
  satisfy `0 <= offset <= buf.length - byteLength`.
* `byteLength` {integer} Number of bytes to read. Must satisfy
  `0 < byteLength <= 6`.
* Returns: {integer}

Reads `byteLength` number of bytes from `buf` at the specified `offset`
and interprets the result as a big-endian, two's complement signed value
supporting up to 48 bits of accuracy.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readIntBE(0, 6).toString(16));
// Prints: 1234567890ab
console.log(buf.readIntBE(1, 6).toString(16));
// Throws ERR_OUT_OF_RANGE.
console.log(buf.readIntBE(1, 0).toString(16));
// Throws ERR_OUT_OF_RANGE.
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readIntBE(0, 6).toString(16));
// Prints: 1234567890ab
console.log(buf.readIntBE(1, 6).toString(16));
// Throws ERR_OUT_OF_RANGE.
console.log(buf.readIntBE(1, 0).toString(16));
// Throws ERR_OUT_OF_RANGE.
```
