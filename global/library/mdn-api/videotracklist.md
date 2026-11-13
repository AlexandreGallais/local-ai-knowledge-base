---
title: "VideoTrackList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotracklist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrackList

The **`VideoTrackList`** interface is used to represent a list of the video tracks contained within a `` element, with each track represented by a separate `VideoTrack` object in the list.

Retrieve an instance of this object with `HTMLMediaElement.videoTracks`. The individual tracks can be accessed using array syntax or functions such as `forEach()` for example.

## Instance properties

_This interface also inherits properties from its parent interface, `EventTarget`._

- `length` (read-only)
    The number of tracks in the list.
- `selectedIndex` (read-only)
    The index of the currently selected track, if any, or `−1` otherwise.

## Instance methods

_This interface also inherits methods from its parent interface, `EventTarget`._

- `getTrackById()`
    Returns the `VideoTrack` found within the `VideoTrackList` whose `id` matches the specified string. If no match is found, `null` is returned.

## Events

- `addtrack`
    Fired when a new video track has been added to the media element.
    Also available via the `onaddtrack` property.
- `change`
    Fired when a video track has been made active or inactive.
    Also available via the `onchange` property.
- `removetrack`
    Fired when a new video track has been removed from the media element.
    Also available via the `onremovetrack` property.

## Usage notes

In addition to being able to obtain direct access to the video tracks present on a media element, `VideoTrackList` lets you set event handlers on the `addtrack` and `removetrack` events, so that you can detect when tracks are added to or removed from the media element's stream.

## Examples

### Getting a media element's video track list

To get a media element's `VideoTrackList`, use its `videoTracks` property.

```js
const videoTracks = document.querySelector("video").videoTracks;
```

### Monitoring track count changes

In this example, we have an app that displays information about the number of channels available. To keep it up to date, handlers for the `addtrack` and `removetrack` events are set up.

```js
videoTracks.onaddtrack = updateTrackCount;
videoTracks.onremovetrack = updateTrackCount;

function updateTrackCount(event) {
  trackCount = videoTracks.length;
  drawTrackCountIndicator(trackCount);
}
```
