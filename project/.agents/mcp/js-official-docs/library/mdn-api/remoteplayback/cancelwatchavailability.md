---
title: "RemotePlayback: cancelWatchAvailability() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/remoteplayback/cancelwatchavailability/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RemotePlayback: cancelWatchAvailability() method

The **`cancelWatchAvailability()`** method of the `RemotePlayback` interface cancels the request to watch for one or all available devices.

## Syntax

```js
cancelWatchAvailability()
cancelWatchAvailability(id)
```

### Parameters

- `id` (optional)
    The `callbackId` of a particular remote playback device.

    If a `callbackId` of a specific device is passed in, then that device will be removed from the list of watched devices. Otherwise, the whole list will be cleared.

### Return value

A `Promise` that resolves with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `disableRemotePlayback` is `true` for the media element.
- `NotFoundError` `DOMException`
    Thrown if an `id` is passed but it does not match any available `callbackId`.

## Examples

Once a remote playback device has been identified and is connected, the monitoring of available devices can be stopped using `cancelWatchAvailability()`.

```js
function switchToRemoteUI() {
  // Indicate that the state is 'connecting' or 'connected' to the user.
  // For example, hide the video element as only controls are needed.
  videoElem.style.display = "none";

  // Stop monitoring the availability of remote playback devices.
  videoElem.remote.cancelWatchAvailability();
}
```
