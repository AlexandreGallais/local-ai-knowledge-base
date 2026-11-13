---
title: "PublicKeyCredential: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: id property

The **`id`** read-only property of the
`PublicKeyCredential` interface is a string, inherited
from `Credential`, which represents the identifier of the current
`PublicKeyCredential` instance.

This property is a base64url encoded version of `PublicKeyCredential.rawId`.

> **Note:**
> This property may only be used in top-level contexts and will
> not be available in an `` for example.

## Value

A string being the base64url encoded version of `PublicKeyCredential.rawId`.

## Examples

```js
const publicKey = {
  challenge: new Uint8Array(26) /* this actually is given from the server */,
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
  .create({ publicKey })
  .then((newCredentialInfo) => {
    const id = newCredentialInfo.id;
    // Do something with the id

    // send attestation response and client extensions
    // to the server to proceed with the registration
    // of the credential
  })
  .catch((err) => {
    console.error(err);
  });
```

## See also

- `Credential.id`
