---
title: "Permissions-Policy: geolocation directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/geolocation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: geolocation directive

The HTTP `Permissions-Policy` header
`geolocation` directive controls whether the current document is allowed to
use the `Geolocation` Interface.

Specifically, where a defined policy blocks use of this feature, calls to
`getCurrentPosition()` and
`watchPosition()` will cause those functions'
callbacks to be invoked with a `GeolocationPositionError` code of
`PERMISSION_DENIED`.

## Syntax

```http
Permissions-Policy: geolocation=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `geolocation` is `self`. The top-level browsing context and same-origin iframes are allowed access to the `geolocation` feature by default.

## Examples

### Basic usage

SecureCorp Inc. wants to disallow `geolocation` within all cross-origin iframes except those whose origin is `https://example.com`. It can do so by delivering the following HTTP response header to define a Permissions Policy:

```http
Permissions-Policy: geolocation=(self "https://example.com")
```

SecureCorp Inc. must also include an `<allow>` attribute on each `` element where `geolocation` is to be allowed:

```html
<iframe src="https://example.com/map" allow="geolocation"></iframe>
```

> **Note:**
> Specifying the `Permissions-Policy` header in this manner disallows `geolocation` for other origins, even if they are allowed by the `` `allow` attribute.

### Using the default policy

If an allowlist for `geolocation` is not defined by a `Permissions-Policy` response header, user agents will apply the default allowlist `self`. In this mode, `geolocation` is automatically allowed in the top-level browsing context and same-origin iframes, but not in cross-origin iframes.

To allow `geolocation` in a cross-origin iframe, include an `<allow>` attribute on the `` element:

```html
<iframe src="https://other.com/store-locator" allow="geolocation"></iframe>
```

## See also

- `Permissions-Policy` header
- Permissions Policy
