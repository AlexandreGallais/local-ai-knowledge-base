---
title: "Crypto (part 3 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 3 of 19)

## Class: `Cipheriv`

* Extends: {stream.Transform}

Instances of the `Cipheriv` class are used to encrypt data. The class can be
used in one of two ways:

* As a stream that is both readable and writable, where plain unencrypted
  data is written to produce encrypted data on the readable side, or
* Using the `cipher.update()` and `cipher.final()` methods to produce
  the encrypted data.

The `crypto.createCipheriv()` method is
used to create `Cipheriv` instances. `Cipheriv` objects are not to be created
directly using the `new` keyword.

The selected algorithm may impose additional restrictions on streaming and
calls to `cipher.update()`. See CCM mode, CBC-CTS mode, XTS mode,
AES key wrap modes, and SIV and GCM-SIV modes.

Example: Using `Cipheriv` objects as streams:

```mjs
const {
  scrypt,
  randomFill,
  createCipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';

// First, we'll generate the key. The key <example-value> is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
scrypt(password, '<example-value>', 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    // Once we have the key and iv, we can create and use the cipher...
    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = '';
    cipher.setEncoding('hex');

    cipher.on('data', (chunk) => encrypted += chunk);
    cipher.on('end', () => console.log(encrypted));

    cipher.write('some clear text data');
    cipher.end();
  });
});
```

```cjs
const {
  scrypt,
  randomFill,
  createCipheriv,
} = require('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';

// First, we'll generate the key. The key <example-value> is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
scrypt(password, '<example-value>', 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    // Once we have the key and iv, we can create and use the cipher...
    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = '';
    cipher.setEncoding('hex');

    cipher.on('data', (chunk) => encrypted += chunk);
    cipher.on('end', () => console.log(encrypted));

    cipher.write('some clear text data');
    cipher.end();
  });
});
```

Example: Using `Cipheriv` and piped streams:

```mjs
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';

import {
  pipeline,
} from 'node:stream';

const {
  scrypt,
  randomFill,
  createCipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';

// First, we'll generate the key. The key <example-value> is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
scrypt(password, '<example-value>', 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    const input = createReadStream('test.js');
    const output = createWriteStream('test.enc');

    pipeline(input, cipher, output, (err) => {
      if (err) throw err;
    });
  });
});
```

```cjs
const {
  createReadStream,
  createWriteStream,
} = require('node:fs');

const {
  pipeline,
} = require('node:stream');

const {
  scrypt,
  randomFill,
  createCipheriv,
} = require('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';

// First, we'll generate the key. The key <example-value> is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
scrypt(password, '<example-value>', 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    const input = createReadStream('test.js');
    const output = createWriteStream('test.enc');

    pipeline(input, cipher, output, (err) => {
      if (err) throw err;
    });
  });
});
```

Example: Using the `cipher.update()` and `cipher.final()` methods:

```mjs
const {
  scrypt,
  randomFill,
  createCipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';

// First, we'll generate the key. The key <example-value> is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
scrypt(password, '<example-value>', 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
  });
});
```

```cjs
const {
  scrypt,
  randomFill,
  createCipheriv,
} = require('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '<example-value>';

// First, we'll generate the key. The key <example-value> is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
scrypt(password, '<example-value>', 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
  });
});
```

### `cipher.final([outputEncoding])`

* `outputEncoding` {string} The encoding of the return value.
* Returns: {Buffer | string} Any remaining enciphered contents.
  If `outputEncoding` is specified, a string is
  returned. If an `outputEncoding` is not provided, a `Buffer` is returned.

If an output encoding was specified in a previous call to
`cipher.update()`, `outputEncoding` must use the same encoding.

Once the `cipher.final()` method has been called, the `Cipheriv` object can no
longer be used to encrypt data. Attempts to call `cipher.final()` more than
once will result in an error being thrown.

### `cipher.getAuthTag()`

* Returns: {Buffer} When using an authenticated encryption mode (`GCM`, `CCM`,
  `OCB`, `SIV`, `GCM-SIV`, and `chacha20-poly1305` are currently
  supported), the `cipher.getAuthTag()` method returns a
  `Buffer` containing the _authentication tag_ that has been computed from
  the given data.

The `cipher.getAuthTag()` method should only be called after encryption has
been completed using the `cipher.final()` method.

If the `authTagLength` option was set during the `cipher` instance's creation,
this function will return exactly `authTagLength` bytes.

### `cipher.setAAD(buffer[, options])`

* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `options` {Object} `stream.transform` options
  * `plaintextLength` {number}
  * `encoding` {string} The string encoding to use when `buffer` is a string.
* Returns: {Cipheriv} The same `Cipheriv` instance for method chaining.

When using an authenticated encryption mode (`GCM`, `CCM`, `OCB`, `SIV`,
`GCM-SIV`, and `chacha20-poly1305` are currently supported), the
`cipher.setAAD()` method sets the value used for the _additional authenticated
data_ (AAD) input parameter.

The `plaintextLength` option is optional for `GCM`, `OCB`, `SIV`, and
`GCM-SIV`. When using `CCM`, the `plaintextLength` option must be specified and
its value must match the length of the plaintext in bytes. See CCM mode.

The `cipher.setAAD()` method must be called before `cipher.update()`.

### `cipher.setAutoPadding([autoPadding])`

* `autoPadding` {boolean} **Default:** `true`
* Returns: {Cipheriv} The same `Cipheriv` instance for method chaining.

When using block ciphers that use standard block padding, the `Cipheriv` class
will automatically add padding to the input data to the appropriate block size.
To disable the default padding call `cipher.setAutoPadding(false)`.

For block ciphers that use standard block padding, when `autoPadding` is
`false`, the length of the entire input data must be a multiple of the cipher's
block size or `cipher.final()` will throw an error. Disabling automatic
padding is useful for non-standard padding, for instance using `0x0` instead of
PKCS padding.

The `cipher.setAutoPadding()` method must be called before
`cipher.final()`.

### `cipher.update(data, inputEncoding)`

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} The encoding of the data.
* `outputEncoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Updates the cipher with `data`. If the `inputEncoding` argument is given,
the `data`
argument is a string using the specified encoding. If the `inputEncoding`
argument is not given, `data` must be a `Buffer`, `TypedArray`, or
`DataView`. If `data` is a `Buffer`, `TypedArray`, or `DataView`, then
`inputEncoding` is ignored.

The `outputEncoding` specifies the output format of the enciphered
data. If the `outputEncoding`
is specified, a string using the specified encoding is returned. If no
`outputEncoding` is provided, a `Buffer` is returned.
When `outputEncoding` is specified, it must use the same encoding as previous
calls to `cipher.update()`.

For most algorithms, `cipher.update()` can be called multiple times with new
data until `cipher.final()` is called. Some algorithms restrict calls to
`cipher.update()`. For example, CCM mode, CBC-CTS mode, XTS mode,
AES key wrap modes, and SIV and GCM-SIV modes require the whole message
in a single call. Calling `cipher.update()` after `cipher.final()` will
result in an error being thrown.
