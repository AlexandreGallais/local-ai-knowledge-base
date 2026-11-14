---
title: "Crypto (part 4 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 4 of 19)

## Class: `Decipheriv`

* Extends: {stream.Transform}

Instances of the `Decipheriv` class are used to decrypt data. The class can be
used in one of two ways:

* As a stream that is both readable and writable, where plain encrypted
  data is written to produce unencrypted data on the readable side, or
* Using the `decipher.update()` and `decipher.final()` methods to
  produce the unencrypted data.

The `crypto.createDecipheriv()` method is
used to create `Decipheriv` instances. `Decipheriv` objects are not to be created
directly using the `new` keyword.

The selected algorithm may impose additional restrictions on streaming and
calls to `decipher.update()`. See CCM mode, CBC-CTS mode,
XTS mode, AES key wrap modes, and SIV and GCM-SIV modes.

Example: Using `Decipheriv` objects as streams:

```mjs
import { Buffer } from 'node:buffer';
const {
  scryptSync,
  createDecipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';
// Key <example-value> is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
// Use the async `crypto.scrypt()` instead.
const key = scryptSync(password, '<example-value>', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = createDecipheriv(algorithm, key, iv);

let decrypted = '';
decipher.on('readable', () => {
  let chunk;
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString('utf8');
  }
});
decipher.on('end', () => {
  console.log(decrypted);
  // Prints: some clear text data
});

// Encrypted with same algorithm, key and iv.
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
decipher.write(encrypted, 'hex');
decipher.end();
```

```cjs
const {
  scryptSync,
  createDecipheriv,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';
// Key <example-value> is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
// Use the async `crypto.scrypt()` instead.
const key = scryptSync(password, '<example-value>', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = createDecipheriv(algorithm, key, iv);

let decrypted = '';
decipher.on('readable', () => {
  let chunk;
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString('utf8');
  }
});
decipher.on('end', () => {
  console.log(decrypted);
  // Prints: some clear text data
});

// Encrypted with same algorithm, key and iv.
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
decipher.write(encrypted, 'hex');
decipher.end();
```

Example: Using `Decipheriv` and piped streams:

```mjs
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';
import { Buffer } from 'node:buffer';
const {
  scryptSync,
  createDecipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';
// Use the async `crypto.scrypt()` instead.
const key = scryptSync(password, '<example-value>', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = createDecipheriv(algorithm, key, iv);

const input = createReadStream('test.enc');
const output = createWriteStream('test.js');

input.pipe(decipher).pipe(output);
```

```cjs
const {
  createReadStream,
  createWriteStream,
} = require('node:fs');
const {
  scryptSync,
  createDecipheriv,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';
// Use the async `crypto.scrypt()` instead.
const key = scryptSync(password, '<example-value>', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = createDecipheriv(algorithm, key, iv);

const input = createReadStream('test.enc');
const output = createWriteStream('test.js');

input.pipe(decipher).pipe(output);
```

Example: Using the `decipher.update()` and `decipher.final()` methods:

```mjs
import { Buffer } from 'node:buffer';
const {
  scryptSync,
  createDecipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';
// Use the async `crypto.scrypt()` instead.
const key = scryptSync(password, '<example-value>', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = createDecipheriv(algorithm, key, iv);

// Encrypted using same algorithm, key and iv.
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);
// Prints: some clear text data
```

```cjs
const {
  scryptSync,
  createDecipheriv,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';
// Use the async `crypto.scrypt()` instead.
const key = scryptSync(password, '<example-value>', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = createDecipheriv(algorithm, key, iv);

// Encrypted using same algorithm, key and iv.
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);
// Prints: some clear text data
```

### `decipher.final([outputEncoding])`

* `outputEncoding` {string} The encoding of the return value.
* Returns: {Buffer | string} Any remaining deciphered contents.
  If `outputEncoding` is specified, a string is
  returned. If an `outputEncoding` is not provided, a `Buffer` is returned.

If an output encoding was specified in a previous call to
`decipher.update()`, `outputEncoding` must use the same encoding.

Once the `decipher.final()` method has been called, the `Decipheriv` object can
no longer be used to decrypt data. Attempts to call `decipher.final()` more
than once will result in an error being thrown.

### `decipher.setAAD(buffer[, options])`

* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `options` {Object} `stream.transform` options
  * `plaintextLength` {number}
  * `encoding` {string} String encoding to use when `buffer` is a string.
* Returns: {Decipheriv} The same `Decipheriv` instance for method chaining.

When using an authenticated encryption mode (`GCM`, `CCM`, `OCB`, `SIV`,
`GCM-SIV`, and `chacha20-poly1305` are currently supported), the
`decipher.setAAD()` method sets the value used for the _additional
authenticated data_ (AAD) input parameter.

The `options` argument is optional for `GCM`, `OCB`, `SIV`, and `GCM-SIV`.
When using `CCM`, the `plaintextLength` option must be specified and its value
must match the length of the ciphertext in bytes. See CCM mode.

The `decipher.setAAD()` method must be called before `decipher.update()`.

When passing a string as the `buffer`, please consider
caveats when using strings as inputs to cryptographic APIs.

### `decipher.setAuthTag(buffer[, encoding])`

* `buffer` {string|Buffer|ArrayBuffer|TypedArray|DataView}
* `encoding` {string} String encoding to use when `buffer` is a string.
* Returns: {Decipheriv} The same `Decipheriv` instance for method chaining.

When using an authenticated encryption mode (`GCM`, `CCM`, `OCB`, `SIV`,
`GCM-SIV`, and `chacha20-poly1305` are currently supported), the
`decipher.setAuthTag()` method is used to pass in the received
_authentication tag_. If no tag is provided, or if the cipher text has been
tampered with, `decipher.final()` will throw, indicating that the cipher
text should be discarded due to failed authentication. If the tag length is
invalid according to NIST SP 800-38D or does not match the value of the
`authTagLength` option, `decipher.setAuthTag()` will throw an error.

The `decipher.setAuthTag()` method must be called before `decipher.update()`
for `CCM`, `SIV`, and `GCM-SIV` modes or before `decipher.final()` for
`GCM` and `OCB` modes and `chacha20-poly1305`.
`decipher.setAuthTag()` can only be called once.

When passing a string as the authentication tag, please consider
caveats when using strings as inputs to cryptographic APIs.

### `decipher.setAutoPadding([autoPadding])`

* `autoPadding` {boolean} **Default:** `true`
* Returns: {Decipheriv} The same `Decipheriv` instance for method chaining.

When data has been encrypted without standard block padding, calling
`decipher.setAutoPadding(false)` will disable automatic padding to prevent
`decipher.final()` from checking for and removing padding.

For block ciphers that use standard block padding, disabling it requires the
input data's length to be a multiple of the cipher's block size.

The `decipher.setAutoPadding()` method must be called before
`decipher.final()`.

### `decipher.update(data, inputEncoding)`

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} The encoding of the `data` string.
* `outputEncoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Updates the decipher with `data`. If the `inputEncoding` argument is given,
the `data`
argument is a string using the specified encoding. If the `inputEncoding`
argument is not given, `data` must be a `Buffer`, `TypedArray`, or
`DataView`. If `data` is a `Buffer`, `TypedArray`, or `DataView`, then
`inputEncoding` is ignored.

The `outputEncoding` specifies the output format of the deciphered
data. If the `outputEncoding`
is specified, a string using the specified encoding is returned. If no
`outputEncoding` is provided, a `Buffer` is returned.
When `outputEncoding` is specified, it must use the same encoding as previous
calls to `decipher.update()`.

For most algorithms, `decipher.update()` can be called multiple times with new
data until `decipher.final()` is called. Some algorithms restrict calls to
`decipher.update()`. For example, CCM mode, CBC-CTS mode, XTS mode,
AES key wrap modes, and SIV and GCM-SIV modes require the whole message
in a single call. Calling `decipher.update()` after `decipher.final()` will
result in an error being thrown.

Even if the underlying cipher implements authentication, the authenticity and
integrity of the plaintext returned from this function may be uncertain at this
time. For authenticated encryption algorithms, authenticity is generally only
established when the application calls `decipher.final()`.
