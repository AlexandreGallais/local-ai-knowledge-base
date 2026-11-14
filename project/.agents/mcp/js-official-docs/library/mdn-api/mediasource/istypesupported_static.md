---
title: "MediaSource: isTypeSupported() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/istypesupported_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: isTypeSupported() static method

The **`MediaSource.isTypeSupported()`** static method returns a boolean value which is `true` if the given MIME type and (optional) codec are _likely_ to be supported by the current user agent.

That is, if it can successfully create `SourceBuffer` objects for that media type.
If the returned value is `false`, then the user agent is certain that it _cannot_ access media of the specified format.

## Syntax

```js
MediaSource.isTypeSupported(type)
```

### Parameters

- `type`
    A string specifying the MIME type of the media and (optionally) a `codecs` parameter containing a comma-separated list of the supported codecs.

### Return value

A value of `false` if the media of the given type will _not_ play.

A value of `true` is returned if the browser can _probably_ play media of the specified type.
This is _not_ a guarantee, and your code must be prepared for the possibility that the media will not play correctly if at all.

All web APIs that work with media files use a "no/maybe/probably" approach (or, in this case, "no or probably") when determining if a media type can be used.
This is because media files are complex, intricate constructs with far too many subtle variations to be absolutely certain of anything until you actually use the contents of the media.

## Examples

The following snippet is from an example written by Nick Desaulniers (view the full demo live, or download the source for further investigation). The function `getMediaSource()`, which is not defined here, returns a `MediaSource`.

```js
const assetURL = "frag_bunny.mp4";
// Need to be specific for Blink regarding codecs
// ./mp4info frag_bunny.mp4 | grep Codec
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
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

- Media Source Extensions API
- Guide to media types and formats on the web
- Codecs in common media types
- `SourceBuffer`
- `SourceBufferList`
