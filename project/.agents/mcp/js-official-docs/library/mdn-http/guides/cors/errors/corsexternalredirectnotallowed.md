---
title: "Reason: CORS request external redirect not allowed"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corsexternalredirectnotallowed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: CORS request external redirect not allowed

## Reason

```plain
Reason: CORS request external redirect not allowed
```

## What went wrong?

The CORS request was responded to by the server with an HTTP redirect
to a URL on a different origin than the original request, which is not permitted during
CORS requests.

For example, if the page `https://service.tld/fetchdata` were requested, and
the HTTP response is "301 Moved Permanently", "307 Temporary Redirect", or "308
Permanent Redirect" with a `Location` of
`https://anotherservice.net/getdata`, the CORS request will fail in this
manner.

To fix the problem, update your code to use the new URL as reported by the redirect,
thereby avoiding the redirect.

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
