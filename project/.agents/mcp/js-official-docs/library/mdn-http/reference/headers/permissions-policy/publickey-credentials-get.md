---
title: "Permissions-Policy: publickey-credentials-get directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/publickey-credentials-get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: publickey-credentials-get directive

The HTTP `Permissions-Policy` header `publickey-credentials-get` directive controls whether the current document is allowed to access the Web Authentication API to retrieve public-key <example-value>, i.e., via `navigator.credentials.get({publicKey})`.

Specifically, where a defined policy blocks the use of this feature, the `Promise` returned by `navigator.credentials.get({publicKey})` will reject with a `NotAllowedError` `DOMException`.

## Syntax

```http
Permissions-Policy: publickey-credentials-get=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `publickey-credentials-get` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
- Web Authentication API
- `PublicKeyCredential` interface
