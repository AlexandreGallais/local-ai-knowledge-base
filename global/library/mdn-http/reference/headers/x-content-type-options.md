---
title: "X-Content-Type-Options header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/x-content-type-options/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# X-Content-Type-Options header

The HTTP **`X-Content-Type-Options`** response header indicates that the MIME types advertised in the `Content-Type` headers should be respected and not changed.
The header allows you to avoid MIME type sniffing by specifying that the MIME types are deliberately configured.

Site security testers usually expect this header to be set (and that the `Content-Type` header is correctly set for all resources).

The `nosniff` directive has two effects depending on the context:

- **Request blocking**: For requests with a destination of `"script"` or `"style"`, the browser blocks the response if the MIME type doesn't match an expected type (a JavaScript MIME type for scripts, or `text/css` for stylesheets). See the Fetch specification for details.
- **MIME type sniffing disabled**: For other response types, including navigations to a new HTML document, the browser uses the supplied `Content-Type` as-is instead of examining the content to infer the type.
  For example, if a server sends a response with `Content-Type: text/plain` and `X-Content-Type-Options: nosniff`, the browser will not interpret it as HTML, even if the content contains HTML markup.
  This prevents XSS-attacks where user-uploaded content is executed as an HTML document, even if the browser has specified that it should be treated as plain text (or some other type).
  See the MIME Sniffing specification for details.

       | Header type
       | Response header

       | Forbidden response header
       | No

## Syntax

```http
X-Content-Type-Options: nosniff
```

## Directives

- `nosniff`
    Blocks a request if the request destination is of type `style` and the MIME type is not `text/css`, or of type `script` and the MIME type is not a JavaScript MIME type.

    It also prevents MIME type sniffing for all other response types, causing the browser to use the declared `Content-Type` without examining the response content.
    In particular it prevents a browser from treating a response as `text/html` when it is loaded in a browsing context and the `Content-Type` header is absent or indicates a non-HTML type.

## See also

- `Content-Type`
- The original definition of X-Content-Type-Options by Microsoft.
- Use HTTP Observatory to test the security configuration of websites (including this header).
- Mitigating MIME Confusion Attacks in Firefox
