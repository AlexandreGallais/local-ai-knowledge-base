---
title: "MediaStream: MediaStream() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/mediastream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: MediaStream() constructor

The **`MediaStream()`** constructor returns a newly-created `MediaStream`, which serves as a collection of media tracks, each represented by a `MediaStreamTrack` object.

If any parameters are given, the specified tracks are added to the new stream.
Otherwise, the stream has no tracks.

## Syntax

```js
new MediaStream()
new MediaStream(stream)
new MediaStream(tracks)
```

### Parameters

- `stream` (optional)
    A different `MediaStream` object whose tracks are added to the
    newly-created stream automatically. The tracks are not removed from the original
    stream, so they're shared by the two streams.
- `tracks` (optional)
    An `Array` of `MediaStreamTrack` objects, one for each
    track to add to the stream.

### Return value

A newly-created `MediaStream` object, either empty, or containing the
tracks provided, if any.

## See also

- `MediaStream`
