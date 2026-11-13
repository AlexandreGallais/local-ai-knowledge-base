---
title: "ContentIndexEvent: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contentindexevent/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContentIndexEvent: id property

The **`id`** read-only property of the
`ContentIndexEvent` interface is a `String` which identifies
the deleted content index via its `id`.

## Value

A `String` representation of the deleted content index id.

## Examples

This example listens for the `contentdelete` event
and logs the removed content index id.

The `ContentIndexEvent` is only available to the
global scope of a
`ServiceWorker`.

```js
self.addEventListener("contentdelete", (event) => {
  console.log(event.id);

  // logs content index id, which can then be used to determine what content to delete from your cache
});
```

## See also

- An introductory article on the Content Index API
- Service Worker API, along with information about Cache and CacheStorage
