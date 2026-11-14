---
title: "MediaSession: playbackState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasession/playbackstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSession: playbackState property

The **`playbackState`** property of the
`MediaSession` interface indicates whether the current media session is
playing or paused.

## Value

A string indicating the current playback state of the media session.
The value may be one of the following:

- `none`
    The browsing context doesn't currently know the current playback state, or the
    playback state is not available at this time.
- `paused`
    The browser's media session is currently paused. Playback may be resumed.
- `playing`
    The browser's media session is currently playing media, which can be paused.

## Example

The following example sets up two functions for playing and pausing, then uses them as
callbacks with the relevant action handlers. Each function harnesses the
`playbackState` property to indicate whether the audio is playing or paused.

```js
const actionHandlers = [
  // play
  [
    "play",
    async () => {
      // play our audio
      await audioEl.play();
      // set playback state
      navigator.mediaSession.playbackState = "playing";
      // update our status element
      updateStatus(allMeta[index], "Action: play  |  Track is playing…");
    },
  ],
  [
    "pause",
    () => {
      // pause out audio
      audioEl.pause();
      // set playback state
      navigator.mediaSession.playbackState = "paused";
      // update our status element
      updateStatus(allMeta[index], "Action: pause  |  Track has been paused…");
    },
  ],
];

for (const [action, handler] of actionHandlers) {
  try {
    navigator.mediaSession.setActionHandler(action, handler);
  } catch (error) {
    console.log(`The media session action "${action}" is not supported yet.`);
  }
}
```
