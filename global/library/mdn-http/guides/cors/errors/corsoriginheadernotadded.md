---
title: "Reason: CORS header 'Origin' cannot be added"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corsoriginheadernotadded/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: CORS header 'Origin' cannot be added

## Reason

```plain
Reason: CORS header 'Origin' cannot be added
```

## What went wrong?

The user agent was unable to add the required `Origin`
header to the HTTP request. All CORS requests must have an
`Origin` header.

This can happen if the JavaScript code is running with enhanced privileges allowing it
access to multiple domains' content, for example.

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
