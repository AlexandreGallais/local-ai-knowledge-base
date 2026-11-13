---
title: "BatteryManager: dischargingTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/batterymanager/dischargingtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BatteryManager: dischargingTime property

The **`dischargingTime`** read-only property of the `BatteryManager` interface indicates the amount of time, in seconds, that remains until the battery is fully discharged,
or `Infinity` if the battery is currently charging rather than discharging or the user agent is unable to report the battery status information.
When its value changes, the `dischargingtimechange` event is fired.

> **Note:**
> Even if the time returned is precise to the second, browsers round them to a higher
> interval (typically to the closest 15 minutes) for privacy reasons.

## Value

A number.

## Examples

### HTML

```html
<div id="dischargingTime">(discharging time unknown)</div>
```

### JavaScript

```js
navigator.getBattery().then((battery) => {
  const time = battery.dischargingTime;

  document.querySelector("#dischargingTime").textContent =
    `Remaining time to fully discharge the battery: ${time}s`;
});
```

## See also

- `BatteryManager`
- `Navigator.getBattery()`
