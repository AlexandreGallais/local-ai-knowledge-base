---
title: "WakeLock: request() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wakelock/request/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WakeLock: request() method

The **`request()`** method of the `WakeLock` interface returns a `Promise` that fulfills with a `WakeLockSentinel` object if the system screen wake lock is granted.

The screen wake lock prevents device screens from dimming or locking when an application needs to keep running.

## Syntax

```js
request(type)
```

### Parameters

- `type` (optional)
    A string specifying the screen wake lock type, from among the following enumerated types:
    - `screen`
        Prevents the screen from turning off.
        Only visible documents can acquire the screen wake lock.

If no `type` parameter is explicitly specified, the `request()` method defaults to using the `screen` type.

### Return value

A `Promise` that resolves with a `WakeLockSentinel` object.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown when wake lock is not available, which can happen because:
    - Use of this feature is blocked by a Permissions Policy.
    - The document is not fully active.
    - The document's visibility state is `hidden`.
    - The User Agent could not acquire platform's wake lock.
      For example, this might happen if the device is low on battery.

## Examples

The following asynchronous function requests a `WakeLockSentinel` object.
The `request()` method is wrapped in a `try...catch` statement to handle cases where the browser refuses the request for any reason.

```js
const requestWakeLock = async () => {
  try {
    const wakeLock = await navigator.wakeLock.request("screen");
  } catch (err) {
    // The wake lock request fails - usually system-related, such as low battery.

    console.log(`${err.name}, ${err.message}`);
  }
};

requestWakeLock();
```

The screen wake lock may be revoked by the device after it has been granted.
The returned `WakeLockSentinel` can be used to check the status of the lock, and/or to manually cancel a held screen wake lock.

## See also

- Stay awake with the Screen Wake Lock API
