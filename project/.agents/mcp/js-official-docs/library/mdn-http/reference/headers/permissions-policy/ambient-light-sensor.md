---
title: "Permissions-Policy: ambient-light-sensor directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/ambient-light-sensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: ambient-light-sensor directive

The HTTP `Permissions-Policy` header `ambient-light-sensor` directive controls whether the current document is allowed to gather information about the amount of light in the environment around the device through the `AmbientLightSensor` interface.

Specifically, where a defined policy blocks use of this feature, `AmbientLightSensor()` constructor calls will throw a `DOMException` of type `SecurityError`.

## Syntax

```http
Permissions-Policy: ambient-light-sensor=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `ambient-light-sensor` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
