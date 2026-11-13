---
title: "FederatedCredential: FederatedCredential() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/federatedcredential/federatedcredential/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FederatedCredential: FederatedCredential() constructor

The **`FederatedCredential()`** constructor creates a new `FederatedCredential` object. In supporting browsers, an instance of this class may be passed the `credential` received from the `init` object for global `fetch()`.

## Syntax

```js
new FederatedCredential(data)
```

### Parameters

- `data`
    A `FederatedCredentialInit` object. An object with the following properties:
    - `name` (optional)
        A string representing the credential username.
    - `iconURL` (optional)
        A string representing the URL of an icon or avatar to be associated with the credential.
    - `origin`
        A string representing the credential's origin. `FederatedCredential` objects are origin-bound, so they will only be usable on the origin specified here.
    - `provider`
        A string which identifies the credentials' <example-value> identity provider, specified as the origin that the provider uses to sign users in (for example `"https://www.facebook.com"` or `"https://accounts.google.com"`).
    - `protocol` (optional)
        A string representing the protocol of the credentials' <example-value> identity provider (for example, `"openidconnect"`).

## Examples

### Creating a federated identity credential

```js
const credData = {
  id: "1234",
  name: "Serpentina",
  origin: "https://example.org",
  protocol: "openidconnect",
  provider: "https://provider.example.org",
};

const fedCred = new FederatedCredential(credData);

// Store it
navigator.credentials.store(fedCred).then(() => {
  // Do something else
});
```
