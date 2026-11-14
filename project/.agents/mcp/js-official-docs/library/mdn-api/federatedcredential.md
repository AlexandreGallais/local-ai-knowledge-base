---
title: "FederatedCredential"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/federatedcredential/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FederatedCredential

The **`FederatedCredential`** interface of the Credential <example-value> API provides information about credentials from a federated identity provider. A federated identity provider is an entity that a website trusts to correctly authenticate a user, and that provides an API for that purpose. OpenID Connect is an example of a federated identity provider framework.

> **Note:**
> The Federated Credential <example-value> API (FedCM) provides a more complete solution for handling identity federation in the browser, and uses the `IdentityCredential` type.

In browsers that support it, an instance of this interface may be passed in the `credential` member of the `init` object for global `fetch()`.

## Constructor

- `FederatedCredential()` (experimental)
    Creates a new `FederatedCredential` object.

## Instance properties

_Inherits properties from its ancestor, `Credential`._

- `FederatedCredential.provider` (read-only) (experimental)
    Returns a string containing a credential's federated identity provider.
- `FederatedCredential.protocol` (read-only) (experimental)
    Returns a string containing a credential's federated identity protocol.

## Instance methods

None.

## Examples

```js
const cred = new FederatedCredential({
  id,
  name,
  provider: "https://account.google.com",
  iconURL,
});

// Store it
navigator.credentials.store(cred).then(() => {
  // Do something else.
});
```
