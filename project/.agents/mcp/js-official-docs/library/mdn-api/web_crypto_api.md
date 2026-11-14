---
title: "Web Crypto API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_crypto_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Crypto API

The **Web Crypto API** is an interface allowing a script to use cryptographic primitives in order to build systems using cryptography.

Some browsers implemented an interface called `Crypto` without having it well defined or being cryptographically sound.
In order to avoid confusion, methods and properties of this interface have been removed from browsers implementing the Web Crypto API, and all Web Crypto API methods are available on a new interface: `SubtleCrypto`.
The `Crypto.subtle` property gives access to an object implementing it.

> **Warning:**
> The Web Crypto API provides a number of low-level cryptographic primitives. It's very easy to misuse them, and the pitfalls involved can be very subtle.
>
> Even assuming you use the basic <example-value> functions correctly, secure key <example-value> and overall security system design are extremely hard to get right, and are generally the domain of specialist security experts.
>
> Errors in security system design and implementation can make the security of the system completely ineffective.
>
> Please learn and experiment, but don't guarantee or imply the security of your work before an individual knowledgeable in this subject matter thoroughly reviews it. The Crypto 101 Course can be a great place to start learning about the design and implementation of secure systems.

## Interfaces

- `Crypto`
    Provides basic <example-value> features, such as a cryptographically strong random number generator, and access to cryptographic primitives via a `SubtleCrypto` object.
    An object of this type can be accessed in the global scope using `Window.crypto` or `WorkerGlobalScope.crypto`.
- `SubtleCrypto`
    Represents an object that provides low-level cryptographic functions for key <example-value>, encryption, decryption, key <example-value> and unwrapping, and so on.
- `CryptoKey`
    Represents a cryptographic key <example-value> from one of the `SubtleCrypto` methods `generateKey()`, `deriveKey()`, `importKey()`, or `unwrapKey()`.

### Dictionaries

- `AesCbcParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.encrypt()`, `SubtleCrypto.decrypt()`, `SubtleCrypto.wrapKey()`, or `SubtleCrypto.unwrapKey()`, when using the AES-CBC algorithm.
- `AesCtrParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.encrypt()`, `SubtleCrypto.decrypt()`, `SubtleCrypto.wrapKey()`, or `SubtleCrypto.unwrapKey()`, when using the AES-CTR algorithm.
- `AesGcmParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.encrypt()`, `SubtleCrypto.decrypt()`, `SubtleCrypto.wrapKey()`, or `SubtleCrypto.unwrapKey()`, when using the AES-GCM algorithm.
- `AesKeyGenParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.generateKey()`, when generating an AES key: that is, when the algorithm is identified as any of AES-CBC, AES-CTR, AES-GCM, or AES-KW.
- `CryptoKeyPair`
    Represents a public and private key pair used for an asymmetric cryptography algorithm.
- `EcKeyGenParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.generateKey()`, when generating any elliptic-curve-based key pair: that is, when the algorithm is identified as either of ECDSA or ECDH.
- `EcKeyImportParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.importKey()` or `SubtleCrypto.unwrapKey()`, when generating any elliptic-curve-based key pair: that is, when the algorithm is identified as either of ECDSA or ECDH.
- `EcdhKeyDeriveParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.deriveKey()`, when using the ECDH algorithm.
- `EcdsaParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.sign()` or `SubtleCrypto.verify()` when using the ECDSA algorithm.
- `HkdfParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.deriveKey()`, when using the HKDF algorithm.
- `HmacImportParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.importKey()` or `SubtleCrypto.unwrapKey()`, when generating a key for the HMAC algorithm.
- `HmacKeyGenParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.generateKey()`, when generating a key for the HMAC algorithm.
- `Pbkdf2Params`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.deriveKey()`, when using the PBKDF2 algorithm.
- `RsaHashedImportParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.importKey()` or `SubtleCrypto.unwrapKey()`, when importing any RSA-based key pair: that is, when the algorithm is identified as any of RSASSA-PKCS1-v1_5, RSA-PSS, or RSA-OAEP.
- `RsaHashedKeyGenParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.generateKey()`, when generating any RSA-based key pair: that is, when the algorithm is identified as any of RSASSA-PKCS1-v1_5, RSA-PSS, or RSA-OAEP.
- `RsaOaepParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.encrypt()`, `SubtleCrypto.decrypt()`, `SubtleCrypto.wrapKey()`, or `SubtleCrypto.unwrapKey()`, when using the RSA_OAEP algorithm.
- `RsaPssParams`
    Represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.sign()` or `SubtleCrypto.verify()`, when using the RSA-PSS algorithm.

### Extensions to other interfaces

- `Window.crypto`
    Represents the `Crypto` object associated with the global object in the main thread scope.
- `WorkerGlobalScope.crypto`
    Represents `Crypto` object associated with the global object in worker scope.
