---
title: "PositionSensorVRDevice: getState() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/positionsensorvrdevice/getstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PositionSensorVRDevice: getState() method

The **`getState()`** method of the `PositionSensorVRDevice` interface returns the current state of the position sensor for the current frame (e.g., within the current `window.requestAnimationFrame` callback) or for the previous frame, contained with a `VRPose` object. This is the method you'd normally want to use, vs. `PositionSensorVRDevice.getImmediateState`.

## Syntax

```js
getState()
```

### Parameters

None.

### Return value

A `VRPose` object.

## Examples

The following example uses the WebVR API to update the view of a simple `CanvasRenderingContext2D` scene on each frame of a `requestAnimationFrame` loop.

```js
function setView() {
  const posState = gPositionSensor.getState();
  if (posState.hasPosition) {
    posPara.textContent = `Position: x${roundToTwo(
      posState.position.x,
    )} y${roundToTwo(posState.position.y)} z${roundToTwo(posState.position.z)}`;
    xPos = -posState.position.x * WIDTH * 2;
    yPos = posState.position.y * HEIGHT * 2;
    zPos = -posState.position.z > 0.01 ? -posState.position.z : 0.01;
  }

  if (posState.hasOrientation) {
    orientPara.textContent = `Orientation: x${roundToTwo(
      posState.orientation.x,
    )} y${roundToTwo(posState.orientation.y)} z${roundToTwo(
      posState.orientation.z,
    )}`;
    xOrient = posState.orientation.x * WIDTH;
    yOrient = -posState.orientation.y * HEIGHT * 2;
    zOrient = posState.orientation.z * 180;
  }
}
```

Here we are grabbing a `VRPose` object using `getState()` and storing it in `posState`. We then check to make sure that position and orientation info is present in the current frame using `VRPose.position` and `VRPose.orientation` (these return `null` if, for example the head mounted display is turned off or not pointing at the position sensor, which would cause an error.)

We then output the x, y and z position and orientation values for informational purposes, and use those values to update the `xPos`, `yPos`, `zPos`, `xOrient`, `yOrient`, and `zOrient` variables, which are used to update the scene rendering on each frame.

## See also

- WebVR API
