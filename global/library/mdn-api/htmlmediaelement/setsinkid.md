---
title: "HTMLMediaElement: setSinkId() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/setsinkid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: setSinkId() method

The **`setSinkId()`** method of the `HTMLMediaElement` interface sets the ID of the audio device to use for output and returns a `Promise`.

This only works when the application is permitted to use the specified device.
For more information see the security requirements below.

## Syntax

```js
setSinkId(sinkId)
```

### Parameters

- `sinkId`
    The `MediaDeviceInfo.deviceId` of the audio output device.

### Return value

A `Promise` that resolves to `undefined`.

### Exceptions

- `NotAllowedError` `DOMException`
    Returned if a `speaker-selection` Permissions Policy is used to block use of audio outputs.
- `NotFoundError` `DOMException`
    Returned if the `deviceId` does not match any audio output device.
- `AbortError` `DOMException`
    Returned if switching the audio output device to the new audio device failed.

## Security requirements

Access to the API is subject to the following constraints:

- The method must be called in a secure context.
- Access may be gated by the `speaker-selection` HTTP Permission Policy.
- User permission is required to access a non-default device.
  The user grants permission by selecting the device associated with the ID in the prompt displayed by `MediaDevices.selectAudioOutput()`.

## Examples

This example shows how to select an audio output device from the array returned by `MediaDevices.enumerateDevices()`, and set it as the sink for audio.
Note that the result of `enumerateDevices()` only includes devices for which user permission is not required or has already been granted.

```js
const devices = await navigator.mediaDevices.enumerateDevices();
const audioDevice = devices.find((device) => device.kind === "audiooutput");
const audio = document.createElement("audio");
await audio.setSinkId(audioDevice.deviceId);
console.log(`Audio is being output on ${audio.sinkId}`);
```

## See also

- Audio Output Devices API
- `MediaDevices.selectAudioOutput()`
- `HTMLMediaElement.sinkId`
