---
title: "Refresh header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/refresh/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Refresh header

The HTTP **`Refresh`** response header directs a web browser to either refresh or redirect the page when a specified amount of time has passed after the page was fully loaded.
It is exactly equivalent to using `<meta http-equiv="refresh" content="...">` in HTML.

> **Note:**
> Even though it's present in the HTTP response, the `Refresh` header is still handled by the HTML loading machinery and happens after HTTP or JavaScript redirects. See redirection order of precedence for more information.

> **Note:**
> When a refresh redirects to a new page, the `Referer` header is included in the request for the new page (if permitted by the `Referrer-Policy`), and `document.referrer` is set to the referrer URL after navigating.

       | Header type
       | Response header

## Syntax

```http
Refresh: <time>
Refresh: <time>, url=<url>
Refresh: <time>; url=<url>
```

- `<time>`
    A non-negative number of seconds after which to refresh the page. Fractional parts are recognized but ignored; you should only specify integers.
- `<url>` (optional)
    If present, the browser will redirect to the specified URL instead of refreshing with the current URL. This URL can be quoted or unquoted. The `url=` prefix is case-insensitive and optional.

## Examples

### Refreshing a page after a specific time

This header will cause the browser to refresh the page 5 seconds after it is fully loaded (that is, after the `load` event):

```http
Refresh: 5
```

### Redirecting after a specific time

This header will cause the browser to redirect to a URL 5 seconds after the page is fully loaded:

```http
Refresh: 5; url=https://example.com/
```

> **Note:**
> See the `http-equiv="refresh"` attribute in the HTML reference for important information about accessibility implications of automatic redirects.

## See also

- `<meta>`
- Redirections in HTTP
- The Refresh header is still with us HTTP Working Group message (2019)
