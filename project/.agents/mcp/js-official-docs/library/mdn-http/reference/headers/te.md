---
title: "TE header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/te/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TE header

The HTTP **`TE`** request header specifies the transfer encodings the user agent is willing to accept.
The transfer encodings are for message compression and chunking of data during transmission.

Transfer encodings are applied at the protocol layer, so an application consuming responses receives the body as if no encoding was applied.

> **Note:**
> In HTTP/2 and HTTP/3, the `TE` header field is only accepted if the `trailers` value is set.

       | Header type
       | Request header

       | Forbidden request header
       | Yes

## Syntax

```http
TE: compress
TE: deflate
TE: gzip
TE: trailers
```

Multiple directives in a comma-separated list with quality values as weights:

```http
TE: trailers, deflate;q=0.5
```

## Directives

- `compress`
    A format using the Lempel-Ziv-Welch (LZW) algorithm is accepted as a transfer coding name.
- `deflate`
    Using the zlib structure is accepted as a transfer coding name.
- `gzip`
    A format using the Lempel-Ziv coding (LZ77), with a 32-bit CRC is accepted as a transfer coding name.
- `trailers`
    Indicates that the client will not discard trailer fields in a chunked transfer coding.
- `q`
    When multiple transfer codings are acceptable, the `q` parameter (quality values) syntax orders codings by preference.

Note that `chunked` is always supported by HTTP/1.1 recipients, so you don't need to specify it using the `TE` header.
See the `Transfer-Encoding` header for more details.

## Examples

### Using the TE header with quality values

In the following request, the client indicates a preference for `gzip`-encoded responses with `deflate` as a second preference using a `q` value:

```http
GET /resource HTTP/1.1
Host: example.com
TE: gzip; q=1.0, deflate; q=0.8
```

## See also

- `Transfer-Encoding`
- `Content-Encoding`
- `Trailer`
- Chunked transfer encoding
