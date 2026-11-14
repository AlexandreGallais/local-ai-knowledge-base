---
title: "Lock"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/lock/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Lock

The **`Lock`** interface of the Web Locks API provides the name and mode of a lock.
This may be a newly requested lock that is received in the callback to `LockManager.request()`, or a record of an active or queued lock returned by `LockManager.query()`.

## Instance properties

- `Lock.mode` (read-only)
    Returns the access mode passed to `LockManager.request()` when the lock was requested.
    The mode is either `"exclusive"` (the default) or `"shared"`.
- `Lock.name` (read-only)
    Returns the name passed to `LockManager.request()` when the lock was requested.

## Examples

The following examples show how the mode and name properties are passed in the call to `LockManager.request()`.
`LockManager` is the object returned by `navigator.locks`.

```js
navigator.locks.request("net_db_sync", showLockProperties);
navigator.locks.request("another_lock", { mode: "shared" }, showLockProperties);

function showLockProperties(lock) {
  console.log(`The lock name is: ${lock.name}`);
  console.log(`The lock mode is: ${lock.mode}`);
}
```
