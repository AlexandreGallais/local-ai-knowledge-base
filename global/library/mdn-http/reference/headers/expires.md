---
title: "Expires header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/expires/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Expires header

The HTTP **`Expires`** response header contains the date/time after which the response is considered expired in the context of HTTP caching.

The value `0` is used to represent a date in the past, indicating the resource has already expired.

> **Note:**
> If there is a `Cache-Control` header with the `max-age` or `s-maxage` directive in the response, the `Expires` header is ignored.

       | Header type
       | Response header

       |
        CORS-safelisted response header

       | Yes

## Syntax

```http
Expires: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
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
Expires: Wed, 21 Oct 2015 07:28:00 GMT
```

## See also

- HTTP caching guide
- `Cache-Control`
- `Age`
