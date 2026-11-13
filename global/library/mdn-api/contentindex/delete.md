---
title: "ContentIndex: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contentindex/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContentIndex: delete() method

The **`delete()`** method of the
`ContentIndex` interface unregisters an item from the currently indexed
content.

> **Note:**
> Calling `delete()` only affects the index. It does not delete anything
> from the `Cache`.

## Syntax

```js
delete(id)
```

### Parameters

- `id`
    The unique identifier of the indexed content you want the `ContentIndex` object to remove.

### Return value

Returns a `Promise` that resolves with `undefined`.

### Exceptions

No exceptions are thrown.

## Examples

Below is an asynchronous function, that removes an item from the content index. We receive a reference to the current
`ServiceWorkerRegistration`, which allows us to access the
`index` property and thus access the
`delete` method.

```js
async function unregisterContent(article) {
  // reference registration
  const registration = await navigator.serviceWorker.ready;

  // feature detect Content Index
  if (!registration.index) return;

  // unregister content from index
  await registration.index.delete(article.id);
}
```

The `delete` method can also be used within the
service worker scope.

```js
self.registration.index.delete("my-id");
```

## See also

- An introductory article on the Content Index API
- Service Worker API, along with information about Cache and CacheStorage
