---
title: "WebSocket: close event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocket/close_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket: close event

The `close` event is fired when a connection with a `WebSocket` is closed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("close", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onclose = (event) => { }
```

## Event type

A `CloseEvent`. Inherits from `Event`.

## Examples

You might want to know when the connection has been closed so that you can update the UI or, perhaps, save data about the closed connection. Given that you have a variable called `exampleSocket` that refers to an opened `WebSocket`, this handler would handle the situation where the socket has been closed.

```js
exampleSocket.addEventListener("close", (event) => {
  console.log("The connection has been closed successfully.");
});
```

You can perform the same actions using the event handler property, like this (but note that this replaces other event listeners added using `onclose`, if any):

```js
exampleSocket.onclose = (event) => {
  console.log("The connection has been closed successfully.");
};
```

## See also

- WebSocket: error event
- WebSocket: message event
- WebSocket: open event
- Writing WebSocket client applications
