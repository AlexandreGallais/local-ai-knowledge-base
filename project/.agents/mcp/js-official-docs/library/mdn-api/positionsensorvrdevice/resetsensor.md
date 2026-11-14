---
title: "PositionSensorVRDevice: resetSensor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/positionsensorvrdevice/resetsensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PositionSensorVRDevice: resetSensor() method

The **`resetSensor()`** method of the `VRDisplay` interface _can be used to reset the sensor if desired, returning the_ position and orientation values to zero.

## Syntax

```js
resetSensor()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

The following demo uses the WebVR API to update the view of a simple `CanvasRenderingContext2D` scene on each frame of a `requestAnimationFrame` loop. It features, among other things, a "Reset Sensor" button in the UI, which when pressed runs the `resetSensor()` function on the position sensor. The JavaScript looks like this:

```js
document.querySelector("button").onclick = () => {
  gPositionSensor.resetSensor();
};
```

When the button is pressed, the current position, orientation, etc. of the sensor/head mounted display is set to be 0 — this makes the method useful for calibration when an app is first loaded.

## See also

- WebVR API
