---
title: "WakeLockSentinel: release event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wakelocksentinel/release_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WakeLockSentinel: release event

The **`release`** event of the `WakeLockSentinel` interface is fired when the sentinel object's handle has been released.

A `WakeLockSentinel` can be released manually via the `release()` method, or automatically via the platform wake lock.
This can happen if the document becomes inactive or loses visibility, if the device is low on power or the user turns on a power save mode.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("release", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onrelease = (event) => { }
```

## Event type

A generic `Event`.

## Examples

This example updates the UI if the wake lock is released.

```js
wakeLock.addEventListener("release", () => {
  // if wake lock is released alter the UI accordingly
  statusElement.textContent = "Wake Lock has been released";
});
```

## See also

- Stay awake with the Screen Wake Lock API
