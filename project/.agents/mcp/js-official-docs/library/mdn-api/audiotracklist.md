---
title: "AudioTrackList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiotracklist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioTrackList

The **`AudioTrackList`** interface is used to represent a list of the audio tracks contained within a given HTML media element, with each track represented by a separate `AudioTrack` object in the list.

Retrieve an instance of this object with `HTMLMediaElement.audioTracks`. The individual tracks can be accessed using array syntax.

## Instance properties

_This interface also inherits properties from its parent interface, `EventTarget`._

- `length` (read-only)
    The number of tracks in the list.

## Instance methods

_This interface also inherits methods from its parent interface, `EventTarget`._

- `getTrackById()`
    Returns the `AudioTrack` found within the `AudioTrackList` whose `id` matches the specified string. If no match is found, `null` is returned.

## Events

- `addtrack`
    Fired when a new audio track has been added to the media element.
- `change`
    Fired when a track has been enabled or disabled.
- `removetrack`
    Fired when a new audio track has been removed from the media element.

## Usage notes

In addition to being able to obtain direct access to the audio tracks present on a media element, `AudioTrackList` lets you set event handlers on the `addtrack` and `removetrack` events, so that you can detect when tracks are added to or removed from the media element's stream. See the `addtrack` and `removetrack` events for details and examples.

## Examples

### Getting a media element's audio track list

To get a media element's `AudioTrackList`, use its `audioTracks` property.

```js
const audioTracks = document.querySelector("video").audioTracks;
```

### Monitoring track count changes

In this example, we have an app that displays information about the number of channels available. To keep it up to date, handlers for the `addtrack` and `removetrack` events are set up.

```js
audioTracks.onaddtrack = updateTrackCount;
audioTracks.onremovetrack = updateTrackCount;

function updateTrackCount(event) {
  trackCount = audioTracks.length;
  drawTrackCountIndicator(trackCount);
}
```
