---
title: "Navigator: getBattery() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/getbattery/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: getBattery() method

The **`getBattery()`** method provides information about the system's battery.
It returns a battery promise, which resolves with a `BatteryManager` object providing some properties to get the battery status also some events you can handle to monitor the battery status.
This implements the `Battery Status API`; see that documentation for additional details, a guide to using the API, and sample code.

Since Chrome 103, the `Navigator.getBattery()` method of `Battery Status API` only expose to secure context.

> **Note:**
> Access to this feature may be controlled by the `Permissions-Policy` directive `battery`.

## Syntax

```js
getBattery()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with a `BatteryManager` object which you can use to get information about the battery's state.

### Exceptions

- `NotAllowedError` `DOMException`
    Use of this feature was blocked by a Permissions Policy.

- `SecurityError` `DOMException`
    The User Agent does not expose battery information to insecure contexts and this method was called from an insecure context.

## Examples

This example fetches the current charging state of the battery and establishes a handler for the `chargingchange` event, so that the charging state is recorded whenever it changes.

```js
let batteryIsCharging = false;

navigator.getBattery().then((battery) => {
  batteryIsCharging = battery.charging;

  battery.addEventListener("chargingchange", () => {
    batteryIsCharging = battery.charging;
  });
});
```

For more examples and details, see `Battery Status API`.

## See also

- `Battery Status API`
- `Permissions-Policy` `battery` directive
