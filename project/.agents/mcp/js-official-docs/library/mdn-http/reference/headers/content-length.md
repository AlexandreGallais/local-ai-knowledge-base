---
title: "Content-Length header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Length header

The HTTP **`Content-Length`** header indicates the size, in bytes, of the message body sent to the recipient.

`Content-Length` is limited in that the message size must be known up front, before sending the headers, which is a problem when content is dynamically generated or streamed.

- In HTTP/1.0, it is required.
- In HTTP/1.1, it could be replaced with `Transfer-Encoding: chunked` for responses sent out in parts as its size is calculated.
- In HTTP/2, `Content-Length` is redundant, because the content length may be inferred from DATA frames. It may still be included for backwards compatibility.

       | Header type
       |
        Request header,
        Response header,
        Content header

       | Forbidden request header
       | Yes

       |
        CORS-safelisted response header

       | Yes

## Syntax

```http
Content-Length: <length>
```

## Directives

- `<length>`
    The length in octets.

## See also

- `Transfer-Encoding`
