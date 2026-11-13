---
title: "AesKeyGenParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/aeskeygenparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AesKeyGenParams

The **`AesKeyGenParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.generateKey()`, when generating an AES key: that is, when the algorithm is identified as any of AES-CBC, AES-CTR, AES-GCM, or AES-KW.

## Instance properties

- `name`
    A string. This should be set to `AES-CBC`, `AES-CTR`, `AES-GCM`, or `AES-KW`, depending on the algorithm you want to use.
- `length`
    A `Number` — the length in bits of the key to generate. This must be one of: 128, 192, or 256.

## Examples

See the examples for `SubtleCrypto.generateKey()`.

## Browser compatibility

Browsers that support any of the AES-based algorithms for the `SubtleCrypto.generateKey()` method will support this type.

## See also

- `SubtleCrypto.generateKey()`.
