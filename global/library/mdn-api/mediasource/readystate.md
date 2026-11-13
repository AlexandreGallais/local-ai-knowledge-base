---
title: "MediaSource: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: readyState property

The **`readyState`** read-only property of the
`MediaSource` interface returns an enum representing the state of the
current `MediaSource`. The three possible values are:

- `closed`: The source is not currently attached to a media element.
- `open`: The source is attached to a media element and ready to receive
  `SourceBuffer` objects.
- `ended`: The source is attached to a media element but the stream has
  been ended via a call to `MediaSource.endOfStream()`.

## Value

A string.

## Examples

The following snippet is from an example written by Nick Desaulniers (view the full demo live, or download the source for further investigation). The function `getMediaSource()`, which is not defined here, returns a `MediaSource`.

```js
let mediaSource;

if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
  mediaSource = getMediaSource();
  console.log(mediaSource.readyState); // closed
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener("sourceopen", sourceOpen);
} else {
  console.error("Unsupported MIME type or codec: ", mimeCodec);
}

function sourceOpen() {
  console.log(this.readyState); // open
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB(assetURL, (buf) => {
    sourceBuffer.addEventListener("updateend", () => {
      mediaSource.endOfStream();
      video.play();
      console.log(mediaSource.readyState); // ended
    });
    sourceBuffer.appendBuffer(buf);
  });
}
```

## See also

- `SourceBuffer`
- `SourceBufferList`
