---
title: "Battery Status API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/battery_status_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Battery Status API

The **Battery Status API**, more often referred to as the **Battery API**, provides information about the system's battery charge level and lets you be notified by events that are sent when the battery level or charging status change. This can be used to adjust your app's resource usage to reduce battery drain when the battery is low, or to save changes before the battery runs out in order to prevent data loss.

> **Note:**
> This API is _not available_ in Web Workers (not exposed via `WorkerNavigator`).

## Interfaces

- `BatteryManager`
    Provides information about the system's battery charge level.

### Extensions to other interfaces

- `Navigator.getBattery()`
    Returns a `Promise` that resolves with a `BatteryManager` object.

## Example

In this example, we watch for changes both to the charging status (whether or not we're plugged in and charging) and for changes to the battery level and timing. This is done by listening for the `chargingchange`, `levelchange`, `chargingtimechange`, `dischargingtimechange` events.

```js
navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener("chargingchange", () => {
    updateChargeInfo();
  });
  function updateChargeInfo() {
    console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`);
  }

  battery.addEventListener("levelchange", () => {
    updateLevelInfo();
  });
  function updateLevelInfo() {
    console.log(`Battery level: ${battery.level * 100}%`);
  }

  battery.addEventListener("chargingtimechange", () => {
    updateChargingInfo();
  });
  function updateChargingInfo() {
    console.log(`Battery charging time: ${battery.chargingTime} seconds`);
  }

  battery.addEventListener("dischargingtimechange", () => {
    updateDischargingInfo();
  });
  function updateDischargingInfo() {
    console.log(`Battery discharging time: ${battery.dischargingTime} seconds`);
  }
});
```

See also the example in the specification.

## See also

- Hacks blog post - Using the Battery API
