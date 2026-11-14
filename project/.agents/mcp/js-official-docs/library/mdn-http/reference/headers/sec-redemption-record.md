---
title: "Sec-Redemption-Record header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-redemption-record/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-Redemption-Record header

The HTTP **`Sec-Redemption-Record`** Fetch Metadata Request Header is used by the Private State Token API when forwarding redemption records. The header contains a list of issuer and redemption record pairs corresponding to each redemption record.

Note that a developer wouldn't be expected to generate `Sec-Redemption-Record` request headers — these are created automatically by the browser when invoking private state token `send-redemption-record` fetch requests.

       | Header type
       | Fetch Metadata Request Header

       | Forbidden request header
       | Yes (`Sec-` prefix)

       |
        CORS-safelisted request header

       | No

## Syntax

```http
Sec-Redemption-Record: <string>
```

Servers should ignore this header if it contains any other value.

## Directives

- `<string>`
    A string containing issuer and redemption record pairs.

## Examples

```http
Sec-Redemption-Record: "https://redeemer.example";redemption-record="<example-jwt>.
```

## See also

- `Sec-Private-State-Token`
- `Sec-Private-State-Token-Crypto-Version`
- `Sec-Private-State-Token-Lifetime`
- Private State Token API
