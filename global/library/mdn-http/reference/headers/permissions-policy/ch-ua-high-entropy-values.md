---
title: "Permissions-Policy: ch-ua-high-entropy-values directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/ch-ua-high-entropy-values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: ch-ua-high-entropy-values directive

The HTTP `Permissions-Policy` header `ch-ua-high-entropy-values` directive controls whether or not the document is permitted to use the `NavigatorUAData.getHighEntropyValues()` method to retrieve high-entropy user-agent data.

If the permission is not allowed, the method will only return the `brands`, `mobile`, and `platform` low-entropy data.

## Syntax

```http
Permissions-Policy: ch-ua-high-entropy-values=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `ch-ua-high-entropy-values` is `*`.

## Examples

### Restricting high-entropy data to specific origins

The following policy would only allow the current origin and two other specific origins to retrieve high-entropy data.

```http
Permissions-Policy: ch-ua-high-entropy-values=("self https://a.example.com" "https://b.example.com")
```

You could then embed one of the two other origins:

```html
<iframe src="https://a.example.com" allow="ch-ua-high-entropy-values"></iframe>
```

## See also

- `Permissions-Policy` header
- Permissions Policy
- User-Agent Client Hints API
