---
title: "Max-Forwards header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/max-forwards/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Max-Forwards header

The HTTP **`Max-Forwards`** request header is used with the `TRACE` and `OPTIONS` method to limit the number of nodes (usually proxies) that the request goes through.

Its value is an integer indicating the _maximum amount_ of nodes it must visit.
At each node, the value is decremented and the request is forwarded to the next node until the destination is reached or the received value of `Max-Forwards` is zero.
The request is then sent back (excluding sensitive headers where appropriate) as the body of a `200` response.
This allows the client to see what is being received at the other end of the request chain (the `Via` header is of particular interest) for testing or diagnostic purposes.

If the `Max-Forwards` header is not present in a `TRACE` or `OPTIONS` request, a node will assume that there is no maximum number of forwards.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
Max-Forwards: <integer>
```

## Examples

```http
Max-Forwards: 0
Max-Forwards: 10
```

## Browser compatibility

This feature is neither targeted at, nor implemented in, browsers.

## See also

- `TRACE` method
- `OPTIONS` method
- `405 Method Not Allowed`
