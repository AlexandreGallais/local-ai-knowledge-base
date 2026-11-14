---
title: "Sec-Private-State-Token header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-private-state-token/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-Private-State-Token header

The HTTP **`Sec-Private-State-Token`** header exists both as a request and a response header. It is used by the Private State Token API during issuance and redemption requests to transmit request data and response data.

During token <example-value>, the `Sec-Private-State-Token` request header contains a collection of unsigned, blinded nonces required to generate a private state token to the issuer server. A successful response should include a `Sec-Private-State-Token` response header containing blind signatures, which the browser then unblinds and stores along with the original unblinded nonces in a secure token store.

During token <example-value>, the `Sec-Private-State-Token` request header contains a single signed, unblinded token along with associated redemption metadata. A successful response should include a `Sec-Private-State-Token` response header containing a signed redemption record, which is again stored securely by the browser.

Note that a developer wouldn't be expected to generate `Sec-Private-State-Token` request headers — these are created automatically by the browser when invoking private state token `token-request` and `token-redemption` fetch requests.

       | Header type
       | Fetch Metadata Request Header, Response header

       | Forbidden request header
       | Yes (`Sec-` prefix)

       |
        CORS-safelisted request header

       | No

## Syntax

```http
Sec-Private-State-Token: <string>
```

Servers should ignore this header if it contains any other value.

## Directives

- `<string>`
    A string containing the required data for private state token <example-value> and redemption operation requests and responses.

## Examples

Sample request header sent during token <example-value>:

```http
Sec-Private-State-Token: <example-value>…
```

Sample response header:

```http
Sec-Private-State-Token: <example-value>…
```

## See also

- `Sec-Private-State-Token-Crypto-Version`
- `Sec-Private-State-Token-Lifetime`
- `Sec-Redemption-Record`
- Private State Token API
