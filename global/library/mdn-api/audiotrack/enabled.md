---
title: "AudioTrack: enabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiotrack/enabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioTrack: enabled property

The **`AudioTrack`** property
**`enabled`** specifies whether or not the described audio
track is currently enabled for use. If the track is disabled by setting
`enabled` to `false`, the track is muted and does not produce
audio.

## Value

The `enabled` property is a Boolean whose value is `true` if the
track is enabled; enabled tracks produce audio while the media is playing. Setting
`enabled` to `false` effectively mutes the audio track, preventing
it from contributing to the media's audio performance.

## Example

This example switches between the main and commentary audio tracks of a media element.

```js
function swapCommentaryMain() {
  const videoElem = document.getElementById("main-video");
  let audioTrackMain;
  let audioTrackCommentary;

  videoElem.audioTracks.forEach((track) => {
    if (track.kind === "main") {
      audioTrackMain = track;
    } else if (track.kind === "commentary") {
      audioTrackCommentary = track;
    }
  });

  if (audioTrackMain && audioTrackCommentary) {
    const commentaryEnabled = audioTrackCommentary.enabled;
    audioTrackCommentary.enabled = audioTrackMain.enabled;
    audioTrackMain.enabled = commentaryEnabled;
  }
}
```

The `swapCommentaryMain()` function above finds within the audio tracks of
the `` element `"main-video"` the audio tracks whose
`kind` values are `"main"` and
`"commentary"`. These represent the primary audio track and the commentary
track.

> **Note:**
> This example assumes that there is only one of each kind of
> track in the video, but this is not necessarily the case.

The element's audio tracks are then scanned through using the JavaScript
`forEach()` method (although the
`audioTracks` property of a media element
isn't actually a JavaScript array, it can be accessed like one for the most part).

The scan looks for the tracks whose `kind` values are
`"main"` and `"commentary"` and remembers those
`AudioTrack` objects. Once those have been found, the values of the two
tracks' `enabled` properties are exchanged, which results in swapping which
of the two tracks is currently active.
