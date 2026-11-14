---
title: "BatteryManager: chargingtimechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/batterymanager/chargingtimechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BatteryManager: chargingtimechange event

The **`chargingtimechange`** event of the `BatteryManager` interface is fired when the battery `chargingTime` property is updated.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("chargingtimechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onchargingtimechange = (event) => { }
```

## Event type

_A generic `Event`._

## Example

### HTML

```html
<div id="level">(battery level unknown)</div>
<div id="chargingTime">(charging time unknown)</div>
```

### JavaScript

```js
navigator.getBattery().then((battery) => {
  battery.onchargingtimechange = () => {
    document.querySelector("#level").textContent = battery.level;
    document.querySelector("#chargingTime").textContent = battery.chargingTime;
  };
});
```

## See also

- `BatteryManager`
- `Navigator.getBattery()`
