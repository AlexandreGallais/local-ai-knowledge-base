---
title: "RsaOaepParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rsaoaepparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RsaOaepParams

The **`RsaOaepParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.encrypt()`, `SubtleCrypto.decrypt()`, `SubtleCrypto.wrapKey()`, or `SubtleCrypto.unwrapKey()`, when using the RSA_OAEP algorithm.

## Instance properties

- `name`
    A string. This should be set to `RSA-OAEP`.
- `label` (optional)
    An `ArrayBuffer`, a `TypedArray`, or a `DataView` — an array of bytes that does not itself need to be encrypted but which should be bound to the ciphertext. A digest of the label is part of the input to the encryption operation.

    Unless your application calls for a label, you can just omit this argument and it will not affect the security of the encryption operation.

## Examples

See the examples for `SubtleCrypto.encrypt()` and `SubtleCrypto.decrypt()`.

## Browser compatibility

Browsers that support the "RSA-OAEP" algorithm for the `SubtleCrypto.encrypt()`, `SubtleCrypto.decrypt()`, `SubtleCrypto.wrapKey()`, or `SubtleCrypto.unwrapKey()` methods will support this type.

## See also

- `SubtleCrypto.encrypt()`.
- `SubtleCrypto.decrypt()`.
- `SubtleCrypto.wrapKey()`.
- `SubtleCrypto.unwrapKey()`.
