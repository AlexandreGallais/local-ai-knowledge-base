---
title: "FetchEvent: isReload property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetchevent/isreload/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FetchEvent: isReload property

The **`isReload`** read-only property of the
`FetchEvent` interface returns `true` if the event was
dispatched by the user attempting to reload the page, and `false` otherwise.
Pressing the refresh button is a reload while clicking a link and pressing the back
button is not.

## Value

A boolean value.

## Examples

```js
self.addEventListener("fetch", (event) => {
  event.respondWith(async () => {
    if (event.isReload) {
      // Return something
    } else {
      // Return something else
    }
  })();
});
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
