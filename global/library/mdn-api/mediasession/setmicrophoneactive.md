---
title: "MediaSession: setMicrophoneActive() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasession/setmicrophoneactive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSession: setMicrophoneActive() method

The **`setMicrophoneActive()`** method of the `MediaSession` interface is used to indicate to the user agent whether the user's microphone is considered to be currently muted.

Call this method on the `navigator` object's
`mediaSession` object.

Note that the status of the microphone is not tracked in the `MediaSession` itself, but must be tracked separately.

## Syntax

```js
setMicrophoneActive(active)
```

### Parameters

- `active`
    A boolean indicating whether the microphone is considered muted or not.

### Return value

None (`undefined`).

## Examples

Below is an example of updating the microphone mute state of the current
`MediaSession`, as well as listening to requests to change the mute status with `setActionHandler()`.

```js
let microphoneActive = false;

navigator.mediaSession.setMicrophoneActive(microphoneActive);

navigator.mediaSession.setActionHandler("togglemicrophone", () => {
  microphoneActive = !microphoneActive;
  navigator.mediaSession.setMicrophoneActive(microphoneActive);
});
```
