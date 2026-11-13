---
title: "TextTrackList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttracklist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackList

The **`TextTrackList`** interface is used to represent a list of the text tracks defined for the associated video or audio element, with each track represented by a separate `TextTrack` object in the list.

Text tracks can be added to a media element declaratively using the `<track>` element or programmatically using the `HTMLMediaElement.addTextTrack()` method.

An instance of this object can be retrieved using the `textTracks` property of an `HTMLMediaElement` object.

For a given `HTMLMediaElement` object _media_, the individual tracks can be accessed using:

- `media.TextTracks[n]`, to get the n-th text track from the object's list of text tracks
- the `media.textTracks.getTrackById()` method

## Instance properties

_This interface also inherits properties from its parent interface, `EventTarget`._

- `length` (read-only)
    The number of tracks in the list.

## Instance methods

_This interface also inherits methods from its parent interface, `EventTarget`._

- `getTrackById()`
    Returns the `TextTrack` found within the `TextTrackList` whose `id` matches the specified string. If no match is found, `null` is returned.

## Events

- `addtrack`
    Fired when a new text track has been added to the media element.
    Also available via the `onaddtrack` property.
- `change`
    Fired when a text track has been made active or inactive.
    Also available via the `onchange` property.
- `removetrack`
    Fired when a new text track has been removed from the media element.
    Also available via the `onremovetrack` property.

## Usage notes

In addition to being able to obtain direct access to the text tracks present on a media element, `TextTrackList` lets you set event handlers on the `addtrack` and `removetrack` events, so that you can detect when tracks are added to or removed from the media element's stream.

## Examples

### Getting a video element's text track list

To get a media element's `TextTrackList`, use its `textTracks` property.

```js
const textTracks = document.querySelector("video").textTracks;
```

### Monitoring track count changes

In this example, we have an app that displays information about the number of channels available. To keep it up to date, handlers for the `addtrack` and `removetrack` events are set up.

```js
textTracks.onaddtrack = updateTrackCount;
textTracks.onremovetrack = updateTrackCount;

function updateTrackCount(event) {
  trackCount = textTracks.length;
  drawTrackCountIndicator(trackCount);
}
```
