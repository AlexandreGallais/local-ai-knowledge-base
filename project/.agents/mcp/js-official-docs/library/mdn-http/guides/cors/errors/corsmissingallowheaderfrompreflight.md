---
title: "Reason: missing token 'xyz' in CORS header 'Access-Control-Allow-Headers' from CORS preflight channel"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corsmissingallowheaderfrompreflight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: missing token 'xyz' in CORS header 'Access-Control-Allow-Headers' from CORS preflight channel

## Reason

```plain
Reason: missing token '<example-value>' in CORS header '<example-value>' from CORS preflight channel
```

## What went wrong?

The `Access-Control-Allow-Headers` header is sent by the server to let the client know which headers it supports for CORS requests. The value of `Access-Control-Allow-Headers` should be a comma-delineated list of header names, such as `X-Custom-Information` or any of the standard but non-basic <example-value> names (which are always allowed).

This error occurs when attempting to preflight a header that is not expressly allowed (that is, it's not included in the list specified by the `Access-Control-Allow-Headers` header sent by the server). To fix this, the server needs to be updated so that it allows the indicated header, or you need to avoid using that header.

If the server is not under your control, see Client-side considerations for alternative approaches.

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
- HTTP headers
