---
title: "Date header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/date/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date header

The HTTP **`Date`** request and response header contains the date and time at which the message originated.

       | Header type
       |
        Request header,
        Response header

       | Forbidden request header
       | Yes

## Syntax

```http
Date: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
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

### Response with a Date header

The following HTTP message is a successful `200` status, with a `Date` header showing the time the message originated.
Other headers are omitted for brevity:

```http
HTTP/1.1 200
Content-Type: text/html
Date: Tue, 29 Oct 2024 16:56:32 GMT

<html lang="en-US" …
```

### Attempting to set the field value in JavaScript

The `Date` header is a Forbidden request header, so this code cannot set the message `Date` field:

```js
fetch("https://httpbin.org/get", {
  headers: {
    Date: new Date().toUTCString(),
  },
});
```

## See also

- `Age`
