---
title: "MediaSession: setPositionState() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasession/setpositionstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSession: setPositionState() method

The **`setPositionState()`** method of the
`MediaSession` interface is used to update the current
document's media playback position and speed for presentation by user's device in any
kind of interface that provides details about ongoing media. This can be
particularly useful if your code implements a player for type of media not directly
supported by the browser.

Call this method on the `navigator` object's
`mediaSession` object.

## Syntax

```js
setPositionState()
setPositionState(stateDict)
```

### Parameters

- `stateDict` (optional)
    An object providing updated information about the playback position and speed
    of the document's ongoing media. If the object is empty, the existing playback
    state information is cleared. This object can contain the following
    parameters:
    - `duration` (optional)
        A floating-point value giving the total duration of the current media in seconds. This should always be a positive number, with positive infinity (`Infinity`) indicating media without a defined end, such as a live stream.
    - `playbackRate` (optional)
        A floating-point value indicating the rate at which the media is being played, as a ratio relative to its normal playback speed. Thus, a value of 1 is playing at normal speed, 2 is playing at double speed, and so forth. Negative values indicate that the media is playing in reverse; -1 indicates playback at the normal speed but backward, -2 is double speed in reverse, and so on.
    - `position` (optional)
        A floating-point value indicating the last reported playback position of the media in seconds. This must always be a positive value.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    This error can occur in an array of circumstances:
    - The specified object's `duration` is missing, negative, or `null`.
    - Its `position` is either negative or greater than `duration`.
    - Its `playbackRate` is zero.

## Examples

Below is a function which updates the position state of the current
`MediaSession` track.

```js
function updatePositionState() {
  navigator.mediaSession.setPositionState({
    duration: audioEl.duration,
    playbackRate: audioEl.playbackRate,
    position: audioEl.currentTime,
  });
}
```

We can use this function when updating `MediaMetadata` and within callbacks for actions, such as below.

```js
navigator.mediaSession.setActionHandler("seekbackward", (details) => {
  // our time to skip
  const skipTime = details.seekOffset || 10;

  // set our position
  audioEl.currentTime = Math.max(audioEl.currentTime - skipTime, 0);
  updatePositionState();
});
```
