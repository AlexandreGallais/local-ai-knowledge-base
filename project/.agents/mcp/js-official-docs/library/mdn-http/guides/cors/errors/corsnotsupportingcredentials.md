---
title: "Reason: Credential is not supported if the CORS header 'Access-Control-Allow-Origin' is '*'"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/errors/corsnotsupportingcredentials/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reason: Credential is not supported if the CORS header 'Access-Control-Allow-Origin' is '*'

## Reason

```plain
Reason: Credential is not supported if the CORS header 'Access-Control-Allow-Origin' is '*'
```

## What went wrong?

The CORS request was attempted with the credentials flag set, but the server is configured using the wildcard (`"*"`) as the value of `Access-Control-Allow-Origin`, which doesn't allow the use of credentials.

To correct this problem on the client side, ensure that the credentials flag's value is `false` when issuing your CORS request.

- If using the Fetch API, make sure `Request.credentials` is `"omit"`.
- If the request is being issued using `XMLHttpRequest`, make sure you're not setting `withCredentials` to `true`.
- If using Server-sent events, make sure `EventSource.withCredentials` is `false` (it's the default value).

If, instead, you need to adjust the server's behavior, you'll need to change the value of `Access-Control-Allow-Origin` to grant access to the origin from which the client is loaded.

## See also

- CORS errors
- Glossary: CORS
- CORS introduction
