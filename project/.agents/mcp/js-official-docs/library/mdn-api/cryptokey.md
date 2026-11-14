---
title: "CryptoKey"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cryptokey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CryptoKey

The **`CryptoKey`** interface of the Web Crypto API represents a cryptographic key <example-value> from one of the `SubtleCrypto` methods `generateKey()`, `deriveKey()`, `importKey()`, or `unwrapKey()`.

For security reasons, the `CryptoKey` interface can only be used in a secure context.

## Instance properties

- `CryptoKey.type` (read-only)
    The type of key the object represents. It may take one of the following values: `"<example-value>"`, `"<example-value>"` or `"<example-value>"`.

- `CryptoKey.extractable` (read-only)
    A boolean value indicating whether or not the key may be extracted using `SubtleCrypto.exportKey()` or `SubtleCrypto.wrapKey()`.

- `CryptoKey.algorithm` (read-only)
    An object describing the algorithm for which this key can be used and any associated extra parameters.

- `CryptoKey.usages` (read-only)
    An `Array` of strings, indicating what can be done with the key. Possible values for array elements are `"encrypt"`, `"decrypt"`, `"sign"`, `"verify"`, `"deriveKey"`, `"deriveBits"`, `"wrapKey"`, and `"unwrapKey"`.

## Examples

The examples for `SubtleCrypto` methods often use `CryptoKey` objects. For example:

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

- Web Crypto API
- Web security
- Privacy, permissions, and information security
- `Crypto` and `Crypto.subtle`.
