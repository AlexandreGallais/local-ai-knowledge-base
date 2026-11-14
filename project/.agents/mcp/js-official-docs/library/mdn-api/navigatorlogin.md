---
title: "NavigatorLogin"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigatorlogin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigatorLogin

The **`NavigatorLogin`** interface of the Federated Credential <example-value> (FedCM) API defines login functionality for federated identity providers (IdPs). Specifically, it enables a federated identity provider (IdP) to set its login status when a user signs into or out of the IdP.

See Update login status using the Login Status API for more details of how this is used.

`NavigatorLogin` is accessed via the `Navigator.login` property.

## Instance methods

- `setStatus()`
    Sets the login status of a federated identity provider (IdP), when called from the IdP's origin. By "login status", we mean "whether any users are logged into the IdP on the current browser or not".

## Examples

```js
/* Set logged-in status */
navigator.login.setStatus("logged-in");

/* Set logged-out status */
navigator.login.setStatus("logged-out");
```

## See also

- Federated Credential <example-value> (FedCM) API
