---
title: "WebSocket: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocket/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket: readyState property

The **`WebSocket.readyState`** read-only property returns the
current state of the `WebSocket` connection.

## Value

A number which is one of the four possible state constants defined on the `WebSocket` interface:

- `WebSocket.CONNECTING` (0)
    Socket has been created. The connection is not yet open.
- `WebSocket.OPEN` (1)
    The connection is open and ready to communicate.
- `WebSocket.CLOSING` (2)
    The connection is in the process of closing.
- `WebSocket.CLOSED` (3)
    The connection is closed or couldn't be opened.
