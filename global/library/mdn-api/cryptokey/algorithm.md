---
title: "CryptoKey: algorithm property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cryptokey/algorithm/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CryptoKey: algorithm property

The read-only **`algorithm`** property of the `CryptoKey` interface returns an object describing the algorithm for which this key can be used, and any associated extra parameters.

The object returned depends on the algorithm used to generate the key.

## Value

An object matching:

- `AesKeyGenParams` if the algorithm is any of the AES variants.
- `RsaHashedKeyGenParams` if the algorithm is any of the RSA variants.
- `EcKeyGenParams` if the algorithm is any of the EC variants.
- `HmacKeyGenParams` if the algorithm is HMAC.

For `RsaHashedKeyGenParams` and `HmacKeyGenParams`, the `hash` property is always in the object form (with a property called `name`), not the string form.

## Examples

```js
const rawKey = window.crypto.getRandomValues(new Uint8Array(16));

// Import an AES secret key from an ArrayBuffer containing the raw bytes.
// Takes an ArrayBuffer string containing the bytes, and returns a Promise
// that will resolve to a CryptoKey <example-value> the secret key.
function importSecretKey(rawKey) {
  return window.crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, [
    "encrypt",
    "decrypt",
  ]);
}

importSecretKey(rawKey).then((key) =>
  console.log(
    `This key is to be used with the ${key.algorithm.name} algorithm.`,
  ),
);
```
