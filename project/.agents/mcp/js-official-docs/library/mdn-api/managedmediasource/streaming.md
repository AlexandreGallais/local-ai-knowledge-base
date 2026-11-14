---
title: "ManagedMediaSource: streaming property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/managedmediasource/streaming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ManagedMediaSource: streaming property

The **`streaming`** read-only property of the `ManagedMediaSource` interface is a boolean indicating whether the application should actively fetch and append media data.

The value of this property is updated by the user agent's monitoring algorithm. When it changes, the corresponding `startstreaming` or `endstreaming` event is fired.

## Value

A boolean, initially `false`. When `true`, the user agent needs more data to ensure uninterrupted playback. When `false`, the user agent has enough data buffered and the application can stop fetching new segments.

## Examples

### Checking the streaming state

This example creates a `ManagedMediaSource`, attaches it to a `` element, and logs the value of `streaming` whenever it changes between `true` and `false`.

```js
const mediaType = 'video/mp4; codecs="avc1.64001F, mp4a.40.2"';

if (ManagedMediaSource.isTypeSupported(mediaType)) {
  const video = document.createElement("video");
  const source = new ManagedMediaSource();

  video.controls = true;
  video.disableRemotePlayback = true;
  video.src = URL.createObjectURL(source);
  document.body.appendChild(video);

  console.log(source.streaming); // false

  source.addEventListener("startstreaming", () => {
    console.log(source.streaming); // true — start fetching data
  });

  source.addEventListener("endstreaming", () => {
    console.log(source.streaming); // false — stop fetching data
  });

  source.addEventListener("sourceopen", () => {
    source.addSourceBuffer(mediaType);
  });
}
```

## See also

- `startstreaming` event
- `endstreaming` event
- `ManagedMediaSource`
- `MediaSource`
