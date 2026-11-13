---
title: "RemotePlayback: prompt() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/remoteplayback/prompt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RemotePlayback: prompt() method

The **`prompt()`** method of the `RemotePlayback` interface prompts the user to select an available remote playback device and give permission for the current media to be played using that device.

If the user gives permission, the `state` will be set to `connecting` and the user agent will connect to the device to initiate playback.

If the user chooses to instead disconnect from the device, the `state` will be set to `disconnected` and user agent will disconnect from this device.

## Syntax

```js
prompt()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined` after the user accepts or rejects the prompt.

### Exceptions

The promise will be rejected with one of the following exceptions:

- `InvalidStateError` `DOMException`
    Thrown if `disableRemotePlayback` is `true` for the media element.
- `OperationError` `DOMException`
    Thrown if there is already an unsettled promise from a previous call to `prompt()` for this media element, or browsing context.
- `InvalidAccessError` `DOMException`
    Thrown if the user has not interacted with this device recently.
- `NotSupportedError` `DOMException`
    Thrown if the user agent knows that remote playback of this particular media is not feasible.
- `NotFoundError` `DOMException`
    Thrown if remote playback is unavailable.
- `NotAllowedError` `DOMException`
    Thrown if the user denies permission to use the device.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

In the following example the user is prompted to select a remote playback device to play a video.

```js
devicesBtn.onclick = () => {
  // Request the user to select a remote playback device.
  videoElem.remote
    .prompt()
    // Update the UI and monitor the connected state.
    .then(updateRemotePlaybackState);
  // Otherwise, the user canceled the selection UI or no screens were found.
};
```
