---
title: "ManagedMediaSource: ManagedMediaSource() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/managedmediasource/managedmediasource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ManagedMediaSource: ManagedMediaSource() constructor

The **`ManagedMediaSource()`** constructor of the `ManagedMediaSource` interface constructs and returns a new `ManagedMediaSource` object instance with no associated source buffers.

## Syntax

```js
new ManagedMediaSource()
```

### Parameters

None.

### Return value

A new `ManagedMediaSource` object instance.

## Examples

### Creating a ManagedMediaSource and attaching it to a video element

The following example creates a new `ManagedMediaSource`, attaches it to a `` element, and uses the `startstreaming` event to begin fetching media data.

```js
const videoUrl =
  "https://mdn.github.io/shared-assets/videos/flower-fragmented.mp4";
const mediaType = 'video/mp4; codecs="avc1.64001F, mp4a.40.2"';

if (ManagedMediaSource.isTypeSupported(mediaType)) {
  const source = new ManagedMediaSource();
  const video = document.createElement("video");

  video.controls = true;
  video.disableRemotePlayback = true;
  video.src = URL.createObjectURL(source);
  document.body.appendChild(video);

  source.addEventListener("sourceopen", () => {
    const sourceBuffer = source.addSourceBuffer(mediaType);

    source.addEventListener("startstreaming", async () => {
      console.log("startstreaming — fetching media data");
      const response = await fetch(videoUrl);
      const data = await response.arrayBuffer();
      sourceBuffer.appendBuffer(data);
    });
  });
}
```

## See also

- `ManagedMediaSource`
- `ManagedSourceBuffer`
- `MediaSource()`
