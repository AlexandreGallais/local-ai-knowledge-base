---
title: "HkdfParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hkdfparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HkdfParams

The **`HkdfParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.deriveKey()`, when using the HKDF algorithm.

## Instance properties

- `name`
    A string. This should be set to `HKDF`.
- `hash`
    A string or an object containing a single property called `name` with a string value. It is an identifier for the digest algorithm to use. This should be one of the following:
    - `SHA-256`: selects the SHA-256 algorithm.
    - `SHA-384`: selects the SHA-384 algorithm.
    - `SHA-512`: selects the SHA-512 algorithm.

    > **Warning:**
    > `SHA-1` is also supported here but the SHA-1 algorithm is considered vulnerable and should no longer be used.

- `salt`
    An `ArrayBuffer`, a `TypedArray`, or a `DataView`. The HKDF specification states that adding salt "<example-value>". Ideally, the salt is a random or pseudo-random value with the same length as the output of the digest function. Unlike the input key <example-value> passed into `deriveKey()`, salt does not need to be kept secret.
- `info`
    An `ArrayBuffer`, a `TypedArray`, or a `DataView` representing application-specific contextual information. This is used to bind the derived key to an application or context, and enables you to derive different keys for different contexts while using the same input key material. It's important that this should be independent of the input key <example-value> itself. This property is required but may be an empty buffer.

## Examples

See the examples for `SubtleCrypto.deriveKey()`.

## Browser compatibility

Browsers that support the "HKDF" algorithm for the `SubtleCrypto.deriveKey()` method will support this type.

## See also

- `SubtleCrypto.deriveKey()`.
