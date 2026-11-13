---
title: "Permissions-Policy: hid directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/hid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: hid directive

The HTTP `Permissions-Policy` header `hid` directive controls whether the current document is allowed to use the `WebHID API` to connect to uncommon or exotic human interface devices such as alternative keyboards or gamepads.

Specifically, where a defined policy blocks WebHID usage, the `Navigator.hid` property will not be available.

## Syntax

```http
Permissions-Policy: hid=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `hid` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
