---
title: "SubtleCrypto: unwrapKey() method (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subtlecrypto/unwrapkey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubtleCrypto: unwrapKey() method

The **`unwrapKey()`** method of the `SubtleCrypto` interface "unwraps" a key.
This means that it takes as its input a key that has been exported and then encrypted (also called "wrapped").
It decrypts the key and then imports it, returning a `CryptoKey` object that can be used in the Web Crypto API.

As with `SubtleCrypto.importKey()`, you specify the key's import format and other attributes of the key to import details such as whether it is extractable, and which operations it can be used for.

But because `unwrapKey()` also decrypts the key to be imported, you also need to pass in the key that must be used to decrypt it.
This is sometimes called the "unwrapping key".

The inverse of `unwrapKey()` is `SubtleCrypto.wrapKey()`: while `unwrapKey` is composed of decrypt + import, `wrapKey` is composed of encrypt + export.

## Syntax

```js
unwrapKey(format, wrappedKey, unwrappingKey, unwrapAlgo, unwrappedKeyAlgo, extractable, keyUsages)
```

### Parameters

- `format`
    A string describing the data format of the key to unwrap. It can be one of the following:
    - `raw`: Raw format.
    - `pkcs8`: PKCS #8 format.
    - `spki`: SubjectPublicKeyInfo format.
    - `jwk`: JSON Web Key format.
- `wrappedKey`
    An `ArrayBuffer` containing the wrapped key in the given format.
- `unwrappingKey`
    The `CryptoKey` to use to decrypt the wrapped key. The key must have the `unwrapKey` usage set.
- `unwrapAlgo`
    An object specifying the algorithm
    to be used to decrypt the wrapped key, and any extra parameters as required:
    - To use RSA-OAEP,
      pass an `RsaOaepParams` object.
    - To use AES-CTR,
      pass an `AesCtrParams` object.
    - To use AES-CBC,
      pass an `AesCbcParams` object.
    - To use AES-GCM,
      pass an `AesGcmParams` object.
    - To use AES-KW,
      pass the string `"AES-KW"` or an object of the form `{ "name": "AES-KW }`.
- `unwrappedKeyAlgo`
    An object defining the type of key to unwrap and providing extra algorithm-specific parameters as required.
    - For RSASSA-PKCS1-v1_5, RSA-PSS,
      or RSA-OAEP:
      Pass an `RsaHashedImportParams` object.
    - For ECDSA or ECDH: Pass
      an `EcKeyImportParams` object.
    - For HMAC: Pass an
      `HmacImportParams` object.
    - For AES-CTR, AES-CBC,
      AES-GCM, or AES-KW:
      Pass the string identifying the algorithm or an object of the form `{ "name": ALGORITHM }`, where `ALGORITHM` is the name of the algorithm.
    - For Ed25519: Pass an object of the form `{ "name": "Ed25519" }`.
    - For X25519: Pass an object of the form: `{name: 'X25519'}`.
- `extractable`
    A boolean indicating whether it will be possible to export the key
    using `SubtleCrypto.exportKey()` or `SubtleCrypto.wrapKey()`.
- `keyUsages`
    An `Array` indicating what can be done with the key. Possible values of the array are:
    - `encrypt`: The key may be used to encrypt messages.
    - `decrypt`: The key may be used to decrypt messages.
    - `sign`: The key may be used to sign messages.
    - `verify`: The key may be used to verify signatures.
    - `deriveKey`: The key may be used in deriving a new key.
    - `deriveBits`: The key may be used in deriving bits.
    - `wrapKey`: The key may be used to wrap a key.
    - `unwrapKey`: The key may be used to unwrap a key.

### Return value

A `Promise` that fulfills with the unwrapped key as a `CryptoKey` object.

### Exceptions

The promise is rejected when one of the following exceptions is encountered:

- `InvalidAccessError` `DOMException`
    Raised when the unwrapping key is not a key for the requested unwrap algorithm or if the `keyUsages` value of that key doesn't contain `unwrap`.
- `NotSupportedError` `DOMException`
    Raised when trying to use an algorithm that is either unknown or isn't suitable for encryption or wrapping.
- `SyntaxError` `DOMException`
    Raised when `keyUsages` is empty but the unwrapped key is of type `secret` or `private`.
- `TypeError`
    Raised when trying to use an invalid format.

## Supported algorithms

The `unwrapKey()` method supports the same algorithms as the `wrapKey()` method.
