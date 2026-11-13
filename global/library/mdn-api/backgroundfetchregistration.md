---
title: "BackgroundFetchRegistration"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration

The **`BackgroundFetchRegistration`** interface of the `Background Fetch API` represents an individual background fetch.

A `BackgroundFetchRegistration` instance is returned by the `BackgroundFetchManager.fetch()` or `BackgroundFetchManager.get()` methods, and therefore there has no constructor.

## Instance properties

_Also inherits properties from its parent, `EventTarget`._

- `BackgroundFetchRegistration.id` (read-only) (experimental)
    A string containing the background fetch's ID.
- `BackgroundFetchRegistration.uploadTotal` (read-only) (experimental)
    A `Number` containing the total number of bytes to be uploaded.
- `BackgroundFetchRegistration.uploaded` (read-only) (experimental)
    A `Number` containing the size in bytes successfully sent, initially `0`.
- `BackgroundFetchRegistration.downloadTotal` (read-only) (experimental)
    A `Number` containing the total size in bytes of this download. This is the value set when the background fetch was registered, or `0`.
- `BackgroundFetchRegistration.downloaded` (read-only) (experimental)
    A `Number` containing the size in bytes that has been downloaded, initially `0`.
- `BackgroundFetchRegistration.result` (read-only) (experimental)
    Returns an empty string initially, on completion either the string `"success"` or `"failure"`.
- `BackgroundFetchRegistration.failureReason` (read-only) (experimental)
    A string with a value that indicates a reason for a background fetch failure. Can be one of the following values: `""`, `"aborted"`, `"bad-status"`, `"fetch-error"`, `"quota-exceeded"`, `"download-total-exceeded"`.
- `BackgroundFetchRegistration.recordsAvailable` (read-only) (experimental)
    A `Boolean` indicating whether the `recordsAvailable` flag is set.

## Instance methods

_Also inherits methods from its parent, `EventTarget`._

- `BackgroundFetchRegistration.abort()` (experimental)
    Aborts the background fetch. Returns a `Promise` that resolves with `true` if the fetch was successfully aborted.
- `BackgroundFetchRegistration.match()` (experimental)
    Returns a single `BackgroundFetchRecord` object which is the first match for the arguments.
- `BackgroundFetchRegistration.matchAll()` (experimental)
    Returns a `Promise` that resolves with an array of `BackgroundFetchRecord` objects containing requests and responses.

## Events

_Also inherits events from its parent, `EventTarget`._

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `progress` (experimental)
    Fired when there is a change to any of the following properties:
    `uploaded`,
    `downloaded`,
    `result` or
    `failureReason`.

## Examples

The following code creates a `BackGroundFetchRegistration` as `bgFetch`, with an `id` of `"my-fetch"`.

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

Logging the `id` to the console returns `"my-fetch"`.

```js
console.log(bgFetch.id); // "my-fetch"
```

The `match()` method can be used to find a particular `BackgroundFetchRecord` from those that are part of the registration.

```js
bgFetch.match("/ep-5.mp3").then(async (record) => {
  if (!record) {
    console.log("No record found");
    return;
  }

  console.log(`Here's the request`, record.request);
  const response = await record.responseReady;
  console.log(`And here's the response`, response);
});
```
