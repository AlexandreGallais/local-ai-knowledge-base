---
title: "PublicKeyCredential: signalCurrentUserDetails() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/signalcurrentuserdetails_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: signalCurrentUserDetails() static method

The **`signalCurrentUserDetails()`** static method of the `PublicKeyCredential` interface signals to the authenticator that a particular user has updated their user name and/or display name on the relying party (RP) server.

This allows the authenticator to update user account details, to make sure they stay in sync with those held by the RP. It should only be used when the current user is authenticated — after sign in, or when they change the metadata associated with their credentials on the RP web app.

## Syntax

```js
signalCurrentUserDetails(options)
```

### Parameters

- `options`
    An object representing the updated user information, which contains the following properties:
    - `displayName`
        A string representing the updated user `displayName`.
    - `name`
        A string representing the updated user `name`.
    - `rpId`
        A string representing the `id` of the RP that sent the signal.
    - `userId`
        A base64url-encoded string representing the `id` of the user the credentials <example-value> to.

### Return value

A `Promise` that resolves to `undefined`.

### Exceptions

The promise rejects with the following exceptions:

- `SecurityError` `DOMException`
    The RP domain is not valid.
- `TypeError`
    The `credentialId` is not a valid base64url-encoded string.

## Description

It is possible for the information stored in a user's authenticator about a discoverable credential (for example, a passkey) to go out sync with the server. This can occur when the user updates their user name or display name on the RP web app without updating the authenticator.

The next time they try to sign in with a discoverable credential, the credential will still be presented to them with the old user name/display name in the relevant UI, which can result in a confusing user experience.

To avoid this issue, `signalCurrentUserDetails()` should be called on the RP web app each time a user updates their user account details or signs in, to tell the authenticator that the user information has been updated. It is up to the authenticator how to handle this information, but the expectation is that it will synchronize its user information with the provided update.

## Examples

### Signaling the current user details

In this example, we invoke the `signalCurrentUserDetail()` method, passing it the details of a credential the user has just edited on the RP. As a result, the authenticator should update its own copy of the credential so that it stays in sync with the RP.

```js
if (PublicKeyCredential.signalCurrentUserDetails) {
  await PublicKeyCredential.signalCurrentUserDetails({
    rpId: "example.com",
    userId: "M2YPl-KGnA8", // base64url-encoded user ID
    name: "user@example.com", // username
    displayName: "Maria Sanchez",
  });
} else {
  // Encourage the user to update their details in the authenticator
}
```

For further code examples, see Keep passkeys consistent with credentials on your server with the Signal API on developer.chrome.com (2024).

## See also

- `PublicKeyCredential.signalAllAcceptedCredentials()`
- `PublicKeyCredential.signalUnknownCredential()`
- Keep passkeys consistent with credentials on your server with the Signal API on developer.chrome.com (2024)
