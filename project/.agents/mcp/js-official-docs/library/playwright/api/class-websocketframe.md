---
title: "class: WebSocketFrame"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-websocketframe.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: WebSocketFrame
* since: v1.9
* langs: csharp, java

The [WebSocketFrame] class represents frames sent over [WebSocket] connections in the page. Frame payload is returned by either [`method: WebSocketFrame.text`] or [`method: WebSocketFrame.binary`] method depending on the its type.

## method: WebSocketFrame.binary
* since: v1.9
- returns: <[null]|[Buffer]>

Returns binary payload.

## method: WebSocketFrame.text
* since: v1.9
- returns: <[null]|[string]>

Returns text payload.
