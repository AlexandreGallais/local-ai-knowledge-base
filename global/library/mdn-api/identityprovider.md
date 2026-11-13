---
title: "IdentityProvider"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identityprovider/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityProvider

The **`IdentityProvider`** interface of the Federated Credential <example-value> (FedCM) API represents an IdP and provides access to related information and functionality.

## Static methods

- `close()` (experimental)
    Provides a manual signal to the browser that an IdP sign-in flow is finished. This is needed to, for example, close the IdP sign-in dialog when sign-in is completely finished and the IdP has finished collecting data from the user.
- `getUserInfo()` (experimental)
    Returns information about a previously-signed in user on their return to an IdP, which can be used to provide a personalized welcome message and sign-in button.

## Examples

### Basic `IdentityProvider.getUserInfo()` usage

The following example shows how the `getUserInfo()` method can be used to return information on a previously-signed in user from a specific IdP.

```js
// Iframe displaying a page from the https://idp.example origin
const userInfo = await IdentityProvider.getUserInfo({
  configURL: "https://idp.example/fedcm.json",
  clientId: "client1234",
});

// IdentityProvider.getUserInfo() returns an array of user information.
if (userInfo.length > 0) {
  // Returning accounts should be first, so the first account received
  // is guaranteed to be a returning account
  const name = userInfo[0].name;
  const givenName = userInfo[0].given_name;
  const displayName = givenName || name;
  const picture = userInfo[0].picture;
  const email = userInfo[0].email;

  // …

  // Render a personalized sign-in button using the information returned above
}
```

## See also

- Federated Credential <example-value> API on developer.chrome.com (2023)
