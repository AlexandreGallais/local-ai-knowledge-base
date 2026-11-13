---
title: "FederatedCredentialInit"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/federatedcredentialinit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FederatedCredentialInit

The **`FederatedCredentialInit`** dictionary represents the object passed to `CredentialsContainer.create()` as the value of the `federated` option: that is, when creating a `FederatedCredential` object representing a credential <example-value> with a federated identify provider.

> **Note:**
> The Federated Credential <example-value> API (FedCM) supersedes the `FederatedCredential` interface in favor of the `IdentityCredential` interface.
>
> The `FederatedCredentialInit` dictionary is not used when working with the `IdentityCredential` interface.

## Instance properties

- `iconURL` (optional)
    A string representing the URL of an icon or avatar to be associated with the credential.
- `id`
    A string representing a unique ID for the credential.
- `name` (optional)
    A string representing the credential username.
- `origin`
    A string representing the credential's origin. `FederatedCredential` objects are origin-bound, which means that they will only be usable on the specified origin they were intended to be used on.
- `protocol` (optional)
    A string representing the protocol of the credentials' <example-value> identity provider (for example, `"openidconnect"`).
- `provider`
    A string representing the credentials' <example-value> identity provider (for example `"https://www.facebook.com"` or `"https://accounts.google.com"`).

## Examples

### Creating a federated identity credential

```js
const credInit = {
  id: "1234",
  name: "Serpentina",
  origin: "https://example.org",
  protocol: "openidconnect",
  provider: "https://provider.example.org",
};

const makeCredential = document.querySelector("#make-credential");

makeCredential.addEventListener("click", async () => {
  const cred = await navigator.credentials.create({
    federated: credInit,
  });
  console.log(cred.name);
  console.log(cred.provider);
});
```
