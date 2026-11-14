---
title: "EcKeyImportParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eckeyimportparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EcKeyImportParams

The **`EcKeyImportParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.importKey()` or `SubtleCrypto.unwrapKey()`, when generating any elliptic-curve-based key pair: that is, when the algorithm is identified as either of ECDSA or ECDH.

## Instance properties

- `name`
    A string. This should be set to `ECDSA` or `ECDH`, depending on the algorithm you want to use.
- `namedCurve`
    A string representing the name of the elliptic curve to use. This may be any of the following names for NIST-approved curves:
    - `P-256`
    - `P-384`
    - `P-521`

## Examples

See the examples for `SubtleCrypto.importKey()`.

## Browser compatibility

Browsers that support the "ECDH" or "ECDSA" algorithms for the `SubtleCrypto.importKey()` or `SubtleCrypto.wrapKey()` methods will support this type.

## See also

- `SubtleCrypto.importKey()`.
- `SubtleCrypto.unwrapKey()`.
