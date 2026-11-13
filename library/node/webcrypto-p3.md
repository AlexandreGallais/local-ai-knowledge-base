---
title: "Web Crypto API (part 3 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webcrypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Crypto API (part 3 of 6)

## Class: `SubtleCrypto`

### Static method: `SubtleCrypto.supports(operation, algorithm[, lengthOrAdditionalAlgorithm])`

> Stability: 1.1 - Active development

* `operation` {string} "encrypt", "decrypt", "sign", "verify", "digest", "generateKey", "deriveKey", "deriveBits", "importKey", "exportKey", "getPublicKey", "wrapKey", "unwrapKey", "encapsulateBits", "encapsulateKey", "decapsulateBits", or "decapsulateKey"
* `algorithm` {string|Algorithm}
* `lengthOrAdditionalAlgorithm` {null|number|string|Algorithm|undefined} Depending on the operation this is either ignored, the value of the length argument when operation is "deriveBits", the algorithm of key to be derived when operation is "deriveKey", the algorithm of key to be exported before wrapping when operation is "wrapKey", the algorithm of key to be imported after unwrapping when operation is "unwrapKey", or the algorithm of key to be imported after en/decapsulating a key when operation is "encapsulateKey" or "decapsulateKey". **Default:** `null` when operation is "deriveBits", `undefined` otherwise.
* Returns: {boolean} Indicating whether the implementation supports the given operation

Allows feature detection in Web Crypto API,
which can be used to detect whether a given algorithm identifier
(including its parameters) is supported for the given operation.

See Checking for runtime algorithm support for an example use of this method.

### `subtle.decapsulateBits(decapsulationAlgorithm, decapsulationKey, ciphertext)`

> Stability: 1.1 - Active development

* `decapsulationAlgorithm` {string|Algorithm}
* `decapsulationKey` {CryptoKey}
* `ciphertext` {ArrayBuffer|TypedArray|DataView|Buffer}
* Returns: {Promise} Fulfills with {ArrayBuffer} upon success.

A message recipient uses their asymmetric private key to decrypt an
"encapsulated key" (ciphertext), thereby recovering a temporary symmetric
key (represented as {ArrayBuffer}) which is then used to decrypt a message.

The algorithms currently supported include:

* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]
* `'MLKEM768-P256'`[^modern-algos]
* `'MLKEM768-X25519'`[^modern-algos]
* `'MLKEM1024-P384'`[^modern-algos]

### `subtle.decapsulateKey(decapsulationAlgorithm, decapsulationKey, ciphertext, sharedKeyAlgorithm, extractable, keyUsages)`

> Stability: 1.1 - Active development

* `decapsulationAlgorithm` {string|Algorithm}
* `decapsulationKey` {CryptoKey}
* `ciphertext` {ArrayBuffer|TypedArray|DataView|Buffer}
* `sharedKeyAlgorithm` {string|Algorithm|HmacImportParams|AesDerivedKeyParams|KmacImportParams}
* `extractable` {boolean}
* `keyUsages` {string\[]} See Key usages.
* Returns: {Promise} Fulfills with {CryptoKey} upon success.

A message recipient uses their asymmetric private key to decrypt an
"encapsulated key" (ciphertext), thereby recovering a temporary symmetric
key (represented as {CryptoKey}) which is then used to decrypt a message.

The algorithms currently supported include:

* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]
* `'MLKEM768-P256'`[^modern-algos]
* `'MLKEM768-X25519'`[^modern-algos]
* `'MLKEM1024-P384'`[^modern-algos]

### `subtle.decrypt(algorithm, key, data)`

* `algorithm` {RsaOaepParams|AesCtrParams|AesCbcParams|AeadParams}
* `key` {CryptoKey}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* Returns: {Promise} Fulfills with an {ArrayBuffer} upon success.

Using the method and parameters specified in `algorithm` and the keying
material provided by `key`, this method attempts to decipher the
provided `data`. If successful, the returned promise will be resolved with
an {ArrayBuffer} containing the plaintext result.

The algorithms currently supported include:

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'RSA-OAEP'`

### `subtle.deriveBits(algorithm, baseKey[, length])`

* `algorithm` {EcdhKeyDeriveParams|HkdfParams|Pbkdf2Params|Argon2Params}
* `baseKey` {CryptoKey}
* `length` {number|null} **Default:** `null`
* Returns: {Promise} Fulfills with an {ArrayBuffer} upon success.

Using the method and parameters specified in `algorithm` and the keying
material provided by `baseKey`, this method attempts to generate
`length` bits.

When `length` is not provided or `null` the maximum number of bits for a given
algorithm is generated. This is allowed for the `'ECDH'`, `'X25519'`, and `'X448'`[^secure-curves]
algorithms, for other algorithms `length` is required to be a number.

If successful, the returned promise will be resolved with an {ArrayBuffer}
containing the generated data.

The algorithms currently supported include:

* `'Argon2d'`[^modern-algos]
* `'Argon2i'`[^modern-algos]
* `'Argon2id'`[^modern-algos]
* `'ECDH'`
* `'HKDF'`
* `'PBKDF2'`
* `'X25519'`
* `'X448'`[^secure-curves]

### `subtle.deriveKey(algorithm, baseKey, derivedKeyType, extractable, keyUsages)`

* `algorithm` {EcdhKeyDeriveParams|HkdfParams|Pbkdf2Params|Argon2Params}
* `baseKey` {CryptoKey}
* `derivedKeyType` {string|Algorithm|HmacImportParams|AesDerivedKeyParams|KmacImportParams}
* `extractable` {boolean}
* `keyUsages` {string\[]} See Key usages.
* Returns: {Promise} Fulfills with a {CryptoKey} upon success.

Using the method and parameters specified in `algorithm`, and the keying
material provided by `baseKey`, this method attempts to generate
a new {CryptoKey} based on the method and parameters in `derivedKeyType`.

Calling this method is equivalent to calling `subtle.deriveBits()` to
generate raw keying material, then passing the result into the
`subtle.importKey()` method using the `derivedKeyType`, `extractable`, and
`keyUsages` parameters as input.

The algorithms currently supported include:

* `'Argon2d'`[^modern-algos]
* `'Argon2i'`[^modern-algos]
* `'Argon2id'`[^modern-algos]
* `'ECDH'`
* `'HKDF'`
* `'PBKDF2'`
* `'X25519'`
* `'X448'`[^secure-curves]

### `subtle.digest(algorithm, data)`

* `algorithm` {string|Algorithm|CShakeParams|TurboShakeParams|KangarooTwelveParams}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* Returns: {Promise} Fulfills with an {ArrayBuffer} upon success.

Using the method identified by `algorithm`, this method attempts to
generate a digest of `data`. If successful, the returned promise is resolved
with an {ArrayBuffer} containing the computed digest.

If `algorithm` is provided as a {string}, it must be one of:

* `'cSHAKE128'`[^modern-algos]
* `'cSHAKE256'`[^modern-algos]
* `'KT128'`[^modern-algos]
* `'KT256'`[^modern-algos]
* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]
* `'TurboSHAKE128'`[^modern-algos]
* `'TurboSHAKE256'`[^modern-algos]

If `algorithm` is provided as an {Object}, it must have a `name` property
whose value is one of the above.

### `subtle.encapsulateBits(encapsulationAlgorithm, encapsulationKey)`

> Stability: 1.1 - Active development

* `encapsulationAlgorithm` {string|Algorithm}
* `encapsulationKey` {CryptoKey}
* Returns: {Promise} Fulfills with {EncapsulatedBits} upon success.

Uses a message recipient's asymmetric public key to encrypt a temporary symmetric key.
This encrypted key is the "encapsulated key" represented as {EncapsulatedBits}.

The algorithms currently supported include:

* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]
* `'MLKEM768-P256'`[^modern-algos]
* `'MLKEM768-X25519'`[^modern-algos]
* `'MLKEM1024-P384'`[^modern-algos]

### `subtle.encapsulateKey(encapsulationAlgorithm, encapsulationKey, sharedKeyAlgorithm, extractable, keyUsages)`

> Stability: 1.1 - Active development

* `encapsulationAlgorithm` {string|Algorithm}
* `encapsulationKey` {CryptoKey}
* `sharedKeyAlgorithm` {string|Algorithm|HmacImportParams|AesDerivedKeyParams|KmacImportParams}
* `extractable` {boolean}
* `keyUsages` {string\[]} See Key usages.
* Returns: {Promise} Fulfills with {EncapsulatedKey} upon success.

Uses a message recipient's asymmetric public key to encrypt a temporary symmetric key.
This encrypted key is the "encapsulated key" represented as {EncapsulatedKey}.

The algorithms currently supported include:

* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]
* `'MLKEM768-P256'`[^modern-algos]
* `'MLKEM768-X25519'`[^modern-algos]
* `'MLKEM1024-P384'`[^modern-algos]

### `subtle.encrypt(algorithm, key, data)`

* `algorithm` {RsaOaepParams|AesCtrParams|AesCbcParams|AeadParams}
* `key` {CryptoKey}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* Returns: {Promise} Fulfills with an {ArrayBuffer} upon success.

Using the method and parameters specified by `algorithm` and the keying
material provided by `key`, this method attempts to encipher `data`.
If successful, the returned promise is resolved with an {ArrayBuffer}
containing the encrypted result.

The algorithms currently supported include:

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'RSA-OAEP'`

### `subtle.exportKey(format, key)`

* `format` {string} Must be one of `'raw'`, `'pkcs8'`, `'spki'`, `'jwk'`, `'raw-secret'`[^modern-algos],
  `'raw-public'`[^modern-algos], or `'raw-seed'`[^modern-algos].
* `key` {CryptoKey}
* Returns: {Promise} Fulfills with an {ArrayBuffer|Object} upon success.

Exports the given key into the specified format, if supported.

If the {CryptoKey} is not extractable, the returned promise will reject.

When `format` is either `'pkcs8'` or `'spki'` and the export is successful,
the returned promise will be resolved with an {ArrayBuffer} containing the
exported key data.

When `format` is `'jwk'` and the export is successful, the returned promise
will be resolved with a JavaScript object conforming to the JSON Web Key
specification.

See Key formats for the formats supported by each algorithm.

### `subtle.getPublicKey(key, keyUsages)`

> Stability: 1.1 - Active development

* `key` {CryptoKey} A private key from which to derive the corresponding public key.
* `keyUsages` {string\[]} See Key usages.
* Returns: {Promise} Fulfills with a {CryptoKey} upon success.

Derives the public key from a given private key.

### `subtle.generateKey(algorithm, extractable, keyUsages)`

* `algorithm` {string|Algorithm|RsaHashedKeyGenParams|EcKeyGenParams|HmacKeyGenParams|AesKeyGenParams|KmacKeyGenParams}

* `extractable` {boolean}
* `keyUsages` {string\[]} See Key usages.
* Returns: {Promise} Fulfills with a {CryptoKey|CryptoKeyPair} upon success.

Using the parameters provided in `algorithm`, this method
attempts to generate new keying material. Depending on the algorithm used
either a single {CryptoKey} or a {CryptoKeyPair} is generated.

The {CryptoKeyPair} (public and private key) generating algorithms supported
include:

* `'ECDH'`
* `'ECDSA'`
* `'Ed25519'`
* `'Ed448'`[^secure-curves]
* `'ML-DSA-44'`[^modern-algos]
* `'ML-DSA-65'`[^modern-algos]
* `'ML-DSA-87'`[^modern-algos]
* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]
* `'MLKEM768-P256'`[^modern-algos]
* `'MLKEM768-X25519'`[^modern-algos]
* `'MLKEM1024-P384'`[^modern-algos]
* `'RSA-OAEP'`
* `'RSA-PSS'`
* `'RSASSA-PKCS1-v1_5'`
* `'X25519'`
* `'X448'`[^secure-curves]

The {CryptoKey} (secret key) generating algorithms supported include:

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-KW'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'HMAC'`
* `'KMAC128'`[^modern-algos]
* `'KMAC256'`[^modern-algos]

### `subtle.importKey(format, keyData, algorithm, extractable, keyUsages)`

* `format` {string} Must be one of `'raw'`, `'pkcs8'`, `'spki'`, `'jwk'`, `'raw-secret'`[^modern-algos],
  `'raw-public'`[^modern-algos], or `'raw-seed'`[^modern-algos].
* `keyData` {ArrayBuffer|TypedArray|DataView|Buffer|Object}

* `algorithm` {string|Algorithm|RsaHashedImportParams|EcKeyImportParams|HmacImportParams|KmacImportParams}

* `extractable` {boolean}
* `keyUsages` {string\[]} See Key usages.
* Returns: {Promise} Fulfills with a {CryptoKey} upon success.

This method attempts to interpret the provided `keyData`
as the given `format` to create a {CryptoKey} instance using the provided
`algorithm`, `extractable`, and `keyUsages` arguments. If the import is
successful, the returned promise will be resolved with a {CryptoKey}
representation of the key material.

If importing KDF algorithm keys, `extractable` must be `false`.

See Key formats for the algorithms and formats currently supported.

### `subtle.sign(algorithm, key, data)`

* `algorithm` {string|Algorithm|RsaPssParams|EcdsaParams|ContextParams|KmacParams}
* `key` {CryptoKey}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* Returns: {Promise} Fulfills with an {ArrayBuffer} upon success.

Using the method and parameters given by `algorithm` and the keying material
provided by `key`, this method attempts to generate a cryptographic
signature of `data`. If successful, the returned promise is resolved with
an {ArrayBuffer} containing the generated signature.

The algorithms currently supported include:

* `'ECDSA'`
* `'Ed25519'`
* `'Ed448'`[^secure-curves]
* `'HMAC'`
* `'KMAC128'`[^modern-algos]
* `'KMAC256'`[^modern-algos]
* `'ML-DSA-44'`[^modern-algos]
* `'ML-DSA-65'`[^modern-algos]
* `'ML-DSA-87'`[^modern-algos]
* `'RSA-PSS'`
* `'RSASSA-PKCS1-v1_5'`
