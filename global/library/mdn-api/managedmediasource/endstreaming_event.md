---
title: "ManagedMediaSource: endstreaming event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/managedmediasource/endstreaming_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ManagedMediaSource: endstreaming event

The **`endstreaming`** event of the `ManagedMediaSource` interface is fired when the `streaming` property changes from `true` to `false`. This indicates that the user agent has enough data buffered to ensure uninterrupted playback, and the application can stop fetching new media segments.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("endstreaming", (event) => {});
```

Alternatively, assign to the event handler property of the interface:

```js
onendstreaming = (event) => {};
```

## Event type

A generic `Event`.

## Examples

### Pausing fetches in response to endstreaming

This example creates a `ManagedMediaSource`, attaches it to a `` element, and uses the `startstreaming` and `endstreaming` events to control when media segments are fetched.

```js
const videoUrl =
  "https://mdn.github.io/shared-assets/videos/flower-fragmented.mp4";
const mediaType = 'video/mp4; codecs="avc1.64001F, mp4a.40.2"';

if (ManagedMediaSource.isTypeSupported(mediaType)) {
  const video = document.createElement("video");
  const source = new ManagedMediaSource();

  video.controls = true;
  video.disableRemotePlayback = true;
  video.src = URL.createObjectURL(source);
  document.body.appendChild(video);

  let shouldFetch = false;

  source.addEventListener("sourceopen", () => {
    const sourceBuffer = source.addSourceBuffer(mediaType);

    source.addEventListener("startstreaming", async () => {
      console.log("startstreaming — fetching media data");
      shouldFetch = true;
      const response = await fetch(videoUrl);
      const data = await response.arrayBuffer();
      if (shouldFetch) {
        sourceBuffer.appendBuffer(data);
      }
    });

    source.addEventListener("endstreaming", () => {
      console.log("endstreaming — enough data buffered");
      shouldFetch = false;
    });
  });
}
```

## See also

- `startstreaming` event
- `ManagedMediaSource.streaming`
- `ManagedMediaSource`
- `MediaSource`
