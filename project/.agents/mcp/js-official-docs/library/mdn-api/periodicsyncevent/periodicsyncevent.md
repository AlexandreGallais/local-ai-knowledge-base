---
title: "PeriodicSyncEvent: PeriodicSyncEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/periodicsyncevent/periodicsyncevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PeriodicSyncEvent: PeriodicSyncEvent() constructor

The **`PeriodicSyncEvent()`** constructor
creates a new `PeriodicSyncEvent` object. This constructor is not typically
used. The browser creates these objects itself and provides them to
`onperiodicsync` callback.

## Syntax

```js
new PeriodicSyncEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `periodicsync`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `tag`
        The tag referencing the sync event.

### Return value

A new `PeriodicSyncEvent` object configured using the given inputs.

## Examples

This example constructs a new `PeriodicSyncEvent` with the relevant
associated tag.

```js
const psEvent = new ExtendableEvent("periodicsync", { tag: "unique-tag" });
```

## See also

- Richer offline experiences with the Periodic Background Sync API
