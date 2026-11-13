---
title: "MediaStream: addTrack() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/addtrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: addTrack() method

The **`addTrack()`** method of the `MediaStream` interface adds a new track to the
stream. The track is specified as a parameter of type `MediaStreamTrack`.

> **Note:**
> If the specified track is already in the stream's track set, this method has no
> effect.

## Syntax

```js
addTrack(track)
```

### Parameters

- `track`
    A `MediaStreamTrack` to add to the stream.

### Return value

None (`undefined`).

## See also

- `MediaStream`, the interface it belongs to.
