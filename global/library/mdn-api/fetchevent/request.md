---
title: "FetchEvent: request property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetchevent/request/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FetchEvent: request property

The **`request`** read-only property of the
`FetchEvent` interface returns the `Request` that triggered
the event handler.

This property is non-nullable (since version 46, in the case of Firefox.) If a request
is not provided by some other means, the constructor `options` object must
contain a request (see `FetchEvent()`.)

## Value

A `Request` object.

## Examples

This code snippet is from the service worker fetch sample (run the fetch sample live). The `onfetch` event handler
listens for the `fetch` event. When fired, pass a promise that back to the
controlled page to `FetchEvent.respondWith()`.
This promise resolves to the first matching URL request in the `Cache`
object. If no match is found, the code fetches a response from the network.

The code also handles exceptions thrown from the
`fetch()` operation. Note that an HTTP error
response (e.g., 404) will not trigger an exception. It will return a normal response
object that has the appropriate error code set.

```js
self.addEventListener("fetch", (event) => {
  console.log("Handling fetch event for", event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Found response in cache:", response);

        return response;
      }
      console.log("No response found in cache. About to fetch from network…");

      return fetch(event.request)
        .then((response) => {
          console.log("Response from network is:", response);

          return response;
        })
        .catch((error) => {
          console.error("Fetching failed:", error);

          throw error;
        });
    }),
  );
});
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
