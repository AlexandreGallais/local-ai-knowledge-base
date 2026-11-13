---
title: "Background Fetch API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/background_fetch_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Background Fetch API

The **Background Fetch API** provides a method for managing downloads that may take a significant amount of time such as movies, audio files, and software.

## Concepts and Usage

When a web application requires the user to download large files, this often presents a problem in that the user needs to stay connected to the page for the download to complete. If they lose connectivity, close the tab or navigate away from the page the download stops.

The `Background Synchronization API` provides a way for service workers to defer processing until a user is connected; however it can't be used for long-running tasks such as downloading a large file. Background Sync requires that the service worker stays alive until the fetch is completed, and to conserve battery life and to prevent unwanted tasks happening in the background the browser will at some point terminate the task.

The Background Fetch API solves this problem. It creates a way for a web developer to tell the browser to perform some fetches in the background, for example when the user clicks a button to download a video file. The browser then performs the fetches in a user-visible way, displaying progress to the user and giving them a method to cancel the download. Once the download is complete the browser then opens the service worker, at which point your application can do something with the response if required.

The Background Fetch API will enable the fetch to happen if the user starts the process while offline. Once they are connected it will begin. If the user goes off line, the process pauses until the user is on again.

## Interfaces

- `BackgroundFetchManager` (experimental)
    A map where the keys are background fetch IDs and the values are `BackgroundFetchRegistration` objects.
- `BackgroundFetchRegistration` (experimental)
    Represents a Background Fetch.
- `BackgroundFetchRecord` (experimental)
    Represents an individual fetch request and response.
- `BackgroundFetchEvent` (experimental)
    The event type for the `backgroundfetchabort` and `backgroundfetchclick` event
- `BackgroundFetchUpdateUIEvent` (experimental)
    The event type for the `backgroundfetchsuccess` and `backgroundfetchfail` event

### Extensions to other interfaces

- `ServiceWorkerRegistration.backgroundFetch` (read-only) (experimental)
    Returns a reference to a `BackgroundFetchManager` object, which manages background fetch operations.
- `backgroundfetchabort` event (experimental)
    Fired when a background fetch operation has been canceled by the user or the app.
- `backgroundfetchclick` event (experimental)
    Fired when the user has clicked on the UI for a background fetch operation.
- `backgroundfetchfail` event (experimental)
    Fired when at least one of the requests in a background fetch operation has failed.
- `backgroundfetchsuccess` event (experimental)
    Fired when all of the requests in a background fetch operation have succeeded.

## Examples

Before using Background Fetch, check for browser support.

```js
if (!("BackgroundFetchManager" in self)) {
  // Provide fallback downloading.
}
```

Using Background Fetch requires a registered service worker. Then call `backgroundFetch.fetch()` to perform a fetch. This
returns a promise that resolves with a `BackgroundFetchRegistration`.

A background fetch may fetch a number of files. In our example the fetch requests an MP3 and a JPEG. This enables a package of files that the user sees as one item (for example a podcast and artwork) to be downloaded at once.

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

You can find further code examples and a demo in Introducing Background Fetch.

## See also

- Introducing Background Fetch
- Background Fetch - HTTP 203
