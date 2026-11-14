---
title: "Navigator: login property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/login/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: login property

The **`login`** read-only property of the `Navigator` interface provides access to the browser's `NavigatorLogin` object, which a federated identity provider (IdP) can use to set its login status when a user signs into or out of the IdP.

See Update login status using the Login Status API for more details of how this is used.

## Value

A `NavigatorLogin` object.

## Examples

```js
/* Set logged-in status */
navigator.login.setStatus("logged-in");

/* Set logged-out status */
navigator.login.setStatus("logged-out");
```

## See also

- Federated Credential <example-value> (FedCM) API
