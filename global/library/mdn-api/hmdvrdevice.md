---
title: "HMDVRDevice"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hmdvrdevice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HMDVRDevice

The **`HMDVRDevice`** interface of the WebVR API represents a head mounted display, providing access to information about each eye, and allowing us to modify the current field of view.

## Instance properties

_This interface doesn't define any properties of its own, but it does inherit the properties of its parent interface, `VRDisplay`._

- `VRDisplay.hardwareUnitId` (read-only)
    Returns the distinct hardware ID for the overall hardware unit that this `VRDevice` is a part of. All devices that are part of the same physical piece of hardware will have the same `hardwareUnitId`.
- `VRDisplay.displayId` (read-only)
    Returns the ID for this specific `VRDevice`. The ID shouldn't change across browser restarts, allowing configuration data to be saved based on it.
- `VRDisplay.displayName` (read-only)
    A human-readable name to identify the `VRDevice`.

## Instance methods

- `HMDVRDevice.getEyeParameters()` (deprecated) (non-standard)
    Returns current parameters for the eye specified as its argument ("left" or "right") — such as field of view information — stored in a `VREyeParameters` object.
- `HMDVRDevice.setFieldOfView()` (deprecated) (non-standard)
    Sets the field of view for both eyes.

## Examples

The following example, taken from the WebVR spec, finds the first available `HMDVRDevice` and its associated `PositionSensorVRDevice`, if it has one.

```js
navigator.getVRDevices().then((devices) => {
  for (const device of devices) {
    if (device instanceof HMDVRDevice) {
      gHMD = device;
      break;
    }
  }

  if (gHMD) {
    for (const device of devices) {
      if (
        device instanceof PositionSensorVRDevice &&
        device.hardwareUnitId === gHMD.hardwareUnitId
      ) {
        gPositionSensor = devices[i];
        break;
      }
    }
  }
});
```

## See also

- WebVR API
