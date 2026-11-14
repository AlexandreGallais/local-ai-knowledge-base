---
title: "MediaSource: duration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/duration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: duration property

The **`duration`** property of the `MediaSource`
interface gets and sets the duration of the current media being presented.

## Value

A double. A value in seconds is expected.

### Exceptions

The following exceptions may be thrown when setting a new value for this property.

- `InvalidAccessError` `DOMException`
    Thrown if an attempt was made to set a duration value that was negative or `NaN`.
- `InvalidStateError` `DOMException`
    Thrown if `MediaSource.readyState` is not equal to
    `open`, or one or more of the
    `SourceBuffer` objects in
    `MediaSource.sourceBuffers` are being updated
    (i.e., their `SourceBuffer.updating` property is
    `true`.)

## Examples

The following snippet is based on an example written by Nick Desaulniers (view the full demo live, or download the source for further investigation). The function `getMediaSource()`, which is not defined here, returns a `MediaSource`.

```js
const mediaSource = getMediaSource();

function sourceOpen() {
  console.log(this.readyState); // open
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB(assetURL, (buf) => {
    sourceBuffer.addEventListener("updateend", () => {
      mediaSource.endOfStream();
      mediaSource.duration = 120;
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
