---
title: "MediaStreamTrackGenerator: MediaStreamTrackGenerator() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackgenerator/mediastreamtrackgenerator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackGenerator: MediaStreamTrackGenerator() constructor

The **`MediaStreamTrackGenerator()`** constructor creates a new `MediaStreamTrackGenerator` object which consumes a stream of media frames and exposes a `MediaStreamTrack`.

## Syntax

```js
new MediaStreamTrackGenerator(options)
```

### Parameters

- `options` (experimental) (non-standard)
    An object containing the property `kind`, which is one of the following strings:
    - `"audio"`
        Specifies that the stream accepts `AudioTrack` objects.
    - `"video"`
        Specifies that the stream accepts `VideoTrack` objects.

### Exceptions

- `TypeError`
    Thrown if `init.kind` is not `"video"` or `"audio"`.

## Examples

In the following example a new video `MediaStreamTrackGenerator` is created.

```js
const trackGenerator = new MediaStreamTrackGenerator({ kind: "video" });
```

## See also

- Insertable streams for MediaStreamTrack
