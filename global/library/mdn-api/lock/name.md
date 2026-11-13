---
title: "Lock: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/lock/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Lock: name property

The **`name`** read-only property of
the `Lock` interface returns the _name_ passed to
`LockManager.request` selected when the lock was requested.

The name of a lock is passed by script when the lock is requested. The name is selected
by the developer to represent an abstract resource for which use is being coordinated
across multiple tabs, workers, or other code within the origin. For example, if only one
tab of a web application should be synchronizing network resources with an offline
database, it could use a lock name such as `"net_db_sync"`.

## Value

A string.

## Examples

The following examples show how the name property passed in the call
to `LockManager.request()`. `LockManager` is the object returned
by `navigator.locks`.

```js
navigator.locks.request("net_db_sync", showLockProperties);

function showLockProperties(lock) {
  console.log(`The lock name is: ${lock.name}`);
  console.log(`The lock mode is: ${lock.mode}`);
}
```
