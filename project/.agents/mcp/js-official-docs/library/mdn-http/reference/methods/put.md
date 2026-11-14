---
title: "PUT request method"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/methods/put/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PUT request method

The **`PUT`** HTTP method creates a new resource or replaces a representation of the target resource with the request content.

The difference between `PUT` and `POST` is that `PUT` is idempotent: calling it once is no different from calling it several times successively (there are no _side_ effects).

       | Request has body
       | Yes

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
PUT <request-target>["?"<query>] HTTP/1.1
```

- `<request-target>`
    Identifies the target resource of the request when combined with the information provided in the `Host` header.
    This is an absolute path (e.g., `/path/to/file.html`) in requests to an origin server, and an absolute URL in requests to proxies (e.g., `http://www.example.com/path/to/file.html`).
- `<query>` (optional)
    An optional query component preceded by a question-mark `?`.
    Often used to carry identifying information in the form of `key=value` pairs.

## Examples

### Successfully creating a resource

The following `PUT` request asks to create a resource at `example.com/new.html` with the content `New File`:

```http
PUT /new.html HTTP/1.1
Host: example.com
Content-type: text/html
Content-length: 16

<p>New File</p>
```

If the target resource **does not** have a current representation and the `PUT` request successfully creates one, then the origin server must send a `201 Created` response:

```http
HTTP/1.1 201 Created
Content-Location: /new.html
```

If the target resource **does** have a current representation and that representation is successfully modified with the state in the request, the origin server must send either a `200 OK` or a `204 No Content` to indicate successful completion of the request:

```http
HTTP/1.1 204 No Content
Content-Location: /existing.html
```

## Browser compatibility

The browser doesn't use the `PUT` method for user-initiated actions, so "browser compatibility" doesn't apply.
Developers can set this request method using `fetch()`.

## See also

- HTTP request methods
- HTTP response status codes
- HTTP headers
- `201 Created`, `204 No Content` response statuses
