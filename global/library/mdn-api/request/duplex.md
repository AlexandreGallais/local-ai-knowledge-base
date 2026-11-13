---
title: "Request: duplex property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/duplex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: duplex property

The **`duplex`** read-only property of the `Request` interface returns the duplex mode of the request, which determines whether the browser must send the entire request before processing the response.

Although `duplex` can be passed as an option when constructing a `Request`, it is not currently exposed as a readable property on the resulting `Request` object in all browsers.

## Value

A string with the following possible value:

- `"half"`
    The browser must send the entire request before processing the response.

## Examples

### Checking a request's duplex mode

```js
const stream = new ReadableStream({/* ... */});
const request = new Request("/upload", {
  method: "POST",
  body: stream,
  duplex: "half", // Required for streaming requests
});

console.log(request.duplex); // "half"
```

## See also

- Fetch API
- `Request()` constructor
- `RequestInit.duplex` in request options
- Consuming a fetch as a stream
