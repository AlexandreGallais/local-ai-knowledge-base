---
title: "Permissions-Policy: publickey-credentials-create directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/publickey-credentials-create/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: publickey-credentials-create directive

The HTTP `Permissions-Policy` header `publickey-credentials-create` directive controls whether the current document is allowed to use the Web Authentication API to create new WebAuthn credentials, i.e., via `navigator.credentials.create({publicKey})`.

Specifically, where a defined policy blocks use of this feature, the `Promise` returned by `navigator.credentials.create({publicKey})` will reject with a `NotAllowedError` `DOMException`.
If the method is called cross-origin, the `Promise` will also reject with a `NotAllowedError` if the feature is granted by `allow=` on an iframe and the frame does not also have Transient activation.

## Syntax

```http
Permissions-Policy: publickey-credentials-create=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `publickey-credentials-create` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
- Web Authentication API
- `PublicKeyCredential` interface
