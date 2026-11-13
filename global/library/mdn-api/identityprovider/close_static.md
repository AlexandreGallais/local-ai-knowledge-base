---
title: "IdentityProvider: close() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/identityprovider/close_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdentityProvider: close() static method

The **`close()`** static method of the `IdentityProvider` interface provides a manual signal to the browser that an IdP sign-in flow is finished.

`close()` needs to be called from the same origin as the specified IdP's sign-in dialog, as defined in the IdP config.

`close()` is used to close the IdP sign-in dialog when sign-in is completely finished and the IdP has finished collecting data from the user. A primary use case for `close()` is closing the IdP sign-in dialog in cases where the browser and the IdP login status become out of sync, and the browser initiates a dynamic sign-in flow to correct the issue.

## Syntax

```js
IdentityProvider.close()
```

### Parameters

None.

### Return value

`undefined`.

## Examples

### Basic `IdentityProvider.close()` usage

```js
IdentityProvider.close();
```

## See also

- Federated Credential <example-value> API on developer.chrome.com (2023)
