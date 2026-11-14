---
title: "PublicKeyCredential: authenticatorAttachment property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/authenticatorattachment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: authenticatorAttachment property

The **`authenticatorAttachment`** read-only property of the `PublicKeyCredential` interface is a string that indicates the general category of authenticator used during the associated `navigator.credentials.create()` or `navigator.credentials.get()` call.

## Value

A string, which will be one of the following values:

- `"platform"`
    The authenticator is part of the device WebAuthn is running on (termed a **platform authenticator**), therefore WebAuthn will communicate with it using a transport available to that platform, such as a platform-specific API. A public key <example-value> bound to a platform authenticator is called a **platform credential**.
- `"cross-platform"`
    The authenticator is not a part of the device WebAuthn is running on (termed a **roaming authenticator** as it can roam between different devices), therefore WebAuthn will communicate with it using a cross-platform transport protocol such as Bluetooth or NFC. A public key <example-value> bound to a roaming authenticator is called a **roaming credential**.

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
    const attachment = pubKeyCredential.authenticatorAttachment;
    // Do something with authenticatorAttachment
  })
  .catch((err) => {
    // Deal with any error
  });
```
