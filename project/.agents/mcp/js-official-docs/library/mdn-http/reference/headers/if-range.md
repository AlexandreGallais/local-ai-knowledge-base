---
title: "If-Range header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/if-range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# If-Range header

The HTTP **`If-Range`** request header makes a range request conditional.
If the condition is fulfilled, a range request is issued, and the server sends back a `206 Partial Content` response with part (or parts) of the resource in the body.
If the condition is not fulfilled, the full resource is sent back with a `200 OK` status.

This header can be used either with the `Last-Modified` validator or with `ETag`, but not with both.

The most common use case is to resume a download with guarantees that the resource on the server has not been modified since the last part has been received by the client.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
If-Range: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
If-Range: <etag>
```

## Directives

- `<etag>`
    An entity tag uniquely representing the requested resource. It is a string of ASCII
    characters placed between double quotes (Like `"675af34563dc-tr34"`). A weak entity tag (one prefixed by `W/`) must not be used in this header.
- `<day-name>`
    One of `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, or `Sun` (case-sensitive).
- `<day>`
    2 digit day number, e.g., "04" or "23".
- `<month>`
    One of `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec` (case sensitive).
- `<year>`
    4 digit year number, e.g., "1990" or "2016".
- `<hour>`
    2 digit hour number, e.g., "09" or "23".
- `<minute>`
    2 digit minute number, e.g., "04" or "59".
- `<second>`
    2 digit second number, e.g., "04" or "59".
- GMT
    Greenwich Mean Time. HTTP dates are always expressed in GMT, never in local time.

## Examples

```http
If-Range: Wed, 21 Oct 2015 07:28:00 GMT

If-Range: "67ab43"
```

## See also

- HTTP Conditional Requests guide
- `ETag`
- `Last-Modified`
- `If-Match`, `If-Modified-Since`, `If-Unmodified-Since`, `If-None-Match` conditional request headers
- `206 Partial Content`, `412 Precondition Failed`, `416 Range Not Satisfiable` response status codes
