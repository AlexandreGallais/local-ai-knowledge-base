---
title: "LockManager: query() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/lockmanager/query/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LockManager: query() method

The **`query()`** method of the `LockManager` interface returns a `Promise` that resolves with an object containing information about held and pending locks.

## Syntax

```js
query()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an object containing a snapshot of the `LockManager` state.
The object has the following properties:

- `held`
    An array of `LockInfo` objects for held locks.
- `pending`
    An array of `LockInfo` objects for pending lock requests.

The `LockInfo` object can have the following properties:

- `name`
    The name passed to `LockManager.request()` when the lock was requested.
- `mode`
    The access mode passed to `LockManager.request()` when the lock was requested. The mode is either `"exclusive"` or `"shared"`.
- `clientId`
    The unique identity of the context where `LockManager.request()` is called. This is the same value as `Client.id`.

### Exceptions

This method may return a promise rejected with a `DOMException` of one of the following types:

- `InvalidStateError` `DOMException`
    Thrown if the environments document is not fully active.
- `SecurityError` `DOMException`
    Thrown if a lock manager cannot be obtained for the current environment.

## Examples

```js
const state = await navigator.locks.query();
for (const lock of state.held) {
  console.log(`held lock: name ${lock.name}, mode ${lock.mode}`);
}
for (const request of state.pending) {
  console.log(`requested lock: name ${request.name}, mode ${request.mode}`);
}
```
