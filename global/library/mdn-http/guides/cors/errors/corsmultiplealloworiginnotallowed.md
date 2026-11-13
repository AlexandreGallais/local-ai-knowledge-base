---
title: "Reason: Multiple CORS header 'Access-Control-Allow-Origin' not allowed"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corsmultiplealloworiginnotallowed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: Multiple CORS header 'Access-Control-Allow-Origin' not allowed

## Reason

```plain
Reason: Multiple CORS header 'Access-Control-Allow-Origin' not allowed
```

## What went wrong?

More than one `Access-Control-Allow-Origin` header was sent by the
server. This isn't allowed.

If you have access to the server you can change your implementation to echo back an
origin in the `Access-Control-Allow-Origin` header. You cannot send back a
list of origins, because browsers only accept a value that is either a single origin or
null

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
- Enable CORS: I want to add CORS support to my server
