---
title: "HTMLMediaElement: textTracks property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/texttracks/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: textTracks property

The read-only **`textTracks`**
property on `HTMLMediaElement` objects returns a
`TextTrackList` object listing all of the `TextTrack`
objects representing the media element's text tracks, in the same order as in
the list of text tracks.

You can detect when tracks are added to and removed from an
`<audio>` or
`` element
using the `addtrack` and `removetrack` events. However, these
events aren't sent directly to the media element itself. Instead, they're sent to the
track list object of the `HTMLMediaElement`
that corresponds to the type of track that was added to the element

The returned list is _live_; that is, as tracks are added to and removed from
the media element, the list's contents change dynamically. Once you have a reference to
the list, you can monitor it for changes to detect when new text tracks are added or
existing ones removed.

See TextTrackList events to learn
more about watching for changes to a media element's track list.

## Value

A `TextTrackList` object representing the list of text tracks included in the media element. The list of tracks can be accessed using `textTracks[n]` to get the n-th text track from the object's list of text tracks, or using the `textTracks.getTrackById()`
method.

Each track is represented by a `TextTrack` object which provides
information about the track.

## Examples

We start with a
`` that has
several `<track>`
children

```html
<video controls>
  <source src="/shared-assets/videos/sintel-short.webm" type="video/webm" />
  <source src="/shared-assets/videos/sintel-short.mp4" type="video/mp4" />
  <track
    kind="subtitles"
    src="/shared-assets/misc/sintel-en.vtt"
    srclang="en"
    label="English" />
  <track
    kind="subtitles"
    src="/shared-assets/misc/sintel-de.vtt"
    srclang="de"
    label="Deutsch" />
  <track
    kind="subtitles"
    src="/shared-assets/misc/sintel-es.vtt"
    srclang="es"
    label="Español" />
</video>
```

The `HTMLMediaElement.textTracks` returns a `TextTrackList` through which we can iterate. Here we set all three tracks to show simultaneously.

```js
const tracks = document.querySelector("video").textTracks;

for (const track of tracks) {
  track.mode = "showing";
}
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.textTracks` property
- `<audio>`, ``
- `AudioTrack`, `AudioTrackList`
- `VideoTrack`, `VideoTrackList`
- `addtrack`,
  `change`,
  `removetrack`: AudioTrackList events
- `addtrack`,
  `change`,
  `removetrack`: VideoTrackList events
