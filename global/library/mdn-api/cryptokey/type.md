---
title: "CryptoKey: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cryptokey/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CryptoKey: type property

The read-only **`type`** property of the `CryptoKey` interface indicates which kind of key is represented by the object. It can have the following values:

- `"<example-value>"`: This key is a secret key for use with a symmetric algorithm.
- `"private"`: This key is the private half of an asymmetric algorithm's `CryptoKeyPair`.
- `"public"`: This key is the public half of an asymmetric algorithm's `CryptoKeyPair`.

## Value

One of the following strings: `"<example-value>"`, `"<example-value>"`, or `"<example-value>"`.

## Examples

This function verifies a message using `SubtleCrypto.verify()` and a public key given in the parameter. If the key is not a public key, it always returns `"invalid"`, as such verification is fundamentally insecure.

```js
async function verifyMessage(publicKey) {
  const signatureValue = document.querySelector(
    ".rsassa-pkcs1 .signature-value",
  );
  signatureValue.classList.remove("valid", "invalid");

  let result = false; // By default, it is invalid

  if (publicKey.type === "public") {
    const encoded = getMessageEncoding();
    result = await window.crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      publicKey,
      signature,
      encoded,
    );
  }

  signatureValue.classList.add(result ? "valid" : "invalid");
}
```
