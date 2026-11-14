---
title: "Reason: CORS disabled"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corsdisabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: CORS disabled

## Reason

```plain
Reason: CORS disabled
```

## What went wrong?

A request that needs to use CORS was attempted, but CORS is disabled in
the user's browser. When this happens, the user needs to turn CORS back on in their
browser.

In Firefox, the preference that disables CORS is `content.cors.disable`.
Setting this to `true` disables CORS, so whenever that's the case, CORS
requests will always fail with this error.

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
