---
title: "Reason: invalid token 'xyz' in CORS header 'Access-Control-Allow-Methods'"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corsinvalidallowmethod/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: invalid token 'xyz' in CORS header 'Access-Control-Allow-Methods'

## Reason

```plain
Reason: invalid token '<example-value>' in CORS header '<example-value>'
```

## What went wrong?

The response to the CORS request that was sent by the server includes
an `Access-Control-Allow-Methods` header which includes at least one
invalid method name.

The `Access-Control-Allow-Methods` header is sent by the server to let the
client know what HTTP request methods it
supports for CORS requests. The header's value is a comma-delineated string of HTTP
method names, such as `GET`, `POST`, or
`HEAD`. If any of the specified values are not recognized by the client
user agent, this error occurs.

This is a problem that most likely can only be fixed on the server side, by modifying
the server's configuration to no longer send the invalid or unknown method name with the
`Access-Control-Allow-Methods` header. It may also be worth checking to
ensure that the user agent or HTTP library you're using on the client is up-to-date.

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
- HTTP request methods
