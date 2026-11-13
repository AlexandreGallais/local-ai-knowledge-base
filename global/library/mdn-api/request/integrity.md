---
title: "Request: integrity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/integrity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: integrity property

The **`integrity`** read-only property of the `Request` interface contains the subresource integrity value of the request.

## Value

The value that was passed as the `options.integrity` argument when constructing the `Request`.

If an integrity has not been specified, the property returns `''`.

## Examples

In the following snippet, we create a new request using the `Request()` constructor (for an image file in the same directory as the script), then reads the request's integrity. Because the request was created without a specific integrity, the property returns an empty string.

```js
const myRequest = new Request("flowers.jpg");
console.log(myRequest.integrity); // ""
```

In the example below, the request was created with a specific integrity value, so the property returns that value. Note that there's no validation of the integrity value; the property returns exactly what was passed in.

```js
const myRequest = new Request("flowers.jpg", {
  integrity: "sha256-abc123",
});
console.log(myRequest.integrity); // "sha256-abc123"
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
