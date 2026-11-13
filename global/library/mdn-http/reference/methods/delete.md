---
title: "DELETE request method"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/methods/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DELETE request method

The **`DELETE`** HTTP method asks the server to delete a specified resource.

Requests using `DELETE` should only be used to delete data and shouldn't contain a body.

> **Note:**
> The semantics of sending a message body in `DELETE` requests are undefined.
> Some servers may reject the request with a 4XX client error response.

       | Request has body
       | No

       | Successful response has body
       | May

       | Safe
       | No

       | Idempotent
       | Yes

       | Cacheable
       | No

       |
        Allowed in HTML forms

       | No

## Syntax

```http
DELETE <request-target>["?"<query>] HTTP/1.1
```

- `<request-target>`
    Identifies the target resource of the request when combined with the information provided in the `Host` header.
    This is an absolute path (e.g., `/path/to/file.html`) in requests to an origin server, and an absolute URL in requests to proxies (e.g., `http://www.example.com/path/to/file.html`).
- `<query>` (optional)
    An optional query component preceded by a question-mark `?`.
    Often used to carry identifying information in the form of `key=value` pairs.

## Examples

### Successfully deleting a resource

The following request asks the server to delete the resource `file.html`:

```http
DELETE /file.html HTTP/1.1
Host: example.com
```

If the request is successful, there are several possible successful response status codes.
A `204 No Content` response means the request was successful and no additional information needs to be sent back to the client:

```http
HTTP/1.1 204 No Content
Date: Wed, 04 Sep 2024 10:16:04 GMT
```

A `200 OK` response means the request was successful and the response body includes a representation describing the outcome:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Date: Fri, 21 Jun 2024 14:18:33 GMT
Content-Length: 1234

<html lang="en-US">
  <body>
    <h1>File "file.html" deleted.</h1>
  </body>
</html>
```

A `202 Accepted` response means the request has been accepted and will probably succeed, but the resource has not yet been deleted by the server.

```http
HTTP/1.1 202 Accepted
Date: Wed, 26 Jun 2024 12:00:00 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 1234

<html lang="en-US">
  <body>
    <h1>Deletion of "file.html" accepted.</h1>
    <p>See <a href="http://example.com/tasks/123/status">the status monitor</a> for details.</p>
  </body>
</html>
```

## Browser compatibility

The browser doesn't use the `DELETE` method for user-initiated actions, so "browser compatibility" doesn't apply.
Developers can set this request method using `fetch()`.

## See also

- HTTP statuses: `200`, `202`, `204`
- HTTP request methods
- HTTP response status codes
- HTTP headers
