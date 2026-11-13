---
title: "Crypto (part 16 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 16 of 19)

### `crypto.randomUUID([options])`

* `options` {Object}
  * `disableEntropyCache` {boolean} By default, to improve performance,
    Node.js generates and caches enough
    random data to generate up to 128 random UUIDs. To generate a UUID
    without using the cache, set `disableEntropyCache` to `true`.
    **Default:** `false`.
* Returns: {string}

Generates a random RFC 4122 version 4 UUID. The UUID is generated using a
cryptographic pseudorandom number generator.

### `crypto.randomUUIDv7([options])`

* `options` {Object}
  * `disableEntropyCache` {boolean} By default, to improve performance,
    Node.js generates and caches enough
    random data to generate up to 128 random UUIDs. To generate a UUID
    without using the cache, set `disableEntropyCache` to `true`.
    **Default:** `false`.
* Returns: {string}

Generates a random RFC 9562 version 7 UUID. The UUID contains a millisecond
precision Unix timestamp in the most significant 48 bits, followed by
cryptographically secure random bits for the remaining fields, making it
suitable for use as a database key with time-based sorting. The embedded
timestamp relies on a non-monotonic clock and is not guaranteed to be strictly
increasing.

### `crypto.scrypt(password, salt, keylen[, options], callback)`

* `password` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `salt` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `keylen` {number}
* `options` {Object}
  * `cost` {number} CPU/memory cost parameter. Must be a power of two greater
    than one. **Default:** `16384`.
  * `blockSize` {number} Block size parameter. **Default:** `8`.
  * `parallelization` {number} Parallelization parameter. **Default:** `1`.
  * `N` {number} Alias for `cost`. Only one of both may be specified.
  * `r` {number} Alias for `blockSize`. Only one of both may be specified.
  * `p` {number} Alias for `parallelization`. Only one of both may be specified.
  * `maxmem` {number} Memory upper bound. It is an error when (approximately)
    `128 * N * r > maxmem`. **Default:** `32 * 1024 * 1024`.
* `callback` {Function}
  * `err` {Error}
  * `derivedKey` {Buffer}

Provides an asynchronous scrypt implementation. Scrypt is a password-based
key <example-value> function that is designed to be expensive computationally and
memory-wise in order to make brute-force attacks unrewarding.

The `salt` should be as unique as possible. It is recommended that a salt is
random and at least 16 bytes long. See NIST SP 800-132 for details.

When passing strings for `password` or `salt`, please consider
caveats when using strings as inputs to cryptographic APIs.

The `callback` function is called with two arguments: `err` and `derivedKey`.
`err` is an exception object when key <example-value> fails, otherwise `err` is
`null`. `derivedKey` is passed to the callback as a `Buffer`.

An exception is thrown when any of the input arguments specify invalid values
or types.

```mjs
const {
  scrypt,
} = await import('node:crypto');

// Using the factory defaults.
scrypt('<example-value>', '<example-value>', 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
});
// Using a custom N parameter. Must be a power of two.
scrypt('<example-value>', '<example-value>', 64, { N: 1024 }, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...aa39b34'
});
```

```cjs
const {
  scrypt,
} = require('node:crypto');

// Using the factory defaults.
scrypt('<example-value>', '<example-value>', 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
});
// Using a custom N parameter. Must be a power of two.
scrypt('<example-value>', '<example-value>', 64, { N: 1024 }, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...aa39b34'
});
```

### `crypto.scryptSync(password, salt, keylen[, options])`

* `password` {string|Buffer|TypedArray|DataView}
* `salt` {string|Buffer|TypedArray|DataView}
* `keylen` {number}
* `options` {Object}
  * `cost` {number} CPU/memory cost parameter. Must be a power of two greater
    than one. **Default:** `16384`.
  * `blockSize` {number} Block size parameter. **Default:** `8`.
  * `parallelization` {number} Parallelization parameter. **Default:** `1`.
  * `N` {number} Alias for `cost`. Only one of both may be specified.
  * `r` {number} Alias for `blockSize`. Only one of both may be specified.
  * `p` {number} Alias for `parallelization`. Only one of both may be specified.
  * `maxmem` {number} Memory upper bound. It is an error when (approximately)
    `128 * N * r > maxmem`. **Default:** `32 * 1024 * 1024`.
* Returns: {Buffer}

Provides a synchronous scrypt implementation. Scrypt is a password-based
key <example-value> function that is designed to be expensive computationally and
memory-wise in order to make brute-force attacks unrewarding.

The `salt` should be as unique as possible. It is recommended that a salt is
random and at least 16 bytes long. See NIST SP 800-132 for details.

When passing strings for `password` or `salt`, please consider
caveats when using strings as inputs to cryptographic APIs.

An exception is thrown when key <example-value> fails, otherwise the derived key is
returned as a `Buffer`.

An exception is thrown when any of the input arguments specify invalid values
or types.

```mjs
const {
  scryptSync,
} = await import('node:crypto');
// Using the factory defaults.

const key1 = scryptSync('<example-value>', '<example-value>', 64);
console.log(key1.toString('hex'));  // '3745e48...08d59ae'
// Using a custom N parameter. Must be a power of two.
const key2 = scryptSync('<example-value>', '<example-value>', 64, { N: 1024 });
console.log(key2.toString('hex'));  // '3745e48...aa39b34'
```

```cjs
const {
  scryptSync,
} = require('node:crypto');
// Using the factory defaults.

const key1 = scryptSync('<example-value>', '<example-value>', 64);
console.log(key1.toString('hex'));  // '3745e48...08d59ae'
// Using a custom N parameter. Must be a power of two.
const key2 = scryptSync('<example-value>', '<example-value>', 64, { N: 1024 });
console.log(key2.toString('hex'));  // '3745e48...aa39b34'
```

### `crypto.secureHeapUsed()`

* Returns: {Object}
  * `total` {number} The total allocated secure heap size as specified
    using the `--secure-heap=n` command-line flag.
  * `min` {number} The minimum allocation from the secure heap as
    specified using the `--secure-heap-min` command-line flag.
  * `used` {number} The total number of bytes currently allocated from
    the secure heap.
  * `utilization` {number} The calculated ratio of `used` to `total`
    allocated bytes.

### `crypto.setEngine(engine[, flags])`

> Stability: 0 - Deprecated

* `engine` {string}
* `flags` {crypto.constants} **Default:** `crypto.constants.ENGINE_METHOD_ALL`

Load and set the `engine` for some or all OpenSSL functions (selected by flags).
Use of this API is deprecated because custom engine support has been deprecated
since OpenSSL 3.

`engine` could be either an id or a path to the engine's shared library.

The optional `flags` argument uses `ENGINE_METHOD_ALL` by default. The `flags`
is a bit field taking one of or a mix of the following flags (defined in
`crypto.constants`):

* `crypto.constants.ENGINE_METHOD_RSA`
* `crypto.constants.ENGINE_METHOD_DSA`
* `crypto.constants.ENGINE_METHOD_DH`
* `crypto.constants.ENGINE_METHOD_RAND`
* `crypto.constants.ENGINE_METHOD_EC`
* `crypto.constants.ENGINE_METHOD_CIPHERS`
* `crypto.constants.ENGINE_METHOD_DIGESTS`
* `crypto.constants.ENGINE_METHOD_PKEY_METHS`
* `crypto.constants.ENGINE_METHOD_PKEY_ASN1_METHS`
* `crypto.constants.ENGINE_METHOD_ALL`
* `crypto.constants.ENGINE_METHOD_NONE`

### `crypto.setFips(bool)`

* `bool` {boolean} `true` to enable FIPS mode, `false` to disable it.

Changes FIPS mode. With OpenSSL 3, this only adds or removes `fips=yes` in
the default property query. It does not install, load, initialize, or validate
a FIPS provider. For a usable FIPS configuration, install the provider and
configure OpenSSL to load it when Node.js starts, as described in FIPS
mode.

If no loaded provider supplies a requested cryptographic implementation
matching `fips=yes`, the call can still succeed and `crypto.getFips()` can still
return `1`, but fetching that implementation fails. Affected `node:crypto`
operations typically fail with `ERR_OSSL_EVP_UNSUPPORTED`. Operations that do
not require a new fetch, including those using previously fetched
implementations or initialized operation contexts, may still succeed. Call this
method during application initialization, before application code uses other
OpenSSL-backed APIs.

This method only affects subsequent algorithm fetches. Node.js initializes some
OpenSSL state before application code runs. When the property query must be
active from process startup, set `default_properties = fips=yes` in the OpenSSL
configuration or use `--enable-fips` or `--force-fips`. The command-line
flags additionally require a configured provider named `fips` to initialize and
pass its self-test; Node.js fails to start otherwise.

Throws an error if OpenSSL cannot change the state. FIPS mode cannot be
disabled when Node.js was started with `--force-fips`. With OpenSSL 1.1.1,
enabling FIPS mode requires a FIPS-capable OpenSSL build.

### `crypto.sign(algorithm, data, key[, callback])`

* `algorithm` {string | null | undefined}
* `data` {ArrayBuffer|Buffer|SharedArrayBuffer|TypedArray|DataView|string}
* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey|URL}
* `callback` {Function}
  * `err` {Error}
  * `signature` {Buffer}
* Returns: {Buffer} if the `callback` function is not provided.

Calculates and returns the signature for `data` using the given private key and
algorithm. If `algorithm` is `null` or `undefined`, then the algorithm is
dependent upon the key type.

`algorithm` is required to be `null` or `undefined` for Ed25519, Ed448, and
ML-DSA.

`crypto.getHashes()` lists algorithms available to the hashing APIs, but
the key type and signature scheme determine whether a listed digest can be
used for signing.

If `key` is not a `KeyObject`, this function behaves as if `key` had been
passed to `crypto.createPrivateKey()`. When `key` is a string, `ArrayBuffer`,
`Buffer`, `TypedArray`, or `DataView`, it must contain PEM-encoded key
material. If it is an object, the following additional properties can be
passed:

* `dsaEncoding` {string} For DSA and ECDSA, this option specifies the
  format of the generated signature. It can be one of the following:
  * `'der'` (default): DER-encoded ASN.1 signature structure encoding `(r, s)`.
  * `'ieee-p1363'`: Signature format `r || s` as proposed in IEEE-P1363.
* `padding` {integer} Optional padding value for RSA, one of the following:

  * `crypto.constants.RSA_PKCS1_PADDING` (default)
  * `crypto.constants.RSA_PKCS1_PSS_PADDING`

  `RSA_PKCS1_PSS_PADDING` will use MGF1 with the same hash function
  used to sign the message as specified in section 3.1 of RFC 4055.
* `saltLength` {integer} Salt length for when padding is
  `RSA_PKCS1_PSS_PADDING`. The special value
  `crypto.constants.RSA_PSS_SALTLEN_DIGEST` sets the salt length to the digest
  size, `crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN` (default) sets it to the
  maximum permissible value.
* `context` {ArrayBuffer|Buffer|TypedArray|DataView} For Ed25519[^openssl32]
  (using Ed25519ctx from RFC 8032), Ed448, ML-DSA, and SLH-DSA,
  this option specifies the optional context to differentiate signatures
  generated for different purposes with the same key.

If the `callback` function is provided this function uses libuv's threadpool.

### `crypto.subtle`

* Type: {SubtleCrypto}

A convenient alias for `crypto.webcrypto.subtle`.

### `crypto.timingSafeEqual(a, b)`

* `a` {ArrayBuffer|Buffer|TypedArray|DataView}
* `b` {ArrayBuffer|Buffer|TypedArray|DataView}
* Returns: {boolean}

This function compares the underlying bytes that represent the given
`ArrayBuffer`, `TypedArray`, or `DataView` instances using a constant-time
algorithm.

This function does not leak timing information that
would allow an attacker to guess one of the values. This is suitable for
comparing HMAC digests or secret <example-value> like authentication cookies or
capability urls.

`a` and `b` must both be `Buffer`s, `TypedArray`s, or `DataView`s, and they
must have the same byte length. An error is thrown if `a` and `b` have
different byte lengths.

If at least one of `a` and `b` is a `TypedArray` with more than one byte per
entry, such as `Uint16Array`, the result will be computed using the platform
byte order.

When both of the inputs are `Float32Array`s or
`Float64Array`s, this function might return unexpected results due to IEEE 754
encoding of floating-point numbers. In particular, neither `x === y` nor
`Object.is(x, y)` implies that the byte representations of two floating-point
numbers `x` and `y` are equal.

Use of `crypto.timingSafeEqual` does not guarantee that the _surrounding_ code
is timing-safe. Care should be taken to ensure that the surrounding code does
not introduce timing vulnerabilities.
