---
title: "NavigatorLogin: setStatus() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigatorlogin/setstatus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigatorLogin: setStatus() method

The **`setStatus()`** method of the `NavigatorLogin` interface sets the login status of a federated identity provider (IdP), when called from the IdP's origin. By this, we mean "whether any users are logged into the IdP on the current browser or not". This should be called by the IdP site following a user login or logout.

The browser stores this state for each IdP; the FedCM API then uses it to reduce the number of requests it makes to the IdP (because it does not need to waste time requesting accounts when there are no users logged in to the IdP). It also mitigates potential timing attacks.

See Update login status using the Login Status API for more information about FedCM login status.

## Syntax

```js
setStatus(status)
```

### Parameters

- `status`
    A string representing the login status to set for the IdP. Possible values are:
    - `"logged-in"`: The IdP has at least one user account signed in.
    - `"logged-out"`: All IdP user accounts are currently signed out.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- `SecurityError` `DOMException`
    Thrown if the calling domain is not in a frame where all of the nesting hierarchy is same-origin. Whether called from the main frame, an `` nested inside the main frame, or another `` nested one or more levels deep inside the first ``, _all_ levels of the nesting hierarchy must be same-origin for the call to be successful.

## Examples

```js
/* Set logged-in status */
navigator.login.setStatus("logged-in");

/* Set logged-out status */
navigator.login.setStatus("logged-out");
```

## See also

- Federated Credential <example-value> (FedCM) API
