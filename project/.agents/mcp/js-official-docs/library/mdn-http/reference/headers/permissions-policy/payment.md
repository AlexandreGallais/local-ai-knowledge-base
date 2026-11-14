---
title: "Permissions-Policy: payment directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/payment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: payment directive

The HTTP `Permissions-Policy` header field's `payment` directive controls whether the current document is allowed to use the Payment Request API.

Specifically, where a defined policy blocks use of this feature, `PaymentRequest()` constructor calls will throw a `DOMException` of type `SecurityError`.

## Syntax

```http
Permissions-Policy: payment=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `payment` is `self`.

## See also

- `Permissions-Policy` header field
- Permissions Policy
