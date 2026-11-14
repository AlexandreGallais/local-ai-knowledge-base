---
title: "XMLHttpRequest: withCredentials property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/withcredentials/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: withCredentials property

The **`XMLHttpRequest.withCredentials`** property is a boolean value that indicates whether or not cross-site `Access-Control` requests should be made using credentials such as cookies, authentication headers or TLS client certificates. Setting `withCredentials` has no effect on same-origin requests.

In addition, this flag is also used to indicate when cookies are to be ignored in the response. The default is `false`. `XMLHttpRequest` responses from a different domain cannot set cookie values for their own domain unless `withCredentials` is set to `true` before making the request. The third-party cookies obtained by setting `withCredentials` to `true` will still honor same-origin policy and hence cannot be accessed by the requesting script through document.cookie or from response headers.

> **Note:**
> This never affects same-origin requests.

> **Note:**
> `XMLHttpRequest` responses from a different domain _cannot_ set cookie values for their own domain unless `withCredentials` is set to `true` before making the request, regardless of `Access-Control-` header values.

## Value

A boolean.

## Examples

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://example.com/", true);
xhr.withCredentials = true;
xhr.send(null);
```
