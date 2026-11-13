---
title: "IdentityCredential"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identitycredential/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityCredential

The **`IdentityCredential`** interface of the Federated Credential <example-value> API (FedCM) represents a user identity credential <example-value> from a successful federated sign-in.

A successful `navigator.credentials.get()` call that includes an `identity` option fulfills with an `IdentityCredential` instance.

## Instance properties

_Inherits properties from its ancestor, `Credential`._

- `IdentityCredential.configURL` (read-only) (experimental)
    A string specifying the config file URL of the IdP used for sign-in.
- `IdentityCredential.isAutoSelected` (read-only) (experimental)
    A boolean value that indicates whether the federated sign-in was carried out using auto-reauthentication (i.e., without user mediation) or not.
- `IdentityCredential.token` (read-only) (experimental)
    Returns the token used to validate the associated sign-in.

## Static methods

- `IdentityCredential.disconnect()` (experimental)
    Disconnects the federated sign-in account used to obtain the credential.

## Examples

### Basic <example-value> sign-in

Relying parties (RPs) can call `navigator.credentials.get()` with the `identity` option to make a request for users to sign in to the RP via an identity provider (IdP), using identity federation. A typical request would look like this:

```js
async function signIn() {
  const identityCredential = await navigator.credentials.get({
    identity: {
      providers: [
        {
          configURL: "https://accounts.idp.example/config.json",
          clientId: "********",
          params: {/* IdP-specific parameters */},
        },
      ],
    },
  });
}
```

If successful, this call will fulfill with an `IdentityCredential` instance. From this, you could return the `IdentityCredential.token` value, for example:

```js
console.log(identityCredential.token);
```

Check out Federated Credential <example-value> API (FedCM) for more details on how this works. This call will start off the sign-in flow described in FedCM sign-in flow.

## See also

- Federated Credential <example-value> API
