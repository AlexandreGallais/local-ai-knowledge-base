---
title: "WakeLockSentinel: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wakelocksentinel/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WakeLockSentinel: type property

The **`type`** read-only property of the `WakeLockSentinel` interface returns a string representation of the currently acquired `WakeLockSentinel` type.

## Value

A string representation of the currently acquired wake lock type.
Currently, the value is always `screen`, which represents a screen wake lock.
It prevents devices from dimming or locking the screen.

## Examples

This example shows an asynchronous function that acquires a `WakeLockSentinel`, then logs the type to the console.

```js
const requestWakeLock = async () => {
  wakeLock = await navigator.wakeLock.request("screen");
  console.log(wakeLock.type); // logs 'screen'
};

requestWakeLock();
```

## See also

- Stay awake with the Screen Wake Lock API
