---
title: "MediaStream: getTracks() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/gettracks/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: getTracks() method

The **`getTracks()`** method of the
`MediaStream` interface returns a sequence that represents all the
`MediaStreamTrack` objects in this
stream's track set,
regardless of `MediaStreamTrack.kind`.

## Syntax

```js
getTracks()
```

### Parameters

None.

### Return value

An array of `MediaStreamTrack` objects.

## Examples

```js
navigator.mediaDevices
  .getUserMedia({ audio: false, video: true })
  .then((mediaStream) => {
    document.querySelector("video").srcObject = mediaStream;
    // Stop the stream after 5 seconds
    setTimeout(() => {
      const tracks = mediaStream.getTracks();
      tracks[0].stop();
    }, 5000);
  });
```
