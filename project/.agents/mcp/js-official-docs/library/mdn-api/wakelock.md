---
title: "WakeLock"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wakelock/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WakeLock

The **`WakeLock`** interface of the Screen Wake Lock API can be used to request a lock that prevents device screens from dimming or locking when an application needs to keep running.

This interface, and hence the system wake lock, is exposed through the `Navigator.wakeLock` property.

## Instance methods

- `request()`
    Returns a `Promise` that fulfills with a `WakeLockSentinel` object if the screen wake lock is granted.

## Examples

The following code `awaits` the request for a `WakeLockSentinel` object, and continues if the request is granted.

The `WakeLock.request()` method is wrapped in a `try...catch` statement to catch cases when the promise might be rejected, such as due to low device power.

```js
try {
  const wakeLock = await navigator.wakeLock.request("screen");
} catch (err) {
  // the wake lock request fails - usually system related, such being low on battery
  console.log(`${err.name}, ${err.message}`);
}
```

Note that the screen wake lock may be revoked by the device after it has been granted.
The returned `WakeLockSentinel` can be used to check the status of the lock, and/or to manually cancel a held screen wake lock.

## See also

- Stay awake with the Screen Wake Lock API
