---
title: "If-Unmodified-Since header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/if-unmodified-since/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# If-Unmodified-Since header

The HTTP **`If-Unmodified-Since`** request header makes the request for the resource conditional.
The server will send the requested resource (or accept it in the case of a `POST` or another non-safe method) only if the resource on the server has not been modified after the date in the request header.
If the resource has been modified after the specified date, the response will be a `412 Precondition Failed` error.

The `If-Unmodified-Since` header is commonly used in the following situations:

- In conjunction with non-safe methods like `POST`, this header can be used to implement an optimistic concurrency control, as is done by some wikis: revision are rejected if the stored document has been modified since the original was retrieved, avoiding conflicts.
- In conjunction with a range request using the `Range` header, this header can be used to ensure that the new fragment requested comes from an unmodified document.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
If-Unmodified-Since: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
```

## Directives

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
If-Unmodified-Since: Wed, 21 Oct 2015 07:28:00 GMT
```

## See also

- HTTP Conditional Requests guide
- `Last-Modified`
- `If-Range`, `Range` range request headers
- `If-Match`, `If-Modified-Since`, `If-None-Match` conditional request headers
- `304 Not Modified`, `412 Precondition Failed` response status codes
