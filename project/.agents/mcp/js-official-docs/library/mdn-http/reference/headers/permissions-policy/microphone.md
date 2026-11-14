---
title: "Permissions-Policy: microphone directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/microphone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: microphone directive

The HTTP `Permissions-Policy` header `microphone` directive controls whether the current document is allowed to use audio input devices.

Specifically, where a defined policy blocks use of this feature, `MediaDevices.getUserMedia()` calls will return a `Promise`
that rejects with a `NotAllowedError` `DOMException`.

## Syntax

```http
Permissions-Policy: microphone=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `microphone` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
