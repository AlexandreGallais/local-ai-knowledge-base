---
title: "Permissions-Policy: midi directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/midi/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: midi directive

The HTTP `Permissions-Policy` header `midi` directive controls whether the current document is allowed to use the Web MIDI API.

Specifically, where a defined policy blocks use of this feature, `Navigator.requestMIDIAccess()` calls will return a `Promise` that rejects with a `DOMException` of type `NotAllowedError`.

## Syntax

```http
Permissions-Policy: midi=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `midi` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
