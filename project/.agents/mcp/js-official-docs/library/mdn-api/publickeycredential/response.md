---
title: "PublicKeyCredential: response property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/response/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: response property

The **`response`** read-only property of the
`PublicKeyCredential` interface is an `AuthenticatorResponse`
object which is sent from the authenticator to the user agent for the creation/fetching
of credentials. The information contained in this response will be used by the relying
party's server to verify the demand is legitimate.

An `AuthenticatorResponse` is either:

- an `AuthenticatorAttestationResponse` (when the
  `PublicKeyCredential` is created via
  `CredentialsContainer.create()`)
- an `AuthenticatorAssertionResponse` (when the
  `PublicKeyCredential` is obtained via
  `CredentialsContainer.get()`).

In order to validate the _creation_ of credentials, a relying party's server
needs both:

- this response
- the extensions of the client (given by
  `PublicKeyCredential.getClientExtensionResults()`) to validate the
  demand.

> **Note:**
> When validating the fetching of existing credentials, the
> whole `PublicKeyCredential` object and the client extensions are necessary
> for the relying party's server.

> **Note:**
> This property may only be used in top-level contexts and will
> not be available in an `` for example.

## Value

An `AuthenticatorResponse` object containing the data a relying party's
script will receive and which should be sent to the relying party's server in order to
validate the demand for creation or fetching. This object contains data from the client
(`AuthenticatorResponse/clientDataJSON`) and from the authenticator.

## Examples

```js
const options = {
  challenge: new Uint8Array(16) /* from the server */,
  rp: {
    name: "Example CORP",
    id: "login.example.com",
  },
  user: {
    id: new Uint8Array(16) /* from the server */,
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
    const response = pubKeyCredential.response;
    const clientExtResults = pubKeyCredential.getClientExtensionResults();
    // Send response and client extensions to the server so that it can validate
    // and create credentials
  })
  .catch((err) => {
    // Deal with any error
  });
```
