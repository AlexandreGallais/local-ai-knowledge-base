---
title: "ServiceWorkerGlobalScope: backgroundfetchfail event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/backgroundfetchfail_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: backgroundfetchfail event

The **`backgroundfetchfail`** event of the `ServiceWorkerGlobalScope` interface is fired when a background fetch operation has failed: that is, when at least one network request in the fetch has failed to complete successfully.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("backgroundfetchfail", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbackgroundfetchfail = (event) => { }
```

## Event type

A `BackgroundFetchUpdateUIEvent`.

## Description

When a background fetch operation fails (meaning that at least one of the individual network requests has not completed successfully), the browser starts the service worker, if necessary, and fires the `backgroundfetchfail` event in the service worker's global scope.

In the background fetch API, the browser shows a UI element to the user to indicate the progress of the operation. In the `backgroundfetchfail` handler, the service worker can update that UI to show that the operation has failed. To do this, the handler calls the event's `updateUI()` method, passing in a new title and/or icons.

In the handler for this `backgroundfetchfail`, the service worker can also clean up any related data for the operation. It can also retrieve and store any successful responses (for example, using the `Cache` API). To access the response data, the service worker uses the event's `registration` property.

## Examples

### Updating UI

This event handler updates the UI to let the user know that the operation failed.

```js
addEventListener("backgroundfetchfail", (event) => {
  event.updateUI({ title: "Could not complete download" });
});
```

## See also

- Background Fetch API
