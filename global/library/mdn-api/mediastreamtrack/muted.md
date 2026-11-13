---
title: "MediaStreamTrack: muted property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrack/muted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrack: muted property

The **`muted`** read-only property of the
`MediaStreamTrack` interface returns a boolean value
indicating whether or not the track is currently unable to provide media output.

> **Note:**
> To implement a way for users to mute and unmute a track, use the
> `enabled` property. When a track is disabled
> by setting `enabled` to `false`, it generates only empty frames
> (audio frames in which every sample is 0, or video frames in which every pixel is
> black).

## Value

A boolean which is `true` if the track is currently muted, or
`false` if the track is currently unmuted.

> **Note:**
> When possible, avoid polling `muted` to monitor the track's muting status.
> Instead, add event listeners for the `mute` and `unmute` events.

## Examples

This example counts the number of tracks in an array of `MediaStreamTrack`
objects which are currently muted.

```js
let mutedCount = 0;

trackList.forEach((track) => {
  if (track.muted) {
    mutedCount += 1;
  }
});
```
