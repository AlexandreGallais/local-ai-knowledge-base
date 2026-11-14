---
title: "BackgroundFetchEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchEvent

The **`BackgroundFetchEvent`** interface of the `Background Fetch API` is the event type for background fetch events dispatched on the `service worker global scope`.

It is the event type passed to `backgroundfetchclick` event and `backgroundfetchabort` event.

## Constructor

- `BackgroundFetchEvent()` (experimental)
    Creates a new `BackgroundFetchEvent` object. This constructor is not typically used, as the browser creates these objects itself and provides them to background fetch event callbacks.

## Instance properties

_Also inherits properties from its parent, `ExtendableEvent`._

- `BackgroundFetchEvent.registration` (read-only) (experimental)
    Returns the `BackgroundFetchRegistration` that the event was initialized to.

## Instance methods

_Also inherits methods from its parent, `ExtendableEvent`._

None.

## Examples

In this example, if the user clicks on the user interface displaying the download progress, a new window will open. The current `BackgroundFetchRegistration` is returned by calling `event.registration`.

```js
addEventListener("backgroundfetchclick", (event) => {
  const bgFetch = event.registration;

  if (bgFetch.result === "success") {
    clients.openWindow("/latest-podcasts");
  } else {
    clients.openWindow("/download-progress");
  }
});
```
