---
title: "ServiceWorkerGlobalScope: contentdelete event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/contentdelete_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: contentdelete event

The **`contentdelete`** event of the `ServiceWorkerGlobalScope` interface is fired when an item is removed from the indexed content via the user agent.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("contentdelete", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncontentdelete = (event) => { }
```

## Event type

A `ContentIndexEvent`. Inherits from `Event`.

## Examples

The following example uses a `contentdelete` event handler to remove cached content related to the deleted index item.

```js
self.addEventListener("contentdelete", (event) => {
  const deletion = caches
    .open("cache-name")
    .then((cache) =>
      Promise.all([
        cache.delete(`/icon/${event.id}`),
        cache.delete(`/content/${event.id}`),
      ]),
    );
  event.waitUntil(deletion);
});
```

You can also set up the event handler using the `oncontentdelete` property (but note that this replaces other event listeners added using `oncontentdelete`, if any):

```js
self.oncontentdelete = (event) => {
  // …
};
```

## See also

- Content index API
- An introductory article on the Content Index API
