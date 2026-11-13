---
title: "Request: credentials property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/credentials/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: credentials property

The **`credentials`** read-only property of the `Request` interface reflects the value given to the `Request()` constructor in the `credentials` option. It determines whether or not the browser sends credentials with the request, as well as whether any **`Set-Cookie`** response headers are respected.

Credentials are cookies, TLS client certificates, or authentication headers containing a username and password.

See Including credentials for more details.

## Value

A string with one of the following values:

- `omit`
    Never send credentials in the request or include credentials in the response.
- `same-origin`
    Only send and include credentials for same-origin requests.
    This is the default.
- `include`
    Always include credentials, even for cross-origin requests.

## Examples

In the following snippet, we create a new request using the `Request()` constructor (for an image file in the same directory as the script), then save the request credentials in a variable:

```js
const request = new Request("flowers.jpg");
const credentials = request.credentials; // returns "same-origin" by default
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
