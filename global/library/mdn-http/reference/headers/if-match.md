---
title: "If-Match header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/if-match/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# If-Match header

The HTTP **`If-Match`** request header makes a request conditional.
A server will return resources for `GET` and `HEAD` methods, or upload resource for `PUT` and other non-safe methods, only if the resource matches one of the `ETag` values in the `If-Match` request header.
If the conditional does not match, the `412 Precondition Failed` response is returned instead.

The comparison with the stored `ETag` uses the _strong comparison algorithm_, meaning two files are considered identical byte-by-byte.
If a listed `ETag` has the `W/` prefix indicating a weak entity tag, this comparison algorithm will never match it.

There are two common use cases:

- For `GET` and `HEAD` methods, used in combination with a `Range` header, it can guarantee that the new ranges requested
  come from the same resource as the previous one.
- For other methods, and in particular for `PUT`, `If-Match` can be used to prevent the lost update problem.
  It can check if the modification of a resource that the user wants to upload will not override another change that has been done since the original resource was fetched.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
If-Match: <etag_value>
If-Match: <etag_value>, <etag_value>, …
```

## Directives

- `<etag_value>`
    Entity tags uniquely representing the requested resources.
    They are a string of ASCII characters placed between double quotes (like `"675af34563dc-tr34"`).
    They may be prefixed by `W/` to indicate that they are 'weak', i.e., that they represent the resource semantically but not byte-by-byte.
    However, in an `If-Match` header, weak entity tags will never match.
- `*`
    The asterisk is a special value representing any resource.
    Note that this must match as `false` if the origin server does not have a current representation for the target resource.

## Examples

```http
If-Match: "bfc13a64729c4290ef5b2c2730249c88ca92d82d"

If-Match: "67ab43", "54ed21", "7892dd"

If-Match: *
```

## See also

- `ETag`
- `If-None-Match`, `If-Modified-Since`, `If-Unmodified-Since` conditional request headers
- `412 Precondition Failed`
