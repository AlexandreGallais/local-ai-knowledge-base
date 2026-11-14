---
title: "PresentationConnectionCloseEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationconnectioncloseevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationConnectionCloseEvent

The **`PresentationConnectionCloseEvent`** interface of the Presentation API is fired on a `PresentationConnection` when it is closed.

## Constructor

- `PresentationConnectionCloseEvent()` (experimental)
    Creates a new PresentationConnectionCloseEvent.

## Instance properties

- `PresentationConnectionCloseEvent.message` (read-only) (experimental)
    A human-readable message that provides more information about why the connection was closed.
- `PresentationConnectionCloseEvent.reason` (read-only) (experimental)
    Indicates why the connection was closed. This property takes one of the following values: `error`, `closed`, or `wentaway`.
