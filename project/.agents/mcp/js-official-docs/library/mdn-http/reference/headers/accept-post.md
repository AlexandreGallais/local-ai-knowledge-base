---
title: "Accept-Post header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/accept-post/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Accept-Post header

The HTTP **`Accept-Post`** response header advertises which media types are accepted by the server in a `POST` request.
For example, a server receiving a `POST` request with an unsupported media type could reply with `415 Unsupported Media Type` and an `Accept-Post` header referencing one or more supported media types.

The header should appear in `OPTIONS` requests to a resource that supports the `POST` method.
An `Accept-Post` header in a response to any request method implicitly means that a `POST` is allowed on the target resource in the request.

> **Note:**
> IANA maintains a list of official content encodings.
> The `bzip` and `bzip2` encodings are non-standard but may be used in some cases, particularly for legacy support.

       | Header type
       | Response header

## Syntax

```http
Accept-Post: <media-type>/<subtype>
Accept-Post: <media-type>/*
Accept-Post: */*

// Comma-separated list of media types
Accept-Post: <media-type>/<subtype>, <media-type>/<subtype>
```

> **Note:**
> The `Accept-Post` header specifies a media range in the same way as `Accept`, except that it has no notion of preference via `q` (quality values) arguments.
> This is because `Accept-Post` is a response header while `Accept` is a request header.

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
Accept-Post: application/json, text/plain
Accept-Post: image/webp
Accept-Post: */*
```

## Browser compatibility

Browser compatibility is not relevant for this header.
The header is sent by the server and the specification does not define client behavior.

## See also

- `Accept-Patch`
- `POST` request method
