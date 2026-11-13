---
title: "RsaPssParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rsapssparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RsaPssParams

The **`RsaPssParams`** dictionary of the Web Crypto API represents the object that should be passed as the `algorithm` parameter into `SubtleCrypto.sign()` or `SubtleCrypto.verify()`, when using the RSA-PSS algorithm.

## Instance properties

- `name`
    A string. This should be set to `RSA-PSS`.
- `saltLength`
    A `long` integer representing the length of the random salt to use, in bytes.

    RFC 3447 says that "Typical salt lengths" are either 0 or the length of the output of the digest algorithm that was selected when this key was generated. For example, if you use SHA-256 as the digest algorithm, this could be 32.

    The maximum size of `saltLength` is given by:

    ```js
    Math.ceil((keySizeInBits - 1) / 8) - digestSizeInBytes - 2;
    ```

    So for a key <example-value> of 2048 bits and a digest output size of 32 bytes, the maximum size would be 222.

## Examples

See the examples for `SubtleCrypto.sign()` and `SubtleCrypto.verify()`.

## Browser compatibility

Browsers that support the "RSA-PSS" algorithm for the `SubtleCrypto.sign()` and `SubtleCrypto.verify()` methods will support this type.

## See also

- RFC 3447: RSASSA-PSS
