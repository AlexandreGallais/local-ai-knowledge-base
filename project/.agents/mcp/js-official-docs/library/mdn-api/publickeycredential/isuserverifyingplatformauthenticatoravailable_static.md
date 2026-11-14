---
title: "PublicKeyCredential: isUserVerifyingPlatformAuthenticatorAvailable() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/isuserverifyingplatformauthenticatoravailable_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: isUserVerifyingPlatformAuthenticatorAvailable() static method

The **`isUserVerifyingPlatformAuthenticatorAvailable()`** static method of the `PublicKeyCredential` interface returns a `Promise` which resolves to `true` if a user-verifying platform authenticator is present.

A user-verifying platform authenticator is a kind of multi-factor authenticator that is part of the client device (it is generally not removable) and that involves an action from the user in order to identify them. Common user-verifying platform authenticators include:

- Touch ID or Face ID (macOS and iOS)
- Windows Hello (Windows)
- Device unlock (fingerprint, face, PIN, etc.) on Android

> **Note:**
> This method may only be used in top-level contexts and will not be available in an `` for example.

## Syntax

```js
PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
```

### Parameters

None.

### Return value

A `Promise` which resolves to a boolean value indicating whether or a not a user-verifying platform authenticator is available.

> **Note:**
> In earlier versions of the specification, the boolean also conveyed the consent of the user to disclose such an authenticator existed.

### Exceptions

The returned `Promise` may be rejected with the following values:

- `SecurityError` `DOMException`
    The RP domain is not valid.

## Examples

```js
PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  .then((available) => {
    if (available) {
      // We can proceed with the creation of a PublicKeyCredential
      // with this authenticator
    } else {
      // Use another kind of authenticator or a classical login/password
      // workflow
    }
  })
  .catch((err) => {
    // Something went wrong
    console.error(err);
  });
```

## See also

- Windows Hello
- Web Authentication and Windows Hello - MSDN Guide and especially the special considerations mentioning `isUserVerifyingPlatformAuthenticator()`
