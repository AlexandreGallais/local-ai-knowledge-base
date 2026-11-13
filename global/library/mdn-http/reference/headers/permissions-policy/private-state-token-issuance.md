---
title: "Permissions-Policy: private-state-token-issuance directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/private-state-token-issuance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: private-state-token-issuance directive

The HTTP `Permissions-Policy` header `private-state-token-issuance` directive controls usage of private state token `token-request` operations.

Specifically, where a defined policy blocks the use of this feature, token <example-value> operations will fail.

## Syntax

```http
Permissions-Policy: private-state-token-issuance=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `private-state-token-issuance` is `*`.

## See also

- `Permissions-Policy` header
- Permissions Policy
- Private State Token API
