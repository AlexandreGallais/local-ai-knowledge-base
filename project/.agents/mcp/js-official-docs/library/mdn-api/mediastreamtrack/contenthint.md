---
title: "MediaStreamTrack: contentHint property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrack/contenthint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrack: contentHint property

The **`contentHint`** property of the `MediaStreamTrack` interface is a string that hints at the type of content the track contains. Allowable values depend on the value of the `MediaStreamTrack.kind` property.

## Value

A string with one of the following values:

- `""`
    No `contentHint` has been set.
- `"speech"`
    The track should be treated as if it contains speech data. When setting this value, the value of `MediaStreamTrack.kind` must be `"audio"`.
- `"speech-recognition"`
    The track should be treated as if it contains data for the purpose of speech recognition by a machine. When setting this value, the value of `MediaStreamTrack.kind` must be `"audio"`.
- `"music"`
    The track should be treated as if it contains music. When setting this value, the value of `MediaStreamTrack.kind` must be `"audio"`.
- `"motion"`
    The track should be treated as if it contains video where motion is important. For example, webcam video, movies or video games. When setting this value, the value of `MediaStreamTrack.kind` must be `"video"`.
- `"detail"`
    The track should be treated as if video details are extra important. For example, presentations or web pages with text content, painting or line art. When setting this value, the value of `MediaStreamTrack.kind` must be `"video"`.
- `"text"`
    The track should be treated as if video details are extra important, and that significant sharp edges and areas of consistent color can occur frequently. For example, presentations or web pages with text content. When setting this value, the value of `MediaStreamTrack.kind` must be `"video"`.

## Examples

### A function that sets the contentHint

This function takes a stream and a `contentHint` value, and applies the hint to each track. See the full example here, showing how different `contentHint` values change how the tracks display.

```js
function setVideoTrackContentHints(stream, hint) {
  const tracks = stream.getVideoTracks();
  tracks.forEach((track) => {
    if ("contentHint" in track) {
      track.contentHint = hint;
      if (track.contentHint !== hint) {
        console.error(`Invalid video track contentHint: "${hint}"`);
      }
    } else {
      console.error("MediaStreamTrack contentHint attribute not supported");
    }
  });
}
```
