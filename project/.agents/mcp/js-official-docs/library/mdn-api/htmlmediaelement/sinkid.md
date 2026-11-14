---
title: "HTMLMediaElement: sinkId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/sinkid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: sinkId property

The **`sinkId`** read-only property of the `HTMLMediaElement` interface returns a string that is the unique ID of the device to be used for playing audio output.

This ID should be one of the `MediaDeviceInfo.deviceId` values returned from `MediaDevices.enumerateDevices()`.
If the user agent default device is being used, it returns an empty string.

## Value

A string indicating the current audio output device, or the empty string if the default user agent output device is being used.

## Security requirements

Access to the property is subject to the following constraints:

- The property must be called in a secure context.

## See also

- Audio Output Devices API
- `MediaDevices.selectAudioOutput()`
- `HTMLMediaElement.setSinkId()`
