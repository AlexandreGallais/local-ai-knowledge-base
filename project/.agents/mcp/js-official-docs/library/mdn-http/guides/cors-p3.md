---
title: "Cross-Origin Resource Sharing (CORS) (part 3 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cross-Origin Resource Sharing (CORS) (part 3 of 3)

### Requests with credentials

> **Note:**
> When making credentialed requests to a different domain, third-party cookie policies will still apply. The policy is always enforced regardless of any setup on the server and the client as described in this chapter.

The most interesting capability exposed by both `fetch()` or `XMLHttpRequest` and CORS is the ability to make "credentialed" requests that are aware of HTTP cookies and HTTP Authentication information. By default, in cross-origin `fetch()` or `XMLHttpRequest` calls, browsers will _not_ send credentials.

To ask for a `fetch()` request to include credentials, set the `credentials` option to `"include"`.

To ask for an `XMLHttpRequest` request to include credentials, set the `XMLHttpRequest.withCredentials` property to `true`.

In this example, content originally loaded from `https://foo.example` makes a GET request to a resource on `https://bar.other` which sets Cookies. Content on foo.example might contain JavaScript like this:

```js
const url = "https://bar.other/resources/credentialed-content/";

const request = new Request(url, { credentials: "include" });

const fetchPromise = fetch(request);
fetchPromise.then((response) => console.log(response));
```

This code creates a `Request` object, setting the `credentials` option to `"include"` in the constructor, then passes this request into `fetch()`. Since this is a simple `GET` request, it is not preflighted but the browser will **reject** any response that does not have the `Access-Control-Allow-Credentials` header set to `true`, and **not** make the response available to the invoking web content.

Here is a sample exchange between client and server:

```http
GET /resources/credentialed-content/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Referer: https://foo.example/examples/credential.html
Origin: https://foo.example
Cookie: pageAccess=2

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:34:52 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Set-Cookie: pageAccess=3; expires=Wed, 31-Dec-2008 01:34:53 GMT
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 106
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain

[text/plain content]
```

Although the request's `Cookie` header contains the cookie destined for the content on `https://bar.other`, if bar.other did not respond with an `Access-Control-Allow-Credentials` with value `true`, as demonstrated in this example, the response would be ignored and not made available to the web content.

#### Preflight requests and credentials

CORS-preflight requests must never include credentials. The _response_ to a preflight request must specify `Access-Control-Allow-Credentials: true` to indicate that the actual request can be made with credentials.

> **Note:**
> Some enterprise authentication services require that TLS client certificates be sent in preflight requests, in contravention of the Fetch specification.
>
> Firefox 87 allows this non-compliant behavior to be enabled by setting the preference: `network.cors_preflight.allow_client_cert` to `true` (Firefox bug 1511151). Chromium-based browsers currently always send TLS client certificates in CORS preflight requests (Chrome bug 775438).

#### Credentialed requests and wildcards

When responding to a credentialed request:

- The server **must not** specify the `*` wildcard for the `Access-Control-Allow-Origin` response-header value, but must instead specify an explicit origin; for example: `Access-Control-Allow-Origin: https://example.com`
- The server **must not** specify the `*` wildcard for the `Access-Control-Allow-Headers` response-header value, but must instead specify an explicit list of header names; for example, `Access-Control-Allow-Headers: X-PINGOTHER, Content-Type`
- The server **must not** specify the `*` wildcard for the `Access-Control-Allow-Methods` response-header value, but must instead specify an explicit list of method names; for example, `Access-Control-Allow-Methods: POST, GET`
- The server **must not** specify the `*` wildcard for the `Access-Control-Expose-Headers` response-header value, but must instead specify an explicit list of header names; for example, `Access-Control-Expose-Headers: Content-Encoding, Kuma-Revision`

If a request includes a credential (most commonly a `Cookie` header) and the response includes an `Access-Control-Allow-Origin: *` header (that is, with the wildcard), the browser will block access to the response, and report a CORS error in the devtools console.

But if a request does include a credential (like the `Cookie` header) and the response includes an actual origin rather than the wildcard (like, for example, `Access-Control-Allow-Origin: https://example.com`), then the browser will allow access to the response from the specified origin.

Also note that any `Set-Cookie` response header in a response would not set a cookie if the `Access-Control-Allow-Origin` value in that response is the `*` wildcard rather an actual origin.

#### Third-party cookies

Note that cookies set in CORS responses are subject to normal third-party cookie policies. In the example above, the page is loaded from `foo.example` but the `Set-Cookie` header in the response is sent by `bar.other`, and would thus not be saved if the user's browser is configured to reject all third-party cookies.

Cookies set in CORS requests and responses are subject to normal third-party cookie policies.

Third-party cookie policies may prevent third-party cookies being sent in requests, effectively stopping a site from making credentialed requests even if permitted by the third-party server (using `Access-Control-Allow-Credentials`).
The default policy differs between browsers, but may be set using the SameSite attribute.

Even if credentialed requests are allowed, a browser may be configured to reject all third-party cookies in responses.

## The HTTP response headers

This section lists the HTTP response headers that servers return for access control requests as defined by the Cross-Origin Resource Sharing specification. The previous section gives an overview of these in action.

### Access-Control-Allow-Origin

A returned resource may have one `Access-Control-Allow-Origin` header with the following syntax:

```http
Access-Control-Allow-Origin: <origin> | *
```

`Access-Control-Allow-Origin` specifies either a single origin which tells browsers to allow that origin to access the resource; or else — for requests **without** credentials — the `*` wildcard tells browsers to allow any origin to access the resource.

For example, to allow code from the origin `https://mozilla.org` to access the resource, you can specify:

```http
Access-Control-Allow-Origin: https://mozilla.org
Vary: Origin
```

If the server specifies a single origin (that may dynamically change based on the requesting origin as part of an allowlist) rather than the `*` wildcard, then the server should also include `Origin` in the `Vary` response header to indicate to clients that server responses will differ based on the value of the `Origin` request header.

### Access-Control-Expose-Headers

The `Access-Control-Expose-Headers` header adds the specified headers to the allowlist that JavaScript (such as `Response.headers`) in browsers is allowed to access.

```http
Access-Control-Expose-Headers: <header-name>[, <header-name>]*
```

For example, the following would allow the `X-My-Custom-Header` and `X-Another-Custom-Header` headers to be exposed to the browser:

```http
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```

### Access-Control-Max-Age

The `Access-Control-Max-Age` header indicates how long the results of a preflight request can be cached. For an example of a preflight request, see the above examples.

```http
Access-Control-Max-Age: <delta-seconds>
```

The `delta-seconds` parameter indicates the number of seconds the results can be cached.

### Access-Control-Allow-Credentials

The `Access-Control-Allow-Credentials` header indicates whether or not the response to the request can be exposed when the `credentials` flag is true. When used as part of a response to a preflight request, this indicates whether or not the actual request can be made using credentials. Note that simple `GET` requests are not preflighted, and so if a request is made for a resource with credentials, if this header is not returned with the resource, the response is ignored by the browser and not returned to web content.

```http
Access-Control-Allow-Credentials: true
```

Credentialed requests are discussed above.

### Access-Control-Allow-Methods

The `Access-Control-Allow-Methods` header specifies the method or methods allowed when accessing the resource. This is used in response to a preflight request. The conditions under which a request is preflighted are discussed above.

```http
Access-Control-Allow-Methods: <method>[, <method>]*
```

An example of a preflight request is given above, including an example which sends this header to the browser.

### Access-Control-Allow-Headers

The `Access-Control-Allow-Headers` header is used in response to a preflight request to indicate which HTTP headers can be used when making the actual request. This header is the server side response to the browser's `Access-Control-Request-Headers` header.

```http
Access-Control-Allow-Headers: <header-name>[, <header-name>]*
```

## The HTTP request headers

This section lists headers that clients may use when issuing HTTP requests in order to make use of the cross-origin sharing feature. Note that these headers are set for you when making invocations to servers. Developers making cross-origin requests do not have to set any cross-origin sharing request headers programmatically.

### Origin

The `Origin` header indicates the origin of the cross-origin access request or preflight request.

```http
Origin: <origin>
```

The origin is a URL indicating the server from which the request is initiated. It does not include any path information, only the server name.

> **Note:**
> The `origin` value can be `null`.

Note that in any access control request, the `Origin` header is **always** sent.

### Access-Control-Request-Method

The `Access-Control-Request-Method` is used when issuing a preflight request to let the server know what HTTP method will be used when the actual request is made.

```http
Access-Control-Request-Method: <method>
```

Examples of this usage can be found above.

### Access-Control-Request-Headers

The `Access-Control-Request-Headers` header is used when issuing a preflight request to let the server know what HTTP headers will be used when the actual request is made (for example, by passing them as the `headers` option). This browser-side header will be answered by the complementary server-side header of `Access-Control-Allow-Headers`.

```http
Access-Control-Request-Headers: <field-name>[,<field-name>]*
```

Examples of this usage can be found above.

## See also

- CORS errors
- Enable CORS: I want to add CORS support to my server
- Fetch API
- `XMLHttpRequest`
- Will it CORS? - an interactive CORS explainer & generator
- How to run Chrome browser without CORS
- Using CORS with All (Modern) Browsers
- Stack Overflow answer with "how to" info for dealing with common problems:
  - How to avoid the CORS preflight
  - How to use a CORS proxy to get around _"No Access-Control-Allow-Origin header"_
  - How to fix _"Access-Control-Allow-Origin header must not be the wildcard"_
