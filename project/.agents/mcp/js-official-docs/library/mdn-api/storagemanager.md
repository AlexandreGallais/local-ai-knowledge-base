---
title: "StorageManager"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storagemanager/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageManager

The **`StorageManager`** interface of the Storage API provides an interface for managing persistence permissions and estimating available storage. You can get a reference to this interface using either `navigator.storage` or `WorkerNavigator.storage`.

## Instance methods

- `StorageManager.estimate()`
    Returns a `Promise` that resolves to an object containing usage and quota numbers for your origin.
- `StorageManager.getDirectory()`
    Used to obtain a reference to a `FileSystemDirectoryHandle` object allowing access to a directory and its contents, stored in the origin private file system. Returns a `Promise` that fulfills with a `FileSystemDirectoryHandle` object.
- `StorageManager.persist()`
    Returns a `Promise` that resolves to `true` if the user agent is able to persist your site's storage.
- `StorageManager.persisted()`
    Returns a `Promise` that resolves to `true` if persistence has already been granted for your site's storage.
