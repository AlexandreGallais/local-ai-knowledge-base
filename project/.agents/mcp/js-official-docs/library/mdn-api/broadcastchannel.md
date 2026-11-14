---
title: "BroadcastChannel"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/broadcastchannel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BroadcastChannel

The **`BroadcastChannel`** interface represents a named channel that any browsing context of a given origin can subscribe to. It allows communication between different documents (in different windows, tabs, frames or iframes) of the same origin. Messages are broadcasted via a `message` event fired at all `BroadcastChannel` objects listening to the channel, except the object that sent the message.

## Constructor

- `BroadcastChannel()`
    Creates an object linking to the named channel.

## Instance properties

_This interface also inherits properties from its parent, `EventTarget`._

- `BroadcastChannel.name` (read-only)
    Returns a string, the name of the channel.

## Instance methods

_This interface also inherits methods from its parent, `EventTarget`._

- `BroadcastChannel.postMessage()`
    Sends the message, of any type of object, to each `BroadcastChannel` object listening to the same channel.
- `BroadcastChannel.close()`
    Closes the channel object, indicating it won't get any new messages, and allowing it to be, eventually, garbage collected.

## Events

_This interface also inherits events from its parent, `EventTarget`._

- `message`
    Fired when a message arrives on the channel.
    Also available via the `onmessage` property.
- `messageerror`
    Fired when a message arrives that can't be deserialized.
    Also available via the `onmessageerror` property.

## See also

- Another, more heavyweight, way of communicating between browser contexts: `ServiceWorker`.
- Broadcast Channel API overview
