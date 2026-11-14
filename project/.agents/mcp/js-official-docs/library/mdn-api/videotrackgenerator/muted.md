---
title: "VideoTrackGenerator: muted property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotrackgenerator/muted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrackGenerator: muted property

The **`muted`** Boolean property of the `VideoTrackGenerator` interface can be used to temporarily halt or resume the generation of video frames in the output track.

## Value

A boolean.

## Examples

To pause production of video frames:

```js
videoTrackGenerator.muted = true;
```

To resume production of video frames:

```js
videoTrackGenerator.muted = false;
```
