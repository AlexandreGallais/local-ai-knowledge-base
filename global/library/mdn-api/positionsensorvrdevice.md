---
title: "PositionSensorVRDevice"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/positionsensorvrdevice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PositionSensorVRDevice

The **`PositionSensorVRDevice`** interface of the WebVR API represents VR hardware's position sensor. You can access information such as the current position and orientation of the sensor in relation to the head mounted display through the `PositionSensorVRDevice.getState()` method.

## Instance properties

_This interface doesn't define any properties of its own, but it does inherit the properties of its parent interface, `VRDisplay`._

- `VRDisplay.displayId` (read-only)
    Returns the ID for this specific `VRDevice`. The ID shouldn't change across browser restarts, allowing configuration data to be saved based on it.
- `VRDisplay.displayName` (read-only)
    A human-readable name to identify the `VRDevice`.

## Instance methods

- `PositionSensorVRDevice.getState()` (deprecated) (non-standard)
    Returns the current state of the position sensor for the current frame (e.g., within the current `window.requestAnimationFrame` callback) or for the previous frame, contained with a `VRPose` object. This is the method you'd normally want to use, versus `getImmediateState()`.
- `PositionSensorVRDevice.getImmediateState()` (deprecated) (non-standard)
    Returns the current instantaneous position sensor state. This is intended to only be used rarely, for certain special uses, for example sampling the immediate position of a hand orientation sensor — or at least it will be, in the future.
- `PositionSensorVRDevice.resetSensor()` (deprecated) (non-standard)
    _Can be used to reset the sensor if desired, returning the_ position and orientation values to zero.

## Examples

The following example uses the WebVR API to update the view of a simple 2D canvas scene on each frame of a `requestAnimationFrame` loop.

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

Here we are grabbing a `VRPose` object using `PositionSensorVRDevice.getState()` and storing it in `posState`. We then check to make sure that position and orientation info is present in the current frame using `VRPose.position` and `VRPose.orientation` (these return `null` if, for example the head mounted display is turned off or not pointing at the position sensor, which would cause an error.)

We then output the x, y and z position and orientation values for informational purposes, and use those values to update the `xPos`, `yPos`, `zPos`, `xOrient`, `yOrient`, and `zOrient` variables, which are used to update the scene rendering on each frame.

## See also

- WebVR API
