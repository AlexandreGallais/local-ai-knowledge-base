---
title: "ServiceWorkerGlobalScope: backgroundfetchsuccess event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/backgroundfetchsuccess_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: backgroundfetchsuccess event

The **`backgroundfetchsuccess`** event of the `ServiceWorkerGlobalScope` interface is fired when a background fetch operation has completed successfully: that is, when all network requests in the fetch have completed successfully.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("backgroundfetchsuccess", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbackgroundfetchsuccess = (event) => { }
```

## Event type

A `BackgroundFetchUpdateUIEvent`.

## Description

When a background fetch operation completes successfully (meaning that all individual network requests have completed successfully), the browser starts the service worker, if necessary, and fires the `backgroundfetchsuccess` event in the service worker's global scope.

In the handler for this event, the service worker can retrieve and store the responses (for example, using the `Cache` API). To access the response data, the service worker uses the event's `registration` property.

In the background fetch API, the browser shows a UI element to the user to indicate the progress of the operation. In the `backgroundfetchsuccess` handler, the service worker can update that UI to show that the operation has completed successfully. To do this, the handler calls the event's `updateUI()` method, passing in a new title and/or icons.

## Examples

### Storing responses and updating UI

This event handler stores all responses in the cache, and updates the UI.

```js
addEventListener("backgroundfetchsuccess", (event) => {
  const registration = event.registration;

  event.waitUntil(async () => {
    // Open a cache
    const cache = await caches.open("movies");
    // Get all the records
    const records = await registration.matchAll();
    // Cache all responses
    const cachePromises = records.map(async (record) => {
      const response = await record.responseReady;
      await cache.put(record.request, response);
    });

    // Wait for caching to finish
    await Promise.all(cachePromises);

    // Update the browser's UI
    event.updateUI({ title: "Move download complete" });
  });
});
```

## See also

- Background Fetch API
