---
title: "Crypto (part 5 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 5 of 19)

## Class: `DiffieHellman`

The `DiffieHellman` class is a utility for creating Diffie-Hellman key
exchanges.

Instances of the `DiffieHellman` class can be created using the
`crypto.createDiffieHellman()` function.

```mjs
import assert from 'node:assert';

const {
  createDiffieHellman,
} = await import('node:crypto');

// Generate Alice's keys...
const alice = createDiffieHellman(2048);
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// OK
assert.strictEqual(aliceSecret.toString('<example-value>'), bobSecret.toString('<example-value>'));
```

```cjs
const assert = require('node:assert');

const {
  createDiffieHellman,
} = require('node:crypto');

// Generate Alice's keys...
const alice = createDiffieHellman(2048);
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// OK
assert.strictEqual(aliceSecret.toString('<example-value>'), bobSecret.toString('<example-value>'));
```

### `diffieHellman.computeSecret(otherPublicKey, inputEncoding)`

* `otherPublicKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `inputEncoding` {string} The encoding of an `otherPublicKey` string.
* `outputEncoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Computes the shared secret using `otherPublicKey` as the other
party's public key and returns the computed shared secret. The supplied
key is interpreted using the specified `inputEncoding`, and secret is
encoded using specified `outputEncoding`.
If the `inputEncoding` is not
provided, `otherPublicKey` is expected to be a `Buffer`,
`TypedArray`, or `DataView`.

If `outputEncoding` is given a string is returned; otherwise, a
`Buffer` is returned.

### `diffieHellman.generateKeys([encoding])`

* `encoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Generates private and public Diffie-Hellman key <example-value> unless they have been
generated or computed already, and returns
the public key in the specified `encoding`. This key <example-value> be
transferred to the other party.
If `encoding` is provided a string is returned; otherwise a
`Buffer` is returned.

This function is a thin wrapper around `DH_generate_key()`. In particular,
once a private key has been generated or set, calling this function only
recomputes the public key from the existing private key. Since the public key is
determined by the private key, the result will be the same unless the private key
has been changed via `diffieHellman.setPrivateKey()`.

### `diffieHellman.getGenerator([encoding])`

* `encoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Returns the Diffie-Hellman generator in the specified `encoding`.
If `encoding` is provided a string is
returned; otherwise a `Buffer` is returned.

### `diffieHellman.getPrime([encoding])`

* `encoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Returns the Diffie-Hellman prime in the specified `encoding`.
If `encoding` is provided a string is
returned; otherwise a `Buffer` is returned.

### `diffieHellman.getPrivateKey([encoding])`

* `encoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Returns the Diffie-Hellman private key in the specified `encoding`.
If `encoding` is provided a
string is returned; otherwise a `Buffer` is returned.

### `diffieHellman.getPublicKey([encoding])`

* `encoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Returns the Diffie-Hellman public key in the specified `encoding`.
If `encoding` is provided a
string is returned; otherwise a `Buffer` is returned.

### `diffieHellman.setPrivateKey(privateKey[, encoding])`

* `privateKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} The encoding of the `privateKey` string.

Sets the Diffie-Hellman private key. If the `encoding` argument is provided,
`privateKey` is expected
to be a string. If no `encoding` is provided, `privateKey` is expected
to be a `Buffer`, `TypedArray`, or `DataView`.

This function does not automatically compute the associated public key. Either
`diffieHellman.setPublicKey()` or `diffieHellman.generateKeys()` can be
used to manually provide the public key or to automatically derive it.

### `diffieHellman.setPublicKey(publicKey[, encoding])`

* `publicKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} The encoding of the `publicKey` string.

Sets the Diffie-Hellman public key. If the `encoding` argument is provided,
`publicKey` is expected
to be a string. If no `encoding` is provided, `publicKey` is expected
to be a `Buffer`, `TypedArray`, or `DataView`.

### `diffieHellman.verifyError`

A bit field containing any warnings and/or errors resulting from a check
performed during initialization of the `DiffieHellman` object.

The following values are valid for this property (as defined in `node:constants` module):

* `DH_CHECK_P_NOT_SAFE_PRIME`
* `DH_CHECK_P_NOT_PRIME`
* `DH_UNABLE_TO_CHECK_GENERATOR`
* `DH_NOT_SUITABLE_GENERATOR`

## Class: `DiffieHellmanGroup`

The `DiffieHellmanGroup` class takes a well-known modp group as its argument.
It works the same as `DiffieHellman`, except that it does not allow changing
its keys after creation. In other words, it does not implement `setPublicKey()`
or `setPrivateKey()` methods.

```mjs
const { createDiffieHellmanGroup } = await import('node:crypto');
const dh = createDiffieHellmanGroup('modp16');
```

```cjs
const { createDiffieHellmanGroup } = require('node:crypto');
const dh = createDiffieHellmanGroup('modp16');
```

The following groups are supported:

* `'modp14'` (2048 bits, RFC 3526 Section 3)
* `'modp15'` (3072 bits, RFC 3526 Section 4)
* `'modp16'` (4096 bits, RFC 3526 Section 5)
* `'modp17'` (6144 bits, RFC 3526 Section 6)
* `'modp18'` (8192 bits, RFC 3526 Section 7)

The following groups are still supported but deprecated (see Caveats):

* `'modp1'` (768 bits, RFC 2409 Section 6.1)
* `'modp2'` (1024 bits, RFC 2409 Section 6.2)
* `'modp5'` (1536 bits, RFC 3526 Section 2)

These deprecated groups might be removed in future versions of Node.js.
