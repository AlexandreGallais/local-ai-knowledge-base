---
title: "MediaDevices: enumerateDevices() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediadevices/enumeratedevices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaDevices: enumerateDevices() method

The **`enumerateDevices()`** method of the `MediaDevices` interface requests a list of the currently available media input and output devices, such as microphones, cameras, headsets, and so forth.
The returned `Promise` is resolved with an array of `MediaDeviceInfo` objects describing the devices.

The returned list will omit any devices that are blocked by the document Permission Policy: `microphone`, `camera`, `speaker-selection` (for output devices), and so on.
Access to particular non-default devices is also gated by the Permissions API, and the list will omit devices for which the user has not granted explicit permission.

## Syntax

```js
enumerateDevices()
```

### Parameters

None.

### Return value

A `Promise` that is fulfilled with an array of `MediaDeviceInfo` objects.
Each object in the array describes one of the available media input and output devices.
The order is significant — the default capture devices will be listed first.

Other than default devices, only devices for which permission has been granted are "available".

If the media device is an input device, an `InputDeviceInfo` object will be returned instead.

If enumeration fails, the promise is rejected.

## Security requirements

Access to the API is subject to the following constraints:

- The method must be called in a secure context.
- The document must be fully active and its visibility must be "visible".

## Examples

Here's an example of using `enumerateDevices()`. It outputs a list of the device IDs, with their labels if available.

```js
if (!navigator.mediaDevices?.enumerateDevices) {
  console.log("enumerateDevices() not supported.");
} else {
  // List cameras and microphones.
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
      });
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    });
}
```

This might produce:

```plain
videoinput: id = csO9c0YpAf274OuCPUA53CNE0YHlIr2yXCi+SqfBZZ8=
audioinput: id = RKxXByjnabbADGQNNZqLVLdmXlS0YkETYCIbg+XxnvM=
audioinput: id = r2/xw1xUPIyZunfV1lGrKOma5wTOvCkWfZ368XCndm0=
```

or if one or more `MediaStream`s are active or persistent permissions are
granted:

```plain
videoinput: FaceTime HD Camera (Built-in) id=csO9c0YpAf274OuCPUA53CNE0YHlIr2yXCi+SqfBZZ8=
audioinput: default (Built-in Microphone) id=RKxXByjnabbADGQNNZqLVLdmXlS0YkETYCIbg+XxnvM=
audioinput: Built-in Microphone id=r2/xw1xUPIyZunfV1lGrKOma5wTOvCkWfZ368XCndm0=
```

## See also

- `MediaDevices.getUserMedia`
- WebRTC - the introductory page to the API
- Media Capture and Streams API - the API for the media stream objects
- Taking webcam photos - a
  tutorial on using `getUserMedia()` for taking photos rather than video.
