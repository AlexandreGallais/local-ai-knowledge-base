---
title: "WebSocket: bufferedAmount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocket/bufferedamount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket: bufferedAmount property

The **`WebSocket.bufferedAmount`** read-only property returns
the number of bytes of data that have been queued using calls to `send()` but
not yet transmitted to the network. This value resets to zero once all queued data has
been sent. This value does not reset to zero when the connection is closed; if you keep
calling `send()`, this will continue to climb.

## Value

An `unsigned long`.
