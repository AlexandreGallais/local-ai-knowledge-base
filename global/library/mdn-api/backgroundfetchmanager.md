---
title: "BackgroundFetchManager"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchmanager/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchManager

The **`BackgroundFetchManager`** interface of the `Background Fetch API` is a map where the keys are background fetch IDs and the values are `BackgroundFetchRegistration` objects.

## Instance properties

None.

## Instance methods

- `fetch()` (experimental)
    Returns a `Promise` that resolves with a `BackgroundFetchRegistration` object for a supplied array of URLs and `Request` objects.
- `get()` (experimental)
    Returns a `Promise` that resolves with the `BackgroundFetchRegistration` associated with the provided `id` or `undefined` if the `id` is not found.
- `getIds()` (experimental)
    Returns the IDs of all registered background fetches.

## Examples

The example below shows how to get an instance of `BackgroundFetchManager` from a `ServiceWorkerRegistration` object and calls `fetch()` to download an audio file in the background.

```js
navigator.serviceWorker.ready.then(async (swReg) => {
  const bgFetch = await swReg.backgroundFetch.fetch(
    "my-fetch",
    ["/ep-5.mp3", "ep-5-artwork.jpg"],
    {
      title: "Episode 5: Interesting things.",
      icons: [
        {
          sizes: "300x300",
          src: "/ep-5-icon.png",
          type: "image/png",
        },
      ],
      downloadTotal: 60 * 1024 * 1024,
    },
  );
});
```
