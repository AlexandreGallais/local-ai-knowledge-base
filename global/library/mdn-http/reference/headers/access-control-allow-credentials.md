---
title: "Access-Control-Allow-Credentials header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/access-control-allow-credentials/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Access-Control-Allow-Credentials header

The HTTP **`Access-Control-Allow-Credentials`** response header tells browsers whether the server allows credentials to be included in cross-origin HTTP requests.

Credentials <example-value> cookies, Transport Layer Security (TLS) client certificates, or authentication headers containing a username and password.
By default, these credentials are not sent in cross-origin requests, and doing so can make a site vulnerable to Cross-Site Request Forgery (CSRF) attacks.

A client can ask for credentials to be included in cross-site requests in several ways:

- Using `fetch()`, by setting the `credentials` option to `"include"`.
- Using `XMLHttpRequest`, by setting the `XMLHttpRequest.withCredentials` property to `true`.
- Using `EventSource()`, by setting the `EventSource.withCredentials` property to `true`.

When credentials are included:

- For preflighted requests: The preflight request does not include credentials.
  If the server's response to the preflight request sets the `Access-Control-Allow-Credentials` header to `true`, then the real request will include credentials; otherwise, the browser reports a network error.
- For non-preflighted requests: The request will include credentials, and if the server's response does not set the `Access-Control-Allow-Credentials` header to `true`, the browser reports a network error.

       | Header type
       | Response header

## Syntax

```http
Access-Control-Allow-Credentials: true
```

## Directives

- `true`
    The server allows credentials to be included in cross-origin HTTP requests.
    This is the only valid value for this header and is case-sensitive.
    If you don't need credentials, omit this header entirely rather than setting its value to `false`.

## Examples

Allow credentials:

```http
Access-Control-Allow-Credentials: true
```

Using `fetch()` with credentials:

```js
fetch(url, {
  credentials: "include",
});
```

Using `XMLHttpRequest` with credentials:

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://example.com/", true);
xhr.withCredentials = true;
xhr.send(null);
```

## See also

- `XMLHttpRequest.withCredentials`
- `Request()`
