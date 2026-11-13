---
title: "WebSocketStream: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocketstream/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocketStream: close() method

The **`close()`** method of the
`WebSocketStream` interface closes the WebSocket connection. The method optionally accepts an object containing a custom code and/or reason indicating why the connection was closed.

## Syntax

```js
close()
close(options)
```

### Parameters

- `options` (optional)
    An options object containing the following properties:
    - `closeCode` (optional)
        A number representing the closing code (see the full list of `CloseEvent` status codes).
    - `reason` (optional)
        A string representing a human-readable description of the reason why the socket connection is closed. The maximum allowed length for a `reason` string is 123 bytes. The string is automatically encoded as UTF-8 when the function is invoked.

> **Note:**
> Depending on the server setup and status code you use, the server may choose to ignore a custom code in favor of a valid code that is correct for the closing reason. Valid codes are 1000, and any code within the range 3000 to 4999, inclusive.

### Return value

None (`undefined`).

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if the provided `reason` is longer than the maximum allowed length of 123 bytes.

## Examples

```js
const wsURL = "wss://127.0.0.1/";
const wss = new WebSocketStream(wsURL);

setTimeout(() => {
  wss.close({
    closeCode: 1000,
    reason: "That's all folks",
  });
}, 10000);
```

## Specifications

Not currently a part of any specification. See https://github.com/whatwg/websockets/pull/48 for standardization progress.

## See also

- WebSocketStream: integrating streams with the WebSocket API, developer.chrome.com (2020)
