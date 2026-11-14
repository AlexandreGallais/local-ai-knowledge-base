---
title: "WebSocket: open event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocket/open_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket: open event

The `open` event is fired when a connection with a `WebSocket` is opened.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("open", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onopen = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});
```

## See also

- WebSocket: close event
- WebSocket: error event
- WebSocket: message event
- Writing WebSocket client applications
