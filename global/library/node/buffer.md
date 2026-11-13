---
title: "Buffer (part 1 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/buffer.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Buffer

> Stability: 2 - Stable

`Buffer` objects are used to represent a fixed-length sequence of bytes. Many
Node.js APIs support `Buffer`s.

The `Buffer` class is a subclass of JavaScript's {Uint8Array} class and
extends it with methods that cover additional use cases. Node.js APIs accept
plain {Uint8Array}s wherever `Buffer`s are supported as well.

While the `Buffer` class is available within the global scope, it is still
recommended to explicitly reference it via an import or require statement.

```mjs
import { Buffer } from 'node:buffer';

// Creates a zero-filled Buffer of length 10.
const buf1 = Buffer.alloc(10);

// Creates a Buffer of length 10,
// filled with bytes which all have the value `1`.
const buf2 = Buffer.alloc(10, 1);

// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using fill(), write(), or other functions that fill the Buffer's
// contents.
const buf3 = Buffer.allocUnsafe(10);

// Creates a Buffer containing the bytes [1, 2, 3].
const buf4 = Buffer.from([1, 2, 3]);

// Creates a Buffer containing the bytes [1, 1, 1, 1] – the entries
// are all truncated using `(value & 255)` to fit into the range 0–255.
const buf5 = Buffer.from([257, 257.5, -255, '1']);

// Creates a Buffer containing the UTF-8-encoded bytes for the string 'tést':
// [0x74, 0xc3, 0xa9, 0x73, 0x74] (in hexadecimal notation)
// [116, 195, 169, 115, 116] (in decimal notation)
const buf6 = Buffer.from('tést');

// Creates a Buffer containing the Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
const buf7 = Buffer.from('tést', 'latin1');
```

```cjs
const { Buffer } = require('node:buffer');

// Creates a zero-filled Buffer of length 10.
const buf1 = Buffer.alloc(10);

// Creates a Buffer of length 10,
// filled with bytes which all have the value `1`.
const buf2 = Buffer.alloc(10, 1);

// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using fill(), write(), or other functions that fill the Buffer's
// contents.
const buf3 = Buffer.allocUnsafe(10);

// Creates a Buffer containing the bytes [1, 2, 3].
const buf4 = Buffer.from([1, 2, 3]);

// Creates a Buffer containing the bytes [1, 1, 1, 1] – the entries
// are all truncated using `(value & 255)` to fit into the range 0–255.
const buf5 = Buffer.from([257, 257.5, -255, '1']);

// Creates a Buffer containing the UTF-8-encoded bytes for the string 'tést':
// [0x74, 0xc3, 0xa9, 0x73, 0x74] (in hexadecimal notation)
// [116, 195, 169, 115, 116] (in decimal notation)
const buf6 = Buffer.from('tést');

// Creates a Buffer containing the Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
const buf7 = Buffer.from('tést', 'latin1');
```

## Buffers and character encodings

When converting between `Buffer`s and strings, a character encoding may be
specified. If no character encoding is specified, UTF-8 will be used as the
default.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// Prints: aGVsbG8gd29ybGQ=

console.log(Buffer.from('fhqwhgads', 'utf8'));
// Prints: <Buffer .. .. .. .. .. .. .. .. ..>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// Prints: <Buffer .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// Prints: aGVsbG8gd29ybGQ=

console.log(Buffer.from('fhqwhgads', 'utf8'));
// Prints: <Buffer .. .. .. .. .. .. .. .. ..>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// Prints: <Buffer .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..>
```

Node.js buffers accept all case variations of encoding strings that they
receive. For example, UTF-8 can be specified as `'utf8'`, `'UTF8'`, or `'uTf8'`.

The character encodings currently supported by Node.js are the following:

* `'utf8'` (alias: `'utf-8'`): Multi-byte encoded Unicode characters. Many web
  pages and other document formats use UTF-8. This is the default character
  encoding. When decoding a `Buffer` into a string that does not exclusively
  contain valid UTF-8 data, the Unicode replacement character `U+FFFD` � will be
  used to represent those errors.

* `'utf16le'` (alias: `'utf-16le'`): Multi-byte encoded Unicode characters.
  Unlike `'utf8'`, each character in the string will be encoded using either 2
  or 4 bytes. Node.js only supports the little-endian variant of
  UTF-16.

* `'latin1'`: Latin-1 stands for ISO-8859-1. This character encoding only
  supports the Unicode characters from `U+0000` to `U+00FF`. Each character is
  encoded using a single byte. Characters that do not fit into that range are
  truncated and will be mapped to characters in that range.

Converting a `Buffer` into a string using one of the above is referred to as
decoding, and converting a string into a `Buffer` is referred to as encoding.

Node.js also supports the following binary-to-text encodings. For
binary-to-text encodings, the naming convention is reversed: Converting a
`Buffer` into a string is typically referred to as encoding, and converting a
string into a `Buffer` as decoding.

* `'base64'`: Base64 encoding. When creating a `Buffer` from a string,
  this encoding will also correctly accept "URL and Filename Safe Alphabet" as
  specified in RFC 4648, Section 5. Whitespace characters such as spaces,
  tabs, and new lines contained within the base64-encoded string are ignored.

* `'base64url'`: base64url encoding as specified in
  RFC 4648, Section 5. When creating a `Buffer` from a string, this
  encoding will also correctly accept regular base64-encoded strings. When
  encoding a `Buffer` to a string, this encoding will omit padding.

* `'hex'`: Encode each byte as two hexadecimal characters. Data truncation
  may occur when decoding strings that do not exclusively consist of an even
  number of hexadecimal characters. See below for an example.

The following legacy character encodings are also supported:

* `'ascii'`: For 7-bit ASCII data only. When encoding a string into a
  `Buffer`, this is equivalent to using `'latin1'`. When decoding a `Buffer`
  into a string, using this encoding will additionally unset the highest bit of
  each byte before decoding as `'latin1'`.
  Generally, there should be no reason to use this encoding, as `'utf8'`
  (or, if the data is known to always be ASCII-only, `'latin1'`) will be a
  better choice when encoding or decoding ASCII-only text. It is only provided
  for legacy compatibility.

* `'binary'`: Alias for `'latin1'`.
  The name of this encoding can be very misleading, as all of the
  encodings listed here convert between strings and binary data. For converting
  between strings and `Buffer`s, typically `'utf8'` is the right choice.

* `'ucs2'`, `'ucs-2'`: Aliases of `'utf16le'`. UCS-2 used to refer to a variant
  of UTF-16 that did not support characters that had code points larger than
  U+FFFF. In Node.js, these code points are always supported.

```mjs
import { Buffer } from 'node:buffer';

Buffer.from('1ag123', 'hex');
// Prints <Buffer 1a>, data truncated when first non-hexadecimal value
// ('g') encountered.

Buffer.from('1a7', 'hex');
// Prints <Buffer 1a>, data truncated when data ends in single digit ('7').

Buffer.from('1634', 'hex');
// Prints <Buffer 16 34>, all data represented.
```

```cjs
const { Buffer } = require('node:buffer');

Buffer.from('1ag123', 'hex');
// Prints <Buffer 1a>, data truncated when first non-hexadecimal value
// ('g') encountered.

Buffer.from('1a7', 'hex');
// Prints <Buffer 1a>, data truncated when data ends in single digit ('7').

Buffer.from('1634', 'hex');
// Prints <Buffer 16 34>, all data represented.
```

Modern Web browsers follow the WHATWG Encoding Standard which aliases
both `'latin1'` and `'ISO-8859-1'` to `'win-1252'`. This means that while doing
something like `http.get()`, if the returned charset is one of those listed in
the WHATWG specification it is possible that the server actually returned
`'win-1252'`-encoded data, and using `'latin1'` encoding may incorrectly decode
the characters.

## Buffers and TypedArrays

`Buffer` instances are also JavaScript {Uint8Array} and {TypedArray}
instances. All {TypedArray} methods and properties are available on `Buffer`s. There are,
however, subtle incompatibilities between the `Buffer` API and the
{TypedArray} API.

In particular:

* While `TypedArray.prototype.slice()` creates a copy of part of the `TypedArray`,
  `Buffer.prototype.slice()` creates a view over the existing `Buffer`
  without copying. This behavior can be surprising, and only exists for legacy
  compatibility. `TypedArray.prototype.subarray()` can be used to achieve
  the behavior of `Buffer.prototype.slice()` on both `Buffer`s
  and other `TypedArray`s and should be preferred.
* `buf.toString()` is incompatible with its `TypedArray` equivalent.
* A number of methods, e.g. `buf.indexOf()`, support additional arguments.

There are two ways to create new {TypedArray} instances from a `Buffer`:

* Passing a `Buffer` to a {TypedArray} constructor will copy the `Buffer`'s
  contents, interpreted as an array of integers, and not as a byte sequence
  of the target type.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4]);
const uint32array = new Uint32Array(buf);

console.log(uint32array);

// Prints: Uint32Array(4) [ 1, 2, 3, 4 ]
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4]);
const uint32array = new Uint32Array(buf);

console.log(uint32array);

// Prints: Uint32Array(4) [ 1, 2, 3, 4 ]
```

* Passing the `Buffer`'s underlying {ArrayBuffer} will create a
  {TypedArray} that shares its memory with the `Buffer`.

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('hello', 'utf16le');
const uint16array = new Uint16Array(
  buf.buffer,
  buf.byteOffset,
  buf.length / Uint16Array.BYTES_PER_ELEMENT);

console.log(uint16array);

// Prints: Uint16Array(5) [ 104, 101, 108, 108, 111 ]
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('hello', 'utf16le');
const uint16array = new Uint16Array(
  buf.buffer,
  buf.byteOffset,
  buf.length / Uint16Array.BYTES_PER_ELEMENT);

console.log(uint16array);

// Prints: Uint16Array(5) [ 104, 101, 108, 108, 111 ]
```

It is possible to create a new `Buffer` that shares the same allocated
memory as a {TypedArray} instance by using the `TypedArray` object's
`.buffer` property in the same way. `Buffer.from()`
behaves like `new Uint8Array()` in this context.

```mjs
import { Buffer } from 'node:buffer';

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// Copies the contents of `arr`.
const buf1 = Buffer.from(arr);

// Shares memory with `arr`.
const buf2 = Buffer.from(arr.buffer);

console.log(buf1);
// Prints: <Buffer 88 a0>
console.log(buf2);
// Prints: <Buffer .. .. .. ..>

arr[1] = 6000;

console.log(buf1);
// Prints: <Buffer 88 a0>
console.log(buf2);
// Prints: <Buffer .. .. .. ..>
```

```cjs
const { Buffer } = require('node:buffer');

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// Copies the contents of `arr`.
const buf1 = Buffer.from(arr);

// Shares memory with `arr`.
const buf2 = Buffer.from(arr.buffer);

console.log(buf1);
// Prints: <Buffer 88 a0>
console.log(buf2);
// Prints: <Buffer .. .. .. ..>

arr[1] = 6000;

console.log(buf1);
// Prints: <Buffer 88 a0>
console.log(buf2);
// Prints: <Buffer .. .. .. ..>
```

When creating a `Buffer` using a {TypedArray}'s `.buffer`, it is
possible to use only a portion of the underlying {ArrayBuffer} by passing in
`byteOffset` and `length` parameters.

```mjs
import { Buffer } from 'node:buffer';

const arr = new Uint16Array(20);
const buf = Buffer.from(arr.buffer, 0, 16);

console.log(buf.length);
// Prints: 16
```

```cjs
const { Buffer } = require('node:buffer');

const arr = new Uint16Array(20);
const buf = Buffer.from(arr.buffer, 0, 16);

console.log(buf.length);
// Prints: 16
```

The `Buffer.from()` and `TypedArray.from()` have different signatures and
implementations. Specifically, the {TypedArray} variants accept a second
argument that is a mapping function that is invoked on every element of the
typed array:

* [`TypedArray.from(source[, mapFn[, thisArg]])`][`TypedArray.from()`]

The `Buffer.from()` method, however, does not support the use of a mapping
function:

* `Buffer.from(array)`
* `Buffer.from(buffer)`
* [`Buffer.from(arrayBuffer[, byteOffset[, length]])`][`Buffer.from(arrayBuf)`]
* `Buffer.from(string[, encoding])`

### Buffer methods are callable with `Uint8Array` instances

All methods on the Buffer prototype are callable with a `Uint8Array` instance.

```js
const { toString, write } = Buffer.prototype;

const uint8array = new Uint8Array(5);

write.call(uint8array, 'hello', 0, 5, 'utf8'); // 5
// <Uint8Array 68 65 6c 6c 6f>

toString.call(uint8array, 'utf8'); // 'hello'
```

## Buffers and iteration

`Buffer` instances can be iterated over using `for..of` syntax:

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3]);

for (const b of buf) {
  console.log(b);
}
// Prints:
//   1
//   2
//   3
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3]);

for (const b of buf) {
  console.log(b);
}
// Prints:
//   1
//   2
//   3
```

Additionally, the `buf.values()`, `buf.keys()`, and
`buf.entries()` methods can be used to create iterators.
