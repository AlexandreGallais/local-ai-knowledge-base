---
title: "ContentIndexEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contentindexevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContentIndexEvent

The **`ContentIndexEvent`** interface of the content index defines the object used to represent the `contentdelete` event.

This event is sent to the global scope of a `ServiceWorker`. It contains the id of the indexed content to be removed.

The `contentdelete` event is only fired when the deletion happens due to interaction with the browser's built-in user interface. It is not fired when the `ContentIndex.delete` method is called.

## Constructor

- `ContentIndexEvent()` (experimental)
    Creates and returns a new `ContentIndexEvent` object whose type and other options are configured as specified.

## Instance properties

_In addition to the properties listed below, this interface inherits the properties of its parent interface, `ExtendableEvent`._

- `id` (read-only) (experimental)
    A `String` which identifies the deleted content index via it's `id`.

## Instance methods

_While `ContentIndexEvent` offers no methods of its own, it inherits any specified by its parent interface, `ExtendableEvent`._

## Examples

This example shows the service worker script listening for the `contentdelete` event and logs the removed content index id.

```js
self.addEventListener("contentdelete", (event) => {
  console.log(event.id);

  // logs content index id, which can then be used to determine what content to delete from your cache
});
```

## See also

- An introductory article on the Content Index API
- Service Worker API, along with information about Cache and CacheStorage
