---
title: "PeriodicSyncManager: register() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/periodicsyncmanager/register/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PeriodicSyncManager: register() method

The **`register()`** method of the
`PeriodicSyncManager` interface registers a periodic sync request with the
browser with the specified tag and options. It returns a `Promise` that
resolves when the registration completes.

The method requires the `periodic-background-sync` permission; see the API's security considerations for details.

## Syntax

```js
register(tag, options)
```

### Parameters

- `tag`
    A unique `String` identifier.
- `options` (optional)
    An `Object` containing the following optional data:
    - `minInterval`
        The minimum interval time, in milliseconds, at which
        the periodic sync should occur.

### Return value

Returns a `Promise` that resolves with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if there is no active `ServiceWorker` present.
- `NotAllowedError` `DOMException`
    Thrown if the `periodic-background-sync` permission is not granted.
- `InvalidAccessError` `DOMException`
    Thrown if the active window is not the main window (not of `auxiliary` or `top-level` type).

## Examples

The following asynchronous function registers a periodic background sync at a minimum
interval of one day from a browsing context:

```js
async function registerPeriodicNewsCheck() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.periodicSync.register("fetch-news", {
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch {
    console.log("Periodic Sync could not be registered!");
  }
}
```

## See also

- Richer offline experiences with the Periodic Background Sync API
