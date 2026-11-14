---
title: "PublicKeyCredential: rawId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/rawid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: rawId property

The **`rawId`** read-only property of the
`PublicKeyCredential` interface is an `ArrayBuffer` object
containing the identifier of the credentials.

The `PublicKeyCredential.id` property is a base64url encoded version of this identifier.

> **Note:**
> This property may only be used in top-level contexts and will
> not be available in an `` for example.

## Value

An `ArrayBuffer` containing the identifier of the credentials. This
identifier is expected to be globally unique and is appointed for the current
`PublicKeyCredential` and its associated
`AuthenticatorAssertionResponse`.

## Examples

```js
const options = {
  challenge: new Uint8Array(26) /* from the server */,
  rp: {
    name: "Example CORP",
    id: "login.example.com",
  },
  user: {
    id: new Uint8Array(26) /* To be changed for each user */,
    name: "user@example.com",
    displayName: "Carina Anand",
  },
  pubKeyCredParams: [
    {
      type: "public-key",
      alg: -7,
    },
  ],
};

navigator.credentials
  .create({ publicKey: <example-value> })
  .then((pubKeyCredential) => {
    const rawId = pubKeyCredential.rawId;
    // Do something with rawId
  })
  .catch((err) => {
    // Deal with any error
  });
```
