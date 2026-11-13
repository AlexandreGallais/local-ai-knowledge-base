---
title: "DataCue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datacue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataCue

The **`DataCue`** interface represents a cue that associates arbitrary timed data with an audio or video media resource, or exposes timed data from a media resource to web pages. It extends the `TextTrackCue` interface with a `value` property that can hold any data type, and a `type` property that identifies the kind of data.

Unlike `VTTCue`, which is designed for displaying subtitle and caption text, `DataCue` is intended for non-rendered timed metadata. Use cases include dynamic content replacement, ad insertion, presentation of supplemental content alongside audio or video, or more generally, triggering application logic at specific points on the media timeline.

Some user agents may also automatically generate `DataCue` objects for in-band timed metadata carried within media streams, such as ID3 tags in HTTP Live Streaming (HLS).

## Constructor

- `DataCue()` (experimental)
    Creates a new `DataCue` object.

## Instance properties

_This interface also inherits properties from `TextTrackCue`._

- `DataCue.type` (read-only) (experimental)
    A string identifying the type of the cue's `value`, typically using reverse-domain notation (e.g., `"org.mp4ra"`, `"org.id3"`).
- `DataCue.value` (experimental)
    The data payload associated with the cue. Can be any type.

## Instance methods

_This interface has no methods of its own but inherits methods from `TextTrackCue`._

## Examples

### Associating timed metadata with a video

The following example creates a metadata `TextTrack` on a video element and adds `DataCue` objects containing geolocation coordinates. When each cue becomes active during playback, its `enter` event fires, allowing the page to react — for example, by updating a map view.

```html
<video controls src="video.mp4"></video>
```

```js
const video = document.querySelector("video");
const track = video.addTextTrack("metadata", "Geo Track");
track.mode = "hidden";

const points = [
  { start: 0, end: 10, data: { latitude: 51.5043, longitude: -0.0762 } },
  { start: 10, end: 20, data: { latitude: 48.8566, longitude: 2.3522 } },
  { start: 20, end: 30, data: { latitude: 40.4168, longitude: -3.7038 } },
];

for (const point of points) {
  const cue = new DataCue(
    point.start,
    point.end,
    point.data,
    "org.example.geo",
  );
  cue.addEventListener("enter", (e) => {
    const { latitude, longitude } = e.target.value;
    console.log(`Map pan to: ${latitude}, ${longitude}`);
  });
  track.addCue(cue);
}

// At 0s: "Map pan to: 51.5043, -0.0762"
// At 10s: "Map pan to: 48.8566, 2.3522"
// At 20s: "Map pan to: 40.4168, -3.7038"
```

## See also

- `TextTrackCue`
- `VTTCue`
- `TextTrack`
- `enter` event
- `exit` event
