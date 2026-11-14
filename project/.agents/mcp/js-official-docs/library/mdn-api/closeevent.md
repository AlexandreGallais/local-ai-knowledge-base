---
title: "CloseEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseEvent

A `CloseEvent` is sent to clients using WebSockets when the connection is closed. This is delivered to the listener indicated by the `WebSocket` object's `onclose` attribute.

## Constructor

- `CloseEvent()`
    Creates a new `CloseEvent`.

## Instance properties

_This interface also inherits properties from its parent, `Event`._

- `CloseEvent.code` (read-only)
    Returns an `unsigned short` containing the close code.
- `CloseEvent.reason` (read-only)
    Returns a string indicating the reason the server closed the connection. This is specific to the particular server and sub-protocol.
- `CloseEvent.wasClean` (read-only)
    Returns a boolean value that Indicates whether or not the connection was cleanly closed.

## Instance methods

_This interface also inherits methods from its parent, `Event`._

## See also

- `WebSocket`
