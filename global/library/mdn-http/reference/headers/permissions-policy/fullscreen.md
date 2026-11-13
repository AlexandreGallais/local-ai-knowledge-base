---
title: "Permissions-Policy: fullscreen directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/fullscreen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: fullscreen directive

The HTTP `Permissions-Policy` header `fullscreen` directive controls whether the current document is allowed to use `Element.requestFullscreen()`.

Specifically, where a defined policy blocks use of this feature, `requestFullscreen()` calls will return a `Promise` that rejects with a `TypeError`.

> **Note:**
> If both this directive (i.e., via the `allow` attribute) and the `allowfullscreen` attribute are present on an `` element, this directive takes precedence.

## Syntax

```http
Permissions-Policy: fullscreen=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `fullscreen` is `self`. The top-level browsing context and same-origin iframes are allowed access to the `fullscreen` feature by default.

## Examples

### Basic usage

SecureCorp Inc. wants to disallow `fullscreen` within all cross-origin iframes except those whose origin is `https://example.com`. It can do so by delivering the following HTTP response header to define a Permissions Policy:

```http
Permissions-Policy: fullscreen=(self "https://example.com")
```

SecureCorp Inc. must also include an `<allow>` attribute on each `` element where `fullscreen` is to be allowed:

```html
<iframe src="https://example.com/presentation" allow="fullscreen"></iframe>
```

> **Note:**
> Specifying the `Permissions-Policy` header in this manner disallows `fullscreen` for other origins, even if they are allowed by the `` `allow` attribute.

### Using the default policy

If an allowlist for `fullscreen` is not defined by a `Permissions-Policy` response header, user agents will apply the default allowlist `self`. In this mode, `fullscreen` is automatically allowed in the top-level browsing context and same-origin iframes, but not in cross-origin iframes.

To allow `fullscreen` in a cross-origin iframe, include an `<allow>` attribute on the `` element:

```html
<iframe src="https://other.com/videoplayer" allow="fullscreen"></iframe>
```

## See also

- `Permissions-Policy` header
- Permissions Policy
