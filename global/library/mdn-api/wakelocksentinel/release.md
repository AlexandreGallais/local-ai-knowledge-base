---
title: "WakeLockSentinel: release() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wakelocksentinel/release/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WakeLockSentinel: release() method

The **`release()`** method of the `WakeLockSentinel` interface releases the `WakeLockSentinel`, returning a `Promise` that is resolved once the sentinel has been successfully released.

## Syntax

```js
release()
```

### Parameters

None.

### Return value

Returns a `Promise` that resolves with `undefined`.

### Exceptions

No exceptions are thrown.
You should always listen for the `release` event to check if a wake lock has been released.

## Examples

In this example, when a user clicks a button the `WakeLockSentinel` is released.

```js
wakeLockOffButton.addEventListener("click", () => {
  WakeLockSentinel.release();
});
```

## See also

- Stay awake with the Screen Wake Lock API
