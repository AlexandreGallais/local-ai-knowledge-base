---
title: "ExtendableEvent: waitUntil() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/extendableevent/waituntil/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ExtendableEvent: waitUntil() method

The **`ExtendableEvent.waitUntil()`**
method tells the event dispatcher that work is ongoing. It can also be used to detect
whether that work was successful. In service workers, `waitUntil()` tells
the browser that work is ongoing until the promise settles, and it shouldn't terminate
the service worker if it wants that work to complete.

The `install` events in service workers use
`waitUntil()` to hold the service worker in
the `installing` phase until tasks
complete. If the promise passed to `waitUntil()` rejects, the install is
considered a failure, and the installing service worker is discarded. This is primarily
used to ensure that a service worker is not considered installed until all of the core
caches it depends on are successfully populated.

The `activate` events in service workers use
`waitUntil()` to buffer functional events such as `fetch` and
`push` until the promise passed to `waitUntil()` settles. This
gives the service worker time to update database schemas and delete outdated
`caches`, so other events can rely on a completely upgraded state.

The `waitUntil()` method must be initially called within the event callback,
but after that it can be called multiple times, until all the promises passed to it
settle.

## Syntax

```js
waitUntil(promise)
```

### Parameters

- `promise`
    A `Promise` that extends the lifetime of the event.

### Return value

None (`undefined`).

## Examples

Using `waitUntil()` within a service worker's `install` event:

```js
addEventListener("install", (event) => {
  const preCache = async () => {
    const cache = await caches.open("static-v1");
    return cache.addAll(["/", "/about/", "/static/styles.css"]);
  };
  event.waitUntil(preCache());
});
```

## See also

- Using Service Workers
