---
title: "Crypto (part 10 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 10 of 19)

## `node:crypto` module methods and properties

### `crypto.argon2(algorithm, parameters, callback)`

* `algorithm` {string} Variant of Argon2, one of `"argon2d"`, `"argon2i"` or `"argon2id"`.
* `parameters` {Object}
  * `message` {string|ArrayBuffer|Buffer|TypedArray|DataView} REQUIRED, this is the password for password
    hashing applications of Argon2.
  * `nonce` {string|ArrayBuffer|Buffer|TypedArray|DataView} REQUIRED, must be at
    least 8 bytes long. This is the salt for password <example-value> applications of Argon2.
  * `parallelism` {number} REQUIRED, degree of parallelism determines how many computational chains (lanes)
    can be run. Must be at least `1` and at most `2**24-1`.
  * `tagLength` {number} REQUIRED, the length of the key to generate. Must be at least `4` and
    at most `2**32-1`.
  * `memory` {number} REQUIRED, memory cost in 1KiB blocks. Must be at least
    `8 * parallelism` and at most `2**32-1`. The actual number of blocks is rounded
    down to the nearest multiple of `4 * parallelism`.
  * `passes` {number} REQUIRED, number of passes (iterations). Must be at least `1` and at most
    `2**32-1`.
  * `secret` {string|ArrayBuffer|Buffer|TypedArray|DataView|undefined} OPTIONAL, Random additional input,
    similar to the salt, that should **NOT** be stored with the derived key. This is known as pepper in
    password <example-value> applications. If used, must have a length not greater than `2**32-1` bytes.
  * `associatedData` {string|ArrayBuffer|Buffer|TypedArray|DataView|undefined} OPTIONAL, Additional data to
    be added to the hash, functionally equivalent to salt or secret, but meant for
    non-random data. If used, must have a length not greater than `2**32-1` bytes.
* `callback` {Function}
  * `err` {Error}
  * `derivedKey` {Buffer}

Provides an asynchronous Argon2 implementation. Argon2 is a password-based
key <example-value> function that is designed to be expensive computationally and
memory-wise in order to make brute-force attacks unrewarding.

The `nonce` should be as unique as possible. It is recommended that a nonce is
random and at least 16 bytes long. See NIST SP 800-132 for details.

When passing strings for `message`, `nonce`, `secret` or `associatedData`, please
consider caveats when using strings as inputs to cryptographic APIs.

The `callback` function is called with two arguments: `err` and `derivedKey`.
`err` is an exception object when key <example-value> fails, otherwise `err` is
`null`. `derivedKey` is passed to the callback as a `Buffer`.

An exception is thrown when any of the input arguments specify invalid values
or types.

```mjs
const { argon2, randomBytes } = await import('node:crypto');

const parameters = {
  message: '<example-value>',
  nonce: randomBytes(16),
  parallelism: 4,
  tagLength: 64,
  memory: 65536,
  passes: 3,
};

argon2('argon2id', parameters, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // 'af91dad...9520f15'
});
```

```cjs
const { argon2, randomBytes } = require('node:crypto');

const parameters = {
  message: '<example-value>',
  nonce: randomBytes(16),
  parallelism: 4,
  tagLength: 64,
  memory: 65536,
  passes: 3,
};

argon2('argon2id', parameters, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // 'af91dad...9520f15'
});
```

### `crypto.argon2Sync(algorithm, parameters)`

* `algorithm` {string} Variant of Argon2, one of `"argon2d"`, `"argon2i"` or `"argon2id"`.
* `parameters` {Object}
  * `message` {string|ArrayBuffer|Buffer|TypedArray|DataView} REQUIRED, this is the password for password
    hashing applications of Argon2.
  * `nonce` {string|ArrayBuffer|Buffer|TypedArray|DataView} REQUIRED, must be at
    least 8 bytes long. This is the salt for password <example-value> applications of Argon2.
  * `parallelism` {number} REQUIRED, degree of parallelism determines how many computational chains (lanes)
    can be run. Must be at least 1 and at most `2**24-1`.
  * `tagLength` {number} REQUIRED, the length of the key to generate. Must be at least `4` and
    at most `2**32-1`.
  * `memory` {number} REQUIRED, memory cost in 1KiB blocks. Must be at least
    `8 * parallelism` and at most `2**32-1`. The actual number of blocks is rounded
    down to the nearest multiple of `4 * parallelism`.
  * `passes` {number} REQUIRED, number of passes (iterations). Must be at least `1` and at most
    `2**32-1`.
  * `secret` {string|ArrayBuffer|Buffer|TypedArray|DataView|undefined} OPTIONAL, Random additional input,
    similar to the salt, that should **NOT** be stored with the derived key. This is known as pepper in
    password <example-value> applications. If used, must have a length not greater than `2**32-1` bytes.
  * `associatedData` {string|ArrayBuffer|Buffer|TypedArray|DataView|undefined} OPTIONAL, Additional data to
    be added to the hash, functionally equivalent to salt or secret, but meant for
    non-random data. If used, must have a length not greater than `2**32-1` bytes.
* Returns: {Buffer}

Provides a synchronous Argon2 implementation. Argon2 is a password-based
key <example-value> function that is designed to be expensive computationally and
memory-wise in order to make brute-force attacks unrewarding.

The `nonce` should be as unique as possible. It is recommended that a nonce is
random and at least 16 bytes long. See NIST SP 800-132 for details.

When passing strings for `message`, `nonce`, `secret` or `associatedData`, please
consider caveats when using strings as inputs to cryptographic APIs.

An exception is thrown when key <example-value> fails, otherwise the derived key is
returned as a `Buffer`.

An exception is thrown when any of the input arguments specify invalid values
or types.

```mjs
const { argon2Sync, randomBytes } = await import('node:crypto');

const parameters = {
  message: '<example-value>',
  nonce: randomBytes(16),
  parallelism: 4,
  tagLength: 64,
  memory: 65536,
  passes: 3,
};

const derivedKey = argon2Sync('argon2id', parameters);
console.log(derivedKey.toString('hex'));  // 'af91dad...9520f15'
```

```cjs
const { argon2Sync, randomBytes } = require('node:crypto');

const parameters = {
  message: '<example-value>',
  nonce: randomBytes(16),
  parallelism: 4,
  tagLength: 64,
  memory: 65536,
  passes: 3,
};

const derivedKey = argon2Sync('argon2id', parameters);
console.log(derivedKey.toString('hex'));  // 'af91dad...9520f15'
```

### `crypto.checkPrime(candidate[, options], callback)`

* `candidate` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  A possible prime encoded as a sequence of big endian octets of arbitrary
  length.
* `options` {Object}
  * `checks` {number} The number of Miller-Rabin probabilistic primality
    iterations to perform. When the value is `0` (zero), a number of checks
    is used that yields a false positive rate of at most 2-64 for
    random input. Care must be used when selecting a number of checks. Refer
    to the OpenSSL documentation for the `BN_is_prime_ex` function `nchecks`
    options for more details. **Default:** `0`
* `callback` {Function}
  * `err` {Error} Set to an {Error} object if an error occurred during check.
  * `result` {boolean} `true` if the candidate is a prime with an error
    probability less than `0.25 ** options.checks`.

Checks the primality of the `candidate`.

### `crypto.checkPrimeSync(candidate[, options])`

* `candidate` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  A possible prime encoded as a sequence of big endian octets of arbitrary
  length.
* `options` {Object}
  * `checks` {number} The number of Miller-Rabin probabilistic primality
    iterations to perform. When the value is `0` (zero), a number of checks
    is used that yields a false positive rate of at most 2-64 for
    random input. Care must be used when selecting a number of checks. Refer
    to the OpenSSL documentation for the `BN_is_prime_ex` function `nchecks`
    options for more details. **Default:** `0`
* Returns: {boolean} `true` if the candidate is a prime with an error
  probability less than `0.25 ** options.checks`.

Checks the primality of the `candidate`.

### `crypto.constants`

* Type: {Object}

An object containing commonly used constants for crypto and security related
operations. The specific constants currently defined are described in
Crypto constants.

### `crypto.createCipheriv(algorithm, key, iv[, options])`

* `algorithm` {string}
* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
* `iv` {string|ArrayBuffer|Buffer|TypedArray|DataView|null}
* `options` {Object} `stream.transform` options with these additional
  properties:
  * `authTagLength` {number} The authentication tag length in bytes. Its
    requirements and default depend on the authenticated cipher, as described
    below.
  * `ctsMode` {string} The CBC-CTS mode variant. One of `'CS1'`, `'CS2'`,
    or `'CS3'`. The values are case-sensitive. **Default:** `'CS1'`.
  * `encoding` {string} The encoding to use when `key` is a string. This
    option does not affect a string `iv`, which is always interpreted as UTF-8.
    **Default:** `'utf8'`.
  * `xtsStandard` {string} The standard used by `sm4-xts`. One of `'GB'` or
    `'IEEE'`. The values are case-sensitive. **Default:** `'GB'`.
* Returns: {Cipheriv}

Creates and returns a `Cipheriv` object, with the given `algorithm`, `key` and
initialization vector (`iv`).

The `options` argument controls cipher-specific settings and stream behavior.
It is optional except when a cipher in CCM or OCB mode (e.g. `'aes-128-ccm'`)
is used. In that case, the `authTagLength` option is required and specifies the
length of the authentication tag in bytes, see CCM mode. In GCM mode, the
`authTagLength` option is not required but can be used to set the length of the
authentication tag that will be returned by `getAuthTag()` and defaults to 16
bytes.
For `SIV`, `GCM-SIV`, and `chacha20-poly1305`, the `authTagLength` option
defaults to 16 bytes. `SIV` and `GCM-SIV` only support 16-byte authentication
tags.

The `ctsMode` and `xtsStandard` options configure parameters exposed by OpenSSL
providers. They are available only with OpenSSL 3.0 or later and a provider
that supports the corresponding parameter. `ctsMode` applies only to CBC-CTS
ciphers, and `xtsStandard` applies only to `sm4-xts`. Supplying either option
for an available cipher implementation that does not support it throws an
`ERR_CRYPTO_UNSUPPORTED_OPERATION` error. See CBC-CTS mode and XTS mode
for details.

The available algorithms depend on OpenSSL. `crypto.getCiphers()` lists the
algorithms exposed by Node.js. On recent OpenSSL releases,
`openssl list -cipher-algorithms` displays the algorithms available to OpenSSL,
which can include algorithms that Node.js does not expose.

The `key` is the raw key used by the `algorithm` and `iv` is an
initialization vector. Each may be a string, `ArrayBuffer`, `Buffer`,
`TypedArray`, or `DataView`. A string `key` is decoded using `options.encoding`,
which defaults to `'utf8'`; a string `iv` is always decoded as UTF-8. The `key`
may optionally be a `KeyObject` of type `secret`. If the cipher does not
need an initialization vector, `iv` may be `null`.

When passing strings for `key` or `iv`, please consider
caveats when using strings as inputs to cryptographic APIs.

Initialization vector requirements depend on the algorithm. For some
algorithms, an IV must be unpredictable and unique; for others, uniqueness
alone is sufficient, a fixed value is required, or no IV is used. Follow the
requirements for the selected algorithm. IVs typically do not have to be secret
and can be transmitted with the ciphertext.

### `crypto.createDecipheriv(algorithm, key, iv[, options])`

* `algorithm` {string}
* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
* `iv` {string|ArrayBuffer|Buffer|TypedArray|DataView|null}
* `options` {Object} `stream.transform` options with these additional
  properties:
  * `authTagLength` {number} The authentication tag length in bytes. Its
    requirements and default depend on the authenticated cipher, as described
    below.
  * `ctsMode` {string} The CBC-CTS mode variant. One of `'CS1'`, `'CS2'`,
    or `'CS3'`. The values are case-sensitive. **Default:** `'CS1'`.
  * `encoding` {string} The encoding to use when `key` is a string. This
    option does not affect a string `iv`, which is always interpreted as UTF-8.
    **Default:** `'utf8'`.
  * `xtsStandard` {string} The standard used by `sm4-xts`. One of `'GB'` or
    `'IEEE'`. The values are case-sensitive. **Default:** `'GB'`.
* Returns: {Decipheriv}

Creates and returns a `Decipheriv` object that uses the given `algorithm`, `key`
and initialization vector (`iv`).

The `options` argument controls cipher-specific settings and stream behavior.
It is optional except when a cipher in CCM or OCB mode (e.g. `'aes-128-ccm'`)
is used. In that case, the `authTagLength` option is required and specifies the
length of the authentication tag in bytes, see CCM mode. For GCM and
`chacha20-poly1305`, the `authTagLength` option defaults to 16 bytes and must be
set if a different length is used. For `SIV` and `GCM-SIV`, the `authTagLength`
option defaults to 16 bytes and only 16-byte authentication tags are supported.

The `ctsMode` and `xtsStandard` options configure parameters exposed by OpenSSL
providers. They are available only with OpenSSL 3.0 or later and a provider
that supports the corresponding parameter. `ctsMode` applies only to CBC-CTS
ciphers, and `xtsStandard` applies only to `sm4-xts`. Supplying either option
for an available cipher implementation that does not support it throws an
`ERR_CRYPTO_UNSUPPORTED_OPERATION` error. See CBC-CTS mode and XTS mode
for details.

The available algorithms depend on OpenSSL. `crypto.getCiphers()` lists the
algorithms exposed by Node.js. On recent OpenSSL releases,
`openssl list -cipher-algorithms` displays the algorithms available to OpenSSL,
which can include algorithms that Node.js does not expose.

The `key` is the raw key used by the `algorithm` and `iv` is an
initialization vector. Each may be a string, `ArrayBuffer`, `Buffer`,
`TypedArray`, or `DataView`. A string `key` is decoded using `options.encoding`,
which defaults to `'utf8'`; a string `iv` is always decoded as UTF-8. The `key`
may optionally be a `KeyObject` of type `secret`. If the cipher does not
need an initialization vector, `iv` may be `null`.

When passing strings for `key` or `iv`, please consider
caveats when using strings as inputs to cryptographic APIs.

Initialization vector requirements depend on the algorithm. For some
algorithms, an IV must be unpredictable and unique; for others, uniqueness
alone is sufficient, a fixed value is required, or no IV is used. Follow the
requirements for the selected algorithm. IVs typically do not have to be secret
and can be transmitted with the ciphertext.
