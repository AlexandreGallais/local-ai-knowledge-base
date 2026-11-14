---
title: "MediaSession: setCameraActive() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasession/setcameraactive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSession: setCameraActive() method

The **`setCameraActive()`** method of the `MediaSession` interface is used to indicate to the user agent whether the user's camera is considered to be active.

Call this method on the `navigator` object's
`mediaSession` object.

Note that the status of the camera is not tracked in the `MediaSession` itself, but must be tracked separately.

## Syntax

```js
setCameraActive(active)
```

### Parameters

- `active`
    A boolean indicating whether the camera is considered active or not.

### Return value

None (`undefined`).

## Examples

Below is an example of updating the camera active state of the current
`MediaSession`, as well as listening to requests to change the camera status with `setActionHandler()`.

```js
let cameraActive = false;

navigator.mediaSession.setCameraActive(cameraActive);

navigator.mediaSession.setActionHandler("togglecamera", () => {
  cameraActive = !cameraActive;
  navigator.mediaSession.setCameraActive(cameraActive);
});
```
