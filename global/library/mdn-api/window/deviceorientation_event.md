---
title: "Window: deviceorientation event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/deviceorientation_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: deviceorientation event

The **`deviceorientation`** event is fired when fresh data is available from an orientation sensor about the current orientation of the device as compared to the Earth coordinate frame. This data is gathered from a magnetometer inside the device.

See Orientation and motion data explained for details.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("deviceorientation", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondeviceorientation = (event) => { }
```

## Event type

A `DeviceOrientationEvent`. Inherits from `Event`.

## Examples

```js
if (window.DeviceOrientationEvent) {
  window.addEventListener(
    "deviceorientation",
    (event) => {
      const rotateDegrees = event.alpha; // alpha: rotation around z-axis
      const leftToRight = event.gamma; // gamma: left to right
      const frontToBack = event.beta; // beta: front back motion

      handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
    },
    true,
  );
}

function handleOrientationEvent(frontToBack, leftToRight, rotateDegrees) {
  // do something amazing
}
```

## See also

- `devicemotion`
- Detecting device orientation
- Orientation and motion data explained
