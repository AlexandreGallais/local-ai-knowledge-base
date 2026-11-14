---
title: "WebSocket: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocket/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket: error event

The `error` event is fired when a connection with a `WebSocket` has been closed due to an error (some data couldn't be sent for example).

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("error", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onerror = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
// Create WebSocket connection
const socket = new WebSocket("ws://localhost:8080");

// Listen for possible errors
socket.addEventListener("error", (event) => {
  console.log("WebSocket error: ", event);
});
```

## See also

- WebSocket: close event
- WebSocket: message event
- WebSocket: open event
- Writing WebSocket client applications
