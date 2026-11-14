---
title: "PeriodicSyncManager: getTags() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/periodicsyncmanager/gettags/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PeriodicSyncManager: getTags() method

The **`getTags()`** method of the
`PeriodicSyncManager` interface returns a `Promise` that
resolves with a list of `String` objects representing the tags that are
currently registered for periodic syncing.

## Syntax

```js
getTags()
```

### Parameters

None.

### Return value

A `Promise` which resolves with a list of `String` objects
representing tags that are currently registered for periodic syncing.

### Exceptions

None.

## Examples

The following example uses the `getTags()` method to check if a periodic
sync task with a given tag is registered.

```js
navigator.serviceWorker.ready.then((registration) => {
  registration.periodicSync.getTags().then((tags) => {
    if (tags.includes("get-latest-news")) skipDownloadingLatestNewsOnPageLoad();
  });
});
```

`skipDownloadingLatestNewsOnPageLoad()` is a developer defined function.

## See also

- Richer offline experiences with the Periodic Background Sync API
