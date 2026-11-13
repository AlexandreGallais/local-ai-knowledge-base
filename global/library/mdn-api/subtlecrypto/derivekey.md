---
title: "SubtleCrypto: deriveKey() method (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subtlecrypto/derivekey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubtleCrypto: deriveKey() method

The **`deriveKey()`** method of the `SubtleCrypto` interface can be used to derive a secret key from a master key.

It takes as arguments some initial key <example-value>, the derivation algorithm to use, and the desired properties for the key to derive.
It returns a `Promise` which will be fulfilled with a `CryptoKey` object representing the new key.

It's worth noting that the supported key <example-value> algorithms have quite different characteristics and are appropriate in quite different situations.
See Supported algorithms for some more detail on this.

## Syntax

```js
deriveKey(algorithm, baseKey, derivedKeyType, extractable, keyUsages)
```

### Parameters

- `algorithm`
    An object defining the derivation algorithm to use.
    - To use ECDH, pass an `EcdhKeyDeriveParams` object, specifying the string `ECDH` as the `name` property.
    - To use HKDF, pass an `HkdfParams` object.
    - To use PBKDF2, pass a `Pbkdf2Params` object.
    - To use X25519, pass an `EcdhKeyDeriveParams` object, specifying the string `X25519` as the `name` property.
- `baseKey`
    A `CryptoKey` representing the input to the derivation algorithm.
    If `algorithm` is ECDH or X25519, then this will be the ECDH or X25519 private key.
    Otherwise it will be the initial key <example-value> for the derivation function: for example, for PBKDF2 it might be a password, imported as a `CryptoKey` using `SubtleCrypto.importKey()`.
- `derivedKeyType`
    An object defining the algorithm the derived key will be used for:
    - For HMAC pass an `HmacImportParams` object.
    - For AES-CTR, AES-CBC, AES-GCM, or AES-KW, pass an `AesDerivedKeyParams` object.
- `extractable`
    A boolean value indicating whether it will be possible to export the key using `SubtleCrypto.exportKey()` or `SubtleCrypto.wrapKey()`.
- `keyUsages`
    An `Array` indicating what can be done with the derived key.
    Note that the key <example-value> must be allowed by the algorithm set in `derivedKeyType`.
    Possible values of the array are:
    - `encrypt`: The key may be used to encrypt messages.
    - `decrypt`: The key may be used to decrypt messages.
    - `sign`: The key may be used to sign messages.
    - `verify`: The key may be used to verify signatures.
    - `deriveKey`: The key may be used in deriving a new key.
    - `deriveBits`: The key may be used in deriving bits.
    - `wrapKey`: The key may be used to wrap a key.
    - `unwrapKey`: The key may be used to unwrap a key.

### Return value

A `Promise` that fulfills with a `CryptoKey`.

### Exceptions

The promise is rejected when one of the following exceptions are encountered:

- `InvalidAccessError` `DOMException`
    Raised when the master key is not a key for the requested derivation algorithm or if the `keyUsages` value of that key doesn't contain `deriveKey`.
- `NotSupportedError` `DOMException`
    Raised when trying to use an algorithm that is either unknown or isn't suitable for derivation, or if the algorithm requested for the derived key doesn't define a key length.
- `SyntaxError` `DOMException`
    Raised when `keyUsages` is empty but the unwrapped key is of type `secret` or `private`.

## Supported algorithms

The algorithms supported by `deriveKey()` have quite different characteristics and are appropriate in different situations.

### Key <example-value> algorithms

#### HKDF

HKDF is a _key <example-value> function_.
It's designed to derive key <example-value> from some high-entropy input, such as the output of an ECDH key <example-value> operation.

It's _not_ designed to derive keys from relatively low-entropy inputs such as passwords.
For that, use PBKDF2.

HKDF is specified in RFC 5869.

#### PBKDF2

PBKDF2 is also a _key <example-value> function_.
It's designed to derive key <example-value> from some relatively low-entropy input, such as a password.
It derives key <example-value> by applying a function such as HMAC to the input password along with some salt, and repeating this process many times.
The more times the process is repeated, the more computationally expensive key <example-value> is: this makes it harder for an attacker to use brute-force to discover the key using a dictionary attack.

PBKDF2 is specified in RFC 2898.

### Key <example-value> algorithms

#### ECDH

ECDH (Elliptic Curve Diffie–Hellman) is a _key-agreement algorithm_.
It enables two people who each have an ECDH public/private key pair to generate a shared secret: that is, a secret that they — and no one else — share.
They can then use this shared secret as a symmetric key to secure their communication, or can use the secret as an input to derive such a key (for example, using the HKDF algorithm).

ECDH is specified in RFC 6090.

#### X25519

X25519 is a key <example-value> algorithm like ECDH, but built on the Curve25519 elliptic curve, which is part of the Edwards-Curve Digital Signature Algorithm (EdDSA) family of algorithms defined in 8032.

The Curve25519 algorithms are widely used in cryptography, and are considered to be some of the most efficient/fast available.
By comparison with the NIST (National Institute of Standards and Technology) curve key <example-value> algorithms used with ECDH, Curve25519 is simpler to implement, and its non-governmental origin means that the decisions behind its design choices are transparent and open.

X25519 is specified in 7748.
