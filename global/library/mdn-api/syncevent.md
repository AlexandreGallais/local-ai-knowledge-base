---
title: "SyncEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/syncevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyncEvent

The **`SyncEvent`** interface of the `Background Synchronization API` represents a sync action that is dispatched on the `ServiceWorkerGlobalScope` of a ServiceWorker.

This interface inherits from the `ExtendableEvent` interface.

## Constructor

- `SyncEvent()`
    Creates a new `SyncEvent` object.

## Instance properties

_Inherits properties from its parent, `ExtendableEvent` and `Event`_.

- `SyncEvent.tag` (read-only)
    Returns the developer-defined identifier for this `SyncEvent`.
- `SyncEvent.lastChance` (read-only)
    Returns `true` if the user agent will not make further synchronization attempts after the current attempt.

## Instance methods

_Inherits methods from its parent, `ExtendableEvent` and `Event`_.

None.
