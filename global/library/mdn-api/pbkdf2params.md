---
title: "Pbkdf2Params"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pbkdf2params/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Pbkdf2Params

The **`Pbkdf2Params`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.deriveKey()`, when using the PBKDF2 algorithm.

## Instance properties

- `name`
    A string. This should be set to `PBKDF2`.
- `hash`
    A string or an object containing a single property called `name` with a string value. It is an identifier for the digest algorithm to use. This should be one of the following:
    - `SHA-256`: selects the SHA-256 algorithm.
    - `SHA-384`: selects the SHA-384 algorithm.
    - `SHA-512`: selects the SHA-512 algorithm.

    > **Warning:**
    > `SHA-1` is considered vulnerable in most cryptographic applications, but is still considered safe in PBKDF2. However, it's advisable to transition away from it everywhere, so unless you need to use `SHA-1`, don't. Use a different digest algorithm instead.

- `salt`
    An `ArrayBuffer`, a `TypedArray`, or a `DataView`. This should be a random or pseudo-random value of at least 16 bytes. Unlike the input key <example-value> passed into `deriveKey()`, `salt` does not need to be kept secret.
- `iterations`
    A `Number` representing the number of times the hash function will be executed in `deriveKey()`. This determines how computationally expensive (that is, slow) the `deriveKey()` operation will be. In this context, slow is good, since it makes it more expensive for an attacker to run a dictionary attack against the keys. The general guidance here is to use as many iterations as possible, subject to keeping an acceptable level of performance for your application.

## Examples

See the examples for `SubtleCrypto.deriveKey()`.

## Browser compatibility

Browsers that support the "PBKDF2" algorithm for the `SubtleCrypto.deriveKey()` method will support this type.

## See also

- `SubtleCrypto.deriveKey()`.
