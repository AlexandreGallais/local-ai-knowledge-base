---
title: "SyncEvent: SyncEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/syncevent/syncevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyncEvent: SyncEvent() constructor

The **`SyncEvent()`** constructor creates a new `SyncEvent` object.

## Syntax

```js
new SyncEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `sync`.
- `options`
    An object that, in addition to the properties defined in `ExtendableEvent()`, can have the following properties:
    - `tag`
        A developer-defined unique identifier for this `SyncEvent`.
    - `lastChance` (optional)
        A boolean value indicating that the user agent will not make further synchronization attempts after the current attempt.
        It defaults to `false`.

### Return value

A new `SyncEvent` object.
