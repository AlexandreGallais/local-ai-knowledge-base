---
title: "Buffer (part 9 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/buffer.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Buffer (part 9 of 11)

### `buf.writeInt32BE(value[, offset])`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - 4`. **Default:** `0`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `value` to `buf` at the specified `offset` as big-endian. The `value`
must be a valid signed 32-bit integer. Behavior is undefined when `value` is
anything other than a signed 32-bit integer.

The `value` is interpreted and written as a two's complement signed integer.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeInt32BE(0x01020304, 0);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeInt32BE(0x01020304, 0);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

### `buf.writeInt32LE(value[, offset])`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - 4`. **Default:** `0`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `value` to `buf` at the specified `offset` as little-endian. The `value`
must be a valid signed 32-bit integer. Behavior is undefined when `value` is
anything other than a signed 32-bit integer.

The `value` is interpreted and written as a two's complement signed integer.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeInt32LE(0x05060708, 0);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeInt32LE(0x05060708, 0);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

### `buf.writeIntBE(value, offset, byteLength)`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - byteLength`.
* `byteLength` {integer} Number of bytes to write. Must satisfy
  `0 < byteLength <= 6`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `byteLength` bytes of `value` to `buf` at the specified `offset`
as big-endian. Supports up to 48 bits of accuracy. Behavior is undefined when
`value` is anything other than a signed integer.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(6);

buf.writeIntBE(0x1234567890ab, 0, 6);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(6);

buf.writeIntBE(0x1234567890ab, 0, 6);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. ..>
```

### `buf.writeIntLE(value, offset, byteLength)`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - byteLength`.
* `byteLength` {integer} Number of bytes to write. Must satisfy
  `0 < byteLength <= 6`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `byteLength` bytes of `value` to `buf` at the specified `offset`
as little-endian. Supports up to 48 bits of accuracy. Behavior is undefined
when `value` is anything other than a signed integer.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(6);

buf.writeIntLE(0x1234567890ab, 0, 6);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(6);

buf.writeIntLE(0x1234567890ab, 0, 6);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. ..>
```

### `buf.writeUInt8(value[, offset])`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - 1`. **Default:** `0`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `value` to `buf` at the specified `offset`. `value` must be a
valid unsigned 8-bit integer. Behavior is undefined when `value` is anything
other than an unsigned 8-bit integer.

This function is also available under the `writeUint8` alias.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt8(0x3, 0);
buf.writeUInt8(0x4, 1);
buf.writeUInt8(0x23, 2);
buf.writeUInt8(0x42, 3);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt8(0x3, 0);
buf.writeUInt8(0x4, 1);
buf.writeUInt8(0x23, 2);
buf.writeUInt8(0x42, 3);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

### `buf.writeUInt16BE(value[, offset])`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - 2`. **Default:** `0`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `value` to `buf` at the specified `offset` as big-endian. The `value`
must be a valid unsigned 16-bit integer. Behavior is undefined when `value`
is anything other than an unsigned 16-bit integer.

This function is also available under the `writeUint16BE` alias.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt16BE(0xdead, 0);
buf.writeUInt16BE(0xbeef, 2);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt16BE(0xdead, 0);
buf.writeUInt16BE(0xbeef, 2);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

### `buf.writeUInt16LE(value[, offset])`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - 2`. **Default:** `0`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `value` to `buf` at the specified `offset` as little-endian. The `value`
must be a valid unsigned 16-bit integer. Behavior is undefined when `value` is
anything other than an unsigned 16-bit integer.

This function is also available under the `writeUint16LE` alias.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt16LE(0xdead, 0);
buf.writeUInt16LE(0xbeef, 2);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt16LE(0xdead, 0);
buf.writeUInt16LE(0xbeef, 2);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

### `buf.writeUInt32BE(value[, offset])`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - 4`. **Default:** `0`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `value` to `buf` at the specified `offset` as big-endian. The `value`
must be a valid unsigned 32-bit integer. Behavior is undefined when `value`
is anything other than an unsigned 32-bit integer.

This function is also available under the `writeUint32BE` alias.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt32BE(0xfeedface, 0);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt32BE(0xfeedface, 0);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

### `buf.writeUInt32LE(value[, offset])`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - 4`. **Default:** `0`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `value` to `buf` at the specified `offset` as little-endian. The `value`
must be a valid unsigned 32-bit integer. Behavior is undefined when `value` is
anything other than an unsigned 32-bit integer.

This function is also available under the `writeUint32LE` alias.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt32LE(0xfeedface, 0);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt32LE(0xfeedface, 0);

console.log(buf);
// Prints: <Buffer .. .. .. ..>
```

### `buf.writeUIntBE(value, offset, byteLength)`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - byteLength`.
* `byteLength` {integer} Number of bytes to write. Must satisfy
  `0 < byteLength <= 6`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `byteLength` bytes of `value` to `buf` at the specified `offset`
as big-endian. Supports up to 48 bits of accuracy. Behavior is undefined
when `value` is anything other than an unsigned integer.

This function is also available under the `writeUintBE` alias.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(6);

buf.writeUIntBE(0x1234567890ab, 0, 6);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(6);

buf.writeUIntBE(0x1234567890ab, 0, 6);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. ..>
```

### `buf.writeUIntLE(value, offset, byteLength)`

* `value` {integer} Number to be written to `buf`.
* `offset` {integer} Number of bytes to skip before starting to write. Must
  satisfy `0 <= offset <= buf.length - byteLength`.
* `byteLength` {integer} Number of bytes to write. Must satisfy
  `0 < byteLength <= 6`.
* Returns: {integer} `offset` plus the number of bytes written.

Writes `byteLength` bytes of `value` to `buf` at the specified `offset`
as little-endian. Supports up to 48 bits of accuracy. Behavior is undefined
when `value` is anything other than an unsigned integer.

This function is also available under the `writeUintLE` alias.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(6);

buf.writeUIntLE(0x1234567890ab, 0, 6);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(6);

buf.writeUIntLE(0x1234567890ab, 0, 6);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. ..>
```

### `new Buffer(array)`

> Stability: 0 - Deprecated: Use `Buffer.from(array)` instead.

* `array` {integer\[]} An array of bytes to copy from.

See `Buffer.from(array)`.

### `new Buffer(arrayBuffer[, byteOffset[, length]])`

> Stability: 0 - Deprecated: Use
> [`Buffer.from(arrayBuffer[, byteOffset[, length]])`][`Buffer.from(arrayBuf)`]
> instead.

* `arrayBuffer` {ArrayBuffer|SharedArrayBuffer} An {ArrayBuffer},
  {SharedArrayBuffer} or the `.buffer` property of a {TypedArray}.
* `byteOffset` {integer} Index of first byte to expose. **Default:** `0`.
* `length` {integer} Number of bytes to expose.
  **Default:** `arrayBuffer.byteLength - byteOffset`.

See
[`Buffer.from(arrayBuffer[, byteOffset[, length]])`][`Buffer.from(arrayBuf)`].

### `new Buffer(buffer)`

> Stability: 0 - Deprecated: Use `Buffer.from(buffer)` instead.

* `buffer` {Buffer|Uint8Array} An existing `Buffer` or {Uint8Array} from
  which to copy data.

See `Buffer.from(buffer)`.

### `new Buffer(size)`

> Stability: 0 - Deprecated: Use `Buffer.alloc()` instead (also see
> `Buffer.allocUnsafe()`).

* `size` {integer} The desired length of the new `Buffer`.

See `Buffer.alloc()` and `Buffer.allocUnsafe()`. This variant of the
constructor is equivalent to `Buffer.alloc()`.

### `new Buffer(string[, encoding])`

> Stability: 0 - Deprecated:
> Use `Buffer.from(string[, encoding])` instead.

* `string` {string} String to encode.
* `encoding` {string} The encoding of `string`. **Default:** `'utf8'`.

See `Buffer.from(string[, encoding])`.

## Class: `File`

* Extends: {Blob}

A {File} provides information about files.

### `new buffer.File(sources, fileName[, options])`

* `sources` {string\[]|ArrayBuffer\[]|TypedArray\[]|DataView\[]|Blob\[]|File\[]}
  An array of string, {ArrayBuffer}, {TypedArray}, {DataView}, {File}, or {Blob}
  objects, or any mix of such objects, that will be stored within the `File`.
* `fileName` {string} The name of the file.
* `options` {Object}
  * `endings` {string} One of either `'transparent'` or `'native'`. When set
    to `'native'`, line endings in string source parts will be converted to
    the platform native line-ending as specified by `require('node:os').EOL`.
  * `type` {string} The File content-type.
  * `lastModified` {number} The last modified date of the file.
    **Default:** `Date.now()`.

### `file.name`

* Type: {string}

The name of the `File`.

### `file.lastModified`

* Type: {number}

The last modified date of the `File`.
