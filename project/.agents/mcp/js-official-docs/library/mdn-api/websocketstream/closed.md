---
title: "WebSocketStream: closed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocketstream/closed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocketStream: closed property

The **`closed`** read-only property of the
`WebSocketStream` interface returns a `Promise` that fulfills with an object once the socket connection is closed. The object contains the closing code and reason.

## Value

A promise, which fulfills with an object containing the following properties:

- `closeCode`
    A number representing the closing code (see the full list of `CloseEvent` status codes).
- `reason`
    A string representing a human-readable description of the reason why the socket connection was closed.

The promise rejects if the WebSocket connection did not close cleanly (for a clean close, the associated TCP connection must be closed _after_ the WebSocket closing handshake is completed).

## Examples

```js
const wsURL = "wss://127.0.0.1/";
const wss = new WebSocketStream(wsURL);

wss.closed.then((result) => {
  writeToScreen(
    `DISCONNECTED: code ${result.closeCode}, message "${result.reason}"`,
  );
  console.log("Socket closed", result.closeCode, result.reason);
});
```

See Using WebSocketStream to write a client for a complete example with full explanation.

## Specifications

Not currently a part of any specification. See https://github.com/whatwg/websockets/pull/48 for standardization progress.

## See also

- WebSocketStream: integrating streams with the WebSocket API, developer.chrome.com (2020)
