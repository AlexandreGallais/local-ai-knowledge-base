---
title: "StorageEvent: initStorageEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageevent/initstorageevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageEvent: initStorageEvent() method

The **`StorageEvent.initStorageEvent()`** method is used to initialize the value of a `StorageEvent`.

## Syntax

```js
initStorageEvent(type)
initStorageEvent(type, canBubble)
initStorageEvent(type, canBubble, cancelable)
initStorageEvent(type, canBubble, cancelable, key)
initStorageEvent(type, canBubble, cancelable, key, oldValue)
initStorageEvent(type, canBubble, cancelable, key, oldValue, newValue)
initStorageEvent(type, canBubble, cancelable, key, oldValue, newValue, url)
initStorageEvent(type, canBubble, cancelable, key, oldValue, newValue, url, storageArea)
```

### Parameters

- `typeArg`
    The name of the event.
- `canBubble` (optional)
    A boolean indicating whether the event bubbles up through the DOM or not.
- `cancelable` (optional)
    A boolean indicating whether the event is cancelable.
- `key` (optional)
    The key whose value is changing as a result of this event.
- `oldValue` (optional)
    The key's old value.
- `newValue` (optional)
    The key's new value.
- `url` (optional)
    The URL of the document initiating the change.
- `storageArea` (optional)
    The `Storage` object representing the storage area on which this event occurred.

### Return value

None (`undefined`).

## See also

- `Web Storage API`
- The constructor to use instead of this deprecated method: `StorageEvent()`.
