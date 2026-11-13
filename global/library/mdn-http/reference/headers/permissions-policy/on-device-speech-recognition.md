---
title: "Permissions-Policy: on-device-speech-recognition directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/on-device-speech-recognition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: on-device-speech-recognition directive

The HTTP `Permissions-Policy` header `on-device-speech-recognition` directive controls access to the on-device speech recognition functionality of the Web Speech API.

Specifically, where a defined policy blocks usage, any attempts to call the API's `SpeechRecognition.available()` or `SpeechRecognition.install()` methods will fail.

## Syntax

```http
Permissions-Policy: on-device-speech-recognition=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `on-device-speech-recognition` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
