---
title: "AesCbcParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/aescbcparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AesCbcParams

The **`AesCbcParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.encrypt()`, `SubtleCrypto.decrypt()`, `SubtleCrypto.wrapKey()`, or `SubtleCrypto.unwrapKey()`, when using the AES-CBC algorithm.

## Instance properties

- `name`
    A string. This should be set to `AES-CBC`.
- `iv`
    An `ArrayBuffer`, a `TypedArray`, or a `DataView`. The initialization vector. Must be 16 bytes, unpredictable, and preferably cryptographically random. However, it need not be secret (for example, it may be transmitted unencrypted along with the ciphertext).

## Examples

See the examples for `SubtleCrypto.encrypt()` and `SubtleCrypto.decrypt()`.

## Browser compatibility

Browsers that support the "AES-CBC" algorithm for the `SubtleCrypto.encrypt()`, `SubtleCrypto.decrypt()`, `SubtleCrypto.wrapKey()`, or `SubtleCrypto.unwrapKey()` methods will support this type.

## See also

- CBC mode is defined in section 6.2 of the NIST SP800-38A standard.
- `SubtleCrypto.encrypt()`.
- `SubtleCrypto.decrypt()`.
- `SubtleCrypto.wrapKey()`.
- `SubtleCrypto.unwrapKey()`.
