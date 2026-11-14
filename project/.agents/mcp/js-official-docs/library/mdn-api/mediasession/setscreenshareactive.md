---
title: "MediaSession: setScreenshareActive() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasession/setscreenshareactive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSession: setScreenshareActive() method

The **`setScreenshareActive()`** method of the `MediaSession` interface is used to indicate to the user agent whether the user's screenshare is considered to be active.

Call this method on the `navigator` object's `mediaSession` object.

Note that the status of the screenshare is not tracked in the `MediaSession` itself, but must be tracked separately.

## Syntax

```js
setScreenshareActive(active)
```

### Parameters

- `active`
    A boolean indicating whether the screenshare is considered active or not.

### Return value

None (`undefined`).

## Examples

Below is an example of updating the screenshare active state of the current
`MediaSession`, as well as listening to requests to change the screenshare status with `setActionHandler()`.

```js
let screenshareActive = false;

navigator.mediaSession.setCameraActive(cameraActive);

navigator.mediaSession.setActionHandler("togglescreenshare", () => {
  screenshareActive = !screenshareActive;
  navigator.mediaSession.setCameraActive(screenshareActive);
});
```
