---
title: "IdentityCredential: configURL property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identitycredential/configurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityCredential: configURL property

The **`configURL`** read-only property of the `IdentityCredential` interface returns a string specifying the config file URL of the identity provider (IdP) used for sign-in.

See Provide a config file for more information.

## Value

A string.

## Examples

### Basic <example-value> sign-in and `configURL` access

Relying parties (RPs) can call `navigator.credentials.get()` with the `identity` option to make a request for users to sign in to the RP via an identity provider (IdP), using identity federation. A request indicating a single provider would look like this:

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

  console.log(identityCredential.configURL);
}
```

A successful `navigator.credentials.get()` call that includes an `identity` option fulfills with an `IdentityCredential` instance, which can be used to access the `configURL` of the IdP used for sign-in.

Check out Federated Credential <example-value> API (FedCM) for more details on how this works. This call will start off the sign-in flow described in FedCM sign-in flow.

## See also

- Federated Credential <example-value> API
