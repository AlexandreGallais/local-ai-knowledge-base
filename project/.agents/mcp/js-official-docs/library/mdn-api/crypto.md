---
title: "Crypto"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/crypto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Crypto

The **`Crypto`** interface represents basic <example-value> features available in the current context.
It allows access to a cryptographically strong random number generator and to cryptographic primitives.

The `Crypto` is available in windows using the `Window.crypto` property and in workers using the `WorkerGlobalScope.crypto` property.

## Instance properties

- `Crypto.subtle` (read-only) (secure context)
    Returns a `SubtleCrypto` object providing access to common cryptographic primitives, like hashing, signing, encryption, or decryption.

## Instance methods

- `Crypto.getRandomValues()`
    Fills the passed `TypedArray` with cryptographically sound random values.
- `Crypto.randomUUID()` (secure context)
    Returns a randomly generated, 36 character long v4 UUID.

## See also

- Web security
- Secure contexts
- Features restricted to secure contexts
- Transport Layer Security
- Strict-Transport-Security
