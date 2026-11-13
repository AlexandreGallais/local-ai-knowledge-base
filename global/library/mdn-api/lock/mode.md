---
title: "Lock: mode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/lock/mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Lock: mode property

The **`mode`** read-only property of the `Lock` interface returns the access mode passed to `LockManager.request()` when the lock was requested.
The mode is either `"exclusive"` (the default) or `"shared"`.

## Value

One of `"exclusive"` or `"shared"`.

## Examples

The following examples show how the mode property is passed in the call to `LockManager.request()`.
`LockManager` is the object returned by `navigator.locks`.

```js
// Should show "exclusive" (the default)
navigator.locks.request("my_resource", showLockProperties);

// Should show "exclusive"
navigator.locks.request(
  "my_resource",
  { mode: "exclusive" },
  showLockProperties,
);

// Should show "shared"
navigator.locks.request("my_resource", { mode: "shared" }, showLockProperties);

function showLockProperties(lock) {
  console.log(`The lock name is: ${lock.name}`);
  console.log(`The lock mode is: ${lock.mode}`);
}
```
