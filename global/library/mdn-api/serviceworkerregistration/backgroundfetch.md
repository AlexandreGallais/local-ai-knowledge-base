---
title: "ServiceWorkerRegistration: backgroundFetch property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/backgroundfetch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: backgroundFetch property

The **`backgroundFetch`** read-only property of the
`ServiceWorkerRegistration` interface returns a reference to a
`BackgroundFetchManager` object, which can be used to initiate background fetch operations.

## Value

A `BackgroundFetchManager` object.

## Examples

### Initiating a background fetch

The following code accesses the `backgroundFetch` property and uses it to initiate a background fetch operation.

```js
// main.js
async function requestBackgroundFetch(movieData) {
  const swRegistration = await navigator.serviceWorker.ready;
  const fetchRegistration = await swRegistration.backgroundFetch.fetch(
    "download-movie",
    ["/my-movie-part-1.webm", "/my-movie-part-2.webm"],
    {
      icons: movieIcons,
      title: "Downloading my movie",
      downloadTotal: 60 * 1024 * 1024,
      label: "Downloading a show",
    },
  );
  // …
}
```
