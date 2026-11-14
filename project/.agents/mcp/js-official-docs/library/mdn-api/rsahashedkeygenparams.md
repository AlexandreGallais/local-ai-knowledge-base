---
title: "RsaHashedKeyGenParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rsahashedkeygenparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RsaHashedKeyGenParams

The **`RsaHashedKeyGenParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.generateKey()`, when generating any RSA-based key pair: that is, when the algorithm is identified as any of RSASSA-PKCS1-v1_5, RSA-PSS, or RSA-OAEP.

## Instance properties

- `name`
    A string. This should be set to `RSASSA-PKCS1-v1_5`, `RSA-PSS`, or `RSA-OAEP`, depending on the algorithm you want to use.
- `modulusLength`
    A `Number`. The length in bits of the RSA modulus. This should be at least 2048: see for example see SP 800-131A Rev. 2. Some organizations are now recommending that it should be 4096.
- `publicExponent`
    A `Uint8Array`. The public exponent. Unless you have a good reason to use something else, specify 65537 here (`[0x01, 0x00, 0x01]`).
- `hash`
    A string or an object containing a single property called `name` with a string value. It is an identifier for the digest algorithm to use. This should be one of the following:
    - `SHA-256`: selects the SHA-256 algorithm.
    - `SHA-384`: selects the SHA-384 algorithm.
    - `SHA-512`: selects the SHA-512 algorithm.

    > **Warning:**
    > `SHA-1` is also supported here but the SHA-1 algorithm is considered vulnerable and should no longer be used.

## Examples

See the examples for `SubtleCrypto.generateKey()`.

## Browser compatibility

Browsers that support any RSA-based algorithm for the `SubtleCrypto.generateKey()` method will support this type.

## See also

- `SubtleCrypto.generateKey()`.
