---
title: "WebTransport: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: close() method

The **`close()`** method of the `WebTransport` interface closes an ongoing WebTransport session.

## Syntax

```js
close(info)
```

### Parameters

- `info` (optional)
    An object containing the following properties:
    - `closeCode`
        A number representing the error code for the error.
    - `reason`
        A string representing the reason for closing the `WebTransport`.

### Return value

`undefined`.

### Exceptions

- `WebTransportError`
    Thrown if `close()` is invoked while the WebTransport is in the process of connecting.

## Examples

```js
const url = "https://example.com:4999/wt";
// Initialize transport connection
const transport = new WebTransport(url);

// …

transport.close({
  closeCode: 17,
  reason: "CloseButtonPressed",
});
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
