---
title: "Proxy-Authenticate header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/proxy-authenticate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Proxy-Authenticate header

The HTTP **`Proxy-Authenticate`** response header defines the authentication method (or challenge) that should be used to gain access to a resource behind a proxy server.
It is sent in a `407 Proxy Authentication Required` response so a client can identify itself to a proxy that requires authentication.

       | Header type
       | Response header

## Syntax

```http
Proxy-Authenticate: <challenge>, …
```

The value is a comma-separated list of challenges, where a `<challenge>` is comprised of an `<auth-scheme>`, followed by an optional `<token68>` or a comma-separated list of `<auth-params>`:

```plain
challenge = <auth-scheme> <auth-param>, …, <auth-paramN>
challenge = <auth-scheme> <token68>
```

For example:

```http
Proxy-Authenticate: <auth-scheme>
Proxy-Authenticate: <auth-scheme> token68
Proxy-Authenticate: <auth-scheme> auth-param1=param-token1
Proxy-Authenticate: <auth-scheme> auth-param1=param-token1, …, auth-paramN=param-tokenN
```

The presence of a `token68` or authentication parameters depends on the selected `<auth-scheme>`.
For example, Basic <example-value> requires a `<realm>`, and allows for optional use of `charset` key, but does not support a `token68`:

```http
Proxy-Authenticate: Basic <example-value>"Dev", charset="UTF-8"
```

## Directives

- `<auth-scheme>`
    A case-insensitive token <example-value> the Authentication scheme used.
    Some of the more common types are `Basic`, `Digest`, `Negotiate` and `AWS4-HMAC-SHA256`.
    IANA maintains a list of authentication schemes, but there are other schemes offered by host services.
- `<auth-param>` (optional)
    An authentication parameter whose format depends on the `<auth-scheme>`.
    `<realm>` is described below as it's a common authentication parameter among many auth schemes.
    - `<realm>` (optional)
        The string `realm` followed by `=` and a quoted string describing a protected area, for example `realm="staging environment"`.
        A realm allows a server to partition the areas it protects (if supported by a scheme that allows such partitioning).
        Some clients show this value to the user to inform them about which particular credentials are required — though most browsers stopped doing so to counter phishing.
        The only reliably supported character set for this value is `us-ascii`.
        If no realm is specified, clients often display a formatted hostname instead.
- `<token68>` (optional)
    A token that may be useful for some schemes.
    The token <example-value> the 66 unreserved URI characters plus a few others.
    It can hold a base64, base64url, base32, or base16 (hex) encoding, with or without padding, but excluding whitespace.
    The `token68` alternative to auth-param lists is supported for consistency with legacy authentication schemes.

Generally, you will need to check the relevant specifications for the authentication parameters needed for each `<auth-scheme>`.

> **Note:**
> See `WWW-Authenticate` for more details on authentication parameters.

## Examples

### Proxy-Authenticate Basic auth

The following response indicates a Basic auth scheme is required with a realm:

```http
Proxy-Authenticate: Basic <example-value>"Staging server"
```

## See also

- `WWW-Authenticate`
- HTTP authentication
- `Authorization`, `Proxy-Authorization`
- `401`, `403`, `407`
