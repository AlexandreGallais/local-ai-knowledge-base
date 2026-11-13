---
title: "Permissions-Policy: local-network-access directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/local-network-access/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: local-network-access directive

The HTTP `Permissions-Policy` header `local-network-access` directive controls whether the current document is allowed to make network requests to local and loopback addresses. This policy directive is an alias for the newer `local-network` and `loopback-network` directives.

- A local address is only accessible on the local network; its target will differ on different networks. For example, `192.168.0.1`.
- A loopback address is only accessible on the local host; its target will differ on every device. For example, `127.0.0.1`, which is generally known as `localhost`.

Specifically, where a defined policy blocks use of this feature, requests to local and loopback addresses will always fail. If you want more granular control over local and loopback addresses, you should use the newer directives linked above.

See Local Network Access > The `local-network-access` alias for more details.

## Syntax

```http
Permissions-Policy: local-network-access=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `local-network-access` is `self`.

## See also

- Local Network Access
- `Permissions-Policy` header
- Permissions Policy
