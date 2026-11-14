---
title: "RemotePlayback: watchAvailability() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/remoteplayback/watchavailability/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RemotePlayback: watchAvailability() method

The **`watchAvailability()`** method of the `RemotePlayback` interface watches the list of available remote playback devices and returns a `Promise` that resolves with the `callbackId` of a remote playback device.

## Syntax

```js
watchAvailability(RemotePlaybackAvailabilityCallback)
```

### Parameters

- `RemotePlaybackAvailabilityCallback(boolean)`
    A callback that allows the page to obtain the remote playback device availability for the corresponding media element. It is passed a boolean which, if true, indicates that remote playback is available.

### Return value

A `Promise` that resolves with an integer. This is the `callbackId` for the identified remote playback device.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `disableRemotePlayback` is `true` for the media element.
- `NotSupportedError` `DOMException`
    Thrown if the user agent is unable to continuously monitor the list of available remote playback devices.

## Examples

In the following example, after checking that there is no currently connected device, `watchAvailability()` is used to watch for remote devices becoming available. See the working example (Requires a supported device and a connected remote playback device).

```js
if (video.remote.state === "disconnected") {
  video.remote.watchAvailability(handleAvailabilityChange).then((id) => {
    log(`> Started watching remote device availability: ${id}`);
    callbackId = id;
  });
}
```
