---
title: "MediaSource: activeSourceBuffers property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/activesourcebuffers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: activeSourceBuffers property

The **`activeSourceBuffers`** read-only property of the
`MediaSource` interface returns a `SourceBufferList` object
containing a subset of the `SourceBuffer` objects contained within
`sourceBuffers` — the list of objects
providing the selected video track, enabled audio tracks, and shown/hidden text tracks.

## Value

A `SourceBufferList` containing the `SourceBuffer` objects
for each of the active tracks.

## Examples

The following snippet is based on an example written by Nick Desaulniers (view the full demo live, or download the source for further investigation). The function `getMediaSource()`, which is not defined here, returns a `MediaSource`.

```js
const mediaSource = getMediaSource();

function sourceOpen() {
  console.log(mediaSource.readyState); // open
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB(assetURL, (buf) => {
    sourceBuffer.addEventListener("updateend", () => {
      mediaSource.endOfStream();
      console.log(mediaSource.activeSourceBuffers);
      // will contain the source buffer that was added above,
      // as it is selected for playing in the video player
      video.play();
      console.log(mediaSource.readyState); // ended
    });
    sourceBuffer.appendBuffer(buf);
  });
}

// …
```

## See also

- `SourceBuffer`
- `SourceBufferList`
