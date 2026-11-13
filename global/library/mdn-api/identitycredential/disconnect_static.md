---
title: "IdentityCredential: disconnect() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identitycredential/disconnect_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityCredential: disconnect() static method

The **`disconnect()`** static method of the `IdentityCredential` interface disconnects a specified federated sign-in account from the IdP used to obtain the credential.

Afterwards, using that account for federated login requires starting the federated sign-in process again.

## Syntax

```js
IdentityCredential.disconnect(options)
```

### Parameters

- `options`
    An options object, which can contain the following properties:
    - `accountHint`
        A string specifying an account hint that the IdP uses to identify the account to disconnect. The hint can be an arbitrary string as long as the disconnect endpoint can identify the account — for example an email address or user ID. This will not necessarily match the account ID provided by the accounts list endpoint.
    - `clientId`
        A string specifying the RP's client identifier, as specified in the `providers` `clientId` property during sign-in.
    - `configURL`
        A string specifying the config file URL of the IdP, as specified in the `providers` `configURL` property during sign-in.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if:
    - The IdP's `configURL` is invalid or missing the `disconnect_endpoint`.
    - The document's origin does not match the `configURL`.
- `NetworkError` `DOMException`
    Thrown if:
    - The browser is unable to connect to the IdP.
    - The request is disallowed by a `connect-src` `Content-Security-Policy`.
    - Another `disconnect()` call was previously made that has not yet resolved.
    - The FedCM API has been disabled globally.
    - The IdP's `configURL` is neither secure nor potentially trustworthy.
- `NotAllowedError` `DOMException`
    Thrown if the embedding `` does not have an `identity-credentials-get` Permissions-Policy set to allow the use of `disconnect()` or if the FedCM API is disabled globally by a policy set on the top-level document.

## Examples

### Basic `disconnect()` usage

The RP may disconnect a specified federated sign-in account from the associated IdP by invoking `disconnect()`. This function can be called from a top-level RP frame.

```js
IdentityCredential.disconnect({
  configURL: "https://idp.example.com/config.json",
  clientId: "rp123",
  accountHint: "account456",
});
```

For a `disconnect()` call to work, the IdP must include a `disconnect_endpoint` in its config file. See The disconnect endpoint for more details of the underlying HTTP communication.

## See also

- Federated Credential <example-value> API on developer.chrome.com (2023)
