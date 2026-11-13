---
title: "ServiceWorkerGlobalScope: backgroundfetchclick event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/backgroundfetchclick_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: backgroundfetchclick event

The **`backgroundfetchclick`** event of the `ServiceWorkerGlobalScope` interface is fired when the user clicks on the UI that the browser provides to show the user the progress of the background fetch operation.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("backgroundfetchclick", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbackgroundfetchclick = (event) => { }
```

## Event type

A `BackgroundFetchEvent`.

## Description

When a background fetch operation starts, the browser shows a UI element to the user to indicate the progress of the operation. If the user clicks this element, the browser starts the service worker, if necessary, and fires the `backgroundfetchclick` event in the service worker's global scope.

A common task for the handler in this situation is to open a window giving the user more details about the fetch operation.

## Examples

### Opening a window with more details

This event handler uses the global `clients` property to open a window giving the user more details about the fetch. It opens a different window depending on whether the fetch has completed or not.

```js
addEventListener("backgroundfetchclick", (event) => {
  const registration = event.registration;

  if (registration.result === "success") {
    clients.openWindow("/play-movie");
  } else {
    clients.openWindow("/movie-download-progress");
  }
});
```

## See also

- Background Fetch API
