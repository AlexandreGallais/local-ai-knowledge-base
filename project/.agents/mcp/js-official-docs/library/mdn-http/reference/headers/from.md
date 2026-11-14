---
title: "From header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/from/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# From header

The HTTP **`From`** request header contains an Internet email address for an administrator who controls an automated user agent.

If you are running a robotic user agent (a web crawler, for example), the `From` header must be sent in requests so you can be contacted if problems occur, such as a bot sending excessive, unwanted, or invalid requests.

> **Warning:**
> You must not use the `From` header for access control or authentication.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
From: <email>
```

## Directives

- `<email>`
    A machine-usable email address.

## Examples

```http
From: user@example.com
```

## See also

- `Host`
