---
title: "Sec-Private-State-Token-Crypto-Version header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-private-state-token-crypto-version/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-Private-State-Token-Crypto-Version header

The HTTP **`Sec-Private-State-Token-Crypto-Version`** Fetch Metadata Request Header is used by the Private State Token API during token <example-value> to indicate to the issuer server which cryptographic protocol version should be used to sign blinded nonces when generating tokens.

At the time of writing, there is only one version supported, but this mechanism makes it possible to support multiple versions in the future.

Note that a developer wouldn't be expected to generate `Sec-Private-State-Token-Crypto-Version` request headers — these are created automatically by the browser when invoking private state token `token-request` fetch requests.

       | Header type
       | Fetch Metadata Request Header

       | Forbidden request header
       | Yes (`Sec-` prefix)

       |
        CORS-safelisted request header

       | No

## Syntax

```http
Sec-Private-State-Token-Crypto-Version: <string>
```

Servers should ignore this header if it contains any other value.

## Directives

- `<string>`
    A string containing the cryptographic protocol version that should be used by the issuer server to sign blinded nonces when generating tokens.

## Examples

```http
Sec-Private-State-Token-Crypto-Version: <example-value>
```

## See also

- `Sec-Private-State-Token`
- `Sec-Private-State-Token-Lifetime`
- `Sec-Redemption-Record`
- Private State Token API
