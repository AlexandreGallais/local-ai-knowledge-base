---
title: "Permissions-Policy: local-network directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/local-network/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: local-network directive

The HTTP `Permissions-Policy` header `local-network` directive controls whether the current document is allowed to make network requests to local addresses.

A local address is only accessible on the local network; its target will differ on different networks. For example, `192.168.0.1`.

Specifically, where a defined policy blocks use of this feature, requests to local addresses will always fail.

See Local Network Access for more details.

## Syntax

```http
Permissions-Policy: local-network=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `local-network` is `self`. The top-level browsing context and same-origin iframes are allowed access to the `local-network` feature by default.

## Examples

### Basic usage

SecureCorp Inc. wants to disallow `local-network` within all cross-origin iframes except those whose origin is `https://example.com`. It can do so by delivering the following HTTP response header to define a Permissions Policy:

```http
Permissions-Policy: local-network=(self "https://example.com")
```

SecureCorp Inc. must also include an `<allow>` attribute on each `` element where `local-network` is to be allowed:

```html
<iframe src="https://example.com/lna" allow="local-network"></iframe>
```

> **Note:**
> Specifying the `Permissions-Policy` header in this manner disallows `local-network` for other origins, even if they are allowed by the `` `allow` attribute.

### Using the default policy

If an allowlist for `local-network` is not defined by a `Permissions-Policy` response header, user agents will apply the default allowlist `self`. In this mode, `local-network` is automatically allowed in the top-level browsing context and same-origin iframes, but not in cross-origin iframes.

To allow `local-network` in a cross-origin iframe, include an `<allow>` attribute on the `` element:

```html
<iframe src="https://other.com/lna" allow="local-network"></iframe>
```

## See also

- Local Network Access
- `Permissions-Policy` header
- Permissions Policy
