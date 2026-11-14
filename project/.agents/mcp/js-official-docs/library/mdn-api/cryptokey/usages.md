---
title: "CryptoKey: usages property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cryptokey/usages/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CryptoKey: usages property

The read-only **`usages`** property of the `CryptoKey` interface indicates what can be done with the key.

## Value

An `Array` of strings from the following list:

- `"encrypt"`: The key may be used to encrypt messages.
- `"decrypt"`: The key may be used to decrypt messages.
- `"sign"`: The key may be used to sign messages.
- `"verify"`: The key may be used to verify signatures.
- `"deriveKey"`: The key may be used in deriving a new key.
- `"deriveBits"`: The key may be used in deriving bits.
- `"wrapKey"`: The key may be used to wrap a key.
- `"unwrapKey"`: The key may be used to unwrap a key.

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
    `The following usages are reported for this key: ${key.usages.toString()}`,
  ),
);
```
