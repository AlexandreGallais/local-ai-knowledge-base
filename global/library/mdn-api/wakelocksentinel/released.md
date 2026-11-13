---
title: "WakeLockSentinel: released property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wakelocksentinel/released/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WakeLockSentinel: released property

The **`released`** read-only property of the `WakeLockSentinel` interface returns a boolean that indicates whether a `WakeLockSentinel` has been released.

The `WakeLockSentinel` is released when the associated platform screen wake lock is revoked; afterwards `released` will always return `true`.
If a subsequent screen wake lock is required, the application will need to request a new screen wake lock (the current `WakeLockSentinel` cannot be reused).

## Value

A boolean value that is `false` until the `WakeLockSentinel` has been released (either through a call to `WakeLockSentinel.release()` or because the lock has been released automatically) and the `release` event has been emitted, after which it becomes `true` and no longer changes.

## Examples

This example shows how the value of the `released` property changes within a `WakeLockSentinel`'s life cycle.

```js
const sentinel = await navigator.wakeLock.request("screen");
console.log(sentinel.released); // Logs "false"

sentinel.onrelease = () => {
  console.log(sentinel.released); // Logs "true"
};

await sentinel.release();
```

## See also

- Stay awake with the Screen Wake Lock API
