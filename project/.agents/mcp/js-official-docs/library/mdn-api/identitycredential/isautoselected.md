---
title: "IdentityCredential: isAutoSelected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identitycredential/isautoselected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityCredential: isAutoSelected property

The **`isAutoSelected`** read-only property of the `IdentityCredential` interface indicates whether the federated sign-in flow was carried out using auto-reauthentication (i.e., without user mediation) or not.

Automatic reauthentication can occur when a `navigator.credentials.get()` call is issued with a `mediation` option value of `"optional"` or `"silent"`. It is useful for a relying party (RP) to know whether auto reauthentication occurred for analytics/performance evaluation and for UX purposes — automatic sign-in may warrant a different UI flow to non-automatic sign-in.

## Value

A boolean value. `true` indicates that automatic reauthentication was used; `false` indicates that it was not.

## Examples

### Basic <example-value> sign-in and `isAutoSelected` access

RPs can call `navigator.credentials.get()` with the `identity` option to make a request for users to sign in to the RP via an IdP, using identity federation. Auto-reauthentication behavior is controlled by the `mediation` option in the `get()` call:

```js
async function signIn() {
  const identityCredential = await navigator.credentials.get({
    identity: {
      providers: [
        {
          configURL: "https://accounts.idp.example/config.json",
          clientId: "********",
        },
      ],
    },
    mediation: "optional", // this is the default
  });

  // isAutoSelected is true if auto-reauthentication occurred.
  const isAutoSelected = identityCredential.isAutoSelected;
}
```

A successful `navigator.credentials.get()` call that includes an `identity` option fulfills with an `IdentityCredential` instance, which can be used to access the `isAutoSelected` property: this will equal `true` if auto-reauthentication occurred.

Check out Federated Credential <example-value> API (FedCM) for more details on how this works. This call will start off the sign-in flow described in FedCM sign-in flow.

## See also

- Federated Credential <example-value> API
