---
title: "Proxy-Authorization header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/proxy-authorization/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Proxy-Authorization header

The HTTP **`Proxy-Authorization`** request header contains the credentials to authenticate a client with a proxy server, typically after the server has responded with a `407 Proxy Authentication Required` status with the `Proxy-Authenticate` header.

       | Header type
       | Request header

       | Forbidden request header
       | Yes

## Syntax

```http
Proxy-Authorization: <auth-scheme> <credentials>
```

## Directives

- `<auth-scheme>`
    A case-insensitive token <example-value> the Authentication scheme used.
    Some of the more common types are `Basic`, `Digest`, `Negotiate` and `AWS4-HMAC-SHA256`.
    IANA maintains a list of authentication schemes, but there are other schemes offered by host services.
- `<credentials>`
    Credentials use for the authentication scheme.
    Generally, you will need to check the relevant specifications for the format.

> **Note:**
> See `Authorization` for more details.

## Examples

### Basic <example-value>

In `Basic` auth, credentials are sent in the format `<username>:<password>` (for example, `aladdin:opensesame`).
The resulting string is then base64 encoded (`YWxhZGRpbjpvcGVuc2VzYW1l`).

```http
Proxy-Authorization: Basic <example-value>
```

> **Warning:**
> Base64 encoding is reversible, and therefore offers no cryptographic security.
> This method can be considered equivalent to sending the credentials in clear text.
> HTTPS is always recommended when using authentication, but is even more so when using `Basic` authentication.

### Bearer <example-value> (auth token)

```http
Proxy-Authorization: Bearer <example-value>
```

## See also

- HTTP authentication
- `Proxy-Authenticate`
- `WWW-Authenticate`
- `Authorization`
- `401`, `403`, `407`
