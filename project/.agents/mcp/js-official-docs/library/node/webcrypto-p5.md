---
title: "Web Crypto API (part 5 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webcrypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Crypto API (part 5 of 6)

## Algorithm parameters

The algorithm parameter objects define the methods and parameters used by
the various {SubtleCrypto} methods. While described here as "classes", they
are simple JavaScript dictionary objects.

### Class: `Algorithm`

#### `Algorithm.name`

* Type: {string}

### Class: `AeadParams`

#### `aeadParams.additionalData`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer|undefined}

Extra input that is not encrypted but is included in the authentication
of the data. The use of `additionalData` is optional.

#### `aeadParams.iv`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

The initialization vector must be unique for every encryption operation using a
given key.

#### `aeadParams.name`

* Type: {string} Must be `'AES-GCM'`, `'AES-OCB'`, or `'ChaCha20-Poly1305'`.

#### `aeadParams.tagLength`

* Type: {number} The size in bits of the generated authentication tag.

### Class: `AesDerivedKeyParams`

#### `aesDerivedKeyParams.name`

* Type: {string} Must be one of `'AES-CBC'`, `'AES-CTR'`, `'AES-GCM'`, `'AES-OCB'`, or `'AES-KW'`

#### `aesDerivedKeyParams.length`

* Type: {number}

The length of the AES key to be derived. This must be either `128`, `192`,
or `256`.

### Class: `AesCbcParams`

#### `aesCbcParams.iv`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

Provides the initialization vector. It must be exactly 16-bytes in length
and should be unpredictable and cryptographically random.

#### `aesCbcParams.name`

* Type: {string} Must be `'AES-CBC'`.

### Class: `AesCtrParams`

#### `aesCtrParams.counter`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

The initial value of the counter block. This must be exactly 16 bytes long.

The `AES-CTR` method uses the rightmost `length` bits of the block as the
counter and the remaining bits as the nonce.

#### `aesCtrParams.length`

* Type: {number} The number of bits in the `aesCtrParams.counter` that are
  to be used as the counter.

#### `aesCtrParams.name`

* Type: {string} Must be `'AES-CTR'`.

### Class: `AesKeyAlgorithm`

#### `aesKeyAlgorithm.length`

* Type: {number}

The length of the AES key in bits.

#### `aesKeyAlgorithm.name`

* Type: {string}

### Class: `AesKeyGenParams`

#### `aesKeyGenParams.length`

* Type: {number}

The length of the AES key to be generated. This must be either `128`, `192`,
or `256`.

#### `aesKeyGenParams.name`

* Type: {string} Must be one of `'AES-CBC'`, `'AES-CTR'`, `'AES-GCM'`, or
  `'AES-KW'`

### Class: `Argon2Params`

#### `argon2Params.associatedData`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

Represents the optional associated data.

#### `argon2Params.memory`

* Type: {number}

Represents the memory size in kibibytes. It must be at least 8 times the degree of parallelism.

#### `argon2Params.name`

* Type: {string} Must be one of `'Argon2d'`, `'Argon2i'`, or `'Argon2id'`.

#### `argon2Params.nonce`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

Represents the nonce, which is a salt for password <example-value> applications.

#### `argon2Params.parallelism`

* Type: {number}

Represents the degree of parallelism.

#### `argon2Params.passes`

* Type: {number}

Represents the number of passes.

#### `argon2Params.secretValue`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

Represents the optional secret value.

#### `argon2Params.version`

* Type: {number}

Represents the Argon2 version number. The default and currently only defined version is `19` (`0x13`).

### Class: `ContextParams`

#### `contextParams.name`

* Type: {string} Must be `'Ed448'`[^secure-curves], `'ML-DSA-44'`[^modern-algos],
  `'ML-DSA-65'`[^modern-algos], or `'ML-DSA-87'`[^modern-algos].

#### `contextParams.context`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer|undefined}

The `context` member represents the optional context data to associate with
the message.

### Class: `CShakeParams`

When both `functionName` and `customization` are empty or `undefined`, cSHAKE is
equivalent to plain SHAKE.

#### `cShakeParams.name`

* Type: {string} Must be `'cSHAKE128'`[^modern-algos] or `'cSHAKE256'`[^modern-algos].

#### `cShakeParams.outputLength`

* Type: {number} represents the requested output length in bits. Must be a
  multiple of 8.

#### `cShakeParams.functionName`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer|undefined}

The `functionName` member represents the NIST function-name byte string used to
domain-separate functions built on top of cSHAKE. Non-empty values require
OpenSSL 4.0 or later. Accepted values are:

* empty or `undefined`
* the ASCII byte sequence `'KMAC'`
* the ASCII byte sequence `'TupleHash'`
* the ASCII byte sequence `'ParallelHash'`

#### `cShakeParams.customization`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer|undefined}

The `customization` member represents the customization data. Non-empty values
require OpenSSL 4.0 or later. Accepted values are:

* empty or `undefined`
* up to 512 bytes of data without null bytes

### Class: `EcdhKeyDeriveParams`

#### `ecdhKeyDeriveParams.name`

* Type: {string} Must be `'ECDH'`, `'X25519'`, or `'X448'`[^secure-curves].

#### `ecdhKeyDeriveParams.public`

* Type: {CryptoKey}

ECDH key <example-value> operates by taking as input one party's private key and
another party's public key -- using both to generate a common shared secret.
The `ecdhKeyDeriveParams.public` property is set to the other party's public
key.

### Class: `EcdsaParams`

#### `ecdsaParams.hash`

* Type: {string|Algorithm}

If represented as a {string}, the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

If represented as an {Algorithm}, the object's `name` property
must be one of the above listed values.

#### `ecdsaParams.name`

* Type: {string} Must be `'ECDSA'`.

### Class: `EcKeyAlgorithm`

#### `ecKeyAlgorithm.name`

* Type: {string}

#### `ecKeyAlgorithm.namedCurve`

* Type: {string}

### Class: `EcKeyGenParams`

#### `ecKeyGenParams.name`

* Type: {string} Must be one of `'ECDSA'` or `'ECDH'`.

#### `ecKeyGenParams.namedCurve`

* Type: {string} Must be one of `'P-256'`, `'P-384'`, `'P-521'`.

### Class: `EcKeyImportParams`

#### `ecKeyImportParams.name`

* Type: {string} Must be one of `'ECDSA'` or `'ECDH'`.

#### `ecKeyImportParams.namedCurve`

* Type: {string} Must be one of `'P-256'`, `'P-384'`, `'P-521'`.

### Class: `EncapsulatedBits`

A temporary symmetric secret key (represented as {ArrayBuffer}) for message encryption
and the ciphertext (that can be transmitted to the message recipient along with the
message) encrypted by this shared key. The recipient uses their private key to determine
what the shared key is which then allows them to decrypt the message.

#### `encapsulatedBits.ciphertext`

* Type: {ArrayBuffer}

#### `encapsulatedBits.sharedKey`

* Type: {ArrayBuffer}

### Class: `EncapsulatedKey`

A temporary symmetric secret key (represented as {CryptoKey}) for message encryption
and the ciphertext (that can be transmitted to the message recipient along with the
message) encrypted by this shared key. The recipient uses their private key to determine
what the shared key is which then allows them to decrypt the message.

#### `encapsulatedKey.ciphertext`

* Type: {ArrayBuffer}

#### `encapsulatedKey.sharedKey`

* Type: {CryptoKey}

### Class: `HkdfParams`

#### `hkdfParams.hash`

* Type: {string|Algorithm}

If represented as a {string}, the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

If represented as an {Algorithm}, the object's `name` property
must be one of the above listed values.

#### `hkdfParams.info`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

Provides application-specific contextual input to the HKDF algorithm.
This can be zero-length but must be provided.

#### `hkdfParams.name`

* Type: {string} Must be `'HKDF'`.

#### `hkdfParams.salt`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

The salt value significantly improves the strength of the HKDF algorithm.
It should be random or pseudorandom and should be the same length as the
output of the digest function (for instance, if using `'SHA-256'` as the
digest, the salt should be 256-bits of random data).

### Class: `HmacImportParams`

#### `hmacImportParams.hash`

* Type: {string|Algorithm}

If represented as a {string}, the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

If represented as an {Algorithm}, the object's `name` property
must be one of the above listed values.

#### `hmacImportParams.length`

* Type: {number}

The optional number of bits in the HMAC key. This is optional and should
be omitted for most cases.

#### `hmacImportParams.name`

* Type: {string} Must be `'HMAC'`.

### Class: `HmacKeyAlgorithm`

#### `hmacKeyAlgorithm.hash`

* Type: {Algorithm}

#### `hmacKeyAlgorithm.length`

* Type: {number}

The length of the HMAC key in bits.

#### `hmacKeyAlgorithm.name`

* Type: {string}

### Class: `HmacKeyGenParams`

#### `hmacKeyGenParams.hash`

* Type: {string|Algorithm}

If represented as a {string}, the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

If represented as an {Algorithm}, the object's `name` property
must be one of the above listed values.

#### `hmacKeyGenParams.length`

* Type: {number}

The number of bits to generate for the HMAC key. If omitted,
the length will be determined by the hash algorithm used.
This is optional and should be omitted for most cases.

#### `hmacKeyGenParams.name`

* Type: {string} Must be `'HMAC'`.

### Class: `KeyAlgorithm`

#### `keyAlgorithm.name`

* Type: {string}

### Class: `KangarooTwelveParams`

#### `kangarooTwelveParams.customization`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer|undefined}

The optional customization string for KangarooTwelve. It must not exceed 512
bytes.

#### `kangarooTwelveParams.name`

* Type: {string} Must be `'KT128'`[^modern-algos] or `'KT256'`[^modern-algos].

#### `kangarooTwelveParams.outputLength`

* Type: {number} represents the requested output length in bits.

### Class: `KmacImportParams`

#### `kmacImportParams.length`

* Type: {number}

The optional number of bits in the KMAC key. This is optional and should
be omitted for most cases. The key <example-value> must be at least 32 and a multiple of 8.

#### `kmacImportParams.name`

* Type: {string} Must be `'KMAC128'` or `'KMAC256'`.

### Class: `KmacKeyAlgorithm`

#### `kmacKeyAlgorithm.length`

* Type: {number}

The length of the KMAC key in bits.

#### `kmacKeyAlgorithm.name`

* Type: {string}

### Class: `KmacKeyGenParams`

#### `kmacKeyGenParams.length`

* Type: {number}

The number of bits to generate for the KMAC key. If omitted,
the length will be determined by the KMAC algorithm used.
This is optional and should be omitted for most cases. Must be at least 32 and a
multiple of 8.

#### `kmacKeyGenParams.name`

* Type: {string} Must be `'KMAC128'` or `'KMAC256'`.

### Class: `KmacParams`

#### `kmacParams.algorithm`

* Type: {string} Must be `'KMAC128'` or `'KMAC256'`.

#### `kmacParams.outputLength`

* Type: {number} represents the requested output length in bits. Must be a
  multiple of 8.

#### `kmacParams.customization`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer|undefined}

The `customization` member represents the optional customization string.

### Class: `Pbkdf2Params`

#### `pbkdf2Params.hash`

* Type: {string|Algorithm}

If represented as a {string}, the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

If represented as an {Algorithm}, the object's `name` property
must be one of the above listed values.

#### `pbkdf2Params.iterations`

* Type: {number}

The number of iterations the PBKDF2 algorithm should make when deriving bits.

#### `pbkdf2Params.name`

* Type: {string} Must be `'PBKDF2'`.

#### `pbkdf2Params.salt`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

Should be at least 16 random or pseudorandom bytes.

### Class: `RsaHashedImportParams`

#### `rsaHashedImportParams.hash`

* Type: {string|Algorithm}

If represented as a {string}, the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

If represented as an {Algorithm}, the object's `name` property
must be one of the above listed values.

#### `rsaHashedImportParams.name`

* Type: {string} Must be one of `'RSASSA-PKCS1-v1_5'`, `'RSA-PSS'`, or
  `'RSA-OAEP'`.

### Class: `RsaHashedKeyAlgorithm`

#### `rsaHashedKeyAlgorithm.hash`

* Type: {Algorithm}

#### `rsaHashedKeyAlgorithm.modulusLength`

* Type: {number}

The length in bits of the RSA modulus.

#### `rsaHashedKeyAlgorithm.name`

* Type: {string}

#### `rsaHashedKeyAlgorithm.publicExponent`

* Type: {Uint8Array}

The RSA public exponent.

### Class: `RsaHashedKeyGenParams`

#### `rsaHashedKeyGenParams.hash`

* Type: {string|Algorithm}

If represented as a {string}, the value must be one of:

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

If represented as an {Algorithm}, the object's `name` property
must be one of the above listed values.

#### `rsaHashedKeyGenParams.modulusLength`

* Type: {number}

The length in bits of the RSA modulus. As a best practice, this should be
at least `2048`.

#### `rsaHashedKeyGenParams.name`

* Type: {string} Must be one of `'RSASSA-PKCS1-v1_5'`, `'RSA-PSS'`, or
  `'RSA-OAEP'`.

#### `rsaHashedKeyGenParams.publicExponent`

* Type: {Uint8Array}

The RSA public exponent. This must be a {Uint8Array} containing a big-endian,
unsigned integer that must fit within 32-bits. The {Uint8Array} may contain an
arbitrary number of leading zero-bits. The value must be a prime number. Unless
there is reason to use a different value, use `new Uint8Array([1, 0, 1])`
(65537) as the public exponent.

### Class: `RsaOaepParams`

#### `rsaOaepParams.label`

* Type: {ArrayBuffer|TypedArray|DataView|Buffer}

An additional collection of bytes that will not be encrypted, but will be bound
to the generated ciphertext.

The `rsaOaepParams.label` parameter is optional.

#### `rsaOaepParams.name`

* Type: {string} must be `'RSA-OAEP'`.

### Class: `RsaPssParams`

#### `rsaPssParams.name`

* Type: {string} Must be `'RSA-PSS'`.

#### `rsaPssParams.saltLength`

* Type: {number}

The length (in bytes) of the random salt to use.
