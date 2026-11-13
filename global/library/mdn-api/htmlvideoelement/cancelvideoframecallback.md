---
title: "HTMLVideoElement: cancelVideoFrameCallback() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/cancelvideoframecallback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: cancelVideoFrameCallback() method

The **`cancelVideoFrameCallback()`** method of the `HTMLVideoElement` interface cancels a previously-registered video frame callback.

## Syntax

```js
cancelVideoFrameCallback(id)
```

### Parameters

- `id`
    A number representing the ID of the video frame callback you want to cancel. This will be the value returned by the corresponding `HTMLVideoElement.requestVideoFrameCallback` call.

### Return value

None (`undefined`).

## Examples

### Canceling a video frame callback

This example shows how to use `cancelVideoFrameCallback()` to cancel a previously-registered video frame callback.

```js
let videoCallbackId = null;

function updateCanvas(now, metadata) {
  // Do something with the frame

  // …

  // Re-register the callback to run on the next frame
  // It's important to update the videoCallbackId on each iteration
  // so you can cancel the callback successfully
  videoCallbackId = video.requestVideoFrameCallback(updateCanvas);
}

// Initial registration of the callback to run on the first frame
videoCallbackId = video.requestVideoFrameCallback(updateCanvas);

// …

// Cancel video frame callback using the latest videoCallbackId
if (videoCallbackId !== null) {
  video.cancelVideoFrameCallback(videoCallbackId);
}
```

## See also

- The `` element
- `HTMLVideoElement.requestVideoFrameCallback()`
- Perform efficient per-video-frame operations on video with `requestVideoFrameCallback()` on developer.chrome.com (2023)
