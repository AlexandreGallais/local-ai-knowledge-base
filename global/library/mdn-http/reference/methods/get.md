---
title: "GET request method"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/methods/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GET request method

The **`GET`** HTTP method requests a representation of the specified resource.
Requests using `GET` should only be used to request data and shouldn't contain a body.

> **Note:**
> The semantics of sending a message body in `GET` requests are undefined.
> Some servers may reject the request with a 4XX client error response.

       | Request has body
       | No

       | Successful response has body
       | Yes

       | Safe
       | Yes

       | Idempotent
       | Yes

       | Cacheable
       | Yes

       | Allowed in HTML forms
       | Yes

## Syntax

```http
GET <request-target>["?"<query>] HTTP/1.1
```

- `<request-target>`
    Identifies the target resource of the request when combined with the information provided in the `Host` header.
    This is an absolute path (e.g., `/path/to/file.html`) in requests to an origin server, and an absolute URL in requests to proxies (e.g., `http://www.example.com/path/to/file.html`).
- `<query>` (optional)
    An optional query component preceded by a question-mark `?`.
    Often used to carry identifying information in the form of `key=value` pairs.

## Examples

### Successfully retrieving a resource

The following `GET` request asks for the resource at `example.com/contact`:

```http
GET /contact HTTP/1.1
Host: example.com
User-Agent: curl/8.6.0
Accept: */*
```

The server sends back the resource with a `200 OK` status code, indicating success:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Date: Fri, 21 Jun 2024 14:18:33 GMT
Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT
Content-Length: 1234

<!doctype html>
<!-- HTML content follows -->
```

## See also

- HTTP request methods
- HTTP response status codes
- HTTP headers
- `Range` header
- `POST` method
