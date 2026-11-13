---
title: "Permissions-Policy: usb directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/usb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: usb directive

The HTTP `Permissions-Policy` header `usb` directive controls whether the current document is allowed to use the `WebUSB API`.

Specifically, where a defined policy blocks WebHID usage, the `Navigator.usb` property will not be available.

## Syntax

```http
Permissions-Policy: usb=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `usb` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
