---
title: "FetchEvent: handled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetchevent/handled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FetchEvent: handled property

The **`handled`** read-only property of the `FetchEvent` interface returns a promise indicating if the event has been handled by the fetch algorithm or not. This property allows executing code after the browser has consumed a response, and is usually used together with the `waitUntil()` method.

## Value

A `Promise` that is pending while the event has not been handled, and fulfilled once it has.

## Examples

```js
addEventListener("fetch", (event) => {
  event.respondWith(
    (async function () {
      const response = await doCalculateAResponse(event.request);

      event.waitUntil(
        (async function () {
          await doSomeAsyncStuff(); // optional

          // Wait for the event to be consumed by the browser
          await event.handled;

          return doFinalStuff(); // Finalize AFTER the event has been consumed
        })(),
      );

      return response;
    })(),
  );
});
```

## See also

- `ExtendableEvent.waitUntil()`
