---
title: "ManagedMediaSource: startstreaming event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/managedmediasource/startstreaming_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ManagedMediaSource: startstreaming event

The **`startstreaming`** event of the `ManagedMediaSource` interface is fired when the `streaming` property changes from `false` to `true`. This indicates that the user agent needs more data to ensure uninterrupted playback, and the application should begin fetching and appending media segments.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("startstreaming", (event) => {});
```

Alternatively, assign to the event handler property of the interface:

```js
onstartstreaming = (event) => {};
```

## Event type

A generic `Event`.

## Examples

### Fetching data in response to startstreaming

This example creates a `ManagedMediaSource`, attaches it to a `` element, and uses the `startstreaming` event to begin fetching and appending media data.

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

- `endstreaming` event
- `ManagedMediaSource.streaming`
- `ManagedMediaSource`
- `MediaSource`
