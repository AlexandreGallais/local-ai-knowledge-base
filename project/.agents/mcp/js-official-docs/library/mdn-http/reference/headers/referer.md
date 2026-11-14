---
title: "Referer header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/referer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Referer header

The HTTP **`Referer`** request header contains the absolute or partial address from which a resource has been requested.
The `Referer` header allows a server to identify referring pages that people are visiting from or where requested resources are being used.
This data can be used for analytics, logging, optimized caching, and more.

When you click a link, the `Referer` contains the address of the page that includes the link.
When you make resource requests to another domain, the `Referer` contains the address of the page that uses the requested resource.

The `Referer` header can contain an _origin_, _path_, and _querystring_, and may not contain URL fragments (i.e., `#section`) or `username:password` information.
The request's _referrer policy_ defines the data that can be included. See `Referrer-Policy` for more information and examples.

The `Referer` should also be sent in requests following a `Refresh` response (or equivalent `<meta http-equiv="refresh" content="...">`) that causes a navigation to a new page, if permitted by the referrer policy.

> **Note:**
> The header name "referer" is actually a misspelling of the word "referrer".
> See HTTP referer on Wikipedia for more details.

> **Warning:**
> This header may have undesirable consequences for user security and privacy.
> See Referer header: privacy and security concerns for more information and mitigation hints.

       | Header type
       | Request header

       | Forbidden request header
       | Yes

## Syntax

```http
Referer: <url>
```

## Directives

- `<url>`
    An absolute or partial address of the web page that makes the request.
    URL fragments (i.e., `#section`) and user info (i.e., `username:password` in `https://username:<example-password>@example.com/foo/bar/`) are not included.
    Origin, path, and query string may be included, depending on the referrer policy.

## Examples

```http
Referer: https://developer.mozilla.org/en-US/docs/Web/JavaScript
Referer: https://example.com/page?q=123
Referer: https://example.com/
```

## See also

- `Referrer-Policy`
- Same-origin policy
- Fetch: `Request.referrerPolicy`
- Tighter Control Over Your Referrers – Mozilla Security Blog
- HTTP referer on Wikipedia
