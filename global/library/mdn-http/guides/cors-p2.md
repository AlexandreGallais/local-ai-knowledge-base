---
title: "Cross-Origin Resource Sharing (CORS) (part 2 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cross-Origin Resource Sharing (CORS) (part 2 of 3)

## Examples of access control scenarios

We present three scenarios that demonstrate how Cross-Origin Resource Sharing works. All these examples use `fetch()`, which can make cross-origin requests in any supporting browser.

### Simple requests

Some requests don't trigger a CORS preflight. Those are called _simple requests_ from the obsolete CORS spec, though the Fetch spec (which now defines CORS) doesn't use that term.

The motivation is that the `<form>` element from HTML 4.0 (which predates cross-site `fetch()` and `XMLHttpRequest`) can submit simple requests to any origin, so anyone writing a server must already be protecting against cross-site request forgery (CSRF). Under this assumption, the server doesn't have to opt-in (by responding to a preflight request) to receive any request that looks like a form submission, since the threat of CSRF is no worse than that of form submission. However, the server still must opt-in using `Access-Control-Allow-Origin` to _share_ the response with the script.

A _simple request_ is one that **meets all the following conditions**:

- One of the allowed methods:
  - `GET`
  - `HEAD`
  - `POST`

- Apart from the headers automatically set by the user agent (for example, `Connection`, `User-Agent`, or the forbidden request headers), the only headers which are allowed to be manually set are the CORS-safelisted request-headers, which are:
  - `Accept`
  - `Accept-Language`
  - `Content-Language`
  - `Content-Type` (please note the additional requirements below)
  - `Range` (only with a single range header value; e.g., `bytes=256-` or `bytes=127-255`)

- The only type/subtype combinations allowed for the media type specified in the `Content-Type` header are:
  - `application/x-www-form-urlencoded`
  - `multipart/form-data`
  - `text/plain`

- If the request is made using an `XMLHttpRequest` object, no event listeners are registered on the object returned by the `XMLHttpRequest.upload` property used in the request; that is, given an `XMLHttpRequest` instance `xhr`, no code has called `xhr.upload.addEventListener()` to add an event listener to monitor the upload.
- No `ReadableStream` object is used in the request.

> **Note:**
> WebKit Nightly and Safari Technology Preview place additional restrictions on the values allowed in the `Accept`, `Accept-Language`, and `Content-Language` headers. If any of those headers have "nonstandard" values, WebKit/Safari does not consider the request to be a "simple request". What values WebKit/Safari consider "nonstandard" is not documented, except in the following WebKit bugs:
>
> - Require preflight for non-standard CORS-safelisted request headers Accept, Accept-Language, and Content-Language
> - Allow commas in Accept, Accept-Language, and Content-Language request headers for simple CORS
> - Switch to a blacklist model for restricted Accept headers in simple CORS requests
>
> No other browsers implement these extra restrictions because they're not part of the spec.

For example, suppose web content at `https://foo.example` wishes to fetch JSON content from domain `https://bar.other`. Code of this sort might be used in JavaScript deployed on `foo.example`:

```js
const fetchPromise = fetch("https://bar.other");

fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

This operation performs a simple exchange between the client and the server, using CORS headers to handle the privileges:

Let's look at what the browser will send to the server in this case:

```http
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```

The request header of note is `Origin`, which shows that the invocation is coming from `https://foo.example`.

Now let's see how the server responds:

```http
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml

[…XML Data…]
```

In response, the server returns an `Access-Control-Allow-Origin` header with `Access-Control-Allow-Origin: *`, which means that the resource can be accessed by **any** origin.

```http
Access-Control-Allow-Origin: *
```

This pattern of the `Origin` and `Access-Control-Allow-Origin` headers is the simplest use of the access control protocol. If the resource owners at `https://bar.other` wished to restrict access to the resource to requests _only_ from `https://foo.example` (i.e., no domain other than `https://foo.example` can access the resource in a cross-origin manner), they would send:

```http
Access-Control-Allow-Origin: https://foo.example
```

> **Note:**
> When responding to a credentialed requests request, the server **must** specify an origin in the value of the `Access-Control-Allow-Origin` header, instead of specifying the `*` wildcard.

### Preflighted requests

Unlike _simple requests_, for "preflighted" requests the browser first sends an HTTP request using the `OPTIONS` method to the resource on the other origin, in order to determine if the actual request is safe to send. Such cross-origin requests are preflighted since they may have implications for user data.

The following is an example of a request that will be preflighted:

```js
const fetchPromise = fetch("https://bar.other/doc", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "text/xml",
    "X-PINGOTHER": "pingpong",
  },
  body: "<person><name>Arun</name></person>",
});

fetchPromise.then((response) => {
  console.log(response.status);
});
```

The example above creates an XML body to send with the `POST` request. Also, a non-standard HTTP `X-PINGOTHER` request header is set. Such headers are not part of HTTP/1.1, but are generally useful to web applications. Since the request uses a `Content-Type` of `text/xml`, and since a custom header is set, this request is preflighted.

> **Note:**
> As described below, the actual `POST` request does not include the `Access-Control-Request-*` headers; they are needed only for the `OPTIONS` request.

Let's look at the full exchange between client and server. The first exchange is the _preflight request/response_:

```http
OPTIONS /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type,x-pingother

HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

The first block above represents the preflight request with the `OPTIONS` method. The browser determines that it needs to send this based on the request parameters that the JavaScript code snippet above was using, so that the server can respond whether it is acceptable to send the request with the actual request parameters. OPTIONS is an HTTP/1.1 method that is used to determine further information from servers, and is a safe method, meaning that it can't be used to change the resource. Note that along with the OPTIONS request, two other request headers are sent:

```http
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type,x-pingother
```

The `Access-Control-Request-Method` header notifies the server as part of a preflight request that when the actual request is sent, it will do so with a `POST` request method. The `Access-Control-Request-Headers` header notifies the server that when the actual request is sent, it will do so with `X-PINGOTHER` and `Content-Type` custom headers. Now the server has an opportunity to determine whether it can accept a request under these conditions.

The second block above is the response that the server returns, which indicate that the request method (`POST`) and request headers (`X-PINGOTHER`) are acceptable. Let's have a closer look at the following lines:

```http
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```

The server responds with `Access-Control-Allow-Origin: https://foo.example`, restricting access to the requesting origin domain only. It also responds with `Access-Control-Allow-Methods`, which says that `POST` and `GET` are valid methods to query the resource in question (this header is similar to the `Allow` response header, but used strictly within the context of access control).

The server also sends `Access-Control-Allow-Headers` with a value of `X-PINGOTHER, Content-Type`, confirming that these are permitted headers to be used with the actual request. Like `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` is a comma-separated list of acceptable headers.

Finally, `Access-Control-Max-Age` gives the value in seconds for how long the response to the preflight request can be cached without sending another preflight request. The default value is 5 seconds. In the present case, the max age is 86400 seconds (= 24 hours). Note that each browser has a maximum internal value that takes precedence when the `Access-Control-Max-Age` exceeds it.

Once the preflight request is complete, the real request is sent:

```http
POST /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
X-PINGOTHER: pingpong
Content-Type: text/xml; charset=UTF-8
Referer: https://foo.example/examples/preflightInvocation.html
Content-Length: 55
Origin: https://foo.example
Pragma: no-cache
Cache-Control: no-cache

<person><name>Arun</name></person>

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:40 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 235
Keep-Alive: timeout=2, max=99
Connection: Keep-Alive
Content-Type: text/plain

[Some XML content]
```

#### Preflighted requests and redirects

Not all browsers currently support following redirects after a preflighted request. If a redirect occurs after such a request, some browsers currently will report an error message such as the following:

> The request was redirected to `https://example.com/foo`, which is disallowed for cross-origin requests that require preflight.
> Request requires preflight, which is disallowed to follow cross-origin redirects.

The CORS protocol originally required that behavior but was subsequently changed to no longer require it. However, not all browsers have implemented the change, and thus still exhibit the originally required behavior.

Until browsers catch up with the spec, you may be able to work around this limitation by doing one or both of the following:

- Change the server-side behavior to avoid the preflight and/or to avoid the redirect
- Change the request such that it is a simple request that doesn't cause a preflight

If that's not possible, then another way is to:

1. Make a simple request (using `Response.url` for the Fetch API, or `XMLHttpRequest.responseURL`) to determine what URL the real preflighted request would end up at.
2. Make another request (the _real_ request) using the URL you obtained from `Response.url` or `XMLHttpRequest.responseURL` in the first step.

However, if the request is one that triggers a preflight due to the presence of the `Authorization` header in the request, you won't be able to work around the limitation using the steps above. And you won't be able to work around it at all unless you have control over the server the request is being made to.
