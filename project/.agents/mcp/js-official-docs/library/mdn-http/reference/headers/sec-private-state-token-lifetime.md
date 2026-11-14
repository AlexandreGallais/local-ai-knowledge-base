---
title: "Sec-Private-State-Token-Lifetime header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-private-state-token-lifetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-Private-State-Token-Lifetime header

The HTTP **`Sec-Private-State-Token-Lifetime`** Response Header is used by the Private State Token API during token redemption. It is sent by the redeemer server to indicate to the browser how long (in seconds) a redemption record should be cached for. The redemption record itself is sent in a `Sec-Private-State-Token` response header.

If the `Sec-Private-State-Token-Lifetime` header is omitted, the lifetime of the redemption record will be tied to the lifetime of the token <example-value> key that confirmed the redeemed token's issuance.

       | Header type
       | Response Header

       |
        CORS-safelisted request header

       | No

## Syntax

```http
Sec-Private-State-Token-Lifetime: <integer>
```

Servers should ignore this header if it contains any other value.

## Directives

- `<integer>`
    An integer specifying the lifetime of the sent redemption record in seconds.

## Examples

```http
Sec-Private-State-Token-Lifetime: 604800
```

## See also

- `Sec-Private-State-Token`
- `Sec-Private-State-Token-Crypto-Version`
- `Sec-Redemption-Record`
- Private State Token API
