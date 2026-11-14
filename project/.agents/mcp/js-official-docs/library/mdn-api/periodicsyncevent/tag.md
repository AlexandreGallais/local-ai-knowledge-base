---
title: "PeriodicSyncEvent: tag property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/periodicsyncevent/tag/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PeriodicSyncEvent: tag property

The **`tag`** read-only property of the
`PeriodicSyncEvent` interface returns the developer-defined identifier for
the `PeriodicSyncEvent`. This is specified when calling the
`PeriodicSyncManager.register()` method of the
`PeriodicSyncManager` interface. Multiple tags can be used by the web app
to run different periodic tasks at different frequencies.

## Value

Returns a `String` of the defined identifier.

## Examples

The following example demonstrates listening for a periodic sync event in the service
worker, and accessing the `tag` property.

```js
self.addEventListener("periodicsync", (event) => {
  console.log(event.tag); // logs the events tag
});
```

## See also

- Richer offline experiences with the Periodic Background Sync API
