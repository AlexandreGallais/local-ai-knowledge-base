---
title: "VideoTrack"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrack

The **`VideoTrack`** interface represents a single video track from a `` element.

The most common use for accessing a `VideoTrack` object is to toggle its `selected` property in order to make it the active video track for its `` element.

## Instance properties

- `selected`
    A Boolean value which controls whether or not the video track is active. Only a single video track can be active at any given time, so setting this property to `true` for one track while another track is active will make that other track inactive.
- `id` (read-only)
    A string which uniquely identifies the track within the media. This ID can be used to locate a specific track within a video track list by calling `VideoTrackList.getTrackById()`. The ID can also be used as the fragment part of the URL if the media supports seeking by media fragment per the Media Fragments URI specification.
- `kind` (read-only)
    A string specifying the category into which the track falls. For example, the main video track would have a `kind` of `"main"`.
- `label` (read-only)
    A string providing a human-readable label for the track. For example, a track whose `kind` is `"sign"` might have a `label` of `"A sign-language interpretation"`. This string is empty if no label is provided.
- `language` (read-only)
    A string specifying the video track's primary language, or an empty string if unknown. The language is specified as a BCP 47 language tag such as `"en-US"` or `"pt-BR"`.
- `sourceBuffer` (read-only)
    The `SourceBuffer` that created the track. Returns null if the track was not created by a `SourceBuffer` or the `SourceBuffer` has been removed from the `MediaSource.sourceBuffers` attribute of its parent media source.

## Usage notes

To get a `VideoTrack` for a given media element, use the element's `videoTracks` property, which returns a `VideoTrackList` object from which you can get the individual tracks contained in the media:

```js
const el = document.querySelector("video");
const tracks = el.videoTracks;
```

You can then access the media's individual tracks using either array syntax or functions such as `forEach()`.

This first example gets the first video track on the media:

```js
const firstTrack = tracks[0];
```

The next example scans through all of the media's video tracks, activating the first video track that is in the user's preferred language (taken from a variable `userLanguage`).

```js
for (const track of tracks) {
  if (track.language === userLanguage) {
    track.selected = true;
    break;
  }
}
```

The `language` is specified as a valid BCP 47 language tag, for example `"en-US"` for US English.
