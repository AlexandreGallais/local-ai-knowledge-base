---
title: "Web Crypto API (part 4 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webcrypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Crypto API (part 4 of 6)

### `subtle.unwrapKey(format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages)`

* `format` {string} Must be one of `'raw'`, `'pkcs8'`, `'spki'`, `'jwk'`, `'raw-secret'`[^modern-algos],
  `'raw-public'`[^modern-algos], or `'raw-seed'`[^modern-algos].
* `wrappedKey` {ArrayBuffer|TypedArray|DataView|Buffer}
* `unwrappingKey` {CryptoKey}

* `unwrapAlgorithm` {string|Algorithm|RsaOaepParams|AesCtrParams|AesCbcParams|AeadParams}
* `unwrappedKeyAlgorithm` {string|Algorithm|RsaHashedImportParams|EcKeyImportParams|HmacImportParams|KmacImportParams}

* `extractable` {boolean}
* `keyUsages` {string\[]} See Key usages.
* Returns: {Promise} Fulfills with a {CryptoKey} upon success.

In cryptography, "wrapping a key" refers to exporting and then encrypting the
keying material. This method attempts to decrypt a wrapped
key and create a {CryptoKey} instance. It is equivalent to calling
`subtle.decrypt()` first on the encrypted key data (using the `wrappedKey`,
`unwrapAlgorithm`, and `unwrappingKey` arguments as input) then passing the results
to the `subtle.importKey()` method using the `unwrappedKeyAlgorithm`,
`extractable`, and `keyUsages` arguments as inputs. If successful, the returned
promise is resolved with a {CryptoKey} object.

The wrapping algorithms currently supported include:

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-KW'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'RSA-OAEP'`

The unwrapped key algorithms supported include:

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-KW'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'ECDH'`
* `'ECDSA'`
* `'Ed25519'`
* `'Ed448'`[^secure-curves]
* `'HMAC'`
* `'KMAC128'`[^modern-algos]
* `'KMAC256'`[^modern-algos]
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

### `subtle.verify(algorithm, key, signature, data)`

* `algorithm` {string|Algorithm|RsaPssParams|EcdsaParams|ContextParams|KmacParams}
* `key` {CryptoKey}
* `signature` {ArrayBuffer|TypedArray|DataView|Buffer}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* Returns: {Promise} Fulfills with a {boolean} upon success.

Using the method and parameters given in `algorithm` and the keying material
provided by `key`, this method attempts to verify that `signature` is
a valid cryptographic signature of `data`. The returned promise is resolved
with either `true` or `false`.

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

### `subtle.wrapKey(format, key, wrappingKey, wrapAlgorithm)`

* `format` {string} Must be one of `'raw'`, `'pkcs8'`, `'spki'`, `'jwk'`, `'raw-secret'`[^modern-algos],
  `'raw-public'`[^modern-algos], or `'raw-seed'`[^modern-algos].
* `key` {CryptoKey}
* `wrappingKey` {CryptoKey}
* `wrapAlgorithm` {string|Algorithm|RsaOaepParams|AesCtrParams|AesCbcParams|AeadParams}
* Returns: {Promise} Fulfills with an {ArrayBuffer} upon success.

In cryptography, "wrapping a key" refers to exporting and then encrypting the
keying material. This method exports the keying material into
the format identified by `format`, then encrypts it using the method and
parameters specified by `wrapAlgorithm` and the keying material provided by
`wrappingKey`. It is the equivalent to calling `subtle.exportKey()` using
`format` and `key` as the arguments, then passing the result to the
`subtle.encrypt()` method using `wrappingKey` and `wrapAlgorithm` as inputs. If
successful, the returned promise will be resolved with an {ArrayBuffer}
containing the encrypted key data.

The wrapping algorithms currently supported include:

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-KW'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'RSA-OAEP'`
