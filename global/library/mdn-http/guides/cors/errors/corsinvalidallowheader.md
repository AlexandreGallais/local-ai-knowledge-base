---
title: "Reason: invalid token 'xyz' in CORS header 'Access-Control-Allow-Headers'"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corsinvalidallowheader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: invalid token 'xyz' in CORS header 'Access-Control-Allow-Headers'

## Reason

```plain
Reason: invalid token '<example-value>' in CORS header '<example-value>'
```

## What went wrong?

The response to the CORS request that was sent by the server includes
an `Access-Control-Allow-Headers` header which includes at least one
invalid header name.

The `Access-Control-Allow-Headers` header is sent by the server in response
to a preflight request; it lets the client know which HTTP headers are permitted in CORS requests.
If the client user agent finds among the comma-delineated values
provided by the header any header name it does not recognize, this error occurs.

This is a problem that most likely can only be fixed on the server side, by modifying
the server's configuration to no longer send the invalid or unknown header name with the
`Access-Control-Allow-Headers` header. It may also be worth checking to
ensure that the user agent or HTTP library you're using on the client is up-to-date.

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
- HTTP headers
