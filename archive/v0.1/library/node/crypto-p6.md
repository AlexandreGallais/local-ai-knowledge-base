---
title: "Crypto (part 6 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 6 of 19)

## Class: `ECDH`

The `ECDH` class is a utility for creating Elliptic Curve Diffie-Hellman (ECDH)
key exchanges.

Instances of the `ECDH` class can be created using the
`crypto.createECDH()` function.

```mjs
import assert from 'node:assert';

const {
  createECDH,
} = await import('node:crypto');

// Generate Alice's keys...
const alice = createECDH('secp521r1');
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = createECDH('secp521r1');
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

assert.strictEqual(aliceSecret.toString('<example-value>'), bobSecret.toString('<example-value>'));
// OK
```

```cjs
const assert = require('node:assert');

const {
  createECDH,
} = require('node:crypto');

// Generate Alice's keys...
const alice = createECDH('secp521r1');
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = createECDH('secp521r1');
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

assert.strictEqual(aliceSecret.toString('<example-value>'), bobSecret.toString('<example-value>'));
// OK
```

### Static method: `ECDH.convertKey(key, curve[, inputEncoding[, outputEncoding[, format]]])`

* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `curve` {string}
* `inputEncoding` {string} The encoding of the `key` string.
* `outputEncoding` {string} The encoding of the return value.
* `format` {string} **Default:** `'uncompressed'`
* Returns: {Buffer | string}

Converts the EC Diffie-Hellman public key <example-value> by `key` and `curve` to the
format specified by `format`. The `format` argument specifies point encoding
and can be `'compressed'`, `'uncompressed'` or `'hybrid'`. The supplied key is
interpreted using the specified `inputEncoding`, and the returned key is encoded
using the specified `outputEncoding`.

Use `crypto.getCurves()` to obtain a list of available curve names.
On recent OpenSSL releases, `openssl ecparam -list_curves` will also display
the name and description of each available elliptic curve.

If `format` is not specified the point will be returned in `'uncompressed'`
format.

If the `inputEncoding` is not provided, `key` is expected to be a `Buffer`,
`TypedArray`, or `DataView`.

Example (uncompressing a key):

```mjs
const {
  createECDH,
  ECDH,
} = await import('node:crypto');

const ecdh = createECDH('secp256k1');
ecdh.generateKeys();

const compressedKey = ecdh.getPublicKey('hex', 'compressed');

const uncompressedKey = ECDH.convertKey(compressedKey,
                                        'secp256k1',
                                        'hex',
                                        'hex',
                                        'uncompressed');

// The converted key and the uncompressed public key <example-value> be the same
console.log(uncompressedKey === ecdh.getPublicKey('hex'));
```

```cjs
const {
  createECDH,
  ECDH,
} = require('node:crypto');

const ecdh = createECDH('secp256k1');
ecdh.generateKeys();

const compressedKey = ecdh.getPublicKey('hex', 'compressed');

const uncompressedKey = ECDH.convertKey(compressedKey,
                                        'secp256k1',
                                        'hex',
                                        'hex',
                                        'uncompressed');

// The converted key and the uncompressed public key <example-value> be the same
console.log(uncompressedKey === ecdh.getPublicKey('hex'));
```

### `ecdh.computeSecret(otherPublicKey, inputEncoding)`

* `otherPublicKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `inputEncoding` {string} The encoding of the `otherPublicKey` string.
* `outputEncoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Computes the shared secret using `otherPublicKey` as the other
party's public key and returns the computed shared secret. The supplied
key is interpreted using specified `inputEncoding`, and the returned secret
is encoded using the specified `outputEncoding`.
If the `inputEncoding` is not
provided, `otherPublicKey` is expected to be a `Buffer`, `TypedArray`, or
`DataView`.

If `outputEncoding` is given a string will be returned; otherwise a
`Buffer` is returned.

`ecdh.computeSecret` will throw an
`ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY` error when `otherPublicKey`
lies outside of the elliptic curve. Since `otherPublicKey` is
usually supplied from a remote user over an insecure network,
be sure to handle this exception accordingly.

### `ecdh.generateKeys([encoding[, format]])`

* `encoding` {string} The encoding of the return value.
* `format` {string} **Default:** `'uncompressed'`
* Returns: {Buffer | string}

Generates private and public EC Diffie-Hellman key <example-value>, and returns
the public key in the specified `format` and `encoding`. This key <example-value> be
transferred to the other party.

The `format` argument specifies point encoding and can be `'compressed'` or
`'uncompressed'`. If `format` is not specified, the point will be returned in
`'uncompressed'` format.

If `encoding` is provided a string is returned; otherwise a `Buffer`
is returned.

### `ecdh.getPrivateKey([encoding])`

* `encoding` {string} The encoding of the return value.
* Returns: {Buffer | string} The EC Diffie-Hellman in the specified `encoding`.

If `encoding` is specified, a string is returned; otherwise a `Buffer` is
returned.

### `ecdh.getPublicKey(encoding)`

* `encoding` {string} The encoding of the return value.
* `format` {string} **Default:** `'uncompressed'`
* Returns: {Buffer | string} The EC Diffie-Hellman public key in the specified
  `encoding` and `format`.

The `format` argument specifies point encoding and can be `'compressed'` or
`'uncompressed'`. If `format` is not specified the point will be returned in
`'uncompressed'` format.

If `encoding` is specified, a string is returned; otherwise a `Buffer` is
returned.

### `ecdh.setPrivateKey(privateKey[, encoding])`

* `privateKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} The encoding of the `privateKey` string.

Sets the EC Diffie-Hellman private key.
If `encoding` is provided, `privateKey` is expected
to be a string; otherwise `privateKey` is expected to be a `Buffer`,
`TypedArray`, or `DataView`.

If `privateKey` is not valid for the curve specified when the `ECDH` object was
created, an error is thrown. Upon setting the private key, the associated
public point (key) is also generated and set in the `ECDH` object.

### `ecdh.setPublicKey(publicKey[, encoding])`

> Stability: 0 - Deprecated

* `publicKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} The encoding of the `publicKey` string.

Sets the EC Diffie-Hellman public key.
If `encoding` is provided `publicKey` is expected to
be a string; otherwise a `Buffer`, `TypedArray`, or `DataView` is expected.

There is not normally a reason to call this method because `ECDH`
only requires a private key and the other party's public key to compute the
shared secret. Typically either `ecdh.generateKeys()` or
`ecdh.setPrivateKey()` will be called. The `ecdh.setPrivateKey()` method
attempts to generate the public point/key <example-value> with the private key being
set.

Example (obtaining a shared secret):

```mjs
const {
  createECDH,
  createHash,
} = await import('node:crypto');

const alice = createECDH('secp256k1');
const bob = createECDH('secp256k1');

// This is a shortcut way of specifying one of Alice's previous private
// keys. It would be unwise to use such a predictable private key in a real
// application.
alice.setPrivateKey(
  createHash('sha256').update('alice', 'utf8').digest(),
);

// Bob uses a newly generated cryptographically strong
// pseudorandom key pair
bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, '<example-value>');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, '<example-value>');

// aliceSecret and bobSecret <example-value> be the same shared secret value
console.log(aliceSecret === bobSecret);
```

```cjs
const {
  createECDH,
  createHash,
} = require('node:crypto');

const alice = createECDH('secp256k1');
const bob = createECDH('secp256k1');

// This is a shortcut way of specifying one of Alice's previous private
// keys. It would be unwise to use such a predictable private key in a real
// application.
alice.setPrivateKey(
  createHash('sha256').update('alice', 'utf8').digest(),
);

// Bob uses a newly generated cryptographically strong
// pseudorandom key pair
bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, '<example-value>');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, '<example-value>');

// aliceSecret and bobSecret <example-value> be the same shared secret value
console.log(aliceSecret === bobSecret);
```

## Class: `Hash`

* Extends: {stream.Transform}

The `Hash` class is a utility for creating hash digests of data. It can be
used in one of two ways:

* As a stream that is both readable and writable, where data is written
  to produce a computed hash digest on the readable side, or
* Using the `hash.update()` and `hash.digest()` methods to produce the
  computed hash.

The `crypto.createHash()` method is used to create `Hash` instances. `Hash`
objects are not to be created directly using the `new` keyword.

Example: Using `Hash` objects as streams:

```mjs
const {
  createHash,
} = await import('node:crypto');

const hash = createHash('sha256');

hash.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = hash.read();
  if (data) {
    console.log(data.toString('hex'));
    // Prints:
    //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
  }
});

hash.write('some data to hash');
hash.end();
```

```cjs
const {
  createHash,
} = require('node:crypto');

const hash = createHash('sha256');

hash.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = hash.read();
  if (data) {
    console.log(data.toString('hex'));
    // Prints:
    //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
  }
});

hash.write('some data to hash');
hash.end();
```

Example: Using `Hash` and piped streams:

```mjs
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
const { createHash } = await import('node:crypto');

const hash = createHash('sha256');

const input = createReadStream('test.js');
input.pipe(hash).setEncoding('hex').pipe(stdout);
```

```cjs
const { createReadStream } = require('node:fs');
const { createHash } = require('node:crypto');
const { stdout } = require('node:process');

const hash = createHash('sha256');

const input = createReadStream('test.js');
input.pipe(hash).setEncoding('hex').pipe(stdout);
```

Example: Using the `hash.update()` and `hash.digest()` methods:

```mjs
const {
  createHash,
} = await import('node:crypto');

const hash = createHash('sha256');

hash.update('some data to hash');
console.log(hash.digest('hex'));
// Prints:
//   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
```

```cjs
const {
  createHash,
} = require('node:crypto');

const hash = createHash('sha256');

hash.update('some data to hash');
console.log(hash.digest('hex'));
// Prints:
//   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
```

### `hash.copy([options])`

* `options` {Object} `stream.transform` options
* Returns: {Hash}

Creates a new `Hash` object that contains a deep copy of the internal state
of the current `Hash` object.

The optional `options` argument controls stream behavior. For XOF hash
functions such as `'shake256'`, the `outputLength` option can be used to
specify the desired output length in bytes.

An error is thrown when an attempt is made to copy the `Hash` object after
its `hash.digest()` method has been called.

```mjs
// Calculate a rolling hash.
const {
  createHash,
} = await import('node:crypto');

const hash = createHash('sha256');

hash.update('one');
console.log(hash.copy().digest('hex'));

hash.update('two');
console.log(hash.copy().digest('hex'));

hash.update('three');
console.log(hash.copy().digest('hex'));

// Etc.
```

```cjs
// Calculate a rolling hash.
const {
  createHash,
} = require('node:crypto');

const hash = createHash('sha256');

hash.update('one');
console.log(hash.copy().digest('hex'));

hash.update('two');
console.log(hash.copy().digest('hex'));

hash.update('three');
console.log(hash.copy().digest('hex'));

// Etc.
```

### `hash.digest([encoding])`

* `encoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Calculates the digest of all of the data passed to be hashed (using the
`hash.update()` method).
If `encoding` is provided a string will be returned; otherwise
a `Buffer` is returned.

The `Hash` object can not be used again after `hash.digest()` method has been
called. Multiple calls will cause an error to be thrown.

### `hash.update(data[, inputEncoding])`

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} The encoding of the `data` string.

Updates the hash content with the given `data`, the encoding of which
is given in `inputEncoding`.
If `encoding` is not provided, and the `data` is a string, an
encoding of `'utf8'` is enforced. If `data` is a `Buffer`, `TypedArray`, or
`DataView`, then `inputEncoding` is ignored.

This can be called many times with new data as it is streamed.
