---
title: "CryptoKeyPair"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cryptokeypair/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CryptoKeyPair

The **`CryptoKeyPair`** dictionary of the Web Crypto API represents a key pair for an asymmetric cryptography algorithm, also known as a public-key algorithm.

A `CryptoKeyPair` object can be obtained using `SubtleCrypto.generateKey()`, when the selected algorithm is one of the asymmetric algorithms: RSASSA-PKCS1-v1_5, RSA-PSS, RSA-OAEP, ECDSA, or ECDH.

It contains two properties, which are both `CryptoKey` objects: a `privateKey` property containing the private key and a `publicKey` property containing the public key.

## Instance properties

- `CryptoKeyPair.privateKey`
    A `CryptoKey` object representing the private key. For encryption and decryption algorithms, this key is used to decrypt. For signing and verification algorithms it is used to sign.
- `CryptoKeyPair.publicKey`
    A `CryptoKey` object representing the public key. For encryption and decryption algorithms, this key is used to encrypt. For signing and verification algorithms it is used to verify signatures.

## Examples

The examples for `SubtleCrypto` methods often use `CryptoKeyPair` objects. For example:

- `SubtleCrypto.generateKey()`
- `SubtleCrypto.deriveKey()`
- `SubtleCrypto.importKey()`
- `SubtleCrypto.exportKey()`
- `SubtleCrypto.wrapKey()`
- `SubtleCrypto.unwrapKey()`
- `SubtleCrypto.encrypt()`
- `SubtleCrypto.decrypt()`
- `SubtleCrypto.sign()`
- `SubtleCrypto.verify()`

## See also

- `SubtleCrypto.generateKey`.
- `SubtleCrypto.sign` and `SubtleCrypto.verify`.
- `SubtleCrypto.encrypt` and `SubtleCrypto.decrypt`.
