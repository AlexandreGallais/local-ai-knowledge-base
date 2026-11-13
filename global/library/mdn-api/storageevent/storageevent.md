---
title: "StorageEvent: StorageEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageevent/storageevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageEvent: StorageEvent() constructor

The **`StorageEvent()`** constructor creates a new `StorageEvent` object.

## Syntax

```js
new StorageEvent(type)
new StorageEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the type of the `StorageEvent`. It is case-sensitive and browsers set it to `storage`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, has the following properties:
    - `key` (optional)
        A string that represents the key for the storage item that changed. Defaults to `null`.
    - `oldValue` (optional)
        A string containing the original value of the storage item. Defaults to `null`.
    - `newValue` (optional)
        A string with the new value of the `key`. Defaults to `null`.
    - `url`
        A string with the URL of the document whose storage changed.
    - `storageArea` (optional)
        A `Storage` object that represents the storage that was affected. Defaults to `null`.

### Return value

A new `StorageEvent` object.

## See also

- `Web Storage API`
