---
title: "BatteryManager"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/batterymanager/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BatteryManager

The **`BatteryManager`** interface of the `Battery Status API` provides information about the system's battery charge level. The `navigator.getBattery()` method returns a promise that resolves with a `BatteryManager` interface.

Since Chrome 103, the `BatteryManager` interface of `Battery Status API` only expose to secure context.

## Instance properties

_Also inherits properties from its parent interface, `EventTarget`._

- `BatteryManager.charging` (read-only)
    A Boolean value indicating whether the battery is currently being charged.
- `BatteryManager.chargingTime` (read-only)
    A number representing the remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged.
- `BatteryManager.dischargingTime` (read-only)
    A number representing the remaining time in seconds until the battery is completely discharged and the system suspends.
- `BatteryManager.level` (read-only)
    A number representing the system's battery charge level scaled to a value between 0.0 and 1.0.

## Instance methods

_Also inherits methods from its parent interface, `EventTarget`._

## Events

_Also inherits events from its parent interface, `EventTarget`._

- `chargingchange`
    Fired when the battery charging state (the `charging` property) is updated.
- `chargingtimechange`
    Fired when the battery charging time (the `chargingTime` property) is updated.
- `dischargingtimechange`
    Fired when the battery discharging time (the `dischargingTime` property) is updated.
- `levelchange`
    Fired when the battery level (the `level` property) is updated.

## See also

- The `Battery Status API`
- `Navigator.getBattery()`
