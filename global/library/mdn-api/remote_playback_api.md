---
title: "Remote Playback API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/remote_playback_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Remote Playback API

The **Remote Playback API** extends the `HTMLMediaElement` to enable the control of media played on a remote device.

## Concepts and Usage

Remote playback devices are connected devices such as TVs, projectors, or speakers. The API takes into account wired devices connected via HDMI or DVI, and wireless devices, for example Chromecast or AirPlay.

The API enables a page, which has a media element such as a video or audio file, to initiate and control playback of that media on a connected remote device. For example, playing a video on a connected TV.

> **Note:**
> Safari for iOS has some APIs which enable remote playback on AirPlay. Details of these can be found in the Safari 9.0 release notes.
>
> Android versions of Firefox and Chrome also contain some remote playback features. These devices will show a Cast button if there is a Cast device available in the local network.

## Interfaces

- `RemotePlayback`
    Allows the page to detect availability of remote playback devices, then connect to and control playing on these devices.

### Extensions to other interfaces

- `HTMLMediaElement.disableRemotePlayback`
    A boolean that sets or returns the remote playback state, indicating whether the media element is allowed to have a remote playback UI.
- `HTMLMediaElement.remote` (read-only)
    Return a `RemotePlayback` object instance associated with the media element.

## Examples

The following example demonstrates a player with custom controls that supports remote playback. Initially the button used to select a device is hidden.

```html
<video id="videoElement" src="https://example.org/media.ext">
  <button id="deviceBtn" class="hidden">Pick device</button>
</video>
```

```css
.hidden {
  display: none;
}
```

The `RemotePlayback.watchAvailability()` method watches for available remote playback devices. If a device is available, use the callback to show the button.

```js
const deviceBtn = document.getElementById("deviceBtn");
const videoElem = document.getElementById("videoElement");

function availabilityCallback(available) {
  // Show or hide the device picker button depending on device availability.
  if (available) {
    deviceBtn.classList.remove("hidden");
  } else {
    deviceBtn.classList.add("hidden");
  }
}

videoElem.remote.watchAvailability(availabilityCallback).catch(() => {
  // If the device cannot continuously watch available,
  // show the button to allow the user to try to prompt for a connection.
  deviceBtn.style.display = "inline";
});
```
