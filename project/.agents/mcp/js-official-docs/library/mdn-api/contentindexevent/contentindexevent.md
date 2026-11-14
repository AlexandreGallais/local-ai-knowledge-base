---
title: "ContentIndexEvent: ContentIndexEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contentindexevent/contentindexevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContentIndexEvent: ContentIndexEvent() constructor

The **`ContentIndexEvent()`** constructor creates a new `ContentIndexEvent` object
whose type and other options are configured as specified.

## Syntax

```js
new ContentIndexEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `contentdelete`.
- `options`
    An object that, _in addition of the properties defined in `ExtendableEvent()`_, has the following properties:
    - `id`
        The id of the indexed content you want the `ContentIndex` object to remove.

### Return value

A new `ContentIndexEvent` object configured using the given options.

## Examples

This examples constructs a new `ContentIndexEvent` with the relevant id.

```js
const removeData = {
  id: "unique-content-id",
};

const ciEvent = new ContentIndexEvent("contentdelete", removeData);

ciEvent.id; // should return 'unique-content-id'
```

## See also

- An introductory article on the Content Index API
- Service Worker API, along with information about Cache and CacheStorage
