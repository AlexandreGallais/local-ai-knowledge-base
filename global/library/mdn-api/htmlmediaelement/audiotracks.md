---
title: "HTMLMediaElement: audioTracks property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/audiotracks/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: audioTracks property

The read-only **`audioTracks`**
property on `HTMLMediaElement` objects returns
an `AudioTrackList` object listing all of the `AudioTrack`
objects representing the media element's audio tracks.

The media element may be
either an `<audio>` element or a `` element.

The returned list is _live_; that is, as tracks are added to and removed from
the media element, the list's contents change dynamically. Once you have a reference to
the list, you can monitor it for changes to detect when new audio tracks are added or
existing ones removed. See AudioTrackList events
to learn more about watching for changes to a media element's track list.

## Value

An `AudioTrackList` object representing the list of audio tracks included
in the media element. The list of tracks can be accessed using array notation, or using
the object's `getTrackById()` method.

Each track is represented by an `AudioTrack` object which provides
information about the track.

## Examples

In this example, all of the audio tracks on a given element are muted.

### HTML

The HTML establishes the element itself.

```html
<video id="video" src="somevideo.mp4"></video>
```

### JavaScript

The JavaScript code handles muting the video element's audio tracks.

```js
const video = document.getElementById("video");

for (const track of video.audioTracks) {
  track.enabled = false;
}
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.audioTracks` property
- `<audio>`, ``
- `AudioTrack`, `AudioTrackList`
