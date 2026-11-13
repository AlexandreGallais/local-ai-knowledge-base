---
title: "PresentationConnection"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationconnection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationConnection

The **`PresentationConnection`** interface of the Presentation API provides methods and properties for managing a single presentation. Each presentation connection is represented by a `PresentationConnection` object. Both the controlling user agent and receiving user agent _MUST_ implement `PresentationConnection`.

## Instance properties

- `PresentationConnection.binaryType` (experimental)
    Returns either blob or arrayBuffer. When a `PresentationConnection` object is created, its `binaryType` IDL attribute _MUST_ be set to the string `"arraybuffer"`.
- `PresentationConnection.id` (read-only) (experimental)
    Provides the presentation connection identifier.
- `PresentationConnection.state` (read-only) (experimental)
    Returns the presentation connection's current state.
- `PresentationConnection.url` (read-only) (experimental)
    Returns the URL used to create or reconnect to the presentation.

## Instance methods

- `PresentationConnection.close()` (experimental)
    Closes the current connection and sends a `PresentationConnectionCloseEvent` to `close` event.
- `PresentationConnection.send()` (experimental)
    Sends either binary or text data between a controlling browsing context and a presenting browsing context.
- `PresentationConnection.terminate()` (experimental)
    Terminates the current connection and fires `terminate` event.

## Events

- `close` (experimental)
    Fired when there is a call to `PresentationConnection.close()`.
- `connect` (experimental)
    Fired when a presentation connection is established.
- `message` (experimental)
    Fired when there is a call to `PresentationConnection.send()`.
- `terminate` (experimental)
    Fired when there is a call to `PresentationConnection.terminate()`.
