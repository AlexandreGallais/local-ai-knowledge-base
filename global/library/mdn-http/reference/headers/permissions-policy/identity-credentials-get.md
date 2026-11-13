---
title: "Permissions-Policy: identity-credentials-get directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/identity-credentials-get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: identity-credentials-get directive

The HTTP `Permissions-Policy` header `identity-credentials-get` directive controls whether the current document is allowed to use the Federated Credential <example-value> API (FedCM), and more specifically usage of the following methods:

- `navigator.credentials.get()` (when used with the `identity` option)
- `IdentityCredential.disconnect()`
- `IdentityProvider.getUserInfo()`

Where this policy forbids use of the API, `Promise`s returned by these methods will reject with a `NotAllowedError` `DOMException`.

## Syntax

```http
Permissions-Policy: identity-credentials-get=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `identity-credentials-get` is `self`.

## See also

- Federated Credential <example-value> API (FedCM)
- `Permissions-Policy` header
- Permissions Policy
