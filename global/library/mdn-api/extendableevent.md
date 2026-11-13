---
title: "ExtendableEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/extendableevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ExtendableEvent

The **`ExtendableEvent`** interface extends the lifetime of the `install` and `activate` events dispatched on the global scope as part of the service worker lifecycle. This ensures that any functional events (like `FetchEvent`) are not dispatched until it upgrades database schemas and deletes the outdated cache entries.

If `waitUntil()` is called outside of the `ExtendableEvent` handler, the browser should throw an `InvalidStateError`; note also that multiple calls will stack up, and the resulting promises will be added to the list of extend lifetime promises.

This interface inherits from the `Event` interface.

> **Note:**
> This interface is only available when the global scope is a `ServiceWorkerGlobalScope`. It is not available when it is a `Window`, or the scope of another kind of worker.

## Constructor

- `ExtendableEvent()`
    Creates a new `ExtendableEvent` object.

## Instance properties

_Doesn't implement any specific properties, but inherits properties from its parent, `Event`._

## Instance methods

_Inherits methods from its parent, `Event`_.

- `ExtendableEvent.waitUntil()`
    Extends the lifetime of the event. It is intended to be called in the `install` event handler for the `installing` worker and on the `activate` event handler for the `active` worker.

## Examples

This code snippet is from the service worker prefetch sample (see prefetch example live.) The code calls `ExtendableEvent.waitUntil()` in `oninstall`, delaying treating the `ServiceWorkerRegistration.installing` worker as installed until the passed promise resolves successfully. The promise resolves when all resources have been fetched and cached, or else when any exception occurs.

The code snippet also shows a best practice for versioning caches used by the service worker. Though there's only one cache in this example, the same approach can be used for multiple caches. It maps a shorthand identifier for a cache to a specific, versioned cache name.

> **Note:**
> In Chrome, logging statements are visible via the "Inspect" interface for the relevant service worker accessed via chrome://serviceworker-internals.

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

> **Note:**
> When fetching resources, it's very important to use `{mode: 'no-cors'}` if there is any chance that the resources are served off of a server that doesn't support CORS. In this example, www.chromium.org doesn't support CORS.

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
