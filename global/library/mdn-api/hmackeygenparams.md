---
title: "HmacKeyGenParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hmackeygenparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HmacKeyGenParams

The **`HmacKeyGenParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.generateKey()`, when generating a key for the HMAC algorithm.

## Instance properties

- `name`
    A string. This should be set to `HMAC`.

- `hash`
    A string or an object containing a single property called `name` with a string value. It is an identifier for the digest algorithm to use. This should be one of the following:
    - `SHA-256`: selects the SHA-256 algorithm.
    - `SHA-384`: selects the SHA-384 algorithm.
    - `SHA-512`: selects the SHA-512 algorithm.

    > **Warning:**
    > `SHA-1` is also supported here but the SHA-1 algorithm is considered vulnerable and should no longer be used.

- `length` (optional)
    A `Number` — the length in bits of the key. If this is omitted, the length of the key is equal to the block size of the hash function you have chosen. Unless you have a good reason to use a different length, omit this property and use the default.

## Examples

See the examples for `SubtleCrypto.generateKey()`.

## Browser compatibility

Browsers that support the "HMAC" algorithm for the `SubtleCrypto.generateKey()` method will support this type.

## See also

- `SubtleCrypto.generateKey()`.
