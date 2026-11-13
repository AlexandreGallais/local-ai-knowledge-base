---
title: "BatteryManager: levelchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/batterymanager/levelchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BatteryManager: levelchange event

The **`levelchange`** event of the `BatteryManager` interface is fired when the battery `level` property is updated.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("levelchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onlevelchange = (event) => { }
```

## Event type

_A generic `Event`._

## Example

### HTML

```html
<div id="level">(battery level unknown)</div>
<div id="stateBattery">(charging state unknown)</div>
```

### JavaScript

```js
navigator.getBattery().then((battery) => {
  battery.onlevelchange = () => {
    document.querySelector("#level").textContent = battery.level;

    if (battery.charging) {
      document.querySelector("#stateBattery").textContent = `Charging time: ${
        battery.chargingTime / 60
      }`;
    } else {
      document.querySelector("#stateBattery").textContent =
        `Discharging time: ${battery.dischargingTime / 60}`;
    }
  };
});
```

## See also

- `BatteryManager`
- `Navigator.getBattery()`
