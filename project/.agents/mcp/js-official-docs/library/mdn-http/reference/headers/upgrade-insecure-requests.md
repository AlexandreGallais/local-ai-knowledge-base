---
title: "Upgrade-Insecure-Requests header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/upgrade-insecure-requests/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Upgrade-Insecure-Requests header

The HTTP **`Upgrade-Insecure-Requests`** request header sends a signal to the server indicating the client's preference for an encrypted and authenticated response, and that the client can successfully handle the  CSP directive.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
Upgrade-Insecure-Requests: <boolean>
```

## Directives

- `<boolean>`
    `1` indicates 'true' and is the only valid value for this field.

## Examples

### Using Upgrade-Insecure-Requests

A client's request signals to the server that it supports the upgrade mechanisms of :

```http
GET / HTTP/1.1
Host: example.com
Upgrade-Insecure-Requests: 1
```

The server can now redirect to a secure version of the site. A `Vary` header can be used so that the site isn't served by caches to clients that don't support the upgrade mechanism.

```http
Location: https://example.com/
Vary: Upgrade-Insecure-Requests
```

## See also

- `Content-Security-Policy`
- CSP  directive
- HTTP Caching: Vary and `Vary` header
