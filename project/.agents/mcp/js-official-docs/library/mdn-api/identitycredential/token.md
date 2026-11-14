---
title: "IdentityCredential: token property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identitycredential/token/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityCredential: token property

The **`token`** read-only property of the `IdentityCredential` interface returns the token used to validate the associated sign-in.

The FedCM API does not define the structure of the `token` object or what the RP should do with it: this depends entirely on the federated identity protocol that the IdP implements.

When an RP chooses to work with a particular IdP, they will provide instructions for how to interpret and use the returned `token` value.

## Value

Any type.

## Examples

### Basic <example-value> sign-in and `token` access

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

  console.log(identityCredential.token);
}
```

A successful `navigator.credentials.get()` call that includes an `identity` option fulfills with an `IdentityCredential` instance, which can be used to access the `token` used to validate the sign-in.

Check out Federated Credential <example-value> API (FedCM) for more details on how this works. This call will start off the sign-in flow described in FedCM sign-in flow.

## See also

- Federated Credential <example-value> API
