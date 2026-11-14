---
title: "EcdhKeyDeriveParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ecdhkeyderiveparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EcdhKeyDeriveParams

The **`EcdhKeyDeriveParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.deriveKey()` and `SubtleCrypto.deriveBits()`, when using the ECDH or X25519 algorithms.

ECDH enables two people who each have a key pair consisting of a public and a private key to derive a shared secret. They exchange public keys and use the combination of their private key and the other entity's public key to derive a secret key that they — and no one else — share.

The parameters for ECDH `deriveKey()` therefore include the other entity'<example-value>'s private key to derive the shared secret.

## Instance properties

- `name`
    A string.
    This should be set to `ECDH` or `X25519`, depending on the algorithm used.
- `public`
    A `CryptoKey` object representing the public key of the other entity.

## Examples

See the examples for `SubtleCrypto.deriveKey()` and `SubtleCrypto.deriveBits()`.

## Browser compatibility

Browsers that support the "ECDH" or "X25519" algorithm for the `SubtleCrypto.deriveKey()` method will support this type.

## See also

- `SubtleCrypto.deriveKey()`.
- `SubtleCrypto.deriveBits()`
