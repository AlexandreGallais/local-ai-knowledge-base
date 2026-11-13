---
title: "MediaSource: MediaSource() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/mediasource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: MediaSource() constructor

The **`MediaSource()`** constructor of the
`MediaSource` interface constructs and returns a new
`MediaSource` object with no associated source buffers.

## Syntax

```js
new MediaSource()
```

### Parameters

None.

## Examples

The following snippet is taken from an example written by Nick Desaulniers (view the full demo live, or download the source for further investigation).

```js
const video = document.querySelector("video");

const assetURL = "frag_bunny.mp4";
// Need to be specific for Blink regarding codecs
// ./mp4info frag_bunny.mp4 | grep Codec
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
  const mediaSource = new MediaSource();
  // console.log(mediaSource.readyState); // closed
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener("sourceopen", sourceOpen);
} else {
  console.error("Unsupported MIME type or codec: ", mimeCodec);
}

// …
```

## See also

- `SourceBuffer`
- `SourceBufferList`
