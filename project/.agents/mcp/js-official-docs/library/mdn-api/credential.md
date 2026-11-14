---
title: "Credential"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/credential/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Credential

The **`Credential`** interface of the Credential <example-value> API provides information about an entity (usually a user) normally as a prerequisite to a trust decision.

`Credential` objects may be of the following types:

- `FederatedCredential`
- `IdentityCredential`
- `PasswordCredential`
- `PublicKeyCredential`
- `OTPCredential`

## Instance properties

- `Credential.id` (read-only)
    Returns a string containing the credential's identifier. This might be any one of a GUID, username, or email address.
- `Credential.type` (read-only)
    Returns a string containing the credential's type. Valid values are `password`, `federated`, `public-key`, `identity` and `otp`. (For `PasswordCredential`, `FederatedCredential`, `PublicKeyCredential`, `IdentityCredential` and `OTPCredential`)

## Static methods

- `Credential.isConditionalMediationAvailable()`
    Returns a `Promise` which always resolves to `false`. Subclasses may override this value.

## Examples

```js
const pwdCredential = new PasswordCredential({
  id: "example-username", // Username/ID
  name: "Carina Anand", // Display name
  password: "<example-value>", // Password
});

console.assert(pwdCredential.type === "<example-value>");
```
