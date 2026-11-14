---
title: "Reason: CORS preflight channel did not succeed"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corspreflightdidnotsucceed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: CORS preflight channel did not succeed

## Reason

```plain
Reason: CORS preflight channel did not succeed
```

## What went wrong?

The CORS request requires preflight, preflighting could not be
performed. There are a couple of reasons why preflighting might fail:

- A cross-site request has previously been performed that already did a preflight, and
  doing the preflight again is not permitted. Make sure your code only preflights once
  per connection.
- The preflight request suffered any kind of networking error that might ordinarily
  occur.

If the server is not under your control, see Client-side considerations for alternative approaches.

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
