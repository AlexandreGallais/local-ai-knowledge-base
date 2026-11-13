---
title: "ServiceWorkerGlobalScope: backgroundfetchabort event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/backgroundfetchabort_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: backgroundfetchabort event

The **`backgroundfetchabort`** event of the `ServiceWorkerGlobalScope` interface is fired when the user or the app itself cancels a background fetch operation.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("backgroundfetchabort", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbackgroundfetchabort = (event) => { }
```

## Event type

A `BackgroundFetchEvent`.

## Description

In the background fetch API, the browser shows a UI element to the user to indicate the progress of the operation. This element also enables the user to cancel the fetch. The app itself can also cancel the fetch by calling `BackgroundFetchRegistration.abort()`.

If the fetch is canceled, the browser aborts the fetch, starts the service worker, if necessary, and fires the `backgroundfetchabort` event in the service worker's global scope.

In the handler for this event, the service worker can clean up any related data for the operation. It can also retrieve and store any successful responses (for example, using the `Cache` API). To access the response data, the service worker uses the event's `registration` property.

## Examples

### Cleaning up

This event handler might perform any cleanup of data associated with the aborted fetch.

```js
addEventListener("backgroundfetchabort", (event) => {
  // clean up any related data
});
```

## See also

- Background Fetch API
