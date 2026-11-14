---
title: "Content-Range header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Range header

The HTTP **`Content-Range`** response header is used in range requests to indicate where the content of a response body belongs in relation to a complete resource.

It should only be included in `206 Partial Content` or `416 Range Not Satisfiable` responses.

       | Header type
       |
        Response header,
        Content header

       | Forbidden request header
       | No

       |
        CORS-safelisted request header

       | No

## Syntax

```http
Content-Range: <unit> <range>/<size>
Content-Range: <unit> <range>/*
Content-Range: <unit> */<size>
```

## Directives

- `<unit>`
    The unit for specifying ranges.
    Currently, only `bytes` is supported.
- `<range>`
    A range with the format `<range-start>-<range-end>`, where `<range-start>` and `<range-end>` are integers for the start and end position (zero-indexed & inclusive) of the range in the given `<unit>`, respectively.
    `*` is used in a `416 Range Not Satisfiable` response to indicate that the value is not a range.
- `<size>`
    The total length of the document (or `*` if unknown).

## Examples

### Partial content response

This `206 Partial Content` response shows a partial response, with the `Content-Range` indicating that it contains the first 1024 bytes of a 146515 byte file.

```http
HTTP/2 206
content-type: image/jpeg
content-length: 1024
content-range: bytes 0-1023/146515
…

(binary content)
```

### Range not satisfiable

If the server cannot satisfy the requested range request, it should respond with a `416 Range Not Satisfiable` status, and the `Content-Range` should specify `*` for the range along with the total size of the resource.

```http
HTTP/2 416

Content-Range: bytes */67589
```

## See also

- HTTP range requests guide
- `If-Range`, `Range` headers
- `Content-Type`
- `206 Partial Content`, `416 Range Not Satisfiable` status codes
