---
title: "Crypto (part 15 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 15 of 19)

### `crypto.privateEncrypt(privateKey, buffer)`

* `privateKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey|URL}
  * `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey|URL}
    The private key material, a {KeyObject}, or a {URL} referencing an object
    for an OpenSSL STORE loader.
  * `passphrase` {string|ArrayBuffer|Buffer|TypedArray|DataView} An optional
    passphrase for the private key.
  * `padding` {crypto.constants} An optional padding value defined in
    `crypto.constants`, which may be: `crypto.constants.RSA_NO_PADDING` or
    `crypto.constants.RSA_PKCS1_PADDING`.
  * `encoding` {string} The string encoding to use when `buffer`, `key`,
    or `passphrase` are strings.
* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* Returns: {Buffer} A new `Buffer` with the encrypted content.

Encrypts `buffer` with `privateKey`. The returned data can be decrypted using
the corresponding public key, for example using `crypto.publicDecrypt()`.

If `privateKey` is not a `KeyObject`, this function behaves as if
`privateKey` had been passed to `crypto.createPrivateKey()`. If it is an
object, the `padding` property can be passed. Otherwise, this function uses
`RSA_PKCS1_PADDING`.

### `crypto.publicDecrypt(key, buffer)`

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
  * `passphrase` {string|ArrayBuffer|Buffer|TypedArray|DataView} An optional
    passphrase for the private key.
  * `padding` {crypto.constants} An optional padding value defined in
    `crypto.constants`, which may be: `crypto.constants.RSA_NO_PADDING` or
    `crypto.constants.RSA_PKCS1_PADDING`.
  * `encoding` {string} The string encoding to use when `buffer`, `key`,
    or `passphrase` are strings.
* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* Returns: {Buffer} A new `Buffer` with the decrypted content.

Decrypts `buffer` with `key`. `buffer` was previously encrypted using
the corresponding private key, for example using `crypto.privateEncrypt()`.

If `key` is not a `KeyObject`, this function behaves as if
`key` had been passed to `crypto.createPublicKey()`. If it is an
object, the `padding` property can be passed. Otherwise, this function uses
`RSA_PKCS1_PADDING`.

Because RSA public keys can be derived from private keys, a private key may
be passed instead of a public key.

### `crypto.publicEncrypt(key, buffer)`

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
  * `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
    A PEM encoded public or private key, {KeyObject}, or {CryptoKey}.
  * `oaepHash` {string} The hash function to use for OAEP padding and, unless
    `mgf1Hash` is set, MGF1. **Default:** `'sha1'`
  * `mgf1Hash` {string} The hash function to use for the MGF1 mask generation
    function of OAEP padding. If not specified, the value of `oaepHash` is used.
    This allows the OAEP digest and the MGF1 digest to differ.
  * `oaepLabel` {string|ArrayBuffer|Buffer|TypedArray|DataView} The label to
    use for OAEP padding. If not specified, no label is used.
  * `passphrase` {string|ArrayBuffer|Buffer|TypedArray|DataView} An optional
    passphrase for the private key.
  * `padding` {crypto.constants} An optional padding value defined in
    `crypto.constants`, which may be: `crypto.constants.RSA_NO_PADDING`,
    `crypto.constants.RSA_PKCS1_PADDING`, or
    `crypto.constants.RSA_PKCS1_OAEP_PADDING`.
  * `encoding` {string} The string encoding to use when `buffer`, `key`,
    `oaepLabel`, or `passphrase` are strings.
* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* Returns: {Buffer} A new `Buffer` with the encrypted content.

Encrypts the content of `buffer` with `key` and returns a new
`Buffer` with encrypted content. The returned data can be decrypted using
the corresponding private key, for example using `crypto.privateDecrypt()`.

`crypto.getHashes()` lists algorithms available to the hashing APIs, but
the active RSA implementation can impose additional restrictions on digests
used for OAEP or MGF1.

If `key` is not a `KeyObject`, this function behaves as if
`key` had been passed to `crypto.createPublicKey()`. If it is an
object, the `padding` property can be passed. Otherwise, this function uses
`RSA_PKCS1_OAEP_PADDING`.

Because RSA public keys can be derived from private keys, a private key may
be passed instead of a public key.

### `crypto.randomBytes(size[, callback])`

* `size` {number} The number of bytes to generate.  The `size` must
  not be larger than `2**31 - 1`.
* `callback` {Function}
  * `err` {Error}
  * `buf` {Buffer}
* Returns: {Buffer} if the `callback` function is not provided.

Generates cryptographically strong pseudorandom data. The `size` argument
is a number indicating the number of bytes to generate.

If a `callback` function is provided, the bytes are generated asynchronously
and the `callback` function is invoked with two arguments: `err` and `buf`.
If an error occurs, `err` will be an `Error` object; otherwise it is `null`. The
`buf` argument is a `Buffer` containing the generated bytes.

```mjs
// Asynchronous
const {
  randomBytes,
} = await import('node:crypto');

randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});
```

```cjs
// Asynchronous
const {
  randomBytes,
} = require('node:crypto');

randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});
```

If the `callback` function is not provided, the random bytes are generated
synchronously and returned as a `Buffer`. An error will be thrown if
there is a problem generating the bytes.

```mjs
// Synchronous
const {
  randomBytes,
} = await import('node:crypto');

const buf = randomBytes(256);
console.log(
  `${buf.length} bytes of random data: ${buf.toString('hex')}`);
```

```cjs
// Synchronous
const {
  randomBytes,
} = require('node:crypto');

const buf = randomBytes(256);
console.log(
  `${buf.length} bytes of random data: ${buf.toString('hex')}`);
```

The `crypto.randomBytes()` method will not complete until there is
sufficient entropy available.
This should normally never take longer than a few milliseconds. The only time
when generating the random bytes may conceivably block for a longer period of
time is right after boot, when the whole system is still low on entropy.

This API uses libuv's threadpool, which can have surprising and
negative performance implications for some applications; see the
`UV_THREADPOOL_SIZE` documentation for more information.

The asynchronous version of `crypto.randomBytes()` is carried out in a single
threadpool request. To minimize threadpool task length variation, partition
large `randomBytes` requests when doing so as part of fulfilling a client
request.

### `crypto.randomFill(buffer, offset, callback)`

* `buffer` {ArrayBuffer|Buffer|TypedArray|DataView} Must be supplied. The
  size of the provided `buffer` must not be larger than `2**31 - 1`.
* `offset` {number} The start position, in elements for a `TypedArray` and in
  bytes for an `ArrayBuffer` or `DataView`. **Default:** `0`
* `size` {number} The amount to fill, in the same units as `offset`.
  **Default:** `buffer.length - offset` for a `TypedArray`, or
  `buffer.byteLength - offset` for an `ArrayBuffer` or `DataView`. The `size`
  must not be larger than `2**31 - 1`.
* `callback` {Function} `function(err, buf) {}`.

This function is similar to `crypto.randomBytes()` but requires the first
argument to be a `Buffer` that will be filled. It also
requires that a callback is passed in.

If the `callback` function is not provided, an error will be thrown.

```mjs
import { Buffer } from 'node:buffer';
const { randomFill } = await import('node:crypto');

const buf = Buffer.alloc(10);
randomFill(buf, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});

randomFill(buf, 5, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});

// The above is equivalent to the following:
randomFill(buf, 5, 5, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});
```

```cjs
const { randomFill } = require('node:crypto');
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(10);
randomFill(buf, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});

randomFill(buf, 5, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});

// The above is equivalent to the following:
randomFill(buf, 5, 5, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});
```

Any `ArrayBuffer`, `TypedArray`, or `DataView` instance may be passed as
`buffer`.

While this includes instances of `Float32Array` and `Float64Array`, this
function should not be used to generate random floating-point numbers. The
result may contain `+Infinity`, `-Infinity`, and `NaN`, and even if the array
contains finite numbers only, they are not drawn from a uniform random
distribution and have no meaningful lower or upper bounds.

```mjs
import { Buffer } from 'node:buffer';
const { randomFill } = await import('node:crypto');

const a = new Uint32Array(10);
randomFill(a, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
    .toString('hex'));
});

const b = new DataView(new ArrayBuffer(10));
randomFill(b, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
    .toString('hex'));
});

const c = new ArrayBuffer(10);
randomFill(c, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf).toString('hex'));
});
```

```cjs
const { randomFill } = require('node:crypto');
const { Buffer } = require('node:buffer');

const a = new Uint32Array(10);
randomFill(a, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
    .toString('hex'));
});

const b = new DataView(new ArrayBuffer(10));
randomFill(b, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
    .toString('hex'));
});

const c = new ArrayBuffer(10);
randomFill(c, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf).toString('hex'));
});
```

This API uses libuv's threadpool, which can have surprising and
negative performance implications for some applications; see the
`UV_THREADPOOL_SIZE` documentation for more information.

The asynchronous version of `crypto.randomFill()` is carried out in a single
threadpool request. To minimize threadpool task length variation, partition
large `randomFill` requests when doing so as part of fulfilling a client
request.

### `crypto.randomFillSync(buffer, offset)`

* `buffer` {ArrayBuffer|Buffer|TypedArray|DataView} Must be supplied. The
  size of the provided `buffer` must not be larger than `2**31 - 1`.
* `offset` {number} The start position, in elements for a `TypedArray` and in
  bytes for an `ArrayBuffer` or `DataView`. **Default:** `0`
* `size` {number} The amount to fill, in the same units as `offset`.
  **Default:** `buffer.length - offset` for a `TypedArray`, or
  `buffer.byteLength - offset` for an `ArrayBuffer` or `DataView`. The `size`
  must not be larger than `2**31 - 1`.
* Returns: {ArrayBuffer|Buffer|TypedArray|DataView} The object passed as
  `buffer` argument.

Synchronous version of `crypto.randomFill()`.

```mjs
import { Buffer } from 'node:buffer';
const { randomFillSync } = await import('node:crypto');

const buf = Buffer.alloc(10);
console.log(randomFillSync(buf).toString('hex'));

randomFillSync(buf, 5);
console.log(buf.toString('hex'));

// The above is equivalent to the following:
randomFillSync(buf, 5, 5);
console.log(buf.toString('hex'));
```

```cjs
const { randomFillSync } = require('node:crypto');
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(10);
console.log(randomFillSync(buf).toString('hex'));

randomFillSync(buf, 5);
console.log(buf.toString('hex'));

// The above is equivalent to the following:
randomFillSync(buf, 5, 5);
console.log(buf.toString('hex'));
```

Any `ArrayBuffer`, `TypedArray` or `DataView` instance may be passed as
`buffer`.

```mjs
import { Buffer } from 'node:buffer';
const { randomFillSync } = await import('node:crypto');

const a = new Uint32Array(10);
console.log(Buffer.from(randomFillSync(a).buffer,
                        a.byteOffset, a.byteLength).toString('hex'));

const b = new DataView(new ArrayBuffer(10));
console.log(Buffer.from(randomFillSync(b).buffer,
                        b.byteOffset, b.byteLength).toString('hex'));

const c = new ArrayBuffer(10);
console.log(Buffer.from(randomFillSync(c)).toString('hex'));
```

```cjs
const { randomFillSync } = require('node:crypto');
const { Buffer } = require('node:buffer');

const a = new Uint32Array(10);
console.log(Buffer.from(randomFillSync(a).buffer,
                        a.byteOffset, a.byteLength).toString('hex'));

const b = new DataView(new ArrayBuffer(10));
console.log(Buffer.from(randomFillSync(b).buffer,
                        b.byteOffset, b.byteLength).toString('hex'));

const c = new ArrayBuffer(10);
console.log(Buffer.from(randomFillSync(c)).toString('hex'));
```

### `crypto.randomInt([min, ]max[, callback])`

* `min` {integer} Start of random range (inclusive). **Default:** `0`.
* `max` {integer} End of random range (exclusive).
* `callback` {Function} `function(err, n) {}`.

Return a random integer `n` such that `min <= n < max`.  This
implementation avoids modulo bias.

The range (`max - min`) must be less than 248. `min` and `max` must
be safe integers.

If the `callback` function is not provided, the random integer is
generated synchronously.

```mjs
// Asynchronous
const {
  randomInt,
} = await import('node:crypto');

randomInt(3, (err, n) => {
  if (err) throw err;
  console.log(`Random number chosen from (0, 1, 2): ${n}`);
});
```

```cjs
// Asynchronous
const {
  randomInt,
} = require('node:crypto');

randomInt(3, (err, n) => {
  if (err) throw err;
  console.log(`Random number chosen from (0, 1, 2): ${n}`);
});
```

```mjs
// Synchronous
const {
  randomInt,
} = await import('node:crypto');

const n = randomInt(3);
console.log(`Random number chosen from (0, 1, 2): ${n}`);
```

```cjs
// Synchronous
const {
  randomInt,
} = require('node:crypto');

const n = randomInt(3);
console.log(`Random number chosen from (0, 1, 2): ${n}`);
```

```mjs
// With `min` argument
const {
  randomInt,
} = await import('node:crypto');

const n = randomInt(1, 7);
console.log(`The dice rolled: ${n}`);
```

```cjs
// With `min` argument
const {
  randomInt,
} = require('node:crypto');

const n = randomInt(1, 7);
console.log(`The dice rolled: ${n}`);
```
