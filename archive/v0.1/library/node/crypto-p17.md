---
title: "Crypto (part 17 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 17 of 19)

### `crypto.verify(algorithm, data, key, signature[, callback])`

* `algorithm` {string|null|undefined}
* `data` {ArrayBuffer|Buffer|SharedArrayBuffer|TypedArray|DataView|string}
* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
* `signature` {ArrayBuffer|Buffer|SharedArrayBuffer|TypedArray|DataView}
* `callback` {Function}
  * `err` {Error}
  * `result` {boolean}
* Returns: {boolean} `true` or `false` depending on the validity of the
  signature for the data and public key if the `callback` function is not
  provided.

Verifies the given signature for `data` using the given key and algorithm. If
`algorithm` is `null` or `undefined`, then the algorithm is dependent upon the
key type.

`algorithm` is required to be `null` or `undefined` for Ed25519, Ed448, and
ML-DSA.

`crypto.getHashes()` lists algorithms available to the hashing APIs, but
the key type and signature scheme determine whether a listed digest can be
used for verification.

If `key` is not a `KeyObject`, this function behaves as if `key` had been
passed to `crypto.createPublicKey()`. When `key` is a string, `ArrayBuffer`,
`Buffer`, `TypedArray`, or `DataView`, it must contain PEM-encoded key
material. If it is an object, the following additional properties can be
passed:

* `dsaEncoding` {string} For DSA and ECDSA, this option specifies the
  format of the signature. It can be one of the following:
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

The `signature` argument is the previously calculated signature for the `data`.

Because public keys can be derived from private keys, a private key or a public
key may be passed for `key`.

If the `callback` function is provided this function uses libuv's threadpool.

### `crypto.webcrypto`

Type: {Crypto} An implementation of the Web Crypto API standard.

See the Web Crypto API documentation for details.
