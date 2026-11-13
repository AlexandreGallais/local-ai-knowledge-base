---
title: "Crypto (part 12 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 12 of 19)

### `crypto.createPublicKey(key)`

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView}
  * `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|Object} The key
    material, either in PEM, DER, JWK, or raw format.
  * `format` {string} Must be `'pem'`, `'der'`, `'jwk'`, or `'raw-public'`.
    **Default:** `'pem'`.
  * `type` {string} Must be `'pkcs1'` or `'spki'`. This option is
    required only if the `format` is `'der'` and ignored otherwise.
  * `encoding` {string} The string encoding to use when `key` is a string.
  * `asymmetricKeyType` {string} Required when `format` is `'raw-public'`
    and ignored otherwise.
    Must be a supported key type.
  * `namedCurve` {string} Name of the curve to use. Required when
    `asymmetricKeyType` is `'ec'` and ignored otherwise.
* Returns: {KeyObject}

Creates and returns a new key object containing a public key. If `key` is a
string or `Buffer`, `format` is assumed to be `'pem'`; if `key` is a `KeyObject`
with type `'private'`, the public key is derived from the given private key;
otherwise, `key` must be an object with the properties described above.

If the format is `'pem'`, the `'key'` may also be an X.509 certificate.

Because public keys can be derived from private keys, a private key may be
passed instead of a public key. In that case, this function behaves as if
`crypto.createPrivateKey()` had been called, except that the type of the
returned `KeyObject` will be `'public'` and that the private key cannot be
extracted from the returned `KeyObject`. Similarly, if a `KeyObject` with type
`'private'` is given, a new `KeyObject` with type `'public'` will be returned
and it will be impossible to extract the private key from the returned object.

A store-backed private key can be used as a public key by first loading it with
`crypto.createPrivateKey()`; a {URL} cannot be passed to
`crypto.createPublicKey()` directly.

### `crypto.createSecretKey(key[, encoding])`

* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} The string encoding when `key` is a string.
* Returns: {KeyObject}

Creates and returns a new key object containing a secret key for symmetric
encryption or `Hmac`.

### `crypto.createSign(algorithm[, options])`

* `algorithm` {string}
* `options` {Object} `stream.Writable` options
* Returns: {Sign}

Creates and returns a `Sign` object that uses the given `algorithm`. Use
`crypto.getHashes()` to obtain the names available to the hashing APIs. The
key type and signature scheme can impose additional restrictions on which
digests can be used. Optional `options` argument controls the
`stream.Writable` behavior.

In some cases, a `Sign` instance can be created using the name of a signature
algorithm, such as `'RSA-SHA256'`, instead of a digest algorithm. This will use
the corresponding digest algorithm. This does not work for all signature
algorithms, such as `'ecdsa-with-SHA256'`, so it is best to always use digest
algorithm names.

### `crypto.createVerify(algorithm[, options])`

* `algorithm` {string}
* `options` {Object} `stream.Writable` options
* Returns: {Verify}

Creates and returns a `Verify` object that uses the given algorithm.
Use `crypto.getHashes()` to obtain the names available to the hashing APIs.
The key type and signature scheme can impose additional restrictions on which
digests can be used. Optional `options` argument controls the
`stream.Writable` behavior.

In some cases, a `Verify` instance can be created using the name of a signature
algorithm, such as `'RSA-SHA256'`, instead of a digest algorithm. This will use
the corresponding digest algorithm. This does not work for all signature
algorithms, such as `'ecdsa-with-SHA256'`, so it is best to always use digest
algorithm names.

### `crypto.decapsulate(key, ciphertext[, callback])`

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|URL} Private Key
* `ciphertext` {ArrayBuffer|Buffer|TypedArray|DataView}
* `callback` {Function}
  * `err` {Error}
  * `sharedKey` {Buffer}
* Returns: {Buffer} if the `callback` function is not provided.

Key decapsulation using a KEM algorithm with a private key.

Supported key types and their KEM algorithms are:

* `'rsa'`[^openssl30] RSA Secret Value Encapsulation
* `'ec'`[^openssl32] DHKEM(P-256, HKDF-SHA256), DHKEM(P-384, HKDF-SHA256), DHKEM(P-521, HKDF-SHA256)
* `'x25519'`[^openssl32] DHKEM(X25519, HKDF-SHA256)
* `'x448'`[^openssl32] DHKEM(X448, HKDF-SHA512)
* `'ml-kem-512'`[^openssl35] ML-KEM
* `'ml-kem-768'`[^openssl35] ML-KEM
* `'ml-kem-1024'`[^openssl35] ML-KEM

If `key` is not a `KeyObject`, this function behaves as if `key` had been
passed to `crypto.createPrivateKey()`.

If the `callback` function is provided this function uses libuv's threadpool.

### `crypto.diffieHellman(options[, callback])`

* `options` {Object}
  * `privateKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|URL}
  * `publicKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject}
* `callback` {Function}
  * `err` {Error}
  * `secret` {Buffer}
* Returns: {Buffer} if the `callback` function is not provided.

Computes the Diffie-Hellman shared secret based on a `privateKey` and a `publicKey`.
Both keys must represent the same asymmetric key type and must support either the DH or
ECDH operation.

If `options.privateKey` is not a `KeyObject`, this function behaves as if
`options.privateKey` had been passed to `crypto.createPrivateKey()`.

If `options.publicKey` is not a `KeyObject`, this function behaves as if
`options.publicKey` had been passed to `crypto.createPublicKey()`.

If the `callback` function is provided this function uses libuv's threadpool.

### `crypto.encapsulate(key[, callback])`

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject} Public Key
* `callback` {Function}
  * `err` {Error}
  * `result` {Object}
    * `sharedKey` {Buffer}
    * `ciphertext` {Buffer}
* Returns: {Object} if the `callback` function is not provided.
  * `sharedKey` {Buffer}
  * `ciphertext` {Buffer}

Key encapsulation using a KEM algorithm with a public key.

Supported key types and their KEM algorithms are:

* `'rsa'`[^openssl30] RSA Secret Value Encapsulation
* `'ec'`[^openssl32] DHKEM(P-256, HKDF-SHA256), DHKEM(P-384, HKDF-SHA256), DHKEM(P-521, HKDF-SHA256)
* `'x25519'`[^openssl32] DHKEM(X25519, HKDF-SHA256)
* `'x448'`[^openssl32] DHKEM(X448, HKDF-SHA512)
* `'ml-kem-512'`[^openssl35] ML-KEM
* `'ml-kem-768'`[^openssl35] ML-KEM
* `'ml-kem-1024'`[^openssl35] ML-KEM

If `key` is not a `KeyObject`, this function behaves as if `key` had been
passed to `crypto.createPublicKey()`.

If the `callback` function is provided this function uses libuv's threadpool.

### `crypto.fips`

> Stability: 0 - Deprecated

Deprecated property for checking and controlling FIPS mode. Use
`crypto.getFips()` and `crypto.setFips()` instead.

### `crypto.generateKey(type, options, callback)`

* `type` {string} The intended use of the generated secret key. Currently
  accepted values are `'hmac'` and `'aes'`.
* `options` {Object}
  * `length` {number} The bit length of the key to generate. This must be a
    value greater than 0.
    * If `type` is `'hmac'`, the minimum is 8, and the maximum length is
      231-1. If the value is not a multiple of 8, the generated
      key will be truncated to `Math.floor(length / 8)`.
    * If `type` is `'aes'`, the length must be one of `128`, `192`, or `256`.
* `callback` {Function}
  * `err` {Error}
  * `key` {KeyObject}

Asynchronously generates a new random secret key of the given `length`. The
`type` will determine which validations will be performed on the `length`.

```mjs
const {
  generateKey,
} = await import('node:crypto');

generateKey('hmac', { length: 512 }, (err, key) => {
  if (err) throw err;
  console.log(key.export().toString('hex'));  // 46e..........620
});
```

```cjs
const {
  generateKey,
} = require('node:crypto');

generateKey('hmac', { length: 512 }, (err, key) => {
  if (err) throw err;
  console.log(key.export().toString('hex'));  // 46e..........620
});
```

The size of a generated HMAC key should not exceed the block size of the
underlying hash function. See `crypto.createHmac()` for more information.

### `crypto.generateKeyPair(type, options, callback)`

* `type` {string} The asymmetric key type to generate. See the
  supported asymmetric key types.
* `options` {Object}
  * `modulusLength` {number} Key size in bits (RSA, DSA).
  * `publicExponent` {number} Public exponent (RSA). **Default:** `0x10001`.
  * `hashAlgorithm` {string} Name of the message digest (RSA-PSS).
  * `mgf1HashAlgorithm` {string} Name of the message digest used by
    MGF1 (RSA-PSS).
  * `saltLength` {number} Minimal salt length in bytes (RSA-PSS).
  * `divisorLength` {number} Size of `q` in bits (DSA).
  * `namedCurve` {string} Name of the curve to use (EC).
  * `prime` {Buffer} The prime parameter (DH).
  * `primeLength` {number} Prime length in bits (DH).
  * `generator` {number} Custom generator (DH). **Default:** `2`.
  * `groupName` {string} Diffie-Hellman group name (DH). See
    `crypto.getDiffieHellman()`.
  * `paramEncoding` {string} Must be `'named'` or `'explicit'` (EC).
    **Default:** `'named'`.
  * `publicKeyEncoding` {Object} See `keyObject.export()`.
  * `privateKeyEncoding` {Object} See `keyObject.export()`.
* `callback` {Function}
  * `err` {Error}
  * `publicKey` {string | Buffer | KeyObject}
  * `privateKey` {string | Buffer | KeyObject}

Generates a new asymmetric key pair of the given `type`. See the
supported asymmetric key types.

For RSA-PSS keys, `crypto.getHashes()` lists algorithms available to the
hashing APIs, but not every listed digest can be encoded in RSA-PSS parameters
or is supported by the active RSA implementation.

If a `publicKeyEncoding` or `privateKeyEncoding` was specified, this function
behaves as if `keyObject.export()` had been called on its result. Otherwise,
the respective part of the key is returned as a `KeyObject`.

It is recommended to encode public keys as `'spki'` and private keys as
`'pkcs8'` with encryption for long-term storage:

```mjs
const {
  generateKeyPair,
} = await import('node:crypto');

generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',
  },
}, (err, publicKey, privateKey) => {
  // Handle errors and use the generated key pair.
});
```

```cjs
const {
  generateKeyPair,
} = require('node:crypto');

generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',
  },
}, (err, publicKey, privateKey) => {
  // Handle errors and use the generated key pair.
});
```

On completion, `callback` will be called with `err` set to `undefined` and
`publicKey` / `privateKey` representing the generated key pair.

If this method is invoked as its `util.promisify()`ed version, it returns
a `Promise` for an `Object` with `publicKey` and `privateKey` properties.

### `crypto.generateKeyPairSync(type, options)`

* `type` {string} The asymmetric key type to generate. See the
  supported asymmetric key types.
* `options` {Object}
  * `modulusLength` {number} Key size in bits (RSA, DSA).
  * `publicExponent` {number} Public exponent (RSA). **Default:** `0x10001`.
  * `hashAlgorithm` {string} Name of the message digest (RSA-PSS).
  * `mgf1HashAlgorithm` {string} Name of the message digest used by
    MGF1 (RSA-PSS).
  * `saltLength` {number} Minimal salt length in bytes (RSA-PSS).
  * `divisorLength` {number} Size of `q` in bits (DSA).
  * `namedCurve` {string} Name of the curve to use (EC).
  * `prime` {Buffer} The prime parameter (DH).
  * `primeLength` {number} Prime length in bits (DH).
  * `generator` {number} Custom generator (DH). **Default:** `2`.
  * `groupName` {string} Diffie-Hellman group name (DH). See
    `crypto.getDiffieHellman()`.
  * `paramEncoding` {string} Must be `'named'` or `'explicit'` (EC).
    **Default:** `'named'`.
  * `publicKeyEncoding` {Object} See `keyObject.export()`.
  * `privateKeyEncoding` {Object} See `keyObject.export()`.
* Returns: {Object}
  * `publicKey` {string | Buffer | KeyObject}
  * `privateKey` {string | Buffer | KeyObject}

Generates a new asymmetric key pair of the given `type`. See the
supported asymmetric key types.

For RSA-PSS keys, `crypto.getHashes()` lists algorithms available to the
hashing APIs, but not every listed digest can be encoded in RSA-PSS parameters
or is supported by the active RSA implementation.

If a `publicKeyEncoding` or `privateKeyEncoding` was specified, this function
behaves as if `keyObject.export()` had been called on its result. Otherwise,
the respective part of the key is returned as a `KeyObject`.

When encoding public keys, it is recommended to use `'spki'`. When encoding
private keys, it is recommended to use `'pkcs8'` with a strong passphrase,
and to keep the passphrase confidential.

```mjs
const {
  generateKeyPairSync,
} = await import('node:crypto');

const {
  publicKey,
  privateKey,
} = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',
  },
});
```

```cjs
const {
  generateKeyPairSync,
} = require('node:crypto');

const {
  publicKey,
  privateKey,
} = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',
  },
});
```

The return value `{ publicKey, privateKey }` represents the generated key pair.
When PEM encoding was selected, the respective key will be a string, otherwise
it will be a buffer containing the data encoded as DER.
