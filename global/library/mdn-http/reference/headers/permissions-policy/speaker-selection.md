---
title: "Permissions-Policy: speaker-selection directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/speaker-selection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: speaker-selection directive

The HTTP `Permissions-Policy` header `speaker-selection` directive controls whether the current document is allowed to enumerate and select audio output devices (speakers, headphones, and so on).

Specifically, where a defined policy blocks use of this feature:

- `MediaDevices.enumerateDevices()` won't return devices of type _audio output_.
- `MediaDevices.selectAudioOutput()` won't display the popup for selecting an audio output, and the returned `Promise` will reject with a `DOMException` of type `NotAllowedError`.
- `HTMLMediaElement.setSinkId()` and `AudioContext.setSinkId()` will throw a `NotAllowedError` if called for an audio output.

## Syntax

```http
Permissions-Policy: speaker-selection=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `speaker-selection` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
