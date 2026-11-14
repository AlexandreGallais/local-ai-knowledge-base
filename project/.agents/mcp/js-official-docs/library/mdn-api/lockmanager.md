---
title: "LockManager"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/lockmanager/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LockManager

The **`LockManager`** interface of the Web Locks API provides methods for requesting a new `Lock` object and querying for an existing `Lock` object. To get an instance of `LockManager`, call `navigator.locks`.

## Instance methods

- `LockManager.request()`
    Requests a `Lock` object with parameters specifying its name and characteristics.
- `LockManager.query()`
    Returns a `Promise` that resolves with an object that contains information about held and pending locks.
