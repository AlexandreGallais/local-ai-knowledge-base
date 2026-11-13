---
title: "RsaHashedImportParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rsahashedimportparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RsaHashedImportParams

The **`RsaHashedImportParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.importKey()` or `SubtleCrypto.unwrapKey()`, when importing any RSA-based key pair: that is, when the algorithm is identified as any of RSASSA-PKCS1-v1_5, RSA-PSS, or RSA-OAEP.

## Instance properties

- `name`
    A string. This should be set to `RSASSA-PKCS1-v1_5`, `RSA-PSS`, or `RSA-OAEP`, depending on the algorithm you want to use.
- `hash`
    A string or an object containing a single property called `name` with a string value. It is an identifier for the digest algorithm to use. This should be one of the following:
    - `SHA-256`: selects the SHA-256 algorithm.
    - `SHA-384`: selects the SHA-384 algorithm.
    - `SHA-512`: selects the SHA-512 algorithm.

    > **Warning:**
    > `SHA-1` is also supported here but the SHA-1 algorithm is considered vulnerable and should no longer be used.

## Examples

See the examples for `SubtleCrypto.importKey()`.

## Browser compatibility

Browsers that support any RSA-based algorithm for the `SubtleCrypto.importKey()` or `SubtleCrypto.unwrapKey()` methods will support this type.

## See also

- `SubtleCrypto.importKey()`.
- `SubtleCrypto.unwrapKey()`.
