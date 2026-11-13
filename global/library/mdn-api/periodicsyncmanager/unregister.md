---
title: "PeriodicSyncManager: unregister() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/periodicsyncmanager/unregister/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PeriodicSyncManager: unregister() method

The **`unregister()`** method of the
`PeriodicSyncManager` interface unregisters the periodic sync request
corresponding to the specified tag and returns a `Promise` that resolves
when unregistration completes.

## Syntax

```js
unregister(tag)
```

### Parameters

- tag
    The unique `String` descriptor for the specific background sync.

### Return value

Returns a `Promise` that resolves with `undefined`.

### Exceptions

None.

## Examples

The following example removes a periodic sync to stop syncing articles in the
background.

```js
navigator.serviceWorker.ready.then((registration) => {
  registration.periodicSync.unregister("get-latest-news");
});
```

## See also

- Richer offline experiences with the Periodic Background Sync API
