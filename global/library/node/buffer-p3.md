---
title: "Buffer (part 3 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/buffer.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Buffer (part 3 of 11)

## Class: `Buffer`

The `Buffer` class is a global type for dealing with binary data directly.
It can be constructed in a variety of ways.

### Static method: `Buffer.alloc(size[, fill[, encoding]])`

* `size` {integer} The desired length of the new `Buffer`.
* `fill` {string|Buffer|Uint8Array|integer} A value to pre-fill the new `Buffer`
  with. **Default:** `0`.
* `encoding` {string} If `fill` is a string, this is its encoding.
  **Default:** `'utf8'`.
* Returns: {Buffer}

Allocates a new `Buffer` of `size` bytes. If `fill` is `undefined`, the
`Buffer` will be zero-filled.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(5);

console.log(buf);
// Prints: <Buffer .. .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(5);

console.log(buf);
// Prints: <Buffer .. .. .. .. ..>
```

If `size` is larger than
`buffer.constants.MAX_LENGTH` or smaller than 0, `ERR_OUT_OF_RANGE`
is thrown.

If `fill` is specified, the allocated `Buffer` will be initialized by calling
`buf.fill(fill)`.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(5, 'a');

console.log(buf);
// Prints: <Buffer .. .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(5, 'a');

console.log(buf);
// Prints: <Buffer .. .. .. .. ..>
```

If both `fill` and `encoding` are specified, the allocated `Buffer` will be
initialized by calling `buf.fill(fill, encoding)`.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');

console.log(buf);
// Prints: <Buffer .. .. .. .. .. .. .. .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');

console.log(buf);
// Prints: <Buffer .. .. .. .. .. .. .. .. .. .. ..>
```

Calling `Buffer.alloc()` can be measurably slower than the alternative
`Buffer.allocUnsafe()` but ensures that the newly created `Buffer` instance
contents will never contain sensitive data from previous allocations, including
data that might not have been allocated for `Buffer`s.

A `TypeError` will be thrown if `size` is not a number.

### Static method: `Buffer.allocUnsafe(size[, alignment])`

* `size` {integer} The desired length of the new `Buffer`.
* `alignment` {integer} If given, the memory backing the new `Buffer` will start
  at an address that is a multiple of `alignment`. Must be a power of two no
  larger than `2 ** 30`. See Aligned allocations.
* Returns: {Buffer}

Allocates a new `Buffer` of `size` bytes. If `size` is larger than
`buffer.constants.MAX_LENGTH` or smaller than 0, `ERR_OUT_OF_RANGE`
is thrown.

The underlying memory for `Buffer` instances created in this way is _not
initialized_. The contents of the newly created `Buffer` are unknown and
_may contain sensitive data_. Use `Buffer.alloc()` instead to initialize
`Buffer` instances with zeroes.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(10);

console.log(buf);
// Prints (contents may vary): <Buffer .. .. .. .. .. .. .. .. .. ..>

buf.fill(0);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. .. .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(10);

console.log(buf);
// Prints (contents may vary): <Buffer .. .. .. .. .. .. .. .. .. ..>

buf.fill(0);

console.log(buf);
// Prints: <Buffer .. .. .. .. .. .. .. .. .. ..>
```

A `TypeError` will be thrown if `size` is not a number.

The `Buffer` module pre-allocates an internal `Buffer` instance of
size `Buffer.poolSize` that is used as a pool for the fast allocation of new
`Buffer` instances created using `Buffer.allocUnsafe()`, `Buffer.from(array)`,
`Buffer.from(string)`, and `Buffer.concat()` only when `size` is less than
`Buffer.poolSize >>> 1` (floor of `Buffer.poolSize` divided by two).

Use of this pre-allocated internal memory pool is a key <example-value> between
calling `Buffer.alloc(size, fill)` vs. `Buffer.allocUnsafe(size).fill(fill)`.
Specifically, `Buffer.alloc(size, fill)` will _never_ use the internal `Buffer`
pool, while `Buffer.allocUnsafe(size).fill(fill)` _will_ use the internal
`Buffer` pool if `size` is less than or equal to half `Buffer.poolSize`. The
difference is subtle but can be important when an application requires the
additional performance that `Buffer.allocUnsafe()` provides.

### Static method: `Buffer.allocUnsafeSlow(size[, alignment])`

* `size` {integer} The desired length of the new `Buffer`.
* `alignment` {integer} If given, the memory backing the new `Buffer` will start
  at an address that is a multiple of `alignment`. Must be a power of two no
  larger than `2 ** 30`. See Aligned allocations.
* Returns: {Buffer}

Allocates a new `Buffer` of `size` bytes. If `size` is larger than
`buffer.constants.MAX_LENGTH` or smaller than 0, `ERR_OUT_OF_RANGE`
is thrown. A zero-length `Buffer` is created if `size` is 0.

The underlying memory for `Buffer` instances created in this way is _not
initialized_. The contents of the newly created `Buffer` are unknown and
_may contain sensitive data_. Use `buf.fill(0)` to initialize
such `Buffer` instances with zeroes.

When using `Buffer.allocUnsafe()` to allocate new `Buffer` instances,
allocations less than `Buffer.poolSize >>> 1` (32KiB when default poolSize is used) are sliced
from a single pre-allocated `Buffer`. This allows applications to avoid the
garbage collection overhead of creating many individually allocated `Buffer`
instances. This approach improves both performance and memory usage by
eliminating the need to track and clean up as many individual `ArrayBuffer` objects.

However, in the case where a developer may need to retain a small chunk of
memory from a pool for an indeterminate amount of time, it may be appropriate
to create an un-pooled `Buffer` instance using `Buffer.allocUnsafeSlow()` and
then copying out the relevant bits.

```mjs
import { Buffer } from 'node:buffer';

// Need to keep around a few small chunks of memory.
const store = [];

socket.on('readable', () => {
  let data;
  while (null !== (data = readable.read())) {
    // Allocate for retained data.
    const sb = Buffer.allocUnsafeSlow(10);

    // Copy the data into the new allocation.
    data.copy(sb, 0, 0, 10);

    store.push(sb);
  }
});
```

```cjs
const { Buffer } = require('node:buffer');

// Need to keep around a few small chunks of memory.
const store = [];

socket.on('readable', () => {
  let data;
  while (null !== (data = readable.read())) {
    // Allocate for retained data.
    const sb = Buffer.allocUnsafeSlow(10);

    // Copy the data into the new allocation.
    data.copy(sb, 0, 0, 10);

    store.push(sb);
  }
});
```

A `TypeError` will be thrown if `size` is not a number.

### Static method: `Buffer.byteLength(string[, encoding])`

* `string` {string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer} A
  value to calculate the length of.
* `encoding` {string} If `string` is a string, this is its encoding.
  **Default:** `'utf8'`.
* Returns: {integer} The number of bytes contained within `string`.

Returns the byte length of a string when encoded using `encoding`.
This is not the same as `String.prototype.length`, which does not account
for the encoding that is used to convert the string into bytes.

For `'base64'`, `'base64url'`, and `'hex'`, this function assumes valid input.
For strings that contain non-base64/hex-encoded data (e.g. whitespace), the
return value might be greater than the length of a `Buffer` created from the
string.

```mjs
import { Buffer } from 'node:buffer';

const str = '\u00bd + \u00bc = \u00be';

console.log(`${str}: ${str.length} characters, ` +
            `${Buffer.byteLength(str, 'utf8')} bytes`);
// Prints: ½ + ¼ = ¾: 9 characters, 12 bytes
```

```cjs
const { Buffer } = require('node:buffer');

const str = '\u00bd + \u00bc = \u00be';

console.log(`${str}: ${str.length} characters, ` +
            `${Buffer.byteLength(str, 'utf8')} bytes`);
// Prints: ½ + ¼ = ¾: 9 characters, 12 bytes
```

When `string` is a {Buffer|DataView|TypedArray|ArrayBuffer|SharedArrayBuffer},
the byte length as reported by `.byteLength` is returned.

### Static method: `Buffer.stringLength(input[, encoding])`

* `input` {Buffer | ArrayBuffer | TypedArray} The bytes that would be decoded.
* `encoding` {string} The character encoding `input` would be decoded with.
  **Default:** `'utf8'`.
* Returns: {integer}

Returns the length, in UTF-16 code units, of the string that
`buf.toString(encoding)` would produce for the same bytes, without decoding
them. This is the counterpart of `Buffer.byteLength()`, which returns the
number of bytes a string would encode to.

For `'utf8'`, invalid byte sequences are counted as they would be decoded:
each maximal invalid subsequence becomes one `U+FFFD` replacement character.
For every other encoding the result is computed from `input.byteLength` alone.

A detached `ArrayBuffer`, or a `TypedArray` backed by one, is treated as empty.

The result is not capped: compare it with
`buffer.constants.MAX_STRING_LENGTH` before decoding to know whether the
decode can succeed at all. A string of `n` code units occupies between `n` and
`2 * n` bytes of memory.

```mjs
import { Buffer, constants } from 'node:buffer';

const buf = Buffer.from('€ 100', 'utf8');

console.log(Buffer.stringLength(buf));
// Prints: 5
console.log(Buffer.stringLength(buf, 'hex'));
// Prints: 14
console.log(Buffer.stringLength(buf) <= constants.MAX_STRING_LENGTH);
// Prints: true
```

```cjs
const { Buffer, constants } = require('node:buffer');

const buf = Buffer.from('€ 100', 'utf8');

console.log(Buffer.stringLength(buf));
// Prints: 5
console.log(Buffer.stringLength(buf, 'hex'));
// Prints: 14
console.log(Buffer.stringLength(buf) <= constants.MAX_STRING_LENGTH);
// Prints: true
```

### Static method: `Buffer.compare(buf1, buf2)`

* `buf1` {Buffer|Uint8Array}
* `buf2` {Buffer|Uint8Array}
* Returns: {integer} Either `-1`, `0`, or `1`, depending on the result of the
  comparison. See `buf.compare()` for details.

Compares `buf1` to `buf2`, typically for the purpose of sorting arrays of
`Buffer` instances. This is equivalent to calling
`buf1.compare(buf2)`.

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

console.log(arr.sort(Buffer.compare));
// Prints: [ <Buffer .. .. .. ..>, <Buffer .. .. .. ..> ]
// (This result is equal to: [buf2, buf1].)
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

console.log(arr.sort(Buffer.compare));
// Prints: [ <Buffer .. .. .. ..>, <Buffer .. .. .. ..> ]
// (This result is equal to: [buf2, buf1].)
```

### Static method: `Buffer.concat(list[, totalLength])`

* `list` {Buffer\[] | Uint8Array\[]} List of `Buffer` or {Uint8Array}
  instances to concatenate.
* `totalLength` {integer} Total length of the `Buffer` instances in `list`
  when concatenated.
* Returns: {Buffer}

Returns a new `Buffer` which is the result of concatenating all the `Buffer`
instances in the `list` together.

If the list has no items, or if the `totalLength` is 0, then a new zero-length
`Buffer` is returned.

If `totalLength` is not provided, it is calculated from the `Buffer` instances
in `list` by adding their lengths.

If `totalLength` is provided, it must be an unsigned integer. If the
combined length of the `Buffer`s in `list` exceeds `totalLength`, the result is
truncated to `totalLength`. If the combined length of the `Buffer`s in `list` is
less than `totalLength`, the remaining space is filled with zeros.

```mjs
import { Buffer } from 'node:buffer';

// Create a single `Buffer` from a list of three `Buffer` instances.

const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength);
// Prints: 42

const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

console.log(bufA);
// Prints: <Buffer .. .. .. .. ...>
console.log(bufA.length);
// Prints: 42
```

```cjs
const { Buffer } = require('node:buffer');

// Create a single `Buffer` from a list of three `Buffer` instances.

const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength);
// Prints: 42

const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

console.log(bufA);
// Prints: <Buffer .. .. .. .. ...>
console.log(bufA.length);
// Prints: 42
```

`Buffer.concat()` may also use the internal `Buffer` pool like
`Buffer.allocUnsafe()` does.

### Static method: `Buffer.copyBytesFrom(view[, offset[, length]])`

* `view` {TypedArray} The {TypedArray} to copy.
* `offset` {integer} The starting offset within `view`. **Default:** `0`.
* `length` {integer} The number of elements from `view` to copy.
  **Default:** `view.length - offset`.
* Returns: {Buffer}

Copies the underlying memory of `view` into a new `Buffer`.

```js
const u16 = new Uint16Array([0, 0xffff]);
const buf = Buffer.copyBytesFrom(u16, 1, 1);
u16[1] = 0;
console.log(buf.length); // 2
console.log(buf[0]); // 255
console.log(buf[1]); // 255
```

### Static method: `Buffer.from(array)`

* `array` {integer\[]}
* Returns: {Buffer}

Allocates a new `Buffer` using an `array` of bytes in the range `0` – `255`.
Array entries outside that range will be truncated to fit into it.

```mjs
import { Buffer } from 'node:buffer';

// Creates a new Buffer containing the UTF-8 bytes of the string 'buffer'.
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
```

```cjs
const { Buffer } = require('node:buffer');

// Creates a new Buffer containing the UTF-8 bytes of the string 'buffer'.
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
```

If `array` is an `Array`-like object (that is, one with a `length` property of
type `number`), it is treated as if it is an array, unless it is a `Buffer` or
a `Uint8Array`. This means all other `TypedArray` variants get treated as an
`Array`. To create a `Buffer` from the bytes backing a `TypedArray`, use
`Buffer.copyBytesFrom()`.

A `TypeError` will be thrown if `array` is not an `Array` or another type
appropriate for `Buffer.from()` variants.

`Buffer.from(array)` and `Buffer.from(string)` may also use the internal
`Buffer` pool like `Buffer.allocUnsafe()` does.
