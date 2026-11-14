---
title: "Reason: expected 'true' in CORS header 'Access-Control-Allow-Credentials'"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corsmissingallowcredentials/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: expected 'true' in CORS header 'Access-Control-Allow-Credentials'

## Reason

```plain
Reason: expected 'true' in CORS header 'Access-Control-Allow-Credentials'
```

## What went wrong?

The CORS request requires that the server permit the use of
credentials, but the server's `Access-Control-Allow-Credentials`
header's value isn't set to `true` to enable their use.

To fix this problem on the client side, revise the code to not request the use of
credentials.

- If using the Fetch API, make sure
  `Request.credentials` is `"omit"`.
- If the request is being issued using `XMLHttpRequest`, make sure you're
  not setting `withCredentials` to
  `true`.
- If using Server-sent events,
  make sure `EventSource.withCredentials` is `false` (it's the
  default value).

To eliminate this error by changing the server's configuration, adjust the server's
configuration to set the `Access-Control-Allow-Credentials` header's value to
`true`.

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
