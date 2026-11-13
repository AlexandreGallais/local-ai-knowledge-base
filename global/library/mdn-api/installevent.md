---
title: "InstallEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/installevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InstallEvent

The parameter passed into an `install` event handler function, the `InstallEvent` interface represents an install action that is dispatched on the `ServiceWorkerGlobalScope` of a `ServiceWorker`. As a child of `ExtendableEvent`, it ensures that functional events such as `FetchEvent` are not dispatched during installation.

This interface inherits from the `ExtendableEvent` interface.

## Constructor

- `InstallEvent()`
    Creates a new `InstallEvent` object.

## Instance properties

_Inherits properties from its parent, `ExtendableEvent`_.

## Instance methods

_Inherits methods from its parent, `ExtendableEvent`_.

- `addRoutes()`
    Specifies one or more static routes, which define rules for fetching specified resources that will be used even before service worker startup.

## Examples

This code snippet is from the service worker prefetch sample (see prefetch running live.) The code calls `ExtendableEvent.waitUntil()` in `ServiceWorkerGlobalScope.oninstall` and delays treating the `ServiceWorkerRegistration.installing` worker as installed until the passed promise resolves successfully. The promise resolves when all resources have been fetched and cached, or when any exception occurs.

The code snippet also shows a best practice for versioning caches used by the service worker. Although this example has only one cache, you can use this approach for multiple caches. The code maps a shorthand identifier for a cache to a specific, versioned cache name.

> **Note:**
> Logging statements are visible in Google Chrome via the "Inspect" interface for the relevant service worker accessed via chrome://serviceworker-internals.

```js
const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  prefetch: `prefetch-cache-v${CACHE_VERSION}`,
};

self.addEventListener("install", (event) => {
  const urlsToPrefetch = [
    "./static/pre_fetched.txt",
    "./static/pre_fetched.html",
    "https://www.chromium.org/_/rsrc/1302286216006/config/customLogo.gif",
  ];

  console.log(
    "Handling install event. Resources to pre-fetch:",
    urlsToPrefetch,
  );

  event.waitUntil(
    caches
      .open(CURRENT_CACHES["prefetch"])
      .then((cache) =>
        cache.addAll(
          urlsToPrefetch.map(
            (urlToPrefetch) => new Request(urlToPrefetch, { mode: "no-cors" }),
          ),
        ),
      )
      .then(() => {
        console.log("All resources have been fetched and cached.");
      })
      .catch((error) => {
        console.error("Pre-fetching failed:", error);
      }),
  );
});
```

## See also

- `install` event
- `NotificationEvent`
- `Promise`
- Fetch API
