---
title: "InputDeviceInfo"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputdeviceinfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputDeviceInfo

The **`InputDeviceInfo`** interface of the `Media Capture and Streams API` gives access to the capabilities of the input device that it represents.

`InputDeviceInfo` objects are returned by `MediaDevices.enumerateDevices()` if the returned device is an audio or video input device.

## Instance properties

_Also inherits properties from its parent interface, `MediaDeviceInfo`._

## Instance methods

_Also inherits methods from its parent interface, `MediaDeviceInfo`._

- `InputDeviceInfo.getCapabilities()`
    Returns a `MediaTrackCapabilities` object describing the primary audio or video track of a device's `MediaStream`.

## Examples

The following example gets all media devices with `MediaDevices.enumerateDevices()`. If any of the devices are input devices then `console.log(device)` will print an `InputDeviceInfo` object to the console.

```js
navigator.mediaDevices.enumerateDevices().then((devices) => {
  devices.forEach((device) => {
    console.log(device); // an InputDeviceInfo object if the device is an input device, otherwise a MediaDeviceInfo object.
  });
});
```
