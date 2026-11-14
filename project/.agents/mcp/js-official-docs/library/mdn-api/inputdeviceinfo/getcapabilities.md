---
title: "InputDeviceInfo: getCapabilities() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputdeviceinfo/getcapabilities/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputDeviceInfo: getCapabilities() method

The **`getCapabilities()`** method of the `InputDeviceInfo` interface returns a `MediaTrackCapabilities` object describing the primary audio or video track of the device's `MediaStream`.

## Syntax

```js
getCapabilities()
```

### Parameters

None.

### Return value

A `MediaTrackCapabilities` object which specifies the value or range of values which are supported for each of the user agent's supported constrainable properties. It is required to return identical information as returned by calling `getCapabilities()` on the first `MediaStreamTrack` of the same `kind` as this device (video or audio) in the `MediaStream` returned by `getUserMedia({ deviceId: deviceInfo.deviceId })`.

See `MediaStreamTrack.getCapabilities()` for a list of commonly supported properties and their types.

> **Note:**
> If the user has not granted permission to access the input device an empty object will be returned.

## Examples

In the following example we ask for permission to access audio and video devices with `mediaDevices.getUserMedia()`, as to use `getCapabilities()` we need permission to access the devices.

If `device` is an `InputDeviceInfo` object, then `getCapabilities()` will return an object with members representing its capabilities. A video stream will not include auto properties such as `noiseSuppression`, for example.

```js
// Get permission to access audio or video devices
navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  // Enumerate media devices
  .then(() => navigator.mediaDevices.enumerateDevices())
  .then((devices) => {
    devices.forEach((device) => {
      if (typeof device.getCapabilities === "function") {
        console.log("Capabilities:", device.getCapabilities()); // A MediaTrackCapabilities object.
      } else {
        console.log("Device does not support getCapabilities:", device);
      }
    });
  })
  .catch((mediaError) => {
    console.error("Error accessing media devices:", mediaError);
  });
```

## See also

- `MediaStreamTrack.getCapabilities()`, which also return a `MediaTrackCapabilities` object.
