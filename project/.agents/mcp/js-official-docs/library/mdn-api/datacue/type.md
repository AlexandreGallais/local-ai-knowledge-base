---
title: "DataCue: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datacue/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataCue: type property

The **`type`** read-only property of the `DataCue` interface returns a string identifying the type or schema of the data stored in the cue's `value` property. This is typically a reverse-domain notation string (e.g., `"org.id3"`, `"com.apple.itunes"`) that allows applications to interpret the cue's data payload correctly.

When a user agent automatically generates `DataCue` objects for in-band timed metadata (for example, from an HTTP Live Streaming source), it sets this property to indicate the metadata format. When application code creates a `DataCue` using the `DataCue()` constructor, the `type` is set from the optional fourth argument and defaults to an empty string if omitted.

## Value

A string. Common values set by user agents for in-band metadata include:

- `"org.id3"` — ID3 metadata.
- `"org.mp4ra"` — MPEG-4 metadata.
- `"com.apple.quicktime.udta"` — QuickTime User Data.
- `"com.apple.quicktime.mdta"` — QuickTime Metadata.
- `"com.apple.itunes"` — iTunes metadata.

Application-defined cues may use any string, but reverse-domain notation is recommended to avoid collisions.

## Examples

### Reading the type of a DataCue

```html
<video controls src="video.mp4"></video>
```

```js
const video = document.querySelector("video");
const track = video.addTextTrack("metadata", "Events");
track.mode = "hidden";

const cue = new DataCue(
  0,
  10,
  { latitude: 51.5043, longitude: -0.0762 },
  "org.example.geo",
);
track.addCue(cue);

console.log(cue.type);
// "org.example.geo"
```

### Dispatching on type for in-band metadata

When a user agent generates `DataCue` objects from in-band timed metadata, the `type` property can be used to determine how to handle each cue.

```js
track.addEventListener("cuechange", () => {
  for (const cue of track.activeCues) {
    switch (cue.type) {
      case "org.id3":
        handleID3Metadata(cue.value);
        break;
      case "org.mp4ra":
        handleMP4Metadata(cue.value);
        break;
      default:
        console.log(`Unknown cue type: ${cue.type}`);
    }
  }
});
```

## See also

- `DataCue`
- `DataCue.value`
- `DataCue()` constructor
- `TextTrackCue`
