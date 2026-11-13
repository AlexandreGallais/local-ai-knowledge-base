---
title: "Permissions-Policy: serial directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/serial/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: serial directive

The HTTP `Permissions-Policy` header `serial` directive controls whether the current document is allowed to use the `Web Serial API` to communicate with serial devices, either directly connected via a serial port, or via USB or Bluetooth devices emulating a serial port.

Specifically, where a defined policy blocks use of this feature, `Serial.requestPort()` and `Serial.getPorts()` calls will return a `Promise` that rejects with a `DOMException` of type `SecurityError`.

## Syntax

```http
Permissions-Policy: serial=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `serial` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
