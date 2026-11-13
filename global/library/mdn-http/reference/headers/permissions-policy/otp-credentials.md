---
title: "Permissions-Policy: otp-credentials directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/otp-credentials/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: otp-credentials directive

The HTTP `Permissions-Policy` header `otp-credentials` directive controls whether the current document is allowed to use the WebOTP API to request a one-time password (OTP) from a specially-formatted SMS message sent by the app's server, i.e., via `navigator.credentials.get({otp: ..., ...})`.

Specifically, where a defined policy blocks the use of this feature, the `Promise` returned by `navigator.credentials.get({otp})` will reject with a `SecurityError` `DOMException`.

## Syntax

```http
Permissions-Policy: otp-credentials=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `otp-credentials` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
- WebOTP API
- `OTPCredential` interface
