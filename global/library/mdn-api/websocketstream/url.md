---
title: "WebSocketStream: url property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocketstream/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocketStream: url property

The **`url`** read-only property of the
`WebSocketStream` interface returns the URL of the WebSocket server that the `WebSocketStream` instance was created with.

## Value

A string.

## Examples

```js
const wss = new WebSocketStream("wss://example.com/wss");

// Logs "example.com/wss" to the console
console.log(wss.url);
```

## Specifications

Not currently a part of any specification. See https://github.com/whatwg/websockets/pull/48 for standardization progress.

## See also

- WebSocketStream: integrating streams with the WebSocket API, developer.chrome.com (2020)
