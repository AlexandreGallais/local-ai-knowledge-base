---
title: "BatteryManager: level property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/batterymanager/level/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BatteryManager: level property

The **`level`** read-only property of the `BatteryManager` interface indicates the current battery charge level as a value between `0.0` and `1.0`.
A value of `0.0` means the battery is empty and the system is about to be suspended.
A value of `1.0` means the battery is full or the user agent is unable to report the battery status information.
When its value changes, the `levelchange` event is fired.

## Value

A number.

## Examples

### Getting the battery level

#### HTML

```html
<button id="get-level">Get battery level</button>
<div id="output"></div>
```

#### JavaScript

```js
const getLevel = document.querySelector("#get-level");
const output = document.querySelector("#output");

getLevel.addEventListener("click", async () => {
  if (!navigator.getBattery) {
    output.textContent = "Battery manager is unsupported";
  } else {
    const manager = await navigator.getBattery();
    const level = manager.level;
    output.textContent = `Battery level: ${level}`;
  }
});
```

#### Result

## See also

- `BatteryManager`
- `Navigator.getBattery()`
