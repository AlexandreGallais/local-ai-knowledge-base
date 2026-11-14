---
title: "BatteryManager: chargingTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/batterymanager/chargingtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BatteryManager: chargingTime property

The **`chargingTime`** read-only property of the `BatteryManager` interface indicates the amount of time, in seconds, that remain until the battery is fully charged, or `0` if the battery is already fully charged or the user agent is unable to report the battery status information.
If the battery is currently discharging, its value is `Infinity`.
When its value changes, the `chargingtimechange` event is fired.

> **Note:**
> Even if the time returned is precise to the second,
> browsers round them to a higher interval
> (typically to the closest 15 minutes) for privacy reasons.

## Value

A number.

## Examples

### HTML

```html
<div id="chargingTime">(charging time unknown)</div>
```

### JavaScript

```js
navigator.getBattery().then((battery) => {
  const time = battery.chargingTime;

  document.querySelector("#chargingTime").textContent =
    `Time to fully charge the battery: ${time}s`;
});
```

## See also

- `BatteryManager`
- `Navigator.getBattery()`
