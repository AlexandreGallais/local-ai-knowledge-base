---
title: "StorageEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageEvent

The **`StorageEvent`** interface is implemented by the `storage` event, which is
sent to a window
when a storage area the window has access to is changed within the context of another document.

## Constructor

- `StorageEvent()`
    Returns a newly constructed `StorageEvent` object.

## Instance properties

_In addition to the properties listed below, this interface inherits the properties of its parent interface, `Event`._

- `key` (read-only)
    Returns a string with the key for the storage item that was changed.
    The `key` attribute is `null` when the change is caused by the storage `clear()` method.
- `newValue` (read-only)
    Returns a string with the new value of the storage item that was changed.
    This value is `null` when the change has been invoked by storage `clear()` method,
    or the storage item has been removed from the storage.
- `oldValue` (read-only)
    Returns a string with the original value of the storage item that was changed.
    This value is `null` when the storage item has been newly added
    and therefore doesn't have any previous value.
- `storageArea` (read-only)
    Returns a `Storage` object that represents the storage object that was affected.
- `url` (read-only)
    Returns string with the URL of the document whose storage changed.

## Instance methods

_In addition to the methods listed below, this interface inherits the methods of its parent interface, `Event`._

- `initStorageEvent()` (deprecated)
    Initializes the event in a manner analogous to the similarly-named `initEvent()` method in the DOM Events interfaces. Use the constructor instead.

## See also

- `Web Storage API`
