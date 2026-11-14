---
title: "BatteryManager: charging property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/batterymanager/charging/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BatteryManager: charging property

The **`charging`** read-only property of the `BatteryManager` interface is a Boolean value indicating whether or not the device's battery is currently being charged. When its value changes, the `chargingchange` event is fired.

If the battery is charging or the user agent is unable to report the battery status information, this value is `true`. Otherwise, it is `false`.

## Value

A boolean.

## Examples

### HTML

```html
<div id="charging">(charging state unknown)</div>
```

### JavaScript

```js
navigator.getBattery().then((battery) => {
  const charging = battery.charging;

  document.querySelector("#charging").textContent = charging;
});
```

## See also

- `BatteryManager`
- `Navigator.getBattery()`
