---
title: "Accept-Patch header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/accept-patch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Accept-Patch header

The HTTP **`Accept-Patch`** response header advertises which media types the server is able to understand in a `PATCH` request.
For example, a server receiving a `PATCH` request with an unsupported media type could reply with `415 Unsupported Media Type` and an `Accept-Patch` header referencing one or more supported media types.

The header should appear in `OPTIONS` requests to a resource that supports the `PATCH` method.
An `Accept-Patch` header in a response to any request method implicitly means that a `PATCH` is allowed on the target resource in the request.

> **Note:**
> IANA maintains a list of official content encodings.
> The `bzip` and `bzip2` encodings are non-standard but may be used in some cases, particularly for legacy support.

       | Header type
       | Response header

## Syntax

```http
Accept-Patch: <media-type>/<subtype>
Accept-Patch: <media-type>/*
Accept-Patch: */*

// Comma-separated list of media types
Accept-Patch: <media-type>/<subtype>, <media-type>/<subtype>
```

## Directives

- `<media-type>/<subtype>`
    A single, precise media type, like `text/html`.
- `<media-type>/*`
    A media type without a subtype.
    For example, `image/*` corresponds to `image/png`, `image/svg`, `image/gif`, and other image types.
- `*/*`
    Any media type.

## Examples

```http
Accept-Patch: application/json
Accept-Patch: application/json, text/plain
Accept-Patch: text/plain;charset=utf-8
```

## Browser compatibility

Browser compatibility is not relevant for this header.
The server sends the header, and the specification doesn't define client behavior.

## See also

- `Accept-Post`
- `415 Unsupported Media Type`
- `PATCH` request method
