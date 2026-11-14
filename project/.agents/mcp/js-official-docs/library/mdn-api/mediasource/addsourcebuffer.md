---
title: "MediaSource: addSourceBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/addsourcebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: addSourceBuffer() method

The **`addSourceBuffer()`** method of the
`MediaSource` interface creates a new `SourceBuffer` of the
given MIME type and adds it to the `MediaSource`'s
`sourceBuffers` list. The new
`SourceBuffer` is also returned.

## Syntax

```js
addSourceBuffer(mimeType)
```

### Parameters

- `mimeType`
    A string specifying the MIME type of the
    `SourceBuffer` to create and add to the `MediaSource`.

### Return value

A `SourceBuffer` object representing the new source buffer that has been
created and added to the media source.

### Exceptions

- `InvalidAccessError` `DOMException`
    Thrown if the value specified for `mimeType` is an empty string rather than a valid
    MIME type.
- `InvalidStateError` `DOMException`
    Thrown if the `MediaSource` is not in the `"open"`
    `readyState`.
- `NotSupportedError` `DOMException`
    Thrown if the specified `mimeType` isn't supported by the user agent, or is not compatible with the MIME types of other `SourceBuffer` objects that are already included in the media source's `sourceBuffers` list.
- `QuotaExceededError`
    Thrown if the user agent can't handle any more `SourceBuffer` objects, or creating
    a new `SourceBuffer` using the given `mimeType` would result in
    an unsupported configuration of `SourceBuffer`s.

## Examples

The following snippet is from an example written by Nick Desaulniers (view the full demo live, or download the source for further investigation). The function `getMediaSource()`, which is not defined here, returns a `MediaSource`.

```js
const assetURL = "frag_bunny.mp4";
// Need to be specific for Blink regarding codecs
// ./mp4info frag_bunny.mp4 | grep Codec
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
const mediaSource = getMediaSource();

if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
  console.log(mediaSource.readyState); // closed
  mediaSource.addEventListener("sourceopen", sourceOpen);
  video.src = URL.createObjectURL(mediaSource);
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
