---
title: "Crypto (part 13 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 13 of 19)

### `crypto.generateKeySync(type, options)`

* `type` {string} The intended use of the generated secret key. Currently
  accepted values are `'hmac'` and `'aes'`.
* `options` {Object}
  * `length` {number} The bit length of the key to generate.
    * If `type` is `'hmac'`, the minimum is 8, and the maximum length is
      231-1. If the value is not a multiple of 8, the generated
      key will be truncated to `Math.floor(length / 8)`.
    * If `type` is `'aes'`, the length must be one of `128`, `192`, or `256`.
* Returns: {KeyObject}

Synchronously generates a new random secret key of the given `length`. The
`type` will determine which validations will be performed on the `length`.

```mjs
const {
  generateKeySync,
} = await import('node:crypto');

const key = generateKeySync('hmac', { length: 512 });
console.log(key.export().toString('hex'));  // e89..........41e
```

```cjs
const {
  generateKeySync,
} = require('node:crypto');

const key = generateKeySync('hmac', { length: 512 });
console.log(key.export().toString('hex'));  // e89..........41e
```

The size of a generated HMAC key should not exceed the block size of the
underlying hash function. See `crypto.createHmac()` for more information.

### `crypto.generatePrime(size[, options], callback)`

* `size` {number} The size (in bits) of the prime to generate.
* `options` {Object}
  * `add` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  * `rem` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  * `safe` {boolean} **Default:** `false`.
  * `bigint` {boolean} When `true`, the generated prime is returned
    as a `bigint`.
* `callback` {Function}
  * `err` {Error}
  * `prime` {ArrayBuffer|bigint}

Generates a pseudorandom prime of `size` bits.

If `options.safe` is `true`, the prime will be a safe prime -- that is,
`(prime - 1) / 2` will also be a prime.

The `options.add` and `options.rem` parameters can be used to enforce additional
requirements, e.g., for Diffie-Hellman:

* If `options.add` and `options.rem` are both set, the prime will satisfy the
  condition that `prime % add = rem`.
* If only `options.add` is set and `options.safe` is not `true`, the prime will
  satisfy the condition that `prime % add = 1`.
* If only `options.add` is set and `options.safe` is set to `true`, the prime
  will instead satisfy the condition that `prime % add = 3`. This is necessary
  because `prime % add = 1` for `options.add > 2` would contradict the condition
  enforced by `options.safe`.
* `options.rem` is ignored if `options.add` is not given.

Both `options.add` and `options.rem` must be encoded as big-endian sequences
if given as an `ArrayBuffer`, `SharedArrayBuffer`, `TypedArray`, `Buffer`, or
`DataView`.

By default, the prime is encoded as a big-endian sequence of octets
in an {ArrayBuffer}. If the `bigint` option is `true`, then a {bigint}
is provided.

The `size` of the prime will have a direct impact on how long it takes to
generate the prime. The larger the size, the longer it will take. Because
we use OpenSSL's `BN_generate_prime_ex` function, which provides only
minimal control over our ability to interrupt the generation process,
it is not recommended to generate overly large primes, as doing so may make
the process unresponsive.

### `crypto.generatePrimeSync(size[, options])`

* `size` {number} The size (in bits) of the prime to generate.
* `options` {Object}
  * `add` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  * `rem` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  * `safe` {boolean} **Default:** `false`.
  * `bigint` {boolean} When `true`, the generated prime is returned
    as a `bigint`.
* Returns: {ArrayBuffer|bigint}

Generates a pseudorandom prime of `size` bits.

If `options.safe` is `true`, the prime will be a safe prime -- that is,
`(prime - 1) / 2` will also be a prime.

The `options.add` and `options.rem` parameters can be used to enforce additional
requirements, e.g., for Diffie-Hellman:

* If `options.add` and `options.rem` are both set, the prime will satisfy the
  condition that `prime % add = rem`.
* If only `options.add` is set and `options.safe` is not `true`, the prime will
  satisfy the condition that `prime % add = 1`.
* If only `options.add` is set and `options.safe` is set to `true`, the prime
  will instead satisfy the condition that `prime % add = 3`. This is necessary
  because `prime % add = 1` for `options.add > 2` would contradict the condition
  enforced by `options.safe`.
* `options.rem` is ignored if `options.add` is not given.

Both `options.add` and `options.rem` must be encoded as big-endian sequences
if given as an `ArrayBuffer`, `SharedArrayBuffer`, `TypedArray`, `Buffer`, or
`DataView`.

By default, the prime is encoded as a big-endian sequence of octets
in an {ArrayBuffer}. If the `bigint` option is `true`, then a {bigint}
is provided.

The `size` of the prime will have a direct impact on how long it takes to
generate the prime. The larger the size, the longer it will take. Because
we use OpenSSL's `BN_generate_prime_ex` function, which provides only
minimal control over our ability to interrupt the generation process,
it is not recommended to generate overly large primes, as doing so may make
the process unresponsive.

### `crypto.getCipherInfo(nameOrNid[, options])`

* `nameOrNid` {string|number} The name or nid of the cipher to query.
* `options` {Object}
  * `keyLength` {number} A test key length.
  * `ivLength` {number} A test IV length.
* Returns: {Object}
  * `name` {string} The name of the cipher
  * `nid` {number|undefined} The nid of the cipher. This property is `undefined` if the
    cipher has no OpenSSL nid.
  * `blockSize` {number|undefined} The block size of the cipher in bytes. This property
    is `undefined` when `mode` is `'stream'`.
  * `ivLength` {number|undefined} The expected or default initialization vector length in
    bytes. This property is `undefined` if the cipher does not use an initialization
    vector.
  * `keyLength` {number} The expected or default key length in bytes.
  * `mode` {string} The cipher mode. One of `'cbc'`, `'ccm'`, `'cfb'`, `'ctr'`,
    `'ecb'`, `'gcm'`, `'gcm-siv'`, `'ocb'`, `'ofb'`, `'siv'`, `'stream'`,
    `'wrap'`, `'xts'`.

Returns information about a given cipher.

Some ciphers accept variable length keys and initialization vectors. By default,
the `crypto.getCipherInfo()` method will return the default values for these
ciphers. To test if a given key length or iv length is acceptable for given
cipher, use the `keyLength` and `ivLength` options. If the given values are
unacceptable, `undefined` will be returned.

### `crypto.getCiphers()`

* Returns: {string\[]} An array with the names of the supported cipher
  algorithms.

```mjs
const {
  getCiphers,
} = await import('node:crypto');

console.log(getCiphers()); // ['aes-128-cbc', 'aes-128-ccm', ...]
```

```cjs
const {
  getCiphers,
} = require('node:crypto');

console.log(getCiphers()); // ['aes-128-cbc', 'aes-128-ccm', ...]
```

### `crypto.getCurves()`

* Returns: {string\[]} An array with the names of the supported elliptic curves.

```mjs
const {
  getCurves,
} = await import('node:crypto');

console.log(getCurves()); // ['Oakley-EC2N-3', 'Oakley-EC2N-4', ...]
```

```cjs
const {
  getCurves,
} = require('node:crypto');

console.log(getCurves()); // ['Oakley-EC2N-3', 'Oakley-EC2N-4', ...]
```

### `crypto.getDiffieHellman(groupName)`

* `groupName` {string}
* Returns: {DiffieHellmanGroup}

Creates a predefined `DiffieHellmanGroup` key exchange object. The
supported groups are listed in the documentation for `DiffieHellmanGroup`.

The returned object mimics the interface of objects created by
`crypto.createDiffieHellman()`, but will not allow changing
the keys (with `diffieHellman.setPublicKey()`, for example). The
advantage of using this method is that the parties do not have to
generate nor exchange a group modulus beforehand, saving both processor
and communication time.

Example (obtaining a shared secret):

```mjs
const {
  getDiffieHellman,
} = await import('node:crypto');
const alice = getDiffieHellman('modp14');
const bob = getDiffieHellman('modp14');

alice.generateKeys();
bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

/* aliceSecret and bobSecret should be the same */
console.log(aliceSecret === bobSecret);
```

```cjs
const {
  getDiffieHellman,
} = require('node:crypto');

const alice = getDiffieHellman('modp14');
const bob = getDiffieHellman('modp14');

alice.generateKeys();
bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

/* aliceSecret and bobSecret should be the same */
console.log(aliceSecret === bobSecret);
```

### `crypto.getFips()`

* Returns: {number} `1` if FIPS mode is enabled, `0` otherwise. A future
  semver-major release may change the return type of this API to a {boolean}.

With OpenSSL 3, this reports whether the default property query includes
`fips=yes`. It does not establish that a FIPS provider is loaded or validated.
It can return `1` even when a requested cryptographic implementation cannot be
fetched because no loaded provider supplies a match for `fips=yes`. See FIPS
mode.

### `crypto.getHashes()`

* Returns: {string\[]} An array of the names of the supported hash algorithms,
  such as `'RSA-SHA256'`. Hash algorithms are also called "digest" algorithms.

This is the authoritative Node.js list of hash algorithms available to
`crypto.createHash()` and `crypto.hash()` in the current process. With
OpenSSL 3 or later, the list depends on the loaded providers and the default
property query in effect when the list is first generated. Some listed
algorithms can require API-specific options, such as `outputLength` for XOF
hash functions.

A listed hash algorithm is not necessarily supported by APIs that combine a
digest with another cryptographic operation, such as HMAC, key derivation, or
signing. Those operations can apply additional restrictions.

```mjs
const {
  getHashes,
} = await import('node:crypto');

console.log(getHashes()); // ['DSA', 'DSA-SHA', 'DSA-SHA1', ...]
```

```cjs
const {
  getHashes,
} = require('node:crypto');

console.log(getHashes()); // ['DSA', 'DSA-SHA', 'DSA-SHA1', ...]
```

### `crypto.getMacs()`

> Stability: 1.2 - Release candidate

* Returns: {string\[]} A fresh array containing the sorted, lowercase names
  and aliases of fetchable MAC implementations.

Returns MAC names exposed by loaded OpenSSL providers that match the active
default property query. Duplicate names and numeric OID aliases are omitted.
On builds without OpenSSL `EVP_MAC` support, this function returns an empty
array.

The returned names describe implementations that OpenSSL can fetch. They do not
guarantee that `crypto.createMac()` can initialize the MAC without
additional options. A provider can require additional parameters or a key with
algorithm-specific properties, and it can expose parameters that this API does
not support.

After a successful FIPS mode change made with `crypto.setFips()`, subsequent
calls reflect the new mode, and newly created `Mac` objects use it. Existing
`Mac` objects continue using the provider implementation selected when they
were created.

```mjs
const { getMacs } = await import('node:crypto');

console.log(getMacs());
// ['blake2bmac', 'blake2smac', 'cmac', 'gmac', 'hmac', ...]
```

### `crypto.getRandomValues(typedArray)`

* `typedArray` {Buffer|TypedArray|DataView|ArrayBuffer}
* Returns: {Buffer|TypedArray|DataView|ArrayBuffer} Returns `typedArray`.

A convenient alias for `crypto.webcrypto.getRandomValues()`. This
implementation is not compliant with the Web Crypto spec, to write
web-compatible code use `crypto.webcrypto.getRandomValues()` instead.
