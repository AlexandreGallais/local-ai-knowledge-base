---
title: "Request: isHistoryNavigation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/ishistorynavigation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: isHistoryNavigation property

The **`isHistoryNavigation`** read-only property of the `Request` interface is a boolean indicating whether the request is a history navigation.

A history navigation is a navigation within the browser's history, made by calling `History.go()`, `History.back()`, `History.forward()`, `Navigation.traverseTo()`, `Navigation.back()`, `Navigation.forward()`, or directly by clicking the browser's back or forward navigation button.

## Value

A boolean value.

## Examples

This example executes in a service worker. It listens for the `fetch` event. In the event handler, the service worker checks the `isHistoryNavigation` property to know whether the request happened because of a history navigation. If so, it attempts to respond with a cached response. If the cache does not contain a response for this request, the service worker fetches a response from the network, caches a clone of it, and responds with the network response.

```js
self.addEventListener("fetch", (event) => {
  // …

  if (event.request.isHistoryNavigation) {
    event.respondWith(
      (async () => {
        let response = await caches.match(event.request);
        if (response !== undefined) {
          return response;
        }
        response = await fetch(event.request);
        const responseClone = response.clone();

        event.waitUntil(
          caches
            .open("v1")
            .then((cache) => cache.put(event.request, responseClone)),
        );

        return response;
      })(),
    );
  }

  // …
});
```

## See also

- `History API`
- `Navigation API`
- `Service Worker API`
