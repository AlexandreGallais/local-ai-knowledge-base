---
title: "Permissions-Policy: compute-pressure directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/compute-pressure/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: compute-pressure directive

The HTTP `Permissions-Policy` header `compute-pressure` directive controls access to the Compute Pressure API.

## Syntax

```http
Permissions-Policy: compute-pressure=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `compute-pressure` is `self` allowing usage in same-origin nested frames but preventing third-party content from using the feature. Workers (dedicated and shared) adhere to the permission policy set by their owning document(s).

## Examples

### Enabling compute pressure on third-party content

Third-party usage can be selectively enabled using the `allow` attribute on `` elements:

```html
<iframe src="https://example.com" allow="compute-pressure"></iframe>
```

### Disabling the Compute Pressure API completely

This HTTP response header disables compute pressure completely:

```http
Permissions-Policy: compute-pressure=()
```

## See also

- `Permissions-Policy` header
- Permissions Policy
- Compute Pressure API
