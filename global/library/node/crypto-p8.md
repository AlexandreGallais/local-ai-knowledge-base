---
title: "Crypto (part 8 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 8 of 19)

## Class: `Sign`

* Extends: {stream.Writable}

The `Sign` class is a utility for generating signatures. It can be used in one
of two ways:

* As a writable stream, where data to be signed is written and the
  `sign.sign()` method is used to generate and return the signature, or
* Using the `sign.update()` and `sign.sign()` methods to produce the
  signature.

The `crypto.createSign()` method is used to create `Sign` instances. The
argument is the string name of the hash function to use. `Sign` objects are not
to be created directly using the `new` keyword.

Example: Using `Sign` and `Verify` objects as streams:

```mjs
const {
  generateKeyPairSync,
  createSign,
  createVerify,
} = await import('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('ec', {
  namedCurve: 'sect239k1',
});

const sign = createSign('SHA256');
sign.write('some data to sign');
sign.end();
const signature = sign.sign(privateKey, 'hex');

const verify = createVerify('SHA256');
verify.write('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature, 'hex'));
// Prints: true
```

```cjs
const {
  generateKeyPairSync,
  createSign,
  createVerify,
} = require('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('ec', {
  namedCurve: 'sect239k1',
});

const sign = createSign('SHA256');
sign.write('some data to sign');
sign.end();
const signature = sign.sign(privateKey, 'hex');

const verify = createVerify('SHA256');
verify.write('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature, 'hex'));
// Prints: true
```

Example: Using the `sign.update()` and `verify.update()` methods:

```mjs
const {
  generateKeyPairSync,
  createSign,
  createVerify,
} = await import('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const sign = createSign('SHA256');
sign.update('some data to sign');
sign.end();
const signature = sign.sign(privateKey);

const verify = createVerify('SHA256');
verify.update('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature));
// Prints: true
```

```cjs
const {
  generateKeyPairSync,
  createSign,
  createVerify,
} = require('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const sign = createSign('SHA256');
sign.update('some data to sign');
sign.end();
const signature = sign.sign(privateKey);

const verify = createVerify('SHA256');
verify.update('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature));
// Prints: true
```

### `sign.sign(privateKey[, outputEncoding])`

* `privateKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey|URL}
  * `dsaEncoding` {string}
  * `padding` {integer}
  * `saltLength` {integer}
* `outputEncoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Calculates the signature on all the data passed through using either
`sign.update()` or `sign.write()`.

If `privateKey` is not a `KeyObject`, this function behaves as if
`privateKey` had been passed to `crypto.createPrivateKey()`. When
`privateKey` is a string, `ArrayBuffer`, `Buffer`, `TypedArray`, or
`DataView`, it must contain PEM-encoded key material. If it is an object, the
following additional properties can be passed:

* `dsaEncoding` {string} For DSA and ECDSA, this option specifies the
  format of the generated signature. It can be one of the following:
  * `'der'` (default): DER-encoded ASN.1 signature structure encoding `(r, s)`.
  * `'ieee-p1363'`: Signature format `r || s` as proposed in IEEE-P1363.
* `padding` {integer} Optional padding value for RSA, one of the following:

  * `crypto.constants.RSA_PKCS1_PADDING` (default)
  * `crypto.constants.RSA_PKCS1_PSS_PADDING`

  `RSA_PKCS1_PSS_PADDING` will use MGF1 with the same hash function
  used to sign the message as specified in section 3.1 of RFC 4055, unless
  an MGF1 hash function has been specified as part of the key in compliance with
  section 3.3 of RFC 4055.
* `saltLength` {integer} Salt length for when padding is
  `RSA_PKCS1_PSS_PADDING`. The special value
  `crypto.constants.RSA_PSS_SALTLEN_DIGEST` sets the salt length to the digest
  size, `crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN` (default) sets it to the
  maximum permissible value.

If `outputEncoding` is provided a string is returned; otherwise a `Buffer`
is returned.

The `Sign` object can not be again used after `sign.sign()` method has been
called. Multiple calls to `sign.sign()` will result in an error being thrown.

### `sign.update(data[, inputEncoding])`

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} The encoding of the `data` string.

Updates the `Sign` content with the given `data`, the encoding of which
is given in `inputEncoding`.
If `encoding` is not provided, and the `data` is a string, an
encoding of `'utf8'` is enforced. If `data` is a `Buffer`, `TypedArray`, or
`DataView`, then `inputEncoding` is ignored.

This can be called many times with new data as it is streamed.

## Class: `Verify`

* Extends: {stream.Writable}

The `Verify` class is a utility for verifying signatures. It can be used in one
of two ways:

* As a writable stream where written data is used to validate against the
  supplied signature, or
* Using the `verify.update()` and `verify.verify()` methods to verify
  the signature.

The `crypto.createVerify()` method is used to create `Verify` instances.
`Verify` objects are not to be created directly using the `new` keyword.

See `Sign` for examples.

### `verify.update(data[, inputEncoding])`

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} The encoding of the `data` string.

Updates the `Verify` content with the given `data`, the encoding of which
is given in `inputEncoding`.
If `inputEncoding` is not provided, and the `data` is a string, an
encoding of `'utf8'` is enforced. If `data` is a `Buffer`, `TypedArray`, or
`DataView`, then `inputEncoding` is ignored.

This can be called many times with new data as it is streamed.

### `verify.verify(key, signature[, signatureEncoding])`

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
  * `dsaEncoding` {string}
  * `padding` {integer}
  * `saltLength` {integer}
* `signature` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `signatureEncoding` {string} The encoding of the `signature` string.
* Returns: {boolean} `true` or `false` depending on the validity of the
  signature for the data and public key.

Verifies the provided data using the given `key` and `signature`.

If `key` is not a `KeyObject`, this function behaves as if
`key` had been passed to `crypto.createPublicKey()`. When `key` is a string,
`ArrayBuffer`, `Buffer`, `TypedArray`, or `DataView`, it must contain
PEM-encoded key material. If it is an object, the following additional
properties can be passed:

* `dsaEncoding` {string} For DSA and ECDSA, this option specifies the
  format of the signature. It can be one of the following:
  * `'der'` (default): DER-encoded ASN.1 signature structure encoding `(r, s)`.
  * `'ieee-p1363'`: Signature format `r || s` as proposed in IEEE-P1363.
* `padding` {integer} Optional padding value for RSA, one of the following:

  * `crypto.constants.RSA_PKCS1_PADDING` (default)
  * `crypto.constants.RSA_PKCS1_PSS_PADDING`

  `RSA_PKCS1_PSS_PADDING` will use MGF1 with the same hash function
  used to verify the message as specified in section 3.1 of RFC 4055, unless
  an MGF1 hash function has been specified as part of the key in compliance with
  section 3.3 of RFC 4055.
* `saltLength` {integer} Salt length for when padding is
  `RSA_PKCS1_PSS_PADDING`. The special value
  `crypto.constants.RSA_PSS_SALTLEN_DIGEST` sets the salt length to the digest
  size, `crypto.constants.RSA_PSS_SALTLEN_AUTO` (default) causes it to be
  determined automatically.

The `signature` argument is the previously calculated signature for the data, in
the `signatureEncoding`.
If a `signatureEncoding` is specified, the `signature` is expected to be a
string; otherwise `signature` is expected to be a `Buffer`,
`TypedArray`, or `DataView`.

The `verify` object can not be used again after `verify.verify()` has been
called. Multiple calls to `verify.verify()` will result in an error being
thrown.

Because public keys can be derived from private keys, a private key may
be passed instead of a public key.
