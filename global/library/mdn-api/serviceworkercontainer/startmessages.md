---
title: "ServiceWorkerContainer: startMessages() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkercontainer/startmessages/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerContainer: startMessages() method

The **`startMessages()`** method of
the `ServiceWorkerContainer` interface explicitly starts the flow of
messages being dispatched from a service worker to pages under its control (e.g., sent
via `Client.postMessage()`). This can be used to react to sent messages
earlier, even before that page's content has finished loading.

## Explanation

By default, all messages sent from a page's controlling service worker to the page
(using `Client.postMessage()`) are queued while the page is loading, and
get dispatched once the page's HTML document has been loaded and parsed (i.e., after the
`DOMContentLoaded` event fires). It's possible to start dispatching these
messages earlier by calling `ServiceWorkerContainer.startMessages()`, for
example if you've invoked a message handler using
`EventTarget.addEventListener()` before the page has finished loading, but
want to start processing the messages right away.

> **Note:**
> The messages start being sent automatically when setting the
> handler directly using `onmessage`. In this you
> don't need `startMessages()`.

## Syntax

```js
startMessages()
```

### Parameters

None.

### Return value

`undefined`.

## Examples

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}

// …

navigator.serviceWorker.addEventListener("message", (e) => {
  // …
});

navigator.serviceWorker.startMessages();
```
