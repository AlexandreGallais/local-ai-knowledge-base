---
title: "FetchEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetchevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FetchEvent

This is the event type for `fetch` events dispatched on the `service worker global scope`. It contains information about the fetch, including the request and how the receiver will treat the response. It provides the `event.respondWith()` method, which allows us to provide a response to this fetch.

## Constructor

- `FetchEvent()`
    Creates a new `FetchEvent` object. This constructor is not typically used. The browser creates these objects and provides them to `fetch` event callbacks.

## Instance properties

_Inherits properties from its ancestor, `Event`_.

- `FetchEvent.clientId` (read-only)
    The `id` of the same-origin `client` that initiated the fetch.
- `FetchEvent.handled` (read-only)
    A promise that is pending while the event has not been handled, and fulfilled once it has.
- `FetchEvent.isReload` (read-only) (deprecated) (non-standard)
    Returns `true` if the event was dispatched by the user attempting to reload the page, and `false` otherwise.
- `FetchEvent.preloadResponse` (read-only)
    A `Promise` for a `Response`, or `undefined` if this fetch is not a navigation, or navigation preload is not enabled.
- `FetchEvent.resultingClientId` (read-only)
    The `id` of the `client` that replaces the previous client during a page navigation.
- `FetchEvent.request` (read-only)
    The `Request` the browser intends to make.

## Instance methods

_Inherits methods from its parent, `ExtendableEvent`_.

- `FetchEvent.respondWith()`
    Prevent the browser's default fetch handling, and provide (a promise for) a response yourself.
- `ExtendableEvent.waitUntil()`
    Extends the lifetime of the event. Used to notify the browser of tasks that extend beyond the returning of a response, such as streaming and caching.

## Examples

This fetch event uses the browser default for non-GET requests.
For GET requests it tries to return a match in the cache, and falls back to the network. If it finds a match in the cache, it asynchronously updates the cache for next time.

```js
self.addEventListener("fetch", (event) => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method !== "GET") return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(
    (async () => {
      // Try to get the response from a cache.
      const cache = await caches.open("dynamic-v1");
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        // If we found a match in the cache, return it, but also
        // update the entry in the cache in the background.
        event.waitUntil(cache.add(event.request));
        return cachedResponse;
      }

      // If we didn't find a match in the cache, use the network.
      return fetch(event.request);
    })(),
  );
});
```

## See also

- `fetch` event
- `Promise`
- Fetch API
