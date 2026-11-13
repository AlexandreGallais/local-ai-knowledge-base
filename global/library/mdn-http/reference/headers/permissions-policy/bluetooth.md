---
title: "Permissions-Policy: bluetooth directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/bluetooth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: bluetooth directive

The HTTP `Permissions-Policy` header `bluetooth` directive controls whether the current document is allowed to use the Web Bluetooth API.

Specifically, where a defined policy disallows use of this feature, the methods of the `Bluetooth` object returned by `Navigator.bluetooth`, will block access:

- `Bluetooth.getAvailability()` will always fulfill its returned `Promise` with a value of `false`.
- `Bluetooth.getDevices()` will reject its returned `Promise` with a `SecurityError` `DOMException`.
- `Bluetooth.requestDevice()` will reject its returned `Promise` with a `SecurityError` `DOMException`.

## Syntax

```http
Permissions-Policy: bluetooth=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `bluetooth` is `self`. The top-level browsing context and same-origin iframes are allowed access to the `bluetooth` feature by default.

## Examples

### Basic usage

SecureCorp Inc. wants to disallow `bluetooth` within all cross-origin iframes except those whose origin is `https://example.com`. It can do so by delivering the following HTTP response header to define a Permissions Policy:

```http
Permissions-Policy: bluetooth=(self "https://example.com")
```

SecureCorp Inc. must also include an `<allow>` attribute on each `` element where `bluetooth` is to be allowed:

```html
<iframe src="https://example.com/blue" allow="bluetooth"></iframe>
```

> **Note:**
> Specifying the `Permissions-Policy` header in this manner disallows `bluetooth` for other origins, even if they are allowed by the `` `allow` attribute.

### Using the default policy

If an allowlist for `bluetooth` is not defined by a `Permissions-Policy` response header, user agents will apply the default allowlist `self`. In this mode, `bluetooth` is automatically allowed in the top-level browsing context and same-origin iframes, but not in cross-origin iframes.

To allow `bluetooth` in a cross-origin iframe, include an `<allow>` attribute on the `` element:

```html
<iframe src="https://other.com/blue" allow="bluetooth"></iframe>
```

## See also

- `Permissions-Policy` header
- Permissions Policy
