---
title: "AudioTrack"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiotrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioTrack

The **`AudioTrack`** interface represents a single audio track from one of the HTML media elements, `<audio>` or ``.

The most common use for accessing an `AudioTrack` object is to toggle its `enabled` property in order to mute and unmute the track.

## Instance properties

- `enabled`
    A Boolean value which controls whether or not the audio track's sound is enabled. Setting this value to `false` mutes the track's audio.
- `id` (read-only)
    A string which uniquely identifies the track within the media. This ID can be used to locate a specific track within an audio track list by calling `AudioTrackList.getTrackById()`. The ID can also be used as the fragment part of the URL if the media supports seeking by media fragment per the Media Fragments URI specification.
- `kind` (read-only)
    A string specifying the category into which the track falls. For example, the main audio track would have a `kind` of `"main"`.
- `label` (read-only)
    A string providing a human-readable label for the track. For example, an audio commentary track for a movie might have a `label` of `"Commentary with director Christopher Nolan and actors Leonardo DiCaprio and Elliot Page."` This string is empty if no label is provided.
- `language` (read-only)
    A string specifying the audio track's primary language, or an empty string if unknown. The language is specified as a BCP 47 language tag, such as `"en-US"` or `"pt-BR"`.
- `sourceBuffer` (read-only)
    The `SourceBuffer` that created the track. Returns null if the track was not created by a `SourceBuffer` or the `SourceBuffer` has been removed from the `MediaSource.sourceBuffers` attribute of its parent media source.

## Usage notes

To get an `AudioTrack` for a given media element, use the element's `audioTracks` property, which returns an `AudioTrackList` object from which you can get the individual tracks contained in the media:

```js
const el = document.querySelector("video");
const tracks = el.audioTracks;
```

You can then access the media's individual tracks using either array syntax or functions such as `forEach()`.

This first example gets the first audio track on the media:

```js
const firstTrack = tracks[0];
```

The next example scans through all of the media's audio tracks, enabling any that are in the user's preferred language (taken from a variable `userLanguage`) and disabling any others.

```js
tracks.forEach((track) => {
  track.enabled = track.language === userLanguage;
});
```

The `language` is specified as a valid BCP 47 language tag, for example `"en-US"` for US English.

## Example

See `AudioTrack.label` for an example that shows how to get an array of track kinds and labels for a specified media element, filtered by kind.
