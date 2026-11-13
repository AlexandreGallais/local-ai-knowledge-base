---
title: "Web Crypto API (part 2 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webcrypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Crypto API (part 2 of 6)

## Class: `CryptoKey`

### `cryptoKey.algorithm`

* Type: {KeyAlgorithm|RsaHashedKeyAlgorithm|EcKeyAlgorithm|AesKeyAlgorithm|HmacKeyAlgorithm|KmacKeyAlgorithm}

An object detailing the algorithm for which the key can be used along with
additional algorithm-specific parameters.

Read-only.

### `cryptoKey.extractable`

* Type: {boolean}

When `true`, the {CryptoKey} can be extracted using either
`subtle.exportKey()` or `subtle.wrapKey()`.

Read-only.

### `cryptoKey.type`

* Type: {string} One of `'<example-value>'`, `'<example-value>'`, or `'<example-value>'`.

A string identifying whether the key is a symmetric (`'<example-value>'`) or
asymmetric (`'private'` or `'public'`) key.

### `cryptoKey.usages`

* Type: {string\[]}

An array of strings identifying the operations for which the
key may be used.

The possible usages are:

* `'encrypt'` - Enable using the key with `subtle.encrypt()`
* `'decrypt'` - Enable using the key with `subtle.decrypt()`
* `'sign'` - Enable using the key with `subtle.sign()`
* `'verify'` - Enable using the key with `subtle.verify()`
* `'deriveKey'` - Enable using the key with `subtle.deriveKey()`
* `'deriveBits'` - Enable using the key with `subtle.deriveBits()`
* `'encapsulateBits'` - Enable using the key with `subtle.encapsulateBits()`
* `'decapsulateBits'` - Enable using the key with `subtle.decapsulateBits()`
* `'encapsulateKey'` - Enable using the key with `subtle.encapsulateKey()`
* `'decapsulateKey'` - Enable using the key with `subtle.decapsulateKey()`
* `'wrapKey'` - Enable using the key with `subtle.wrapKey()`
* `'unwrapKey'` - Enable using the key with `subtle.unwrapKey()`

Valid key <example-value> depend on the key <example-value> (identified by
`cryptokey.algorithm.name`). See Crypto operation APIs for the operations
supported by each key algorithm.

## Class: `CryptoKeyPair`

The `CryptoKeyPair` is a simple dictionary object with `publicKey` and
`privateKey` properties, representing an asymmetric key pair.

### `cryptoKeyPair.privateKey`

* Type: {CryptoKey} A {CryptoKey} whose `type` will be `'private'`.

### `cryptoKeyPair.publicKey`

* Type: {CryptoKey} A {CryptoKey} whose `type` will be `'public'`.
