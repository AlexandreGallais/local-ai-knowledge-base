---
title: "WebTransport: responseHeaders property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/responseheaders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: responseHeaders property

The **`responseHeaders`** read-only property of the `WebTransport` interface returns the HTTP headers from the server's response to the request that set up the session.

## Value

A `Headers` object, or `null` if the session has not yet been established.

The returned object is immutable: calling methods that modify it, such as `set()` or `append()`, throws a `TypeError`.

## Description

The session is set up using an extended `CONNECT` request.
The client can add custom headers to this request using the `headers` constructor option.
The server can include headers in its response to return application-specific information to the client, such as a session identifier.

The value is set before the `ready` promise fulfills.

The returned headers don't include `WT-Protocol`, which the server uses to indicate the application protocol it chose.
Use `WebTransport.protocol` to get the selected protocol instead.

## Examples

### Reading response headers

This example shows how you might send a custom header when setting up a session and then read a header that the server returns in its response.

```js
const url = "https://example.com:4999/wt";

async function initTransport(url) {
  const transport = new WebTransport(url, {
    // Custom request headers
    headers: { Authorization: "Bearer <example-value>" },
  });

  // responseHeaders is null until the session is established
  console.log(transport.responseHeaders); // null

  await transport.ready;

  // Log all the response headers
  for (const [name, value] of transport.responseHeaders) {
    console.log(`${name}: ${value}`);
  }

  // Read a specific header
  const sessionId = transport.responseHeaders.get("X-Session-Id");
  console.log(`Session ID: ${sessionId}`);

  return transport;
}

initTransport(url);
```

## See also

- `WebTransport()` constructor `headers` option
- `WebTransport.protocol`
